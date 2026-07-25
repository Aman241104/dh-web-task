export function AtmosphericBand({
  eyebrow,
  headline,
  stats,
}: {
  eyebrow: string;
  headline: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center sm:px-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 120%, rgba(180,255,57,0.16) 0%, rgba(180,255,57,0) 60%), radial-gradient(80% 60% at 50% -10%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), #0e0f12",
        }}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
        {headline}
      </h2>
      <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-12 gap-y-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-mono text-2xl font-semibold tabular-nums sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
