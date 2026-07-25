"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useBilling } from "@/components/pricing/billing-context";

export function BillingToggle() {
  const { annual, setAnnual } = useBilling();

  return (
    <div className="flex justify-center">
      <div
        role="group"
        aria-label="Billing period"
        className="relative inline-flex gap-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-panel)] p-1"
      >
        {(["monthly", "annual"] as const).map((period) => {
          const isActive = (period === "annual") === annual;
          return (
            <button
              key={period}
              type="button"
              onClick={() => setAnnual(period === "annual")}
              aria-pressed={isActive}
              className={cn(
                "relative z-10 rounded-full px-5.5 py-2.5 font-semibold text-sm transition-colors",
                isActive ? "text-[var(--color-bg)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--color-foreground)]"
                  transition={{ type: "spring", stiffness: 500, damping: 34 }}
                />
              )}
              {period === "monthly" ? "Monthly" : "Annual — save 20%"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
