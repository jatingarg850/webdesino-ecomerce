# Subcategory System Testing Checklist

## Pre-Testing Setup

- [ ] MongoDB is running and connected
- [ ] Admin user is created and can login
- [ ] At least 2-3 products exist in database (for testing filters)

## Admin Panel Tests

### Subcategories Page (`/admin/subcategories`)

#### Access & Display
- [ ] Can access `/admin/subcategories` after login
- [ ] Page shows "Subcategories" heading
- [ ] "Add Subcategory" button is visible
- [ ] Filter tabs show: All, Men, Women
- [ ] Table displays with correct columns: Order, Name, Slug, Category, Status, Actions

#### Create Subcategory
- [ ] Click "Add Subcategory" button opens modal
- [ ] Modal has fields: Name, Category, Display Order, Active checkbox
- [ ] Can enter subcategory name (e.g., "Straight Fit")
- [ ] Can select category (Men/Women)
- [ ] Can set display order (default 0)
- [ ] Active checkbox is checked by default
- [ ] Click "Create Subcategory" saves successfully
- [ ] Success alert appears
- [ ] Modal closes
- [ ] New subcategory appears in table
- [ ] Slug is auto-generated correctly (e.g., "straight-fit")

#### Edit Subcategory
- [ ] Click edit icon opens modal with existing data
- [ ] Can modify name
- [ ] Can change category
- [ ] Can update display order
- [ ] Can toggle active status
- [ ] Click "Update Subcategory" saves changes
- [ ] Success alert appears
- [ ] Table updates with new values

#### Delete Subcategory
- [ ] Click delete icon shows confirmation dialog
- [ ] Cancel button closes dialog without deleting
- [ ] Confirm button deletes subcategory
- [ ] Success alert appears
- [ ] Subcategory removed from table

#### Filter Functionality
- [ ] "All" tab shows all subcategories
- [ ] "Men" tab shows only men's subcategories
- [ ] "Women" tab shows only women's subcategories
- [ ] Count badges show correct numbers

#### Validation
- [ ] Cannot create subcategory without name
- [ ] Cannot create subcategory without category
- [ ] Cannot create duplicate subcategory in same category
- [ ] Error message shows for duplicate attempts

### Products Page (`/admin/products`)

#### Subcategory Dropdown
- [ ] Product form shows "Subcategory" field
- [ ] Dropdown is empty initially (shows "Select a subcategory")
- [ ] After selecting category, dropdown populates with subcategories
- [ ] Only shows subcategories for selected category
- [ ] Dropdown includes "+ Add New Subcategory" option at bottom

#### Inline Subcategory Creation
- [ ] Click "+ Add New Subcategory" in dropdown
- [ ] Dropdown is replaced with input field and buttons
- [ ] Input field is focused automatically
- [ ] Can type new subcategory name
- [ ] "Create" button is visible
- [ ] "Cancel" button is visible
- [ ] Click "Cancel" returns to dropdown
- [ ] Click "Create" with empty input shows error
- [ ] Click "Create" with valid name creates subcategory
- [ ] Success alert appears
- [ ] Input field is replaced with dropdown
- [ ] New subcategory is auto-selected in dropdown
- [ ] Can continue filling product form normally

#### Category Change Behavior
- [ ] Change category from Men to Women
- [ ] Subcategory dropdown updates to show women's subcategories
- [ ] Previously selected subcategory is cleared
- [ ] Change back to Men updates dropdown again

#### Product Creation with Subcategory
- [ ] Can create product with existing subcategory
- [ ] Can create product with newly created subcategory
- [ ] Product saves with correct subcategory value

## Frontend Tests

### Navbar (`components/shell/site-header.tsx`)

#### Men's Dropdown
- [ ] Hover over "MEN JEANS" shows dropdown
- [ ] Dropdown shows "All Jeans" as first item
- [ ] Dropdown shows all active men's subcategories
- [ ] Subcategories appear in correct display order
- [ ] Inactive subcategories are NOT shown
- [ ] Click "All Jeans" goes to `/men`
- [ ] Click subcategory goes to `/men?subcategory=slug`

#### Women's Dropdown
- [ ] Hover over "WOMEN JEANS" shows dropdown
- [ ] Dropdown shows "All Jeans" as first item
- [ ] Dropdown shows all active women's subcategories
- [ ] Subcategories appear in correct display order
- [ ] Inactive subcategories are NOT shown
- [ ] Click "All Jeans" goes to `/women`
- [ ] Click subcategory goes to `/women?subcategory=slug`

#### Empty State
- [ ] If no subcategories exist, dropdown shows "No subcategories"
- [ ] "All Jeans" link still works

### Men's Page (`/men`)

#### Default View
- [ ] Page loads at `/men`
- [ ] Shows "ALL PRODUCTS" heading
- [ ] Shows correct product count
- [ ] Displays all men's products
- [ ] No "Clear Filter" button visible

#### Filtered View
- [ ] Navigate to `/men?subcategory=straight-fit`
- [ ] Heading changes to "STRAIGHT FIT"
- [ ] Shows filtered product count
- [ ] Only shows products with matching subcategory
- [ ] "Clear Filter" button is visible
- [ ] Click "Clear Filter" returns to `/men`

