import { useI18n } from '../../i18n/useI18n.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import FaqHelpLottie from '../animations/FaqHelpLottie.jsx'
import ChampionLottie from '../animations/ChampionLottie.jsx'
import ConversationLottie from '../animations/ConversationLottie.jsx'
import styles from './OtherProducts.module.css'

const otherProductConfig = [
  { key: 'lms', icon: FaqHelpLottie, bg: 'rgba(200,240,0,0.15)' },
  { key: 'assessment', icon: ChampionLottie, bg: 'rgba(255,95,160,0.15)' },
  { key: 'coaching', icon: ConversationLottie, bg: 'rgba(0,194,168,0.15)' },
]

function OtherProducts() {
  const { t } = useI18n()
  const { sections } = t
  const s = sections.otherProducts

  return (
    <section id="other-products" className={styles.otherProducts}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
          variant="light"
          descClassName={styles.descNowrap}
        />
        <Reveal className={styles.grid}>
          {otherProductConfig.map((item) => {
            const Icon = item.icon
            const card = s.cards[item.key]
            return (
              <div key={item.key} className={styles.card}>
                <div className={styles.icon} style={{ background: item.bg }}>
                  <Icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default OtherProducts
