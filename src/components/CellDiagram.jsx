'use client';

/**
 * CellDiagram – an interactive SVG animal-cell diagram for Grade 8 Science.
 * Clicking (or tapping) a cell part highlights it and shows a pop-up description.
 * UAE-themed colour palette.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CELL_PARTS = [
  {
    id: 'membrane',
    label: 'Cell Membrane',
    arabic: 'الغشاء الخلوي',
    desc: 'A thin, flexible barrier that controls what enters and leaves the cell — like the security gates at Dubai International Airport! 🏛️',
    color: '#009A44',
    // SVG ellipse definition (cx,cy,rx,ry)
    shape: { cx: 130, cy: 130, rx: 120, ry: 105 },
  },
  {
    id: 'nucleus',
    label: 'Nucleus',
    arabic: 'النواة',
    desc: 'The control centre of the cell — like the command room of the UAE Space Agency! 🚀 It contains DNA and directs all cell activities.',
    color: '#CE1126',
    shape: { cx: 115, cy: 110, rx: 38, ry: 30 },
  },
  {
    id: 'cytoplasm',
    label: 'Cytoplasm',
    arabic: 'السيتوبلازم',
    desc: 'The jelly-like fluid filling the cell where organelles float — like the warm waters of the Arabian Gulf supporting marine life! 🌊',
    color: '#C8A840',
    shape: { cx: 155, cy: 145, rx: 55, ry: 45 },
  },
  {
    id: 'mitochondria',
    label: 'Mitochondria',
    arabic: 'الميتوكوندريا',
    desc: 'The powerhouse of the cell — produces energy (ATP) like the solar panels powering UAE\'s Mohammed bin Rashid Solar Park! ☀️',
    color: '#3B82F6',
    shape: { cx: 165, cy: 108, rx: 20, ry: 12 },
  },
  {
    id: 'vacuole',
    label: 'Vacuole',
    arabic: 'الفجوة العصارية',
    desc: 'Storage space for water and nutrients — like the fresh-water reservoirs that keep the UAE\'s cities running! 💧',
    color: '#8B5CF6',
    shape: { cx: 95, cy: 155, rx: 18, ry: 14 },
  },
];

export default function CellDiagram() {
  const [selected, setSelected] = useState(null);

  const selectedPart = CELL_PARTS.find((p) => p.id === selected);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="text-center mb-1">
        <div className="text-uae-gold text-sm font-semibold mb-0.5">Interactive Cell Diagram</div>
        <div className="text-white/40 text-xs">Tap a part to learn about it</div>
      </div>

      {/* SVG Cell */}
      <div className="relative inline-block">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          className="drop-shadow-lg"
          aria-label="Animal cell diagram"
        >
          <defs>
            <radialGradient id="cellBg" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1a3a5c" />
              <stop offset="100%" stopColor="#0D1B2A" />
            </radialGradient>
          </defs>

          {/* Cytoplasm (background blob) */}
          <ellipse
            cx="130" cy="130" rx="118" ry="103"
            fill="url(#cellBg)"
            stroke={selected === 'cytoplasm' ? '#C8A840' : 'rgba(200,168,64,0.25)'}
            strokeWidth={selected === 'cytoplasm' ? 3 : 1.5}
            onClick={() => setSelected(selected === 'cytoplasm' ? null : 'cytoplasm')}
            style={{ cursor: 'pointer' }}
          />

          {/* Nucleus */}
          <ellipse
            cx="115" cy="110" rx="38" ry="30"
            fill="rgba(206,17,38,0.2)"
            stroke={selected === 'nucleus' ? '#CE1126' : 'rgba(206,17,38,0.5)'}
            strokeWidth={selected === 'nucleus' ? 3 : 1.5}
            strokeDasharray={selected === 'nucleus' ? '0' : '4 2'}
            onClick={() => setSelected(selected === 'nucleus' ? null : 'nucleus')}
            style={{ cursor: 'pointer' }}
          />
          {/* Nucleolus */}
          <circle cx="115" cy="110" r="8" fill="rgba(206,17,38,0.5)"
            onClick={() => setSelected(selected === 'nucleus' ? null : 'nucleus')}
            style={{ cursor: 'pointer' }}
          />

          {/* Mitochondria */}
          <ellipse
            cx="165" cy="108" rx="20" ry="12"
            fill="rgba(59,130,246,0.2)"
            stroke={selected === 'mitochondria' ? '#3B82F6' : 'rgba(59,130,246,0.5)'}
            strokeWidth={selected === 'mitochondria' ? 3 : 1.5}
            onClick={() => setSelected(selected === 'mitochondria' ? null : 'mitochondria')}
            style={{ cursor: 'pointer' }}
          />
          <path
            d="M150 108 Q157 100 165 108 Q173 116 180 108"
            fill="none"
            stroke="rgba(59,130,246,0.6)"
            strokeWidth="1"
            onClick={() => setSelected(selected === 'mitochondria' ? null : 'mitochondria')}
            style={{ cursor: 'pointer' }}
          />

          {/* Vacuole */}
          <ellipse
            cx="95" cy="155" rx="18" ry="14"
            fill="rgba(139,92,246,0.2)"
            stroke={selected === 'vacuole' ? '#8B5CF6' : 'rgba(139,92,246,0.5)'}
            strokeWidth={selected === 'vacuole' ? 3 : 1.5}
            onClick={() => setSelected(selected === 'vacuole' ? null : 'vacuole')}
            style={{ cursor: 'pointer' }}
          />

          {/* Cell Membrane outer ring */}
          <ellipse
            cx="130" cy="130" rx="120" ry="105"
            fill="none"
            stroke={selected === 'membrane' ? '#009A44' : 'rgba(0,154,68,0.6)'}
            strokeWidth={selected === 'membrane' ? 4 : 2}
            onClick={() => setSelected(selected === 'membrane' ? null : 'membrane')}
            style={{ cursor: 'pointer' }}
          />

          {/* Labels */}
          {CELL_PARTS.map((part) => {
            const cx = part.shape.cx;
            const cy = part.shape.cy;
            const isSelected = selected === part.id;
            let labelY = cy - part.shape.ry - 6;
            // Special positioning for membrane label (top)
            if (part.id === 'membrane') labelY = 18;
            if (part.id === 'cytoplasm') { labelY = 190; }

            return (
              <text
                key={part.id}
                x={part.id === 'membrane' ? 130 : cx}
                y={labelY}
                textAnchor="middle"
                fontSize="9"
                fontWeight={isSelected ? '700' : '500'}
                fill={isSelected ? part.color : 'rgba(255,255,255,0.5)'}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setSelected(isSelected ? null : part.id)}
              >
                {part.label}
              </text>
            );
          })}

          {/* Selected glow ring */}
          {selected && (() => {
            const p = CELL_PARTS.find((x) => x.id === selected);
            if (!p) return null;
            return (
              <ellipse
                cx={p.shape.cx} cy={p.shape.cy}
                rx={p.shape.rx + 6} ry={p.shape.ry + 6}
                fill="none"
                stroke={p.color}
                strokeWidth="2"
                strokeOpacity="0.4"
                strokeDasharray="4 3"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${p.shape.cx} ${p.shape.cy}`}
                  to={`360 ${p.shape.cx} ${p.shape.cy}`}
                  dur="8s"
                  repeatCount="indefinite"
                />
              </ellipse>
            );
          })()}
        </svg>
      </div>

      {/* Description panel */}
      <AnimatePresence mode="wait">
        {selectedPart ? (
          <motion.div
            key={selectedPart.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xs rounded-xl p-4"
            style={{
              background: `${selectedPart.color}15`,
              border: `1px solid ${selectedPart.color}40`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-sm" style={{ color: selectedPart.color }}>
                {selectedPart.label}
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-white/50 text-xs font-medium" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {selectedPart.arabic}
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{selectedPart.desc}</p>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white/30 text-xs text-center py-2"
          >
            👆 Tap any part of the cell to explore it
          </motion.div>
        )}
      </AnimatePresence>

      {/* Part selector chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CELL_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelected(selected === part.id ? null : part.id)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background: selected === part.id ? `${part.color}30` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${selected === part.id ? part.color : 'rgba(255,255,255,0.1)'}`,
              color: selected === part.id ? part.color : 'rgba(255,255,255,0.5)',
            }}
          >
            {part.label}
          </button>
        ))}
      </div>
    </div>
  );
}
