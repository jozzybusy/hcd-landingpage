import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getLecturers } from '../../data/lecturers.js'
import Reveal from '../../components/shared/Reveal.jsx'
import TiltedCard from '../../components/ui/TiltedCard.jsx'
import styles from './LecturersListPage.module.css'

function gradientToSvgUrl(gradient) {
  const match = gradient.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]+),\s*(#[0-9a-fA-F]+)\)/)
  if (!match) return ''
  const [, , color1, color2] = match
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const avatarIconMap = {
  1: '👨‍💼',
  2: '👩‍🏫',
  3: '👨‍🎓',
  4: '👩‍💻',
}

function LecturersListPage() {
  const { locale, t } = useI18n()
  const lecturers = useMemo(() => getLecturers(locale), [locale])
  const { pages } = t
  const p = pages.lecturersList

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
              <span className={styles.current}>{p.breadcrumbLecturers}</span>
            </div>
            <p className={styles.heroLabel}>{p.heroLabel}</p>
            <h1 className={styles.heroTitle}>{p.heroTitle}</h1>
            <p className={styles.heroDesc}>{p.heroDesc}</p>
            <div className={styles.heroStats}>
              <div>
                <div className={styles.statNum}>{p.stats.lecturersNum}</div>
                <div className={styles.statLabel}>{p.stats.lecturers}</div>
              </div>
              <div>
                <div className={styles.statNum}>{p.stats.coursesNum}</div>
                <div className={styles.statLabel}>{p.stats.courses}</div>
              </div>
              <div>
                <div className={styles.statNum}>{p.stats.satisfactionNum}</div>
                <div className={styles.statLabel}>{p.stats.satisfaction}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 讲师网格 */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.grid}>
            {lecturers.map((lecturer) => (
              <Reveal
                key={lecturer.id}
                className={styles.card}
              >
                <TiltedCard
                  imageSrc={gradientToSvgUrl(lecturer.avatar)}
                  altText={lecturer.name}
                  containerHeight="540px"
                  containerWidth="100%"
                  imageHeight="540px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className={styles.cardFrame}>
                      <div className={styles.avatarArea}>
                        {lecturer.photo ? (
                          <img className={styles.avatarPhoto} src={lecturer.photo} alt={lecturer.name} />
                        ) : (
                          <span className={styles.avatarIcon}>{avatarIconMap[lecturer.id]}</span>
                        )}
                      </div>
                      <div className={styles.info}>
                        <h4>{lecturer.name}</h4>
                        <div className={styles.role}>{lecturer.role}</div>
                        <p>{lecturer.desc}</p>
                        <div className={styles.tags}>
                          {lecturer.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LecturersListPage
