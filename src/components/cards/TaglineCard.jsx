export default function TaglineCard({ tagline }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#111111]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <p className="mb-3 text-xs uppercase tracking-widest text-zinc-400">Tagline</p>
      <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] px-6 py-8 text-center md:px-10 md:py-10">
        <h2 className="mx-auto max-w-5xl text-xl font-semibold leading-relaxed text-zinc-100 md:text-2xl">
          <span className="mr-2 text-3xl leading-none text-[#e53e3e] md:text-4xl">“</span>
          {tagline}
          <span className="ml-2 text-3xl leading-none text-[#e53e3e] md:text-4xl">”</span>
        </h2>
      </div>
    </section>
  );
}
