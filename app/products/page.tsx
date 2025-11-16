'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <div className="text-gray-600 text-xl">Loading collection...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4">All Shoes</h1>
          <p className="text-xl text-gray-600">Discover our complete collection</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {['All', 'Running', 'Sneakers', 'Casual', 'Sports', 'Formal', 'Boots'].map((cat) => (
            <button
              key={cat}
              className="px-6 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <div className="text-8xl mb-6">👟</div>
            <p className="text-gray-600 text-2xl mb-6 font-semibold">No shoes available yet</p>
            <p className="text-gray-500 mb-8">Check back soon for new arrivals</p>
            <Link href="/admin" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition">
              Add Products (Admin)
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-gray-900 hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <span className="text-8xl group-hover:scale-110 transition-transform">👟</span>
                  {product.isNew && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-black text-xl">
                      ${product.variants?.[0]?.price || 0}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {product.variants?.length || 0} sizes
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
