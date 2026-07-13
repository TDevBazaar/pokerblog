import type { TableOfContentsItem } from "@/types/content";

type TableOfContentsProps = {
  items?: TableOfContentsItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <aside className="surface-card p-5">
      <h2 className="text-sm font-semibold text-white">Tabla de contenidos</h2>
      <ol className="mt-4 grid gap-3 text-sm text-muted">
        {items.map((item) => (
          <li key={item.id}>
            <a className="hover:text-poker" href={`#${item.id}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
