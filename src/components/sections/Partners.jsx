import { useMemo } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import LogoLoop from '../ui/LogoLoop.jsx'
import styles from './Partners.module.css'

const partnerLogoPaths = [
  { src: '/partners/alibb.png', altZh: '阿里巴巴', altEn: 'Alibaba' },
  { src: '/partners/tx.png', altZh: '腾讯', altEn: 'Tencent' },
  { src: '/partners/zjtd.png', altZh: '字节跳动', altEn: 'ByteDance' },
  { src: '/partners/jd.png', altZh: '京东', altEn: 'JD.com' },
  { src: '/partners/bd.png', altZh: '百度', altEn: 'Baidu' },
  { src: '/partners/xc.png', altZh: '携程', altEn: 'Trip.com' },
  { src: '/partners/zh.png', altZh: '知乎', altEn: 'Zhihu' },
  { src: '/partners/qinghua.png', altZh: '清华大学', altEn: 'Tsinghua University' },
  { src: '/partners/fudan.png', altZh: '复旦大学', altEn: 'Fudan University' },
  { src: '/partners/ceibs.png', altZh: '中欧国际工商学院', altEn: 'CEIBS' },
  { src: '/partners/shcjdx.png', altZh: '上海财经大学', altEn: 'SUFE' },
  { src: '/partners/zhongyangcaijin.png', altZh: '中央财经大学', altEn: 'CUFE' },
  { src: '/partners/hzkjdx.png', altZh: '华中科技大学', altEn: 'HUST' },
]

function Partners() {
  const { locale, t } = useI18n()
  const { sections } = t
  const s = sections.partners

  const partnerLogos = useMemo(
    () =>
      partnerLogoPaths.map((item) => ({
        src: item.src,
        alt: locale === 'zh' ? item.altZh : item.altEn,
      })),
    [locale]
  )

  return (
    <section id="partners" className={styles.partners}>
      <div className="container">
        <SectionHeader
          label={s.label}
          title={s.title}
          desc={s.desc}
          descClassName={styles.descNowrap}
        />
        <Reveal className={styles.loopWrapper}>
          <LogoLoop
            logos={partnerLogos}
            speed={80}
            direction="left"
            logoHeight={80}
            gap={24}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel={s.ariaLabel}
          />
        </Reveal>
      </div>
    </section>
  )
}

export default Partners
