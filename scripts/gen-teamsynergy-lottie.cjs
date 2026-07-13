/*
  Generator for the TeamSynergy logo Lottie composition.

  Brief → Lottie-native mapping (only primitives lottie-web renders reliably):
    - Circular badge softly fades in                         → disc layer opacity 0→100
    - Larger figure first, smaller figure delayed            → staggered opacity/scale in
    - Independent pulse → gradual sync → unison              → per-figure scale keyframes
                                                               that start out of phase and
                                                               converge by the sync frame
    - Sync highlight travels through both figures            → white highlight overlay pulse
    - Ring completes clockwise at the sync moment            → trim-path end 0→100
    - "TeamSynergy" wordmark reveals left→right              → text slides in from the left
                                                               under a left-anchored reveal
    - Blue light sweep crosses the text once                 → blue bar travels across, matted
                                                               to the text alpha
    - Holds with slow synchronized breathing, seamless loop  → parent null breathes on a sine
                                                               that returns to its start value
                                                               at the loop segment boundary

  Timing: 30 fps, 90 frames (3.0 s).
  Seamless loop: the component plays [0,90] once, then loops the breathing
  segment [66,90]; the breathing null scale is 100 at both f66 and f90.
*/

const fs = require('fs')
const path = require('path')

const FR = 30
const OP = 90
const W = 360
const H = 340

// ── easing presets ───────────────────────────────────────────────
const EASE = { o: { x: [0.33], y: [0] }, i: { x: [0.67], y: [1] } }
const EASE_OUT = { o: { x: [0.2], y: [0] }, i: { x: [0.4], y: [1] } }
const EASE_INOUT = { o: { x: [0.45], y: [0] }, i: { x: [0.55], y: [1] } }

// Build an animated property from [frame, value, ease?] tuples.
// value may be a number or an array.
function anim(stops, ix) {
  const k = stops.map(([t, s, ease], idx) => {
    const val = Array.isArray(s) ? s : [s]
    if (idx === stops.length - 1) return { t, s: val }
    const e = ease || EASE
    return { t, s: val, o: e.o, i: e.i }
  })
  return { a: 1, k, ix }
}

function val(v, ix) {
  return { a: 0, k: v, ix }
}

const teal = [0.0, 0.62, 0.55, 1] // figures / ring base
const tealLight = [0.0, 0.74, 0.66, 1] // smaller figure
const white = [1, 1, 1, 1]
const blue = [0.32, 0.62, 1, 1] // light sweep

// ── shape helpers ────────────────────────────────────────────────
function fill(color, opacity = 100, ix = 1) {
  return { ty: 'fl', c: val(color, 1), o: val(opacity, 1), r: 1, nm: 'fill', mn: 'ADBE Vector Graphic - Fill' }
}
function stroke(color, w, opacity = 100) {
  return {
    ty: 'st',
    c: val(color, 1),
    o: val(opacity, 1),
    w: val(w, 1),
    lc: 2,
    lj: 2,
    nm: 'stroke',
    mn: 'ADBE Vector Graphic - Stroke',
  }
}
function ellipse(cx, cy, w, h) {
  return { ty: 'el', p: val([cx, cy], 3), s: val([w, h], 2), nm: 'ellipse', mn: 'ADBE Vector Shape - Ellipse' }
}
// group transform (local). s/p may be animated props or plain arrays
function grTransform({ p = [0, 0], a = [0, 0], s = [100, 100], o = 100, r = 0 } = {}) {
  return {
    ty: 'tr',
    p: Array.isArray(p) ? val(p, 2) : p,
    a: val(a, 2),
    s: Array.isArray(s) ? val(s, 2) : s,
    r: typeof r === 'number' ? val(r, 1) : r,
    o: typeof o === 'number' ? val(o, 1) : o,
    sk: val(0, 1),
    sa: val(0, 1),
    nm: 'tr',
  }
}
function group(items, transform, nm = 'group') {
  return { ty: 'gr', it: [...items, transform], nm, np: items.length, cix: 2, bm: 0 }
}

