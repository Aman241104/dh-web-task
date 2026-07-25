"use client";

import { useBilling } from "@/components/pricing/billing-context";
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

export function PricingTiers() {
  const { annual } = useBilling();
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
      {buildTiers(annual).map((tier) => (
        <PricingCard key={tier.name} tier={tier} />
      ))}
    </div>
  );
}
