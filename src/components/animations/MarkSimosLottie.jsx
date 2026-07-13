import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationDataRaw from '../../assets/marksimos-logo.json'

/*
  MarkSimos logo — "business as a living system" (Lottie).

  5-phase narrative (30 fps, 180 frames / 6.0 s):
    Phase 1 Observation   0.0–1.0s  logo fades up, zoom 0.9→1.0, nodes light up
                                     one by one, trend line draws in
    Phase 2 Operation     1.0–2.5s  data pulse circulates the line; ring rotates
                                     slowly clockwise (notch makes it read)
    Phase 3 Growth        2.5–3.7s  graph scales up with upward bias; nodes grow
    Phase 4 Optimization  3.7–4.9s  middle node re-routes with smooth easing
    Phase 5 Stable loop   4.9–6.0s  ring settles, gentle breathing, pulse keeps
                                     circulating

  Playback: the full narrative [0,180] plays once; afterwards only the stable
  segment loops, so the idle state is the "sustainable growth loop." Breathing
  scale, ring angle, and pulse position all hold the same value at the segment
  boundary, so the loop is seamless.

  Robustness (mirrors ChangeManLottie / TeamSynergyLottie):
  - lottie-web mutates animationData and the JSON is a module singleton, so we
    deep-clone on every mount.
  - loadAnimation is wrapped in try/catch so a render failure can't crash the
    surrounding React tree.
*/

const STABLE_LOOP = [150, 180] // sustainable growth loop — seamless segment

function deepClone(obj) {
  if (typeof structuredClone === 'function') return structuredClone(obj)
  return JSON.parse(JSON.stringify(obj))
}

function MarkSimosLottie() {
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
      console.error('[MarkSimosLottie] loadAnimation failed:', err)
      return
    }

    animRef.current = anim

    // After the narrative completes, loop only the stable growth segment.
    const onComplete = () => {
      try {
        anim.loop = true
        anim.playSegments(STABLE_LOOP, true)
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

export default MarkSimosLottie
