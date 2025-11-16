import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Featured">
        <div className="hero-img" aria-hidden="true"></div>
        <div className="hero-content">
          <div className="eyebrow">Festive Drop</div>
          <h1>Comfort-first streetwear that stands out</h1>
          <p>Explore breathable cottons, bold graphics, and versatile fits crafted for all‑day wear and all‑season style.</p>
          <Link className="cta" href="/products">Shop new arrivals →</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="section" aria-label="Shop by category">
        <h2>Shop by category</h2>
        <div className="grid-cat">
          <Link className="cat" href="/products?category=tshirts">
            <img src="https://images.unsplash.com/photo-1520975922284-85e0b55e4be1?q=80&w=800&auto=format&fit=crop" alt="T-Shirts" />
            <span>T-Shirts</span>
          </Link>
          <Link className="cat" href="/products?category=hoodies">
            <img src="https://images.unsplash.com/photo-1602810318383-9e1e4f87cc25?q=80&w=800&auto=format&fit=crop" alt="Hoodies" />
            <span>Hoodies</span>
          </Link>
          <Link className="cat" href="/products?category=joggers">
            <img src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop" alt="Joggers" />
            <span>Joggers</span>
          </Link>
          <Link className="cat" href="/products?category=shirts">
            <img src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop" alt="Shirts" />
            <span>Shirts</span>
          </Link>
          <Link className="cat" href="/products?category=backpacks">
            <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop" alt="Backpacks" />
            <span>Backpacks</span>
          </Link>
          <Link className="cat" href="/products?category=footwear">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Footwear" />
            <span>Footwear</span>
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="section" aria-label="Popular products">
        <h2>Popular picks</h2>
        <div className="grid">
          {/* Card 1 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1520975867597-0f8d7cc01f9b?q=80&w=900&auto=format&fit=crop" alt="Graphic Tee Black" />
            </div>
            <div className="meta">
              <div className="title">Graphic Tee — Black</div>
              <div className="price">
                <span className="now">₹699</span> 
                <span className="old">₹999</span> 
                <span className="badge">30% OFF</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">Wishlist</Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop" alt="Oversized Hoodie Sand" />
            </div>
            <div className="meta">
              <div className="title">Oversized Hoodie — Sand</div>
              <div className="price">
                <span className="now">₹1,499</span> 
                <span className="old">₹1,899</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">Wishlist</Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=900&auto=format&fit=crop" alt="Cargo Joggers Olive" />
            </div>
            <div className="meta">
              <div className="title">Cargo Joggers — Olive</div>
              <div className="price">
                <span className="now">₹1,199</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">Wishlist</Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="card">
            <div className="thumb">
              <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=900&auto=format&fit=crop" alt="Daily Backpack Slate" />
            </div>
            <div className="meta">
              <div className="title">Daily Backpack — Slate</div>
              <div className="price">
                <span className="now">₹1,399</span> 
                <span className="old">₹1,699</span>
              </div>
              <div className="actions">
                <Link className="btn" href="/wishlist">Wishlist</Link>
                <Link className="btn primary" href="/cart">Add to cart</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
