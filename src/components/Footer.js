import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content-wrapper">
        <div className="footer-section about-us-footer">
          <h4>About Us</h4>
          <p>The Military Welfare Portal is dedicated to supporting the armed forces community through accessible information and services.</p>
        </div>
        <div className="footer-section quick-links-footer">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/welfare-schemes">Welfare Schemes</a></li>
            <li><a href="/marketplace">Resource Marketplace</a></li>
            <li><a href="/circulars">OM & Circulars</a></li>
            <li><a href="/grievances">Public Grievances</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info-footer">
          <h4>Contact Info</h4>
          <p>Email: <a href="mailto:info@militarywelfare.gov.in">info@militarywelfare.gov.in</a></p>
          <p>Phone: +91-11-XXXX XXXX</p>
          <p>Address: Thumbe, Karnataka, India</p>
        </div>
        <div className="footer-section social-media-footer">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><img src="https://via.placeholder.com/30x30?text=F" alt="Facebook" /></a>
            <a href="#" aria-label="Twitter"><img src="https://via.placeholder.com/30x30?text=T" alt="Twitter" /></a>
            <a href="#" aria-label="LinkedIn"><img src="https://via.placeholder.com/30x30?text=L" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Military Welfare Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;