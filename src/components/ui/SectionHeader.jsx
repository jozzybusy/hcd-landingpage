import styles from './SectionHeader.module.css'
import Reveal from '../shared/Reveal.jsx'

function SectionHeader({ label, title, desc, align = 'center', variant = 'default', descClassName = '', titleClassName = '', headerClassName = '' }) {
  return (
    <Reveal className={`${styles.header} ${styles[align]} ${headerClassName}`}>
      {label && (
        <p className={`${styles.label} ${styles[variant]}`}>{label}</p>
      )}
      <h2 className={`section-title ${styles.title} ${styles[variant]} ${titleClassName}`}>{title}</h2>
      {desc && (
        <p className={`${styles.desc} ${styles[variant]} ${descClassName}`}>{desc}</p>
      )}
    </Reveal>
  )
}

export default SectionHeader
