'use client';

/**
 * LoadingSkeleton – UAE-themed shimmer placeholder shown while content loads.
 * Pass a `type` prop to render different skeleton shapes.
 */

import { motion } from 'framer-motion';

function SkeletonBar({ width = '100%', height = 14, className = '' }) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, rgba(200,168,64,0.08) 0%, rgba(200,168,64,0.2) 50%, rgba(200,168,64,0.08) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s linear infinite',
        }}
      />
    </div>
  );
}

/** Module card skeleton for the learning path */
function ModuleSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-16 h-16 rounded-full overflow-hidden"
        style={{ background: 'rgba(200,168,64,0.08)' }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, rgba(200,168,64,0.08) 0%, rgba(200,168,64,0.2) 50%, rgba(200,168,64,0.08) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite',
          }}
        />
      </div>
      <SkeletonBar width={64} height={10} />
      <SkeletonBar width={48} height={8} />
    </div>
  );
}

/** Lesson content skeleton */
function LessonSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <SkeletonBar width="60%" height={20} />
      <SkeletonBar height={14} />
      <SkeletonBar height={14} />
      <SkeletonBar width="80%" height={14} />
      <SkeletonBar width="40%" height={14} />
    </div>
  );
}

/** Quiz card skeleton */
function QuizSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <SkeletonBar width="70%" height={22} />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
            style={{ background: 'rgba(200,168,64,0.08)' }}
          />
          <SkeletonBar height={40} />
        </div>
      ))}
    </div>
  );
}

/** Card skeleton for the course selector */
function CourseSkeleton() {
  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{ background: 'rgba(26,39,68,0.7)', border: '1px solid rgba(200,168,64,0.1)' }}
    >
      <div className="flex gap-4">
        <div
          className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden"
          style={{ background: 'rgba(200,168,64,0.08)' }}
        />
        <div className="flex-1 space-y-2">
          <SkeletonBar width="50%" height={16} />
          <SkeletonBar width="70%" height={12} />
          <SkeletonBar width="40%" height={10} />
        </div>
      </div>
    </div>
  );
}

const SKELETONS = {
  module: ModuleSkeleton,
  lesson: LessonSkeleton,
  quiz: QuizSkeleton,
  course: CourseSkeleton,
};

/**
 * @param {{ type?: 'module'|'lesson'|'quiz'|'course'; count?: number }} props
 */
export default function LoadingSkeleton({ type = 'lesson', count = 1 }) {
  const Skeleton = SKELETONS[type] ?? LessonSkeleton;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={type === 'module' ? 'flex gap-8 justify-center flex-wrap py-8' : 'space-y-4'}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </motion.div>
  );
}
