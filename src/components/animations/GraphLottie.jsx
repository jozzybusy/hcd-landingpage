import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationDataRaw from '../../assets/graph-lottie.json'

/*
  Graph Lottie animation for the "效果可量化" card.

  Asset extracted from public/Graph Lottie Animation.lottie.
  Plays once on mount, then loops the closing hold segment for a
  seamless idle state.

  Robustness (mirrors ChangeManLottie / MarkSimosLottie):
  - lottie-web mutates animationData and the JSON is a module singleton,
    so we deep-clone on every mount.
  - loadAnimation is wrapped in try/catch so a render failure can't crash
    the surrounding React tree.
*/

const HOLD_LOOP = [180, 229] // closing hold — frames that loop seamlessly

function deepClone(obj) {
  if (typeof structuredClone === 'function') return structuredClone(obj)
  return JSON.parse(JSON.stringify(obj))
}

function GraphLottie() {
  const containerRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    let anim = null
    try {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: deepClone(animationDataRaw),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      })
    } catch (err) {
      console.error('[GraphLottie] loadAnimation failed:', err)
      return
    }

    animRef.current = anim

    // After the intro completes, loop only the closing hold for a
    // seamless idle state.
    const onComplete = () => {
      try {
        anim.loop = true
        anim.playSegments(HOLD_LOOP, true)
      } catch (_) {}
    }
    anim.addEventListener('complete', onComplete)

    // Register for HyperFrames runtime seek control
    window.__hfLottie = window.__hfLottie || []
    window.__hfLottie.push(anim)

    return () => {
      try {
        anim.removeEventListener('complete', onComplete)
        anim.destroy()
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

export default GraphLottie
