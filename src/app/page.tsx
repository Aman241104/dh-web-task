import { Button } from "@/components/ui/button";
import { HeroWatermark } from "@/components/ui/hero-watermark";
import { FinalCtaBand } from "@/components/ui/final-cta-band";
import { StatStrip } from "@/components/ui/stat-strip";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/bordered-grid";
import { NumberedFeatureList, type Feature } from "@/components/ui/numbered-feature-list";
import { Reveal } from "@/components/motion/reveal";
import { LatticeCanvas } from "@/components/three/lattice-canvas";
import { Marquee } from "@/components/home/marquee";
import { TerminalReplay } from "@/components/home/terminal-replay";
import { ChartPanel } from "@/components/home/chart-panel";

const STATS = [
  { n: "01", value: "99.99%", label: "Platform uptime SLA" },
  { n: "02", value: "<180ms", label: "P95 alert latency" },
  { n: "03", value: "42", label: "Global data centers monitored" },
  { n: "04", value: "6,200+", label: "Engineering teams on call" },
];

const FEATURES: Feature[] = [
  {
    index: "01",
    title: "Distributed tracing",
    description:
      "Full-stack request traces across services, queues, and third-party APIs, stitched into one timeline.",
    href: "/product",
  },
  {
    index: "02",
    title: "Smart alerting",
    description:
      "Correlate metrics, logs, and traces so the right engineer gets paged — not the whole team.",
    href: "/product",
  },
  {
    index: "03",
    title: "On-call scheduling",
    description:
      "Rotations, escalations, and overrides that sync with how your team actually works.",
    href: "/product",
  },
  {
    index: "04",
    title: "Incident timelines",
    description: "Auto-generated postmortems with every deploy, alert, and message already in place.",
    href: "/pricing",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Instrument in minutes",
    desc: "Drop in the Northline SDK or point your existing OpenTelemetry pipeline at us — no rewrite required.",
  },
  {
    n: "02",
    title: "Correlate automatically",
    desc: "We cluster related traces, logs, and metrics into a single incident before a human looks at anything.",
  },
  {
    n: "03",
    title: "Resolve with context",
    desc: "The on-call engineer opens one timeline with the root cause, blast radius, and recent deploys already attached.",
  },
];

const BEFORE_ITEMS = [
  "Five dashboards open during every incident",
  "Alerts fire on symptoms, not root causes",
  "Postmortems written from memory, days later",
  "Whoever’s awake gets paged, ready or not",
];

const AFTER_ITEMS = [
  "One timeline with everything correlated",
  "Alerts fire on root cause, grouped automatically",
  "Postmortem drafted the moment the incident closes",
  "Escalation paths that know who’s actually on call",
];

