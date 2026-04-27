/**
 * Pure game-logic helpers – no React, no browser APIs.
 * Kept here so they can be tested independently of components.
 */

/**
 * Calculate the player level from total XP.
 * @param {number} xp
 * @param {number} xpPerLevel
 * @returns {number}
 */
export function calcLevel(xp, xpPerLevel) {
  return Math.floor(xp / xpPerLevel) + 1;
}

/**
 * Calculate star rating from quiz score.
 * @param {number} score     – number correct
 * @param {number} total     – total questions
 * @returns {0|1|2|3}
 */
export function calcStars(score, total) {
  if (total <= 0) return 0;
  if (score >= total) return 3;
  if (score >= Math.ceil(total * 0.6)) return 2;
  if (score >= Math.ceil(total * 0.4)) return 1;
  return 0;
}

/**
 * Calculate XP earned for a single question.
 * @param {number} moduleXpReward  – total XP awarded for the whole module
 * @param {number} questionCount
 * @param {number} timeLeft        – seconds remaining on the timer
 * @returns {number}
 */
export function calcQuestionXP(moduleXpReward, questionCount, timeLeft) {
  const base = Math.ceil(moduleXpReward / questionCount);
  const bonus = timeLeft > 20 ? 10 : 0;
  return base + bonus;
}

/**
 * Determine which modules should be unlocked after completing a module.
 * Returns a copy of the status overrides map with the completed module
 * marked and the next one unlocked (if any).
 *
 * @param {object}   overrides       – current per-module overrides for the course
 * @param {Array}    baseModules     – original module array (ordered)
 * @param {number|string} completedId – id of the module just finished
 * @param {number}   stars           – stars earned
 * @returns {object}                 – updated overrides (pure, no mutation)
 */
export function applyModuleUnlock(overrides, baseModules, completedId, stars) {
  const idx = baseModules.findIndex((m) => m.id === completedId);
  if (idx === -1) return overrides;

  const next = { ...overrides };
  next[completedId] = { status: 'completed', stars };

  if (idx + 1 < baseModules.length) {
    const nextId = baseModules[idx + 1].id;
    const existing = next[nextId];
    if (!existing || existing.status === 'locked') {
      next[nextId] = { status: 'active', stars: 0 };
    }
  }
  return next;
}

/**
 * Calculate pearls earned from a quiz result.
 * @param {number} stars
 * @param {number} pearlsPerStar
 * @returns {number}
 */
export function calcPearls(stars, pearlsPerStar) {
  return stars * pearlsPerStar;
}
