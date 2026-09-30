import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { render } from "../.ssr/entry-server.js";
import { routes, siteUrl, seoHead } from "../src/data/seo.js";
const template = await readFile("dist/index.html", "utf8");
const preview = process.env.VERCEL_ENV === "preview";
for (const route of [...routes, "/404"]) {
  const file = route === "/" ? "dist/index.html" : `dist${route}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    template
      .replace("<!--seo-head-->", seoHead(route, preview))
      .replace('<html lang="en">', `<html lang="en" data-preview="${preview}">`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${render(route)}</div>`,
      ),
  );
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
console.log(
  `Prerendered ${routes.length} pages and 404; generated sitemap and robots.txt.`,
);
