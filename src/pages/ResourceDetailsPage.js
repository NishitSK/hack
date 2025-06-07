import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import './ResourceDetailsPage.css'; // Ensure this CSS file exists for styling

const ResourceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); // State to control edit form visibility
  const [editedResource, setEditedResource] = useState(null); // State to hold data for editing

  // Function to fetch resource details
  const fetchResourceDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResource(data);
      setEditedResource(data); // Initialize editedResource with fetched data
    } catch (err) {
      console.error('Error fetching resource details:', err);
      setError(`Failed to load resource details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResourceDetails();
    } else {
      setLoading(false);
      setError('No resource ID provided.');
    }
  }, [id]); // Re-fetch if the ID changes

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedResource(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Handle update (PUT) request
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedResource),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update resource: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setResource(updatedData); // Update the displayed resource with the new data
      setShowEditForm(false); // Close the edit form
      alert('Resource updated successfully!'); // Consider custom modal/toast
    } catch (err) {
      console.error('Error updating resource:', err);
      alert(`Error updating resource: ${err.message}`); // Consider custom modal/toast
    }
  };

  // Handle delete (DELETE) request
  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this resource?')) { // Use custom modal in real app
      try {
        const response = await fetch(`http://localhost:5000/api/resources/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete resource: ${response.statusText}`);
        }

        alert('Resource deleted successfully!'); // Consider custom modal/toast
        navigate('/marketplace/catalog'); // Redirect to catalog after deletion
      } catch (err) {
        console.error('Error deleting resource:', err);
        alert(`Error deleting resource: ${err.message}`); // Consider custom modal/toast
      }
    }
  };


  if (loading) {
    return <div className="loading-message">Loading resource details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!resource) {
    return <div className="no-resource-found">Resource not found.</div>;
  }

  return (
    <div className="resource-details-page">
      <Link to="/marketplace/catalog" className="back-button">← Back to Resource Catalog</Link>
      
      <h2 className="resource-detail-title">{resource.title}</h2>
      
      <div className="resource-actions">
        <button className="edit-button" onClick={() => setShowEditForm(true)}>Edit Resource</button>
        <button className="delete-button" onClick={handleDeleteClick}>Delete Resource</button>
      </div>

      <div className="resource-info-grid">
        <div className="info-item">
          <strong>Category:</strong> <span>{resource.category}</span>
        </div>
        <div className="info-item">
          <strong>Location:</strong> <span>{resource.location}</span>
        </div>
        {resource.price > 0 && (
          <div className="info-item">
            <strong>Price:</strong> <span className="price-tag">₹{resource.price}</span>
          </div>
        )}
        <div className="info-item">
          <strong>Status:</strong> <span className={`status-${resource.status.toLowerCase()}`}>{resource.status}</span>
        </div>
        <div className="info-item full-width">
          <strong>Description:</strong> <p>{resource.description}</p>
        </div>
        <div className="info-item full-width contact-section">
          <h3>Contact Information:</h3>
          <p><strong>Person:</strong> {resource.contactPerson}</p>
          {resource.contactEmail && <p><strong>Email:</strong> <a href={`mailto:${resource.contactEmail}`}>{resource.contactEmail}</a></p>}
          {resource.contactPhone && <p><strong>Phone:</strong> <a href={`tel:${resource.contactPhone}`}>{resource.contactPhone}</a></p>}
        </div>
        <div className="info-item full-width">
          <strong>Date Posted:</strong> <span>{new Date(resource.datePosted).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Edit Resource Form Modal */}
      {showEditForm && editedResource && (
        <div className="edit-resource-form-modal">
          <div className="modal-content">
            <h3>Edit Resource</h3>
            <button className="modal-close-button" onClick={() => setShowEditForm(false)}>X</button>

            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <label htmlFor="editTitle">Title:</label>
                <input type="text" id="editTitle" name="title" value={editedResource.title} onChange={handleEditChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="editDescription">Description:</label>
                <textarea id="editDescription" name="description" value={editedResource.description} onChange={handleEditChange} required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="editCategory">Category:</label>
                <select id="editCategory" name="category" value={editedResource.category} onChange={handleEditChange} required>
                  <option value="Books">Books</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Services">Services</option>
                  <option value="Housing">Housing</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="editContactPerson">Contact Person:</label>
                <input type="text" id="editContactPerson" name="contactPerson" value={editedResource.contactPerson} onChange={handleEditChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="editContactEmail">Contact Email:</label>
                <input type="email" id="editContactEmail" name="contactEmail" value={editedResource.contactEmail} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label htmlFor="editContactPhone">Contact Phone:</label>
                <input type="tel" id="editContactPhone" name="contactPhone" value={editedResource.contactPhone} onChange={handleEditChange} />
              </div>
              <div className="form-group">
                <label htmlFor="editLocation">Location:</label>
                <input type="text" id="editLocation" name="location" value={editedResource.location} onChange={handleEditChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="editPrice">Price (₹):</label>
                <input type="number" id="editPrice" name="price" value={editedResource.price} onChange={handleEditChange} min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="editStatus">Status:</label>
                <select id="editStatus" name="status" value={editedResource.status} onChange={handleEditChange} required>
                  <option value="Available">Available</option>
                  <option value="Claimed">Claimed</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-edit-button">Save Changes</button>
                <button type="button" className="cancel-button" onClick={() => setShowEditForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDetailsPage;
