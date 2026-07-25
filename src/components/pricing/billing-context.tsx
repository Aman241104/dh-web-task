"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const BillingContext = createContext<{ annual: boolean; setAnnual: (v: boolean) => void } | null>(
  null,
);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [annual, setAnnual] = useState(true);
  return <BillingContext.Provider value={{ annual, setAnnual }}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling must be used within BillingProvider");
  return ctx;
}
