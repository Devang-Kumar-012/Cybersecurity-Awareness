import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CircleDollarSign,
  Globe2,
  LockKeyhole,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wifi,
  Zap,
  ScanSearch,
  Smartphone,
  Eye,
  Shield,
  AlertTriangle,
  ChevronRight,
  Clock3
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';

type Metric = {
  id: string;
  label: string;
  value: string;
  note: string;
  icon: typeof ShieldCheck;
};

const metrics: Metric[] = [
  { id: 'phish', label: 'Phishing attempts', value: '3.4B+', note: 'Every year, attackers target people through messages, links and pressure tactics.', icon: ScanSearch },
  { id: 'reuse', label: 'Password reuse', value: '65%', note: 'A large share of users reuse passwords across accounts, increasing breach impact.', icon: LockKeyhole },
  { id: 'ransom', label: 'Ransomware growth', value: '+70%', note: 'The trend shows how quickly attackers adapt and scale their operations.', icon: ShieldAlert },
  { id: 'identity', label: 'Identity theft', value: '1 in 3', note: 'Personal data exposure fuels fraud and account takeover attempts.', icon: Eye },
  { id: 'mobile', label: 'Mobile risk', value: '57%', note: 'Mobile users are increasingly exposed through apps, links and device theft.', icon: Smartphone },
  { id: 'breach', label: 'Data breach cost', value: '$4.9M', note: 'The financial impact grows when organisations delay stronger controls.', icon: CircleDollarSign }
];

const storySteps = [
  'Phishing turns urgency into a vulnerability',
  'Password reuse turns one breach into many risks',
  'Ransomware makes recovery slower and more expensive',
  'User awareness remains one of the strongest defences'
];

export function ImpactSection() {
  const [activeMetric, setActiveMetric] = useState<Metric>(metrics[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  const headline = useMemo(() => `${metrics[0].value} ${metrics[0].label.toLowerCase()} reported globally`, []);

  return (
    <section className="impact-section" id="impact">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <BarChart3 size={14} />
            Cybersecurity Statistics & Global Impact
          </Badge>
          <h2>The scale of cyber risk is growing. The response has to grow with it.</h2>
          <p>
            These insights show why awareness matters in real life. Each trend connects directly to everyday habits, choices, and digital resilience.
          </p>
        </motion.div>

        <div className="impact-dashboard">
          <motion.div
            className="impact-hero"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="hero-stat-card">
              <div className="hero-stat-top">
                <Globe2 size={16} />
                <span>Global Signal</span>
              </div>
              <h3>{headline}</h3>
              <p>Cybersecurity is no longer a niche concern. It is a daily reality for businesses, families, and individuals worldwide.</p>
            </div>

            <div className="radar-card">
              <div className="radar-shell">
                <div className="radar-center" />
                {['0%', '25%', '50%', '75%', '100%'].map((value) => (
                  <div key={value} className="radar-ring" style={{ opacity: 0.25 + Number(value.replace('%', '')) / 400 }} />
                ))}
                <div className="radar-line" />
                <div className="radar-line alt" />
                <motion.div
                  className="radar-point"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="radar-caption">Attack surfaces continue to expand as digital dependence rises.</div>
            </div>
          </motion.div>

          <motion.div
            className="metric-grid"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const active = activeMetric.id === metric.id;
              return (
                <button
                  key={metric.id}
                  className={`metric-card ${active ? 'active' : ''}`}
                  onMouseEnter={() => setHovered(metric.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActiveMetric(metric)}
                >
                  <div className="metric-icon">
                    <Icon size={16} />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            className="insight-panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="insight-copy">
              <div className="insight-top">
                <TrendingUp size={16} />
                <span>Why this matters</span>
              </div>
              <h3>{activeMetric.value} {activeMetric.label.toLowerCase()} shows a growing risk.</h3>
              <p>{activeMetric.note}</p>
            </div>

            <div className="insight-visual">
              <div className="progress-ring">
                <svg viewBox="0 0 120 120" className="ring-svg">
                  <circle cx="60" cy="60" r="48" className="ring-bg" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="48"
                    className="ring-fill"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.72 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </svg>
                <div className="ring-label">72%</div>
              </div>
              <div className="insight-list">
                {storySteps.map((step, index) => (
                  <div key={step} className="story-item">
                    <span className="story-index">0{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="timeline-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="timeline-head">
              <div>
                <h3>From awareness to action</h3>
                <p>Cybersecurity changes when people understand the patterns behind the attacks.</p>
              </div>
              <div className="timeline-pill">
                <Clock3 size={14} />
                <span>Trend watch</span>
              </div>
            </div>
            <div className="timeline-steps">
              {[
                ['User awareness', 'Improves detection and slows risky clicks'],
                ['Tool adoption', 'Adds barriers that reduce successful attacks'],
                ['Policy and behaviour', 'Creates stronger habits across homes and teams']
              ].map(([title, text], index) => (
                <div key={title} className="timeline-step">
                  <div className="timeline-dot" />
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="impact-transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <Badge>
              <ShieldCheck size={14} />
              From insight to action
            </Badge>
            <h3>Awareness is not a passive response. It is the foundation of every stronger defence.</h3>
          </div>
          <Button variant="primary" rightIcon={<ArrowRight size={16} />} onClick={() => window.location.hash = 'challenge'}>
            Begin the challenge
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
