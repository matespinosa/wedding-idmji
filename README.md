# Mateo & Julieth — Invitación a la ceremonia religiosa

Sitio de invitación tipo *one-page* construido con Next.js 15, TypeScript, TailwindCSS 4, Framer Motion y Lenis. La experiencia está dedicada exclusivamente a la ceremonia religiosa: portada, cuenta regresiva, historia, invitación formal, indicaciones de vestuario y cierre.

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

**Todo el contenido vive en [`lib/content.ts`](lib/content.ts)** — nombres, fecha, textos de la historia, lugar, hora e indicaciones de vestuario. No hace falta tocar componentes.

Datos cargados: ceremonia religiosa de Mateo & Julieth · sábado 3 de octubre de 2026 · Iglesia de Dios Ministerial de Jesucristo Internacional, sede La Colina · 11:00 a. m. · Bogotá.

## Fotos

Las fotos reales viven en [`public/images/`](public/images) y se muestran en la portada, la invitación formal y el cierre. Para cambiarlas, reemplaza el archivo o edita las rutas en [`lib/content.ts`](lib/content.ts). La historia se presenta como una secuencia editorial compacta de tres momentos.

Este proyecto no incluye formulario de confirmación, lista de invitados ni integración con Google Sheets.

## Sistema de diseño

- **Tokens** (color, tipografía, curvas de easing, animaciones ambiente): `app/globals.css` bajo `@theme`
- **Vocabulario de movimiento** (easings, duraciones, variants reutilizables): `lib/motion.ts`
- **Primitivas**: `components/ui/` — `TextReveal` (máscaras letra a letra), `Reveal` (fade + blur + rise), `Magnetic`, `Button`, `SectionHeading`, `SectionDivider`, florales SVG dibujados a mano

## Accesibilidad y rendimiento

- `prefers-reduced-motion` respetado (Framer `MotionConfig`, Lenis desactivado, keyframes CSS anulados)
- HTML semántico, foco visible dorado y navegación por teclado (Escape cierra el menú móvil)
- Sin imágenes rasterizadas: toda la gráfica es SVG/CSS — el peso de página se mantiene mínimo
