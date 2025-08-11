import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  eslint: {
    // Ignore ESLint errors during builds as requested
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
};

export default nextConfig;
