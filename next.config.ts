import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
};

export default nextConfig;
