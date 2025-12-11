import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size (max 10MB for free plan)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum is 10MB. Please compress the image.` 
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary with optimization
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'POCKET MOUSE-products',
          resource_type: 'auto',
          quality: 'auto:good',
          fetch_format: 'auto',
          transformation: [
            { width: 1000, height: 1250, crop: 'fill', quality: 'auto:good' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      url: (result as any).secure_url,
      publicId: (result as any).public_id 
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    
    // Handle Cloudinary specific errors
    if (error.message?.includes('File size too large')) {
      return NextResponse.json({ 
        error: 'File size exceeds Cloudinary free plan limit (10MB). Please compress the image.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Upload failed' 
    }, { status: 500 });
  }
}
