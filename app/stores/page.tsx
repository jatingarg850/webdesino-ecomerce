import { MapPin, Phone, Clock } from 'lucide-react';

export default function StoresPage() {
  const stores = [
    {
      city: 'Mumbai',
      address: 'Phoenix Marketcity, Kurla West, Mumbai - 400070',
      phone: '+91 22 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    {
      city: 'Delhi',
      address: 'Select Citywalk, Saket, New Delhi - 110017',
      phone: '+91 11 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    {
      city: 'Bangalore',
      address: 'Orion Mall, Brigade Gateway, Bangalore - 560055',
      phone: '+91 80 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    {
      city: 'Hyderabad',
      address: 'Inorbit Mall, Madhapur, Hyderabad - 500081',
      phone: '+91 40 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    {
      city: 'Chennai',
      address: 'Express Avenue, Royapettah, Chennai - 600002',
      phone: '+91 44 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
    {
      city: 'Pune',
      address: 'Phoenix Marketcity, Viman Nagar, Pune - 411014',
      phone: '+91 20 1234 5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="container text-center">
          <MapPin className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Our Stores</h1>
          <p className="text-xl text-teal-100">Visit us at a location near you</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Find a Store</h2>
            <p className="text-xl text-gray-600">
              Experience our products in person at any of our retail locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store, index) => (
              <div key={index} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
                
                <h3 className="text-2xl font-black mb-4">{store.city}</h3>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                    <p>{store.address}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <p>{store.phone}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <p>{store.hours}</p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                  Get Directions
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-black mb-4 text-center">Store Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">👔</div>
                <h3 className="font-bold mb-1">Try Before You Buy</h3>
                <p className="text-sm text-gray-600">Experience our products firsthand</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💳</div>
                <h3 className="font-bold mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-600">Hassle-free in-store returns</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-bold mb-1">Exclusive Offers</h3>
                <p className="text-sm text-gray-600">Special in-store promotions</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Coming Soon to Your City!</h2>
            <p className="text-gray-300 mb-6">
              We're expanding! Stay tuned for new store openings in your area.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
