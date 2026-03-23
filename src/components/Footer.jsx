import styles from './Footer.module.css'
import { Github, Linkedin, Mail, Phone, Heart } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoD}>D</span>
            <span>avid Atef</span>
          </div>
          <p className={styles.tagline}>
            Full Stack Developer · MERN Stack · Building the web, one project at a time.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="mailto:deved.tefa123456@gmail.com">
              <Mail size={14} /> deved.tefa123456@gmail.com
            </a>
            <a href="tel:01201780258">
              <Phone size={14} /> +20 120 178 0258
            </a>
            <a href="https://github.com/deved234" target="_blank" rel="noreferrer">
              <Github size={14} /> github.com/deved234
            </a>
            <a href="https://www.linkedin.com/in/david-atef/" target="_blank" rel="noreferrer">
              <Linkedin size={14} /> linkedin.com/in/david-atef
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {year} David Atef. All rights reserved.
        </p>
        <p className={styles.made}>
          Made with <Heart size={13} className={styles.heart} /> in Egypt 🇪🇬
        </p>
        <div className={styles.socials}>
          <a href="https://github.com/deved234" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="https://www.linkedin.com/in/david-atef/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href="mailto:deved.tefa123456@gmail.com" aria-label="Email">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
