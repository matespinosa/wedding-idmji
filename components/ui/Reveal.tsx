"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE_OUT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Blur-in costs a little paint — disable for large surfaces. */
  blur?: boolean;
  amount?: number;
  once?: boolean;
  duration?: number;
};

/** The house scroll-reveal: rise, fade and de-blur on a long expo curve. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  blur = true,
  amount = 0.3,
  once = true,
  duration = DUR.base,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(10px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
