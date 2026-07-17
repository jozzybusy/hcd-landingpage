import { useState } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './ContactPage.module.css'

function ContactPage() {
  const { t } = useI18n()
  const p = t.pages.contact
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    employees: '',
    demand: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className="container">
          <Reveal className={styles.heroContent}>
            <p className={styles.heroLabel}>{p.heroLabel}</p>
            <h1 className={styles.heroTitle}>{p.heroTitle}</h1>
            <p className={styles.heroDesc}>
              {p.heroDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 表单 + 联系信息 */}
      <section className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* 表单 */}
            <Reveal className={styles.formWrap}>
              {submitted ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>{p.successIcon}</div>
                  <h3>{p.successTitle}</h3>
                  <p>{p.successDesc}</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>{p.formTitle}</h2>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>{p.fields.name}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={p.placeholders.name}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>{p.fields.company}</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder={p.placeholders.company}
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>{p.fields.phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={p.placeholders.phone}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>{p.fields.email}</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={p.placeholders.email}
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>{p.fields.employees}</label>
                      <select
                        name="employees"
                        value={form.employees}
                        onChange={handleChange}
                      >
                        <option value="">{p.options.select}</option>
                        {p.options.size.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>{p.fields.demand}</label>
                      <select
                        name="demand"
                        value={form.demand}
                        onChange={handleChange}
                      >
                        <option value="">{p.options.select}</option>
                        <option value={p.options.demand.leadership}>{p.options.demand.leadership}</option>
                        <option value={p.options.demand.custom}>{p.options.demand.custom}</option>
                        <option value={p.options.demand.accelerator}>{p.options.demand.accelerator}</option>
                        <option value={p.options.demand.other}>{p.options.demand.other}</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>{p.fields.message}</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={p.placeholders.message}
                    ></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    {p.submit}
                  </button>
                </form>
              )}
            </Reveal>

            {/* 联系信息 */}
            <Reveal className={styles.info} delay={0.1}>
              <h2 className={styles.infoTitle}>{p.infoTitle}</h2>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>{p.contactItems.phone.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{p.contactItems.phone.label}</div>
                    <div className={styles.infoValue}>{p.contactItems.phone.value}</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>{p.contactItems.email.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{p.contactItems.email.label}</div>
                    <div className={styles.infoValue}>{p.contactItems.email.value}</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>{p.contactItems.address.icon}</div>
                  <div>
                    <div className={styles.infoLabel}>{p.contactItems.address.label}</div>
                    <div className={styles.infoValue}>{p.contactItems.address.value}</div>
                  </div>
                </div>
              </div>
              <div className={styles.infoNote}>
                <p>{p.workHours}</p>
                <p>{p.replyNote}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
