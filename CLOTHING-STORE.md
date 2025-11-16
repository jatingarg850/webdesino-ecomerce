# Solued Store - Clothing E-commerce

## Overview
Transformed from a shoes e-commerce to a pop-culture clothing store inspired by The Souled Store.

## Key Features

### 🎨 Design
- Fandom-first approach (Marvel, DC, Harry Potter, Anime, etc.)
- Membership program with exclusive discounts
- Modern, responsive UI with Tailwind CSS
- Mega menu navigation with category organization

### 👕 Product Categories
- **Gender**: Men, Women, Kids, Unisex
- **Types**: T-Shirts, Oversized T-Shirts, Hoodies, Shirts, Joggers, Shorts, Dresses, Sweatshirts
- **Fandoms**: Marvel, DC, Harry Potter, Friends, Anime, Disney, Star Wars, Gaming

### 💎 Product Features
- Multiple size variants (XS to 3XL)
- Color options
- Regular pricing + Membership pricing
- New Arrivals & Limited Edition badges
- Fandom tagging

## Project Structure

```
app/
├── page.tsx                 # Homepage with hero, categories, fandoms
├── layout.tsx              # Root layout with header & footer
├── products/               # Product listing
├── c/[category]/          # Category pages
├── f/[fandom]/            # Fandom collection pages
├── new/                   # New arrivals
├── membership/            # Membership benefits
├── wishlist/              # Wishlist
├── account/               # User account
└── cart/                  # Shopping cart

components/
├── shell/
│   ├── site-header.tsx    # Header with mega menu
│   └── site-footer.tsx    # Footer
├── nav/
│   └── mega-menu.tsx      # Category mega menu
└── search/
    └── search-bar.tsx     # Search with autosuggest

models/
└── Product.ts             # Updated product schema for clothing
```

## Database Schema Changes

### Product Model Updates
- Changed `category` from shoes types to clothing types
- Added `gender` field (men/women/kids/unisex)
- Added `fandom` field for pop-culture collections
- Added `membershipPrice` to variants
- Added `isLimitedEdition` flag
- Added `tags` array for better filtering
- Updated size options to clothing sizes (XS-3XL)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Seed Sample Products
```bash
npm run seed:clothing
```

This will add 6 sample products:
- Marvel Avengers T-Shirt
- Harry Potter Oversized Tee
- DC Batman Hoodie
- Friends Central Perk Women's Tee
- Naruto Limited Edition Joggers
- Supima Cotton Basic Tee

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Key Pages

- **Homepage** (`/`) - Hero, gender categories, fandom collections
- **Products** (`/products`) - All products with filters
- **Category** (`/c/men-tshirts`) - Specific category pages
- **Fandom** (`/f/marvel`) - Fandom collection pages
- **New Arrivals** (`/new`) - Latest drops
- **Membership** (`/membership`) - Membership benefits & signup
- **Account** (`/account`) - User dashboard
- **Wishlist** (`/wishlist`) - Saved items

## Features to Implement

### Phase 1 (Core)
- [ ] Cart functionality with Zustand
- [ ] Product detail page with size selector
- [ ] Checkout flow
- [ ] User authentication
- [ ] Order management

### Phase 2 (Enhanced)
- [ ] Real search API integration
- [ ] Product filtering (size, color, price)
- [ ] Wishlist functionality
- [ ] Product reviews
- [ ] Size guide modal

### Phase 3 (Advanced)
- [ ] Membership subscription system
- [ ] Admin dashboard for product management
- [ ] Inventory management
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe/Razorpay)

## Styling

The design uses:
- **Primary Color**: Red (#DC2626) - for CTAs and accents
- **Typography**: Inter font family
- **Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React icons

## API Routes

- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get single product
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders

## Membership System

Members get:
- Extra 10% off on all products
- Early access to new drops
- Exclusive members-only products
- Special sale access

Pricing: ₹999/year

## Notes

- All product images are placeholders (emoji icons)
- Replace with real product images in production
- Add proper authentication before deploying
- Configure payment gateway for real transactions
- Set up proper email service for notifications

## Migration from Shoes Store

Key changes made:
1. Updated Product