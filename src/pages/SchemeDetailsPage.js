import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SchemeDetailsPage.css';

const SchemeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eligibilityCriteria, setEligibilityCriteria] = useState({
    serviceStatus: '', // e.g., 'serving', 'ex-servicemen', 'widow'
    rank: '',
    income: '',
    disability: false
  });
  const [isEligible, setIsEligible] = useState(null);

  useEffect(() => {
    // In a real app, fetch scheme details from backend using `id`
    // fetch(`/api/schemes/${id}`)
    //   .then(response => {
    //     if (!response.ok) throw new Error('Scheme not found');
    //     return response.json();
    //   })
    //   .then(data => {
    //     setScheme(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err.message);
    //     setLoading(false);
    //   });

    // Mock data for demonstration
    const mockSchemes = {
      'pmss': {
        id: 'pmss',
        name: 'Prime Minister\'s Scholarship Scheme (PMSS)',
        description: 'Financial assistance for higher education to wards of Ex-servicemen. Max Rs. 3000/month for girls, Rs. 2500/month for boys. Applicable for professional degrees.',
        category: 'Education',
        eligibility: {
          serviceStatus: ['ex-servicemen', 'widow'],
          rank: ['all'],
          income: '< 6 LPA',
          other: 'Wards undertaking professional degree courses.'
        },
        applicationProcess: 'Online application via KSB portal. Documents required: service certificate, academic records, income certificate, dependent certificate.',
        documents: ['Service Certificate', 'Mark Sheets', 'Income Certificate', 'Dependent Certificate'],
        links: ['https://ksb.gov.in/pmss.htm']
      },
      'echs': {
        id: 'echs',
        name: 'Ex-Servicemen Contributory Health Scheme (ECHS)',
        description: 'Comprehensive healthcare facilities for Ex-servicemen and their dependents, through polyclinics and empanelled hospitals.',
        category: 'Healthcare',
        eligibility: {
          serviceStatus: ['ex-servicemen'],
          rank: ['all'],
          income: 'N/A',
          other: 'Enrollment with contribution based on rank.'
        },
        applicationProcess: 'Online registration and contribution via ECHS portal. Biometrics required.',
        documents: ['PPO', 'Service discharge book', 'Photograph', 'Aadhaar Card'],
        links: ['https://echs.gov.in/']
      },
    };

    if (mockSchemes[id]) {
      setScheme(mockSchemes[id]);
      setLoading(false);
    } else {
      setError('Scheme not found.');
      setLoading(false);
    }
  }, [id]);

  const handleEligibilityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEligibilityCriteria(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setIsEligible(null); // Reset eligibility check on change
  };

  const checkEligibility = () => {
    if (!scheme) {
      setIsEligible(false);
      return;
    }

    let meetsCriteria = true;

    // Service Status check
    if (!scheme.eligibility.serviceStatus.includes('all') &&
        !scheme.eligibility.serviceStatus.includes(eligibilityCriteria.serviceStatus)) {
      meetsCriteria = false;
    }

    // Simple income check (example, would be more complex)
    if (scheme.eligibility.income && eligibilityCriteria.income) {
      const schemeIncomeLimit = parseFloat(scheme.eligibility.income.replace(/[^\d.]/g, ''));
      const userIncome = parseFloat(eligibilityCriteria.income);
      if (scheme.eligibility.income.includes('<') && userIncome >= schemeIncomeLimit) {
        meetsCriteria = false;
      }
      // Add other income comparisons >, <=, >=
    }

    // Add more complex checks for rank, disability etc.

    setIsEligible(meetsCriteria);
  };

  if (loading) return <div className="loading-message">Loading scheme details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!scheme) return <div className="error-message">Scheme data not available.</div>;

  return (
    <div className="page-section scheme-details-page">
      <h2>{scheme.name}</h2>
      <p className="scheme-category-detail">Category: {scheme.category}</p>

      <div className="scheme-detail-section">
        <h3>Description</h3>
        <p>{scheme.description}</p>
      </div>

      <div className="scheme-detail-section">
        <h3>Eligibility Criteria</h3>
        <div className="eligibility-form">
          <div className="form-group">
            <label htmlFor="serviceStatus">Your Service Status:</label>
            <select id="serviceStatus" name="serviceStatus" value={eligibilityCriteria.serviceStatus} onChange={handleEligibilityChange}>
              <option value="">Select...</option>
              <option value="serving">Serving Personnel</option>
              <option value="ex-servicemen">Ex-Servicemen</option>
              <option value="widow">Widow</option>
              <option value="dependent">Dependent</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="income">Annual Income (LPA):</label>
            <input type="number" id="income" name="income" value={eligibilityCriteria.income} onChange={handleEligibilityChange} placeholder="e.g., 5.5" step="0.1" />
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="disability" name="disability" checked={eligibilityCriteria.disability} onChange={handleEligibilityChange} />
            <label htmlFor="disability">Have Disability?</label>
          </div>
          <button onClick={checkEligibility} className="check-eligibility-button">Check Eligibility</button>

          {isEligible !== null && (
            <div className={`eligibility-result ${isEligible ? 'eligible' : 'not-eligible'}`}>
              {isEligible ? (
                <>
                  <p>&#10004; You appear to be eligible for this scheme!</p>
                  <p>Review full criteria below for confirmation.</p>
                </>
              ) : (
                <>
                  <p>&#10008; You might not be eligible for this scheme based on your inputs.</p>
                  <p>Please check the full eligibility criteria and your details carefully.</p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="full-eligibility-text">
          <h4>Full Criteria:</h4>
          <ul>
            {Object.entries(scheme.eligibility).map(([key, value]) => (
              <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {Array.isArray(value) ? value.join(', ') : value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="scheme-detail-section">
        <h3>Application Process</h3>
        <p>{scheme.applicationProcess}</p>
      </div>

      <div className="scheme-detail-section">
        <h3>Required Documents</h3>
        <ul>
          {scheme.documents.map((doc, index) => <li key={index}>{doc}</li>)}
        </ul>
      </div>

      <div className="scheme-detail-section">
        <h3>Useful Links</h3>
        <ul>
          {scheme.links.map((link, index) => <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>)}
        </ul>
      </div>

      <button onClick={() => navigate('/welfare-schemes/catalog')} className="back-button">&#8592; Back to Scheme Catalog</button>
      <button className="apply-now-button">Apply Now (External Link)</button>
    </div>
  );
};

export default SchemeDetailsPage;