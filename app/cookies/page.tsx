import { Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="container text-center">
          <Cookie className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Cookie Policy</h1>
          <p className="text-xl text-amber-100">Last updated: November 2024</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                This Cookie Policy explains how Webdesino uses cookies and similar technologies to recognize 
                you when you visit our website. It explains what these technologies are and why we use them, 
                as well as your rights to control our use of them.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">What Are Cookies?</h2>
              <p className="text-gray-600">
                Cookies are small data files that are placed on your computer or mobile device when you visit 
                a website. Cookies are widely used by website owners to make their websites work, or to work 
                more efficiently, as well as to provide reporting information.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation, secure areas access, and shopping cart functionality.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Duration: Session or up to 1 year</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Performance Cookies</h3>
                  <p className="text-gray-600">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our website's performance.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Duration: Up to 2 years</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Functional Cookies</h3>
                  <p className="text-gray-600">
                    These cookies enable the website to provide enhanced functionality and personalization. 
                    They may be set by us or by third-party providers whose services we use.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Duration: Up to 1 year</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Targeting/Advertising Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are used to deliver advertisements more relevant to you and your interests. 
                    They also help limit the number of times you see an advertisement.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Duration: Up to 2 years</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">How We Use Cookies</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Keep you signed in to your account</li>
                <li>• Remember your preferences and settings</li>
                <li>• Understand how you use our website</li>
                <li>• Improve website performance and user experience</li>
                <li>• Personalize content and advertisements</li>
                <li>• Analyze traffic and usage patterns</li>
                <li>• Prevent fraud and enhance security</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use services from third-party companies that may set cookies on your device:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                  <li>• <strong>Payment Gateways:</strong> For secure payment processing</li>
                  <li>• <strong>Social Media:</strong> For social sharing features</li>
                  <li>• <strong>Advertising Networks:</strong> For targeted advertising</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Managing Cookies</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your 
                  cookie preferences by:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Using the cookie consent banner when you first visit our website</li>
                  <li>• Adjusting your browser settings to refuse cookies</li>
                  <li>• Deleting cookies that have already been set</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Note:</strong> If you choose to disable cookies, some features of our website 
                  may not function properly.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Browser Settings</h2>
              <p className="text-gray-600 mb-4">
                Most web browsers allow you to control cookies through their settings. Here's how to 
                manage cookies in popular browsers:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>• <strong>Chrome:</strong> Settings → Privacy and Security → Cookies</p>
                <p>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies</p>
                <p>• <strong>Safari:</strong> Preferences → Privacy → Cookies</p>
                <p>• <strong>Edge:</strong> Settings → Privacy → Cookies</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-black mb-4">Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. Please check this page periodically 
                for updates.
              </p>
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Questions About Cookies?</h2>
              <p className="text-gray-300 mb-6">
                If you have questions about our use of cookies, please contact us:
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
