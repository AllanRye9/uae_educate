'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import QuizView from '../../../../../src/components/QuizView';
import { useStudent } from '../../../../../src/context/StudentContext';
import { COURSE_CATALOG } from '../../../../../src/data/courseData';
import { COURSE_MODULES } from '../../../../../src/lib/courseModules';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function QuizPage() {
  const { courseId, moduleId } = useParams();
  const router = useRouter();
  const { handleQuizComplete } = useStudent();

  const course = COURSE_CATALOG.find((c) => c.id === courseId);
  const modules = course ? (COURSE_MODULES[course.dataKey] ?? []) : [];
  const moduleIdNum = isNaN(Number(moduleId)) ? moduleId : Number(moduleId);
  const selectedModule = modules.find((m) => m.id === moduleIdNum);

  if (!course || !selectedModule) {
    router.replace(course ? `/course/${courseId}/path` : '/select');
    return null;
  }

  const onComplete = (results) => {
    // Attach courseId to the module reference so the results page can navigate back
    const moduleWithCourse = { ...selectedModule, courseId };
    handleQuizComplete({ ...results, moduleId: selectedModule.id, module: moduleWithCourse }, course);
    router.push('/results');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="quiz"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <QuizView
          module={selectedModule}
          onComplete={onComplete}
          onBack={() => router.push(`/course/${courseId}/lesson/${moduleId}`)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
