"use client";

import { createContext, useContext } from "react";

/**
 * `true` once the entry preloader has lifted — the hero waits for this
 * signal so its title animation lands exactly as the curtain reveals it.
 */
export const LoadContext = createContext(false);

export const useSiteReady = () => useContext(LoadContext);
