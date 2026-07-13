import { useMemo } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import Reveal from '../shared/Reveal.jsx'
import GraphLottie from '../animations/GraphLottie.jsx'
import TargetLottie from '../animations/TargetLottie.jsx'
import NerdyBoyLottie from '../animations/NerdyBoyLottie.jsx'
import GlobalLottie from '../animations/GlobalLottie.jsx'
import styles from './WhoWeAre.module.css'

const lottieMap = {
  target: TargetLottie,
  'nerdy-boy': NerdyBoyLottie,
  global: GlobalLottie,
  graph: GraphLottie,
}

const whoCardKeys = [
  { key: 'custom', lottie: 'target', bg: '#F0EBFF' },
  { key: 'lecturers', lottie: 'nerdy-boy', bg: '#E0FFF8' },
  { key: 'measurable', lottie: 'graph', bg: '#FFF0F6' },
  { key: 'nationwide', lottie: 'global', bg: '#FFFBE0' },
]

function WhoWeAre() {
  const { t } = useI18n()
  const { sections } = t
  const s = sections.whoWeAre

  return (
    <section id="who" className={styles.who}>
      <div className="container">
        <Reveal className={styles.grid}>
          <div>
            <p className={styles.label}>{s.label}</p>
            <h2 className={`section-title ${styles.title}`}>{s.title}</h2>
            <p className="section-desc">{s.p1}</p>
            <p className="section-desc">{s.p2}</p>
            <p className="section-desc">{s.p3}</p>
          </div>

          <div className={styles.cardsColumn}>
            <div className={styles.cards}>
              {whoCardKeys.map((card) => {
                const Icon = lottieMap[card.lottie]
                const cardT = s.cards[card.key]
                return (
                  <div key={card.key} className={styles.card}>
                    <div className={styles.cardIcon} style={{ background: card.bg }}>
                      <Icon />
                    </div>
                    <h4>{cardT.title}</h4>
                    <p>{cardT.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default WhoWeAre
