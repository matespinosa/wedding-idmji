/**
 * Genera el thumbnail de compartir (OG 1200×630) y los íconos de la página.
 * Uso: node scripts/generate-brand-assets.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photo = join(root, "public/images/cierre.jpg");

const W = 1200;
const H = 630;

const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b1b1b" stop-opacity="0.12"/>
      <stop offset="42%" stop-color="#1b1b1b" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#1b1b1b" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <line x1="520" y1="458" x2="680" y2="458" stroke="#c6a97a" stroke-width="1.5" stroke-opacity="0.85"/>
  <text x="600" y="392" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="8"
    fill="#f7f3ee" fill-opacity="0.88">CEREMONIA RELIGIOSA</text>
  <text x="600" y="470" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="78" font-style="italic"
    fill="#f7f3ee">Mateo &amp; Julieth</text>
  <text x="600" y="528" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="24" letter-spacing="6"
    fill="#c6a97a">03 · 10 · 2026 · BOGOTÁ</text>
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

await sharp(photo)
  .rotate()
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: overlay, blend: "over" }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(root, "public/images/social-thumbnail.jpg"));

writeFileSync(join(root, "app/icon.svg"), iconSvg);

await sharp(Buffer.from(appleSvg))
  .png()
  .toFile(join(root, "app/apple-icon.png"));

console.log("Generated:");
console.log("  public/images/social-thumbnail.jpg");
console.log("  app/icon.svg");
console.log("  app/apple-icon.png");
