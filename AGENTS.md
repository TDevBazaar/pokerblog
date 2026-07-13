# Agents guide — Proker Simulator

## Stack
Next.js 15.5 (App Router) · TypeScript (strict) · Tailwind CSS 3.4 · `lucide-react` icons.  
No testing framework, no formatter config, no CI/CD.

## Commands
```
npm run dev      # dev server at :3000
npm run build    # `next build`
npm run lint     # `next lint` (eslint next/core-web-vitals)
```
No typecheck script — `next build` catches type errors via the Next.js plugin in tsconfig.

## Content model
All content is static TypeScript data, **not** Markdown/MDX:

| File | What |
|---|---|
| `src/data/posts.ts` | Blog posts as `BlogPost[]` — structured `ContentBlock[]` body |
| `src/data/categories.ts` | Category definitions + `quickAnswers` |
| `src/data/glossary.ts` | Glossary terms |
| `src/data/handRankings.ts` | Hand ranking data |
| `src/data/site.ts` | Nav links, env config, Google Play URL |

**Adding a post:** append to `posts` array in `posts.ts`. TableOfContents `id` values must match `slugify( )` of heading text.
**Adding a category:** add to `categories` array + create `src/app/<slug>/page.tsx` + add nav link in `site.ts`.

## Architecture
- `@/*` → `./src/*` (path alias)
- Pages: `/`, `/blog/[slug]`, `/aprende-poker`, `/manos-de-poker`, `/probabilidades`, `/estrategia`, `/glosario`, `/herramientas`
- `CategoryLanding` component reused by all category pages
- Blog articles use `generateStaticParams` — no server-side fetching
- SEO via static `sitemap.ts` and `robots.ts`; `metadata.ts` helper for pages
- `ContentRenderer` renders typed blocks: heading, paragraph, list, tip, warning

## Env
```env
NEXT_PUBLIC_SITE_URL=https://pokeradvisorblog.com
NEXT_PUBLIC_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=com.pokeradvisor.app
```

## Style
- Custom dark theme colors: `night`, `carbon`, `panel`, `poker`, `gold`, `action`, `ink`, `muted`
- Fonts: Inter (sans), Montserrat (display)
- All UI text is in **Spanish** (`es_ES` locale)

## Important quirks
- No test suite, no typecheck script, no pre-commit hooks
- Category images live under `public/images/categories/` and are mapped in `ArticleCard`
- The `slugify()` function strips diacritics and generates kebab-case — used for heading IDs
- `next build` is the only full validation step; always run it before committing
