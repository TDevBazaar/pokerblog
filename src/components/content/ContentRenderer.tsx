import { Fragment } from "react";
import { AlertTriangle, Info } from "lucide-react";

import type { ContentBlock } from "@/types/content";
import { cn, slugify } from "@/lib/utils";
import { AdBanner } from "@/components/AdBanner";
import { ImageBlock } from "@/components/content/ImageBlock";
import { VideoBlock } from "@/components/content/VideoBlock";

type ContentRendererProps = {
  content: ContentBlock[];
};

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        const showAd = index > 0 && index % 4 === 0 && index < content.length - 1;
        return (
          <Fragment key={`group-${index}`}>
            {block.type === "heading" ? (() => {
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
            })() : block.type === "paragraph" ? (
              <p key={`${block.type}-${index}`} className="text-base leading-8 text-muted">
                {block.text}
              </p>
            ) : block.type === "list" ? (
              <ul key={`${block.type}-${index}`} className="grid gap-3 pl-1">
                {block.items?.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded bg-poker" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : block.type === "image" ? (
              <ImageBlock
                key={`${block.type}-${index}`}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            ) : block.type === "video" ? (
              <VideoBlock
                key={`${block.type}-${index}`}
                src={block.src}
                title={block.title}
              />
            ) : block.type === "tip" ? (
              <div
                key={`${block.type}-${index}`}
                className="rounded-lg border border-poker/30 bg-poker/10 p-5"
              >
                <div className="flex gap-3">
                  <Info className="mt-1 h-5 w-5 shrink-0 text-poker" aria-hidden="true" />
                  <p className="text-sm leading-7 text-ink">{block.text}</p>
                </div>
              </div>
            ) : (
              <div
                key={`${block.type}-${index}`}
                className="rounded-lg border border-gold/30 bg-gold/10 p-5"
              >
                <div className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm leading-7 text-gold">{block.text}</p>
                </div>
              </div>
            )}
            {showAd && <AdBanner />}
          </Fragment>
        );
      })}
    </div>
  );
}
