// src/pages/Public/ApplyTender.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ApplyTender = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    proposal: '',
    price: '',
    deliveryTime: '',
    additionalInfo: ''
  });
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    loadTenderData();
  }, [id]);

  const loadTenderData = () => {
    try {
      const tenders = JSON.parse(localStorage.getItem('tenders') || '[]');
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      
      const foundTender = tenders.find(t => t.id === id);
      setTender(foundTender);

      // Check if user has already applied
      if (user) {
        const userApplication = applications.find(
          app => app.tenderId === id && app.userId === user.id
        );
        setHasApplied(!!userApplication);
      }

    } catch (error) {
      console.error('Error loading tender:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newApplication = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userFarm: user.farmName || '',
        userPhone: user.phone || '',
        userLocation: user.location || '',
        tenderId: tender.id,
        tenderTitle: tender.title,
        tenderCategory: tender.category,
        ...formData,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      existingApplications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(existingApplications));

      // Show success message and redirect
      alert('Application submitted successfully!');
      navigate('/dashboard/profile');

    } catch (error) {
      alert('Error submitting application: ' + error.message);
    } finally {
      setSubmitting(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading tender details...</p>
        </div>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tender Not Found</h2>
          <p className="text-gray-600 mb-6">The tender you're looking for doesn't exist or has been removed.</p>
          <Link to="/tenders" className="btn btn-primary">
            Browse Available Tenders
          </Link>
        </div>
      </div>
    );
  }

  if (tender.status !== 'ACTIVE') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⏸️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tender Not Active</h2>
          <p className="text-gray-600 mb-6">This tender is no longer accepting applications.</p>
          <Link to="/tenders" className="btn btn-primary">
            Browse Active Tenders
          </Link>
        </div>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted</h2>
          <p className="text-gray-600 mb-6">You have already applied for this tender.</p>
          <div className="space-y-3">
            <Link to="/dashboard/profile" className="btn btn-primary block">
              View My Applications
            </Link>
            <Link to="/tenders" className="btn btn-outline block">
              Browse More Tenders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(tender.deadline);
  const isDeadlineNear = daysRemaining <= 3;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Tender</h1>
          <p className="text-gray-600">Submit your proposal for consideration</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tender Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tender Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{tender.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{tender.description}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium">{tender.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium">{tender.quantity} {tender.unit}</span>
                  </div>
                  {tender.budget && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="font-medium text-green-600">
                        ETB {Number(tender.budget).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Deadline:</span>
                    <span className={`font-medium ${isDeadlineNear ? 'text-amber-600' : 'text-green-600'}`}>
                      {new Date(tender.deadline).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-gray-500">({daysRemaining} days left)</span>
                    </span>
                  </div>
                </div>

                {tender.specifications && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Requirements:</h4>
                    <p className="text-sm text-gray-600">{tender.specifications}</p>
                  </div>
                )}

                {tender.contactInfo && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Contact:</h4>
                    <p className="text-sm text-gray-600">{tender.contactInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Proposal */}
                <div>
                  <label className="label">
                    Your Proposal *
                  </label>
                  <textarea
                    name="proposal"
                    required
                    rows="6"
                    className="input"
                    placeholder="Describe how you will meet the tender requirements. Include your capabilities, experience, and why you're the best choice..."
                    value={formData.proposal}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 100 characters. Be specific about how you meet the requirements.
                  </p>
                </div>

                {/* Price and Delivery */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      Your Price (ETB) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      className="input"
                      placeholder="Enter your proposed price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                    {tender.budget && (
                      <p className="text-sm text-gray-500 mt-1">
                        Tender budget: ETB {Number(tender.budget).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      Delivery Time *
                    </label>
                    <input
                      type="text"
                      name="deliveryTime"
                      required
                      className="input"
                      placeholder="e.g., 15 days, 1 month, etc."
                      value={formData.deliveryTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="label">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows="4"
                    className="input"
                    placeholder="Any additional information about your offer, certifications, references, or special capabilities..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>

                {/* User Information Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Your Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{user.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 font-medium">{user.email}</span>
                    </div>
                    {user.farmName && (
                      <div>
                        <span className="text-gray-500">Farm/Business:</span>
                        <span className="ml-2 font-medium">{user.farmName}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium">{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <Link
                    to="/tenders"
                    className="btn btn-outline px-8 order-2 sm:order-1"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting || formData.proposal.length < 100}
                    className="btn btn-primary px-8 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>

                {/* Application Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 text-lg">💡</span>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Application Tips</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Be specific about how you meet the requirements</li>
                        <li>• Provide a competitive but realistic price</li>
                        <li>• Include your relevant experience and capabilities</li>
                        <li>• Ensure all information is accurate and complete</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyTender;