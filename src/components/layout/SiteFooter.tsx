import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Github,
  Linkedin,
  Mail,
  Radar,
  ShieldCheck,
  Sparkles,
  Lock,
  Eye,
  KeyRound,
  ShieldAlert,
  Globe2
} from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Why Cybersecurity Matters', href: '#awareness' },
  { label: 'Common Threats', href: '#threats' },
  { label: 'Interactive Cyber Lab', href: '#interactive' },
  { label: 'Cyber Safety Toolkit', href: '#practices' },
  { label: 'Statistics', href: '#impact' },
  { label: 'Cyber Challenge', href: '#challenge' },
  { label: 'Resources', href: '#contact' },
  { label: 'Contact', href: '#contact' }
];

const resourceLinks = [
  { label: 'Report cybercrime', href: 'https://www.cisa.gov/report', icon: ShieldAlert, description: 'Securely report suspicious activity' },
  { label: 'Password manager guidance', href: 'https://www.cisa.gov/news-events/news/stop-using-passwords', icon: KeyRound, description: 'Choose and manage stronger credentials' },
  { label: 'Safe browsing guide', href: 'https://staysafeonline.org/', icon: Globe2, description: 'Avoid deceptive and risky websites' },
  { label: 'MFA recommendations', href: 'https://www.cisa.gov/secure-our-world/multi-factor-authentication', icon: Lock, description: 'Add a critical layer of protection' }
];

const principles = ['Think Before You Click', 'Use Strong Passwords', 'Enable MFA', 'Verify Before You Trust', 'Protect Your Privacy', 'Keep Software Updated'];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Email', href: 'mailto:hello@cybersecure.example', icon: Mail }
];

export function SiteFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-ambient" aria-hidden="true" />
      <div className="container footer-shell">
        <motion.div
          className="footer-hero"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="footer-hero-copy">
            <div className="footer-eyebrow">
              <ShieldCheck size={14} />
              <span>Cybersecurity Awareness Experience</span>
            </div>
            <h2>The strongest firewall is an informed user.</h2>
            <p>
              Every small habit, every careful choice, and every moment of awareness contributes to a safer digital world.
              Keep learning, stay alert, and make security part of everyday life.
            </p>
          </div>
          <a href="#hero" className="footer-hero-cta">
            Restart Cyber Experience
            <ArrowRight size={15} />
          </a>
          <a href="tel:1930" className="footer-helpline">
            <span>Cybersecurity Helpline</span>
            <strong>1930</strong>
            <small>Report cybercrime in India</small>
          </a>
        </motion.div>

        <motion.div
          className="footer-principles"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {principles.map((principle, index) => (
            <motion.span
              key={principle}
              className="footer-chip"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
            >
              <Sparkles size={12} />
              {principle}
            </motion.span>
          ))}
        </motion.div>

        <div className="footer-grid">
          <motion.div
            className="footer-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="brand-block">
              <div className="brand-mark footer-brand-mark" aria-hidden="true">
                <ShieldCheck size={18} />
                <span className="brand-dot" />
              </div>
              <div>
                <h3>CyberSecure</h3>
                <p>An interactive educational platform designed to improve cyber awareness through immersive storytelling.</p>
              </div>
            </div>

            <div className="footer-badges">
              <span className="footer-badge"><Radar size={12} />Frontend Only</span>
              <span className="footer-badge"><BookOpen size={12} />Interactive Learning</span>
              <span className="footer-badge"><Eye size={12} />Privacy Focused</span>
            </div>

            <p className="footer-credit">Developed by Sania Pal</p>
          </motion.div>

          <motion.div
            className="footer-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h4>Journey</h4>
            <ul className="footer-links-list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h4>Helpful resources</h4>
            <ul className="footer-resource-list">
              {resourceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <span className="resource-icon"><Icon size={14} /></span>
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            className="footer-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h4>Stay connected</h4>
            <div className="footer-socials">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="footer-social-link" aria-label={item.label} target="_blank" rel="noreferrer">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <div className="footer-contact-card">
              <p>Need a trusted contact point?</p>
              <a href="mailto:hello@cybersecure.example">hello@cybersecure.example</a>
            </div>
            <a href="#hero" className="footer-restart-link">
              <Compass size={14} />
              Explore again
            </a>
          </motion.div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 CyberSecure. Built for cybersecurity education and awareness.</p>
          <p>Made with ❤️ for a safer digital world · Version 1.0 · Last updated 2026</p>
        </div>

      </div>
    </footer>
  );
}
