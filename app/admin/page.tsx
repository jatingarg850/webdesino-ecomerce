'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      
      // Fetch all orders (you'll need to create this endpoint)
      const ordersRes = await fetch('/api/admin/orders');
      const ordersData = await ordersRes.json();
      
      // Fetch users
      const usersRes = await fetch('/api/admin/users');
      const usersData = await usersRes.json();

      const orders = ordersData.orders || [];
      
      setStats({
        totalProducts: productsData.products?.length || 0,
        totalOrders: orders.length,
        totalUsers: usersData.users?.length || 0,
        totalRevenue: orders.reduce((sum: number, order: any) => sum + order.total, 0),
        pendingOrders: orders.filter((o: any) => o.orderStatus === 'PENDING').length,
        confirmedOrders: orders.filter((o: any) => o.orderStatus === 'CONFIRMED').length,
        shippedOrders: orders.filter((o: any) => o.orderStatus === 'SHIPPED').length,
        deliveredOrders: orders.filter((o: any) => o.orderStatus === 'DELIVERED').length,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'bg-green-500',
      link: '/admin/orders'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      link: '/admin/orders'
    },
    { 
      label: 'Total Products', 
      value: stats.totalProducts, 
      icon: Package, 
      color: 'bg-purple-500',
      link: '/admin/products'
    },
    { 
      label: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      color: 'bg-orange-500',
      link: '/admin/users'
    },
  ];

  const orderStatusCards = [
    { label: 'Pending', value: stats.pendingOrders, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Confirmed', value: stats.confirmedOrders, icon: CheckCircle, color: 'bg-blue-500' },
    { label: 'Shipped', value: stats.shippedOrders, icon: Truck, color: 'bg-purple-500' },
    { label: 'Delivered', value: stats.deliveredOrders, icon: CheckCircle, color: 'bg-green-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.link}
              className="bg-white rounded-xl p-6 border hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Order Status */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Order Status Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStatusCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-4 border">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl font-black">{stat.value}</div>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm">{order.shippingAddress.name}</td>
                    <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                        order.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                        order.orderStatus === 'CONFIRMED' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">₹{order.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
