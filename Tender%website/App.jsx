// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NavbarProvider, useNavbar } from './context/NavbarContext';

// Import Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import Tenders from './pages/Public/Tenders';
import Home from './pages/Public/Home';
import About from './pages/Public/About';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ApplyTender from './pages/Public/ApplyTender';

// Component to conditionally render navbar and footer
const AppContent = () => {
  const location = useLocation();
  const { showNavbar } = useNavbar();

  // Close mobile menu when route changes
  useEffect(() => {
    // This will be handled by the Navbar component's internal state
    // when it detects route changes
  }, [location]);

  // Hide navbar on admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowNavbar = showNavbar && !isAdminRoute;
  
  // Hide footer on admin routes
  const shouldShowFooter = !isAdminRoute;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply/:id" element={<ApplyTender />} />
          
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          {/* User Dashboard */}
          <Route path="/dashboard/*" element={<UserDashboard />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NavbarProvider>
        <Router>
          <AppContent />
        </Router>
      </NavbarProvider>
    </AuthProvider>
  );
}

export default App;