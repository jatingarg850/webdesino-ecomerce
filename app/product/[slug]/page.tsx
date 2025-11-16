import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock product data
const products: Record<string, any> = {
  'graphic-tee-black': {
    name: 'Graphic Tee',
    subtitle: 'Black Edition',
    price: 699,
    originalPrice: 999,
    description: 'Premium cotton graphic tee with bold design. Comfortable fit for all-day wear.',
    details: [
      '100% Premium Cotton',
      'Regular Fit',
      'Machine Washable',
      'Imported'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  'oversized-hoodie-sand': {
    name: 'Oversized Hoodie',
    subtitle: 'Sand',
    price: 1499,
    originalPrice: 1899,
    description: 'Ultra-soft oversized hoodie perfect for layering. Features a relaxed fit and premium fleece interior.',
    details: [
      '80% Cotton, 20% Polyester',
      'Oversized Fit',
      'Fleece Interior',
      'Kangaroo Pocket'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  'cargo-joggers-olive': {
    name: 'Cargo Joggers',
    subtitle: 'Olive',
    price: 1199,
    description: 'Versatile cargo joggers with multiple pockets. Perfect blend of style and functionality.',
    details: [
      'Cotton Blend',
      'Tapered Fit',
      'Multiple Pockets',
      'Elastic Waistband'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  'daily-backpack-slate': {
    name: 'Daily Backpack',
    subtitle: 'Slate Grey',
    price: 1399,
    originalPrice: 1699,
    description: 'Spacious and durable backpack for everyday use. Features padded laptop compartment and multiple organizer pockets.',
    details: [
      'Water-Resistant Material',
      'Laptop Compartment (15")',
      'Multiple Pockets',
      'Padded Straps'
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    ]
  }
};

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="detail-grid">
        {/* Images */}
        <div className="detail-images">
          <div className="main-image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="thumbnail-grid">
            {product.images.map((img: string, idx: number) => (
              <div key={idx} className="thumbnail">
                <img src={img} alt={`${product.name} ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>

          <div className="detail-price">
            <span className="detail-price-now">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="detail-price-old">₹{product.originalPrice}</span>
                <span className="detail-discount">{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Size Selection */}
          <div className="size-section">
            <h3 className="size-title">Select Size</h3>
            <div className="size-grid">
              {product.sizes.map((size: string) => (
                <button key={size} className="size-btn">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button className="btn-add-cart">Add to Cart</button>
            <button className="btn-wishlist">♡</button>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h3 className="details-title">Product Details</h3>
            <ul className="details-list">
              {product.details.map((detail: string, idx: number) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
