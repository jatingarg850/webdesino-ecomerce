import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  oldPrice: Number,
  category: String,
  subcategory: String,
  brand: String,
  images: [String],
  sizes: [String],
  colors: [String],
  inStock: Boolean,
  featured: Boolean,
  badge: String,
  discount: Number,
  createdAt: Date,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const jeansProducts = [
  // Men's Jeans
  {
    name: 'Blue Jeans - Slim Fit',
    slug: 'blue-jeans-slim-fit',
    description: 'Classic blue denim jeans with a modern slim fit. Perfect for everyday wear with premium stretch fabric for maximum comfort.',
    price: 2499,
    oldPrice: 3999,
    category: 'men',
    subcategory: 'Slim Fit',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743836/webdesino-products/nwnfgeaujg3tj3ohraw2.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743838/webdesino-products/visdh1buxxukrc0rsche.png',
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Dark Blue', 'Light Blue'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 38,
  },
  {
    name: 'Black Denim - Regular Fit',
    slug: 'black-denim-regular-fit',
    description: 'Versatile black jeans with regular fit. Timeless style that goes with everything in your wardrobe.',
    price: 2299,
    oldPrice: 3499,
    category: 'men',
    subcategory: 'Regular Fit',
    brand: 'Classic Elegance',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743839/webdesino-products/veh4mefneuqibhj894oi.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743841/webdesino-products/jp9xgfuqipq8cza7mqje.png',
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Charcoal'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 34,
  },
  {
    name: 'Distressed Jeans - Skinny',
    slug: 'distressed-jeans-skinny',
    description: 'Edgy distressed jeans with skinny fit. Modern street style with premium quality denim.',
    price: 2799,
    oldPrice: 4299,
    category: 'men',
    subcategory: 'Skinny',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743842/webdesino-products/jmbdt5ocoz9ypqge4gxy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743843/webdesino-products/uwft8ewgofrthhfbnp17.png',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 35,
  },
  {
    name: 'Grey Jeans - Straight Fit',
    slug: 'grey-jeans-straight-fit',
    description: 'Sophisticated grey jeans with straight fit. Perfect for casual and semi-formal occasions.',
    price: 2599,
    oldPrice: 3799,
    category: 'men',
    subcategory: 'Straight',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743845/webdesino-products/kzj2j4ghh2azsanvohev.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743847/webdesino-products/ji98hphnq9diwozhshwg.png',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Grey', 'Light Grey', 'Dark Grey'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 32,
  },
  {
    name: 'Comfort Stretch Jeans - Relaxed',
    slug: 'comfort-stretch-jeans-relaxed',
    description: 'Ultra-comfortable relaxed fit jeans with stretch technology. All-day comfort guaranteed.',
    price: 2399,
    oldPrice: 3599,
    category: 'men',
    subcategory: 'Relaxed',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743848/webdesino-products/hri0bhipyqansz4nhfbk.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743849/webdesino-products/b9eng4lqdrakx5pqb4o6.png',
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: false,
    badge: 'TRENDING',
    discount: 33,
  },
  {
    name: 'Dark Wash Jeans - Slim Fit',
    slug: 'dark-wash-jeans-slim-fit',
    description: 'Premium dark wash jeans with slim fit. Sophisticated look for any occasion.',
    price: 2699,
    oldPrice: 3999,
    category: 'men',
    subcategory: 'Slim Fit',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743851/webdesino-products/lxl13mdavpv9vthwrgmh.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743853/webdesino-products/fiixmectfig6awj77gfy.png',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'SALE',
    discount: 33,
  },

  // Women's Jeans
  {
    name: 'High Waist Skinny Jeans',
    slug: 'high-waist-skinny-jeans',
    description: 'Flattering high waist skinny jeans. Perfect fit with stretch comfort for all-day wear.',
    price: 2399,
    oldPrice: 3599,
    category: 'women',
    subcategory: 'Skinny',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743855/webdesino-products/vbdd3romfa74bqnq8ufy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743857/webdesino-products/pmyj9c8ll1mc17k3nf4m.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 33,
  },
  {
    name: 'Bootcut Jeans - Classic Blue',
    slug: 'bootcut-jeans-classic-blue',
    description: 'Timeless bootcut jeans in classic blue. Vintage-inspired with modern comfort.',
    price: 2599,
    oldPrice: 3799,
    category: 'women',
    subcategory: 'Bootcut',
    brand: 'Classic Elegance',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743858/webdesino-products/alu42vokdaksx8ctw907.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743859/webdesino-products/voeontdjfmbqdx7jovz6.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Light Blue'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 32,
  },
  {
    name: 'Flare Jeans - Retro Style',
    slug: 'flare-jeans-retro-style',
    description: 'Trendy flare jeans with retro vibes. Make a statement with this 70s-inspired style.',
    price: 2799,
    oldPrice: 4199,
    category: 'women',
    subcategory: 'Flare',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743861/webdesino-products/yxhaapf7abrcxvtkzzga.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743862/webdesino-products/pvajv1iiyd4dne59nslb.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 33,
  },
  {
    name: 'Straight Leg Jeans - Mid Rise',
    slug: 'straight-leg-jeans-mid-rise',
    description: 'Versatile straight leg jeans with mid rise. Perfect balance of comfort and style.',
    price: 2299,
    oldPrice: 3499,
    category: 'women',
    subcategory: 'Straight',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743864/webdesino-products/kla7o9djprwvh8jpqbm8.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743866/webdesino-products/ak53xwcs7yushqnegbcs.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 34,
  },
  {
    name: 'High Waist Wide Leg Jeans',
    slug: 'high-waist-wide-leg-jeans',
    description: 'Fashion-forward high waist wide leg jeans. Contemporary style with ultimate comfort.',
    price: 2899,
    oldPrice: 4299,
    category: 'women',
    subcategory: 'High Waist',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743867/webdesino-products/m4jbmqmg0mhgmmzywgnj.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743869/webdesino-products/jdfhpub8vsyv3w8qnb0p.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 33,
  },
  {
    name: 'Low Rise Skinny Jeans',
    slug: 'low-rise-skinny-jeans',
    description: 'Trendy low rise skinny jeans. Y2K-inspired style with modern fit.',
    price: 2199,
    oldPrice: 3299,
    category: 'women',
    subcategory: 'Low Rise',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743871/webdesino-products/z0multvumb1afuebpu3n.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743873/webdesino-products/d29tzk8k9nodrecelpyv.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 33,
  },
  {
    name: 'Ripped Skinny Jeans - Black',
    slug: 'ripped-skinny-jeans-black',
    description: 'Edgy ripped skinny jeans in black. Street style essential with premium denim.',
    price: 2499,
    oldPrice: 3699,
    category: 'women',
    subcategory: 'Skinny',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743874/webdesino-products/kpecohrmwxodhvhsec5o.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743876/webdesino-products/cy5kpn46wif62c7w35m2.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Black'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 32,
  },
  {
    name: 'Mom Jeans - Light Wash',
    slug: 'mom-jeans-light-wash',
    description: 'Comfortable mom jeans with light wash. Relaxed fit with vintage appeal.',
    price: 2399,
    oldPrice: 3599,
    category: 'women',
    subcategory: 'High Waist',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743878/webdesino-products/xnp9tmvmzkfgot5erzlt.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743880/webdesino-products/l5bgkhb9xjbtgsuejdjw.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Light Blue', 'Blue'],
    inStock: true,
    featured: false,
    badge: 'TRENDING',
    discount: 33,
  },
];

async function seedJeans() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Delete all existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert new jeans products
    await Product.insertMany(jeansProducts);
    console.log(`✓ Seeded ${jeansProducts.length} jeans products`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    console.log('\n🎉 Jeans store is ready!');
  } catch (error) {
    console.error('Error seeding jeans:', error);
    process.exit(1);
  }
}

seedJeans();
