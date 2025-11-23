import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesToUpload = [
  'alexandra-gorn-WF0LSThlRmw-unsplash.jpg',
  'heather-ford-5gkYsrH_ebY-unsplash.jpg',
  'junko-nakase-Q-72wa9-7Dg-unsplash.jpg',
  'keagan-henman-xPJYL0l5Ii8-unsplash.jpg',
  'parker-burchfield-tvG4WvjgsEY-unsplash.jpg',
  'two-fashion-designers-atelier-with-dress-form.jpg',
  'vyjby_512.webp',
];

async function uploadRemainingImages() {
  const clothesDir = path.join(process.cwd(), 'public', 'clothes');
  const urlMapping: Record<string, string> = {};

  console.log('Uploading remaining images to Cloudinary...\n');

  for (const filename of imagesToUpload) {
    const filePath = path.join(clothesDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠ Skipping ${filename} - file not found`);
      continue;
    }

    try {
      console.log(`Uploading ${filename}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'POCKET MOUSE-products',
        resource_type: 'auto',
      });
      
      urlMapping[`/clothes/${filename}`] = result.secure_url;
      console.log(`✓ Uploaded: ${result.secure_url}\n`);
    } catch (error) {
      console.error(`✗ Failed to upload ${filename}:`, error);
    }
  }

  // Save mapping
  const mappingPath = path.join(process.cwd(), 'clothes-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  
  console.log('\n✓ All images uploaded!');
  console.log(`✓ URL mapping saved to: ${mappingPath}`);
}

uploadRemainingImages();
