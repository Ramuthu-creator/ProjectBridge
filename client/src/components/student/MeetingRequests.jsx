import React, { useState, useEffect } from 'react';
import { getStudentMeetings, updateMeetingStatus } from '../../services/api';
import './student.css';

const MeetingRequests = () => {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const data = await getStudentMeetings(token);
      setMeetings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('Failed to load meeting requests.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (meetingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await updateMeetingStatus(meetingId, status, token);
      
      // Update local state to reflect the new status
      setMeetings(prev => prev.map(m => 
        m._id === meetingId ? { ...m, status } : m
      ));
    } catch (err) {
      alert(`Error updating meeting: ${err.message}`);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '500' }}>Pending</span>;
      case 'Accepted':
        return <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '500' }}>Accepted</span>;
      case 'Declined':
        return <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '500' }}>Declined</span>;
      default:
        return null;
    }
  };

  if (isLoading) return <div style={{ padding: '2rem', color: '#9ca3af' }}>Loading meeting requests...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#f87171' }}>{error}</div>;

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div className="projects-section-header">
        <h2>Meeting Requests</h2>
      </div>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        Investors who are interested in your projects can request to meet with you. Review and respond to them below.
      </p>

      {meetings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }}>
             <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
             <line x1="16" y1="2" x2="16" y2="6"></line>
             <line x1="8" y1="2" x2="8" y2="6"></line>
             <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3 className="text-mid" style={{ color: 'white', marginBottom: '0.5rem' }}>No meeting requests yet</h3>
          <p style={{ color: 'var(--text-muted)' }}>When an investor requests a meeting, it will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {meetings.map((meeting) => (
            <div key={meeting._id} style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px', 
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: 'white', fontSize: '1.15rem', fontWeight: '600', margin: 0 }}>
                    {meeting.investorId?.name || 'Unknown Investor'} 
                  </h3>
                  {getStatusBadge(meeting.status)}
                </div>
                
                {meeting.investorId?.companyName && (
                  <p style={{ color: '#9ca3af', margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>
                    <strong>Company:</strong> {meeting.investorId.companyName}
                  </p>
                )}
                
                <p style={{ color: '#9ca3af', margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>
                  <strong>Project:</strong> {meeting.projectId?.title || 'Unknown Project'}
                </p>

                {meeting.status === 'Accepted' && meeting.investorId?.email && (
                  <p style={{ color: '#818cf8', margin: '0', fontSize: '0.95rem' }}>
                    <strong>Contact Email:</strong> {meeting.investorId.email}
                  </p>
                )}
                
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '1rem', margin: 0 }}>
                  Requested on {new Date(meeting.createdAt).toLocaleDateString()}
                </p>
              </div>

              {meeting.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(16, 185, 129, 0.2)'; e.target.style.borderColor = 'rgba(16, 185, 129, 0.4)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(16, 185, 129, 0.1)'; e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)'; }}
                    onClick={() => handleUpdateStatus(meeting._id, 'Accepted')}
                  >
                    Accept
                  </button>
                  <button 
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(239, 68, 68, 0.2)'; e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(239, 68, 68, 0.1)'; e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}
                    onClick={() => handleUpdateStatus(meeting._id, 'Declined')}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingRequests;
