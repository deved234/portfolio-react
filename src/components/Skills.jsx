import styles from './Skills.module.css'

const skills = [
  { name: 'React.js',     level: 90, color: '#61DAFB', icon: '⚛️' },
  { name: 'Node.js',      level: 85, color: '#68A063', icon: '🟢' },
  { name: 'Express.js',   level: 82, color: '#ffffff', icon: '⚡' },
  { name: 'MongoDB',      level: 80, color: '#4DB33D', icon: '🍃' },
  { name: 'JavaScript',   level: 88, color: '#F7DF1E', icon: '🟨' },
  { name: 'HTML5',        level: 95, color: '#E34F26', icon: '🔶' },
  { name: 'CSS3',         level: 88, color: '#1572B6', icon: '🔷' },
  { name: 'Tailwind CSS', level: 85, color: '#06B6D4', icon: '🌊' },
  { name: 'Bootstrap',    level: 80, color: '#7952B3', icon: '🅱' },
  { name: 'REST APIs',    level: 85, color: '#c8a96e', icon: '🔗' },
  { name: 'Git & GitHub', level: 78, color: '#F05032', icon: '🐙' },
  { name: 'Responsive Design', level: 90, color: '#FF6B6B', icon: '📱' },
]

const techStack = [
  { label: 'MongoDB',    bg: '#0D4429', color: '#4DB33D' },
  { label: 'Express',    bg: '#1a1a1a', color: '#ffffff' },
  { label: 'React',      bg: '#0C2A3D', color: '#61DAFB' },
  { label: 'Node.js',    bg: '#0D2B0D', color: '#68A063' },
  { label: 'Tailwind',   bg: '#082B33', color: '#06B6D4' },
  { label: 'Bootstrap',  bg: '#1e0d3a', color: '#7952B3' },
  { label: 'JavaScript', bg: '#33320A', color: '#F7DF1E' },
  { label: 'REST APIs',  bg: '#2a1f0a', color: '#c8a96e' },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.sub}>WHAT I KNOW</p>
          <h2 className={styles.heading}>My <span>Tech Stack</span> & Skills</h2>
          <p className={styles.desc}>
            Technologies and tools I work with to build powerful, modern web applications.
          </p>
        </div>

        <div className={styles.techGrid}>
          {techStack.map(t => (
            <div
              key={t.label}
              className={styles.techBadge}
              style={{ background: t.bg, color: t.color, borderColor: t.color + '30' }}
            >
              {t.label}
            </div>
          ))}
        </div>

        <div className={styles.skillsGrid}>
          {skills.map((skill, i) => (
            <div key={skill.name} className={styles.skillCard} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={styles.skillTop}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillIcon}>{skill.icon}</span>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
                <span className={styles.skillPct} style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    boxShadow: `0 0 10px ${skill.color}50`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
