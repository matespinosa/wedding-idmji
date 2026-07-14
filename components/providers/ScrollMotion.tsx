"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

type Props = {
  ready: boolean;
};

/**
 * Dirección de movimiento ligada al scroll.
 * Mantiene los efectos en transforms para sostener 60 fps en móviles.
 */
export function ScrollMotion({ ready }: Props) {
  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-story-step]").forEach((step) => {
          gsap.from(step, {
            autoAlpha: 0.28,
            y: 38,
            clipPath: "inset(0 0 18% 0)",
            duration: 0.85,
            ease: "power4.out",
            scrollTrigger: {
              trigger: step,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      media.add("(min-width: 768px)", () => {
        gsap.from("[data-story-step]", {
          autoAlpha: 0.3,
          y: 44,
          duration: 0.9,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-story-list]",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to("[data-story-floral]", {
        yPercent: 24,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-story-section]",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      gsap.fromTo(
        "[data-venue-parallax]",
        { yPercent: -7, scale: 1.12 },
        {
          yPercent: 7,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-venue-frame]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        },
      );

      gsap.fromTo(
        "[data-closing-parallax]",
        { yPercent: -6, scale: 1.14 },
        {
          yPercent: 6,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-closing-section]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        },
      );

      gsap.fromTo(
        "[data-closing-content]",
        { y: 34, scale: 0.975 },
        {
          y: -18,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-closing-section]",
            start: "top 88%",
            end: "center 42%",
            scrub: 0.8,
          },
        },
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, [ready]);

  return null;
}
