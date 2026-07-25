import Link from "next/link";

export type Feature = { index: string; title: string; description: string; href?: string };

export function NumberedFeatureList({ features }: { features: Feature[] }) {
  return (
    <ol className="list-none border-t border-[var(--color-border)] p-0 m-0">
      {features.map((feature) => {
        const content = (
          <div className="grid grid-cols-[clamp(48px,8vw,80px)_1fr_auto] items-center gap-6 py-8 pl-0 transition-[padding] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:pl-5 sm:gap-7">
            <span className="font-mono text-3xl font-bold leading-none text-[var(--color-accent)]/85 sm:text-4xl">
              {feature.index}
            </span>
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">{feature.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {feature.description}
              </p>
            </div>
            {feature.href && (
              <span
                aria-hidden
                className="justify-self-end text-2xl text-[var(--color-accent)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
              >
                →
              </span>
            )}
          </div>
        );

        return (
          <li key={feature.index} className="border-b border-[var(--color-border)]">
            {feature.href ? (
              <Link href={feature.href} className="group block">
                {content}
              </Link>
            ) : (
              <div className="group">{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
