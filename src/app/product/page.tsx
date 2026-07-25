import type { Metadata } from "next";
import { HeroWatermark } from "@/components/ui/hero-watermark";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/bordered-grid";
import { StatStrip } from "@/components/ui/stat-strip";
import { FinalCtaBand } from "@/components/ui/final-cta-band";
import { Reveal } from "@/components/motion/reveal";
import { LatticeCanvas } from "@/components/three/lattice-canvas";
import { LatencyHeatmap } from "@/components/product/latency-heatmap";
import { CopyCommand } from "@/components/product/copy-command";
import { TraceFlowDemo } from "@/components/product/trace-flow-demo";
import { AlertMergeDemo } from "@/components/product/alert-merge-demo";
import { OnCallDemo } from "@/components/product/oncall-demo";
import { JsonLd, serviceSchema } from "@/lib/structured-data";

const INSTALL_COMMAND = "npm install @northline/otel-exporter";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Northline stitches tracing, alerting, and on-call into a single observability plane — from raw signal to root cause in seconds.",
  openGraph: {
    title: "Northline Product",
    description:
      "Every signal in one observability plane: distributed tracing, correlated alerting, and on-call scheduling.",
  },
};

const STATS = [
  { n: "01", value: "1.2B/day", label: "Spans ingested per day" },
  { n: "02", value: "<4min", label: "Median time to root cause" },
  { n: "03", value: "99.2%", label: "Alert-to-incident accuracy" },
  { n: "04", value: "40+", label: "Native integrations" },
];

const BLOCKS = [
  {
    tag: "Tracing",
    title: "Distributed tracing across every hop",
    desc: "Follow a request through services, queues, and third-party APIs with span-level detail — no more stitching logs by hand.",
    stat: "Traces retained for 30 days, sampled at 100% during incidents",
    demo: "trace" as const,
    watermark: "TRACE",
  },
  {
    tag: "Alerting",
    title: "Correlation before notification",
    desc: "Northline groups related signals into one incident before anyone gets paged, so a single root cause doesn't fan out into forty alerts.",
    stat: "63% fewer duplicate pages on average",
    demo: "alert" as const,
    watermark: "ALERTS",
  },
  {
    tag: "On-call",
    title: "Scheduling that matches reality",
    desc: "Rotations, follow-the-sun handoffs, and manual overrides, with escalation paths that respect who's actually awake.",
    stat: "Escalates in under 45 seconds if unacknowledged",
    demo: "oncall" as const,
    watermark: "ON CALL",
  },
];

const PIPELINE = [
  { n: "01", title: "Ingest", desc: "Spans, logs, and metrics stream in via OpenTelemetry." },
  { n: "02", title: "Correlate", desc: "Related signals are clustered into one candidate incident." },
  { n: "03", title: "Notify", desc: "The right on-call engineer is paged with context attached." },
  { n: "04", title: "Resolve", desc: "Timeline and postmortem draft are ready when the incident closes." },
];

const QUERY_RESULTS = [
  { time: "14:02:11", trace: "checkout → payments-svc → ledger-write", latency: "1.2s" },
  { time: "14:01:58", trace: "checkout → inventory-svc → cache-miss", latency: "940ms" },
  { time: "14:01:40", trace: "checkout → payments-svc → retry(2)", latency: "2.1s" },
  { time: "14:01:22", trace: "checkout → fraud-check-svc", latency: "860ms" },
];

const INTEGRATIONS = [
  { name: "Chat & messaging", desc: "Route alerts to channels, not inboxes" },
  { name: "Ticketing", desc: "Auto-create tickets from incidents" },
  { name: "CI/CD pipelines", desc: "Annotate traces with deploy markers" },
  { name: "AWS / GCP / Azure", desc: "Native cloud metric ingestion" },
  { name: "Kubernetes", desc: "Pod-level trace correlation" },
  { name: "Custom webhooks", desc: "Send incidents anywhere" },
];

const COMPLIANCE = [
  { name: "SOC 2 Type II", desc: "Annual third-party audit, report available under NDA" },
  { name: "GDPR & CCPA", desc: "Data processing agreements and regional data residency" },
  { name: "SSO & SCIM", desc: "SAML-based single sign-on with automated provisioning" },
  {
    name: "Encryption",
    desc: "AES-256 at rest, TLS 1.3 in transit, customer-managed keys on Enterprise",
  },
];

