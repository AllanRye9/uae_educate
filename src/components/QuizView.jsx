import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UAEFlagStripe } from './UAEPatterns';
import { useSound } from '../context/SoundContext';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizView({ module, onComplete, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [xpEarned, setXpEarned] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { playCorrect, playWrong, playTimeUp } = useSound();

  const questions = module.quiz;
  const question = questions[current];
  const isLast = current === questions.length - 1;

  useEffect(() => {
    if (!timerActive || answered) return;
    if (timeLeft <= 0) {
      playTimeUp();
      handleAnswer(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timerActive, answered]);

  useEffect(() => {
    setTimeLeft(30);
    setTimerActive(true);
    setSelected(null);
    setAnswered(false);
    setShowExplanation(false);
  }, [current]);

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setTimerActive(false);

    const isCorrect = idx === question.correct;
    const xp = isCorrect ? Math.ceil(module.xpReward / questions.length) + (timeLeft > 20 ? 10 : 0) : 0;
    setXpEarned(prev => prev + xp);
    setScore(prev => prev + (isCorrect ? 1 : 0));
    setAnswers(prev => [...prev, { questionIdx: current, selected: idx, correct: isCorrect }]);

    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }

    setTimeout(() => setShowExplanation(true), 400);
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = score + (selected === question.correct ? 1 : 0);
      const stars = finalScore >= questions.length ? 3
        : finalScore >= Math.ceil(questions.length * 0.6) ? 2
        : finalScore >= Math.ceil(questions.length * 0.4) ? 1 : 0;
      onComplete({
        score: finalScore,
        total: questions.length,
        stars,
        xpEarned: xpEarned,
        module,
        perfectScore: finalScore === questions.length,
      });
    } else {
      setCurrent(prev => prev + 1);
    }
  };

  const timerPercent = (timeLeft / 30) * 100;
  const timerColor = timeLeft > 15 ? '#009A44' : timeLeft > 8 ? '#C8A840' : '#CE1126';

  return (
    <div className="min-h-screen bg-uae-dark flex flex-col">
      <UAEFlagStripe height={5} />

      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-uae-navy/50 border-b border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="text-white/50 hover:text-white text-sm transition-colors">← Lesson</button>
            <div className="flex items-center gap-2">
              <span className="text-uae-gold text-sm font-bold">Q {current + 1}/{questions.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-uae-gold font-bold text-sm">+{xpEarned} XP</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${module.color}, ${module.color}AA)` }}
              animate={{ width: `${(current / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${timerPercent}%`, backgroundColor: timerColor, transition: 'width 1s linear, background-color 0.3s' }}
              />
            </div>
            <span className="text-xs font-bold" style={{ color: timerColor, minWidth: 24 }}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
            >
              {/* Question card */}
              <div
                className="rounded-2xl p-5 mb-5 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${module.color}15, transparent)`,
                  border: `1px solid ${module.color}30`,
                }}
              >
                <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">Question {current + 1}</div>
                <p className="text-white text-lg font-semibold leading-snug">{question.q}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {question.options.map((option, i) => {
                  let style = {};

                  if (answered) {
                    if (i === question.correct) {
                      style = { background: 'rgba(0,154,68,0.2)', border: '2px solid #009A44', boxShadow: '0 0 12px rgba(0,154,68,0.3)' };
                    } else if (i === selected && i !== question.correct) {
                      style = { background: 'rgba(206,17,38,0.2)', border: '2px solid #CE1126' };
                    } else {
                      style = { opacity: 0.4 };
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={!answered ? { scale: 1.02, x: 4 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: answered ? undefined : 'rgba(255,255,255,0.05)',
                        border: answered ? undefined : '1px solid rgba(255,255,255,0.1)',
                        cursor: answered ? 'default' : 'pointer',
                        ...style,
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: answered && i === question.correct ? '#009A44' :
                            answered && i === selected && i !== question.correct ? '#CE1126' :
                            'rgba(255,255,255,0.1)',
                          color: 'white',
                        }}
                      >
                        {answered && i === question.correct ? '✓' :
                         answered && i === selected && i !== question.correct ? '✗' :
                         OPTION_LETTERS[i]}
                      </span>
                      <span className="text-white/90 text-sm">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="rounded-xl p-4 mb-4"
                      style={{
                        background: selected === question.correct
                          ? 'rgba(0,154,68,0.1)' : 'rgba(206,17,38,0.1)',
                        border: `1px solid ${selected === question.correct ? '#009A44' : '#CE1126'}40`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{selected === question.correct ? '🎉' : '💡'}</span>
                        <span className="font-bold text-sm" style={{ color: selected === question.correct ? '#009A44' : '#CE1126' }}>
                          {selected === question.correct ? 'Correct! Well done!' : "Not quite — here's why:"}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{question.explanation}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-xl font-bold text-sm"
                      style={{
                        background: isLast
                          ? 'linear-gradient(135deg, #C8A840, #FFD700)'
                          : `linear-gradient(135deg, ${module.color}, ${module.color}BB)`,
                        color: isLast ? '#0D1B2A' : 'white',
                        boxShadow: `0 4px 15px ${module.color}50`,
                      }}
                    >
                      {isLast ? '🏁 See Results' : 'Next Question →'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Score dots */}
              <div className="flex gap-2 justify-center mt-4">
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: a.correct ? '#009A44' : '#CE1126' }}
                  />
                ))}
                {Array.from({ length: questions.length - answers.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-white/10" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
