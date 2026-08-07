const API_URL = 'http://localhost:5001/api';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const uploadProject = async (projectData, token) => {
  const response = await fetch(`${API_URL}/projects/upload`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(projectData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Project upload failed');
  return data;
};

export const getMatchedProjects = async (preferences, token) => {
  const response = await fetch(`${API_URL}/projects/match`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(preferences),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch matched projects');
  return data;
};

export const getMyProjects = async (token) => {
  const response = await fetch(`${API_URL}/projects/my-projects`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch your projects');
  return data;
};

export const getStudentProfile = async (token) => {
  const response = await fetch(`${API_URL}/student/profile`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data;
};

export const updateStudentProfile = async (profileData, token) => {
  const response = await fetch(`${API_URL}/student/profile`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update profile');
  return data;
};

export const getAllProjects = async (filters, token) => {
  let query = '';
  if (filters) {
    const params = new URLSearchParams();
    if (filters.industrySector) params.append('industrySector', filters.industrySector);
    if (filters.projectReadinessLevel) params.append('projectReadinessLevel', filters.projectReadinessLevel);
    query = `?${params.toString()}`;
  }

  const response = await fetch(`${API_URL}/projects/all${query}`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch all projects');
  return data;
};

// --- INVESTOR ENDPOINTS ---

export const getInvestorProfile = async (token) => {
  const response = await fetch(`${API_URL}/investors/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data;
};

export const updateInvestorProfile = async (profileData, token) => {
  const response = await fetch(`${API_URL}/investors/profile`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(profileData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update profile');
  return data;
};
