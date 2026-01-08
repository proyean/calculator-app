// src/pages/Public/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeTenders: 0,
    totalTenders: 0,
    registeredUsers: 0
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    loadStats();
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const updateCardsPerPage = () => {
    if (window.innerWidth < 768) {
      setCardsPerPage(1);
    } else if (window.innerWidth < 1024) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(3);
    }
  };

  const loadStats = () => {
    const tenders = JSON.parse(localStorage.getItem('tenders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    setStats({
      activeTenders: tenders.filter(t => t.status === 'ACTIVE').length,
      totalTenders: tenders.length,
      registeredUsers: users.filter(u => u.role === 'APPLICANT').length
    });
  };

  // Get active tenders for the slider
  const activeTenders = JSON.parse(localStorage.getItem('tenders') || '[]')
    .filter(tender => tender.status === 'ACTIVE')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort by deadline (closest first)
    .slice(0, 6); // Show max 6 tenders

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + cardsPerPage >= activeTenders.length ? 0 : prev + cardsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - cardsPerPage < 0 ? Math.max(0, activeTenders.length - cardsPerPage) : prev - cardsPerPage
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index * cardsPerPage);
  };

  // Get current slides to display
  const currentTenders = activeTenders.slice(currentSlide, currentSlide + cardsPerPage);

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const features = [
    {
      title: "Post Tenders",
      description: "Kesem Admin can easily create and manage tender notices for agricultural products.",
      icon: "🌱",
      color: "primary"
    },
    {
      title: "Apply Online",
      description: "Farmers and suppliers can quickly apply for tenders with simple online forms.",
      icon: "📝",
      color: "amber"
    },
    {
      title: "Track Progress",
      description: "Monitor your application status and tender progress in real-time.",
      icon: "📊",
      color: "rose"
    }
  ];

  const displayStats = [
    { number: `${stats.activeTenders}+`, label: "Active Tenders" },
    { number: `${stats.registeredUsers}+`, label: "Registered Farmers" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
 
<section className="relative py-12 md:py-20 overflow-hidden safe-top">
  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-amber-500/10"></div>
  <div className="relative container mx-auto px-4">
    <div className="text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
        <span className="text-sm md:text-base">🌾</span> 
        <span>Kesem Farmer Cooperative Union</span>
      </div>
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
        Agricultural Tender
        <span className="text-primary-600 block mt-2">Platform</span>
      </h1>
      
      <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
        Connecting Kesem Cooperative with trusted farmers and suppliers. 
        Post tenders for agricultural products and find the best partners for your needs.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
        {/* Buttons remain the same but will automatically adjust due to container padding */}
        {user ? (
          <>
            {user.role === 'ADMIN' ? (
              <Link 
                to="/admin" 
                className="btn btn-primary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold hover-lift shadow-lg w-full sm:w-auto text-center"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link 
                to="/dashboard" 
                className="btn btn-primary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold hover-lift shadow-lg w-full sm:w-auto text-center"
              >
                My Applications
              </Link>
            )}
            <Link 
              to="/tenders" 
              className="btn btn-outline px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold hover-lift w-full sm:w-auto text-center"
            >
              Browse Tenders
            </Link>
          </>
        ) : (
          <>
            <Link 
              to="/tenders" 
              className="btn btn-primary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold hover-lift shadow-lg w-full sm:w-auto text-center"
            >
              View Tenders
            </Link>
            <Link 
              to="/register" 
              className="btn bg-amber-500 text-white hover:bg-amber-600 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold hover-lift w-full sm:w-auto text-center"
            >
              Register to Apply
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple and efficient process designed for agricultural community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`card p-8 text-center hover-lift group border-l-4 ${
                  feature.color === 'primary' ? 'border-l-primary-500' :
                  feature.color === 'amber' ? 'border-l-amber-500' :
                  'border-l-rose-500'
                }`}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Tenders Preview with Card Slider */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Current Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore active procurement tenders from Kesem Cooperative
            </p>
          </div>

          {stats.activeTenders > 0 ? (
            <div className="max-w-6xl mx-auto">
              {/* Slider Container */}
              <div className="relative">
                {/* Navigation Arrows */}
                {activeTenders.length > cardsPerPage && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors border border-gray-200 hidden md:block"
                      aria-label="Previous tenders"
                    >
                      <span className="text-xl text-gray-600">⬅️</span>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors border border-gray-200 hidden md:block"
                      aria-label="Next tenders"
                    >
                      <span className="text-xl text-gray-600">➡️</span>
                    </button>
                  </>
                )}

                {/* Tenders Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentTenders.map((tender) => {
                    const daysRemaining = getDaysRemaining(tender.deadline);
                    const isDeadlineNear = daysRemaining <= 3 && daysRemaining > 0;

                    return (
                      <div 
                        key={tender.id} 
                        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift"
                      >
                        {/* Card Header with Status */}
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold line-clamp-2">{tender.title}</h3>
                            <span className="bg-white text-primary-600 px-2 py-1 rounded-full text-xs font-bold ml-2 flex-shrink-0">
                              ACTIVE
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          {/* Description */}
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                            {tender.description}
                          </p>

                          {/* Tender Details */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">Category:</span>
                              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                                {tender.category}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">Quantity:</span>
                              <span className="font-semibold">{tender.quantity} {tender.unit}</span>
                            </div>
                            
                            {tender.budget && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-gray-700">Budget:</span>
                                <span className="font-semibold text-green-600">
                                  ETB {Number(tender.budget).toLocaleString()}
                                </span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">Deadline:</span>
                              <span className={`font-semibold ${
                                isDeadlineNear ? 'text-amber-600' : 'text-green-600'
                              }`}>
                                {new Date(tender.deadline).toLocaleDateString()}
                                <span className="block text-xs text-gray-500 text-right">
                                  {daysRemaining} days left
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Specifications Preview */}
                          {tender.specifications && (
                            <div className="mb-4">
                              <span className="text-xs font-medium text-gray-700">Requirements:</span>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {tender.specifications}
                              </p>
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="mt-4">
                            {!user ? (
                              <Link 
                                to="/register" 
                                className="btn bg-amber-500 text-white hover:bg-amber-600 w-full text-center justify-center text-sm py-2"
                              >
                                Register to Apply
                              </Link>
                            ) : user.role === 'APPLICANT' ? (
                              <Link 
                                                       to={`/apply/${tender.id}`}
                                                         className="btn btn-primary text-sm w-full justify-center"
                                                          >
                                                           Apply Now
                                                             </Link>
                            ) : (
                              <Link 
                                to="/tenders" 
                                className="btn btn-outline w-full text-center justify-center text-sm py-2"
                              >
                                View Details
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Posted by Kesem Cooperative</span>
                            <span>{new Date(tender.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slider Dots Indicator */}
                {activeTenders.length > cardsPerPage && (
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(activeTenders.length / cardsPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === Math.floor(currentSlide / cardsPerPage)
                            ? 'bg-primary-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Mobile Navigation Buttons */}
                {activeTenders.length > cardsPerPage && (
                  <div className="flex justify-center mt-6 space-x-4 md:hidden">
                    <button
                      onClick={prevSlide}
                      className="btn btn-outline text-sm px-4 py-2"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={nextSlide}
                      className="btn btn-primary text-sm px-4 py-2"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Link 
                  to="/tenders" 
                  className="btn btn-primary px-8 py-3 text-lg font-semibold hover-lift"
                >
                  View All Tenders ({stats.activeTenders} Active)
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Tenders Currently</h3>
              <p className="text-gray-600 mb-6">
                Kesem Cooperative will be posting new procurement opportunities soon. 
                Check back regularly or register to get notified when new tenders are available.
              </p>
              {!user && (
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                >
                  Register for Updates
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

    
    </div>
  );
};

export default Home;