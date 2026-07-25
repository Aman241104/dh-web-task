"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-raised)]/80 px-5 backdrop-blur-xl transition-[padding] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          scrolled ? "py-2" : "py-3",
        )}
      >
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-[var(--color-accent)]" />
          Northline
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Get started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-9 w-9 items-center justify-center md:hidden"
        >
          <motion.span
            className="absolute h-[2px] w-5 bg-[var(--color-foreground)]"
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -5 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
          <motion.span
            className="absolute h-[2px] w-5 bg-[var(--color-foreground)]"
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 5 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--color-bg)]/95 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-semibold"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
