"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart, Menu, X, MapPin, Gift } from "lucide-react";

import { useCartStore } from "@/lib/store";

export function SiteHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getItemCount());

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-xs md:text-sm font-medium">
        <div className="container flex items-center justify-center gap-4">
          <Gift className="w-4 h-4" />
          <span>Free Shipping on Orders Above ₹999 | COD Available</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl md:text-3xl font-black tracking-tight">
                WEBDESINO
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/men" className="text-sm font-semibold hover:text-red-600 transition-colors">
                MEN JEANS
              </Link>
              <Link href="/women" className="text-sm font-semibold hover:text-red-600 transition-colors">
                WOMEN JEANS
              </Link>
              <Link href="/brands" className="text-sm font-semibold hover:text-red-600 transition-colors">
                BRANDS
              </Link>
              <Link href="/sale" className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                SALE
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Track Order */}
              <Link
                href="/track-order"
                className="hidden md:flex items-center gap-1 text-sm hover:text-red-600 transition-colors"
              >
                <MapPin size={18} />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Account"
                title={user ? `Logged in as ${user.name}` : 'Account'}
              >
                <User size={20} />
                {user && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white animate-slide-in">
          <div className="container py-6">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl font-black">MENU</div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-6">
              <Link
                href="/men"
                className="block text-xl font-semibold hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MEN JEANS
              </Link>
              <Link
                href="/women"
                className="block text-xl font-semibold hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                WOMEN JEANS
              </Link>
              <Link
                href="/brands"
                className="block text-xl font-semibold hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                BRANDS
              </Link>
              <Link
                href="/sale"
                className="block text-xl font-semibold text-red-600 hover:text-red-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SALE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
