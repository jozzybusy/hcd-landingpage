import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationDataRaw from '../../assets/changeman-transform.json'

/*
  Production Lottie integration for the ChangeMan animation.

  Robustness notes:
  - lottie-web mutates the `animationData` object it receives. Because the JSON
    is imported as a module-level singleton, StrictMode's double-mount (dev) and
    any future re-mount would reuse an already-mutated object, producing a blank
    or broken render. We deep-clone on every mount so each load gets a fresh copy.
  - loadAnimation is wrapped in try/catch so a render failure can never crash the
    surrounding React tree (which would blank the whole page).
*/

function deepClone(obj) {
  if (typeof structuredClone === 'function') return structuredClone(obj)
  return JSON.parse(JSON.stringify(obj))
}

function ChangeManLottie() {
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
      console.error('[ChangeManLottie] loadAnimation failed:', err)
      return
    }

    animRef.current = anim

    // Register for HyperFrames runtime seek control
    window.__hfLottie = window.__hfLottie || []
    window.__hfLottie.push(anim)

    return () => {
      try {
        anim && anim.destroy()
      } catch (_) {}
      animRef.current = null
      if (window.__hfLottie) {
        window.__hfLottie = window.__hfLottie.filter((a) => a !== anim)
      }
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

export default ChangeManLottie
