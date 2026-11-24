"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { scrollToHash } from "@/lib/scroll";
import { Magnetic } from "@/components/fx/Magnetic";
import { Socials } from "@/components/ui/Socials";
export function LocalTime({ className }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className={className} suppressHydrationWarning>
      {time || "--:--:--"}
    </time>
  );
}
export function Footer() {
  const clicks = useRef(0);
  const [hint, setHint] = useState("");
  const year = new Date().getFullYear();
  // Easter egg #2: click the monogram five times.
  const onLogo = () => {
    clicks.current += 1;
    const left = 5 - clicks.current;
    if (left <= 0) {
      clicks.current = 0;
      setHint("");
      window.dispatchEvent(new Event("vc:overload"));
    } else if (clicks.current >= 2) {
      setHint(`${left} more…`);
    }
  };
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <button
            type="button"
            onClick={onLogo}
            aria-label="Monogram — there may be a secret here"
            className="font-display text-[clamp(4rem,14vw,11rem)] font-semibold leading-[0.8] tracking-tighter transition-colors hover:text-accent-ink"
          >
            VC<span className="text-accent-ink">.</span>
          </button>
          <p aria-live="polite" className="mt-2 h-5 font-mono text-xs text-muted">
            {hint}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-6">
          <div className="space-y-2">
            <p className="eyebrow">Local time · Philippines</p>
            <LocalTime className="block font-mono text-2xl tabular-nums" />
            <p className="text-sm text-muted">{site.location}</p>
          </div>
          <div className="space-y-4">
            <p className="eyebrow">Elsewhere</p>
            <Socials />
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {site.name}. Designed &amp; built from scratch.{" "}
          <span className="hidden lg:inline">Psst — try ↑↑↓↓←→←→BA.</span>
        </p>
        <Magnetic>
          <button
            type="button"
            onClick={() => scrollToHash("#top")}
            className="group flex h-12 items-center gap-3 rounded-full border border-line pl-5 pr-2 text-fg transition-colors hover:border-fg"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp size={16} aria-hidden />
            </span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
