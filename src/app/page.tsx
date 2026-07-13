import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calculator, ListChecks, Search, Smartphone, BookOpenCheck, Swords, Wrench, Check } from "lucide-react";

import { AppPromo } from "@/components/AppPromo";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { RoadmapCard } from "@/components/RoadmapCard";
import { SectionHeader } from "@/components/SectionHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { categories } from "@/data/categories";
import { glossaryTerms } from "@/data/glossary";
import { getLatestPosts, getPostsByCategory } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "La Mejor Guía de Póker y Simulador de Manos | Proker Simulator",
  description:
    "Aprende a jugar al póker desde cero. Guías de Texas Hold'em paso a paso, reglas oficiales, ranking de manos, probabilidades y estrategias básicas sin dinero real.",
  path: "/",
});

const roadmap = [
  {
    number: 1,
    title: "Qué es el póker",
    href: "/blog/que-es-el-poker-y-como-se-juega",
    icon: BookOpenCheck,
  },
  {
    number: 2,
    title: "Jugar Texas Hold'em",
    href: "/blog/como-jugar-texas-holdem-paso-a-paso",
    icon: BookOpenCheck,
  },
  {
    number: 3,
    title: "Acciones básicas",
    href: "/blog/acciones-basicas-en-poker",
    icon: BookOpenCheck,
  },
  {
    number: 4,
    title: "Flop, turn y river",
    href: "/blog/que-es-el-flop-turn-y-river",
    icon: BookOpenCheck,
  },
  {
    number: 5,
    title: "Ranking de manos",
    href: "/blog/ranking-de-manos-de-poker-explicado-facil",
    icon: ListChecks,
  },
  {
    number: 6,
    title: "Color o escalera",
    href: "/blog/que-gana-color-o-escalera",
    icon: ListChecks,
  },
  {
    number: 7,
    title: "Outs en póker",
    href: "/blog/que-son-los-outs-en-poker",
    icon: Calculator,
  },
  {
    number: 8,
    title: "Calcular probabilidades",
    href: "/blog/como-calcular-probabilidades-en-poker",
    icon: Calculator,
  },
  {
    number: 9,
    title: "Pot odds",
    href: "/blog/que-son-las-pot-odds",
    icon: Calculator,
  },
  {
    number: 10,
    title: "Estrategia básica",
    href: "/blog/estrategia-basica-de-poker-para-principiantes",
    icon: Swords,
  },
  {
    number: 11,
    title: "Errores comunes",
    href: "/blog/errores-comunes-de-principiantes-en-poker",
    icon: Swords,
  },
  {
    number: 12,
    title: "Proker Simulator",
    href: "/blog/poker-advisor-como-mejorar-decisiones",
    icon: Smartphone,
  },
];

const categoryLayouts: Record<string, string> = {
  "aprende-poker": "md:col-span-2 md:row-span-2",
  "manos-de-poker": "md:col-span-1 md:row-span-1",
  probabilidades: "md:col-span-1 md:row-span-1",
  estrategia: "md:col-span-2 md:row-span-1",
  glosario: "md:col-span-1 md:row-span-2",
  herramientas: "md:col-span-2 md:row-span-1",
};

