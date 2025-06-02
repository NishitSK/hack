import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ResourceCatalogPage.css';

const ResourceCatalogPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ type: 'All', search: '' });

  useEffect(() => {
    // Fetch resources from backend with filters
    // fetch(`/api/resources?type=${filters.type}&search=${filters.search}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setResources(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError('Failed to fetch resources.');
    //     setLoading(false);
    //   });

    // Mock data for demonstration
    const mockResources = [
      { id: 'b001', type: 'Book', title: 'Guide to Post-Service Opportunities', condition: 'Good', description: 'Comprehensive guide for ex-servicemen.', location: 'Bengaluru', contact: 'user1' },
      { id: 'e001', type: 'Equipment', title: 'Medical First Aid Kit', condition: 'New', description: 'Unopened medical kit for home use.', location: 'Mysuru', contact: 'user2' },
      { id: 'h001', type: 'Housing', title: '2BHK Apartment for Rent (Concessional)', condition: 'Excellent', description: 'Near military hospital, ideal for veteran families.', location: 'Mangaluru', contact: 'user3' },
      { id: 'b002', type: 'Book', title: 'Indian Military History: 1947-2020', condition: 'Fair', description: 'Old edition, but valuable insights.', location: 'Hubballi', contact: 'user4' },
    ];

    const filteredResources = mockResources.filter(resource => {
      const matchesType = filters.type === 'All' || resource.type === filters.type;
      const matchesSearch = resource.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                            resource.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                            resource.location.toLowerCase().includes(filters.search.toLowerCase());
      return matchesType && matchesSearch;
    });

    setResources(filteredResources);
    setLoading(false);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="loading-message">Loading resources...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-section">
      <h2>Resource Catalog</h2>
      <p>Find books, equipment, housing, and other resources shared by the military community.</p>

      <div className="resource-filters">
        <div className="form-group">
          <label htmlFor="resourceType">Filter by Type:</label>
          <select id="resourceType" name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="All">All Types</option>
            <option value="Book">Books</option>
            <option value="Equipment">Equipment</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="resourceSearch">Search:</label>
          <input
            type="text"
            id="resourceSearch"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by title, description, location..."
          />
        </div>
      </div>

      <div className="resource-list-grid">
        {resources.map(resource => (
          <div key={resource.id} className="resource-item-card">
            <h3>{resource.title}</h3>
            <p className="resource-type">Type: {resource.type}</p>
            <p className="resource-condition">Condition: {resource.condition}</p>
            <p className="resource-location">Location: {resource.location}</p>
            <p>{resource.description.substring(0, 100)}...</p>
            <Link to={`/marketplace/catalog/${resource.id}`} className="view-resource-button">View Details</Link>
          </div>
        ))}
        {resources.length === 0 && <p className="no-results">No resources found matching your criteria.</p>}
      </div>
    </div>
  );
};

export default ResourceCatalogPage;