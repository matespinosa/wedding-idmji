export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  /** Local time, compact format: YYYYMMDDTHHMMSS */
  startLocal: string;
  endLocal: string;
  timeZone?: string;
};

export function googleCalendarUrl(e: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.startLocal}/${e.endLocal}`,
    ctz: e.timeZone ?? "America/Bogota",
    details: e.description ?? "",
    location: e.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Deterministic PRNG so decorative "random" positions match on server and client. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
