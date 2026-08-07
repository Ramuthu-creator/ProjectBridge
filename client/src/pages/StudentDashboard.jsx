import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProject, getMyProjects } from '../services/api';

// Components
import DashboardOverview from '../components/student/DashboardOverview';
import UploadProjectForm from '../components/student/UploadProjectForm';
import StudentProfile from '../components/student/StudentProfile';
import '../components/student/student.css'; // Import the new layout styles

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'upload', 'profile'
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('Student User');
  const [studentEmail, setStudentEmail] = useState('');
  const [myProjects, setMyProjects] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [ipProof, setIpProof] = useState(null); // Used to show success screen

  const loadProjects = async (token) => {
    try {
      const projects = await getMyProjects(token);
      setMyProjects(projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Decode JWT payload to get user ID
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.user && payload.user.id) {
        setStudentId(payload.user.id);
        if (payload.user.name) setStudentName(payload.user.name);
        if (payload.user.email) setStudentEmail(payload.user.email);
      }
    } catch (e) {
      console.error('Failed to decode token');
      navigate('/login');
      return;
    }

    loadProjects(token);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleUploadProject = async (formData) => {
    setIsUploading(true);
    setIpProof(null);
    try {
      const token = localStorage.getItem('token');
      // formData is a FormData object from the component
      const response = await uploadProject(formData, token);
      
      setIpProof({
        hash: response.project.sha256Hash,
        timestamp: response.project.uploadTimestamp
      });
      
      // Refresh the list
      loadProjects(token);
    } catch (err) {
      alert(`Error uploading project: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const renderContent = () => {
    if (ipProof && activeTab === 'upload') {
      return (
        <div className="secured-container">
          <div className="secured-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Project Secured!</h2>
          <p>Your project has been successfully uploaded and your IP has been protected.</p>
          
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <strong>Upload Timestamp:</strong> {new Date(ipProof.timestamp).toLocaleString()}
          </div>
          
          <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            <strong>SHA-256 Hash Proof:</strong>
          </div>
          <div className="hash-box">
            {ipProof.hash}
          </div>
          
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Save this hash! It mathematically proves your ownership of this specific project state at the time of upload.
          </p>
          
          <button 
            className="btn-new-project" 
            style={{ margin: '2rem auto 0' }} 
            onClick={() => {
              setIpProof(null);
              setActiveTab('dashboard');
            }}
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    switch(activeTab) {
      case 'dashboard':
        return <DashboardOverview projects={myProjects} onNewProject={() => setActiveTab('upload')} />;
      case 'upload':
        return <UploadProjectForm onSubmit={handleUploadProject} isLoading={isUploading} />;
      case 'profile':
        return <StudentProfile studentName={studentName} email={studentEmail} />;
      default:
        return <DashboardOverview projects={myProjects} onNewProject={() => setActiveTab('upload')} />;
    }
  };

  return (
    <div className="student-dashboard-layout">
      {/* Background Effects matching landing page */}
      <div className="dashboard-bg-effects">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
      </div>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', borderRadius: '6px', transform: 'rotate(45deg)' }}></div>
          ProjectBridge
        </div>
        
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setIpProof(null); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => { setActiveTab('upload'); setIpProof(null); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Upload Project
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setIpProof(null); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            My Profile
          </div>

          <div className="nav-item logout" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'upload' && !ipProof && 'Upload Project'}
            {activeTab === 'upload' && ipProof && 'Project Secured'}
            {activeTab === 'profile' && 'My Profile'}
          </h1>
          <div className="user-indicator" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid #f3f4f6', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {studentName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: '500', color: '#374151' }}>{studentName}</span>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
