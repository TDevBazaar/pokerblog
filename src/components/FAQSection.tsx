"use client";

import type { FAQItem } from "@/types/content";
import { useLanguage } from "@/i18n";

type FAQSectionProps = {
  items?: FAQItem[];
  title?: string;
};

export function FAQSection({ items, title }: FAQSectionProps) {
  const { t } = useLanguage();
  const heading = title ?? t("faq.title");
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-white">{heading}</h2>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="surface-card group p-5 open:border-poker/40"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-white">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
