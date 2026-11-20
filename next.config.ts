import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Từ Gốc has a finite catalog and no server-owned state. Every route is
  // pre-rendered and served as a plain static file from GitHub Pages.
  output: "export",
  // Emit `<route>/index.html` so a static host serves each page directly.
  trailingSlash: true,
};

export default nextConfig;
