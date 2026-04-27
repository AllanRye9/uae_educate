import { motion } from 'framer-motion';
import { FalconMascot, GeometricPattern, UAEFlagStripe, StarBurst, DubaiSkyline } from './UAEPatterns';
import { XP_PER_LEVEL } from '../data/courseData';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

export default function LandingPage({ onStart, onChangeCourse, onTeacherDashboard, studentData, course }) {
  const xpPercent = Math.round((studentData.xp / XP_PER_LEVEL) * 100);
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const { soundEnabled, toggleSound, playClick } = useSound();

  const courseTitle = course
    ? (lang === 'ar' ? course.arabicTitle : course.subtitle)
    : 'Algebra Adventure';
  const gradeLabel = course ? course.grade : 'Grade 8';
  const subjectLabel = course ? (lang === 'ar' ? (course.subject === 'Mathematics' ? 'الرياضيات' : 'العلوم') : course.subject) : 'Math';

  return (
    <div className="min-h-screen relative overflow-hidden bg-uae-dark flex flex-col">
      {/* Animated starfield */}
      <div className="absolute inset-0 pointer-events-none">
        <StarBurst count={80} width={1440} height={900} />
      </div>

      {/* UAE geometric pattern overlay */}
      <div className="absolute inset-0 pointer-events-none uae-pattern opacity-30" />

      {/* Top geometric corners */}
      <div className="absolute top-0 left-0 opacity-30 pointer-events-none">
        <GeometricPattern size={160} opacity={1} />
      </div>
      <div className="absolute top-0 right-0 opacity-30 pointer-events-none rotate-90">
        <GeometricPattern size={160} opacity={1} />
      </div>

      {/* UAE Flag Stripe at top */}
      <UAEFlagStripe height={6} />

      {/* Top controls bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 relative z-10">
        {/* Sound toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { toggleSound(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-base"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)' }}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </motion.button>

        {/* Pearl Points */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)' }}
        >
          <span>🪙</span>
          <span className="text-uae-gold">{studentData.pearls ?? 0}</span>
          <span className="text-uae-gold/60">{t('pearls')}</span>
        </motion.div>

        {/* Language toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { toggleLang(); playClick(); }}
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(200,168,64,0.1)', border: '1px solid rgba(200,168,64,0.3)', color: '#C8A840' }}
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </motion.button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 relative z-10">

        {/* Arabic calligraphy header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-2"
        >
          <div className="text-5xl font-bold mb-1" style={{
            fontFamily: 'Tajawal, sans-serif',
            background: 'linear-gradient(90deg, #C8A840, #FFE57F, #C8A840)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s linear infinite',
          }}>
            {course?.arabicTitle ?? 'الجبر'}
          </div>
          <div className="text-uae-gold/60 text-sm tracking-widest uppercase">
            {course ? `${course.arabicTitle} · ${course.subtitle}` : 'Al-Jabr · Algebra'}
          </div>
        </motion.div>

        {/* Falcon mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          className="my-3"
        >
          <FalconMascot size={110} animated={true} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl font-bold text-white mb-1">
            {gradeLabel} <span className="shimmer-text">{subjectLabel}</span>
          </h1>
          <h2 className="text-2xl font-semibold text-uae-gold">{courseTitle}</h2>
          <p className="text-white/60 mt-1 text-sm">{t('poweredBy')}</p>
        </motion.div>

        {/* Student card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-sm mb-4"
        >
          <div className="bg-uae-navy/80 backdrop-blur border border-uae-gold/20 rounded-2xl p-4"
            style={{ boxShadow: '0 0 30px rgba(200,168,64,0.15)' }}>
            {/* Student info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-uae-gold/20 border-2 border-uae-gold flex items-center justify-center text-2xl">
                {studentData.avatar ?? '🦅'}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">{studentData.name ?? 'Student'}</div>
                <div className="text-uae-gold text-sm">{gradeLabel} · Level {studentData.level}</div>
              </div>
              <div className="text-right">
                <div className="text-uae-gold font-bold text-lg">{studentData.streak}🔥</div>
                <div className="text-white/50 text-xs">{t('dayStreak')}</div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mb-1 flex justify-between text-xs text-white/60">
              <span>{t('xpProgress')}</span>
              <span>{studentData.xp} / {XP_PER_LEVEL}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full xp-bar-fill rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: t('totalXP'), value: studentData.xp.toLocaleString(), icon: '⚡', color: '#C8A840' },
                { label: t('stars'), value: studentData.totalStars, icon: '⭐', color: '#FFD700' },
                { label: t('badges'), value: studentData.badges.length, icon: '🏅', color: '#CE1126' },
                { label: t('pearls'), value: studentData.pearls ?? 0, icon: '🪙', color: '#7CB9E8' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="bg-white/5 rounded-xl p-2 text-center"
                >
                  <div className="text-lg mb-0.5">{stat.icon}</div>
                  <div className="font-bold text-white text-xs">{stat.value}</div>
                  <div className="text-white/40 text-xs leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-2 mb-4 flex-wrap justify-center"
        >
          {studentData.badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 1.3 + i * 0.1 }}
              className="bg-uae-navy border border-uae-gold/30 rounded-full px-3 py-1 text-xs flex items-center gap-1"
            >
              <span>{badge === 'first_lesson' ? '🌟' : badge === 'quiz_master' ? '🏆' : '🔥'}</span>
              <span className="text-uae-gold/80">
                {badge === 'first_lesson' ? 'First Step' : badge === 'quiz_master' ? 'Quiz Master' : '7-Day Streak'}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 1.4 }}
          className="w-full max-w-sm space-y-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { playClick(); onStart(); }}
            className="relative w-full px-10 py-4 rounded-2xl text-xl font-bold text-white overflow-hidden btn-press"
            style={{
              background: 'linear-gradient(135deg, #009A44 0%, #006B30 100%)',
              boxShadow: '0 0 30px rgba(0,154,68,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 {t('startJourney')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
          </motion.button>

          {/* Quick links */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { playClick(); onChangeCourse?.(); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-uae-gold border border-uae-gold/30 hover:bg-uae-gold/5 transition-colors"
            >
              🗂️ {lang === 'ar' ? 'تغيير المادة' : 'Change Course'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { playClick(); onTeacherDashboard?.(); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/50 border border-white/10 hover:bg-white/5 transition-colors"
            >
              👩‍🏫 {lang === 'ar' ? 'لوحة المعلم' : 'Teacher View'}
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-white/30 text-xs mt-3"
        >
          {t('curriculum')} {course?.gradeNum ?? 8} · {lang === 'ar' ? (course?.subject === 'Mathematics' ? 'الرياضيات' : 'العلوم') : (course?.subject ?? 'Mathematics')}
        </motion.p>
      </div>

      {/* Dubai skyline at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 w-full"
      >
        <DubaiSkyline height={90} />
      </motion.div>

      {/* UAE Flag Stripe at bottom */}
      <UAEFlagStripe height={6} />
    </div>
  );
}
