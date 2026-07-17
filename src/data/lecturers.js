import { getDictionary } from '../i18n/dictionaries/index.js'

const lecturerStructure = [
  {
    id: 1,
    avatar: 'linear-gradient(135deg,#7C5CFC,#4A2FB0)',
    photo: '/lecturers/julia.png',
  },
  {
    id: 2,
    avatar: 'linear-gradient(135deg,#00C2A8,#007A6B)',
    photo: '/lecturers/olive.png',
  },
  {
    id: 3,
    avatar: 'linear-gradient(135deg,#FF5FA0,#CC0055)',
    photo: '/lecturers/sandy.png',
  },
  {
    id: 4,
    avatar: 'linear-gradient(135deg,#FF6B35,#CC4400)',
    photo: '/lecturers/zhaogang.png',
  },
]

export function getLecturers(locale) {
  const items = getDictionary(locale).data.lecturers.items
  return items.map((item, index) => ({
    ...lecturerStructure[index],
    ...item,
  }))
}
