export type EditorialRow = { term: string; detail: string };

export function EditorialRowList({ rows }: { rows: EditorialRow[] }) {
  return (
    <dl className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {rows.map((row) => (
        <div key={row.term} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
          <dt className="w-full shrink-0 font-mono text-sm text-[var(--color-accent)] sm:w-48">
            {row.term}
          </dt>
          <dd className="text-sm text-[var(--color-muted)] sm:text-base">{row.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
