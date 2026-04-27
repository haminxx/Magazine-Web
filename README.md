# 1 + 1 = 3 — Magazine Web

An editorial / magazine website built with Next.js + Tailwind, taking visual
inspiration from:

- [hipdinosaur.com](https://hipdinosaur.com/) — the floating, dot-rendered
  hero figure and the editorial top-bar / marquee aesthetic.
- [adocs.co](https://adocs.co/) — the dense card grid of zines, books and
  projects.

Card hovers use a layered **progressive blur** reveal that animates info from
the bottom of each cover.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- `motion` (Framer Motion)
- `clsx` + `tailwind-merge` for className composition

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx       # fonts + global shell
    page.tsx         # page composition
    globals.css      # design tokens, halftone & grain helpers
  components/
    top-bar.tsx      # status ribbon + nav
    hero.tsx         # floating portrait + parallax + marquee
    about-strip.tsx  # manifesto section
    magazine-grid.tsx
    magazine-card.tsx        # card with hover progressive blur
    progressive-blur.tsx     # layered backdrop-blur with mask gradients
    site-footer.tsx
  lib/
    utils.ts         # cn() helper
public/
  hero-portrait.png  # used by Hero
```
