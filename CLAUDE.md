# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio for David Atef: React 18 + Vite 7 SPA, prerendered to static HTML at build time, deployed on Vercel. Plain JSX (no TypeScript), no linter configured. Node >= 22.12.

## Commands

```sh
npm ci
npm run dev -- --host 127.0.0.1   # Vite dev server; also serves /api/contact locally
npm run build                     # client build + SSR build + prerender (see below)
npm test                          # node:test over tests/*.test.js
npm run test:seo                  # verifies dist/ output — run AFTER npm run build
```

Single test file / single test:

```sh
node --test tests/contact.test.js
node --test --test-name-pattern="UTM labels" tests/analytics.test.js
```

Before calling work done: `npm run build`, `npm test`, `npm run test:seo`.

## Architecture

### Build pipeline (prerendering)
`npm run build` runs three steps:
1. `vite build` → client bundle in `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir .ssr` → server renderer (`render(path)` using `StaticRouter`).
3. `scripts/prerender.mjs` → for every route in `routes` (from `src/data/seo.js`) plus `/404`, injects `seoHead(route)` into the `<!--seo-head-->` placeholder in `index.html` and the rendered app into `<div id="root">`, writing `dist/<route>.html`. Also generates `sitemap.xml` and `robots.txt`.

`src/main.jsx` hydrates when `#root` already has children, otherwise renders. Consequences:
- Components must be SSR-safe: guard `window`/`document`/`sessionStorage` (render-time code runs in Node). `App.jsx` uses `useClientLayoutEffect` and defers intro-loader decisions to effects for this reason.
- `vite.config.js` sets `ssr.noExternal` for gsap/@gsap/react/lenis; new browser-only libs may need the same.
- `VERCEL_ENV=preview` builds emit noindex metadata and `data-preview="true"`.

### Data-driven content
- `src/data/projects.js` is the single source for projects: Home grid, `/projects/:slug` pages, routes, sitemap, SEO titles, and category counts all derive from it. Adding a project requires `public/projects/<slug>.webp` and, unless `mobileImage: false`, `<slug>-mobile.webp` — `verify-seo.mjs` asserts these exist.
- `src/data/caseStudies.js` — per-slug `challenge` + `decisions` rendered on project pages. Content must come from the project's repo or already-approved facts. `test:seo` requires a case study for every project and ≥180 words per project page (added because thin pages sat in "Discovered – currently not indexed").
- `src/data/profile.js` — personal details/links.
- `src/data/seo.js` — `siteUrl` (production URL), Google verification token, `routes`, `getSeo`/`seoHead` (titles, descriptions, canonical, OG, JSON-LD). Also `updateSeo(path)` updates head tags on client navigation. Every route must have a unique title (asserted by `test:seo`).
- A new top-level page needs: a `<Route>` in `src/App.jsx`, an entry in `routes` and the `pages` map in `seo.js`. `verify-seo.mjs` asserts `routes.length === projects.length + 4`; update that if the static page count changes.

### Routing / hosting
`vercel.json` uses `cleanUrls` with real static files and a real 404 — there is intentionally **no** catch-all rewrite to `index.html` (it would break sitemap/robots and create soft 404s; see `docs/seo.md`). It also sets immutable caching for hashed `/assets/*` and security headers; the CSP deliberately does not restrict scripts so Google Analytics keeps working. `App.jsx` manages scroll restoration manually (per-location-key positions, hash targets, focusing the `h1` after navigation).

### Motion
GSAP + ScrollTrigger (registered in `App.jsx`) and Lenis smooth scroll (`useSmoothScroll`, desktop only, paused when the menu is open). Elements with `data-reveal` get scroll-in animations; a page-transition curtain runs on path change. Everything respects `useReducedMotion`. An intro loader shows once per session (`sessionStorage` key `david-portfolio:intro:v2`) and makes the app `inert` while visible.

### Contact API
`api/contact.js` is a Vercel serverless function (Resend). In dev, `vite.config.js` mounts the same handler as middleware with a small `res` adapter and copies `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`, `CONTACT_ORIGIN` from `.env.local` into `process.env`. Without `RESEND_API_KEY`/`CONTACT_FROM` it returns 503 by design, and the form must show a delivery-unavailable message, never success. It does validation, same-origin check, honeypot (`website` field), and in-memory per-instance throttling. Tests stub `fetch`; they must never send real email. Never expose these secrets via `VITE_`-prefixed vars.

### Analytics
`src/lib/analytics.js` is consent-gated GA4 (`AnalyticsConsent` component, `/privacy` page). It runs only on the production host after consent, strips URLs to origin+pathname, and forwards only sanitized `utm_*` values. Logic is factored into `createAnalytics(win, doc, id, enabled)` so `tests/analytics.test.js` can test it with fake globals.

## Content rules (from README/docs)
- Do not invent project dates, metrics, client counts, or skill percentages.
- Project images must be real screenshots of the actual projects; record sources in `docs/media-sources.md`.
- Preserve stated roles: ShopZone and the course platform are full-stack; Luxe Retail and Saint George are frontend only (Luxe Retail changed to frontend on 13 November 2026 at David's request).
- `docs/verification.md` logs what has been verified; append to it when doing a verification pass.
