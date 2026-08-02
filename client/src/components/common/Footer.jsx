import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <div className="logo-icon"></div>
            ProjectBridge
          </Link>
          <p>Connecting innovative ideas with the right resources to build the future.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            <Link to="/explore">Explore Projects</Link>
            <Link to="/submit">Submit Idea</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          
          <div className="link-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="link-group">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ProjectBridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
