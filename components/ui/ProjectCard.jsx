"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";

/**
 * One project = one row. Every row reads the same way, left to right:
 * cover → number & type → title → one-line summary → 3 highlights → stack → CTA.
 * `flip` mirrors the layout on desktop so the page alternates.
 */
export function ProjectCard({ project, index, flip = false }) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <article
      className="relative grid items-center gap-8 md:grid-cols-12 md:gap-12"
      style={{ ["--tint"]: project.tint }}
    >
      {/* Cover */}
      <div
        className={cn(
          "card relative aspect-[16/10] md:col-span-7",
          flip && "md:order-2",
        )}
      >
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
          style={{ objectPosition: project.coverPosition ?? "center" }}
          priority={index === 0}
        />
        {project.featured && (
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-accent-fg">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-6 md:col-span-5", flip && "md:order-1")}>
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="font-display text-5xl font-semibold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--fg-muted)] md:text-6xl"
          >
            {n}
          </span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--tint)" }} aria-hidden />
            {project.type}
          </span>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">
            {project.role} · {project.period}
          </p>
          <h3 className="text-4xl font-semibold leading-[0.95] md:text-5xl">
            {/* Stretched link: the whole row is clickable; inner links sit above it. */}
            <Link
              href={`/work/${project.slug}`}
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-lg leading-relaxed text-muted">{project.summary}</p>
        </div>

        <ul className="space-y-2.5" aria-label="Highlights">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-fg">
                <Check size={12} strokeWidth={3} aria-hidden />
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-2" aria-label="Tech used">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full bg-fg/5 px-3 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg">
            Read Project
            <ArrowRight size={16} aria-hidden />
          </span>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="relative z-20 flex h-12 items-center gap-1 rounded-full border border-line px-5 text-sm transition-colors hover:border-fg"
            >
              Live <ArrowUpRight size={14} aria-hidden />
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source code on GitHub`}
              className="relative z-20 grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-fg"
            >
              <GithubIcon width={16} height={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
