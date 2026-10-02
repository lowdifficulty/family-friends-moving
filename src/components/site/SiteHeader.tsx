"use client";

import Link from "next/link";
import { useQuoteModal } from "@/components/QuoteProvider";

const PHONE = "(800) 555-0142";
const PHONE_TEL = "+18005550142";

export default function SiteHeader() {
  const { openQuote } = useQuoteModal();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-ffm-navy text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <a href={`tel:${PHONE_TEL}`} className="font-semibold hover:text-ffm-gold">
            {PHONE}
          </a>
          <span className="text-white/80">7 days a week · 8AM–6PM</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-xl text-ffm-navy tracking-tight">
          Family Friends<span className="text-ffm-orange"> Moving</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#services" className="hover:text-ffm-navy">
            Services
          </a>
          <a href="#reviews" className="hover:text-ffm-navy">
            Reviews
          </a>
          <a href="#faq" className="hover:text-ffm-navy">
            FAQ
          </a>
          <a href="#areas" className="hover:text-ffm-navy">
            Service Areas
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/staff/login"
            className="hidden sm:inline text-xs text-slate-500 hover:text-ffm-navy"
          >
            Staff
          </Link>
          <button type="button" onClick={openQuote} className="ffm-btn-primary text-sm px-4 py-2">
            Free Quote
          </button>
        </div>
      </div>
    </header>
  );
}
