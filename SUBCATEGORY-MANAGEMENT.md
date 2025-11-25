# Subcategory Management System

## Overview
The subcategory management system allows admins to dynamically create, edit, and delete product subcategories that automatically appear in the navigation dropdown menus.

## Features

### 1. **Subcategory Management Page** (`/admin/subcategories`)
- View all subcategories organized by category (Men/Women)
- Create new subcategories
- Edit existing subcategories (name, category, display order, active status)
- Delete subcategories
- Control display order in navigation
- Toggle active/inactive status

### 2. **Product Form Integration** (`/admin/products`)
When adding or editing a product:
- **Dropdown Selection**: Shows all existing subcategories for the selected category
- **Add New Option**: Click "+ Add New Subcategory" in the dropdown
- **Inline Creation**: Create a new subcategory without leaving the product form
- **Auto-Selection**: Newly created subcategory is automatically selected

### 3. **Dynamic Navigation** (Frontend)
- Navbar dropdowns automatically fetch and display active subcategories
- Men's and Women's sections show their respective subcategories
- Clicking a subcategory filters products on the category page
- No hardcoded values - all data comes from the database

### 4. **Category Pages** (`/men` and `/women`)
- Support subcategory filtering via URL parameter: `?subcategory=slug`
- Display filtered product count
- Show "Clear Filter" button when filtering is active

## Database Schema

### Subcategory Model
```typescript
{
  name: string;           // Display name (e.g., "Straight Fit")
  slug: string;           // URL-friendly version (e.g., "straight-fit")
  category: 'men' | 'women';
  displayOrder: number;   // Controls order in navigation (lower = first)
  isActive: boolean;      // Only active subcategories appear in navigation
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### `/api/admin/subcategories`
- **GET**: Fetch all subcategories (optional `?category=men` or `?category=women`)
- **POST**: Create new subcategory
- **PATCH**: Update existing subcategory
- **DELETE**: Delete subcategory (requires `?subcategoryId=xxx`)

## Workflow

### Creating a Subcategory

#### Method 1: From Subcategories Page
1. Go to `/admin/subcategories`
2. Click "Add Subcategory"
3. Enter name, select category, set display order
4. Click "Create Subcategory"

#### Method 2: From Product Form
1. Go to `/admin/products` and click "Add Product"
2. Select a category (Men/Women)
3. In the Subcategory dropdown, select "+ Add New Subcategory"
4. Enter the subcategory name
5. Click "Create" button
6. The new subcategory is created and automatically selected

### Editing a Subcategory
1. Go to `/admin/subcategories`
2. Click the edit icon on any subcategory
3. Modify name, category, display order, or active status
4. Click "Update Subcategory"

### Deleting a Subcategory
1. Go to `/admin/subcategories`
2. Click the delete icon on any subcategory
3. Confirm deletion
4. **Note**: This doesn't delete products with that subcategory

### Managing Display Order
- Lower numbers appear first in navigation
- Example: Order 0 appears before Order 1
- Use this to control the sequence in dropdown menus

### Activating/Deactivating
- Inactive subcategories don't appear in navigation
- Products can still use inactive subcategories
- Useful for seasonal or temporary categories

## Frontend Integration

### Navbar Dropdowns
The navbar automatically fetches subcategories on page load:
```typescript
// Men's dropdown
/api/admin/subcategories?category=men

// Women's dropdown
/api/admin/subcategories?category=women
```

### Product Filtering
When a user clicks a subcategory in the navbar:
- URL: `/men?subcategory=straight-fit`
- Page filters products where `subcategory` slug matches
- Shows filtered count and "Clear Filter" option

## Best Practices

1. **Naming Convention**: Use clear, descriptive names (e.g., "Straight Fit", "Baggy Jeans")
2. **Display Order**: Plan your navigation hierarchy before setting orders
3. **Active Status**: Deactivate instead of deleting to preserve product associations
4. **Slug Uniqueness**: System auto-generates slugs, but ensure names are distinct per category
5. **Testing**: After creating a subcategory, check the navbar to confirm it appears

## Technical Notes

- Subcategories are fetched on component mount (navbar, product form)
- Slug is auto-generated from name (lowercase, hyphenated)
- Compound index ensures unique slug per category
- Only active subcategories appear in public navigation
- All subcategories (active/inactive) appear in admin product form

## Troubleshooting

**Subcategory not appearing in navbar?**
- Check if it's marked as Active
- Verify the category is correct (men/women)
- Refresh the page to reload subcategories

**Can't create duplicate subcategory?**
- Each category can only have one subcategory with the same slug
- Try a different name or check existing subcategories

**Products not filtering correctly?**
- Ensure product's subcategory name matches exactly
- Check that the slug generation is consistent
