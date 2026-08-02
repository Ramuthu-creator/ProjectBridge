import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

const Home = () => {
  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

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
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
  };

  return (
    <>
      <div className="background-effects">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
      </div>

      <header className="navbar" id="navbar">
          <div className="nav-container">
              <Link to="/" className="logo">
                  <div className="logo-icon"></div>
                  ProjectBridge
              </Link>
              <nav className="nav-links">
                  <a href="#features" onClick={(e) => scrollToSection(e, '#features')}>Features</a>
                  <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')}>Solutions</a>
                  <a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')}>Pricing</a>
              </nav>
              <div className="nav-actions">
                  <Link to="/login" className="btn btn-ghost">Log In</Link>
                  <a href="#" className="btn btn-primary">Get Started</a>
              </div>
          </div>
      </header>

      <main>
          <section className="hero">
              <div className="hero-content fade-in-up">
                  <div className="badge">✨ The new standard for collaboration</div>
                  <h1>Bridge the gap between <span className="gradient-text">Ideas and Execution</span></h1>
                  <p>Seamlessly connect your teams, automate workflows, and deliver projects faster with our intuitive platform designed for modern enterprises.</p>
                  <div className="hero-cta">
                      <a href="#" className="btn btn-primary btn-large">Start for free</a>
                      <a href="#" className="btn btn-secondary btn-large">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          Watch Demo
                      </a>
                  </div>
              </div>
              <div className="hero-visual fade-in-up delay-1">
                  <div className="glass-panel dashboard-mockup">
                      <div className="mockup-header">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                      </div>
                      <div className="mockup-body">
                          <div className="mockup-sidebar"></div>
                          <div className="mockup-content">
                              <div className="mockup-card line-1"></div>
                              <div className="mockup-card line-2"></div>
                              <div className="mockup-grid">
                                  <div className="mockup-box"></div>
                                  <div className="mockup-box"></div>
                                  <div className="mockup-box"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section id="features" className="features">
              <div className="section-header fade-in-up">
                  <h2>Everything you need to <span className="gradient-text">succeed</span></h2>
                  <p>Powerful tools designed to eliminate friction and keep your team aligned from start to finish.</p>
              </div>
              
              <div className="feature-grid">
                  <div className="feature-card glass-panel fade-in-up delay-1">
                      <div className="feature-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                      </div>
                      <h3>Smart Workflows</h3>
                      <p>Automate repetitive tasks and set up triggers that keep your projects moving forward without manual intervention.</p>
                  </div>
                  
                  <div className="feature-card glass-panel fade-in-up delay-2">
                      <div className="feature-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                      </div>
                      <h3>Real-time Insights</h3>
                      <p>Make data-driven decisions with live dashboards and custom reports that show exactly where your resources are going.</p>
                  </div>
                  
                  <div className="feature-card glass-panel fade-in-up delay-3">
                      <div className="feature-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <h3>Seamless Collaboration</h3>
                      <p>Bring your team, clients, and stakeholders together in one unified workspace with threaded conversations.</p>
                  </div>
              </div>
          </section>

          <section className="cta-section">
              <div className="glass-panel cta-box fade-in-up">
                  <h2>Ready to transform how you work?</h2>
                  <p>Join thousands of forward-thinking teams already using ProjectBridge.</p>
                  <div className="cta-buttons">
                      <a href="#" className="btn btn-primary btn-large">Get Started Today</a>
                  </div>
              </div>
          </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
