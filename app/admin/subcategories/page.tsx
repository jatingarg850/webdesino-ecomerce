'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, GripVertical } from 'lucide-react';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: 'men' | 'women';
  displayOrder: number;
  isActive: boolean;
}

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'men' | 'women'>('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'men' as 'men' | 'women',
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('/api/admin/subcategories');
      const data = await response.json();
      if (data.success) {
        setSubcategories(data.subcategories);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/admin/subcategories';
      const method = editingSubcategory ? 'PATCH' : 'POST';
      const body = editingSubcategory 
        ? { subcategoryId: editingSubcategory._id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingSubcategory ? 'Subcategory updated!' : 'Subcategory created!');
        setShowModal(false);
        resetForm();
        fetchSubcategories();
      } else {
        alert(data.error || 'Failed to save subcategory');
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
      alert('Error saving subcategory');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      category: subcategory.category,
      displayOrder: subcategory.displayOrder,
      isActive: subcategory.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (subcategoryId: string) => {
    if (!confirm('Are you sure you want to delete this subcategory? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/admin/subcategories?subcategoryId=${subcategoryId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Subcategory deleted!');
        fetchSubcategories();
      } else {
        alert(data.error || 'Failed to delete subcategory');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert('Error deleting subcategory');
    }
  };

  const resetForm = () => {
    setEditingSubcategory(null);
    setFormData({
      name: '',
      category: 'men',
      displayOrder: 0,
      isActive: true
    });
  };

  const filteredSubcategories = filterCategory === 'all' 
    ? subcategories 
    : subcategories.filter(sub => sub.category === filterCategory);

  if (loading && subcategories.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading subcategories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">Subcategories</h1>
          <p className="text-gray-600">Manage product subcategories for navigation</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Subcategory
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filterCategory === 'all' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All ({subcategories.length})
        </button>
        <button
          onClick={() => setFilterCategory('men')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filterCategory === 'men' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Men ({subcategories.filter(s => s.category === 'men').length})
        </button>
        <button
          onClick={() => setFilterCategory('women')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filterCategory === 'women' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Women ({subcategories.filter(s => s.category === 'women').length})
        </button>
      </div>

      {/* Subcategories Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No subcategories found. Create one to get started!
                </td>
              </tr>
            ) : (
              filteredSubcategories.map((subcategory) => (
                <tr key={subcategory._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-gray-400" />
                      <span className="font-semibold">{subcategory.displayOrder}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{subcategory.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-sm">{subcategory.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      subcategory.category === 'men' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {subcategory.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      subcategory.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subcategory.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(subcategory)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(subcategory._id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-black">
                {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Subcategory Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., Straight Fit, Baggy, Flair"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'men' | 'women' })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first in navigation</p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold">Active (Show in navigation)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingSubcategory ? 'Update Subcategory' : 'Create Subcategory'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
