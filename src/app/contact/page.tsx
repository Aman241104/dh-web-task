import type { Metadata } from "next";
import { HeroWatermark } from "@/components/ui/hero-watermark";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/bordered-grid";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { GlobeCanvas } from "@/components/three/globe-canvas";
import { ContactForm } from "@/components/contact/contact-form";
import { LiveStatusBar } from "@/components/contact/live-status-bar";
import { OfficeClocks } from "@/components/contact/office-clocks";
import { JsonLd, faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a Northline solutions engineer about migrating your on-call rotation, or start a 14-day trial with no call required.",
  openGraph: {
    title: "Contact Northline",
    description: "Talk to an engineer, not a chatbot.",
  },
};

const TEAM = [
  {
    initials: "JM",
    name: "Jordan M.",
    role: "Solutions Engineer",
    detail: "8 yrs on-call · Austin, TX · fluent in Kubernetes horror stories",
  },
  {
    initials: "AK",
    name: "Aisha K.",
    role: "Sales, Platform Teams",
    detail: "Ex-SRE · Lisbon, PT · will tell you honestly if Starter is enough",
  },
  {
    initials: "RT",
    name: "Rin T.",
    role: "Support Engineer",
    detail: "6 yrs incident response · Austin, TX · replies in under 15 min",
  },
];

const STEPS = [
  { n: "01", title: "We read it same-day", desc: "A solutions engineer reviews your stack and what's currently paging your team." },
  { n: "02", title: "You get a real reply", desc: "No auto-responder — an email back with next steps, from a person who read your message." },
  { n: "03", title: "We show you your data", desc: "On the call, we wire up a trial against a service you actually run, not a canned demo." },
];

