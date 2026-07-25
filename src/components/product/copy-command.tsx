"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy install command"}
      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {copied ? <Check size={15} weight="bold" /> : <Copy size={15} />}
    </button>
  );
}
