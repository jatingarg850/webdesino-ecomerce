# Database Seeding Guide

## Overview
This guide explains how to seed your database with products, subcategories, and trending categories.

## Quick Start

Run the complete seed script:
```bash
npm run seed:complete
```

This will:
1. Clear all existing data (products, subcategories, trending categories)
2. Seed 7 subcategories (3 for men, 4 for women)
3. Seed 6 trending categories with cover images
4. Seed 18 products across all subcategories

## What Gets Seeded

### Subcategories (7 total)

#### Men's Jeans (3 subcategories)
1. **Straight Fit** - Classic straight leg jeans
2. **Loose Fit** - Comfortable relaxed fit
3. **Baggy Fit** - Trendy oversized style

#### Women's Jeans (4 subcategories)
1. **Flair Jeans** - Elegant flared style
2. **Straight Jeans** - Versatile straight leg
3. **Bell Bottom** - Retro 70s style
4. **Baggy** - Relaxed boyfriend fit

### Trending Categories (6 total)

1. **Men's Jeans** - Links to `/men`
2. **Women's Jeans** - Links to `/women`
3. **Straight Fit** - Links to `/men?subcategory=straight-fit`
4. **Baggy Jeans** - Links to `/men?subcategory=baggy-fit`
5. **Flair Collection** - Links to `/women?subcategory=flair-jeans`
6. **Bell Bottom Style** - Links to `/women?subcategory=bell-bottom`

All trending categories include:
- High-quality cover images
- Display order (0-5)
- Active status (all set to true)

### Products (18 total)

#### Men's Products (9 products)
- **Straight Fit**: 3 products
  - Classic Blue Straight Jeans
  - Black Straight Fit Denim
  - Grey Straight Jeans

- **Loose Fit**: 3 products
  - Comfort Loose Fit Jeans
  - Dark Wash Loose Jeans
  - Light Blue Loose Fit

- **Baggy Fit**: 3 products
  - Street Style Baggy Jeans
  - Vintage Baggy Denim
  - Urban Baggy Jeans

#### Women's Products (9 products)
- **Flair Jeans**: 2 products
  - Classic Flair Jeans
  - High Waist Flair Denim

- **Straight Jeans**: 3 products
  - Straight Leg Blue Jeans
  - Black Straight Fit Jeans
  - Mid Rise Straight Jeans

- **Bell Bottom**: 3 products
  - Retro Bell Bottom Jeans
  - High Rise Bell Bottom
  - Flared Bell Bottom Jeans

- **Baggy**: 3 products
  - Baggy Boyfriend Jeans
  - Oversized Baggy Denim
  - Relaxed Baggy Jeans

## Product Features

Each product includes:
- ✅ Name and slug
- ✅ Detailed description
- ✅ Price and old price (with discount)
- ✅ Category (men/women)
- ✅ Subcategory
- ✅ Brand name
- ✅ 2 product images (Cloudinary URLs)
- ✅ Multiple sizes
- ✅ Multiple colors
- ✅ In stock status
- ✅ Featured flag
- ✅ Badge (NEW, SALE, TRENDING)
- ✅ Discount percentage

## Running the Seed Script

### Prerequisites
1. MongoDB connection string in `.env.local`
2. Node.js and npm installed
3. Dependencies installed (`npm install`)

### Steps

1. **Ensure MongoDB is running**
   ```bash
   # Check your .env.local file has:
   MONGODB_URI=mongodb://...
   ```

2. **Run the seed script**
   ```bash
   npm run seed:complete
   ```

3. **Expected output**
   ```
   🔌 Connecting to MongoDB...
   ✓ Connected to MongoDB

   🗑️  Clearing existing data...
   ✓ Cleared all existing data

   📁 Seeding subcategories...
   ✓ Seeded 7 subcategories
     Men's: Straight Fit, Loose Fit, Baggy Fit
     Women's: Flair Jeans, Straight Jeans, Bell Bottom, Baggy

   🔥 Seeding trending categories...
   ✓ Seeded 6 trending categories
     - Men's Jeans
     - Women's Jeans
     - Straight Fit
     - Baggy Jeans
     - Flair Collection
     - Bell Bottom Style

   👕 Seeding products...
   ✓ Seeded 18 products

   📊 SEEDING SUMMARY:
   ═══════════════════════════════════════
   
   🔹 SUBCATEGORIES:
     Men's Jeans:
       1. Straight Fit (3 products)
       2. Loose Fit (3 products)
       3. Baggy Fit (3 products)
   
     Women's Jeans:
       1. Flair Jeans (2 products)
       2. Straight Jeans (3 products)
       3. Bell Bottom (3 products)
       4. Baggy (3 products)
   
   🔹 TRENDING CATEGORIES:
     6 categories with cover images
     All active and ready to display on homepage
   
   🔹 PRODUCTS:
     Total: 18 products
     Men's: 9 products
     Women's: 9 products
     Featured: 12 products
   
   ═══════════════════════════════════════
   ✅ Database seeded successfully!
   🎉 Your jeans store is ready!
   
   ✓ Database connection closed
   ```

