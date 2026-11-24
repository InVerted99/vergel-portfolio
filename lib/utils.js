export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
