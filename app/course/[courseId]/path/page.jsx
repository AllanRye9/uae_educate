'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LearningPath from '../../../../src/components/LearningPath';
import { useStudent } from '../../../../src/context/StudentContext';
import { COURSE_CATALOG } from '../../../../src/data/courseData';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PathPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { studentData, getModulesForCourse } = useStudent();

  const course = COURSE_CATALOG.find((c) => c.id === courseId);
  if (!course) {
    router.replace('/select');
    return null;
  }

  const modules = getModulesForCourse(course);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="path"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <LearningPath
          studentData={studentData}
          modules={modules}
          course={course}
          onSelectModule={(mod) => router.push(`/course/${courseId}/lesson/${mod.id}`)}
          onBack={() => router.push(`/course/${courseId}`)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
