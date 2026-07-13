import styles from './MarkSimosAnim.module.css'

/*
  MarkSimos Logo Reveal Animation
  ───────────────────────────────
  Sequence:
    1. Red disc flips in and fixes (0.0–0.5 s)
    2. Single white M-shaped trend line draws rapidly (0.3–0.9 s)
    3. Three nodes form at line joints / endpoints and slightly enlarge,
       synced to the drawing pen (0.3–0.9 s staggered)
    4. "MarkSimos" trademark text appears below the circle (0.9–1.3 s)
    5. Hold as complete logo, then seamless loop (1.3–5.0 s)

  fps: 30
  Loop: 5 s
  Renderer: SVG + CSS keyframes
*/

function MarkSimosAnim() {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft radial glow behind the logo */}
          <radialGradient
            id="msGlow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#FF3B30" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle
          className={styles.glow}
          cx="100"
          cy="80"
          r="80"
          fill="url(#msGlow)"
        />

        {/* Red circular base — flips in, holds, flips out */}
        <g className={styles.discGroup}>
          {/* Outer ring */}
          <circle
            cx="100"
            cy="80"
            r="61"
            fill="none"
            stroke="#FF3B30"
            strokeWidth="4"
          />
          {/* Inner disc */}
          <circle
            cx="100"
            cy="80"
            r="55"
            fill="#FF3B30"
          />
        </g>

        {/* Single continuous white M-shaped trend line — draw animation */}
        <path
          className={styles.line}
          d="M68,95 L100,108 L132,55"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Three nodes at line joints / endpoints — form and slightly enlarge */}
        <circle
          className={`${styles.dot} ${styles.dot1}`}
          cx="68"
          cy="95"
          r="6"
          fill="white"
        />
        <circle
          className={`${styles.dot} ${styles.dot2}`}
          cx="100"
          cy="108"
          r="6"
          fill="white"
        />
        <circle
          className={`${styles.dot} ${styles.dot3}`}
          cx="132"
          cy="55"
          r="6"
          fill="white"
        />

        {/* Wordmark — fade in below the circle */}
        <g className={styles.text}>
          <text
            x="99"
            y="158"
            textAnchor="end"
            fill="#BBBBBB"
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Mark
          </text>
          <text
            x="101"
            y="158"
            textAnchor="start"
            fill="#FF3B30"
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Simos
          </text>
        </g>
      </svg>
    </div>
  )
}

export default MarkSimosAnim
