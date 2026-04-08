import MonetizationCard from './cards/MonetizationCard';
import PersonaCard from './cards/PersonaCard';
import PitchCard from './cards/PitchCard';
import PricingCard from './cards/PricingCard';
import TaglineCard from './cards/TaglineCard';

function sectionToText(result) {
  return [
    `Tagline: ${result.tagline}`,
    '',
    'Monetization Paths:',
    ...result.monetization_paths.map(
      (path, index) =>
        `${index + 1}. ${path.name} | ${path.description} | Effort: ${path.effort} | Timeline: ${path.timeline}`,
    ),
    '',
    'Target Users:',
    ...result.target_users.map(
      (user, index) =>
        `${index + 1}. ${user.persona} | Pain point: ${user.pain_point} | Willingness to pay: ${user.willingness_to_pay}`,
    ),
    '',
    'Pricing Suggestion:',
    `Model: ${result.pricing_suggestion.model}`,
    `Free Tier: ${result.pricing_suggestion.free_tier}`,
    `Paid Tier: ${result.pricing_suggestion.paid_tier}`,
    `Suggested Price: ${result.pricing_suggestion.suggested_price}`,
    '',
    'Cold Pitch:',
    result.cold_pitch,
  ].join('\n');
}

export default function ResultsView({ result, onCopySection, onCopyAll, onReset }) {
  const safeResult = {
    tagline: result?.tagline || 'No tagline generated yet.',
    monetization_paths: Array.isArray(result?.monetization_paths) ? result.monetization_paths : [],
    target_users: Array.isArray(result?.target_users) ? result.target_users : [],
    pricing_suggestion: {
      model: result?.pricing_suggestion?.model || 'N/A',
      free_tier: result?.pricing_suggestion?.free_tier || 'N/A',
      paid_tier: result?.pricing_suggestion?.paid_tier || 'N/A',
      suggested_price: result?.pricing_suggestion?.suggested_price || 'N/A',
    },
    cold_pitch: result?.cold_pitch || 'No pitch generated yet.',
  };

  const handleCopySection = (text, label) => {
    if (onCopySection) {
      onCopySection(text, label);
    }
  };

  const handleCopyAll = (text, label) => {
    if (onCopyAll) {
      onCopyAll(text, label);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-zinc-100">Strategy Ready</h2>
        <button
          type="button"
          onClick={() => handleCopyAll(sectionToText(safeResult), 'Full pitch')}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:border-[#e53e3e]/50"
        >
          Copy Full Pitch
        </button>
      </div>

      <TaglineCard tagline={safeResult.tagline} />

      <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Monetization Paths</p>
          <button
            type="button"
            onClick={() => handleCopySection(JSON.stringify(safeResult.monetization_paths, null, 2), 'Monetization paths')}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            Copy section
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {safeResult.monetization_paths.map((path, index) => (
            <MonetizationCard key={`${path.name}-${index}`} path={path} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Target Users</p>
          <button
            type="button"
            onClick={() => handleCopySection(JSON.stringify(safeResult.target_users, null, 2), 'Target users')}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            Copy section
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {safeResult.target_users.map((user, index) => (
            <PersonaCard key={`${user.persona}-${index}`} user={user} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <PricingCard pricing={safeResult.pricing_suggestion} />
        <PitchCard pitch={safeResult.cold_pitch} onCopy={() => handleCopySection(safeResult.cold_pitch, 'Cold pitch')} />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:border-[#e53e3e]/50"
      >
        Analyze Another Project
      </button>
    </section>
  );
}
