import Link from "next/link";

export function SiteFooter() {
  return (
    <footer style={{
      marginTop: '36px',
      padding: '26px 0 40px',
      borderTop: '1px solid rgba(255,255,255,.06)',
      color: 'var(--sub)'
    }}>
      <div className="wrap foot">
        <small style={{ opacity: .85 }}>© 2025 webdesino • All rights reserved.</small>
        <div style={{ display: 'flex', gap: '14px' }}>
          <Link href="/privacy" style={{ textDecoration: 'none', color: 'var(--sub)' }}>Privacy</Link>
          <Link href="/terms" style={{ textDecoration: 'none', color: 'var(--sub)' }}>Terms</Link>
          <Link href="/support" style={{ textDecoration: 'none', color: 'var(--sub)' }}>Support</Link>
        </div>
      </div>
    </footer>
  );
}
