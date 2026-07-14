import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: cambia esto por el dominio real cuando se publique.
  metadataBase: new URL("https://mateo-julieth.vercel.app"),
  title: "Mateo & Julieth — Ceremonia religiosa · 03.10.2026",
  description:
    "Acompáñanos en nuestra ceremonia religiosa el sábado 3 de octubre de 2026 en la Iglesia de Dios Ministerial de Jesucristo Internacional, sede La Colina, Bogotá.",
  keywords: ["ceremonia religiosa", "Mateo y Julieth", "invitación", "matrimonio", "Bogotá"],
  openGraph: {
    title: "Mateo & Julieth — Ceremonia religiosa",
    description:
      "Acompáñanos en nuestra ceremonia religiosa · Sábado 3 de octubre de 2026 · 11:00 a. m. · Bogotá.",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/images/social-thumbnail.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
