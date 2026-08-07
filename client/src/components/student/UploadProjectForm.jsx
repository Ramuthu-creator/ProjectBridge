import React, { useState } from 'react';
import './student.css';

const UploadProjectForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industrySector: '',
    technologyStack: '',
    projectReadinessLevel: 'Idea'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="upload-layout">
      {/* Left Column: Form */}
      <div className="upload-form-container">
        <h2 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>Upload a new project</h2>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Provide the details of your project below to secure your IP and get matched.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Project Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-input" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. AI Medical Assistant" 
              required 
            />
          </div>
          
          <div className="form-row">
            <label className="form-label">Description</label>
            <textarea 
              name="description" 
              className="form-input" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your project's problem, solution, and target audience..." 
              required 
            />
          </div>
          
          <div className="form-row">
            <label className="form-label">Industry Sector</label>
            <input 
              type="text" 
              name="industrySector" 
              className="form-input" 
              value={formData.industrySector} 
              onChange={handleChange} 
              placeholder="e.g. Healthcare, Fintech, EdTech" 
              required 
            />
          </div>
          
          <div className="form-row">
            <label className="form-label">Technology Stack</label>
            <input 
              type="text" 
              name="technologyStack" 
              className="form-input" 
              value={formData.technologyStack} 
              onChange={handleChange} 
              placeholder="Comma separated: React, Python, MongoDB" 
            />
          </div>
          
          <div className="form-row">
            <label className="form-label">Project Readiness Level</label>
            <select 
              name="projectReadinessLevel" 
              className="form-input" 
              value={formData.projectReadinessLevel} 
              onChange={handleChange} 
              required
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP (Minimum Viable Product)</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-new-project" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', fontSize: '1rem', marginTop: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading & Securing...' : 'Upload & Secure Project'}
          </button>
        </form>
      </div>

      {/* Right Column: Info Cards */}
      <div className="upload-sidebar">
        <div className="sidebar-card ip-protected-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3>IP protected</h3>
          <p>A SHA-256 hash and timestamp are generated automatically when you submit, proving you were first to upload the idea.</p>
        </div>

        <div className="sidebar-card tips-card">
          <h3>Tips for a strong listing</h3>
          <ul>
            <li>Keep the summary under 150 words</li>
            <li>Add a 1-2 minute demo video</li>
            <li>Tag the industries you target</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectForm;
