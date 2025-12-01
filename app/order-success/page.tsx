'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, FileText } from 'lucide-react';
import InvoiceViewer from '@/components/invoice/invoice-viewer';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [storeSettings, setStoreSettings] = useState<any>(null);

  useEffect(() => {
    // Load store settings
    const settings = localStorage.getItem('storeSettings');
    if (settings) {
      setStoreSettings(JSON.parse(settings));
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="grid grid-cols-2 gap-4 text-left mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order Number</div>
                  <div className="font-bold">{order.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                  <div className="font-bold text-lg">₹{order.total}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Payment Method</div>
                  <div className="font-bold">{order.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order Status</div>
                  <div className="font-bold text-green-600">{order.orderStatus}</div>
                </div>
              </div>
              <button
                onClick={() => setShowInvoice(true)}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-black text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-50 transition"
              >
                <FileText size={20} />
                View Invoice
              </button>
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

        {/* Invoice Modal */}
        {showInvoice && order && (
          <InvoiceViewer
            order={order}
            onClose={() => setShowInvoice(false)}
            storeSettings={storeSettings}
          />
        )}
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
