# SEO and indexing

The build renders all ten public routes to HTML before deployment. React hydrates that HTML to retain animations, project filters and client-side navigation. Each page has its own title, description, canonical URL, social sharing metadata and structured data. The home and about pages describe David using ProfilePage/Person; project pages include the project and breadcrumbs. Structured data does not guarantee a special search appearance.

`src/data/seo.js` is the source for the public production URL and Google verification token. `src/data/projects.js` is the source for project pages and their sitemap entries. The public verification token is intentionally committed; it is not a password or API key. Vercel preview builds receive noindex metadata. Update the production URL if a custom domain is introduced, redirect the old hostname to the new one, and add the new property in Search Console.

Vercel serves clean static URLs and a real 404 response instead of a catch-all SPA rewrite. Do not restore the old rewrite to index.html: it breaks sitemap/robots requests and turns missing pages into soft 404s. `/api/contact` remains a serverless function.

## Verification

Run `npm run build`, `npm test` and `npm run test:seo`. Then inspect the published HTML, sitemap and HTTP status of a nonexistent path. Test browser hydration, direct entry into project pages, client navigation, saved filters and mobile layout. Lighthouse is a lab measurement; it cannot establish real-user Core Web Vitals or guarantee Google ranking.

## Google Search Console

1. Add the URL-prefix property `https://portfolio-react-theta-hazel-94.vercel.app/`.
2. Choose HTML tag and click Verify after the deployment is live. The supplied verification tag is already in the source HTML of every page. Keep it after verification.
3. Open Sitemaps, enter `sitemap.xml` and submit.
4. In URL Inspection, inspect the homepage, run Test Live URL, then Request Indexing. Repeat for important project pages if needed. Submission does not guarantee indexing or ranking.
5. Check Page indexing and Performance over the following weeks. Use actual queries and impressions to decide which project descriptions need more detail. New sites may not have enough field data for Core Web Vitals reports.

## Content and reputation

Keep the portfolio URL on your GitHub profile and LinkedIn profile, and add relevant project-page links in repositories you own. Describe real implementation decisions, challenges and results when available; do not fabricate metrics or add keyword lists. All seven projects already have indexable detail pages, so no separate project listing page is required. Keep the existing URLs unless there is a clear reason to migrate. A custom domain is optional and is not a ranking guarantee.

Recommended initial focus: searches for David Atef, David Atef frontend developer, and David Atef React/Next.js. Generic job-related queries are more competitive. Review progress in Search Console instead of promising a particular position or deadline.
