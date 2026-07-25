export function FinalCtaBand({
  heading,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-7 rounded-[2rem] bg-[var(--color-accent)] p-10 sm:p-20">
      <h2 className="m-0 max-w-[15ch] text-[clamp(30px,4.4vw,50px)] font-extrabold tracking-tight text-[var(--color-accent-foreground)]">
        {heading}
      </h2>
      <a
        href={ctaHref}
        className="whitespace-nowrap rounded-full bg-[var(--color-bg)] px-9 py-4.5 font-semibold text-[var(--color-foreground)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
