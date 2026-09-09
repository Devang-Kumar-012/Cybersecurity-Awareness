import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, ShieldCheck, X, Accessibility, LogIn } from 'lucide-react';

const links = [
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'Threats', href: '#threats', id: 'threats' },
  { label: 'Lab', href: '#interactive', id: 'interactive' },
  { label: 'Toolkit', href: '#practices', id: 'practices' },
  { label: 'Resources', href: '#resources', id: 'resources' },
  { label: 'Contact', href: '#contact', id: 'contact' }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(window.localStorage.getItem('cybersecure-authenticated') === 'true');
    syncAuthState();
    window.addEventListener('cybersecure-auth-change', syncAuthState);
    return () => window.removeEventListener('cybersecure-auth-change', syncAuthState);
  }, []);

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

  const handleLogout = () => {
    window.localStorage.removeItem('cybersecure-authenticated');
    setIsLoggedIn(false);
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
            {isLoggedIn ? (
              <button type="button" className="nav-login nav-account" onClick={handleLogout}>
                <ShieldCheck size={15} />
                <span>Signed in</span>
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
                {isLoggedIn ? (
                  <button type="button" className="mobile-menu-cta mobile-menu-login" onClick={handleLogout}>
                    <ShieldCheck size={15} />
                    Sign out
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
