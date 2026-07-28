import { motion } from 'framer-motion';

export function BackgroundEffects() {
  return (
    <div className="background-effects" aria-hidden="true">
      <motion.div
        className="orb orb-one"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb-two"
        animate={{ x: [0, -20, 0], y: [0, 24, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="grid-overlay" />
    </div>
  );
}
