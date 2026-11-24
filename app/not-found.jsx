"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Lightbulb, LightbulbOff } from "lucide-react";
/** 404 — a power outage, naturally. Report it and the lights come back on. */
export default function NotFound() {
  const [lightsOn, setLightsOn] = useState(false);
  const torch = useRef(null);
  // Torch follows the pointer (mouse/pen only); falls back to the centre.
  useEffect(() => {
    const el = torch.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-[72px] outline-none"
    >
      {/* Darkness overlay with a torch-like hole that follows the cursor */}
      <motion.div
        ref={torch}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: lightsOn ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), transparent, var(--bg) 70%)",
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <p className="eyebrow mb-6">Error 404 · Outage report #404</p>
        <h1
          className={`font-display text-[clamp(6rem,30vw,20rem)] font-semibold leading-[0.8] tracking-tighter ${lightsOn ? "" : "flicker"}`}
        >
          4<span className="text-accent-ink">0</span>4
        </h1>
        <h2 className="mt-6 text-3xl font-semibold md:text-5xl">
          {lightsOn ? "Power restored." : "Lights out on this page."}
        </h2>
        <p className="mt-4 max-w-md text-lg text-muted">
          {lightsOn
            ? "Thanks for the report. Unfortunately the page still doesn't exist — but at least now you can see that clearly."
            : "This page is experiencing a total blackout. It either moved, never existed, or someone tripped over the cable."}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setLightsOn((v) => !v)}
            aria-pressed={lightsOn}
            className="flex h-14 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-fg"
          >
            {lightsOn ? (
              <LightbulbOff size={18} aria-hidden />
            ) : (
              <Lightbulb size={18} aria-hidden />
            )}
            {lightsOn ? "Cut the power" : "Report outage"}
          </button>
          <Link
            href="/"
            className="flex h-14 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg"
          >
            <ArrowLeft size={18} aria-hidden /> Back to safety
          </Link>
        </div>
      </div>
    </main>
  );
}
