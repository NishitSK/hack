import React from 'react';
import './Header.css';
import militaryLogo from '../images/military-logo.jpg';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content-wrapper">
        <div className="logo-section">
          <img src="/images/military-logo.jpg"  alt="Military Welfare Portal Logo" className="app-logo" />
          <div className="site-title">
            <h1>Military Welfare Portal</h1>
            <p>Empowering Our Heroes and Their Families</p>
          </div>
        </div>
        <div className="user-auth-section">
          <button className="auth-button login-button">Login</button>
          <button className="auth-button register-button">Register</button>
        </div>
      </div>
    </header>
  );
};

export default Header;