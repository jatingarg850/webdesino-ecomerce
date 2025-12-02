import { Truck, Package, MapPin, Clock, CheckCircle, IndianRupee } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="container text-center">
          <Truck className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Shipping Policy</h1>
          <p className="text-xl text-green-100">Fast & Reliable Delivery Across India</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {/* 7 Days Delivery Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 mb-12 text-center">
            <Clock className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-black mb-3">7 DAYS DELIVERY</h2>
            <p className="text-2xl mb-2">Guaranteed Delivery Within 7 Days</p>
            <p className="text-lg text-blue-100">To all locations across India</p>
          </div>

          {/* Domestic Delivery Only */}
          <div className="mb-12">
            <div className="bg-orange-50 border-2 border-orange-500 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-black">Domestic Delivery Only</h2>
              </div>
              <p className="text-lg text-gray-700">
                POCKET MOUSE currently ships only within India. We deliver to all states and union territories 
                including remote locations. International shipping is not available at this time.
              </p>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Delivery Timeline</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl">
                  <p className="text-sm uppercase tracking-wide mb-1">Standard Delivery</p>
                  <p className="text-5xl font-black">7 Days</p>
                  <p className="text-sm mt-1">Maximum delivery time</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-lg">All Orders Delivered Within 7 Days</p>
                    <p className="text-gray-600">
                      Whether you're in a metro city or a remote village, your order will reach you within 7 days 
                      of placing the order.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-lg">Processing Time: 24 Hours</p>
                    <p className="text-gray-600">
                      Orders are processed and dispatched within 24 hours of confirmation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-lg">Real-Time Tracking</p>
                    <p className="text-gray-600">
                      Track your order every step of the way with SMS and email updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Charges */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <IndianRupee className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-black">Shipping Charges</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
                <div className="text-green-600 font-black text-6xl mb-3">FREE</div>
                <p className="text-xl font-bold mb-2">Orders Above ₹999</p>
                <p className="text-gray-600">Enjoy free shipping on all orders above ₹999</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 text-center">
                <div className="text-gray-900 font-black text-6xl mb-3">₹99</div>
                <p className="text-xl font-bold mb-2">Orders Below ₹999</p>
                <p className="text-gray-600">Flat shipping charge for orders under ₹999</p>
              </div>
            </div>
          </div>

          {/* Shipping Process */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-black">How Shipping Works</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Order Confirmation</h3>
                  <p className="text-gray-600">
                    Once you place your order, you'll receive an instant confirmation email with order details 
                    and expected delivery date.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Order Processing (24 Hours)</h3>
                  <p className="text-gray-600">
                    Our team carefully packs your order within 24 hours and hands it over to our courier partner.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">In Transit</h3>
                  <p className="text-gray-600">
                    Your order is on its way! Track it in real-time using the tracking number sent via SMS and email.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Delivered (Within 7 Days)</h3>
                  <p className="text-gray-600">
                    Your package arrives at your doorstep within 7 days. Sign and enjoy your new purchase!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Delivery Coverage</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4 text-lg">
                We deliver to all pin codes across India, including:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-bold">Metro Cities</p>
                  <p className="text-sm text-gray-600">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-bold">Tier 2 & 3 Cities</p>
                  <p className="text-sm text-gray-600">All major and minor cities across India</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-bold">Remote Areas</p>
                  <p className="text-sm text-gray-600">Villages, hill stations, and remote locations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Important Information</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                <p className="font-bold mb-1">📍 Accurate Address Required</p>
                <p className="text-gray-600 text-sm">
                  Please ensure your shipping address is complete and accurate. Include landmarks for easier delivery.
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4">
                <p className="font-bold mb-1">📦 Order Tracking</p>
                <p className="text-gray-600 text-sm">
                  You'll receive tracking details via SMS and email once your order is shipped. Track anytime on our website.
                </p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-4">
                <p className="font-bold mb-1">🚪 Delivery Attempts</p>
                <p className="text-gray-600 text-sm">
                  Our courier makes 2-3 delivery attempts. Please ensure someone is available to receive the package.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-4">
                <p className="font-bold mb-1">📞 Contact for Delivery Issues</p>
                <p className="text-gray-600 text-sm">
                  If you face any delivery issues, contact our support team immediately for assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Questions About Shipping?</h2>
            <p className="text-gray-300 mb-6">
              Our customer support team is here to help
            </p>
            <div className="space-y-2">
              <p>📧 Email: shipping@pocketmouse.com</p>
              <p>📞 Phone: +91 1800-123-4567</p>
              <p className="text-sm text-gray-400 mt-4">Available Mon-Sat, 9 AM - 6 PM IST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
