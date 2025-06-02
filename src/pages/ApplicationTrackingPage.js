import React, { useState } from 'react';
import './ApplicationTrackingPage.css';

const ApplicationTrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null); // null, 'loading', 'found', 'not-found'
  const [applicationDetails, setApplicationDetails] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    setApplicationStatus('loading');
    setApplicationDetails(null);

    // In a real app, you'd fetch from a backend API
    // const response = await fetch(`/api/applications/${trackingId}`);
    // const data = await response.json();

    setTimeout(() => {
      if (trackingId === 'APP12345') {
        setApplicationStatus('found');
        setApplicationDetails({
          id: 'APP12345',
          scheme: 'Prime Minister\'s Scholarship Scheme (PMSS)',
          status: 'Under Review by KSB',
          submissionDate: '2025-05-10',
          lastUpdate: '2025-05-28',
          remarks: 'Documents verified. Awaiting committee approval.'
        });
      } else if (trackingId === 'APP67890') {
        setApplicationStatus('found');
        setApplicationDetails({
          id: 'APP67890',
          scheme: 'Ex-Servicemen Contributory Health Scheme (ECHS) Enrollment',
          status: 'Approved & Card Dispatched',
          submissionDate: '2025-04-01',
          lastUpdate: '2025-04-20',
          remarks: 'ECHS card has been dispatched via speed post.'
        });
      }
      else {
        setApplicationStatus('not-found');
      }
    }, 1000);
  };

  return (
    <div className="page-section">
      <h2>Track Your Application</h2>
      <p>Enter your unique Application ID to check the current status of your submitted welfare scheme application.</p>

      <form onSubmit={handleTrack} className="tracking-form">
        <div className="form-group">
          <label htmlFor="trackingId">Application ID:</label>
          <input
            type="text"
            id="trackingId"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g., APP12345"
            required
          />
        </div>
        <button type="submit" className="track-submit-button">Track Status</button>
      </form>

      {applicationStatus === 'loading' && <div className="loading-message">Loading status...</div>}
      {applicationStatus === 'not-found' && (
        <div className="status-message not-found">
          Application ID not found. Please check the ID and try again.
        </div>
      )}
      {applicationStatus === 'found' && applicationDetails && (
        <div className="application-details-card">
          <h3>Application Details for ID: {applicationDetails.id}</h3>
          <p><strong>Scheme:</strong> {applicationDetails.scheme}</p>
          <p><strong>Status:</strong> <span className={`status-badge status-${applicationDetails.status.toLowerCase().replace(/\s/g, '-')}`}>{applicationDetails.status}</span></p>
          <p><strong>Submission Date:</strong> {applicationDetails.submissionDate}</p>
          <p><strong>Last Updated:</strong> {applicationDetails.lastUpdate}</p>
          <p><strong>Remarks:</strong> {applicationDetails.remarks}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationTrackingPage;