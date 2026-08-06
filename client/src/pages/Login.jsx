import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
        document.body.classList.remove('auth-page');
        observer.disconnect();
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      if (data.role === 'Student') {
        navigate('/student-dashboard');
      } else if (data.role === 'Investor') {
        navigate('/investor-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="background-effects">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
      </div>

      <header className="navbar auth-navbar">
          <div className="nav-container">
              <Link to="/" className="logo">
                  <div className="logo-icon"></div>
                  ProjectBridge
              </Link>
          </div>
      </header>

      <main className="auth-main">
          <div className="auth-container glass-panel fade-in-up">
              <div className="auth-header">
                  <h2>Welcome Back</h2>
                  <p>Enter your details to access your account.</p>
              </div>
              
              {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
              
              <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                  </div>
                  
                  <div className="form-options">
                      <label className="remember-me">
                          <input type="checkbox" name="remember" />
                          <span>Remember me</span>
                      </label>
                      <a href="#" className="forgot-password">Forgot password?</a>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
              </form>
              
              <div className="auth-footer">
                  <p>Don't have an account? <Link to="/register">Sign up</Link></p>
              </div>
          </div>
      </main>
    </>
  );
};

export default Login;
