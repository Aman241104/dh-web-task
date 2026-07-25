"use client";

import { useEffect, useState } from "react";

const FRAMES = [
  { traceId: "39f83a2e", latency: "183ms", services: 18, correlated: true },
  { traceId: "7c1d90bb", latency: "94ms", services: 12, correlated: true },
  { traceId: "b402e71f", latency: "310ms", services: 21, correlated: false },
  { traceId: "e88f1c04", latency: "142ms", services: 15, correlated: true },
];

export function ChartHud() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 2600);
    return () => clearInterval(timer);
  }, []);

  const data = FRAMES[frame];

  return (
    <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] backdrop-blur-sm sm:left-6 sm:top-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        <dt className="text-[#7D8280]">Trace ID</dt>
        <dd className="text-right text-[var(--color-foreground)]">{data.traceId}</dd>
        <dt className="text-[#7D8280]">Latency</dt>
        <dd className="text-right text-[var(--color-foreground)]">{data.latency}</dd>
        <dt className="text-[#7D8280]">Services</dt>
        <dd className="text-right text-[var(--color-foreground)]">{data.services}</dd>
        <dt className="text-[#7D8280]">Correlated</dt>
        <dd className={data.correlated ? "text-right text-[var(--color-accent)]" : "text-right text-[#7D8280]"}>
          {data.correlated ? "YES" : "NO"}
        </dd>
      </dl>
    </div>
  );
}
