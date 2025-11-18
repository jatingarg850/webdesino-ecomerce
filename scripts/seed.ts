import mongoose from 'mongoose';
import Product from '../models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webdesino';

const products = [
  // Men's Products
  {
    name: 'Classic Cotton T-Shirt',
    slug: 'classic-cotton-tshirt',
    description: 'Premium quality cotton t-shirt for everyday comfort',
    price: 699,
    oldPrice: 999,
    category: 'men',
    subcategory: 'tshirts',
    images: ['/clothes/vyjby_512.webp'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 30
  },
  {
    name: 'Premium Hoodie',
    slug: 'premium-hoodie',
    description: 'Warm and stylish hoodie perfect for winter',
    price: 1299,
    oldPrice: 1799,
    category: 'men',
    subcategory: 'hoodies',
    images: ['/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Navy'],
    inStock: true,
    featured: true,
    badge: 'SALE',
    discount: 28
  },
  {
    name: 'Casual Shirt',
    slug: 'casual-shirt',
    description: 'Comfortable casual shirt for any occasion',
    price: 899,
    oldPrice: 1299,
    category: 'men',
    subcategory: 'shirts',
    images: ['/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 31
  },
  {
    name: 'Formal Blazer',
    slug: 'formal-blazer',
    description: 'Elegant blazer for formal occasions',
    price: 2499,
    oldPrice: 3499,
    category: 'men',
    subcategory: 'formal',
    images: ['/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 29
  },
  
  // Women's Products
  {
    name: 'Elegant Dress',
    slug: 'elegant-dress',
    description: 'Beautiful dress perfect for any occasion',
    price: 1999,
    oldPrice: 2999,
    category: 'women',
    subcategory: 'dresses',
    images: ['/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black', 'Blue', 'White'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 33
  },
  {
    name: 'Casual Top',
    slug: 'casual-top',
    description: 'Comfortable and stylish casual top',
    price: 799,
    oldPrice: 1199,
    category: 'women',
    subcategory: 'tops',
    images: ['/clothes/vyjby_512.webp'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Pink', 'Blue'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 33
  },
  {
    name: 'Designer Blouse',
    slug: 'designer-blouse',
    description: 'Elegant designer blouse for special occasions',
    price: 1299,
    oldPrice: 1899,
    category: 'women',
    subcategory: 'tops',
    images: ['/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 32
  },
  {
    name: 'Stylish Jacket',
    slug: 'stylish-jacket',
    description: 'Trendy jacket for the fashion-forward',
    price: 2199,
    oldPrice: 3199,
    category: 'women',
    subcategory: 'jackets',
    images: ['/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Brown', 'Grey'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 31
  },
  
  // Kids Products
  {
    name: 'Kids T-Shirt',
    slug: 'kids-tshirt',
    description: 'Comfortable t-shirt for active kids',
    price: 499,
    oldPrice: 699,
    category: 'kids',
    subcategory: 'tshirts',
    images: ['/clothes/vyjby_512.webp'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Blue', 'Red', 'Yellow', 'Green'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 29
  },
  {
    name: 'Cute Hoodie',
    slug: 'cute-hoodie',
    description: 'Warm and cozy hoodie for kids',
    price: 899,
    oldPrice: 1299,
    category: 'kids',
    subcategory: 'hoodies',
    images: ['/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Pink', 'Blue', 'Grey'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 31
  },
  {
    name: 'Party Dress',
    slug: 'party-dress',
    description: 'Beautiful dress for special occasions',
    price: 1299,
    oldPrice: 1899,
    category: 'kids',
    subcategory: 'dresses',
    images: ['/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Pink', 'White', 'Blue'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 32
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket-kids',
    description: 'Stylish denim jacket for kids',
    price: 1199,
    oldPrice: 1699,
    category: 'kids',
    subcategory: 'jackets',
    images: ['/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 29
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    await Product.insertMany(products);
    console.log(`✓ Inserted ${products.length} products`);

    console.log('✓ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  }
}

seed();
