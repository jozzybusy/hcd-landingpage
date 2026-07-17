import { useI18n } from '../../i18n/useI18n.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import ProgrammingComputerLottie from '../animations/ProgrammingComputerLottie.jsx'
import SaasMeetingLottie from '../animations/SaasMeetingLottie.jsx'
import OnlineTeachingLottie from '../animations/OnlineTeachingLottie.jsx'
import styles from './Teaching.module.css'

function Teaching() {
  const { t } = useI18n()
  const { sections } = t
  const s = sections.teaching

  return (
    <section id="teaching" className={styles.teaching}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
        />
        <Reveal className={styles.grid}>
          <div className={`${styles.card} ${styles.online}`}>
            <div className={styles.cardShape} style={{ width: '200px', height: '200px', background: 'rgba(255,255,255,0.08)', top: '-60px', right: '-40px' }}></div>
            <div className={styles.cardShape} style={{ width: '100px', height: '100px', background: 'var(--green-yellow)', opacity: 0.2, bottom: '60px', left: '40px', borderRadius: '50%' }}></div>
            <div className={styles.cardIcon}>
              <ProgrammingComputerLottie />
            </div>
            <h3>{s.online.title}</h3>
            <p>{s.online.desc}</p>
            <div className={styles.tags}>
              {s.online.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={`${styles.card} ${styles.offline}`}>
            <div className={styles.cardShape} style={{ width: '160px', height: '160px', background: 'rgba(255,255,255,0.1)', top: '-40px', right: '-30px', borderRadius: '50%' }}></div>
            <div className={styles.cardShape} style={{ width: '80px', height: '80px', background: 'rgba(0,0,0,0.1)', bottom: '40px', left: '20px', borderRadius: '50%' }}></div>
            <div className={styles.cardIcon}>
              <SaasMeetingLottie />
            </div>
            <h3>{s.offline.title}</h3>
            <p>{s.offline.desc}</p>
            <div className={styles.tags}>
              {s.offline.tags.map((tag) => (
                <span key={tag} className={`${styles.tag} ${styles.tagDark}`}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={`${styles.card} ${styles.blended}`}>
            <div className={styles.cardShape} style={{ width: '180px', height: '180px', background: 'rgba(255,255,255,0.1)', top: '-50px', right: '-30px', borderRadius: '50%' }}></div>
            <div className={styles.cardShape} style={{ width: '100px', height: '100px', background: 'rgba(0,0,0,0.12)', bottom: '50px', left: '30px', borderRadius: '50%' }}></div>
            <div className={styles.cardIcon}>
              <OnlineTeachingLottie />
            </div>
            <h3>{s.blended.title}</h3>
            <p>{s.blended.desc}</p>
            <div className={styles.tags}>
              {s.blended.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Teaching
