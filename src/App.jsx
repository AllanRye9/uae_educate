import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LearningPath from './components/LearningPath';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [studentData, setStudentData] = useState({
    xp: 1240,
    totalStars: 18,
    streak: 7,
    level: 3,
    badges: ['first_lesson', 'quiz_master', 'streak_7'],
  });

  const navigate = (view, data = null) => {
    if (data) setSelectedModule(data);
    setCurrentView(view);
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    const newXP = studentData.xp + results.xpEarned;
    const newStars = studentData.totalStars + results.stars;
    setStudentData(prev => ({
      ...prev,
      xp: newXP,
      totalStars: newStars,
      level: Math.floor(newXP / 500) + 1,
    }));
    setCurrentView('results');
  };

  return (
    <div className="min-h-screen bg-uae-dark overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LandingPage onStart={() => navigate('path')} studentData={studentData} />
          </motion.div>
        )}
        {currentView === 'path' && (
          <motion.div key="path" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LearningPath
              studentData={studentData}
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
      </AnimatePresence>
    </div>
  );
}
