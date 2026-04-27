'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CourseSelector from '../../src/components/CourseSelector';
import { useStudent } from '../../src/context/StudentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SelectPage() {
  const router = useRouter();
  const { studentData } = useStudent();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="select"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <CourseSelector
          studentData={studentData}
          onSelectCourse={(course) => router.push(`/course/${course.id}`)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
