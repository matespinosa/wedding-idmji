/**
 * Genera el thumbnail de compartir (OG 1200×630) y los íconos de la página.
 *
 * Estilo del cover: foto de la pareja a la izquierda + panel de invitación a la derecha.
 *
 * Uso: node scripts/generate-brand-assets.mjs
 * Foto: cambia PHOTO abajo si quieres otra (cierre.jpg, hero.jpg, other.jpg, etc.)
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Foto de los dos que aparece en el cover al compartir el link. */
const PHOTO = "cierre.jpg";
const photoPath = join(root, "public/images", PHOTO);

const W = 1200;
const H = 630;
const PHOTO_W = 700; // ~58% foto, ~42% panel

const panel = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1b1b1b" stop-opacity="0"/>
      <stop offset="78%" stop-color="#1b1b1b" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#1b1b1b" stop-opacity="0.35"/>
    </linearGradient>
  </defs>

  <!-- Sombra suave entre foto y panel -->
  <rect x="0" y="0" width="${PHOTO_W}" height="${H}" fill="url(#fade)"/>

  <!-- Panel de invitación -->
  <rect x="${PHOTO_W}" y="0" width="${W - PHOTO_W}" height="${H}" fill="#f7f3ee"/>
  <rect x="${PHOTO_W + 28}" y="28" width="${W - PHOTO_W - 56}" height="${H - 56}"
    fill="none" stroke="#c6a97a" stroke-opacity="0.55" stroke-width="1.25"/>

  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="170" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="5.5"
    fill="#8a6b3f">INVITACIÓN</text>

  <line x1="${PHOTO_W + 110}" y1="198" x2="${W - 110}" y2="198"
    stroke="#c6a97a" stroke-width="1" stroke-opacity="0.7"/>

  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="268" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic"
    fill="#1b1b1b">Mateo</text>
  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="318" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="22" font-style="italic"
    fill="#c6a97a">&amp;</text>
  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="372" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic"
    fill="#1b1b1b">Julieth</text>

  <line x1="${PHOTO_W + 110}" y1="404" x2="${W - 110}" y2="404"
    stroke="#c6a97a" stroke-width="1" stroke-opacity="0.7"/>

  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="456" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="16" letter-spacing="2.5"
    fill="#22201c">Ceremonia religiosa</text>
  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="492" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="3"
    fill="#8a6b3f">03 · 10 · 2026</text>
  <text x="${PHOTO_W + (W - PHOTO_W) / 2}" y="528" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="2"
    fill="#22201c" fill-opacity="0.72">Bogotá</text>
</svg>`);

const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Mateo y Julieth">
  <rect width="64" height="64" rx="14" fill="#1B1B1B"/>
  <rect x="3" y="3" width="58" height="58" rx="12" fill="none" stroke="#C6A97A" stroke-opacity="0.45" stroke-width="1"/>
  <text x="32" y="42" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="22" font-style="italic"
    fill="#C6A97A">M&amp;J</text>
</svg>`;

const appleSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#1B1B1B"/>
  <rect x="4" y="4" width="56" height="56" rx="10" fill="none" stroke="#C6A97A" stroke-opacity="0.5" stroke-width="1.25"/>
  <text x="32" y="42" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="22" font-style="italic"
    fill="#C6A97A">M&amp;J</text>
</svg>`;

const couplePhoto = await sharp(photoPath)
  .rotate()
  .resize(PHOTO_W, H, {
    fit: "cover",
    // Enfoca rostros / torso (arriba-centro) en fotos verticales
    position: "north",
  })
  .toBuffer();

const canvas = await sharp({
  create: {
    width: W,
    height: H,
    channels: 3,
    background: { r: 247, g: 243, b: 238 },
  },
})
  .jpeg()
  .toBuffer();

await sharp(canvas)
  .composite([
    { input: couplePhoto, left: 0, top: 0 },
    { input: panel, blend: "over" },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(join(root, "public/images/social-thumbnail.jpg"));

writeFileSync(join(root, "app/icon.svg"), iconSvg);

await sharp(Buffer.from(appleSvg))
  .png()
  .toFile(join(root, "app/apple-icon.png"));

console.log("Generated cover with photo:", PHOTO);
console.log("  public/images/social-thumbnail.jpg");
console.log("  app/icon.svg");
console.log("  app/apple-icon.png");
