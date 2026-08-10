import { Closing } from "@/components/sections/Closing";
import { Countdown } from "@/components/sections/Countdown";
import { DressCode } from "@/components/sections/DressCode";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Venues } from "@/components/sections/Venues";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      {/* Historia oculta por ahora. El componente sigue en
          components/sections/Story.tsx — no borrar.
      <Story /> */}
      {/* La galería pasa a ink, como el dress code, así que entra y sale
          con onda: cream → ink, y de ink al shell de Ceremonia. */}
      <SectionDivider bg="bg-cream" fill="fill-ink" />
      <Gallery />
      <SectionDivider bg="bg-ink" fill="fill-shell" />
      <Venues />
      <SectionDivider bg="bg-shell" fill="fill-ink" />
      <DressCode />
      {/* El cierre vuelve a crema para no encadenar dos bloques de tinta,
          y el pie oscuro remata con un último contraste. */}
      <SectionDivider bg="bg-ink" fill="fill-cream" />
      <Closing />
      <SectionDivider bg="bg-cream" fill="fill-ink" />
      <Footer />
    </main>
  );
}
