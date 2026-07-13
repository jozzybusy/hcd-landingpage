import { motion } from 'framer-motion'

function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.12 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
