import type { Metadata } from "next";
import { FinalCtaBand } from "@/components/ui/final-cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { OrbCanvas } from "@/components/three/orb-canvas";
import { Marquee } from "@/components/home/marquee";
import { PricingInteractive } from "@/components/pricing/pricing-interactive";
import { JsonLd, faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Northline pricing scales with the number of services you trace, not the size of your engineering team. No per-seat tax on your busiest engineers.",
  openGraph: {
    title: "Northline Pricing",
    description: "Pricing that scales with your on-call load, not your headcount.",
  },
};

const MIGRATION = [
  { week: "Week 1", title: "Instrument in parallel", desc: "SDK goes in alongside your current tool — no cutover risk yet." },
  { week: "Week 2", title: "Run both side by side", desc: "Compare alert quality and trace coverage before trusting it fully." },
  { week: "Week 3", title: "Cut over on-call", desc: "Switch paging to Northline once your team's confident in the signal." },
];

const COMPARISON_ROWS = [
  { label: "Services traced", starter: "Up to 10", team: "Unlimited", enterprise: "Unlimited" },
  { label: "Trace retention", starter: "7 days", team: "30 days", enterprise: "90 days" },
  { label: "Signal correlation", starter: "—", team: "✓", enterprise: "✓" },
  { label: "On-call schedules", starter: "1", team: "Unlimited", enterprise: "Unlimited" },
  { label: "SSO / SAML", starter: "—", team: "—", enterprise: "✓" },
  { label: "Support response", starter: "Business hours", team: "1 hr, 24/7", enterprise: "Dedicated engineer" },
];

const ADDONS = [
  { name: "Extended retention", desc: "Push trace retention to 180 days for audits and long-tail debugging.", price: "From $0.02/GB-mo" },
  { name: "Premium support", desc: "30-minute response SLA and a shared Slack channel with our team.", price: "$800/mo" },
  { name: "Professional services", desc: "Hands-on migration help from our solutions engineering team.", price: "Custom quote" },
];

