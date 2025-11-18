'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // In a real app, fetch order details from API
      setOrder({
        orderNumber: 'WD' + Date.now(),
        total: 0,
        paymentMethod: 'COD',
      });
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading order details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-black mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {order && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order Number</div>
                  <div className="font-bold">{order.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Payment Method</div>
                  <div className="font-bold">{order.paymentMethod}</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="text-left flex-1">
                <div className="font-semibold">Order Confirmed</div>
                <div className="text-sm text-gray-600">We've received your order</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg opacity-50">
              <Truck className="w-8 h-8 text-gray-400" />
              <div className="text-left flex-1">
                <div className="font-semibold">Shipping Soon</div>
                <div className="text-sm text-gray-600">Your order will be shipped within 2-3 days</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/account/orders"
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="border px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
