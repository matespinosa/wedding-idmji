"use client";

import { FloralBranch } from "@/components/ui/Florals";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/content";

type MomentData = (typeof site.story.moments)[number];

function StoryStep({
  moment,
  index,
}: {
  moment: MomentData;
  index: number;
}) {
  return (
    <li data-story-step className="border-t border-gold/45 pt-4">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[10px] font-medium tracking-[0.28em] text-bronze">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-lg font-light italic text-gold-deep/70">
            {moment.word}
          </span>
        </div>

        <h3 className="mt-6 font-serif text-3xl font-light leading-tight text-balance text-ink">
          {moment.title}
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-7 text-pretty text-ink/65">
          {moment.text}
        </p>
      </div>
    </li>
  );
}

export function Story() {
  return (
    <section
      id="historia"
      data-story-section
      className="relative overflow-hidden bg-cream py-16 md:py-24"
    >
      <div data-story-floral className="pointer-events-none absolute -right-16 top-20">
        <FloralBranch className="h-80 rotate-[24deg] text-gold/[0.08]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading
          eyebrow={site.story.eyebrow}
          title={site.story.title}
        />

        <Reveal delay={0.2} y={12}>
          <p className="mx-auto mt-6 max-w-xl text-center font-serif text-lg italic leading-relaxed text-pretty text-ink/60 md:text-xl">
            {site.story.verse}
            <span className="mt-2 block text-[10px] not-italic uppercase tracking-[0.3em] text-bronze">
              {site.story.verseRef}
            </span>
          </p>
        </Reveal>

        <ol data-story-list className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-12">
          {site.story.moments.map((moment, index) => (
            <StoryStep key={moment.title} moment={moment} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
