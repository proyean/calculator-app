// src/pages/Public/Tenders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const { user } = useAuth();

  useEffect(() => {
    loadTenders();
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

  const loadTenders = () => {
    try {
      const storedTenders = JSON.parse(localStorage.getItem('tenders') || '[]');
      const sortedTenders = storedTenders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTenders(sortedTenders);
    } catch (error) {
      console.error('Error loading tenders:', error);
      setTenders([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter tenders based on status and search term
  const filteredTenders = tenders.filter(tender => {
    const matchesStatus = filter === 'all' || tender.status === filter.toUpperCase();
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + cardsPerPage >= filteredTenders.length ? 0 : prev + cardsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - cardsPerPage < 0 ? Math.max(0, filteredTenders.length - cardsPerPage) : prev - cardsPerPage
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index * cardsPerPage);
  };

  // Get current slides to display
  const currentTenders = filteredTenders.slice(currentSlide, currentSlide + cardsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '🟢';
      case 'CLOSED':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading tenders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Tenders
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse current procurement opportunities from Kesem Cooperative
          </p>
        </div>

        {/* Search and Filter Section */}

<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 justify-between items-center">
    <div className="flex-1 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tenders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
      </div>
    </div>
    
    <div className="flex space-x-2 w-full md:w-auto">
      <button
        onClick={() => {setFilter('all'); setCurrentSlide(0);}}
        className={`flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium transition-colors text-sm ${
          filter === 'all' 
            ? 'bg-primary-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      <button
        onClick={() => {setFilter('active'); setCurrentSlide(0);}}
        className={`flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium transition-colors text-sm ${
          filter === 'active' 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {setFilter('closed'); setCurrentSlide(0);}}
        className={`flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium transition-colors text-sm ${
          filter === 'closed' 
            ? 'bg-gray-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Closed
      </button>
    </div>
  </div>
</div>

        {/* Tenders Slider */}
        {filteredTenders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {tenders.length === 0 ? 'No Tenders Available' : 'No Tenders Match Your Search'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {tenders.length === 0 
                ? 'Kesem Cooperative has not posted any tenders yet. Please check back later for new procurement opportunities.'
                : 'Try adjusting your search terms or filters to find relevant tenders.'
              }
            </p>
            {!user && (
              <div className="space-y-4 ">
                <p className="text-gray-500 mb-5">
                  Register now to be ready when tenders are posted!
                </p>
                <Link 
                  to="/register" 
                  className="btn btn-primary "
                >
                  Register to Apply
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            {/* Slider Navigation Buttons */}
            {filteredTenders.length > cardsPerPage && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Previous tenders"
                >
                  <span className="text-xl">⬅️</span>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Next tenders"
                >
                  <span className="text-xl">➡️</span>
                </button>
              </>
            )}

            {/* Tenders Cards Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${(currentSlide / cardsPerPage) * 100}%)` }}
              >
                {filteredTenders.map((tender) => {
                  const daysRemaining = getDaysRemaining(tender.deadline);
                  const isDeadlineNear = daysRemaining <= 3 && daysRemaining > 0;
                  const isDeadlinePassed = daysRemaining <= 0;

                  return (
                    <div 
                      key={tender.id} 
                      className="flex-shrink-0 px-3 transition-all duration-300"
                      style={{ width: `${100 / cardsPerPage}%` }}
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{getStatusIcon(tender.status)}</span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(tender.status)}`}>
                              {tender.status}
                            </span>
                          </div>
                          {isDeadlineNear && !isDeadlinePassed && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                              Ending Soon
                            </span>
                          )}
                        </div>

                        {/* Tender Title and Description */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          {tender.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {tender.description}
                        </p>

                        {/* Tender Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Category:</span>
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{tender.category}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Quantity:</span>
                            <span>{tender.quantity} {tender.unit}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Budget:</span>
                            <span>{tender.budget ? `ETB ${Number(tender.budget).toLocaleString()}` : 'Not specified'}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Deadline:</span>
                            <span className={`font-medium ${
                              isDeadlinePassed ? 'text-red-600' : 
                              isDeadlineNear ? 'text-amber-600' : 
                              'text-green-600'
                            }`}>
                              {new Date(tender.deadline).toLocaleDateString()}
                              {!isDeadlinePassed && ` (${daysRemaining}d)`}
                            </span>
                          </div>
                        </div>

                        {/* Specifications (if available) */}
                        {tender.specifications && (
                          <div className="mb-4">
                            <span className="text-sm font-medium text-gray-700">Specifications:</span>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tender.specifications}</p>
                          </div>
                        )}

                        {/* Contact Info */}
                        <div className="text-xs text-gray-500 mb-4">
                          <span>Posted by: {tender.authorName || 'Kesem Cooperative'}</span>
                          {tender.contactInfo && (
                            <div className="mt-1">Contact: {tender.contactInfo}</div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          {tender.status === 'ACTIVE' && !user && (
                            <Link 
                              to="/register" 
                              className="btn btn-primary w-full text-center justify-center"
                            >
                              Register to Apply
                            </Link>
                          )}
                          {tender.status === 'ACTIVE' && user && user.role === 'APPLICANT' && (
                         <Link 
                         to={`/apply/${tender.id}`}
                           className="btn btn-primary text-sm w-full justify-center"
                            >
                             Apply Now
                               </Link>
                          )}
                          {tender.status === 'CLOSED' && (
                            <div className="text-center">
                              <span className="text-sm text-gray-500 italic">
                                Applications closed
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slider Dots Indicator */}
            {filteredTenders.length > cardsPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(filteredTenders.length / cardsPerPage) }).map((_, index) => (
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
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Active: {tenders.filter(t => t.status === 'ACTIVE').length}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
              <span>Closed: {tenders.filter(t => t.status === 'CLOSED').length}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
              <span>Total: {tenders.length}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="text-lg">👁️</span>
              <span>Showing {Math.min(currentTenders.length, cardsPerPage)} of {filteredTenders.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenders;