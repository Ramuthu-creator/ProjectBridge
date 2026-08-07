import React from 'react';

const ProjectDetails = ({ project, onClose, isSaved, onToggleSave }) => {
  if (!project) return null;

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
              <button className="inv-btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                Request meeting
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

            <h3 className="inv-section-title">Target market</h3>
            <p className="inv-detail-text">
              This solution is primarily targeted at the {project.industrySector} industry, specifically addressing inefficiencies and improving access for target demographics. 
              The technology stack utilizes {project.technologyStack?.join(', ') || 'modern tools'} to ensure scalability and robust performance across different regions.
            </p>

            <h3 className="inv-section-title">Pitch video</h3>
            <div className="inv-video-placeholder">
              <div className="inv-video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '4px' }}>
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column / Side Panel */}
          <div>
            <div className="inv-side-panel" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <h3 className="inv-section-title" style={{ color: '#34d399' }}>Project Stage</h3>
              <div className="inv-metric" style={{ marginBottom: 0 }}>
                <div className="inv-metric-value" style={{ color: '#10b981' }}>{project.projectReadinessLevel}</div>
                <div className="inv-metric-label" style={{ color: '#6ee7b7' }}>Currently looking for seed investment</div>
              </div>
            </div>

            <div className="inv-side-panel">
              <h3 className="inv-section-title">Financials</h3>
              <div className="inv-metric">
                <div className="inv-metric-label">Funding sought</div>
                <div className="inv-metric-value">$250,000</div>
              </div>
              <div className="inv-metric">
                <div className="inv-metric-label">Valuation cap</div>
                <div className="inv-metric-value">$2,000,000</div>
              </div>
              <div className="inv-metric" style={{ marginBottom: 0 }}>
                <div className="inv-metric-label">Equity offered</div>
                <div className="inv-metric-value">12.5%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