#### No Results
- [ ] Filter by subcategory with no products
- [ ] Shows "0 items"
- [ ] Shows empty state or no products message

### Women's Page (`/women`)

#### Default View
- [ ] Page loads at `/women`
- [ ] Shows "ALL PRODUCTS" heading
- [ ] Shows correct product count
- [ ] Displays all women's products
- [ ] No "Clear Filter" button visible

#### Filtered View
- [ ] Navigate to `/women?subcategory=flair`
- [ ] Heading changes to "FLAIR"
- [ ] Shows filtered product count
- [ ] Only shows products with matching subcategory
- [ ] "Clear Filter" button is visible
- [ ] Click "Clear Filter" returns to `/women`

## Integration Tests

### End-to-End Flow 1: Create and Use Subcategory
1. [ ] Login to admin panel
2. [ ] Go to Subcategories page
3. [ ] Create new subcategory "Test Fit" for Men
4. [ ] Go to Products page
5. [ ] Create new product with "Test Fit" subcategory
6. [ ] Logout and visit homepage
7. [ ] Hover over "MEN JEANS"
8. [ ] Verify "Test Fit" appears in dropdown
9. [ ] Click "Test Fit"
10. [ ] Verify product appears in filtered view

### End-to-End Flow 2: Inline Creation
1. [ ] Login to admin panel
2. [ ] Go to Products page
3. [ ] Click "Add Product"
4. [ ] Select category "Women"
5. [ ] In subcategory dropdown, select "+ Add New Subcategory"
6. [ ] Type "Skinny Fit"
7. [ ] Click "Create"
8. [ ] Verify "Skinny Fit" is selected
9. [ ] Complete and save product
10. [ ] Visit homepage
11. [ ] Hover over "WOMEN JEANS"
12. [ ] Verify "Skinny Fit" appears in dropdown

### End-to-End Flow 3: Edit and Verify
1. [ ] Login to admin panel
2. [ ] Go to Subcategories page
3. [ ] Edit existing subcategory name
4. [ ] Save changes
5. [ ] Visit homepage
6. [ ] Verify updated name appears in navbar dropdown

### End-to-End Flow 4: Display Order
1. [ ] Login to admin panel
2. [ ] Go to Subcategories page
3. [ ] Create 3 subcategories with orders: 2, 0, 1
4. [ ] Visit homepage
5. [ ] Hover over dropdown
6. [ ] Verify order is: 0, 1, 2 (not 2, 0, 1)

### End-to-End Flow 5: Active/Inactive
1. [ ] Login to admin panel
2. [ ] Go to Subcategories page
3. [ ] Edit a subcategory and uncheck "Active"
4. [ ] Save changes
5. [ ] Visit homepage
6. [ ] Hover over dropdown
7. [ ] Verify inactive subcategory is NOT shown
8. [ ] Go back to admin
9. [ ] Verify products still have that subcategory

## Edge Cases

### Duplicate Prevention
- [ ] Try creating two subcategories with same name in same category
- [ ] Verify error message appears
- [ ] Verify second one is NOT created

### Cross-Category Duplicates
- [ ] Create "Straight Fit" for Men
- [ ] Create "Straight Fit" for Women
- [ ] Verify both are created successfully
- [ ] Verify each appears in correct dropdown

### Special Characters
- [ ] Create subcategory with name "Slim & Fit"
- [ ] Verify slug is generated correctly (e.g., "slim-fit")
- [ ] Verify filtering works with generated slug

### Long Names
- [ ] Create subcategory with very long name (50+ characters)
- [ ] Verify it displays correctly in table
- [ ] Verify it displays correctly in dropdown
- [ ] Verify it displays correctly in filtered view

### Empty Database
- [ ] Delete all subcategories
- [ ] Visit homepage
- [ ] Hover over dropdowns
- [ ] Verify "No subcategories" message appears
- [ ] Verify "All Jeans" link still works

## Performance Tests

- [ ] Create 20+ subcategories
- [ ] Verify navbar loads quickly
- [ ] Verify dropdown renders smoothly
- [ ] Verify admin table loads quickly
- [ ] Verify filtering is instant

## Mobile Tests

- [ ] Open site on mobile device
- [ ] Verify mobile menu works
- [ ] Verify subcategories appear in mobile menu
- [ ] Verify filtering works on mobile
- [ ] Verify admin panel is usable on mobile

## Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

## Error Handling

- [ ] Disconnect from database
- [ ] Try to fetch subcategories
- [ ] Verify graceful error handling
- [ ] Reconnect database
- [ ] Verify system recovers

## Security Tests

- [ ] Try accessing `/admin/subcategories` without login
- [ ] Verify redirect to login page
- [ ] Try API calls without authentication
- [ ] Verify 401/403 responses

## Cleanup

- [ ] Delete test subcategories
- [ ] Delete test products
- [ ] Verify system is clean for production

## Sign-Off

- [ ] All tests passed
- [ ] No console errors
- [ ] No broken links
- [ ] Documentation is accurate
- [ ] Ready for production

---

**Tested By:** _______________  
**Date:** _______________  
**Notes:** _______________
