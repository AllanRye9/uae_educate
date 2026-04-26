import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UAEFlagStripe, GeometricPattern, FalconMascot, StarBurst } from './UAEPatterns';
import { COURSE_CATALOG } from '../data/courseData';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

const GRADE_LABELS = { 4: 'Grade 4', 8: 'Grade 8' };
const SUBJECT_ICONS = { Mathematics: '📐', Science: '🔬' };

function CourseCard({ course, onSelect, selected }) {
  const { playClick } = useSound();
  const isSelected = selected?.id === course.id;

  return (
    <motion.button
      onClick={() => { playClick(); onSelect(course); }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full rounded-2xl p-5 text-left overflow-hidden transition-all"
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${course.color}30, ${course.color}15)`
          : 'rgba(26,39,68,0.7)',
        border: `2px solid ${isSelected ? course.color : 'rgba(200,168,64,0.15)'}`,
        boxShadow: isSelected ? `0 0 20px ${course.color}40` : 'none',
      }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: course.color, color: '#0D1B2A' }}
        >
          ✓
        </motion.div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: `${course.color}20`, border: `1px solid ${course.color}40` }}
        >
          {course.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Arabic title */}
          <div
            className="text-lg font-bold mb-0.5"
            style={{
              fontFamily: 'Tajawal, sans-serif',
              color: course.color,
            }}
          >
            {course.arabicTitle}
          </div>

          {/* Subject */}
          <div className="text-white font-semibold text-sm">{course.subject}</div>
          <div className="text-white/50 text-xs mt-0.5">{course.description}</div>

          {/* Tags */}
          <div className="flex gap-2 mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${course.color}20`, color: course.color }}
            >
              {course.grade}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">
              {course.banner} {course.subtitle}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function CourseSelector({ onSelectCourse, studentData }) {
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const { soundEnabled, toggleSound, playClick } = useSound();

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = selectedGrade
    ? COURSE_CATALOG.filter(c => c.gradeNum === selectedGrade)
    : COURSE_CATALOG;

  const handleStart = () => {
    if (!selectedCourse) return;
    playClick();
    onSelectCourse(selectedCourse);
  };

  return (
    <div className="min-h-screen bg-uae-dark relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <StarBurst count={60} />
      </div>
      <div className="absolute inset-0 pointer-events-none uae-pattern opacity-20" />
      <div className="absolute top-0 left-0 opacity-20 pointer-events-none">
        <GeometricPattern size={180} opacity={1} />
      </div>
      <div className="absolute top-0 right-0 opacity-20 pointer-events-none rotate-90">
        <GeometricPattern size={180} opacity={1} />
      </div>

      <UAEFlagStripe height={5} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 relative z-10">
        {/* Sound toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)' }}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </motion.button>

        {/* Pearl Points */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)' }}
        >
          <span>🪙</span>
          <span className="text-uae-gold">{studentData.pearls ?? 0}</span>
          <span className="text-uae-gold/60">{t('pearls')}</span>
        </div>

        {/* Language toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { toggleLang(); playClick(); }}
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)', color: '#C8A840' }}
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </motion.button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-4 relative z-10">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-3"
            >
              <FalconMascot size={80} animated />
            </motion.div>

            <h1
              className="text-4xl font-bold mb-1"
              style={{
                fontFamily: 'Tajawal, sans-serif',
                background: 'linear-gradient(90deg, #C8A840, #FFE57F, #C8A840)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              {t('selectCourse')}
            </h1>
            <p className="text-white/50 text-sm">{t('poweredBy')}</p>
          </motion.div>

          {/* Grade filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 mb-5 justify-center"
          >
            {[null, 4, 8].map(grade => (
              <button
                key={grade ?? 'all'}
                onClick={() => { setSelectedGrade(grade); setSelectedCourse(null); }}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selectedGrade === grade ? '#C8A840' : 'rgba(200,168,64,0.1)',
                  color: selectedGrade === grade ? '#0D1B2A' : '#C8A840',
                  border: '1px solid rgba(200,168,64,0.3)',
                }}
              >
                {grade === null ? 'All' : GRADE_LABELS[grade]}
              </button>
            ))}
          </motion.div>

          {/* Course grid */}
          <div className="space-y-3 mb-6">
            <AnimatePresence mode="wait">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <CourseCard
                    course={course}
                    onSelect={setSelectedCourse}
                    selected={selectedCourse}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Start button */}
          <AnimatePresence>
            {selectedCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="pb-6"
              >
                <motion.button
                  onClick={handleStart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl font-bold text-xl text-white relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${selectedCourse.color}, ${selectedCourse.color}BB)`,
                    boxShadow: `0 0 30px ${selectedCourse.color}50, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {selectedCourse.banner} {t('startJourney')}
                  </span>
                </motion.button>

                <p className="text-center text-white/30 text-xs mt-2">
                  {selectedCourse.grade} · {selectedCourse.subject} · {selectedCourse.subtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
