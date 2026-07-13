import { useMemo } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import { getCompany } from '../../data/company.js'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './AboutPage.module.css'

function AboutPage() {
  const { locale, t } = useI18n()
  const company = useMemo(() => getCompany(locale), [locale])
  const { pages } = t
  const p = pages.about

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
              {company.mission}，{company.vision}。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 使命愿景价值观 */}
      <section className={styles.values}>
        <div className="container">
          <Reveal className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueLabel}>{p.missionLabel}</div>
              <h3>{company.mission}</h3>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueLabel}>{p.visionLabel}</div>
              <h3>{company.vision}</h3>
            </div>
          </Reveal>
          <Reveal className={styles.valuesList} delay={0.1}>
            {company.values.map((value) => (
              <div key={value.title} className={styles.valueItem}>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 我们的故事 */}
      <section className={styles.story}>
        <div className="container">
          <Reveal className={styles.storyGrid}>
            <div>
              <p className={styles.label}>{p.storyLabel}</p>
              <h2 className={`section-title ${styles.title}`}>{p.storyTitle}</h2>
              <p className="section-desc">{company.story}</p>
            </div>
            <div className={styles.storyVisual}>
              <div className={styles.storyShape1}></div>
              <div className={styles.storyShape2}></div>
              <div className={styles.storyStats}>
                {company.stats.map((stat) => (
                  <div key={stat.label} className={styles.storyStat}>
                    <div className={styles.storyStatNum}>{stat.num}</div>
                    <div className={styles.storyStatLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 发展历程时间线 */}
      <section className={styles.timeline}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeader}>
              <p className={styles.label}>{p.timelineLabel}</p>
              <h2 className={`section-title ${styles.title}`}>{p.timelineTitle}</h2>
            </div>
          </Reveal>
          <Reveal className={styles.timelineList} delay={0.1}>
            {company.timeline.map((item, index) => (
              <div
                key={item.year}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 数据统计 */}
      <section className={styles.statsSection}>
        <div className={styles.statsShape1}></div>
        <div className={styles.statsShape2}></div>
        <div className="container">
          <Reveal className={styles.statsGrid}>
            {company.stats.map((stat) => (
              <div key={stat.label} className={styles.statBlock}>
                <div className={styles.statNum}>{stat.num}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
