"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockPageScroll } from "@/lib/scroll-lock";
import QuoteFlowForm from "./QuoteFlowForm";

export default function QuoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const ignoreBackdropClose = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    ignoreBackdropClose.current = true;
    const t = window.setTimeout(() => {
      ignoreBackdropClose.current = false;
    }, 100);
    const unlock = lockPageScroll();
    return () => {
      window.clearTimeout(t);
      unlock();
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
        onMouseDown={() => {
          if (!ignoreBackdropClose.current) onClose();
        }}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-xl max-h-[90dvh] overflow-y-auto quote-modal-panel rounded-2xl shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Get a moving quote"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-lg tracking-tight">Family Friends Moving</span>
            <button
              type="button"
              onClick={onClose}
              className="text-ffm-cream/80 hover:text-white text-sm"
              aria-label="Close quote form"
            >
              ✕
            </button>
          </div>
          <QuoteFlowForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
}
