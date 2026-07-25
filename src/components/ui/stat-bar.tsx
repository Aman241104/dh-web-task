export type Stat = { value: string; label: string };

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="border-l-2 border-[var(--color-accent)] pl-4">
          <dd className="font-mono text-2xl font-semibold tabular-nums sm:text-3xl">
            {stat.value}
          </dd>
          <dt className="mt-1 text-sm text-[var(--color-muted)]">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
