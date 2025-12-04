# Deployment Guide for 512MB Memory Environment

## Memory Optimizations Applied

### 1. Build Configuration
- **Memory Limit**: Set to 480MB (leaving headroom for system)
- **Turbopack**: Enabled for faster, more memory-efficient builds
- **Standalone Output**: Reduces deployment size
- **Console Removal**: Removes console logs in production

### 2. NPM Configuration (.npmrc)
- Offline-first installation
- Disabled audit and fund checks
- Reduced socket connections
- Error-only logging

### 3. Image Optimization
- Limited device sizes: [640, 750, 828, 1080, 1200]
- Limited image sizes: [16, 32, 48, 64, 96]
- Cache TTL: 60 seconds

### 4. Package Optimizations
- `optimizePackageImports`: Enabled for lucide-react
- Telemetry disabled

## Render.com Deployment

### Environment Variables Required:
```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=480
NEXT_TELEMETRY_DISABLED=1
MONGODB_URI=<your-mongodb-uri>
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=<your-url>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
RAZORPAY_KEY_ID=<your-razorpay-key>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
```

### Build Command:
```bash
npm ci --prefer-offline --no-audit --no-fund --loglevel=error && rm -rf .next && npm run build
```

### Start Command:
```bash
npm start
```

### Health Check Path:
```
/api/health
```

## Troubleshooting

### If Build Still Fails:
1. Check Render logs for specific error
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Try clearing build cache in Render dashboard

### Memory Issues During Runtime:
1. Monitor memory usage in Render dashboard
2. Consider upgrading to Starter plan (512MB+ RAM)
3. Optimize database queries
4. Add caching for frequently accessed data

### Performance Optimization:
1. Use CDN for static assets
2. Enable Cloudinary auto-optimization
3. Implement Redis caching (if upgraded plan)
4. Use database indexes for queries

## Monitoring

### Key Metrics to Watch:
- Memory usage (should stay under 450MB)
- Response times
- Error rates
- Database connection pool

### Recommended Tools:
- Render built-in metrics
- MongoDB Atlas monitoring
- Cloudinary analytics

## Upgrade Path

If you need more resources:
1. **Starter Plan ($7/month)**: 512MB RAM guaranteed
2. **Standard Plan ($25/month)**: 2GB RAM
3. Consider serverless options for API routes

## Support

For issues:
1. Check Render status page
2. Review application logs
3. Test locally with production build
4. Contact Render support if infrastructure issue
