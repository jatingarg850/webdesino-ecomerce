import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webdesino Shoes - Premium Footwear",
  description: "Step into excellence with Webdesino premium shoe collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black text-gray-900 tracking-tight">
              WEBDESINO
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/products" className="text-gray-700 hover:text-gray-900 font-semibold transition">
                Shop
              </Link>
              <Link href="/products?category=new" className="text-gray-700 hover:text-gray-900 font-semibold transition">
                New
              </Link>
              <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 font-semibold transition">
                Cart
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/admin" className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                Admin
              </Link>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
