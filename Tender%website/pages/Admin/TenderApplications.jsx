// src/pages/Admin/TenderApplications.jsx
import React, { useState, useEffect } from 'react';

const TenderApplications = () => {
  const [applications, setApplications] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [selectedTender, setSelectedTender] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const storedTenders = JSON.parse(localStorage.getItem('tenders') || '[]');
      
      // Sort applications by creation date (newest first)
      const sortedApplications = storedApplications.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setApplications(sortedApplications);
      setTenders(storedTenders);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter applications based on status and tender
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filter === 'all' || app.status === filter.toUpperCase();
    const matchesTender = selectedTender === 'all' || app.tenderId === selectedTender;
    return matchesStatus && matchesTender;
  });

  const updateApplicationStatus = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
    );
    
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    setSelectedApplication(null);
    
    alert(`Application ${newStatus.toLowerCase()} successfully!`);
  };

  const getStatusColor = (status) => {
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

  const getStatusIcon = (status) => {
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

  const getTenderTitle = (tenderId) => {
    const tender = tenders.find(t => t.id === tenderId);
    return tender ? tender.title : 'Unknown Tender';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tender Applications</h2>
            <p className="text-gray-600 mt-2">Review and manage applications from suppliers</p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {applications.length} total application(s)
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Status Filter */}
          <div>
            <label className="label mb-3">Filter by Status</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    filter === status
                      ? status === 'all' ? 'bg-primary-600 text-white' :
                        status === 'pending' ? 'bg-amber-600 text-white' :
                        status === 'approved' ? 'bg-green-600 text-white' :
                        'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status === 'all' ? 'All Status' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Tender Filter */}
          <div>
            <label className="label mb-3">Filter by Tender</label>
            <select
              value={selectedTender}
              onChange={(e) => setSelectedTender(e.target.value)}
              className="input"
            >
              <option value="all">All Tenders</option>
              {tenders.map(tender => (
                <option key={tender.id} value={tender.id}>
                  {tender.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {applications.filter(app => app.status === 'PENDING').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === 'REJECTED').length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {applications.length === 0 ? 'No Applications Yet' : 'No Applications Match Your Filters'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {applications.length === 0 
              ? 'Applicants will appear here once they start applying for your tenders.'
              : 'Try adjusting your filters to see more applications.'
            }
          </p>
          {applications.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Make sure you have active tenders for applicants to apply.</p>
              <a href="/admin/create-tender" className="btn btn-primary">
                Create First Tender
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {application.tenderTitle || getTenderTitle(application.tenderId)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium">{application.userName}</span>
                        <span>•</span>
                        <span>{application.userEmail}</span>
                        {application.userFarm && (
                          <>
                            <span>•</span>
                            <span>{application.userFarm}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm">{getStatusIcon(application.status)}</span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Proposal</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {application.proposal}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Proposed Price:</span>
                    <span className="font-semibold text-green-600">
                      ETB {application.price ? Number(application.price).toLocaleString() : 'Not specified'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Time:</span>
                    <span className="font-semibold">{application.deliveryTime || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Applied On:</span>
                    <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {application.additionalInfo && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Additional Information</h4>
                  <p className="text-gray-600 text-sm">{application.additionalInfo}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Applicant Contact</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Email:</span> {application.userEmail}
                  </div>
                  {application.userPhone && (
                    <div>
                      <span className="font-medium">Phone:</span> {application.userPhone}
                    </div>
                  )}
                  {application.userLocation && (
                    <div>
                      <span className="font-medium">Location:</span> {application.userLocation}
                    </div>
                  )}
                  {application.userFarm && (
                    <div>
                      <span className="font-medium">Farm/Business:</span> {application.userFarm}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Application ID: {application.id.slice(-8)}
                  {application.updatedAt && application.status !== 'PENDING' && (
                    <span className="ml-4">
                      Updated: {new Date(application.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {application.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'APPROVED')}
                        className="btn bg-green-100 text-green-700 hover:bg-green-200 text-sm px-4 py-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'REJECTED')}
                        className="btn bg-red-100 text-red-700 hover:bg-red-200 text-sm px-4 py-2"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {application.status !== 'PENDING' && (
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'PENDING')}
                      className="btn bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm px-4 py-2"
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      {applications.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-lg">💡</span>
            <div>
              <h4 className="font-medium text-blue-900">Application Management Tips</h4>
              <ul className="text-blue-700 text-sm mt-1 space-y-1">
                <li>• Review applications carefully before making decisions</li>
                <li>• Consider both price and proposal quality</li>
                <li>• Contact applicants if you need more information</li>
                <li>• Update application status promptly after review</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderApplications;