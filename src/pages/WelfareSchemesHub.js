import React from 'react';
import { Link } from 'react-router-dom';
import './WelfareSchemesHub.css';

const WelfareSchemesHub = () => {
  return (
    <div className="page-section">
      <h2>Welfare Schemes & Benefits</h2>
      <p>Discover and manage various welfare schemes designed for our armed forces personnel, ex-servicemen, widows, and their families.</p>

      <div className="features-grid">
        <Link to="/welfare-schemes/catalog" className="feature-card">
          <h3>Scheme Catalog</h3>
          <p>Browse a comprehensive list of all available welfare schemes.</p>
        </Link>
        <Link to="/welfare-schemes/track-application" className="feature-card">
          <h3>Track Application Status</h3>
          <p>Check the current status of your submitted scheme applications.</p>
        </Link>
        <div className="feature-card disabled-card">
          <h3>Eligibility Checker</h3>
          <p>Find out which schemes you are eligible for. (Coming Soon)</p>
        </div>
        <div className="feature-card disabled-card">
          <h3>Online Application</h3>
          <p>Apply for schemes directly through the portal. (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default WelfareSchemesHub;