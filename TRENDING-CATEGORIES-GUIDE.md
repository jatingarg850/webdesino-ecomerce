# Trending Categories Management Guide

## Overview
The Trending Categories system allows admins to manage the featured categories displayed on the homepage with custom cover images and links.

## Features

### Admin Panel Features
1. **Create Trending Categories**
   - Add category name
   - Upload custom cover image
   - Set link destination
   - Control display order
   - Toggle active/inactive status

2. **Edit Trending Categories**
   - Update category name
   - Change cover image
   - Modify link URL
   - Adjust display order
   - Change active status

3. **Delete Trending Categories**
   - Remove categories from the system
   - Confirmation dialog for safety

4. **Visual Management**
   - Grid view with cover image previews
   - Display order badges
   - Active/inactive status indicators
   - Direct link preview

### Frontend Features
1. **Dynamic Homepage Display**
   - Automatically fetches active categories from database
   - Displays in order specified by admin
   - Responsive grid layout (2 columns mobile, 4 columns desktop)
   - Hover effects and animations
   - Links to specified URLs

2. **Empty State Handling**
   - Shows helpful message when no categories exist
   - Prompts admin to add categories

## How to Use

### Creating a Trending Category

1. **Login to Admin Panel**
   - Navigate to `/admin`
   - Login with admin credentials

2. **Go to Trending Categories**
   - Click "Trending Categories" in the sidebar menu
   - Or navigate to `/admin/trending-categories`

3. **Click "Add Category"**
   - Modal opens with form fields

4. **Fill in Details**
   - **Category Name**: Enter a descriptive name (e.g., "Men's Jeans", "Slim Fit", "Designer Denim")
   - **Cover Image**: Click to upload an image
     - Recommended size: 800x600px (4:3 ratio)
     - Supports JPG, PNG, WebP
     - Image is uploaded to Cloudinary
   - **Link URL**: Enter where this category should link to
     - Examples: `/men`, `/women`, `/sale`, `/men?subcategory=slim-fit`
   - **Display Order**: Set the position (0 = first, 1 = second, etc.)
   - **Active**: Check to show on homepage, uncheck to hide

5. **Click "Create Category"**
   - Category is saved to database
   - Appears in the grid view
   - Automatically shows on homepage (if active)

### Editing a Trending Category

1. **Go to Trending Categories Page**
2. **Click the "Edit" button** on any category card
3. **Modify the fields** you want to change
4. **Click "Update Category"**
5. **Changes reflect immediately** on the homepage

### Deleting a Trending Category

1. **Go to Trending Categories Page**
2. **Click the "Delete" button** on the category card
3. **Confirm deletion** in the dialog
4. **Category is removed** from database and homepage

### Managing Display Order

The display order determines the sequence of categories on the homepage:
- **0** = First position (top-left)
- **1** = Second position
- **2** = Third position
- And so on...

**Example:**
- Men's Jeans (Order: 0)
- Women's Jeans (Order: 1)
- Slim Fit (Order: 2)
- Designer Denim (Order: 3)

### Activating/Deactivating Categories

- **Active**: Category appears on homepage
- **Inactive**: Category is hidden from homepage but remains in database

**Use Cases:**
- Seasonal categories (activate during specific seasons)
- Testing new categories (keep inactive until ready)
- Temporary removal without deletion

## Database Schema

