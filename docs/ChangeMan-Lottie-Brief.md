# ChangeMan Lottie Animation — Motion Design Brief

## Overview
Create a production-ready Lottie JSON animation for the **ChangeMan** brand logo. The animation must express the concept of **organizational transformation and change** through a narrative of structural deconstruction and evolution.

**Core Idea:** A stable system is broken down and reassembled into a more dynamic, evolved structure.

---

## Source Assets

**Logo Reference:** `public/changeman-logo-ref.png`

**Logo Anatomy:**
- **Outer Boundary:** Thick circular ring in purple gradient (#7C5CFC → #5A3FC0) with a subtle metallic bevel / 3D extrusion.
- **Inner Figure:** Abstract human-like form composed of three connected white/light-grey circular nodes (head + body/arms), sitting on the purple circular disc.
- **Wordmark:** "Change" in silver/grey 3D bevel, "Man" in matching purple, with ® symbol.

**Brand Palette:**
- Primary Purple: `#7C5CFC`
- Deep Purple: `#5A3FC0`
- White/Light Grey: `#F0F0F0`
- Accent Glow: `#A78BFF` (lighter lavender for bloom)

---

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Canvas Size | 1080 × 1080 px |
| Frame Rate | 30 fps |
| Duration | 5.2 s (156 frames) |
| Background | Transparent |
| Output Format | Lottie JSON (Bodymovin / LottieFiles plugin) |
| Renderer | SVG |
| Loop | Seamless infinite loop |
| Constraints | Pure vector shapes only. No raster images, no external assets. |

---

## Animation Narrative (4 Phases)

### Phase 1 — Stability (Frames 0–36, 0.0–1.2 s)
**Mood:** Calm, established, confident.

- Logo appears as a fully intact, stable emblem.
- Subtle breathing motion: entire logo group scales 1.00 ↔ 1.03 with a smooth sine ease.
- Very gentle Y-axis float (±8 px) to give a hovering/ premium feel.
- Outer ring has a faint, slow clockwise rotation (0° → 15° over 1.2 s).
- **Opacity:** All elements 100 %.

---

### Phase 2 — Disruption / Transformation Trigger (Frames 36–66, 1.2–2.2 s)
**Mood:** Tension, energy release, controlled fracture.

**Outer Ring:**
- Circular ring begins to fracture into 6–8 segmented arcs using **Trim Paths**.
- Each segment gains an independent slight rotation; gaps appear between arcs.
- Ring subtly scales outward to 1.08× (expansion = system under pressure).
- Add **micro-jitter** (2–3 px random X/Y wobble, 3–4 cycles) to the entire logo group to suggest tension.

**Inner Figure:**
- The three nodes of the abstract human figure start to separate slightly from each other (move outward from centroid by ~12 px).
- Connections between nodes (if drawn as strokes) thin out or fade to 40 % opacity.

**Atmosphere:**
- Subtle **glow pulse** begins — a radial gradient behind the logo ramps from 0 % → 30 % opacity (lavender `#A78BFF`).
- Global opacity flickers very briefly (100 % → 92 % → 100 %) at the peak of disruption to suggest electrical/energy instability.

**Easing:** Use an aggressive `ease-out` (or slightly overshot ease) to give the break a sudden, decisive feel.

---

### Phase 3 — Reorganization (Frames 66–126, 2.2–4.2 s)
**Mood:** Dynamic, fluid, constructive chaos.

**Outer Ring Fragments:**
- The broken arc segments rotate **independently** in orbital motion around the logo center.
- Each segment has a slightly different angular velocity (e.g., +45° / −30° / +60° over the phase) to feel organic, not mechanical.
- Segments may cross over/under each other (z-index variation if possible, or accept flat SVG layering).
- Stroke width of arcs subtly pulses (2.5 px ↔ 4 px).

**Inner Figure — Particle Dissolve:**
- The three nodes dissolve into small particle clusters (8–12 dots per node).
- Particles drift outward in a controlled explosion (max radius ~80 px from original position) then swirl back inward.
- Particles reassemble into a **slightly refined** version of the three-node figure:
  - Nodes are 5 % larger than original.
  - Triangle formed by nodes is slightly more open/elongated (evolved structure).
  - Connections between nodes are now drawn with a subtle gradient stroke instead of solid.

**Motion Graphics:**
- Add 12–16 tiny orbiting dots (2 px radius, white) circling the logo at varying radii (60–110 px) to represent data/energy flow.
- Dots should fade in during Phase 2 and orbit continuously through Phase 3.

**Depth:**
- Apply subtle **3D parallax feel** by scaling inner figure and ring fragments with slightly different timing — foreground elements move faster, background slower.
- Example: ring fragments at 0.95× scale, inner figure at 1.05× scale during peak dispersion.

**Easing:** Use smooth `ease-in-out` for orbital paths. Use **elastic / spring easing** (overshoot) for the reassembly of particles into nodes.

---

### Phase 4 — New Order (Frames 126–156, 4.2–5.2 s)
**Mood:** Resolution, clarity, evolution complete.

**Outer Ring:**
- All arc segments converge and **re-form the complete circle**.
- Final ring is cleaner, slightly thinner (2 px stroke), and more perfectly geometric than Phase 1.
- Ring rotation settles to 360° (or 0° equivalent) for seamless loop continuity.

**Inner Figure:**
- Reassembled three-node figure settles into its final "evolved" pose.
- Nodes gently scale down from reassembly overshoot to rest size (1.05 → 1.0).

**Atmosphere:**
- Glow dissipates back to 0 % opacity.
- Orbiting particles fade out or merge into the ring.
- A brief **flash** (white radial burst, 0 % → 15 % → 0 % opacity, 0.2 s) at the moment of convergence to accentuate the "new order" moment.

**Loop Continuity:**
- Final frame (frame 156) must **exactly match** the visual state of frame 0 so the loop is seamless.
- The breathing motion from Phase 1 should begin again immediately as the flash fades.

---

## Layer Structure (Suggested)

```
[1]  Background Glow (radial gradient, animate opacity)
[2]  Orbiting Particles (16 small dots, animate position/opacity)
[3]  Outer Ring — Back Segments (arcs that orbit behind)
[4]  Inner Figure — Back Nodes
[5]  Inner Figure — Connection Strokes
[6]  Inner Figure — Front Nodes
[7]  Outer Ring — Front Segments (arcs that orbit in front)
[8]  Convergence Flash (white radial burst)
[9]  Wordmark "ChangeMan" (optional, fade in at final 0.5 s)
```

*Note: Wordmark is optional. If included, fade in from 0 % → 100 % opacity during Phase 4 only, and fade out at loop restart. For seamless loop, it may be cleaner to omit the wordmark entirely.*

---

## Keyframe Summary

| Property | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|----------|---------|---------|---------|---------|
| **Opacity** | 100 % | 92–100 % flicker | 80–100 % | 100 % |
| **Ring Rotation** | 0° → 15° | 15° → 70° (break) | 70° → 320° (orbit) | 320° → 360° |
| **Ring Scale** | 1.0 | 1.08 (expand) | 1.05–1.12 | 1.0 |
| **Ring Stroke** | 2.5 px | 2.5 px | 2.5–4.0 px pulse | 2.0 px |
| **Inner Node Pos** | Rest | Drift +12 px | Orbit / dissolve | Reassemble (evolved) |
| **Inner Node Scale** | 1.0 | 1.0 | 0.8 → 1.05 (elastic) | 1.0 |
| **Glow Opacity** | 0 % | 0 → 30 % | 20–35 % | 30 → 0 % |
| **Global Position** | Float ±8 px | Jitter ±3 px | Float ±6 px | Float ±8 px |

---

## Easing Reference

- **Structural transitions (ring break/reform):** `Ease In-Out` (smooth power 2 or 3)
- **Break phase peak:** `Ease Out` (decelerate into fracture)
- **Reassembly:** `Elastic Out` or `Spring` (slight overshoot for organic feel)
- **Breathing / Float:** `Sine In-Out` (continuous, gentle)
- **Flash:** `Hold` → linear fade

---

## Visual Style Notes

- **Clean Corporate-Tech Aesthetic:** No noise textures, no photorealism.
- **Lighting:** Subtle gradient fills on the purple ring to suggest 3D bevel (light from top-left).
- **Glow:** Soft radial bloom only during Phases 2–3; never harsh.
- **Particles:** Pure white circles, no blur filters (SVG gaussian blur is expensive in Lottie).
- **Line Work:** All strokes should have `round` linecap and `round` linejoin for polish.

---

## Export Checklist

- [ ] Composition is 1080×1080, 30 fps, 5.2 s
- [ ] All shapes are vector (no PNG/JPG layers)
- [ ] No unsupported effects (Mesh Warp, Particle World, etc.)
- [ ] All text converted to shapes (or use font export if confident)
- [ ] Loop is seamless: frame 0 == frame 156 visually
- [ ] Preview JSON in [LottieFiles Preview](https://lottiefiles.com/preview) before delivery
- [ ] File size target: < 150 KB

---

## Delivery

**File name:** `changeman-transform.json`
**Location:** `public/animations/changeman-transform.json`
**Integration:** React component `ChangeManLottie.jsx` is already prepared with `lottie-react`.

---

## Contact / Questions

If any effect is unsupported by Bodymovin, substitute with:
- **Glow** → radial gradient shape with animated opacity
- **Particles** → multiple small ellipse shapes with trim-path or position keyframes
- **3D bevel** → linear gradient fill at an angle

The goal is **readable motion storytelling** — if a visual effect compromises smooth playback, simplify the effect and keep the narrative clear.
