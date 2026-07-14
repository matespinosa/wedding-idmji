"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { site } from "@/lib/content";
import { EASE_CURTAIN, EASE_OUT } from "@/lib/motion";

const SEEN_KEY = "mj-preloader-seen";

/* ————————————————————————————————————————————————
   Secuencia de entrada: monograma sobre tinta, líneas que
   crecen, y una doble cortina (tinta + oro) que se levanta
   para revelar el hero. En visitas repetidas dura un instante.
   ———————————————————————————————————————————————— */

function MaskedChar({
  char,
  delay,
  className,
}: {
  char: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden py-[0.14em] -my-[0.14em]">
      <motion.span
        initial={{ y: "118%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
        className={`inline-block will-change-transform ${className ?? ""}`}
      >
        {char}
      </motion.span>
    </span>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const { stop, start } = useLenis();
  const [phase, setPhase] = useState<"enter" | "leaving" | "done">("enter");
  const [skip, setSkip] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");
    const fast = seen || !!reduced;
    if (fast) setSkip(true);

    document.documentElement.classList.add("overflow-hidden");
    stop();

    const holdMs = fast ? 250 : 2400;
    const t1 = window.setTimeout(() => setPhase("leaving"), holdMs);
    const t2 = window.setTimeout(
      () => onDoneRef.current(),
      holdMs + (fast ? 80 : 380),
    );
    const t3 = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("overflow-hidden");
      start();
    }, holdMs + (fast ? 500 : 1300));

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [reduced, stop, start]);

  if (phase === "done") return null;
  const leaving = phase === "leaving";

  return (
    <div className="fixed inset-0 z-[80]" role="status" aria-label="Cargando">
      {/* Cortina trasera dorada — sale con un breve retardo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gold"
        initial={false}
        animate={{ y: leaving ? "-101%" : "0%" }}
        transition={{ duration: 1.05, ease: EASE_CURTAIN, delay: leaving ? 0.12 : 0 }}
      />

      {/* Cortina principal de tinta con el monograma */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-ink"
        initial={false}
        animate={{ y: leaving ? "-101%" : "0%" }}
        transition={{ duration: 1, ease: EASE_CURTAIN }}
      >
        <motion.div
          animate={leaving ? { y: -70, opacity: 0.35 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_CURTAIN }}
          className="flex flex-col items-center px-6 text-center"
        >
          {!skip && (
            <>
              <div className="flex items-baseline gap-3 font-serif text-cream md:gap-5">
                <MaskedChar
                  char="M"
                  delay={0.3}
                  className="text-7xl font-light md:text-8xl"
                />
                <MaskedChar
                  char="&"
                  delay={0.46}
                  className="text-5xl italic text-gold md:text-6xl"
                />
                <MaskedChar
                  char="J"
                  delay={0.62}
                  className="text-7xl font-light md:text-8xl"
                />
              </div>

              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.9 }}
                className="mt-8 h-px w-28 origin-center bg-gold/60"
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.15 }}
                className="mt-6 text-[10px] uppercase tracking-[0.45em] text-cream/50"
              >
                Ceremonia religiosa · {site.date.short}
              </motion.p>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
