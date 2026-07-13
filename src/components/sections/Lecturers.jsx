import { useMemo } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import { getLecturers } from '../../data/lecturers.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import TiltedCard from '../ui/TiltedCard.jsx'
import styles from './Lecturers.module.css'

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

function Lecturers() {
  const { locale, t } = useI18n()
  const lecturers = useMemo(() => getLecturers(locale), [locale])
  const { sections } = t
  const s = sections.lecturers

  return (
    <section id="lecturers" className={styles.lecturers}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
          descClassName={styles.descNowrap}
        />
        <Reveal className={styles.grid}>
          {lecturers.map((lecturer) => (
            <TiltedCard
              key={lecturer.id}
              className={styles.card}
              imageSrc={gradientToSvgUrl(lecturer.avatar)}
              altText={lecturer.name}
              containerHeight="360px"
              containerWidth="100%"
              imageHeight="360px"
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
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default Lecturers
