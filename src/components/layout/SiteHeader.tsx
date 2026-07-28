import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock3, Menu, ShieldCheck, Sparkles, X, Radar, Accessibility, Search } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero', id: 'hero' },
//   { label: 'Why It Matters', href: '#awareness', id: 'awareness' },
  { label: 'Threats', href: '#threats', id: 'threats' },
//   { label: 'Interactive Lab', href: '#interactive', id: 'interactive' },
//   { label: 'Safety Toolkit', href: '#practices', id: 'practices' },
  { label: 'Statistics', href: '#impact', id: 'impact' },
//   { label: 'Challenge', href: '#challenge', id: 'challenge' },
  { label: 'Resources', href: '#resources', id: 'resources' },
  { label: 'Contact', href: '#contact', id: 'contact' }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [clock, setClock] = useState('');
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(timer);
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

      const activeIndex = links.findIndex((link) => link.id === activeId);
      const activeLink = linkRefs.current[activeIndex];
      const container = navRef.current;
      if (activeLink && container) {
        const navRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setIndicatorStyle({ left: linkRect.left - navRect.left, width: linkRect.width });
      }
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

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <motion.div
        className="header-top-bar"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="container header-top-bar-inner">
          <div className="header-top-bar-left">
            <span className="status-pill">
              <Radar size={12} />
              Live cyber safety signal
            </span>
            <span className="header-top-bar-text">Learn. Protect. Stay Secure.</span>
          </div>

          <div className="header-top-bar-right">
            <span className="header-top-bar-meta">
              <Sparkles size={12} />
              Interactive learning experience
            </span>
            <span className="header-top-bar-meta">
              <Clock3 size={12} />
              {clock || 'Live'}
            </span>
          </div>
        </div>
      </motion.div>

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

          <nav className="nav-links" ref={navRef} aria-label="Primary navigation">
            <div className="nav-indicator" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                ref={(node) => {
                  linkRefs.current[index] = node;
                }}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="#interactive" className="nav-utility" aria-label="Open interactive lab" onClick={handleNavigate}>
              <Search size={16} />
            </a>
            <a href="#interactive" className="nav-cta" onClick={handleNavigate}>
              Start Learning
              <ArrowRight size={15} />
            </a>
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
                <a href="#interactive" className="mobile-menu-cta" onClick={handleNavigate}>
                  Start the Interactive Lab
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
