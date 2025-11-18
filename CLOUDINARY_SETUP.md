# Cloudinary Image Upload Setup

## Overview

Your e-commerce store now has Cloudinary integration for seamless image uploads in the admin panel.

## Features

✅ **Drag & Drop Upload**: Upload multiple images at once
✅ **Image Preview**: See uploaded images before saving
✅ **Delete Images**: Remove unwanted images easily
✅ **Cloudinary CDN**: Fast image delivery worldwide
✅ **Auto Optimization**: Images are automatically optimized

## Configuration

Cloudinary credentials are already configured in `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=dcu5kywhg
CLOUDINARY_API_KEY=659615312136135
CLOUDINARY_API_SECRET=I_TyfZOq3j_7gDbSy3eXnE5Ck-w
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dcu5kywhg
```

## How to Use

### Adding Products with Images

1. Go to `/admin/dashboard` (login with admin credentials)
2. Navigate to **Products** section
3. Click **Add Product** button
4. Fill in product details
5. In the **Product Images** section:
   - Click the upload box
   - Select up to 5 images
   - Images will automatically upload to Cloudinary
   - Preview uploaded images
   - Remove any image by hovering and clicking the X button
6. Complete other product details
7. Click **Create Product**

### Editing Product Images

1. Click **Edit** on any product
2. Existing images will be displayed
3. Add more images or remove existing ones
4. Click **Update Product**

## Image Upload Component

The `ImageUpload` component is located at:
```
components/admin/image-upload.tsx
```

### Props

- `value`: Array of image URLs
- `onChange`: Callback function when images change
- `maxImages`: Maximum number of images (default: 5)

### Usage Example

```tsx
<ImageUpload
  value={formData.images}
  onChange={(urls) => setFormData({ ...formData, images: urls })}
  maxImages={5}
/>
```

## API Endpoints

### Upload Image
- **Endpoint**: `POST /api/upload`
- **Body**: FormData with `file` and optional `folder`
- **Response**: `{ success: true, url: string, publicId: string }`

## Cloudinary Folder Structure

All images are uploaded to:
```
webdesino/products/
```

## Image Display

Uploaded images are automatically displayed on:
- Product listing pages (`/men`, `/women`, `/kids`)
- Product detail pages (`/products/[id]`)
- Admin product management
- Cart and wishlist

## Benefits

1. **Fast Loading**: Cloudinary CDN ensures fast image delivery
2. **Auto Optimization**: Images are automatically compressed
3. **Responsive**: Images adapt to different screen sizes
4. **Secure**: Images are stored securely on Cloudinary
5. **Scalable**: No storage limits on your server

## Troubleshooting

### Upload Fails
- Check internet connection
- Verify Cloudinary credentials in `.env.local`
- Check file size (max 10MB recommended)

### Images Not Displaying
- Verify image URLs are saved in database
- Check browser console for errors
- Ensure Cloudinary cloud name is correct

## Next Steps

- Consider adding image cropping/editing features
- Implement image compression before upload
- Add support for video uploads
- Create image galleries for products
