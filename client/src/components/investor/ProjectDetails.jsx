import React, { useState } from 'react';
import { requestMeeting } from '../../services/api';

const ProjectDetails = ({ project, onClose, isSaved, onToggleSave }) => {
  const [meetingRequested, setMeetingRequested] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  if (!project) return null;

  const handleRequestMeeting = async () => {
    try {
      setIsRequesting(true);
      const token = localStorage.getItem('token');
      await requestMeeting(project._id, token);
      setMeetingRequested(true);
      alert('Meeting requested successfully!');
    } catch (error) {
      console.error('Error requesting meeting:', error);
      alert(error.message || 'Failed to request meeting');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="inv-detail-overlay" onClick={onClose}>
      <div className="inv-detail-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header Section */}
        <div className="inv-detail-header">
          <button className="inv-detail-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="inv-detail-icon-large">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </div>
          
          <div className="inv-detail-title-row">
            <div>
              <h2>{project.title}</h2>
              <p>by {project.studentId?.name || 'Anonymous Student'} &bull; {project.industrySector}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="inv-btn-outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '1rem', ...(isSaved ? { background: 'rgba(99, 102, 241, 0.2)', borderColor: '#6366f1', color: 'white' } : {}) }}
                onClick={() => onToggleSave(project._id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button 
                className="inv-btn-primary" 
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  fontSize: '1rem',
                  opacity: (meetingRequested || isRequesting) ? 0.7 : 1,
                  cursor: (meetingRequested || isRequesting) ? 'not-allowed' : 'pointer'
                }}
                onClick={handleRequestMeeting}
                disabled={meetingRequested || isRequesting}
              >
                {isRequesting ? 'Requesting...' : meetingRequested ? 'Meeting Requested' : 'Request meeting'}
              </button>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="inv-detail-body">
          
          {/* Main Column */}
          <div>
            <h3 className="inv-section-title">About the project</h3>
            <p className="inv-detail-text">
              {project.description}
            </p>

            <h3 className="inv-section-title">Pitch video</h3>
            {project.demoVideoUrl ? (
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#000' }}>
                <video 
                  controls 
                  src={project.demoVideoUrl.startsWith('http') ? project.demoVideoUrl : `${import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:5001')}${project.demoVideoUrl}`} 
                  style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'contain' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="inv-video-placeholder" style={{ opacity: 0.5 }}>
                <p style={{ marginTop: '0', textAlign: 'center', color: '#9ca3af' }}>No pitch video provided.</p>
              </div>
            )}
          </div>

          {/* Right Column / Side Panel */}
          <div>
            <div className="inv-side-panel" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <h3 className="inv-section-title" style={{ color: '#34d399' }}>Project Stage</h3>
              <div className="inv-metric" style={{ marginBottom: 0 }}>
                <div className="inv-metric-value" style={{ color: '#10b981' }}>{project.projectReadinessLevel}</div>
              </div>
            </div>

            {project.technologyStack && project.technologyStack.length > 0 && (
              <div className="inv-side-panel" style={{ marginBottom: '1.5rem' }}>
                <h3 className="inv-section-title">Technology Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.technologyStack.map((tech, index) => (
                    <span key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem', color: '#d1d5db', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.studentId && (
               <div className="inv-side-panel">
                <h3 className="inv-section-title">Student Info</h3>
                {project.studentId.university && (
                  <div className="inv-metric">
                    <div className="inv-metric-label">University</div>
                    <div className="inv-metric-value" style={{ fontSize: '1rem', color: 'white' }}>{project.studentId.university}</div>
                  </div>
                )}
                {project.studentId.degreeProgram && (
                  <div className="inv-metric">
                    <div className="inv-metric-label">Degree Program</div>
                    <div className="inv-metric-value" style={{ fontSize: '1rem', color: 'white' }}>{project.studentId.degreeProgram}</div>
                  </div>
                )}
                {project.studentId.graduationYear && (
                  <div className="inv-metric" style={{ marginBottom: 0 }}>
                    <div className="inv-metric-label">Graduation Year</div>
                    <div className="inv-metric-value" style={{ fontSize: '1rem', color: 'white' }}>{project.studentId.graduationYear}</div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
