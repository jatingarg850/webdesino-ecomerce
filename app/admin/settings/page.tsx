'use client';

import { useState } from 'react';
import { Save, Database, Trash2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Webdesino',
    siteEmail: 'admin@webdesino.com',
    freeShippingThreshold: '999',
    codEnabled: true,
    onlinePaymentEnabled: true,
  });

  const handleSave = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const clearCache = () => {
    if (confirm('Are you sure you want to clear all cache? This will log out all users.')) {
      localStorage.clear();
      alert('Cache cleared! Please refresh the page.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Settings</h1>
        <p className="text-gray-600">Manage your store settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Site Email</label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Payment Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.codEnabled}
                onChange={(e) => setSettings({ ...settings, codEnabled: e.target.checked })}
                className="w-5 h-5"
              />
              <div>
                <div className="font-semibold">Enable Cash on Delivery</div>
                <div className="text-sm text-gray-600">Allow customers to pay on delivery</div>
              </div>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.onlinePaymentEnabled}
                onChange={(e) => setSettings({ ...settings, onlinePaymentEnabled: e.target.checked })}
                className="w-5 h-5"
              />
              <div>
                <div className="font-semibold">Enable Online Payment</div>
                <div className="text-sm text-gray-600">Allow customers to pay online via Razorpay</div>
              </div>
            </label>
          </div>
        </div>

        {/* Database Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Database Actions</h2>
          <div className="space-y-3">
            <button
              onClick={clearCache}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              Clear All Cache
            </button>
            <p className="text-sm text-gray-600">
              This will clear all cached data including user sessions. Use with caution.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
        <div className="bg-white rounded-lg border p-6">
          <Database className="w-10 h-10 text-blue-600 mb-3" />
          <div className="text-2xl font-black mb-1">MongoDB</div>
          <div className="text-sm text-gray-600">Database Connected</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-2xl font-black mb-1">Next.js 16</div>
          <div className="text-sm text-gray-600">Framework Version</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-2xl font-black mb-1">Razorpay</div>
          <div className="text-sm text-gray-600">Payment Gateway</div>
        </div>
      </div>
    </div>
  );
}
