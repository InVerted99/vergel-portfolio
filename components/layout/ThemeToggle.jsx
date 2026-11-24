"use client";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
/** True only after hydration — avoids a server/client icon mismatch. */
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line transition-colors hover:border-fg"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
