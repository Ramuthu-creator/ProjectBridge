import React from 'react';
import './student.css';

const DashboardOverview = ({ projects, onNewProject }) => {
  const securedProjects = projects.filter(p => p.sha256Hash).length;
  const pendingMatches = 0; // Placeholder for matches logic

  return (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Projects Uploaded</h3>
            <p>{projects.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Secured IPs</h3>
            <p>{securedProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="stat-info">
            <h3>Pending Matches</h3>
            <p>{pendingMatches}</p>
          </div>
        </div>
      </div>

      <div className="projects-section-header">
        <h2>My Projects</h2>
        <button className="btn-new-project" onClick={onNewProject}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Project
        </button>
      </div>

      <div className="projects-list">
        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted, #9ca3af)', fontStyle: 'italic' }}>No projects uploaded yet.</p>
        ) : (
          projects.map(proj => (
            <div className="project-list-card" key={proj._id}>
              <div className="project-list-card-info">
                <h4>{proj.title}</h4>
                <p>Uploaded: {new Date(proj.uploadTimestamp).toLocaleDateString()}</p>
              </div>
              <div className="project-list-card-actions">
                <span className={`project-status ${proj.sha256Hash ? 'status-secured' : 'status-pending'}`}>
                  {proj.sha256Hash ? 'Secured IP' : 'Pending'}
                </span>
                <button className="btn-ghost" style={{ marginLeft: '1rem', padding: '0.5rem', color: 'var(--text-muted, #9ca3af)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
