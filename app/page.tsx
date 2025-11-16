import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Featured">
        <div className="hero-img" aria-hidden="true"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="eyebrow animate-fade-in">🔥 Festive Drop</div>
          <h1 className="animate-slide-up">Comfort-first streetwear that stands out</h1>
          <p className="animate-slide-up-delay">Explore breathable cottons, bold graphics, and versatile fits crafted for all‑day wear and all‑season style.</p>
          <Link className="cta animate-fade-in-delay" href="/new">
            Shop new arrivals →
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">4.8★</div>
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" aria-label="Shop by category">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Shop by category</h2>
          <Link href="/products" style={{ 
            color: 'var(--brand)', 
            textDecoration: 'none', 
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            View all →
          </Link>
        </div>
        <div className="grid-cat">
          <Link className="cat cat-hover" href="/products?category=tshirts">
            <img src="https://images.unsplash.com/photo-1520975922284-85e0b55e4be1?q=80&w=800&auto=format&fit=crop" alt="T-Shirts" />
            <div className="cat-overlay"></div>
            <span>T-Shirts</span>
          </Link>
          <Link className="cat cat-hover" href="/products?category=hoodies">
            <img src="https://images.unsplash.com/photo-1602810318383-9e1e4f87cc25?q=80&w=800&auto=format&fit=crop" alt="Hoodies" />
            <div className="cat-overlay"></div>
            <span>Hoodies</span>
          </Link>
          <Link className="cat cat-hover" href="/products?category=joggers">
            <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop" alt="Joggers" />
            <div className="cat-overlay"></div>
            <span>Joggers</span>
          </Link>
          <Link className="cat cat-hover" href="/products?category=shirts">
            <img src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop" alt="Shirts" />
            <div className="cat-overlay"></div>
            <span>Shirts</span>
          </Link>
          <Link className="cat cat-hover" href="/products?category=backpacks">
            <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop" alt="Backpacks" />
            <div className="cat-overlay"></div>
            <span>Backpacks</span>
          </Link>
          <Link className="cat cat-hover" href="/products?category=footwear">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Footwear" />
            <div className="cat-overlay"></div>
            <span>Footwear</span>
          </Link>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="featured-content">
          <div className="featured-badge">Limited Edition</div>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Winter Collection 2025</h2>
          <p style={{ color: 'var(--sub)', marginBottom: '20px' }}>Stay warm, stay stylish. Exclusive designs dropping this season.</p>
          <Link className="btn-outline" href="/new">Explore Collection</Link>
        </div>
        <div className="featured-image">
          <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop" alt="Winter Collection" />
        </div>
      </section>

      {/* Products */}
      <section className="section" aria-label="Popular products">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Popular picks</h2>
          <Link href="/products" style={{ 
            color: 'var(--brand)', 
            textDecoration: 'none', 
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            View all →
          </Link>
        </div>
        <div className="grid">
          {/* Card 1 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=900&auto=format&fit=crop" alt="Graphic Tee Black" />
              <div className="quick-view">Quick View</div>
            </div>
            <div className="meta">
              <div className="title">Graphic Tee — Black</div>
              <div className="price">
                <span className="now">₹699</span> 
                <span className="old">₹999</span> 
                <span className="badge">30% OFF</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">
                  <span>♡</span>
                </Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop" alt="Oversized Hoodie Sand" />
              <div className="quick-view">Quick View</div>
              <span className="trending-badge">🔥 Trending</span>
            </div>
            <div className="meta">
              <div className="title">Oversized Hoodie — Sand</div>
              <div className="price">
                <span className="now">₹1,499</span> 
                <span className="old">₹1,899</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">
                  <span>♡</span>
                </Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=900&auto=format&fit=crop" alt="Cargo Joggers Olive" />
              <div className="quick-view">Quick View</div>
            </div>
            <div className="meta">
              <div className="title">Cargo Joggers — Olive</div>
              <div className="price">
                <span className="now">₹1,199</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">
                  <span>♡</span>
                </Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=900&auto=format&fit=crop" alt="Daily Backpack Slate" />
              <div className="quick-view">Quick View</div>
            </div>
            <div className="meta">
              <div className="title">Daily Backpack — Slate</div>
              <div className="price">
                <span className="now">₹1,399</span> 
                <span className="old">₹1,699</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">
                  <span>♡</span>
                </Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
