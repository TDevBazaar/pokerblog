"use client";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PokerSimulator } from "@/components/poker/PokerSimulator";
import { useLanguage } from "@/i18n";

export function SimuladorContent() {
  const { t } = useLanguage();
  return (
    <>
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: t("simulatorPage.breadcrumbTools"), href: "/herramientas" },
              { label: t("simulatorPage.breadcrumbSim") },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold text-poker">{t("simulatorPage.eyebrow")}</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              {t("simulatorPage.title")}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {t("simulatorPage.description")}
            </p>
          </div>
        </Container>
      </section>
      <Container className="py-14">
        <PokerSimulator />
      </Container>
    </>
  );
}
