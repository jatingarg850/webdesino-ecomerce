# Trending Categories Visual Guide

## Admin Interface Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ADMIN PANEL - Trending Categories                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Trending Categories                    [+ Add Category]        │
│  Manage homepage trending categories with cover images          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  [Image]     │  │  [Image]     │  │  [Image]     │         │
│  │              │  │              │  │              │         │
│  │  Order: 0    │  │  Order: 1    │  │  Order: 2    │         │
│  │  ● Active    │  │  ● Active    │  │  ○ Inactive  │         │
│  │              │  │              │  │              │         │
│  │ Men's Jeans  │  │Women's Jeans │  │  Slim Fit    │         │
│  │ /men         │  │ /women       │  │ /men?sub=... │         │
│  │              │  │              │  │              │         │
│  │ [Edit][Del]  │  │ [Edit][Del]  │  │ [Edit][Del]  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Create/Edit Modal

```
┌─────────────────────────────────────────────────────┐
│  Add Trending Category                          [X] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Category Name *                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ Men's Jeans                                    │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Cover Image *                                       │
│  ┌────────────────────────────────────────────────┐ │
│  │                                                │ │
│  │     [Upload Image]                             │ │
│  │     or drag and drop                           │ │
│  │                                                │ │
│  └────────────────────────────────────────────────┘ │
│  Recommended: 800x600px (4:3 ratio)                 │
│                                                      │
│  Link URL *                                          │
│  ┌────────────────────────────────────────────────┐ │
│  │ /men                                           │ │
│  └────────────────────────────────────────────────┘ │
│  Where should this category link to?                │
│                                                      │
│  Display Order                                       │
│  ┌────────────────────────────────────────────────┐ │
│  │ 0                                              │ │
│  └────────────────────────────────────────────────┘ │
│  Lower numbers appear first on homepage             │
│                                                      │
│  ☑ Active (Show on homepage)                        │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │         Create Category                        │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Homepage Display

```
┌─────────────────────────────────────────────────────────────────┐
│                        HOMEPAGE                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TRENDING CATEGORIES                            View All →      │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │          │  │          │  │          │  │          │       │
│  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │       │
│  │          │  │          │  │          │  │          │       │
│  │  Men's   │  │ Women's  │  │  Slim    │  │ Designer │       │
│  │  Jeans   │  │  Jeans   │  │   Fit    │  │  Denim   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │          │  │          │  │          │  │          │       │
│  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │       │
│  │          │  │          │  │          │  │          │       │
│  │  Baggy   │  │  Skinny  │  │  Flair   │  │  Sale    │       │
│  │  Jeans   │  │  Jeans   │  │  Jeans   │  │  Items   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN CREATES CATEGORY                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Admin fills form │
                    │  - Name           │
                    │  - Image          │
                    │  - Link URL       │
                    │  - Display Order  │
                    │  - Active status  │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Upload to        │
                    │ Cloudinary       │
                    │ (returns URL)    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ POST /api/admin/ │
                    │ trending-        │
                    │ categories       │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Save to MongoDB  │
                    │ - Generate slug  │
                    │ - Validate data  │
                    │ - Store record   │
                    └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER VIEWS HOMEPAGE                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Server fetches   │
                    │ active categories│
                    │ from MongoDB     │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Sort by          │
                    │ displayOrder     │
                    │ (ascending)      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Render grid      │
                    │ with images      │
                    │ from Cloudinary  │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Customer clicks  │
                    │ category         │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Navigate to      │
                    │ linkUrl          │
                    │ (e.g., /men)     │
                    └──────────────────┘
