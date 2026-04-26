import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LearningPath from './components/LearningPath';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import CourseSelector from './components/CourseSelector';
import TeacherDashboard from './components/TeacherDashboard';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';
import { XP_PER_LEVEL, PEARLS_PER_STAR, MODULES } from './data/courseData';
import { GRADE4_SCIENCE_MODULES } from './data/grade4ScienceData';
import { GRADE8_SCIENCE_MODULES } from './data/grade8ScienceData';

// Map course dataKey → modules array
const COURSE_MODULES = {
  grade8math: MODULES,
  grade8science: GRADE8_SCIENCE_MODULES,
  grade4science: GRADE4_SCIENCE_MODULES,
  // grade4math: placeholder (same structure as grade8math but grade-4 themed)
  grade4math: MODULES, // fallback to algebra for now
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AppContent() {
  const [currentView, setCurrentView] = useState('courseSelector');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // Module statuses are tracked per-course in state, starting from courseData defaults
  const [moduleStatuses, setModuleStatuses] = useState({});

  const [studentData, setStudentData] = useState({
    xp: 1240,
    totalStars: 18,
    streak: 7,
    level: 3,
    pearls: 120,
    badges: ['first_lesson', 'quiz_master', 'streak_7'],
  });

  // Get current modules (with runtime status overrides applied)
  const getCurrentModules = () => {
    if (!selectedCourse) return [];
    const base = COURSE_MODULES[selectedCourse.dataKey] ?? MODULES;
    const overrides = moduleStatuses[selectedCourse.id] ?? {};
    return base.map(m => ({
      ...m,
      status: overrides[m.id]?.status ?? m.status,
      stars: overrides[m.id]?.stars ?? m.stars,
    }));
  };

  const navigate = (view, data = null) => {
    if (data) setSelectedModule(data);
    setCurrentView(view);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentView('landing');
  };

  // Unlock the next module after a completed quiz
  const unlockNextModule = (completedModuleId, stars) => {
    if (!selectedCourse) return;
    const base = COURSE_MODULES[selectedCourse.dataKey] ?? MODULES;
    const idx = base.findIndex(m => m.id === completedModuleId);
    if (idx === -1) return;

    setModuleStatuses(prev => {
      const courseOverrides = { ...(prev[selectedCourse.id] ?? {}) };
      // Mark completed module
      courseOverrides[completedModuleId] = { status: 'completed', stars };
      // Unlock next module
      if (idx + 1 < base.length) {
        const nextId = base[idx + 1].id;
        if (!courseOverrides[nextId] || courseOverrides[nextId].status === 'locked') {
          courseOverrides[nextId] = { status: 'active', stars: 0 };
        }
      }
      return { ...prev, [selectedCourse.id]: courseOverrides };
    });
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    const newXP = studentData.xp + results.xpEarned;
    const newStars = studentData.totalStars + results.stars;
    const pearlsEarned = results.stars * PEARLS_PER_STAR;

    setStudentData(prev => ({
      ...prev,
      xp: newXP,
      totalStars: newStars,
      level: Math.floor(newXP / XP_PER_LEVEL) + 1,
      pearls: (prev.pearls ?? 0) + pearlsEarned,
    }));

    if (results.stars >= 2 && selectedModule) {
      unlockNextModule(selectedModule.id, results.stars);
    }

    setCurrentView('results');
  };

  return (
    <div className="min-h-screen bg-uae-dark overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'courseSelector' && (
          <motion.div key="courseSelector" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <CourseSelector onSelectCourse={handleSelectCourse} studentData={studentData} />
          </motion.div>
        )}
        {currentView === 'landing' && selectedCourse && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LandingPage
              onStart={() => navigate('path')}
              onChangeCourse={() => navigate('courseSelector')}
              onTeacherDashboard={() => navigate('teacher')}
              studentData={studentData}
              course={selectedCourse}
            />
          </motion.div>
        )}
        {currentView === 'path' && selectedCourse && (
          <motion.div key="path" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LearningPath
              studentData={studentData}
              modules={getCurrentModules()}
              course={selectedCourse}
              onSelectModule={(mod) => navigate('lesson', mod)}
              onBack={() => navigate('landing')}
            />
          </motion.div>
        )}
        {currentView === 'lesson' && selectedModule && (
          <motion.div key="lesson" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LessonView
              module={selectedModule}
              onStartQuiz={() => navigate('quiz')}
              onBack={() => navigate('path')}
            />
          </motion.div>
        )}
        {currentView === 'quiz' && selectedModule && (
          <motion.div key="quiz" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <QuizView
              module={selectedModule}
              onComplete={handleQuizComplete}
              onBack={() => navigate('lesson')}
            />
          </motion.div>
        )}
        {currentView === 'results' && quizResults && (
          <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <ResultsView
              results={quizResults}
              module={selectedModule}
              studentData={studentData}
              onContinue={() => navigate('path')}
            />
          </motion.div>
        )}
        {currentView === 'teacher' && (
          <motion.div key="teacher" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <TeacherDashboard onBack={() => navigate('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </LanguageProvider>
  );
}
