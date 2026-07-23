import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  Layers,
  Wrench,
} from "lucide-react";

import type { Category } from "@/types/content";
import { cn } from "@/lib/utils";
import { T } from "@/components/T";

const iconMap = {
  book: BookOpen,
  cards: Layers,
  calculator: Calculator,
  strategy: Brain,
  glossary: BookOpen,
  tools: Wrench,
};

type CategoryCardProps = {
  category: Category;
  className?: string;
};

const cardArt: Record<
  Category["icon"],
  { accent: string; borderHover: string; glowGradient: string }
> = {
  book: {
    accent: "text-poker",
    borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.15)]",
    glowGradient: "rgba(136,217,130,0.18)",
  },
  cards: {
    accent: "text-gold",
    borderHover: "hover:border-gold/45 hover:shadow-[0_0_25px_rgba(233,195,73,0.15)]",
    glowGradient: "rgba(233,195,73,0.18)",
  },
  calculator: {
    accent: "text-cyan-400",
    borderHover: "hover:border-cyan-400/45 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]",
    glowGradient: "rgba(34,211,238,0.18)",
  },
  strategy: {
    accent: "text-poker",
    borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.15)]",
    glowGradient: "rgba(136,217,130,0.18)",
  },
  glossary: {
    accent: "text-gold",
    borderHover: "hover:border-gold/45 hover:shadow-[0_0_25px_rgba(233,195,73,0.15)]",
    glowGradient: "rgba(233,195,73,0.18)",
  },
  tools: {
    accent: "text-poker",
    borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.15)]",
    glowGradient: "rgba(136,217,130,0.18)",
  },
};

const categoryImages: Record<string, string> = {
  "aprende-poker": "/images/categories/aprende-poker.png",
  "manos-de-poker": "/images/categories/manos-de-poker.png",
  probabilidades: "/images/categories/probabilidades.png",
  estrategia: "/images/categories/estrategia.png",
  glosario: "/images/categories/glosario.png",
  herramientas: "/images/categories/herramientas.png",
};

// Sub-elements for rich Bento Grid presentation
const aprendeSteps = [
  { step: "1", titleKey: "categoryCard.reglas" as const, descKey: "categoryCard.manos" as const },
  { step: "2", titleKey: "categoryCard.rondas" as const, descKey: "categoryCard.fases" as const },
  { step: "3", titleKey: "categoryCard.acciones" as const, descKey: "categoryCard.betCheckRaise" as const },
  { step: "4", titleKey: "categoryCard.practica" as const, descKey: "categoryCard.decisiones" as const },
];

const estrategiaHighlights = [
  "categoryCard.tightAggressive",
  "categoryCard.juegoPosicional",
  "categoryCard.valueBetting",
  "categoryCard.lecturaApuestas",
] as const;

const herramientasHighlights = [
  "categoryCard.herramientasProker",
  "categoryCard.herramientasOdds",
  "categoryCard.herramientasSimulador",
  "categoryCard.herramientasRangos",
] as const;

