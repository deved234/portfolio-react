import { ExternalLink, Github, Globe } from 'lucide-react'
import styles from './Projects.module.css'

const projects = [
  {
    id: 1,
    title: 'MediNest',
    subtitle: 'Medical Platform Landing Page',
    desc: 'A modern, responsive landing page for a medical platform. Built with clean UI/UX design principles to convert visitors into patients, featuring smooth animations and an intuitive layout.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    github: 'https://github.com/deved234/medinest',
    live: 'https://deved234.github.io/medinest/',
    color: '#4ade80',
    emoji: '🏥',
  },
  {
    id: 2,
    title: 'Saint George Marketplace',
    subtitle: 'E-Commerce Store',
    desc: 'A full-featured e-commerce store with product listings, shopping cart, and seamless checkout. Built to deliver a premium shopping experience with a clean, modern interface.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    live: 'https://saintgeorgemarketplace.com/',
    color: '#c8a96e',
    emoji: '🛒',
  },
  {
    id: 3,
    title: 'Speak English',
    subtitle: 'Educational Language Platform',
    desc: 'An interactive educational platform designed to help users learn and improve their English skills. Features structured lessons, progress tracking, and an engaging user experience.',
    tags: ['React', 'CSS', 'JavaScript', 'Netlify'],
    live: 'https://speekenglish.netlify.app/',
    color: '#60a5fa',
    emoji: '📚',
  },
  {
    id: 4,
    title: 'Gaming Hub',
    subtitle: 'Games Discovery Platform',
    desc: 'A sleek gaming discovery platform where users can explore, search, and browse video games. Features a dark themed UI with dynamic content and smooth browsing experience.',
    tags: ['React', 'API Integration', 'Tailwind', 'Vercel'],
    live: 'https://gamming-hub-seven.vercel.app/',
    color: '#a855f7',
    emoji: '🎮',
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.sub}>WHAT I'VE BUILT</p>
          <h2 className={styles.heading}>Featured <span>Projects</span></h2>
          <p className={styles.desc}>
            A selection of real-world projects I've designed and developed from scratch.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`${styles.card} ${i === 0 ? styles.featured : ''}`}
              style={{ '--accent-color': p.color }}
            >
              <div className={styles.cardTop}>
                <div className={styles.emoji}>{p.emoji}</div>
                <div className={styles.links}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className={styles.iconBtn} title="GitHub">
                      <Github size={16} />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className={styles.iconBtn} title="Live Demo">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.cardSub}>{p.subtitle}</p>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>

              <div className={styles.tags}>
                {p.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>

              <div className={styles.cardGlow} style={{ background: p.color }} />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <a
            href="https://github.com/deved234"
            target="_blank"
            rel="noreferrer"
            className={styles.githubBtn}
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </div>

      </div>
    </section>
  )
}
