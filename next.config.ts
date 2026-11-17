import type { NextConfig } from "next";

// The site is fully static: every page is rendered at build time from the
// snapshot in data/, so `next build` writes plain HTML, CSS and JS to out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
