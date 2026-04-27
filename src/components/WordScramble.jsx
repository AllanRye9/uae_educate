'use client';

/**
 * WordScramble – letter-tile word-building activity for kids.
 * Displays a scrambled word with clickable letter tiles.
 * Clicking a tile in the bank moves it to the answer row, and vice-versa.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

/**
 * @param {{
 *   word: string;       – correct word (uppercase)
 *   hint: string;       – hint text shown below scrambled tiles
 *   onSolved?: () => void;
 * }} props
 */
export default function WordScramble({ word, hint, onSolved }) {
  const { playCorrect, playWrong, playClick } = useSound();

  // Scramble the word once (stable across re-renders)
  const scrambled = useMemo(() => {
    const letters = word.toUpperCase().split('');
    // Fisher-Yates shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    // If accidental unscramble, swap first two letters
    if (letters.join('') === word.toUpperCase() && letters.length > 1) {
      [letters[0], letters[1]] = [letters[1], letters[0]];
    }
    return letters.map((ch, idx) => ({ id: `${ch}-${idx}`, letter: ch }));
  }, [word]);

  // Tiles still in the bank (available to pick)
  const [bank, setBank] = useState(() => scrambled);
  // Tiles placed in the answer row
  const [answer, setAnswer] = useState([]);
  const [status, setStatus] = useState(null); // null | 'correct' | 'wrong'

  const target = word.toUpperCase();

  // Move tile from bank → answer
  const pickTile = (tile) => {
    if (status) return;
    playClick();
    setBank((b) => b.filter((t) => t.id !== tile.id));
    setAnswer((a) => [...a, tile]);
  };

  // Move tile from answer → bank
  const unpickTile = (tile) => {
    if (status) return;
    playClick();
    setAnswer((a) => a.filter((t) => t.id !== tile.id));
    setBank((b) => [...b, tile]);
  };

  const handleCheck = () => {
    if (answer.length !== target.length) return;
    const formed = answer.map((t) => t.letter).join('');
    if (formed === target) {
      setStatus('correct');
      playCorrect();
      onSolved?.();
    } else {
      setStatus('wrong');
      playWrong();
    }
  };

  const handleReset = () => {
    setBank(scrambled);
    setAnswer([]);
    setStatus(null);
  };

  const tileBase =
    'w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold select-none transition-all';

  return (
    <div className="flex flex-col items-center gap-4 py-3">
      <div className="text-center">
        <div className="text-uae-gold text-sm font-semibold mb-0.5">Word Scramble</div>
        {hint && <div className="text-white/40 text-xs">{hint}</div>}
      </div>

      {/* Answer row */}
      <div className="flex gap-2 min-h-[44px] flex-wrap justify-center">
        {answer.length === 0 && (
          <div className="text-white/20 text-xs self-center">Tap letters below →</div>
        )}
        <AnimatePresence>
          {answer.map((tile) => (
            <motion.button
              key={tile.id}
              layout
              initial={{ scale: 0, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
              onClick={() => unpickTile(tile)}
              className={`${tileBase} cursor-pointer`}
              style={{
                background:
                  status === 'correct'
                    ? 'rgba(0,154,68,0.3)'
                    : status === 'wrong'
                    ? 'rgba(206,17,38,0.3)'
                    : 'rgba(200,168,64,0.2)',
                border: `2px solid ${
                  status === 'correct'
                    ? '#009A44'
                    : status === 'wrong'
                    ? '#CE1126'
                    : '#C8A840'
                }`,
                color:
                  status === 'correct'
                    ? '#009A44'
                    : status === 'wrong'
                    ? '#CE1126'
                    : '#C8A840',
              }}
            >
              {tile.letter}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Status feedback */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-bold"
            style={{ color: status === 'correct' ? '#009A44' : '#CE1126' }}
          >
            {status === 'correct' ? '🎉 Correct! Well done!' : `❌ Not quite — the word is "${target}"`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter bank */}
      <div className="flex gap-2 flex-wrap justify-center min-h-[44px]">
        <AnimatePresence>
          {bank.map((tile) => (
            <motion.button
              key={tile.id}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => pickTile(tile)}
              className={`${tileBase} cursor-pointer`}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              whileHover={{ scale: 1.12, background: 'rgba(200,168,64,0.15)' }}
              whileTap={{ scale: 0.9 }}
            >
              {tile.letter}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {!status && (
          <motion.button
            whileHover={answer.length === target.length ? { scale: 1.05 } : {}}
            whileTap={answer.length === target.length ? { scale: 0.95 } : {}}
            onClick={handleCheck}
            disabled={answer.length !== target.length}
            className="px-5 py-2 rounded-xl text-sm font-bold"
            style={{
              background:
                answer.length === target.length
                  ? 'linear-gradient(135deg, #C8A840, #9a7a20)'
                  : 'rgba(255,255,255,0.08)',
              color: answer.length === target.length ? '#0D1B2A' : 'rgba(255,255,255,0.3)',
              cursor: answer.length === target.length ? 'pointer' : 'not-allowed',
            }}
          >
            Check ✓
          </motion.button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs text-white/40 border border-white/10 hover:text-white/60 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