## Verification

After seeding, verify the data:

### 1. Check Subcategories
- Go to `/admin/subcategories`
- Should see 7 subcategories
- All should be active

### 2. Check Trending Categories
- Go to `/admin/trending-categories`
- Should see 6 categories with images
- All should be active

### 3. Check Products
- Go to `/admin/products`
- Should see 18 products
- Each product should have correct subcategory

### 4. Check Frontend
- Visit homepage
- Should see 6 trending categories in "TRENDING CATEGORIES" section
- Hover over "MEN JEANS" in navbar
- Should see: Straight Fit, Loose Fit, Baggy Fit
- Hover over "WOMEN JEANS" in navbar
- Should see: Flair Jeans, Straight Jeans, Bell Bottom, Baggy

### 5. Test Filtering
- Click "Straight Fit" in Men's dropdown
- Should navigate to `/men?subcategory=straight-fit`
- Should see 3 products
- Click "Flair Jeans" in Women's dropdown
- Should navigate to `/women?subcategory=flair-jeans`
- Should see 2 products

## Troubleshooting

### Error: MONGODB_URI is not defined
**Solution**: Add MongoDB connection string to `.env.local`
```
MONGODB_URI=mongodb://localhost:27017/your-database
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Error: Cannot connect to MongoDB
**Solution**: 
- Check if MongoDB is running
- Verify connection string is correct
- Check network/firewall settings

### Products not showing on homepage
**Solution**:
- Check if products have `featured: true`
- Refresh the homepage
- Check browser console for errors

### Subcategories not in navbar
**Solution**:
- Verify subcategories are marked as `isActive: true`
- Refresh the page
- Check admin panel to confirm they exist

### Trending categories not showing
**Solution**:
- Verify categories are marked as `isActive: true`
- Check if cover images are accessible
- Refresh the homepage

## Re-seeding

To re-seed the database (this will delete all existing data):

```bash
npm run seed:complete
```

**Warning**: This will delete:
- All products
- All subcategories
- All trending categories

It will NOT delete:
- Users
- Orders
- Brands
- Other collections

## Customization

To customize the seed data, edit `scripts/seed-complete.ts`:

### Add More Products
```typescript
const products = [
  // ... existing products
  {
    name: 'Your Product Name',
    slug: 'your-product-slug',
    description: 'Product description',
    price: 2499,
    oldPrice: 3999,
    category: 'men', // or 'women'
    subcategory: 'Straight Fit', // must match existing subcategory
    // ... other fields
  },
];
```

### Add More Subcategories
```typescript
const subcategories = [
  // ... existing subcategories
  {
    name: 'Your Subcategory',
    slug: 'your-subcategory',
    category: 'men', // or 'women'
    displayOrder: 10,
    isActive: true,
  },
];
```

### Add More Trending Categories
```typescript
const trendingCategories = [
  // ... existing categories
  {
    name: 'Your Category',
    slug: 'your-category',
    coverImage: 'https://your-image-url.jpg',
    linkUrl: '/your-link',
    displayOrder: 10,
    isActive: true,
  },
];
```

## Other Seed Scripts

- `npm run seed` - Original seed script
- `npm run seed:clothing` - Clothing seed script
- `npm run seed:complete` - Complete seed (recommended)

## Best Practices

1. **Always backup** before re-seeding production data
2. **Test locally** before seeding production
3. **Verify data** after seeding
4. **Check images** are accessible
5. **Test navigation** and filtering

## Support

If you encounter issues:
1. Check the error message
2. Verify MongoDB connection
3. Check `.env.local` configuration
4. Review the seed script output
5. Check browser console for frontend errors

## Summary

The complete seed script provides:
- ✅ 7 subcategories (3 men's, 4 women's)
- ✅ 6 trending categories with images
- ✅ 18 products across all subcategories
- ✅ Dynamic navigation
- ✅ Product filtering
- ✅ Homepage trending section
- ✅ Ready-to-use jeans store

Run `npm run seed:complete` and your store is ready! 🎉
