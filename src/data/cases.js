import { getDictionary } from '../i18n/dictionaries/index.js'

const caseStructure = [
  {
    slug: 'huawei-leadership',
    featured: true,
    gradient: 'linear-gradient(160deg,#7C5CFC 0%,#4A2FBF 100%)',
    industryKey: 'tech',
    typeKey: 'leadership',
    relatedProducts: ['leadership'],
    solutionKeys: ['research', 'design', 'match', 'deliver', 'evaluate'],
    metricNums: {
      participants: '3000+',
      performance: '35%',
      satisfaction: '98%',
      countries: '12',
    },
  },
  {
    slug: 'tencent-digital',
    featured: false,
    gradient: 'linear-gradient(135deg,#00C2A8,#007A6B)',
    industryKey: 'internet',
    typeKey: 'digital',
    relatedProducts: ['skill-accelerator'],
    solutionKeys: ['research', 'design', 'match', 'deliver', 'evaluate'],
    metricNums: {
      participants: '5000',
      incubation: '60%',
      decision: '45%',
      satisfaction: '92%',
    },
  },
  {
    slug: 'retail-sales',
    featured: false,
    gradient: 'linear-gradient(135deg,#FF5FA0,#CC0055)',
    industryKey: 'retail',
    typeKey: 'sales',
    relatedProducts: ['skill-accelerator', 'custom'],
    solutionKeys: ['research', 'design', 'match', 'deliver', 'evaluate'],
    metricNums: {
      participants: '800',
      performance: '42%',
      satisfaction: '95%',
      repurchase: '28%',
    },
  },
]

export const caseIndustryKeys = ['all', 'tech', 'internet', 'retail', 'finance', 'manufacturing', 'logistics']

export const caseTypeKeys = ['all', 'leadership', 'digital', 'sales', 'culture']

export function getCases(locale) {
  const t = getDictionary(locale).data.cases
  return caseStructure.map((c) => {
    const ct = t[c.slug]
    return {
      ...c,
      title: ct.title,
      industry: t.filters.industry[c.industryKey],
      type: t.filters.type[c.typeKey],
      badge: ct.badge,
      shortDesc: ct.shortDesc,
      client: ct.client,
      period: ct.period,
      scale: ct.scale,
      background: ct.background,
      challenge: ct.challenge,
      solution: c.solutionKeys.map((key) => ct.solution[key]),
      metrics: Object.entries(ct.metrics).map(([key, label]) => ({
        num: c.metricNums[key],
        label,
      })),
      testimonial: ct.testimonial,
    }
  })
}

export function getCaseBySlug(slug, locale) {
  return getCases(locale).find((c) => c.slug === slug)
}
