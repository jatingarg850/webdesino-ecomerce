import Link from 'next/link';
import { RefreshCw, CheckCircle, XCircle, Clock, Package, IndianRupee } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container text-center">
          <RefreshCw className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Refund & Return Policy</h1>
          <p className="text-xl text-purple-100">Easy returns & full refunds within 7 days</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          {/* 7-Day Return Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-10 mb-12 text-center">
            <Clock className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-black mb-3">7-DAY RETURN POLICY</h2>
            <p className="text-2xl mb-2">Return any product within 7 days</p>
            <p className="text-lg text-green-100">Get 100% refund - No questions asked!</p>
          </div>

          {/* Refund Guarantee */}
          <div className="mb-12">
            <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <IndianRupee className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-black">100% Refund Guarantee</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                We stand behind the quality of our products. If you are not completely satisfied with your purchase, 
                return it within 7 days and get a full refund.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <p className="font-bold text-xl text-blue-600">Full Money Back</p>
                <p className="text-gray-600">
                  Your refund will be processed to your original payment method within 7-10 business days after 
                  we receive the returned item.
                </p>
              </div>
            </div>
          </div>

          {/* Return Eligibility */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Return Eligibility</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                <div className="flex gap-3 items-start">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Eligible for Return & Refund</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Product must be unused, unwashed, and in original condition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>All original tags, labels, and packaging must be intact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Return request must be initiated within 7 days of delivery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Product should not be damaged or altered by customer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Invoice/receipt must be included with the return</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
                <div className="flex gap-3 items-start">
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-3">Not Eligible for Return</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>Innerwear, socks, and intimate apparel (for hygiene reasons)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>Products with missing tags or damaged packaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>Worn, washed, or altered products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>Customized or personalized items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">✗</span>
                        <span>Sale items marked as Final Sale or Non-Returnable</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Return */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-black">How to Return</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Initiate Return Request</h3>
                  <p className="text-gray-600">
                    Log in to your account, go to My Orders, select the item you want to return, and click 
                    Return Item. Choose your reason for return.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Schedule Pickup</h3>
                  <p className="text-gray-600">
                    Our courier partner will contact you to schedule a pickup from your address. Keep the product 
                    ready with original packaging and tags.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Quality Check</h3>
                  <p className="text-gray-600">
                    Once we receive the product, our team will inspect it to ensure it meets return eligibility 
                    criteria. This takes 2-3 business days.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Refund Processed</h3>
                  <p className="text-gray-600">
                    After approval, your refund will be initiated within 1-2 business days. The amount will be 
                    credited to your original payment method within 7-10 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-black">Refund Timeline</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-bold">Return Request Initiated</span>
                  <span className="text-blue-600 font-bold">Day 0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-bold">Pickup Scheduled</span>
                  <span className="text-blue-600 font-bold">1-2 Days</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-bold">Product Received & Inspected</span>
                  <span className="text-blue-600 font-bold">2-3 Days</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-bold">Refund Initiated</span>
                  <span className="text-blue-600 font-bold">1-2 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Amount Credited to Account</span>
                  <span className="text-green-600 font-bold">7-10 Days</span>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> The time taken for the refund to reflect in your account depends on your 
                  bank processing time. For COD orders, refunds are processed via bank transfer.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Need Help with Returns?</h2>
            <p className="text-purple-200 mb-6">
              Our customer support team is here to assist you with any return or refund queries
            </p>
            <div className="space-y-2 mb-6">
              <p>Email: returns@pocketmouse.com</p>
              <p>Phone: +91 1800-123-4567</p>
              <p className="text-sm text-purple-300 mt-4">Available Mon-Sat, 9 AM - 6 PM IST</p>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-white text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-purple-100 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
