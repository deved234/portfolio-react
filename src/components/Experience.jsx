import styles from './Experience.module.css'
import { Briefcase, GraduationCap, Code2, Star } from 'lucide-react'

const timeline = [
  {
    type: 'work',
    icon: <Briefcase size={18} />,
    title: 'Freelance Full Stack Developer',
    org: 'Self-Employed',
    period: '2023 – Present',
    desc: 'Building and delivering full-stack web applications for clients across various industries. Specializing in MERN stack solutions, including e-commerce platforms, educational portals, and business landing pages.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    accent: '#c8a96e',
  },
  {
    type: 'work',
    icon: <Code2 size={18} />,
    title: 'Frontend Developer',
    org: 'Personal & Client Projects',
    period: '2022 – 2023',
    desc: 'Developed responsive, modern landing pages and web interfaces with a focus on performance, clean UI, and cross-device compatibility. Worked with HTML, CSS, JavaScript, and Bootstrap.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    accent: '#60a5fa',
  },
  {
    type: 'edu',
    icon: <GraduationCap size={18} />,
    title: 'Computer Science – Senior 2024',
    org: 'University Graduate',
    period: '2020 – 2024',
    desc: 'Completed a Bachelor\'s degree in Computer Science. Built strong foundations in algorithms, data structures, software engineering, and web development throughout the program.',
    tags: ['CS Fundamentals', 'Algorithms', 'Software Engineering'],
    accent: '#a855f7',
  },
  {
    type: 'achievement',
    icon: <Star size={18} />,
    title: 'MERN Stack Mastery',
    org: 'Self-Learning & Practice',
    period: '2022 – Present',
    desc: 'Dedicated continuous learning path covering the full MERN stack ecosystem — from REST API design and database modeling to advanced React patterns and server-side deployment.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    accent: '#4ade80',
  },
]

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.sub}>MY JOURNEY</p>
          <h2 className={styles.heading}>Work <span>Experience</span> & Education</h2>
          <p className={styles.desc}>
            My professional path and the milestones that shaped my expertise.
          </p>
        </div>

        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.lineWrap}>
                <div className={styles.iconCircle} style={{ borderColor: item.accent, color: item.accent }}>
                  {item.icon}
                </div>
                {i < timeline.length - 1 && <div className={styles.line} />}
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.period} style={{ color: item.accent }}>{item.period}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.org}>{item.org}</p>
                  </div>
                  <span className={styles.typeBadge} style={{ background: item.accent + '15', color: item.accent, borderColor: item.accent + '30' }}>
                    {item.type === 'work' ? 'Work' : item.type === 'edu' ? 'Education' : 'Achievement'}
                  </span>
                </div>

                <p className={styles.desc2}>{item.desc}</p>

                <div className={styles.tags}>
                  {item.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
