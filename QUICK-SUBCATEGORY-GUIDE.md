# Quick Subcategory Guide

## For Admins

### How to Add a Subcategory

**Option 1: From Subcategories Page (Recommended)**
1. Login to admin panel
2. Click "Subcategories" in sidebar
3. Click "Add Subcategory" button
4. Fill in:
   - Name: e.g., "Straight Fit"
   - Category: Men or Women
   - Display Order: 0 (lower numbers appear first)
   - Active: ✓ (checked)
5. Click "Create Subcategory"

**Option 2: While Adding a Product**
1. Go to "Products" → "Add Product"
2. Select Category (Men/Women)
3. In Subcategory dropdown, select "+ Add New Subcategory"
4. Type the name and click "Create"
5. Continue with product details

### How to Edit a Subcategory
1. Go to "Subcategories" page
2. Click the blue edit icon
3. Modify details
4. Click "Update Subcategory"

### How to Delete a Subcategory
1. Go to "Subcategories" page
2. Click the red delete icon
3. Confirm deletion

### How to Reorder Subcategories in Navigation
1. Go to "Subcategories" page
2. Click edit on a subcategory
3. Change "Display Order" number (0 = first, 1 = second, etc.)
4. Click "Update Subcategory"

### How to Hide a Subcategory from Navigation
1. Go to "Subcategories" page
2. Click edit on a subcategory
3. Uncheck "Active"
4. Click "Update Subcategory"
(Products will still have this subcategory, but it won't show in navbar)

## For Customers

### How to Browse by Subcategory
1. Hover over "MEN JEANS" or "WOMEN JEANS" in the top menu
2. Click any subcategory from the dropdown
3. See filtered products
4. Click "Clear Filter" to see all products again

## Quick Reference

### Admin URLs
- Subcategory Management: `/admin/subcategories`
- Product Management: `/admin/products`
- Dashboard: `/admin/dashboard`

### Customer URLs
- Men's Products: `/men`
- Women's Products: `/women`
- Filtered Example: `/men?subcategory=straight-fit`

### Display Order Examples
- 0 = First in list
- 1 = Second in list
- 2 = Third in list
- etc.

### Status Meanings
- **Active** (Green): Shows in navigation
- **Inactive** (Gray): Hidden from navigation

## Tips

✅ **DO:**
- Use clear, descriptive names
- Set logical display orders
- Test in the navbar after creating
- Deactivate instead of deleting when unsure

❌ **DON'T:**
- Create duplicate names in same category
- Delete subcategories with many products
- Use special characters in names
- Forget to mark as Active

## Troubleshooting

**Q: I created a subcategory but don't see it in the navbar**
A: Check if it's marked as "Active" and refresh the page

**Q: Can I have the same subcategory for Men and Women?**
A: Yes! Each category can have its own "Straight Fit", "Baggy", etc.

**Q: What happens to products if I delete a subcategory?**
A: Products keep their subcategory value, but it won't show in navigation

**Q: How do I change the order of subcategories?**
A: Edit the subcategory and change the "Display Order" number

**Q: Can I rename a subcategory?**
A: Yes, edit it and change the name. The slug will update automatically.
