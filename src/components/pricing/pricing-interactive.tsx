"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card";

function buildTiers(annual: boolean): PricingTier[] {
  return [
    {
      name: "Starter",
      tagline: "For small teams shipping their first on-call rotation.",
      price: annual ? "$79" : "$99",
      priceSuffix: "/mo per service",
      features: [
        "Up to 10 services",
        "Distributed tracing (7-day retention)",
        "Email + Slack alerting",
        "1 on-call schedule",
        "Business-hours support",
      ],
      cta: "Start free trial",
    },
    {
      name: "Team",
      tagline: "For engineering orgs running real production on-call.",
      price: annual ? "$249" : "$299",
      priceSuffix: "/mo per service",
      features: [
        "Unlimited services",
        "Distributed tracing (30-day retention)",
        "Signal correlation & noise reduction",
        "Unlimited schedules & escalations",
        "Auto-generated incident timelines",
        "24/7 support with 1hr response",
      ],
      cta: "Start free trial",
      featured: true,
    },
    {
      name: "Enterprise",
      tagline: "For platform teams with compliance and scale needs.",
      price: "Custom",
      priceSuffix: "",
      features: [
        "Everything in Team",
        "SSO / SAML & audit logs",
        "Dedicated data residency",
        "99.99% uptime SLA",
        "Named solutions engineer",
      ],
      cta: "Talk to sales",
    },
  ];
}

export function PricingInteractive() {
  const [annual, setAnnual] = useState(true);
  const [serviceCount, setServiceCount] = useState(10);

  const perService = serviceCount <= 10 ? (annual ? 79 : 99) : annual ? 249 : 299;
  const estimatedPrice = `$${(serviceCount * perService).toLocaleString()}`;
  const recommendedTier =
    serviceCount <= 10 ? "Starter" : serviceCount <= 60 ? "Team" : "Enterprise (custom)";

  return (
    <>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex gap-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-panel)] p-1"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "rounded-full px-5.5 py-2.5 font-semibold text-sm transition-colors",
              !annual ? "bg-[var(--color-foreground)] text-[var(--color-bg)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "rounded-full px-5.5 py-2.5 font-semibold text-sm transition-colors",
              annual ? "bg-[var(--color-foreground)] text-[var(--color-bg)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            )}
          >
            Annual — save 20%
          </button>
        </div>
      </div>

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

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
        {buildTiers(annual).map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>
    </>
  );
}
