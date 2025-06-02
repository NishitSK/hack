import React, { useState } from 'react';
import './GrievancesPage.css';

const GrievancesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'
  const [trackingId, setTrackingId] = useState('');
  const [trackInputId, setTrackInputId] = useState('');
  const [trackedGrievance, setTrackedGrievance] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState(null); // 'loading', 'found', 'not-found'

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setTrackingId('');

    // In a real application:
    // 1. Create FormData object for file upload
    // 2. Send to backend API
    // 3. Handle response to get a real tracking ID

    console.log('Submitting grievance:', formData);

    setTimeout(() => {
      const generatedId = `GRIEV${Date.now().toString().slice(-6)}`;
      setTrackingId(generatedId);
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', attachment: null });
    }, 2000);
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setTrackingStatus('loading');
    setTrackedGrievance(null);

    // In a real application:
    // Fetch grievance status from backend using trackInputId

    console.log('Tracking grievance ID:', trackInputId);

    setTimeout(() => {
      if (trackInputId === 'GRIEV123456') {
        setTrackedGrievance({
          id: 'GRIEV123456',
          subject: 'Issue with Pension Disbursal',
          status: 'Under Review',
          submittedDate: '2025-05-20',
          lastUpdate: '2025-05-28',
          remarks: 'Case assigned to Pension Department. Expected resolution within 10 working days.'
        });
        setTrackingStatus('found');
      } else if (trackInputId === 'GRIEV789012') {
        setTrackedGrievance({
          id: 'GRIEV789012',
          subject: 'ECHS Smart Card Renewal Delay',
          status: 'Resolved',
          submittedDate: '2025-04-01',
          lastUpdate: '2025-04-15',
          remarks: 'New ECHS card dispatched. Tracking number: EXCH3456789. Please check your registered address.'
        });
        setTrackingStatus('found');
      } else {
        setTrackingStatus('not-found');
      }
    }, 1500);
  };

  return (
    <div className="page-section grievances-page">
      <h2>Public Grievances</h2>
      <p>Submit your grievances related to welfare schemes, services, or any other issues. You can also track the status of your submitted grievances.</p>

      <div className="grievance-sections-container">
        <section className="grievance-form-section">
          <h3>Submit New Grievance</h3>
          <form onSubmit={handleFormSubmit} className="grievance-form">
            {submissionStatus === 'submitting' && <div className="alert info">Submitting your grievance...</div>}
            {submissionStatus === 'success' && (
              <div className="alert success">
                Grievance submitted successfully! Your tracking ID is: <strong>{trackingId}</strong>. Please note this ID for future reference.
              </div>
            )}
            {submissionStatus === 'error' && <div className="alert error">Failed to submit grievance. Please try again.</div>}

            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} rows="6" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="attachment">Attach Supporting Document (PDF/Image):</label>
              <input type="file" id="attachment" name="attachment" onChange={handleFormChange} accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <button type="submit" className="submit-grievance-button" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </form>
        </section>

        <section className="grievance-tracking-section">
          <h3>Track Grievance Status</h3>
          <form onSubmit={handleTrackSubmit} className="tracking-form">
            <div className="form-group">
              <label htmlFor="trackId">Enter Grievance ID:</label>
              <input
                type="text"
                id="trackId"
                value={trackInputId}
                onChange={(e) => setTrackInputId(e.target.value)}
                placeholder="e.g., GRIEV123456"
                required
              />
            </div>
            <button type="submit" className="track-status-button" disabled={trackingStatus === 'loading'}>
              {trackingStatus === 'loading' ? 'Tracking...' : 'Track Status'}
            </button>
          </form>

          {trackingStatus === 'loading' && <div className="loading-message">Loading status...</div>}
          {trackingStatus === 'not-found' && (
            <div className="alert warning">Grievance ID not found. Please check and try again.</div>
          )}
          {trackingStatus === 'found' && trackedGrievance && (
            <div className="tracked-grievance-details">
              <h4>Grievance ID: {trackedGrievance.id}</h4>
              <p><strong>Subject:</strong> {trackedGrievance.subject}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${trackedGrievance.status.toLowerCase().replace(/\s/g, '-')}`}>{trackedGrievance.status}</span></p>
              <p><strong>Submitted On:</strong> {trackedGrievance.submittedDate}</p>
              <p><strong>Last Update:</strong> {trackedGrievance.lastUpdate}</p>
              <p><strong>Remarks:</strong> {trackedGrievance.remarks}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GrievancesPage;