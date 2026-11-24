"use client";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { Award, BadgeCheck, Briefcase, GraduationCap, Mic } from "lucide-react";
import { experience, seminars } from "@/data/experience";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
const filters = [
  { key: "all", label: "All" },
  { key: "work", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "certification", label: "Certifications" },
  { key: "award", label: "Awards" },
];
const icons = {
  work: Briefcase,
  education: GraduationCap,
  certification: BadgeCheck,
  award: Award,
};
function Entry({ entry, side }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const Icon = icons[entry.kind];
  return (
    <motion.li
      ref={ref}
      layout={!reduce}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative grid grid-cols-[32px_1fr] gap-4 md:grid-cols-[1fr_48px_1fr] md:gap-8"
    >
      {/* Node */}
      <div className="relative col-start-1 flex justify-center md:col-start-2">
        <span
          className={cn(
            "relative z-10 mt-1 grid h-8 w-8 place-items-center rounded-full border transition-all duration-500",
            inView
              ? "border-accent bg-accent text-accent-fg shadow-[0_0_24px_var(--accent)]"
              : "border-line bg-bg text-muted",
          )}
        >
          <Icon size={14} aria-hidden />
        </span>
      </div>

      <motion.div
        initial={false}
        animate={
          seen ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : side === "left" ? -32 : 32 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "col-start-2 pb-12 md:pb-16",
          side === "left" ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-3",
        )}
      >
        <p
          className={cn(
            "font-mono text-sm transition-colors",
            inView ? "text-accent-ink" : "text-muted",
          )}
        >
          {entry.period}
        </p>
        <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{entry.title}</h3>
        <p className="mt-1 text-muted">{entry.org}</p>
        {entry.description && <p className="mt-3">{entry.description}</p>}
        {entry.points && (
          <ul className={cn("mt-4 space-y-2 text-sm text-muted", side === "left" && "md:ml-auto")}>
            {entry.points.map((pt) => (
              <li key={pt} className={cn("flex gap-2", side === "left" && "md:flex-row-reverse")}>
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.li>
  );
}
export function Experience() {
  const [filter, setFilter] = useState("all");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const list = filter === "all" ? experience : experience.filter((e) => e.kind === filter);
  const available = filters.filter(
    (f) => f.key === "all" || experience.some((e) => e.kind === f.key),
  );
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="container-x scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeading
        index="04"
        eyebrow="Journey"
        id="experience-title"
        title="Experience & education."
      />

      <div
        role="group"
        aria-label="Filter timeline"
        className="mb-12 flex flex-wrap gap-2 md:justify-center"
      >
        {available.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "relative h-10 rounded-full border px-4 text-sm transition-colors",
              filter === f.key
                ? "border-transparent text-accent-fg"
                : "border-line text-muted hover:text-fg",
            )}
          >
            {filter === f.key && (
              <motion.span
                layoutId="timeline-filter"
                className="absolute inset-0 -z-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      <div ref={container} className="relative">
        {/* Track + live progress fill */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-line md:left-1/2"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-4 top-0 w-px origin-top -translate-x-1/2 bg-accent shadow-[0_0_12px_var(--accent)] md:left-1/2"
        />
        <ol className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((e, i) => (
              <Entry
                key={`${e.title}-${e.period}`}
                entry={e}
                side={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </AnimatePresence>
        </ol>
      </div>

      {seminars.length > 0 && (
        <Reveal className="mt-16 md:mt-24">
          <div className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Mic size={18} aria-hidden className="text-accent-ink" />
              <h3 className="text-2xl font-semibold">Seminars attended</h3>
            </div>
            <ul className="divide-y divide-line">
              {seminars.map((s) => (
                <li
                  key={s.title}
                  className="grid gap-1 py-4 first:pt-0 last:pb-0 md:grid-cols-[120px_1fr] md:gap-6"
                >
                  <span className="font-mono text-sm text-accent-ink">{s.date}</span>
                  <span>
                    <span className="block font-medium">{s.title}</span>
                    <span className="block text-sm text-muted">{s.org}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
}
