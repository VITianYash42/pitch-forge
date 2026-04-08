import { ArrowRight, CircleDollarSign, Megaphone, Target, TrendingUp, Users } from 'lucide-react';

function timelineToWeeks(timeline) {
  if (!timeline) return 4;

  const text = String(timeline).toLowerCase();
  const numbers = (text.match(/\d+/g) || []).map(Number);
  const base = numbers.length ? Math.max(...numbers) : 4;

  if (text.includes('month')) return base * 4;
  if (text.includes('year')) return base * 52;
  return base;
}

const effortScore = {
  Low: 30,
  Medium: 60,
  High: 90,
};

export default function VisualInsights({ paths = [], pricingModel = 'N/A' }) {
  const normalized = paths.slice(0, 3).map((path) => {
    const weeks = timelineToWeeks(path.timeline);
    const effort = effortScore[path.effort] || 45;
    const confidence = Math.max(25, Math.min(95, Math.round((100 - effort) * 0.45 + weeks * 1.2)));

    return {
      name: path.name,
      effort,
      confidence,
      timeline: path.timeline,
    };
  });

  return (
    <section
      id="visuals"
      className="scroll-mt-32 rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-zinc-400">Visual Insights</p>
        <span className="rounded-full border border-[#e53e3e]/35 bg-[#e53e3e]/10 px-3 py-1 text-xs font-medium text-[#ff8a8a]">
          {pricingModel}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
          <div className="mb-4 flex items-center gap-2 text-zinc-200">
            <TrendingUp size={16} className="text-[#e53e3e]" />
            <h3 className="text-sm font-semibold tracking-wide">Monetization Potential Snapshot</h3>
          </div>

          <div className="space-y-4">
            {normalized.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-zinc-200">{item.name}</p>
                  <span className="text-xs text-zinc-400">{item.timeline}</span>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500">
                    <span>Execution Load</span>
                    <span>{item.effort}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#e53e3e] to-red-800 transition-all duration-700"
                      style={{ width: `${item.effort}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500">
                    <span>Revenue Confidence</span>
                    <span>{item.confidence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-700"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
          <div className="mb-4 flex items-center gap-2 text-zinc-200">
            <Target size={16} className="text-[#e53e3e]" />
            <h3 className="text-sm font-semibold tracking-wide">Launch Flow</h3>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <Users size={15} className="text-[#e53e3e]" />
              <p className="text-sm text-zinc-200">Identify high-pain persona cluster</p>
            </div>
            <div className="flex justify-center text-zinc-600">
              <ArrowRight size={14} />
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <CircleDollarSign size={15} className="text-[#e53e3e]" />
              <p className="text-sm text-zinc-200">Test one pricing hook with a simple offer</p>
            </div>
            <div className="flex justify-center text-zinc-600">
              <ArrowRight size={14} />
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
              <Megaphone size={15} className="text-[#e53e3e]" />
              <p className="text-sm text-zinc-200">Send cold pitch, collect feedback, iterate weekly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
