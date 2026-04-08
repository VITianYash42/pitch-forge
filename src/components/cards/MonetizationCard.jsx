const effortStyles = {
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  High: 'bg-red-500/15 text-red-300 border-red-500/30',
};

export default function MonetizationCard({ path }) {
  const badgeStyle = effortStyles[path.effort] || 'bg-zinc-700/40 text-zinc-200 border-zinc-600';

  return (
    <article className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
      <h4 className="text-lg font-semibold text-zinc-100">{path.name}</h4>
      <p className="mt-3 min-h-24 text-sm leading-relaxed text-zinc-300">{path.description}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <span className={`rounded-full border px-3 py-1 font-medium ${badgeStyle}`}>{path.effort}</span>
        <span className="text-zinc-400">{path.timeline}</span>
      </div>
    </article>
  );
}
