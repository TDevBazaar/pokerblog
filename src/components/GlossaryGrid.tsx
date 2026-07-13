"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { GlossaryTerm } from "@/types/content";
import { cn } from "@/lib/utils";

type GlossaryGridProps = {
  terms: GlossaryTerm[];
};

const letters = ["Todos", "A", "B", "C", "D", "F", "G", "H", "K", "L", "N", "O", "P", "R", "S", "T", "U", "V"];

export function GlossaryGrid({ terms }: GlossaryGridProps) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("Todos");

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return terms.filter((term) => {
      const matchesLetter = letter === "Todos" || term.term.toUpperCase().startsWith(letter);
      const matchesQuery =
        !normalizedQuery ||
        term.term.toLowerCase().includes(normalizedQuery) ||
        term.definition.toLowerCase().includes(normalizedQuery);

      return matchesLetter && matchesQuery;
    });
  }, [letter, query, terms]);

  return (
    <div className="grid gap-8">
      <div className="surface-card p-5">
        <label className="text-sm font-semibold text-white" htmlFor="glossary-search">
          Buscar término
        </label>
        <div className="mt-3 flex items-center gap-3 rounded border border-white/10 bg-night px-4">
          <Search className="h-4 w-4 text-muted" aria-hidden="true" />
          <input
            id="glossary-search"
            className="min-h-12 flex-1 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
            placeholder="Ejemplo: kicker, fold, pot odds..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtro alfabético">
          {letters.map((item) => (
            <button
              key={item}
              className={cn(
                "focus-ring rounded border px-3 py-2 text-xs font-semibold transition",
                letter === item
                  ? "border-poker bg-poker/20 text-poker"
                  : "border-white/10 text-muted hover:border-white/25 hover:text-white",
              )}
              type="button"
              onClick={() => setLetter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.map((term) => (
          <article key={term.term} className="surface-card p-5">
            <span className="rounded bg-poker/10 px-2.5 py-1 text-xs font-semibold text-poker">
              {term.group}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-white">{term.term}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{term.definition}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
