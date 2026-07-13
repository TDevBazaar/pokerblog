export type ContentBlock =
  | {
      type: "paragraph" | "heading" | "list" | "tip" | "warning";
      level?: 2 | 3;
      text?: string;
      items?: string[];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
    };

export type TableOfContentsItem = {
  id: string;
  title: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
  appPromotion?: boolean;
  heroImage?: { src: string; alt: string };
  tableOfContents?: TableOfContentsItem[];
  content: ContentBlock[];
  faq?: FAQItem[];
};

export type Category = {
  slug: string;
  title: string;
  href: string;
  description: string;
  icon: "book" | "cards" | "calculator" | "strategy" | "glossary" | "tools";
  topics: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  group: string;
};

export type CardSuit = "spades" | "hearts" | "diamonds" | "clubs";

export type PlayingCard = {
  value: string;
  suit: CardSuit;
};

export type HandRanking = {
  rank: number;
  name: string;
  example: PlayingCard[];
  description: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
