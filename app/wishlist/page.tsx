'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore, useCartStore } from '@/lib/store';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();
  }, [items]);

  const fetchWishlistProducts = async () => {
    if (items.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      const promises = items.map(id => 
        fetch(`/api/products/${id}`).then(res => res.json())
      );
      const results = await Promise.all(promises);
      setProducts(results.map(r => r.product).filter(Boolean));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size: product.sizes[0] || 'M',
      color: product.colors[0] || 'Black',
    });
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading wishlist...</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container text-center">
          <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-black mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite items here!</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container">
        <h1 className="text-3xl font-black mb-8">My Wishlist ({products.length} items)</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/products/${product._id}`}>
                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                  <Image
                    src={product.images[0] || '/clothes/vyjby_512.webp'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(product._id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>

              <div className="mb-3">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
