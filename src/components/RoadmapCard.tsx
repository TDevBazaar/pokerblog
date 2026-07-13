"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode, type CSSProperties } from "react";

const STORAGE_KEY = "poker_roadmap_visited";

export function RoadmapCard({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setVisited(stored.includes(href));
    } catch {}
  }, [href]);

  return (
    <Link href={href} className={className} style={style} data-visited={visited}>
      {children}
    </Link>
  );
}
