import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Honeypot: los bots llenan el campo oculto — respondemos ok sin guardar.
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const { website: _website, ...rsvp } = parsed.data;

    // TODO: persistir la confirmación — por ejemplo con Resend (email),
    // Google Sheets o una base de datos. Por ahora queda en los logs del server.
    console.log(
      "[RSVP]",
      JSON.stringify({ ...rsvp, receivedAt: new Date().toISOString() }),
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
