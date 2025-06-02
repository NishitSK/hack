import React from 'react';
import './WhatsNew.css';

const WhatsNew = () => {
  const newsItems = [
    { id: 1, date: '2025-06-01', text: 'New guidelines for Ex-servicemen Contributory Health Scheme (ECHS) membership.' },
    { id: 2, date: '2025-05-28', text: 'Launch of the new Resource Sharing Marketplace. Share or find resources today!' },
    { id: 3, date: '2025-05-20', text: 'Online portal for pension grievance submission now active.' },
  ];

  return (
    <aside className="whats-new">
      <h3>What's New?</h3>
      <ul>
        {newsItems.map(item => (
          <li key={item.id}>
            <span className="news-date">{item.date}:</span> {item.text}
          </li>
        ))}
      </ul>
      <a href="/circulars" className="view-all-news">View All Updates &#8594;</a>
    </aside>
  );
};

export default WhatsNew;