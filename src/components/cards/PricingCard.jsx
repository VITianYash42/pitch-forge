export default function PricingCard({ pricing }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Pricing Suggestion</p>
        <span className="rounded-full border border-[#e53e3e]/40 bg-[#e53e3e]/15 px-3 py-1 text-xs font-medium text-[#ff8a8a]">
          {pricing.model}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
          <p className="mb-2 text-sm uppercase tracking-wide text-zinc-400">Free Tier</p>
          <p className="text-sm leading-relaxed text-zinc-200">{pricing.free_tier}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
          <p className="mb-2 text-sm uppercase tracking-wide text-zinc-400">Paid Tier</p>
          <p className="text-sm leading-relaxed text-zinc-200">{pricing.paid_tier}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#e53e3e]/25 bg-[#e53e3e]/10 p-5 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Suggested Price</p>
        <p className="mt-2 text-3xl font-bold text-[#ff6b6b]">{pricing.suggested_price}</p>
      </div>
    </section>
  );
}
