'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { AuthModal } from '@/components/auth/auth-modal';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Check authentication on mount
  useEffect(() => {
    // TODO: Replace with actual auth check
    const checkAuth = () => {
      // For now, check if user data exists in localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        setShowAuthModal(true);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const subtotal = getTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'COD') {
        // Create order directly for COD
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'guest', // Replace with actual user ID when auth is implemented
            items: items.map(item => ({
              productId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            })),
            shippingAddress: formData,
            paymentMethod: 'COD',
            paymentStatus: 'PENDING',
            orderStatus: 'PENDING',
            subtotal,
            shipping,
            total,
          }),
        });

        const { order } = await orderResponse.json();
        
        clearCart();
        router.push(`/order-success?orderId=${order._id}`);
      } else {
        // Create Razorpay order
        const response = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
          }),
        });

        const { order } = await response.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Webdesino',
          description: 'Purchase from Webdesino Store',
          order_id: order.id,
          handler: async function (response: any) {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.verified) {
              // Create order in database
              const orderResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: 'guest',
                  items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                  })),
                  shippingAddress: formData,
                  paymentMethod: 'ONLINE',
                  paymentStatus: 'PAID',
                  orderStatus: 'CONFIRMED',
                  subtotal,
                  shipping,
                  total,
                }),
              });

              const { order: dbOrder } = await orderResponse.json();
              
              clearCart();
              router.push(`/order-success?orderId=${dbOrder._id}`);
            } else {
              alert('Payment verification failed');
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#000000',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          router.push('/cart');
        }}
        defaultTab="login"
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <h1 className="text-3xl font-black mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="ONLINE"
                      checked={paymentMethod === 'ONLINE'}
                      onChange={() => setPaymentMethod('ONLINE')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Online Payment</div>
                      <div className="text-sm text-gray-600">Pay securely with Razorpay (UPI, Cards, Wallets)</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive the order</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-black mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-semibold line-clamp-1">{item.name}</div>
                        <div className="text-gray-600">
                          {item.size} | {item.color} | Qty: {item.quantity}
                        </div>
                        <div className="font-semibold">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-black">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order' : 'Pay Now'}
                </button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms & Conditions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
