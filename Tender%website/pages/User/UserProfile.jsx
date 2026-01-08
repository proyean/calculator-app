// src/pages/User/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTenders, setActiveTenders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'applications'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const allTenders = JSON.parse(localStorage.getItem('tenders') || '[]');

      setUser(currentUser);
      
      // Filter user's applications
      const userApplications = allApplications.filter(app => app.userId === currentUser.id);
      setApplications(userApplications);

      // Get active tenders for reference
      const activeTendersList = allTenders.filter(tender => tender.status === 'ACTIVE');
      setActiveTenders(activeTendersList);

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApplicationStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return '✅';
      case 'REJECTED':
        return '❌';
      case 'PENDING':
        return '⏳';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and track applications</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* User Summary */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-600">👤</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.farmName || 'Individual Applicant'}</p>
                <div className="inline-flex px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mt-2">
                  Applicant
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  👤 Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  📋 My Applications ({applications.length})
                </button>
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Applications</span>
                    <span className="font-semibold">{applications.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pending</span>
                    <span className="font-semibold text-amber-600">
                      {applications.filter(app => app.status === 'PENDING').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Approved</span>
                    <span className="font-semibold text-green-600">
                      {applications.filter(app => app.status === 'APPROVED').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                        {user?.name}
                      </div>
                    </div>
                    
                    <div>
                      <label className="label">Email Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                        {user?.email}
                      </div>
                    </div>

                    {user?.farmName && (
                      <div>
                        <label className="label">Farm/Business Name</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                          {user?.farmName}
                        </div>
                      </div>
                    )}

                    {user?.phone && (
                      <div>
                        <label className="label">Phone Number</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                          {user?.phone}
                        </div>
                      </div>
                    )}

                    {user?.location && (
                      <div className="md:col-span-2">
                        <label className="label">Location</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                          {user?.location}
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="label">Member Since</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="btn btn-outline">
                      Edit Profile Information
                    </button>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      to="/tenders"
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">📋</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">Browse Tenders</h3>
                          <p className="text-sm text-gray-600">{activeTenders.length} active opportunities</p>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors group cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">Application Stats</h3>
                          <p className="text-sm text-gray-600">
                            {applications.filter(app => app.status === 'APPROVED').length} approved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                {/* Applications Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                    <span className="text-sm text-gray-500">
                      {applications.length} application(s)
                    </span>
                  </div>

                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📝</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't applied for any tenders yet. Browse available opportunities to get started.
                      </p>
                      <Link to="/tenders" className="btn btn-primary">
                        Browse Tenders & Apply
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {application.tenderTitle || 'Tender Application'}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Applied on {new Date(application.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>{getApplicationStatusIcon(application.status)}</span>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getApplicationStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                          </div>

                          {application.proposal && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-700">Your Proposal:</span>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {application.proposal}
                              </p>
                            </div>
                          )}

                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Reference: {application.tenderId?.slice(-8)}</span>
                            {application.updatedAt && application.status !== 'PENDING' && (
                              <span>Updated: {new Date(application.updatedAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Application Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 text-lg">💡</span>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Application Tips</h3>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Ensure your profile information is complete and up-to-date</li>
                        <li>• Read tender specifications carefully before applying</li>
                        <li>• Submit your applications well before the deadline</li>
                        <li>• Check back regularly for application status updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;