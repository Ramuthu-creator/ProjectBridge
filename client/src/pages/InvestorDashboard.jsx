import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatchedProjects } from '../services/api';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    interestedIndustrySectors: '',
    interestedTechStacks: ''
  });
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleChange = (e) => setPreferences({ ...preferences, [e.target.name]: e.target.value });

  const fetchMatches = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const prefs = {
        interestedIndustrySectors: preferences.interestedIndustrySectors.split(',').map(s => s.trim()).filter(Boolean),
        interestedTechStacks: preferences.interestedTechStacks.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      const data = await getMatchedProjects(prefs, token);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Investor Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2>Find Matching Projects</h2>
        <form onSubmit={fetchMatches} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Interested Industries (comma separated)</label>
            <input type="text" name="interestedIndustrySectors" value={preferences.interestedIndustrySectors} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. Healthcare, EdTech" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Interested Technologies (comma separated)</label>
            <input type="text" name="interestedTechStacks" value={preferences.interestedTechStacks} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. React, Python, AI" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Find Matches'}
          </button>
        </form>
        {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Matched Projects ({projects.length})</h3>
      
      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div key={project._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#818cf8', marginBottom: '0.5rem' }}>{project.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem', flexGrow: 1 }}>{project.description}</p>
            
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Industry:</strong> {project.industrySector}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Readiness:</strong> {project.projectReadinessLevel}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Stack:</strong> {project.technologyStack?.join(', ') || 'N/A'}
            </div>
            
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '0.85rem' }}><strong>Student:</strong> {project.studentId?.name}</p>
              <p style={{ fontSize: '0.85rem' }}><strong>Contact:</strong> <a href={`mailto:${project.studentId?.email}`} style={{ color: '#f472b6' }}>{project.studentId?.email}</a></p>
            </div>
          </div>
        ))}
      </div>
      {!isLoading && projects.length === 0 && (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: '1rem' }}>No matches found or no search performed yet.</p>
      )}
    </div>
  );
};

export default InvestorDashboard;
