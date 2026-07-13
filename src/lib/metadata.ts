import type { Metadata } from "next";

import { getCategoryBySlug, absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildCategoryMetadata(slug: string): Metadata {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return buildPageMetadata({
    title: category.seoTitle || `${category.title} | ${siteConfig.name}`,
    description: category.seoDescription || category.description,
    path: category.href,
  });
}
