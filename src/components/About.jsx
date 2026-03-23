import styles from './About.module.css'
import { Code2, Layers, Zap, Users } from 'lucide-react'

const stats = [
  { icon: <Code2 size={22} />, label: 'Projects Done',     value: '10+' },
  { icon: <Layers size={22} />, label: 'Technologies',     value: '12+' },
  { icon: <Zap size={22} />,    label: 'Years Experience', value: '2+' },
  { icon: <Users size={22} />,  label: 'Happy Clients',    value: '5+' },
]

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>

        <div className={styles.left}>
          <div className={styles.photoFrame}>
            <img src="/david.jpg" alt="David Atef" className={styles.photo} />
            <div className={styles.expBadge}>
              <span className={styles.expNum}>2+</span>
              <span className={styles.expText}>Years of<br/>Experience</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.sub}>WHO I AM</p>
          <h2 className={styles.heading}>
            Passionate about building<br />
            <span className={styles.accent}>remarkable</span> digital experiences
          </h2>

          <p className={styles.text}>
            Hello! I'm <strong>David Atef</strong>, a Full Stack Web Developer specialized in building and developing websites and applications using modern web technologies.
          </p>
          <p className={styles.text}>
            I have experience in both frontend and backend development using the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, Node.js), with the ability to build fast, responsive, and scalable web solutions.
          </p>
          <p className={styles.text}>
            I'm passionate about writing clean, organized code and delivering practical solutions — whether it's a landing page, an e-commerce platform, or a content management dashboard. I also focus on optimizing user experience and performance.
          </p>
          <p className={styles.text}>
            I'm committed to delivering high-quality work with the complete source code and clear documentation for easy management after delivery.
          </p>

          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statNum}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a
              href="https://github.com/deved234"
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
            >
              View GitHub
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Let's Talk
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
