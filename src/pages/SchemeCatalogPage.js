import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SchemeCatalogPage.css';

const SchemeCatalogPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch this from a backend API
    // fetch('/api/schemes')
    //   .then(response => response.json())
    //   .then(data => {
    //     setSchemes(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError('Failed to fetch schemes.');
    //     setLoading(false);
    //   });

    // Mock data for demonstration
    const mockSchemes = [
      { id: 'pmss', name: 'Prime Minister\'s Scholarship Scheme (PMSS)', description: 'Financial assistance for higher education to wards of Ex-servicemen.', category: 'Education' },
      { id: 'echs', name: 'Ex-Servicemen Contributory Health Scheme (ECHS)', description: 'Healthcare facilities for Ex-servicemen and their dependents.', category: 'Healthcare' },
      { id: 'afbcwf', name: 'Armed Forces Battle Casualties Welfare Fund (AFBCWF)', description: 'Financial aid to next of kin of battle casualties.', category: 'Financial' },
      { id: 'dgr-resettlement', name: 'DGR Resettlement & Training', description: 'Vocational training and placement assistance for retiring personnel.', category: 'Resettlement' },
      { id: 'housing-subsidy', name: 'Housing Loan Subsidy', description: 'Subsidies on home loans for eligible Ex-servicemen.', category: 'Housing' },
    ];
    setSchemes(mockSchemes);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading-message">Loading schemes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-section">
      <h2>Scheme Catalog</h2>
      <p>Browse through the various welfare schemes. Click on a scheme to view detailed information, eligibility criteria, and application process.</p>

      <div className="scheme-list-grid">
        {schemes.map(scheme => (
          <div key={scheme.id} className="scheme-item-card">
            <h3>{scheme.name}</h3>
            <p className="scheme-category">Category: {scheme.category}</p>
            <p>{scheme.description.substring(0, 100)}...</p>
            <Link to={`/welfare-schemes/catalog/${scheme.id}`} className="view-details-button">View Details</Link>
          </div>
        ))}
        {schemes.length === 0 && <p className="no-results">No schemes found.</p>}
      </div>
    </div>
  );
};

export default SchemeCatalogPage;