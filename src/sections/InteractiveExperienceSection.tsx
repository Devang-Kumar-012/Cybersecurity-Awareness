import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldX,
  Volume2,
  PhoneCall,
  FileSearch,
  Layers,
  Check
} from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { ProgressRing } from '@/components/interactive/ProgressRing';
import { MissionCard, MissionProgressBar, ThreatLevelBadge, StatusChip, LabPanel, LabGlow, LabGrid } from '@/components/interactive/InteractivePrimitives';
import { SceneBackground } from '@/components/interactive/SceneBackground';

export type MissionCategory = 'all' | 'scams' | 'identity' | 'network';

export type Clue = {
  id: string;
  title: string;
  detail: string;
  isThreatIndicator: boolean;
};

export type TacticalAction = {
  id: string;
  label: string;
  isSafe: boolean;
  explanation: string;
};

export type Mission = {
  id: string;
  category: 'scams' | 'identity' | 'network';
  categoryLabel: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  threatLevel: 'Low' | 'Elevated' | 'High' | 'Critical';
  scenarioBriefing: string;
  evidenceType: 'email' | 'domain' | 'qr' | 'password' | 'wifi' | 'call' | 'sms' | 'deepfake' | 'browser' | 'mfa';
  evidenceMockup: {
    heading: string;
    subheading: string;
    content: string[];
    indicator: string;
  };
  clues: Clue[];
  actions: TacticalAction[];
};

