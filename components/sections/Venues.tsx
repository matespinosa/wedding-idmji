"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarPlus, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FloralBranch, RingsOrnament } from "@/components/ui/Florals";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { googleCalendarUrl } from "@/lib/utils";

export function Venues() {
  const ceremony = site.venues.ceremony;

  return (
    <section
      id="ceremonia"
      className="relative overflow-hidden bg-shell py-28 md:py-40"
    >
      <div
        aria-hidden
        className="animate-drift-slow absolute -left-40 top-1/3 size-[36rem] rounded-full bg-gold/[0.08] blur-3xl"
      />
      <FloralBranch className="pointer-events-none absolute -right-20 top-24 h-[28rem] rotate-[26deg] text-gold/[0.1]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow={site.venues.eyebrow}
          title={site.venues.title}
          description={site.venues.intro}
        />

        <div className="mt-10 flex justify-center">
          <RingsOrnament animate className="h-14 text-gold/80" />
        </div>

        <motion.article
          initial={{ opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mt-14 grid overflow-hidden rounded-[2rem] bg-cream shadow-[0_36px_100px_-58px_rgba(77,60,35,0.5)] md:mt-20 md:grid-cols-[1.08fr_0.92fr]"
        >
          <div data-venue-frame className="group relative min-h-[22rem] overflow-hidden md:min-h-[38rem]">
            <div data-venue-parallax className="absolute inset-[-8%]">
              <Image
                src={ceremony.image}
                alt={ceremony.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1800ms] ease-out-expo group-hover:scale-[1.025]"
              />
            </div>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
            />
            <p className="absolute bottom-6 left-6 right-6 text-[10px] font-medium uppercase tracking-[0.34em] text-cream/90 md:bottom-8 md:left-8">
              {ceremony.kind}
            </p>
          </div>

          <div className="relative flex flex-col justify-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
            <FloralBranch className="pointer-events-none absolute -right-12 -top-10 h-44 rotate-[150deg] text-gold/[0.12]" />

            <Reveal y={18}>
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-bronze">
                {site.date.long}
              </p>
              <p className="mt-4 font-serif text-5xl font-light leading-none text-ink md:text-6xl">
                {ceremony.time}
              </p>
              <span aria-hidden className="mt-8 block h-px w-16 bg-gold/60" />
            </Reveal>

            <Reveal delay={0.12} y={22}>
              <h3 className="mt-8 font-serif text-[2rem] font-light leading-[1.08] text-balance text-ink md:text-[2.35rem]">
                {ceremony.name}
              </h3>
              <div className="mt-7 space-y-3 text-[14px] leading-relaxed text-ink/60">
                <p className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-deep" />
                  <span>{ceremony.address} · {ceremony.city}</span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-deep" />
                  <span>{site.venues.arrival}</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} y={20}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  href={ceremony.mapsUrl}
                  target="_blank"
                  size="sm"
                  magnetic={false}
                  icon={<ArrowUpRight size={13} strokeWidth={2} />}
                >
                  Cómo llegar
                </Button>
                <Button
                  href={googleCalendarUrl(ceremony.calendar)}
                  target="_blank"
                  size="sm"
                  variant="outline"
                  magnetic={false}
                  icon={<CalendarPlus size={13} strokeWidth={1.75} />}
                >
                  Agregar al calendario
                </Button>
              </div>
            </Reveal>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
