'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, X, GripVertical, ExternalLink } from 'lucide-react';
import ImageUpload from '@/components/admin/image-upload';

interface TrendingCategory {
  _id: string;
  name: string;
  slug: string;
  coverImage: string;
  linkUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export default function TrendingCategoriesPage() {
  const [categories, setCategories] = useState<TrendingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TrendingCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    coverImage: '',
    linkUrl: '',
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/trending-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching trending categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.coverImage) {
      alert('Please upload a cover image');
      return;
    }
    
    setLoading(true);

    try {
      const url = '/api/admin/trending-categories';
      const method = editingCategory ? 'PATCH' : 'POST';
      const body = editingCategory 
        ? { categoryId: editingCategory._id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingCategory ? 'Category updated!' : 'Category created!');
        setShowModal(false);
        resetForm();
        fetchCategories();
      } else {
        alert(data.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: TrendingCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      coverImage: category.coverImage,
      linkUrl: category.linkUrl,
      displayOrder: category.displayOrder,
      isActive: category.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this trending category?')) return;

    try {
      const response = await fetch(`/api/admin/trending-categories?categoryId=${categoryId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Category deleted!');
        fetchCategories();
      } else {
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      coverImage: '',
      linkUrl: '',
      displayOrder: 0,
      isActive: true
    });
  };

  if (loading && categories.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading trending categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black mb-2">Trending Categories</h1>
          <p className="text-gray-600">Manage homepage trending categories with cover images</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600 mb-4">No trending categories found. Create one to get started!</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <GripVertical size={12} />
                    {category.displayOrder}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    category.isActive 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <ExternalLink size={14} />
                  <span className="truncate">{category.linkUrl}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-black">
                {editingCategory ? 'Edit Trending Category' : 'Add Trending Category'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., Men's Jeans, Slim Fit, Designer Denim"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Cover Image *</label>
                <ImageUpload
                  value={formData.coverImage ? [formData.coverImage] : []}
                  onChange={(urls) => setFormData({ ...formData, coverImage: urls[0] || '' })}
                  maxImages={1}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Upload a high-quality image (recommended: 800x600px or 4:3 ratio)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Link URL *</label>
                <input
                  type="text"
                  required
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="/men, /women, /sale, etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Where should this category link to? (e.g., /men, /women?subcategory=slim-fit)
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first on the homepage
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold">Active (Show on homepage)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
