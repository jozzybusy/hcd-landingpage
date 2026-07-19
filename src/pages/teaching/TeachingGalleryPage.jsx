import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { galleryItems } from '../../data/teachingGallery.js'
import Masonry from '../../components/ui/Masonry.jsx'
import Reveal from '../../components/shared/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'
import styles from './TeachingGalleryPage.module.css'

function TeachingGalleryPage() {
  const { t } = useI18n()
  const p = t.pages.teachingGallery

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
              <Link to="/#teaching">{p.breadcrumbTeaching}</Link>
              <span>/</span>
              <span className={styles.current}>{p.heroLabel}</span>
            </div>
            <span className={styles.badge}>{p.heroLabel}</span>
            <h1 className={styles.heroTitle}>{p.heroTitle}</h1>
            <p className={styles.heroDesc}>{p.heroDesc}</p>
            <Link to="/#teaching" className={styles.backLink}>{p.backToTeaching}</Link>
          </Reveal>
        </div>
      </section>

      {/* Masonry gallery */}
      <section className={styles.gallery}>
        <div className="container">
          <Reveal className={styles.galleryInner}>
            <Masonry
              items={galleryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
            />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaShape1}></div>
        <div className={styles.ctaShape2}></div>
        <div className="container">
          <Reveal className={styles.ctaInner}>
            <h2 className={`section-title ${styles.ctaTitle}`}>{t.sections.cta.title}</h2>
            <p className={styles.ctaDesc}>{t.sections.cta.desc}</p>
            <div className={styles.ctaActions}>
              <Button to="/contact" variant="primary">{t.common.bookConsult}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default TeachingGalleryPage
