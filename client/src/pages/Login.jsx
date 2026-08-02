import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  useEffect(() => {
    // Add auth-page class to body when mounted
    document.body.classList.add('auth-page');
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    return () => {
        document.body.classList.remove('auth-page');
        observer.disconnect();
    };
  }, []);

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
              
              <form className="auth-form" action="#" method="POST">
                  <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="you@example.com" required />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" placeholder="••••••••" required />
                  </div>
                  
                  <div className="form-options">
                      <label className="remember-me">
                          <input type="checkbox" name="remember" />
                          <span>Remember me</span>
                      </label>
                      <a href="#" className="forgot-password">Forgot password?</a>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-full">Sign In</button>
              </form>
              
              <div className="auth-footer">
                  <p>Don't have an account? <a href="#">Sign up</a></p>
              </div>
          </div>
      </main>
    </>
  );
};

export default Login;
