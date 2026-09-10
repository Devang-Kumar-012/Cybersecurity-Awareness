import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Cloud,
  CreditCard,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  Gamepad2,
  MessageCircleMore,
  GraduationCap,
  Mail,
  ShieldAlert,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';

type NodeInfo = {
  id: string;
  label: string;
  icon: typeof Smartphone;
  color: string;
  risk: string;
  stat: string;
  habit: string;
  labMissionId: string;
};

const nodes: NodeInfo[] = [
  { id: 'mobile', label: 'Mobile', icon: Smartphone, color: 'cyan', risk: 'Malicious apps, SMS smishing, and SIM swap takeover', stat: '57% of digital fraud targets mobile vectors', habit: 'Lock down app permissions and enable biometric screen locks.', labMissionId: 'sms' },
  { id: 'payments', label: 'Payments', icon: CreditCard, color: 'violet', risk: 'Cloned checkout gateways, payment card skimming, and fake UPI links', stat: '$32B in annual global payment fraud losses', habit: 'Only use verified digital wallets with tokenized numbers and 2FA.', labMissionId: 'qr' },
  { id: 'email', label: 'Email', icon: Mail, color: 'sky', risk: 'Targeted spear phishing, impersonation, and password resets', stat: '91% of cyber attacks start with a deceptive email', habit: 'Inspect sender domains and never verify sensitive data via message.', labMissionId: 'phishing' },
  { id: 'cloud', label: 'Cloud', icon: Cloud, color: 'teal', risk: 'Unprotected cloud storage buckets and hijacked session tokens', stat: '82% of cloud breaches involve stolen credentials', habit: 'Enforce strong passphrases and phishing-resistant MFA across all vaults.', labMissionId: 'password' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'cyan', risk: 'Lookalike fake ecommerce storefronts and stolen CVVs', stat: '1 in 4 retail scams mimic well-known brand portals', habit: 'Type web addresses directly and check domain authenticity before checkout.', labMissionId: 'website' },
  { id: 'social', label: 'Social', icon: Users, color: 'violet', risk: 'Identity harvesting, friend impersonation, and oversharing clues', stat: 'Social engineering drives over 74% of human breaches', habit: 'Set profiles to private and question urgent financial requests.', labMissionId: 'social' },
  { id: 'learning', label: 'Learning', icon: GraduationCap, color: 'sky', risk: 'Compromised campus credentials and pirated study software containing Trojans', stat: 'Universities experienced a 70% surge in credential stuffing', habit: 'Never reuse personal passwords for student and academic portals.', labMissionId: 'password' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'teal', risk: 'Fake mod downloads, credential harvesting for rare skins, and session stealers', stat: 'Millions in gamer accounts compromised via cracked utilities', habit: 'Download only from verified stores and avoid unverified cheat software.', labMissionId: 'browser' },
  { id: 'messaging', label: 'Messaging', icon: MessageCircleMore, color: 'cyan', risk: 'WhatsApp verification hijacking and emergency family member impersonation', stat: 'Messaging fraud increased by 300% over the last two years', habit: 'Enable 2-step verification inside WhatsApp and Signal.', labMissionId: 'deepfake' },
  { id: 'work', label: 'Work', icon: Briefcase, color: 'violet', risk: 'Corporate network intrusion, confidential data leak, and executive spoofing', stat: 'Average cost of an organizational breach is $4.9 Million', habit: 'Always follow secondary verification for wire transfers and credential changes.', labMissionId: 'login' }
];

export function WhyMattersSection() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(nodes[0]);

  const jumpToLab = (missionId: string) => {
    window.dispatchEvent(new CustomEvent('select-cyber-mission', { detail: missionId }));
    const lab = document.getElementById('interactive');
    lab?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <small>Click any node</small>
            </div>

            <div className="ecosystem-nodes" role="group" aria-label="Digital touchpoints">
              {nodes.map((node, index) => {
                const Icon = node.icon;
                const isSelected = selectedNode.id === node.id;
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    className={`ecosystem-node ${node.color} ${isSelected ? 'active-node' : ''}`}
                    onClick={() => setSelectedNode(node)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    aria-pressed={isSelected}
                  >
                    <Icon size={18} />
                    <span>{node.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="insight-stack">
            <AnimatePresence mode="wait">
              <motion.article
                key={selectedNode.id}
                className="insight-card active-detail"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="insight-topbar">
                  <span className="insight-badge">
                    <ShieldAlert size={13} /> {selectedNode.label} Vulnerability Telemetry
                  </span>
                  <span className="insight-stat">{selectedNode.stat}</span>
                </div>
                <h3>{selectedNode.label} Digital Footprint</h3>
                <p className="insight-risk-copy"><strong>Primary Threat:</strong> {selectedNode.risk}</p>
                <div className="insight-habit-box">
                  <CheckCircle2 size={16} />
                  <span><strong>Protective Habit:</strong> {selectedNode.habit}</span>
                </div>
                <div className="insight-card-actions">
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight size={14} />}
                    onClick={() => jumpToLab(selectedNode.labMissionId)}
                  >
                    Investigate in Cyber Lab
                  </Button>
                </div>
              </motion.article>
            </AnimatePresence>

            <motion.article
              className="insight-card secondary"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <h3>Every tap leaves a trace</h3>
              <p>Daily actions create a digital footprint that grows across devices, accounts, and services. A single habit safeguards multiple connected channels.</p>
            </motion.article>
          </div>
        </div>

        <motion.div
          className="progress-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <button
            type="button"
            className="progress-pill clickable"
            onClick={() => setSelectedNode(nodes.find((n) => n.id === 'payments') ?? nodes[0])}
          >
            <Wallet size={16} />
            <span>Banking & payments ›</span>
          </button>
          <button
            type="button"
            className="progress-pill clickable"
            onClick={() => setSelectedNode(nodes.find((n) => n.id === 'mobile') ?? nodes[0])}
          >
            <MonitorSmartphone size={16} />
            <span>Phones & devices ›</span>
          </button>
          <button
            type="button"
            className="progress-pill clickable"
            onClick={() => setSelectedNode(nodes.find((n) => n.id === 'work') ?? nodes[0])}
          >
            <Briefcase size={16} />
            <span>Work & communication ›</span>
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
