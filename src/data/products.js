import { getDictionary } from '../i18n/dictionaries/index.js'

const productStructure = [
  {
    slug: 'leadership',
    tagColor: 'teal',
    gradient: 'linear-gradient(135deg,#7C5CFC,#5A3FC0)',
    metricsKeys: [
      { num: '3000+', labelKey: 'managers' },
      { num: '35%', labelKey: 'performance' },
      { num: '98%', labelKey: 'satisfaction' },
    ],
    moduleKeys: ['strategy', 'team', 'business', 'sandbox'],
    painCardKeys: ['gap', 'execution', 'collaboration', 'talent'],
  },
  {
    slug: 'custom',
    tagColor: 'yellow',
    gradient: 'linear-gradient(135deg,#00C2A8,#009688)',
    metricsKeys: [
      { num: '200+', labelKey: 'projects' },
      { num: '95%', labelKey: 'retention' },
      { num: '4.9/5', labelKey: 'rating' },
    ],
    moduleKeys: ['research', 'design', 'develop', 'deliver'],
    painCardKeys: ['gap', 'execution', 'collaboration', 'talent'],
  },
  {
    slug: 'skill-accelerator',
    tagColor: 'pink',
    gradient: 'linear-gradient(135deg,#FF5FA0,#E0005A)',
    metricsKeys: [
      { num: '5000+', labelKey: 'trainees' },
      { num: '42%', labelKey: 'performance' },
      { num: '60%', labelKey: 'efficiency' },
    ],
    moduleKeys: ['digital', 'sales', 'innovation', 'report'],
    painCardKeys: ['gap', 'execution', 'collaboration', 'talent'],
  },
]

export function getProducts(locale) {
  const t = getDictionary(locale).data.products
  return productStructure.map((p) => {
    const pt = t[p.slug]
    return {
      ...p,
      name: pt.name,
      tag: pt.tag,
      shortDesc: pt.shortDesc,
      fullDesc: pt.fullDesc,
      duration: pt.duration,
      audience: pt.audience,
      metrics: p.metricsKeys.map((m) => ({
        num: m.num,
        label: pt.metrics[m.labelKey],
      })),
      modules: p.moduleKeys.map((key) => pt.modules[key]),
    }
  })
}

export function getProductBySlug(slug, locale) {
  return getProducts(locale).find((p) => p.slug === slug)
}
