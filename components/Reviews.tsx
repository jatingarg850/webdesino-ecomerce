"use client";

import { useState, useEffect } from "react";

type Review = {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  photos?: string[];
  verifiedPurchase?: boolean;
  size?: string;
  fit?: string;
};

const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Perfect fit and super comfortable!",
    body: "These shoes exceeded my expectations. The cushioning is amazing and they look even better in person. Highly recommend!",
    author: "Sarah M.",
    createdAt: "2024-11-10",
    verifiedPurchase: true,
    size: "9",
    fit: "True to size"
  },
  {
    id: "2",
    rating: 4,
    title: "Great quality, runs slightly large",
    body: "Love the design and build quality. Just note they run about half a size large, so size down if you're between sizes.",
    author: "Mike R.",
    createdAt: "2024-11-08",
    verifiedPurchase: true,
    size: "10",
    fit: "Runs large"
  },
  {
    id: "3",
    rating: 5,
    title: "Best shoes I've bought this year",
    body: "Absolutely love these! They're stylish, comfortable for all-day wear, and the quality is top-notch. Worth every penny.",
    author: "Jessica L.",
    createdAt: "2024-11-05",
    verifiedPurchase: true,
    size: "8",
    fit: "True to size"
  }
];

export function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    title: '',
    body: '',
    size: '',
    fit: 'True to size',
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to mock reviews if API fails
      setReviews(mockReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Please login to write a review');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Review submitted successfully!');
        setShowForm(false);
        setFormData({
          name: '',
          rating: 5,
          title: '',
          body: '',
          size: '',
          fit: 'True to size',
        });
        fetchReviews(); // Refresh reviews
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    rating => reviews.filter(r => r.rating === rating).length
  );

  if (loading) {
    return (
      <section className="mt-12 border-t-2 border-gray-100 pt-12">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <div className="text-gray-600">Loading reviews...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t-2 border-gray-100 pt-12">
      {/* Rating Summary */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 rounded-2xl p-8">
          <div className="text-center md:text-left">
            <div className="text-5xl font-black text-gray-900 mb-2">
              {avgRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, idx) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-semibold w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${(ratingCounts[idx] / reviews.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{ratingCounts[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Rating *</label>
                <select 
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                >
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Review Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                placeholder="Sum up your experience"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Your Review *</label>
              <textarea
                rows={5}
                required
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                placeholder="Tell us what you think..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Size Purchased</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                  placeholder="e.g., M, L, XL"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">How does it fit?</label>
                <select 
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none"
                >
                  <option>True to size</option>
                  <option>Runs small</option>
                  <option>Runs large</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <article key={review.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {review.verifiedPurchase && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{review.title}</h3>
                <p className="text-sm text-gray-600">
                  {review.author} • {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{review.body}</p>

            {(review.size || review.fit) && (
              <div className="flex gap-4 text-sm">
                {review.size && (
                  <span className="text-gray-600">
                    <strong>Size:</strong> {review.size}
                  </span>
                )}
                {review.fit && (
                  <span className="text-gray-600">
                    <strong>Fit:</strong> {review.fit}
                  </span>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
