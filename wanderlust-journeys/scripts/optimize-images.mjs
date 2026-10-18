// Makes web-sized WebP copies of the original photos in ../../Images and refreshes the
// photo lists in src/data/destinations.json. Originals are only read, never modified.
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, "../../Images");
const OUT = path.resolve(here, "../public/images");
const DATA = path.resolve(here, "../src/data/destinations.json");

const FULL_MAX = 2000;
const THUMB_WIDTH = 700;

// Source filename prefix (lowercased) -> canonical place name used in the output.
const PLACES = {
  alaska: "Alaska",
  arizona: "Arizona",
  florida: "Florida",
  maine: "Maine",
  nevada: "Nevada",
  newhampshire: "NewHampshire",
  newyork: "NewYork",
  virginia: "Virginia",
  washington: "Washington",
  washingtondc: "WashingtonDC",
};

// Covers the misspellings in the source folder (thumbail, thumbanail).
const THUMB_RE = /^thumb[a-z]*$/;

function canonicalName(file) {
  const base = path.parse(file).name.toLowerCase();
  const parts = base.split("_");
  const place = PLACES[parts[0]];
  if (!place) return null;

  if (parts.length === 2 && THUMB_RE.test(parts[1])) {
    return { name: `${place}_thumbnail`, thumb: true };
  }
  if (parts.length === 2 && /^\d+$/.test(parts[1])) {
    return { name: `${place}_${parts[1]}`, thumb: false };
  }
  if (parts.length === 3 && /^\d+$/.test(parts[2])) {
    return { name: `${place}_${parts[1]}_${parts[2]}`, thumb: false };
  }
  return null;
}

const photoNumber = (name) => Number(name.match(/_(\d+)\.webp$/)[1]);

/**
 * Rewrites the photo lists in destinations.json from the files just generated, so adding,
 * removing or renumbering photos only needs `npm run images`. Names, dates and colors are kept.
 */
async function syncDestinations(written) {
  const destinations = JSON.parse(await readFile(DATA, "utf8"));
  const used = new Set();

  const photosFor = (prefix) => {
    const re = new RegExp(`^${prefix}_\\d+\\.webp$`);
    const names = written.filter((n) => re.test(n)).sort((a, b) => photoNumber(a) - photoNumber(b));
    names.forEach((n) => used.add(n));
    if (!names.length) console.warn(`warn  no photos found for ${prefix}`);
    return names.map((n) => `/images/${n}`);
  };
  const markUsed = (src) => used.add(path.basename(src));

  for (const dest of destinations) {
    const place = path.basename(dest.thumbnail).replace(/_thumbnail\.webp$/, "");
    if (!written.includes(`${place}_thumbnail.webp`)) console.warn(`warn  missing thumbnail for ${dest.name}`);
    markUsed(dest.thumbnail);

    if (dest.hasSeasons) {
      for (const season of dest.seasons) {
        const prefix = `${place}_${season.seasonName.toLowerCase()}`;
        season.images = photosFor(prefix);
        season.thumbnail = `/images/${prefix}_1_thumb.webp`;
        markUsed(season.thumbnail);
      }
    } else {
      dest.images = photosFor(place);
    }
  }

  await writeFile(DATA, `${JSON.stringify(destinations, null, 2)}\n`);

  const unused = written.filter((n) => !used.has(n) && !n.endsWith("_1_thumb.webp"));
  if (unused.length) {
    console.warn(`\nwarn  not shown on the site (add a destination or season to destinations.json):\n  ${unused.join("\n  ")}`);
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  // Start clean so renamed or deleted originals don't leave stale copies behind.
  for (const old of await readdir(OUT)) {
    if (old.endsWith(".webp")) await rm(path.join(OUT, old));
  }

  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  const sources = new Map();
  const written = [];

  let count = 0;
  let bytes = 0;
  for (const file of files) {
    const target = canonicalName(file);
    if (!target) {
      console.log(`skip  ${file}`);
      continue;
    }
    if (sources.has(target.name)) {
      throw new Error(`${file} and ${sources.get(target.name)} both map to ${target.name}; rename one of them.`);
    }
    sources.set(target.name, file);

    const input = path.join(SRC, file);
    const jobs = [];

    if (target.thumb) {
      jobs.push([`${target.name}.webp`, { width: THUMB_WIDTH }]);
    } else {
      jobs.push([`${target.name}.webp`, { width: FULL_MAX, height: FULL_MAX, fit: "inside" }]);
      // Image 1 of each place/season doubles as a small cover (season cards, previews).
      if (target.name.endsWith("_1")) {
        jobs.push([`${target.name}_thumb.webp`, { width: THUMB_WIDTH }]);
      }
    }

    for (const [outName, resize] of jobs) {
      const outPath = path.join(OUT, outName);
      await sharp(input)
        .rotate() // apply EXIF orientation
        .resize({ ...resize, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
      const { size } = await stat(outPath);
      bytes += size;
      count += 1;
      written.push(outName);
      console.log(`wrote ${outName}  (${Math.round(size / 1024)} KB)`);
    }
  }

  console.log(`\n${count} files, ${(bytes / 1024 / 1024).toFixed(1)} MB total`);
  await syncDestinations(written);
  console.log("updated src/data/destinations.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
