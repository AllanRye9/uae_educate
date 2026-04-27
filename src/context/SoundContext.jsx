'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const SoundContext = createContext(null);

function createAudioContext() {
  if (typeof window === 'undefined') return null;
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(ctx, freq, type, duration, gainVal = 0.25) {
  if (!ctx) return;
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // ignore audio errors
  }
}

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!soundEnabled) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [soundEnabled]);

  const playCorrect = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    playTone(ctx, 523, 'sine', 0.15);
    setTimeout(() => playTone(ctx, 659, 'sine', 0.15), 120);
    setTimeout(() => playTone(ctx, 784, 'sine', 0.25), 240);
  }, [getCtx]);

  const playWrong = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    playTone(ctx, 300, 'sawtooth', 0.15, 0.15);
    setTimeout(() => playTone(ctx, 250, 'sawtooth', 0.2, 0.15), 150);
  }, [getCtx]);

  const playTimeUp = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    playTone(ctx, 440, 'square', 0.1, 0.15);
    setTimeout(() => playTone(ctx, 330, 'square', 0.2, 0.15), 110);
  }, [getCtx]);

  const playXP = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    [0, 80, 160].forEach((delay, i) => {
      setTimeout(() => playTone(ctx, 440 + i * 110, 'sine', 0.12, 0.18), delay);
    });
  }, [getCtx]);

  const playStar = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    [0, 100, 200].forEach((delay, i) => {
      setTimeout(() => playTone(ctx, 600 + i * 150, 'sine', 0.18, 0.2), delay);
    });
  }, [getCtx]);

  const playClick = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    playTone(ctx, 800, 'sine', 0.05, 0.1);
  }, [getCtx]);

  const toggleSound = useCallback(() => setSoundEnabled(prev => !prev), []);

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      toggleSound,
      playCorrect,
      playWrong,
      playTimeUp,
      playXP,
      playStar,
      playClick,
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
