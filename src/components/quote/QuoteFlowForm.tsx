"use client";

import { useMemo, useState } from "react";
import QuoteOptionButton from "./QuoteOptionButton";
import {
  DATE_TYPE_OPTIONS,
  HOME_TYPE_OPTIONS,
  MOVE_DISTANCE_OPTIONS,
  ROOM_OPTIONS,
  buildQuoteSteps,
  initialQuoteFormData,
  needsDestinationZip,
  sizeStepTitle,
  zipStepTitle,
  type HomeType,
  type QuoteFormData,
  type QuoteStepId,
} from "@/lib/quote-flow";

function stepTitle(step: QuoteStepId, data: QuoteFormData): string {
  switch (step) {
    case "move":
      return "How far are you moving?";
    case "type":
      return "We're moving your…";
    case "size":
      return sizeStepTitle(data.homeType);
    case "zip":
      return zipStepTitle(data);
    case "about-date":
      return "Tell us about your move date?";
    case "date":
      return "Select your move date?";
    case "confirm":
      return "Almost done! What's your name?";
    case "call":
      return "Get your quote now!";
    default:
      return "";
  }
}

function digitsOnly(value: string, max: number): string {
  return value.replace(/\D/g, "").slice(0, max);
}

export default function QuoteFlowForm({ onClose }: { onClose?: () => void }) {
  const [data, setData] = useState<QuoteFormData>(initialQuoteFormData);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const steps = useMemo(() => buildQuoteSteps(data), [data]);
  const step = steps[stepIndex] ?? "move";
  const progress = steps.length > 1 ? stepIndex / (steps.length - 1) : 0;

  function patch(partial: Partial<QuoteFormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    if (stepIndex === 0) {
      onClose?.();
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  }

  async function submitQuote() {
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitting(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError((body as { error?: string }).error ?? "Could not submit quote.");
      return;
    }
    setDone(true);
  }

  const zipValid =
    data.zipcode.length === 5 &&
    (!needsDestinationZip(data) || data.destinationZip.length === 5);

  const phoneValid = data.phone.replace(/\D/g, "").length === 10;
  const nameValid = data.name.trim().length >= 2;

  if (done) {
    return (
      <div className="text-center py-6 space-y-4">
        <h3 className="text-xl font-semibold">Thank you!</h3>
        <p className="text-sm text-ffm-cream/90">
          A Family Friends Moving coordinator will call you shortly with pricing for your move.
        </p>
        <button
          type="button"
          className="ffm-btn-primary w-full"
          onClick={() => onClose?.()}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-1 rounded-full bg-white/20 overflow-hidden">
        <div
          className="h-full bg-ffm-gold transition-all duration-300"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={goBack} className="text-sm text-ffm-gold hover:underline">
          {stepIndex === 0 ? "Close" : "PREVIOUS"}
        </button>
        <span className="text-xs text-ffm-cream/70">
          Step {stepIndex + 1} of {steps.length}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold leading-snug">{stepTitle(step, data)}</h2>

      {step === "move" && (
        <div className="space-y-2">
          {MOVE_DISTANCE_OPTIONS.map((opt) => (
            <QuoteOptionButton
              key={opt.value}
              label={opt.label}
              description={opt.desc}
              selected={data.moveType === opt.value}
              onClick={() => {
                patch({ moveType: opt.value });
                goNext();
              }}
            />
          ))}
        </div>
      )}

      {step === "type" && (
        <div className="space-y-2">
          {HOME_TYPE_OPTIONS.map((opt) => (
            <QuoteOptionButton
              key={opt.value}
              label={opt.label}
              description={opt.desc}
              selected={data.homeType === opt.value}
              onClick={() => {
                patch({ homeType: opt.value, roomType: "" });
                goNext();
              }}
            />
          ))}
        </div>
      )}

      {step === "size" && data.homeType && (
        <div className="space-y-2">
          {ROOM_OPTIONS[data.homeType as HomeType].map((opt) => (
            <QuoteOptionButton
              key={opt.value}
              label={opt.label}
              description={opt.desc}
              selected={data.roomType === opt.value}
              onClick={() => {
                patch({ roomType: opt.value });
                goNext();
              }}
            />
          ))}
        </div>
      )}

      {step === "zip" && (
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Enter your zip code</span>
            <input
              inputMode="numeric"
              className="quote-input"
              value={data.zipcode}
              onChange={(e) => patch({ zipcode: digitsOnly(e.target.value, 5) })}
              placeholder="90210"
            />
          </label>
          {needsDestinationZip(data) && (
            <label className="block text-sm">
              <span className="mb-1 block">Enter your destination zip code</span>
              <input
                inputMode="numeric"
                className="quote-input"
                value={data.destinationZip}
                onChange={(e) => patch({ destinationZip: digitsOnly(e.target.value, 5) })}
                placeholder="92101"
              />
            </label>
          )}
          <button
            type="button"
            disabled={!zipValid}
            className="ffm-btn-primary w-full disabled:opacity-50"
            onClick={goNext}
          >
            NEXT
          </button>
        </div>
      )}

      {step === "about-date" && (
        <div className="space-y-2">
          {DATE_TYPE_OPTIONS.map((opt) => (
            <QuoteOptionButton
              key={opt.value}
              label={opt.label}
              description={opt.desc}
              selected={data.dateType === opt.value}
              onClick={() => {
                patch({ dateType: opt.value, date: opt.value === "NotSure" ? "" : data.date });
                goNext();
              }}
            />
          ))}
        </div>
      )}

      {step === "date" && (
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Enter your moving date</span>
            <input
              type="date"
              className="quote-input"
              value={data.date}
              onChange={(e) => patch({ date: e.target.value })}
            />
          </label>
          <button
            type="button"
            disabled={!data.date}
            className="ffm-btn-primary w-full disabled:opacity-50"
            onClick={goNext}
          >
            NEXT
          </button>
        </div>
      )}

      {step === "confirm" && (
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Enter your first name</span>
            <input
              className="quote-input"
              value={data.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
          <button
            type="button"
            disabled={!nameValid}
            className="ffm-btn-primary w-full disabled:opacity-50"
            onClick={goNext}
          >
            NEXT
          </button>
        </div>
      )}

      {step === "call" && (
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Enter your phone number</span>
            <input
              inputMode="tel"
              className="quote-input"
              value={data.phone}
              onChange={(e) => patch({ phone: digitsOnly(e.target.value, 10) })}
              placeholder="10-digit mobile number"
              autoComplete="tel"
            />
          </label>
          <label className="flex items-start gap-2 text-xs text-ffm-cream/85">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={data.smsConsent}
              onChange={(e) => patch({ smsConsent: e.target.checked })}
            />
            <span>
              I agree to receive texts related to pricing, move details, and related services from
              Family Friends Moving.
            </span>
          </label>
          {error && <p className="text-sm text-red-200">{error}</p>}
          <button
            type="button"
            disabled={!phoneValid || submitting}
            className="ffm-btn-primary w-full disabled:opacity-50"
            onClick={submitQuote}
          >
            {submitting ? "Submitting…" : "SUBMIT"}
          </button>
          <p className="text-[10px] leading-snug text-ffm-cream/70">
            By clicking Submit you agree that Family Friends Moving may contact you by phone or text
            about your move. Consent is not required to purchase services.
          </p>
        </div>
      )}
    </div>
  );
}
