import { projects } from "@/data/projects";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  // "1 Capstone · 1 Team project · 2 Personal projects", built from the data.
  const counts = projects.reduce((acc, p) => ({ ...acc, [p.type]: (acc[p.type] ?? 0) + 1 }), {});

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="container-x scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        id="work-title"
        title="Things I've built."
        intro="Each project opens into a short case study: the problem, what I did, and how it turned out."
      />

      <Reveal>
        <ul
          aria-label="Project count by type"
          className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5 font-mono text-sm text-muted md:mb-24"
        >
          <li>
            <span className="text-fg">{projects.length}</span> projects
          </li>
          {Object.entries(counts).map(([type, n]) => (
            <li key={type}>
              <span className="text-fg">{n}</span> {type.toLowerCase()}
              {n > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </Reveal>

      <ol className="space-y-24 md:space-y-32">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug}>
            <ProjectCard project={p} index={i} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
