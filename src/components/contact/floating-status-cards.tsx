"use client";

import { motion } from "motion/react";

const CARDS = [
  { label: "Jordan M.", detail: "Online", top: "4%", left: "6%", delay: 0 },
  { label: "Austin ↔ Lisbon", detail: "Connected", top: "46%", left: "0%", delay: 0.6 },
  { label: "Support", detail: "24/7", top: "86%", left: "16%", delay: 1.2 },
];

export function FloatingStatusCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 sm:block">
      {CARDS.map((card) => (
        <motion.div
          key={card.label}
          className="absolute whitespace-nowrap rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 font-mono text-[11px] backdrop-blur-sm"
          style={{ top: card.top, left: card.left }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
        >
          <span className="font-semibold text-[var(--color-foreground)]">{card.label}</span>
          <span className="ml-2 text-[var(--color-accent)]">{card.detail}</span>
        </motion.div>
      ))}
    </div>
  );
}
