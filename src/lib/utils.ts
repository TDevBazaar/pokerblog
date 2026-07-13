import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function absoluteUrl(path = "") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string) {
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export function getFeaturedPosts(limit = 4) {
  return posts.filter((post) => post.featured).slice(0, limit);
}

export function getLatestPosts(limit = 6) {
  return [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedPosts(slug: string, categorySlug: string, limit = 3) {
  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.categorySlug === categorySlug,
  );
  const fallback = posts.filter(
    (post) => post.slug !== slug && post.categorySlug !== categorySlug,
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function getNextLearningStep(slug: string) {
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return undefined;
  }

  const categoryPosts = posts.filter(
    (post) => post.categorySlug === currentPost.categorySlug,
  );
  const indexInCategory = categoryPosts.findIndex((post) => post.slug === slug);
  const nextPostInCategory = categoryPosts[indexInCategory + 1];

  if (nextPostInCategory) {
    return {
      type: "post" as const,
      eyebrow: "Siguiente guía en esta sección",
      title: nextPostInCategory.title,
      description: nextPostInCategory.excerpt,
      href: `/blog/${nextPostInCategory.slug}`,
      badge: nextPostInCategory.category,
      meta: `${nextPostInCategory.readingTime} min de lectura`,
      buttonLabel: "Continuar guía",
    };
  }

  const currentCategoryIndex = categories.findIndex(
    (category) => category.slug === currentPost.categorySlug,
  );
  const nextCategory = categories[currentCategoryIndex + 1];

  if (nextCategory) {
    return {
      type: "category" as const,
      eyebrow: "Siguiente sección de aprendizaje",
      title: nextCategory.title,
      description: nextCategory.description,
      href: nextCategory.href,
      badge: "Nueva sección",
      meta: "Ver presentación",
      buttonLabel: "Abrir sección",
    };
  }

  return {
    type: "app" as const,
    eyebrow: "Ruta inicial completada",
    title: "Practica lo aprendido con Proker Simulator",
    description:
      "Llegaste al final de la ruta editorial inicial. Ahora puedes practicar decisiones con simulaciones educativas.",
    href: "/app/proker-simulator",
    badge: "App educativa",
    meta: "Sin apuestas ni dinero real",
    buttonLabel: "Ir a Proker Simulator",
  };
}
