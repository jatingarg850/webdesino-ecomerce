'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Search, CheckCircle, Truck, MapPin, Clock, X } from 'lucide-react';

export default function TrackOrderPage() {
  const [user, setUser] = useState<any>(null);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTrackForm, setShowTrackForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserOrders(parsedUser.id);
    }
  }, []);

  const fetchUserOrders = async (userId: string) => {
    try {
      const response = await fetch(`/api/orders/user?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setUserOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTrackedOrder(null);

    try {
      const response = await fetch(`/api/orders/track?orderNumber=${orderNumber}&email=${email}`);
      const data = await response.json();

      if (response.ok) {
        setTrackedOrder(data.order);
      } else {
        setError(data.error || 'Order not found');
      }
    } catch (error) {
      setError('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'text-green-600 bg-green-50';
      case 'SHIPPED': return 'text-blue-600 bg-blue-50';
      case 'CONFIRMED': return 'text-purple-600 bg-purple-50';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: 'Order Placed', icon: Package, status: 'PENDING' },
      { label: 'Confirmed', icon: CheckCircle, status: 'CONFIRMED' },
      { label: 'Shipped', icon: Truck, status: 'SHIPPED' },
      { label: 'Delivered', icon: MapPin, status: 'DELIVERED' },
    ];

    const statusOrder = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const OrderStatusTimeline = ({ order }: { order: any }) => {
    const steps = getStatusSteps(order.orderStatus);

    return (
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold mb-6">Order Status</h3>
        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon size={24} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute left-6 top-12 w-0.5 h-8 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className={`font-semibold ${step.completed ? 'text-black' : 'text-gray-400'}`}>
                    {step.label}
                  </div>
                  {step.active && (
                    <div className="text-sm text-gray-600 mt-1">
                      {order.orderStatus === 'PENDING' && 'Your order is being processed'}
                      {order.orderStatus === 'CONFIRMED' && 'Your order has been confirmed'}
                      {order.orderStatus === 'SHIPPED' && 'Your order is on the way'}
                      {order.orderStatus === 'DELIVERED' && 'Your order has been delivered'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const OrderCard = ({ order }: { order: any }) => (
    <div className="bg-white rounded-lg p-6 border hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Order Number</div>
          <div className="font-bold text-lg">{order.orderNumber}</div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
          {order.orderStatus}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div className="text-gray-600">Order Date</div>
          <div className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Total Amount</div>
          <div className="font-semibold">₹{order.total}</div>
        </div>
        <div>
          <div className="text-gray-600">Payment Method</div>
          <div className="font-semibold">{order.paymentMethod}</div>
        </div>
        <div>
          <div className="text-gray-600">Items</div>
          <div className="font-semibold">{order.items.length} item(s)</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {order.items.slice(0, 3).map((item: any, index: number) => (
          <div key={index} className="w-16 h-16 relative rounded-md overflow-hidden">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          </div>
        ))}
        {order.items.length > 3 && (
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-sm font-semibold">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      <button
        onClick={() => setTrackedOrder(order)}
        className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Track Your Orders</h1>
          <p className="text-gray-600">View and track all your orders in one place</p>
        </div>

        {/* User Orders Section */}
        {user && userOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Your Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {/* Track by Order Number */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Track by Order Number</h2>
            <button
              onClick={() => setShowTrackForm(!showTrackForm)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {showTrackForm ? 'Hide' : 'Show'} Form
            </button>
          </div>

          {showTrackForm && (
            <form onSubmit={handleTrack} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Order Number</label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., WD1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Search size={20} />
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          )}
        </div>

        {/* Order Details Modal */}
        {trackedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setTrackedOrder(null)}></div>
            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-black">Order Details</h2>
                <button
                  onClick={() => setTrackedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <OrderStatusTimeline order={trackedOrder} />

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Order Number</div>
                      <div className="font-semibold">{trackedOrder.orderNumber}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Order Date</div>
                      <div className="font-semibold">{new Date(trackedOrder.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Payment Method</div>
                      <div className="font-semibold">{trackedOrder.paymentMethod}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Payment Status</div>
                      <div className={`font-semibold ${trackedOrder.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {trackedOrder.paymentStatus}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
                  <div className="text-sm">
                    <div className="font-semibold mb-1">{trackedOrder.shippingAddress.name}</div>
                    <div className="text-gray-600">{trackedOrder.shippingAddress.phone}</div>
                    <div className="text-gray-600 mt-2">
                      {trackedOrder.shippingAddress.address}<br />
                      {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state}<br />
                      {trackedOrder.shippingAddress.pincode}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {trackedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold mb-1">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                          </div>
                          <div className="font-semibold mt-1">₹{item.price * item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{trackedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {trackedOrder.shipping === 0 ? 'FREE' : `₹${trackedOrder.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg border-t pt-2">
                      <span className="font-bold">Total</span>
                      <span className="font-black">₹{trackedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
