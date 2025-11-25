# Quick Seed Reference

## Run Seed Script

```bash
npm run seed:complete
```

## What Gets Seeded

### Subcategories (7)
**Men's (3):**
1. Straight Fit
2. Loose Fit
3. Baggy Fit

**Women's (4):**
1. Flair Jeans
2. Straight Jeans
3. Bell Bottom
4. Baggy

### Trending Categories (6)
1. Men's Jeans → `/men`
2. Women's Jeans → `/women`
3. Straight Fit → `/men?subcategory=straight-fit`
4. Baggy Jeans → `/men?subcategory=baggy-fit`
5. Flair Collection → `/women?subcategory=flair-jeans`
6. Bell Bottom Style → `/women?subcategory=bell-bottom`

### Products (18)
- **Men's**: 9 products (3 per subcategory)
- **Women's**: 9 products (2-3 per subcategory)
- **Featured**: 12 products
- **All with**: Images, prices, sizes, colors, badges

## Quick Verification

✅ **Admin Panel:**
- `/admin/subcategories` → 7 items
- `/admin/trending-categories` → 6 items
- `/admin/products` → 18 items

✅ **Frontend:**
- Homepage → 6 trending categories visible
- Men's navbar → 3 subcategories
- Women's navbar → 4 subcategories

✅ **Filtering:**
- `/men?subcategory=straight-fit` → 3 products
- `/women?subcategory=flair-jeans` → 2 products

## Troubleshooting

**Not working?**
1. Check `.env.local` has `MONGODB_URI`
2. Ensure MongoDB is running
3. Run `npm install` first
4. Check console for errors

**Need to re-seed?**
```bash
npm run seed:complete
```
(This clears all data first)

## File Location
`scripts/seed-complete.ts`
