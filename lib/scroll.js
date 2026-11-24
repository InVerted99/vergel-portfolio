let lenis = null;
export const setLenis = (instance) => {
  lenis = instance;
};
export const getLenis = () => lenis;
/** Smooth-scroll to a "#id" (or the top with "#top") and move focus for a11y. */
export function scrollToHash(hash) {
  if (typeof window === "undefined") return;
  if (hash === "#top" || hash === "#") {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    return;
  }
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", hash);
  // Move keyboard focus to the section without jumping.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
