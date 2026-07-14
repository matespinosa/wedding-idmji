/* ————————————————————————————————————————————————
   Todo el contenido del sitio vive aquí.
   Edita este archivo para cambiar textos, fechas y lugares
   sin tocar ningún componente.

   Invitación a la ceremonia religiosa de Mateo & Julieth · Bogotá.
   ———————————————————————————————————————————————— */

/** Sábado 3 de octubre de 2026 — hora de la ceremonia (Bogotá, UTC-5). */
export const WEDDING_DATE = new Date("2026-10-03T11:00:00-05:00");

export const site = {
  couple: {
    him: "Mateo",
    her: "Julieth",
    full: "Mateo & Julieth",
  },

  date: {
    display: "Sábado · 3 de octubre · 2026",
    long: "Sábado, 3 de octubre de 2026",
    short: "03 . 10 . 2026",
    badge: "Mateo & Julieth · 03 · 10 · 26 · ",
    city: "Bogotá, Colombia",
  },

  nav: [
    { label: "Historia", href: "#historia" },
    { label: "Ceremonia", href: "#ceremonia" },
    { label: "Vestuario", href: "#dress-code" },
  ],

  hero: {
    eyebrow: "Invitación a nuestra boda en la iglesia",
    cta: "Conoce nuestra historia",
    scrollHint: "Desliza",
  },

  countdown: {
    eyebrow: "Cuenta regresiva",
    title: "3 de octubre, 2026",
    subtitle: "Bogotá · Colombia",
    today: "¡Hoy nos casamos!",
    labels: { days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg" },
  },

  story: {
    eyebrow: "Nuestra historia",
    title: "Un amor guiado por el tiempo de Dios",
    verse: "«El amor todo lo cree, todo lo espera, todo lo soporta.»",
    verseRef: "1 Corintios 13:7",
    moments: [
      {
        title: "Dios cruzó nuestros caminos",
        text: "Hace 4 años y medio… nos conocimos. Entre conversaciones, confianza y apoyo, Dios empezó a escribir nuestra historia.",
        word: "Encuentro",
      },
      {
        title: "Antes del amor, fuimos amigos",
        text: "Nos convertimos en mejores amigos y en refugio el uno del otro. Sin saberlo, el amor ya crecía con paciencia.",
        word: "Amistad",
      },
      {
        title: "El tiempo perfecto",
        text: "Hoy, en el momento indicado, damos este paso con gratitud, fe y la certeza de caminar juntos.",
        word: "Siempre",
      },
    ],
  },

  venues: {
    eyebrow: "Invitación formal",
    title: "Acompáñanos en nuestra ceremonia religiosa",
    intro:
      "Con la bendición de Dios y el amor de nuestras familias, tenemos el honor de invitarte a compartir el momento en que uniremos nuestras vidas en matrimonio.",
    arrival: "Te agradecemos llegar 20 minutos antes para ingresar con calma y acompañarnos desde el inicio.",
    ceremony: {
      kind: "Ceremonia religiosa",
      name: "Iglesia de Dios Ministerial de Jesucristo Internacional",
      address: "Sede La Colina",
      city: "Bogotá, Colombia",
      time: "11:00 a. m.",
      image: "/images/la-colina-church.webp",
      imageAlt:
        "Iglesia de Dios Ministerial de Jesucristo Internacional, sede La Colina",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Iglesia+de+Dios+Ministerial+de+Jesucristo+Internacional+sede+La+Colina+Bogota",
      calendar: {
        title: "Boda de Mateo & Julieth — Ceremonia",
        description:
          "Ceremonia religiosa de la boda de Mateo & Julieth.",
        location:
          "Iglesia de Dios Ministerial de Jesucristo Internacional, sede La Colina, Bogotá",
        startLocal: "20261003T110000",
        endLocal: "20261003T123000",
      },
    },
  },

  dresscode: {
    eyebrow: "Una nota especial",
    title: "Etiqueta formal",
    intro: "Te invitamos a vestir de manera formal.",
    men: {
      label: "Hombres",
      garment: "Traje formal",
    },
    women: {
      label: "Mujeres",
      garment: "Vestido formal",
    },
    note: "El blanco está reservado para la novia.",
  },

  closing: {
    verse: "«Y sobre todas estas cosas, vestíos de amor, que es el vínculo perfecto.»",
    verseRef: "Colosenses 3:14",
    quote: "Será una alegría contar con tu presencia en este momento tan especial.",
    farewell: "Con todo nuestro amor,",
    tagline: "Con amor · Bogotá · 2026",
    image: "/images/cierre.jpg",
  },
} as const;

export type Site = typeof site;
