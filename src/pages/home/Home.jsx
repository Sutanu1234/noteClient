import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#eb9200] drop-shadow-sm">
          Welcome to Your Tenant Portal
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700">
          A secure and powerful platform to manage your team, collaborate, and
          organize notes with ease. Elevate your productivity with simplicity.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-[#eb9200] text-white font-semibold hover:bg-[#d17d00] transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-[#eb9200] text-[#eb9200] font-semibold hover:bg-orange-100 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#eb9200]">Seamless Collaboration</h3>
            <p className="mt-3 text-gray-600">
              Empower your team to share ideas, notes, and stay connected in a
              secure tenant environment.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#eb9200]">Simple Management</h3>
            <p className="mt-3 text-gray-600">
              Control access, manage users, and grow your tenant effortlessly
              with intuitive tools.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#eb9200]">Scalable & Secure</h3>
            <p className="mt-3 text-gray-600">
              Start free and upgrade anytime. Your data is protected with
              enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#eb9200] to-orange-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to take your productivity to the next level?
        </h2>
        <p className="mt-4 text-lg">
          Join today and unlock the power of collaborative note management.
        </p>
        <button className="mt-6 px-8 py-3 rounded-xl bg-white text-[#eb9200] font-semibold hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-gray-100 text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} Tenant Notes Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
