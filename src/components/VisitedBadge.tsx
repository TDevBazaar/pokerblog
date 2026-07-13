"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const STORAGE_KEY = "poker_roadmap_visited";

export function VisitedBadge({ href, label = true }: { href: string; label?: boolean }) {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      setVisited(stored.includes(href));
    } catch {}
  }, [href]);

  if (!visited) return null;

  return (
    <span className="inline-flex items-center gap-1 text-poker">
      <Check className="h-3 w-3" aria-hidden="true" />
      {label && <span className="text-[10px] font-bold uppercase tracking-wider">Visto</span>}
    </span>
  );
}
