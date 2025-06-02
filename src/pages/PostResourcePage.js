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
    image: null, // For file input
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status

    // In a real application:
    // 1. Validate formData
    // 2. Create FormData object for file upload:
    //    const dataToSend = new FormData();
    //    for (const key in formData) {
    //      dataToSend.append(key, formData[key]);
    //    }
    // 3. Send to backend API (e.g., using fetch or axios)
    //    const response = await fetch('/api/resources/post', {
    //      method: 'POST',
    //      body: dataToSend, // Use dataToSend for file upload
    //      // Headers are often set automatically by browser for FormData
    //    });
    // 4. Handle response and setSubmissionStatus

    console.log('Resource to be posted:', formData);
    // Simulate successful submission
    setTimeout(() => {
      setSubmissionStatus('success');
      setFormData({ title: '', type: '', condition: '', description: '', location: '', image: null }); // Clear form
      // navigate('/marketplace/catalog'); // Optionally navigate to catalog
    }, 1500);
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
            <option value="Book">Book</option>
            <option value="Equipment">Equipment</option>
            <option value="Housing">Housing</option>
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
          <label htmlFor="image">Upload Image (Optional):</label>
          <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" />
        </div>

        <button type="submit" className="post-button">Post Resource</button>
      </form>
    </div>
  );
};

export default PostResourcePage;