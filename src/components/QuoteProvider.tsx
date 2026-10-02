"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "./quote/QuoteModal";

type QuoteContextValue = {
  openQuote: () => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteProvider");
  return ctx;
}

export default function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal isOpen={open} onClose={closeQuote} />
    </QuoteContext.Provider>
  );
}
