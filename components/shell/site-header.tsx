"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Heart, Menu, X, MapPin, Gift, ChevronDown } from "lucide-react";

import { useCartStore } from "@/lib/store";
import { CartBadge } from "./cart-badge";

export function SiteHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [menDropdownOpen, setMenDropdownOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);
  const [menSubcategories, setMenSubcategories] = useState<any[]>([]);
  const [womenSubcategories, setWomenSubcategories] = useState<any[]>([]);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const [menRes, womenRes] = await Promise.all([
          fetch('/api/admin/subcategories?category=men'),
          fetch('/api/admin/subcategories?category=women')
        ]);
        
        const menData = await menRes.json();
        const womenData = await womenRes.json();
        
        if (menData.success) {
          setMenSubcategories(menData.subcategories.filter((sub: any) => sub.isActive));
        }
        if (womenData.success) {
          setWomenSubcategories(womenData.subcategories.filter((sub: any) => sub.isActive));
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
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
      <div className="bg-black text-white text-center py-2 text-[10px] sm:text-xs md:text-sm font-medium overflow-hidden">
        <div className="container flex items-center justify-center gap-2 md:gap-4 px-2">
          <Gift className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">Free Shipping on Orders Above ₹999 | COD Available</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container overflow-visible">
          <div className="flex items-center justify-between py-3 gap-2 overflow-visible">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo - Responsive sizing */}
            <Link href="/" className="flex items-center flex-shrink-0 lg:mr-8">
              <Image
                src="/logo/logoo.png"
                alt="Pocket Mouse"
                width={30}
                height={32}
                className="h-6 w-auto md:h-7 lg:h-9"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 static">
              {/* Men's Dropdown */}
              <div 
                className="relative static lg:relative"
                onMouseEnter={() => setMenDropdownOpen(true)}
                onMouseLeave={() => setMenDropdownOpen(false)}
              >
                <button className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1 py-2">
                  MEN
                  <ChevronDown size={16} className={`transition-transform ${menDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {menDropdownOpen && (
                  <div className="absolute left-0 pt-2 z-[9999]" style={{ top: '100%' }}>
                    <div className="bg-white border shadow-2xl rounded-lg py-2 min-w-[200px] max-h-[400px] overflow-y-auto">
                      <Link href="/men" className="block px-4 py-2 text-sm hover:bg-gray-100 font-semibold">
                        All Jeans
                      </Link>
                      {menSubcategories.length > 0 ? (
                        menSubcategories.map((sub) => (
                          <Link 
                            key={sub._id} 
                            href={`/men?subcategory=${sub.slug}`} 
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">No subcategories</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Women's Dropdown */}
              <div 
                className="relative static lg:relative"
                onMouseEnter={() => setWomenDropdownOpen(true)}
                onMouseLeave={() => setWomenDropdownOpen(false)}
              >
                <button className="text-sm font-semibold hover:text-red-600 transition-colors flex items-center gap-1 py-2">
                  WOMEN 
                  <ChevronDown size={16} className={`transition-transform ${womenDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {womenDropdownOpen && (
                  <div className="absolute left-0 pt-2 z-[9999]" style={{ top: '100%' }}>
                    <div className="bg-white border shadow-2xl rounded-lg py-2 min-w-[200px] max-h-[400px] overflow-y-auto">
                      <Link href="/women" className="block px-4 py-2 text-sm hover:bg-gray-100 font-semibold">
                        All Jeans
                      </Link>
                      {womenSubcategories.length > 0 ? (
                        womenSubcategories.map((sub) => (
                          <Link 
                            key={sub._id} 
                            href={`/women?subcategory=${sub.slug}`} 
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">No subcategories</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-sm font-semibold hover:text-red-600 transition-colors">
                ABOUT
              </Link>
              <Link href="/sale" className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                SALE
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2 ml-auto flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={19} className="md:w-5 md:h-5" />
              </button>

              {/* Track Order - Desktop only */}
              <Link
                href="/track-order"
                className="hidden md:flex items-center gap-1 text-sm hover:text-red-600 transition-colors p-2"
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
                <User size={19} className="md:w-5 md:h-5" />
                {user && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </Link>

              {/* Wishlist - Hidden on small mobile */}
              <Link
                href="/wishlist"
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={19} className="md:w-5 md:h-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={19} className="md:w-5 md:h-5" />
                <CartBadge />
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
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-[60] bg-black/50 animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-[70] w-[80%] max-w-[320px] bg-white shadow-2xl overflow-y-auto animate-slide-in-left">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <Image
                  src="/logo/logoo.png"
                  alt="Pocket Mouse"
                  width={30}
                  height={40}
                  className="h-8 w-auto"
                />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="space-y-2">
                {/* Men's Section */}
                <div className="border-b pb-2">
                  <button
                    onClick={() => setMobileMenOpen(!mobileMenOpen)}
                    className="flex items-center justify-between w-full text-left text-lg font-bold hover:text-red-600 transition-colors py-3"
                  >
                    <span>MEN JEANS</span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-200 ${mobileMenOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileMenOpen && (
                    <div className="ml-4 mt-2 space-y-2 animate-fade-in">
                      <Link
                        href="/men"
                        className="block text-base text-gray-700 hover:text-red-600 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Jeans
                      </Link>
                      {menSubcategories.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/men?subcategory=${sub.slug}`}
                          className="block text-base text-gray-600 hover:text-red-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Women's Section */}
                <div className="border-b pb-2">
                  <button
                    onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
                    className="flex items-center justify-between w-full text-left text-lg font-bold hover:text-red-600 transition-colors py-3"
                  >
                    <span>WOMEN JEANS</span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-200 ${mobileWomenOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileWomenOpen && (
                    <div className="ml-4 mt-2 space-y-2 animate-fade-in">
                      <Link
                        href="/women"
                        className="block text-base text-gray-700 hover:text-red-600 transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Jeans
                      </Link>
                      {womenSubcategories.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/women?subcategory=${sub.slug}`}
                          className="block text-base text-gray-600 hover:text-red-600 transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <Link
                  href="/about"
                  className="block text-lg font-bold hover:text-red-600 transition-colors py-3 border-b"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>

                {/* Sale */}
                <Link
                  href="/sale"
                  className="block text-lg font-bold text-red-600 hover:text-red-700 transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SALE
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
