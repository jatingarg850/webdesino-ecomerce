'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <div className="text-gray-600 text-xl">Loading collection...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-3">All Products</h1>
          <p className="text-lg text-gray-600">Discover our complete collection</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Gender</h3>
            <div className="flex gap-2 flex-wrap">
              {['all', 'men', 'women', 'kids', 'unisex'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-4 py-2 rounded-full border-2 font-semibold transition ${
                    selectedGender === gender
                      ? 'bg-red-600 text-white border-red-600'
                      : 'border-gray-300 text-gray-700 hover:border-red-600'
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Category</h3>
            <div className="flex gap-2 flex-wrap">
              {['all', 'tshirts', 'oversized-tshirts', 'hoodies', 'shirts', 'joggers', 'shorts'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full border-2 font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white border-red-600'
                      : 'border-gray-300 text-gray-700 hover:border-red-600'
                  }`}
                >
                  {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <div className="text-8xl mb-6">👕</div>
            <p className="text-gray-600 text-2xl mb-6 font-semibold">No products available yet</p>
            <p className="text-gray-500 mb-8">Check back soon for new drops</p>
            <Link href="/admin" className="inline-block bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition">
              Add Products (Admin)
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-white rounded-xl overflow-hidden border hover:border-red-600 hover:shadow-xl transition-all"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <span className="text-7xl group-hover:scale-110 transition-transform">👕</span>
                  {product.isNewArrival && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      NEW
                    </span>
                  )}
                  {product.isLimitedEdition && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                      LIMITED
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="text-gray-900 font-bold text-sm mb-2 line-clamp-2 group-hover:text-red-600 transition">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 font-black text-lg">
                      ₹{product.variants?.[0]?.price || 0}
                    </p>
                    {product.variants?.[0]?.membershipPrice && (
                      <p className="text-red-600 text-sm font-semibold">
                        ₹{product.variants[0].membershipPrice}
                      </p>
                    )}
                  </div>
                  {product.fandom && (
                    <p className="text-xs text-gray-500 mt-1">
                      {product.fandom}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
