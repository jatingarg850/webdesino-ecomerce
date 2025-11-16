export default function FandomPage({ params }: { params: { fandom: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-4">
        {params.fandom.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Collection
      </h1>
      <p className="text-gray-600 mb-8">Official licensed merchandise</p>
      <div className="text-center py-20 bg-gray-50 rounded-xl">
        <p className="text-gray-500">Products coming soon...</p>
      </div>
    </div>
  );
}
