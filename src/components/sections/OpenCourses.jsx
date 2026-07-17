import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getCourses } from '../../data/courses.js'
import CardSwap, { Card } from '../ui/CardSwap.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './OpenCourses.module.css'

const MIN_TITLE_SIZE = 16
const MAX_TITLE_SIZE = 26
const MIN_WEIGHT = 50
const MAX_WEIGHT = 105

function getTitleFontSize(text) {
  let weight = 0
  for (const ch of text) {
    weight += ch.codePointAt(0) > 0x2e80 ? 2 : 1
  }
  if (weight <= MIN_WEIGHT) return MAX_TITLE_SIZE
  if (weight >= MAX_WEIGHT) return MIN_TITLE_SIZE
  const ratio = (weight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT)
  return MAX_TITLE_SIZE - ratio * (MAX_TITLE_SIZE - MIN_TITLE_SIZE)
}

function OpenCourses() {
  const navigate = useNavigate()
  const { locale, t } = useI18n()
  const courses = useMemo(() => getCourses(locale), [locale])
  const { sections } = t
  const s = sections.openCourses

  return (
    <section id="open-courses" className={styles.openCourses}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <SectionHeader
              label={s.label}
              title={s.title}
              desc={s.desc}
              align="left"
              titleClassName={styles.titleNowrap}
              headerClassName={styles.sectionHeader}
            />
            <p className={styles.note}>{s.note}</p>
            <Button to="/courses" variant="blackOutline">{s.viewAll}</Button>
          </div>

          <Reveal className={styles.swapWrap}>
            <CardSwap
              width={400}
              height={480}
              cardDistance={50}
              verticalDistance={60}
              delay={4000}
              pauseOnHover={true}
              easing="elastic"
              onCardClick={() => navigate('/contact')}
            >
              {courses.map((course) => (
                <Card
                  key={course.title}
                  style={{
                    background: course.bg,
                    color: course.textColor,
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                  }}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardDate}>📅 {course.date}</span>
                      <span
                        className={styles.cardSpots}
                        style={{
                          background:
                            course.textColor === 'var(--white)'
                              ? 'rgba(255,255,255,0.18)'
                              : 'rgba(0,0,0,0.12)',
                        }}
                      >
                        {course.spots}
                      </span>
                    </div>
                    <h3
                      className={styles.cardTitle}
                      style={{ fontSize: `${getTitleFontSize(course.title)}px` }}
                    >
                      {course.title}
                    </h3>
                    <div className={styles.cardMeta}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>{s.lecturer}</span>
                        <span className={styles.metaValue}>{course.lecturer}</span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>{s.city}</span>
                        <span className={styles.metaValue}>📍 {course.location}</span>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardCta}>{s.register}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default OpenCourses
