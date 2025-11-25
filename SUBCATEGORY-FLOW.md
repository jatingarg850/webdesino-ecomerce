# Subcategory System Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐      ┌──────────────────────┐   │
│  │  Subcategories Page  │      │   Products Page      │   │
│  │  /admin/subcategories│      │  /admin/products     │   │
│  └──────────┬───────────┘      └──────────┬───────────┘   │
│             │                               │               │
│             │ CRUD Operations               │ Create Only   │
│             │                               │               │
└─────────────┼───────────────────────────────┼───────────────┘
              │                               │
              └───────────┬───────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  API: /api/admin/     │
              │    subcategories      │
              │                       │
              │  GET, POST,           │
              │  PATCH, DELETE        │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   MongoDB Database    │
              │                       │
              │  Subcategory Model    │
              │  - name               │
              │  - slug               │
              │  - category           │
              │  - displayOrder       │
              │  - isActive           │
              └───────────┬───────────┘
                          │
                          │ Fetch Active Only
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐                                   │
│  │   Navbar Component   │                                   │
│  │                      │                                   │
│  │  ┌────────────────┐  │                                   │
│  │  │ Men's Dropdown │  │  Fetches: /api/admin/            │
│  │  │  - All Jeans   │  │           subcategories?         │
│  │  │  - Straight    │◄─┼───────────category=men           │
│  │  │  - Baggy       │  │                                   │
│  │  │  - Loose       │  │                                   │
│  │  └────────────────┘  │                                   │
│  │                      │                                   │
│  │  ┌────────────────┐  │                                   │
│  │  │Women's Dropdown│  │  Fetches: /api/admin/            │
│  │  │  - All Jeans   │  │           subcategories?         │
│  │  │  - Flair       │◄─┼───────────category=women         │
│  │  │  - Bell Bottom │  │                                   │
│  │  │  - Straight    │  │                                   │
│  │  └────────────────┘  │                                   │
│  └──────────┬───────────┘                                   │
│             │                                                │
│             │ User Clicks Subcategory                        │
│             │                                                │
│             ▼                                                │
│  ┌──────────────────────┐                                   │
│  │   Category Pages     │                                   │
│  │                      │                                   │
│  │  /men?subcategory=   │                                   │
│  │       straight-fit   │                                   │
│  │                      │                                   │
│  │  Filters products    │                                   │
│  │  by subcategory slug │                                   │
│  └──────────────────────┘                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Creating a Subcategory

### Method 1: From Subcategories Page

```
Admin User
    │
    ▼
Opens /admin/subcategories
    │
    ▼
Clicks "Add Subcategory"
    │
    ▼
Fills Form:
  - Name: "Straight Fit"
  - Category: "men"
  - Display Order: 0
  - Active: true
    │
    ▼
Clicks "Create Subcategory"
    │
    ▼
POST /api/admin/subcategories
    │
    ├─► Validates data
    ├─► Generates slug: "straight-fit"
    ├─► Checks for duplicates
    └─► Saves to MongoDB
    │
    ▼
Success Response
    │
    ▼
Page Refreshes
    │
    ▼
Subcategory appears in table
    │
    ▼
Customer visits site
    │
    ▼
Navbar fetches subcategories
    │
    ▼
"Straight Fit" appears in Men's dropdown
```

### Method 2: From Product Form

```
Admin User
    │
    ▼
Opens /admin/products
    │
    ▼
Clicks "Add Product"
    │
    ▼
Selects Category: "men"
    │
    ├─► Triggers fetch:
    │   GET /api/admin/subcategories?category=men
    │
    ▼
Subcategory dropdown populates
    │
    ▼
Clicks "+ Add New Subcategory"
    │
    ▼
Inline input appears
    │
    ▼
Types "Baggy Fit"
    │
    ▼
Clicks "Create"
    │
    ▼
POST /api/admin/subcategories
  {
    name: "Baggy Fit",
    category: "men",
    isActive: true
  }
    │
    ▼
Success Response
    │
    ├─► Subcategory saved to DB
    ├─► Dropdown refreshes
    └─► "Baggy Fit" auto-selected
    │
    ▼
Admin continues filling product form
    │
    ▼
Saves product with subcategory: "Baggy Fit"
```

