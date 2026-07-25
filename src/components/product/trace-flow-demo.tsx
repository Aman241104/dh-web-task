"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const HOPS = [
  { name: "Client", latency: "—", status: "origin" },
  { name: "API Gateway", latency: "12ms", status: "healthy" },
  { name: "Auth", latency: "8ms", status: "healthy" },
  { name: "Database", latency: "92ms", status: "healthy" },
  { name: "Redis", latency: "3ms", status: "healthy" },
];

export function TraceFlowDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const n = HOPS.length;

  return (
    <div className="relative flex min-h-[240px] w-full items-center justify-center p-8">
      <div className="relative flex w-full max-w-[220px] flex-col gap-8">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10"
        />
        <motion.div
          aria-hidden
          className="absolute left-[3px] h-[9px] w-[9px] rounded-full bg-[var(--color-accent)]"
          style={{ boxShadow: "0 0 8px rgba(180,255,57,0.8)" }}
          animate={{
            top: HOPS.map((_, i) => `${(i / (n - 1)) * 100}%`),
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: HOPS.map((_, i) => i / (n - 1)) }}
        />
        {HOPS.map((hop, i) => (
          <div
            key={hop.name}
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            <span
              aria-hidden
              className={cn(
                "h-[15px] w-[15px] shrink-0 rounded-full border-2 transition-colors",
                hovered === i ? "border-[var(--color-accent)]" : "border-white/20",
              )}
              style={{ background: "var(--color-bg-raised)" }}
            />
            <span className="font-mono text-[13px] text-[var(--color-foreground)]">{hop.name}</span>
            {hovered === i && hop.status !== "origin" && (
              <span className="absolute left-full ml-3 whitespace-nowrap rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 font-mono text-[11px] backdrop-blur-sm">
                {hop.latency} · {hop.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
