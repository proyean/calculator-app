// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavbar } from '../../context/NavbarContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { hideNavbar } = useNavbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleAdminPanelClick = () => {
    hideNavbar();
    navigate('/admin');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Browse Tenders', path: '/tenders' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-primary-200 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl md:text-3xl">🌾</span>
            <span className="hidden sm:block">Kesem Tenders</span>
            <span className="sm:hidden">Kesem</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Left side navigation */}
            <div className="flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side - Auth related */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                  <span>Welcome,</span>
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'ADMIN' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {user.role === 'ADMIN' ? 'Admin' : 'Applicant'}
                  </span>
                </div>
                
                {user.role === 'ADMIN' ? (
                  <button
                    onClick={handleAdminPanelClick}
                    className="btn  bg-green-600 text-sm text-white"
                  >
                    Admin Panel
                  </button>
                ) : (
                  <Link 
                     to="/dashboard/profile"  
                    className="btn bg-green-600 text-sm text-white"
                  >
                    My profiles
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="btn border-2 border-primary-300 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="nav-link font-medium"
                >
                  Sign In
                </Link>
                
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {user && (
              <div className="text-sm text-gray-600 mr-2">
                <span className="font-semibold text-gray-800">{user.name.split(' ')[0]}</span>
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div className={`md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 text-xl font-bold text-primary-600">
              <span className="text-2xl">🌾</span>
              <span>Kesem Tenders</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
                  Navigation
                </h3>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="border-t border-gray-200 pt-6">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">
                        <div className="font-semibold text-gray-800 text-base">{user.name}</div>
                        <div className={`inline-flex px-2 py-1 text-xs rounded-full mt-1 ${
                          user.role === 'ADMIN' 
                            ? 'bg-primary-100 text-primary-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {user.role === 'ADMIN' ? 'Kesem Admin' : 'Applicant'}
                        </div>
                      </div>
                    </div>

                    {/* Admin/User Actions */}
                    <div className="space-y-2">
                      {user.role === 'ADMIN' ? (
                        <button
                          onClick={handleAdminPanelClick}
                          className="w-full text-center px-4 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-base"
                        >
                          Admin Panel
                        </button>
                      ) : (
                        <Link
                          to="/dashboard"
                          onClick={closeMobileMenu}
                          className="block w-full text-center px-4 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-base"
                        >
                          My Profiles
                        </Link>
                      )}

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-base"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
                      Account
                    </h3>
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="block w-full text-center px-4 py-3 rounded-lg border-2 border-primary-300 text-primary-600 font-medium hover:bg-primary-50 transition-colors text-base"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="block w-full text-center px-4 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-base"
                      >
                        Register to Apply
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                  Contact
                </h3>
                <div className="space-y-3 px-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📧</span>
                    <span>info@kesemcooperative.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📞</span>
                    <span>+251 11 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400">📍</span>
                    <span>Arerti, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;