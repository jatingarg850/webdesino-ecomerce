import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-pink-600 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-6">Membership Benefits</h1>
        <p className="text-2xl mb-12 opacity-90">Join the club and save on every order</p>
        
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">Extra 10% Off</h3>
              <p className="opacity-90">On every single order</p>
            </div>
            <div>
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Early Access</h3>
              <p className="opacity-90">To new drops & sales</p>
            </div>
            <div>
              <div className="text-5xl mb-3">🎁</div>
              <h3 className="text-xl font-bold mb-2">Exclusive Merch</h3>
              <p className="opacity-90">Members-only products</p>
            </div>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black mb-4">₹999/year</h2>
          <p className="text-gray-600 mb-6">One-time payment, unlimited savings</p>
          <button className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition">
            Join Now
          </button>
        </div>

        <Link href="/" className="text-white underline hover:no-underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
