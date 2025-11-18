import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ category: 'men' }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function MenPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <Image
          src="/clothes/alexandra-gorn-WF0LSThlRmw-unsplash.jpg"
          alt="Men's Collection"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                MEN'S COLLECTION
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Discover the latest trends in men's fashion
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
            {['All', 'T-Shirts', 'Shirts', 'Hoodies', 'Jackets', 'Jeans', 'Formal', 'Casual'].map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full border-2 border-black font-semibold whitespace-nowrap hover:bg-black hover:text-white transition"
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

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <Image
                      src={product.images[0] || '/clothes/vyjby_512.webp'}
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
