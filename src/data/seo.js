import { projects } from "./projects.js";
import { profile } from "./profile.js";
export const siteUrl = "https://portfolio-react-theta-hazel-94.vercel.app";
export const verification = "00nn2UZL-8Mnya94IKnBrbOcQ2QLkyf8k4zNMGPuLJk";
export const routes = [
  "/",
  "/about",
  "/contact",
  ...projects.map((p) => `/projects/${p.slug}`),
];
export function getSeo(path) {
  const pathname = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const project = projects.find((p) => pathname === `/projects/${p.slug}`);
  const pages = {
    "/": [
      "David Atef — Frontend Developer | React & Next.js",
      "David Atef is a frontend developer in Assiut, Egypt, working with React and Next.js. Explore seven projects and experience. Available for remote and on-site work.",
    ],
    "/about": [
      "About David Atef | Frontend Developer in Egypt",
      "Meet David Atef, a React and Next.js frontend developer in Assiut, Egypt. Explore his Reservya traineeship, ITI training, education and development skills.",
    ],
    "/contact": [
      "Contact David Atef | React & Next.js Developer",
      "Contact David Atef for frontend development opportunities with React and Next.js. Based in Egypt and available for freelance, remote and on-site work.",
    ],
  };
  const known = routes.includes(pathname);
  const [title, description] = project
    ? [
        `${project.name} — ${project.category} Project | David Atef`,
        `${project.description} Explore David Atef’s ${project.role.toLowerCase()} contribution.`,
      ]
    : pages[pathname] || [
        "Page not found | David Atef",
        "Explore David Atef’s portfolio and frontend development projects.",
      ];
  const url = `${siteUrl}${pathname}`;
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}${profile.photo}`,
    jobTitle: profile.title,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["React", "Next.js", "Frontend development"],
    homeLocation: { "@type": "Place", name: profile.location },
  };
  const page = {
    "@type":
      pathname === "/" || pathname === "/about"
        ? "ProfilePage"
        : pathname === "/contact"
          ? "ContactPage"
          : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...(project
      ? {
          about: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.description,
            creator: { "@id": person["@id"] },
            keywords: project.stack.join(", "),
          },
        }
      : { mainEntity: { "@id": person["@id"] } }),
  };
  const graph = [
    person,
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "David Atef — Frontend Developer",
      publisher: { "@id": person["@id"] },
    },
    page,
  ];
  if (pathname !== "/" && known)
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: project?.name || (pathname === "/about" ? "About" : "Contact"),
          item: url,
        },
      ],
    });
  return {
    title,
    description,
    url,
    image: `${siteUrl}/social-cover.png`,
    known,
    schema: { "@context": "https://schema.org", "@graph": graph },
  };
}
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function seoHead(path, preview = false) {
  const s = getSeo(path);
  const meta = (key, value, property = false) =>
    `<meta ${property ? "property" : "name"}="${key}" content="${escapeHtml(value)}" data-seo />`;
  return `<title>${escapeHtml(s.title)}</title>\n${meta("description", s.description)}\n${meta("robots", !s.known || preview ? "noindex, follow" : "index, follow")}\n${meta("google-site-verification", verification)}\n${s.known ? `<link rel="canonical" href="${s.url}" data-seo />` : ""}\n${[
    ["og:type", "website"],
    ["og:site_name", "David Atef"],
    ["og:locale", "en_US"],
    ["og:title", s.title],
    ["og:description", s.description],
    ["og:url", s.url],
    ["og:image", s.image],
    ["og:image:width", "1200"],
    ["og:image:height", "630"],
    ["og:image:alt", "David Atef — Frontend Developer, React & Next.js"],
  ]
    .map(([k, v]) => meta(k, v, true))
    .join("\n")}\n${[
    ["twitter:card", "summary_large_image"],
    ["twitter:title", s.title],
    ["twitter:description", s.description],
    ["twitter:image", s.image],
  ]
    .map(([k, v]) => meta(k, v))
    .join(
      "\n",
    )}\n<script type="application/ld+json" data-seo>${JSON.stringify(s.schema).replace(/</g, "\\u003c")}</script>`;
}
export function updateSeo(path) {
  document.head
    .querySelectorAll("[data-seo], title")
    .forEach((el) => el.remove());
  document.head.insertAdjacentHTML(
    "beforeend",
    seoHead(path, document.documentElement.dataset.preview === "true"),
  );
}
