export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-4">My Wishlist</h1>
      <p className="text-gray-600 mb-8">Save your favorite items</p>
      <div className="text-center py-20 bg-gray-50 rounded-xl">
        <div className="text-6xl mb-4">❤️</div>
        <p className="text-gray-500 text-xl mb-4">Your wishlist is empty</p>
        <p className="text-gray-400">Start adding products you love!</p>
      </div>
    </div>
  );
}