// Abstract person: head ellipse + shoulders/torso path. Local origin at figure center.
function bodyPath() {
  // shoulder mound, drawn around local origin (head sits above)
  const v = [
    [-23, 30],
    [-14, 0],
    [0, -7],
    [14, 0],
    [23, 30],
  ]
  const i = [
    [0, 0],
    [-4, 7],
    [-7, 0],
    [4, -7],
    [0, 0],
  ]
  const o = [
    [0, 0],
    [4, -7],
    [7, 0],
    [-4, 7],
    [0, 0],
  ]
  return { ty: 'sh', ks: val({ i, o, v, c: true }), nm: 'body', mn: 'ADBE Vector Shape - Group' }
}

function figure(color) {
  // head + body, grouped; transform animated by caller via outer group
  const head = group([ellipse(0, -22, 30, 30)], grTransform(), 'head')
  const body = group([bodyPath()], grTransform({ p: [0, 4] }), 'torso')
  return [body, head, fill(color)]
}

// ── layers ───────────────────────────────────────────────────────
const layers = []
let ind = 1

// 1) breathing parent null — whole logo breathes in unison on the hold.
//    scale 100 at f0..f66, gentle sine 100→103→100 over f66..f90 (seamless at boundary)
const BREATH = ind++
layers.push({
  ddd: 0,
  ind: BREATH,
  ty: 3,
  nm: 'breath-null',
  sr: 1,
  ks: {
    o: val(0, 1),
    r: val(0, 1),
    p: val([W / 2, H / 2], 2),
    a: val([W / 2, H / 2], 2),
    s: anim(
      [
        [0, [100, 100], EASE_INOUT],
        [66, [100, 100], EASE_INOUT],
        [78, [103, 103], EASE_INOUT],
        [90, [100, 100]],
      ],
      1
    ),
  },
  ao: 0,
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

const badgeCx = W / 2
const badgeCy = 135

// 2) white circular badge disc — soft fade in
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'badge-disc',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[0, 0, EASE_OUT], [16, 100]], 11),
    r: val(0, 1),
    p: val([badgeCx, badgeCy], 2),
    a: val([0, 0], 2),
    s: anim([[0, [88, 88], EASE_OUT], [16, [100, 100]]], 1),
  },
  ao: 0,
  shapes: [group([ellipse(0, 0, 176, 176)], grTransform(), 'disc-g'), fill(white)],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 3) larger figure — appears first; pulses, converges to sync
