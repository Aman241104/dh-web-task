"use client";

import { useEffect, useState } from "react";

function formatUptime(sec: number) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function LiveStatusBar() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-6 py-3.5 font-mono text-[13px] text-[var(--color-muted)]">
      <span className="flex items-center gap-2 text-[var(--color-accent)]">
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]"
          style={{ boxShadow: "0 0 8px rgba(180,255,57,0.8)" }}
        />
        All systems operational
      </span>
      <span>This page has been observed by Northline for {formatUptime(seconds)}</span>
      <span>·</span>
      <span>0 incidents detected</span>
    </div>
  );
}
