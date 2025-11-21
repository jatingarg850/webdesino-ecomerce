'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, Eye, X, FileText, Printer } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [storeSettings, setStoreSettings] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
    loadStoreSettings();
  }, []);

  const loadStoreSettings = () => {
    const settings = localStorage.getItem('storeSettings');
    if (settings) {
      setStoreSettings(JSON.parse(settings));
    } else {
      // Default settings
      setStoreSettings({
        storeName: 'Webdesino Store',
        storeEmail: 'support@webdesino.com',
        storePhone: '+91 1234567890',
        storeAddress: '123 Fashion Street, Mumbai, India',
        taxRate: '18',
        shippingFee: '50',
      });
    }
  };

  useEffect(() => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(order => order.orderStatus === filterStatus);
    }

    setFilteredOrders(filtered);
  }, [searchQuery, filterStatus, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data.orders || []);
      setFilteredOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, orderStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus }),
      });

      if (response.ok) {
        alert('Order status updated!');
        fetchOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus });
        }
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, paymentStatus }),
      });

      if (response.ok) {
        alert('Payment status updated!');
        fetchOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, paymentStatus });
        }
      } else {
        alert('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-700';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700';
      case 'CONFIRMED': return 'bg-purple-100 text-purple-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const generateShippingLabel = (order: any) => {
    const labelWindow = window.open('', '_blank');
    if (!labelWindow) return;

    const labelHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Shipping Label - ${order.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .label { border: 3px solid black; padding: 20px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid black; padding-bottom: 15px; margin-bottom: 15px; }
          .section { margin: 15px 0; }
          .section-title { font-weight: bold; font-size: 14px; margin-bottom: 5px; text-transform: uppercase; }
          .barcode { text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0; }
          .address-box { border: 2px solid black; padding: 15px; margin: 10px 0; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="header">
            <h1 style="margin: 0;">${storeSettings?.storeName || 'Webdesino Store'}</h1>
            <div style="font-size: 12px; margin-top: 5px;">${storeSettings?.storeAddress || ''}</div>
            <div style="font-size: 12px;">${storeSettings?.storePhone || ''}</div>
          </div>

          <div class="barcode">
            ${order.orderNumber}
          </div>

          <div class="section">
            <div class="section-title">Ship From:</div>
            <div class="address-box">
              <strong>${storeSettings?.storeName || 'Webdesino Store'}</strong><br>
              ${storeSettings?.storeAddress || '123 Fashion Street, Mumbai, India'}<br>
              Phone: ${storeSettings?.storePhone || '+91 1234567890'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Ship To:</div>
            <div class="address-box">
              <strong>${order.shippingAddress.name}</strong><br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
              PIN: ${order.shippingAddress.pincode}<br>
              Phone: ${order.shippingAddress.phone}
            </div>
          </div>

          <div class="section">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="border: 1px solid black; padding: 8px;"><strong>Order Date:</strong></td>
                <td style="border: 1px solid black; padding: 8px;">${new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 8px;"><strong>Items:</strong></td>
                <td style="border: 1px solid black; padding: 8px;">${order.items.length} item(s)</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; padding: 8px;"><strong>Payment:</strong></td>
                <td style="border: 1px solid black; padding: 8px;">${order.paymentMethod} - ${order.paymentStatus}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px; font-size: 12px;">
            <strong>Handle with Care</strong>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    labelWindow.document.write(labelHTML);
    labelWindow.document.close();
  };

  const generateInvoice = (order: any) => {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const taxAmount = (order.subtotal * (parseFloat(storeSettings?.taxRate || '18') / 100)).toFixed(2);
    
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .invoice-header { display: flex; justify-content: space-between; border-bottom: 3px solid black; padding-bottom: 20px; margin-bottom: 30px; }
          .company-info { flex: 1; }
          .invoice-info { text-align: right; }
          .section { margin: 30px 0; }
          .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f0f0f0; padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold; }
          td { padding: 12px; border: 1px solid #ddd; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; background: #f9f9f9; }
          .grand-total { font-size: 18px; background: #000; color: #fff; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-info">
            <h1 style="margin: 0; font-size: 28px;">${storeSettings?.storeName || 'Webdesino Store'}</h1>
            <div style="margin-top: 10px; color: #666;">
              ${storeSettings?.storeAddress || '123 Fashion Street, Mumbai, India'}<br>
              Phone: ${storeSettings?.storePhone || '+91 1234567890'}<br>
              Email: ${storeSettings?.storeEmail || 'support@webdesino.com'}
            </div>
          </div>
          <div class="invoice-info">
            <h2 style="margin: 0; font-size: 32px;">INVOICE</h2>
            <div style="margin-top: 10px;">
              <strong>Invoice #:</strong> ${order.orderNumber}<br>
              <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
              <strong>Status:</strong> ${order.paymentStatus}
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Bill To:</div>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <strong>${order.shippingAddress.name}</strong><br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
            Phone: ${order.shippingAddress.phone}
            ${order.shippingAddress.email ? `<br>Email: ${order.shippingAddress.email}` : ''}
          </div>
        </div>

        <div class="section">
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Item Description</th>
                <th>Size</th>
                <th>Color</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td>${item.color}</td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right">₹${item.price}</td>
                  <td class="text-right">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="5" class="text-right">Subtotal:</td>
                <td class="text-right">₹${order.subtotal}</td>
              </tr>
              <tr>
                <td colspan="5" class="text-right">Tax (${storeSettings?.taxRate || '18'}%):</td>
                <td class="text-right">₹${taxAmount}</td>
              </tr>
              <tr>
                <td colspan="5" class="text-right">Shipping:</td>
                <td class="text-right">${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</td>
              </tr>
              <tr class="grand-total">
                <td colspan="5" class="text-right">GRAND TOTAL:</td>
                <td class="text-right">₹${order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Payment Information:</div>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <strong>Payment Method:</strong> ${order.paymentMethod}<br>
            <strong>Payment Status:</strong> ${order.paymentStatus}<br>
            ${order.razorpayOrderId ? `<strong>Transaction ID:</strong> ${order.razorpayOrderId}<br>` : ''}
          </div>
        </div>

        <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; font-size: 12px;">
          <p>Thank you for your business!</p>
          <p>For any queries, please contact us at ${storeSettings?.storeEmail || 'support@webdesino.com'}</p>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Orders</h1>
        <p className="text-gray-600">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by order number or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold">{order.shippingAddress.name}</div>
                      <div className="text-xs text-gray-500">{order.shippingAddress.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">{order.items.length}</td>
                    <td className="px-6 py-4 text-sm font-bold">₹{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' :
                        order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => generateInvoice(selectedOrder)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FileText size={18} />
                  Generate Invoice
                </button>
                <button
                  onClick={() => generateShippingLabel(selectedOrder)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Printer size={18} />
                  Print Shipping Label
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Order Number</div>
                    <div className="font-bold">{selectedOrder.orderNumber}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Order Date</div>
                    <div className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Payment Method</div>
                    <div className="font-semibold">{selectedOrder.paymentMethod}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Total Amount</div>
                    <div className="font-bold text-lg">₹{selectedOrder.total}</div>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Order Status</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Payment Status</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => updatePaymentStatus(selectedOrder._id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-bold mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <div className="font-semibold mb-1">{selectedOrder.shippingAddress.name}</div>
                  <div className="text-gray-600">{selectedOrder.shippingAddress.phone}</div>
                  {selectedOrder.shippingAddress.email && (
                    <div className="text-gray-600">{selectedOrder.shippingAddress.email}</div>
                  )}
                  <div className="text-gray-600 mt-2">
                    {selectedOrder.shippingAddress.address}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                    {selectedOrder.shippingAddress.pincode}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-bold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 bg-gray-50 rounded-lg p-3">
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
                    <span className="font-semibold">₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {selectedOrder.shipping === 0 ? 'FREE' : `₹${selectedOrder.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-black">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
