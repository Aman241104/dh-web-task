import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  icon?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = true,
  className,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 rounded-full py-1.5 pl-6 font-semibold transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
        icon ? "pr-1.5" : "pr-6 py-3",
        isPrimary
          ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:-translate-y-0.5"
          : "border border-[var(--color-border-strong)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]",
        className,
      )}
    >
      {children}
      {icon && (
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            isPrimary ? "bg-black/15" : "bg-white/10",
          )}
        >
          <ArrowUpRight size={16} weight="bold" />
        </span>
      )}
    </Link>
  );
}
