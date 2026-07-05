"use client";

import { motion } from "framer-motion";
import { draw } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ————————————————————————————————————————————————
   Hand-drawn botanical line art. Stroke-only, tinted via
   currentColor so sections control color and opacity.
   With `animate`, paths draw themselves on scroll.
   ———————————————————————————————————————————————— */

type FloralProps = {
  className?: string;
  animate?: boolean;
  strokeWidth?: number;
};

const svgProps = (animate: boolean) =>
  animate
    ? {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.4 },
      }
    : {};

function Path({
  d,
  i = 0,
  animate,
  strokeWidth = 1.3,
}: {
  d: string;
  i?: number;
  animate?: boolean;
  strokeWidth?: number;
}) {
  if (!animate) {
    return <path d={d} strokeWidth={strokeWidth} />;
  }
  return <motion.path d={d} strokeWidth={strokeWidth} variants={draw(1.9)} custom={i} />;
}

/** Tall branch with alternating almond leaves and berries. */
export function FloralBranch({ className, animate = false, strokeWidth = 1.3 }: FloralProps) {
  const paths = [
    "M82,252 C70,206 86,168 76,128 C68,96 76,52 94,16",
    "M77,210 C60,206 50,194 48,178 C64,182 74,194 77,210Z",
    "M79,182 C96,178 106,166 108,150 C92,154 82,166 79,182Z",
    "M74,146 C57,142 47,130 45,114 C61,118 71,130 74,146Z",
    "M77,116 C94,112 104,100 106,84 C90,88 80,100 77,116Z",
    "M82,80 C67,76 58,66 56,52 C70,56 79,66 82,80Z",
    "M88,52 C100,48 107,40 109,29 C97,32 90,40 88,52Z",
  ];
  return (
    <motion.svg
      viewBox="0 0 160 260"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("block", className)}
      {...svgProps(animate)}
    >
      {paths.map((d, i) => (
        <Path key={i} d={d} i={i} animate={animate} strokeWidth={strokeWidth} />
      ))}
      <circle cx="97" cy="22" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="104" cy="31" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="90" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </motion.svg>
  );
}

/** Open garden rose drawn as a loose spiral, with two leaves. */
export function RoseBloom({ className, animate = false, strokeWidth = 1.3 }: FloralProps) {
  const paths = [
    "M60,60 c5,-2 9,2 7,7 c-3,7 -13,7 -16,-1 c-4,-11 8,-19 17,-15 c12,5 11,22 -1,26 c-16,6 -29,-8 -23,-24 c7,-18 32,-18 39,0 c4,11 -1,22 -9,28",
    "M58,90 C56,104 46,112 34,114 C38,102 46,93 58,90Z",
    "M66,90 C68,104 78,112 90,114 C86,102 78,93 66,90Z",
    "M62,88 L62,120",
  ];
  return (
    <motion.svg
      viewBox="0 0 120 130"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("block", className)}
      {...svgProps(animate)}
    >
      {paths.map((d, i) => (
        <Path key={i} d={d} i={i} animate={animate} strokeWidth={strokeWidth} />
      ))}
    </motion.svg>
  );
}

/** Interlaced wedding rings with a spark. */
export function RingsOrnament({ className, animate = false, strokeWidth = 1.4 }: FloralProps) {
  return (
    <motion.svg
      viewBox="0 0 130 84"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden
      className={cn("block", className)}
      {...svgProps(animate)}
    >
      {animate ? (
        <>
          <motion.circle cx="52" cy="46" r="26" strokeWidth={strokeWidth} variants={draw(1.6)} custom={0} />
          <motion.circle cx="80" cy="40" r="26" strokeWidth={strokeWidth} variants={draw(1.6)} custom={1} />
          <motion.path d="M108,8 l0,12 M102,14 l12,0" strokeWidth={strokeWidth} variants={draw(0.8)} custom={2} />
        </>
      ) : (
        <>
          <circle cx="52" cy="46" r="26" strokeWidth={strokeWidth} />
          <circle cx="80" cy="40" r="26" strokeWidth={strokeWidth} />
          <path d="M108,8 l0,12 M102,14 l12,0" strokeWidth={strokeWidth} />
        </>
      )}
    </motion.svg>
  );
}
