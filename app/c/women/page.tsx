import Link from 'next/link';

const womenProducts = [
  {
    id: 1,
    name: "Crop Top — Lavender",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=900&auto=format&fit=crop",
    category: "Tops"
  },
  {
    id: 2,
    name: "Oversized Hoodie — Pink",
    price: 1399,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
    category: "Hoodies"
  },
  {
    id: 3,
    name: "High-Waist Joggers — Grey",
    price: 1099,
    oldPrice: 1399,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=900&auto=format&fit=crop",
    category: "Joggers"
  },
  {
    id: 4,
    name: "Graphic Tee — White",
    price: 699,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop",
    category: "T-Shirts"
  },
  {
    id: 5,
    name: "Zip Hoodie — Beige",
    price: 1599,
    oldPrice: 1999,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
    category: "Hoodies"
  },
  {
    id: 6,
    name: "Sports Bra — Black",
    price: 799,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?q=80&w=900&auto=format&fit=crop",
    category: "Activewear"
  },
  {
    id: 7,
    name: "Boyfriend Tee — Sage",
    price: 649,
    oldPrice: 899,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
    category: "T-Shirts"
  },
  {
    id: 8,
    name: "Leggings — Navy",
    price: 999,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=900&auto=format&fit=crop",
    category: "Activewear"
  }
];

export default function WomenPage() {
  return (
    <>
      {/* Page Header */}
      <section className="section">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Women's Collection</h1>
          <p style={{ color: 'var(--sub)', fontSize: '16px' }}>Effortless style meets everyday comfort</p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button className="filter-pill active">All</button>
          <button className="filter-pill">Tops</button>
          <button className="filter-pill">Hoodies</button>
          <button className="filter-pill">Joggers</button>
          <button className="filter-pill">Activewear</button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="grid">
          {womenProducts.map((product) => (
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