## Customer Journey: Browsing by Subcategory

```
Customer visits homepage
    │
    ▼
Hovers over "MEN JEANS"
    │
    ├─► Navbar component mounted
    ├─► useEffect triggers
    └─► Fetches: GET /api/admin/subcategories?category=men
    │
    ▼
Dropdown shows:
  - All Jeans
  - Straight Fit
  - Baggy Fit
  - Loose Fit
    │
    ▼
Clicks "Straight Fit"
    │
    ▼
Navigates to: /men?subcategory=straight-fit
    │
    ├─► Page reads URL parameter
    ├─► Fetches all men's products
    └─► Filters where subcategory slug = "straight-fit"
    │
    ▼
Displays filtered products
    │
    ▼
Shows "STRAIGHT FIT" heading
Shows "X items" count
Shows "Clear Filter" button
```

## Edit/Delete Flow

### Editing a Subcategory

```
Admin → /admin/subcategories
    │
    ▼
Clicks Edit icon on "Straight Fit"
    │
    ▼
Modal opens with current data
    │
    ▼
Changes name to "Classic Straight"
    │
    ▼
Clicks "Update Subcategory"
    │
    ▼
PATCH /api/admin/subcategories
  {
    subcategoryId: "xxx",
    name: "Classic Straight",
    updatedAt: new Date()
  }
    │
    ├─► Generates new slug: "classic-straight"
    └─► Updates in MongoDB
    │
    ▼
Success → Table refreshes
    │
    ▼
Navbar automatically shows new name on next page load
```

### Deleting a Subcategory

```
Admin → /admin/subcategories
    │
    ▼
Clicks Delete icon on "Loose Fit"
    │
    ▼
Confirmation dialog appears
    │
    ▼
Confirms deletion
    │
    ▼
DELETE /api/admin/subcategories?subcategoryId=xxx
    │
    ├─► Finds subcategory in DB
    └─► Deletes document
    │
    ▼
Success → Table refreshes
    │
    ▼
"Loose Fit" removed from table
    │
    ▼
Navbar no longer shows "Loose Fit"
    │
    ▼
Existing products with "Loose Fit" unchanged
(They keep the subcategory value)
```

## State Management

### Navbar Component State

```javascript
const [menSubcategories, setMenSubcategories] = useState([]);
const [womenSubcategories, setWomenSubcategories] = useState([]);

useEffect(() => {
  // Fetch on mount
  fetchSubcategories();
}, []);

// Renders dropdowns with fetched data
```

### Product Form State

```javascript
const [subcategories, setSubcategories] = useState([]);
const [formData, setFormData] = useState({ category: 'men', ... });

useEffect(() => {
  // Re-fetch when category changes
  if (formData.category) {
    fetchSubcategories(formData.category);
  }
}, [formData.category]);

// Dropdown shows filtered subcategories
```

### Category Page State

```javascript
const subcategoryFilter = useSearchParams().get('subcategory');
const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  // Filter when URL param changes
  if (subcategoryFilter) {
    const filtered = products.filter(p => 
      p.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategoryFilter
    );
    setFilteredProducts(filtered);
  }
}, [subcategoryFilter, products]);
```

## Key Integration Points

1. **Admin Layout** → Added "Subcategories" menu item
2. **Product Form** → Dropdown + inline creation
3. **Navbar** → Dynamic fetching and rendering
4. **Category Pages** → URL-based filtering
5. **Database** → Centralized source of truth

## Security & Validation

```
Admin Actions
    │
    ▼
Check Authentication
    │
    ├─► No auth → Redirect to /admin
    └─► Has auth → Continue
    │
    ▼
API Request
    │
    ├─► Validate required fields
    ├─► Check for duplicates
    ├─► Sanitize input
    └─► Generate slug
    │
    ▼
Database Operation
    │
    ├─► Compound index prevents duplicates
    └─► Schema validation
    │
    ▼
Success/Error Response
```
