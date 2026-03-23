import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('#home')
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setActive(href)
    setOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.logoD}>D</span>
        <span className={styles.logoText}>avid Atef</span>
      </div>

      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {navLinks.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className={active === l.href ? styles.activeLink : ''}
              onClick={() => handleNav(l.href)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className={styles.cta}>Hire Me</a>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
