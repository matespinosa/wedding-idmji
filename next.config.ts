import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /* AVIF primero: pesa ~20-30% menos que WebP con la misma calidad y lo
       soportan todos los navegadores actuales. Next cae a WebP y luego al
       original según lo que acepte el navegador. */
    formats: ["image/avif", "image/webp"],
    /* Las fotos no cambian nunca: un año de caché en el CDN en vez de 60s. */
    minimumCacheTTL: 31536000,
    /* Sin tamaños 2K/4K: el arco del hero y el álbum nunca se muestran
       a esa resolución y generarlos solo alarga el decode en el móvil. */
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
  },
};

export default nextConfig;