export const missions: Mission[] = [
  {
    id: 'phishing',
    category: 'scams',
    categoryLabel: 'Scams & Phishing',
    title: 'Phishing Investigation',
    description: 'Trace a message that mimics a trusted service and identify the trap.',
    icon: MessageCircleMore,
    threatLevel: 'High',
    scenarioBriefing: 'An employee receives an urgent email from "PayPa1 Accounts Support" demanding immediate credential confirmation within 24 hours to prevent permanent account suspension.',
    evidenceType: 'email',
    evidenceMockup: {
      heading: 'From: support@paypa1-security-auth.net',
      subheading: 'Subject: URGENT: Account Suspension Notice (#9824)',
      content: [
        'Dear Customer, we detected suspicious logins from Moscow, Russia.',
        'Click the verification button within 24 hours or your balance will be frozen permanently.',
        'Target Link: http://paypa1-security-auth.net/login/verify-token'
      ],
      indicator: 'Lookalike domain & urgent coercive ultimatum'
    },
    clues: [
      { id: 'c1', title: 'Sender Address Inspection', detail: 'The sender domain is "paypa1-security-auth.net" (uses "1" instead of "l"). PayPal only emails from paypal.com.', isThreatIndicator: true },
      { id: 'c2', title: 'Artificial Urgency', detail: 'Imposes a 24-hour deadline with catastrophic threats (freezing funds) to bypass rational thought.', isThreatIndicator: true },
      { id: 'c3', title: 'Destination URL Analysis', detail: 'The embedded button points to an unverified HTTP server registered 2 days ago in an offshore registry.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Quarantine & Report to SecOps', isSafe: true, explanation: 'Correct move! Quarantining prevents coworkers from clicking, and reporting updates enterprise mail filters.' },
      { id: 'a2', label: 'Click link to check login screen', isSafe: false, explanation: 'Dangerous! Clicking exposes your browser to exploit kits and credential capture forms.' },
      { id: 'a3', label: 'Reply demanding proof', isSafe: false, explanation: 'Unsafe: Replying confirms your email address is active and invites intensified targeted attacks.' }
    ]
  },
  {
    id: 'website',
    category: 'scams',
    categoryLabel: 'Scams & Phishing',
    title: 'Fake Website Analysis',
    description: 'Inspect a lookalike domain and find the hidden warning signs.',
    icon: MonitorSmartphone,
    threatLevel: 'Critical',
    scenarioBriefing: 'A customer lands on a banking portal via an ad. The interface looks authentic, but subtle indicators reveal a credential harvesting proxy.',
    evidenceType: 'domain',
    evidenceMockup: {
      heading: 'Address Bar: https://secure-bank-login.chase-portal.co',
      subheading: 'SSL Certificate: Issued by Free-Encrypt CA (Valid: 2 days old)',
      content: [
        'Website matches visual branding of Chase Bank.',
        'Page forces entry of Debit Card PIN and Mother’s Maiden Name.',
        'Padlock icon is present, but certificate is issued to "Global Hosting Ltd".'
      ],
      indicator: 'Subdomain spoofing & excessive data harvesting'
    },
    clues: [
      { id: 'c1', title: 'Domain Structure', detail: 'The actual registered domain is "chase-portal.co", not "chase.com". Attackers use legitimate brand names as misleading subdomains.', isThreatIndicator: true },
      { id: 'c2', title: 'Excessive Sensitive Fields', detail: 'Legitimate banks never ask for your ATM PIN or CVV code on standard web login screens.', isThreatIndicator: true },
      { id: 'c3', title: 'Padlock Misconception', detail: 'A padlock icon only means traffic is encrypted, not that the site owner is genuine. Scammers use free SSL certificates too.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Block Domain & Navigate to Official URL', isSafe: true, explanation: 'Excellent! Navigating directly by manually typing the official bookmarked URL completely neutralizes typosquats.' },
      { id: 'a2', label: 'Enter dummy credentials to test it', isSafe: false, explanation: 'Unsafe: Scammers log IP addresses, fingerprint devices, and could log any patterns you type.' },
      { id: 'a3', label: 'Trust site because it has HTTPS padlock', isSafe: false, explanation: 'Incorrect: Over 80% of phishing sites today use HTTPS. The padlock indicates encryption, not authenticity.' }
    ]
  },
  {
    id: 'qr',
    category: 'scams',
    categoryLabel: 'Scams & Phishing',
    title: 'QR Scam Detection',
    description: 'Review a public QR prompt before a scan can become a breach.',
    icon: ScanLine,
    threatLevel: 'Elevated',
    scenarioBriefing: 'At a city parking meter, a printed QR sticker is pasted over the original payment instructions claiming "Fast Touchless Payment: Scan Here".',
    evidenceType: 'qr',
    evidenceMockup: {
      heading: 'Physical Clue: Glossy sticker overlaying weathered metal plate',
      subheading: 'QR Payload: https://q-park-pay.info/session?id=9928',
      content: [
        'The QR code was physically adhered over the city council emblem.',
        'Scanning redirects to an unverified payment gateway asking for card number, CVV, and OTP.',
        'No physical tamper seal is present.'
      ],
      indicator: 'Physical sticker tampering & unauthorized gateway'
    },
    clues: [
      { id: 'c1', title: 'Sticker Overlay Evidence', detail: 'The QR code is an adhesive vinyl sticker visibly slapped on top of the original municipal hardware.', isThreatIndicator: true },
      { id: 'c2', title: 'Third-Party Domain', detail: 'City meters use municipal government domains (.gov / official app), not generic .info landing pages.', isThreatIndicator: true },
      { id: 'c3', title: 'Instant OTP Demands', detail: 'Fraudulent gateways immediately prompt for bank OTPs to finalize fraudulent overseas charges.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Report Physical Tampering & Use Official App', isSafe: true, explanation: 'Great decision! Alerting parking attendants prevents others from falling victim, and official apps bypass physical tampering.' },
      { id: 'a2', label: 'Scan and pay fast to avoid a parking ticket', isSafe: false, explanation: 'Dangerous: Your credit card and CVV will be cloned immediately.' },
      { id: 'a3', label: 'Share the QR code with friends to check', isSafe: false, explanation: 'Improper response: Spreading unverified malicious links puts peers at risk.' }
    ]
  },
  {
    id: 'password',
    category: 'identity',
    categoryLabel: 'Identity & Auth',
    title: 'Password Security',
    description: 'Assess how a weak credential opens the door to compromise.',
    icon: KeyRound,
    threatLevel: 'High',
    scenarioBriefing: 'A company audit reveals that 48% of staff use predictable passwords like "Winter2024!" or personal birthdays across multiple company cloud accounts.',
    evidenceType: 'password',
    evidenceMockup: {
      heading: 'Credential Analysis: "Summer2024!"',
      subheading: 'Entropy Score: 24 bits (Vulnerable to dictionary attack in 0.4 seconds)',
      content: [
        'Pattern: Capitalized Season + Current Year + Exclamation Mark.',
        'Brute-force cracking time with modern GPU hashcat: < 1 second.',
        'Found in 14 public breach credential dumps.'
      ],
      indicator: 'Predictable masking pattern & high dictionary presence'
    },
    clues: [
      { id: 'c1', title: 'Pattern Predictability', detail: 'Replacing letters with standard symbols (e.g. E with 3, or adding "!") is easily anticipated by automated cracking dictionaries.', isThreatIndicator: true },
      { id: 'c2', title: 'Credential Stuffing Vulnerability', detail: 'Reusing this password on personal and work accounts allows a breach on an external forum to compromise work infrastructure.', isThreatIndicator: true },
      { id: 'c3', title: 'Length vs Complexity', detail: 'A 4-word random passphrase like "correct-horse-battery-staple" has over 70 bits of entropy and takes billions of years to crack.', isThreatIndicator: false }
    ],
    actions: [
      { id: 'a1', label: 'Switch to 16+ Char Passphrase + Password Manager', isSafe: true, explanation: 'Ideal solution! Unique passphrases combined with a trusted manager eliminate reuse and defeat dictionary attacks.' },
      { id: 'a2', label: 'Change "Summer2024!" to "Autumn2024!"', isSafe: false, explanation: 'Ineffective: Predictable quarterly updates are the exact first candidates tested in automated attacks.' },
      { id: 'a3', label: 'Write the password on a sticky note on the monitor', isSafe: false, explanation: 'Severe physical security hazard: Anyone passing the workspace gains instant access.' }
    ]
  },
  {
    id: 'wifi',
    category: 'network',
    categoryLabel: 'Network & Devices',
    title: 'Public Wi-Fi Risks',
    description: 'Evaluate how shared connectivity changes your exposure.',
    icon: WifiOff,
    threatLevel: 'Elevated',
    scenarioBriefing: 'While working at an international airport lounge, your device detects two networks: "Airport_Official_Secure" and an open network named "Airport_Free_HighSpeed_5G".',
    evidenceType: 'wifi',
    evidenceMockup: {
      heading: 'Network Name: "Airport_Free_HighSpeed_5G"',
      subheading: 'Security Protocol: Open / None (Unencrypted 802.11 b/g/n)',
      content: [
        'Signal strength is unusually strong near a bench with an unattended rogue pineapple access point.',
        'Captive portal demands you "Sign in with Google" to access free internet.',
        'DNS queries are being redirected through a private local subnet 192.168.4.1.'
      ],
      indicator: 'Evil Twin access point & DNS sniffing'
    },
    clues: [
      { id: 'c1', title: 'Unencrypted Traffic', detail: 'Any packet sent across open Wi-Fi can be captured by anyone in radio range using simple packet sniffers like Wireshark.', isThreatIndicator: true },
      { id: 'c2', title: 'Rogue AP / Evil Twin', detail: 'Anyone can set up an access point named "Free Airport Wi-Fi" on a battery-powered device to intercept sensitive data.', isThreatIndicator: true },
      { id: 'c3', title: 'Credential Harvesting Portal', detail: 'Free public Wi-Fi does not require Google or banking logins; such captive portals are built to harvest OAuth tokens.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Disconnect & Use Mobile Hotspot or Trusted VPN', isSafe: true, explanation: 'Excellent! Cellular data provides encrypted point-to-point transmission, while a verified VPN encrypts all tunnel traffic.' },
      { id: 'a2', label: 'Sign in with your Google account to proceed', isSafe: false, explanation: 'Catastrophic: The rogue portal intercepts your authentication token and hijacks your accounts.' },
      { id: 'a3', label: 'Browse personal banking since "it only takes a minute"', isSafe: false, explanation: 'High risk: Session cookies and unpinned API endpoints can be intercepted in transit.' }
    ]
  },
  {
    id: 'social',
    category: 'scams',
    categoryLabel: 'Scams & Phishing',
    title: 'Social Engineering',
    description: 'Recognise manipulation tactics that exploit urgency and trust.',
    icon: Fingerprint,
    threatLevel: 'Critical',
    scenarioBriefing: 'An employee receives an urgent phone call from someone claiming to be "James from Corporate IT Support". The caller claims a security patch is urgent and asks the employee to read back an SMS code.',
    evidenceType: 'call',
    evidenceMockup: {
      heading: 'Incoming Call: "Internal Helpdesk (Ext 4091)" (Spoofed)',
      subheading: 'Caller Claim: Emergency ransomware containment',
      content: [
        '"We are locking down the network right now due to an active breach."',
        '"I just sent a verification code to your phone to safeguard your mailbox."',
        '"Please read back the 6-digit code right now or we will be forced to suspend your employee account."'
      ],
      indicator: 'Vishing (voice phishing) & MFA bypass attempt'
    },
    clues: [
      { id: 'c1', title: 'MFA Token Extraction', detail: 'The attacker already knows your username and password; they triggered an official login to send a 2FA prompt to your phone and need you to read it to them.', isThreatIndicator: true },
      { id: 'c2', title: 'Fear and Coercion', detail: 'Impersonating internal authority and threatening account suspension are classic social engineering tactics.', isThreatIndicator: true },
      { id: 'c3', title: 'Caller ID Spoofing', detail: 'Caller ID displays are easily manipulated via VoIP software to mimic internal company extensions.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Hang Up & Contact IT Directly via Known Company Directory', isSafe: true, explanation: 'Spot on! Legitimate IT never asks for your one-time passwords. Verifying via official internal channels thwarts vishing.' },
      { id: 'a2', label: 'Provide the 6-digit code quickly to avoid suspension', isSafe: false, explanation: 'Breach confirmed: You just gave the attacker the key to bypass your multi-factor authentication.' },
      { id: 'a3', label: 'Ask the caller for their badge number and then give code', isSafe: false, explanation: 'Flawed logic: Attackers easily fabricate realistic-sounding employee IDs.' }
    ]
  },
  {
    id: 'sms',
    category: 'scams',
    categoryLabel: 'Scams & Phishing',
    title: 'Fake SMS Recognition (Smishing)',
    description: 'Separate genuine alerts from impersonation attempts.',
    icon: MessageCircleMore,
    threatLevel: 'High',
    scenarioBriefing: 'A message arrives on your mobile phone: "ALERT: Your package delivery has been suspended due to an unpaid $1.85 customs fee. Update details within 12h: http://post-track-fees.xyz/fee".',
    evidenceType: 'sms',
    evidenceMockup: {
      heading: 'Sender: +1 (833) 492-0192',
      subheading: 'Message: Postal Express Notice',
      content: [
        '"Package ID #US-98218 cannot be delivered."',
        '"Outstanding fee: $1.85."',
        '"Click link to enter card details: http://post-track-fees.xyz/fee"'
      ],
      indicator: 'Smishing lure with micro-fee debit trap'
    },
    clues: [
      { id: 'c1', title: 'Suspicious TLD', detail: 'The domain uses ".xyz", while official postal and delivery services (USPS, FedEx, DHL) always use their registered top-level domains.', isThreatIndicator: true },
      { id: 'c2', title: 'Micro-Fee Trap', detail: 'The low fee ($1.85) is designed to make victims let their guard down, but the page captures credit card numbers, CVVs, and billing addresses.', isThreatIndicator: true },
      { id: 'c3', title: 'Random Phone Number', detail: 'Official enterprise notifications come from verified shortcodes (5-6 digits), not random international VOIP numbers.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Delete Message & Report to Carrier (7726 / 1909)', isSafe: true, explanation: 'Correct! Forwarding smishing texts to 7726 (SPAM) helps carriers block the sending number and takedown the phishing host.' },
      { id: 'a2', label: 'Pay the $1.85 since it is a tiny amount', isSafe: false, explanation: 'Dangerous: The attackers will charge hundreds of dollars using the card details you submitted.' },
      { id: 'a3', label: 'Reply "STOP" to the message', isSafe: false, explanation: 'Unsafe: Replying to scam numbers confirms your phone number is valid and actively checked.' }
    ]
  },
  {
    id: 'deepfake',
    category: 'identity',
    categoryLabel: 'Identity & Auth',
    title: 'Deepfake Detection',
    description: 'Inspect audiovisual cues before acting on an unusual request.',
    icon: Eye,
    threatLevel: 'Critical',
    scenarioBriefing: 'A finance manager receives an urgent WhatsApp video message from the Chief Financial Officer ordering an off-cycle $250,000 wire transfer for an acquisition.',
    evidenceType: 'deepfake',
    evidenceMockup: {
      heading: 'Video Message from: "CFO (Direct Mobile)"',
      subheading: 'Instruction: Execute urgent supplier payment within 1 hour',
      content: [
        'The video looks like the CFO, but there is unnatural blurring around the neck and mouth.',
        'The audio tone is slightly robotic with monotone cadence and zero breath pauses.',
        'The request explicitly orders bypassing standard multi-signatory ERP approvals.'
      ],
      indicator: 'Facial glitch artifacts & out-of-band wire bypass'
    },
    clues: [
      { id: 'c1', title: 'Visual Edge Glitches', detail: 'Deepfake generative models often struggle with eye blinking frequency, ear consistency, teeth rendering, and collar line warping.', isThreatIndicator: true },
      { id: 'c2', title: 'Acoustic Artifacts', detail: 'Voice cloned synthesis often exhibits metallic resonance, missing micro-pauses, and unnatural inflection.', isThreatIndicator: true },
      { id: 'c3', title: 'Process Bypass Pressure', detail: 'Any communication urging employees to skip established financial controls or dual-authorization is a red flag.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Enforce Dual-Approval Policy & Call CFO via Landline', isSafe: true, explanation: 'Outstanding! Always verify out-of-band wire requests through verified internal channels and dual-signatory protocols.' },
      { id: 'a2', label: 'Process transfer immediately to keep the CFO happy', isSafe: false, explanation: 'Disastrous: Millions are lost globally every month to deepfake CEO fraud and Business Email Compromise.' },
      { id: 'a3', label: 'Reply to the WhatsApp video message asking if it is real', isSafe: false, explanation: 'Ineffective: The scammer controlling the account will simply reply "Yes, hurry up".' }
    ]
  },
  {
    id: 'browser',
    category: 'network',
    categoryLabel: 'Network & Devices',
    title: 'Browser Security',
    description: 'Test how browser signals and permissions affect trust.',
    icon: MonitorSmartphone,
    threatLevel: 'Elevated',
    scenarioBriefing: 'A pop-up prompts you to install a browser extension called "PDF Converter Pro" which requests permission to "Read and change all your data on all websites you visit".',
    evidenceType: 'browser',
    evidenceMockup: {
      heading: 'Extension: "PDF Quick Converter Pro (v1.0.2)"',
      subheading: 'Permissions Requested: "<all_urls>", "webRequestBlocking", "storage"',
      content: [
        'Publisher: Unknown individual registered 4 days ago.',
        '0 reviews on the Chrome Web Store.',
        'Permissions grant silent access to read form inputs, bank portals, and cookies on all visited domains.'
      ],
      indicator: 'Excessive wildcard permissions & untrusted publisher'
    },
    clues: [
      { id: 'c1', title: 'Broad Wildcard Permissions', detail: 'A simple PDF tool does not require permission to read and change all your data on every website you visit.', isThreatIndicator: true },
      { id: 'c2', title: 'Cookie & Session Hijacking Risk', detail: 'Extensions with these permissions can inject keyloggers and harvest active login session tokens.', isThreatIndicator: true },
      { id: 'c3', title: 'Low Store Reputation', detail: 'Brand new extensions with no developer pedigree or reviews are frequent distribution vectors for infostealers.', isThreatIndicator: true }
    ],
    actions: [
      { id: 'a1', label: 'Reject Installation & Audit Existing Extensions', isSafe: true, explanation: 'Smart move! Minimizing extension permissions and removing unused add-ons substantially hardens your browser perimeter.' },
      { id: 'a2', label: 'Install it since it is hosted on the web store', isSafe: false, explanation: 'Unsafe: Malicious extensions frequently slip past automated store scans before being taken down.' },
      { id: 'a3', label: 'Accept permissions but use incognito mode', isSafe: false, explanation: 'Misguided: If the extension is enabled in incognito, it still intercepts your private data.' }
    ]
  },
  {
    id: 'login',
    category: 'identity',
    categoryLabel: 'Identity & Auth',
    title: 'Secure Login & MFA Selection',
    description: 'Map the safest login flow for a high-value account.',
    icon: Lock,
    threatLevel: 'Elevated',
    scenarioBriefing: 'You are configuring the security settings for your primary email account, which controls password resets for your bank and government IDs. You must choose an authentication strategy.',
    evidenceType: 'mfa',
    evidenceMockup: {
      heading: 'Account: primary-admin@domain.com',
      subheading: 'Security Level: Root Identity Controller',
      content: [
        'Option 1: Password only (8 characters)',
        'Option 2: Password + SMS Verification Code',
        'Option 3: Strong Passphrase + Authenticator App / Hardware Security Key (FIDO2)'
      ],
      indicator: 'Evaluation of authentication resistance to SIM swap & phishing'
    },
    clues: [
      { id: 'c1', title: 'SIM Swapping Risk of SMS', detail: 'SMS OTPs can be intercepted via SIM swapping or telecommunication protocol flaws (SS7 vulnerabilities).', isThreatIndicator: true },
      { id: 'c2', title: 'Phishing-Resistant FIDO2', detail: 'FIDO2 / WebAuthn hardware keys (like YubiKey) bind cryptography to the exact URL, making credential phishing technically impossible.', isThreatIndicator: false },
      { id: 'c3', title: 'Recovery Codes Storage', detail: 'Backup recovery codes must be stored offline or in a secure encrypted vault, never in plain unencrypted notes.', isThreatIndicator: false }
    ],
    actions: [
      { id: 'a1', label: 'Deploy FIDO2 / Authenticator App + Save Offline Backup Codes', isSafe: true, explanation: 'Gold standard! Hardware security keys and TOTP apps provide resilient protection against remote credential harvesting.' },
      { id: 'a2', label: 'Rely solely on SMS verification', isSafe: false, explanation: 'Sub-optimal: SMS is vulnerable to SIM-swap attacks and reverse proxy phishing.' },
      { id: 'a3', label: 'Turn off MFA for faster login convenience', isSafe: false, explanation: 'Dangerous: Accounts without MFA are 99% more likely to suffer automated compromise.' }
    ]
  }
];

