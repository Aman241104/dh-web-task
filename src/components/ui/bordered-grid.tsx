import { cn } from "@/lib/cn";

export function BorderedGrid({
  children,
  minWidth = 220,
  className,
}: {
  children: React.ReactNode;
  minWidth?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-border)]",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))` }}
    >
      {children}
    </div>
  );
}

export function BorderedGridCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-[var(--color-bg-raised)] p-6 transition-colors hover:bg-[var(--color-bg-panel)] sm:p-8", className)}>
      {children}
    </div>
  );
}
