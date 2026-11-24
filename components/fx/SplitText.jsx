"use client";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
/**
 * Per-character masked reveal. Screen readers get the plain string via
 * aria-label; the animated characters are hidden from assistive tech.
 */
export function SplitText({
  text,
  className,
  charClassName,
  play = true,
  delay = 0,
  stagger = 0.035,
  inView = false,
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let index = 0;
  const variants = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    shown: (i) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: reduce ? 0.2 : 0.9,
        delay: delay + i * stagger,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  const animateProps = inView
    ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: play ? "shown" : "hidden" };
  return (
    <motion.span className={cn("inline-block", className)} initial="hidden" {...animateProps}>
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = index++;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  custom={i}
                  variants={variants}
                  className={cn("inline-block", charClassName)}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
