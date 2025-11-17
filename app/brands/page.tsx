import Link from 'next/link';
import Image from 'next/image';

export default function BrandsPage() {
  const brands = [
    { name: 'Premium Collection', image: '/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg', products: 150 },
    { name: 'Designer Studio', image: '/clothes/two-fashion-designers-atelier-with-dress-form.jpg', products: 89 },
    { name: 'Casual Wear', image: '/clothes/parker-burchfield-tvG4WvjgsEY-unsplash.jpg', products: 234 },
    { name: 'Elegant Fashion', image: '/clothes/heather-ford-5gkYsrH_ebY-unsplash.jpg', products: 178 },
    { name: 'Street Style', image: '/clothes/keagan-henman-xPJYL0l5Ii8-unsplash.jpg', products: 156 },
    { name: 'Classic Trends', image: '/clothes/junko-nakase-Q-72wa9-7Dg-unsplash.jpg', products: 203 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-purple-600 to-indigo-700 overflow-hidden">
        <Image
          src="/clothes/two-fashion-designers-atelier-with-dress-form.jpg"
          alt="Brands"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              OUR BRANDS
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Discover premium fashion from top designers
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">FEATURED BRANDS</h2>
            <p className="text-gray-600">Explore our curated collection of premium brands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8">
                  <h3 className="text-2xl font-black mb-2">{brand.name}</h3>
                  <p className="text-sm opacity-90">{brand.products} Products</p>
                  <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Explore
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Brands */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">WHY CHOOSE OUR BRANDS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handpicked brands with exceptional quality standards</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Unique Designs</h3>
              <p className="text-gray-600">Exclusive collections from renowned designers</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Trusted Names</h3>
              <p className="text-gray-600">Partnered with the most trusted fashion brands</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
