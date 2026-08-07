import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/investor/investor.css';
import DiscoverProjects from '../components/investor/DiscoverProjects';
import ProjectsList from '../components/investor/ProjectsList';
import ProjectDetails from '../components/investor/ProjectDetails';
import InvestorProfile from '../components/investor/InvestorProfile';
import { getAllProjects, getSavedProjects, saveProject, unsaveProject } from '../services/api';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover'); // 'discover', 'list'
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('Investor');
  const [savedProjectIds, setSavedProjectIds] = useState(new Set());
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.user && payload.user.name) {
          setUserName(payload.user.name);
        }
      } catch (err) {
        console.error("Error decoding token", err);
      }
      fetchProjects();
      fetchSavedProjects();
    }
  }, [navigate]);

  const fetchSavedProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const saved = await getSavedProjects(token);
      setSavedProjectIds(new Set(saved.map(p => p._id)));
    } catch (err) {
      console.error("Failed to fetch saved projects", err);
    }
  };

  const fetchProjects = async (filters = null) => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const data = await getAllProjects(filters, token);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleApplyFilters = (filters) => {
    fetchProjects(filters);
  };

  const handleToggleSave = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const isSaved = savedProjectIds.has(projectId);
      
      let updatedSaved;
      if (isSaved) {
        updatedSaved = await unsaveProject(projectId, token);
      } else {
        updatedSaved = await saveProject(projectId, token);
      }
      
      setSavedProjectIds(new Set(updatedSaved.savedProjects));
    } catch (err) {
      console.error("Failed to toggle save project", err);
      alert("Failed to update saved projects.");
    }
  };

  const renderContent = () => {
    if (activeTab === 'discover') {
      return (
        <DiscoverProjects 
          projects={projects} 
          isLoading={isLoading} 
          onViewDetails={setSelectedProject} 
          savedProjectIds={savedProjectIds}
          onToggleSave={handleToggleSave}
        />
      );
    } else if (activeTab === 'list' || activeTab === 'saved') {
      const displayProjects = activeTab === 'saved' 
        ? projects.filter(p => savedProjectIds.has(p._id))
        : projects;
        
      return (
        <ProjectsList 
          projects={displayProjects} 
          isLoading={isLoading} 
          onApplyFilters={handleApplyFilters}
          onViewDetails={setSelectedProject}
          savedProjectIds={savedProjectIds}
          onToggleSave={handleToggleSave}
        />
      );
    } else if (activeTab === 'profile') {
      return <InvestorProfile />;
    }
  };

  return (
    <div className="investor-dashboard-layout">
      {/* Background Effects matching landing page */}
      <div className="inv-dashboard-bg-effects">
          <div className="inv-glow-orb inv-orb-1"></div>
          <div className="inv-glow-orb inv-orb-2"></div>
      </div>
      
      {/* Sidebar */}
      <aside className="inv-sidebar">
        <div className="inv-sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          ProjectBridge
        </div>

        <nav className="inv-nav">
          <div 
            className={`inv-nav-item ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Discover
          </div>
          <div 
            className={`inv-nav-item ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            List View
          </div>
          <div 
            className={`inv-nav-item ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            Saved Projects
          </div>
          <div 
            className={`inv-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            My Profile
          </div>
          
          <div className="inv-nav-item logout" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="inv-main">
        <header className="inv-header">
          <div className="inv-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search projects..." />
          </div>
          
          <div className="inv-header-actions">
            <div className="inv-user-profile">
              <div className="inv-user-avatar">{userName.charAt(0).toUpperCase()}</div>
              <span>{userName}</span>
            </div>
          </div>
        </header>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
        
        {renderContent()}

      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          isSaved={savedProjectIds.has(selectedProject._id)}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
};

export default InvestorDashboard;
