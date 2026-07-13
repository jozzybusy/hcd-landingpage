import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, interpolate } from '../../i18n/useI18n.js'
import { getCases, caseIndustryKeys, caseTypeKeys } from '../../data/cases.js'
import { getDictionary } from '../../i18n/dictionaries/index.js'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './CasesListPage.module.css'

function CasesListPage() {
  const { locale, t } = useI18n()
  const cases = useMemo(() => getCases(locale), [locale])
  const filters = getDictionary(locale).data.cases.filters

  const [industry, setIndustry] = useState('all')
  const [type, setType] = useState('all')

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const industryMatch = industry === 'all' || c.industryKey === industry
      const typeMatch = type === 'all' || c.typeKey === type
      return industryMatch && typeMatch
    })
  }, [industry, type, cases])

  const { pages } = t
  const p = pages.casesList

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className="container">
          <Reveal className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <Link to="/">{p.breadcrumbHome}</Link>
              <span>/</span>
              <span className={styles.current}>{p.breadcrumbCases}</span>
            </div>
            <p className={styles.heroLabel}>{p.heroLabel}</p>
            <h1 className={styles.heroTitle}>{p.heroTitle}</h1>
            <p className={styles.heroDesc}>{p.heroDesc}</p>
            <div className={styles.heroStats}>
              <div>
                <div className={styles.statNum}>{p.stats.casesNum}</div>
                <div className={styles.statLabel}>{p.stats.cases}</div>
              </div>
              <div>
                <div className={styles.statNum}>{p.stats.industriesNum}</div>
                <div className={styles.statLabel}>{p.stats.industries}</div>
              </div>
              <div>
                <div className={styles.statNum}>{p.stats.satisfactionNum}</div>
                <div className={styles.statLabel}>{p.stats.satisfaction}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 筛选栏 */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>{p.filters.industry}</span>
              <div className={styles.filterOptions}>
                {caseIndustryKeys.map((key) => (
                  <button
                    key={key}
                    className={`${styles.filterBtn} ${industry === key ? styles.active : ''}`}
                    onClick={() => setIndustry(key)}
                  >
                    {filters.industry[key]}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>{p.filters.type}</span>
              <div className={styles.filterOptions}>
                {caseTypeKeys.map((key) => (
                  <button
                    key={key}
                    className={`${styles.filterBtn} ${type === key ? styles.active : ''}`}
                    onClick={() => setType(key)}
                  >
                    {filters.type[key]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 案例网格 */}
      <section className={styles.casesSection}>
        <div className="container">
          <div className={styles.resultInfo}>
            {interpolate(p.resultInfo, { count: filteredCases.length })}
          </div>
          <div className={styles.grid}>
            {filteredCases.map((caseItem, index) => (
              <Reveal
                key={caseItem.slug}
                delay={index * 0.05}
                className={`${styles.card} ${caseItem.featured ? styles.featured : ''}`}
              >
                <Link
                  to={`/cases/${caseItem.slug}`}
                  className={styles.cardLink}
                  style={{ background: caseItem.gradient }}
                >
                  <span className={styles.badge}>{caseItem.badge}</span>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTags}>
                      <span className={styles.cardTag}>{caseItem.industry}</span>
                      <span className={styles.cardTag}>{caseItem.type}</span>
                    </div>
                    <h3>{caseItem.title}</h3>
                    <p>{caseItem.shortDesc}</p>
                    <span className={styles.read}>{p.readMore}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>{p.emptyIcon}</div>
              <p>{p.emptyText}</p>
              <button
                className={styles.resetBtn}
                onClick={() => { setIndustry('all'); setType('all') }}
              >
                {p.reset}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CasesListPage
