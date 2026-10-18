# Travel_site

"Aishu & Sai's Wanderlust Journeys": a scrapbook-style travel gallery. `spec.md` is the product spec, and
`Images\website_prototype_image.jpg` is the visual reference.

## Website (`wanderlust-journeys\`)
Next.js 16 (App Router, plain JSX) + Tailwind 4, static export (`output: "export"` → `out\`). Run npm commands from
`wanderlust-journeys\` with the Node setup below.
- `npm run images`: makes 2000px WebP copies of `..\Images\*` in `public\images\` (and 700px `_thumbnail` / `_1_thumb`
  covers), clearing old copies first. It also **rewrites the photo lists in `src\data\destinations.json`**.
  Run it after any change to `Images\`. It warns about photos that no destination uses.
- `npm run dev`: dev server bound to **127.0.0.1:3000 only**. Keep the `--hostname 127.0.0.1` so it isn't
  reachable from the local network.
- `npm run build`: static build into `out\`.

### Photos and data
- Source names: `<place>_thumbnail.jpg`, `<place>_<n>.jpg`, `<place>_<season>_<n>.jpg` (jpg/jpeg/png, any case; the
  misspellings `thumbail`/`thumbanail` are accepted). Known places are in the `PLACES` map in
  `scripts\optimize-images.mjs`. A new place needs an entry there **and** a destination in `destinations.json`.
- `destinations.json` (in display order) holds `name`, `date`, `color` (pastel stamp border), `hasSeasons`, and for
  seasonal trips `seasons[]` with `seasonName`, `date` and `color`. Image paths are filled in by `npm run images`.
- Never modify the originals in `Images\`.

### Code map (`src\`)
- `app\page.jsx`: view state (grid → season postcard → slideshow) and the open/close transitions.
- `lib\transition.js`: zoom-from-stamp morph (View Transitions API, with a FLIP fallback).
- `components\`: `StampGrid` (3×3 pages + arrows), `StampCard`, `SeasonModal`, `SlideshowModal` (keys/swipe),
  `ModalShell` (focus trap, Esc), `HeaderBanner` (ribbons), `SideQuotes` (quotes + side doodles),
  `Doodles` (SVG doodle set, header/footer doodles, `TravelQuotes` paper notes).
- `styles\globals.css`: theme tokens, `.stamp-edge` perforation mask, view-transition timing.
- On `lg`+ screens the page is exactly one window tall (no scrolling). The grid width comes from the window height
  (`lg:max-w-[min(940px,calc(97dvh-74px))]` in `StampGrid`). After layout changes, check with Playwright that
  `scrollHeight <= innerHeight` at 1366×768, 1440×900, 1536×864, 1600×1000 and 1920×1080.

## Node.js / npx
Node.js is not installed system-wide. A portable Node v24.22.0 lives in `.tools\node\`.

- Never run bare `npx skills ...`, and don't install Node globally. Run the skills CLI through the wrapper instead:
  `.\.tools\skills.ps1 <command> [args]` (for example `.\.tools\skills.ps1 find react performance`).
  It uses the pinned CLI in `.tools\skills-cli\`, keeps all home/temp/npm writes inside `.tools\`, and turns telemetry off.
- For other Node commands, put `.tools\node` on PATH for that command only, and set
  `npm_config_cache=.tools\npm-cache` and `npm_config_prefix=.tools\npm-global`.

## Playwright CLI
`@playwright/cli` 0.1.22 is installed locally in `.tools\playwright-cli\` (skill: `.claude\skills\playwright-cli`).
- Where the skill says `playwright-cli ...`, run `.\.tools\playwright-cli.ps1 ...` instead (e.g. `.\.tools\playwright-cli.ps1 open https://example.com`).
  The wrapper redirects home/app-data/temp/browser folders into `.tools\sandbox` and turns the update check off.
- Never `npm install -g @playwright/cli` or run `npx playwright install` outside the wrapper. It uses the system Chrome; ask before downloading bundled browsers.
- To update: download and review the new release the same way, then reinstall the pinned version into `.tools\playwright-cli` and rerun `.\.tools\playwright-cli.ps1 install --skills`.

## Installing skills
- Project level only: `.\.tools\skills.ps1 add <owner/repo> --skill <name> --agent claude-code --copy`.
  Never use `-g`/`--global` or `-y`.
- Ask the user before installing. Before and after installing, review SKILL.md and any bundled scripts for
  security issues, and run `npm audit` / `npm audit signatures` on any npm package involved.

## Access boundary
Stay inside this project folder. Don't read or write files outside it unless the user explicitly asks.
