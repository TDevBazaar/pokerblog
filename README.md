# Proker Simulator

Blog educativo de póker construido con Next.js App Router, TypeScript y Tailwind CSS.

El sitio está enfocado en aprendizaje: reglas, manos, probabilidades, estrategia, glosario y herramientas para practicar Texas Hold'em sin apuestas ni dinero real.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

Para validar producción:

```bash
npm run build
```

## Dónde agregar artículos

Los artículos viven en `src/data/posts.ts`.

Agrega un objeto nuevo con la estructura `BlogPost`:

```ts
{
  slug: "nuevo-articulo",
  title: "Nuevo artículo",
  metaTitle: "Nuevo artículo | Proker Simulator",
  metaDescription: "Descripción SEO corta.",
  category: "Estrategia",
  categorySlug: "estrategia",
  excerpt: "Resumen visible en cards.",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  readingTime: 6,
  tags: ["estrategia"],
  appPromotion: true,
  tableOfContents: [{ id: "primer-tema", title: "Primer tema" }],
  content: [
    { type: "heading", level: 2, text: "Primer tema" },
    { type: "paragraph", text: "Contenido del artículo." }
  ],
  faq: [
    { question: "Pregunta frecuente", answer: "Respuesta breve." }
  ]
}
```

Los `id` de la tabla de contenidos deben coincidir con el slug generado desde el texto del heading. Por ejemplo, `Primer tema` genera `primer-tema`.

## Dónde agregar categorías

Las categorías viven en `src/data/categories.ts`.

Para una categoría nueva:

1. Agrega el objeto en `categories`.
2. Crea una ruta en `src/app/<slug>/page.tsx`.
3. Usa `CategoryLanding` si la página tiene la misma estructura.
4. Agrega el enlace al menú en `src/data/site.ts`.

## Cambiar enlace de Google Play

Puedes cambiarlo en `src/data/site.ts`, propiedad `googlePlayUrl`.

También puedes usar una variable de entorno:

```bash
NEXT_PUBLIC_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=tu.app
```

## Despliegue

### Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Configura `NEXT_PUBLIC_SITE_URL` con el dominio final.
4. Ejecuta el build estándar de Next.js.

### Cloudflare Pages

1. Conecta el repositorio.
2. Build command: `npm run build`.
3. Output: `.next`.
4. Configura `NEXT_PUBLIC_SITE_URL` con el dominio final.

Si usas salida estática completa en el futuro, revisa `next.config.ts` y las limitaciones de rutas dinámicas antes de cambiar el modo de build.
