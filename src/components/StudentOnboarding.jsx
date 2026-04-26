import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UAEFlagStripe, FalconMascot, StarBurst, GeometricPattern } from './UAEPatterns';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

const AVATARS = ['🦅', '👦', '👧', '🧑', '👨', '👩', '🧕', '👸', '🤴', '🧒', '🐪', '🏆'];

const GRADE_OPTIONS = [
  { value: 4, label: 'Grade 4', arabicLabel: 'الصف الرابع', icon: '🌴' },
  { value: 8, label: 'Grade 8', arabicLabel: 'الصف الثامن', icon: '🕌' },
];

export default function StudentOnboarding({ onComplete }) {
  const { lang, toggleLang, t } = useLanguage();
  const { playClick } = useSound();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🦅');
  const [grade, setGrade] = useState(null);
  const [step, setStep] = useState(0); // 0 = name, 1 = avatar, 2 = grade
  const [error, setError] = useState('');

  const isRTL = lang === 'ar';

  const getGradeLabel = () => {
    if (!grade) return lang === 'ar' ? 'اختر الصف' : 'Select grade';
    const option = GRADE_OPTIONS.find(g => g.value === grade);
    return lang === 'ar' ? option?.arabicLabel : option?.label;
  };

  const handleNameNext = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(lang === 'ar' ? 'الرجاء إدخال اسمك' : 'Please enter your name');
      return;
    }
    if (trimmed.length < 2) {
      setError(lang === 'ar' ? 'الاسم قصير جداً' : 'Name is too short');
      return;
    }
    setError('');
    playClick();
    setStep(1);
  };

  const handleAvatarNext = () => {
    playClick();
    setStep(2);
  };

  const handleGradeSelect = (g) => {
    playClick();
    setGrade(g);
  };

  const handleStart = () => {
    if (!grade) return;
    playClick();
    onComplete({ name: name.trim(), avatar, grade });
  };

  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
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
      <div className="flex items-center justify-end px-4 pt-3 pb-2 relative z-10">
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-sm">

          {/* Logo / mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <FalconMascot size={80} animated />
            <h1
              className="text-3xl font-bold mt-2 text-center"
              style={{
                fontFamily: 'Tajawal, sans-serif',
                background: 'linear-gradient(90deg, #C8A840, #FFE57F, #C8A840)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              {lang === 'ar' ? 'تعلّم الإمارات' : 'UAE EduLearn'}
            </h1>
            <p className="text-white/40 text-xs mt-1">{t('poweredBy')}</p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: step === i ? 24 : 8,
                  background: step >= i ? '#C8A840' : 'rgba(200,168,64,0.2)',
                }}
              />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-name"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-uae-navy/80 backdrop-blur border border-uae-gold/20 rounded-2xl p-6"
                style={{ boxShadow: '0 0 30px rgba(200,168,64,0.1)' }}
              >
                <h2 className="text-white font-bold text-lg mb-1 text-center">
                  {lang === 'ar' ? 'ما اسمك؟' : "What's your name?"}
                </h2>
                <p className="text-white/40 text-xs text-center mb-5">
                  {lang === 'ar' ? 'أدخل اسمك للبدء' : 'Enter your name to get started'}
                </p>

                <div className="relative mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleNameNext()}
                    placeholder={lang === 'ar' ? 'مثال: أحمد المنصوري' : 'e.g. Ahmed Al Mansouri'}
                    maxLength={40}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-uae-gold/20 text-white placeholder-white/30 focus:outline-none focus:border-uae-gold/60 transition-colors text-sm"
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    autoFocus
                  />
                  {name.trim().length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-uae-green text-sm">✓</span>
                  )}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-uae-red text-xs text-center mb-3"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={handleNameNext}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm"
                  style={{
                    background: name.trim().length >= 2
                      ? 'linear-gradient(135deg, #009A44, #006B30)'
                      : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s',
                  }}
                >
                  {lang === 'ar' ? 'التالي →' : 'Next →'}
                </motion.button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-avatar"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-uae-navy/80 backdrop-blur border border-uae-gold/20 rounded-2xl p-6"
                style={{ boxShadow: '0 0 30px rgba(200,168,64,0.1)' }}
              >
                <h2 className="text-white font-bold text-lg mb-1 text-center">
                  {lang === 'ar' ? 'اختر صورتك' : 'Choose your avatar'}
                </h2>
                <p className="text-white/40 text-xs text-center mb-5">
                  {lang === 'ar' ? 'اختر رمزاً يمثلك' : 'Pick an emoji that represents you'}
                </p>

                <div className="grid grid-cols-6 gap-2 mb-5">
                  {AVATARS.map(em => (
                    <motion.button
                      key={em}
                      onClick={() => { setAvatar(em); playClick(); }}
                      whileTap={{ scale: 0.85 }}
                      className="h-11 rounded-xl flex items-center justify-center text-2xl transition-all"
                      style={{
                        background: avatar === em ? 'rgba(200,168,64,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${avatar === em ? '#C8A840' : 'transparent'}`,
                        boxShadow: avatar === em ? '0 0 10px rgba(200,168,64,0.3)' : 'none',
                      }}
                    >
                      {em}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { playClick(); setStep(0); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/50 border border-white/10"
                  >
                    {lang === 'ar' ? '← السابق' : '← Back'}
                  </button>
                  <motion.button
                    onClick={handleAvatarNext}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #009A44, #006B30)' }}
                  >
                    {lang === 'ar' ? 'التالي →' : 'Next →'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-grade"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-uae-navy/80 backdrop-blur border border-uae-gold/20 rounded-2xl p-6"
                style={{ boxShadow: '0 0 30px rgba(200,168,64,0.1)' }}
              >
                <h2 className="text-white font-bold text-lg mb-1 text-center">
                  {lang === 'ar' ? 'ما صفك الدراسي؟' : 'What grade are you in?'}
                </h2>
                <p className="text-white/40 text-xs text-center mb-5">
                  {lang === 'ar' ? 'اختر صفك لتخصيص المحتوى' : 'Choose your grade to personalise content'}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {GRADE_OPTIONS.map(g => {
                    const isSelected = grade === g.value;
                    return (
                      <motion.button
                        key={g.value}
                        onClick={() => handleGradeSelect(g.value)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative py-6 rounded-xl flex flex-col items-center gap-2 transition-all"
                        style={{
                          background: isSelected ? 'rgba(200,168,64,0.15)' : 'rgba(255,255,255,0.04)',
                          border: `2px solid ${isSelected ? '#C8A840' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: isSelected ? '0 0 15px rgba(200,168,64,0.2)' : 'none',
                        }}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: '#C8A840', color: '#0D1B2A' }}
                          >
                            ✓
                          </motion.div>
                        )}
                        <span className="text-3xl">{g.icon}</span>
                        <span className={`text-sm font-bold ${isSelected ? 'text-uae-gold' : 'text-white/70'}`}>
                          {lang === 'ar' ? g.arabicLabel : g.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { playClick(); setStep(1); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/50 border border-white/10"
                  >
                    {lang === 'ar' ? '← السابق' : '← Back'}
                  </button>
                  <motion.button
                    onClick={handleStart}
                    whileHover={grade ? { scale: 1.03 } : {}}
                    whileTap={grade ? { scale: 0.97 } : {}}
                    className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm"
                    style={{
                      background: grade
                        ? 'linear-gradient(135deg, #C8A840, #9a7a20)'
                        : 'rgba(255,255,255,0.1)',
                      transition: 'background 0.3s',
                    }}
                  >
                    🚀 {lang === 'ar' ? 'ابدأ' : 'Start!'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview strip */}
          {step === 2 && name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-3 bg-white/5 border border-uae-gold/10 rounded-xl px-4 py-3"
            >
              <span className="text-2xl">{avatar}</span>
              <div>
                <div className="text-white font-semibold text-sm">{name}</div>
                <div className="text-white/40 text-xs">
                  {getGradeLabel()}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
