'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-9xl mb-8">🛒</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 text-lg mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-gray-900 mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item.variantSku} 
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gray-900 transition-all"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-5xl">👟</span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">
                          Size: <span className="font-semibold">{item.size}</span> | 
                          Color: <span className="font-semibold">{item.color}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantSku)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.variantSku, Math.max(1, item.quantity - 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition"
                        >
                          −
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantSku, item.quantity + 1)}
                          className="w-10 h-10 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-2xl font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">${(total() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-gray-900">
                      ${(total() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white py-4 rounded-full font-bold text-lg text-center hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl mb-4"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/products"
                className="block w-full text-center text-gray-600 hover:text-gray-900 font-semibold transition"
              >
                Continue Shopping
              </Link>

              {/* Promo Code */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-3">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-gray-900 focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
