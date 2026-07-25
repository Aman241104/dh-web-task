import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[2rem] bg-white/[0.03] p-1.5 ring-1 ring-white/5", className)}>
      <div className="rounded-[calc(2rem-0.375rem)] bg-[var(--color-bg-panel)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
