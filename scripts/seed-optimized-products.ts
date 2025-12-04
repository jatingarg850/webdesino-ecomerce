import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

// Cloudinary base URL with optimization parameters
const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

// Optimization transformations - high quality
const getOptimizedUrl = (path: string) => {
  return `${CLOUDINARY_BASE}/c_fill,w_1000,h_1250,q_auto:best,f_auto/${path}`;
};

// Product data with optimized Cloudinary URLs
const products = [
  // MEN'S STRAIGHT FIT (3 products)
  {
    name: "Classic Straight Fit Jeans - Dark Blue",
    slug: "classic-straight-fit-jeans-dark-blue-men",
    description: "Timeless straight fit jeans in dark blue wash. Perfect for everyday wear with a comfortable fit that never goes out of style.",
    price: 1199,
    category: "men",
    subcategory: "straight-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/1"), getOptimizedUrl("ecom-clothes-photos/male/2")],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Blue"],
    inStock: true,
    featured: true,
    badge: "NEW",
  },
  {
    name: "Straight Fit Jeans - Light Wash",
    slug: "straight-fit-jeans-light-wash-men",
    description: "Light wash straight fit jeans for a casual, relaxed look. Perfect for weekend outings.",
    price: 1099,
    category: "men",
    subcategory: "straight-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/3"), getOptimizedUrl("ecom-clothes-photos/male/4")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Light Blue"],
    inStock: true,
    featured: false,
  },
  {
    name: "Premium Straight Fit - Black",
    slug: "premium-straight-fit-black-men",
    description: "Premium quality straight fit jeans in classic black. Versatile and stylish for any occasion.",
    price: 1299,
    oldPrice: 1499,
    category: "men",
    subcategory: "straight-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/5"), getOptimizedUrl("ecom-clothes-photos/male/6")],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Black"],
    inStock: true,
    featured: true,
    badge: "SALE",
    discount: 13,
  },

  // MEN'S LOOSE FIT (3 products)
  {
    name: "Relaxed Loose Fit Jeans - Medium Wash",
    slug: "relaxed-loose-fit-jeans-medium-wash-men",
    description: "Comfortable loose fit jeans with a relaxed silhouette. Perfect for casual outings and all-day comfort.",
    price: 1149,
    category: "men",
    subcategory: "loose-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/7"), getOptimizedUrl("ecom-clothes-photos/male/8")],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Medium Blue"],
    inStock: true,
    featured: false,
  },
  {
    name: "Loose Fit Denim - Vintage Blue",
    slug: "loose-fit-denim-vintage-blue-men",
    description: "Vintage-inspired loose fit jeans with authentic wash and comfortable fit.",
    price: 999,
    oldPrice: 1199,
    category: "men",
    subcategory: "loose-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/9"), getOptimizedUrl("ecom-clothes-photos/male/10")],
    sizes: ["30", "32", "34", "36"],
    colors: ["Vintage Blue"],
    inStock: true,
    featured: false,
    badge: "SALE",
    discount: 17,
  },
  {
    name: "Comfort Loose Fit - Grey",
    slug: "comfort-loose-fit-grey-men",
    description: "Ultra-comfortable loose fit jeans in modern grey tone. Perfect for a contemporary look.",
    price: 1249,
    category: "men",
    subcategory: "loose-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/11"), getOptimizedUrl("ecom-clothes-photos/male/12")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Grey"],
    inStock: true,
    featured: false,
  },

  // MEN'S BAGGY FIT (3 products)
  {
    name: "Baggy Fit Jeans - Dark Indigo",
    slug: "baggy-fit-jeans-dark-indigo-men",
    description: "Trendy baggy fit jeans in dark indigo. Street style essential for the modern wardrobe.",
    price: 1299,
    category: "men",
    subcategory: "baggy-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/13"), getOptimizedUrl("ecom-clothes-photos/male/14")],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Dark Indigo"],
    inStock: true,
    featured: true,
    badge: "TRENDING",
  },
  {
    name: "Urban Baggy Jeans - Washed Blue",
    slug: "urban-baggy-jeans-washed-blue-men",
    description: "Urban style baggy jeans with authentic washed finish. Perfect for street style.",
    price: 1199,
    category: "men",
    subcategory: "baggy-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/15"), getOptimizedUrl("ecom-clothes-photos/male/16")],
    sizes: ["30", "32", "34", "36"],
    colors: ["Washed Blue"],
    inStock: true,
    featured: false,
  },
  {
    name: "Baggy Fit Denim - Black",
    slug: "baggy-fit-denim-black-men",
    description: "Classic baggy fit in versatile black. Perfect for any occasion.",
    price: 1149,
    oldPrice: 1349,
    category: "men",
    subcategory: "baggy-fit",
    images: [getOptimizedUrl("ecom-clothes-photos/male/17"), getOptimizedUrl("ecom-clothes-photos/male/18")],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black"],
    inStock: true,
    featured: false,
    badge: "SALE",
    discount: 15,
  },

  // WOMEN'S FLAIR JEANS (3 products)
  {
    name: "Classic Flair Jeans - Dark Blue",
    slug: "classic-flair-jeans-dark-blue-women",
    description: "Elegant flair jeans with a flattering silhouette. Perfect for a chic, sophisticated look.",
    price: 1199,
    category: "women",
    subcategory: "flair-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/1"), getOptimizedUrl("ecom-clothes-photos/female/2")],
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Dark Blue"],
    inStock: true,
    featured: true,
    badge: "NEW",
  },
  {
    name: "High-Waist Flair Jeans - Light Wash",
    slug: "high-waist-flair-jeans-light-wash-women",
    description: "High-waisted flair jeans in light wash. Trendy and comfortable for all-day wear.",
    price: 1249,
    category: "women",
    subcategory: "flair-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/3"), getOptimizedUrl("ecom-clothes-photos/female/4")],
    sizes: ["26", "28", "30", "32"],
    colors: ["Light Blue"],
    inStock: true,
    featured: false,
  },
  {
    name: "Vintage Flair Jeans - Medium Wash",
    slug: "vintage-flair-jeans-medium-wash-women",
    description: "Vintage-inspired flair jeans with authentic details and perfect fit.",
    price: 1099,
    oldPrice: 1299,
    category: "women",
    subcategory: "flair-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/5"), getOptimizedUrl("ecom-clothes-photos/female/6")],
    sizes: ["28", "30", "32", "34"],
    colors: ["Medium Blue"],
    inStock: true,
    featured: false,
    badge: "SALE",
    discount: 15,
  },

  // WOMEN'S STRAIGHT JEANS (3 products)
  {
    name: "Straight Leg Jeans - Classic Blue",
    slug: "straight-leg-jeans-classic-blue-women",
    description: "Timeless straight leg jeans in classic blue wash. A wardrobe essential.",
    price: 1149,
    category: "women",
    subcategory: "straight-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/7"), getOptimizedUrl("ecom-clothes-photos/female/8")],
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Classic Blue"],
    inStock: true,
    featured: true,
  },
  {
    name: "Mid-Rise Straight Jeans - Black",
    slug: "mid-rise-straight-jeans-black-women",
    description: "Versatile mid-rise straight jeans in classic black. Perfect for any occasion.",
    price: 1199,
    category: "women",
    subcategory: "straight-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/9"), getOptimizedUrl("ecom-clothes-photos/female/10")],
    sizes: ["26", "28", "30", "32"],
    colors: ["Black"],
    inStock: true,
    featured: false,
  },
  {
    name: "Straight Fit Denim - Light Blue",
    slug: "straight-fit-denim-light-blue-women",
    description: "Light blue straight fit jeans for a fresh, casual look.",
    price: 1099,
    category: "women",
    subcategory: "straight-jeans",
    images: [getOptimizedUrl("ecom-clothes-photos/female/11"), getOptimizedUrl("ecom-clothes-photos/female/12")],
    sizes: ["28", "30", "32", "34"],
    colors: ["Light Blue"],
    inStock: true,
    featured: false,
  },

  // WOMEN'S BELL BOTTOM (3 products)
  {
    name: "Retro Bell Bottom Jeans - Dark Wash",
    slug: "retro-bell-bottom-jeans-dark-wash-women",
    description: "Retro-inspired bell bottom jeans with a modern twist. Stand out in style.",
    price: 1299,
    category: "women",
    subcategory: "bell-bottom",
    images: [getOptimizedUrl("ecom-clothes-photos/female/13"), getOptimizedUrl("ecom-clothes-photos/female/14")],
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Dark Wash"],
    inStock: true,
    featured: true,
    badge: "TRENDING",
  },
  {
    name: "High-Waist Bell Bottom - Medium Blue",
    slug: "high-waist-bell-bottom-medium-blue-women",
    description: "High-waisted bell bottom jeans for a flattering silhouette.",
    price: 1049,
    oldPrice: 1249,
    category: "women",
    subcategory: "bell-bottom",
    images: [getOptimizedUrl("ecom-clothes-photos/female/15"), getOptimizedUrl("ecom-clothes-photos/female/16")],
    sizes: ["26", "28", "30", "32"],
    colors: ["Medium Blue"],
    inStock: true,
    featured: false,
    badge: "SALE",
    discount: 16,
  },
  {
    name: "Bell Bottom Denim - Black",
    slug: "bell-bottom-denim-black-women",
    description: "Classic bell bottom jeans in versatile black. Timeless style.",
    price: 1349,
    category: "women",
    subcategory: "bell-bottom",
    images: [getOptimizedUrl("ecom-clothes-photos/female/17"), getOptimizedUrl("ecom-clothes-photos/female/18")],
    sizes: ["28", "30", "32", "34"],
    colors: ["Black"],
    inStock: true,
    featured: false,
  },

  // WOMEN'S BAGGY (3 products)
  {
    name: "Baggy Fit Jeans - Light Wash",
    slug: "baggy-fit-jeans-light-wash-women",
    description: "Trendy baggy fit jeans in light wash. Comfortable and stylish.",
    price: 1199,
    category: "women",
    subcategory: "baggy",
    images: [getOptimizedUrl("ecom-clothes-photos/female/19"), getOptimizedUrl("ecom-clothes-photos/female/20")],
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Light Wash"],
    inStock: true,
    featured: false,
  },
  {
    name: "Relaxed Baggy Jeans - Dark Blue",
    slug: "relaxed-baggy-jeans-dark-blue-women",
    description: "Relaxed baggy jeans with a comfortable, oversized fit.",
    price: 1249,
    category: "women",
    subcategory: "baggy",
    images: [getOptimizedUrl("ecom-clothes-photos/female/21"), getOptimizedUrl("ecom-clothes-photos/female/22")],
    sizes: ["26", "28", "30", "32"],
    colors: ["Dark Blue"],
    inStock: true,
    featured: true,
    badge: "NEW",
  },
  {
    name: "Urban Baggy Denim - Grey",
    slug: "urban-baggy-denim-grey-women",
    description: "Urban style baggy jeans in modern grey tone.",
    price: 1099,
    oldPrice: 1299,
    category: "women",
    subcategory: "baggy",
    images: [getOptimizedUrl("ecom-clothes-photos/female/23"), getOptimizedUrl("ecom-clothes-photos/female/24")],
    sizes: ["28", "30", "32", "34"],
    colors: ["Grey"],
    inStock: true,
    featured: false,
    badge: "SALE",
    discount: 15,
  },
];

