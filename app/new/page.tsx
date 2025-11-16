import Link from 'next/link';

const newArrivals = [
  {
    id: 1,
    name: "Gradient Hoodie — Sunset",
    price: 1799,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Hoodies"
  },
  {
    id: 2,
    name: "Oversized Tee — Charcoal",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "T-Shirts"
  },
  {
    id: 3,
    name: "Tech Joggers — Black",
    price: 1399,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Joggers"
  },
  {
    id: 4,
    name: "Utility Backpack — Olive",
    price: 1599,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Graphic Tee — Neon",
    price: 749,
    image: "https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "T-Shirts"
  },
  {
    id: 6,
    name: "Puffer Jacket — Navy",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Jackets"
  },
  {
    id: 7,
    name: "Cargo Pants — Khaki",
    price: 1499,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Pants"
  },
  {
    id: 8,
    name: "Cropped Hoodie — Cream",
    price: 1299,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
    badge: "NEW",
    category: "Hoodies"
  }
];

export default function NewPage() {
  return (
    <>
      {/* Hero Banner */}
      <section style={{
        margin: '20px 0 32px',
        padding: '48px 32px',
        borderRadius: 'var(--radius)',
        background: 'linear-gradient(135deg, #17181c, #101216)',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,.06)'
      }}>
        <div className="eyebrow" style={{ marginBottom: '12px' }}>JUST DROPPED</div>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px' }}>New Arrivals</h1>
        <p style={{ color: 'var(--sub)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Fresh styles, bold designs, and comfort you can count on. Shop the latest drops before they're gone.
        </p>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="grid">
          {newArrivals.map((product) => (
            <article key={product.id} className="card">
              <div className="thumb">
                <img src={product.image} alt={product.name} />
                {product.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--brand)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '.05em'
                  }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="meta">
                <div className="title">{product.name}</div>
                <div className="price">
                  <span className="now">₹{product.price}</span>
                </div>
                <div className="actions">
                  <Link className="btn" href="/wishlist">Wishlist</Link>
                  <Link className="btn primary" href="/cart">Add to cart</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
