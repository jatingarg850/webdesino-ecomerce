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
    // Cloudinary optimization - high quality
    loader: 'default',
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Enable Next.js optimization
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
