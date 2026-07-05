import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Cuéntanos tu nombre completo")
    .max(80, "Máximo 80 caracteres"),
  email: z.string().trim().email("Ingresa un correo válido"),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,17}$/, "Ingresa un teléfono válido"),
  attendance: z.enum(["si", "no"], {
    errorMap: () => ({ message: "Cuéntanos si podrás acompañarnos" }),
  }),
  guests: z
    .number({ invalid_type_error: "Indica el número de invitados" })
    .int()
    .min(0)
    .max(8, "Máximo 8 invitados"),
  restrictions: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  message: z.string().trim().max(500, "Máximo 500 caracteres").optional(),
  /** Honeypot anti-spam: siempre debe llegar vacío. */
  website: z.string().max(0).optional(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
