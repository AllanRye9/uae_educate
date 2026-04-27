'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LessonView from '../../../../../src/components/LessonView';
import { COURSE_CATALOG } from '../../../../../src/data/courseData';
import { COURSE_MODULES } from '../../../../../src/lib/courseModules';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function LessonPage() {
  const { courseId, moduleId } = useParams();
  const router = useRouter();

  const course = COURSE_CATALOG.find((c) => c.id === courseId);
  const modules = course ? (COURSE_MODULES[course.dataKey] ?? []) : [];
  const moduleIdNum = isNaN(Number(moduleId)) ? moduleId : Number(moduleId);
  const selectedModule = modules.find((m) => m.id === moduleIdNum);

  if (!course || !selectedModule) {
    router.replace(course ? `/course/${courseId}/path` : '/select');
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="lesson"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <LessonView
          module={selectedModule}
          onStartQuiz={() => router.push(`/course/${courseId}/quiz/${moduleId}`)}
          onBack={() => router.push(`/course/${courseId}/path`)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
