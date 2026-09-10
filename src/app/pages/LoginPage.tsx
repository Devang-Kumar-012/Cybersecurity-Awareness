import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        try {
            await login(formData.email, formData.password);
            setSubmitted(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
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
                    <Link to="/" className="login-back"><ArrowLeft size={15} /> Back to CyberSecure</Link>
                    <div className="login-brand-mark"><ShieldCheck size={24} /></div>
                    <p className="login-kicker">Your secure learning space</p>
                    <h1>Keep your progress close.</h1>
                    <p className="login-intro-copy">Sign in to continue your cyber awareness journey, revisit completed missions, and build stronger digital habits.</p>
                    <div className="login-trust"><LockKeyhole size={16} /><span>Your learning data stays private.</span></div>
                </section>

                <section className="login-card" aria-labelledby="login-title">
                    <div className="login-card-heading">
                        <p className="login-kicker">Welcome back</p>
                        <h2 id="login-title">Sign in to continue</h2>
                        <p>Use the account you created for CyberSecure.</p>
                    </div>

                    {submitted ? (
                        <div className="login-success" role="status">
                            <div className="login-success-icon"><ShieldCheck size={24} /></div>
                            <h3>You&apos;re signed in.</h3>
                            <p>Your secure journey is ready whenever you are.</p>
                            <button type="button" className="btn btn-primary btn-md" onClick={() => navigate('/')}>Continue to journey <ArrowLeft size={16} className="login-continue-icon" /></button>
                        </div>
                    ) : (
                        <form className="login-form" onSubmit={handleSubmit}>
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
                                    placeholder="Enter your password" 
                                    autoComplete="current-password" 
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                                <button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                            <label className="checkbox-label"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /><span>Keep me signed in on this device</span></label>
                            
                            {error && <p className="login-form-message error" role="alert">{error}</p>}
                            
                            <button type="submit" className="btn btn-primary btn-md login-submit">Sign in <ArrowLeft size={16} className="login-continue-icon" /></button>
                        </form>
                    )}

                    <p className="login-card-footer">New to CyberSecure? <Link to="/signup">Create an account</Link></p>
                </section>
            </div>
        </main>
    );
}