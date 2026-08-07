import React, { useState } from 'react';

const ProjectsList = ({ projects, isLoading, onApplyFilters, onViewDetails, savedProjectIds, onToggleSave }) => {
  const [filters, setFilters] = useState({
    industrySector: '',
    projectReadinessLevel: ''
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For radio/checkbox simplification in this demo
    if (type === 'radio' && checked) {
      const newFilters = { ...filters, [name]: value };
      setFilters(newFilters);
      onApplyFilters(newFilters);
    }
  };

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
    <div className="inv-list-layout">
      {/* Filters Sidebar */}
      <aside className="inv-filter-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Filters</h3>
          <button 
            style={{ color: '#2563eb', background: 'none', border: 'none', fontSize: '0.85rem', cursor: 'pointer' }}
            onClick={() => { setFilters({ industrySector: '', projectReadinessLevel: '' }); onApplyFilters({}); }}
          >
            Clear all
          </button>
        </div>

        <div className="inv-filter-group">
          <h4>Status</h4>
          <label className="inv-checkbox-label">
            <input type="radio" name="projectReadinessLevel" value="Idea" checked={filters.projectReadinessLevel === 'Idea'} onChange={handleFilterChange} />
            Idea
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="projectReadinessLevel" value="Prototype" checked={filters.projectReadinessLevel === 'Prototype'} onChange={handleFilterChange} />
            Prototype
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="projectReadinessLevel" value="MVP" checked={filters.projectReadinessLevel === 'MVP'} onChange={handleFilterChange} />
            MVP
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="projectReadinessLevel" value="Completed" checked={filters.projectReadinessLevel === 'Completed'} onChange={handleFilterChange} />
            Completed
          </label>
        </div>

        <div className="inv-filter-group">
          <h4>Industry</h4>
          <label className="inv-checkbox-label">
            <input type="radio" name="industrySector" value="Healthcare" checked={filters.industrySector === 'Healthcare'} onChange={handleFilterChange} />
            Healthcare
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="industrySector" value="Fintech" checked={filters.industrySector === 'Fintech'} onChange={handleFilterChange} />
            Fintech
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="industrySector" value="EdTech" checked={filters.industrySector === 'EdTech'} onChange={handleFilterChange} />
            EdTech
          </label>
          <label className="inv-checkbox-label">
            <input type="radio" name="industrySector" value="AI" checked={filters.industrySector === 'AI'} onChange={handleFilterChange} />
            AI / Machine Learning
          </label>
        </div>
      </aside>

      {/* Projects List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{projects.length} results for your matching</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Sort by:</span>
            <select style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}>
              <option>Top Matches</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <p style={{ color: '#6b7280' }}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No projects match these filters.</p>
        ) : (
          <div className="inv-projects-list-container">
            {projects.map((project, index) => (
              <div key={project._id} className="inv-list-item">
                <div className={`inv-project-icon-box ${getIconColorClass(index)}`} style={{ marginBottom: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
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
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
