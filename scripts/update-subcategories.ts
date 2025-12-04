import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const subcategories = [
  // Men's Subcategories
  {
    name: "Straight Fit",
    slug: "straight-fit",
    category: "men",
    description: "Classic straight fit jeans for a timeless look",
    isActive: true,
    displayOrder: 1,
  },
  {
    name: "Loose Fit",
    slug: "loose-fit",
    category: "men",
    description: "Comfortable loose fit jeans for relaxed style",
    isActive: true,
    displayOrder: 2,
  },
  {
    name: "Baggy Fit",
    slug: "baggy-fit",
    category: "men",
    description: "Trendy baggy fit jeans for street style",
    isActive: true,
    displayOrder: 3,
  },

  // Women's Subcategories
  {
    name: "Flair Jeans",
    slug: "flair-jeans",
    category: "women",
    description: "Elegant flair jeans with a flattering silhouette",
    isActive: true,
    displayOrder: 1,
  },
  {
    name: "Straight Jeans",
    slug: "straight-jeans",
    category: "women",
    description: "Timeless straight leg jeans for everyday wear",
    isActive: true,
    displayOrder: 2,
  },
  {
    name: "Bell Bottom",
    slug: "bell-bottom",
    category: "women",
    description: "Retro-inspired bell bottom jeans",
    isActive: true,
    displayOrder: 3,
  },
  {
    name: "Baggy",
    slug: "baggy",
    category: "women",
    description: "Comfortable baggy fit jeans for a relaxed look",
    isActive: true,
    displayOrder: 4,
  },
];

async function updateSubcategories() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Define Subcategory schema
    const subcategorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      category: String,
      description: String,
      isActive: Boolean,
      displayOrder: Number,
      createdAt: { type: Date, default: Date.now },
    });

    const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);

    // Clear existing subcategories
    console.log('🗑️  Clearing existing subcategories...');
    await Subcategory.deleteMany({});
    console.log('✅ Cleared existing subcategories');

    // Insert new subcategories
    console.log('📦 Inserting updated subcategories...');
    await Subcategory.insertMany(subcategories);
    console.log(`✅ Successfully created ${subcategories.length} subcategories`);

    // Summary
    const menCount = subcategories.filter(s => s.category === 'men').length;
    const womenCount = subcategories.filter(s => s.category === 'women').length;

    console.log('\n📊 Summary:');
    console.log(`   Men's Subcategories: ${menCount}`);
    console.log(`     - Straight Fit`);
    console.log(`     - Loose Fit`);
    console.log(`     - Baggy Fit`);
    console.log(`   Women's Subcategories: ${womenCount}`);
    console.log(`     - Flair Jeans`);
    console.log(`     - Straight Jeans`);
    console.log(`     - Bell Bottom`);
    console.log(`     - Baggy`);
    console.log('\n✨ T-shirt subcategory removed from both categories!');

  } catch (error) {
    console.error('❌ Error updating subcategories:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

updateSubcategories();
