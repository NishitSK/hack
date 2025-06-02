import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';

// Import your page components
import HomePage from './pages/HomePage';
import WelfareSchemesHub from './pages/WelfareSchemesHub';
import SchemeCatalogPage from './pages/SchemeCatalogPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import ApplicationTrackingPage from './pages/ApplicationTrackingPage';
import ResourceMarketplaceHub from './pages/ResourceMarketplaceHub';
import ResourceCatalogPage from './pages/ResourceCatalogPage';
import ResourceDetailsPage from './pages/ResourceDetailsPage';
import PostResourcePage from './pages/PostResourcePage';
import GrievancesPage from './pages/GrievancesPage';
import CircularsPage from './pages/CircularsPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <AppNavbar />
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              {/* HomePage will now render HeroBanner and WhatsNew internally */}
              <Route path="/" element={<HomePage />} />

              <Route path="/welfare-schemes" element={<WelfareSchemesHub />} />
              <Route path="/welfare-schemes/catalog" element={<SchemeCatalogPage />} />
              <Route path="/welfare-schemes/catalog/:id" element={<SchemeDetailsPage />} />
              <Route path="/welfare-schemes/track-application" element={<ApplicationTrackingPage />} />

              <Route path="/marketplace" element={<ResourceMarketplaceHub />} />
              <Route path="/marketplace/catalog" element={<ResourceCatalogPage />} />
              <Route path="/marketplace/catalog/:id" element={<ResourceDetailsPage />} />
              <Route path="/marketplace/post-resource" element={<PostResourcePage />} />

              <Route path="/grievances" element={<GrievancesPage />} />
              <Route path="/circulars" element={<CircularsPage />} />

            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;