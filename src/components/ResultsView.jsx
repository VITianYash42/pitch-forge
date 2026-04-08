import { useEffect, useState } from 'react';
import MonetizationCard from './cards/MonetizationCard';
import PersonaCard from './cards/PersonaCard';
import PitchCard from './cards/PitchCard';
import PricingCard from './cards/PricingCard';
import TaglineCard from './cards/TaglineCard';
import VisualInsights from './cards/VisualInsights';

const SECTIONS = [
  { id: 'tagline', label: 'Tagline' },
  { id: 'visuals', label: 'Visuals' },
  { id: 'monetization', label: 'Monetization' },
  { id: 'users', label: 'Target Users' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'pitch', label: 'Cold Pitch' },
];

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
  const [activeSection, setActiveSection] = useState('tagline');

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.2, 0.35, 0.6],
      },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="results-enter mx-auto w-full max-w-7xl space-y-8 px-3 pb-10 pt-36 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out md:px-6">
      <div className="fixed left-0 right-0 top-0 z-30 border-b border-zinc-800/90 bg-[#090909]/92 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-3 py-3 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tighter text-zinc-100">Strategy Ready</h2>
          <button
            type="button"
            onClick={() => handleCopyAll(sectionToText(safeResult), 'Full pitch')}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:border-[#e53e3e]/50"
          >
            Copy Full Pitch
          </button>
        </div>

        <nav className="mt-3 flex flex-wrap gap-2 text-xs tracking-widest uppercase text-zinc-400">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={[
                  'rounded-full border px-3 py-1 transition-all duration-300 ease-out hover:-translate-y-0.5',
                  isActive
                    ? 'border-[#e53e3e]/55 bg-[#e53e3e]/12 text-zinc-100 shadow-[0_0_16px_rgba(229,62,62,0.15)]'
                    : 'border-zinc-700 hover:border-[#e53e3e]/50 hover:text-zinc-200',
                ].join(' ')}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
        </div>
      </div>

      <div id="tagline" className="scroll-mt-32 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]">
        <TaglineCard tagline={safeResult.tagline} />
      </div>

      <VisualInsights paths={safeResult.monetization_paths} pricingModel={safeResult.pricing_suggestion.model} />

      <section id="monetization" className="scroll-mt-32 rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Monetization Paths</p>
          <button
            type="button"
            onClick={() => handleCopySection(JSON.stringify(safeResult.monetization_paths, null, 2), 'Monetization paths')}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            Copy section
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {safeResult.monetization_paths.map((path, index) => (
            <div
              key={`${path.name}-${index}`}
              className="rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]"
            >
              <MonetizationCard path={path} />
            </div>
          ))}
        </div>
      </section>

      <section id="users" className="scroll-mt-32 rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Target Users</p>
          <button
            type="button"
            onClick={() => handleCopySection(JSON.stringify(safeResult.target_users, null, 2), 'Target users')}
            className="text-xs text-zinc-400 hover:text-zinc-200"
          >
            Copy section
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {safeResult.target_users.map((user, index) => (
            <div
              key={`${user.persona}-${index}`}
              className="rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]"
            >
              <PersonaCard user={user} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div id="pricing" className="scroll-mt-32 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]">
          <PricingCard pricing={safeResult.pricing_suggestion} />
        </div>
        <div id="pitch" className="scroll-mt-32 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-[#e53e3e]/50 hover:shadow-[0_4px_20px_rgba(229,62,62,0.1)]">
          <PitchCard
            pitch={safeResult.cold_pitch}
            onCopy={() => handleCopySection(safeResult.cold_pitch, 'Cold pitch')}
          />
        </div>
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
