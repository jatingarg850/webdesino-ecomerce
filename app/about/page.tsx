import Image from 'next/image';
import { Users, Target, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container text-center text-white">
            <h1 className="text-5xl md:text-6xl font-black mb-4">About Webdesino</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your destination for premium fashion and lifestyle products
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed mb-4">
                Founded in 2024, Webdesino has quickly become a leading destination for fashion-forward individuals 
                seeking quality, style, and affordability. Our journey began with a simple mission: to make premium 
                fashion accessible to everyone.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                We believe that great style shouldn't come with a hefty price tag. That's why we work directly with 
                manufacturers and designers to bring you the latest trends at prices that won't break the bank.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we serve thousands of happy customers across India, offering a curated selection of clothing 
                for men, women, and kids. Our commitment to quality, customer service, and sustainable practices 
                sets us apart in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-black mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is carefully selected and tested.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focused</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help every step of the way.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly evolve to bring you the latest trends and technologies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to ethical practices and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">50+</div>
              <div className="text-gray-600">Brands</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-black mb-4">Join Our Fashion Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of thousands of fashion enthusiasts who trust Webdesino for their style needs.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  );
}
