import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="container text-center">
          <FileText className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Terms & Conditions</h1>
          <p className="text-xl text-indigo-200">Please read carefully before shopping</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to POCKET MOUSE. By using our website and services, you agree to these Terms & Conditions. 
              Please read them carefully.
            </p>
          </div>

          {/* Domestic Delivery Only */}
          <div className="mb-12">
            <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-black m-0">Domestic Delivery Only</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                POCKET MOUSE currently delivers only within India. We do not ship internationally at this time.
              </p>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">Delivery Timeline</h3>
                <p className="text-gray-600 text-xl font-bold text-blue-600">
                  All orders are delivered within 7 days across India
                </p>
              </div>
            </div>
          </div>

          {/* General Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">General Terms</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Age Requirement</h3>
                <p className="text-gray-600">
                  You must be at least 18 years old to make purchases on our website. By placing an order, 
                  you confirm that you meet this age requirement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Account Responsibility</h3>
                <p className="text-gray-600">
                  You are responsible for maintaining the confidentiality of your account credentials and 
                  for all activities under your account.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Order Acceptance</h3>
                <p className="text-gray-600">
                  All orders are subject to acceptance and product availability. We reserve the right to 
                  refuse or cancel any order for any reason.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Payment */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Pricing & Payment</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Product Pricing</h3>
                <p className="text-gray-600">
                  All prices are in Indian Rupees (INR) and include applicable taxes. Prices are subject 
                  to change without notice.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Payment Methods</h3>
                <p className="text-gray-600 mb-2">We accept:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
                  <li>• UPI (Google Pay, PhonePe, Paytm)</li>
                  <li>• Net Banking</li>
                  <li>• Cash on Delivery (COD)</li>
                  <li>• Digital Wallets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Payment Security</h3>
                <p className="text-gray-600">
                  All online payments are processed through secure payment gateways. We do not store your 
                  card details on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Product Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We strive to display product colors and images as accurately as possible. However, actual 
                colors may vary slightly due to screen settings and lighting conditions.
              </p>
              <p>
                Product descriptions, specifications, and availability are subject to change without notice. 
                We are not responsible for typographical errors.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Limitation of Liability</h2>
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="text-gray-700">
                  <p className="mb-3">
                    POCKET MOUSE is not liable for any indirect, incidental, or consequential damages arising 
                    from the use of our products or services.
                  </p>
                  <p>
                    Our liability is limited to the purchase price of the product. We are not responsible for 
                    delays caused by courier services or circumstances beyond our control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Governing Law</h2>
            <p className="text-gray-600">
              These Terms & Conditions are governed by the laws of India. Any disputes will be subject to 
              the jurisdiction of courts in Mumbai, Maharashtra.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Modifications</h2>
            <p className="text-gray-600">
              We reserve the right to update these Terms & Conditions at any time. Continued use of our 
              website after changes constitutes acceptance of the modified terms.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-indigo-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Questions About Terms & Conditions?</h2>
            <p className="text-indigo-200 mb-6">
              Contact us for any clarifications
            </p>
            <div className="space-y-2">
              <p>Email: support@pocketmouse.com</p>
              <p>Phone: +91 1800-123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
