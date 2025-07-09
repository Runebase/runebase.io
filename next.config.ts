import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

