"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis, scrollToHash } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/utils";
/** Lenis smooth scrolling + in-page anchor handling. Off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    let lenis = null;
    let raf = 0;
    if (!prefersReducedMotion()) {
      lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
      setLenis(lenis);
      const loop = (time) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    // Intercept same-page hash links anywhere in the document.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.startsWith("/#") && window.location.pathname !== "/") return; // let Next navigate home
      e.preventDefault();
      scrollToHash(href.startsWith("/") ? href.slice(1) : href);
    };
    document.addEventListener("click", onClick);
    // Honour a hash on first load (e.g. arriving from /work/... → /#contact).
    let hashTimer;
    if (window.location.hash) {
      const h = window.location.hash;
      hashTimer = setTimeout(() => scrollToHash(h), 300);
    }
    return () => {
      clearTimeout(hashTimer);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