const FAQ_ITEMS = [
  { question: "Do you offer a free trial?", answer: "Yes — 14 days, full feature access, no credit card required to start." },
  { question: "How long does setup take?", answer: "Most teams are seeing traces within an hour using our OpenTelemetry-compatible SDK." },
  { question: "Can I talk to sales before signing up?", answer: "Always. Use the form above or email sales@northline.dev directly — we'll set up a call within one business day." },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-14 pb-24 sm:gap-16">
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-[#16181a] via-[#0E0F11] to-[#0B0C0E] px-6 py-14 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(55% 45% at 82% -5%, rgba(180,255,57,0.14), transparent 70%)",
            }}
          />
          <HeroWatermark>TALK</HeroWatermark>
          <GlobeCanvas className="pointer-events-none absolute right-0 top-0 h-full w-[48%] opacity-90" />
          <p className="relative m-0 mb-5.5 font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Contact
          </p>
          <h1 className="relative m-0 mb-5.5 max-w-[17ch] text-[clamp(34px,6vw,80px)] font-extrabold leading-[0.98] tracking-tighter">
            Talk to an engineer, not a chatbot
          </h1>
          <p className="relative m-0 max-w-[52ch] text-lg leading-relaxed text-[#C7C9C4]">
            Tell us what&apos;s paging your team and we&apos;ll show you Northline running on a
            trace that looks like yours.
          </p>
        </div>
      </section>

      {/* Choose how to start */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="sr-only">Choose how to start</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 sm:p-8">
            <p className="m-0 mb-3 font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
              Self-serve
            </p>
            <h3 className="m-0 mb-2.5 text-xl font-bold">Just want to try it?</h3>
            <p className="m-0 mb-5 text-sm leading-relaxed text-[var(--color-muted)]">
              Start a 14-day trial with full feature access — no call required.
            </p>
            <a href="/pricing" className="font-semibold text-[var(--color-accent)] transition-colors hover:text-[#c9ff6b]">
              View plans &amp; start free →
            </a>
          </div>
          <div className="rounded-3xl border border-[var(--color-accent)] p-7 sm:p-8" style={{ background: "#141a0c" }}>
            <p className="m-0 mb-3 font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
              Talk it through
            </p>
            <h3 className="m-0 mb-2.5 text-xl font-bold">Rolling out across a team?</h3>
            <p className="m-0 mb-5 text-sm leading-relaxed">
              Use the form below — a solutions engineer will scope migration and pricing with you.
            </p>
            <span className="font-semibold text-[var(--color-accent)]">Fill out the form below ↓</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-foreground)] px-6 py-14 text-[var(--color-bg)] sm:px-14 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.1em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(60px,16vw,220px)] font-black leading-none tracking-tight text-[#0B0C0E]/[0.05]"
          >
            TEAM
          </span>
          <p className="relative m-0 mb-2 font-mono text-[13px] uppercase tracking-[0.1em] text-[#5b6b1f]">
            Not a support queue
          </p>
          <h2 className="relative m-0 mb-9 max-w-[24ch] text-[clamp(24px,3.2vw,36px)] font-extrabold tracking-tight">
            Who you&apos;ll actually talk to
          </h2>
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name}>
                <span
                  aria-hidden
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg)] font-mono text-sm font-bold text-[var(--color-accent)]"
                >
                  {member.initials}
                </span>
                <p className="m-0 text-base font-bold">{member.name}</p>
                <p className="mt-0.5 mb-2.5 font-mono text-xs uppercase tracking-[0.06em] text-[#5b6b1f]">
                  {member.role}
                </p>
                <p className="m-0 text-sm leading-relaxed text-[#3a3d38]">{member.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Live status */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <LiveStatusBar />
      </section>

      {/* Process */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="m-0 mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          What happens next
        </p>
        <h2 className="sr-only">What happens after you submit</h2>
        <BorderedGrid minWidth={220}>
          {STEPS.map((step) => (
            <BorderedGridCell key={step.n}>
              <span className="font-mono text-[clamp(26px,3vw,34px)] font-bold text-[var(--color-accent)]/85">
                {step.n}
              </span>
              <h3 className="mb-2 mt-3.5 text-lg font-bold">{step.title}</h3>
              <p className="m-0 text-sm leading-relaxed text-[var(--color-muted)]">{step.desc}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Reveal>

      {/* Form + details */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7">
              <h3 className="m-0 mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-[#7D8280]">
                Reach us directly
              </h3>
              <p className="m-0 mb-3 text-[15px]">
                <a href="mailto:sales@northline.dev" className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[#c9ff6b]">
                  sales@northline.dev
                </a>
              </p>
              <p className="m-0 text-[15px]">
                <a href="mailto:support@northline.dev" className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[#c9ff6b]">
                  support@northline.dev
                </a>
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7">
              <h3 className="m-0 mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-[#7D8280]">
                Response times
              </h3>
              <div className="mb-2.5 flex justify-between font-mono text-sm">
                <span className="text-[var(--color-muted)]">Sales inquiries</span>
                <span>&lt; 4 hrs</span>
              </div>
              <div className="flex justify-between font-mono text-sm">
                <span className="text-[var(--color-muted)]">Critical support</span>
                <span>&lt; 15 min</span>
              </div>
            </div>
            <OfficeClocks />
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="m-0 mb-3 text-center font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Before you write in
        </p>
        <h2 className="m-0 mb-9 text-center text-[clamp(26px,3.2vw,38px)] font-extrabold tracking-tight">
          Quick answers
        </h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </Reveal>

      {/* Book time band */}
      <Reveal variant="scale" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          className="flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] border border-[var(--color-accent)]/25 p-8 sm:p-14"
          style={{ background: "linear-gradient(120deg, #141a0c 0%, #101113 60%)" }}
        >
          <div>
            <p className="m-0 mb-3 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Skip the form
            </p>
            <h2 className="m-0 text-[clamp(22px,3vw,32px)] font-extrabold tracking-tight">
              Prefer to just grab time on a calendar?
            </h2>
          </div>
          <a
            href="mailto:sales@northline.dev?subject=Schedule%20a%20walkthrough"
            className="whitespace-nowrap rounded-full bg-[var(--color-accent)] px-7.5 py-4 font-semibold text-[var(--color-accent-foreground)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
          >
            Book 20 minutes →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
