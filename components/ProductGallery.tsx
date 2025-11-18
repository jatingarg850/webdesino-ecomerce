"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  
  // Fallback images if none provided
  const displayImages = images.length > 0 ? images : [
    '/placeholder-shoe-1.jpg',
    '/placeholder-shoe-2.jpg',
    '/placeholder-shoe-3.jpg',
    '/placeholder-shoe-4.jpg'
  ];

  return (
    <div className="sticky top-24">
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="aspect-square relative bg-gray-50 rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center text-9xl">
            👟
          </div>
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square bg-gray-50 rounded-xl overflow-hidden transition-all ${
                i === active ? "ring-2 ring-gray-900" : "hover:ring-2 ring-gray-300"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                👟
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
