import { SplitText } from "@/components/fx/SplitText";
import { Reveal } from "@/components/fx/Reveal";
export function SectionHeading({ index, eyebrow, title, id, intro }) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-accent-ink">{index}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <h2 id={id} className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.9]">
          <SplitText text={title} inView stagger={0.02} />
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.2} className="md:col-span-4">
          <p className="text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
