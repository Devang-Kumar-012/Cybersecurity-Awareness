import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function SignupPage() {
    const navigate = useNavigate();
    const { signup, isAuthenticated, user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await signup(formData.email, formData.password, formData.name);
            setSubmitted(true);
            setTimeout(() => {
                navigate('/');
            }, 1200);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="login-page">
            <div className="login-visual" aria-hidden="true">
                <div className="login-grid" />
                <div className="login-orbit login-orbit-one" />
                <div className="login-orbit login-orbit-two" />
            </div>
            <div className="login-layout container">
                <section className="login-intro">
                    <div className="login-back-row">
                        <Link to="/" className="login-back"><ArrowLeft size={15} /> Back to CyberSecure</Link>
                        <Link to="/login" className="login-back">Sign in instead</Link>
                    </div>
                    <div className="login-brand-mark"><ShieldCheck size={24} /></div>
                    <p className="login-kicker">Start your secure journey</p>
                    <h1>Create your CyberSecure account.</h1>
                    <p className="login-intro-copy">Track progress, complete hands-on missions, and build stronger security habits. Registration is completely optional — you are always free to explore as a guest.</p>
                    <div className="login-trust"><LockKeyhole size={16} /><span>Optional account creation. Free forever.</span></div>
                </section>

                <section className="login-card" aria-labelledby="signup-title">
                    <div className="login-card-heading">
                        <p className="login-kicker">New member</p>
                        <h2 id="signup-title">Create your account</h2>
                        <p>Sign up to personalize certificates, or explore without an account.</p>
                    </div>

                    {isAuthenticated && !submitted ? (
                        <div className="login-success" role="status">
                            <div className="login-success-icon"><Sparkles size={24} /></div>
                            <h3>You already have an active session</h3>
                            <p>Signed in as <strong>{user?.name || user?.email}</strong>.</p>
                            <button type="button" className="btn btn-primary btn-md" onClick={() => navigate('/')}>
                                Return to CyberSecure <ArrowRight size={16} className="login-continue-icon" />
                            </button>
                        </div>
                    ) : submitted ? (
                        <div className="login-success" role="status">
                            <div className="login-success-icon"><ShieldCheck size={24} /></div>
                            <h3>Welcome aboard!</h3>
                            <p>Your account has been created successfully. Redirecting to your journey...</p>
                        </div>
                    ) : (
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="name">Full name</label>
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder="Your name" 
                                autoComplete="name" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />

                            <label htmlFor="email">Email address</label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="you@example.com" 
                                autoComplete="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />

                            <label htmlFor="password">Password</label>
                            <div className="password-field">
                                <input 
                                    id="password" 
                                    name="password" 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="Create a strong password (min 6 chars)" 
                                    autoComplete="new-password" 
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle" 
                                    aria-label={showPassword ? 'Hide password' : 'Show password'} 
                                    onClick={() => setShowPassword((value) => !value)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>

                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className="password-field">
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    placeholder="Confirm your password" 
                                    autoComplete="new-password" 
                                    minLength={6}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle" 
                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} 
                                    onClick={() => setShowConfirmPassword((value) => !value)}
                                >
                                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>

                            {error && <p className="login-form-message error" role="alert">{error}</p>}

                            <button type="submit" className="btn btn-primary btn-md login-submit">
                                <UserPlus size={16} /> Create Account
                            </button>
                        </form>
                    )}

                    <p className="login-card-footer">Already have an account? <Link to="/login">Sign in here</Link></p>

                    <div className="login-guest-option">
                        <p className="login-guest-prompt">Just want to try out the platform first?</p>
                        <Link to="/" className="login-guest-link">
                            <span>Explore as Guest without registering</span>
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
