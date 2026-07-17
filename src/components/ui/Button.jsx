import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
