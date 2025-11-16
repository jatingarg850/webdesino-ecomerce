import mongoose from 'mongoose';
import Product from '../models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/solued-store';

const sampleProducts = [
  {
    title: "Marvel Avengers Logo T-Shirt",
    slug: "marvel-avengers-logo-tshirt",
    description: "Official Marvel Avengers logo t-shirt in premium cotton",
    brand: "Solued Store",
    gender: "men",
    category: "tshirts",
    fandom: "Marvel",
    images: ["/products/marvel-tshirt.jpg"],
    variants: [
      { sku: "MAR-TS-BLK-S", size: "S", color: "Black", price: 699, membershipPrice: 629, stock: 50, reserved: 0 },
      { sku: "MAR-TS-BLK-M", size: "M", color: "Black", price: 699, membershipPrice: 629, stock: 50, reserved: 0 },
      { sku: "MAR-TS-BLK-L", size: "L", color: "Black", price: 699, membershipPrice: 629, stock: 50, reserved: 0 },
      { sku: "MAR-TS-BLK-XL", size: "XL", color: "Black", price: 699, membershipPrice: 629, stock: 50, reserved: 0 },
    ],
    features: ["100% Cotton", "Regular Fit", "Official Licensed", "Machine Washable"],
    material: "100% Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    isFeatured: true,
    isNewArrival: true,
    isLimitedEdition: false,
    tags: ["marvel", "avengers", "superhero", "tshirt"],
  },
  {
    title: "Oversized Harry Potter Hogwarts Tee",
    slug: "oversized-harry-potter-hogwarts-tee",
    description: "Oversized fit Harry Potter Hogwarts crest t-shirt",
    brand: "Solued Store",
    gender: "unisex",
    category: "oversized-tshirts",
    fandom: "Harry Potter",
    images: ["/products/hp-oversized.jpg"],
    variants: [
      { sku: "HP-OVR-GRY-M", size: "M", color: "Grey", price: 899, membershipPrice: 809, stock: 40, reserved: 0 },
      { sku: "HP-OVR-GRY-L", size: "L", color: "Grey", price: 899, membershipPrice: 809, stock: 40, reserved: 0 },
      { sku: "HP-OVR-GRY-XL", size: "XL", color: "Grey", price: 899, membershipPrice: 809, stock: 40, reserved: 0 },
    ],
    features: ["Oversized Fit", "Premium Cotton", "Official Licensed", "Drop Shoulder"],
    material: "100% Cotton",
    careInstructions: "Machine wash cold, do not bleach",
    isFeatured: true,
    isNewArrival: true,
    isLimitedEdition: false,
    tags: ["harry-potter", "hogwarts", "oversized", "unisex"],
  },
  {
    title: "DC Batman Logo Hoodie",
    slug: "dc-batman-logo-hoodie",
    description: "Premium DC Batman logo hoodie with kangaroo pocket",
    brand: "Solued Store",
    gender: "men",
    category: "hoodies",
    fandom: "DC",
    images: ["/products/batman-hoodie.jpg"],
    variants: [
      { sku: "DC-HOD-BLK-M", size: "M", color: "Black", price: 1499, membershipPrice: 1349, stock: 30, reserved: 0 },
      { sku: "DC-HOD-BLK-L", size: "L", color: "Black", price: 1499, membershipPrice: 1349, stock: 30, reserved: 0 },
      { sku: "DC-HOD-BLK-XL", size: "XL", color: "Black", price: 1499, membershipPrice: 1349, stock: 30, reserved: 0 },
    ],
    features: ["Fleece Lined", "Kangaroo Pocket", "Adjustable Hood", "Official Licensed"],
    material: "80% Cotton, 20% Polyester",
    careInstructions: "Machine wash cold, inside out",
    isFeatured: true,
    isNewArrival: false,
    isLimitedEdition: false,
    tags: ["dc", "batman", "hoodie", "winter"],
  },
  {
    title: "Friends Central Perk Women's Tee",
    slug: "friends-central-perk-womens-tee",
    description: "Friends TV show Central Perk cafe logo t-shirt",
    brand: "Solued Store",
    gender: "women",
    category: "tshirts",
    fandom: "Friends",
    images: ["/products/friends-tee.jpg"],
    variants: [
      { sku: "FR-TS-WHT-S", size: "S", color: "White", price: 699, membershipPrice: 629, stock: 45, reserved: 0 },
      { sku: "FR-TS-WHT-M", size: "M", color: "White", price: 699, membershipPrice: 629, stock: 45, reserved: 0 },
      { sku: "FR-TS-WHT-L", size: "L", color: "White", price: 699, membershipPrice: 629, stock: 45, reserved: 0 },
    ],
    features: ["Slim Fit", "Soft Cotton", "Official Licensed", "Printed Graphics"],
    material: "100% Cotton",
    careInstructions: "Machine wash cold, do not iron on print",
    isFeatured: false,
    isNewArrival: true,
    isLimitedEdition: false,
    tags: ["friends", "tv-show", "central-perk", "women"],
  },
  {
    title: "Anime Naruto Limited Edition Joggers",
    slug: "anime-naruto-limited-joggers",
    description: "Limited edition Naruto themed joggers with embroidered details",
    brand: "Solued Store",
    gender: "unisex",
    category: "joggers",
    fandom: "Anime",
    images: ["/products/naruto-joggers.jpg"],
    variants: [
      { sku: "ANI-JOG-BLK-M", size: "M", color: "Black", price: 1299, membershipPrice: 1169, stock: 20, reserved: 0 },
      { sku: "ANI-JOG-BLK-L", size: "L", color: "Black", price: 1299, membershipPrice: 1169, stock: 20, reserved: 0 },
      { sku: "ANI-JOG-BLK-XL", size: "XL", color: "Black", price: 1299, membershipPrice: 1169, stock: 20, reserved: 0 },
    ],
    features: ["Elastic Waistband", "Side Pockets", "Embroidered Details", "Limited Edition"],
    material: "Cotton Blend",
    careInstructions: "Machine wash cold, hang dry",
    isFeatured: true,
    isNewArrival: true,
    isLimitedEdition: true,
    tags: ["anime", "naruto", "joggers", "limited-edition"],
  },
  {
    title: "Supima Cotton Basic White Tee",
    slug: "supima-cotton-basic-white-tee",
    description: "Premium Supima cotton basic white t-shirt",
    brand: "Solued Store",
    gender: "unisex",
    category: "tshirts",
    images: ["/products/supima-white.jpg"],
    variants: [
      { sku: "SUP-TS-WHT-S", size: "S", color: "White", price: 599, membershipPrice: 539, stock: 100, reserved: 0 },
      { sku: "SUP-TS-WHT-M", size: "M", color: "White", price: 599, membershipPrice: 539, stock: 100, reserved: 0 },
      { sku: "SUP-TS-WHT-L", size: "L", color: "White", price: 599, membershipPrice: 539, stock: 100, reserved: 0 },
      { sku: "SUP-TS-WHT-XL", size: "XL", color: "White", price: 599, membershipPrice: 539, stock: 100, reserved: 0 },
    ],
    features: ["Supima Cotton", "Ultra Soft", "Durable", "Everyday Wear"],
    material: "100% Supima Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    isFeatured: true,
    isNewArrival: false,
    isLimitedEdition: false,
    tags: ["basics", "supima", "cotton", "essential"],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
