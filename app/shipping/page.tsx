import { Truck, Package, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="container text-center">
          <Truck className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Shipping Information</h1>
          <p className="text-xl text-green-100">Fast, reliable delivery across India</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 mb-12 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-2">FREE SHIPPING</h2>
            <p className="text-xl">On all orders above ₹999</p>
          </div>

          {/* Delivery Times */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-black">Delivery Times</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Metro Cities</h3>
                <p className="text-3xl font-black text-green-600 mb-2">3-5 Days</p>
                <p className="text-sm text-gray-600">Mumbai, Delhi, Bangalore, etc.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Other Cities</h3>
                <p className="text-3xl font-black text-blue-600 mb-2">5-7 Days</p>
                <p className="text-sm text-gray-600">Tier 2 & Tier 3 cities</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Remote Areas</h3>
                <p className="text-3xl font-black text-purple-600 mb-2">7-10 Days</p>
                <p className="text-sm text-gray-600">Hill stations & remote locations</p>
              </div>
            </div>
          </div>

          {/* Shipping Charges */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-black">Shipping Charges</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-bold">Order Value</th>
                    <th className="text-left py-3 font-bold">Shipping Charge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 text-gray-600">Above ₹999</td>
                    <td className="py-3 font-bold text-green-600">FREE</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 text-gray-600">₹500 - ₹999</td>
                    <td className="py-3 font-bold">₹99</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-600">Below ₹500</td>
                    <td className="py-3 font-bold">₹99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Process */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-black">How It Works</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Order Placed</h3>
                  <p className="text-gray-600">
                    Once you place your order, you'll receive a confirmation email with your order details.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Order Processing</h3>
                  <p className="text-gray-600">
                    Our team processes your order within 24 hours and prepares it for shipment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Shipped</h3>
                  <p className="text-gray-600">
                    Your order is handed over to our courier partner. You'll receive tracking details via email and SMS.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Delivered</h3>
                  <p className="text-gray-600">
                    Your package arrives at your doorstep. Enjoy your new purchase!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courier Partners */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Our Courier Partners</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">
                We work with India's most trusted courier services to ensure safe and timely delivery:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 font-semibold">Blue Dart</div>
                <div className="bg-white rounded-lg p-4 font-semibold">Delhivery</div>
                <div className="bg-white rounded-lg p-4 font-semibold">FedEx</div>
                <div className="bg-white rounded-lg p-4 font-semibold">DTDC</div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Important Notes</h2>
            <div className="space-y-4">
              <div className="flex gap-3 items-start bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    <strong>Address Accuracy:</strong> Please ensure your shipping address is complete and accurate. 
                    We are not responsible for delays or non-delivery due to incorrect addresses.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    <strong>Tracking:</strong> Track your order anytime using the tracking number sent to your email 
                    or through our Track Order page.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    <strong>Delivery Attempts:</strong> Our courier partners make 2-3 delivery attempts. If delivery 
                    fails, the package will be returned to us.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-purple-50 border border-purple-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    <strong>Holidays & Weekends:</strong> Orders placed on weekends or public holidays will be 
                    processed on the next business day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Need Help with Shipping?</h2>
            <p className="text-gray-300 mb-6">
              Our customer support team is here to assist you
            </p>
            <div className="space-y-2">
              <p>Email: shipping@webdesino.com</p>
              <p>Phone: +91 1800-123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
