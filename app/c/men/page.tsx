import Link from 'next/link';

const menProducts = [
  {
    id: 1,
    name: "Graphic Tee — Black",
    price: 699,
    oldPrice: 999,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=900&auto=format&fit=crop",
    category: "T-Shirts"
  },
  {
    id: 2,
    name: "Oversized Hoodie — Sand",
    price: 1499,
    oldPrice: 1899,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop",
    category: "Hoodies"
  },
  {
    id: 3,
    name: "Cargo Joggers — Olive",
    price: 1199,
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=900&auto=format&fit=crop",
    category: "Joggers"
  },
  {
    id: 4,
    name: "Slim Fit Shirt — Navy",
    price: 1299,
    oldPrice: 1599,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=900&auto=format&fit=crop",
    category: "Shirts"
  },
  {
    id: 5,
    name: "Printed Tee — White",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
    category: "T-Shirts"
  },
  {
    id: 6,
    name: "Zip Hoodie — Charcoal",
    price: 1699,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
    category: "Hoodies"
  },
  {
    id: 7,
    name: "Track Pants — Black",
    price: 999,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
    category: "Joggers"
  },
  {
    id: 8,
    name: "Denim Shirt — Blue",
    price: 1499,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900&auto=format&fit=crop",
    category: "Shirts"
  }
];

export default function MenPage() {
  return (
    <>
      {/* Page Header */}
      <section className="section">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Men's Collection</h1>
          <p style={{ color: 'var(--sub)', fontSize: '16px' }}>Discover comfort-first streetwear designed for the modern man</p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button className="filter-pill active">All</button>
          <button className="filter-pill">T-Shirts</button>
          <button className="filter-pill">Hoodies</button>
          <button className="filter-pill">Joggers</button>
          <button className="filter-pill">Shirts</button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="grid">
          {menProducts.map((product) => (
            <article key={product.id} className="card">
              <div className="thumb">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="meta">
                <div className="title">{product.name}</div>
                <div className="price">
                  <span className="now">₹{product.price}</span>
                  {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
                  {product.discount && <span className="badge">{product.discount}</span>}
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
