import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

export default function KidsPage() {
  const products = [
    { id: 1, name: 'Kids T-Shirt', price: 499, oldPrice: 699, image: '/clothes/vyjby_512.webp', badge: 'NEW' },
    { id: 2, name: 'Cute Hoodie', price: 899, oldPrice: 1299, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg', badge: 'SALE' },
    { id: 3, name: 'Casual Shirt', price: 599, oldPrice: 899, image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg', badge: 'NEW' },
    { id: 4, name: 'Party Dress', price: 1299, oldPrice: 1899, image: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg', badge: 'TRENDING' },
    { id: 5, name: 'Denim Jacket', price: 1199, oldPrice: 1699, image: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg', badge: 'SALE' },
    { id: 6, name: 'Graphic Tee', price: 399, oldPrice: 599, image: '/clothes/vyjby_512.webp', badge: 'NEW' },
    { id: 7, name: 'Winter Coat', price: 1799, oldPrice: 2499, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg', badge: 'TRENDING' },
    { id: 8, name: 'Summer Shorts', price: 499, oldPrice: 799, image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg', badge: 'SALE' },
  ];

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
            {['All', 'Boys', 'Girls', 'T-Shirts', 'Dresses', 'Jackets', 'Casual', 'Party Wear'].map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full border-2 border-orange-500 text-orange-500 font-semibold whitespace-nowrap hover:bg-orange-500 hover:text-white transition"
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
              <p className="text-gray-600">{products.length} items</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
