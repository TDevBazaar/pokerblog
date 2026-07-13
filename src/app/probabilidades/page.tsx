import type { Metadata } from "next";

import { CategoryLanding } from "@/components/pages/CategoryLanding";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("probabilidades");

export default function ProbabilidadesPage() {
  return <CategoryLanding slug="probabilidades" />;
}
