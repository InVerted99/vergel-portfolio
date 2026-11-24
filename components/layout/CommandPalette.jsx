"use client";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  Hash,
  Moon,
  Search,
} from "lucide-react";
import { navLinks, site } from "@/data/site";
import { projects } from "@/data/projects";
import { getLenis, scrollToHash } from "@/lib/scroll";
const OPEN_EVENT = "vc:command-palette";
export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreFocus = useRef(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const listId = useId();
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    getLenis()?.start();
    restoreFocus.current?.focus?.();
  }, []);
  const show = useCallback(() => {
    restoreFocus.current = document.activeElement;
    getLenis()?.stop();
    setOpen(true);
  }, []);
  const items = useMemo(
    () => [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        label: `Go to ${l.label}`,
        group: "Navigate",
        icon: Hash,
        run: () => {
          if (window.location.pathname === "/") scrollToHash(l.href);
          else router.push(`/${l.href}`);
        },
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        group: "Projects",
        icon: FileText,
        keywords: p.tech.join(" "),
        run: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        keywords: "contact mail",
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast("Email copied to clipboard"),
            () => setToast(site.email),
          );
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        icon: Download,
        keywords: "cv resume pdf",
        run: () => window.open(site.resume, "_blank", "noopener"),
      },
      {
        id: "theme",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
        group: "Actions",
        icon: Moon,
        keywords: "dark light mode appearance",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...Object.entries(site.socials)
        .filter(([, href]) => href)
        .map(([key, href]) => ({
          id: `s-${key}`,
          label: `Open ${key[0].toUpperCase()}${key.slice(1)}`,
          group: "Social",
          icon: ArrowUpRight,
          run: () => window.open(href, "_blank", "noopener"),
        })),
    ],
    [router, resolvedTheme, setTheme],
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.group} ${i.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);
  // Global shortcut: Cmd/Ctrl + K, plus a custom event for buttons.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, close, show]);
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);
  const runItem = (item) => {
    close();
    // Let the dialog unmount (and Lenis restart) before acting.
    setTimeout(item.run, 60);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) runItem(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog: the input is the only tab stop.
      e.preventDefault();
    }
  };
  let lastGroup = "";
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-elev shadow-2xl"
              initial={{ y: 16, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 8, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onKeyDown}
              data-lenis-prevent
            >
              <div className="flex items-center gap-3 border-b border-line px-5">
                <Search size={18} aria-hidden className="text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Type a command or search…"
                  className="h-16 w-full bg-transparent text-base outline-none placeholder:text-muted"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-activedescendant={
                    filtered[active] ? `${listId}-${filtered[active].id}` : undefined
                  }
                  aria-autocomplete="list"
                />
                <kbd className="rounded-md border border-line px-2 py-1 font-mono text-[10px] text-muted">
                  ESC
                </kbd>
              </div>

              <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label="Commands"
                className="max-h-[50vh] overflow-y-auto p-2"
              >
                {filtered.length === 0 && (
                  <li className="px-4 py-8 text-center text-sm text-muted">
                    No results for “{query}”.
                  </li>
                )}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && (
                        <p className="eyebrow px-3 pb-2 pt-4 text-[10px]">{item.group}</p>
                      )}
                      <div
                        id={`${listId}-${item.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => runItem(item)}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-colors ${i === active ? "bg-accent text-accent-fg" : "text-fg"}`}
                      >
                        <Icon size={16} aria-hidden />
                        <span className="flex-1">{item.label}</span>
                        {i === active && <CornerDownLeft size={14} aria-hidden />}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[10px] text-muted">
                <span>↑↓ navigate · ↵ select</span>
                <span>⌘K / Ctrl K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-fg px-5 py-3 text-sm text-bg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
