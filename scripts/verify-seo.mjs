import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import {
  routes,
  getSeo,
  seoHead,
  verification,
  siteUrl,
} from "../src/data/seo.js";

assert.equal(new Set(routes).size, 10);
const titles = new Set();
for (const route of routes) {
  const html = await readFile(
    route === "/" ? "dist/index.html" : `dist${route}.html`,
    "utf8",
  );
  const seo = getSeo(route);
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`href="${seo.url}"`));
  assert.ok(html.includes(verification));
  assert.ok(html.includes("<h1"));
  assert.ok(html.includes('id="main-content"'));
  assert.ok(!html.includes('<div id="root"></div>'));
  assert.ok(!/<div[^>]*inert[^>]*>\s*<a class="skip-link"/.test(html));
  assert.ok(!html.includes("<!--seo-head-->"));
  assert.ok(html.includes('content="index, follow"'));
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json" data-seo>(.*?)<\/script>/s,
    )[1],
  );
  assert.ok(schema["@graph"].some((item) => item["@type"] === "Person"));
  if (route !== "/")
    assert.ok(
      schema["@graph"].some((item) => item["@type"] === "BreadcrumbList"),
    );
  titles.add(seo.title);
}
assert.equal(titles.size, routes.length);
const home = await readFile("dist/index.html", "utf8");
for (const route of routes.filter((r) => r.startsWith("/projects/")))
  assert.ok(home.includes(`href="${route}"`));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
for (const route of routes)
  assert.ok(sitemap.includes(`<loc>${siteUrl}${route}</loc>`));
assert.ok(
  (await readFile("dist/robots.txt", "utf8")).includes(
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ),
);
const missing = await readFile("dist/404.html", "utf8");
assert.ok(missing.includes('content="noindex, follow"'));
assert.ok(!missing.includes('rel="canonical"'));
assert.ok(seoHead("/", true).includes("noindex, follow"));
assert.ok(!getSeo("/projects/missing").known);
assert.equal(getSeo("/about/?test=1#test").url, `${siteUrl}/about`);
assert.ok((await stat("dist/social-cover.png")).size > 0);
console.log(
  "SEO verification passed: 10 complete HTML pages, unique metadata, canonical URLs, JSON-LD, verification token, sitemap, robots, social image and noindex 404/preview.",
);
