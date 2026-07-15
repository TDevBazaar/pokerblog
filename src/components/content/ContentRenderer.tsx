import { AlertTriangle, Info } from "lucide-react";

import type { ContentBlock } from "@/types/content";
import { cn, slugify } from "@/lib/utils";
import { ImageBlock } from "@/components/content/ImageBlock";
import { VideoBlock } from "@/components/content/VideoBlock";

type ContentRendererProps = {
  content: ContentBlock[];
};

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          return (
            <Tag
              id={block.text ? slugify(block.text) : undefined}
              key={`${block.type}-${index}-${block.text}`}
              className={cn(
                "scroll-mt-28 font-display font-bold text-white",
                block.level === 3 ? "text-xl" : "pt-4 text-2xl",
              )}
            >
              {block.text}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={`${block.type}-${index}`} className="text-base leading-8 text-muted">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={`${block.type}-${index}`} className="grid gap-3 pl-1">
              {block.items?.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded bg-poker" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return (
            <ImageBlock
              key={`${block.type}-${index}`}
              src={block.src}
              alt={block.alt}
              caption={block.caption}
            />
          );
        }

        if (block.type === "video") {
          return (
            <VideoBlock
              key={`${block.type}-${index}`}
              src={block.src}
              title={block.title}
            />
          );
        }

        if (block.type === "tip") {
          return (
            <div
              key={`${block.type}-${index}`}
              className="rounded-lg border border-poker/30 bg-poker/10 p-5"
            >
              <div className="flex gap-3">
                <Info className="mt-1 h-5 w-5 shrink-0 text-poker" aria-hidden="true" />
                <p className="text-sm leading-7 text-ink">{block.text}</p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={`${block.type}-${index}`}
            className="rounded-lg border border-gold/30 bg-gold/10 p-5"
          >
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm leading-7 text-gold">{block.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
