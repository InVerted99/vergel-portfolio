import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/fx/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { GithubIcon } from "@/components/ui/BrandIcons";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      type: "article",
    },
  };
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];
  const { caseStudy } = project;
  const chapters = [
    {
      n: "01",
      title: "The problem",
      body: <p className="text-xl leading-relaxed md:text-2xl">{caseStudy.problem}</p>,
    },
    {
      n: "02",
      title: "What I did",
      body: (
        <ol className="space-y-6">
          {caseStudy.contributions.map((step, k) => (
            <li key={k} className="grid grid-cols-[40px_1fr] gap-4 text-lg">
              <span className="font-mono text-sm text-accent-ink">
                {String(k + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      n: "03",
      title: "The outcome",
      body: (
        <ul className="space-y-4">
          {caseStudy.outcome.map((r) => (
            <li key={r} className="flex gap-4 text-lg">
              <span
                className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
                aria-hidden
              />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article>
        <header className="container-x pb-16 pt-32 md:pt-40">
          <Link
            href="/#work"
            className="group mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              size={16}
              aria-hidden
              className="transition-transform group-hover:-translate-x-1"
            />
            All work
          </Link>
          <p className="eyebrow mb-6">
            {project.type} · {project.role} · {project.period}
          </p>
          <h1 className="max-w-5xl text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.88]">
            <SplitText text={project.title} stagger={0.02} />
          </h1>
          <Reveal delay={0.3}>
            {project.fullTitle && (
              <p className="mt-8 max-w-3xl font-display text-xl font-medium md:text-2xl">
                {project.fullTitle}
              </p>
            )}
            <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl">{project.summary}</p>
          </Reveal>

          <Reveal
            delay={0.4}
            className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3"
          >
            {caseStudy.facts.map((h) => (
              <div key={h.label} className="bg-bg p-6">
                <p className="eyebrow mb-2">{h.label}</p>
                <p className="font-display text-xl font-semibold">{h.value}</p>
              </div>
            ))}
          </Reveal>

          {(project.live || project.github) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg"
                >
                  Visit live site <ArrowUpRight size={16} aria-hidden />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium hover:border-fg"
                >
                  <GithubIcon width={16} height={16} /> Source code
                </a>
              )}
            </div>
          )}
        </header>

        <Reveal className="container-x">
          <div className="card relative aspect-[16/9]">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="container-x py-24 md:py-32">
          {chapters.map((c) => (
            <section
              key={c.n}
              aria-labelledby={`ch-${c.n}`}
              className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:py-16"
            >
              <Reveal className="md:col-span-4">
                <p className="font-mono text-sm text-accent-ink">{c.n}</p>
                <h2 id={`ch-${c.n}`} className="mt-2 text-3xl font-semibold md:text-4xl">
                  {c.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-8">
                {c.body}
              </Reveal>
            </section>
          ))}

          <section aria-label="Tech stack" className="border-t border-line py-12">
            <p className="eyebrow mb-6">Built with</p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-2">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <nav aria-label="Next project" className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group container-x flex flex-col gap-4 py-16 md:py-24"
        >
          <span className="eyebrow">Next project</span>
          <span className="flex items-center justify-between gap-6">
            <span className="font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-none transition-colors group-hover:text-accent-ink">
              {next.title}
            </span>
            <ArrowRight
              aria-hidden
              className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:h-16 md:w-16"
            />
          </span>
        </Link>
      </nav>
    </main>
  );
}
