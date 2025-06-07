import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SchemeCatalogPage.css'; 

const SchemeCatalogPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schemes');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSchemes(data);
      } catch (err) {
        console.error("Failed to fetch schemes:", err);
        setError('Failed to fetch schemes. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) return <div className="loading-message">Loading schemes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-section">
      <h2>Welfare Scheme Catalog</h2>
      <p>Browse through the various welfare schemes. Click on a scheme to view detailed information, eligibility criteria, and application process.</p>

      <div className="scheme-list-grid">
        {schemes.length === 0 ? (
          <p className="no-results">No schemes found. Add some from your backend!</p>
        ) : (
          schemes.map(scheme => (
            <div key={scheme._id} className="scheme-item-card"> 
              <h3>{scheme.title}</h3> 
              <p className="scheme-category">Category: {scheme.category}</p>
              <p>{scheme.description.substring(0, 100)}...</p>
              <Link to={`/welfare-schemes/catalog/${scheme._id}`} className="view-details-button">View Details</Link> {/* Changed from scheme.id to scheme._id */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchemeCatalogPage;
