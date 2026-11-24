"use client";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { about, site } from "@/data/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- jump straight to the final value
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
/** Portrait with a morphing blob mask; swaps to a monogram artwork if no photo is set. */
function Portrait() {
  return (
    <div className="group relative h-full min-h-[360px] w-full">
      <div className="absolute inset-6 overflow-hidden transition-[border-radius,inset] duration-700 [border-radius:42%_58%_63%_37%/41%_44%_56%_59%] group-hover:inset-4 group-hover:[border-radius:58%_42%_38%_62%/55%_61%_39%_45%]">
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div
            role="img"
            aria-label={`Monogram artwork for ${site.name}`}
            className="relative grid h-full w-full place-items-center bg-[conic-gradient(from_200deg_at_60%_40%,var(--accent),#0a0a0b_35%,#1c1c20_60%,var(--accent))] transition-transform duration-700 group-hover:scale-110"
          >
            <span className="font-display text-[9rem] font-semibold leading-none tracking-tighter text-[#0a0a0b] mix-blend-overlay">
              VC
            </span>
          </div>
        )}
      </div>
      <span className="absolute bottom-6 right-6 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
        Hover me
      </span>
    </div>
  );
}
const Card = ({ className, children }) => (
  <div className={cn("card p-6 sm:p-8", className)}>{children}</div>
);
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="container-x scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeading
        index="01"
        eyebrow="About"
        id="about-title"
        title="Designer brain, engineer hands."
      />

      <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <Card className="h-full">
            <p className="eyebrow mb-6">The story</p>
            <div className="space-y-4 text-lg leading-relaxed sm:text-xl">
              {about.story.map((p, i) => (
                <p key={i} className={i === 0 ? "text-fg" : "text-muted"}>
                  {p}
                </p>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 lg:col-span-5 lg:row-span-2">
          <div className="card h-full">
            <Portrait />
          </div>
        </Reveal>

        {about.stats.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i} className="md:col-span-3 lg:col-span-3">
            <Card className="flex h-full flex-col justify-between gap-6">
              <p className="font-display text-6xl font-semibold leading-none">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </Card>
          </Reveal>
        ))}

        <Reveal className="md:col-span-3 lg:col-span-4">
          <Card className="flex h-full flex-col justify-between gap-6">
            <MapPin aria-hidden className="text-accent-ink" />
            <div>
              <p className="font-display text-2xl font-semibold">{site.location}</p>
              <p className="text-sm text-muted">GMT+8 · Remote-friendly across time zones</p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-3 lg:col-span-5">
          <Card className="flex h-full flex-col justify-between gap-6">
            <Sparkles aria-hidden className="text-accent-ink" />
            <div>
              <p className="eyebrow mb-2">Currently</p>
              <p className="text-lg">{about.currently}</p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 lg:col-span-3">
          <motion.a
            href={site.resume}
            download
            whileHover={{ scale: 0.98 }}
            className="card group flex h-full min-h-[160px] flex-col justify-between bg-accent! p-6 text-accent-fg sm:p-8"
          >
            <span className="eyebrow text-accent-fg/70">Résumé · PDF</span>
            <span className="flex items-end justify-between">
              <span className="font-display text-3xl font-semibold leading-none">Download CV</span>
              <ArrowDown
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
