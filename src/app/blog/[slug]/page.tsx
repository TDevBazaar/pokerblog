import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Gamepad2 } from "lucide-react";

import { AdBanner } from "@/components/AdBanner";
import { AppPromo } from "@/components/AppPromo";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkVisited } from "@/components/MarkVisited";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { TableOfContents } from "@/components/TableOfContents";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  formatDate,
  getCategoryBySlug,
  getNextLearningStep,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: {
      absolute: post.metaTitle,
    },
    description: post.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category,
      tags: post.tags,
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryBySlug(post.categorySlug);
  const relatedPosts = getRelatedPosts(post.slug, post.categorySlug);
  const nextLearningStep = getNextLearningStep(post.slug);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: articleUrl,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Organization",
      name: siteConfig.shortName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
    },
  };
  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
      <main>
      <MarkVisited href={`/blog/${post.slug}`} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <article>
        <section className="border-b border-white/10 bg-site-radial py-12">
          <Container>
            <Breadcrumbs
              items={[
                { label: post.category, href: category?.href },
                { label: post.title },
              ]}
            />
            <div className="mt-8 max-w-4xl">
              <Link
                className="inline-flex rounded bg-poker/10 px-3 py-1 text-sm font-semibold text-poker"
                href={category?.href ?? "/"}
              >
                {post.category}
              </Link>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Publicado: {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Actualizado: {formatDate(post.updatedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readingTime} min de lectura
                </span>
              </div>

              {post.categorySlug === "herramientas" ? (
                <Link
                  href="/herramientas/simulador"
                  className="group mt-8 flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-poker/30 bg-gradient-to-br from-poker/10 via-panel to-poker/5 transition hover:border-poker/60 hover:shadow-[0_0_30px_rgba(136,217,130,0.15)]"
                  style={{ aspectRatio: "16/9", maxHeight: "400px" }}
                >
                  <Gamepad2 className="h-12 w-12 text-poker transition group-hover:scale-110 md:h-16 md:w-16" />
                  <p className="text-center font-display text-lg font-bold text-white md:text-2xl">
                    Simulador de Poker Interactivo
                  </p>
                  <p className="max-w-sm text-center text-xs text-muted md:text-sm">
                    Pon a prueba tus decisiones con nuestro simulador de manos
                  </p>
                  <span className="mt-1 rounded-full bg-poker px-4 py-1.5 text-xs font-bold text-white transition group-hover:bg-poker/80">
                    Probar simulador
                  </span>
                </Link>
              ) : post.heroImage && (
                <div className="mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                    className="w-full rounded-lg object-cover"
                    style={{ aspectRatio: "16/9", maxHeight: "400px" }}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </Container>
        </section>

        <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0">
            <ContentRenderer content={post.content} />

            <section className="mt-12 rounded-lg border border-gold/30 bg-gradient-to-br from-gold/10 via-panel to-poker/10 p-6">
              {nextLearningStep ? (
                <>
                  <p className="text-sm font-semibold text-gold">
                    {nextLearningStep.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white">
                    {nextLearningStep.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {nextLearningStep.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-muted">
                    <span className="rounded bg-poker/10 px-3 py-1 text-poker">
                      {nextLearningStep.badge}
                    </span>
                    <span className="rounded bg-white/10 px-3 py-1">
                      {nextLearningStep.meta}
                    </span>
                  </div>
                  <ButtonLink
                    className="mt-6"
                    href={nextLearningStep.href}
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  >
                    {nextLearningStep.buttonLabel}
                  </ButtonLink>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gold">
                    Ruta inicial completada
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white">
                    Practica lo aprendido con Proker Simulator
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Llegaste al final de la ruta editorial inicial. Ahora puedes practicar decisiones con simulaciones educativas.
                  </p>
                  <ButtonLink
                    className="mt-6"
                    href="/app/proker-simulator"
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  >
                    Ir a Proker Simulator
                  </ButtonLink>
                </>
              )}
            </section>

            <AdBanner />
            <FAQSection items={post.faq} />

            {post.appPromotion && (
              <div className="mt-12">
                <AppPromo />
              </div>
            )}

            <section className="mt-12 rounded-lg border border-poker/30 bg-poker/10 p-6">
              <h2 className="font-display text-2xl font-bold text-white">
                Practica esta guía con Proker Simulator
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Convierte la teoría en ejercicios: simula manos, revisa decisiones y practica sin apostar dinero.
              </p>
              <ButtonLink
                className="mt-5"
                href="/app/proker-simulator"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Ver Proker Simulator
              </ButtonLink>
            </section>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <AdBanner />
            <TableOfContents items={post.tableOfContents} />
          </div>
        </Container>
      </article>

      <Container className="pb-16">
        <section>
          <h2 className="font-display text-2xl font-bold text-white">
            Artículos relacionados
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <ArticleCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
