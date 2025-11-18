"use client";

import { useEffect, useState } from "react";

export function StickyBar({
  title,
  price,
  onAddToCart,
  disabled
}: {
  title: string;
  price: number;
  onAddToCart: () => void;
  disabled: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 truncate">You're viewing</p>
            <p className="font-bold text-gray-900 truncate">{title}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900">${price.toFixed(2)}</p>
            </div>
            <button
              onClick={onAddToCart}
              disabled={disabled}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
