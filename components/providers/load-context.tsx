"use client";

import { createContext, useContext } from "react";

type LoadState = {
  /** The invitation is sliding out of the envelope — hero animations start. */
  ready: boolean;
  /** The envelope is gone and the page is a normal document. */
  settled: boolean;
};

export const LoadContext = createContext<LoadState>({
  ready: false,
  settled: false,
});

export const useSiteReady = () => useContext(LoadContext).ready;

export const useSiteSettled = () => useContext(LoadContext).settled;
