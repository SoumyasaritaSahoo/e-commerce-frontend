import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal self-contained server bundle for the production Docker image
  // (see Dockerfile's `runner` stage) — docs/11-deployment-infra.md.
  output: "standalone",
};

export default nextConfig;
