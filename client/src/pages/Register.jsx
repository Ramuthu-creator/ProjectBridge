import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
                  <h2>Create an Account</h2>
                  <p>Join ProjectBridge to streamline your workflow.</p>
              </div>
              
              <form className="auth-form" action="#" method="POST">
                  <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" placeholder="John Doe" required />
                  </div>

                  <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="you@example.com" required />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" placeholder="••••••••" required />
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-full">Sign Up</button>
              </form>
              
              <div className="auth-footer">
                  <p>Already have an account? <Link to="/login">Sign In</Link></p>
              </div>
          </div>
      </main>
    </>
  );
};

export default Register;
