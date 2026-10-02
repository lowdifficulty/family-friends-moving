"use client";

import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { useQuoteModal } from "@/components/QuoteProvider";

const WHY = [
  {
    title: "Price guarantee",
    text: "Upfront pricing with no hidden fees on moving day — so you can stick to your budget.",
  },
  {
    title: "On-time crews",
    text: "Experienced teams arrive prepared and work efficiently from load to delivery.",
  },
  {
    title: "Professional movers",
    text: "Trained movers with the right equipment to pack, protect, and transport your belongings.",
  },
  {
    title: "Premium service",
    text: "Friendly coordinators guide you from quote to final walkthrough.",
  },
];

const REVIEWS = [
  {
    name: "Lisa K.",
    text: "Straightforward, no surprises on price. The crew was on time and hustled the whole job. I'll call Family Friends Moving again.",
  },
  {
    name: "Michael E.",
    text: "We switched movers and couldn't be happier. Careful with furniture, fast, and professional from start to finish.",
  },
  {
    name: "Naomi P.",
    text: "Stress-free local move in LA. Transparent hourly rate and the team was courteous the entire day.",
  },
];

const FAQ = [
  {
    q: "Are you licensed and insured?",
    a: "Yes. Family Friends Moving is fully licensed and insured for local and long-distance moves in California.",
  },
  {
    q: "How much does a move cost?",
    a: "Pricing depends on home size, distance, and services. Request a free quote — we'll outline options with clear, upfront pricing.",
  },
  {
    q: "When should we start planning?",
    a: "We recommend reaching out about three weeks before your target move date for the best availability.",
  },
];

export default function HomePage() {
  const { openQuote } = useQuoteModal();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative bg-gradient-to-br from-ffm-navy via-[#1a3a5c] to-ffm-navy text-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm mb-4">
                ★ 4.9/5 from local families
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Southern California movers you can trust
              </h1>
              <p className="mt-4 text-lg text-white/85">
                Local and long-distance moving across Los Angeles, Orange, and San Diego counties — with
                friendly crews and upfront pricing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={openQuote} className="ffm-btn-primary">
                  Get a free quote
                </button>
                <a href="tel:+18005550142" className="ffm-btn-outline">
                  Call (800) 555-0142
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl mb-3">🚚</div>
                  <p className="font-semibold text-xl">Family Friends Moving</p>
                  <p className="text-white/75 text-sm mt-2">LA · Orange · San Diego counties</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold text-ffm-navy text-center">Why people love us</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
                <h3 className="font-semibold text-ffm-navy">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="bg-slate-50 py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-ffm-navy">Services we offer</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Residential moving",
                  text: "Apartments, condos, and homes — packing, loading, transport, and setup.",
                },
                {
                  title: "Long-distance moving",
                  text: "Direct routes throughout California and neighboring states with dedicated coordinators.",
                },
                {
                  title: "Commercial moving",
                  text: "Office and retail relocations with after-hours options to minimize downtime.",
                },
              ].map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-semibold text-lg text-ffm-navy">{s.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{s.text}</p>
                  <button
                    type="button"
                    onClick={openQuote}
                    className="mt-4 text-sm font-semibold text-ffm-orange hover:underline"
                  >
                    Get estimate →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold text-ffm-navy text-center">Reviews</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <p className="text-sm text-slate-700">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 font-semibold text-ffm-navy">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="areas" className="bg-ffm-navy text-white py-14">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Area of service</h2>
            <p className="mt-4 text-white/85 max-w-2xl mx-auto">
              We cover Los Angeles County, Orange County, and San Diego County — from studio apartments
              to full-house relocations and office moves.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Los Angeles County", "Orange County", "San Diego County"].map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
            <button type="button" onClick={openQuote} className="ffm-btn-primary mt-8">
              Start your quote
            </button>
          </div>
        </section>

        <section id="faq" className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold text-ffm-navy text-center">FAQ</h2>
          <div className="mt-8 space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="font-semibold cursor-pointer text-ffm-navy">{item.q}</summary>
                <p className="text-sm text-slate-600 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
