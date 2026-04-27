'use client';

/**
 * BadgeFlipCard – 3D flip-card badge showcase.
 * Click to flip between the front (badge icon + glow) and the back (name + description).
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * @param {{
 *   badge: { name: string; icon: string; desc: string; color: string };
 *   delay?: number;
 *   isNew?: boolean;
 * }} props
 */
export default function BadgeFlipCard({ badge, delay = 0, isNew = false }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
      className="relative cursor-pointer"
      style={{ width: 88, height: 88, perspective: 600 }}
      onClick={() => setFlipped((f) => !f)}
      title="Click to flip"
    >
      {/* Card container – animates Y rotation */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: `radial-gradient(circle at 40% 35%, ${badge.color}30, rgba(26,39,68,0.95))`,
            border: `2px solid ${badge.color}60`,
            boxShadow: isNew ? `0 0 18px ${badge.color}60` : `0 0 8px ${badge.color}30`,
          }}
        >
          <span style={{ fontSize: 36, lineHeight: 1, filter: `drop-shadow(0 0 8px ${badge.color})` }}>
            {badge.icon}
          </span>
          {isNew && (
            <span
              className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full font-bold"
              style={{ background: badge.color, color: '#0D1B2A', fontSize: 9 }}
            >
              NEW
            </span>
          )}
          <div className="mt-1 text-center px-1">
            <div className="text-white/50 text-xs leading-tight" style={{ fontSize: 9 }}>
              tap to flip
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-2 text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${badge.color}25, rgba(13,27,42,0.98))`,
            border: `2px solid ${badge.color}60`,
          }}
        >
          <div className="font-bold text-white leading-tight mb-1" style={{ fontSize: 10 }}>
            {badge.name}
          </div>
          <div className="text-white/50 leading-snug" style={{ fontSize: 8 }}>
            {badge.desc}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
