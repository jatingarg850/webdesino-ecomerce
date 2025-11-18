"use client";

import { useState } from "react";

type Variant = {
  sku: string;
  size: string;
  color: string;
  price: number;
  salePrice?: number;
  stock: number;
};

export function VariantSelector({
  variants,
  onSelect
}: {
  variants: Variant[];
  onSelect: (variant: Variant) => void;
}) {
  const [selectedSize, setSelectedSize] = useState(variants[0]?.size || "");
  const [selectedColor, setSelectedColor] = useState(variants[0]?.color || "");

  const sizes = [...new Set(variants.map(v => v.size))];
  const colors = [...new Set(variants.map(v => v.color))];

  const currentVariant = variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  ) || variants[0];

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = variants.find(v => v.size === size && v.color === selectedColor);
    if (variant) onSelect(variant);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = variants.find(v => v.size === selectedSize && v.color === color);
    if (variant) onSelect(variant);
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-gray-900">
            Select Size: <span className="font-normal text-gray-600">{selectedSize}</span>
          </label>
          <button className="text-sm text-gray-600 hover:text-gray-900 underline">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => {
            const variant = variants.find(v => v.size === size && v.color === selectedColor);
            const isAvailable = variant && variant.stock > 0;
            const isSelected = size === selectedSize;

            return (
              <button
                key={size}
                onClick={() => isAvailable && handleSizeChange(size)}
                disabled={!isAvailable}
                className={`
                  relative py-3 rounded-lg border-2 font-semibold text-sm transition-all
                  ${isSelected 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : isAvailable
                    ? 'border-gray-300 hover:border-gray-900 bg-white text-gray-900'
                    : 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {size}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-300 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="text-sm font-bold text-gray-900 block mb-3">
          Color: <span className="font-normal text-gray-600">{selectedColor}</span>
        </label>
        <div className="flex gap-3">
          {colors.map((color) => {
            const variant = variants.find(v => v.color === color && v.size === selectedSize);
            const isAvailable = variant && variant.stock > 0;
            const isSelected = color === selectedColor;

            return (
              <button
                key={color}
                onClick={() => isAvailable && handleColorChange(color)}
                disabled={!isAvailable}
                className={`
                  relative w-12 h-12 rounded-full border-4 transition-all
                  ${isSelected ? 'border-gray-900 scale-110' : 'border-gray-200 hover:border-gray-400'}
                  ${!isAvailable ? 'opacity-40 cursor-not-allowed' : ''}
                `}
                style={{ 
                  backgroundColor: color.toLowerCase(),
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
                title={color}
              >
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-white rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
