import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-[1.75rem] p-7 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:p-9",
        tier.featured
          ? "border border-[var(--color-accent)] bg-[#161c0d]"
          : "border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3.5 left-8 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">
          Most popular
        </span>
      )}
      <h3 className="mt-2 text-xl font-bold">{tier.name}</h3>
      <p className="mt-1.5 min-h-10 text-sm text-[var(--color-muted)]">{tier.tagline}</p>
      <p className="mt-6 mb-6 flex items-baseline gap-1.5">
        <span className="font-mono text-[clamp(32px,4vw,44px)] font-bold">{tier.price}</span>
        <span className="font-mono text-sm text-[var(--color-muted)]">{tier.priceSuffix}</span>
      </p>
      <ul className="mb-7 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="/contact"
        className={cn(
          "rounded-full py-3.5 text-center font-semibold transition-opacity hover:opacity-85",
          tier.featured
            ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
            : "border border-[var(--color-border-strong)]",
        )}
      >
        {tier.cta}
      </a>
    </div>
  );
}
