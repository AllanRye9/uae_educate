import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  en: {
    appTitle: 'UAE EduLearn',
    startJourney: '🚀 Start Your Journey',
    grade8Math: 'Grade 8 · Math',
    grade4Science: 'Grade 4 · Science',
    algebraAdventure: 'Algebra Adventure',
    scienceExplorer: 'Science Explorer',
    learningJourney: 'Learning Journey',
    yourLearningPath: 'Your Learning Path',
    modulesCompleted: 'modules completed',
    of: 'of',
    dayStreak: 'day streak',
    back: '← Back',
    backToPath: '← Path',
    nextLesson: 'Next Lesson →',
    startQuiz: '🎯 Start Quiz',
    lesson: 'Lesson',
    xpEarned: 'XP earned:',
    previousLesson: '← Previous',
    questionLabel: 'Question',
    nextQuestion: 'Next Question →',
    seeResults: '🏁 See Results',
    correctWell: 'Correct! Well done!',
    notQuite: "Not quite — here's why:",
    continueJourney: '🗺️ Continue Journey',
    shareAchievement: '🎊 Share Achievement',
    performanceSummary: 'Performance Summary',
    correct: '✓ Correct',
    incorrect: '✗ Incorrect',
    accuracy: 'Accuracy',
    moduleStatus: 'Module Status',
    completed: 'Completed',
    active: 'Active',
    locked: 'Locked',
    classLeaderboard: '🏆 Class Leaderboard',
    dailyChallenge: '⚡ Daily Challenge',
    dailyChallengeDesc: 'Bonus Pearl Points available today!',
    takeDailyChallenge: 'Take Challenge',
    pearls: 'Pearls',
    pearlPoints: 'Pearl Points',
    teacherDashboard: 'Teacher Dashboard',
    selectCourse: 'Choose Your Adventure',
    selectGrade: 'Select Grade',
    selectSubject: 'Select Subject',
    mathSubject: 'Mathematics',
    scienceSubject: 'Science',
    grade4: 'Grade 4',
    grade8: 'Grade 8',
    poweredBy: 'UAE National Curriculum',
    newBadge: '🎊 New Badge Unlocked!',
    xpProgress: 'XP Progress',
    totalXP: 'Total XP',
    stars: 'Stars',
    badges: 'Badges',
    curriculum: 'UAE National Curriculum • Grade',
    mathematics: 'Mathematics',
  },
  ar: {
    appTitle: 'تعلّم الإمارات',
    startJourney: '🚀 ابدأ رحلتك',
    grade8Math: 'الصف الثامن · الرياضيات',
    grade4Science: 'الصف الرابع · العلوم',
    algebraAdventure: 'مغامرة الجبر',
    scienceExplorer: 'مستكشف العلوم',
    learningJourney: 'رحلة التعلم',
    yourLearningPath: 'مسار التعلم الخاص بك',
    modulesCompleted: 'وحدات مكتملة',
    of: 'من',
    dayStreak: 'أيام متتالية',
    back: 'رجوع ←',
    backToPath: 'المسار ←',
    nextLesson: 'الدرس التالي ←',
    startQuiz: 'ابدأ الاختبار 🎯',
    lesson: 'درس',
    xpEarned: 'النقاط المكتسبة:',
    previousLesson: '← السابق',
    questionLabel: 'سؤال',
    nextQuestion: 'السؤال التالي ←',
    seeResults: 'النتائج 🏁',
    correctWell: 'صحيح! أحسنت!',
    notQuite: 'ليس تمامًا — إليك السبب:',
    continueJourney: '🗺️ متابعة الرحلة',
    shareAchievement: '🎊 شارك إنجازك',
    performanceSummary: 'ملخص الأداء',
    correct: '✓ صحيح',
    incorrect: '✗ خطأ',
    accuracy: 'الدقة',
    moduleStatus: 'حالة الوحدة',
    completed: 'مكتمل',
    active: 'نشط',
    locked: 'مقفل',
    classLeaderboard: '🏆 لوحة الشرف',
    dailyChallenge: '⚡ التحدي اليومي',
    dailyChallengeDesc: 'نقاط لؤلؤ إضافية متاحة اليوم!',
    takeDailyChallenge: 'ابدأ التحدي',
    pearls: 'لؤلؤ',
    pearlPoints: 'نقاط اللؤلؤ',
    teacherDashboard: 'لوحة المعلم',
    selectCourse: 'اختر مغامرتك',
    selectGrade: 'اختر الصف',
    selectSubject: 'اختر المادة',
    mathSubject: 'الرياضيات',
    scienceSubject: 'العلوم',
    grade4: 'الصف الرابع',
    grade8: 'الصف الثامن',
    poweredBy: 'المنهج الوطني الإماراتي',
    newBadge: '🎊 وسام جديد!',
    xpProgress: 'تقدم النقاط',
    totalXP: 'مجموع النقاط',
    stars: 'نجوم',
    badges: 'أوسمة',
    curriculum: 'المنهج الوطني الإماراتي · الصف',
    mathematics: 'الرياضيات',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    (key) => TRANSLATIONS[lang][key] ?? TRANSLATIONS['en'][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar' }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
