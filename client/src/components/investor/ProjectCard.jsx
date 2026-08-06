import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  // dummy data fallback if no project prop is passed
  const data = project || {
    title: 'Eco-Friendly Smart Home Hub',
    description: 'A revolutionary device that optimizes energy consumption and reduces your carbon footprint through AI.',
    category: 'Technology',
    raised: 250000,
    goal: 500000,
    investors: 142,
    daysLeft: 12,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  };

  const progressPercentage = Math.min((data.raised / data.goal) * 100, 100);

  return (
    <div className="project-card-container fade-in-up">
      <div className="project-card">
        <div className="project-card-image" style={{ backgroundImage: `url(${data.imageUrl})` }}>
          <div className="project-category">{data.category}</div>
        </div>
        
        <div className="project-card-content">
          <div className="project-header">
            <img src={data.logoUrl} alt="Company Logo" className="company-logo" />
            <h3 className="project-title">{data.title}</h3>
          </div>
          
          <p className="project-description">{data.description}</p>
          
          <div className="project-stats">
            <div className="stat-row">
              <span className="stat-label">Raised</span>
              <span className="stat-value">${data.raised.toLocaleString()}</span>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            
            <div className="stat-row secondary-stats">
              <span>{Math.round(progressPercentage)}% of ${data.goal.toLocaleString()} goal</span>
              <span>{data.daysLeft} days left</span>
            </div>
          </div>
          
          <div className="project-footer">
            <div className="investor-count">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>{data.investors} investors</span>
            </div>
            <button className="btn btn-primary invest-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
