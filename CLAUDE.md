# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Common Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm test`
- Run single test: `npm run test:unit src/pages/[filename]`

## Code Architecture
1. **Pages**: Next.js pages are in `src/pages/` (e.g., `src/pages/index.tsx`)
2. **Components**: Reusable UI components in `src/components/` (e.g., `src/components/Navigation.tsx`)
3. **Utilities**: Shared logic in `src/utils/` (e.g., `src/utils/api.ts`)
4. **Courses**: The `stitch_poker_advisor_academy` directory contains the core Proker Simulator logic
5. **Configuration**: Tailwind CSS and PostCSS setup in `tailwind.config.ts` and `postcss.config.mjs`

## Key Technologies
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- ESLint with config in `.eslintrc.json`

## Tools and Workflow
- **Content Management**: Structured data in `src/data/` following the content model
- **Category System**: Uses `ArticleCard` components with hashtag highlights:
  - Estrategia: #Tight-Aggressive #Juego-Posicional #Value-Betting #Lectura-de-Apuestas
  - Herramientas: #Poker-Advisor-App #Calculadora-Odds #Simulador-de-Manos #Rangos-Iniciales
  - Glosario: #All-in #Bluff #Bad-Beat #Tilt #Nuts #Set-Trips
- **Navigation**: Follows the SPA routes defined in `src/data/site.ts`
- **Development Workflow**: Uses `npm run dev`, `npm run build`, and `npm run lint` commands

## Notes
- Refer to `README.md` for project overview
- AGENTS.md contains agent-specific instructions