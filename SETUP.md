# Quick Setup Guide

## 1. Install MongoDB

### Windows
Download from: https://www.mongodb.com/try/download/community
Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Mac
```bash
brew install mongodb-community
brew services start mongodb-community
```

### Linux
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## 2. Configure Environment

Edit `.env.local` with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/webdesino-shoes
NEXTAUTH_SECRET=your-random-secret-key-here
```

Generate a secret key:
```bash
openssl rand -base64 32
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Seed Sample Data

```bash
npm run seed
```

This will create 3 sample shoe products in your database.

## 5. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Pages Available

- `/` - Home page with hero and categories
- `/products` - Product listing
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/admin` - Admin dashboard (create products)

## Test the App

1. Go to `/admin` and create a product
2. Browse products at `/products`
3. Click a product to view details
4. Add to cart and view at `/cart`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check service status
- Verify MONGODB_URI in `.env.local`

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found
```bash
npm install
```

## Next Steps

- Add image upload functionality
- Integrate Stripe payments
- Add user authentication
- Build order management
- Add email notifications
