import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
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

async function migrateImages() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    // Load the image URL mapping
    const mappingPath = path.join(process.cwd(), 'image-url-mapping.json');
    if (!fs.existsSync(mappingPath)) {
      throw new Error('image-url-mapping.json not found. Run upload-images-to-cloudinary.ts first.');
    }

    const urlMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Get all products
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;

    for (const product of products) {
      let hasChanges = false;
      const newImages = product.images.map((imagePath: string) => {
        // Check if it's a local path that needs to be replaced
        if (imagePath.startsWith('/ecom-clothes-photos/')) {
          const cloudinaryUrl = urlMapping[imagePath];
          if (cloudinaryUrl) {
            hasChanges = true;
            return cloudinaryUrl;
          }
        }
        return imagePath;
      });

      if (hasChanges) {
        await Product.updateOne(
          { _id: product._id },
          { $set: { images: newImages } }
        );
        updatedCount++;
        console.log(`✓ Updated: ${product.name}`);
      }
    }

    console.log(`\n✓ Migration complete!`);
    console.log(`✓ Updated ${updatedCount} products`);
    console.log(`✓ ${products.length - updatedCount} products already had correct URLs`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('Error migrating images:', error);
    process.exit(1);
  }
}

migrateImages();
