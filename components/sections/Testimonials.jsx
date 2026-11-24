"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
/** Accessible auto-advancing carousel. Hidden until data/testimonials.ts has entries. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const go = useCallback(
    (step) => {
      setDir(step);
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );
  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [count, paused, reduce, go]);
  if (count === 0) return null;
  const t = testimonials[index];
  return (
    <section aria-labelledby="testimonials-title" className="container-x py-24 md:py-32">
      <SectionHeading
        index="05"
        eyebrow="Kind words"
        id="testimonials-title"
        title="What people say."
      />
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        className="card p-8 md:p-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Quote aria-hidden className="mb-8 h-10 w-10 text-accent-ink" />
        <div
          className="relative min-h-[220px] overflow-hidden"
          aria-live={paused ? "polite" : "off"}
        >
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              custom={dir}
              initial={{ opacity: 0, x: reduce ? 0 : dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : dir * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-2xl font-medium leading-snug md:text-4xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted"> — {t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {count > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2 bg-line"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-fg"
              >
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-fg"
              >
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
