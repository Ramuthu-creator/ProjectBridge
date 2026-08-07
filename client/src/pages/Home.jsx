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
              </nav>
              <div className="nav-actions">
                  <Link to="/login" className="btn btn-ghost">Log In</Link>
                  <Link to="/register" className="btn btn-primary">Get Started</Link>
              </div>
          </div>
      </header>

      <main>
          <section className="hero">
              <div className="hero-content fade-in-up">
                  <div className="badge">✨ The new standard for collaboration</div>
                  <h1>Bridge the gap between <span className="gradient-text">Student Innovation and Capital</span></h1>
                  <p>The exclusive platform where ambitious students secure IP-protected funding, and angel investors discover the next big thing before it hits the mainstream market.</p>
                  <div className="hero-cta">
                      <Link to="/register" className="btn btn-primary btn-large">Start for free</Link>
                      <a href="#demo" className="btn btn-secondary btn-large">
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
                  <h2>Designed for <span className="gradient-text">Breakthroughs</span></h2>
                  <p>Everything you need to confidently share your prototype or discover your next investment.</p>
              </div>
              
              <div className="feature-grid">
                  <div className="feature-card glass-panel fade-in-up delay-1">
                      <div className="feature-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      </div>
                      <h3>IP Protection & Proof of Work</h3>
                      <p>Every student upload is secured with a SHA-256 hash timestamp. Prove mathematically that the idea was yours, exactly when you uploaded it.</p>
                  </div>
                  
                  <div className="feature-card glass-panel fade-in-up delay-2">
                      <div className="feature-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                      </div>
                      <h3>Curated Deal Flow</h3>
                      <p>Investors can filter projects by industry sector and technology stack to find exactly the types of innovations they want to fund.</p>
                  </div>
                  
                  <div className="feature-card glass-panel fade-in-up delay-3">
                      <div className="feature-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <h3>One-Click Bookmarking</h3>
                      <p>Found a project you love? Investors can save projects to their personal dashboard to review later and request meetings directly.</p>
                  </div>
              </div>
          </section>

          <section id="solutions" className="features" style={{ paddingTop: '2rem' }}>
              <div className="section-header fade-in-up">
                  <h2>Two paths. <span className="gradient-text">One Ecosystem.</span></h2>
              </div>
              <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                  <div className="feature-card glass-panel fade-in-up delay-1" style={{ borderTop: '4px solid #6366f1' }}>
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>For Students 🎓</h3>
                      <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Stop waiting until graduation to get your ideas funded. Bypass traditional gatekeepers and get your MVP directly in front of vetted angel investors.</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem', marginBottom: '2rem', lineHeight: '2' }}>
                          <li>Upload unlimited projects</li>
                          <li>Cryptographic IP protection</li>
                          <li>Direct meeting requests from investors</li>
                      </ul>
                      <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Join as Student</Link>
                  </div>
                  <div className="feature-card glass-panel fade-in-up delay-2" style={{ borderTop: '4px solid #ec4899' }}>
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>For Investors 💼</h3>
                      <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Gain early access to high-potential, university-level talent and vetted prototypes before they hit the mainstream venture capital market.</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem', marginBottom: '2rem', lineHeight: '2' }}>
                          <li>Browse exclusive student prototypes</li>
                          <li>Advanced filtering by industry/tech</li>
                          <li>Personalized saved projects dashboard</li>
                      </ul>
                      <Link to="/register" className="btn btn-secondary" style={{ width: '100%' }}>Join as Investor</Link>
                  </div>
              </div>
          </section>

          <section className="cta-section">
              <div className="glass-panel cta-box fade-in-up">
                  <h2>Ready to transform how you work?</h2>
                  <p>Join thousands of forward-thinking teams already using ProjectBridge.</p>
                  <div className="cta-buttons">
                      <Link to="/register" className="btn btn-primary btn-large">Get Started Today</Link>
                  </div>
              </div>
          </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
