"use client";

import { useState } from "react";
import { useBilling } from "@/components/pricing/billing-context";

export function CostEstimator() {
  const { annual } = useBilling();
  const [serviceCount, setServiceCount] = useState(10);

  const perService = serviceCount <= 10 ? (annual ? 79 : 99) : annual ? 249 : 299;
  const estimatedPrice = `$${(serviceCount * perService).toLocaleString()}`;
  const recommendedTier =
    serviceCount <= 10 ? "Starter" : serviceCount <= 60 ? "Team" : "Enterprise (custom)";

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 sm:p-10">
      <p className="m-0 mb-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--color-accent)]">
        Cost estimator
      </p>
      <h2 className="m-0 mb-6 text-xl font-bold">Priced on services, not on how much you trace</h2>
      <label htmlFor="svc-slider" className="mb-3 flex justify-between font-mono text-sm text-[var(--color-muted)]">
        <span>Services traced</span>
        <span className="text-[var(--color-foreground)]">{serviceCount}</span>
      </label>
      <input
        id="svc-slider"
        type="range"
        min={1}
        max={200}
        step={1}
        value={serviceCount}
        onChange={(e) => setServiceCount(Number(e.target.value))}
        className="mb-6 w-full accent-[var(--color-accent)]"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-6">
        <div>
          <span className="font-mono text-[clamp(30px,4vw,40px)] font-bold">{estimatedPrice}</span>
          <span className="ml-1 font-mono text-sm text-[#7D8280]">/mo on {recommendedTier}</span>
        </div>
        <p className="m-0 max-w-[26ch] font-mono text-xs text-[#7D8280]">
          No per-GB surprise fees — trace volume never changes this number.
        </p>
      </div>
    </div>
  );
}
