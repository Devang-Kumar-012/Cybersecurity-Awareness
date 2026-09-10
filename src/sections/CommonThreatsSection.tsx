import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Bug,
  Fingerprint,
  Lock,
  KeyRound,
  ScanLine,
  ShieldAlert,
  Smartphone,
  WifiOff,
  EyeOff,
  Briefcase,
  Search,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';

type Threat = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof ShieldAlert;
  accent: string;
  summary: string;
  signs: string[];
  avoid: string[];
};

const threats: Threat[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    subtitle: 'Trusted messages, dangerous intent',
    icon: AlertTriangle,
    accent: 'cyan',
    summary: 'Attackers impersonate trusted services to steal passwords, payment details, or sensitive data.',
    signs: ['Unexpected urgency', 'Suspicious links', 'Requests for credentials'],
    avoid: ['Verify sender identity', 'Open links manually', 'Never share credentials by message']
  },
  {
    id: 'malware',
    title: 'Malware',
    subtitle: 'Hidden software, visible damage',
    icon: Bug,
    accent: 'violet',
    summary: 'Malicious software can infect devices and silently collect information or disrupt operations.',
    signs: ['Unexpected pop-ups', 'Slow device performance', 'New unknown apps'],
    avoid: ['Keep software updated', 'Avoid shady downloads', 'Use trusted security tools']
  },
  {
    id: 'ransomware',
    title: 'Ransomware',
    subtitle: 'Encryption used as leverage',
    icon: Lock,
    accent: 'amber',
    summary: 'Ransomware locks access to files until a payment is made, often causing serious disruption.',
    signs: ['Encrypted files', 'Demand for payment', 'Unexpected system warnings'],
    avoid: ['Back up regularly', 'Segment critical data', 'Report suspicious activity fast']
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    subtitle: 'Manipulation without malware',
    icon: Fingerprint,
    accent: 'teal',
    summary: 'Attackers exploit trust, urgency, or emotion to gain access to information or systems.',
    signs: ['Pressure to act quickly', 'Requests for confidential details', 'Unusual authority claims'],
    avoid: ['Pause before responding', 'Verify through a trusted channel', 'Question unusual requests']
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft',
    subtitle: 'The stolen self',
    icon: ShieldAlert,
    accent: 'cyan',
    summary: 'Personal identity data is reused to open accounts, take loans, or impersonate victims.',
    signs: ['Unknown transactions', 'Unexpected account alerts', 'New accounts in your name'],
    avoid: ['Monitor accounts', 'Use multi-factor authentication', 'Freeze credit if needed']
  },
  {
    id: 'password-attacks',
    title: 'Password Attacks',
    subtitle: 'Weak keys, big consequences',
    icon: KeyRound,
    accent: 'violet',
    summary: 'Attackers use guessed or stolen passwords to gain access to accounts and systems.',
    signs: ['Repeated login failures', 'Password reuse', 'No MFA protection'],
    avoid: ['Use unique passwords', 'Adopt a password manager', 'Enable MFA']
  },
  {
    id: 'qr-codes',
    title: 'Fake QR Codes',
    subtitle: 'A scan can be a trap',
    icon: ScanLine,
    accent: 'amber',
    summary: 'Fraudulent QR codes can redirect users to fake sites or trigger malicious downloads.',
    signs: ['Unfamiliar QR prompts', 'Unexpected payment requests', 'Strange destination links'],
    avoid: ['Inspect the source', 'Preview before scanning', 'Use trusted payment methods']
  },
  {
    id: 'public-wifi',
    title: 'Public Wi-Fi Risks',
    subtitle: 'Open networks invite exposure',
    icon: WifiOff,
    accent: 'teal',
    summary: 'Unsecured networks can expose browsing activity, credentials, or data in transit.',
    signs: ['Open public networks', 'Shared login prompts', 'Unencrypted connections'],
    avoid: ['Use a VPN', 'Avoid sensitive tasks', 'Prefer mobile data when possible']
  },
  {
    id: 'deepfakes',
    title: 'Deepfake Scams',
    subtitle: 'Synthetic voices, real deception',
    icon: EyeOff,
    accent: 'cyan',
    summary: 'Manipulated audio or video can impersonate trusted people in real time or in recorded formats.',
    signs: ['Unusual voice requests', 'Pressure to act quickly', 'Odd visual glitches'],
    avoid: ['Verify through another channel', 'Question urgent requests', 'Check source context']
  },
  {
    id: 'bec',
    title: 'Business Email Compromise',
    subtitle: 'A trusted inbox used as a weapon',
    icon: Briefcase,
    accent: 'violet',
    summary: 'Attackers impersonate executives or partners to trick staff into sending money or data.',
    signs: ['Urgent financial requests', 'New payment instructions', 'Unexpected account changes'],
    avoid: ['Confirm through voice', 'Use approval protocols', 'Watch for payment changes']
  },
  {
    id: 'spyware',
    title: 'Spyware',
    subtitle: 'Silent monitoring, lasting impact',
    icon: Search,
    accent: 'teal',
    summary: 'Spyware quietly collects information such as passwords, keystrokes, or browsing activity.',
    signs: ['Battery drain', 'Unexpected permissions', 'Odd background activity'],
    avoid: ['Review app permissions', 'Install from trusted sources', 'Use reputable security software']
  },
  {
    id: 'data-breaches',
    title: 'Data Breaches',
    subtitle: 'When trusted systems fail',
    icon: ShieldCheck,
    accent: 'cyan',
    summary: 'Breaches expose personal or organizational data when systems, vendors, or databases are compromised.',
    signs: ['Service alerts', 'Unknown account activity', 'Password reset requests'],
    avoid: ['Use unique credentials', 'Enable alerts', 'Monitor exposed accounts']
  }
];