const CASE_STATS = [
  { value: "60", label: "Services migrated" },
  { value: "−52%", label: "Pages per on-call shift" },
  { value: "3 wks", label: "Time to full rollout" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24 sm:gap-28">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-[#16181a] via-[#0E0F11] to-[#0B0C0E] px-6 py-14 sm:px-16 sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 82% -5%, rgba(180,255,57,0.14), transparent 70%)",
            }}
          />
          <HeroWatermark>OBSERVE</HeroWatermark>
          <LatticeCanvas className="pointer-events-none absolute right-0 top-0 h-full w-3/5 opacity-85" />

          <p className="relative m-0 mb-6 font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
            API Observability &amp; On-Call
          </p>
          <h1 className="relative m-0 mb-7 max-w-[15ch] text-[clamp(40px,7.4vw,108px)] font-extrabold leading-[0.94] tracking-tighter">
            Catch API failures before customers do
          </h1>
          <p className="relative m-0 mb-10 max-w-[52ch] text-lg leading-relaxed text-[#C7C9C4] sm:text-xl">
            Northline traces every request, correlates the noise, and pages the one engineer who
            can fix it — with the timeline already assembled by the time they open Slack.
          </p>
          <div className="relative flex flex-wrap gap-4">
            <Button href="/contact">Start free trial</Button>
            <Button href="/product" variant="ghost" icon={false}>
              See the product →
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <StatStrip stats={STATS.map((s) => ({ value: s.value, label: s.label }))} />
      </Reveal>

      {/* Chart */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Live volume
            </p>
            <h2 className="m-0 mb-5 max-w-[16ch] text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight">
              Correlated signals, two weeks running
            </h2>
            <p className="m-0 mb-8 max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              Instead of thousands of unrelated alerts, Northline groups them into one incident —
              hover a bar to see a real trace.
            </p>
            <StatStrip
              stats={[
                { value: "99.2%", label: "Correlation accuracy" },
                { value: "1.2B", label: "Signals per day" },
                { value: "<4min", label: "Root cause lookup" },
              ]}
            />
          </div>
          <ChartPanel />
        </div>
      </Reveal>

      {/* Terminal replay */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Replay
        </p>
        <h2 className="m-0 mb-8 max-w-[20ch] text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight">
          An incident, start to finish
        </h2>
        <TerminalReplay />
      </Reveal>

      {/* Features */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          What it does
        </p>
        <h2 className="m-0 mb-12 max-w-[18ch] text-[clamp(32px,4.6vw,56px)] font-extrabold tracking-tight">
          One platform for tracing, alerting, and on-call
        </h2>
        <NumberedFeatureList features={FEATURES} />
      </Reveal>

      {/* Process */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          How it works
        </p>
        <h2 className="m-0 mb-12 max-w-[18ch] text-[clamp(32px,4.6vw,56px)] font-extrabold tracking-tight">
          From noisy alert to closed incident
        </h2>
        <BorderedGrid minWidth={240}>
          {STEPS.map((step) => (
            <BorderedGridCell key={step.n}>
              <span className="font-mono text-[clamp(30px,3.6vw,42px)] font-bold text-[var(--color-accent)]/85">
                {step.n}
              </span>
              <h3 className="mb-2.5 mt-4 text-xl font-bold">{step.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--color-muted)]">{step.desc}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Reveal>

      {/* Atmospheric impact band */}
      <Reveal variant="scale">
        <section
          aria-label="Impact at a glance"
          className="relative overflow-hidden border-y border-white/[0.06] px-4 py-24 sm:px-6 sm:py-36"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 0%, #1e2124 0%, #111315 40%, #0B0C0E 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-[var(--color-accent)] sm:block"
            style={{ boxShadow: "0 0 80px 14px rgba(180,255,57,0.55)" }}
          />
          <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 text-center sm:grid-cols-3">
            <div>
              <div className="font-mono text-[clamp(56px,8.5vw,100px)] font-bold leading-none tracking-tight">
                63%
              </div>
              <p className="mt-4 font-mono text-sm text-[var(--color-muted)]">
                fewer false-positive pages after switching to correlated alerts
              </p>
            </div>
            <div>
              <p className="m-0 text-[clamp(24px,3vw,34px)] font-bold tracking-tight">
                Noise in.
                <br />
                Signal out.
              </p>
            </div>
            <div>
              <div className="font-mono text-[clamp(56px,8.5vw,100px)] font-bold leading-none tracking-tight">
                4.1M
              </div>
              <p className="mt-4 font-mono text-sm text-[var(--color-muted)]">
                signals correlated across services every day
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Marquee */}
      <section aria-label="Customers" className="border-b border-white/[0.06] py-14 sm:py-20">
        <p className="mx-auto mb-7 max-w-6xl px-4 font-mono text-[13px] uppercase tracking-[0.1em] text-[#7D8280] sm:px-6">
          Trusted by engineering teams at
        </p>
        <Marquee />
      </section>

      {/* Quote */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <blockquote className="m-0 rounded-[1.75rem] border border-white/[0.08] bg-[var(--color-bg-raised)] p-9 sm:p-16">
          <p className="m-0 mb-7 max-w-[32ch] text-[clamp(24px,3.2vw,38px)] font-semibold leading-tight tracking-tight">
            &ldquo;We cut our mean-time-to-resolution from 40 minutes to under 6 the week we turned
            on Northline&apos;s correlated timelines.&rdquo;
          </p>
          <footer className="font-mono text-sm text-[#7D8280]">
            — VP Engineering, Ledgerframe
          </footer>
        </blockquote>
      </Reveal>

      {/* Case study */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          className="grid grid-cols-1 items-center gap-8 rounded-[1.75rem] border border-[var(--color-accent)]/25 p-8 sm:grid-cols-[1fr_1.6fr] sm:gap-12 sm:p-14"
          style={{ background: "linear-gradient(120deg, #141a0c 0%, #101113 55%)" }}
        >
          <div>
            <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Case study
            </p>
            <h2 className="m-0 mb-3 text-[clamp(26px,3.2vw,38px)] font-extrabold tracking-tight">
              Ledgerframe cut on-call load in half
            </h2>
            <p className="m-0 mb-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
              A payments infrastructure team migrated 60 services to Northline in three weeks and
              stopped paging engineers for anything but real customer impact.
            </p>
            <a
              href="/contact"
              className="font-semibold text-[var(--color-accent)] transition-colors hover:text-[#c9ff6b]"
            >
              Read how they did it →
            </a>
          </div>
          <BorderedGrid minWidth={140}>
            {CASE_STATS.map((cs) => (
              <BorderedGridCell key={cs.label} className="bg-[#0E0F11] hover:bg-[#0E0F11] p-5">
                <div className="font-mono text-[clamp(24px,2.6vw,32px)] font-bold">{cs.value}</div>
                <div className="mt-2 font-mono text-xs text-[#7D8280]">{cs.label}</div>
              </BorderedGridCell>
            ))}
          </BorderedGrid>
        </div>
      </Reveal>

      {/* Compare */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          The switch
        </p>
        <h2 className="m-0 mb-12 max-w-[18ch] text-[clamp(32px,4.6vw,56px)] font-extrabold tracking-tight">
          What changes in week one
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal variant="left">
            <div className="rounded-3xl border border-white/[0.08] bg-[var(--color-bg-raised)] p-7 sm:p-9">
              <p className="m-0 mb-5 font-mono text-[13px] uppercase tracking-[0.08em] text-[#7D8280]">
                Before Northline
              </p>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {BEFORE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    <span aria-hidden className="shrink-0 font-mono text-[#7D8280]">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <div
              className="rounded-3xl border border-[var(--color-accent)] p-7 sm:p-9"
              style={{ background: "#141a0c" }}
            >
              <p className="m-0 mb-5 font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                With Northline
              </p>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {AFTER_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <span aria-hidden className="shrink-0 font-mono text-[var(--color-accent)]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* Agent-native */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 rounded-[1.75rem] border border-white/[0.08] bg-[var(--color-bg-raised)] p-8 sm:grid-cols-[1fr_1.4fr] sm:gap-12 sm:p-14">
          <div>
            <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Built for what&apos;s next
            </p>
            <h2 className="m-0 mb-4 max-w-[16ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
              Ready for the AI-agent trace explosion
            </h2>
            <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              Every LLM call, tool invocation, and reasoning step throws off its own span.
              Northline ingests agent traces at native volume and bills on infrastructure, not on
              how chatty your agents get.
            </p>
          </div>
          <StatStrip
            stats={[
              { value: "10x", label: "spans per agentic request vs. a typical web call" },
              { value: "0%", label: "bill increase tied to trace volume — priced on services, not GB" },
            ]}
          />
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FinalCtaBand
          heading="Stop firefighting. Start observing."
          ctaLabel="Book a walkthrough"
          ctaHref="/contact"
        />
      </Reveal>
    </div>
  );
}
