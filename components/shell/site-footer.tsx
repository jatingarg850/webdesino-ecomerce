import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-col">
            <div className="footer-brand">
              <div className="brand-logo-footer"></div>
              <span className="brand-name-footer">webdesino</span>
            </div>
            <p className="footer-desc">
              Comfort-first streetwear that stands out. Quality clothing for the modern lifestyle.
            </p>
            </div>
          {/* Shop Links */}
          <div className="footer-col">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link href="/c/men">Men's Collection</Link></li>
              <li><Link href="/c/women">Women's Collection</Link></li>
              <li><Link href="/new">New Arrivals</Link></li>
              <li><Link href="/products">Sale</Link></li>
              <li><Link href="/bestsellers">Bestsellers</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="footer-col">
            <h4 className="footer-title">Help</h4>
            <ul className="footer-links">
              <li><Link href="/track-order">Track Order</Link></li>
              <li><Link href="/shipping">Shipping Info</Link></li>
              <li><Link href="/returns">Returns & Exchange</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="footer-title">Stay Updated</h4>
            <p className="newsletter-desc">Subscribe for exclusive drops, early access, and special offers.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
           
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© 2025 webdesino. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-divider">•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="footer-divider">•</span>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