const glosarioHighlights = [
  "categoryCard.glosarioAllIn",
  "categoryCard.glosarioBluff",
  "categoryCard.glosarioBadBeat",
  "categoryCard.glosarioTilt",
  "categoryCard.glosarioNuts",
  "categoryCard.glosarioSet",
] as const;

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon];
  const art = cardArt[category.icon];
  const imageSrc = categoryImages[category.slug];

  const isLarge = category.slug === "aprende-poker"; // 2x2 grid cell
  const isWide = category.slug === "estrategia" || category.slug === "herramientas"; // 2x1 grid cell
  const isTall = category.slug === "glosario"; // 1x2 grid cell

  return (
    <Link
      className={cn(
        "group relative flex w-full overflow-hidden rounded-xl border border-white/10 bg-panel/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
        art.borderHover,
        className,
      )}
      href={category.href}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={category.title}
          fill
          className="object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-75"
          sizes={isLarge || isWide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          priority={isLarge}
        />
      )}
      {/* Background gradients for design coherence and legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,23,0.1)_0%,rgba(10,14,23,0.55)_35%,rgba(10,14,23,0.98)_100%)]" />
      <div 
        className="absolute inset-0 opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 16%, ${art.glowGradient}, transparent 32%)`
        }}
      />

      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-night/80 text-poker backdrop-blur transition-colors group-hover:border-poker/30">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {isLarge ? (
        // Layout: LARGE 2x2 (Aprende Poker)
        <div className="relative z-10 flex h-full w-full flex-col p-6 sm:p-7 md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-6">
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className={`mb-3 inline-block text-xs font-bold uppercase tracking-wider ${art.accent}`}>
                <T k="categoryCard.topics" params={{ n: category.topics.length }} />
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {category.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {category.description}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-poker md:mt-auto">
              <T k="categoryCard.startLearning" />
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>

          <div className="hidden md:flex flex-col justify-center gap-3 border-l border-white/5 pl-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted/75 mb-1"><T k="categoryCard.recommendedRoute" /></p>
            <div className="grid grid-cols-2 gap-3">
              {aprendeSteps.map((s) => (
                <div key={s.step} className="rounded-lg border border-white/5 bg-night/60 p-3 backdrop-blur-sm transition duration-300 hover:border-poker/35 hover:bg-night/80">
                  <span className={`text-[10px] font-bold ${art.accent}`}><T k="categoryCard.step" params={{ n: s.step }} /></span>
                  <h4 className="text-xs font-semibold text-white mt-0.5"><T k={s.titleKey} /></h4>
                  <p className="text-[10px] text-muted mt-0.5 leading-normal"><T k={s.descKey} /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : isWide ? (
        // Layout: WIDE 2x1 (Estrategia, Herramientas)
        <div className="relative z-10 flex h-full w-full flex-col p-6 sm:p-7 md:grid md:grid-cols-[1.3fr_0.7fr] md:gap-6">
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className={`mb-2 inline-block text-xs font-bold uppercase tracking-wider ${art.accent}`}>
                <T k="categoryCard.topics" params={{ n: category.topics.length }} />
              </span>
              <h3 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {category.description}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-poker md:mt-auto">
              <T k="categoryCard.cta.guias" />
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>

          <div className="hidden md:flex flex-col justify-center border-l border-white/5 pl-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted/75 mb-3"><T k="categoryCard.tacticas" /></p>
            <div className="flex flex-wrap gap-2">
              {(category.slug === "estrategia" ? estrategiaHighlights : herramientasHighlights).map((h) => (
                <span
                  key={h}
                  className="rounded bg-night/50 border border-white/5 px-2.5 py-1 text-xs font-semibold text-ink/90 transition hover:border-poker/30 hover:bg-night/80"
                >
                  <T k={h} />
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : isTall ? (
        // Layout: TALL 1x2 (Glosario)
        <div className="relative z-10 flex h-full w-full flex-col p-6 justify-between">
          <div>
            <span className={`mb-2.5 inline-block text-xs font-bold uppercase tracking-wider ${art.accent}`}>
              <T k="categoryCard.terms" params={{ n: category.topics.length }} />
            </span>
            <h3 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">
              {category.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {category.description}
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-2 my-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted/75 mb-1"><T k="categoryCard.palabrasClave" /></p>
            <div className="grid grid-cols-2 gap-2">
              {glosarioHighlights.map((term) => (
                <span
                  key={term}
                  className="rounded border border-white/5 bg-night/60 p-2 text-center text-xs font-semibold text-ink/95 transition duration-300 hover:border-gold/30 hover:bg-night/80"
                >
                  <T k={term} />
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-poker mt-auto">
            <T k="categoryCard.explorarDiccionario" />
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      ) : (
        // Layout: NORMAL 1x1 (Manos de Poker, Probabilidades)
        <div className="relative z-10 flex h-full w-full flex-col p-6 justify-between">
          <div>
            <span className={`mb-2.5 inline-block text-xs font-bold uppercase tracking-wider ${art.accent}`}>
              <T k="categoryCard.topics" params={{ n: category.topics.length }} />
            </span>
            <h3 className="font-display text-xl font-bold leading-tight text-white">
              {category.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/80">
              {category.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-poker mt-auto">
            <T k="categoryCard.estudiarGuia" />
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      )}
    </Link>
  );
}
