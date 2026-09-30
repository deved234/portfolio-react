# David Atef — Portfolio

React + Vite portfolio with React Router, GSAP, ScrollTrigger and Lenis.

## Local development

Use Node 22.12+ (or Node 24).

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm test
```

Routes: `/`, `/#work`, `/about`, `/contact`, `/projects/:slug`, and a catch-all 404.
All seven projects live on Home. Project data and links are in `src/data/projects.js`;
personal details are in `src/data/profile.js`. The submitted CV is in
`public/documents/David-Atef-CV.pdf`.

## Contact delivery

The server-only `api/contact.js` handler runs on Vercel. The Vite development
middleware exposes the same handler locally. Copy `.env.example` to `.env.local`
for local setup or use the hosting provider's environment settings:

- `RESEND_API_KEY`: server-only Resend key.
- `CONTACT_FROM`: sender on a verified domain.
- `CONTACT_TO`: defaults to David's approved email.
- `CONTACT_ORIGIN`: deployed origin, for example `https://your-domain.example`.

Without the first two settings the endpoint intentionally returns 503 and the
form points visitors to email or WhatsApp. Success requires provider acceptance;
it does not promise inbox delivery. Tests stub the provider and send no email.

Validation, length limits, same-origin checks, a honeypot and best-effort
per-instance throttling are implemented. Configure host firewall rate limiting
for `/api/contact` before enabling a public sending key: an in-memory counter
does not persist across serverless instances. No secrets use `VITE_` prefixes.

`vercel.json` supplies SPA fallbacks while retaining `/api/*` routes. For another
host, configure history fallback and adapt the server function. Deployment and
live email activation are separate from the local review build.

## Media and content

Project images are screenshots of actual sites or local copies of their public
repositories. See `docs/media-sources.md`. Offline projects retain the approved
links. No project dates, metrics, client counts or proficiency percentages are
invented. Full-stack roles are preserved for Luxe Retail, ShopZone and the course
platform; Saint George is frontend only.

The Inter font is supplied locally through `@fontsource/inter`; its OFL license
is included in `public/licenses/Inter-OFL.txt`.

## Motion and accessibility

Native modal navigation, keyboard focus handling, labelled fields, skip link,
motion pause and reduced-motion support. Smooth scrolling is desktop-only and
stops while the menu is open. Filters and list/grid choice persist for the session;
browser Back restores scroll position. No separate Work archive is created.

## SEO

Production builds prerender ten public pages, unique metadata, JSON-LD, sitemap and robots.txt. See [SEO setup and Search Console](docs/seo.md). Run `npm run test:seo` after building.
