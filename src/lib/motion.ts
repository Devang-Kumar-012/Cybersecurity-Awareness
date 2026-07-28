export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' }
};

export const hoverLift = {
  whileHover: { y: -4, scale: 1.01, boxShadow: '0 16px 40px rgba(53, 215, 255, 0.14)' },
  transition: { type: 'spring', stiffness: 220, damping: 22 }
};
