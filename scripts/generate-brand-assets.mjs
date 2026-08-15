/**
 * Genera el thumbnail de compartir (OG 1200×630) y favicons con foto de la pareja.
 *
 * Uso: node scripts/generate-brand-assets.mjs
 * Foto: cambia PHOTO abajo si quieres otra (cierre.jpg, hero.jpg, etc.)
 */
import { unlinkSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Foto de los dos para cover y favicon. */
const PHOTO = "cierre.jpg";
const photoPath = join(root, "public/images", PHOTO);

const W = 1200;
const H = 630;

const ring = (size) =>
  Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${Math.round(size * 0.18)}"
    fill="none" stroke="#C6A97A" stroke-width="${Math.max(2, size * 0.03)}" stroke-opacity="0.85"/>
</svg>`);

async function makeOg() {
  const outPublic = join(root, "public/images/social-thumbnail.jpg");
  const outOg = join(root, "app/opengraph-image.jpg");
  const outTw = join(root, "app/twitter-image.jpg");

  /* `attention` centraba el recorte en el techo y las luces (más
     contraste que la pareja), dejando una franja crema arriba que en
     miniatura se lee como un borde. Recortamos a mano, centrado en
     ellos, antes de escalar. */
  const src = await sharp(photoPath).rotate().metadata();
  const srcW = src.width ?? 1704;
  const srcH = src.height ?? 1800;
  const cropH = Math.round(srcW / (W / H));
  const top = Math.min(srcH - cropH, Math.round(srcH * 0.265));

  const buffer = await sharp(photoPath)
    .rotate()
    .extract({ left: 0, top, width: srcW, height: cropH })
    .resize(W, H, { fit: "cover" })
    .jpeg({ quality: 94, mozjpeg: true })
    .toBuffer();

  await sharp(buffer).toFile(outPublic);
  await sharp(buffer).toFile(outOg);
  await sharp(buffer).toFile(outTw);
}

async function makeFavicons() {
  // Recorte cercano a los rostros (parte superior de cierre.jpg).
  const meta = await sharp(photoPath).rotate().metadata();
  const srcW = meta.width ?? 1704;
  const srcH = meta.height ?? 1800;
  const side = Math.round(Math.min(srcW, srcH) * 0.55);
  const left = Math.round((srcW - side) / 2);
  const top = Math.round(srcH * 0.06);

  const face = await sharp(photoPath)
    .rotate()
    .extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.min(side, srcW - left),
      height: Math.min(side, srcH - top),
    })
    .resize(640, 640, { fit: "cover", position: "centre" })
    .jpeg({ quality: 92 })
    .toBuffer();

  const iconSizes = [
    { file: "app/icon.png", size: 64 },
    { file: "app/apple-icon.png", size: 180 },
  ];

  for (const { file, size } of iconSizes) {
    const roundedMask = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#fff"/>
</svg>`);

    const photo = await sharp(face)
      .resize(size, size)
      .composite([{ input: roundedMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 27, g: 27, b: 27, alpha: 1 },
      },
    })
      .composite([
        { input: photo, left: 0, top: 0 },
        { input: ring(size), blend: "over" },
      ])
      .png()
      .toFile(join(root, file));
  }

  // Evita conflicto con el favicon antiguo de iniciales.
  const oldSvg = join(root, "app/icon.svg");
  if (existsSync(oldSvg)) unlinkSync(oldSvg);
}

await makeOg();
await makeFavicons();

console.log("Generated with photo:", PHOTO);
console.log("  public/images/social-thumbnail.jpg");
console.log("  app/opengraph-image.jpg");
console.log("  app/twitter-image.jpg");
console.log("  app/icon.png");
console.log("  app/apple-icon.png");
