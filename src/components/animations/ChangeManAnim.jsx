import styles from './ChangeManAnim.module.css'

/*
  ChangeMan logo animation — SVG/CSS implementation.

  Narrative (3 s seamless loop):
  1. Circular emblem fades in as a stable shape.
  2. Three abstract human figures appear slightly disconnected and move independently.
  3. A smooth wave of transformation travels through the figures left-to-right.
  4. The figures reshape and synchronize; the central figure gently expands upward.
  5. The outer circular ring draws itself around the symbol.
  6. The "ChangeMan" wordmark reveals from left to right.
  7. The purple "Man" part appears slightly after "Change".
  8. A soft light sweep passes through the wordmark and settles into the final logo.

  Motion:
  - Modern, professional, human-centered, premium corporate branding.
  - Cubic-bezier easing, no camera movement, no particles, no distortion.
  - Original proportions and typography preserved.
*/

function ChangeManAnim() {
  return (
    <div className={styles.wrap} aria-label="ChangeMan logo animation">
      <svg
        className={styles.svg}
        viewBox="0 0 360 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          {/* Soft radial glow behind the emblem */}
          <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#7C5CFC" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
          </radialGradient>

          {/* Light sweep gradient for the wordmark */}
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Clip paths for left-to-right wordmark reveals */}
          <clipPath id="clipChange">
            <rect className={styles.clipChange} x="55" y="218" width="0" height="42" />
          </clipPath>
          <clipPath id="clipMan">
            <rect className={styles.clipMan} x="225" y="218" width="0" height="42" />
          </clipPath>
          <clipPath id="clipRegistered">
            <rect className={styles.clipRegistered} x="335" y="218" width="0" height="24" />
          </clipPath>
        </defs>

        {/* Background glow disc */}
        <circle
          className={styles.glow}
          cx="180"
          cy="110"
          r="96"
          fill="url(#emblemGlow)"
        />

        {/* Emblem: purple disc + white ring */}
        <g className={styles.emblem}>
          <circle
            className={styles.disc}
            cx="180"
            cy="110"
            r="90"
            fill="#7C5CFC"
          />
          <circle
            className={styles.ring}
            cx="180"
            cy="110"
            r="82"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        {/* Three abstract human figures */}
        <g className={styles.figures}>
          {/* Central figure */}
          <g className={styles.figureCenter}>
            <path
              className={styles.bodyCenter}
              d="M180 86 L180 150"
              stroke="#FFFFFF"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <circle
              className={styles.headCenter}
              cx="180"
              cy="68"
              r="20"
              fill="#FFFFFF"
            />
          </g>

          {/* Left figure */}
          <g className={styles.figureLeft}>
            <path
              className={styles.bodyLeft}
              d="M128 118 L164 154"
              stroke="#FFFFFF"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <circle
              className={styles.headLeft}
              cx="122"
              cy="110"
              r="17"
              fill="#FFFFFF"
            />
          </g>

          {/* Right figure */}
          <g className={styles.figureRight}>
            <path
              className={styles.bodyRight}
              d="M232 118 L196 154"
              stroke="#FFFFFF"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <circle
              className={styles.headRight}
              cx="238"
              cy="110"
              r="17"
              fill="#FFFFFF"
            />
          </g>
        </g>

        {/* Wordmark */}
        <g className={styles.wordmark}>
          {/* Light backdrop so the wordmark stays legible on any background */}
          <rect
            className={styles.wordmarkBg}
            x="42"
            y="208"
            width="310"
            height="54"
            rx="14"
            fill="#FFFFFF"
          />
          <text className={styles.wordChange} x="55" y="250" clipPath="url(#clipChange)">
            Change
          </text>
          <text className={styles.wordMan} x="225" y="250" clipPath="url(#clipMan)">
            Man
          </text>
          <text className={styles.registered} x="335" y="232" clipPath="url(#clipRegistered)">
            ®
          </text>
        </g>

        {/* Soft light sweep over the wordmark */}
        <rect
          className={styles.lightSweep}
          x="30"
          y="215"
          width="48"
          height="50"
          fill="url(#sweepGrad)"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>
    </div>
  )
}

export default ChangeManAnim
