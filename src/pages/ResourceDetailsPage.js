import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResourceDetailsPage.css';

const ResourceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // For direct messaging

  useEffect(() => {
    // Fetch resource details from backend
    // fetch(`/api/resources/${id}`)
    //   .then(response => {
    //     if (!response.ok) throw new Error('Resource not found');
    //     return response.json();
    //   })
    //   .then(data => {
    //     setResource(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err.message);
    //     setLoading(false);
    //   });

    // Mock data
    const mockResources = {
      'b001': { id: 'b001', type: 'Book', title: 'Guide to Post-Service Opportunities', condition: 'Good', description: 'Comprehensive guide covering career transition, entrepreneurship, and pension management for ex-servicemen. Essential reading.', location: 'Bengaluru, Karnataka', contact: 'John Doe', ownerId: 'user123', imageUrl: 'https://via.placeholder.com/400x300?text=Book+Cover' },
      'e001': { id: 'e001', type: 'Equipment', title: 'Medical First Aid Kit (Large)', condition: 'New', description: 'Sealed, unused medical first aid kit suitable for home or small office use. Includes bandages, antiseptic, pain relievers, etc.', location: 'Mysuru, Karnataka', contact: 'Jane Smith', ownerId: 'user124', imageUrl: 'https://via.placeholder.com/400x300?text=Medical+Kit' },
      'h001': { id: 'h001', type: 'Housing', title: '2BHK Apartment for Rent (Concessional)', condition: 'Excellent', description: 'Spacious 2BHK apartment available for rent, offering concessional rates for veteran families. Located near military hospital, with good amenities and connectivity.', location: 'Mangaluru, Karnataka', contact: 'R. Sharma', ownerId: 'user125', imageUrl: 'https://via.placeholder.com/400x300?text=Apartment' },
    };

    if (mockResources[id]) {
      setResource(mockResources[id]);
      setLoading(false);
    } else {
      setError('Resource not found.');
      setLoading(false);
    }
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, send message to backend (requires user authentication)
      console.log(`Sending message to ${resource.contact} (${resource.ownerId}): ${message}`);
      alert('Message sent! Owner will be notified.');
      setMessage('');
    } else {
      alert('Message cannot be empty.');
    }
  };

  if (loading) return <div className="loading-message">Loading resource details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!resource) return <div className="error-message">Resource data not available.</div>;

  return (
    <div className="page-section resource-details-page">
      <button onClick={() => navigate('/marketplace/catalog')} className="back-to-catalog-button">&#8592; Back to Catalog</button>

      <h2>{resource.title}</h2>
      <p className="resource-type-detail">Type: {resource.type}</p>

      <div className="resource-main-info">
        <div className="resource-image-container">
          <img src={resource.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} alt={resource.title} className="resource-detail-image" />
        </div>
        <div className="resource-text-details">
          <p><strong>Condition:</strong> {resource.condition}</p>
          <p><strong>Location:</strong> {resource.location}</p>
          <p><strong>Description:</strong> {resource.description}</p>
          <p><strong>Contact Person:</strong> {resource.contact}</p>
        </div>
      </div>

      <div className="messaging-section">
        <h3>Contact Owner</h3>
        <p>Send a message to the resource owner to inquire about this item. (Login required)</p>
        <form onSubmit={handleSendMessage} className="message-form">
          <div className="form-group">
            <textarea
              placeholder="Type your message here..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="send-message-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ResourceDetailsPage;