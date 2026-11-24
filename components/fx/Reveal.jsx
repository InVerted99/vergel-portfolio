"use client";
import { motion, useReducedMotion } from "motion/react";
/** Fade + rise when scrolled into view. Reduced motion → plain fade. */
export function Reveal({ children, delay = 0, y = 32, className, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
