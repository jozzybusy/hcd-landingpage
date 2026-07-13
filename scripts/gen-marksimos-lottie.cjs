/*
  Generator for the MarkSimos logo Lottie composition.

  Concept: "business operation = continuous running + adjustment + growth loop."
  A red system boundary (ring), a white KPI/data-flow trend line connecting
  three business-stage nodes, and a data pulse that circulates the network.

  Brief → Lottie-native mapping (primitives lottie-web renders reliably):
    Phase 1 Observation (0.0–1.0s)
      - logo fades up from low opacity, subtle zoom 0.9→1.0
      - the three nodes light up one by one (data awakening)
      - trend line draws in (trim path)
    Phase 2 Operation (1.0–2.5s)
      - data pulse begins circulating along the trend line (linear motion)
      - outer ring rotates slowly clockwise (a notch bead makes rotation read)
    Phase 3 Growth (2.5–3.7s)
      - graph group scales up slightly with an upward bias (ease-out-back)
      - nodes settle a touch larger (scaling effect)
    Phase 4 Optimization (3.7–4.9s)
      - the middle node re-routes (line + node micro-morph), smooth easing
    Phase 5 Stable Growth Loop (4.9–6.0s)
      - ring rotation settles, gentle breathing scale, pulse keeps circulating

  Timing: 30 fps, 180 frames (6.0 s).
  Seamless loop: the component plays [0,180] once, then loops the stable
  segment [150,180]. Every property that the loop touches (breathing scale,
  ring angle, pulse position) holds the SAME value at f150 and f180, so the
  loop is seamless. The pulse ping-pongs N1→N3→N1 on a 30-frame cycle that
  divides the timeline evenly, so it is mid-stream-continuous across the seam.
*/

const fs = require('fs')
const path = require('path')

const FR = 30
const OP = 180
const W = 1080
const H = 1080

// ── easing presets ───────────────────────────────────────────────
const EASE_INOUT = { o: { x: [0.45], y: [0] }, i: { x: [0.55], y: [1] } }
const EASE_OUT = { o: { x: [0.2], y: [0] }, i: { x: [0.4], y: [1] } }
const LINEAR = { o: { x: [0.5], y: [0.5] }, i: { x: [0.5], y: [0.5] } }
const OUT_BACK = { o: { x: [0.18], y: [0] }, i: { x: [0.32], y: [1.4] } } // ease-out-back

function anim(stops, ix) {
  const k = stops.map(([t, s, ease], idx) => {
    const valArr = Array.isArray(s) ? s : [s]
    if (idx === stops.length - 1) return { t, s: valArr }
    const e = ease || EASE_INOUT
    return { t, s: valArr, o: e.o, i: e.i }
  })
  return { a: 1, k, ix }
}
function val(v, ix) {
  return { a: 0, k: v, ix }
}

// ── palette ──────────────────────────────────────────────────────
const red = [1, 0.231, 0.188, 1] // #FF3B30
const redDeep = [0.8, 0.12, 0.09, 1] // shadow / depth
const white = [1, 1, 1, 1]
const grayText = [0.73, 0.73, 0.73, 1]

// ── geometry ─────────────────────────────────────────────────────
const cx = 540
const cy = 470 // logo sits slightly above center to leave room for wordmark
const discR = 250 // disc radius
const ringR = 270 // outer ring radius (boundary)

// three business-stage nodes (white), forming an upward trend line
const N1 = [410, 480] // start (low-left)
const N2_base = [540, 545] // mid valley
const N2_opt = [560, 560] // re-routed mid (optimization)
const N3 = [670, 350] // growth peak (up-right)

// ── shape helpers ────────────────────────────────────────────────
function fill(color, opacity = 100) {
  return { ty: 'fl', c: val(color, 1), o: val(opacity, 1), r: 1, nm: 'fill', mn: 'ADBE Vector Graphic - Fill' }
}
function stroke(color, w, opacity = 100) {
  return { ty: 'st', c: val(color, 1), o: val(opacity, 1), w: val(w, 1), lc: 2, lj: 2, nm: 'stroke', mn: 'ADBE Vector Graphic - Stroke' }
}
function ellipse(c, w, h) {
  return { ty: 'el', p: val(c, 3), s: val([w, h], 2), nm: 'ellipse', mn: 'ADBE Vector Shape - Ellipse' }
}
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
// open trend-line path through 3 points, with an animated middle vertex
function trendShape(midProp) {
  // straight segments → zero tangents
  const z = [0, 0]
  const ks = midProp
    ? {
        a: 1,
        k: [
          {
            t: 96, // phase 4 start
            s: [{ i: [z, z, z], o: [z, z, z], v: [N1, N2_base, N3], c: false }],
            o: EASE_INOUT.o,
            i: EASE_INOUT.i,
          },
          {
            t: 120,
            s: [{ i: [z, z, z], o: [z, z, z], v: [N1, N2_opt, N3], c: false }],
          },
        ],
      }
    : val({ i: [z, z, z], o: [z, z, z], v: [N1, N2_base, N3], c: false })
  return { ty: 'sh', ks, nm: 'trend', mn: 'ADBE Vector Shape - Group' }
}

