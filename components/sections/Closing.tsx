"use client";

import { motion } from "framer-motion";
import { FloralBranch, RoseBloom } from "@/components/ui/Florals";
import { ParallaxImage } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { mulberry32 } from "@/lib/utils";

/* Partículas doradas flotantes — deterministas para SSR. */
const rand = mulberry32(1311);
const PARTICLES = Array.from({ length: 22 }, () => ({
  left: 2 + rand() * 96,
  top: 6 + rand() * 86,
  size: 1.5 + rand() * 3.5,
  duration: 7 + rand() * 9,
  delay: rand() * 8,
  opacity: 0.15 + rand() * 0.45,
  blur: rand() > 0.65,
}));

/* ————————————————————————————————————————————————
   El cierre va en claro a propósito. El dress code ya es una sección
   de tinta, y encadenar dos bloques negros hacía que la despedida se
   leyera como una prolongación del anterior en vez de como el final.
   En crema, la foto queda velada como un recuerdo y el pie oscuro
   cierra el sitio con un último contraste.
   ———————————————————————————————————————————————— */
export function Closing() {
  return (
    <section
      id="gracias"
      className="relative overflow-hidden bg-cream py-32 text-ink md:py-44"
    >
      {/* Foto real de fondo.

          La máscara es lo que evita el corte: sin ella la imagen terminaba
          a filo en el borde de la sección y dejaba un canto recto justo
          debajo de la onda del divisor. Con ella, la foto nace y muere en
          nada, así que el cierre se funde con la tinta de arriba y con el
          pie de abajo en vez de pegarse contra ellos.

          Va en el envoltorio y no en la imagen: así el desvanecido queda
          anclado a la sección y no se desplaza con el parallax. */}
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_26%,black_74%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_26%,black_74%,transparent_100%)]"
      >
        <ParallaxImage
          src={site.closing.image}
          alt=""
          sizes="100vw"
          amount={72}
          className="h-full w-full"
          imgClassName="object-center sepia-[0.3] saturate-[0.8]"
        />
      </div>
      {/* Velo plano: los bordes ya los resuelve la máscara, así que aquí
          solo queda bajar el contraste de la foto de forma pareja. La
          legibilidad la sostiene el halo crema del texto, igual que los
          nombres del hero sobre el arco. */}
      <div aria-hidden className="absolute inset-0 bg-cream/70" />
      {/* Viñeta y botánica ambiental */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(58%_52%_at_50%_38%,rgba(198,169,122,0.22),transparent_72%)]"
      />
      <FloralBranch className="pointer-events-none absolute -left-14 bottom-10 h-[26rem] rotate-[150deg] text-gold/25" />
      <RoseBloom className="pointer-events-none absolute -right-10 top-16 h-56 -rotate-12 text-gold/20" />

      {/* Partículas */}
      <div aria-hidden className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full bg-gold"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              filter: p.blur ? "blur(1.5px)" : undefined,
              animationDuration: `${p.duration}s`,
              animationDelay: `-${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* `text-shadow` se hereda, así que un solo halo aquí cubre todo el
          bloque y sostiene la lectura sobre las zonas claras de la foto. */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center [text-shadow:0_0_16px_rgba(247,243,238,0.95)]">
        <Reveal blur={false} y={16}>
          <p className="font-serif text-xl italic text-ink/75 md:text-2xl">
            {site.closing.verse}
          </p>
          <p className="mt-3 text-[12px] uppercase tracking-[0.3em] text-bronze">
            {site.closing.verseRef}
          </p>
        </Reveal>

        <Reveal delay={0.2} y={20}>
          <p className="mt-14 text-[13px] uppercase tracking-[0.3em] text-ink/70">
            {site.closing.farewell}
          </p>
        </Reveal>

        <Reveal delay={0.45} y={26}>
          <p className="mt-6 font-serif text-5xl font-light tracking-wide md:text-7xl">
            {site.couple.him}{" "}
            <span className="italic text-gold-deep">&amp;</span> {site.couple.her}
          </p>
        </Reveal>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.5 }}
          aria-hidden
          className="mt-12 h-px w-24 bg-gold/50"
        />

        <Reveal delay={0.55} y={16}>
          <p className="mt-10 text-[13px] uppercase tracking-[0.26em] text-bronze">
            {site.closing.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
