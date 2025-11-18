'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, MapPin, Heart, User, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';

export default function AccountPage() {
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setShowAuthModal(true);
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    router.push('/');
  };

  if (showAuthModal) {
    return (
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          router.push('/');
        }}
        defaultTab="login"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">My Account</h1>
          {user && <p className="text-gray-600">Welcome back, {user.name}!</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/account/orders"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition"
          >
            <Package className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-bold mb-2">Orders</h3>
            <p className="text-gray-600 text-sm">Track and manage your orders</p>
          </Link>

          <Link
            href="/account/addresses"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition"
          >
            <MapPin className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">Addresses</h3>
            <p className="text-gray-600 text-sm">Manage delivery addresses</p>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition"
          >
            <Heart className="w-12 h-12 mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Wishlist</h3>
            <p className="text-gray-600 text-sm">Your saved items</p>
          </Link>

          <Link
            href="/account/profile"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition"
          >
            <User className="w-12 h-12 mb-4 text-purple-600" />
            <h3 className="text-xl font-bold mb-2">Profile</h3>
            <p className="text-gray-600 text-sm">Edit your information</p>
          </Link>

          <button 
            onClick={handleLogout}
            className="bg-white rounded-xl p-6 hover:shadow-lg transition text-left"
          >
            <LogOut className="w-12 h-12 mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">Logout</h3>
            <p className="text-gray-600 text-sm">Sign out of your account</p>
          </button>
        </div>
      </div>
    </div>
  );
}
