import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, ShieldCheck, X, Accessibility, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const links = [
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'Threats', href: '#threats', id: 'threats' },
  { label: 'Lab', href: '#interactive', id: 'interactive' },
  { label: 'Toolkit', href: '#practices', id: 'practices' },
  { label: 'Contact', href: '#contact', id: 'contact' }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateHeaderState = () => {
      setScrolled(window.scrollY > 24);

      const offset = window.innerWidth < 960 ? 140 : 170;
      const activeId = links.find((link) => {
        const section = document.getElementById(link.id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= offset && rect.bottom >= offset;
      })?.id ?? 'hero';

      setActiveSection(activeId);
    };

    let frame = 0;
    const handleScroll = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHeaderState);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-main-shell">
        <motion.div
          className={`nav-bar ${scrolled ? 'compact' : ''}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <a href="#hero" className="brand" aria-label="Cybersecurity Awareness home" onClick={handleNavigate}>
            <div className="brand-mark" aria-hidden="true">
              <ShieldCheck size={18} />
              <span className="brand-dot" />
            </div>
            <div className="brand-copy">
              <span>CyberSecure</span>
              <small>Cyber Awareness Experience</small>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            {isAuthenticated ? (
              <button type="button" className="nav-login nav-account" onClick={handleLogoutClick}>
                <User size={15} />
                <span>{user?.name || 'Account'}</span>
              </button>
            ) : (
              <a href="/login" className="nav-login" onClick={handleNavigate}>
                <LogIn size={15} />
                <span>Log in</span>
              </a>
            )}
            <button
              type="button"
              className="nav-toggle"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-menu-overlay"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
          >
            <div className="mobile-menu-panel">
              <div className="mobile-menu-top">
                <div>
                  <p className="mobile-menu-eyebrow">Secure Journey</p>
                  <h3>Explore the awareness experience</h3>
                </div>
                <button type="button" className="mobile-close" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    onClick={handleNavigate}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25, ease: 'easeOut' }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={15} />
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <div className="mobile-menu-pill">
                  <Accessibility size={14} />
                  <span>Keyboard-ready and accessibility focused</span>
                </div>
                {isAuthenticated ? (
                  <button type="button" className="mobile-menu-cta mobile-menu-login" onClick={handleLogoutClick}>
                    <LogOut size={15} />
                    Sign out ({user?.name})
                  </button>
                ) : (
                  <a href="/login" className="mobile-menu-cta mobile-menu-login" onClick={handleNavigate}>
                    <LogIn size={15} />
                    Log in to your journey
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
