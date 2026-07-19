import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useI18n } from '../../i18n/useI18n.js'
import Button from '../ui/Button.jsx'
import MagicRings from '../ui/MagicRings.jsx'
import OptionWheel from '../ui/OptionWheel.jsx'
import ClickLottie from '../animations/ClickLottie.jsx'
import styles from './Hero.module.css'

function Hero() {
  const [isRingsHovered, setIsRingsHovered] = useState(false)
  const { t } = useI18n()
  const { hero, common } = t

  const brandIndex = hero.wheel.items.length - 1
  const businessIndex = 0
  const leadershipIndex = 1
  const synergyIndex = 2
  const [wheelIndex, setWheelIndex] = useState(brandIndex)
  const isBrandActive = wheelIndex === brandIndex
  const isBusinessActive = wheelIndex === businessIndex
  const isLeadershipActive = wheelIndex === leadershipIndex
  const isSynergyActive = wheelIndex === synergyIndex

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

      <div className={styles.shapeBird}>
        <DotLottieReact
          src="/Businessmen%20at%20the%20table.lottie"
          autoplay
          loop
          className={styles.lottie}
        />
      </div>

      <div className={styles.wheelWrap}>
        <OptionWheel
          items={hero.wheel.items}
          defaultSelected={brandIndex}
          onChange={index => setWheelIndex(index)}
          textColor="rgba(255,255,255,0.35)"
          activeColor="var(--white)"
          side="left"
          fontSize={3}
          spacing={2.5}
          curve={2.0}
          tilt={6}
          blur={2}
          fade={0.25}
          smoothing={300}
          inset={60}
          loop
          draggable
          soundUrl=""
          className={styles.wheel}
        />
      </div>

      <div className={styles.centerStage}>
        <div className={`${styles.content} ${isBrandActive ? styles.contentVisible : styles.contentHidden}`}>
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
        </div>

        <div className={`${styles.businessContent} ${isBusinessActive ? styles.businessContentVisible : styles.businessContentHidden}`}>
          <div className={styles.logoRow}>
            <img src="/hotelstar-logo.png" alt="HotelStar" className={styles.logoImg} />
            <img src="/marksimos-logo.png" alt="MarkSimos" className={styles.logoImg} />
          </div>
          <p className={styles.businessTagline}>{hero.wheel.businessTagline}</p>
        </div>

        <div className={`${styles.businessContent} ${isLeadershipActive ? styles.businessContentVisible : styles.businessContentHidden}`}>
          <div className={styles.logoRow}>
            <img src="/changeman-logo.png" alt="ChangeMan" className={styles.logoImg} />
            <img src="/leaderstyle-logo.png" alt="LeaderStyle" className={styles.logoImg} />
          </div>
          <p className={styles.businessTagline}>{hero.wheel.leadershipTagline}</p>
        </div>

        <div className={`${styles.businessContent} ${isSynergyActive ? styles.businessContentVisible : styles.businessContentHidden}`}>
          <div className={styles.logoRow}>
            <img src="/typecoach-logo.png" alt="TypeCoach" className={styles.logoImg} />
            <img src="/teamsynergy-logo.png" alt="TeamSynergy" className={styles.logoImg} />
          </div>
          <p className={styles.businessTagline}>{hero.wheel.synergyTagline}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
