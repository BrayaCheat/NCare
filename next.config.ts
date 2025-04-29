import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true
  },
  devIndicators: false,
  images: {
    domains: ['uvcygqzbvdatedzrzwsj.supabase.co'],
  },
};

export default nextConfig;
