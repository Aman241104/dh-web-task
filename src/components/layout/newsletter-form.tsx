"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("Subscribe");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLabel("Subscribed ✓");
    setEmail("");
    setTimeout(() => setLabel("Subscribe"), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-[var(--color-accent)] px-4 text-sm font-semibold text-[var(--color-accent-foreground)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        {label}
      </button>
    </form>
  );
}
