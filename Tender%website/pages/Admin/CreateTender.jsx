// src/pages/Admin/CreateTender.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTender = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    specifications: '',
    deadline: '',
    budget: '',
    contactInfo: ''
  });

  const categories = [
    'Crops',
    'Livestock',
    'Equipment',
    'Services',
    'Inputs',
    'Other'
  ];

  const units = [
    'KG',
    'Quintal',
    'Ton',
    'Liter',
    'Piece',
    'Hour',
    'Day',
    'Unit'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('user'));
      
      const newTender = {
        id: Date.now().toString(),
        ...formData,
        authorId: currentUser.id,
        authorName: currentUser.name,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        applications: []
      };

      // Save to localStorage
      const existingTenders = JSON.parse(localStorage.getItem('tenders') || '[]');
      existingTenders.push(newTender);
      localStorage.setItem('tenders', JSON.stringify(existingTenders));

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        quantity: '',
        unit: '',
        specifications: '',
        deadline: '',
        budget: '',
        contactInfo: ''
      });

      alert('Tender created successfully!');
      // Use window.location.href for full page reload and proper navigation
      window.location.href = '/admin/manage-tenders';

    } catch (error) {
      alert('Error creating tender: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New Tender</h2>
        <p className="text-gray-600 mt-2">Post a new procurement opportunity for Kesem Cooperative</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Tender Title *</label>
              <input
                type="text"
                name="title"
                required
                className="input"
                placeholder="e.g., Maize Procurement 2024"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Category *</label>
              <select
                name="category"
                required
                className="input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Description *</label>
            <textarea
              name="description"
              required
              rows="4"
              className="input"
              placeholder="Describe the tender requirements, quality standards, and any special instructions..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Quantity & Specifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity & Specifications</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="input"
                placeholder="e.g., 1000"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Unit</label>
              <select
                name="unit"
                className="input"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="">Select Unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Budget (ETB)</label>
              <input
                type="number"
                name="budget"
                className="input"
                placeholder="Estimated budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Specifications & Requirements</label>
            <textarea
              name="specifications"
              rows="3"
              className="input"
              placeholder="Detailed specifications, quality requirements, delivery terms..."
              value={formData.specifications}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Timeline & Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Contact</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Application Deadline *</label>
              <input
                type="datetime-local"
                name="deadline"
                required
                className="input"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Contact Information</label>
              <input
                type="text"
                name="contactInfo"
                className="input"
                placeholder="Phone or email for queries"
                value={formData.contactInfo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.location.href = '/admin'}
              className="btn btn-outline px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-8"
            >
              {loading ? 'Creating Tender...' : 'Create Tender'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTender;