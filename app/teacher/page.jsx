'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from '../../src/components/TeacherDashboard';
import { useStudent } from '../../src/context/StudentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function TeacherPage() {
  const router = useRouter();
  const { studentData } = useStudent();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="teacher"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <TeacherDashboard
          studentData={studentData}
          onBack={() => router.back()}
        />
      </motion.div>
    </AnimatePresence>
  );
}
