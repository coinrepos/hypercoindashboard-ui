import React, { createContext, useContext } from "react";

export const HyperBotContext = createContext();

export function useHyperBot() {
  return useContext(HyperBotContext);
}

export function HyperBotProvider({ children }) {
  const sharedState = {}; // customize as needed
  return (
    <HyperBotContext.Provider value={sharedState}>
      {children}
    </HyperBotContext.Provider>
  );
}
