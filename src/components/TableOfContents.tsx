"use client";

import type { TableOfContentsItem } from "@/types/content";
import { useLanguage } from "@/i18n";

type TableOfContentsProps = {
  items?: TableOfContentsItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const { t } = useLanguage();
  if (!items?.length) {
    return null;
  }

  return (
    <aside className="surface-card p-5">
      <h2 className="text-sm font-semibold text-white">{t("toc.title")}</h2>
      <ol className="mt-4 grid gap-3 text-sm text-muted">
        {items.map((item) => (
          <li key={item.id}>
            <a className="hover:text-poker" href={`#${item.id}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
