import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/product", label: "Tracing" },
      { href: "/product", label: "Alerting" },
      { href: "/product", label: "On-call" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/", label: "About" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/product", label: "Status page" },
      { href: "/product", label: "Documentation" },
      { href: "/contact", label: "Support" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="relative z-10 mx-auto grid max-w-5xl gap-11 px-4 pb-8 pt-16 sm:grid-cols-[1.4fr_1fr_1fr_1fr] sm:px-6">
        <div className="max-w-xs">
          <p className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[var(--color-accent)]" />
            Northline
          </p>
          <p className="mt-3.5 text-sm text-[var(--color-muted)]">
            API observability and on-call, built for teams who&apos;d rather ship than watch
            dashboards.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={`${col.heading}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-2 border-t border-[var(--color-border)] px-4 py-5 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} Northline, Inc. All rights reserved.</p>
        <p>
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-accent)]"
          >
            Digital Heroes Training Task
          </a>
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none h-[clamp(48px,11.2vw,176px)] w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 160"><text x="500" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="150" letter-spacing="-4" fill="white" fill-opacity="0.025">NORTHLINE</text></svg>',
          )}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
    </footer>
  );
}
