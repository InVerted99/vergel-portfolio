"use client";
import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
// The first paint is never hidden (good for LCP); only later navigations animate.
let hasNavigated = false;
/** Page transition: every route change re-mounts this template. */
export default function Template({ children }) {
  const reduce = useReducedMotion();
  const animateIn = hasNavigated && !reduce;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
