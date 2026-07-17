import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useI18n } from '../../i18n/useI18n.js'
import Button from '../ui/Button.jsx'
import MagicRings from '../ui/MagicRings.jsx'
import ClickLottie from '../animations/ClickLottie.jsx'
import styles from './Hero.module.css'

function Hero() {
  const [isRingsHovered, setIsRingsHovered] = useState(false)
  const { t } = useI18n()
  const { hero, common } = t

  return (
    <section id="hero" className={styles.hero}>
      <div
        className={`${styles.bgShape} ${styles.shape1}`}
        onMouseEnter={() => setIsRingsHovered(true)}
        onMouseLeave={() => setIsRingsHovered(false)}
        onClick={() => window.open('https://www.glp.hcdlearning.com/', '_blank', 'noopener,noreferrer')}
      >
        <MagicRings
          color="#00C2A8"
          colorTwo="#C8F000"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.3}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.95}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.15}
          parallax={0.05}
          clickBurst={false}
        />
        <div className={styles.centerOverlay}>
          <div
            className={`${styles.overlayItem} ${styles.clickLottie} ${
              isRingsHovered ? styles.clickLottieHidden : ''
            }`}
          >
            <ClickLottie />
          </div>
          <span
            className={`${styles.overlayItem} ${styles.startText} ${
              isRingsHovered ? styles.startTextVisible : ''
            }`}
          >
            {hero.start}
          </span>
        </div>
      </div>
      <div className={`${styles.bgShape} ${styles.shape2}`}></div>
      <div className={`${styles.bgShape} ${styles.shape3}`}></div>

      <div className={styles.shapeBird}>
        <DotLottieReact
          src="/Businessmen%20at%20the%20table.lottie"
          autoplay
          loop
          className={styles.lottie}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          {hero.badge}
        </div>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.desc}>{hero.desc}</p>
        <div className={styles.actions}>
          <Button to="/#open-courses" variant="primary">{hero.openCourses}</Button>
          <Button href="https://prd-store.oss-cn-zhangjiakou.aliyuncs.com/prd/web/hcd-video.mp4" variant="secondary">{common.watchVideo}</Button>
        </div>
        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>{hero.stats.companyNum}</div>
            <div className={styles.statLabel}>{hero.stats.companies}</div>
          </div>
          <div>
            <div className={styles.statNum}>{hero.stats.satisfactionNum}</div>
            <div className={styles.statLabel}>{hero.stats.satisfaction}</div>
          </div>
          <div>
            <div className={styles.statNum}>{hero.stats.experienceNum}</div>
            <div className={styles.statLabel}>{hero.stats.experience}</div>
          </div>
        </div>
      </div>

      <div className={styles.trustedBar}>
        <span className={styles.trustedLabel}>{hero.trusted}</span>
        <div className={styles.trustedLogos}>
          {hero.trustedLogos.map((name) => (
            <span key={name} className={styles.trustedLogo}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
