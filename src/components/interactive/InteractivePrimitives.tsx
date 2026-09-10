import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Sparkles, Wifi, RadioTower } from 'lucide-react';

type MissionCardProps = {
  title: string;
  description: string;
  category?: string;
  active?: boolean;
  locked?: boolean;
  isCompleted?: boolean;
  icon?: ReactNode;
  statusLabel?: string;
  onClick?: () => void;
};

export function MissionCard({
  title,
  description,
  category,
  active = false,
  locked = false,
  isCompleted = false,
  icon,
  statusLabel,
  onClick
}: MissionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={`mission-card ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
      disabled={locked}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="mission-card-top">
        <div className="mission-card-title-group">
          <div className="mission-card-icon">{icon}</div>
          <div>
            <h4>{title}</h4>
            {category && <span className="mission-card-category">{category}</span>}
          </div>
        </div>
        <div className={`mission-card-badge ${isCompleted ? 'completed' : active ? 'active' : ''}`}>
          {isCompleted ? 'Resolved' : locked ? 'Locked' : statusLabel ?? 'Ready'}
        </div>
      </div>
      <p className="mission-card-desc">{description}</p>
      <div className="mission-card-footer">
        <span className="mission-card-status-dot" />
        <span>{isCompleted ? 'Investigation resolved' : active ? 'Live in workspace' : 'Ready to investigate'}</span>
        {isCompleted ? <CheckCircle2 size={13} className="mission-done-icon" /> : null}
      </div>
    </motion.button>
  );
}

type ThreatLevelBadgeProps = {
  level: 'Low' | 'Elevated' | 'High' | 'Critical';
};

export function ThreatLevelBadge({ level }: ThreatLevelBadgeProps) {
  const tone = level.toLowerCase();
  return <div className={`threat-level-badge ${tone}`}>{level} Threat Level</div>;
}

type StatusChipProps = {
  label: string;
  icon?: ReactNode;
  active?: boolean;
};

export function StatusChip({ label, icon, active = true }: StatusChipProps) {
  return (
    <span className={`status-chip ${active ? 'online' : 'idle'}`}>
      {icon ?? <RadioTower size={12} />}
      {label}
    </span>
  );
}

export function MissionProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mission-progress-pill">
      <div className="mission-progress-copy">
        <Sparkles size={14} />
        <span>Probe readiness {progress}%</span>
      </div>
      <div className="mission-progress-track" aria-hidden="true">
        <div className="mission-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function LabPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`lab-panel ${className}`.trim()}>{children}</div>;
}

export function LabGlow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`lab-glow ${className}`.trim()}>{children}</div>;
}

export function LabGrid({ className = '' }: { className?: string }) {
  return <div className={`lab-grid ${className}`.trim()} aria-hidden="true" />;
}
