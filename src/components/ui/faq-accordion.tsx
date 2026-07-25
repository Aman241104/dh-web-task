"use client";

import { Accordion } from "radix-ui";
import { CaretDown } from "@phosphor-icons/react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={`item-${i}`}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold">
              {item.question}
              <CaretDown
                size={18}
                className="shrink-0 text-[var(--color-muted)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm text-[var(--color-muted)] data-[state=open]:pb-5 data-[state=open]:animate-[accordion-down_250ms_ease-out] data-[state=closed]:animate-[accordion-up_250ms_ease-out]">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