export default function ProductPage() {
  return (
    <div className="flex flex-col gap-20 pb-24 sm:gap-24">
      <JsonLd data={serviceSchema} />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-[#16181a] via-[#0E0F11] to-[#0B0C0E] px-6 py-14 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 82% -5%, rgba(180,255,57,0.14), transparent 70%)",
            }}
          />
          <HeroWatermark>TRACE</HeroWatermark>
          <LatticeCanvas count={38} spread={4} className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-85" />

          <p className="relative m-0 mb-6 font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
            The Product
          </p>
          <h1 className="relative m-0 mb-6 max-w-[17ch] text-[clamp(38px,6.6vw,92px)] font-extrabold leading-[0.96] tracking-tighter">
            Every signal in one observability plane
          </h1>
          <p className="relative m-0 max-w-[56ch] text-lg leading-relaxed text-[#C7C9C4] sm:text-xl">
            Tracing, alerting, and on-call don&apos;t live in separate tools anymore. Northline
            stitches them into a single timeline so an incident tells its own story.
          </p>
        </div>
      </section>

      {/* Stats */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <StatStrip stats={STATS.map((s) => ({ value: s.value, label: s.label }))} />
      </Reveal>

      {/* Editorial */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-foreground)] px-6 py-20 text-center text-[var(--color-bg)] sm:px-16 sm:py-28">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(70px,20vw,260px)] font-black tracking-tight text-[#0B0C0E]/[0.06] blur-[2px]"
          >
            ROOT CAUSE
          </span>
          <p className="relative m-0 mb-5 font-mono text-[13px] uppercase tracking-[0.12em] text-[#5b6b1f]">
            From symptom to source
          </p>
          <h2 className="relative m-0 mx-auto max-w-[15ch] text-[clamp(30px,6vw,74px)] font-extrabold leading-[1.02] tracking-tight">
            From alert to root cause in seconds, not stand-ups
          </h2>
        </div>
      </Reveal>

      {/* Capability blocks */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="sr-only">Core capabilities</h2>
        <div className="flex flex-col gap-px overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-border)]">
          {BLOCKS.map((block) => (
            <div key={block.tag} className="grid grid-cols-1 bg-[var(--color-bg-raised)] sm:grid-cols-[1fr_1.4fr]">
              <div
                className="relative min-h-[240px] overflow-hidden"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${block.watermark.length * 62} 100"><text x="0" y="82" font-family="Arial, sans-serif" font-weight="900" font-size="92" letter-spacing="-2" fill="white" fill-opacity="0.025">${block.watermark}</text></svg>`,
                  )}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "80%",
                }}
              >
                {block.demo === "trace" && <TraceFlowDemo />}
                {block.demo === "alert" && <AlertMergeDemo />}
                {block.demo === "oncall" && <OnCallDemo />}
              </div>
              <div className="p-8 sm:p-12">
                <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--color-accent)]">
                  {block.tag}
                </p>
                <h3 className="m-0 mb-3.5 text-[clamp(22px,3vw,32px)] font-bold tracking-tight">
                  {block.title}
                </h3>
                <p className="m-0 mb-4 max-w-[52ch] text-base leading-relaxed text-[var(--color-muted)]">
                  {block.desc}
                </p>
                <p className="m-0 font-mono text-sm">{block.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Blast radius */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Know the blast radius
            </p>
            <h2 className="m-0 mb-4 max-w-[16ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
              See exactly what a failure touches
            </h2>
            <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              Every trace maps dependents automatically, so the on-call engineer knows in seconds
              whether this is a two-service blip or a customer-facing outage.
            </p>
          </div>
          <div className="relative mx-auto flex aspect-square max-w-[380px] items-center justify-center">
            <div className="absolute h-full w-full rounded-full border border-[var(--color-accent)]/[0.12]" />
            <div className="absolute h-[68%] w-[68%] rounded-full border border-[var(--color-accent)]/25" />
            <div className="absolute h-[36%] w-[36%] rounded-full border border-[var(--color-accent)]/50" />
            <div
              className="relative aspect-square w-[15%] rounded-full bg-[var(--color-accent)]"
              style={{ boxShadow: "0 0 24px rgba(180,255,57,0.6)" }}
            />
            <span className="absolute top-[6%] font-mono text-[11px] text-[#7D8280]">
              customer impact window
            </span>
            <span className="absolute top-[22%] font-mono text-[11px] text-[var(--color-muted)]">
              12 downstream services
            </span>
            <span className="absolute top-[38%] font-mono text-[11px] text-[#C7C9C4]">
              4 direct dependents
            </span>
          </div>
        </div>
      </Reveal>

      {/* Pipeline */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Under the hood
        </p>
        <h2 className="m-0 mb-10 max-w-[20ch] text-[clamp(30px,4vw,46px)] font-extrabold tracking-tight">
          How a signal becomes an incident
        </h2>
        <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-[2px] opacity-50 sm:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, #B4FF39 0 10px, transparent 10px 18px)",
            }}
          />
          {PIPELINE.map((step) => (
            <div key={step.n} className="relative px-3 text-center">
              <div className="relative z-10 mx-auto mb-4.5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-raised)] font-mono font-bold text-[var(--color-accent)]">
                {step.n}
              </div>
              <h3 className="m-0 mb-2 text-lg font-bold">{step.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-muted)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* SDK */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Get started
            </p>
            <h2 className="m-0 mb-4 max-w-[16ch] text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-tight">
              Three lines, first trace in minutes
            </h2>
            <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              OpenTelemetry-compatible — if you&apos;re already emitting spans, point the exporter
              at us and you&apos;re done.
            </p>
          </div>
          <div className="relative">
            <CopyCommand command={INSTALL_COMMAND} />
            <pre className="m-0 overflow-x-auto rounded-[1.25rem] border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-6 sm:p-8">
              <code className="whitespace-pre font-mono text-sm leading-[1.7] text-[#C7C9C4]">
                {`$ npm install @northline/otel-exporter

import { NorthlineExporter } from '@northline/otel-exporter';
tracerProvider.addSpanProcessor(
  new BatchSpanProcessor(new NorthlineExporter({
    apiKey: process.env.NORTHLINE_KEY,
  }))
);
`}
                <span className="text-[var(--color-accent)]">
                  {"// first trace shows up in your timeline in ~30s"}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </Reveal>

      {/* Query console */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Ask, don&apos;t dig
        </p>
        <h2 className="m-0 mb-8 max-w-[20ch] text-[clamp(30px,4vw,46px)] font-extrabold tracking-tight">
          Query your traces like a database
        </h2>
        <div className="rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-5 sm:p-8">
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-bg-panel)] px-4.5 py-3.5">
            <span aria-hidden className="font-mono text-[var(--color-accent)]">
              ›
            </span>
            <code className="font-mono text-[15px]">
              service:checkout AND latency&gt;800ms AND last:1h
            </code>
            <span
              aria-hidden
              className="ml-0.5 h-4 w-2 bg-[var(--color-accent)] opacity-80 motion-safe:animate-[blink_1s_step-end_infinite]"
            />
          </div>
          <div className="flex flex-col gap-px overflow-hidden rounded-[0.875rem] bg-white/[0.06]">
            {QUERY_RESULTS.map((r) => (
              <div
                key={r.time}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-[var(--color-bg-raised)] px-4.5 py-3.5 font-mono text-[13px]"
              >
                <span className="text-[#7D8280]">{r.time}</span>
                <span className="text-[#C7C9C4]">{r.trace}</span>
                <span className="text-[var(--color-accent)]">{r.latency}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Latency heatmap */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          See it before it pages
        </p>
        <h2 className="m-0 mb-8 max-w-[22ch] text-[clamp(30px,4vw,46px)] font-extrabold tracking-tight">
          Latency across every endpoint, at a glance
        </h2>
        <LatencyHeatmap />
      </Reveal>

      {/* Integrations */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Fits your stack
        </p>
        <h2 className="m-0 mb-10 max-w-[20ch] text-[clamp(30px,4vw,46px)] font-extrabold tracking-tight">
          Works with the tools your team already runs
        </h2>
        <BorderedGrid minWidth={180}>
          {INTEGRATIONS.map((i) => (
            <BorderedGridCell key={i.name} className="p-5.5">
              <p className="m-0 mb-1 font-mono text-sm font-semibold">{i.name}</p>
              <p className="m-0 font-mono text-xs text-[#7D8280]">{i.desc}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Reveal>

      {/* Security & compliance */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Trust &amp; compliance
        </p>
        <h2 className="m-0 mb-10 max-w-[20ch] text-[clamp(30px,4vw,46px)] font-extrabold tracking-tight">
          Built to pass your security review
        </h2>
        <BorderedGrid minWidth={200}>
          {COMPLIANCE.map((c) => (
            <BorderedGridCell key={c.name} className="p-5.5">
              <p className="m-0 mb-1.5 font-mono text-sm font-semibold">{c.name}</p>
              <p className="m-0 font-mono text-xs leading-relaxed text-[#7D8280]">{c.desc}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FinalCtaBand
          heading="See it trace a real incident."
          ctaLabel="Book a walkthrough"
          ctaHref="/contact"
        />
      </Reveal>
    </div>
  );
}
