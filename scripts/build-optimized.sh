#!/bin/bash

# Optimized build script for low memory environments (512MB)
echo "Starting optimized build for low memory environment..."

# Set memory limits
export NODE_OPTIONS="--max-old-space-size=400 --optimize-for-size --max-semi-space-size=1 --gc-interval=100"

# Clean up before build
echo "Cleaning up..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies with minimal memory
echo "Installing dependencies..."
npm ci --prefer-offline --no-audit --no-fund --loglevel=error

# Build with memory optimization
echo "Building application..."
npm run build

echo "Build completed successfully!"
