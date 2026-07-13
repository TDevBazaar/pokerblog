import Image from "next/image";

export function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 720px, 100vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted/60 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