const layers = []
let ind = 1

// 1) breathing parent null — whole logo zooms in then breathes on the loop
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
    p: val([cx, cy], 2),
    a: val([cx, cy], 2),
    s: anim(
      [
        [0, [90, 90], EASE_OUT], // phase 1 zoom-in
        [30, [100, 100], EASE_INOUT],
        [150, [100, 100], EASE_INOUT], // hold until loop window
        [165, [105, 105], EASE_INOUT], // gentle breath
        [180, [100, 100]], // seamless back to f150 value
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

// 2) graph null — line + nodes + pulse share the growth expansion (phase 3)
const GRAPH = ind++
layers.push({
  ddd: 0,
  ind: GRAPH,
  ty: 3,
  nm: 'graph-null',
  parent: BREATH,
  sr: 1,
  ks: {
    o: val(0, 1),
    r: val(0, 1),
    // upward growth bias: scale up + small rise, then settle (ease-out-back)
    p: anim(
      [
        [75, [cx, cy], EASE_INOUT],
        [96, [cx, cy - 14], OUT_BACK], // growth: stretch up slightly
        [150, [cx, cy - 6], EASE_INOUT], // settle
        [180, [cx, cy - 6]],
      ],
      2
    ),
    a: val([cx, cy], 2),
    s: anim(
      [
        [75, [100, 100], EASE_INOUT],
        [96, [105, 105], OUT_BACK], // growth expansion
        [150, [101, 101], EASE_INOUT], // settle into loop
        [180, [101, 101]],
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

// 3) depth shadow under the disc (simulate 3D, no raster)
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'disc-shadow',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[0, 0, EASE_OUT], [18, 38]], 11),
    r: val(0, 1),
    p: val([cx, cy + 26], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [group([ellipse([0, 0], discR * 2, discR * 2)], grTransform(), 'sh-g'), fill(redDeep, 100)],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 4) red disc (system body)
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'disc',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[0, 0, EASE_OUT], [20, 100]], 11),
    r: val(0, 1),
    p: val([cx, cy], 2),
    a: val([0, 0], 2),
    s: anim([[0, [92, 92], EASE_OUT], [20, [100, 100]]], 1),
  },
  ao: 0,
  shapes: [group([ellipse([0, 0], discR * 2, discR * 2)], grTransform(), 'disc-g'), fill(red)],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 5) outer ring (market boundary) — rotates clockwise, notch makes it read
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'ring',
  parent: BREATH,
  sr: 1,
  ks: {
    o: anim([[4, 0, EASE_OUT], [22, 100]], 11),
    // clockwise rotation through phases 2–4, then settles for the loop
    r: anim(
      [
        [30, 0, EASE_OUT],
        [150, 64, EASE_INOUT], // slows to a stop
        [180, 64], // held: seamless across loop seam
      ],
      1
    ),
    p: val([cx, cy], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [
    group([ellipse([0, 0], ringR * 2, ringR * 2)], grTransform(), 'ring-g'),
    stroke(red, 16, 100),
    // notch bead at 12 o'clock so the rotation is visible
    group([ellipse([0, -ringR, 0], 30, 30)], grTransform(), 'notch'),
    fill(white, 90),
  ],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 6) trend line (KPI / data flow) — draws in via trim, re-routes in phase 4
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'trend-line',
  parent: GRAPH,
  sr: 1,
  ks: {
    o: anim([[6, 0, EASE_OUT], [14, 100]], 11),
    r: val(0, 1),
    p: val([0, 0], 2),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [
    {
      ty: 'gr',
      nm: 'trend-g',
      np: 3,
      cix: 2,
      bm: 0,
      it: [
        trendShape(true),
        { ty: 'tm', s: val(0, 1), e: anim([[8, 0, EASE_OUT], [30, 100]], 2), o: val(0, 3), m: 1, nm: 'trim', mn: 'ADBE Vector Filter - Trim' },
        stroke(white, 14, 100),
        grTransform(),
      ],
    },
  ],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 7) three nodes — light up one by one (phase 1), grow slightly (phase 3)
const nodeStops = [
  { c: N1, lightFrom: 8 },
  { c: N2_base, lightFrom: 16 },
  { c: N3, lightFrom: 24 },
]
nodeStops.forEach((node, i) => {
  const isMid = i === 1
  layers.push({
    ddd: 0,
    ind: ind++,
    ty: 4,
    nm: `node-${i + 1}`,
    parent: GRAPH,
    sr: 1,
    ks: {
      o: anim([[node.lightFrom, 0, EASE_OUT], [node.lightFrom + 10, 100]], 11),
      r: val(0, 1),
      // mid node re-routes its position in phase 4
      p: isMid
        ? anim([[96, N2_base, EASE_INOUT], [120, N2_opt, EASE_INOUT], [180, N2_opt]], 2)
        : val(node.c, 2),
      a: val(node.c, 2),
      // light-up pop, then growth-phase enlargement that holds through the loop
      s: anim(
        [
          [node.lightFrom, [40, 40], EASE_OUT],
          [node.lightFrom + 10, [118, 118], EASE_INOUT],
          [node.lightFrom + 20, [100, 100], EASE_INOUT],
          [90, [100, 100], EASE_INOUT],
          [102, [112, 112], OUT_BACK], // growth "data hit"
          [150, [108, 108], EASE_INOUT],
          [180, [108, 108]],
        ],
        1
      ),
    },
    ao: 0,
    shapes: [group([ellipse(node.c, 46, 46)], grTransform(), 'node-g'), fill(white)],
    ip: 0,
    op: OP,
    st: 0,
    bm: 0,
  })
})

// 8) data pulse — circulates the trend line; ping-pongs N1→N3→N1 every 30f.
//    Glow disc + bright core. Position keyframes land on the loop seam exactly.
function pulseKeys() {
  const stops = []
  // begins moving at phase 2 (f30); cycle period 30f (N1→N3 = 15f, back = 15f)
  // produce keys from 30 to 180 inclusive so f150 and f180 are both N1.
  for (let t = 30; t <= 180; t += 15) {
    const phase = ((t - 30) / 15) % 2 // 0 at N1, 1 at N3
    const pos = phase === 0 ? N1 : N3
    stops.push([t, pos, LINEAR])
  }
  // last stop must not carry easing tangents
  stops[stops.length - 1] = [180, N1]
  return anim(stops, 2)
}
layers.push({
  ddd: 0,
  ind: ind++,
  ty: 4,
  nm: 'data-pulse',
  parent: GRAPH,
  sr: 1,
  ks: {
    o: anim([[28, 0, EASE_OUT], [34, 100], [150, 100], [180, 100]], 11),
    r: val(0, 1),
    p: pulseKeys(),
    a: val([0, 0], 2),
    s: val([100, 100], 1),
  },
  ao: 0,
  shapes: [
    group([ellipse([0, 0], 64, 64)], grTransform({ o: 35 }), 'glow'),
    group([ellipse([0, 0], 30, 30)], grTransform(), 'core'),
    fill(white),
  ],
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
})

// 9) wordmark — "Mark" (gray) + "Simos" (red), fade in at the final stage
function textLayer(index, nm, txt, color, justify, xAnchor) {
  return {
    ddd: 0,
    ind: index,
    ty: 5,
    nm,
    parent: BREATH,
    sr: 1,
    ks: {
      o: anim([[120, 0, EASE_OUT], [140, 100]], 11),
      r: val(0, 1),
      p: anim([[120, [xAnchor, 812], EASE_OUT], [140, [xAnchor, 806]]], 2),
      a: val([0, 0], 2),
      s: val([100, 100], 1),
    },
    ao: 0,
    t: {
      d: { k: [{ s: { s: 76, f: 'Arial-BoldMT', t: txt, j: justify, tr: 10, lh: 92, ls: 0, fc: [color[0], color[1], color[2]] }, t: 0 }] },
      p: {},
      m: { g: 1, a: val([0, 0], 2) },
      a: [],
    },
    ip: 0,
    op: OP,
    st: 0,
    bm: 0,
  }
}
layers.push(textLayer(ind++, 'word-mark', 'Mark', grayText, 2, cx - 8)) // right-justified
layers.push(textLayer(ind++, 'word-simos', 'Simos', red, 0, cx + 8)) // left-justified

const comp = {
  v: '5.7.4',
  fr: FR,
  ip: 0,
  op: OP,
  w: W,
  h: H,
  nm: 'MarkSimos-Logo',
  ddd: 0,
  assets: [],
  fonts: { list: [{ fName: 'Arial-BoldMT', fFamily: 'Arial', fStyle: 'Bold', ascent: 71.5 }] },
  layers,
}

const out = path.join(__dirname, '..', 'src', 'assets', 'marksimos-logo.json')
fs.writeFileSync(out, JSON.stringify(comp))
console.log('wrote', out, '(' + fs.statSync(out).size + ' bytes,', layers.length, 'layers)')
