"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { Magnetic } from "@/components/fx/Magnetic";
import { ThemeToggle } from "./ThemeToggle";
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const { scrollY } = useScroll();
  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(!open && y > 400 && y > prev);
  });
  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-accent px-4 py-2 font-medium text-accent-fg focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "container-x flex h-[72px] items-center justify-between transition-[background-color,backdrop-filter] duration-500",
            scrolled && !open && "backdrop-blur-md",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group flex items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
              VC
            </span>
            <span className="hidden sm:inline">
              Vergel<span className="text-accent-ink">.</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/60 px-2 py-1 backdrop-blur-md">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={`/${l.href}`}
                    className="relative block rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic className="hidden md:block">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hash link, smooth-scrolled by Lenis on the home page */}
              <a
                href="/#contact"
                className="flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg"
              >
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
                Let&apos;s talk
              </a>
            </Magnetic>

            {/* Animated hamburger */}
            <button
              ref={menuButton}
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">Menu</span>
              <motion.span
                aria-hidden
                className="absolute h-[1.5px] w-4 bg-fg"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              />
              <motion.span
                aria-hidden
                className="absolute h-[1.5px] w-4 bg-fg"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-4 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        delay: 0.15 + i * 0.05,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={`/${l.href}`}
                        onClick={(e) => {
                          setOpen(false);
                          if (window.location.pathname !== "/") return;
                          e.preventDefault();
                          // Wait for the menu to close and scrolling to unlock.
                          setTimeout(() => scrollToHash(l.href), 450);
                        }}
                        className="flex items-baseline gap-4 font-display text-5xl font-semibold"
                      >
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                        {l.label}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <a
                href={`mailto:${site.email}`}
                className="block break-all text-lg underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <a
                href={site.resume}
                download
                className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-fg"
              >
                Download résumé
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
