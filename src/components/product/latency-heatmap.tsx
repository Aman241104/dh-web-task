const SERVICES = ["checkout", "payments", "inventory", "auth", "search", "fraud-check"];
const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => (i % 3 === 0 ? String(i).padStart(2, "0") : ""));

function seededCell(rowIndex: number, hourIndex: number) {
  const seed = Math.sin(rowIndex * 12.9898 + hourIndex * 78.233) * 43758.5453;
  const v = seed - Math.floor(seed);
  const opacity = (0.08 + v * 0.85).toFixed(2);
  const ms = Math.round(80 + v * 900);
  return { opacity, ms };
}

export function LatencyHeatmap() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5 sm:p-8">
      <div className="flex min-w-[640px] flex-col gap-[3px]">
        <div className="grid grid-cols-[120px_repeat(24,1fr)] gap-[3px]">
          <span aria-hidden />
          {HOUR_LABELS.map((h, i) => (
            <span key={i} className="text-center font-mono text-[9px] text-[#7D8280]">
              {h}
            </span>
          ))}
        </div>
        {SERVICES.map((name, ri) => (
          <div key={name} className="grid grid-cols-[120px_repeat(24,1fr)] gap-[3px]">
            <span className="self-center font-mono text-xs text-[var(--color-muted)]">{name}</span>
            {HOUR_LABELS.map((_, hi) => {
              const { opacity, ms } = seededCell(ri, hi);
              return (
                <span
                  key={hi}
                  title={`${name} · ${String(hi).padStart(2, "0")}:00 · ${ms}ms p95`}
                  className="aspect-square rounded-[3px]"
                  style={{ background: `rgba(180,255,57,${opacity})` }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
