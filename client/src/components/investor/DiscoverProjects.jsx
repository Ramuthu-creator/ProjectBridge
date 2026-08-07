import React, { useState } from 'react';

const DiscoverProjects = ({ projects, isLoading, onViewDetails }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const getStatusColorClass = (status) => {
    switch(status) {
      case 'Idea': return 'status-idea';
      case 'Prototype': return 'status-prototype';
      case 'MVP': return 'status-mvp';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const getIconColorClass = (index) => {
    const colors = ['green', 'orange', 'blue', 'pink'];
    return colors[index % colors.length];
  };

  return (
    <div>
      <div className="inv-header-title" style={{ marginBottom: '2rem' }}>
        <h1>Discover relevant projects</h1>
      </div>

      {/* Stats Grid */}
      <div className="inv-stats-grid">
        <div className="inv-stat-card primary">
          <h3>{projects.length}</h3>
          <p>Total projects</p>
        </div>
        <div className="inv-stat-card">
          <h3>15</h3>
          <p>Saved projects</p>
        </div>
        <div className="inv-stat-card">
          <h3>2</h3>
          <p>Projects funded</p>
        </div>
        <div className="inv-stat-card">
          <h3>10</h3>
          <p>New this week</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="inv-filters-bar">
        <span style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '0.5rem' }}>Sort by:</span>
        <button 
          className={`inv-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button 
          className={`inv-filter-btn ${activeFilter === 'Trending' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Trending')}
        >
          Trending
        </button>
        <button 
          className={`inv-filter-btn ${activeFilter === 'Newest' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Newest')}
        >
          Newest
        </button>
        <button className="inv-filter-btn" style={{ marginLeft: 'auto' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <p style={{ color: '#6b7280' }}>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No projects available right now.</p>
      ) : (
        <div className="inv-projects-grid">
          {projects.map((project, index) => (
            <div key={project._id} className="inv-project-card">
              <div className={`inv-project-icon-box ${getIconColorClass(index)}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </div>
              
              <h4>{project.title}</h4>
              <p>{project.description?.substring(0, 80)}...</p>
              
              <div className="inv-project-tags">
                <span className={`inv-tag ${getStatusColorClass(project.projectReadinessLevel)}`}>
                  {project.projectReadinessLevel}
                </span>
                <span className="inv-tag">{project.industrySector}</span>
              </div>
              
              <div className="inv-project-actions">
                <button className="inv-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  Save
                </button>
                <button 
                  className="inv-btn-outline" 
                  style={{ border: 'none', color: '#2563eb' }}
                  onClick={() => onViewDetails(project)}
                >
                  View details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverProjects;
