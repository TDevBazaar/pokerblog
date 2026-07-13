import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, Percent, Smartphone, TableProperties, Target, Wrench } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { AppPromo } from "@/components/AppPromo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VisitedBadge } from "@/components/VisitedBadge";
import { Container } from "@/components/Container";
import { HandRankingTable } from "@/components/HandRankingTable";
import { SectionHeader } from "@/components/SectionHeader";
import { quickAnswers } from "@/data/categories";
import { posts } from "@/data/posts";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/utils";

type CategoryLandingProps = {
  slug: string;
  showHandRanking?: boolean;
  showQuickAnswers?: boolean;
  showTools?: boolean;
  hideArticles?: boolean;
};

const toolBlocks = [
  {
    title: "Calculadora de odds",
    description: "Recurso para entender porcentajes, outs y equity de forma visual.",
    icon: Calculator,
    href: "/blog/que-es-y-como-usar-una-calculadora-de-odds",
  },
  {
    title: "Simulador de manos",
    description: "Practica escenarios de Texas Hold'em sin dinero real.",
    icon: Target,
    href: "/blog/apps-para-practicar-y-simular-manos-de-poker",
  },
  {
    title: "Tabla de manos",
    description: "Referencia rápida para revisar el ranking de combinaciones.",
    icon: TableProperties,
    href: "/blog/tabla-de-manos-de-poker",
  },
  {
    title: "Tabla de outs",
    description: "Aprende cuántas cartas pueden completar cada proyecto común.",
    icon: Wrench,
    href: "/blog/tabla-de-outs-de-poker",
  },
  {
    title: "App Proker Simulator",
    description: "Analiza decisiones, manos iniciales y situaciones de práctica.",
    icon: Smartphone,
    href: "/blog/poker-advisor-como-mejorar-decisiones",
  },
  {
    title: "Calculadora de pot odds",
    description: "Compara el tamaño del bote con el coste de pagar para saber si la jugada merece la pena.",
    icon: Percent,
    href: "/blog/calculadora-de-pot-odds",
  },
];

export function CategoryLanding({
  slug,
  showHandRanking,
  showQuickAnswers,
  showTools,
  hideArticles,
}: CategoryLandingProps) {
  const category = getCategoryBySlug(slug);
  const categoryPosts = getPostsByCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-white/10 bg-site-radial py-12">
        <Container>
          <Breadcrumbs items={[{ label: category.title }]} />
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold text-poker">Categoría educativa</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              {category.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">{category.description}</p>
          </div>
        </Container>
      </section>

      <Container className="grid gap-14 py-14">
        {showHandRanking && <HandRankingTable />}

        {showQuickAnswers && (
          <section>
            <SectionHeader
              eyebrow="Respuestas rápidas"
              title="Qué gana a qué"
              description="Comparaciones comunes para resolver dudas de ranking y empates."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickAnswers.map((item) => (
                <article key={item.question} className="surface-card p-5">
                  <h2 className="text-base font-semibold text-white">{item.question}</h2>
                  <p className="mt-3 text-sm leading-6 text-poker">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeader
            eyebrow="Temas"
            title={`Guías y conceptos de ${category.title}`}
          />
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3">
            {category.topics.map((topic) => {
              const post = posts.find((p) => p.title === topic);
              if (!post) {
                return (
                  <span
                    key={topic}
                    className="text-sm font-semibold leading-6 text-poker"
                  >
                    #{topic}
                  </span>
                );
              }
              return (
                <span key={topic} className="inline-flex items-center gap-1.5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold leading-6 text-poker transition hover:text-action hover:underline"
                  >
                    #{topic}
                  </Link>
                  <VisitedBadge href={`/blog/${post.slug}`} label={false} />
                </span>
              );
            })}
          </div>
        </section>

        {showTools && (
          <section>
            <SectionHeader
              eyebrow="Recursos"
              title="Herramientas para practicar sin apostar dinero"
              description="Tarjetas interactivas que enlazan a guías explicativas de cada herramienta."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {toolBlocks.map((tool) => {
                const Icon = tool.icon;
                return (
                  
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="surface-card block p-5 transition hover:scale-[1.02] hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded bg-poker/10 text-poker">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-white">{tool.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{tool.description}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-poker">
            Usar
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
  {!hideArticles && (
          <section>
            <SectionHeader
              eyebrow="Artículos"
              title="Guías disponibles"
              description="Contenido inicial cargado desde datos locales y listo para crecer."
            />
            <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryPosts.map((post) => (
                <div key={post.slug} className="relative">
                  <ArticleCard post={post} />
                  <div className="absolute top-3 right-3 z-20">
                    <VisitedBadge href={`/blog/${post.slug}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <AppPromo />
      </Container>
    </main>
  );
}
