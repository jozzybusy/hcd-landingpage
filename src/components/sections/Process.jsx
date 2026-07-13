import { useI18n } from '../../i18n/useI18n.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './Process.module.css'

const stepKeys = ['research', 'design', 'match', 'deliver', 'evaluate']

function Process() {
  const { t } = useI18n()
  const { sections } = t
  const s = sections.process

  return (
    <section id="process" className={styles.process}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
          descClassName={styles.descNowrap}
        />
        <Reveal className={styles.steps}>
          {stepKeys.map((key, index) => {
            const step = s.steps[key]
            return (
              <div key={key} className={styles.step}>
                <div className={`${styles.stepNum} ${styles[`color${index + 1}`]}`}>
                  0{index + 1}
                </div>
                <div className={styles.stepTitle}>{step.title}</div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Process
