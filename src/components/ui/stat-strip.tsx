export type StripStat = { value: string; label: string };

export function StatStrip({ stats }: { stats: StripStat[] }) {
  return (
    <dl className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-x-16">
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-[9rem]">
          <dd className="m-0 font-mono text-[clamp(34px,4.6vw,54px)] font-bold leading-none tabular-nums">
            {stat.value}
          </dd>
          <dt className="mt-3 max-w-[16ch] text-sm leading-snug text-[var(--color-muted)]">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
