'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ResultsView from '../../src/components/ResultsView';
import { useStudent } from '../../src/context/StudentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ResultsPage() {
  const router = useRouter();
  const { studentData, quizResults, setQuizResults } = useStudent();

  // If no results are available (e.g. direct navigation), go back to select
  useEffect(() => {
    if (!quizResults) {
      router.replace('/select');
    }
  }, [quizResults, router]);

  if (!quizResults) return null;

  const handleContinue = () => {
    const courseId = quizResults.module?.courseId;
    setQuizResults(null);
    if (courseId) {
      router.push(`/course/${courseId}/path`);
    } else {
      router.push('/select');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <ResultsView
          results={quizResults}
          module={quizResults.module}
          studentData={studentData}
          onContinue={handleContinue}
        />
      </motion.div>
    </AnimatePresence>
  );
}
