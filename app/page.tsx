import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width */}
      <section className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6 animate-fade-in z-10">
                <div className="inline-block">
                  <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    New Collection
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  NEW IN
                  <br />
                  <span className="text-gray-600">SHOP FRESH STYLES</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Discover the latest trends in fashion. Premium quality, unbeatable prices.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/new"
                    className="bg-black text-white px-8 py-4 rounded-md font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    Shop Now
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/sale"
                    className="bg-white text-black border-2 border-black px-8 py-4 rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300"
                  >
                    View Sale
                  </Link>
                </div>
              </div>

              {/* Right Images */}
              <div className="hidden lg:flex items-center justify-end gap-4">
                <div className="w-48 h-64 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg"
                    alt="Fashion"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-56 h-80 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg"
                    alt="Fashion"
                    width={500}
                    height={700}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">SHOP FOR</h2>
            <p className="text-gray-600">Choose your style</p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              href="/men"
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg"
                alt="Men's Fashion"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-8">
                <h3 className="text-3xl font-black mb-2">MEN</h3>
                <p className="text-sm opacity-90">Explore Collection</p>
              </div>
            </Link>

            <Link
              href="/women"
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src="/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg"
                alt="Women's Fashion"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-8">
                <h3 className="text-3xl font-black mb-2">WOMEN</h3>
                <p className="text-sm opacity-90">Explore Collection</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black">TRENDING CATEGORIES</h2>
            <Link href="/categories" className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'T-Shirts', href: '/c/tshirts', image: '/clothes/vyjby_512.webp' },
              { name: 'Hoodies', href: '/c/hoodies', image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg' },
              { name: 'Casual Wear', href: '/c/casual', image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg' },
              { name: 'Formal', href: '/c/formal', image: '/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg' },
              { name: 'Dresses', href: '/c/dresses', image: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg' },
              { name: 'Designer', href: '/c/designer', image: '/clothes/two-fashion-designers-atelier-with-dress-form.jpg' },
              { name: 'Accessories', href: '/c/accessories', image: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg' },
              { name: 'Sportswear', href: '/c/sportswear', image: '/clothes/vyjby_512.webp' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-4">
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black">NEW ARRIVALS</h2>
            <Link href="/new" className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { id: 1, image: '/clothes/vyjby_512.webp', name: 'Premium Cotton T-Shirt', price: 699, oldPrice: 999 },
              { id: 2, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg', name: 'Casual Hoodie', price: 1299, oldPrice: 1799 },
              { id: 3, image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg', name: 'Summer Shirt', price: 899, oldPrice: 1299 },
              { id: 4, image: '/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg', name: 'Formal Blazer', price: 2499, oldPrice: 3499 },
              { id: 5, image: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg', name: 'Designer Dress', price: 1999, oldPrice: 2999 },
              { id: 6, image: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg', name: 'Stylish Jacket', price: 1799, oldPrice: 2499 },
              { id: 7, image: '/clothes/vyjby_512.webp', name: 'Graphic Tee', price: 599, oldPrice: 899 },
              { id: 8, image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg', name: 'Winter Coat', price: 2999, oldPrice: 4499 },
            ].map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group"
              >
                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                    NEW
                  </div>
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{item.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{item.oldPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Banner */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <Image
          src="/clothes/two-fashion-designers-atelier-with-dress-form.jpg"
          alt="Brand Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 via-yellow-500/90 to-orange-500/90"></div>
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            ALL EYES ON YOU
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Homegrown & Proud Since 2012
          </p>
          <Link
            href="/about"
            className="inline-block bg-white text-black px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 border-t bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/icons/free-delivery.png"
                  alt="Free Shipping"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹999</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/icons/return.png"
                  alt="Easy Returns"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/icons/cash-on-delivery.png"
                  alt="COD Available"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">COD Available</h3>
              <p className="text-sm text-gray-600">Cash on delivery</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 relative">
                <Image
                  src="/icons/trust.png"
                  alt="100% Authentic"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">100% Authentic</h3>
              <p className="text-sm text-gray-600">Original products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
