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
  title: "Mateo & Julieth — Nuestra boda · 21.11.2026",
  description:
    "En el tiempo perfecto de Dios, nuestros caminos se unieron para siempre. Acompáñanos a celebrar nuestra boda el sábado 21 de noviembre de 2026 en Medellín.",
  keywords: ["boda", "Mateo y Julieth", "invitación", "matrimonio"],
  openGraph: {
    title: "Mateo & Julieth — Nuestra boda",
    description:
      "Acompáñanos a celebrar nuestra boda · Sábado 21 de noviembre de 2026 · Medellín.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
