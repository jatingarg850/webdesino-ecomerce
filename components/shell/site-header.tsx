import Link from "next/link";

export function SiteHeader() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(10,11,13,.7)',
      backdropFilter: 'saturate(140%) blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,.06)'
    }}>
      <div className="wrap topbar">
        <Link className="brand" href="/">
          <div className="brand-logo" aria-hidden="true"></div>
          <span className="brand-name">webdesino</span>
        </Link>
        
        <nav className="nav" aria-label="Primary">
          <Link href="/c/men">Men</Link>
          <Link href="/c/women">Women</Link>
          <Link href="/new">New</Link>
          <Link href="/products?sale=true">Sale</Link>
        </nav>
        
        <div className="search">
          <label style={{ position: 'absolute', left: '-9999px' }}>Search</label>
          <input type="search" placeholder="Search products" />
        </div>
      </div>
    </header>
  );
}
