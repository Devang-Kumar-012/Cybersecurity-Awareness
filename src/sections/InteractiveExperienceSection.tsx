import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  Cpu,
  Fingerprint,
  Gamepad2,
  Lock,
  MessageCircleMore,
  MonitorSmartphone,
  ScanLine,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  WifiOff,
  KeyRound,
  Eye,
  RadioTower,
  Activity
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { ProgressRing } from '@/components/interactive/ProgressRing';
import { MissionCard, MissionProgressBar, ThreatLevelBadge, StatusChip, LabPanel, LabGlow, LabGrid } from '@/components/interactive/InteractivePrimitives';
import { SceneBackground } from '@/components/interactive/SceneBackground';

type Mission = {
  id: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  locked?: boolean;
  status: string;
};

const missions: Mission[] = [
  { id: 'phishing', title: 'Phishing Investigation', description: 'Trace a message that mimics a trusted service and identify the trap.', icon: MessageCircleMore, status: 'Live probe' },
  { id: 'website', title: 'Fake Website Analysis', description: 'Inspect a lookalike domain and find the hidden warning signs.', icon: MonitorSmartphone, locked: true, status: 'Queued' },
  { id: 'qr', title: 'QR Scam Detection', description: 'Review a public QR prompt before a scan can become a breach.', icon: ScanLine, locked: true, status: 'Queued' },
  { id: 'password', title: 'Password Security', description: 'Assess how a weak credential opens the door to compromise.', icon: KeyRound, locked: true, status: 'Queued' },
  { id: 'wifi', title: 'Public Wi-Fi Risks', description: 'Evaluate how shared connectivity changes your exposure.', icon: WifiOff, locked: true, status: 'Queued' },
  { id: 'social', title: 'Social Engineering', description: 'Recognise manipulation tactics that exploit urgency and trust.', icon: Fingerprint, locked: true, status: 'Queued' },
  { id: 'sms', title: 'Fake SMS Recognition', description: 'Separate genuine alerts from impersonation attempts.', icon: MessageCircleMore, locked: true, status: 'Queued' },
  { id: 'deepfake', title: 'Deepfake Detection', description: 'Inspect audiovisual cues before acting on an unusual request.', icon: Eye, locked: true, status: 'Queued' },
  { id: 'browser', title: 'Browser Security', description: 'Test how browser signals and permissions affect trust.', icon: MonitorSmartphone, locked: true, status: 'Queued' },
  { id: 'login', title: 'Secure Login', description: 'Map the safest login flow for a high-value account.', icon: Lock, locked: true, status: 'Queued' }
];

export function InteractiveExperienceSection() {
  const [activeMission, setActiveMission] = useState<Mission>(missions[0]);
  const shouldReduceMotion = useReducedMotion();

  const progress = useMemo(() => 10, []);

  return (
    <section className="interactive-section" id="interactive">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <Gamepad2 size={14} />
            Interactive Cyber Experience
          </Badge>
          <h2>Enter the Cyber Lab and investigate the threats that shape everyday digital life.</h2>
          <p>
            The experience now feels like a premium investigation workspace where visitors step through realistic
            scenarios with cinematic clarity and purposeful interaction.
          </p>
        </motion.div>

        <motion.div
          className="cyber-lab-shell"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62, ease: 'easeOut' }}
        >
          <SceneBackground />
          <div className="cyber-lab-header">
            <div className="cyber-lab-header-copy">
              <div className="cyber-lab-eyebrow">
                <BrainCircuit size={14} />
                <span>Interactive Cyber Lab</span>
              </div>
              <h3>Mission Control for the next generation of digital awareness.</h3>
              <p>Investigate real-world scenarios through layered insight, guided analysis, and immersive decision-making.</p>
            </div>

            <div className="cyber-lab-header-meta">
              <ThreatLevelBadge level="Elevated" />
              <div className="cyber-lab-meta-stack">
                <StatusChip label="System Online" icon={<RadioTower size={12} />} active />
                <StatusChip label="Signal Stable" icon={<Activity size={12} />} active />
              </div>
            </div>
          </div>

          <div className="cyber-lab-body">
            <aside className="cyber-lab-sidebar">
              <LabPanel className="mission-panel">
                <div className="mission-panel-top">
                  <div>
                    <p className="panel-label">Mission Queue</p>
                    <h4>Available investigations</h4>
                  </div>
                  <div className="panel-status-pill">
                    <ShieldCheck size={14} />
                    <span>01 / 10</span>
                  </div>
                </div>

                <MissionProgressBar progress={10} />

                <div className="mission-card-list">
                  {missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      title={mission.title}
                      description={mission.description}
                      icon={<mission.icon size={15} />}
                      active={activeMission.id === mission.id}
                      locked={mission.locked}
                      statusLabel={mission.status}
                      onClick={() => !mission.locked && setActiveMission(mission)}
                    />
                  ))}
                </div>
              </LabPanel>
            </aside>

            <main className="cyber-lab-workspace">
              <LabPanel className="workspace-panel">
                <div className="workspace-topbar">
                  <div className="workspace-topbar-copy">
                    <p className="panel-label">Current Focus</p>
                    <h4>{activeMission.title}</h4>
                    <p>{activeMission.description}</p>
                  </div>

                  <div className="workspace-topbar-actions">
                    <ProgressRing progress={10} label="Mission completion" />
                    <Button variant="primary" rightIcon={<ArrowRight size={15} />}>
                      Start Investigation
                    </Button>
                  </div>
                </div>

                <div className="workspace-surface">
                  <LabGlow className="workspace-glow">
                    <div className="workspace-surface-copy">
                      <div className="workspace-eyebrow">
                        <Compass size={14} />
                        <span>Scenario briefing</span>
                      </div>
                      <h5>Secure your first step into a live cyber investigation.</h5>
                      <p>Use the mission queue to guide the next simulation, then expand the workspace with phishing alerts, browser checks, and behavioural cues that teach through action.</p>
                    </div>
                    <div className="workspace-surface-grid">
                      <div className="workspace-mini-card">
                        <Cpu size={16} />
                        <span>Adaptive investigation flow</span>
                      </div>
                      <div className="workspace-mini-card">
                        <ShieldAlert size={16} />
                        <span>Real-time guidance</span>
                      </div>
                    </div>
                  </LabGlow>

                  <LabGrid className="workspace-grid" />
                  <div className="workspace-hint-card">
                    <div>
                      <p className="panel-label">Evidence window</p>
                      <h6>Future simulations will appear here with realistic interfaces.</h6>
                    </div>
                    <div className="workspace-hint-actions">
                      <StatusChip label="Insights ready" icon={<Sparkles size={12} />} active />
                      <StatusChip label="Awaiting input" icon={<ShieldAlert size={12} />} active={false} />
                    </div>
                  </div>
                </div>
              </LabPanel>
            </main>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
