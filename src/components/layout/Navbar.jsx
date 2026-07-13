import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import styles from './Navbar.module.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale, setLocale, t } = useI18n()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: '/about', label: t.nav.about },
    { path: '/#products', label: t.nav.products },
    { path: '/cases', label: t.nav.cases },
    { path: '/#partners', label: t.nav.partners },
  ]

  const toggleLocale = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="HCD GLOBAL" className={styles.logoImg} />
      </Link>

      <div className={styles.links}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        className={styles.langToggle}
        onClick={toggleLocale}
        aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        {t.nav.toggle}
      </button>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={t.nav.menu}
      >
        <span className={`${styles.menuBar} ${menuOpen ? styles.open1 : ''}`}></span>
        <span className={`${styles.menuBar} ${menuOpen ? styles.open2 : ''}`}></span>
        <span className={`${styles.menuBar} ${menuOpen ? styles.open3 : ''}`}></span>
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.mobileLangToggle}
            onClick={() => { toggleLocale(); setMenuOpen(false) }}
            aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            {t.nav.toggle}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
