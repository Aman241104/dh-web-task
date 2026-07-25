"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BarChartCanvas } from "@/components/three/bar-chart-canvas";
import { ChartHud } from "@/components/home/chart-hud";

const BAR_SERVICES = [
  "auth-svc", "checkout-svc", "inventory-svc", "payments-svc", "search-svc",
  "fraud-svc", "notify-svc", "ledger-svc", "gateway-svc", "cache-svc",
  "queue-svc", "billing-svc", "session-svc", "webhook-svc",
];

export function ChartPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ index: number; x: number; y: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y: drift }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.06]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #14161a 0%, #0E0F11 100%), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 100%27%3E%3Ctext x=%270%27 y=%2782%27 font-family=%27Arial, sans-serif%27 font-weight=%27900%27 font-size=%2792%27 letter-spacing=%27-2%27 fill=%27white%27 fill-opacity=%270.02%27%3ESIGNALS%3C/text%3E%3C/svg%3E")',
          backgroundBlendMode: "normal",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center, left 24px bottom 12px",
          backgroundSize: "cover, 55%",
        }}
      />
      <ChartHud />
      <BarChartCanvas
        className="relative block h-[clamp(320px,38vw,460px)] w-full"
        label="3D bar chart showing correlated signal volume rising steadily over the last 14 days"
        onHoverChange={({ index, x, y }) => {
          if (index === null) {
            setTooltip(null);
          } else {
            setTooltip({ index, x, y });
          }
        }}
      />
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-white/10 bg-black/80 px-3 py-2 font-mono text-[11px] backdrop-blur-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="m-0 font-semibold text-[var(--color-foreground)]">
            {BAR_SERVICES[tooltip.index % BAR_SERVICES.length]}
          </p>
          <p className="m-0 text-[#7D8280]">
            {40 + ((tooltip.index * 37) % 260)}ms · healthy
          </p>
        </div>
      )}
    </motion.div>
  );
}
