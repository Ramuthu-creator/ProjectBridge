import React, { useState } from 'react';
import './student.css';

const DashboardOverview = ({ projects, onNewProject, onDeleteProject, onViewIpProof }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null); // for project actions
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null); // 'status', 'industry'
  
  const [filters, setFilters] = useState({
    industrySector: [],
    projectReadinessLevel: []
  });

  const STATUS_OPTIONS = ['Idea', 'Prototype', 'MVP', 'Completed'];
  const INDUSTRY_OPTIONS = ['Healthcare', 'Fintech', 'EdTech', 'AI / Machine Learning'];

  const securedProjects = projects.filter(p => p.sha256Hash).length;
  const pendingMatches = 0; // Placeholder for matches logic

  const toggleActionDropdown = (e, id) => {
    e.stopPropagation();
    setOpenDropdownId(prev => prev === id ? null : id);
  };

  const toggleFilterDropdown = (dropdown) => {
    setOpenFilterDropdown(openFilterDropdown === dropdown ? null : dropdown);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category];
      const isSelected = currentList.includes(value);
      
      const newList = isSelected 
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
        
      return { ...prev, [category]: newList };
    });
  };

  const removeFilter = (category, value) => {
    handleCheckboxChange(category, value);
  };

  const clearAllFilters = () => {
    setFilters({ industrySector: [], projectReadinessLevel: [] });
  };

  const hasActiveFilters = filters.industrySector.length > 0 || filters.projectReadinessLevel.length > 0;

  // Client-side filtering logic
  const filteredProjects = projects.filter(project => {
    if (filters.projectReadinessLevel.length > 0 && !filters.projectReadinessLevel.includes(project.projectReadinessLevel)) {
      return false;
    }
    if (filters.industrySector.length > 0 && !filters.industrySector.includes(project.industrySector)) {
      return false;
    }
    return true;
  });

  return (
    <div className="dashboard-overview" onClick={() => { setOpenFilterDropdown(null); setOpenDropdownId(null); }}>
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
      </div>
      
      {/* Filter Row */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="filter-dropdown-row">
          <div className="dropdown-container" onClick={e => e.stopPropagation()}>
            <button 
              className={`dropdown-button ${filters.projectReadinessLevel.length > 0 ? 'active' : ''}`}
              onClick={() => toggleFilterDropdown('status')}
            >
              Status {filters.projectReadinessLevel.length > 0 && `(${filters.projectReadinessLevel.length})`}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {openFilterDropdown === 'status' && (
              <div className="dropdown-popover">
                {STATUS_OPTIONS.map(status => (
                  <label key={status} className="dropdown-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={filters.projectReadinessLevel.includes(status)}
                      onChange={() => handleCheckboxChange('projectReadinessLevel', status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown-container" onClick={e => e.stopPropagation()}>
            <button 
              className={`dropdown-button ${filters.industrySector.length > 0 ? 'active' : ''}`}
              onClick={() => toggleFilterDropdown('industry')}
            >
              Industry {filters.industrySector.length > 0 && `(${filters.industrySector.length})`}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {openFilterDropdown === 'industry' && (
              <div className="dropdown-popover">
                {INDUSTRY_OPTIONS.map(industry => (
                  <label key={industry} className="dropdown-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={filters.industrySector.includes(industry)}
                      onChange={() => handleCheckboxChange('industrySector', industry)}
                    />
                    {industry}
                  </label>
                ))}
              </div>
            )}
          </div>
          
          <div className="dropdown-container" style={{ marginLeft: 'auto' }}>
             <button className="dropdown-button" style={{ border: 'none', background: 'transparent' }}>
              Sort: Top Matches
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          {hasActiveFilters && (
            <button className="clear-all-btn" onClick={clearAllFilters}>
              Clear all
            </button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="filter-chip-container">
            {filters.projectReadinessLevel.map(status => (
              <div key={`chip-status-${status}`} className="filter-chip">
                {status}
                <button onClick={() => removeFilter('projectReadinessLevel', status)}>✕</button>
              </div>
            ))}
            {filters.industrySector.map(industry => (
              <div key={`chip-industry-${industry}`} className="filter-chip">
                {industry}
                <button onClick={() => removeFilter('industrySector', industry)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="projects-list">
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
            <h3 className="text-mid" style={{ color: 'white', marginBottom: '0.5rem' }}>No projects found</h3>
            <p style={{ color: 'var(--text-muted)' }}>{projects.length === 0 ? "Submit your first project to secure your intellectual property." : "Try adjusting your search or filters."}</p>
          </div>
        ) : (
          filteredProjects.map(proj => (
            <div className="project-list-card" key={proj._id}>
              <div className="project-list-card-info">
                <h4>{proj.title}</h4>
                <p>Uploaded: {new Date(proj.uploadTimestamp).toLocaleDateString()}</p>
              </div>
              <div className="project-list-card-actions" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span className={`project-status ${proj.sha256Hash ? 'status-secured' : 'status-pending'}`}>
                  {proj.sha256Hash ? 'Secured IP' : 'Pending'}
                </span>
                <button 
                  className="btn-ghost" 
                  style={{ marginLeft: '1rem', padding: '0.5rem', color: 'var(--text-muted, #9ca3af)', cursor: 'pointer', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}
                  onClick={(e) => toggleActionDropdown(e, proj._id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {openDropdownId === proj._id && (
                  <div className="dropdown-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '0.5rem',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    zIndex: 10,
                    minWidth: '150px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}>
                    <button 
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                      onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                      onClick={() => { setOpenDropdownId(null); onViewIpProof(proj); }}
                    >
                      View IP Proof
                    </button>
                    <button 
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '4px' }}
                      onMouseEnter={e => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                      onClick={() => { 
                        setOpenDropdownId(null); 
                        if (window.confirm('Are you sure you want to delete this project?')) {
                          onDeleteProject(proj._id); 
                        }
                      }}
                    >
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
