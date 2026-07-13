import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import type { BlogPost } from "@/types/content";
import { formatDate, cn } from "@/lib/utils";

const categoryImages: Record<string, string> = {
  "aprende-poker": "/images/categories/aprende-poker.png",
  "manos-de-poker": "/images/categories/manos-de-poker.png",
  probabilidades: "/images/categories/probabilidades.png",
  estrategia: "/images/categories/estrategia.png",
};

const fallbackImage = "/images/categories/aprende-poker.png";

const articleArt: Record<
  string,
  { accent: string; borderHover: string; glowGradient: string }
> = {
  "aprende-poker": {
    accent: "text-poker border-poker/30 bg-poker/10",
    borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.14)]",
    glowGradient: "rgba(136,217,130,0.15)",
  },
  "manos-de-poker": {
    accent: "text-gold border-gold/30 bg-gold/10",
    borderHover: "hover:border-gold/45 hover:shadow-[0_0_25px_rgba(233,195,73,0.14)]",
    glowGradient: "rgba(233,195,73,0.15)",
  },
  probabilidades: {
    accent: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    borderHover: "hover:border-cyan-400/45 hover:shadow-[0_0_25px_rgba(34,211,238,0.14)]",
    glowGradient: "rgba(34,211,238,0.15)",
  },
  estrategia: {
    accent: "text-poker border-poker/30 bg-poker/10",
    borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.14)]",
    glowGradient: "rgba(136,217,130,0.15)",
  },
};

const fallbackArt = {
  accent: "text-poker border-poker/30 bg-poker/10",
  borderHover: "hover:border-poker/45 hover:shadow-[0_0_25px_rgba(136,217,130,0.14)]",
  glowGradient: "rgba(136,217,130,0.15)",
};

type ArticleCardProps = {
  post: BlogPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  const art = articleArt[post.categorySlug] ?? fallbackArt;
  const imageSrc = categoryImages[post.categorySlug] ?? fallbackImage;

  return (
    <article className="group h-full">
      <Link
        className={cn(
          "group relative flex min-h-[20rem] md:min-h-[25rem] h-full flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-panel/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
          art.borderHover,
        )}
        href={`/blog/${post.slug}`}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`Portada de ${post.title}`}
            fill
            className="object-cover opacity-50 transition duration-500 group-hover:scale-105 group-hover:opacity-65"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        )}
        {/* Gradients overlay to ensure great legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,23,0.15)_0%,rgba(10,14,23,0.6)_45%,rgba(10,14,23,0.98)_100%)]" />
        <div 
          className="absolute inset-0 opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 16%, ${art.glowGradient}, transparent 30%)`,
          }}
        />

        <div className="relative z-10 flex w-full flex-col p-4 sm:p-7">
          <span
            className={cn(
              "mb-3.5 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
              art.accent,
            )}
          >
            {post.category}
          </span>
          <h3 className="font-display text-xl font-bold leading-snug text-white group-hover:text-poker transition-colors duration-200">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-ink/80">
            {post.excerpt}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-night/75 border border-white/5 px-2.5 py-1 backdrop-blur-sm">
              <Clock className="h-3 w-3 text-poker" aria-hidden="true" />
              {post.readingTime} min
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-night/75 border border-white/5 px-2.5 py-1 backdrop-blur-sm">
              <CalendarDays className="h-3 w-3 text-poker" aria-hidden="true" />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-poker">
            Leer guía
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
