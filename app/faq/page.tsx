'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Browse our products, add items to cart, proceed to checkout, fill in your details, and complete payment. You\'ll receive an order confirmation via email.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Credit/Debit Cards, UPI, Net Banking, Digital Wallets, and Cash on Delivery (COD) for eligible orders.'
        },
        {
          q: 'Is it safe to use my credit card on your website?',
          a: 'Yes, absolutely! We use industry-standard SSL encryption and secure payment gateways (Razorpay) to protect your information.'
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'You can cancel your order within 24 hours of placing it. Contact our support team immediately for modifications or cancellations.'
        },
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long does delivery take?',
          a: 'Metro cities: 3-5 days, Other cities: 5-7 days, Remote areas: 7-10 days. These are estimates and may vary.'
        },
        {
          q: 'Do you offer free shipping?',
          a: 'Yes! We offer free shipping on all orders above ₹999. Orders below this amount have a shipping charge of ₹99.'
        },
        {
          q: 'How can I track my order?',
          a: 'Once shipped, you\'ll receive a tracking number via email and SMS. You can also track your order from the "Track Order" page on our website.'
        },
        {
          q: 'What if I\'m not available for delivery?',
          a: 'Our courier partners make 2-3 delivery attempts. If all attempts fail, the package will be returned to us. Please ensure someone is available to receive the order.'
        },
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We accept returns within 7 days of delivery. Items must be unused, unwashed, with original tags and packaging intact.'
        },
        {
          q: 'Which items cannot be returned?',
          a: 'Innerwear, lingerie, cosmetics, personal care items, sale/clearance items (unless defective), and customized products cannot be returned.'
        },
        {
          q: 'How do I return an item?',
          a: 'Go to "My Orders", select the item, choose return reason, and schedule a pickup. Our courier will collect the item from your address.'
        },
        {
          q: 'When will I receive my refund?',
          a: 'Refunds are processed within 7-10 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.'
        },
      ]
    },
    {
      category: 'Products & Sizing',
      questions: [
        {
          q: 'How do I choose the right size?',
          a: 'Each product page has a size chart. Measure yourself and compare with our size guide. If you\'re between sizes, we recommend sizing up.'
        },
        {
          q: 'Are the product images accurate?',
          a: 'We strive to display accurate colors and details. However, actual colors may vary slightly due to screen settings and lighting.'
        },
        {
          q: 'Do you restock sold-out items?',
          a: 'Popular items are usually restocked. Sign up for notifications on the product page to be alerted when it\'s back in stock.'
        },
        {
          q: 'Are your products authentic?',
          a: 'Yes, all our products are 100% authentic. We source directly from brands and authorized distributors.'
        },
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'Do I need an account to shop?',
          a: 'You can browse and add items to cart without an account, but you\'ll need to create one or log in to complete checkout.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.'
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes, we use advanced security measures to protect your data. Read our Privacy Policy for more details.'
        },
        {
          q: 'Can I change my registered email or phone?',
          a: 'Yes, you can update your contact information from your Account Settings page.'
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container text-center">
          <HelpCircle className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-orange-100">Find answers to common questions</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-black mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={qIndex} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                      >
                        <span className="font-bold text-lg pr-4">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 flex-shrink-0 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 flex-shrink-0 text-gray-600" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-gray-600 border-t bg-gray-50">
                          <p className="pt-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-gray-900 text-white rounded-xl p-8 text-center mt-12">
            <h2 className="text-2xl font-black mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? Contact our support team
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
