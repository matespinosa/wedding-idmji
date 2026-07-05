"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Split granularity. Chars for short display text, words for sentences. */
  per?: "char" | "word";
  delay?: number;
  stagger?: number;
  duration?: number;
  /** "inview" animates on scroll; "controlled" waits for `started`. */
  mode?: "inview" | "controlled";
  started?: boolean;
  once?: boolean;
};

/**
 * Masked text reveal — each fragment rises out of an overflow-hidden slot.
 * The py/-my trick keeps serif descenders (J, p, y) from being clipped at rest.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "span",
  per = "word",
  delay = 0,
  stagger = 0.045,
  duration = 1,
  mode = "inview",
  started = true,
  once = true,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const fragment: Variants = {
    hidden: { y: "118%" },
    show: { y: "0%", transition: { duration, ease: EASE_OUT } },
  };

  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        variants={container}
        initial="hidden"
        {...(mode === "controlled"
          ? { animate: started ? "show" : "hidden" }
          : { whileInView: "show", viewport: { once, amount: 0.6 } })}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {(per === "char" ? word.split("") : [word]).map((piece, pi) => (
              <span
                key={pi}
                className="inline-block overflow-hidden py-[0.12em] -my-[0.12em] align-bottom"
              >
                <motion.span
                  variants={fragment}
                  className="inline-block will-change-transform"
                >
                  {piece}
                </motion.span>
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
