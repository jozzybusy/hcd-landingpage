# MarkSimos Lottie Animation — Motion Design Brief

## Overview

Create a production-ready Lottie JSON animation for the **MarkSimos** brand logo. The animation must express the concept of **business operation, data-driven growth, and continuous optimization** through a narrative of system evolution, data circulation, and iterative refinement.

**Core Idea:** 经营 = 持续运行 + 调整 + 增长闭环. A living system evolves through data flow, market feedback, and iterative optimization.

---

## Source Assets

**Logo Reference:** `public/MarkSimos_立体Logo.png`

**Logo Anatomy:**
- **Outer Boundary:** Circular ring in red gradient (#FF3B30 family) with subtle 3D bevel.
- **Inner Disc:** Solid red circular disc filling the ring interior.
- **Inner Figure:** Three white circular nodes connected by white strokes forming an upward-trending growth chart / "M" shape:
  - Left node: lower-left position
  - Center node: slightly below center
  - Right node: upper-right position
- **Wordmark:** "Mark" in silver/grey, "Simos" in red, with ® symbol.

**Brand Palette:**
- Primary Red: `#FF3B30`
- Deep Red: `#E03025`
- White: `#FFFFFF`
- Grey/Silver: `#BBBBBB`
- Accent Glow: `rgba(255, 59, 48, 0.35)` (soft red bloom)

---

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Canvas Size | 1080 × 1080 px |
| Frame Rate | 30 fps |
| Duration | 6.0 s (180 frames) |
| Background | Transparent |
| Output Format | Lottie JSON (Bodymovin / LottieFiles plugin) |
| Renderer | SVG |
| Loop | Seamless infinite loop |
| Constraints | Pure vector shapes only. No raster images, no external assets. |

---

## Animation Narrative (5 Phases)

### Phase 1 — Observation (System Initialization)
**Frames:** 0–30 (0.0–1.0 s)  
**Mood:** Calm, scanning, baseline establishment.

- Logo group fades in from **0 % → 100 % opacity**.
- Subtle zoom-in: scale **0.9 → 1.0** with ease-out.
- Inner nodes appear sequentially with scale **0 → 1** and slight overshoot:
  - Node 1 (left): frames 0–18
  - Node 2 (center): frames 9–24
  - Node 3 (right): frames 15–30
- Outer ring is visible but static.
- Glow: **0 % opacity**.

**Represents:** market scanning / baseline establishment.

---

### Phase 2 — Operation (Business Running State)
**Frames:** 30–75 (1.0–2.5 s)  
**Mood:** Active, rhythmic, data circulation.

- **Data flow begins:** animated dash traveling along connection strokes (left→center→right).
- **Outer ring** starts slow clockwise rotation: **0° → 30°** over the phase.
- **Glow** fades in to **30 % opacity** — soft red radial bloom behind the logo.
- Nodes remain at rest size but receive subtle ambient pulse.
- Connection stroke opacity stays high (**90–100 %**).

**Represents:** active business operations / data circulation.

---

### Phase 3 — Growth (Performance Expansion)
**Frames:** 75–111 (2.5–3.7 s)  
**Mood:** Expansion, acceleration, upward momentum.

- **Nodes expand** when "data hits": scale **1.0 → 1.35 → 1.0** with ease-out-back, staggered:
  - Node 1 pulse: frames 75–87
  - Node 2 pulse: frames 81–93
  - Node 3 pulse: frames 87–99
- **Inner content group** scales outward: **1.0 → 1.05** (subtle growth vector).
- **Outer ring** scales to **1.08×** (system expansion).
- **Glow** peaks at **45 % opacity**.
- Connection strokes elongate slightly (scale 1.02× along axis).

**Represents:** revenue growth and scaling effect.

---

### Phase 4 — Optimization (System Adjustment)
**Frames:** 111–147 (3.7–4.9 s)  
**Mood:** Refinement, correction, intelligent rerouting.

- **Connection network** subtly re-routes:
  - Inefficient paths dim to **60 % opacity**.
  - Optimized paths brighten back to **100 % opacity**.
  - Use micro-morphing of path endpoints (±3 px shift) to suggest route correction.
- **Glow** settles from 45 % → **25 % opacity**.
- **Ring scale** returns to **1.0**.
- **Content group scale** returns to **1.0** with smooth ease-in-out.
- Nodes settle to rest size.

**Represents:** business optimization / strategy refinement.

---

### Phase 5 — Stable Growth Loop (Final State)
**Frames:** 147–180 (4.9–6.0 s)  
**Mood:** Sustainable, balanced, living system.

- All elements settle into a **stable but dynamic loop**.
- **Continuous data pulse** circulating through network (dash animation continues).
- **Outer ring** rotation continues at constant velocity (30° → 60° cumulative).
- **Breathing motion:** entire logo group scales **1.00 ↔ 1.03** with sine ease.
- **Glow:** stabilizes at **15 % opacity** with gentle pulse.
- **Wordmark "MarkSimos"** fades in: **0 % → 100 % opacity** (frames 147–165), holds, then fades out at loop end (frames 174–180) for seamless restart.

**Represents:** sustainable growth loop (经营闭环).

**Loop Continuity:** Frame 180 must visually match frame 0 so the loop is seamless. The breathing motion from Phase 1 should begin again immediately.

---

## Layer Structure (Suggested)

```
[1]  Background Glow (radial gradient #FF3B30, animate opacity/scale)
[2]  Outer Ring (red stroke, animate rotation + scale)
[3]  Inner Disc (red fill, animate scale with content group)
[4]  Connection Strokes — Base (white, animate opacity for optimization)
[5]  Connection Strokes — Data Flow (white dashed overlay, animate dashoffset)
[6]  Node 1 — Left (white circle, animate scale/opacity)
[7]  Node 2 — Center (white circle, animate scale/opacity)
[8]  Node 3 — Right (white circle, animate scale/opacity)
[9]  Wordmark "Mark" (grey, animate opacity/translateY)
[10] Wordmark "Simos" (red, animate opacity/translateY)
```

---

## Keyframe Summary

| Property | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|----------|---------|---------|---------|---------|---------|
| **Group Opacity** | 0→100 % | 100 % | 100 % | 100 % | 100 % |
| **Group Scale** | 0.9→1.0 | 1.0 | 1.0→1.05 | 1.05→1.0 | 1.00↔1.03 |
| **Ring Rotation** | 0° | 0°→30° | 30°→45° | 45°→55° | 55°→60° |
| **Ring Scale** | 1.0 | 1.0 | 1.0→1.08 | 1.08→1.0 | 1.0↔1.02 |
| **Node Scale** | 0→1.0 | 1.0 | 1.0→1.35→1.0 | 1.0 | 1.0 |
| **Glow Opacity** | 0 % | 0→30 % | 30→45 % | 45→25 % | 15 % pulse |
| **Data Flow** | Off | On (linear) | On (linear) | On (linear) | On (linear) |
| **Text Opacity** | 0 % | 0 % | 0 % | 0 % | 0→100→0 % |

---

## Easing Reference

| Motion Type | Easing |
|-------------|--------|
| **Structural changes (entrance, growth, settle)** | Ease In-Out (power 2 or 3) |
| **Node appearance** | Ease Out Back (slight overshoot) |
| **Growth expansion pulses** | Ease Out Back |
| **Data flow** | Linear (constant velocity) |
| **Breathing / float** | Sine In-Out (continuous, gentle) |
| **Text fade** | Ease Out |
| **Glow ramp** | Ease In-Out |

---

## Visual Style Notes

- **Clean Corporate-Data Aesthetic:** No noise textures, no photorealism.
- **Lighting:** Subtle gradient fill on red ring to suggest 3D bevel (light from top-left).
- **Glow:** Soft radial bloom only during Phases 2–4; never harsh. Use SVG radialGradient with animated opacity.
- **Line Work:** All strokes should have `round` linecap and `round` linejoin for polish.
- **Data Flow:** Short dashes (8 px) with longer gaps (12 px) traveling at constant speed along connections.
- **Nodes:** Pure white circles. During pulse, add subtle `drop-shadow` or radial glow to simulate data intensity.

---

## Export Checklist

- [ ] Composition is 1080×1080, 30 fps, 6.0 s
- [ ] All shapes are vector (no PNG/JPG layers)
- [ ] No unsupported effects (Mesh Warp, Particle World, etc.)
- [ ] All text converted to shapes (or use font export if confident)
- [ ] Loop is seamless: frame 0 == frame 180 visually
- [ ] Preview JSON in [LottieFiles Preview](https://lottiefiles.com/preview) before delivery
- [ ] File size target: < 150 KB

---

## Delivery

**File name:** `marksimos-transform.json`  
**Location:** `public/animations/marksimos-transform.json`  
**Integration:** Wire up a `MarkSimosLottie.jsx` component identical to `ChangeManLottie.jsx`, swapping the imported JSON path.

---

## Fallback (Current Implementation)

Until the After Effects export is ready, a **CSS/SVG fallback** is provided:
- `src/components/animations/MarkSimosAnim.jsx`
- `src/components/animations/MarkSimosAnim.module.css`

This fallback reproduces all 5 phases using CSS `@keyframes` and SVG `stroke-dashoffset`, and is already integrated into the product card grid.

---

## Contact / Questions

If any effect is unsupported by Bodymovin, substitute with:
- **Glow** → radial gradient shape with animated opacity
- **Data flow dashes** → trim-path or stroke-dasharray animation
- **3D bevel** → linear gradient fill at an angle
- **Node pulse glow** → duplicate node with animated opacity + scale behind main node

The goal is **readable motion storytelling** — if a visual effect compromises smooth playback, simplify the effect and keep the narrative clear.
