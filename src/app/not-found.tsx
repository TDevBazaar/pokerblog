"use client";

import Link from "next/link";

import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="border-b border-white/10 bg-site-radial py-20">
      <Container>
        <p className="text-sm font-semibold text-poker">{t("notFound.code")}</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          {t("notFound.description")}
        </p>
        <Link
          className="focus-ring mt-8 inline-flex rounded bg-action px-5 py-3 text-sm font-semibold text-night"
          href="/"
        >
          {t("notFound.cta")}
        </Link>
      </Container>
    </main>
  );
}
