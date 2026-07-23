import type { Metadata } from "next";

import { GlosarioContent } from "@/components/pages/GlosarioContent";
import { buildCategoryMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildCategoryMetadata("glosario");

export default function GlosarioPage() {
  return (
    <main>
      <GlosarioContent />
    </main>
  );
}