const FAQ_ITEMS = [
  { question: "How is a “service” counted?", answer: "Any deployable unit you trace — a microservice, worker, or gateway. Databases and caches you only monitor don't count." },
  { question: "Can we mix monthly and annual billing?", answer: "Annual billing applies account-wide. You can switch from monthly to annual at any time; the discount applies at your next renewal." },
  { question: "What happens if we exceed our trace volume?", answer: "We'll notify you before throttling anything. Overages are billed at a flat per-GB rate, never a surprise plan bump." },
  { question: "Do you offer a discount for startups?", answer: "Yes — teams under 20 engineers on a first funding round get 50% off Team for the first year." },
  { question: "Is there a setup or onboarding fee?", answer: "No. Starter and Team are self-serve with guided setup docs. Enterprise includes a dedicated onboarding engineer at no extra cost." },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-20 pb-24 sm:gap-24">
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-[#16181a] via-[#0E0F11] to-[#0B0C0E] px-6 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(60% 50% at 50% 0%, rgba(180,255,57,0.12), transparent 70%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(90px,20vw,260px)] font-black leading-none tracking-tight text-white/[0.025]"
          >
            PLANS
          </span>
          <OrbCanvas className="pointer-events-none absolute right-[2%] top-0 h-[220px] w-[220px] opacity-90" />
          <p className="relative m-0 mb-5.5 font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Pricing
          </p>
          <h1 className="relative m-0 mx-auto mb-5.5 max-w-[16ch] text-[clamp(34px,6vw,76px)] font-extrabold leading-[0.98] tracking-tighter">
            Pricing that scales with your on-call load
          </h1>
          <p className="relative m-0 mx-auto max-w-[50ch] text-lg leading-relaxed text-[#C7C9C4]">
            No per-seat tax on your busiest engineers. Pay for signal volume, not headcount.
          </p>
        </div>
      </section>

      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <PricingInteractive />
      </Reveal>

      {/* Why these plans exist */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-foreground)] px-6 py-16 text-[var(--color-bg)] sm:px-14 sm:py-20">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(70px,20vw,260px)] font-black tracking-tight text-[#0B0C0E]/[0.05] blur-[2px]"
          >
            WHY
          </span>
          <p className="relative m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[#5b6b1f]">
            No plan is padding
          </p>
          <h2 className="relative m-0 mb-10 max-w-[20ch] text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-tight">
            Why these three tiers, and not more
          </h2>
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="m-0 mb-2 text-lg font-bold">Starter</h3>
              <p className="m-0 text-[15px] leading-relaxed text-[#3a3d38]">
                For teams who don&apos;t know yet if this is worth paying for. Ten services, real
                tracing, no card required to feel it.
              </p>
            </div>
            <div>
              <h3 className="m-0 mb-2 text-lg font-bold">Team</h3>
              <p className="m-0 text-[15px] leading-relaxed text-[#3a3d38]">
                For teams already paging humans at 3am. Correlation and noise reduction aren&apos;t
                a feature here — they&apos;re the entire reason to switch.
              </p>
            </div>
            <div>
              <h3 className="m-0 mb-2 text-lg font-bold">Enterprise</h3>
              <p className="m-0 text-[15px] leading-relaxed text-[#3a3d38]">
                For platform teams that get audited. SSO and data residency aren&apos;t upsells —
                they&apos;re what gets procurement to sign off at all.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Migration */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          No big-bang cutover
        </p>
        <h2 className="m-0 mb-10 max-w-[22ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
          A typical migration takes three weeks
        </h2>
        <div className="relative grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0">
          <div aria-hidden className="absolute left-[16.5%] right-[16.5%] top-[11px] hidden h-[2px] bg-[var(--color-accent)]/30 sm:block" />
          {MIGRATION.map((m) => (
            <div key={m.week} className="px-3 text-center">
              <div className="relative z-10 mx-auto mb-5 h-6 w-6 rounded-full bg-[var(--color-accent)]" />
              <p className="m-0 mb-2 font-mono text-xs uppercase tracking-[0.06em] text-[var(--color-accent)]">
                {m.week}
              </p>
              <h3 className="m-0 mb-2 text-lg font-bold">{m.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-muted)]">{m.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Comparison table */}
      <Reveal className="mx-auto w-full max-w-6xl overflow-x-auto px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Compare
        </p>
        <h2 className="m-0 mb-8 max-w-[20ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
          Every plan, feature by feature
        </h2>
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
          <thead>
            <tr>
              <th scope="col" className="border-b border-[var(--color-border)] p-4.5 text-left font-mono text-xs uppercase tracking-[0.06em] text-[#7D8280]">
                Feature
              </th>
              <th scope="col" className="border-b border-[var(--color-border)] p-4.5 text-center text-base font-bold">
                Starter
              </th>
              <th scope="col" className="border-b border-[var(--color-border)] p-4.5 text-center text-base font-bold text-[var(--color-accent)]">
                Team
              </th>
              <th scope="col" className="border-b border-[var(--color-border)] p-4.5 text-center text-base font-bold">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="transition-colors hover:bg-[var(--color-bg-panel)]">
                <th scope="row" className="border-b border-[var(--color-border)] p-4 text-left text-sm font-normal text-[#C7C9C4]">
                  {row.label}
                </th>
                <td className="border-b border-[var(--color-border)] p-4 text-center font-mono text-sm text-[var(--color-muted)]">
                  {row.starter}
                </td>
                <td className="border-b border-[var(--color-border)] bg-[var(--color-accent)]/[0.04] p-4 text-center font-mono text-sm">
                  {row.team}
                </td>
                <td className="border-b border-[var(--color-border)] p-4 text-center font-mono text-sm text-[var(--color-muted)]">
                  {row.enterprise}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Marquee */}
      <section aria-label="Customers" className="py-4">
        <p className="mx-auto mb-7 max-w-6xl px-4 font-mono text-[13px] uppercase tracking-[0.1em] text-[#7D8280] sm:px-6">
          Trusted by engineering teams at
        </p>
        <Marquee />
      </section>

      {/* Add-ons */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Add-ons
        </p>
        <h2 className="m-0 mb-8 max-w-[22ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
          Extend any plan as you grow
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ADDONS.map((addon) => (
            <div
              key={addon.name}
              className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
            >
              <h3 className="m-0 mb-2 text-lg font-bold">{addon.name}</h3>
              <p className="m-0 mb-4 text-sm leading-relaxed text-[var(--color-muted)]">{addon.desc}</p>
              <p className="m-0 font-mono text-[15px] text-[var(--color-accent)]">{addon.price}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Quote */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <blockquote className="m-0 rounded-[1.75rem] border border-white/[0.08] bg-[var(--color-bg-raised)] p-9 text-center sm:p-14">
          <p className="m-0 mb-6 text-[clamp(22px,2.6vw,30px)] font-semibold leading-tight tracking-tight">
            &ldquo;Team tier paid for itself the first month we didn&apos;t need a fourth on-call
            engineer.&rdquo;
          </p>
          <footer className="font-mono text-sm text-[#7D8280]">— Head of Platform, Orbital Pay</footer>
        </blockquote>
      </Reveal>

      {/* FAQ */}
      <Reveal className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="m-0 mb-3 text-center font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          FAQ
        </p>
        <h2 className="m-0 mb-9 text-center text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
          Questions teams ask before switching
        </h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FinalCtaBand heading="Not sure which tier fits?" ctaLabel="Talk to sales" ctaHref="/contact" />
      </Reveal>
    </div>
  );
}
