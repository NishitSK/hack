import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ResourceCatalogPage.css'; // Ensure your CSS is imported

function ResourceCatalogPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    searchTerm: '',
  });

  // Function to fetch resources from the backend
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (filters.category !== 'All') {
        queryParams.append('category', filters.category);
      }
      if (filters.searchTerm) {
        queryParams.append('search', filters.searchTerm); // Assuming backend can search by 'search' param
      }

      const response = await fetch(`http://localhost:5000/api/resources?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResources(data);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setError('Failed to fetch resources. Please ensure the backend is running and accessible.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch resources on component mount and when filters change
  useEffect(() => {
    fetchResources();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p className="loading-message">Loading resources...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="page-section">
      <h2>Resource Catalog</h2>
      <p>Find books, equipment, housing, and other resources shared by the military community.</p>

      {/* Removed: Add New Resource Button */}

      <div className="resource-filters">
        <div className="form-group">
          <label htmlFor="filterCategory">Filter by Category:</label>
          <select id="filterCategory" name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="All">All Categories</option>
            <option value="Books">Books</option>
            <option value="Equipment">Equipment</option>
            <option value="Services">Services</option>
            <option value="Housing">Housing</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filterSearch">Search:</label>
          <input
            type="text"
            id="filterSearch"
            name="searchTerm"
            placeholder="Search by title, description, location..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {!loading && !error && resources.length === 0 && (
        <p className="no-results">No resources found matching your criteria.</p>
      )}

      <div className="resource-list-grid">
        {resources.map(resource => (
          <div key={resource._id} className="resource-item-card">
            <h3>{resource.title}</h3>
            <p className="resource-category">Category: {resource.category}</p>
            <p className="resource-location">Location: {resource.location}</p>
            <p>{resource.description.substring(0, 100)}...</p>
            {resource.price > 0 && <p className="resource-price">Price: ₹{resource.price}</p>}
            <Link to={`/marketplace/catalog/${resource._id}`} className="view-resource-button">View Details</Link>
          </div>
        ))}
      </div>

      {/* Removed: Add Resource Form Modal (Portal) */}
    </div>
  );
}

export default ResourceCatalogPage;