import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationDataRaw from '../../assets/online-teaching.json'

function deepClone(obj) {
  if (typeof structuredClone === 'function') return structuredClone(obj)
  return JSON.parse(JSON.stringify(obj))
}

function OnlineTeachingLottie() {
  const containerRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let anim = null
    try {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: deepClone(animationDataRaw),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      })
    } catch (err) {
      console.error('[OnlineTeachingLottie] loadAnimation failed:', err)
      return
    }

    animRef.current = anim

    return () => {
      try {
        anim.destroy()
      } catch (_) {}
      animRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}

export default OnlineTeachingLottie
