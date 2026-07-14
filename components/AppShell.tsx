"use client";

import { MotionConfig } from "framer-motion";
import { useState, type ReactNode } from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LoadContext } from "@/components/providers/load-context";
import { ScrollMotion } from "@/components/providers/ScrollMotion";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <LoadContext.Provider value={ready}>
          <Preloader onDone={() => setReady(true)} />
          <ScrollMotion ready={ready} />
          <GrainOverlay />
          <Navbar />
          {children}
        </LoadContext.Provider>
      </LenisProvider>
    </MotionConfig>
  );
}
