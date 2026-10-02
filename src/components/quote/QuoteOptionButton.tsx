"use client";

export default function QuoteOptionButton({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
        selected
          ? "border-ffm-gold bg-white/10 ring-2 ring-ffm-gold/60"
          : "border-white/25 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div className="font-semibold tracking-wide text-sm">{label}</div>
      <div className="text-xs text-ffm-cream/80 mt-1">{description}</div>
    </button>
  );
}
