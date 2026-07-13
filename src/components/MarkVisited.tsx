"use client";

import { useEffect } from "react";

const STORAGE_KEY = "poker_roadmap_visited";

export function MarkVisited({ href }: { href: string }) {
  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      if (!stored.includes(href)) {
        stored.push(href);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      }
    } catch {}
  }, [href]);

  return null;
}
