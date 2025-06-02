import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    about: false,
    pension: false,
  });

  const location = useLocation();

  const mobileMenuToggleRef = useRef(null);
  const mainNavLinksRef = useRef(null);
  const dropdownRefs = {
    about: useRef(null),
    pension: useRef(null),
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen({
      about: false,
      pension: false,
    });
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleDropdown = (dropdownName) => {
    setIsDropdownOpen(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
      [dropdownName]: !prev[dropdownName],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainNavLinksRef.current && !mainNavLinksRef.current.contains(event.target) &&
          mobileMenuToggleRef.current && !mobileMenuToggleRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen({
          about: false,
          pension: false,
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (mobileMenuToggleRef.current) {
          mobileMenuToggleRef.current.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleDropdownKeyDown = (event, dropdownName, isParentLink = false) => {
    const parentLink = dropdownRefs[dropdownName].current;
    const dropdownMenu = parentLink ? parentLink.nextElementSibling : null;

    if (isParentLink) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown(dropdownName);
        if (!isDropdownOpen[dropdownName] && dropdownMenu) {
            const firstMenuItem = dropdownMenu.querySelector('[role="menuitem"]');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }
      }
    } else {
      if (event.key === 'Escape') {
        setIsDropdownOpen(prev => ({ ...prev, [dropdownName]: false }));
        if (parentLink) {
          parentLink.focus();
        }
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (dropdownMenu) {
          const menuItems = Array.from(dropdownMenu.querySelectorAll('[role="menuitem"]'));
          const currentIndex = menuItems.indexOf(document.activeElement);
          let nextIndex = currentIndex;

          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % menuItems.length;
          } else {
            nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
          }
          menuItems[nextIndex].focus();
        }
      }
    }
  };

  return (
    <nav className="main-navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-content-wrapper">
        <button
          className="menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="main-nav-links"
          aria-expanded={isMobileMenuOpen}
          ref={mobileMenuToggleRef}
        >
          {isMobileMenuOpen ? 'X' : '☰'}
        </button>
        <ul
          id="main-nav-links"
          className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}
          ref={mainNavLinksRef}
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <li role="none">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" tabIndex={isMobileMenuOpen ? 0 : -1}>Home</Link>
          </li>
          {/* Welfare Schemes - Now a direct link */}
          <li role="none">
            <Link to="/welfare-schemes" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" tabIndex={isMobileMenuOpen ? 0 : -1}>Welfare Schemes</Link>
          </li>
          {/* Resource Marketplace - Now a direct link */}
          <li role="none">
            <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" tabIndex={isMobileMenuOpen ? 0 : -1}>Resource Marketplace</Link>
          </li>
          <li className="dropdown" role="none">
            <Link
              to="/about"
              role="button"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen.about}
              aria-controls="about-menu"
              onClick={(e) => { e.preventDefault(); toggleDropdown('about'); }}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'about', true)}
              ref={dropdownRefs.about}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              About Us <span className="dropdown-arrow">&#9662;</span>
            </Link>
            <ul
              id="about-menu"
              className={`dropdown-menu ${isDropdownOpen.about ? 'open' : ''}`}
              role="menu"
              aria-labelledby={dropdownRefs.about.current ? dropdownRefs.about.current.id : undefined}
            >
              <li role="none">
                <Link to="/about/mission" onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem" tabIndex={isDropdownOpen.about ? 0 : -1}
                      onKeyDown={(e) => handleDropdownKeyDown(e, 'about')}>Mission</Link>
              </li>
              <li role="none">
                <Link to="/about/vision" onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem" tabIndex={isDropdownOpen.about ? 0 : -1}
                      onKeyDown={(e) => handleDropdownKeyDown(e, 'about')}>Vision</Link>
              </li>
            </ul>
          </li>
          <li className="dropdown" role="none">
            <Link
              to="/pension"
              role="button"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen.pension}
              aria-controls="pension-menu"
              onClick={(e) => { e.preventDefault(); toggleDropdown('pension'); }}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'pension', true)}
              ref={dropdownRefs.pension}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              Pension <span className="dropdown-arrow">&#9662;</span>
            </Link>
            <ul
              id="pension-menu"
              className={`dropdown-menu ${isDropdownOpen.pension ? 'open' : ''}`}
              role="menu"
              aria-labelledby={dropdownRefs.pension.current ? dropdownRefs.pension.current.id : undefined}
            >
              <li role="none">
                <Link to="/pension/rules" onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem" tabIndex={isDropdownOpen.pension ? 0 : -1}
                      onKeyDown={(e) => handleDropdownKeyDown(e, 'pension')}>Pension Rules</Link>
              </li>
              <li role="none">
                <Link to="/pension/calculator" onClick={() => setIsMobileMenuOpen(false)}
                      role="menuitem" tabIndex={isDropdownOpen.pension ? 0 : -1}
                      onKeyDown={(e) => handleDropdownKeyDown(e, 'pension')}>Pension Calculator</Link>
              </li>
            </ul>
          </li>
          <li role="none">
            <Link to="/circulars" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" tabIndex={isMobileMenuOpen ? 0 : -1}>OM & Circulars</Link>
          </li>
          <li role="none">
            <Link to="/grievances" onClick={() => setIsMobileMenuOpen(false)} role="menuitem" tabIndex={isMobileMenuOpen ? 0 : -1}>Public Grievances</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;