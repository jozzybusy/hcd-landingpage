import { getDictionary } from '../i18n/dictionaries/index.js'

const valueKeys = ['customer', 'excellence', 'innovation', 'winwin']

const statsMeta = [
  { key: 'experience', num: { zh: '20年', en: '20+' } },
  { key: 'companies', num: '500+' },
  { key: 'lecturers', num: '200+' },
  { key: 'courses', num: '50+' },
]

export function getCompany(locale) {
  const c = getDictionary(locale).data.company
  return {
    name: c.name,
    mission: c.mission,
    vision: c.vision,
    values: valueKeys.map((key) => c.values[key]),
    story: c.story,
    timeline: Object.entries(c.timeline).map(([year, event]) => ({ year, event })),
    stats: statsMeta.map(({ key, num }) => ({
      num: typeof num === 'string' ? num : num[locale] ?? num.en,
      label: c.stats[key],
    })),
  }
}
