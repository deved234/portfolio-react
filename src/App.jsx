import { useEffect, useState } from 'react'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Projects   from './components/Projects'
import Experience from './components/Experience'
import Contact    from './components/Contact'
import Footer     from './components/Footer'
import './index.css'

// Scroll-to-top button
function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'var(--accent)',
        color: 'var(--bg)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,169,110,0.4)',
        transition: 'all 0.2s',
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null
}

// Loading screen
function Loader({ done }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: done ? 0 : 1,
      pointerEvents: done ? 'none' : 'all',
      transition: 'opacity 0.6s ease',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '3rem',
        fontWeight: 800,
        color: 'var(--accent)',
        letterSpacing: '-2px',
        animation: 'pulse 1s ease-in-out infinite',
      }}>DA</div>
      <div style={{
        width: '60px',
        height: '2px',
        background: 'var(--surface2)',
        borderRadius: '2px',
        marginTop: '1.2rem',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'var(--accent)',
          borderRadius: '2px',
          animation: 'load 1.2s ease forwards',
        }} />
      </div>
      <style>{`
        @keyframes load {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="grain">
      <Loader done={loaded} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  )
}
