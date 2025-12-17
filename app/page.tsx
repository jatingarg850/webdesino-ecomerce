import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ featured: true }).limit(8).lean();
    console.log('✓ Fetched products:', products.length);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('✗ Error fetching products:', error);
    return [];
  }
}

async function getTrendingCategories() {
  try {
    await dbConnect();
    const TrendingCategory = (await import('@/models/TrendingCategory')).default;
    const categories = await TrendingCategory.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .limit(8)
      .lean();
    console.log('✓ Fetched trending categories:', categories.length);
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error('✗ Error fetching trending categories:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const trendingCategories = await getTrendingCategories();

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
               POCKET MOUSE
                  <br />
                  <span className="text-gray-600">Soul of Korea</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/sale"
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
                    src="/ecom-clothes-photos-optimized/male/IMG-20251204-WA0028.webp"
                    alt="Fashion"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="w-56 h-80 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/ecom-clothes-photos-optimized/female/IMG_3931.webp"
                    alt="Fashion"
                    width={500}
                    height={700}
                    className="w-full h-full object-cover"
                    priority
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
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908721/webdesino-products/vnkbc2lpyedhv8alkzwp.jpg"
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
                src="https://res.cloudinary.com/dcu5kywhg/image/upload/v1763908722/webdesino-products/bfox9wx3jua0ie8zu0df.jpg"
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
            <Link href="/men" className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          {trendingCategories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {trendingCategories.map((cat: any) => (
                <Link
                  key={cat._id}
                  href={cat.linkUrl}
                  className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Image
                    src={cat.coverImage}
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
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed">
              <p className="text-gray-600 mb-2">No trending categories available</p>
              <p className="text-sm text-gray-500">Add trending categories from the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals - From Database */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black">NEW ARRIVALS</h2>
            <Link href="/men" className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
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
              <p className="text-gray-600">No products available. Run the seed script to add products.</p>
              <code className="text-sm bg-gray-200 px-3 py-1 rounded mt-2 inline-block">npm run seed</code>
            </div>
          )}
        </div>
      </section>

      {/* Brand Banner */}
      {/* All Eyes on You - Premium Denim Showcase */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900">
        {/* Floating Denim Texture Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Premium Denim Collection
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
                ALL EYES
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  ON YOU
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-2xl mx-auto">
                Where Style Meets Comfort
              </p>
              
              <p className="text-base md:text-lg text-blue-200/80 mb-12 max-w-3xl mx-auto">
                Discover our handpicked collection of premium denim. From classic cuts to contemporary styles, 
                find the perfect fit that makes you stand out.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/men"
                  className="group bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                >
                  Shop Men's Jeans
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  href="/women"
                  className="group bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                >
                  Shop Women's Jeans
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>

            {/* Stats/Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">100+</div>
                <div className="text-sm text-blue-200">Denim Styles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">50K+</div>
                <div className="text-sm text-blue-200">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">4.8★</div>
                <div className="text-sm text-blue-200">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>
          </div>
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
