"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Clock, MapPin, Minus, Plus, Send } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { FloralBranch } from "@/components/ui/Florals";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/content";
import { EASE_OUT, EASE_SOFT } from "@/lib/motion";
import { rsvpSchema, type RsvpInput } from "@/lib/rsvp-schema";
import { cn } from "@/lib/utils";

/* ————————————————————————————————————————————————
   Estilos de campo: subrayado editorial + etiqueta flotante.
   El label vive DESPUÉS del input para poder usar `peer`.
   ———————————————————————————————————————————————— */

const inputCls =
  "peer w-full border-b border-ink/15 bg-transparent pt-6 pb-2.5 text-[15px] text-ink placeholder-transparent outline-none transition-colors duration-500 focus:border-gold-deep";

const labelCls =
  "pointer-events-none absolute left-0 top-6 text-[15px] text-ink/45 transition-all duration-300 " +
  "peer-focus:top-0.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-bronze " +
  "peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:text-ink/50";

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-xs text-clay"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessView({
  name,
  attendance,
  onReset,
}: {
  name: string;
  attendance: "si" | "no";
  onReset: () => void;
}) {
  const firstName = name.trim().split(" ")[0] || "invitado";
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="flex min-h-[28rem] flex-col items-center justify-center py-8 text-center"
    >
      <svg viewBox="0 0 76 76" className="size-20 text-gold-deep" aria-hidden>
        <motion.circle
          cx="38"
          cy="38"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: EASE_SOFT }}
        />
        <motion.path
          d="M24,39 L34,49 L53,29"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.9 }}
        />
      </svg>

      <h3 className="mt-8 font-serif text-4xl font-light text-ink">
        ¡Gracias, <span className="italic text-gold-deep">{firstName}</span>!
      </h3>
      <p className="mx-auto mt-4 max-w-sm text-[15px] leading-[1.85] text-ink/60">
        {attendance === "si" ? site.rsvp.success.yes : site.rsvp.success.no}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-[11px] uppercase tracking-[0.25em] text-bronze underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        Enviar otra respuesta
      </button>
    </motion.div>
  );
}

