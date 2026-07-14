"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type LenisApi = {
  scrollTo: (target: string | number, opts?: { offset?: number }) => void;
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number, opts?: { offset?: number }) => {
      const offset = opts?.offset ?? -64;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.6 });
      } else if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView();
      } else {
        window.scrollTo(0, target);
      }
    },
    [],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <LenisContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
