import Link from 'next/link';
import Image from 'next/image';
import { Clock, Zap } from 'lucide-react';

export default function SalePage() {
  const saleProducts = [
    { id: 1, name: 'Premium Cotton T-Shirt', price: 499, oldPrice: 999, discount: 50, image: '/clothes/vyjby_512.webp' },
    { id: 2, name: 'Designer Hoodie', price: 999, oldPrice: 1999, discount: 50, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg' },
    { id: 3, name: 'Casual Shirt', price: 699, oldPrice: 1399, discount: 50, image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg' },
    { id: 4, name: 'Formal Blazer', price: 1999, oldPrice: 3999, discount: 50, image: '/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg' },
    { id: 5, name: 'Elegant Dress', price: 1499, oldPrice: 2999, discount: 50, image: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg' },
    { id: 6, name: 'Stylish Jacket', price: 1299, oldPrice: 2599, discount: 50, image: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg' },
    { id: 7, name: 'Graphic Tee', price: 399, oldPrice: 799, discount: 50, image: '/clothes/vyjby_512.webp' },
    { id: 8, name: 'Winter Coat', price: 2499, oldPrice: 4999, discount: 50, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[500px] bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container text-center">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
              <Zap className="inline w-4 h-4 mr-1" />
              FLASH SALE
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4">
              UP TO 50% OFF
            </h1>
            <p className="text-2xl text-white/90 mb-8">
              Limited time offer on selected items
            </p>
            <div className="flex items-center justify-center gap-2 text-white mb-8">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-semibold">Ends in: 2 Days 14 Hours 23 Minutes</span>
            </div>
            <Link
              href="#products"
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Stats */}
      <section className="py-12 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black mb-2">50%</div>
              <div className="text-sm opacity-80">Maximum Discount</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-sm opacity-80">Products on Sale</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">2 Days</div>
              <div className="text-sm opacity-80">Time Remaining</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">Free</div>
              <div className="text-sm opacity-80">Shipping Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16" id="products">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">SALE ITEMS</h2>
            <p className="text-gray-600">Grab your favorites before they're gone!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
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
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    SALE
                  </div>
                  <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-yellow-400 text-black text-center py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    LIMITED STOCK
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    Save ₹{product.oldPrice - product.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container text-center">
          <h2 className="text-4xl font-black mb-4">DON'T MISS OUT!</h2>
          <p className="text-xl mb-8">Sale ends soon. Shop now and save big!</p>
          <Link
            href="#products"
            className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