export function CommonThreatsSection() {
  const [selectedThreat, setSelectedThreat] = useState<Threat>(threats[0]);
  const [hoveredThreatId, setHoveredThreatId] = useState<string | null>(null);

  const orbitPositions = [
    { x: -140, y: -150 },
    { x: -170, y: -10 },
    { x: -120, y: 130 },
    { x: -10, y: -180 },
    { x: 120, y: -150 },
    { x: 170, y: -10 },
    { x: 120, y: 130 },
    { x: 0, y: 170 },
    { x: 150, y: 170 },
    { x: -150, y: 170 },
    { x: 260, y: 40 },
    { x: 220, y: -120 }
  ];

  const displayThreat = hoveredThreatId
    ? threats.find((threat) => threat.id === hoveredThreatId) ?? selectedThreat
    : selectedThreat;

  const threatToLabMap: Record<string, string> = {
    phishing: 'phishing',
    malware: 'browser',
    ransomware: 'login',
    'social-engineering': 'social',
    'identity-theft': 'website',
    'password-attacks': 'password',
    'qr-codes': 'qr',
    'public-wifi': 'wifi',
    deepfakes: 'deepfake',
    bec: 'phishing',
    spyware: 'sms',
    'data-breaches': 'login'
  };

  const handleInvestigateThreat = (threatId: string) => {
    const labMission = threatToLabMap[threatId] || 'phishing';
    window.dispatchEvent(new CustomEvent('select-cyber-mission', { detail: labMission }));
    const lab = document.getElementById('interactive');
    lab?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="threats-section" id="threats">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <ShieldAlert size={14} />
            Common Cyber Threats
          </Badge>
          <h2>Explore the tactics that shape the digital world.</h2>
          <p>
            Each threat has its own pattern, purpose, and warning signs. Learn how they work, how to recognise
            them, and how to stay one step ahead.
          </p>
        </motion.div>

        <div className="threats-shell">
          <motion.div
            className={`threats-orbit ${hoveredThreatId ? 'is-interacting' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              const isActive = hoveredThreatId === threat.id || (!hoveredThreatId && selectedThreat.id === threat.id);
              const isInactive = Boolean(hoveredThreatId) && hoveredThreatId !== threat.id;
              const position = orbitPositions[index] ?? { x: 0, y: 0 };

              return (
                <button
                  key={threat.id}
                  type="button"
                  className={`orbit-node ${threat.accent} ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                  onMouseEnter={() => setHoveredThreatId(threat.id)}
                  onMouseLeave={() => setHoveredThreatId(null)}
                  onFocus={() => setHoveredThreatId(threat.id)}
                  onBlur={() => setHoveredThreatId(null)}
                  onClick={() => setSelectedThreat(threat)}
                  style={{
                    ['--tx' as string]: `${position.x}px`,
                    ['--ty' as string]: `${position.y}px`
                  }}
                >
                  <Icon size={16} />
                  <span>{threat.title}</span>
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              className="threat-detail-card"
              key={displayThreat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="detail-top">
                <div className="detail-icon-wrap">
                  <displayThreat.icon size={24} />
                </div>
                <div>
                  <h3>{displayThreat.title}</h3>
                  <p>{displayThreat.subtitle}</p>
                </div>
              </div>

              <p className="detail-summary">{displayThreat.summary}</p>

              <div className="detail-grid">
                <div className="detail-panel">
                  <h4>Warning Signs</h4>
                  <ul>
                    {displayThreat.signs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-panel">
                  <h4>How to Stay Safe</h4>
                  <ul>
                    {displayThreat.avoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="detail-footer">
                <span>Threat simulation ready</span>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight size={14} />} onClick={() => handleInvestigateThreat(displayThreat.id)}>
                    Investigate in Lab
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => {
                    document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Test Knowledge
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
