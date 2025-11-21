'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'products');

        const response = await fetch('/api/upload-cloudinary', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      onChange([...value, ...urls]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group">
            <Image
              src={url}
              alt={`Product ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer flex flex-col items-center justify-center gap-2 transition">
            {uploading ? (
              <>
                <Loader2 className="animate-spin text-gray-400" size={32} />
                <span className="text-sm text-gray-500">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="text-gray-400" size={32} />
                <span className="text-sm text-gray-500">Upload Image</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {value.length} / {maxImages} images uploaded
      </p>
    </div>
  );
}
