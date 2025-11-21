import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'webdesino-products',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
    throw error;
  }
};

async function uploadAllImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'ecom-clothes-photos');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found:', imagesDir);
    return;
  }

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images to upload...`);

  const urlMapping: Record<string, string> = {};

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = path.join(imagesDir, file);
    
    console.log(`[${i + 1}/${imageFiles.length}] Uploading ${file}...`);
    
    try {
      const url = await uploadImage(filePath);
      urlMapping[`/ecom-clothes-photos/${file}`] = url;
      console.log(`✓ Uploaded: ${url}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file}`);
    }
  }

  // Save mapping to a JSON file
  const mappingPath = path.join(process.cwd(), 'image-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  
  console.log('\n✓ All images uploaded!');
  console.log(`✓ URL mapping saved to: ${mappingPath}`);
  console.log('\nNext steps:');
  console.log('1. Update your database with the new Cloudinary URLs');
  console.log('2. Delete the local images from public/ecom-clothes-photos');
}

uploadAllImages();