```

## Category Card States

### Active Category
```
┌──────────────────┐
│   [Cover Image]  │
│                  │
│   Order: 0       │
│   ● Active       │
│                  │
│   Men's Jeans    │
│   /men           │
│                  │
│  [Edit] [Delete] │
└──────────────────┘
```

### Inactive Category
```
┌──────────────────┐
│   [Cover Image]  │
│   (grayed out)   │
│   Order: 5       │
│   ○ Inactive     │
│                  │
│   Summer Sale    │
│   /sale          │
│                  │
│  [Edit] [Delete] │
└──────────────────┘
```

### Hover State
```
┌──────────────────┐
│   [Cover Image]  │
│   (scaled 1.05)  │
│   (shadow ↑)     │
│                  │
│   Men's Jeans    │
│   /men           │
│                  │
│  [Edit] [Delete] │
└──────────────────┘
```

## Mobile Layout

```
┌─────────────────────────┐
│  TRENDING CATEGORIES    │
│                         │
│  ┌─────────┐ ┌─────────┐
│  │         │ │         │
│  │ [IMG]   │ │ [IMG]   │
│  │         │ │         │
│  │ Men's   │ │ Women's │
│  │ Jeans   │ │ Jeans   │
│  └─────────┘ └─────────┘
│                         │
│  ┌─────────┐ ┌─────────┐
│  │         │ │         │
│  │ [IMG]   │ │ [IMG]   │
│  │         │ │         │
│  │ Slim    │ │Designer │
│  │ Fit     │ │ Denim   │
│  └─────────┘ └─────────┘
│                         │
└─────────────────────────┘
```

## Desktop Layout

```
┌───────────────────────────────────────────────────────────────┐
│              TRENDING CATEGORIES                View All →    │
│                                                                │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│  │      │  │      │  │      │  │      │  │      │  │      ││
│  │[IMG] │  │[IMG] │  │[IMG] │  │[IMG] │  │[IMG] │  │[IMG] ││
│  │      │  │      │  │      │  │      │  │      │  │      ││
│  │Men's │  │Women │  │Slim  │  │Baggy │  │Skinny│  │Sale  ││
│  │Jeans │  │Jeans │  │Fit   │  │Fit   │  │Jeans │  │Items ││
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘│
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

## Image Upload Flow

```
Step 1: Click Upload Area
┌────────────────────────┐
│                        │
│   Click to upload      │
│   or drag and drop     │
│                        │
└────────────────────────┘

Step 2: Select Image
┌────────────────────────┐
│  [File Browser Opens]  │
│                        │
│  Select: image.jpg     │
│  Size: 450KB           │
│  Dimensions: 800x600   │
└────────────────────────┘

Step 3: Uploading
┌────────────────────────┐
│  Uploading...          │
│  ████████░░░░ 75%      │
└────────────────────────┘

Step 4: Preview
┌────────────────────────┐
│  [Image Preview]       │
│                        │
│  ✓ Uploaded            │
│  [Change Image]        │
└────────────────────────┘
```

## Status Indicators

```
Active:    ● Active     (Green dot)
Inactive:  ○ Inactive   (Gray dot)
Order:     [0] [1] [2]  (Number badge)
```

## Button States

```
Normal:    [Edit]  [Delete]
Hover:     [Edit]  [Delete]  (darker background)
Loading:   [...]   [...]     (spinner)
Disabled:  [Edit]  [Delete]  (grayed out)
```

## Empty State

```
┌─────────────────────────────────────────┐
│                                         │
│         No trending categories          │
│              available                  │
│                                         │
│   Add trending categories from the      │
│           admin panel                   │
│                                         │
│        [+ Add Category]                 │
│                                         │
└─────────────────────────────────────────┘
```

## Success/Error Messages

```
Success:
┌─────────────────────────────────────────┐
│  ✓ Category created successfully!       │
└─────────────────────────────────────────┘

Error:
┌─────────────────────────────────────────┐
│  ✗ Failed to create category            │
│    Please try again                     │
└─────────────────────────────────────────┘

Confirmation:
┌─────────────────────────────────────────┐
│  Are you sure you want to delete        │
│  this trending category?                │
│                                         │
│     [Cancel]        [Delete]            │
└─────────────────────────────────────────┘
```

## Responsive Breakpoints

```
Mobile (< 768px):     2 columns
Tablet (768-1024px):  3 columns
Desktop (> 1024px):   4 columns
```

## Color Scheme

```
Active Badge:    Green (#10B981)
Inactive Badge:  Gray (#6B7280)
Edit Button:     Blue (#2563EB)
Delete Button:   Red (#DC2626)
Order Badge:     Black with opacity
```
