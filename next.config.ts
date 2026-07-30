import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
      source: "/",
      destination: "/workflows",
      permanent: false
      }
    ];
  },
  reactCompiler: true,
  devIndicators: false,
};

export default nextConfig;
