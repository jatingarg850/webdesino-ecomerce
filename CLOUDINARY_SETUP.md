# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing up, go to your Dashboard
3. Copy these credentials:
   - Cloud Name
   - API Key
   - API Secret

## Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Also add them to your Render environment variables.

## Step 3: Upload Existing Images

Run this command to upload all images from `public/ecom-clothes-photos` to Cloudinary:

```bash
npx tsx scripts/upload-images-to-cloudinary.ts
```

This will:
- Upload all images to Cloudinary
- Create a `image-url-mapping.json` file with old path → new URL mapping
- Display the new Cloudinary URLs

## Step 4: Update Database

You'll need to update your product images in the database with the new Cloudinary URLs.

Option 1: Manual update through admin panel
- Go to admin panel
- Edit each product
- Replace image URLs with Cloudinary URLs from the mapping file

Option 2: Create a migration script (recommended for many products)

## Step 5: Clean Up

After confirming everything works:
1. Delete the `public/ecom-clothes-photos` folder
2. Commit and push to GitHub
3. Redeploy on Render

## Benefits

✅ Reduced deployment size (no large images in repo)
✅ Faster image loading with Cloudinary CDN
✅ Automatic image optimization
✅ Image transformations on-the-fly
✅ Better performance on Render free tier

## Cloudinary Free Tier Limits

- 25 GB storage
- 25 GB bandwidth/month
- Perfect for small to medium e-commerce stores
