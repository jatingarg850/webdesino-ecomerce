import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-8">My Account</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/account/orders" className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <p className="text-gray-600 text-sm">Track your orders</p>
        </Link>
        
        <Link href="/account/addresses" className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
          <div className="text-4xl mb-3">📍</div>
          <h3 className="text-xl font-bold mb-2">Addresses</h3>
          <p className="text-gray-600 text-sm">Manage addresses</p>
        </Link>
        
        <Link href="/wishlist" className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
          <div className="text-4xl mb-3">❤️</div>
          <h3 className="text-xl font-bold mb-2">Wishlist</h3>
          <p className="text-gray-600 text-sm">Saved items</p>
        </Link>
        
        <Link href="/account/profile" className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
          <div className="text-4xl mb-3">👤</div>
          <h3 className="text-xl font-bold mb-2">Profile</h3>
          <p className="text-gray-600 text-sm">Edit your details</p>
        </Link>
        
        <Link href="/membership" className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
          <div className="text-4xl mb-3">⭐</div>
          <h3 className="text-xl font-bold mb-2">Membership</h3>
          <p className="text-gray-600 text-sm">Manage membership</p>
        </Link>
        
        <button className="border rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition text-left">
          <div className="text-4xl mb-3">🚪</div>
          <h3 className="text-xl font-bold mb-2">Logout</h3>
          <p className="text-gray-600 text-sm">Sign out</p>
        </button>
      </div>
    </div>
  );
}
