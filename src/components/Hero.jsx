import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import { Github, Linkedin, Mail, ArrowDown, Phone } from 'lucide-react'

const roles = ['Full Stack Developer', 'MERN Stack Expert', 'Web Architect', 'React Specialist']

export default function Hero() {
  const roleRef = useRef(null)
  const idxRef  = useRef(0)
  const charRef = useRef(0)
  const delRef  = useRef(false)

  useEffect(() => {
    let timer
    const type = () => {
      const role = roles[idxRef.current]
      if (!delRef.current) {
        charRef.current++
        if (charRef.current > role.length) {
          delRef.current = true
          timer = setTimeout(type, 1800)
          return
        }
      } else {
        charRef.current--
        if (charRef.current === 0) {
          delRef.current = false
          idxRef.current = (idxRef.current + 1) % roles.length
        }
      }
      if (roleRef.current) {
        roleRef.current.textContent = role.slice(0, charRef.current)
      }
      timer = setTimeout(type, delRef.current ? 45 : 90)
    }
    timer = setTimeout(type, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className={styles.hero}>
      {/* Background elements */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.grid} />

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Available for Work
          </div>

          <h1 className={styles.heading}>
            <span className={styles.greeting}>Hello, I'm</span>
            <span className={styles.name}>David Atef</span>
            <span className={styles.roleWrap}>
              <span ref={roleRef} className={styles.role} />
              <span className={styles.cursor}>|</span>
            </span>
          </h1>

          <p className={styles.desc}>
            Full Stack Developer specialized in building modern, fast, and scalable web applications using the <strong>MERN Stack</strong>. I craft clean code and deliver exceptional user experiences.
          </p>

          <div className={styles.actions}>
            <a href="#projects" className={styles.btnPrimary}>
              View My Work
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Get In Touch
            </a>
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/deved234" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/david-atef/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:deved.tefa123456@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="tel:01201780258" aria-label="Phone">
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <div className={styles.imageRing} />
            <div className={styles.imageRing2} />
            <img
              src="/david.jpg"
              alt="David Atef"
              className={styles.photo}
            />
            <div className={styles.badge2}>
              <span>🚀</span>
              <div>
                <div className={styles.b2title}>MERN Stack</div>
                <div className={styles.b2sub}>Full Stack Dev</div>
              </div>
            </div>
            <div className={styles.badge3}>
              <span>✨</span>
              <div>
                <div className={styles.b2title}>Clean Code</div>
                <div className={styles.b2sub}>Best Practices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollDown}>
        <ArrowDown size={18} />
        <span>Scroll Down</span>
      </a>
    </section>
  )
}
