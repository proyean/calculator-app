// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useNavbar } from '../../context/NavbarContext';
import CreateTender from './CreateTender';
import ManageTenders from './ManageTenders';
import TenderApplications from './TenderApplications';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalTenders: 0,
    activeTenders: 0,
    totalApplications: 0,
    pendingApplications: 0
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { showNavbar } = useNavbar();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const tenders = JSON.parse(localStorage.getItem('tenders') || '[]');
    const applicationsData = JSON.parse(localStorage.getItem('applications') || '[]');
    
    // Sort applications by date
    const sortedApplications = applicationsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setApplications(sortedApplications);
    
    setStats({
      totalTenders: tenders.length,
      activeTenders: tenders.filter(t => t.status === 'ACTIVE').length,
      totalApplications: applicationsData.length,
      pendingApplications: applicationsData.filter(a => a.status === 'PENDING').length
    });
  };

  const handleBackToHome = () => {
    showNavbar(); // Show navbar when going back to home
    navigate('/');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: '📊',
      current: isActive('/admin') && location.pathname === '/admin'
    },
    {
      name: 'Create Tender',
      href: '/admin/create-tender',
      icon: '➕',
      current: isActive('/admin/create-tender')
    },
    {
      name: 'Manage Tenders',
      href: '/admin/manage-tenders',
      icon: '📋',
      current: isActive('/admin/manage-tenders')
    },
    {
      name: 'Applications',
      href: '/admin/applications',
      icon: '📝',
      current: isActive('/admin/applications')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <span className="text-xl">🌾</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Kesem Admin</h1>
              <p className="text-xs text-gray-500">Tender Management</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.current
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          
          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left transition-colors mt-8"
          >
            <span className="text-lg">🏠</span>
            <span>Back to Home</span>
          </button>
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="p-4 border-t border-gray-200 mt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Active Tenders</span>
              <span className="font-semibold text-primary-600">{stats.activeTenders}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Pending Apps</span>
              <span className="font-semibold text-amber-600">{stats.pendingApplications}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navigation.find(item => item.current)?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage Kesem Cooperative tenders and applications
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Kesem Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">KA</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<DashboardOverview stats={stats} applications={applications} onRefresh={loadStats} />} />
            <Route path="/create-tender" element={<CreateTender />} />
            <Route path="/manage-tenders" element={<ManageTenders />} />
            <Route path="/applications" element={<TenderApplications />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ stats, onRefresh, applications }) => {
  const [recentTenders, setRecentTenders] = useState([]);
  const [quickActions] = useState([
    {
      title: 'Create New Tender',
      description: 'Post a new procurement opportunity',
      icon: '➕',
      href: '/admin/create-tender',
      color: 'primary'
    },
    {
      title: 'Manage Tenders',
      description: 'View and manage existing tenders',
      icon: '📋',
      href: '/admin/manage-tenders',
      color: 'blue'
    },
    {
      title: 'Review Applications',
      description: 'Check and process applications',
      icon: '📝',
      href: '/admin/applications',
      color: 'amber'
    }
  ]);

  useEffect(() => {
    const tenders = JSON.parse(localStorage.getItem('tenders') || '[]');
    setRecentTenders(tenders.slice(0, 5).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      case 'DRAFT': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
            <p className="text-primary-100 text-lg">
              Manage your tenders and review applications from the Kesem community.
            </p>
          </div>
          <button
            onClick={onRefresh}
            className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTenders}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tenders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeTenders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-2xl">🟢</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalApplications}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingApplications}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Tenders & Recent Applications */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className={`p-3 rounded-lg ${
                  action.color === 'primary' ? 'bg-primary-100' :
                  action.color === 'blue' ? 'bg-blue-100' :
                  'bg-amber-100'
                }`}>
                  <span className="text-xl">{action.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <div className="text-gray-400 group-hover:text-primary-600">
                  →
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Tenders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Tenders</h2>
            <a 
              href="/admin/manage-tenders" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </a>
          </div>
          
          {recentTenders.length > 0 ? (
            <div className="space-y-4">
              {recentTenders.map((tender) => (
                <div key={tender.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{tender.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{tender.category}</span>
                      <span>•</span>
                      <span>{new Date(tender.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(tender.status)}`}>
                    {tender.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tenders Yet</h3>
              <p className="text-gray-600 mb-4">Create your first tender to get started</p>
              <a href="/admin/create-tender" className="btn btn-primary">
                Create First Tender
              </a>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <a 
              href="/admin/applications" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </a>
          </div>
          
          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{application.userName}</h3>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                      <span className="truncate">{application.tenderTitle}</span>
                      <span>•</span>
                      <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    application.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <span className="text-gray-400 text-sm">No applications yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;