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
    // Reduce image optimization memory
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  // Optimize for production builds
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Reduce memory usage during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Output standalone for smaller deployment
  output: 'standalone',
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Turbopack configuration for Next.js 16
  turbopack: {},
};

export default nextConfig;
