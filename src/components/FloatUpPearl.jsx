'use client';

/**
 * FloatUpPearl – renders a burst of floating pearl coins that rise and fade.
 * Mount this component when pearls are earned; it self-unmounts after the animation.
 */

import { motion } from 'framer-motion';

/**
 * @param {{ count?: number; onDone?: () => void }} props
 */
export default function FloatUpPearl({ count = 6, onDone }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 80,
    delay: i * 0.12,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: 0, x: p.x, opacity: 1, scale: 1 }}
          animate={{ y: -160, opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
          onAnimationComplete={p.id === count - 1 ? onDone : undefined}
          className="absolute text-2xl select-none"
          style={{ transform: `translateX(${p.x}px)` }}
        >
          🪙
        </motion.div>
      ))}
    </div>
  );
}
