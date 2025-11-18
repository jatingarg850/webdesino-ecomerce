import { FileText, AlertCircle, ShoppingBag, RefreshCw } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container text-center">
          <FileText className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-200">Last updated: November 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to Webdesino. By accessing and using our website, you agree to be bound by these 
                Terms of Service. Please read them carefully before making any purchase.
              </p>
            </div>

            {/* General Terms */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black m-0">General Terms</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  By using this website, you warrant that you are at least 18 years of age and have the 
                  legal capacity to enter into binding contracts. If you are under 18, you may use our 
                  services only with the involvement of a parent or guardian.
                </p>
                <p>
                  We reserve the right to refuse service, terminate accounts, or cancel orders at our 
                  discretion, especially in cases of suspected fraud or violation of these terms.
                </p>
              </div>
            </div>

            {/* Orders and Payments */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-black m-0">Orders and Payments</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-600">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Order Acceptance</h3>
                  <p>
                    All orders are subject to acceptance and availability. We reserve the right to refuse 
                    or cancel any order for any reason, including product availability, errors in pricing, 
                    or suspected fraudulent activity.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Pricing</h3>
                  <p>
                    All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes 
                    unless otherwise stated. We reserve the right to change prices at any time without 
                    prior notice.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Payment Methods</h3>
                  <ul className="space-y-2 mt-2">
                    <li>• Credit/Debit Cards</li>
                    <li>• UPI</li>
                    <li>• Net Banking</li>
                    <li>• Cash on Delivery (COD)</li>
                    <li>• Digital Wallets</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Shipping and Delivery */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Shipping and Delivery</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We ship to addresses within India. Delivery times vary based on location and product 
                  availability:
                </p>
                <ul className="space-y-2">
                  <li>• Metro cities: 3-5 business days</li>
                  <li>• Other cities: 5-7 business days</li>
                  <li>• Remote areas: 7-10 business days</li>
                </ul>
                <p>
                  Free shipping is available on orders above ₹999. Shipping charges apply to orders below 
                  this threshold.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Delivery times are estimates and not guaranteed. We are not 
                    responsible for delays caused by courier services or unforeseen circumstances.
                  </p>
                </div>
              </div>
            </div>

            {/* Returns and Refunds */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-black m-0">Returns and Refunds</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-600">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Return Policy</h3>
                  <p>
                    We accept returns within 7 days of delivery for most products. Items must be unused, 
                    unwashed, and in original packaging with all tags attached.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Non-Returnable Items</h3>
                  <ul className="space-y-2">
                    <li>• Innerwear and lingerie</li>
                    <li>• Cosmetics and personal care items</li>
                    <li>• Sale or clearance items (unless defective)</li>
                    <li>• Customized or personalized products</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Refund Process</h3>
                  <p>
                    Refunds are processed within 7-10 business days after we receive and inspect the 
                    returned item. The amount will be credited to your original payment method.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Intellectual Property</h2>
              <p className="text-gray-600">
                All content on this website, including text, graphics, logos, images, and software, is 
                the property of Webdesino and protected by copyright and trademark laws. You may not 
                reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            {/* User Conduct */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">User Conduct</h2>
              <div className="bg-red-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">You agree not to:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use the website for any illegal purpose</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Transmit viruses or malicious code</li>
                  <li>• Harass or harm other users</li>
                  <li>• Impersonate any person or entity</li>
                  <li>• Collect user information without consent</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, Webdesino shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising from your use of our 
                website or products. Our total liability shall not exceed the amount you paid for the 
                product in question.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These Terms of Service are governed by the laws of India. Any disputes shall be subject 
                to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the website after changes constitutes 
                acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Questions About Our Terms?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p>Email: legal@webdesino.com</p>
                <p>Phone: +91 1800-123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
