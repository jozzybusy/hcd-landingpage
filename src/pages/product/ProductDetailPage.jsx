import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getProductBySlug } from '../../data/products.js'
import { getCases } from '../../data/cases.js'
import Button from '../../components/ui/Button.jsx'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './ProductDetailPage.module.css'

const heroImages = {
  leadership: '/cm-hero.png',
  custom: '/marksimos-hero-bg.png',
  'skill-accelerator': '/teamsynergy-hero-bg.png',
}

const painCardKeysFallback = ['gap', 'execution', 'collaboration', 'talent']

function ProductDetailPage() {
  const { locale, t } = useI18n()
  const { slug } = useParams()
  const product = useMemo(() => getProductBySlug(slug, locale), [slug, locale])
  const cases = useMemo(() => getCases(locale), [locale])

  if (!product) {
    return <Navigate to="/#products" replace />
  }

  const relatedCases = cases.filter((c) =>
    c.relatedProducts.includes(product.slug)
  )

  const { pages, common } = t
  const p = pages.productDetail

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ background: product.gradient }}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        {heroImages[product.slug] && (
          <div className={styles.heroImageWrapper}>
            <img
              className={styles.heroImage}
              src={heroImages[product.slug]}
              alt={product.name}
              loading="eager"
            />
          </div>
        )}
        <div className="container">
          <Reveal className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <Link to="/">{p.breadcrumbHome}</Link>
              <span>/</span>
              <Link to="/#products">{p.breadcrumbProducts}</Link>
              <span>/</span>
              <span className={styles.current}>{product.name}</span>
            </div>
            <span className={styles.tag}>{product.tag}</span>
            <div className={styles.heroTitleRow}>
              <h1 className={styles.heroTitle}>{product.name}</h1>
              {(product.slug === 'custom' || product.slug === 'leadership' || product.slug === 'skill-accelerator') && (
                <img
                  className={styles.heroTitleLogo}
                  src={
                    product.slug === 'custom'
                      ? '/hcd-logo-11.png'
                      : product.slug === 'leadership'
                      ? '/hcd-logo-09.png'
                      : '/hcd-logo-15.png'
                  }
                  alt="HCD"
                  loading="eager"
                />
              )}
            </div>
            <p className={styles.heroDesc}>{product.fullDesc}</p>
            <div className={styles.heroActions}>
              <Button to="/contact" variant="primary">{common.consultNow}</Button>
              <Button to="/contact" variant="secondary">{common.downloadPlan}</Button>
            </div>
          </Reveal>
          <Reveal className={styles.heroMetrics} delay={0.2}>
            {product.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <div className={styles.metricNum}>{metric.num}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 痛点挑战 */}
      <section className={styles.painPoints}>
        <div className="container">
          <Reveal className={styles.sectionHeader}>
            <p className={styles.label}>{p.painLabel}</p>
            <h2 className={`section-title ${styles.title}`}>{p.painTitle}</h2>
          </Reveal>
          <Reveal className={styles.painGrid} delay={0.1}>
            {(product.painCardKeys || painCardKeysFallback).map((key) => {
              const card = p.painCards[product.slug][key]
              return (
                <div key={key} className={styles.painCard}>
                  <div className={styles.painIcon}>{card.icon}</div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* 课程体系 */}
      <section className={styles.modules}>
        <div className="container">
          <Reveal className={styles.sectionHeader}>
            <p className={styles.label}>{p.modulesLabel}</p>
            <h2 className={`section-title ${styles.titleLight}`}>{p.modulesTitle}</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {product.duration}{p.modulesMeta}{product.audience}
            </p>
          </Reveal>
          <Reveal className={styles.modulesGrid} delay={0.1}>
            {product.modules.map((module, index) => (
              <div key={module.name} className={styles.moduleCard}>
                <div className={styles.moduleNum}>0{index + 1}</div>
                <h3>{module.name}</h3>
                <div className={styles.moduleDays}>{module.days}</div>
                <p>{module.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 相关案例 */}
      {relatedCases.length > 0 && (
        <section className={styles.relatedCases}>
          <div className="container">
            <Reveal className={styles.sectionHeader}>
              <p className={styles.label}>{p.relatedCasesLabel}</p>
              <h2 className={`section-title ${styles.title}`}>{p.relatedCasesTitle}</h2>
            </Reveal>
            <Reveal className={styles.casesGrid} delay={0.1}>
              {relatedCases.map((caseItem) => (
                <Link
                  key={caseItem.slug}
                  to={`/cases/${caseItem.slug}`}
                  className={styles.caseCard}
                  style={{ background: caseItem.gradient }}
                >
                  <span className={styles.caseBadge}>{caseItem.badge}</span>
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.shortDesc}</p>
                  <span className={styles.caseRead}>{p.relatedRead}</span>
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

export default ProductDetailPage
