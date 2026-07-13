import type { Metadata } from "next";

import { CategoryLanding } from "@/components/pages/CategoryLanding";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("manos-de-poker");

export default function ManosDePokerPage() {
  return <CategoryLanding slug="manos-de-poker" showHandRanking />;
}
