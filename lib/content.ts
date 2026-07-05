/* ————————————————————————————————————————————————
   Todo el contenido del sitio vive aquí.
   Edita este archivo para cambiar textos, fechas y lugares
   sin tocar ningún componente.

   ⚠️ PENDIENTES DE CONFIRMAR (datos de ejemplo):
   — Fecha exacta de la boda
   — Nombres y direcciones reales de la iglesia y el lugar de recepción
   — Enlaces reales de Google Maps
   — Instagram / hashtag
   ———————————————————————————————————————————————— */

export const site = {
  couple: {
    him: "Mateo",
    her: "Julieth",
    full: "Mateo & Julieth",
    hashtag: "#MateoYJulieth",
  },

  date: {
    display: "Sábado · 21 de noviembre · 2026",
    long: "Sábado, 21 de noviembre de 2026",
    short: "21 . 11 . 2026",
    badge: "Mateo & Julieth · 21 · 11 · 26 · ",
    city: "Medellín, Colombia",
  },

  nav: [
    { label: "Historia", href: "#historia" },
    { label: "Ceremonia", href: "#ceremonia" },
    { label: "Dress code", href: "#dress-code" },
    { label: "RSVP", href: "#rsvp" },
  ],

  hero: {
    eyebrow: "Nos casamos",
    cta: "Descubre nuestra historia",
    scrollHint: "Desliza",
  },

  story: {
    eyebrow: "Nuestra historia",
    title: "Un amor escrito en el tiempo de Dios",
    verse: "«El amor todo lo cree, todo lo espera, todo lo soporta.»",
    verseRef: "1 Corintios 13:7",
    moments: [
      {
        title: "El encuentro",
        text: "Dios cruzó nuestros caminos hace casi cuatro años y medio. Lo que parecía una casualidad era, en realidad, el comienzo de todo.",
        word: "Encuentro",
      },
      {
        title: "Mejores amigos",
        text: "Antes que nada, fuimos amigos. De esos que se buscan sin excusa y se encuentran sin esfuerzo.",
        word: "Amistad",
      },
      {
        title: "Horas de conversación",
        text: "Podíamos hablar durante horas y el tiempo nunca era suficiente. Cada conversación era un lugar al que queríamos volver.",
        word: "Palabras",
      },
      {
        title: "Confidentes",
        text: "Nos convertimos en el refugio del otro: la primera llamada en los días buenos y también en los difíciles.",
        word: "Refugio",
      },
      {
        title: "El amor siempre estuvo",
        text: "El amor siempre estuvo ahí — en silencio, paciente, esperando su momento para florecer.",
        word: "Amor",
      },
      {
        title: "El tiempo perfecto",
        text: "Y en el momento indicado, Dios hizo que todo sucediera. Hoy caminamos juntos hacia el altar.",
        word: "Siempre",
      },
    ],
  },

  venues: {
    eyebrow: "El gran día",
    title: "Ceremonia & Recepción",
    intro:
      "Dos momentos, un mismo día inolvidable. Te esperamos para celebrar juntos.",
    ceremony: {
      kind: "Ceremonia religiosa",
      name: "Parroquia Santa María de los Ángeles",
      address: "Cra. 43B № 16-24, El Poblado",
      city: "Medellín",
      time: "4:00 p. m.",
      mapsUrl:
        "https://maps.google.com/?q=Parroquia+Santa+Maria+de+los+Angeles+El+Poblado+Medellin",
      calendar: {
        title: "Boda de Mateo & Julieth — Ceremonia",
        description:
          "Ceremonia religiosa de la boda de Mateo & Julieth. ¡Te esperamos!",
        location:
          "Parroquia Santa María de los Ángeles, Cra. 43B № 16-24, El Poblado, Medellín",
        startLocal: "20261121T160000",
        endLocal: "20261121T173000",
      },
    },
    reception: {
      kind: "Recepción",
      name: "Hacienda San Esteban",
      address: "Km 12 vía Las Palmas",
      city: "Envigado",
      time: "7:00 p. m.",
      mapsUrl: "https://maps.google.com/?q=Hacienda+San+Esteban+Las+Palmas+Envigado",
      calendar: {
        title: "Boda de Mateo & Julieth — Recepción",
        description:
          "Recepción de la boda de Mateo & Julieth. ¡Celebremos juntos!",
        location: "Hacienda San Esteban, Km 12 vía Las Palmas, Envigado",
        startLocal: "20261121T190000",
        endLocal: "20261122T020000",
      },
    },
  },

  dresscode: {
    eyebrow: "Dress code",
    title: "Etiqueta elegante",
    intro:
      "Queremos que esa noche todos nos veamos y nos sintamos espectaculares.",
    men: {
      label: "Ellos",
      garment: "Traje formal",
      notes: ["Tonos oscuros y sobrios", "Corbata o corbatín — a tu elección"],
      palette: [
        { name: "Carbón", hex: "#2e2e2e" },
        { name: "Azul noche", hex: "#232a36" },
        { name: "Gris piedra", hex: "#6b6560" },
        { name: "Café oscuro", hex: "#4a3a2e" },
      ],
    },
    women: {
      label: "Ellas",
      garment: "Vestido largo elegante",
      notes: ["Tonos tierra, oliva y neutros", "Largo hasta el suelo, si es posible"],
      palette: [
        { name: "Terracota", hex: "#9c5b4a" },
        { name: "Oliva", hex: "#7a7a5c" },
        { name: "Arena", hex: "#c9b99f" },
        { name: "Tierra", hex: "#a67b5b" },
      ],
    },
    note: "El color blanco queda reservado para la novia.",
  },

  rsvp: {
    eyebrow: "Confirma tu asistencia",
    title: "¿Nos acompañas?",
    intro:
      "Tu presencia es nuestro mejor regalo. Ayúdanos a preparar cada detalle confirmando tu asistencia.",
    deadline: "Por favor confirma antes del 21 de octubre de 2026.",
    success: {
      yes: "Hemos recibido tu confirmación. Nos hace muy felices saber que estarás con nosotros ese día.",
      no: "Gracias por avisarnos. Te vamos a extrañar, pero sabemos que estarás con nosotros de corazón.",
    },
  },

  closing: {
    verse: "«Y sobre todas estas cosas, vestíos de amor, que es el vínculo perfecto.»",
    verseRef: "Colosenses 3:14",
    quote: "No podemos esperar para celebrar este día tan especial contigo.",
    farewell: "Con todo nuestro amor,",
    instagram: "https://instagram.com", // TODO: enlace real
  },
} as const;

export type Site = typeof site;
