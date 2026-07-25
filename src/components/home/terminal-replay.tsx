"use client";

import { useEffect, useState } from "react";

const LOG_LINES = [
  { time: "14:02:03", text: "Alert: checkout-svc p95 latency > 800ms", color: "#EDEEE9" },
  { time: "14:02:04", text: "Correlating 3 related signals across 2 services…", color: "#9CA0A0" },
  {
    time: "14:02:05",
    text: "Root cause candidate: payments-svc connection pool exhausted",
    color: "#B4FF39",
  },
  {
    time: "14:02:05",
    text: "Paging: on-call engineer (payments) — not the whole team",
    color: "#9CA0A0",
  },
  { time: "14:06:17", text: "Acknowledged. Timeline and recent deploys attached.", color: "#9CA0A0" },
  { time: "14:06:19", text: "Resolved in 4m12s. Postmortem draft ready.", color: "#B4FF39" },
];

export function TerminalReplay() {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineCount((count) => {
        if (count >= LOG_LINES.length) {
          clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  const visible = LOG_LINES.slice(0, lineCount);
  const typing = lineCount < LOG_LINES.length;

  return (
    <div className="min-h-[280px] rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-6 sm:p-9">
      <div className="mb-5 flex gap-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3a3d38]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3a3d38]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3a3d38]" />
      </div>
      {visible.map((line, i) => (
        <p key={i} className="m-0 font-mono text-sm leading-[1.9]" style={{ color: line.color }}>
          <span className="text-[#7D8280]">{line.time}</span> {line.text}
        </p>
      ))}
      {typing && (
        <span
          aria-hidden
          className="mt-1 inline-block h-4 w-2 bg-[var(--color-accent)] motion-safe:animate-[blink_1s_step-end_infinite]"
        />
      )}
    </div>
  );
}
