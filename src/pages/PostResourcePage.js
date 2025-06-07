import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostResourcePage.css';

const PostResourcePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    condition: '',
    description: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    price: 0,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('loading');

    const dataToSend = {
      title: formData.title,
      description: formData.description,
      category: formData.type,
      location: formData.location,
      price: parseFloat(formData.price) || 0,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      contactPerson: "N/A",
      status: 'Available',
    };

    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSubmissionStatus('success');
      alert('Resource posted successfully!');
      setFormData({
        title: '',
        type: '',
        condition: '',
        description: '',
        location: '',
        contactEmail: '',
        contactPhone: '',
        price: 0,
      });
      navigate('/marketplace/catalog');
    } catch (err) {
      console.error('Error posting resource:', err);
      setSubmissionStatus('error');
      alert(`Failed to post resource: ${err.message}`);
    }
  };

  return (
    <div className="page-section">
      <h2>Post a Resource</h2>
      <p>Share your unused books, equipment, or available housing with the military community. Help others and declutter!</p>

      <form onSubmit={handleSubmit} className="post-resource-form">
        {submissionStatus === 'success' && (
          <div className="alert success">
            Your resource has been posted successfully! It will appear in the catalog shortly.
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="alert error">
            Failed to post resource. Please try again.
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Resource Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="type">Resource Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Books">Books</option>
            <option value="Equipment">Equipment</option>
            <option value="Services">Services</option>
            <option value="Housing">Housing</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange} required>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Used - Acceptable">Used - Acceptable</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location (City/District, State):</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Bengaluru, Karnataka" required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹):</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" />
        </div>
        
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email:</label>
          <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone:</label>
          <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
        </div>

        <button type="submit" className="post-button" disabled={submissionStatus === 'loading'}>
          {submissionStatus === 'loading' ? 'Posting...' : 'Post Resource'}
        </button>
      </form>
    </div>
  );
};

export default PostResourcePage;