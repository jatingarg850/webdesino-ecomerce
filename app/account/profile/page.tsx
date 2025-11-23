'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon, MapPin, Plus, Edit2, Trash2, Key, Eye, EyeOff, Check } from 'lucide-react';

interface Address {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'password'>('profile');
  
  // Profile form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Address form
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Address>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/account');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name,
      email: parsedUser.email,
    });

    // Fetch full user data from API
    try {
      const res = await fetch(`/api/users/${parsedUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.user.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (res.ok) {
        alert('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update password');
      }
    } catch (error) {
      alert('Error updating password');
    } finally {
      setSaving(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingAddress 
        ? `/api/users/${user._id}/addresses/${editingAddress._id}`
        : `/api/users/${user._id}/addresses`;
      
      const method = editingAddress ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressForm),
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({
          name: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          isDefault: false,
        });
        alert(editingAddress ? 'Address updated!' : 'Address added!');
      } else {
        alert('Failed to save address');
      }
    } catch (error) {
      alert('Error saving address');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const res = await fetch(`/api/users/${user._id}/addresses/${addressId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
        alert('Address deleted!');
      } else {
        alert('Failed to delete address');
      }
    } catch (error) {
      alert('Error deleting address');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressForm(true);
  };

  if (loading) {
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
          <h1 className="text-3xl font-black mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and addresses</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg mb-6 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition ${
              activeTab === 'profile'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <UserIcon size={18} className="inline mr-2" />
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition ${
              activeTab === 'addresses'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin size={18} className="inline mr-2" />
            Addresses
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition ${
              activeTab === 'password'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Key size={18} className="inline mr-2" />
            Password
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <UserIcon size={40} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Saved Addresses</h2>
              <button
                onClick={() => {
                  setShowAddressForm(true);
                  setEditingAddress(null);
                  setAddressForm({
                    name: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    isDefault: false,
                  });
                }}
                className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Address
              </button>
            </div>

            {showAddressForm && (
              <div className="bg-white rounded-lg p-6 border-2 border-blue-500">
                <h3 className="text-lg font-bold mb-4">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Address</label>
                    <textarea
                      required
                      rows={3}
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        required
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Pincode</label>
                      <input
                        type="text"
                        required
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isDefault" className="text-sm font-semibold">
                      Set as default address
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`bg-white rounded-lg p-6 border-2 ${
                      address.isDefault ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-lg">{address.name}</div>
                        <div className="text-gray-600">{address.phone}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address._id!)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-gray-700 mb-2">{address.address}</div>
                    <div className="text-gray-600">
                      {address.city}, {address.state} - {address.pincode}
                    </div>
                    {address.isDefault && (
                      <div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Check size={14} />
                        Default Address
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-12 text-center">
                  <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No saved addresses yet</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Add Your First Address
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
