"use client";

import { motion } from "motion/react";

const ALERTS = [
  { label: "API Timeout", x: -90, y: -55 },
  { label: "DB Slow", x: 90, y: -60 },
  { label: "Redis Fail", x: -100, y: 10 },
  { label: "CPU Spike", x: 95, y: 15 },
  { label: "Auth Error", x: -60, y: 65 },
  { label: "Queue Full", x: 70, y: 60 },
];

const CYCLE = 5;

export function AlertMergeDemo() {
  return (
    <div className="relative flex min-h-[240px] w-full items-center justify-center overflow-hidden">
      {ALERTS.map((alert, i) => (
        <motion.span
          key={alert.label}
          className="absolute whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-bg)] px-3 py-1.5 font-mono text-[11px] text-[#C7C9C4]"
          initial={{ x: alert.x, y: alert.y, opacity: 0 }}
          animate={{
            x: [alert.x, alert.x, 0],
            y: [alert.y, alert.y, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.15, 0.75, 0.85],
            delay: i * 0.08,
            ease: "easeInOut",
          }}
        >
          {alert.label}
        </motion.span>
      ))}
      <motion.div
        className="absolute rounded-full border border-[var(--color-accent)] bg-[#141a0c] px-4 py-2 font-mono text-xs font-semibold text-[var(--color-accent)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: [0, 0.78, 0.86, 0.95, 1], ease: "easeOut" }}
      >
        1 Incident
      </motion.div>
    </div>
  );
}
