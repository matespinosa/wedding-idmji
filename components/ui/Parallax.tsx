"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ————————————————————————————————————————————————
   Parallax con GSAP + ScrollTrigger (scrub). En puntero fino (ratón)
   el desplazamiento vertical se siente; en táctil se omite porque
   recomponer la foto en cada frame de scroll deja el iPhone trabado.
   ———————————————————————————————————————————————— */

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Recorrido total en px hacia cada lado. */
  amount?: number;
  children?: ReactNode;
};

/** Imagen con parallax. La capa interior sobresale `amount` px arriba y
 *  abajo para que el desplazamiento nunca deje bordes vacíos. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority,
  amount = 48,
  children,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    /* En táctil el transform dentro de overflow-hidden recompone la foto
       en cada frame de scroll; el nativo se siente más ligero sin él. */
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <div
        ref={layerRef}
        className="absolute left-0 right-0"
        style={{ top: -amount, bottom: -amount }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
      {children}
    </div>
  );
}

/** Hook de parallax: devuelve un ref para aplicar el desplazamiento a
 *  cualquier elemento (útil cuando ya hay una estructura propia, p. ej. el Hero). */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  amount = 40,
  mobileOnly = false,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (mobileOnly && window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount, mobileOnly]);

  return ref;
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Recorrido total en px hacia cada lado. */
  amount?: number;
  /** Si es true, el parallax solo se activa por debajo de `md` (móvil). */
  mobileOnly?: boolean;
};

/** Envoltura de parallax para contenido arbitrario (texto, adornos…). */
export function Parallax({
  children,
  className,
  amount = 40,
  mobileOnly = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (mobileOnly && window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount, mobileOnly]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
