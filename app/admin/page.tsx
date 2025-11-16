'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    brand: '',
    category: 'sneakers',
    material: '',
    careInstructions: '',
    features: '',
    variants: [{
      sku: '',
      size: '',
      color: '',
      price: 0,
      stock: 0
    }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim())
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    if (res.ok) {
      alert('✓ Product created successfully!');
      router.push('/products');
    } else {
      alert('Failed to create product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Create and manage your shoe inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 border-b-2 border-gray-100 pb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Product Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none text-black"
                  placeholder="e.g., Air Max Runner Pro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Slug (URL) *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none text-black"
                  placeholder="e.g., air-max-runner-pro"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none h-32 text-black"
                placeholder="Describe the shoe..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Brand *</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., Nike, Adidas"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                >
                  <option value="running">Running</option>
                  <option value="casual">Casual</option>
                  <option value="sports">Sports</option>
                  <option value="formal">Formal</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="boots">Boots</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 border-b-2 border-gray-100 pb-4">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({...formData, material: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., Synthetic mesh and rubber"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Care Instructions</label>
                <input
                  type="text"
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({...formData, careInstructions: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., Wipe clean with damp cloth"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Features (one per line)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none h-32"
                placeholder="Breathable mesh upper&#10;Air cushioning&#10;Durable rubber outsole"
              />
            </div>
          </div>

          {/* Variant Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 border-b-2 border-gray-100 pb-4">
              Variant Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">SKU *</label>
                <input
                  type="text"
                  value={formData.variants[0].sku}
                  onChange={(e) => setFormData({
                    ...formData,
                    variants: [{...formData.variants[0], sku: e.target.value}]
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., AMR-BLK-9"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Size *</label>
                <input
                  type="text"
                  value={formData.variants[0].size}
                  onChange={(e) => setFormData({
                    ...formData,
                    variants: [{...formData.variants[0], size: e.target.value}]
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., 9, 10, 11"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Color *</label>
                <input
                  type="text"
                  value={formData.variants[0].color}
                  onChange={(e) => setFormData({
                    ...formData,
                    variants: [{...formData.variants[0], color: e.target.value}]
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., Black, White"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.variants[0].price}
                  onChange={(e) => setFormData({
                    ...formData,
                    variants: [{...formData.variants[0], price: parseFloat(e.target.value)}]
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="129.99"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.variants[0].stock}
                  onChange={(e) => setFormData({
                    ...formData,
                    variants: [{...formData.variants[0], stock: parseInt(e.target.value)}]
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
