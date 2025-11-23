'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenPage() {
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const menProducts = data.products.filter((p: any) => p.category === 'men');
      setProducts(menProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908721/webdesino-products/vnkbc2lpyedhv8alkzwp.jpg"
          alt="Men's Collection"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                MEN'S JEANS
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Premium quality denim for every style
              </p>
              <div className="flex gap-4">
                <Link href="#products" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black mb-2">ALL PRODUCTS</h2>
              <p className="text-gray-600">{products.length} items</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src={product.images[0] || 'https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743836/webdesino-products/nwnfgeaujg3tj3ohraw2.png'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 mb-4">No products available</p>
              <code className="text-sm bg-gray-200 px-3 py-1 rounded">npm run seed</code>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