export default function HomePage() {
  const latestPosts = getLatestPosts(6);
  const oddsPosts = getPostsByCategory("probabilidades").slice(0, 3);
  const highlightedTerms = glossaryTerms.slice(0, 8);

  return (
    <main>
      <HeroSection />

      <Container className="grid gap-16 py-16">
        <section>
          <SectionHeader
            eyebrow="Explora"
            title="Categorías principales"
            description="Una ruta ordenada para aprender desde reglas básicas hasta toma de decisiones."
            align="center"
          />
          <div className="mt-8 grid auto-rows-[16rem] gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                className={categoryLayouts[category.slug]}
              />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden">
          <SectionHeader
            eyebrow="Sigue la ruta"
            title="Roadmap de aprendizaje"
            description="12 temas clave en orden progresivo. Marca tu avance paso a paso."
          />

          {/* Desktop snake layout */}
          <div className="relative mt-10 hidden lg:block">
            {(() => {
              const itemsPerRow = 3;
              const rowCount = Math.ceil(roadmap.length / itemsPerRow);
              const cardW = 210;
              const cardH = 80;
              const cardGap = 28;
              const rowGap = 56;
              const stepX = cardW + cardGap;
              const offset = 119;
              const totalW = stepX * itemsPerRow + offset;

              const rowYs = Array.from({ length: rowCount }, (_, i) => i * (cardH + rowGap) + cardH / 2);
              const rowOffsets = Array.from({ length: rowCount }, (_, i) => (i % 2 === 1 ? offset : 0));

              const getCenterX = (rowIdx: number, colIdx: number) => {
                const idx = rowIdx * itemsPerRow + colIdx;
                if (idx >= roadmap.length) return null;
                const isRtl = rowIdx % 2 === 1;
                const displayCol = isRtl ? itemsPerRow - 1 - colIdx : colIdx;
                return rowOffsets[rowIdx] + displayCol * stepX + cardW / 2;
              };

              const wavePath = (x1: number, x2: number, y: number) =>
                `C ${x1 + 30} ${y - 10}, ${x2 - 30} ${y + 10}, ${x2} ${y}`;

              const diagonalPath = (x1: number, y1: number, x2: number, y2: number) => {
                const midY = (y1 + y2) / 2;
                return `C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
              };
              // Build SVG path
              let pathD = "";
              let firstDone = false;
              for (let r = 0; r < rowCount; r++) {
                for (let c = 0; c < itemsPerRow; c++) {
                  const idx = r * itemsPerRow + c;
                  if (idx >= roadmap.length) break;
                  const cx = getCenterX(r, c)!;
                  const cy = rowYs[r];

                  if (!firstDone) {
                    pathD = `M ${cx} ${cy}`;
                    firstDone = true;
                  } else {
                    const isRtl = r % 2 === 1;
                    const prevC = isRtl && c === 0 ? 1 : c - 1;
                    if (c === 0) {
                      const prevR = r - 1;
                      const prevCIdx = prevR * itemsPerRow + itemsPerRow - 1;
                      if (prevCIdx < roadmap.length) {
                        const px = getCenterX(prevR, itemsPerRow - 1)!;
                        const py = rowYs[prevR];
                        pathD += ` ${diagonalPath(px, py, cx, cy)}`;
                      }
                    } else {
                      const px = getCenterX(r, prevC)!;
                      const py = cy;
                      pathD += ` ${wavePath(px, cx, py)}`;
                    }
                  }
                }
              }

              return (
                <div className="relative mx-auto" style={{ width: totalW }}>
                  {/* Background SVG - continuous snake path */}
                  <svg
                    className="absolute inset-0 z-0 pointer-events-none"
                    width={totalW}
                    height={rowYs[rowYs.length - 1] + cardH / 2 + 4}
                    viewBox={`0 0 ${totalW} ${rowYs[rowYs.length - 1] + cardH / 2 + 4}`}
                    fill="none"
                  >
                    <path d={pathD} stroke="rgba(136,217,130,0.15)" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>

                  {/* Cards on top */}
                  {Array.from({ length: rowCount }).map((_, rowIdx) => {
                    const isRtl = rowIdx % 2 === 1;
                    const items: (typeof roadmap[number])[] = [];
                    for (let c = 0; c < itemsPerRow; c++) {
                      const flatIdx = rowIdx * itemsPerRow + (isRtl ? itemsPerRow - 1 - c : c);
                      if (flatIdx < roadmap.length) items.push(roadmap[flatIdx]);
                    }

                    return (
                      <div key={rowIdx} className="flex" style={{ paddingTop: rowIdx === 0 ? 0 : rowGap, marginLeft: rowOffsets[rowIdx] }}>
                        {items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.href} className="relative flex items-center z-10" style={{ marginRight: itemIdx < items.length - 1 ? cardGap : 0 }}>
                              <RoadmapCard
                                key={item.href}
                                href={item.href}
                                className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-panel/40 px-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-poker/45 hover:shadow-[0_0_20px_rgba(136,217,130,0.1)]"
                                style={{ width: cardW, height: cardH }}
                              >
                                <div className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-night/80 transition-all duration-300 group-hover:border-poker/30">
                                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 group-data-[visited=true]:scale-0 group-data-[visited=true]:opacity-0">
                                    <Icon className="h-[18px] w-[18px] text-poker" />
                                  </span>
                                  <span className="absolute inset-0 flex items-center justify-center scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-data-[visited=true]:scale-100 group-data-[visited=true]:opacity-100">
                                    <Check className="h-5 w-5 text-poker" />
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] font-bold tracking-wider text-gold/70">
                                    PASO {String(item.number).padStart(2, "0")}
                                  </span>
                                  <h3 className="mt-0.5 text-sm font-bold text-white leading-tight transition-colors group-hover:text-poker">
                                    {item.title}
                                  </h3>
                                </div>
                              </RoadmapCard>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Mobile zigzag timeline */}
          <div className="relative mt-10 lg:hidden">
            {(() => {
              const totalItems = roadmap.length;
              const itemTotal = 72;
              const svgH = totalItems * itemTotal;

              let waveD = "";
              const amp = 7;
              const freq = Math.PI / (itemTotal * 0.7);
              for (let y = 0; y <= svgH; y += 4) {
                const x = 50 + Math.sin(y * freq) * amp;
                waveD += y === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
              }

              return (
                <div className="relative" style={{ minHeight: svgH }}>
                  <svg
                    className="absolute left-1/2 top-0 -translate-x-1/2 z-0 pointer-events-none"
                    width={100}
                    height={svgH}
                    viewBox={`0 0 100 ${svgH}`}
                    fill="none"
                  >
                    <path d={waveD} stroke="rgba(136,217,130,0.14)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>

                  <div className="relative z-10">
                    {roadmap.map((step, index) => {
                      const Icon = step.icon;
                      const isLeft = index % 2 === 0;
                      return (
                        <RoadmapCard
                          key={step.href}
                          href={step.href}
                          className="group relative flex items-center pb-6 last:pb-0"
                        >
                          <div className={`flex-1 ${isLeft ? 'pr-2.5 order-1' : 'pl-2.5 order-3'}`}>
                            <div className="rounded-xl border border-white/10 bg-panel/40 px-3.5 py-3 transition-all duration-300 group-hover:border-poker/45 group-hover:shadow-[0_0_16px_rgba(136,217,130,0.08)]">
                              <div className="flex items-center gap-2">
                                <span className="transition-all duration-300 group-data-[visited=true]:scale-0 group-data-[visited=true]:opacity-0">
                                  <Icon className="h-4 w-4 text-poker shrink-0" />
                                </span>
                                <span className="text-[9px] font-bold tracking-wider text-gold/60">
                                  PASO {String(step.number).padStart(2, "0")}
                                </span>
                              </div>
                              <h3 className="mt-0.5 text-xs font-bold text-white leading-tight transition-colors group-hover:text-poker">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <div className="relative z-10 shrink-0 flex items-center justify-center rounded-full border border-white/10 bg-night/80 transition-all duration-300 group-hover:border-poker/40 order-2"
                            style={{ width: 30, height: 30 }}>
                            <span className="text-[10px] font-bold text-white/30 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 group-data-[visited=true]:scale-0 group-data-[visited=true]:opacity-0">
                              {step.number}
                            </span>
                            <Check className="absolute h-3.5 w-3.5 scale-0 opacity-0 text-poker transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-data-[visited=true]:scale-100 group-data-[visited=true]:opacity-100" />
                          </div>

                          <div className={`flex-1 ${isLeft ? 'order-3' : 'order-1'}`} />
                        </RoadmapCard>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <SectionHeader
              eyebrow="Probabilidades"
              title="Matemática práctica"
              description="Aprende outs, pot odds y cálculos rápidos sin convertir el estudio en una clase pesada."
            />
            {/* Interactive Outs/Odds HUD display */}
            <div className="mt-6 rounded-xl border border-white/10 bg-panel/35 p-5 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Ejemplo de Outs en Flop</span>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400">Proyecto de Color</span>
              </div>
              
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Tus Cartas</p>
                  <div className="mt-1.5 flex gap-2">
                    <span className="flex h-12 w-9 flex-col justify-between rounded border border-white/30 bg-white p-1 text-neutral-900 shadow">
                      <span className="text-xs font-bold leading-none">A</span>
                      <span className="text-right text-sm leading-none">♣</span>
                    </span>
                    <span className="flex h-12 w-9 flex-col justify-between rounded border border-white/30 bg-white p-1 text-neutral-900 shadow">
                      <span className="text-xs font-bold leading-none">K</span>
                      <span className="text-right text-sm leading-none">♣</span>
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Mesa Común</p>
                  <div className="mt-1.5 flex gap-1.5">
                    <span className="flex h-12 w-9 flex-col justify-between rounded border border-white/30 bg-white p-1 text-neutral-900 shadow">
                      <span className="text-xs font-bold leading-none">J</span>
                      <span className="text-right text-sm leading-none">♣</span>
                    </span>
                    <span className="flex h-12 w-9 flex-col justify-between rounded border border-white/30 bg-white p-1 text-neutral-900 shadow">
                      <span className="text-xs font-bold leading-none">8</span>
                      <span className="text-right text-sm leading-none">♣</span>
                    </span>
                    <span className="flex h-12 w-9 flex-col justify-between rounded border border-white/30 bg-white p-1 text-red-600 shadow">
                      <span className="text-xs font-bold leading-none">2</span>
                      <span className="text-right text-sm leading-none">♥</span>
                    </span>
                    <span className="flex h-12 w-9 items-center justify-center rounded border border-dashed border-white/10 bg-white/5 text-[9px] text-muted">
                      Turn
                    </span>
                    <span className="flex h-12 w-9 items-center justify-center rounded border border-dashed border-white/10 bg-white/5 text-[9px] text-muted">
                      River
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                <div className="rounded-lg bg-night/50 p-2.5 text-center border border-white/5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted">Outs (Tréboles)</p>
                  <p className="mt-0.5 text-lg font-bold text-white">9</p>
                </div>
                <div className="rounded-lg bg-night/50 p-2.5 text-center border border-white/5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted">Equity (Flop a River)</p>
                  <p className="mt-0.5 text-lg font-bold text-cyan-400">35.0%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4">
            {oddsPosts.map((post) => (
              <Link
                key={post.slug}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-panel/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-poker/45 hover:shadow-[0_0_20px_rgba(136,217,130,0.1)]"
                href={`/blog/${post.slug}`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-poker/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-poker">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-semibold text-poker/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Leer artículo →
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-poker transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/80 line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Glosario destacado"
            title="Términos que verás todo el tiempo"
            description="Un punto de referencia rápido para entender artículos y análisis de manos."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlightedTerms.map((term) => (
              <Link
                key={term.term}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-panel/30 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_0_20px_rgba(233,195,73,0.1)]"
                href="/glosario"
              >
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `radial-gradient(circle at 10% 10%, rgba(233,195,73,0.06), transparent 35%)`
                  }}
                />
                <div className="relative z-10 flex items-center justify-between text-sm font-bold text-white">
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gold group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                    {term.term}
                  </span>
                  <span className="text-[10px] font-semibold text-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Ver →
                  </span>
                </div>
                <p className="relative z-10 mt-3 text-[11px] leading-relaxed text-ink/80 line-clamp-3">
                  {term.definition}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <AppPromo />

        <section>
          <SectionHeader
            eyebrow="Últimos artículos"
            title="Nuevas guías educativas"
            description="Contenido publicado recientemente en el blog."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
