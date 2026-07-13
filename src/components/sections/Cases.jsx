import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getCases } from '../../data/cases.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './Cases.module.css'

function Cases() {
  const { locale, t } = useI18n()
  const cases = useMemo(() => getCases(locale), [locale])
  const { sections } = t
  const s = sections.cases

  return (
    <section id="cases" className={styles.cases}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
        />
        <Reveal className={styles.grid}>
          {cases.map((caseItem) => (
            <Link
              key={caseItem.slug}
              to={`/cases/${caseItem.slug}`}
              className={`${styles.card} ${caseItem.featured ? styles.featured : ''}`}
              style={{ background: caseItem.gradient }}
            >
              {caseItem.featured && <div className={styles.cardBg} />}
              <span className={styles.badge}>{caseItem.badge}</span>
              <h3>{caseItem.title}</h3>
              <p>{caseItem.shortDesc}</p>
              <span className={styles.read}>{s.readMore}</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default Cases
