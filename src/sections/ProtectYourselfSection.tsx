import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Circle,
  ExternalLink,
  Fingerprint,
  KeyRound,
  Lock,
  MessageCircleWarning,
  MonitorSmartphone,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trash2,
  UploadCloud,
  WifiOff,
  Wallet,
  Waves,
  Eye,
  ScanLine,
  AlertTriangle,
  CloudCog,
  HardDriveUpload,
  SmartphoneCharging,
  UserRound,
  BadgeAlert
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';

type Practice = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  impact: string;
  icon: typeof ShieldCheck;
  steps: string[];
  accent: 'cyan' | 'violet' | 'green' | 'amber';
};

const practices: Practice[] = [
  {
    id: 'passwords',
    title: 'Create strong passphrases',
    summary: 'Long, unique phrases are easier to remember and much harder to crack.',
    detail: 'Mix memorable words, symbols, and length to build a strong barrier against guessing attacks.',
    impact: 'Cuts down password guessing attacks quickly',
    icon: KeyRound,
    steps: ['Use 16+ characters', 'Avoid reusing old passwords', 'Turn personal details into a phrase'],
    accent: 'cyan'
  },
  {
    id: 'mfa',
    title: 'Enable MFA',
    summary: 'A second verification step blocks most account takeovers.',
    detail: 'Even a stolen password becomes much less useful when a second factor is required.',
    impact: 'Adds a strong second layer of protection',
    icon: Fingerprint,
    steps: ['Approve sign-ins from your phone', 'Prefer authenticator apps', 'Keep backup codes safe'],
    accent: 'violet'
  },
  {
    id: 'phishing',
    title: 'Recognise phishing',
    summary: 'Scammers use urgency and fear to trigger fast, unsafe clicks.',
    detail: 'Pause, inspect the sender, and confirm requests through a trusted channel.',
    impact: 'Prevents many account compromise attempts',
    icon: MessageCircleWarning,
    steps: ['Check the sender address', 'Hover before you click', 'Verify through the official app'],
    accent: 'amber'
  },
  {
    id: 'urls',
    title: 'Verify website URLs',
    summary: 'Small address changes often signal impersonation.',
    detail: 'Look carefully at the domain, padlock, and spelling before you log in.',
    impact: 'Stops spoofed pages before they collect data',
    icon: Eye,
    steps: ['Check the full domain', 'Confirm the HTTPS badge', 'Watch for misspellings'],
    accent: 'cyan'
  },
  {
    id: 'downloads',
    title: 'Avoid suspicious downloads',
    summary: 'Good-looking files can still carry malware or scams.',
    detail: 'Only download from known publishers and scan unexpected files before opening them.',
    impact: 'Reduces the chance of malware infection',
    icon: UploadCloud,
    steps: ['Use official app stores', 'Scan attachments before opening', 'Avoid “urgent” download prompts'],
    accent: 'amber'
  },
  {
    id: 'social',
    title: 'Secure social accounts',
    summary: 'Posting too much can provide the details scammers use later.',
    detail: 'Lock down privacy settings and review who can see your profile and posts.',
    impact: 'Limits public exposure and impersonation risk',
    icon: UserRound,
    steps: ['Turn on two-factor login', 'Limit public profile visibility', 'Review old posts and permissions'],
    accent: 'violet'
  },
  {
    id: 'updates',
    title: 'Keep software updated',
    summary: 'Updates patch security flaws that attackers look for.',
    detail: 'Install security updates when prompted and keep devices and apps current.',
    impact: 'Closes known holes before they are exploited',
    icon: RefreshCw,
    steps: ['Enable automatic updates', 'Update browsers and apps', 'Patch operating systems regularly'],
    accent: 'green'
  },
  {
    id: 'manager',
    title: 'Use a password manager',
    summary: 'A manager stores unique passwords safely and reduces reuse.',
    detail: 'One strong master password can unlock a secure vault for all your accounts.',
    impact: 'Makes strong passwords practical every day',
    icon: Lock,
    steps: ['Create one strong master password', 'Store credentials in the vault', 'Use auto-fill for logins'],
    accent: 'cyan'
  },
  {
    id: 'privacy',
    title: 'Protect personal information',
    summary: 'Less personal data online means less material for identity theft.',
    detail: 'Be selective about what you share, especially in public or public-facing profiles.',
    impact: 'Reduces identity exposure and data harvesting',
    icon: ShieldAlert,
    steps: ['Share less with public profiles', 'Avoid posting sensitive documents', 'Review data requests and permissions'],
    accent: 'amber'
  },
  {
    id: 'backup',
    title: 'Back up important data',
    summary: 'Backups help you recover quickly after loss or ransomware.',
    detail: 'Keep both local and cloud copies for critical files and photos.',
    impact: 'Turns a disaster into a manageable interruption',
    icon: HardDriveUpload,
    steps: ['Back up photos and documents', 'Test recovery once in a while', 'Keep offline copies for priorities'],
    accent: 'green'
  },
  {
    id: 'mobile',
    title: 'Secure your phone',
    summary: 'Phones hold email, banking, and personal data in one place.',
    detail: 'Use strong lock options, remote tracking, and app permissions carefully.',
    impact: 'Protects devices that are used constantly',
    icon: SmartphoneCharging,
    steps: ['Enable screen lock and biometrics', 'Review app permissions', 'Turn on find-my-device'],
    accent: 'violet'
  },
  {
    id: 'payments',
    title: 'Practice safe payments',
    summary: 'Secure checkout habits prevent payment fraud and account misuse.',
    detail: 'Prefer trusted payment methods and avoid entering card details on unfamiliar sites.',
    impact: 'Protects your money and personal details',
    icon: Wallet,
    steps: ['Use known merchant sites', 'Avoid public payment prompts', 'Check for HTTPS and verified checkout'],
    accent: 'cyan'
  },
  {
    id: 'wifi',
    title: 'Avoid public Wi-Fi risks',
    summary: 'Shared networks can expose traffic unless you add protection.',
    detail: 'Use a VPN or mobile data for sensitive tasks when you are away from home.',
    impact: 'Reduces exposure on shared networks',
    icon: WifiOff,
    steps: ['Avoid banking on public Wi-Fi', 'Use a VPN when possible', 'Prefer mobile data for private work'],
    accent: 'amber'
  },
  {
    id: 'reporting',
    title: 'Report incidents quickly',
    summary: 'Early reporting improves the odds of containment and recovery.',
    detail: 'If something feels wrong, tell the right team or service provider as soon as possible.',
    impact: 'Helps stop damage from spreading',
    icon: BadgeAlert,
    steps: ['Capture screenshots and timestamps', 'Report suspicious messages quickly', 'Contact your provider or IT team'],
    accent: 'green'
  }
];

