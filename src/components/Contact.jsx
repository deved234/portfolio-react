import { useState } from 'react'
import styles from './Contact.module.css'
import { Mail, Phone, Github, Linkedin, Send, MapPin } from 'lucide-react'

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'deved.tefa123456@gmail.com',
    href: 'mailto:deved.tefa123456@gmail.com',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+20 120 178 0258',
    href: 'tel:01201780258',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'github.com/deved234',
    href: 'https://github.com/deved234',
    external: true,
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/david-atef',
    href: 'https://www.linkedin.com/in/david-atef/',
    external: true,
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'Egypt 🇪🇬',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:deved.tefa123456@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.sub}>GET IN TOUCH</p>
          <h2 className={styles.heading}>Let's <span>Work</span> Together</h2>
          <p className={styles.desc}>
            Have a project in mind? I'd love to hear about it. Drop me a message and let's make it happen.
          </p>
        </div>

        <div className={styles.grid}>

          {/* Left - Contact Info */}
          <div className={styles.left}>
            <div className={styles.infoCard}>
              <div className={styles.profileRow}>
                <img src="/david.jpg" alt="David Atef" className={styles.avatar} />
                <div>
                  <div className={styles.profileName}>David Atef</div>
                  <div className={styles.profileRole}>Full Stack Developer</div>
                  <div className={styles.availBadge}>
                    <span className={styles.dot} />
                    Available for work
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoList}>
                {contactInfo.map(info => (
                  <div key={info.label} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{info.icon}</div>
                    <div>
                      <div className={styles.infoLabel}>{info.label}</div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={styles.infoValue}
                          target={info.external ? '_blank' : undefined}
                          rel={info.external ? 'noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className={styles.infoValue2}>{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={`${styles.submitBtn} ${sent ? styles.sent : ''}`}>
                {sent ? (
                  <>✓ Email Client Opened!</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
