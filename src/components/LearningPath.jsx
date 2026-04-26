import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES, XP_PER_LEVEL } from '../data/courseData';
import { UAEFlagStripe, GeometricPattern } from './UAEPatterns';

function StarDisplay({ count, max = 3 }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < count ? 'star-filled' : 'opacity-20'} style={{ fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

function ModuleNode({ module, index, onSelect }) {
  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';
  const isActive = module.status === 'active';

  const nodeColors = {
    completed: { bg: '#004433', border: '#009A44', glow: 'rgba(0,154,68,0.4)' },
    active: { bg: '#3a1020', border: '#CE1126', glow: 'rgba(206,17,38,0.5)' },
    locked: { bg: '#1a2030', border: '#333355', glow: 'transparent' },
  };
  const colors = nodeColors[module.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', delay: index * 0.15, stiffness: 200 }}
      className="flex flex-col items-center"
    >
      {/* Landmark label */}
      <motion.div
        className="text-xs text-uae-gold/70 mb-1 flex items-center gap-1"
        animate={{ opacity: isLocked ? 0.3 : 0.8 }}
      >
        <span>{module.landmarkIcon}</span>
        <span>{module.landmark}</span>
      </motion.div>

      {/* Node button */}
      <motion.button
        onClick={() => !isLocked && onSelect(module)}
        className="relative flex flex-col items-center"
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
      >
        {/* Outer ring for active */}
        {isActive && (
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-uae-red/50"
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 20px ${colors.glow}`, borderRadius: '50%' }} />

        {/* Main node circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: colors.bg,
            border: `3px solid ${colors.border}`,
            boxShadow: `0 0 15px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          {isLocked ? (
            <span className="text-2xl">🔒</span>
          ) : (
            <span className="text-2xl">{module.icon}</span>
          )}
          {/* Completed checkmark overlay */}
          {isCompleted && (
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-uae-green rounded-full flex items-center justify-center">
              <span style={{ fontSize: 10 }}>✓</span>
            </div>
          )}
        </div>

        {/* XP badge */}
        {!isLocked && (
          <div className="absolute -top-2 -right-2 bg-uae-gold text-uae-dark text-xs font-bold px-1.5 py-0.5 rounded-full">
            +{module.xpReward}
          </div>
        )}
      </motion.button>

      {/* Module info */}
      <div className="mt-2 text-center max-w-24">
        <div className={`text-xs font-semibold leading-tight ${isLocked ? 'text-white/30' : 'text-white'}`}>
          {module.title}
        </div>
        <div className="text-white/40 text-xs mt-0.5">{module.subtitle}</div>
        {(isCompleted || isActive) && (
          <div className="mt-1">
            <StarDisplay count={module.stars} />
          </div>
        )}
        {isActive && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-1 text-xs text-uae-red font-semibold"
          >
            ▶ Active
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function PathConnector({ completed }) {
  return (
    <div className="flex items-center justify-center w-8 mt-[-24px]">
      <svg width="8" height="50" viewBox="0 0 8 50">
        <line
          x1="4" y1="0" x2="4" y2="50"
          stroke={completed ? '#009A44' : '#333355'}
          strokeWidth="2"
          strokeDasharray={completed ? '0' : '4 4'}
        >
          {!completed && (
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
          )}
        </line>
        {completed && (
          <circle cx="4" cy="25" r="3" fill="#009A44" />
        )}
      </svg>
    </div>
  );
}

export default function LearningPath({ studentData, onSelectModule, onBack }) {
  const xpPercent = Math.round((studentData.xp / XP_PER_LEVEL) * 100);

  // Arrange modules in a winding snake pattern
  const rows = [
    [MODULES[0], MODULES[1]],
    [MODULES[2], MODULES[3]],
    [MODULES[4], MODULES[5]],
  ];

  return (
    <div className="min-h-screen bg-uae-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 uae-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <GeometricPattern size={300} opacity={1} />
      </div>

      {/* UAE Flag Stripe */}
      <UAEFlagStripe height={5} />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-uae-dark/90 backdrop-blur border-b border-uae-gold/10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="text-uae-gold/70 hover:text-uae-gold text-sm flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>
            <div className="text-center">
              <div className="text-white font-bold text-sm">Grade 8 · Algebra</div>
              <div className="text-uae-gold/60 text-xs">Learning Journey</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-uae-gold font-bold">{studentData.streak}🔥</span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="flex items-center gap-2">
            <span className="text-uae-gold text-xs font-bold">Lv.{studentData.level}</span>
            <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full xp-bar-fill rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span className="text-white/50 text-xs">{studentData.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Learning path */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Path title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold shimmer-text">Your Learning Path</h2>
          <p className="text-white/50 text-sm mt-1">
            {MODULES.filter(m => m.status === 'completed').length} of {MODULES.length} modules completed
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #CE1126, #C8A840, #009A44)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(MODULES.filter(m => m.status === 'completed').length / MODULES.length) * 100}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Modules grid - snake layout */}
        <div className="space-y-2">
          {rows.map((row, rowIdx) => {
            const isEven = rowIdx % 2 === 0;
            return (
              <div key={rowIdx}>
                {/* Row of nodes */}
                <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} justify-center gap-12 items-start px-4`}>
                  {row.map((module, colIdx) => (
                    <ModuleNode
                      key={module.id}
                      module={module}
                      index={rowIdx * 2 + colIdx}
                      onSelect={onSelectModule}
                    />
                  ))}
                </div>

                {/* Connector between rows */}
                {rowIdx < rows.length - 1 && (
                  <div className="flex justify-center my-1">
                    <PathConnector
                      completed={rows[rowIdx + 1][0]?.status !== 'locked'}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 bg-uae-navy/40 border border-uae-gold/10 rounded-xl p-4"
        >
          <div className="text-white/50 text-xs text-center mb-2">Module Status</div>
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-uae-green" />
              <span className="text-white/60">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-uae-red animate-pulse" />
              <span className="text-white/60">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-uae-navy border border-white/20" />
              <span className="text-white/60">Locked</span>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-4 bg-uae-navy/40 border border-uae-gold/10 rounded-xl p-4"
        >
          <div className="text-uae-gold text-sm font-bold mb-3 flex items-center gap-2">
            🏆 Class Leaderboard
          </div>
          {[
            { name: 'Fatima Al Hassan', xp: 1580, avatar: '👩', rank: 1 },
            { name: 'Ahmed Al Mansouri', xp: 1240, avatar: '🦅', rank: 2, isYou: true },
            { name: 'Omar Al Rashid', xp: 980, avatar: '👦', rank: 3 },
          ].map((player) => (
            <div
              key={player.name}
              className={`flex items-center gap-3 py-2 px-2 rounded-lg mb-1 ${player.isYou ? 'bg-uae-gold/10 border border-uae-gold/20' : ''}`}
            >
              <span className="text-uae-gold font-bold text-sm w-4">#{player.rank}</span>
              <span className="text-lg">{player.avatar}</span>
              <span className={`flex-1 text-sm ${player.isYou ? 'text-uae-gold font-semibold' : 'text-white/70'}`}>
                {player.name} {player.isYou && '(You)'}
              </span>
              <span className="text-uae-gold/80 text-xs font-bold">{player.xp} XP</span>
            </div>
          ))}
        </motion.div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
