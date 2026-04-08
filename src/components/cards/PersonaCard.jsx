const payStyles = {
  Low: 'bg-zinc-700/40 text-zinc-200 border-zinc-600',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  High: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

function getInitials(value) {
  if (!value) {
    return '??';
  }

  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function PersonaCard({ user }) {
  const badgeStyle =
    payStyles[user.willingness_to_pay] || 'bg-zinc-700/40 text-zinc-200 border-zinc-600';

  return (
    <article className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e53e3e]/40 bg-[#e53e3e]/10 text-sm font-semibold text-[#ff6b6b]">
          {getInitials(user.persona)}
        </div>
        <h4 className="text-lg font-semibold text-zinc-100">{user.persona}</h4>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{user.pain_point}</p>
      <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle}`}>
        Willingness to pay: {user.willingness_to_pay}
      </span>
    </article>
  );
}
