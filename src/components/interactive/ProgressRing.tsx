import { motion, useReducedMotion } from 'framer-motion';

type ProgressRingProps = {
  progress: number;
  size?: number;
  stroke?: number;
  label?: string;
};

export function ProgressRing({ progress, size = 92, stroke = 7, label }: ProgressRingProps) {
  const shouldReduceMotion = useReducedMotion();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-shell" aria-label={label ?? 'Mission progress'}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="progress-ring-svg">
        <circle cx={size / 2} cy={size / 2} r={radius} className="progress-ring-track" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="progress-ring-value"
          strokeLinecap="round"
          initial={shouldReduceMotion ? false : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-ring-label">
        <span>{Math.round(progress)}%</span>
        <small>complete</small>
      </div>
    </div>
  );
}
