export default function TaglineCard({ tagline }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">Tagline</p>
      <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-8 text-center">
        <p className="text-4xl leading-tight text-[#e53e3e]">“</p>
        <h2 className="mx-auto mt-2 max-w-3xl text-2xl font-semibold leading-relaxed text-zinc-100 md:text-3xl">
          {tagline}
        </h2>
      </div>
    </section>
  );
}
