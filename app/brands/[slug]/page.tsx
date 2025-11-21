import Link from 'next/link';
import Image from 'next/image';
import { SlidersHorizontal } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Brand from '@/models/Brand';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

async function getBrandData(slug: string) {
  try {
    await connectDB();
    const brand = await Brand.findOne({ slug, active: true }).lean();
    
    if (!brand) {
      return null;
    }
    
    const brandData = brand as any;
    const products = await Product.find({ brand: brandData.name }).lean();
    
    return {
      brand: {
        ...brandData,
        _id: brandData._id.toString(),
      },
      products: products.map((p: any) => ({
        ...p,
        _id: p._id.toString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching brand data:', error);
    return null;
  }
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBrandData(slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Brand Not Found</h1>
          <Link href="/brands" className="text-blue-600 hover:underline">
            Back to Brands
          </Link>
        </div>
      </div>
    );
  }

  const { brand, products } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Hero */}
      <section className="relative h-[400px] bg-gradient-to-r from-purple-600 to-indigo-700 overflow-hidden">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                {brand.name}
              </h1>
              {brand.description && (
                <p className="text-xl text-white/90 mb-6">
                  {brand.description}
                </p>
              )}
              <div className="flex gap-4 items-center text-white">
                <span className="text-lg font-semibold">{products.length} Products</span>
              </div>
            </div>
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
            {products.length > 0 ? (
              products.map((product) => (
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
                      <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
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
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products available for this brand</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
