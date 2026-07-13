import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n.js'
import { getCourses } from '../../data/courses.js'
import CardSwap, { Card } from '../ui/CardSwap.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './OpenCourses.module.css'

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
            <Button to="/contact" variant="blackOutline">{s.viewAll}</Button>
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
                    <h3 className={styles.cardTitle}>{course.title}</h3>
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
