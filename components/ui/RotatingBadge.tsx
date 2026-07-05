"use client";

import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

/** Circular rotating text badge with the serif ampersand at its heart. */
export function RotatingBadge({ text, className }: Props) {
  return (
    <div className={cn("relative size-28 md:size-32", className)} aria-hidden>
      <svg viewBox="0 0 100 100" className="size-full animate-spin-slow">
        <defs>
          <path
            id="badge-circle"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <text className="fill-bronze text-[8px] uppercase tracking-[0.24em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-serif text-2xl italic text-gold">
        &amp;
      </span>
    </div>
  );
}