const figA = figure(teal)
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'figure-large',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[6, 0, EASE_OUT], [20, 100]], 11),
    r: val(0, 1),
    p: val([badgeCx - 22, badgeCy + 2], 2),
    a: val([0, 0], 2),
    // independent pulse (slow rhythm) → converge → unison breathing handoff
    s: anim(
      [
        [6, [60, 60], EASE_OUT],
        [20, [104, 104], EASE_INOUT],
        [30, [96, 96], EASE_INOUT], // independent dip
        [42, [103, 103], EASE_INOUT],
        [54, [100, 100], EASE_INOUT], // synchronized
        [66, [100, 100]],
      ],
      1
    ),
  },
  ao: 0,
  shapes: figA,
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 4) smaller figure — delayed; faster independent rhythm → converges to same sync frame
const figB = figure(tealLight)
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'figure-small',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[14, 0, EASE_OUT], [28, 100]], 11),
    r: val(0, 1),
    p: val([badgeCx + 26, badgeCy + 14], 2),
    a: val([0, 0], 2),
    s: anim(
      [
        [14, [50, 50], EASE_OUT],
        [26, [98, 98], EASE_INOUT],
        [33, [86, 86], EASE_INOUT], // out-of-phase dip (different rhythm)
        [40, [99, 99], EASE_INOUT],
        [47, [90, 90], EASE_INOUT],
        [54, [88, 88], EASE_INOUT], // synchronized (its own smaller baseline)
        [66, [88, 88]],
      ],
      1
    ),
  },
  ao: 0,
  shapes: figB,
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 5) sync highlight — soft white pulse that travels through the figures at the sync moment
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'sync-highlight',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim(
      [
        [48, 0, EASE_OUT],
        [56, 55, EASE_INOUT],
        [66, 0],
      ],
      11
    ),
    r: val(0, 1),
    p: anim(
      [
        [48, [badgeCx - 30, badgeCy], EASE_INOUT],
        [60, [badgeCx + 34, badgeCy + 8]],
      ],
      2
    ),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [group([ellipse(0, 0, 70, 70)], grTransform(), 'hl'), fill(white)],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 6) ring — completes clockwise via trim path at the sync moment
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'ring',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[40, 0, EASE_OUT], [46, 100]], 11),
    r: val(0, 1),
    p: val([badgeCx, badgeCy], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [
    {
      ty: 'gr',
      nm: 'ring-g',
      np: 3,
      cix: 2,
      bm: 0,
      it: [
        ellipse(0, 0, 168, 168),
        // trim from top, clockwise, 0→100
        {
          ty: 'tm',
          s: val(0, 1),
          e: anim([[44, 0, EASE_OUT], [60, 100]], 2),
          o: val(-90, 3), // start at 12 o'clock
          m: 1,
          nm: 'trim',
          mn: 'ADBE Vector Filter - Trim',
        },
        stroke(teal, 5, 100),
        grTransform(),
      ],
    },
  ],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

const textBaseY = 268

// 7) blue light sweep bar — matted to the wordmark (drawn above text layer, ty matte 1=alpha)
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'text-sweep',
  parent: BREATH,
  td: 1, // this layer is a track matte for the next layer
  sr: 1,
  ks: {
    o: anim([[66, 0, EASE_OUT], [70, 100, EASE_INOUT], [80, 100, EASE_INOUT], [84, 0]], 11),
    r: val(0, 1),
    // travels left → right across the wordmark band
    p: anim([[66, [40, textBaseY - 6], EASE_INOUT], [84, [320, textBaseY - 6]]], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [group([{ ty: 'rc', p: val([0, 0], 2), s: val([46, 44], 2), r: val(8, 1), nm: 'rect' }], grTransform(), 'sweep-g'), fill(blue)],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 8) wordmark sweep target — white duplicate that the blue bar mattes over (tt:1 alpha matte)
layers.push(textLayer(ind++, 'TeamSynergy-sweep', blue, true))

// 9) wordmark — reveals left → right (slides in from left under a reveal mask)
layers.push(textLayer(ind++, 'TeamSynergy', white, false))

function textLayer(index, nm, color, isMatteTarget) {
  const ks = {
    o: anim([[56, 0, EASE_OUT], [64, 100]], 11),
    r: val(0, 1),
    p: anim([[56, [180 - 26, textBaseY], EASE_OUT], [70, [180, textBaseY]]], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  }
  const layer = {
    ddd: 0,
    ind: index,
    ty: 5,
    nm,
    parent: BREATH,
    sr: 1,
    ks,
    ao: 0,
    t: {
      d: {
        k: [
          {
            s: {
              s: 27,
              f: 'Arial-BoldMT',
              t: 'TeamSynergy',
              j: 2, // center
              tr: 8,
              lh: 33,
              ls: 0,
              fc: [color[0], color[1], color[2]],
            },
            t: 0,
          },
        ],
      },
      p: {},
      m: { g: 1, a: val([0, 0], 2) },
      a: [],
    },
    ip: 0,
    op: OP,
    st: 0,
    bm: 0,
  }
  if (isMatteTarget) layer.tt = 1 // alpha matte from the sweep layer above
  return layer
}

const comp = {
  v: '5.7.4',
  fr: FR,
  ip: 0,
  op: OP,
  w: W,
  h: H,
  nm: 'TeamSynergy-Logo',
  ddd: 0,
  assets: [],
  fonts: {
    list: [
      { fName: 'Arial-BoldMT', fFamily: 'Arial', fStyle: 'Bold', ascent: 71.5 },
    ],
  },
  layers,
}

const out = path.join(__dirname, '..', 'src', 'assets', 'teamsynergy-logo.json')
fs.writeFileSync(out, JSON.stringify(comp))
console.log('wrote', out, '(' + fs.statSync(out).size + ' bytes,', layers.length, 'layers)')
