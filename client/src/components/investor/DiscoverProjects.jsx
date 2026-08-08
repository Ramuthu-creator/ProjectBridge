import React, { useState } from 'react';

const DiscoverProjects = ({ projects, isLoading, onViewDetails, savedProjectIds, onToggleSave }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamic Statistics Calculations
  const totalProjects = projects.length;
  const savedProjectsCount = savedProjectIds ? savedProjectIds.size : 0;
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newThisWeekCount = projects.filter(p => p.uploadTimestamp && new Date(p.uploadTimestamp) >= oneWeekAgo).length;
  
  const activeSectorsCount = new Set(projects.map(p => p.industrySector).filter(Boolean)).size;

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
        <div className="inv-stat-card">
          <div>
            <h3 className="text-mid" style={{ color: 'var(--text-muted)' }}>Total projects</h3>
            <p>{totalProjects}</p>
          </div>
          <div className="inv-project-icon-box blue" style={{ width: '32px', height: '32px', margin: 0, borderRadius: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
        <div className="inv-stat-card">
          <div>
            <h3 className="text-mid" style={{ color: 'var(--text-muted)' }}>Saved projects</h3>
            <p>{savedProjectsCount}</p>
          </div>
          <div className="inv-project-icon-box pink" style={{ width: '32px', height: '32px', margin: 0, borderRadius: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
        <div className="inv-stat-card">
          <div>
            <h3 className="text-mid" style={{ color: 'var(--text-muted)' }}>Active Sectors</h3>
            <p>{activeSectorsCount}</p>
          </div>
          <div className="inv-project-icon-box orange" style={{ width: '32px', height: '32px', margin: 0, borderRadius: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
        </div>
        <div className="inv-stat-card">
          <div>
            <h3 className="text-mid" style={{ color: 'var(--text-muted)' }}>New this week</h3>
            <p>{newThisWeekCount}</p>
          </div>
          <div className="inv-project-icon-box green" style={{ width: '32px', height: '32px', margin: 0, borderRadius: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
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
        <button className="inv-filter-btn" style={{ marginLeft: 'auto', position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <p style={{ color: '#6b7280' }}>Loading projects...</p>
      ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3 className="text-mid" style={{ color: 'white', marginBottom: '0.5rem' }}>No projects found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
          </div>
      ) : (
        <div className="inv-projects-grid">
          {projects.map((project, index) => (
            <div key={project._id} className="inv-project-card">
              <div className={`inv-project-icon-box ${getIconColorClass(index)}`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {project.title ? project.title.charAt(0).toUpperCase() : 'P'}
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
                <button 
                  className="inv-btn-outline" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...(savedProjectIds.has(project._id) ? { background: 'rgba(99, 102, 241, 0.2)', borderColor: '#6366f1', color: 'white' } : {}) }}
                  onClick={() => onToggleSave(project._id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={savedProjectIds.has(project._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  {savedProjectIds.has(project._id) ? 'Saved' : 'Save'}
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