export function ProtectYourselfSection() {
  const [activePractice, setActivePractice] = useState<Practice>(practices[0]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const progress = useMemo(() => Math.round((completed.length / practices.length) * 100), [completed]);

  const toggleStep = (step: string) => {
    setCompleted((prev) => (prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step]));
  };

  const activeSteps = activePractice.steps;

  return (
    <section className="protect-section" id="practices">
      <Container>
        <motion.div
          className="section-heading-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Badge>
            <ShieldCheck size={14} />
            Protect Yourself
          </Badge>
          <h2>Your cyber safety toolkit for everyday confidence.</h2>
          <p>
            These habits turn awareness into action. Each module introduces a simple step that makes your digital life safer without adding complexity.
          </p>
        </motion.div>

        <div className="toolkit-shell">
          <motion.div
            className="toolkit-nav"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="toolkit-summary">
              <div className="toolkit-summary-top">
                <Sparkles size={14} />
                <span>Build your checklist</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p>{progress}% of practical habits in your toolkit are already marked as learned.</p>
            </div>

            <div className="toolkit-list">
              {practices.map((practice) => {
                const Icon = practice.icon;
                const active = practice.id === activePractice.id;
                return (
                  <button
                    key={practice.id}
                    className={`toolkit-pill ${active ? 'active' : ''}`}
                    onClick={() => setActivePractice(practice)}
                  >
                    <Icon size={14} />
                    <span>{practice.title}</span>
                    {completed.includes(practice.id) ? <BadgeCheck size={14} /> : null}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="toolkit-stage"
            key={activePractice.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="toolkit-stage-top">
              <div>
                <h3>{activePractice.title}</h3>
                <p>{activePractice.summary}</p>
              </div>
              <div className={`toolkit-badge ${activePractice.accent}`}>{activePractice.impact}</div>
            </div>

            <div className="toolkit-grid">
              <div className="toolkit-visual">
                <div className="mock-shell">
                  <div className="mock-topbar" />
                  <div className="mock-content">
                    {activePractice.id === 'passwords' && (
                      <>
                        <div className="metric-card">
                          <div className="metric-label">Password strength</div>
                          <div className="meter">
                            <div className="meter-fill" style={{ width: '82%' }} />
                          </div>
                        </div>
                        <div className="text-block">
                          <p>Try this:&nbsp;“silver-moonlight-forest-42!”</p>
                          <p>It is long, memorable, and hard to guess.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'mfa' && (
                      <>
                        <div className="device-card">
                          <div className="device-screen">
                            <ShieldCheck size={20} />
                            <span>Approve sign-in</span>
                          </div>
                        </div>
                        <div className="text-block">
                          <p>A second step turns a leaked password into a much smaller risk.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'phishing' && (
                      <>
                        <div className="alert-card">
                          <AlertTriangle size={16} />
                          <span>Urgent account alert</span>
                        </div>
                        <div className="text-block">
                          <p>The message looks official, but the sender and link should be checked first.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'urls' && (
                      <>
                        <div className="browser-card">
                          <div className="browser-bar">
                            <span>https://secure-bank.com</span>
                          </div>
                          <div className="browser-body">
                            <p>Look for subtle misspellings and missing trust cues.</p>
                          </div>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'downloads' && (
                      <>
                        <div className="download-card">
                          <UploadCloud size={18} />
                          <span>Installer.exe</span>
                        </div>
                        <div className="text-block">
                          <p>Only trust downloads from official sources and scan them first.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'social' && (
                      <>
                        <div className="privacy-card">
                          <Lock size={16} />
                          <span>Private profile • Limited visibility</span>
                        </div>
                        <div className="text-block">
                          <p>Better privacy settings reduce impersonation and oversharing.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'updates' && (
                      <>
                        <div className="update-card">
                          <RefreshCw size={16} />
                          <span>Security updates ready</span>
                        </div>
                        <div className="text-block">
                          <p>Updates close the gaps attackers try to exploit.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'manager' && (
                      <>
                        <div className="vault-card">
                          <ShieldCheck size={16} />
                          <span>Vault • 42 credentials</span>
                        </div>
                        <div className="text-block">
                          <p>A manager helps you use strong, unique passwords across every account.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'privacy' && (
                      <>
                        <div className="privacy-card">
                          <UserRound size={16} />
                          <span>Profile data reduced</span>
                        </div>
                        <div className="text-block">
                          <p>Sharing less makes social engineering harder.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'backup' && (
                      <>
                        <div className="backup-card">
                          <HardDriveUpload size={16} />
                          <span>Backup complete • 2 locations</span>
                        </div>
                        <div className="text-block">
                          <p>A backup turns a crisis into a recovery exercise.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'mobile' && (
                      <>
                        <div className="device-card">
                          <Smartphone size={20} />
                          <span>Locked and protected</span>
                        </div>
                        <div className="text-block">
                          <p>Your mobile device deserves the same protection as your laptop.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'payments' && (
                      <>
                        <div className="payment-card">
                          <Wallet size={16} />
                          <span>Verified checkout • Safe payment</span>
                        </div>
                        <div className="text-block">
                          <p>Trusted payment flows make fraud much less likely.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'wifi' && (
                      <>
                        <div className="wifi-card">
                          <Waves size={16} />
                          <span>VPN active • Mobile data preferred</span>
                        </div>
                        <div className="text-block">
                          <p>Protection layers matter most when the network is shared.</p>
                        </div>
                      </>
                    )}
                    {activePractice.id === 'reporting' && (
                      <>
                        <div className="alert-card">
                          <BadgeAlert size={16} />
                          <span>Report suspicious activity</span>
                        </div>
                        <div className="text-block">
                          <p>Fast reporting limits damage and helps others stay safer.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="toolkit-action-row">
                  <Button variant="secondary" size="sm" onClick={() => setShowGuide((prev) => !prev)}>
                    {showGuide ? 'Hide safe checklist' : 'Show safe checklist'}
                  </Button>
                  <div className="mini-hint">Simple habit • Strong result</div>
                </div>
              </div>

              <div className="toolkit-explain">
                <p>{activePractice.detail}</p>
                <div className="checklist-card">
                  <div className="checklist-card-head">
                    <h4>Immediate actions</h4>
                    <span>{completed.filter((item) => activeSteps.includes(item)).length}/{activeSteps.length} done</span>
                  </div>
                  <div className="checklist-list">
                    {activeSteps.map((step) => {
                      const checked = completed.includes(step);
                      return (
                        <button key={step} className={`check-item ${checked ? 'checked' : ''}`} onClick={() => toggleStep(step)}>
                          {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          <span>{step}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showGuide ? (
                  <div className="guide-card">
                    <div className="guide-head">
                      <ScanLine size={16} />
                      <span>How this helps</span>
                    </div>
                    <p>Each small action reduces risk in a measurable way. A safer habit now prevents a bigger problem later.</p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="protect-transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <Badge>
              <ShieldCheck size={14} />
              Confidence over fear
            </Badge>
            <h3>Cybersecurity is not about being an expert. It is about building smart digital habits, one step at a time.</h3>
          </div>
          <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
            Explore the impact behind the habits
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
