export default function PitchCard({ pitch, onCopy }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6">
      <p className="mb-4 text-xs uppercase tracking-widest text-zinc-400">Cold Pitch</p>

      <div className="relative rounded-2xl border border-zinc-700 bg-[#0d0d0d] p-6">
        <div className="mb-4 inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          Draft Message
        </div>
        <p className="whitespace-pre-wrap text-[15px] leading-8 text-zinc-100">{pitch}</p>
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="mt-4 inline-flex rounded-lg border border-[#e53e3e]/40 bg-[#e53e3e]/20 px-4 py-2 text-sm font-medium text-[#ff8a8a] transition hover:bg-[#e53e3e]/30"
      >
        Copy to Clipboard
      </button>
    </section>
  );
}
