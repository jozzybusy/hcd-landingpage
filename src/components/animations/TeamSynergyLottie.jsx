import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationDataRaw from '../../assets/teamsynergy-logo.json'

/*
  TeamSynergy logo reveal (Lottie).

  Sequence (30 fps, 90 frames / 3.0 s):
    0.0s  circular badge softly fades in
    0.2s  larger figure appears, then the smaller figure (delayed)
    0.2–1.8s  both figures pulse independently at different rhythms,
              gradually synchronizing into unison
    ~1.8s  sync highlight travels through both figures; teal ring
           completes clockwise
    1.9s   "TeamSynergy" wordmark reveals left → right
    2.2s   blue light sweep crosses the wordmark once
    2.2s+  holds with a slow synchronized breathing loop

  Playback: the intro [0,90] plays once; afterwards only the breathing
  hold segment loops, so the breathing is the seamless loop (its scale
  returns to its start value at the segment boundary).

  Robustness (mirrors ChangeManLottie):
  - lottie-web mutates the animationData object, and the JSON is a module
    singleton, so we deep-clone on every mount.
  - loadAnimation is wrapped in try/catch so a render failure can't crash
    the surrounding React tree.
*/

const HOLD_LOOP = [66, 90] // breathing hold — frames that loop seamlessly

function deepClone(obj) {
  if (typeof structuredClone === 'function') return structuredClone(obj)
  return JSON.parse(JSON.stringify(obj))
}

function TeamSynergyLottie() {
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
      console.error('[TeamSynergyLottie] loadAnimation failed:', err)
      return
    }

    animRef.current = anim

    // After the intro completes, loop only the breathing hold for a
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

export default TeamSynergyLottie
