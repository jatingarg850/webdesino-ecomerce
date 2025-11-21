import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BrandSchema = new mongoose.Schema({
  name: String,
  slug: String,
  logo: String,
  description: String,
  featured: Boolean,
  active: Boolean,
}, { timestamps: true });

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);

const brands = [
  {
    name: 'Urban Threads',
    slug: 'urban-threads',
    logo: '/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg',
    description: 'Contemporary streetwear for the modern generation',
    featured: true,
    active: true,
  },
  {
    name: 'Classic Elegance',
    slug: 'classic-elegance',
    logo: '/clothes/two-fashion-designers-atelier-with-dress-form.jpg',
    description: 'Timeless fashion with a touch of sophistication',
    featured: true,
    active: true,
  },
  {
    name: 'Casual Vibes',
    slug: 'casual-vibes',
    logo: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg',
    description: 'Comfortable everyday wear for all occasions',
    featured: true,
    active: true,
  },
  {
    name: 'Elite Fashion',
    slug: 'elite-fashion',
    logo: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg',
    description: 'Premium designer collections for discerning tastes',
    featured: false,
    active: true,
  },
  {
    name: 'Street Culture',
    slug: 'street-culture',
    logo: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg',
    description: 'Bold and edgy styles inspired by urban culture',
    featured: false,
    active: true,
  },
  {
    name: 'Heritage Wear',
    slug: 'heritage-wear',
    logo: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg',
    description: 'Traditional designs with a modern twist',
    featured: false,
    active: true,
  },
];

async function seedBrands() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Brand.deleteMany({});
    console.log('✓ Cleared existing brands');

    await Brand.insertMany(brands);
    console.log(`✓ Seeded ${brands.length} brands`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('Error seeding brands:', error);
    process.exit(1);
  }
}

seedBrands();
