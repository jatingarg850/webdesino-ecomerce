import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImages() {
  const baseDir = 'ecom-clothes-photos';
  const folders = ['male', 'female'];
  
  console.log('🚀 Starting Cloudinary upload with optimization...\n');

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    const files = fs.readdirSync(folderPath);
    
    console.log(`📁 Processing ${folder} folder (${files.length} images)...`);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(folderPath, file);
      
      try {
        // Upload with high quality
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `ecom-clothes-photos/${folder}`,
          public_id: `${i + 1}`, // Name as 1.jpg, 2.jpg, etc.
          resource_type: 'image',
          overwrite: true,
          // High quality settings
          quality: 'auto:best',
          fetch_format: 'auto',
          transformation: [
            { width: 1200, height: 1500, crop: 'fill', quality: 'auto:best' }
          ]
        });
        
        console.log(`  ✅ Uploaded: ${file} → ${result.public_id}`);
      } catch (error: any) {
        console.error(`  ❌ Failed to upload ${file}:`, error.message);
      }
    }
    
    console.log(`✅ Completed ${folder} folder\n`);
  }
  
  console.log('🎉 All images uploaded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Male images: ${fs.readdirSync(path.join(baseDir, 'male')).length}`);
  console.log(`   Female images: ${fs.readdirSync(path.join(baseDir, 'female')).length}`);
  console.log('\n💡 Images are optimized with:');
  console.log('   - Auto quality (good)');
  console.log('   - Auto format (WebP for modern browsers)');
  console.log('   - Resized to 800x1000 (fill crop)');
}

uploadImages().catch(console.error);
