import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <section className="welcome-section">
        <h2>Welcome to the Military Welfare Portal</h2>
        <p>Your comprehensive resource for welfare schemes, community support, and essential information for serving personnel, ex-servicemen, widows, and their families.</p>
        <div className="cta-buttons">
          <a href="/welfare-schemes" className="cta-button primary">Explore Schemes</a>
          <a href="/marketplace" className="cta-button secondary">Browse Marketplace</a>
        </div>
      </section>

      <section className="quick-links-section">
        <h3>Quick Links</h3>
        <div className="quick-links-grid">
          <a href="/circulars" className="quick-link-card">
            <h4>OM & Circulars</h4>
            <p>Latest official notifications and policies.</p>
          </a>
          <a href="/grievances" className="quick-link-card">
            <h4>Public Grievances</h4>
            <p>Submit and track your grievances.</p>
          </a>
          <a href="/pension" className="quick-link-card">
            <h4>Pension Information</h4>
            <p>Rules, calculators, and updates.</p>
          </a>
          <a href="/about" className="quick-link-card">
            <h4>About Us</h4>
            <p>Learn about our mission and vision.</p>
          </a>
        </div>
      </section>

      <section className="announcement-section">
        <h3>Important Announcements</h3>
        <div className="announcement-list">
          <div className="announcement-item">
            <span className="announcement-date">01 June 2025</span>
            <p>New guidelines for medical reimbursement under ECHS have been issued. <a href="/circulars">View Circulars</a></p>
          </div>
          <div className="announcement-item">
            <span className="announcement-date">15 May 2025</span>
            <p>Online application window for PMSS 2025-26 now open. <a href="/welfare-schemes/catalog">Apply Now</a></p>
          </div>
          <div className="announcement-item">
            <span className="announcement-date">01 May 2025</span>
            <p>Resource Sharing Marketplace now live! Offer or find resources. <a href="/marketplace">Visit Marketplace</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;