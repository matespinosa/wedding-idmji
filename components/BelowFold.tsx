"use client";

import { useEffect, type ReactNode } from "react";
import { useSiteSettled } from "@/components/providers/load-context";

/**
 * Everything below the hero stays out of the DOM until the envelope has
 * finished opening. While the letter is closed the whole site lives inside a
 * clipped, scaled layer — mounting the gallery (and the rest) there forces
 * image decode and layout of a long page on every frame of the animation.
 */
export function BelowFold({ children }: { children: ReactNode }) {
  const settled = useSiteSettled();

  useEffect(() => {
    if (!settled) return;
    let cancelled = false;
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [settled]);

  if (!settled) return null;
  return children;
}
