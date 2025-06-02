import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content-wrapper">
        <div className="logo-section">
          {/* You can replace this with an actual image logo */}
          <img src="https://via.placeholder.com/60x60?text=LOGO" alt="Military Welfare Portal Logo" className="app-logo" />
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