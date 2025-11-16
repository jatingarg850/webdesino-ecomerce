export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-4">
        {params.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </h1>
      <p className="text-gray-600 mb-8">Browse our collection</p>
      <div className="text-center py-20 bg-gray-50 rounded-xl">
        <p className="text-gray-500">Products coming soon...</p>
      </div>
    </div>
  );
}
