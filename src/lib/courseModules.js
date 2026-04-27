import { MODULES } from '../data/courseData';
import { GRADE4_SCIENCE_MODULES } from '../data/grade4ScienceData';
import { GRADE8_SCIENCE_MODULES } from '../data/grade8ScienceData';

/**
 * Maps course dataKey → modules array.
 * The grade4math course re-uses the algebra modules as a fallback.
 */
export const COURSE_MODULES = {
  grade8math: MODULES,
  grade8science: GRADE8_SCIENCE_MODULES,
  grade4science: GRADE4_SCIENCE_MODULES,
  grade4math: MODULES,
};
