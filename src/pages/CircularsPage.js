import React, { useState, useEffect } from 'react';
import './CircularsPage.css';

const CircularsPage = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterYear, setFilterYear] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const availableYears = ['All', '2025', '2024', '2023', '2022'];
  const availableCategories = ['All', 'Pension', 'Medical', 'Education', 'Resettlement', 'General'];

  useEffect(() => {
    const mockCirculars = [
      { id: 1, title: 'Revision of Pension for Pre-2016 Pensioners', date: '2025-04-15', year: '2025', category: 'Pension', file: '/documents/circular_pension_2025.pdf' },
      { id: 2, title: 'Guidelines for ECHS Smart Card Renewal', date: '2025-03-20', year: '2025', category: 'Medical', file: '/documents/circular_echs_2025.pdf' },
      { id: 3, title: 'New Scholarship Scheme for Wards of Battle Casualties', date: '2024-11-01', year: '2024', category: 'Education', file: '/documents/circular_scholarship_2024.pdf' },
      { id: 4, title: 'Updated Policy for Resettlement Training Programs', date: '2024-09-10', year: '2024', category: 'Resettlement', file: '/documents/circular_resettlement_2024.pdf' },
      { id: 5, title: 'Advisory on Online Financial Scams', date: '2023-07-25', year: '2023', category: 'General', file: '/documents/circular_scam_2023.pdf' },
      { id: 6, title: 'Extension of CGHS Benefits to Certain Categories', date: '2023-01-10', year: '2023', category: 'Medical', file: '/documents/circular_cghs_2023.pdf' },
    ];

    const filteredCirculars = mockCirculars.filter(circular => {
      const matchesYear = filterYear === 'All' || circular.year === filterYear;
      const matchesCategory = filterCategory === 'All' || circular.category === filterCategory;
      return matchesYear && matchesCategory;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    setCirculars(filteredCirculars);
    setLoading(false);
  }, [filterYear, filterCategory]);

  if (loading) return <div className="loading-message">Loading circulars...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-section">
      <h2>OM & Circulars</h2>
      <p>Access official memoranda and circulars issued by the Department of Ex-Servicemen Welfare and other relevant authorities.</p>

      <div className="circulars-filters">
        <div className="form-group">
          <label htmlFor="filterYear">Filter by Year:</label>
          <select id="filterYear" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filterCategory">Filter by Category:</label>
          <select id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {availableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="circulars-table-container">
        {circulars.length > 0 ? (
          <table className="circulars-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title / Subject</th>
                <th>Category</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {circulars.map(circular => (
                <tr key={circular.id}>
                  <td data-label="Date">{circular.date}</td>
                  <td data-label="Title / Subject">{circular.title}</td>
                  <td data-label="Category">{circular.category}</td>
                  <td data-label="Download">
                    {circular.file ? (
                      <a href={circular.file} target="_blank" rel="noopener noreferrer" className="download-link">
                        Download PDF &#8594;
                      </a>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No circulars found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CircularsPage;