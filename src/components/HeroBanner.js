import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h2>"Service to Nation, Support for Life"</h2>
        <p>Dedicated to the welfare of our brave military personnel, ex-servicemen, widows, and their families.</p>
        <div className="hero-cta">
          <a href="/welfare-schemes" className="hero-button primary">Find Schemes</a>
          <a href="/grievances" className="hero-button secondary">Submit Grievance</a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;