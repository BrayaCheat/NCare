import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true
  },
  devIndicators: false
};

export default nextConfig;
