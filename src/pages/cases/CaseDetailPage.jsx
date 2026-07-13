import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getCaseBySlug, getCases } from '../../data/cases.js'
import Button from '../../components/ui/Button.jsx'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './CaseDetailPage.module.css'

function CaseDetailPage() {
  const { locale, t } = useI18n()
  const { slug } = useParams()
  const caseData = useMemo(() => getCaseBySlug(slug, locale), [slug, locale])
  const allCases = useMemo(() => getCases(locale), [locale])

  if (!caseData) {
    return <Navigate to="/cases" replace />
  }

  const relatedCases = allCases
    .filter((c) => c.slug !== caseData.slug && c.industryKey === caseData.industryKey)
    .slice(0, 2)

  const { pages, common } = t
  const p = pages.caseDetail

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: caseData.gradient }}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className="container">
          <Reveal className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <Link to="/">{p.breadcrumbHome}</Link>
              <span>/</span>
              <Link to="/cases">{p.breadcrumbCases}</Link>
              <span>/</span>
              <span className={styles.current}>{caseData.client}</span>
            </div>
            <span className={styles.badge}>{caseData.badge}</span>
            <h1 className={styles.heroTitle}>{caseData.title}</h1>
            <div className={styles.heroMeta}>
              <div>
                <div className={styles.metaLabel}>{p.metaLabels.client}</div>
                <div className={styles.metaValue}>{caseData.client}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>{p.metaLabels.industry}</div>
                <div className={styles.metaValue}>{caseData.industry}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>{p.metaLabels.period}</div>
                <div className={styles.metaValue}>{caseData.period}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>{p.metaLabels.scale}</div>
                <div className={styles.metaValue}>{caseData.scale}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 项目背景 */}
      <section className={styles.background}>
        <div className="container">
          <Reveal className={styles.bgGrid}>
            <div>
              <p className={styles.label}>{p.backgroundLabel}</p>
              <h2 className={styles.title}>{p.backgroundTitle}</h2>
              <p className={styles.desc}>{caseData.background}</p>
            </div>
            <div className={styles.challenges}>
              <h3>{p.challengeTitle}</h3>
              <ul>
                {caseData.challenge.map((item, index) => (
                  <li key={index}>
                    <span className={styles.checkIcon}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 解决方案 */}
      <section className={styles.solution}>
        <div className="container">
          <Reveal className={styles.sectionHeader}>
            <p className={styles.label}>{p.solutionLabel}</p>
            <h2 className={`section-title ${styles.titleLight}`}>{p.solutionTitle}</h2>
          </Reveal>
          <Reveal className={styles.solutionSteps} delay={0.1}>
            {caseData.solution.map((item, index) => (
              <div key={index} className={styles.solutionStep}>
                <div className={styles.stepNum}>{index + 1}</div>
                <h4>{item.step}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 成果数据 */}
      <section className={styles.results} style={{ background: 'var(--teal)' }}>
        <div className={styles.resultShape1}></div>
        <div className={styles.resultShape2}></div>
        <div className="container">
          <Reveal className={styles.sectionHeader}>
            <p className={styles.labelLight}>{p.resultsLabel}</p>
            <h2 className={`section-title ${styles.titleLight}`}>{p.resultsTitle}</h2>
          </Reveal>
          <Reveal className={styles.metricsGrid} delay={0.1}>
            {caseData.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <div className={styles.metricNum}>{metric.num}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 客户证言 */}
      <section className={styles.testimonial}>
        <div className="container">
          <Reveal className={styles.testimonialCard}>
            <div className={styles.quoteMark}>"</div>
            <p className={styles.quoteText}>{caseData.testimonial.quote}</p>
            <div className={styles.quoteAuthor}>
              <div className={styles.authorAvatar}></div>
              <div>
                <div className={styles.authorName}>{caseData.testimonial.author}</div>
                <div className={styles.authorTitle}>{caseData.testimonial.title}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 相关案例 */}
      {relatedCases.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <Reveal className={styles.sectionHeader}>
              <p className={styles.label}>{p.relatedLabel}</p>
              <h2 className={`section-title ${styles.title}`}>{p.relatedTitle}</h2>
            </Reveal>
            <Reveal className={styles.relatedGrid} delay={0.1}>
              {relatedCases.map((item) => (
                <Link
                  key={item.slug}
                  to={`/cases/${item.slug}`}
                  className={styles.relatedCard}
                  style={{ background: item.gradient }}
                >
                  <span className={styles.relatedBadge}>{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.shortDesc}</p>
                  <span className={styles.relatedRead}>{p.relatedRead}</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaShape1}></div>
        <div className={styles.ctaShape2}></div>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <h2 className={`section-title ${styles.ctaTitle}`}>{p.ctaTitle}</h2>
            <p className={styles.ctaDesc}>{p.ctaDesc}</p>
            <div className={styles.ctaActions}>
              <Button to="/contact" variant="dark">{common.bookConsult}</Button>
              <Button to="/cases" variant="outlineDark">{common.viewMoreCases}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default CaseDetailPage
