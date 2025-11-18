import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="container text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">Last updated: November 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                At Webdesino, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black m-0">Information We Collect</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Name and contact information (email, phone number)</li>
                  <li>• Shipping and billing addresses</li>
                  <li>• Payment information (processed securely through payment gateways)</li>
                  <li>• Order history and preferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Automatically Collected Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Browser type and version</li>
                  <li>• IP address and device information</li>
                  <li>• Pages visited and time spent on site</li>
                  <li>• Referring website addresses</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-black m-0">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We use the information we collect to:</p>
                <ul className="space-y-2">
                  <li>• Process and fulfill your orders</li>
                  <li>• Send order confirmations and shipping updates</li>
                  <li>• Respond to your inquiries and provide customer support</li>
                  <li>• Improve our website and services</li>
                  <li>• Send promotional emails (with your consent)</li>
                  <li>• Prevent fraud and enhance security</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-black m-0">Data Security</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure payment processing through trusted gateways</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access to personal information</li>
                  <li>• Employee training on data protection</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. 
                Cookies are small data files stored on your device that help us:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Remember your preferences and settings</li>
                <li>• Keep you logged in</li>
                <li>• Analyze site traffic and usage patterns</li>
                <li>• Personalize content and advertisements</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookies through your browser settings, but disabling them may affect 
                site functionality.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                We may share your information with trusted third-party service providers who assist us in:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Payment processing (Razorpay, Stripe)</li>
                <li>• Shipping and delivery</li>
                <li>• Email marketing</li>
                <li>• Analytics and advertising</li>
              </ul>
              <p className="text-gray-600 mt-4">
                These third parties are contractually obligated to protect your information and use it 
                only for the purposes we specify.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Your Rights</h2>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Object to data processing</li>
                  <li>• Data portability</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us at privacy@webdesino.com
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children. If you believe we have collected information 
                from a child, please contact us immediately.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Questions About Privacy?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p>Email: privacy@webdesino.com</p>
                <p>Phone: +91 1800-123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
