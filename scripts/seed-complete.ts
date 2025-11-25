import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Schemas
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

const SubcategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  displayOrder: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const TrendingCategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  coverImage: String,
  linkUrl: String,
  displayOrder: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
const TrendingCategory = mongoose.models.TrendingCategory || mongoose.model('TrendingCategory', TrendingCategorySchema);

// Subcategories Data
const subcategories = [
  // Men's Subcategories
  { name: 'Straight Fit', slug: 'straight-fit', category: 'men', displayOrder: 0, isActive: true },
  { name: 'Loose Fit', slug: 'loose-fit', category: 'men', displayOrder: 1, isActive: true },
  { name: 'Baggy Fit', slug: 'baggy-fit', category: 'men', displayOrder: 2, isActive: true },
  
  // Women's Subcategories
  { name: 'Flair Jeans', slug: 'flair-jeans', category: 'women', displayOrder: 0, isActive: true },
  { name: 'Straight Jeans', slug: 'straight-jeans', category: 'women', displayOrder: 1, isActive: true },
  { name: 'Bell Bottom', slug: 'bell-bottom', category: 'women', displayOrder: 2, isActive: true },
  { name: 'Baggy', slug: 'baggy', category: 'women', displayOrder: 3, isActive: true },
];

// Trending Categories Data
const trendingCategories = [
  {
    name: "Men's Jeans",
    slug: 'mens-jeans',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908721/webdesino-products/vnkbc2lpyedhv8alkzwp.jpg',
    linkUrl: '/men',
    displayOrder: 0,
    isActive: true,
  },
  {
    name: "Women's Jeans",
    slug: 'womens-jeans',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908722/webdesino-products/bfox9wx3jua0ie8zu0df.jpg',
    linkUrl: '/women',
    displayOrder: 1,
    isActive: true,
  },
  {
    name: 'Straight Fit',
    slug: 'straight-fit-category',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908725/webdesino-products/gmd0go065j8vsxzzzuf1.jpg',
    linkUrl: '/men?subcategory=straight-fit',
    displayOrder: 2,
    isActive: true,
  },
  {
    name: 'Baggy Jeans',
    slug: 'baggy-jeans',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908726/webdesino-products/kmfzxc1k7btmb3ddhjdv.jpg',
    linkUrl: '/men?subcategory=baggy-fit',
    displayOrder: 3,
    isActive: true,
  },
  {
    name: 'Flair Collection',
    slug: 'flair-collection',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908729/webdesino-products/lhl2bqyoxzca33mt0x63.jpg',
    linkUrl: '/women?subcategory=flair-jeans',
    displayOrder: 4,
    isActive: true,
  },
  {
    name: 'Bell Bottom Style',
    slug: 'bell-bottom-style',
    coverImage: 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743836/webdesino-products/nwnfgeaujg3tj3ohraw2.png',
    linkUrl: '/women?subcategory=bell-bottom',
    displayOrder: 5,
    isActive: true,
  },
];

