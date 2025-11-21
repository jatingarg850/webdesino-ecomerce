'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlidersHorizontal } from 'lucide-react';

export default function KidsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedFilter, products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const kidsProducts = data.products.filter((p: any) => p.category === 'kids');
      setProducts(kidsProducts);
      setFilteredProducts(kidsProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (selectedFilter === 'All') {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product: any) => {
      const subcategory = product.subcategory?.toLowerCase() || '';
      const filter = selectedFilter.toLowerCase();
      
      if (filter === 't-shirts' && subcategory.includes('tshirt')) return true;
      if (filter === 'dresses' && subcategory.includes('dress')) return true;
      if (filter === 'jackets' && subcategory.includes('jacket')) return true;
      if (filter === 'casual' && (subcategory.includes('casual') || subcategory.includes('tshirt'))) return true;
      if (filter === 'party wear' && (subcategory.includes('dress') || subcategory.includes('formal'))) return true;
      
      return false;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-yellow-400 to-orange-500 overflow-hidden">
        <Image
          src="/clothes/vyjby_512.webp"
          alt="Kids Collection"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                KIDS COLLECTION
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Fun and comfortable styles for your little ones
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

      {/* Categories */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['All', 'T-Shirts', 'Dresses', 'Jackets', 'Casual', 'Party Wear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-6 py-2 rounded-full border-2 font-semibold whitespace-nowrap transition ${
                  selectedFilter === cat
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black mb-2">ALL PRODUCTS</h2>
              <p className="text-gray-600">{filteredProducts.length} items</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found in kids category</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
