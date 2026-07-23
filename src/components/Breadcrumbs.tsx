"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbItem } from "@/types/content";
import { useLanguage } from "@/i18n";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();
  return (
    <nav className="text-sm text-muted" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-poker" href="/">
            {t("breadcrumbs.home")}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            {item.href ? (
              <Link className="hover:text-poker" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
