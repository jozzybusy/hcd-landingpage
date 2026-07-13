import { getDictionary } from '../i18n/dictionaries/index.js'

const courseStructure = [
  { bg: 'var(--purple)', textColor: 'var(--white)' },
  { bg: 'var(--teal)', textColor: 'var(--white)' },
  { bg: 'var(--pink)', textColor: 'var(--white)' },
  { bg: 'var(--orange)', textColor: 'var(--white)' },
  { bg: 'var(--green-yellow)', textColor: 'var(--black)' },
]

export function getCourses(locale) {
  const items = getDictionary(locale).data.courses.items
  return items.map((item, index) => ({
    ...item,
    ...courseStructure[index],
  }))
}
