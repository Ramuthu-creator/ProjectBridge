import React, { useState, useEffect } from 'react';
import { getStudentProfile, updateStudentProfile } from '../../services/api';
import './student.css';

const StudentProfile = ({ studentName = "Student User", email = "student@example.com" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: studentName,
    email: email,
    university: '',
    degreeProgram: '',
    graduationYear: '',
    technicalSkills: [],
    interestedSectors: []
  });

  const [formData, setFormData] = useState({
    name: '',
    university: '',
    degreeProgram: '',
    graduationYear: '',
    technicalSkills: '',
    interestedSectors: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const data = await getStudentProfile(token);
        setProfile({
          name: data.name || studentName,
          email: data.email || email,
          university: data.university || '',
          degreeProgram: data.degreeProgram || '',
          graduationYear: data.graduationYear || '',
          technicalSkills: data.technicalSkills || [],
          interestedSectors: data.interestedSectors || []
        });
        
        // Initialize form data
        setFormData({
          name: data.name || studentName,
          university: data.university || '',
          degreeProgram: data.degreeProgram || '',
          graduationYear: data.graduationYear || '',
          technicalSkills: data.technicalSkills ? data.technicalSkills.join(', ') : '',
          interestedSectors: data.interestedSectors ? data.interestedSectors.join(', ') : ''
        });
        
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [studentName, email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updatedData = await updateStudentProfile(formData, token);
      
      const newProfile = updatedData.profile;
      setProfile({
        name: newProfile.name,
        email: newProfile.email,
        university: newProfile.university || '',
        degreeProgram: newProfile.degreeProgram || '',
        graduationYear: newProfile.graduationYear || '',
        technicalSkills: newProfile.technicalSkills || [],
        interestedSectors: newProfile.interestedSectors || []
      });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST';

  if (isLoading) {
    return <div style={{ color: 'white' }}>Loading profile...</div>;
  }

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info" style={{ flex: 1 }}>
          {isEditing ? (
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-input" 
              style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', marginBottom: '0.5rem', width: '300px' }} 
            />
          ) : (
            <h2>{profile.name}</h2>
          )}
          <p>{profile.email}</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <span className="skill-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Verified Student</span>
            <span className="skill-pill" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }}>Active</span>
          </div>
        </div>
        
        {isEditing ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px' }} onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn-new-project" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        ) : (
          <button className="btn-secondary" style={{ marginLeft: 'auto', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Academic Background</h3>
          
          <div className="profile-field">
            <label>University</label>
            {isEditing ? (
              <input type="text" name="university" value={formData.university} onChange={handleChange} className="form-input" placeholder="e.g. University of Technology" />
            ) : (
              <p>{profile.university || <span style={{color: 'var(--text-muted)'}}>Not provided</span>}</p>
            )}
          </div>
          
          <div className="profile-field">
            <label>Degree Program</label>
            {isEditing ? (
              <input type="text" name="degreeProgram" value={formData.degreeProgram} onChange={handleChange} className="form-input" placeholder="e.g. B.Sc. Computer Science" />
            ) : (
              <p>{profile.degreeProgram || <span style={{color: 'var(--text-muted)'}}>Not provided</span>}</p>
            )}
          </div>
          
          <div className="profile-field">
            <label>Graduation Year</label>
            {isEditing ? (
              <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} className="form-input" placeholder="e.g. 2025" />
            ) : (
              <p>{profile.graduationYear || <span style={{color: 'var(--text-muted)'}}>Not provided</span>}</p>
            )}
          </div>
        </div>

        <div className="profile-card">
          <h3>Skills & Interests</h3>
          
          <div className="profile-field">
            <label>Technical Skills {isEditing && <small style={{fontWeight: 'normal', color: 'var(--text-muted)'}}>(comma separated)</small>}</label>
            {isEditing ? (
              <input type="text" name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} className="form-input" placeholder="e.g. React, Node.js, Python" />
            ) : (
              <div className="pill-container" style={{ marginTop: '0.5rem' }}>
                {profile.technicalSkills.length > 0 ? (
                  profile.technicalSkills.map((skill, i) => <span key={i} className="skill-pill">{skill}</span>)
                ) : (
                  <span style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>Not provided</span>
                )}
              </div>
            )}
          </div>
          
          <div className="profile-field" style={{ marginTop: '1.5rem' }}>
            <label>Interested Sectors {isEditing && <small style={{fontWeight: 'normal', color: 'var(--text-muted)'}}>(comma separated)</small>}</label>
            {isEditing ? (
              <input type="text" name="interestedSectors" value={formData.interestedSectors} onChange={handleChange} className="form-input" placeholder="e.g. Artificial Intelligence, FinTech" />
            ) : (
              <div className="pill-container" style={{ marginTop: '0.5rem' }}>
                {profile.interestedSectors.length > 0 ? (
                  profile.interestedSectors.map((sector, i) => <span key={i} className="skill-pill">{sector}</span>)
                ) : (
                  <span style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>Not provided</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