// Products Data
const products = [
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
    name: 'Black Straight Fit Denim',
    slug: 'black-straight-fit-denim',
    description: 'Versatile black straight fit jeans. Goes with everything in your wardrobe.',
    price: 2299,
    oldPrice: 3499,
    category: 'men',
    subcategory: 'Straight Fit',
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
    name: 'Grey Straight Jeans',
    slug: 'grey-straight-jeans',
    description: 'Sophisticated grey straight fit jeans. Perfect for casual and semi-formal occasions.',
    price: 2599,
    oldPrice: 3799,
    category: 'men',
    subcategory: 'Straight Fit',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743845/webdesino-products/kzj2j4ghh2azsanvohev.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743847/webdesino-products/ji98hphnq9diwozhshwg.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743848/webdesino-products/hri0bhipyqansz4nhfbk.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743849/webdesino-products/b9eng4lqdrakx5pqb4o6.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743851/webdesino-products/lxl13mdavpv9vthwrgmh.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743853/webdesino-products/fiixmectfig6awj77gfy.png',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Black'],
    inStock: true,
    featured: false,
    badge: 'TRENDING',
    discount: 33,
  },
  {
    name: 'Light Blue Loose Fit',
    slug: 'light-blue-loose-fit',
    description: 'Casual light blue loose fit jeans. Perfect for weekend wear.',
    price: 2199,
    oldPrice: 3299,
    category: 'men',
    subcategory: 'Loose Fit',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743855/webdesino-products/vbdd3romfa74bqnq8ufy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743857/webdesino-products/pmyj9c8ll1mc17k3nf4m.png',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Light Blue', 'Blue'],
    inStock: true,
    featured: true,
    badge: 'SALE',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743842/webdesino-products/jmbdt5ocoz9ypqge4gxy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743843/webdesino-products/uwft8ewgofrthhfbnp17.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743855/webdesino-products/vbdd3romfa74bqnq8ufy.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743857/webdesino-products/pmyj9c8ll1mc17k3nf4m.png',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 31,
  },
  {
    name: 'Urban Baggy Jeans',
    slug: 'urban-baggy-jeans',
    description: 'Modern urban baggy jeans. Comfortable and stylish.',
    price: 2599,
    oldPrice: 3899,
    category: 'men',
    subcategory: 'Baggy Fit',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743848/webdesino-products/hri0bhipyqansz4nhfbk.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743849/webdesino-products/b9eng4lqdrakx5pqb4o6.png',
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 33,
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743858/webdesino-products/alu42vokdaksx8ctw907.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743859/webdesino-products/voeontdjfmbqdx7jovz6.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743861/webdesino-products/yxhaapf7abrcxvtkzzga.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743862/webdesino-products/pvajv1iiyd4dne59nslb.png',
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
    name: 'Black Straight Fit Jeans',
    slug: 'black-straight-fit-jeans-women',
    description: 'Classic black straight jeans. Essential wardrobe staple.',
    price: 2499,
    oldPrice: 3699,
    category: 'women',
    subcategory: 'Straight Jeans',
    brand: 'Elite Fashion',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743867/webdesino-products/m4jbmqmg0mhgmmzywgnj.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743869/webdesino-products/jdfhpub8vsyv3w8qnb0p.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Black'],
    inStock: true,
    featured: false,
    badge: 'SALE',
    discount: 32,
  },
  {
    name: 'Mid Rise Straight Jeans',
    slug: 'mid-rise-straight-jeans',
    description: 'Comfortable mid rise straight jeans. Perfect for everyday wear.',
    price: 2399,
    oldPrice: 3599,
    category: 'women',
    subcategory: 'Straight Jeans',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743871/webdesino-products/z0multvumb1afuebpu3n.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743873/webdesino-products/d29tzk8k9nodrecelpyv.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 33,
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743871/webdesino-products/z0multvumb1afuebpu3n.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743873/webdesino-products/d29tzk8k9nodrecelpyv.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743874/webdesino-products/kpecohrmwxodhvhsec5o.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743876/webdesino-products/cy5kpn46wif62c7w35m2.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 33,
  },
  {
    name: 'Flared Bell Bottom Jeans',
    slug: 'flared-bell-bottom-jeans',
    description: 'Stylish flared bell bottom jeans. Perfect for making a statement.',
    price: 2699,
    oldPrice: 3999,
    category: 'women',
    subcategory: 'Bell Bottom',
    brand: 'Casual Vibes',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743878/webdesino-products/xnp9tmvmzkfgot5erzlt.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743880/webdesino-products/l5bgkhb9xjbtgsuejdjw.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Light Blue'],
    inStock: true,
    featured: true,
    badge: 'SALE',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743878/webdesino-products/xnp9tmvmzkfgot5erzlt.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743880/webdesino-products/l5bgkhb9xjbtgsuejdjw.png',
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
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743882/webdesino-products/yikisoiug6vkyzoaybo5.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743883/webdesino-products/edsgbdfphdwv8clyjye5.png',
    ],
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Light Blue', 'Blue'],
    inStock: true,
    featured: false,
    badge: 'NEW',
    discount: 33,
  },
  {
    name: 'Relaxed Baggy Jeans',
    slug: 'relaxed-baggy-jeans',
    description: 'Comfortable relaxed baggy jeans. Perfect for casual days.',
    price: 2299,
    oldPrice: 3499,
    category: 'women',
    subcategory: 'Baggy',
    brand: 'Urban Threads',
    images: [
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743858/webdesino-products/alu42vokdaksx8ctw907.png',
      'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743859/webdesino-products/voeontdjfmbqdx7jovz6.png',
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true,
    featured: true,
    badge: 'TRENDING',
    discount: 34,
  },
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Subcategory.deleteMany({});
    await TrendingCategory.deleteMany({});
    console.log('✓ Cleared all existing data\n');

    // Seed Subcategories
    console.log('📁 Seeding subcategories...');
    await Subcategory.insertMany(subcategories);
    console.log(`✓ Seeded ${subcategories.length} subcategories`);
    console.log('  Men\'s: Straight Fit, Loose Fit, Baggy Fit');
    console.log('  Women\'s: Flair Jeans, Straight Jeans, Bell Bottom, Baggy\n');

    // Seed Trending Categories
    console.log('🔥 Seeding trending categories...');
    await TrendingCategory.insertMany(trendingCategories);
    console.log(`✓ Seeded ${trendingCategories.length} trending categories`);
    console.log('  - Men\'s Jeans');
    console.log('  - Women\'s Jeans');
    console.log('  - Straight Fit');
    console.log('  - Baggy Jeans');
    console.log('  - Flair Collection');
    console.log('  - Bell Bottom Style\n');

    // Seed Products
    console.log('👕 Seeding products...');
    await Product.insertMany(products);
    console.log(`✓ Seeded ${products.length} products\n`);

    // Summary
    console.log('📊 SEEDING SUMMARY:');
    console.log('═══════════════════════════════════════');
    console.log('\n🔹 SUBCATEGORIES:');
    console.log('  Men\'s Jeans:');
    console.log('    1. Straight Fit (3 products)');
    console.log('    2. Loose Fit (3 products)');
    console.log('    3. Baggy Fit (3 products)');
    console.log('\n  Women\'s Jeans:');
    console.log('    1. Flair Jeans (2 products)');
    console.log('    2. Straight Jeans (3 products)');
    console.log('    3. Bell Bottom (3 products)');
    console.log('    4. Baggy (3 products)');
    
    console.log('\n🔹 TRENDING CATEGORIES:');
    console.log('  6 categories with cover images');
    console.log('  All active and ready to display on homepage');
    
    console.log('\n🔹 PRODUCTS:');
    console.log(`  Total: ${products.length} products`);
    console.log(`  Men's: ${products.filter(p => p.category === 'men').length} products`);
    console.log(`  Women's: ${products.filter(p => p.category === 'women').length} products`);
    console.log(`  Featured: ${products.filter(p => p.featured).length} products`);
    
    console.log('\n═══════════════════════════════════════');
    console.log('✅ Database seeded successfully!');
    console.log('🎉 Your jeans store is ready!\n');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
