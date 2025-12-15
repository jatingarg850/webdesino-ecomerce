'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone'); // 'phone' or 'otp'
  const [error, setError] = useState('');
  const { items: cartItems } = useCartStore();

  // Phone step
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  // OTP step
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  const syncCart = async (userId: string) => {
    if (cartItems.length > 0) {
      try {
        await fetch('/api/cart/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            cartItems: cartItems.map(item => ({
              productId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            })),
          }),
        });
      } catch (error) {
        console.error('Cart sync error:', error);
      }
    }
  };

  if (!isOpen) return null;

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate phone number
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      // For signup, name is required
      if (activeTab === 'signup' && !name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }

      console.log('📱 Sending OTP request:', { phone, name: activeTab === 'signup' ? name : undefined });
      
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.toString(), // Ensure it's a string
          name: activeTab === 'signup' ? name : undefined,
        }),
      });

      console.log('📱 Response status:', response.status);
      console.log('📱 Response headers:', response.headers.get('content-type'));
      console.log('📱 Response ok:', response.ok);

      // Get response text first to debug
      const responseText = await response.text();
      console.log('📱 Raw response text:', responseText);

      let data: { error?: string; [key: string]: unknown } = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ Failed to parse response:', parseError);
          console.error('❌ Response text:', responseText);
          setError('Server error: Invalid response format');
          setLoading(false);
          return;
        }
      }

      console.log('📱 Parsed OTP response:', { status: response.status, data, ok: response.ok });

      if (response.ok) {
        setStep('otp');
        setOtpTimer(60); // 60 seconds timer
        
        // Start countdown
        const interval = setInterval(() => {
          setOtpTimer(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        console.error('❌ OTP send failed:', { status: response.status, data });
        setError(data.error || `Failed to send OTP (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('❌ Send OTP error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Network error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Sync cart with database
        await syncCart(data.user.id);
        
        // Close modal and refresh
        onClose();
        window.location.reload(); // Refresh to update auth state
      } else {
        setError(data.error || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          name: activeTab === 'signup' ? name : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtp('');
        setOtpTimer(60);
        
        // Start countdown
        const interval = setInterval(() => {
          setOtpTimer(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-black text-center">Welcome to POCKET MOUSE</h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            {step === 'phone' ? 'Enter your phone number' : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {/* Tabs - Only show if on phone step */}
        {step === 'phone' && (
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('login');
                setError('');
                setPhone('');
                setName('');
              }}
              className={`flex-1 py-3 font-semibold transition ${
                activeTab === 'login'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setError('');
                setPhone('');
                setName('');
              }}
              className={`flex-1 py-3 font-semibold transition ${
                activeTab === 'signup'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <span className="px-4 py-3 border rounded-lg bg-gray-50 text-gray-600 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">We'll send you an OTP to verify your number</p>
              </div>
              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Enter OTP</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2">
                  OTP sent to +91{phone}
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-semibold">{otpTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-sm text-gray-600 hover:text-black py-2"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
