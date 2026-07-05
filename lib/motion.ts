import type { Variants } from "framer-motion";

/* ————————————————————————————————————————————————
   Motion language — shared curves, durations, variants.
   One vocabulary so every section moves the same way.
   ———————————————————————————————————————————————— */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SOFT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_CURTAIN: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
} as const;

export const VIEWPORT = { once: true, amount: 0.3 } as const;

export const springSoft = {
  type: "spring",
  stiffness: 120,
  damping: 19,
  mass: 0.7,
} as const;

export const springSnappy = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.6,
} as const;

/** Rise + de-blur. The signature reveal of the site. */
export const fadeUp = (delay = 0, y = 30): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.base, ease: EASE_OUT, delay },
  },
});

/** Simple fade, for elements that shouldn't travel. */
export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE_OUT, delay } },
});

/** Scale-in for ornaments and badges. */
export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE_OUT, delay },
  },
});

/** Orchestrates children reveals. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** SVG line-drawing (florals, illustrations, check marks). */
export const draw = (duration = 1.8): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: EASE_SOFT, delay: 0.14 * i },
      opacity: { duration: 0.3, delay: 0.14 * i },
    },
  }),
});
