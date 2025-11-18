'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Plus, Trash2 } from 'lucide-react';

export default function AddressesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/account');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem(`addresses_${parsedUser.id}`);
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now().toString(),
      ...formData,
      isDefault: addresses.length === 0,
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses));
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    });
    setShowAddForm(false);
    alert('Address added successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(updatedAddresses);
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(updatedAddresses));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft size={20} />
            Back to Account
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black mb-2">My Addresses</h1>
              <p className="text-gray-600">Manage your delivery addresses</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add Address
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Address *"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  required
                  placeholder="State *"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  required
                  placeholder="Pincode *"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center">
            <MapPin className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold mb-4">No Addresses Saved</h2>
            <p className="text-gray-600 mb-8">Add your delivery address for faster checkout</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-lg p-6 border relative">
                {address.isDefault && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Default
                  </div>
                )}
                <div className="mb-4">
                  <div className="font-bold text-lg mb-1">{address.name}</div>
                  <div className="text-gray-600 text-sm">{address.phone}</div>
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  {address.address}<br />
                  {address.city}, {address.state}<br />
                  {address.pincode}
                </div>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm font-semibold"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
