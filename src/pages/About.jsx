import { profile } from "../data/profile";
const experience = [
  [
    "July 2026 — Present",
    "Frontend Developer Trainee",
    "Reservya",
    "Working on restaurant and reservation website templates, with a focus on responsive interfaces and consistency across devices.",
  ],
  [
    "January — June 2026",
    "Intensive Code Camp · MERN",
    "Information Technology Institute · Assiut",
    "Practical training in full-stack web development with the MERN stack.",
  ],
  [
    "November 2025 — June 2026",
    "Full Stack Web Development Training",
    "Instant",
    "Hands-on web development training and practical application projects.",
  ],
  [
    "2020 — 2024",
    "Faculty of Information Technology",
    "Egyptian E-Learning University",
    "Bachelor’s degree · GPA 3.06.",
  ],
];
export default function About() {
  return (
    <article className="about-page">
      <header className="page-heading section-shell">
        <p className="eyebrow">A little about me</p>
        <h1 data-reveal>
          Thoughtful interfaces.
          <br />
          Built to be used.
        </h1>
      </header>
      <section className="about-intro section-shell">
        <div>
          <span className="large-arrow" aria-hidden="true">
            ↘
          </span>
          <p className="body-large" data-reveal>
            I’m David Atef, a frontend developer based in Assiut, Egypt. I build
            web experiences with React and Next.js, bringing together clear
            structure, responsive layouts and considered interaction.
          </p>
          <p>
            My full-stack project experience helps me understand the connection
            between an interface and the services behind it. My focus is
            frontend development: making those connections feel straightforward
            for the people using them.
          </p>
          <p className="availability">
            <i />
            Available for full-time, contract and freelance work.
            <br />
            Remote, on-site and open to relocation.
          </p>
          <a
            className="pill"
            href="/documents/David-Atef-CV.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View CV ↗
          </a>
          <a
            className="text-link cv-download"
            href="/documents/David-Atef-CV.pdf"
            download
          >
            Download PDF ↓
          </a>
        </div>
        <div className="about-photo">
          <img
            src={profile.photo}
            alt="David Atef"
            width="1084"
            height="1301"
          />
        </div>
      </section>
      <section className="services section-shell">
        <h2 data-reveal>I can help you with…</h2>
        <div className="service-grid">
          {[
            [
              "Frontend development",
              "From reusable React components to Next.js applications, I build interfaces with a clear structure and maintainable code.",
            ],
            [
              "Interaction & responsive UI",
              "Layouts that adapt to different screens, with purposeful motion and attention to the small details of everyday use.",
            ],
            [
              "API integration",
              "Connecting interfaces to real data, handling loading and error states, and keeping forms and application state predictable.",
            ],
          ].map(([title, copy], i) => (
            <div key={title} data-reveal>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="experience section-shell">
        <p className="eyebrow">Experience & education</p>
        <h2 data-reveal>
          Learning. Building.
          <br />
          Moving forward.
        </h2>
        <div>
          {experience.map(([date, title, company, copy]) => (
            <article className="experience-row" key={company}>
              <p className="eyebrow">{date}</p>
              <div>
                <h3>{title}</h3>
                <p className="company">{company}</p>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="stack-section section-shell">
        <p className="eyebrow">Tools I work with</p>
        <h2>A practical toolkit.</h2>
        <div className="stack-tags">
          {[
            "React",
            "Next.js",
            "JavaScript",
            "HTML & CSS",
            "Tailwind CSS",
            "React Router",
            "Zustand",
            "TanStack Query",
            "React Hook Form",
            "Zod",
            "GSAP",
            "REST APIs",
            "Git & GitHub",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="backend-background">
          <h3>Full-stack background</h3>
          <p>
            My Node.js, Express and MongoDB project experience helps me connect
            frontend interfaces to the services behind them.
          </p>
          <div className="stack-tags">
            {["Node.js", "Express", "MongoDB"].map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
