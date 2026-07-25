"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email.";
    if (!company) nextErrors.company = "Enter your company.";
    if (message.length < 5) nextErrors.message = "Tell us a little about your setup.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmittedEmail(email);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-10 text-center sm:p-14">
        <p className="m-0 mb-3 font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-accent)]">
          Message received
        </p>
        <h2 className="m-0 mb-3 text-2xl font-bold">We&apos;ll be in touch within one business day.</h2>
        <p className="m-0 text-[15px] text-[var(--color-muted)]">
          A Northline engineer — not a bot — will reply directly to {submittedEmail}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 sm:p-11">
      <h2 className="m-0 mb-7 text-2xl font-bold">Send us a message</h2>

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[13px] text-[var(--color-muted)]">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)]"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[13px] text-[var(--color-muted)]">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)]"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block font-mono text-[13px] text-[var(--color-muted)]">
            Company *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className="w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)]"
          />
          {errors.company && (
            <p id="company-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="size" className="mb-2 block font-mono text-[13px] text-[var(--color-muted)]">
            Engineering team size
          </label>
          <select
            id="size"
            name="size"
            defaultValue="1-10"
            className="w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)]"
          >
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="200+">200+</option>
          </select>
        </div>
      </div>

      <div className="mb-6.5">
        <label htmlFor="message" className="mb-2 block font-mono text-[13px] text-[var(--color-muted)]">
          What&apos;s paging your team? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-y rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-full bg-[var(--color-accent)] px-8.5 py-4 font-semibold text-[var(--color-accent-foreground)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  );
}
