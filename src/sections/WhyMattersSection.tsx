import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Cloud, CreditCard, MonitorSmartphone, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Users, Wallet, Gamepad2, MessageCircleMore, GraduationCap, Mail } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';

const nodes = [
  { icon: Smartphone, label: 'Mobile', color: 'cyan' },
  { icon: CreditCard, label: 'Payments', color: 'violet' },
  { icon: Mail, label: 'Email', color: 'sky' },
  { icon: Cloud, label: 'Cloud', color: 'teal' },
  { icon: ShoppingBag, label: 'Shopping', color: 'cyan' },
  { icon: Users, label: 'Social', color: 'violet' },
  { icon: GraduationCap, label: 'Learning', color: 'sky' },
  { icon: Gamepad2, label: 'Gaming', color: 'teal' },
  { icon: MessageCircleMore, label: 'Messaging', color: 'cyan' },
  { icon: Briefcase, label: 'Work', color: 'violet' }
];

const insights = [
  {
    title: 'Every tap leaves a trace',
    description: 'Daily actions create a digital footprint that grows across devices, accounts, and services.'
  },
  {
    title: 'Convenience opens access',
    description: 'Fast connections make life easier, but also increase the need for protection and awareness.'
  },
  {
    title: 'Trust is the real currency',
    description: 'The more connected we become, the more important it is to protect identity and information.'
  }
];

export function WhyMattersSection() {
  return (
    <section className="why-section" id="awareness">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <Sparkles size={14} />
            Why it matters
          </Badge>
          <h2>Cybersecurity is already part of daily life.</h2>
          <p>
            From banking to messaging, from shopping to remote work, every action leaves a connection in the
            digital ecosystem. Awareness protects more than devices — it protects trust.
          </p>
        </motion.div>

        <div className="ecosystem-panel">
          <motion.div
            className="ecosystem-visual"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="ecosystem-core">
              <ShieldCheck size={32} />
              <span>Connected Life</span>
            </div>

            <div className="ecosystem-nodes">
              {nodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.label}
                    className={`ecosystem-node ${node.color}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <Icon size={18} />
                    <span>{node.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="insight-stack">
            {insights.map((item, index) => (
              <motion.article
                key={item.title}
                className="insight-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="progress-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="progress-pill">
            <Wallet size={16} />
            <span>Banking & payments</span>
          </div>
          <div className="progress-pill">
            <MonitorSmartphone size={16} />
            <span>Phones & devices</span>
          </div>
          <div className="progress-pill">
            <Briefcase size={16} />
            <span>Work & communication</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
