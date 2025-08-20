import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useContacts } from '../hooks/useGlobalReduce';

// Add/Edit Contact Form View (Single Page)
const Single = ({ onBack, editingContact = null }) => {
  const { createContact, updateContact, loading } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || '',
        phone: editingContact.phone || '',
        email: editingContact.email || '',
        address: editingContact.address || ''
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = editingContact
      ? await updateContact(editingContact.id, formData)
      : await createContact(formData);

    if (success) {
      onBack();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="modern-container">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="btn-secondary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contacts
          </button>
          <h1 className="modern-header">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h1>
        </div>

        <div className="modern-form">
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="form-input"
                placeholder="Enter address"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="btn-modern flex-1"
              >
                {loading ? 'Saving...' : (editingContact ? 'Update Contact' : 'Create Contact')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;