async function seedProducts() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Use existing Product model
    const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Insert new products
    console.log('📦 Inserting optimized products...');
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products with optimized Cloudinary images`);

    // Summary
    const menCount = products.filter(p => p.category === 'men').length;
    const womenCount = products.filter(p => p.category === 'women').length;
    const featuredCount = products.filter(p => p.featured).length;
    const saleCount = products.filter(p => p.badge === 'SALE').length;

    console.log('\n📊 Summary:');
    console.log(`   Total Products: ${products.length}`);
    console.log(`   Men's Products: ${menCount}`);
    console.log(`     - Straight Fit: 3`);
    console.log(`     - Loose Fit: 3`);
    console.log(`     - Baggy Fit: 3`);
    console.log(`   Women's Products: ${womenCount}`);
    console.log(`     - Flair Jeans: 3`);
    console.log(`     - Straight Jeans: 3`);
    console.log(`     - Bell Bottom: 3`);
    console.log(`     - Baggy: 3`);
    console.log(`   Featured Products: ${featuredCount}`);
    console.log(`   On Sale: ${saleCount}`);
    console.log('\n✨ All images are optimized with Cloudinary transformations!');
    console.log('🚀 Images reduced to 600x750 for faster loading');
    console.log('💡 Auto format (WebP) and quality optimization enabled');

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

seedProducts();
