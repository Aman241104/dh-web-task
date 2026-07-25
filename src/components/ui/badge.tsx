import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
