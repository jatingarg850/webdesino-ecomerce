import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize for production builds
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Reduce memory usage during build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Output standalone for smaller deployment
  output: 'standalone',
};

export default nextConfig;