```typescript
TrendingCategory {
  name: string           // "Men's Jeans"
  slug: string           // "mens-jeans" (auto-generated)
  coverImage: string     // Cloudinary URL
  linkUrl: string        // "/men"
  displayOrder: number   // 0, 1, 2, etc.
  isActive: boolean      // true/false
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### `/api/admin/trending-categories`

**GET** - Fetch all trending categories
- Query params: `?activeOnly=true` (optional)
- Returns: Array of categories sorted by displayOrder

**POST** - Create new category
```json
{
  "name": "Men's Jeans",
  "coverImage": "https://cloudinary.com/...",
  "linkUrl": "/men",
  "displayOrder": 0,
  "isActive": true
}
```

**PATCH** - Update existing category
```json
{
  "categoryId": "xxx",
  "name": "Updated Name",
  "coverImage": "https://cloudinary.com/...",
  "linkUrl": "/men",
  "displayOrder": 1,
  "isActive": true
}
```

**DELETE** - Delete category
- Query params: `?categoryId=xxx`

## Homepage Integration

The homepage (`app/page.tsx`) automatically:
1. Fetches active trending categories on server-side
2. Sorts by display order
3. Limits to 8 categories
4. Renders in responsive grid
5. Shows empty state if no categories exist

## Image Guidelines

### Recommended Specifications
- **Dimensions**: 800x600px (4:3 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 500KB for optimal loading
- **Quality**: High resolution for retina displays

### Image Content Tips
- Use high-quality product photos
- Ensure good lighting and contrast
- Include text overlay if needed (done in image editor)
- Test on mobile devices for readability
- Avoid cluttered backgrounds

### Image Upload Process
1. Click the upload area in the form
2. Select image from your computer
3. Image uploads to Cloudinary automatically
4. Preview appears in the form
5. Can replace by uploading a new image

## Best Practices

### Naming
✅ **Good Names:**
- "Men's Jeans"
- "Slim Fit Collection"
- "Designer Denim"
- "Women's Skinny Jeans"

❌ **Avoid:**
- Generic names like "Category 1"
- Too long names (over 30 characters)
- Special characters

### Link URLs
✅ **Good URLs:**
- `/men` - Category page
- `/women` - Category page
- `/sale` - Sale page
- `/men?subcategory=slim-fit` - Filtered view

❌ **Avoid:**
- External URLs (use internal routes)
- Broken links
- URLs with spaces

### Display Order
- Plan your layout before setting orders
- Leave gaps (0, 5, 10) for easy insertion later
- Group related categories together
- Most important categories first

### Active Status
- Keep 4-8 categories active for best visual balance
- Deactivate seasonal categories when not relevant
- Test inactive categories before activating

## Workflow Examples

### Example 1: Seasonal Campaign
1. Create "Summer Collection" category
2. Upload bright, summery cover image
3. Link to `/sale?season=summer`
4. Set display order: 0 (first position)
5. Mark as Active
6. After season ends, mark as Inactive

### Example 2: New Product Launch
1. Create "New Arrivals" category
2. Upload image of new products
3. Link to `/men?badge=NEW`
4. Set display order: 0 (featured position)
5. Mark as Active
6. After launch period, adjust order or deactivate

### Example 3: Reorganizing Categories
1. Edit existing categories
2. Update display orders:
   - Men's Jeans: 0
   - Women's Jeans: 1
   - Slim Fit: 2
   - Baggy Fit: 3
3. Save changes
4. Homepage updates automatically

## Troubleshooting

**Q: Category not showing on homepage?**
- Check if it's marked as Active
- Verify display order is set
- Refresh the homepage
- Check if cover image URL is valid

**Q: Image not displaying?**
- Ensure image was uploaded successfully
- Check Cloudinary URL is accessible
- Try re-uploading the image
- Verify image format is supported

**Q: Link not working?**
- Check URL format (should start with `/`)
- Verify the destination page exists
- Test the link in a new tab
- Ensure no typos in URL

**Q: Categories in wrong order?**
- Check display order numbers
- Lower numbers appear first
- Edit categories to adjust order
- Refresh homepage to see changes

**Q: Can't delete category?**
- Check if you're logged in as admin
- Try refreshing the page
- Check browser console for errors
- Verify database connection

## Technical Notes

- Categories are fetched server-side for better SEO
- Images are stored on Cloudinary CDN
- Slug is auto-generated from name
- Maximum 8 categories displayed on homepage
- Responsive grid: 2 columns (mobile), 4 columns (desktop)
- Hover effects for better UX
- Lazy loading for images

## Security

- Only admins can access trending categories management
- Authentication required for all API endpoints
- Image uploads validated and sanitized
- SQL injection prevention through Mongoose
- XSS protection on all inputs

## Performance

- Server-side rendering for fast initial load
- Image optimization through Cloudinary
- Lazy loading for images
- Efficient database queries with indexing
- Caching strategies for production

## Future Enhancements (Optional)

- Drag-and-drop reordering
- Bulk operations (activate/deactivate multiple)
- Category analytics (clicks, views)
- Scheduled activation/deactivation
- A/B testing for categories
- Category templates
- Image filters and effects
- Multi-language support
