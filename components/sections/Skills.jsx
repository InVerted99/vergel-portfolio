import { allSkills, skillGroups } from "@/data/skills";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
function Marquee({ items, reverse = false, outline = false }) {
  // Duplicate the list so translateX(-50%) loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="group mask-fade-x flex overflow-hidden" aria-hidden>
      <ul
        className="flex w-max shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((s, i) => (
          <li key={i} className="flex items-center gap-8">
            <span
              className={`whitespace-nowrap font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-tight transition-colors duration-300 hover:text-accent-ink ${outline ? "text-outline hover:[-webkit-text-stroke-color:var(--accent-ink)]" : ""}`}
            >
              {s}
            </span>
            <span className="h-3 w-3 shrink-0 rounded-full bg-accent" />
          </li>
        ))}
      </ul>
    </div>
  );
}
export function Skills() {
  const half = Math.ceil(allSkills.length / 2);
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          id="skills-title"
          title="The toolkit."
          intro="Frontend first, with a designer's eye: the tools I use from the first Figma frame to a deployed site."
        />
      </div>

      <div className="space-y-4 py-8">
        <Marquee items={allSkills.slice(0, half)} />
        <Marquee items={allSkills.slice(half)} reverse outline />
      </div>

      <div className="container-x mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.category} delay={i * 0.08} className="h-full">
            <article className="card flex h-full flex-col gap-6 p-6 sm:p-8">
              <header className="space-y-2">
                <p className="font-mono text-xs text-accent-ink">0{i + 1}</p>
                <h3 className="text-2xl font-semibold">{g.category}</h3>
                <p className="text-sm text-muted">{g.blurb}</p>
              </header>
              <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${g.category} skills`}>
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line px-3 py-1.5 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
