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
  // Men's Jeans - Straight Fit
  {
    name: 'Classic Blue Straight Jeans',
    slug: 'classic-blue-straight-jeans',
    description: 'Timeless straight fit jeans in classic blue denim. Perfect balance of style and comfort for everyday wear.',
    price: 2499,
    oldPrice: 3999,
    category: 'men',
    subcategory: 'Straight Fit',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743836/POCKET MOUSE-products/nwnfgeaujg3tj3ohraw2.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743838/POCKET MOUSE-products/visdh1buxxukrc0rsche.png',
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Dark Blue', 'Light Blue'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 38,
  },
  {
    name: 'Black Straight Fit Denim',
    slug: 'black-straight-fit-denim',
    description: 'Versatile black straight fit jeans. Goes with everything in your wardrobe.',
    price: 2299,
    oldPrice: 3499,
    category: 'men',
    subcategory: 'Straight Fit',
    brand: 'Classic Elegance',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743839/POCKET MOUSE-products/veh4mefneuqibhj894oi.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743841/POCKET MOUSE-products/jp9xgfuqipq8cza7mqje.png',
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Charcoal'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 34,
  },
  {
    name: 'Grey Straight Jeans',
    slug: 'grey-straight-jeans',
    description: 'Sophisticated grey straight fit jeans. Perfect for casual and semi-formal occasions.',
    price: 2599,
    oldPrice: 3799,
    category: 'men',
    subcategory: 'Straight Fit',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743845/POCKET MOUSE-products/kzj2j4ghh2azsanvohev.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743847/POCKET MOUSE-products/ji98hphnq9diwozhshwg.png',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Grey', 'Light Grey', 'Dark Grey'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 32,
  },

  // Men's Jeans - Loose Fit
  {
    name: 'Comfort Loose Fit Jeans',
    slug: 'comfort-loose-fit-jeans',
    description: 'Ultra-comfortable loose fit jeans. All-day comfort with a relaxed style.',
    price: 2399,
    oldPrice: 3599,
    category: 'men',
    subcategory: 'Loose Fit',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743848/POCKET MOUSE-products/hri0bhipyqansz4nhfbk.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743849/POCKET MOUSE-products/b9eng4lqdrakx5pqb4o6.png',
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 33,
  },
  {
    name: 'Dark Wash Loose Jeans',
    slug: 'dark-wash-loose-jeans',
    description: 'Premium dark wash loose fit jeans. Sophisticated look with relaxed comfort.',
    price: 2699,
    oldPrice: 3999,
    category: 'men',
    subcategory: 'Loose Fit',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743851/POCKET MOUSE-products/lxl13mdavpv9vthwrgmh.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743853/POCKET MOUSE-products/fiixmectfig6awj77gfy.png',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'TRENDING',
    discount: 33,
  },

  // Men's Jeans - Baggy Fit
  {
    name: 'Street Style Baggy Jeans',
    slug: 'street-style-baggy-jeans',
    description: 'Trendy baggy fit jeans. Perfect for street style and urban fashion.',
    price: 2799,
    oldPrice: 4299,
    category: 'men',
    subcategory: 'Baggy Fit',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743842/POCKET MOUSE-products/jmbdt5ocoz9ypqge4gxy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743843/POCKET MOUSE-products/uwft8ewgofrthhfbnp17.png',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'SALE',
    discount: 35,
  },
  {
    name: 'Vintage Baggy Denim',
    slug: 'vintage-baggy-denim',
    description: 'Retro-inspired baggy jeans. Make a bold fashion statement.',
    price: 2899,
    oldPrice: 4199,
    category: 'men',
    subcategory: 'Baggy Fit',
    brand: 'Heritage Wear',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743855/POCKET MOUSE-products/vbdd3romfa74bqnq8ufy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743857/POCKET MOUSE-products/pmyj9c8ll1mc17k3nf4m.png',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 31,
  },

  // Women's Jeans - Flair Jeans
  {
    name: 'Classic Flair Jeans',
    slug: 'classic-flair-jeans',
    description: 'Elegant flair jeans with a flattering fit. Perfect for a sophisticated look.',
    price: 2399,
    oldPrice: 3599,
    category: 'women',
    subcategory: 'Flair Jeans',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743858/POCKET MOUSE-products/alu42vokdaksx8ctw907.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743859/POCKET MOUSE-products/voeontdjfmbqdx7jovz6.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 33,
  },
  {
    name: 'High Waist Flair Denim',
    slug: 'high-waist-flair-denim',
    description: 'Trendy high waist flair jeans. Flattering silhouette with modern style.',
    price: 2599,
    oldPrice: 3799,
    category: 'women',
    subcategory: 'Flair Jeans',
    brand: 'Classic Elegance',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743861/POCKET MOUSE-products/yxhaapf7abrcxvtkzzga.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743862/POCKET MOUSE-products/pvajv1iiyd4dne59nslb.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Light Blue'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 32,
  },

  // Women's Jeans - Straight Jeans
  {
    name: 'Straight Leg Blue Jeans',
    slug: 'straight-leg-blue-jeans',
    description: 'Versatile straight leg jeans. Perfect balance of comfort and style.',
    price: 2299,
    oldPrice: 3499,
    category: 'women',
    subcategory: 'Straight Jeans',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743864/POCKET MOUSE-products/kla7o9djprwvh8jpqbm8.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743866/POCKET MOUSE-products/ak53xwcs7yushqnegbcs.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'NEW',
    discount: 34,
  },
  {
    name: 'Black Straight Fit Jeans',
    slug: 'black-straight-fit-jeans-women',
    description: 'Classic black straight jeans. Essential wardrobe staple.',
    price: 2499,
    oldPrice: 3699,
    category: 'women',
    subcategory: 'Straight Jeans',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743867/POCKET MOUSE-products/m4jbmqmg0mhgmmzywgnj.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743869/POCKET MOUSE-products/jdfhpub8vsyv3w8qnb0p.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 32,
  },

  // Women's Jeans - Bell Bottom
  {
    name: 'Retro Bell Bottom Jeans',
    slug: 'retro-bell-bottom-jeans',
    description: 'Vintage-inspired bell bottom jeans. Make a statement with 70s style.',
    price: 2799,
    oldPrice: 4199,
    category: 'women',
    subcategory: 'Bell Bottom',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743871/POCKET MOUSE-products/z0multvumb1afuebpu3n.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743873/POCKET MOUSE-products/d29tzk8k9nodrecelpyv.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 33,
  },
  {
    name: 'High Rise Bell Bottom',
    slug: 'high-rise-bell-bottom',
    description: 'Fashion-forward high rise bell bottom jeans. Contemporary twist on a classic.',
    price: 2899,
    oldPrice: 4299,
    category: 'women',
    subcategory: 'Bell Bottom',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743874/POCKET MOUSE-products/kpecohrmwxodhvhsec5o.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743876/POCKET MOUSE-products/cy5kpn46wif62c7w35m2.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 33,
  },

  // Women's Jeans - Baggy
  {
    name: 'Baggy Boyfriend Jeans',
    slug: 'baggy-boyfriend-jeans',
    description: 'Relaxed baggy boyfriend jeans. Comfortable and stylish.',
    price: 2199,
    oldPrice: 3299,
    category: 'women',
    subcategory: 'Baggy',
    brand: 'Street Culture',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743878/POCKET MOUSE-products/xnp9tmvmzkfgot5erzlt.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743880/POCKET MOUSE-products/l5bgkhb9xjbtgsuejdjw.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'SALE',
    discount: 33,
  },
  {
    name: 'Oversized Baggy Denim',
    slug: 'oversized-baggy-denim',
    description: 'Trendy oversized baggy jeans. Perfect for street style fashion.',
    price: 2399,
    oldPrice: 3599,
    category: 'women',
    subcategory: 'Baggy',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743882/POCKET MOUSE-products/yikisoiug6vkyzoaybo5.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743883/POCKET MOUSE-products/edsgbdfphdwv8clyjye5.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Light Blue', 'Blue'],
    inStock: true,
    featured: false,
    badge: 'NEW',
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

    console.log('\n📊 Products by category:');
    console.log('Men\'s Jeans:');
    console.log('  - Straight Fit: 3 products');
    console.log('  - Loose Fit: 2 products');
    console.log('  - Baggy Fit: 2 products');
    console.log('\nWomen\'s Jeans:');
    console.log('  - Flair Jeans: 2 products');
    console.log('  - Straight Jeans: 2 products');
    console.log('  - Bell Bottom: 2 products');
    console.log('  - Baggy: 2 products');

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    console.log('🎉 Jeans store is ready with correct categories!');
  } catch (error) {
    console.error('Error seeding jeans:', error);
    process.exit(1);
  }
}

seedJeans();
