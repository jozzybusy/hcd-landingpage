import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n.js'
import Button from '../components/ui/Button.jsx'
import styles from './NotFound.module.css'

function NotFound() {
  const { t } = useI18n()
  const { pages } = t
  const p = pages.notFound

  return (
    <section className={styles.notFound}>
      <div className={styles.shape1}></div>
      <div className={styles.shape2}></div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.code}>404</div>
          <h1>{p.title}</h1>
          <p>{p.desc}</p>
          <Button to="/" variant="primary">{p.backHome}</Button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
