'use client';

/**
 * DragDropQuiz – a matching-pairs quiz type for kids.
 * Kids drag term chips on the left and drop them onto the correct definition slot.
 * Uses the HTML5 Drag-and-Drop API (no extra libraries).
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

/**
 * Shuffle an array (Fisher-Yates) without mutating the original.
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @param {{
 *   question: { q: string; pairs: {left: string; right: string}[]; explanation: string };
 *   onAnswer: (isCorrect: boolean) => void;
 *   moduleColor: string;
 * }} props
 */
export default function DragDropQuiz({ question, onAnswer, moduleColor }) {
  const { playCorrect, playWrong } = useSound();

  // Right-side definitions presented in shuffled order
  const [shuffledRight] = useState(() => shuffle(question.pairs.map((p) => p.right)));
  // Map: right definition → left term (the drop zones)
  const [matches, setMatches] = useState({});
  // Track which draggable is currently being dragged
  const dragging = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  /** Terms on the left that haven't been matched yet */
  const availableTerms = question.pairs
    .map((p) => p.left)
    .filter((term) => !Object.values(matches).includes(term));

  // ── Drag handlers ────────────────────────────────────────────────────────

  const onDragStart = (term) => {
    dragging.current = term;
  };

  const onDragOver = (e) => {
    e.preventDefault(); // allow drop
  };

  const onDrop = (e, rightSlot) => {
    e.preventDefault();
    if (!dragging.current) return;
    setMatches((prev) => ({ ...prev, [rightSlot]: dragging.current }));
    dragging.current = null;
  };

  /** Remove a match by clicking the placed chip */
  const removeMatch = (rightSlot) => {
    if (submitted) return;
    setMatches((prev) => {
      const next = { ...prev };
      delete next[rightSlot];
      return next;
    });
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const allPlaced = shuffledRight.every((r) => r in matches);

  const handleSubmit = () => {
    if (!allPlaced) return;
    let correct = 0;
    const res = {};
    for (const pair of question.pairs) {
      const matched = matches[pair.right] === pair.left;
      res[pair.right] = matched;
      if (matched) correct++;
    }
    setResults(res);
    setSubmitted(true);
    const allCorrect = correct === question.pairs.length;
    if (allCorrect) {
      playCorrect();
    } else {
      playWrong();
    }
    onAnswer(allCorrect);
  };

  return (
    <div>
      {/* Question header */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{
          background: `linear-gradient(135deg, ${moduleColor}15, transparent)`,
          border: `1px solid ${moduleColor}30`,
        }}
      >
        <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">
          Drag &amp; Match
        </div>
        <p className="text-white text-lg font-semibold leading-snug">{question.q}</p>
      </div>

      {/* Available term bank */}
      {!submitted && (
        <div className="mb-4">
          <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">Terms</div>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            <AnimatePresence>
              {availableTerms.map((term) => (
                <motion.div
                  key={term}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  draggable
                  onDragStart={() => onDragStart(term)}
                  className="px-3 py-1.5 rounded-xl text-sm font-semibold cursor-grab active:cursor-grabbing select-none"
                  style={{
                    background: `${moduleColor}25`,
                    border: `1px solid ${moduleColor}60`,
                    color: moduleColor,
                  }}
                >
                  {term}
                </motion.div>
              ))}
            </AnimatePresence>
            {availableTerms.length === 0 && (
              <span className="text-white/30 text-xs italic">All terms placed</span>
            )}
          </div>
        </div>
      )}

      {/* Drop zones */}
      <div className="space-y-3 mb-5">
        {shuffledRight.map((rightDef) => {
          const matched = matches[rightDef];
          const isCorrect = submitted ? results[rightDef] : null;

          return (
            <div
              key={rightDef}
              className="flex items-center gap-3 rounded-xl p-3 transition-all"
              style={{
                background: submitted
                  ? isCorrect
                    ? 'rgba(0,154,68,0.15)'
                    : matched
                    ? 'rgba(206,17,38,0.15)'
                    : 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.04)',
                border: submitted
                  ? isCorrect
                    ? '2px solid #009A44'
                    : matched
                    ? '2px solid #CE1126'
                    : '1px solid rgba(255,255,255,0.1)'
                  : '1px dashed rgba(255,255,255,0.2)',
              }}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, rightDef)}
            >
              {/* Drop zone for term chip */}
              <div
                className="min-w-[90px] h-9 rounded-lg flex items-center justify-center text-xs font-semibold"
                style={{
                  background: matched ? `${moduleColor}20` : 'rgba(255,255,255,0.05)',
                  border: matched ? `1px solid ${moduleColor}50` : '1px dashed rgba(255,255,255,0.15)',
                  color: matched ? moduleColor : 'rgba(255,255,255,0.3)',
                  cursor: matched && !submitted ? 'pointer' : 'default',
                }}
                onClick={() => removeMatch(rightDef)}
                title={matched && !submitted ? 'Click to remove' : undefined}
              >
                {matched || (submitted && !matched ? '?' : '— drop here —')}
              </div>

              <span className="text-white/70 text-sm flex-1">{rightDef}</span>

              {submitted && (
                <span className="text-base">
                  {isCorrect ? '✅' : '❌'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation after submit */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: 'rgba(200,168,64,0.08)',
                border: '1px solid rgba(200,168,64,0.25)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <span className="text-uae-gold font-bold text-sm">Answer key</span>
              </div>
              <div className="space-y-1">
                {question.pairs.map((pair) => (
                  <div key={pair.left} className="text-white/70 text-xs flex gap-2">
                    <span className="text-uae-gold font-semibold">{pair.left}</span>
                    <span className="text-white/40">→</span>
                    <span>{pair.right}</span>
                  </div>
                ))}
              </div>
              {question.explanation && (
                <p className="text-white/60 text-sm mt-3 leading-relaxed">
                  {question.explanation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      {!submitted && (
        <motion.button
          whileHover={allPlaced ? { scale: 1.02 } : {}}
          whileTap={allPlaced ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={!allPlaced}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
          style={{
            background: allPlaced
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}BB)`
              : 'rgba(255,255,255,0.08)',
            color: allPlaced ? 'white' : 'rgba(255,255,255,0.3)',
            cursor: allPlaced ? 'pointer' : 'not-allowed',
          }}
        >
          {allPlaced ? '✓ Check Matches' : `Place all ${availableTerms.length} remaining term(s)`}
        </motion.button>
      )}
    </div>
  );
}
