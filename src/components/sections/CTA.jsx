import { useI18n } from '../../i18n/useI18n.js'
import Button from '../ui/Button.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './CTA.module.css'

function CTA() {
  const { t } = useI18n()
  const { sections, common } = t
  const s = sections.cta

  return (
    <section id="cta" className={styles.cta}>
      <div className={`${styles.shape} ${styles.shape1}`}></div>
      <div className={`${styles.shape} ${styles.shape2}`}></div>
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 className={`section-title ${styles.title}`}>{s.title}</h2>
          <p className={styles.desc}>{s.desc}</p>
          <div className={styles.actions}>
            <Button to="/contact" variant="dark">{common.bookConsult}</Button>
            <Button to="/#products" variant="outlineDark">{common.viewServices}</Button>
          </div>
          <div className={styles.contact}>
            {s.contact}<strong>400-888-9999</strong> · <strong>hcd@hcdlearning.com</strong>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTA
