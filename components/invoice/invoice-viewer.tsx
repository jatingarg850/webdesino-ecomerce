'use client';

import { X, Download, Printer } from 'lucide-react';
import Image from 'next/image';

interface InvoiceViewerProps {
  order: any;
  onClose: () => void;
  storeSettings?: any;
}

export default function InvoiceViewer({ order, onClose, storeSettings }: InvoiceViewerProps) {
  const defaultSettings = {
    storeName: 'POCKET MOUSE',
    storeEmail: 'support@pocketmouse.com',
    storePhone: '+91 1234567890',
    storeAddress: '123 Fashion Street, Mumbai, India',
    taxRate: '18',
  };

  const settings = storeSettings || defaultSettings;
  const taxAmount = (order.subtotal * (parseFloat(settings.taxRate) / 100)).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const invoiceHTML = generateInvoiceHTML(order, settings, taxAmount);
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header - No Print */}
        <div className="sticky top-0 bg-white border-b p-6 print:hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black">Invoice</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Printer size={18} />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg transition"
              >
                <Download size={18} />
                Download
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div id="invoice-content" className="p-8">
          {/* Invoice Header */}
          <div className="flex justify-between border-b-4 border-black pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-black mb-2">{settings.storeName}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{settings.storeAddress}</div>
                <div>Phone: {settings.storePhone}</div>
                <div>Email: {settings.storeEmail}</div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black mb-2">INVOICE</h2>
              <div className="text-sm space-y-1">
                <div><span className="font-semibold">Invoice #:</span> {order.orderNumber}</div>
                <div><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</div>
                <div><span className="font-semibold">Status:</span> <span className="font-bold text-green-600">{order.paymentStatus}</span></div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase text-gray-600 mb-3">Bill To:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-lg mb-1">{order.shippingAddress.name}</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>{order.shippingAddress.address}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</div>
                <div>Phone: {order.shippingAddress.phone}</div>
                {order.shippingAddress.email && <div>Email: {order.shippingAddress.email}</div>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold">Item Description</th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold">Color</th>
                  <th className="border border-gray-300 px-4 py-3 text-right text-sm font-bold">Qty</th>
                  <th className="border border-gray-300 px-4 py-3 text-right text-sm font-bold">Price</th>
                  <th className="border border-gray-300 px-4 py-3 text-right text-sm font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-3 text-sm">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">{item.size}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm">{item.color}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm">₹{item.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan={5} className="border border-gray-300 px-4 py-3 text-right font-semibold">Subtotal:</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">₹{order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-3 text-right">Tax ({settings.taxRate}%):</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">₹{taxAmount}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-3 text-right">Shipping:</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">{order.shipping === 0 ? 'FREE' : `₹${order.shipping.toFixed(2)}`}</td>
                </tr>
                <tr className="bg-black text-white">
                  <td colSpan={5} className="border border-gray-300 px-4 py-3 text-right font-bold text-lg">GRAND TOTAL:</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-black text-lg">₹{order.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Info */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase text-gray-600 mb-3">Payment Information:</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
              <div><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</div>
              <div><span className="font-semibold">Payment Status:</span> <span className="font-bold">{order.paymentStatus}</span></div>
              {order.razorpayOrderId && (
                <div><span className="font-semibold">Transaction ID:</span> {order.razorpayOrderId}</div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 pt-6 text-center text-sm text-gray-600">
            <p className="font-semibold mb-2">Thank you for your business!</p>
            <p>For any queries, please contact us at {settings.storeEmail}</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-content, #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function generateInvoiceHTML(order: any, settings: any, taxAmount: string) {
  return `
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
        .text-center { text-align: center; }
        .total-row { font-weight: bold; background: #f9f9f9; }
        .grand-total { font-size: 18px; background: #000; color: #fff; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div class="company-info">
          <h1 style="margin: 0; font-size: 28px;">${settings.storeName}</h1>
          <div style="margin-top: 10px; color: #666;">
            ${settings.storeAddress}<br>
            Phone: ${settings.storePhone}<br>
            Email: ${settings.storeEmail}
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
              <th style="width: 40%;">Item Description</th>
              <th class="text-center">Size</th>
              <th class="text-center">Color</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td class="text-center">${item.size}</td>
                <td class="text-center">${item.color}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">₹${item.price.toFixed(2)}</td>
                <td class="text-right">₹${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="5" class="text-right">Subtotal:</td>
              <td class="text-right">₹${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="5" class="text-right">Tax (${settings.taxRate}%):</td>
              <td class="text-right">₹${taxAmount}</td>
            </tr>
            <tr>
              <td colspan="5" class="text-right">Shipping:</td>
              <td class="text-right">${order.shipping === 0 ? 'FREE' : `₹${order.shipping.toFixed(2)}`}</td>
            </tr>
            <tr class="grand-total">
              <td colspan="5" class="text-right">GRAND TOTAL:</td>
              <td class="text-right">₹${order.total.toFixed(2)}</td>
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
        <p>For any queries, please contact us at ${settings.storeEmail}</p>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;
}
