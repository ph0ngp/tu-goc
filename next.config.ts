import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Từ Gốc has a finite catalog and no server-owned state. Pre-rendering every
  // route makes lesson and practice navigation a static-file lookup instead of
  // asking a Worker to rebuild a page after each click.
  output: "export",
};

export default nextConfig;
