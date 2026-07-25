"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const VARIANTS = {
  up: { opacity: 0, y: 32, filter: "blur(6px)" },
  scale: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  left: { opacity: 0, x: -28, filter: "blur(4px)" },
  right: { opacity: 0, x: 28, filter: "blur(4px)" },
} as const;

const SETTLED = { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" };

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: keyof typeof VARIANTS;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={VARIANTS[variant]}
      whileInView={SETTLED}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
