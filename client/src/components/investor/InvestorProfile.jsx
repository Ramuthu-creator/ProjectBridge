import React, { useState, useEffect } from 'react';
import { getInvestorProfile, updateInvestorProfile } from '../../services/api';

const InvestorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getInvestorProfile(token);
      setProfile(data);
      setFormData({
        companyName: data.companyName || '',
        interestedIndustrySectors: data.interestedIndustrySectors?.join(', ') || '',
        interestedTechStacks: data.interestedTechStacks?.join(', ') || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const updatedProfile = await updateInvestorProfile(formData, token);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return <div style={{ color: '#9ca3af' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="inv-header-title" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Profile</h1>
        {!isEditing && (
          <button 
            className="inv-btn-outline" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="inv-side-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="inv-detail-icon-large" style={{ margin: 0 }}>
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>{profile?.name}</h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>{profile?.email} &bull; Investor Account</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Company/Firm Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', outline: 'none' }}
                required 
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Interested Industries (comma separated)</label>
              <input 
                type="text" 
                name="interestedIndustrySectors" 
                value={formData.interestedIndustrySectors} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Target Technologies (comma separated)</label>
              <input 
                type="text" 
                name="interestedTechStacks" 
                value={formData.interestedTechStacks} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="inv-btn-primary" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
              <button type="button" className="inv-btn-outline" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company / Firm</h3>
              <p style={{ fontSize: '1.1rem', color: 'white' }}>{profile?.companyName || 'Not specified'}</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interested Industries</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {profile?.interestedIndustrySectors?.length > 0 ? (
                  profile.interestedIndustrySectors.map((sector, index) => (
                    <span key={index} className="inv-tag status-prototype">{sector}</span>
                  ))
                ) : (
                  <span style={{ color: '#6b7280', fontStyle: 'italic' }}>No industries specified</span>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {profile?.interestedTechStacks?.length > 0 ? (
                  profile.interestedTechStacks.map((tech, index) => (
                    <span key={index} className="inv-tag">{tech}</span>
                  ))
                ) : (
                  <span style={{ color: '#6b7280', fontStyle: 'italic' }}>No technologies specified</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorProfile;
