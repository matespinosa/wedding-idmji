import { cn } from "@/lib/utils";

type Props = {
  /** Background = the section we're leaving. */
  bg: string;
  /** SVG fill color utility, e.g. fill-ink / fill-cream. */
  fill: string;
  flip?: boolean;
  className?: string;
};

/** Soft asymmetric wave between sections — no hard cuts. */
export function SectionDivider({ bg, fill, flip = false, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        // -mb-px cierra el pelo de anti-aliasing entre la onda y la
        // sección siguiente (si no, el cream del body asoma como línea).
        "relative -mb-px leading-[0]",
        bg,
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("block h-16 w-full md:h-24", fill, flip && "rotate-180")}
      >
        <path d="M0,72 C240,24 480,104 720,60 C960,16 1200,88 1440,44 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
