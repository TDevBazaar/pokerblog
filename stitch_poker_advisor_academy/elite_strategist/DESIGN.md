---
name: Elite Strategist
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#bfcaba'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#8a9485'
  outline-variant: '#40493d'
  surface-tint: '#88d982'
  primary: '#88d982'
  on-primary: '#003909'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#1b6d24'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#3ce36a'
  on-tertiary: '#003912'
  tertiary-container: '#007f32'
  on-tertiary-container: '#c7ffc7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#69ff87'
  tertiary-fixed-dim: '#3ce36a'
  on-tertiary-fixed: '#002108'
  on-tertiary-fixed-variant: '#00531e'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for a premium educational poker platform, prioritizing intellectual depth over gambling-induced adrenaline. The brand personality is authoritative, analytical, and sophisticated—resembling a high-end fintech app or a technical chess academy. 

The aesthetic follows a **Modern Corporate** style with **Glassmorphism** accents to signify technological superiority. It avoids traditional "casino" tropes like neon lights and felt textures in favor of clean lines, deep-space backgrounds, and precise data visualization. The goal is to evoke a sense of calm, calculated confidence in the user.

## Colors
The palette is rooted in a "Deep Night" spectrum to reduce eye strain during long study sessions. 
- **Primary Green:** An elegant emerald used for branding and success states, representing the heritage of the game.
- **Secondary Gold:** Reserved for premium features, expert-level content, and "Pro" badges.
- **Action Green:** A high-vibrancy electric green used exclusively for primary calls-to-action and critical interactive elements.
- **Neutral/Surface:** The background is a dense charcoal (#0a0e17), while cards and containers use a lifted navy-charcoal (#1a1f2e) to create visible depth.
- **Typography:** Headlines utilize pure white for maximum impact, while body text uses a muted light gray to maintain a high-end, editorial feel.

## Typography
The system uses a pairing of **Montserrat** for structural headlines and **Inter** for data-heavy body content. Montserrat provides a geometric, modern weight that feels stable and professional. Inter is utilized for its exceptional legibility in long-form strategy articles and complex hand-history tables. 

For mobile, large displays scale down to ensure readability within narrower viewports. Use the `label-md` role for table headers and small metadata tags to maintain a technical, organized appearance.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop to ensure long-form educational content maintains an optimal line length for reading. 
- **Desktop:** 12-column grid with a 1200px max-width, 24px gutters, and 48px side margins.
- **Tablet:** 8-column fluid grid with 20px gutters.
- **Mobile:** 4-column fluid grid with 16px gutters and 20px side margins.

Spacing follows a 4px base unit. Internal card padding should be generous (24px or 32px) to reinforce the "Premium/Spacious" brand attribute. Content sections should be separated by large vertical stacks (`stack-lg`) to allow the user to digest complex strategy without feeling overwhelmed.

## Elevation & Depth
Depth is created through **Tonal Layering** combined with subtle **Glassmorphism**. Surfaces do not use heavy black shadows; instead, they use:
- **Outer Glows:** Instead of traditional shadows, use a very low-opacity (8-10%) glow using the Primary Green color for active elements.
- **Surface Borders:** Use 1px borders with a hex code of `#ffffff15` (white at 8% opacity) to define card edges against the dark background.
- **Backdrop Blur:** Modals and navigation bars should use a 20px backdrop blur with a semi-transparent fill of the background color to create a sense of vertical stacking.
- **Z-Index logic:** The primary background is the lowest level. Cards sit on level 1. Hovered cards or active inputs sit on level 2 with a slightly lighter background hex.

## Shapes
The design system utilizes **Soft** roundedness (0.25rem / 4px). This subtle rounding maintains a professional, sharp edge that feels more "technical" and "calculated" than fully rounded UI. 
- **Small components (Inputs, Chips):** 4px radius.
- **Medium components (Cards, Modals):** 8px radius (`rounded-lg`).
- **Large components (Hero sections):** 12px radius (`rounded-xl`).
- **Buttons:** 4px radius to match the technical aesthetic, avoiding pill shapes to maintain the serious educational tone.

## Components
- **Buttons:**
  - *Primary:* Electric Green (#00c853) background with pure black text for maximum contrast.
  - *Secondary:* Ghost style with a Gold (#d4af37) 1px border and Gold text.
  - *Tertiary:* Clear background with white text and an underline on hover.
- **Cards:** Use the surface color (#1a1f2e). They must feature a subtle top-border (2px) in Primary Green for strategy articles or Gold for "Pro" tools.
- **Inputs:** Darker than the surface color, with a 1px border. On focus, the border transitions to Electric Green with a subtle glow.
- **Chips/Tags:** Small, capitalized labels with low-opacity background tints of the category color (e.g., a "Theory" tag has a dark green background with light green text).
- **Strategy Tools:** Custom components like "Range Charts" should use a monochromatic green scale to represent frequency, ensuring the interface remains elegant and non-distracting.
- **Icons:** Thin-stroke (1.5px) linear icons. Avoid filled icons unless indicating an active state.