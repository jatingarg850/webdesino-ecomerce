import Link from 'next/link';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container text-center">
          <RefreshCw className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Returns & Exchange</h1>
          <p className="text-xl text-purple-100">Easy returns within 7 days</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-black mb-4">7-Day Return Policy</h2>
            <p className="text-gray-700">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              you can return it within 7 days of delivery for a full refund or exchange.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Return Eligibility</h2>
            <div className="space-y-4">
              <div className="flex gap-3 items-start bg-gray-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Eligible for Return</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Product must be unused and unwashed</li>
                    <li>• Original tags and packaging intact</li>
                    <li>• Return initiated within 7 days of delivery</li>
                    <li>• Product not damaged by customer</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-red-50 rounded-lg p-4">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Not Eligible for Return</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Innerwear and lingerie</li>
                    <li>• Cosmetics and personal care items</li>
                    <li>• Sale or clearance items (unless defective)</li>
                    <li>• Customized or personalized products</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">How to Return</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Initiate Return', desc: 'Go to My Orders and select the item you want to return' },
                { step: 2, title: 'Choose Reason', desc: 'Select the reason for return and provide details' },
                { step: 3, title: 'Schedule Pickup', desc: 'Our courier partner will pick up the item from your address' },
                { step: 4, title: 'Refund Processed', desc: 'Refund will be initiated within 7-10 days after inspection' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Refund Timeline</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">Processing Time</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• <strong>Pickup:</strong> 2-3 business days</li>
                <li>• <strong>Quality Check:</strong> 2-3 business days after pickup</li>
                <li>• <strong>Refund Initiation:</strong> 1-2 business days after approval</li>
                <li>• <strong>Credit to Account:</strong> 5-7 business days (varies by bank)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Need Help with Returns?</h2>
            <p className="text-gray-300 mb-6">Contact our support team for assistance</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
