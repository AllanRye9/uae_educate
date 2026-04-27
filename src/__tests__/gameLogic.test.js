import { describe, it, expect } from 'vitest';
import {
  calcLevel,
  calcStars,
  calcQuestionXP,
  applyModuleUnlock,
  calcPearls,
} from '../lib/gameLogic';

// ─── calcLevel ──────────────────────────────────────────────────────────────

describe('calcLevel', () => {
  it('returns level 1 at 0 XP', () => {
    expect(calcLevel(0, 2000)).toBe(1);
  });

  it('returns level 1 for XP below threshold', () => {
    expect(calcLevel(1999, 2000)).toBe(1);
  });

  it('returns level 2 at exactly xpPerLevel', () => {
    expect(calcLevel(2000, 2000)).toBe(2);
  });

  it('returns level 3 at twice xpPerLevel', () => {
    expect(calcLevel(4000, 2000)).toBe(3);
  });

  it('handles non-standard xpPerLevel', () => {
    expect(calcLevel(500, 100)).toBe(6);
  });
});

// ─── calcStars ───────────────────────────────────────────────────────────────

describe('calcStars', () => {
  it('returns 3 stars for perfect score', () => {
    expect(calcStars(5, 5)).toBe(3);
  });

  it('returns 2 stars for ≥60%', () => {
    expect(calcStars(3, 5)).toBe(2);
  });

  it('returns 1 star for ≥40%', () => {
    expect(calcStars(2, 5)).toBe(1);
  });

  it('returns 0 stars for below 40%', () => {
    expect(calcStars(1, 5)).toBe(0);
    expect(calcStars(0, 5)).toBe(0);
  });

  it('handles edge case of 0 total', () => {
    expect(calcStars(0, 0)).toBe(0);
  });
});

// ─── calcQuestionXP ──────────────────────────────────────────────────────────

describe('calcQuestionXP', () => {
  it('gives base XP proportional to module reward', () => {
    expect(calcQuestionXP(150, 5, 10)).toBe(30); // Math.ceil(150/5)=30, no speed bonus
  });

  it('adds speed bonus when >20s remaining', () => {
    expect(calcQuestionXP(150, 5, 25)).toBe(40); // 30 + 10
  });

  it('no bonus at exactly 20s remaining', () => {
    expect(calcQuestionXP(100, 5, 20)).toBe(20); // Math.ceil(100/5)=20, no bonus
  });

  it('rounds up fractional base XP', () => {
    expect(calcQuestionXP(100, 3, 5)).toBe(34); // Math.ceil(100/3)=34
  });
});

// ─── applyModuleUnlock ────────────────────────────────────────────────────────

const BASE_MODULES = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },
];

describe('applyModuleUnlock', () => {
  it('marks completed module and unlocks next', () => {
    const result = applyModuleUnlock({}, BASE_MODULES, 1, 3);
    expect(result[1]).toEqual({ status: 'completed', stars: 3 });
    expect(result[2]).toEqual({ status: 'active', stars: 0 });
  });

  it('does not override an already-active or completed next module', () => {
    const overrides = { 2: { status: 'completed', stars: 2 } };
    const result = applyModuleUnlock(overrides, BASE_MODULES, 1, 3);
    expect(result[2]).toEqual({ status: 'completed', stars: 2 });
  });

  it('does not unlock beyond the last module', () => {
    const result = applyModuleUnlock({}, BASE_MODULES, 4, 2);
    expect(result[4]).toEqual({ status: 'completed', stars: 2 });
    expect(result[5]).toBeUndefined();
  });

  it('returns unchanged overrides for unknown module id', () => {
    const overrides = { 1: { status: 'active', stars: 0 } };
    const result = applyModuleUnlock(overrides, BASE_MODULES, 99, 3);
    expect(result).toEqual(overrides);
  });

  it('does not mutate the original overrides object', () => {
    const original = {};
    applyModuleUnlock(original, BASE_MODULES, 1, 3);
    expect(original).toEqual({});
  });
});

// ─── calcPearls ───────────────────────────────────────────────────────────────

describe('calcPearls', () => {
  it('calculates pearls for 3 stars', () => {
    expect(calcPearls(3, 15)).toBe(45);
  });

  it('calculates pearls for 0 stars', () => {
    expect(calcPearls(0, 15)).toBe(0);
  });

  it('uses custom pearlsPerStar value', () => {
    expect(calcPearls(2, 20)).toBe(40);
  });
});
