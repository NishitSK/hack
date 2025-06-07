import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SchemeDetailsPage.css';

const SchemeDetailsPage = () => {
  const { id } = useParams(); // Get the scheme ID from the URL
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // ACTUAL API CALL TO YOUR BACKEND
        const response = await fetch(`http://localhost:5000/api/schemes/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Scheme not found.');
          }
          throw new Error(`Failed to fetch scheme details: ${response.statusText}`);
        }

        const data = await response.json();
        setScheme(data);
      } catch (err) {
        console.error('Error fetching scheme details:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Only fetch if ID is available
      fetchSchemeDetails();
    }
  }, [id]); // Re-fetch if ID changes

  if (loading) {
    return <div className="loading-message">Loading scheme details...</div>;
  }

  if (error) {
    return (
      <div className="page-section error-section">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/welfare-schemes/catalog')} className="back-button">Back to Schemes</button>
      </div>
    );
  }

  if (!scheme) {
    // This case should ideally not be hit if error handling works,
    // but acts as a fallback for missing data after loading.
    return (
      <div className="page-section error-section">
        <div className="no-scheme-message">No scheme details available.</div>
        <button onClick={() => navigate('/welfare-schemes/catalog')} className="back-button">Back to Schemes</button>
      </div>
    );
  }

  // Helper to format date if datePosted exists
  const formattedDate = scheme.datePosted 
    ? new Date(scheme.datePosted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';


  return (
    <div className="page-section scheme-details-page">
      <button onClick={() => navigate('/welfare-schemes/catalog')} className="back-button">Back to Schemes</button>
      
      <h2>{scheme.title}</h2>
      <p className="scheme-details-category"><strong>Category:</strong> {scheme.category}</p>
      
      <div className="details-group">
        <h3>Description</h3>
        <p>{scheme.description}</p>
      </div>

      <div className="details-group">
        <h3>Eligibility Criteria</h3>
        <p>{scheme.eligibility}</p>
      </div>

      {scheme.applicationProcess && ( // Only show if applicationProcess exists
        <div className="details-group">
          <h3>Application Process</h3>
          <p>{scheme.applicationProcess}</p>
        </div>
      )}

      <div className="details-group">
        <h3>Contact Information</h3>
        <p>{scheme.contactInfo}</p>
      </div>

      <p className="date-posted">
        <small>Posted on: {formattedDate}</small>
      </p>

      {/* --- THIS IS THE BLOCK FOR THE "APPLY NOW" BUTTON --- */}
      {scheme.applicationLink && ( // Conditionally render if applicationLink exists and is not empty
        <div className="apply-button-container">
          <a 
            href={scheme.applicationLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="apply-now-button"
          >
            Apply Now (External Link)
          </a>
        </div>
      )}
    </div>
  );
};

export default SchemeDetailsPage;