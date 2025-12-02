import { Shield, Lock, Eye, Database, UserCheck, Bell } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="container text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">Your privacy is our priority</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed">
              At POCKET MOUSE, we are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-black">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  Personal Information
                </h3>
                <p className="text-gray-600 mb-3">
                  When you create an account or place an order, we collect:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Full name and contact details (email address, phone number)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Shipping and billing addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Payment information (processed securely through payment gateways)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Order history and purchase preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Account credentials (username and encrypted password)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-purple-600" />
                  Automatically Collected Information
                </h3>
                <p className="text-gray-600 mb-3">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Device information (browser type, operating system, device model)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>IP address and approximate location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Browsing behavior (pages visited, time spent, clicks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Referring website and search terms used</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-black">How We Use Your Information</h2>
            </div>
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                We use your information to provide and improve our services:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Order Processing</p>
                  <p className="text-sm text-gray-600">Process and fulfill your orders, manage payments, and arrange delivery</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Communication</p>
                  <p className="text-sm text-gray-600">Send order confirmations, shipping updates, and respond to inquiries</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Customer Support</p>
                  <p className="text-sm text-gray-600">Provide assistance and resolve issues related to your orders</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Service Improvement</p>
                  <p className="text-sm text-gray-600">Analyze usage patterns to enhance website functionality and user experience</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Marketing (Optional)</p>
                  <p className="text-sm text-gray-600">Send promotional offers and updates (only with your consent)</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold mb-2">✓ Security</p>
                  <p className="text-sm text-gray-600">Prevent fraud, protect against unauthorized access, and ensure platform security</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-black">Data Security</h2>
            </div>
            <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">SSL/TLS Encryption</p>
                    <p className="text-sm text-gray-600">All data transmitted between your browser and our servers is encrypted using SSL/TLS technology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Secure Payment Processing</p>
                    <p className="text-sm text-gray-600">Payment information is processed through PCI-DSS compliant payment gateways. We do not store card details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Access Controls</p>
                    <p className="text-sm text-gray-600">Limited employee access to personal data on a need-to-know basis with strict confidentiality agreements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Regular Security Audits</p>
                    <p className="text-sm text-gray-600">Periodic security assessments and updates to protect against emerging threats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Cookies & Tracking Technologies</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <p className="font-bold mb-1">Essential Cookies</p>
                  <p className="text-sm text-gray-600">Required for website functionality (login, cart, checkout)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-600">
                  <p className="font-bold mb-1">Performance Cookies</p>
                  <p className="text-sm text-gray-600">Help us understand how visitors use our website to improve performance</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="font-bold mb-1">Marketing Cookies</p>
                  <p className="text-sm text-gray-600">Used to deliver relevant advertisements and track campaign effectiveness</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>
          </div>

          {/* Third-Party Sharing */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Information Sharing</h2>
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                We do not sell your personal information. We may share data with trusted partners for:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>Payment Processing:</strong> Razorpay, Stripe, and other payment gateways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>Shipping & Delivery:</strong> Courier partners for order fulfillment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>Analytics:</strong> Google Analytics for website performance analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">→</span>
                  <span><strong>Legal Compliance:</strong> When required by law or to protect our rights</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                All third parties are contractually obligated to protect your information and use it only for specified purposes.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Your Privacy Rights</h2>
            <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-6">
              <p className="text-gray-700 mb-4 font-semibold">You have the following rights regarding your personal data:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Access</p>
                  <p className="text-sm text-gray-600">Request a copy of your personal information</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Correction</p>
                  <p className="text-sm text-gray-600">Update or correct inaccurate data</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Deletion</p>
                  <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Opt-Out</p>
                  <p className="text-sm text-gray-600">Unsubscribe from marketing communications</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Portability</p>
                  <p className="text-sm text-gray-600">Receive your data in a portable format</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-blue-600 mb-1">Object</p>
                  <p className="text-sm text-gray-600">Object to certain data processing activities</p>
                </div>
              </div>
              <div className="mt-4 bg-white rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  To exercise any of these rights, please contact us at <strong>privacy@pocketmouse.com</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Account data: Until you request deletion or close your account</li>
              <li>• Order history: 7 years for tax and legal compliance</li>
              <li>• Marketing data: Until you unsubscribe or request deletion</li>
              <li>• Analytics data: Aggregated and anonymized after 26 months</li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Children's Privacy</h2>
            <div className="bg-red-50 border border-red-300 rounded-xl p-6">
              <p className="text-gray-700">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children. If you believe we have collected data from a child, please 
                contact us immediately at <strong>privacy@pocketmouse.com</strong>
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of significant changes by posting the updated policy on this page and updating the 
              effective date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Questions About Privacy?</h2>
            <p className="text-gray-300 mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p>📧 Email: privacy@pocketmouse.com</p>
              <p>📞 Phone: +91 1800-123-4567</p>
              <p className="text-sm text-gray-400 mt-4">Data Protection Officer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
