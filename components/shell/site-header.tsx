import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="header-light">
      <div className="wrap">
        <div className="header-grid">
          {/* Left Nav */}
          <nav className="nav-left" aria-label="Primary">
            <Link href="/c/men">Men</Link>
            <Link href="/c/women">Women</Link>
          </nav>
          
          {/* Center Logo */}
          <Link className="brand-center" href="/">
            <div className="brand-logo" aria-hidden="true"></div>
            <span className="brand-name">webdesino</span>
          </Link>
          
          {/* Right Nav */}
          <nav className="nav-right" aria-label="Secondary">
            <Link href="/new">New</Link>
            <Link href="/products">Sale</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
