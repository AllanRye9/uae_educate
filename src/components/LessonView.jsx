'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UAEFlagStripe } from './UAEPatterns';
import CellDiagram from './CellDiagram';
import WordScramble from './WordScramble';

function renderContent(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;

    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1
        ? <strong key={j} className="text-uae-gold font-bold">{part}</strong>
        : part
    );

    if (line.startsWith('• ')) {
      return (
        <div key={i} className="flex items-start gap-2 my-1">
          <span className="text-uae-gold mt-0.5">•</span>
          <span>{rendered.slice(1)}</span>
        </div>
      );
    }
    return <p key={i} className="my-1 leading-relaxed">{rendered}</p>;
  });
}

function LessonVisual({ type, color, scrambleWord, scrambleHint }) {
  const visuals = {
    book: (
      <div className="flex items-center justify-center gap-6 p-6">
        <div className="text-6xl animate-float">📖</div>
        <div className="text-left">
          <div className="text-uae-gold text-3xl font-bold font-display">الجبر</div>
          <div className="text-white/60 text-sm">Al-Jabr</div>
          <div className="text-white/40 text-xs mt-1">&quot;Reunion of broken parts&quot;</div>
        </div>
      </div>
    ),
    applications: (
      <div className="grid grid-cols-2 gap-3 p-4">
        {['🏗️ Architecture', '🚀 Space', '💰 Business', '🌊 Engineering'].map(item => (
          <div key={item} className="bg-white/5 rounded-xl p-3 text-center text-sm text-white/70">
            {item}
          </div>
        ))}
      </div>
    ),
    variables: (
      <div className="p-4 text-center">
        <div className="inline-block bg-uae-navy rounded-xl p-4 border border-uae-gold/30">
          <div className="text-4xl font-bold mb-2">
            <span className="text-uae-gold">x</span>
            <span className="text-white"> - </span>
            <span className="text-white">15</span>
          </div>
          <div className="flex gap-6 text-xs text-white/50 justify-center">
            <div><span className="text-uae-gold block text-sm font-bold">x</span>Variable</div>
            <div><span className="text-white/80 block text-sm font-bold">15</span>Constant</div>
          </div>
        </div>
      </div>
    ),
    expression: (
      <div className="p-4 text-center">
        <div className="inline-block bg-uae-navy rounded-xl p-4 border border-uae-gold/30">
          <div className="text-3xl font-mono font-bold mb-3">
            <span className="text-uae-red">3</span>
            <span className="text-uae-gold">x</span>
            <span className="text-white"> + </span>
            <span className="text-uae-green">5</span>
          </div>
          <div className="flex gap-4 text-xs justify-center">
            <div className="text-center"><div className="w-3 h-3 bg-uae-red rounded-full mx-auto mb-1" /><span className="text-white/50">coefficient</span></div>
            <div className="text-center"><div className="w-3 h-3 bg-uae-gold rounded-full mx-auto mb-1" /><span className="text-white/50">variable</span></div>
            <div className="text-center"><div className="w-3 h-3 bg-uae-green rounded-full mx-auto mb-1" /><span className="text-white/50">constant</span></div>
          </div>
        </div>
      </div>
    ),
    simplify: (
      <div className="p-4 text-center">
        <div className="space-y-2 font-mono text-sm">
          <div className="text-white/70">3x + 2x + 7</div>
          <div className="text-uae-gold/60 text-xs">↓ combine like terms</div>
          <div className="text-2xl font-bold text-uae-gold">5x + 7</div>
        </div>
      </div>
    ),
    evaluate: (
      <div className="p-4 text-center">
        <div className="font-mono space-y-1 text-sm">
          <div className="text-white/70">2x + 3 when x = 4</div>
          <div className="text-white/50 text-xs">↓ substitute</div>
          <div className="text-white/70">2(4) + 3</div>
          <div className="text-white/50 text-xs">↓ calculate</div>
          <div className="text-2xl font-bold text-uae-green">= 11 ✓</div>
        </div>
      </div>
    ),
    balance: (
      <div className="p-4 text-center">
        <div className="text-5xl mb-2">⚖️</div>
        <div className="font-mono text-sm">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-uae-gold/20 rounded-lg p-2 text-uae-gold font-bold">x + 3</div>
            <div className="text-white">=</div>
            <div className="bg-uae-green/20 rounded-lg p-2 text-uae-green font-bold">7</div>
          </div>
        </div>
      </div>
    ),
    onestep: (
      <div className="p-4 text-center font-mono text-sm space-y-1">
        <div className="text-white/70">x + 5 = 12</div>
        <div className="text-uae-gold/60 text-xs">subtract 5 from both sides</div>
        <div className="text-white/70">x + 5 - 5 = 12 - 5</div>
        <div className="text-2xl font-bold text-uae-gold">x = 7 ✓</div>
      </div>
    ),
    twostep: (
      <div className="p-4 text-center font-mono text-sm space-y-1">
        <div className="text-white/70">2x + 3 = 11</div>
        <div className="text-uae-gold/60 text-xs">step 1: subtract 3</div>
        <div className="text-white/70">2x = 8</div>
        <div className="text-uae-gold/60 text-xs">step 2: divide by 2</div>
        <div className="text-2xl font-bold text-uae-green">x = 4 ✓</div>
      </div>
    ),
    // ── Science Grade 4 visuals ──
    ecosystem: (
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {['🏜️ Desert', '🌊 Marine', '🌴 Mangrove'].map(e => (
            <div key={e} className="bg-white/5 rounded-xl p-3 text-sm text-white/70">{e}</div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 text-2xl">
          <span>🌱</span><span className="text-white/40 text-sm">+</span>
          <span>☀️</span><span className="text-white/40 text-sm">+</span>
          <span>💧</span><span className="text-white/40 text-sm">=</span>
          <span>🌍</span>
        </div>
      </div>
    ),
    foodchain: (
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-2xl flex-wrap">
          <span>🌳</span>
          <span className="text-uae-gold text-sm">→</span>
          <span>🦌</span>
          <span className="text-uae-gold text-sm">→</span>
          <span>🐺</span>
          <span className="text-uae-gold text-sm">→</span>
          <span>🍂</span>
        </div>
        <div className="mt-2 text-xs text-white/40">
          Producer → Primary → Secondary → Decomposer
        </div>
      </div>
    ),
    conservation: (
      <div className="grid grid-cols-2 gap-3 p-4">
        {['🦁 Arabian Oryx', '🐢 Sea Turtles', '🌴 Mangroves', '🌳 Ghaf Tree'].map(item => (
          <div key={item} className="bg-white/5 rounded-xl p-3 text-center text-sm text-white/70">{item}</div>
        ))}
      </div>
    ),
    energy: (
      <div className="grid grid-cols-3 gap-2 p-4 text-center">
        {[['☀️', 'Light'], ['🔥', 'Heat'], ['⚡', 'Electrical'], ['🔊', 'Sound'], ['🏃', 'Kinetic'], ['⛽', 'Chemical']].map(([icon, label]) => (
          <div key={label} className="bg-white/5 rounded-xl p-2">
            <div className="text-2xl">{icon}</div>
            <div className="text-white/50 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>
    ),
    solar: (
      <div className="p-4 text-center">
        <div className="text-5xl mb-2 animate-float">☀️</div>
        <div className="font-mono text-sm space-y-1">
          <div className="text-white/70">Sunlight hits panel</div>
          <div className="text-uae-gold/60 text-xs">↓</div>
          <div className="text-white/70">Electrons energized</div>
          <div className="text-uae-gold/60 text-xs">↓</div>
          <div className="text-2xl font-bold text-uae-gold">⚡ Electricity!</div>
        </div>
      </div>
    ),
    saveenergy: (
      <div className="grid grid-cols-2 gap-2 p-4">
        {['💡 Switch off lights', '❄️ Set AC to 24°C', '🚿 Shorter showers', '📱 Unplug chargers'].map(tip => (
          <div key={tip} className="bg-uae-green/10 border border-uae-green/20 rounded-xl p-2 text-xs text-white/70 text-center">{tip}</div>
        ))}
      </div>
    ),
    solarsystem: (
      <div className="p-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-lg min-w-max mx-auto justify-center">
          {['☀️', '☿', '♀️', '🌍', '♂️', '♃', '♄', '♅', '♆'].map((p, i) => (
            <span key={i} style={{ fontSize: i === 0 ? 28 : 18 }}>{p}</span>
          ))}
        </div>
        <div className="text-center text-xs text-white/40 mt-2">Our Solar System — 8 planets</div>
      </div>
    ),
    hopemission: (
      <div className="p-4 text-center">
        <div className="text-5xl mb-2 animate-float">🚀</div>
        <div className="text-uae-gold font-bold">مسبار الأمل</div>
        <div className="text-white/60 text-sm">Hope Probe</div>
        <div className="flex justify-center gap-4 mt-3 text-xs text-white/50">
          <div>🇦🇪 UAE</div>
          <div>→ 400M km →</div>
          <div>🔴 Mars</div>
        </div>
      </div>
    ),
    stars: (
      <div className="p-4 text-center">
        <div className="text-4xl mb-2">✨🌟⭐🌠✨</div>
        <div className="text-sm text-white/60">Arabic star names we still use today:</div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          <div className="bg-white/5 rounded-lg p-2"><span className="text-uae-gold">Betelgeuse</span><br /><span className="text-white/40">إبط الجوزاء</span></div>
          <div className="bg-white/5 rounded-lg p-2"><span className="text-uae-gold">Aldebaran</span><br /><span className="text-white/40">الدبران</span></div>
        </div>
      </div>
    ),
    // ── Science Grade 8 visuals ──
    cell: (
      <div className="p-4 text-center">
        <div className="text-5xl mb-2">🔬</div>
        <div className="flex justify-center gap-4 text-xs">
          <div className="bg-uae-green/10 border border-uae-green/20 rounded-lg p-2 text-white/70">Prokaryotic<br /><span className="text-white/40">No nucleus</span></div>
          <div className="bg-uae-gold/10 border border-uae-gold/20 rounded-lg p-2 text-white/70">Eukaryotic<br /><span className="text-white/40">Has nucleus</span></div>
        </div>
      </div>
    ),
    organelles: (
      <div className="grid grid-cols-2 gap-2 p-3 text-xs">
        {[['🧠', 'Nucleus', 'DNA control'], ['⚡', 'Mitochondria', 'Energy (ATP)'], ['🏭', 'Ribosome', 'Proteins'], ['📦', 'Golgi', 'Packaging']].map(([icon, name, desc]) => (
          <div key={name} className="bg-white/5 rounded-lg p-2 flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <div><div className="text-white/80 font-semibold">{name}</div><div className="text-white/40">{desc}</div></div>
          </div>
        ))}
      </div>
    ),
    celldivision: (
      <div className="p-4 text-center font-mono text-sm space-y-1">
        <div className="text-uae-gold font-bold">PMAT</div>
        {[['P', 'Prophase'], ['M', 'Metaphase'], ['A', 'Anaphase'], ['T', 'Telophase']].map(([letter, name]) => (
          <div key={letter} className="flex justify-center gap-2 text-xs text-white/60">
            <span className="text-uae-gold font-bold w-4">{letter}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    ),
    atoms: (
      <div className="p-4 text-center">
        <div className="inline-block">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-uae-navy border-2 border-uae-gold flex items-center justify-center text-xs font-bold text-uae-gold">p⊕n</div>
            </div>
            <div className="absolute inset-0 border-2 border-uae-gold/30 rounded-full" />
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <div className="text-uae-red">⊕ Proton</div>
          <div className="text-white/50">○ Neutron</div>
          <div className="text-uae-gold">⊖ Electron</div>
        </div>
      </div>
    ),
    matter: (
      <div className="flex justify-center gap-4 p-4">
        {[['🧊', 'Solid', 'Fixed shape\n& volume'], ['💧', 'Liquid', 'Fixed volume\nnot shape'], ['💨', 'Gas', 'No fixed\nshape']].map(([icon, name, desc]) => (
          <div key={name} className="text-center">
            <div className="text-3xl mb-1">{icon}</div>
            <div className="text-white/80 text-xs font-semibold">{name}</div>
            <div className="text-white/40 text-xs">{desc}</div>
          </div>
        ))}
      </div>
    ),
    reactions: (
      <div className="p-4 text-center font-mono text-sm space-y-2">
        <div className="text-white/70">2H₂ + O₂</div>
        <div className="text-uae-gold/60 text-xs">chemical reaction →</div>
        <div className="text-2xl font-bold text-uae-green">2H₂O 💧</div>
        <div className="text-white/40 text-xs">Water!</div>
      </div>
    ),
    newton: (
      <div className="p-4 space-y-2">
        {[['1st', 'Inertia: no force = no change'], ['2nd', 'F = ma'], ['3rd', 'Every action → equal & opposite reaction']].map(([law, desc]) => (
          <div key={law} className="flex gap-2 text-xs items-start">
            <span className="text-uae-gold font-bold whitespace-nowrap">{law} Law:</span>
            <span className="text-white/70">{desc}</span>
          </div>
        ))}
      </div>
    ),
    forces: (
      <div className="grid grid-cols-2 gap-2 p-4 text-xs">
        {[['🌍', 'Gravity'], ['🧲', 'Magnetic'], ['⚡', 'Electrostatic'], ['💨', 'Air Resistance']].map(([icon, name]) => (
          <div key={name} className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-2xl">{icon}</div>
            <div className="text-white/60 mt-1">{name}</div>
          </div>
        ))}
      </div>
    ),
    energy8: (
      <div className="p-4 text-center space-y-2 text-sm">
        <div className="flex justify-center gap-6">
          <div className="text-center"><div className="text-3xl">🎢</div><div className="text-white/60 text-xs">Top = Max PE</div></div>
          <div className="text-uae-gold/60 text-2xl">→</div>
          <div className="text-center"><div className="text-3xl">🏎️</div><div className="text-white/60 text-xs">Bottom = Max KE</div></div>
        </div>
        <div className="text-uae-gold/80 text-xs">W = Force × Distance (Joules)</div>
      </div>
    ),
  };

  // Special interactive visuals that render outside the static map
  if (type === 'cell_interactive') {
    return (
      <div
        className="rounded-2xl mb-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)`, border: `1px solid ${color}30` }}
      >
        <CellDiagram />
      </div>
    );
  }

  if (type === 'scramble' && scrambleWord) {
    return (
      <div
        className="rounded-2xl mb-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)`, border: `1px solid ${color}30` }}
      >
        <WordScramble word={scrambleWord} hint={scrambleHint} />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl mb-4 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)`, border: `1px solid ${color}30` }}
    >
      {visuals[type] || (
        <div className="p-6 text-center text-4xl">
          📐
        </div>
      )}
    </div>
  );
}

export default function LessonView({ module, onStartQuiz, onBack }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [xpCollected, setXpCollected] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);

  const lessons = module.lessons;
  const lesson = lessons[currentLesson];
  const isLast = currentLesson === lessons.length - 1;
  const hasLessons = lessons.length > 0;

  const goNext = () => {
    if (lesson) {
      setXpCollected(prev => prev + lesson.xp);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 1500);
    }
    if (isLast) {
      onStartQuiz();
    } else {
      setCurrentLesson(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentLesson > 0) setCurrentLesson(prev => prev - 1);
  };

  if (!hasLessons) {
    return (
      <div className="min-h-screen bg-uae-dark flex flex-col items-center justify-center p-4">
        <UAEFlagStripe height={5} />
        <div className="text-center">
          <div className="text-5xl mb-4">{module.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">{module.title}</h2>
          <p className="text-white/50 mb-6">Lessons coming soon!</p>
          <button onClick={onBack} className="bg-uae-navy text-uae-gold px-6 py-2 rounded-xl">← Back to Path</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-uae-dark flex flex-col">
      <UAEFlagStripe height={5} />

      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 relative"
        style={{ background: `linear-gradient(135deg, ${module.color}20, transparent)` }}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors">
              ← Path
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">XP earned:</span>
              <span className="text-uae-gold font-bold text-sm">+{xpCollected}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${module.color}20`, border: `2px solid ${module.color}` }}
            >
              {module.icon}
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">{module.title}</h1>
              <div className="text-white/50 text-xs">{module.subtitle}</div>
            </div>
          </div>

          {/* Lesson progress dots */}
          <div className="flex gap-2 mt-3 justify-center">
            {lessons.map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                animate={{
                  width: i === currentLesson ? 24 : 8,
                  backgroundColor: i <= currentLesson ? module.color : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              {/* Lesson title */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: `${module.color}20`, color: module.color, border: `1px solid ${module.color}40` }}
                >
                  +{lesson.xp} XP
                </span>
              </div>

              {/* Visual */}
              <LessonVisual
                type={lesson.visual}
                color={module.color}
                scrambleWord={lesson.scrambleWord}
                scrambleHint={lesson.scrambleHint}
              />

              {/* Content */}
              <div className="bg-uae-navy/50 rounded-2xl p-4 border border-white/5 text-white/85 text-sm leading-relaxed">
                {renderContent(lesson.content)}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-4">
                {currentLesson > 0 && (
                  <button
                    onClick={goPrev}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:border-white/40 transition-colors text-sm"
                  >
                    ← Previous
                  </button>
                )}
                <motion.button
                  onClick={goNext}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm relative overflow-hidden"
                  style={{
                    background: isLast
                      ? 'linear-gradient(135deg, #C8A840, #FFD700)'
                      : `linear-gradient(135deg, ${module.color}, ${module.color}BB)`,
                    color: isLast ? '#0D1B2A' : 'white',
                    boxShadow: `0 4px 15px ${module.color}50`,
                  }}
                >
                  {isLast ? '🎯 Start Quiz' : 'Next Lesson →'}
                </motion.button>
              </div>

              {/* Lesson counter */}
              <p className="text-center text-white/30 text-xs mt-3">
                Lesson {currentLesson + 1} of {lessons.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* XP pop animation */}
      <AnimatePresence>
        {showXpPop && lesson && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed bottom-20 right-6 bg-uae-gold text-uae-dark font-bold px-4 py-2 rounded-full text-sm pointer-events-none z-50"
          >
            +{lesson.xp} XP! ⚡
          </motion.div>
        )}
      </AnimatePresence>

      <UAEFlagStripe height={5} />
    </div>
  );
}