export function InteractiveExperienceSection() {
  const [activeCategory, setActiveCategory] = useState<MissionCategory>('all');
  const [activeMissionId, setActiveMissionId] = useState<string>(missions[0].id);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [inspectedClues, setInspectedClues] = useState<{ [missionId: string]: string[] }>({});
  const [actionFeedback, setActionFeedback] = useState<{ [missionId: string]: TacticalAction | null }>({});
  const [investigationActive, setInvestigationActive] = useState<boolean>(true);

  const shouldReduceMotion = useReducedMotion();

  // Handle cross-section triggers (e.g. from Common Threats section)
  useEffect(() => {
    const handleSelectMissionEvent = (event: CustomEvent<string>) => {
      const targetId = event.detail;
      const found = missions.find((m) => m.id === targetId);
      if (found) {
        setActiveMissionId(found.id);
        setInvestigationActive(true);
        const section = document.getElementById('interactive');
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('select-cyber-mission', handleSelectMissionEvent as EventListener);
    return () => window.removeEventListener('select-cyber-mission', handleSelectMissionEvent as EventListener);
  }, []);

  const filteredMissions = useMemo(() => {
    if (activeCategory === 'all') return missions;
    return missions.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const activeMission = useMemo(() => {
    return missions.find((m) => m.id === activeMissionId) ?? missions[0];
  }, [activeMissionId]);

  const progress = useMemo(() => {
    return Math.round((completedMissions.length / missions.length) * 100);
  }, [completedMissions]);

  const toggleClue = (missionId: string, clueId: string) => {
    setInspectedClues((prev) => {
      const current = prev[missionId] ?? [];
      const updated = current.includes(clueId) ? current.filter((id) => id !== clueId) : [...current, clueId];
      return { ...prev, [missionId]: updated };
    });
  };

  const handleActionSelect = (mission: Mission, action: TacticalAction) => {
    setActionFeedback((prev) => ({ ...prev, [mission.id]: action }));
    if (action.isSafe && !completedMissions.includes(mission.id)) {
      setCompletedMissions((prev) => [...prev, mission.id]);
    }
  };

  const handleResetCurrentMission = (missionId: string) => {
    setActionFeedback((prev) => ({ ...prev, [missionId]: null }));
    setInspectedClues((prev) => ({ ...prev, [missionId]: [] }));
    setCompletedMissions((prev) => prev.filter((id) => id !== missionId));
  };

  const handleResetAll = () => {
    setActionFeedback({});
    setInspectedClues({});
    setCompletedMissions([]);
  };

  const currentFeedback = actionFeedback[activeMission.id];
  const currentInspected = inspectedClues[activeMission.id] ?? [];
  const isCurrentCompleted = completedMissions.includes(activeMission.id);

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
            Step into our tactical investigation workspace. Review real-world threat telemetry, inspect hidden forensic clues, execute defensive protocols, and build practical digital resilience.
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
                <span>Interactive Cyber Lab Console</span>
              </div>
              <h3>Mission Control for digital defense and threat analysis.</h3>
              <p>Explore all 10 real-world investigations. Every mission is unlocked and ready for tactical analysis.</p>
            </div>

            <div className="cyber-lab-header-meta">
              <ThreatLevelBadge level={activeMission.threatLevel} />
              <div className="cyber-lab-meta-stack">
                <StatusChip label={`Resolved: ${completedMissions.length}/10`} icon={<CheckCircle2 size={12} />} active={completedMissions.length > 0} />
                <StatusChip label="Simulation Online" icon={<RadioTower size={12} />} active />
              </div>
            </div>
          </div>

          <div className="cyber-lab-body">
            {/* COMPRESSED MISSION QUEUE SIDEBAR */}
            <aside className="cyber-lab-sidebar">
              <LabPanel className="mission-panel">
                <div className="mission-panel-top">
                  <div>
                    <p className="panel-label">Investigation Queue</p>
                    <h4>10 Tactical Missions</h4>
                  </div>
                  <div className="panel-status-pill">
                    <ShieldCheck size={14} />
                    <span>{completedMissions.length.toString().padStart(2, '0')} / 10 Done</span>
                  </div>
                </div>

                <MissionProgressBar progress={progress} />

                {/* Category Filter Pills */}
                <div className="lab-filter-bar" role="tablist" aria-label="Mission category filters">
                  <button
                    type="button"
                    className={`lab-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('all')}
                  >
                    All (10)
                  </button>
                  <button
                    type="button"
                    className={`lab-filter-btn ${activeCategory === 'scams' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('scams')}
                  >
                    Scams & Phish (4)
                  </button>
                  <button
                    type="button"
                    className={`lab-filter-btn ${activeCategory === 'identity' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('identity')}
                  >
                    Identity (4)
                  </button>
                  <button
                    type="button"
                    className={`lab-filter-btn ${activeCategory === 'network' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('network')}
                  >
                    Network (2)
                  </button>
                </div>

                {/* Scrollable, compressed mission card list matching workspace height */}
                <div className="mission-card-list compressed-queue">
                  {filteredMissions.map((mission) => {
                    const isDone = completedMissions.includes(mission.id);
                    const isCurrent = activeMission.id === mission.id;
                    return (
                      <MissionCard
                        key={mission.id}
                        title={mission.title}
                        description={mission.description}
                        category={mission.categoryLabel}
                        icon={<mission.icon size={16} />}
                        active={isCurrent}
                        isCompleted={isDone}
                        statusLabel={isDone ? 'Resolved' : 'Active Probe'}
                        onClick={() => {
                          setActiveMissionId(mission.id);
                          setInvestigationActive(true);
                        }}
                      />
                    );
                  })}
                </div>

                {completedMissions.length > 0 && (
                  <button type="button" className="lab-reset-link" onClick={handleResetAll}>
                    <RefreshCw size={12} /> Reset all mission progress
                  </button>
                )}
              </LabPanel>
            </aside>

            {/* INTERACTIVE WORKSPACE CONSOLE */}
            <main className="cyber-lab-workspace">
              <LabPanel className="workspace-panel">
                <div className="workspace-topbar">
                  <div className="workspace-topbar-copy">
                    <div className="workspace-category-tag">
                      <Layers size={13} />
                      <span>{activeMission.categoryLabel} • Threat Level: {activeMission.threatLevel}</span>
                    </div>
                    <h4>{activeMission.title}</h4>
                    <p>{activeMission.description}</p>
                  </div>

                  <div className="workspace-topbar-actions">
                    <ProgressRing progress={progress} label="Mission completion" />
                    <Button
                      variant={isCurrentCompleted ? 'secondary' : 'primary'}
                      rightIcon={isCurrentCompleted ? <Check size={15} /> : <ArrowRight size={15} />}
                      onClick={() => setInvestigationActive(true)}
                    >
                      {isCurrentCompleted ? 'Re-inspect Mission' : 'Live Investigation'}
                    </Button>
                  </div>
                </div>

                <div className="workspace-surface">
                  <LabGlow className="workspace-glow">
                    <div className="workspace-surface-copy">
                      <div className="workspace-eyebrow">
                        <Compass size={14} />
                        <span>Scenario Briefing</span>
                      </div>
                      <h5>{activeMission.title}</h5>
                      <p>{activeMission.scenarioBriefing}</p>
                    </div>

                    <div className="workspace-surface-grid">
                      <div className="workspace-mini-card">
                        <Cpu size={16} />
                        <span>Adaptive Telemetry: {activeMission.threatLevel}</span>
                      </div>
                      <div className="workspace-mini-card">
                        <ShieldAlert size={16} />
                        <span>{isCurrentCompleted ? 'Threat Neutralized' : 'Action Required'}</span>
                      </div>
                    </div>
                  </LabGlow>

                  <LabGrid className="workspace-grid" />

                  {/* INTERACTIVE EVIDENCE INSPECTION & SIMULATION WINDOW */}
                  <div className="evidence-console">
                    <div className="evidence-header">
                      <div className="evidence-header-left">
                        <FileSearch size={16} />
                        <h6>Evidence & Forensic Telemetry</h6>
                      </div>
                      <div className="evidence-status-badges">
                        <StatusChip
                          label={isCurrentCompleted ? 'Threat Contained' : 'Active Investigation'}
                          icon={isCurrentCompleted ? <CheckCircle2 size={12} /> : <Activity size={12} />}
                          active={true}
                        />
                      </div>
                    </div>

                    {/* Realistic Mockup Box */}
                    <div className="evidence-mockup-card">
                      <div className="mockup-topbar">
                        <div className="mockup-traffic-lights">
                          <span className="dot red" />
                          <span className="dot yellow" />
                          <span className="dot green" />
                        </div>
                        <span className="mockup-source-badge">{activeMission.evidenceMockup.heading}</span>
                      </div>
                      <div className="mockup-body">
                        <p className="mockup-subject">{activeMission.evidenceMockup.subheading}</p>
                        <ul className="mockup-details">
                          {activeMission.evidenceMockup.content.map((line, idx) => (
                            <li key={idx}>
                              <span className="bullet-indicator">›</span> {line}
                            </li>
                          ))}
                        </ul>
                        <div className="mockup-tag">
                          <AlertTriangle size={13} />
                          <span>Detected anomaly: {activeMission.evidenceMockup.indicator}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Clue Examination */}
                    <div className="clues-section">
                      <div className="clues-title-bar">
                        <Search size={14} />
                        <span>Inspect Forensic Clues (Click to uncover details):</span>
                      </div>
                      <div className="clues-grid">
                        {activeMission.clues.map((clue) => {
                          const isRevealed = currentInspected.includes(clue.id);
                          return (
                            <button
                              key={clue.id}
                              type="button"
                              className={`clue-card ${isRevealed ? 'revealed' : ''}`}
                              onClick={() => toggleClue(activeMission.id, clue.id)}
                            >
                              <div className="clue-top">
                                <span className="clue-label">{clue.title}</span>
                                <span className="clue-toggle-text">{isRevealed ? 'Hide detail' : 'Inspect'}</span>
                              </div>
                              {isRevealed && (
                                <motion.p
                                  className="clue-detail"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {clue.detail}
                                </motion.p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tactical Defense Action Selection */}
                    <div className="actions-section">
                      <p className="actions-prompt">Choose the safest tactical response to neutralize this threat:</p>
                      <div className="tactical-actions-grid">
                        {activeMission.actions.map((act) => {
                          const isSelected = currentFeedback?.id === act.id;
                          return (
                            <button
                              key={act.id}
                              type="button"
                              className={`tactical-btn ${isSelected ? (act.isSafe ? 'correct' : 'incorrect') : ''}`}
                              onClick={() => handleActionSelect(activeMission, act)}
                            >
                              <div className="tactical-btn-content">
                                <ShieldCheck size={16} />
                                <span>{act.label}</span>
                              </div>
                              {isSelected && (
                                <span className="tactical-status-indicator">
                                  {act.isSafe ? '✓ Safe Defense' : '✗ Risk Incurred'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Real-time Cyber Defense Feedback */}
                      <AnimatePresence mode="wait">
                        {currentFeedback && (
                          <motion.div
                            key={currentFeedback.id}
                            className={`action-feedback-box ${currentFeedback.isSafe ? 'safe' : 'danger'}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="feedback-icon">
                              {currentFeedback.isSafe ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
                            </div>
                            <div className="feedback-copy">
                              <strong>{currentFeedback.isSafe ? 'Tactical Defense Successful!' : 'Caution: Security Vulnerability'}</strong>
                              <p>{currentFeedback.explanation}</p>
                            </div>
                            {currentFeedback.isSafe && (
                              <button
                                type="button"
                                className="feedback-action-btn"
                                onClick={() => {
                                  // Jump to next uncompleted mission if any
                                  const nextUncompleted = missions.find((m) => !completedMissions.includes(m.id) && m.id !== activeMission.id);
                                  if (nextUncompleted) {
                                    setActiveMissionId(nextUncompleted.id);
                                  } else {
                                    window.location.hash = 'practices';
                                  }
                                }}
                              >
                                Next Mission <ArrowRight size={14} />
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Resolution Footer */}
                    <div className="workspace-footer-controls">
                      <div className="workspace-footer-status">
                        {isCurrentCompleted ? (
                          <span className="badge-resolved">
                            <CheckCircle2 size={14} /> Mission Resolved & Logged
                          </span>
                        ) : (
                          <span className="badge-pending">
                            <Activity size={14} /> Telemetry awaiting tactical response
                          </span>
                        )}
                      </div>
                      <div className="workspace-footer-btns">
                        <button
                          type="button"
                          className="btn-text"
                          onClick={() => handleResetCurrentMission(activeMission.id)}
                        >
                          <RefreshCw size={13} /> Reset Probe
                        </button>
                        <Button
                          variant="secondary"
                          size="sm"
                          rightIcon={<ArrowRight size={14} />}
                          onClick={() => window.location.hash = 'practices'}
                        >
                          Safety Toolkit
                        </Button>
                      </div>
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
