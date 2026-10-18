/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // Photos are pre-optimized by scripts/optimize-images.mjs.
  images: { unoptimized: true },
};

export default nextConfig;
