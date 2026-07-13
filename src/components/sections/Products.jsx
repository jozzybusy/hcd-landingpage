import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useI18n } from '../../i18n/useI18n.js'
import { getProducts } from '../../data/products.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../shared/Reveal.jsx'
import styles from './Products.module.css'

const tagColors = {
  teal: { bg: '#C8F5F0', color: '#006B5E' },
  yellow: { bg: '#FFF0CC', color: '#996600' },
  pink: { bg: '#FFE8F0', color: '#990040' },
}

// Product logo images (public/), aligned to product index.
const productLogos = [
  { src: '/hcd-logo-01.png', altZh: '组织变革', altEn: 'Change Leadership' },
  { src: '/hcd-logo-02.png', altZh: '商战模拟', altEn: 'Business War Game' },
  { src: '/hcd-logo-07.png', altZh: '团队协同', altEn: 'Team Synergy' },
]

function Products() {
  const { locale, t } = useI18n()
  const products = useMemo(() => getProducts(locale), [locale])
  const { sections, common } = t

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <SectionHeader
          label={sections.products.label}
          title={sections.products.title}
          desc={sections.products.desc}
          descClassName={styles.descNowrap}
        />
        <Reveal className={styles.grid}>
          {products.map((product, index) => {
            const tagColor = tagColors[product.tagColor]
            const logoAlt = locale === 'zh' ? productLogos[index].altZh : productLogos[index].altEn
            return (
              <div key={product.slug} className={styles.card}>
                <div className={styles.thumb}>
                  <img
                    className={styles.thumbLogo}
                    src={productLogos[index].src}
                    alt={logoAlt}
                    loading="lazy"
                  />
                </div>
                <div className={styles.body}>
                  <span
                    className={styles.tag}
                    style={{ background: tagColor.bg, color: tagColor.color }}
                  >
                    {product.tag}
                  </span>
                  <h3>{product.name}</h3>
                  <p>{product.shortDesc}</p>
                  <Link to={`/products/${product.slug}`} className={styles.link}>
                    {common.learnMore}
                  </Link>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Products
