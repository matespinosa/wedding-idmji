# Mateo & Julieth — Invitación digital de boda

Sitio de invitación tipo *one-page* construido con Next.js 15, TypeScript, TailwindCSS 4, Framer Motion y Lenis. Experiencia cinemática: preloader de doble cortina, scroll suave, parallax, línea de tiempo animada, dress code ilustrado a mano en SVG y RSVP con validación.

## Requisitos

- Node.js ≥ 18.18 (recomendado 20+)

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm start         # servir el build
```

## Editar el contenido

**Todo el contenido vive en [`lib/content.ts`](lib/content.ts)** — nombres, fecha, textos de la historia, lugares, horas, paletas del dress code y mensajes. No hace falta tocar componentes.

Datos de ejemplo pendientes de reemplazar:

- Fecha (hoy: sábado 21 de noviembre de 2026)
- Iglesia y lugar de recepción (nombres y direcciones son placeholders)
- Enlaces reales de Google Maps (`mapsUrl`)
- Instagram y hashtag

## Fotos reales

Los momentos de la historia usan placas ilustradas ([`components/ui/ArtFrame.tsx`](components/ui/ArtFrame.tsx)) con formas orgánicas. Cuando tengan fotos, ese componente es el único lugar a modificar: se reemplaza el interior de la placa por un `<Image>` de Next manteniendo la máscara orgánica y el hover.

## RSVP

El formulario valida con Zod (cliente y servidor) y envía a `POST /api/rsvp`. Hoy las confirmaciones quedan en los logs del servidor; en [`app/api/rsvp/route.ts`](app/api/rsvp/route.ts) está marcado el punto para conectar Resend (email), Google Sheets o una base de datos.

## Sistema de diseño

- **Tokens** (color, tipografía, curvas de easing, animaciones ambiente): `app/globals.css` bajo `@theme`
- **Vocabulario de movimiento** (easings, duraciones, variants reutilizables): `lib/motion.ts`
- **Primitivas**: `components/ui/` — `TextReveal` (máscaras letra a letra), `Reveal` (fade + blur + rise), `Magnetic`, `Button`, `SectionHeading`, `SectionDivider`, florales SVG dibujados a mano

## Accesibilidad y rendimiento

- `prefers-reduced-motion` respetado (Framer `MotionConfig`, Lenis desactivado, keyframes CSS anulados)
- HTML semántico, labels reales en el formulario, foco visible dorado, navegación por teclado (Escape cierra el menú móvil)
- Sin imágenes rasterizadas: toda la gráfica es SVG/CSS — el peso de página se mantiene mínimo
