"use client";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GlossaryGrid } from "@/components/GlossaryGrid";
import { useLanguage } from "@/i18n";
import { glossaryTerms } from "@/data/glossary";
import { getCategoryBySlug } from "@/lib/utils";

export function GlosarioContent() {
  const { t } = useLanguage();
  const category = getCategoryBySlug("glosario");
  return (
    <>
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container>
          <Breadcrumbs items={[{ label: t("glosarioPage.breadcrumb") }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold text-poker">{t("glosarioPage.eyebrow")}</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              {t("glosarioPage.title")}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {category?.description}
            </p>
          </div>
        </Container>
      </section>
      <Container className="py-14">
        <GlossaryGrid terms={glossaryTerms} />
      </Container>
    </>
  );
}
