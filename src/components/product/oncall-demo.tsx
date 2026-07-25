"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const REGIONS = ["Austin", "London", "Tokyo", "Sydney"];

export function OnCallDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % REGIONS.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[240px] w-full flex-col justify-center gap-3 p-8">
      {REGIONS.map((region, i) => {
        const isActive = i === active;
        return (
          <div
            key={region}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-500",
              isActive ? "border-[var(--color-accent)]/40 bg-[#141a0c]" : "border-white/10 bg-transparent",
            )}
          >
            <span className="font-mono text-[13px] text-[var(--color-foreground)]">{region}</span>
            <span className="flex items-center gap-2 font-mono text-[11px]">
              <span
                aria-hidden
                className={cn("h-2 w-2 rounded-full", isActive ? "bg-[var(--color-accent)]" : "bg-[#3a3d38]")}
                style={isActive ? { boxShadow: "0 0 6px rgba(180,255,57,0.8)" } : undefined}
              />
              <span className={isActive ? "text-[var(--color-accent)]" : "text-[#7D8280]"}>
                {isActive ? "On call" : "Off shift"}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
