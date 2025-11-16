import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/hero/image.png"
          alt="Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
            STEP INTO
            <br />
            <span className=" bg-clip-text bg-gradient-to-r ">
              EXCELLENCE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            Discover the perfect blend of style, comfort, and performance
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/products"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Shop Now
            </Link>
            <Link 
              href="/products?category=new"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all"
            >
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Shop by Style
            </h2>
            <p className="text-xl text-gray-600">Find your perfect fit</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Running', emoji: '🏃', color: 'from-red-500 to-orange-500' },
              { name: 'Sneakers', emoji: '👟', color: 'from-blue-500 to-cyan-500' },
              { name: 'Casual', emoji: '🚶', color: 'from-purple-500 to-pink-500' }
            ].map((cat) => (
              <Link 
                key={cat.name}
                href={`/products?category=${cat.name.toLowerCase()}`}
                className="group relative h-96  overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                  <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>
                  <h3 className="text-4xl font-black mb-2">{cat.name}</h3>
                  <p className="text-lg opacity-90">Explore Collection →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '✨', title: 'Premium Quality', desc: 'Authentic brands only' },
              { icon: '🔒', title: 'Secure Payment', desc: '100% protected checkout' }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Get exclusive access to new releases, special offers, and more
          </p>
          <div className="flex gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-bold transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-black mb-4">WEBDESINO</div>
          <p className="text-gray-400 mb-6">Step Into Excellence</p>
          <div className="flex gap-6 justify-center text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
          <div className="mt-8 text-gray-500 text-sm">
            © 2025 Webdesino. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
