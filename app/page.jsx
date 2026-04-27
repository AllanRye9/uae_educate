'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import StudentOnboarding from '../src/components/StudentOnboarding';
import { useStudent } from '../src/context/StudentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function HomePage() {
  const router = useRouter();
  const { studentData, hydrated, handleOnboardingComplete } = useStudent();

  // Once hydrated from localStorage, if student already exists redirect to course selector
  useEffect(() => {
    if (!hydrated) return;
    if (studentData.name && studentData.name !== 'Student') {
      router.replace('/select');
    }
  }, [hydrated, studentData.name, router]);

  const onComplete = ({ name, avatar, grade }) => {
    handleOnboardingComplete({ name, avatar, grade });
    router.push('/select');
  };

  // Show nothing until hydration is complete to avoid flash
  if (!hydrated) return null;
  // Already-registered student is being redirected; avoid rendering onboarding
  if (studentData.name && studentData.name !== 'Student') return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="onboarding"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        <StudentOnboarding onComplete={onComplete} />
      </motion.div>
    </AnimatePresence>
  );
}
