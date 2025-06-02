import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceMarketplaceHub.css';

const ResourceMarketplaceHub = () => {
  return (
    <div className="page-section">
      <h2>Resource Sharing Marketplace</h2>
      <p>Connect with other military personnel and ex-servicemen to share and find resources like books, equipment, and housing opportunities.</p>

      <div className="features-grid">
        <Link to="/marketplace/catalog" className="feature-card">
          <h3>Browse Resources</h3>
          <p>Explore items available for sharing or exchange.</p>
        </Link>
        <Link to="/marketplace/post-resource" className="feature-card">
          <h3>Post a Resource</h3>
          <p>Offer your books, equipment, or housing to the community.</p>
        </Link>
        <div className="feature-card disabled-card">
          <h3>My Listings</h3>
          <p>Manage your posted resources and messages. (Login Required)</p>
        </div>
        <div className="feature-card disabled-card">
          <h3>Direct Messaging</h3>
          <p>Communicate securely with other users. (Login Required)</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceMarketplaceHub;