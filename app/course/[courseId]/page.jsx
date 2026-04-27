'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from '../../../src/components/LandingPage';
import { useStudent } from '../../../src/context/StudentContext';
import { COURSE_CATALOG } from '../../../src/data/courseData';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function CourseLandingPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { studentData } = useStudent();

  const course = COURSE_CATALOG.find((c) => c.id === courseId);

  if (!course) {
    router.replace('/select');
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="landing"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <LandingPage
          studentData={studentData}
          course={course}
          onStart={() => router.push(`/course/${courseId}/path`)}
          onChangeCourse={() => router.push('/select')}
          onTeacherDashboard={() => router.push('/teacher')}
        />
      </motion.div>
    </AnimatePresence>
  );
}
