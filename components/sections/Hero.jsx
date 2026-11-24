"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SplitText } from "@/components/fx/SplitText";
import { Magnetic } from "@/components/fx/Magnetic";
import { LocalTime } from "@/components/layout/Footer";
export function Hero() {
  const [play, setPlay] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  useEffect(() => setPlay(true), []);
  const appear = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[72px]"
    >
      {/* Hero picture goes here (replaces the old 3D plasma orb). */}
      <motion.div
        aria-hidden
        style={{ y, opacity: fade }}
        className="pointer-events-none absolute -right-[20vw] top-[8vh] h-[80vw] w-[80vw] md:-right-[8vw] md:top-[6vh] md:h-[48vw] md:w-[48vw] lg:-right-[4vw] lg:h-[38vw] lg:w-[38vw]"
      >
        {/* e.g. <Image src="/hero.jpg" alt="" fill className="object-cover" priority /> */}
      </motion.div>

      <div className="container-x relative flex flex-1 flex-col justify-center gap-8 py-16">
        <motion.p
          {...appear(0)}
          className="flex w-fit items-center gap-3 rounded-full border border-line bg-bg/60 px-4 py-2 text-sm backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
          {site.availability}
        </motion.p>

        <h1
          id="hero-title"
          className="font-display font-semibold leading-[0.86] tracking-[-0.04em]"
        >
          <span className="block text-[clamp(3.5rem,15vw,13rem)]">
            <SplitText text={site.firstName} play={play} />
          </span>
          <span className="block pl-[8vw] text-[clamp(3.5rem,15vw,13rem)] md:pl-[16vw]">
            <SplitText text={site.lastName} play={play} delay={0.15} charClassName="text-outline" />
            <span className="text-accent-ink">
              <SplitText text="." play={play} delay={0.5} />
            </span>
          </span>
        </h1>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <motion.div {...appear(0.5)} className="space-y-4 md:col-span-6 lg:col-span-5">
            <p className="eyebrow">{site.role}</p>
            <p className="text-xl leading-snug sm:text-2xl">{site.tagline}</p>
          </motion.div>

          <motion.div
            {...appear(0.65)}
            className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <Magnetic>
              <a
                href="#work"
                className="group flex h-14 items-center gap-3 rounded-full bg-accent pl-6 pr-2 font-medium text-accent-fg transition-shadow hover:shadow-[0_0_40px_var(--accent-glow)]"
              >
                View work
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-fg text-accent transition-transform duration-300 group-hover:rotate-45">
                  <ArrowDownRight size={18} aria-hidden />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group flex h-14 items-center gap-3 rounded-full border border-line bg-bg/70 pl-6 pr-2 font-medium backdrop-blur-md transition-colors hover:border-fg"
              >
                Contact me
                <span className="grid h-10 w-10 place-items-center rounded-full bg-fg text-bg transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} aria-hidden />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...appear(0.8)}
        className="container-x relative flex items-center justify-between border-t border-line py-6 text-sm text-muted"
      >
        <span>{site.location}</span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="font-mono text-xs uppercase tracking-widest">Local</span>
          <LocalTime className="font-mono tabular-nums text-fg" />
        </span>
        <span className="flex items-center gap-2">
          Scroll
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-accent"
              animate={reduce ? undefined : { y: ["-100%", "300%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
