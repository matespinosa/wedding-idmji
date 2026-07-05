"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  className?: string;
  /** 0–1: how strongly the element leans toward the cursor. */
  strength?: number;
};

/** Cursor-magnet wrapper for buttons and icons. Inert on touch devices. */
export function Magnetic({ children, className, strength = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
