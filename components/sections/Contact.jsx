"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, RotateCcw } from "lucide-react";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { validateContact } from "@/lib/validation";
import { Magnetic } from "@/components/fx/Magnetic";
import { Socials } from "@/components/ui/Socials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
function Field({ label, name, error, textarea, ...rest }) {
  const id = useId();
  const errId = `${id}-error`;
  const shared = {
    id,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errId : undefined,
    className: cn(
      "peer w-full rounded-2xl border bg-transparent px-5 pb-3 pt-7 text-base outline-none transition-colors placeholder:text-transparent focus:border-fg",
      error ? "border-red-500" : "border-line",
    ),
    placeholder: label,
  };
  return (
    <div className="relative">
      {textarea ? <textarea rows={6} {...shared} {...rest} /> : <input {...shared} {...rest} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-sans peer-focus:top-2.5 peer-focus:font-mono peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle size={14} aria-hidden /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
/** Copy-to-clipboard pill; falls back to opening `fallbackHref` if the clipboard is blocked. */
function CopyButton({ text, label, fallbackHref }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      window.location.href = fallbackHref;
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-fg"
        aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()} to clipboard`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "y" : "n"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
          >
            {copied ? (
              <Check size={14} aria-hidden className="text-accent-ink" />
            ) : (
              <Copy size={14} aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
        {copied ? "Copied!" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </>
  );
}
export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");
  const update = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateContact(next));
  };
  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateContact(values));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: new FormData(form).get("company") ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err) {
      setServerMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="container-x scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeading
        index={testimonials.length ? "06" : "05"}
        eyebrow="Contact"
        id="contact-title"
        title="Let's build something."
      />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-5">
          <p className="max-w-md text-lg text-muted">
            Have an OJT opening, a freelance project, or just want to say hi? My inbox is always
            open — I usually reply within a day.
          </p>

          <div className="space-y-3">
            <p className="eyebrow">Email</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="break-all font-display text-2xl font-semibold underline-offset-8 hover:underline sm:text-3xl"
              >
                {site.email}
              </a>
              <CopyButton text={site.email} label="Email" fallbackHref={`mailto:${site.email}`} />
            </div>
          </div>

          {site.phone && (
            <div className="space-y-3">
              <p className="eyebrow">Phone</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={site.phoneHref}
                  className="font-display text-2xl font-semibold tabular-nums underline-offset-8 hover:underline sm:text-3xl"
                >
                  {site.phone}
                </a>
                <CopyButton text={site.phone} label="Phone number" fallbackHref={site.phoneHref} />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="eyebrow">Socials</p>
            <Socials />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-start justify-center gap-6"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_0_40px_var(--accent)]">
                    <Check size={28} aria-hidden />
                  </span>
                  <h3 className="text-4xl font-semibold">Message received.</h3>
                  <p className="text-muted">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="flex items-center gap-2 text-sm underline-offset-4 hover:underline"
                  >
                    <RotateCcw size={14} aria-hidden /> Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      error={touched.name ? errors.name : undefined}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => blur("name")}
                      required
                    />
                    <Field
                      label="Email address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={values.email}
                      error={touched.email ? errors.email : undefined}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => blur("email")}
                      required
                    />
                  </div>
                  <Field
                    label="Tell me about your project"
                    name="message"
                    textarea
                    value={values.message}
                    error={touched.message ? errors.message : undefined}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    required
                  />
                  {/* Honeypot: humans never see or fill this. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company
                      <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
                      >
                        <AlertCircle size={16} aria-hidden className="mt-0.5 shrink-0" />
                        <span>
                          {serverMessage} You can also email me directly at{" "}
                          <a className="underline" href={`mailto:${site.email}`}>
                            {site.email}
                          </a>
                          .
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <p className="hidden text-xs text-muted sm:block">All fields required.</p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group flex h-14 items-center gap-3 rounded-full bg-accent pl-6 pr-2 font-medium text-accent-fg transition-shadow hover:shadow-[0_0_40px_var(--accent-glow)] disabled:opacity-70"
                      >
                        {status === "sending" ? "Sending…" : "Send message"}
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-fg text-accent">
                          {status === "sending" ? (
                            <Loader2 size={18} aria-hidden className="animate-spin" />
                          ) : (
                            <ArrowUpRight
                              size={18}
                              aria-hidden
                              className="transition-transform duration-300 group-hover:rotate-45"
                            />
                          )}
                        </span>
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
