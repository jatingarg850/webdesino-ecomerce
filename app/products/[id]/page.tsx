'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedVariant(data.variants?.[0]);
      });
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem({
        productId: product._id,
        variantSku: selectedVariant.sku,
        title: product.title,
        size: selectedVariant.size,
        color: selectedVariant.color,
        price: selectedVariant.salePrice || selectedVariant.price,
        quantity,
        image: product.images?.[0] || ''
      });
      
      // Show success message
      const btn = document.getElementById('add-to-cart-btn');
      if (btn) {
        btn.textContent = '✓ Added to Cart!';
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
        }, 2000);
      }
    }
  };

  const stockStatus = selectedVariant?.stock > 10 ? 'In Stock' : 
                      selectedVariant?.stock > 0 ? `Only ${selectedVariant.stock} left!` : 
                      'Out of Stock';

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => router.back()} className="hover:text-gray-900">← Back</button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-[200px]">👟</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:ring-4 ring-gray-900 transition">
                  <span className="text-4xl">👟</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-4xl font-black text-gray-900">
                  ${selectedVariant?.salePrice || selectedVariant?.price}
                </p>
                {selectedVariant?.salePrice && (
                  <p className="text-2xl text-gray-400 line-through">
                    ${selectedVariant?.price}
                  </p>
                )}
              </div>
              <p className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                selectedVariant?.stock > 10 ? 'bg-green-100 text-green-800' :
                selectedVariant?.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {stockStatus}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Select Size</h3>
                <button className="text-sm text-blue-600 hover:underline font-semibold">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.variants?.map((variant: any) => (
                  <button
                    key={variant.sku}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={`aspect-square rounded-xl border-2 font-bold text-lg transition-all ${
                      selectedVariant?.sku === variant.sku
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : variant.stock === 0
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-900 hover:border-gray-900'
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Color: {selectedVariant?.color}</h3>
              <div className="flex gap-3">
                {[...new Set(product.variants?.map((v: any) => v.color))].map((color: any) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedVariant?.color === color ? 'border-gray-900 scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock === 0}
                className="w-full bg-gray-900 text-white py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
              >
                Add to Cart
              </button>
              <button className="w-full border-2 border-gray-900 text-gray-900 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                Add to Wishlist ♡
              </button>
            </div>

            {/* Description */}
            <div className="border-t-2 border-gray-100 pt-8">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
                      <span className="text-green-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Material & Care */}
            {product.material && (
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4">Material & Care</h3>
                <p className="text-gray-700 mb-2"><strong>Material:</strong> {product.material}</p>
                {product.careInstructions && (
                  <p className="text-gray-700"><strong>Care:</strong> {product.careInstructions}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
