"use client";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";
/** Wrap any element to give it a magnetic pull toward the cursor (mouse only). */
export function Magnetic({ children, strength = 0.35, className = "inline-block" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
