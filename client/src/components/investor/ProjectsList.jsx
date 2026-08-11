import React, { useState } from 'react';

const ProjectsList = ({ projects, isLoading, onApplyFilters, onViewDetails, savedProjectIds, onToggleSave }) => {
  const [filters, setFilters] = useState({
    industrySector: [],
    projectReadinessLevel: []
  });
  
  const [openDropdown, setOpenDropdown] = useState(null); // 'status', 'industry'

  const STATUS_OPTIONS = ['Idea', 'Prototype', 'MVP', 'Completed'];
  const INDUSTRY_OPTIONS = ['Healthcare', 'Fintech', 'EdTech', 'AI / Machine Learning'];

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category];
      const isSelected = currentList.includes(value);
      
      const newList = isSelected 
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
        
      const newFilters = { ...prev, [category]: newList };
      
      // Update parent API
      const apiFilters = {
        industrySector: newFilters.industrySector.join(','),
        projectReadinessLevel: newFilters.projectReadinessLevel.join(',')
      };
      
      onApplyFilters(apiFilters);
      return newFilters;
    });
  };

  const removeFilter = (category, value) => {
    handleCheckboxChange(category, value);
  };

  const clearAllFilters = () => {
    const empty = { industrySector: [], projectReadinessLevel: [] };
    setFilters(empty);
    onApplyFilters({ industrySector: '', projectReadinessLevel: '' });
  };

  const hasActiveFilters = filters.industrySector.length > 0 || filters.projectReadinessLevel.length > 0;

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
    <div className="inv-list-layout" onClick={() => setOpenDropdown(null)}>
      {/* Filter Row */}
      <div>
        <div className="filter-dropdown-row">
          <div className="dropdown-container" onClick={e => e.stopPropagation()}>
            <button 
              className={`dropdown-button ${filters.projectReadinessLevel.length > 0 ? 'active' : ''}`}
              onClick={() => toggleDropdown('status')}
            >
              Status {filters.projectReadinessLevel.length > 0 && `(${filters.projectReadinessLevel.length})`}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {openDropdown === 'status' && (
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
              onClick={() => toggleDropdown('industry')}
            >
              Industry {filters.industrySector.length > 0 && `(${filters.industrySector.length})`}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {openDropdown === 'industry' && (
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

      {/* Projects List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{projects.length} results for your matching</h2>
        </div>

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
          <div className="inv-projects-list-container">
            {projects.map((project, index) => (
              <div key={project._id} className="inv-list-item">
                <div className={`inv-project-icon-box ${getIconColorClass(index)}`} style={{ marginBottom: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {project.title ? project.title.charAt(0).toUpperCase() : 'P'}
                </div>
                
                <div className="inv-list-item-content">
                  <div className="inv-list-item-header">
                    <h4>{project.title}</h4>
                    <span className={`inv-tag ${getStatusColorClass(project.projectReadinessLevel)}`}>
                      {project.projectReadinessLevel}
                    </span>
                  </div>
                  <p>{project.description?.substring(0, 120)}...</p>
                </div>
                
                <div className="inv-list-item-actions">
                  <button 
                    className="inv-btn-outline" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', padding: 0, ...(savedProjectIds.has(project._id) ? { background: 'rgba(99, 102, 241, 0.2)', borderColor: '#6366f1', color: 'white' } : {}) }}
                    onClick={() => onToggleSave(project._id)}
                    title={savedProjectIds.has(project._id) ? 'Unsave' : 'Save'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={savedProjectIds.has(project._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  </button>
                  <button className="inv-btn-primary" onClick={() => onViewDetails(project)}>
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