export function Rsvp() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [submitted, setSubmitted] = useState<{
    name: string;
    attendance: "si" | "no";
  }>({ name: "", attendance: "si" });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      attendance: "si",
      guests: 2,
      restrictions: "",
      message: "",
      website: "",
    },
  });

  const attending = watch("attendance") === "si";

  const onSubmit = async (values: RsvpInput) => {
    setStatus("loading");
    try {
      // La espera mínima le da peso a la transición de éxito.
      const [res] = await Promise.all([
        fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
        new Promise((r) => setTimeout(r, 900)),
      ]);
      if (!res.ok) throw new Error("request failed");
      setSubmitted({ name: values.name, attendance: values.attendance });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-cream py-28 md:py-40">
      {/* Ambiente detrás del vidrio */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-drift absolute right-[-10%] top-[-6%] size-[34rem] rounded-full bg-gold/[0.14] blur-3xl" />
        <div className="animate-drift-slow absolute bottom-[-12%] left-[-8%] size-[38rem] rounded-full bg-sand/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Columna editorial */}
        <div className="lg:pt-8">
          <SectionHeading
            align="left"
            eyebrow={site.rsvp.eyebrow}
            title={site.rsvp.title}
            description={site.rsvp.intro}
          />

          <Reveal delay={0.3} y={18}>
            <p className="mt-6 inline-block rounded-full border border-gold/40 bg-gold/[0.08] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              {site.rsvp.deadline}
            </p>
          </Reveal>

          <Reveal delay={0.4} y={18}>
            <ul className="mt-10 space-y-4 text-[14px] text-ink/60">
              <li className="flex items-center gap-3">
                <CalendarHeart size={16} strokeWidth={1.75} className="text-gold-deep" />
                {site.date.long}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} strokeWidth={1.75} className="text-gold-deep" />
                Ceremonia {site.venues.ceremony.time} · Recepción{" "}
                {site.venues.reception.time}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} strokeWidth={1.75} className="text-gold-deep" />
                {site.date.city}
              </li>
            </ul>
          </Reveal>

          <FloralBranch
            animate
            className="mt-12 hidden h-56 -rotate-12 text-gold/30 lg:block"
          />
        </div>

        {/* Tarjeta de vidrio */}
        <Reveal delay={0.15} y={40} blur={false}>
          <div className="relative rounded-[32px] border border-white/80 bg-white/50 p-7 shadow-[0_60px_150px_-70px_rgba(27,27,27,0.45)] backdrop-blur-2xl md:p-12">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessView
                  name={submitted.name}
                  attendance={submitted.attendance}
                  onReset={() => {
                    reset();
                    setStatus("idle");
                  }}
                />
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="space-y-7"
                >
                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                    {...register("website")}
                  />

                  <Field id="rsvp-name" label="Nombre completo" error={errors.name?.message}>
                    <input
                      id="rsvp-name"
                      type="text"
                      placeholder=" "
                      autoComplete="name"
                      className={inputCls}
                      {...register("name")}
                    />
                  </Field>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field id="rsvp-email" label="Correo electrónico" error={errors.email?.message}>
                      <input
                        id="rsvp-email"
                        type="email"
                        placeholder=" "
                        autoComplete="email"
                        className={inputCls}
                        {...register("email")}
                      />
                    </Field>
                    <Field id="rsvp-phone" label="Teléfono" error={errors.phone?.message}>
                      <input
                        id="rsvp-phone"
                        type="tel"
                        placeholder=" "
                        autoComplete="tel"
                        className={inputCls}
                        {...register("phone")}
                      />
                    </Field>
                  </div>

                  {/* Asistencia */}
                  <fieldset>
                    <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-bronze">
                      ¿Nos acompañarás?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { value: "si", label: "¡Sí, con alegría!" },
                          { value: "no", label: "No podré asistir" },
                        ] as const
                      ).map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            type="radio"
                            value={option.value}
                            className="peer sr-only"
                            {...register("attendance")}
                          />
                          <span className="flex items-center justify-center rounded-full border border-ink/15 px-4 py-3.5 text-center text-[13px] text-ink/70 transition-all duration-500 hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Detalles solo si asiste */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: attending ? "auto" : 0,
                      opacity: attending ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="!mt-0 space-y-7 overflow-hidden"
                  >
                    <div className="pt-7">
                      <Controller
                        name="guests"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-end justify-between border-b border-ink/15 pb-3">
                            <span className="text-[15px] text-ink/60">
                              Número de invitados
                            </span>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                aria-label="Quitar un invitado"
                                onClick={() =>
                                  field.onChange(Math.max(1, (field.value || 1) - 1))
                                }
                                className="grid size-9 place-items-center rounded-full border border-ink/15 text-ink/60 transition-all duration-300 hover:border-gold-deep hover:text-gold-deep active:scale-90"
                              >
                                <Minus size={14} />
                              </button>
                              <motion.span
                                key={field.value}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.35, ease: EASE_OUT }}
                                className="w-7 text-center font-serif text-2xl text-ink"
                                aria-live="polite"
                              >
                                {field.value}
                              </motion.span>
                              <button
                                type="button"
                                aria-label="Añadir un invitado"
                                onClick={() =>
                                  field.onChange(Math.min(8, (field.value || 1) + 1))
                                }
                                className="grid size-9 place-items-center rounded-full border border-ink/15 text-ink/60 transition-all duration-300 hover:border-gold-deep hover:text-gold-deep active:scale-90"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    </div>

                    <Field
                      id="rsvp-restrictions"
                      label="Restricciones alimentarias (opcional)"
                      error={errors.restrictions?.message}
                    >
                      <input
                        id="rsvp-restrictions"
                        type="text"
                        placeholder=" "
                        className={inputCls}
                        {...register("restrictions")}
                      />
                    </Field>
                  </motion.div>

                  <Field
                    id="rsvp-message"
                    label="Un mensaje para nosotros (opcional)"
                    error={errors.message?.message}
                  >
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      placeholder=" "
                      className={cn(inputCls, "resize-none")}
                      {...register("message")}
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden rounded-full bg-ink py-4.5 text-[11px] font-medium uppercase tracking-[0.25em] text-cream transition-opacity duration-300 disabled:cursor-wait disabled:opacity-80"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gold-deep transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-3 py-0.5">
                      {status === "loading" ? (
                        <span
                          aria-label="Enviando"
                          className="size-4 animate-spin rounded-full border border-cream/30 border-t-cream"
                        />
                      ) : (
                        <>
                          Enviar confirmación
                          <Send
                            size={13}
                            strokeWidth={1.75}
                            className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-xs text-clay"
                      >
                        Algo salió mal al enviar tu confirmación. Por favor
                        intenta de nuevo.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
