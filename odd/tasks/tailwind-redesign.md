# Tailwind v4 migration + final redesign

Objective: migrate the whole site to Tailwind v4 and finish applying the final redesign (Home, Mobile, Proyectos, Blog, 404).
Branch: `redesign/funnel` · Delivery: ask-on-risk · Runner: none (no test suite); checks = `pnpm build`, visual check at 375px and 1440px, es and en.

## Specs

- S1. "terminar de aplicar las mejoras en mi pagina con estos que ya son los nuevos diseños version final": source of truth is the Design canvas https://claude.ai/artifact/9VD5Gs6rodhu68qQdRdFFo (artboards `Main.dc.html` home responsive, `Mobile.dc.html` mobile prototype, `Proyectos.dc.html`, `Blog.dc.html`; tokens `ds/camiloacosta/tokens.json`). Local copy: scratchpad `artifact-files/44b96021-7287-405e-bb2d-f69ee7452db2/project/`.
- S2. "Tailwind v4 y migrar todo" (user choice): install Tailwind v4 via `@tailwindcss/vite`, brand tokens defined once in `@theme`, and every page and component (home included) styled with Tailwind utilities. Follow the `tailwind-4` skill: no `var()` and no hex colors in class attributes; theme classes instead.
- S3. Pages still on the old design move to the new look: `/proyectos/`, `/blog/`, `/blog/[slug]/`, 404, in es and en.
- S4. Preserve existing behavior: Calendly popup via `data-calendly`, `data-track` analytics, stepped lead form + `/api/contact`, i18n (es default, en under `/en/`), trailing-slash links, SEO/hreflang/JSON-LD, `prefers-reduced-motion`.
- S5. Project rules (CLAUDE.md): no Domi's Web Services, no Nathalia Acosta / Maura Tatis, no invented stats (keep `[brackets]` for pending content), commits without signing or attribution.
- Assumption: the old light/dark toggle of the classic pages is dropped, since the design has no dark toggle.

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S2, S4 | inline | done (build green) | 72dca11 |
| T2 | S1, S2, S4 | delegated (parallel writer reason a) | done (build green, no browser check yet) | 0cc011b |
| T3 | S1, S2, S3 | delegated (parallel writer reason a) | done (build green, no browser check yet) | 300703e |
| T4 | S1, S2, S3 | delegated (parallel writer reason a) | done (build green, no browser check yet) | 50ed402 |
| T5 | S2, S4 | inline | done except visual check + CLAUDE.md (needs approval) | 055834e, a30ee92 |

- T1: Tailwind foundation: install deps, `@theme` tokens, unified Layout (single variant), shared `SiteNav` + `SiteFooter` for inner pages. Risk item 5 (new dependency).
- T2: Migrate home components to Tailwind and apply design deltas from `Main.dc.html` / `Mobile.dc.html`.
- T3: `/proyectos/` (es/en) per `Proyectos.dc.html`.
- T4: `/blog/`, `/blog/[slug]/` and 404 (es/en) per `Blog.dc.html`.
- T5: Remove dead code (old sections, classic Header/Footer, home.css, old global.css), update docs (CLAUDE.md section only after approval, IMPLEMENTACION.md, TODO.md), full build + seam check.

## Log

- L1 (2026-11-10, user): "Necesito remotar la actualizacion al nuevo look and feel de mi pagina ya esto lo comenzamos en una rama quiero que lo retomes, valides que skills necesitas para trabajar las mejores practicas con Astro y Tailwind y luego  termines de aplicar las mejoras en mi pagina con estos que ya son los nuevos diseños version final que tenemos hasta ahora https://claude.ai/artifact/9VD5Gs6rodhu68qQdRdFFo#artboard-9073db0ef64e"
- L2 (2026-11-10): Found the project has no Tailwind; home already redesigned with scoped CSS on `redesign/funnel`. User chose "Tailwind v4 y migrar todo".
- L3: Skills: `tailwind-4`, `impeccable`, `emil-design-eng`, `work-unit-commits`. No Astro skill (gap); Astro docs via context7.

- T4 (writer): blog index/post/404 es+en built with Tailwind. Evidence: build Complete! empty (scratch /var/folders/7d/dk_dfz4x36zd142byfr3qfbm0000gn/T/tmp.I5x2QiVL2X) and with a temporary sample post (removed). Next: parent seam check, visual check at 375/1440.
- T3 (writer): only Prometálica + Atelier; filter chips dropped (sectors unknown); `date` field removed from projects data (CLAUDE.md mentions old fields: doc update in T5).
- T2 (writer): global.css was unlayered and overrode Tailwind utilities; fixed in T5 by dropping it from Layout. Plans keep USD prices from 47c10ef instead of design's "Precio según tu proyecto".
- T5 (2026-11-10): user approved deleting classic layout/sections/global.css. Full build 10 pages Complete!. No browser tool in session: 375/1440 visual check pending, preview at localhost:4321.
