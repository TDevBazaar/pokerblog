import type { Metadata } from "next";

import { CategoryLanding } from "@/components/pages/CategoryLanding";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("estrategia");

export default function EstrategiaPage() {
  return <CategoryLanding slug="estrategia" />;
}
