import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  const sourceDir = 'ecom-clothes-photos';
  const targetDir = 'public/ecom-clothes-photos-optimized';
  const folders = ['male', 'female'];

  console.log('🚀 Starting image optimization...\n');

  // Create target directory
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const folder of folders) {
    const sourcePath = path.join(sourceDir, folder);
    const targetPath = path.join(targetDir, folder);

    // Create folder if doesn't exist
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath);
    console.log(`📁 Processing ${folder} folder (${files.length} images)...`);

    for (const file of files) {
      const sourceFile = path.join(sourcePath, file);
      const targetFile = path.join(targetPath, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

      try {
        await sharp(sourceFile)
          .resize(800, 1000, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 85 })
          .toFile(targetFile);

        console.log(`  ✅ Optimized: ${file} → ${path.basename(targetFile)}`);
      } catch (error: any) {
        console.error(`  ❌ Failed to optimize ${file}:`, error.message);
      }
    }

    console.log(`✅ Completed ${folder} folder\n`);
  }

  console.log('🎉 All images optimized successfully!');
  console.log('\n📊 Optimization Details:');
  console.log('   - Format: WebP (smaller file size)');
  console.log('   - Size: 800x1000 (optimized for web)');
  console.log('   - Quality: 85% (high quality, smaller size)');
  console.log('   - Location: public/ecom-clothes-photos-optimized/');
}

optimizeImages().catch(console.error);
