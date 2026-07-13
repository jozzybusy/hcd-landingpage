import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useI18n()
  const { footer } = t

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="/footer-logo.png" alt="HCD GLOBAL" className={styles.logoImg} />
            </div>
            <p>{footer.tagline}</p>
          </div>

          <div className={styles.col}>
            <h5>{footer.columns.products.title}</h5>
            <Link to="/products/leadership">{footer.columns.products.links.leadership}</Link>
            <Link to="/products/custom">{footer.columns.products.links.custom}</Link>
            <Link to="/products/skill-accelerator">{footer.columns.products.links.accelerator}</Link>
            <Link to="/#other-products">{footer.columns.products.links.coaching}</Link>
          </div>

          <div className={styles.col}>
            <h5>{footer.columns.about.title}</h5>
            <Link to="/about">{footer.columns.about.links.company}</Link>
            <Link to="/#lecturers">{footer.columns.about.links.lecturers}</Link>
            <Link to="/cases">{footer.columns.about.links.cases}</Link>
            <Link to="/#partners">{footer.columns.about.links.partners}</Link>
          </div>

          <div className={styles.col}>
            <h5>{footer.columns.contact.title}</h5>
            <a href="tel:400-888-9999">{footer.columns.contact.phone}</a>
            <a href="mailto:hcd@hcdlearning.com">{footer.columns.contact.email}</a>
            <span>{footer.columns.contact.cities}</span>
            <Link to="/contact">{footer.columns.contact.online}</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
          <div className={styles.badges}>
            <span className={styles.badge}>{footer.privacy}</span>
            <span className={styles.badge}>{footer.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
