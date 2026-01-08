// src/pages/Admin/ManageTenders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTenders();
  }, []);

  const loadTenders = () => {
    try {
      const storedTenders = JSON.parse(localStorage.getItem('tenders') || '[]');
      // Sort by creation date, newest first
      const sortedTenders = storedTenders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTenders(sortedTenders);
    } catch (error) {
      console.error('Error loading tenders:', error);
      setTenders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTenderStatus = (tenderId, newStatus) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, status: newStatus } : tender
    );
    
    setTenders(updatedTenders);
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
    
    // Show success message
    alert(`Tender ${newStatus.toLowerCase()} successfully!`);
  };

  const deleteTender = (tenderId) => {
    if (window.confirm('Are you sure you want to delete this tender? This action cannot be undone.')) {
      const updatedTenders = tenders.filter(tender => tender.id !== tenderId);
      setTenders(updatedTenders);
      localStorage.setItem('tenders', JSON.stringify(updatedTenders));
      alert('Tender deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'DRAFT':
        return 'bg-amber-100 text-amber-800 border-amber-200';
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
      case 'DRAFT':
        return '🟡';
      default:
        return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading tenders...</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Manage Tenders</h2>
            <p className="text-gray-600 mt-2">View and manage all procurement opportunities</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {tenders.length} tender(s)
            </span>
            <Link 
              to="/admin/create-tender" 
              className="btn btn-primary flex items-center space-x-2"
            >
              <span>➕</span>
              <span>New Tender</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tenders List */}
      {tenders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tenders Created Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start by creating your first tender to attract suppliers and farmers to Kesem Cooperative.
          </p>
          <Link to="/admin/create-tender" className="btn btn-primary">
            Create First Tender
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {tenders.map((tender) => (
            <div key={tender.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tender.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{tender.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm">{getStatusIcon(tender.status)}</span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(tender.status)}`}>
                        {tender.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tender Details */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Category:</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{tender.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Quantity:</span>
                  <span>{tender.quantity} {tender.unit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Deadline:</span>
                  <span className={new Date(tender.deadline) < new Date() ? 'text-red-600 font-medium' : ''}>
                    {new Date(tender.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Budget:</span>
                  <span>{tender.budget ? `ETB ${Number(tender.budget).toLocaleString()}` : 'Not specified'}</span>
                </div>
              </div>

              {/* Specifications (if available) */}
              {tender.specifications && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Specifications:</span>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tender.specifications}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Created: {new Date(tender.createdAt).toLocaleDateString()} 
                  {tender.contactInfo && ` • Contact: ${tender.contactInfo}`}
                </div>
                <div className="flex space-x-2">
                  {tender.status === 'ACTIVE' ? (
                    <button
                      onClick={() => updateTenderStatus(tender.id, 'CLOSED')}
                      className="btn bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm px-4 py-2"
                    >
                      Close Tender
                    </button>
                  ) : (
                    <button
                      onClick={() => updateTenderStatus(tender.id, 'ACTIVE')}
                      className="btn bg-green-100 text-green-700 hover:bg-green-200 text-sm px-4 py-2"
                    >
                      Reopen Tender
                    </button>
                  )}
                  <button
                    onClick={() => deleteTender(tender.id)}
                    className="btn bg-red-100 text-red-700 hover:bg-red-200 text-sm px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      {tenders.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-lg">💡</span>
            <div>
              <h4 className="font-medium text-blue-900">Management Tips</h4>
              <p className="text-blue-700 text-sm mt-1">
                • Close tenders after the deadline to stop new applications<br/>
                • Delete tenders only if they were created by mistake<br/>
                • Active tenders are visible to applicants for bidding
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTenders;