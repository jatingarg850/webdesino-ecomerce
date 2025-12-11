'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShoppingCart,
  Users,
  Tag,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin');
      return;
    }

    fetchStats();
  }, [router]);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour ago`;
    return `${Math.floor(seconds / 86400)} day ago`;
  };

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/admin/users'),
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();

      // Extract arrays from response objects
      const products = productsData.products || [];
      const orders = ordersData.orders || [];
      const users = usersData.users || [];

      const revenue = Array.isArray(orders)
        ? orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
        : 0;

      setStats({
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalRevenue: revenue,
      });

      // Build recent activity from real data
      const activities: any[] = [];

      // Add recent orders
      if (Array.isArray(orders)) {
        orders.slice(0, 3).forEach((order: any) => {
          activities.push({
            type: 'order',
            title: `Order #${order.orderNumber || order._id?.toString().slice(-6)}`,
            description: `₹${order.total || 0} - ${order.items?.length || 0} items`,
            timestamp: order.createdAt,
            icon: 'order',
          });
        });
      }

      // Add recent products
      if (Array.isArray(products)) {
        products.slice(0, 2).forEach((product: any) => {
          activities.push({
            type: 'product',
            title: product.name,
            description: `Added to ${product.category}`,
            timestamp: product.createdAt,
            icon: 'product',
          });
        });
      }

      // Sort by timestamp (newest first)
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: Package,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: UserCheck,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={stat.textColor} size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</h3>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border mb-8">
          <h3 className="text-xl font-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <Package className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold">Manage Products</p>
                <p className="text-sm text-gray-600">Add or edit products</p>
              </div>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <ShoppingCart className="text-green-600" size={24} />
              <div>
                <p className="font-semibold">View Orders</p>
                <p className="text-sm text-gray-600">Process customer orders</p>
              </div>
            </Link>
            <Link
              href="/admin/brands"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <Tag className="text-purple-600" size={24} />
              <div>
                <p className="font-semibold">Manage Brands</p>
                <p className="text-sm text-gray-600">Add or edit brands</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-xl font-black mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'order' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {activity.type === 'order' ? (
                      <ShoppingCart className={activity.type === 'order' ? 'text-green-600' : 'text-blue-600'} size={20} />
                    ) : (
                      <Package className={activity.type === 'order' ? 'text-green-600' : 'text-blue-600'} size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {activity.type === 'order' ? 'Order received' : 'Product added'}
                    </p>
                    <p className="text-sm text-gray-600">{activity.title} - {activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
