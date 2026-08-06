import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProject } from '../services/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industrySector: '',
    technologyStack: '',
    projectReadinessLevel: 'Idea'
  });
  const [status, setStatus] = useState('');
  const [ipProof, setIpProof] = useState(null);
  const [studentId, setStudentId] = useState('');

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
      }
    } catch (e) {
      console.error('Failed to decode token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');
    setIpProof(null);
    try {
      const token = localStorage.getItem('token');
      const projectData = {
        ...formData,
        studentId,
        technologyStack: formData.technologyStack.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      const response = await uploadProject(projectData, token);
      setStatus('Success! Project Uploaded.');
      setIpProof({
        hash: response.project.sha256Hash,
        timestamp: response.project.uploadTimestamp
      });
      // Reset form
      setFormData({ title: '', description: '', industrySector: '', technologyStack: '', projectReadinessLevel: 'Idea' });
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Student Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2>Upload New Project</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', minHeight: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Industry Sector</label>
            <input type="text" name="industrySector" value={formData.industrySector} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. Healthcare, Fintech" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Technology Stack (comma separated)</label>
            <input type="text" name="technologyStack" value={formData.technologyStack} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. React, Node.js, Python" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Readiness Level</label>
            <select name="projectReadinessLevel" value={formData.projectReadinessLevel} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Project</button>
        </form>
        {status && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>}
      </div>

      {ipProof && (
        <div className="glass-panel" style={{ padding: '2rem', border: '2px solid #4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>✅ Project Secured (IP Protection)</h3>
          <p style={{ marginBottom: '0.5rem' }}><strong>Upload Timestamp:</strong> {new Date(ipProof.timestamp).toLocaleString()}</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>SHA-256 Hash Proof:</strong></p>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '4px', wordBreak: 'break-all', fontFamily: 'monospace', color: '#a5b4fc', fontSize: '1.1rem' }}>
            {ipProof.hash}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '1rem' }}>Save this hash! It mathematically proves your ownership of this specific project state at the time of upload.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
