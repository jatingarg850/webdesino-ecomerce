# Trending Categories - Troubleshooting Guide

## Issue: "Trending Categories" Not Showing in Admin Sidebar

### ✅ Verification Checklist

The implementation is **COMPLETE**. Here's what exists:

1. ✅ **Menu Item Added** - `components/admin/admin-layout.tsx` has the menu item
2. ✅ **Page Created** - `app/admin/trending-categories/page.tsx` exists
3. ✅ **Layout Created** - `app/admin/trending-categories/layout.tsx` exists
4. ✅ **API Route Created** - `app/api/admin/trending-categories/route.ts` exists
5. ✅ **Model Created** - `models/TrendingCategory.ts` exists
6. ✅ **No TypeScript Errors** - All files pass diagnostics

### 🔧 Solution: Restart Development Server

The menu item exists but you need to restart the dev server to see it.

**Steps:**

1. **Stop the current dev server**
   - Press `Ctrl + C` in the terminal running `npm run dev`

2. **Start the dev server again**
   ```bash
   npm run dev
   ```

3. **Clear browser cache** (optional but recommended)
   - Press `Ctrl + Shift + R` (Windows/Linux)
   - Press `Cmd + Shift + R` (Mac)

4. **Navigate to admin panel**
   ```
   http://localhost:3000/admin
   ```

5. **Login with admin credentials**

6. **Look for "Trending Categories" in the sidebar**
   - Should be between "Subcategories" and "Orders"
   - Has a TrendingUp icon (📈)

### 📍 Menu Location

The sidebar menu should show in this order:
1. Dashboard
2. Products
3. Subcategories
4. **Trending Categories** ← HERE
5. Orders
6. Users
7. Brands
8. Settings

### 🎯 Direct Access

You can also access the page directly:
```
http://localhost:3000/admin/trending-categories
```

### 🔍 Verify Files Exist

Run these commands to verify all files are in place:

**Check admin layout:**
```bash
cat components/admin/admin-layout.tsx | grep "Trending Categories"
```

**Check page exists:**
```bash
ls -la app/admin/trending-categories/
```

**Check API route exists:**
```bash
ls -la app/api/admin/trending-categories/
```

### 📝 Expected Output

After restarting, you should see:

**In Sidebar:**
```
Admin Panel
POCKET MOUSE Store

[Dashboard icon] Dashboard
[Package icon] Products
[Layers icon] Subcategories
[TrendingUp icon] Trending Categories  ← NEW
[ShoppingCart icon] Orders
[Users icon] Users
[Tag icon] Brands
[Settings icon] Settings

[Logout icon] Logout
```

**On Page:**
```
Trending Categories
Manage homepage trending categories with cover images

[+ Add Category]

[Grid of category cards or empty state]
```

### 🐛 Still Not Working?

If you still don't see it after restarting:

1. **Check if you're logged in as admin**
   - Only admin users can access admin panel
   - Check localStorage for 'adminUser'

2. **Check browser console for errors**
   - Press F12 to open DevTools
   - Look for any red errors

3. **Verify the route is correct**
   - URL should be: `http://localhost:3000/admin/trending-categories`
   - Not: `http://localhost:3000/admin/trending-category` (singular)

4. **Check if Next.js compiled the new routes**
   - Look for compilation messages in terminal
   - Should see: "✓ Compiled /admin/trending-categories"

5. **Try hard refresh**
   - Close all browser tabs
   - Clear cache
   - Restart browser
   - Open admin panel again

### 🔄 Force Rebuild

If nothing works, try a clean rebuild:

```bash
# Stop dev server (Ctrl + C)

# Remove Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### ✅ Confirmation

Once working, you should be able to:
- ✅ See "Trending Categories" in sidebar
- ✅ Click it to navigate to the page
- ✅ See "Add Category" button
- ✅ Create new trending categories
- ✅ Upload cover images
- ✅ Edit existing categories
- ✅ Delete categories

### 📞 Additional Help

If the issue persists:

1. Check that all files were created correctly
2. Verify no typos in file paths
3. Ensure MongoDB is connected
4. Check that Cloudinary is configured (for image uploads)

### 🎉 Success Indicators

You'll know it's working when:
- Menu item appears in sidebar
- Clicking it loads the page
- Page shows "Trending Categories" heading
- "Add Category" button is visible
- No console errors

---

**The implementation is complete. Just restart your dev server!** 🚀
