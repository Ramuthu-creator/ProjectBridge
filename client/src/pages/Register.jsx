import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
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
            // Note: The backend schema requires companyName for Investors. We send a placeholder here to prevent validation errors.
            const dataToSubmit = { ...formData };
            if (dataToSubmit.role === 'Investor') {
                dataToSubmit.companyName = 'Independent Investor'; 
            }
            
            await register(dataToSubmit);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
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
                        <h2>Create an Account</h2>
                        <p>Join ProjectBridge to streamline your workflow.</p>
                    </div>

                    {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">I am a...</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="" disabled>Select your role</option>
                                <option value="Student">Student</option>
                                <option value="Investor">Investor</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
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
