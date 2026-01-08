// src/pages/Public/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Kesem Cooperative Union",
      role: "Agricultural Cooperative",
      description: "Serving farmers and communities since 2010",
      image: "🌾"
    }
  ];

  const values = [
    {
      icon: "🤝",
      title: "Community First",
      description: "We prioritize the needs of our local farming community and work together for mutual growth."
    },
    {
      icon: "🌱",
      title: "Sustainable Farming",
      description: "Promoting agricultural practices that protect our environment and ensure long-term productivity."
    },
    {
      icon: "📈",
      title: "Fair Trade",
      description: "Ensuring fair prices and transparent processes for all our farmers and suppliers."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Embracing technology to streamline agricultural procurement and distribution."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-50 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-black">About Kesem Cooperative</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering farmers, strengthening communities, and building a sustainable agricultural future together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Kesem Farmer Cooperative Union is dedicated to transforming agricultural 
                procurement through transparency, efficiency, and community collaboration.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our tender platform connects local farmers with procurement opportunities, 
                ensuring fair prices and building lasting partnerships within the agricultural sector.
              </p>
              <Link 
                to="/register" 
                className="btn btn-primary px-8 py-3 text-lg font-semibold"
              >
                Join Our Network
              </Link>
            </div>
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="text-6xl text-center mb-4">🌾</div>
              <h3 className="text-2xl font-bold text-center text-primary-800 mb-4">
                Agricultural Excellence
              </h3>
              <p className="text-gray-600 text-center">
                Connecting farmers with opportunities since 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center hover-lift">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Our Platform Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process for agricultural procurement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Kesem Posts Tenders</h3>
              <p className="text-gray-600">
                Kesem Cooperative posts procurement needs for agricultural products and services.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Farmers Apply</h3>
              <p className="text-gray-600">
                Registered farmers and suppliers apply for tenders with their proposals and pricing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Fair Selection</h3>
              <p className="text-gray-600">
                Kesem reviews applications and selects the best partners through transparent evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Grow With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of farmers who are already benefiting from our transparent tender platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="btn bg-amber-500 text-white hover:bg-amber-600 px-8 py-4 text-lg font-semibold hover-lift"
            >
              Register as Applicant
            </Link>
            <Link 
              to="/tenders" 
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold hover-lift"
            >
              View Current Tenders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;