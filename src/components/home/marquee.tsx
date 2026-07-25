const LOGOS = [
  "VELOCIRAPTOR SYSTEMS",
  "LEDGERFRAME",
  "ORBITAL PAY",
  "HAZEL LOGISTICS",
  "COREBASE",
  "PARALLAX ENERGY",
];

export function Marquee() {
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex gap-16 whitespace-nowrap pr-16 font-mono text-lg text-[var(--color-muted)]"
          >
            {LOGOS.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
