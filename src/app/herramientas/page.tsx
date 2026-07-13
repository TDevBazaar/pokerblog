import type { Metadata } from "next";

import { CategoryLanding } from "@/components/pages/CategoryLanding";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("herramientas");

export default function HerramientasPage() {
  return <CategoryLanding slug="herramientas" showTools hideArticles />;
}
