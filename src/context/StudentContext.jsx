'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { XP_PER_LEVEL, PEARLS_PER_STAR } from '../data/courseData';
import { COURSE_MODULES } from '../lib/courseModules';

const STORAGE_KEY = 'uae_edulearn_student';
const STATUSES_KEY = 'uae_edulearn_statuses';
const RESULTS_KEY = 'uae_edulearn_results';

export const DEFAULT_STUDENT_DATA = {
  name: 'Student',
  avatar: '🦅',
  preferredGrade: null,
  xp: 0,
  totalStars: 0,
  streak: 0,
  level: 1,
  pearls: 0,
  badges: [],
};

function loadJSON(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveJSON(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [studentData, setStudentDataRaw] = useState(DEFAULT_STUDENT_DATA);
  const [moduleStatuses, setModuleStatusesRaw] = useState({});
  const [quizResults, setQuizResultsRaw] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on first mount (client-only)
  useEffect(() => {
    const savedStudent = loadJSON(STORAGE_KEY);
    const savedStatuses = loadJSON(STATUSES_KEY);
    const savedResults = loadJSON(RESULTS_KEY);
    if (savedStudent) setStudentDataRaw(savedStudent);
    if (savedStatuses) setModuleStatusesRaw(savedStatuses);
    if (savedResults) setQuizResultsRaw(savedResults);
    setHydrated(true);
  }, []);

  const setStudentData = useCallback((updater) => {
    setStudentDataRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveJSON(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const setModuleStatuses = useCallback((updater) => {
    setModuleStatusesRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveJSON(STATUSES_KEY, next);
      return next;
    });
  }, []);

  const setQuizResults = useCallback((results) => {
    setQuizResultsRaw(results);
    if (results) {
      saveJSON(RESULTS_KEY, results);
    } else {
      try { localStorage.removeItem(RESULTS_KEY); } catch { /* ignore */ }
    }
  }, []);

  /** Called from onboarding completion */
  const handleOnboardingComplete = useCallback(({ name, avatar, grade }) => {
    setStudentData((prev) => ({ ...prev, name, avatar, preferredGrade: grade }));
  }, [setStudentData]);

  /** Get modules for a course with runtime status overrides applied */
  const getModulesForCourse = useCallback((course) => {
    if (!course) return [];
    const base = COURSE_MODULES[course.dataKey] ?? [];
    const overrides = moduleStatuses[course.id] ?? {};
    return base.map((m) => ({
      ...m,
      status: overrides[m.id]?.status ?? m.status,
      stars: overrides[m.id]?.stars ?? m.stars,
    }));
  }, [moduleStatuses]);

  /** Unlock the next module after a quiz is completed */
  const unlockNextModule = useCallback((courseId, dataKey, completedModuleId, stars) => {
    const base = COURSE_MODULES[dataKey] ?? [];
    const idx = base.findIndex((m) => m.id === completedModuleId);
    if (idx === -1) return;

    setModuleStatuses((prev) => {
      const courseOverrides = { ...(prev[courseId] ?? {}) };
      courseOverrides[completedModuleId] = { status: 'completed', stars };
      if (idx + 1 < base.length) {
        const nextId = base[idx + 1].id;
        if (!courseOverrides[nextId] || courseOverrides[nextId].status === 'locked') {
          courseOverrides[nextId] = { status: 'active', stars: 0 };
        }
      }
      return { ...prev, [courseId]: courseOverrides };
    });
  }, [setModuleStatuses]);

  /** Called when a quiz is completed; updates XP, stars, pearls, unlocks next module */
  const handleQuizComplete = useCallback((results, course) => {
    const newXP = studentData.xp + results.xpEarned;
    const newStars = studentData.totalStars + results.stars;
    const pearlsEarned = results.stars * PEARLS_PER_STAR;

    setStudentData((prev) => ({
      ...prev,
      xp: newXP,
      totalStars: newStars,
      level: Math.floor(newXP / XP_PER_LEVEL) + 1,
      pearls: (prev.pearls ?? 0) + pearlsEarned,
    }));

    if (results.stars >= 2 && results.moduleId) {
      unlockNextModule(course.id, course.dataKey, results.moduleId, results.stars);
    }

    setQuizResults(results);
  }, [studentData.xp, studentData.totalStars, setStudentData, setQuizResults, unlockNextModule]);

  return (
    <StudentContext.Provider value={{
      studentData,
      setStudentData,
      moduleStatuses,
      quizResults,
      setQuizResults,
      hydrated,
      handleOnboardingComplete,
      getModulesForCourse,
      handleQuizComplete,
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
}
