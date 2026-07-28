import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Lock, Cpu } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { Container } from '@/components/primitives/Container';

const featurePoints = [
  'Everyday digital safety',
  'Professional awareness',
  'Trusted habits and response'
];

export function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <Container className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Badge>
            <Sparkles size={14} />
            Cybersecurity Awareness
          </Badge>
          <h1>Protect what matters in a world that never sleeps.</h1>
          <p>
            Discover how everyday habits, digital trust, and proactive awareness can shield your identity,
            your work, and your future.
          </p>

          <div className="inline-actions hero-actions">
            <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
              Start the Journey
            </Button>
            <Button variant="secondary">Learn the Essentials</Button>
          </div>

          <ul className="hero-features" aria-label="Core promises">
            {featurePoints.map((item) => (
              <li key={item}>
                <ShieldCheck size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="visual-card main-visual-card">
            <div className="visual-ring" />
            <div className="visual-glow" />
            <div className="device-stack">
              <div className="device-card">
                <Lock size={22} />
                <span>Encrypted Access</span>
              </div>
              <div className="device-card secondary-card">
                <Cpu size={22} />
                <span>Secure Devices</span>
              </div>
            </div>
            <div className="data-stream">
              <span />
              <span />
              <span />
            </div>
          </div>

          <motion.div
            className="visual-card floating-card"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <p>Stay alert. Stay informed. Stay protected.</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
