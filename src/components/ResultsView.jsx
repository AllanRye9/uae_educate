import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UAEFlagStripe, FalconMascot } from './UAEPatterns';
import { BADGES } from '../data/courseData';

function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#CE1126', '#009A44', '#C8A840', '#FFFFFF', '#FFD700', '#3B82F6'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function AnimatedStar({ delay, filled }) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: filled ? 1 : 0.7, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay }}
      style={{
        fontSize: 48,
        display: 'inline-block',
        filter: filled ? 'drop-shadow(0 0 8px #FFD700)' : 'none',
        opacity: filled ? 1 : 0.25,
        color: '#FFD700',
      }}
    >
      ★
    </motion.span>
  );
}

const PERFORMANCE_MSGS = {
  3: { title: "PERFECT! 🌟", subtitle: "You are a true Algebra Master!", color: '#C8A840' },
  2: { title: "GREAT JOB! 🎉", subtitle: "Solid understanding! Keep it up!", color: '#009A44' },
  1: { title: "GOOD EFFORT! 💪", subtitle: "Review and try again — you'll get there!", color: '#3B82F6' },
  0: { title: "KEEP GOING! 🔄", subtitle: "Review the lessons and try again!", color: '#CE1126' },
};

export default function ResultsView({ results, module, studentData, onContinue }) {
  const [showConfetti, setShowConfetti] = useState(results.stars >= 2);
  const [animateXP, setAnimateXP] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  const perf = PERFORMANCE_MSGS[results.stars] || PERFORMANCE_MSGS[0];
  const xpPercent = Math.round((studentData.xp / 2000) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateXP(true), 800);
    if (results.perfectScore) {
      setNewBadge(BADGES.quiz_master);
    }
    return () => clearTimeout(timer);
  }, [results.perfectScore]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen bg-uae-dark flex flex-col overflow-hidden">
      {showConfetti && <Confetti />}
      <UAEFlagStripe height={5} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">

          {/* Module badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center mb-4"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: `${module.color}20`, color: module.color, border: `1px solid ${module.color}40` }}
            >
              <span>{module.icon}</span>
              <span>{module.title}</span>
            </div>
          </motion.div>

          {/* Falcon */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-2"
          >
            <FalconMascot size={90} animated={results.stars >= 2} />
          </motion.div>

          {/* Performance message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl font-bold mb-1" style={{ color: perf.color }}>{perf.title}</h1>
            <p className="text-white/60 text-sm">{perf.subtitle}</p>
          </motion.div>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-3 mb-6"
          >
            {[0, 1, 2].map(i => (
              <AnimatedStar key={i} delay={0.6 + i * 0.2} filled={i < results.stars} />
            ))}
          </motion.div>

          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-uae-navy/60 border border-uae-gold/20 rounded-2xl p-5 mb-4"
            style={{ boxShadow: '0 0 30px rgba(200,168,64,0.1)' }}
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-uae-gold">{results.score}/{results.total}</div>
                <div className="text-white/40 text-xs mt-1">Correct</div>
              </div>
              <div className="text-center border-x border-white/10">
                <motion.div
                  className="text-3xl font-bold text-uae-green"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animateXP ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  +{results.xpEarned}
                </motion.div>
                <div className="text-white/40 text-xs mt-1">XP Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {'★'.repeat(results.stars)}{'☆'.repeat(3 - results.stars)}
                </div>
                <div className="text-white/40 text-xs mt-1">Rating</div>
              </div>
            </div>

            {/* New XP bar */}
            <div>
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Level {studentData.level}</span>
                <span>{studentData.xp} / 2000 XP</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full xp-bar-fill rounded-full"
                  initial={{ width: `${Math.round(((studentData.xp - results.xpEarned) / 2000) * 100)}%` }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* New badge (if earned) */}
          <AnimatePresence>
            {newBadge && results.perfectScore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', delay: 1.2 }}
                className="bg-uae-navy/60 border border-uae-gold/30 rounded-2xl p-4 mb-4 text-center"
                style={{ boxShadow: '0 0 20px rgba(200,168,64,0.2)' }}
              >
                <div className="text-xs text-uae-gold/60 uppercase tracking-wider mb-2">🎊 New Badge Unlocked!</div>
                <div className="text-4xl mb-1">{newBadge.icon}</div>
                <div className="font-bold text-white">{newBadge.name}</div>
                <div className="text-white/50 text-xs mt-1">{newBadge.desc}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Correct/Wrong breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-uae-navy/40 rounded-xl p-4 mb-4"
          >
            <div className="text-white/50 text-xs mb-3 text-center uppercase tracking-wider">Performance Summary</div>
            <div className="flex justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-uae-green">{results.score}</div>
                <div className="text-white/40 text-xs">✓ Correct</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-uae-red">{results.total - results.score}</div>
                <div className="text-white/40 text-xs">✗ Incorrect</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-uae-gold">
                  {Math.round((results.score / results.total) * 100)}%
                </div>
                <div className="text-white/40 text-xs">Accuracy</div>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="w-full py-4 rounded-xl font-bold text-white text-base"
              style={{
                background: 'linear-gradient(135deg, #009A44, #006B30)',
                boxShadow: '0 4px 20px rgba(0,154,68,0.4)',
              }}
            >
              🗺️ Continue Journey
            </motion.button>

            <button
              onClick={() => {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
              }}
              className="w-full py-3 rounded-xl text-uae-gold border border-uae-gold/30 text-sm font-semibold hover:bg-uae-gold/5 transition-colors"
            >
              🎊 Share Achievement
            </button>
          </motion.div>

          {/* Motivational footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-6 text-white/30 text-xs"
          >
            <div className="mb-1">🇦🇪 UAE Mathematics Curriculum</div>
            <div>Building tomorrow&apos;s innovators today</div>
          </motion.div>
        </div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
