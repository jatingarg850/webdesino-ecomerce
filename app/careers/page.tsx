import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    { title: 'Frontend Developer', dept: 'Engineering', location: 'Mumbai', type: 'Full-time' },
    { title: 'Product Manager', dept: 'Product', location: 'Bangalore', type: 'Full-time' },
    { title: 'Customer Support', dept: 'Support', location: 'Remote', type: 'Full-time' },
    { title: 'Marketing Manager', dept: 'Marketing', location: 'Delhi', type: 'Full-time' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container text-center">
          <Briefcase className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-4">Join Our Team</h1>
          <p className="text-xl text-indigo-100">Build the future of fashion with us</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a team that's passionate about fashion, technology, and creating amazing experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Great Team</h3>
              <p className="text-gray-600">Work with talented and passionate people</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-gray-600">Continuous learning and career development</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">Flexible hours and remote options</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Benefits</h3>
              <p className="text-gray-600">Competitive salary and perks</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 text-center">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <div key={index} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{job.dept}</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{job.location}</span>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">{job.type}</span>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black mb-4">Don't See Your Role?</h2>
            <p className="text-gray-300 mb-6">
              We're always looking for talented people. Send us your resume!
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
