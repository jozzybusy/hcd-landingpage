import { useState, useMemo, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n, interpolate } from '../../i18n/useI18n.js'
import { getOpenCourses, openCourseRegionKeys, getProgramColor } from '../../data/openCourses.js'
import Reveal from '../../components/shared/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'
import styles from './OpenCoursesPage.module.css'

const HERO_TITLE_MIN_FONT = 18

function useFitOneLine(deps) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const fit = () => {
      el.style.fontSize = ''
      let size = parseFloat(getComputedStyle(el).fontSize)
      while (el.scrollWidth > el.clientWidth && size > HERO_TITLE_MIN_FONT) {
        size -= 1
        el.style.fontSize = `${size}px`
      }
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

function OpenCoursesPage() {
  const { locale, t } = useI18n()
  const courses = useMemo(() => getOpenCourses(locale), [locale])
  const [region, setRegion] = useState('all')

  const p = t.pages.openCoursesList
  const heroTitleRef = useFitOneLine([locale])

  const filtered = useMemo(() => {
    if (region === 'all') return courses
    return courses.filter((c) => c.regionKey === region)
  }, [region, courses])

  // 按月分组
  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((c) => {
      if (!map.has(c.month)) map.set(c.month, [])
      map.get(c.month).push(c)
    })
    return [...map.entries()]
  }, [filtered])

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className={styles.heroShape3}></div>
        <div className="container">
          <Reveal className={styles.heroContent}>
            <div className={styles.breadcrumb}>
              <Link to="/">{p.breadcrumbHome}</Link>
              <span>/</span>
              <span className={styles.current}>{p.breadcrumbCourses}</span>
            </div>
            <p className={styles.heroLabel}>{p.heroLabel}</p>
            <h1 ref={heroTitleRef} className={styles.heroTitle}>{p.heroTitle}</h1>
            <p className={styles.heroDesc}>{p.heroDesc}</p>
            <div className={styles.heroStats}>
              <div>
                <div className={styles.statNum}>{courses.length}</div>
                <div className={styles.statLabel}>{p.stats.courses}</div>
              </div>
              <div>
                <div className={styles.statNum}>3</div>
                <div className={styles.statLabel}>{p.stats.cities}</div>
              </div>
              <div>
                <div className={styles.statNum}>7</div>
                <div className={styles.statLabel}>{p.stats.months}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 区域筛选 */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>{p.filterRegion}</span>
            <div className={styles.filterOptions}>
              {openCourseRegionKeys.map((key) => (
                <button
                  key={key}
                  className={`${styles.filterBtn} ${region === key ? styles.active : ''}`}
                  onClick={() => setRegion(key)}
                >
                  {p.regions[key]}
                </button>
              ))}
            </div>
            <span className={styles.resultInfo}>
              {interpolate(p.resultInfo, { count: filtered.length })}
            </span>
          </div>
        </div>
      </div>

      {/* 课程列表（按月分组，纵向滚动） */}
      <section className={styles.listSection}>
        <div className="container">
          {grouped.map(([month, items]) => (
            <div key={month} className={styles.monthGroup}>
              <div className={styles.monthCol}>
                <div className={styles.monthSticky}>
                  <span className={styles.monthNum}>{String(month).padStart(2, '0')}</span>
                  <span className={styles.monthName}>{p.monthNames[month - 1]}</span>
                </div>
              </div>
              <div className={styles.monthRows}>
                {items.map((course, index) => (
                  <Reveal key={course.id} delay={index * 0.04} className={styles.rowWrap}>
                    <article
                      className={`${styles.row} ${course.statusKey === 'delivered' ? styles.delivered : ''}`}
                      style={{ '--row-accent': getProgramColor(course.program) }}
                    >
                      <div className={styles.rowDate}>
                        <span className={styles.rowDateIcon}>📅</span>
                        <span>{course.date}</span>
                      </div>
                      <div className={styles.rowMain}>
                        <div className={styles.rowTags}>
                          <span className={styles.programTag}>{course.program}</span>
                          <span className={styles.regionTag}>{course.region}</span>
                          <span className={`${styles.statusTag} ${styles[course.statusKey]}`}>
                            {course.status}
                          </span>
                        </div>
                        <h3 className={styles.rowTitle}>{course.name}</h3>
                        <div className={styles.rowMeta}>
                          <span className={styles.metaItem}>
                            <span className={styles.metaLabel}>{p.labels.city}</span>
                            📍 {course.city}
                          </span>
                          <span className={styles.metaItem}>
                            <span className={styles.metaLabel}>{p.labels.lecturer}</span>
                            {course.lecturer}
                          </span>
                          <span className={styles.metaItem}>
                            <span className={styles.metaLabel}>{p.labels.time}</span>
                            {course.time}
                          </span>
                        </div>
                      </div>
                      <div className={styles.rowAction}>
                        <Button to="/contact" variant="primary" className={styles.registerBtn}>
                          {p.register}
                        </Button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🗓️</div>
              <p>{p.emptyText}</p>
              <button className={styles.resetBtn} onClick={() => setRegion('all')}>
                {p.reset}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 底部 CTA */}
      <section className={styles.ctaStrip}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>{p.ctaTitle}</h2>
              <p className={styles.ctaDesc}>{p.ctaDesc}</p>
            </div>
            <Button to="/contact" variant="primary">{p.ctaButton}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OpenCoursesPage
