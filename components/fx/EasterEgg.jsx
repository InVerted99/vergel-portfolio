"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
/**
 * Easter egg: type the Konami code (↑↑↓↓←→←→BA) — or trigger the
 * "vc:overload" event from the footer — to briefly overload the grid.
 */
export function EasterEgg() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    let pos = 0;
    let timer;
    const fire = () => {
      setActive(true);
      document.documentElement.classList.add("overload");
      clearTimeout(timer);
      timer = setTimeout(() => {
        setActive(false);
        document.documentElement.classList.remove("overload");
      }, 4000);
    };
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        fire();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("vc:overload", fire);
    // A little hello for the curious.
    console.log(
      "%c⚡ Hey, fellow dev.%c\nYou found the console. Try the Konami code on the page (↑↑↓↓←→←→BA).\n— Vergel",
      "font: 600 16px system-ui; color: #c6f432; background:#0a0a0b; padding:4px 8px; border-radius:4px",
      "font: 12px system-ui",
    );
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("vc:overload", fire);
    };
  }, []);
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-accent-fg shadow-[0_0_40px_var(--accent)]"
        >
          ⚡ Power surge detected — 9001% voltage
        </motion.div>
      )}
    </AnimatePresence>
  );
}
