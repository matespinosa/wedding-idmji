"use client";

import { FloralBranch, RoseBloom } from "@/components/ui/Florals";
import { cn } from "@/lib/utils";

/* ————————————————————————————————————————————————
   Placa ilustrada con forma orgánica. Hoy funciona como pieza
   editorial (palabra + botánica); mañana puede recibir la foto
   real del momento — basta con pasarle children con un <img>.
   ———————————————————————————————————————————————— */

const tones = [
  "from-[#f3ead9] via-[#eadcc3] to-[#dcc7a4]",
  "from-[#efe8dd] via-[#e3d6c3] to-[#cbb897]",
  "from-[#f5efe3] via-[#e9dabf] to-[#d5bd92]",
  "from-[#f1e9dc] via-[#e0d0b8] to-[#c6ad85]",
  "from-[#f4ecdd] via-[#e6d5b9] to-[#d0b68c]",
  "from-[#f0e7d8] via-[#e2d3bd] to-[#c9b28a]",
];

const shapes = [
  "rounded-[58%_42%_55%_45%/48%_55%_45%_52%]",
  "rounded-[45%_55%_42%_58%/55%_45%_58%_45%]",
  "rounded-[52%_48%_60%_40%/45%_58%_42%_55%]",
];

const hoverShapes = [
  "group-hover:rounded-[45%_55%_48%_52%/55%_45%_52%_48%]",
  "group-hover:rounded-[55%_45%_58%_42%/45%_55%_42%_58%]",
  "group-hover:rounded-[42%_58%_45%_55%/58%_42%_55%_45%]",
];

type Props = {
  word: string;
  index: number;
  className?: string;
};

export function ArtFrame({ word, index, className }: Props) {
  const tone = tones[index % tones.length];
  const shape = shapes[index % shapes.length];
  const hoverShape = hoverShapes[index % hoverShapes.length];
  const Botanical = index % 2 === 0 ? FloralBranch : RoseBloom;

  return (
    <div className={cn("group relative", className)}>
      <div
        className={cn(
          "relative h-72 overflow-hidden border border-ink/[0.07] bg-gradient-to-br shadow-[0_30px_80px_-40px_rgba(27,27,27,0.35)] transition-all duration-[1400ms] ease-out-expo group-hover:scale-[1.025] md:h-96",
          tone,
          shape,
          hoverShape,
        )}
      >
        {/* botanical watermark */}
        <Botanical
          className={cn(
            "absolute h-[135%] text-ink/[0.13] transition-transform duration-[1600ms] ease-out-expo group-hover:rotate-[4deg] group-hover:scale-110",
            index % 2 === 0
              ? "-right-8 -top-6 rotate-[18deg]"
              : "-left-10 -bottom-8 -rotate-[12deg]",
          )}
        />
        {/* index */}
        <span className="absolute left-7 top-6 text-[11px] font-medium uppercase tracking-[0.35em] text-bronze/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* word */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="font-serif text-4xl font-light italic tracking-wide text-ink/30 transition-colors duration-700 group-hover:text-ink/45 md:text-5xl">
            {word}
          </span>
        </span>
        {/* sheen on hover */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1300ms] ease-out-expo group-hover:translate-x-full"
        />
      </div>
    </div>
  );
}
