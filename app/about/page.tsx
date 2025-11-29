import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908729/webdesino-products/lhl2bqyoxzca33mt0x63.jpg"
          alt="POCKET MOUSE Denim"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-white/30">
                  Est. 2024
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
                POCKET MOUSE
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  DENIM FOR ALL
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                High-quality denim accessible to everyone. Premium feel, affordable price — ₹1000–₹1200.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/men"
                  className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Explore Collection
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908726/webdesino-products/kmfzxc1k7btmb3ddhjdv.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-block mb-4">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Born in the Hills of
                <span className="text-blue-600"> Northeast India</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-black">Pocket Mouse</strong> is a modern denim brand born in the hills of the Northeast, 
                  built with one mission — to make high-quality denim accessible to everyone.
                </p>
                <p>
                  We design jeans that fit real people, last longer, and feel premium without the premium price tag. 
                  Our focus is simple: great fabric, great durability, great style — at just ₹1000–₹1200.
                </p>
                <p>
                  Pocket Mouse is made for the youth, the creators, the dreamers, and for anyone who wants effortless style every day.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                <div>
                  <div className="text-3xl font-black text-blue-600">₹1000</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Denim Styles</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-600">4.8★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              From Fabric to Fashion
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every pair of POCKET MOUSE jeans goes through our meticulous 5-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Fabric Selection</h3>
              <p className="text-sm text-gray-600">Premium denim sourced from trusted mills</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Design & Cut</h3>
              <p className="text-sm text-gray-600">Precision cutting for perfect fit</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Stitching</h3>
              <p className="text-sm text-gray-600">Master craftsmen ensure durability</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Check</h3>
              <p className="text-sm text-gray-600">Rigorous testing for perfection</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                5
              </div>
              <h3 className="font-bold text-lg mb-2">To Your Door</h3>
              <p className="text-sm text-gray-600">Fast, secure delivery to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908725/webdesino-products/gmd0go065j8vsxzzzuf1.jpg"
                alt="Denim Collection"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908721/webdesino-products/vnkbc2lpyedhv8alkzwp.jpg"
                alt="Denim Collection"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908722/webdesino-products/bfox9wx3jua0ie8zu0df.jpg"
                alt="Denim Collection"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763743836/webdesino-products/nwnfgeaujg3tj3ohraw2.png"
                alt="Denim Collection"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Best jeans I've ever owned! The fit is perfect and the quality is outstanding. 
                Worth every rupee."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  R
                </div>
                <div>
                  <div className="font-bold">Rahul Sharma</div>
                  <div className="text-sm text-gray-500">Mumbai</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Finally found jeans that actually fit! The straight fit is amazing. 
                Fast delivery and great customer service too."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                  P
                </div>
                <div>
                  <div className="font-bold">Priya Patel</div>
                  <div className="text-sm text-gray-500">Delhi</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Ordered 3 pairs and love them all! The fabric quality is premium and 
                they're so comfortable. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                  A
                </div>
                <div>
                  <div className="font-bold">Arjun Singh</div>
                  <div className="text-sm text-gray-500">Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
            Effortless Style
            <br />
            Every Day
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Premium denim for the youth, creators, and dreamers — at just ₹1000–₹1200
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/men"
              className="bg-white text-black px-10 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Shop Men's Collection
            </Link>
            <Link
              href="/women"
              className="bg-black/30 backdrop-blur-sm text-white border-2 border-white px-10 py-5 rounded-xl font-bold hover:bg-black/50 transition-all duration-300 transform hover:scale-105"
            >
              Shop Women's Collection
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-white">
              <div className="text-4xl font-black mb-2">₹1000</div>
              <div className="text-blue-200 text-sm">Starting Price</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-black mb-2">Premium</div>
              <div className="text-blue-200 text-sm">Quality Fabric</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-black mb-2">Real</div>
              <div className="text-blue-200 text-sm">Fit for People</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-black mb-2">Durable</div>
              <div className="text-blue-200 text-sm">Long Lasting</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
