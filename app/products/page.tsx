import Link from 'next/link';

const saleProducts = [
  {
    id: 1,
    name: "Graphic Tee — Black",
    price: 699,
    oldPrice: 999,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Oversized Hoodie — Sand",
    price: 1499,
    oldPrice: 1899,
    discount: "21% OFF",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Track Pants — Black",
    price: 999,
    oldPrice: 1299,
    discount: "23% OFF",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Daily Backpack — Slate",
    price: 1399,
    oldPrice: 1699,
    discount: "18% OFF",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Crop Top — Lavender",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Slim Fit Shirt — Navy",
    price: 1299,
    oldPrice: 1599,
    discount: "19% OFF",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "High-Waist Joggers — Grey",
    price: 1099,
    oldPrice: 1399,
    discount: "21% OFF",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Boyfriend Tee — Sage",
    price: 649,
    oldPrice: 899,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
  }
];

export default function SalePage() {
  return (
    <>
      {/* Hero Banner */}
      <section style={{
        margin: '20px 0 32px',
        padding: '48px 32px',
        borderRadius: 'var(--radius)',
        background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(237,45,47,.25)'
      }}>
        <div style={{ 
          color: '#0b0b0c', 
          textTransform: 'uppercase', 
          fontSize: '12px', 
          letterSpacing: '.28em',
          marginBottom: '12px',
          fontWeight: '700'
        }}>
          LIMITED TIME OFFER
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: '#0b0b0c' }}>
          Sale — Up to 35% Off
        </h1>
        <p style={{ color: '#0b0b0c', fontSize: '16px', maxWidth: '600px', margin: '0 auto', opacity: .9 }}>
          Don't miss out on incredible deals. Stock up on your favorites while supplies last.
        </p>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div style={{ marginBottom: '20px' }}>
          <h2>Hot Deals</h2>
        </div>
        <div className="grid">
          {saleProducts.map((product) => (
            <article key={product.id} className="card">
              <div className="thumb">
                <img src={product.image} alt={product.name} />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'var(--brand)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '.05em'
                }}>
                  SALE
                </span>
              </div>
              <div className="meta">
                <div className="title">{product.name}</div>
                <div className="price">
                  <span className="now">₹{product.price}</span>
                  <span className="old">₹{product.oldPrice}</span>
                  <span className="badge">{product.discount}</span>
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
