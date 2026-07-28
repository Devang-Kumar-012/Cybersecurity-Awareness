import { motion, useReducedMotion } from 'framer-motion';

export function SceneBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="cyber-lab-scene" aria-hidden="true">
      <motion.div
        className="scene-orb scene-orb-a"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: [1, 1.03, 1] }}
        transition={shouldReduceMotion ? { duration: 0.5 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="scene-orb scene-orb-b"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: [1, 1.05, 1] }}
        transition={shouldReduceMotion ? { duration: 0.5 } : { duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="scene-grid" />
      <div className="scene-network" />
      <motion.div
        className="scene-spark scene-spark-a"
        animate={shouldReduceMotion ? { opacity: 0.6 } : { y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={shouldReduceMotion ? { duration: 0.5 } : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="scene-spark scene-spark-b"
        animate={shouldReduceMotion ? { opacity: 0.6 } : { y: [6, -16, 6], opacity: [0.35, 0.7, 0.35] }}
        transition={shouldReduceMotion ? { duration: 0.5 } : { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
