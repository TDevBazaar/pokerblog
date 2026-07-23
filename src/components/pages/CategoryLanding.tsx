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
import { posts } from "@/data/posts";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/utils";
import { T } from "@/components/T";

type CategoryLandingProps = {
  slug: string;
  showHandRanking?: boolean;
  showTools?: boolean;
  hideArticles?: boolean;
};

const toolBlocks = [
  {
    titleKey: "tools.calcOdds",
    descKey: "tools.calcOddsDesc",
    icon: Calculator,
    href: "/blog/que-es-y-como-usar-una-calculadora-de-odds",
  },
  {
    titleKey: "tools.simManos",
    descKey: "tools.simManosDesc",
    icon: Target,
    href: "/blog/apps-para-practicar-y-simular-manos-de-poker",
  },
  {
    titleKey: "tools.tablaManos",
    descKey: "tools.tablaManosDesc",
    icon: TableProperties,
    href: "/blog/tabla-de-manos-de-poker",
  },
  {
    titleKey: "tools.tablaOuts",
    descKey: "tools.tablaOutsDesc",
    icon: Wrench,
    href: "/blog/tabla-de-outs-de-poker",
  },
  {
    titleKey: "tools.appProker",
    descKey: "tools.appProkerDesc",
    icon: Smartphone,
    href: "/blog/poker-advisor-como-mejorar-decisiones",
  },
  {
    titleKey: "tools.calcPotOdds",
    descKey: "tools.calcPotOddsDesc",
    icon: Percent,
    href: "/blog/calculadora-de-pot-odds",
  },
];

export function CategoryLanding({
  slug,
  showHandRanking,
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
            <p className="text-sm font-semibold text-poker"><T k="categoryLanding.eyebrow" /></p>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              {category.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">{category.description}</p>
          </div>
        </Container>
      </section>

      <Container className="grid gap-14 py-14">
        {showHandRanking && <HandRankingTable />}

        <section>
          <SectionHeader
            eyebrow={<T k="categoryLanding.topics.eyebrow" />}
            title={<T k="categoryLanding.topics.title" params={{ title: category.title }} />}
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
              eyebrow={<T k="categoryLanding.tools.eyebrow" />}
              title={<T k="categoryLanding.tools.title" />}
              description={<T k="categoryLanding.tools.description" />}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {toolBlocks.map((tool) => {
                const Icon = tool.icon;
                return (
                  
                  <Link
                    key={tool.titleKey}
                    href={tool.href}
                    className="surface-card block p-5 transition hover:scale-[1.02] hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded bg-poker/10 text-poker">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-white"><T k={tool.titleKey} /></h2>
                    <p className="mt-3 text-sm leading-6 text-muted"><T k={tool.descKey} /></p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-poker">
            <T k="common.use" />
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
              eyebrow={<T k="categoryLanding.articles.eyebrow" />}
              title={<T k="categoryLanding.articles.title" />}
              description={<T k="categoryLanding.articles.description" />}
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
