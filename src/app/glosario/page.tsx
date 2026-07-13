import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { GlossaryGrid } from "@/components/GlossaryGrid";
import { glossaryTerms } from "@/data/glossary";
import { buildCategoryMetadata } from "@/lib/metadata";
import { getCategoryBySlug } from "@/lib/utils";

export const metadata: Metadata = buildCategoryMetadata("glosario");

export default function GlosarioPage() {
  const category = getCategoryBySlug("glosario");

  return (
    <main>
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container>
          <Breadcrumbs items={[{ label: "Glosario" }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold text-poker">Diccionario educativo</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Glosario de póker
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
    </main>
  );
}
