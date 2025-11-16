import mongoose from 'mongoose';
import Product from '../models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webdesino-shoes';

const sampleProducts = [
  {
    title: 'Air Max Runner Pro',
    slug: 'air-max-runner-pro',
    description: 'Premium running shoes with advanced cushioning technology for maximum comfort during long runs.',
    brand: 'Nike',
    category: 'running',
    images: [],
    variants: [
      { sku: 'AMR-BLK-9', size: '9', color: 'Black', price: 129.99, stock: 15, reserved: 0 },
      { sku: 'AMR-BLK-10', size: '10', color: 'Black', price: 129.99, stock: 20, reserved: 0 },
      { sku: 'AMR-WHT-9', size: '9', color: 'White', price: 129.99, stock: 12, reserved: 0 }
    ],
    features: ['Breathable mesh upper', 'Air cushioning', 'Durable rubber outsole'],
    material: 'Synthetic mesh and rubber',
    careInstructions: 'Wipe clean with damp cloth',
    isFeatured: true,
    isNew: true
  },
  {
    title: 'Classic Leather Sneaker',
    slug: 'classic-leather-sneaker',
    description: 'Timeless leather sneakers that blend style and comfort for everyday wear.',
    brand: 'Adidas',
    category: 'sneakers',
    images: [],
    variants: [
      { sku: 'CLS-WHT-8', size: '8', color: 'White', price: 89.99, stock: 25, reserved: 0 },
      { sku: 'CLS-WHT-9', size: '9', color: 'White', price: 89.99, stock: 30, reserved: 0 },
      { sku: 'CLS-BLK-9', size: '9', color: 'Black', price: 89.99, stock: 18, reserved: 0 }
    ],
    features: ['Premium leather', 'Cushioned insole', 'Classic design'],
    material: 'Genuine leather',
    careInstructions: 'Clean with leather cleaner',
    isFeatured: true,
    isNew: false
  },
  {
    title: 'Urban Street Walker',
    slug: 'urban-street-walker',
    description: 'Casual shoes perfect for city walks and everyday adventures.',
    brand: 'Puma',
    category: 'casual',
    images: [],
    variants: [
      { sku: 'USW-GRY-9', size: '9', color: 'Grey', price: 74.99, stock: 22, reserved: 0 },
      { sku: 'USW-GRY-10', size: '10', color: 'Grey', price: 74.99, stock: 28, reserved: 0 },
      { sku: 'USW-BLU-9', size: '9', color: 'Blue', price: 74.99, stock: 15, reserved: 0 }
    ],
    features: ['Lightweight design', 'Flexible sole', 'All-day comfort'],
    material: 'Canvas and synthetic',
    careInstructions: 'Machine washable on gentle cycle',
    isFeatured: false,
    isNew: true
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Seeded sample products');

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
