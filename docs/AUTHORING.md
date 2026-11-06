# Writing a PXFX effect

Each effect is one file, `fx/<id>.js`, that calls `PXFX.define({...})`. The engine (`engine/pxfx.js`) renders
the same definition through three cameras, so you write the effect once in 3D world space:

| mode | camera | look |
|---|---|---|
| `3d` | perspective, slowly orbiting in the site (fixed yaw .5 in the snap tool) | light Bayer dither |
| `25d` | fixed 30° isometric orthographic (the pixel-plays camera) | full 4×4 Bayer dither, long hard shadows |
| `2d` | front-on oblique (x = screen right, ground drawn at 55 % height), 160×100 | flat colour bands, no dither, 1 px outline on solids, 12 fps steps |

Read `fx/fireball.js` (projectile + impact) and `fx/healing-field.js` (ground sigil) first; they use most of the API.

## World and time

- z is up, the ground is z = 0. 1 unit ≈ 1 metre-ish; a typical effect fits in radius 2–3, height 2–3.
- Projectiles and beams travel along +x (from about x = −2.7 towards a target near x = +2.2).
- In `25d` +x runs diagonally right-down the screen (isometric); in `2d` +x is screen-right.
- `draw(p, t)` must be a **pure function of t** (0 ≤ t < loop). No `Math.random`, no state kept between calls.
  Use `p.r(k, salt)` for stable per-particle randoms and `p.noise/p.fbm` for flicker.
- One loop = one complete cast: build-up → main → dissipate. The frame at t ≈ loop should be (nearly) empty or
  match t = 0, so the preview loops without a pop.

## The definition

```js
PXFX.define({
  id: 'fireball',              // must equal the file name and the 00GameDevs id
  loop: 3.2,                   // seconds per preview loop
  view: { r: 3.1, h: 2.4 },    // framing: ground radius to show, height of the action (optional z, zoom, yaw)
  stage: { ground: 'stone', tiles: true },  // diorama: ground stone|slate|grass|moss|sand|dirt|snow|ash|marble|void|teal|none
                               //   optional r (island radius, default view.r*.92), shape 'round'|'square'
  palette: { fire: ['#a32a1c', ..., '#fffbe8'] },  // named ramps, dark -> bright. Shown on the site and in prompts.
  timeline: [ { t: [0, 1.7], zh: '…', en: '…' } ], // phases, used in the copyable prompt
  layers:   [ { zh: '…', en: '…' } ],               // visual layers / how it is built, used in the prompt
  draw(p, t) { ... },
});
```

`timeline` and `layers` text goes straight into the AI prompts people copy, so write them as **concrete build
instructions** (shape, count, size, motion, timing, colour), not marketing. Chinese in Traditional characters,
written style (書面語, not Cantonese). English short and technical.

Ramps: 4–7 colours, dark → bright. Emissive ramps must **not** start near black (the lowest level shows as a
dithered halo; a near-black level looks dirty on the white page) — start at a saturated mid-dark tone.
Hue-shift them like pixel-plays: darker steps drift towards violet/blue, brighter steps towards warm white.
`p.glowRamp('#hex')` and `p.solidRamp('#hex')` build ramps from one colour if you need a quick one.
Use the original effect's main colour (see `data/meta.json` → `color`) as the middle of your main ramp.

## Feel: beats, parameters, density

```js
PXFX.define({
  id: 'fireball', loop: 3.2,
  beats: [{ t: 0, kind: 'cast', power: .6 }, { t: 1.7, kind: 'hit', power: 1 }],
  params: {
    tailLength: { zh: '火尾長度', en: 'tail length', min: .5, max: 2, step: .1, value: 1 },
    sparks: { zh: '火星數量', en: 'spark count', min: 0, max: 40, step: 1, value: 20 },
  },
  draw(p, t) { const n = Math.round(p.param('sparks') * p.density); ... },
});
```

**beats** are the moments that must land hard, in effect time `t` (the first frame of the impact). The engine
(`PXFX.timing`) plays the effect through a time map built from them: it speeds up into a `hit`, freezes
(hit-stop), shakes the camera, flashes the light, then bursts out fast and slows down. Kinds:
`hit` (something strikes a target), `burst` (an explosion starts here, no approach), `cast` (launch, release of a
charge, a sigil appearing), `pulse` (an accent in a sustained effect: each wave, each lightning peak).
`power` 0.3–1.5 scales freeze, shake and flash. Sustained effects can have only `cast` + `pulse` beats.
The site exposes hit-stop / shake / flash / pacing sliders on top of this.

**params** are 2–4 effect-specific knobs a game developer would want (counts, radii, heights, widths, spin
speed, number of waves, crack length, toggles as 0/1 with step 1). Read them with `p.param('key')`. Keys are
camelCase English; `zh` labels are Traditional Chinese 書面語. The effect must look right and stay error-free
over the whole range; params never change `loop`.

**density**: multiply every particle count (sparks, embers, debris, motes, leaves, bubbles) by `p.density`
(0.25–2): `Math.round(base * p.density)`. Keep per-particle randoms keyed by index (`p.r(k, salt)`), so particles
do not reshuffle when the count changes.

The shared `size`, `gain` (brightness), hue, dither and outline knobs are handled by the engine: do nothing.

### Motion rules (打擊感 / 速度感) — never move at constant speed

- Projectiles: a short launch kick or charge-up (contract with `p.easeInBack`, release), then accelerate
  (`p.easeIn` / `p.easeInCubic` on the travel) into the target. Stretch fast things along their velocity (smear).
- Impacts: the first 1–2 frames (0.03–0.08 s) are the biggest and brightest; rings and shockwaves expand with
  `p.easeOutExpo`/`easeOutCubic` and thin out as they grow; flashes collapse fast.
- Particles: `p.drag(v0, k, t)` for distance travelled (fast, then slowing), gravity for heavy bits, staggered
  birth times and varied lifetimes. No linear `x = v * t` sprays.
- Appearing things (sigils, shields, crystals, petals) pop in with `p.easeOutBack` overshoot or `p.spring`;
  disappearing things collapse quickly (`p.easeInCubic`) rather than fading linearly.
- Sustained loops: pulses have a sharp attack and slow decay (e.g. `Math.pow(1 - phase, 3)`), spins ease in and
  out of speed, waves are staggered. Mark the strongest pulses as `pulse` beats.
- Helpers: `p.easeOutCubic`, `p.easeInCubic`, `p.easeOutExpo`, `p.easeInExpo`, `p.easeOutBack(t, s)`,
  `p.easeInBack(t, s)`, `p.spring(t, freq, damp)`, `p.drag(v0, k, t)`.

## Drawing API (`p`)

Solids write colour + depth, get edge shading (3D/2.5D) or a 1 px outline (2D), and cast shadows:

- `p.ball(x, y, z, r, ramp, { alpha, rough, lit, flat, shadow, seed })` — shaded sphere. `alpha` < 1 = ordered
  dither transparency (use for smoke fading out), `rough` adds grain (smoke, dust), `lit` brightens.
- `p.capsule(a, b, r0, r1, ramp, o)` — chain of balls between points `[x,y,z]`.
- `p.tri(a, b, c, ramp, { shade, lit, alpha })`, `p.quad(a, b, c, d, ramp, o)` — flat-shaded faces (shade auto from normal).
- `p.box(x0, y0, z0, x1, y1, z1, ramp)`, `p.pillar(x, y, w, h, ramp)`, `p.dummy(x, y)` — props.
- `p.shard(x, y, z, len, wid, dir, ramp, { back, spin, sides })` — crystal bipyramid (ice, prism, rock spikes).
- `p.rock(x, y, z, r, ramp, seed)` — low-poly rock (debris).
- `p.shadow(x, y, z, r)` — extra shadow blob.

Emissive light is accumulated per pixel, then resolved through the ramp with the Bayer dither (higher intensity =
brighter ramp level; 1.0 = top of the ramp; values fade out through the dither below ~1/n):

- `p.glow(x, y, z, r, ramp, I, { pow, add, flatten })` — soft radial glow (additive by default).
- `p.orb(x, y, z, r, ramp, I)` — hard-edged hot ball.
- `p.dot(x, y, z, ramp, I, size)` — single pixel / small block (embers, stars, motes).
- `p.sparkle(x, y, z, armPx, ramp, I)` — four-point pixel star.
- `p.line(a, b, w, ramp, I, { w1, i1, pow, add })` — tapered segment (w = world width).
- `p.trail(points, w0, w1, ramp, I0, I1)` — polyline with tapering width/intensity.
- `p.ring(cx, cy, cz, r, w, ramp, I, { axis, a0, a1, fn(angle, u) })` — circle/arc. `axis` is the ring's normal
  (default `[0,0,1]` = lying on the ground; `[1,0,0]` = facing the +x flight direction).
- `p.bolt(a, b, ramp, { seed, jag, depth, branches, w, I, glow })` — lightning; change `seed` every few frames to flicker. Returns the path.
- `p.decal(cx, cy, cz, R, fn(x, y, rho, angle), ramp, I, { add })` — pattern painted on a horizontal plane
  (sigils, cracks, ground waves). Coordinates are local to the centre.
- `p.card(x, y, z, w, h, fn(u, v), ramp, I)` — camera-facing rectangle (u, v in −1..1, v up): flames, crosses, glyphs.
- `p.shell(cx, cy, cz, r, fn(nx, ny, nz, rim, front), ramp, I, { back, zmin })` — patterned sphere surface
  (domes: `zmin: 0`, shields, orbs). `rim` is 1 at the silhouette (fresnel).
- `p.lquad(a, b, c, d, fn(u, v), ramp, I)` — emissive quad in any orientation (panels, portal planes, beam sheets).
- `p.ribbon(left[], right[], fn(u, v), ramp, I)` — emissive strip (blade smears, arcs, waves). u along, v across.
- `p.light(x, y, z, r, ramp, I)` — tints the uncovered ground around a point (fire light, sigil glow). Cheap; use it.

Screen operations (they resolve everything drawn so far first):

- `p.warp(x, y, z, R, fn(dx, dy, rho) => [ox, oy] | null)` — displace pixels (lensing, heat haze, space rips).
- `p.flash(color, amount)` — ordered-dither flash of the whole frame.
- `p.post(fn({ pix, W, H, kind, zb, bayer, rgb, hex, P, Q, night, mode }))` — custom full-frame pass (pix is Uint32
  ABGR). `Q(sx, sy, h = 0)` → `[x, y, depth]` is the inverse of `P`: the world point at height `h` under a screen
  pixel (screen-space spells that must know what lies under each pixel: erasers, pixelation zones, masks).
- `p.worldScale(k)` — scales everything drawn after it in this frame by `k` about the origin (zoom-outs, growing
  worlds). The baked stage ground does not scale: use `stage: { ground: 'none' }` and draw your own.
- `p.project(x, y, z)` → `[sx, sy, depth, pixelsPerUnit]`.

Helpers: `p.r(k, salt)`, `p.noise(x, y)`, `p.fbm(x, y, oct)`, `p.clamp`, `p.lerp`, `p.smooth(a, b, x)`, `p.ease`,
`p.easeOut`, `p.easeIn`, `p.ph(t, a, b)` (0..1 progress), `p.env(t, a, b, c, d)` (trapezoid envelope),
`p.band(x, c, w)` (triangle profile), `p.hard(x, c, w)`, `p.sdSeg`, `p.sdPoly(x, y, n, r, rot, step)`
(step 2 on n = 5 gives a pentagram), `p.rune(u, v, seed)` (5×5 blocky glyph), `p.TAU`, `p.mode`, `p.night`.

Order inside `draw`: props/solids first, then light. Emissive is depth-tested against solids.

Engine notes learned while converting the 64 effects:
- Solids drawn with `alpha < 1` are *soft solids*: they dither, occlude light, but get no edge darkening and
  no 2D outline (otherwise every dither hole would be inked).
- In `2d` (no dither) the first ramp colour needs half a ramp step of light (`I * n >= .5`); fainter light draws
  nothing. In the dithered modes the lowest step fades out through the Bayer pattern instead.
- A glow centred inside a solid is hidden by the solid's surface; put halos beside or in front of solids.
- To draw a flare on top of everything (e.g. a hit point facing away from the camera), clear the depth buffer
  first: `p.post(({ zb }) => zb.fill(-1e9))`.
- Effect-specific helpers belong on the definition object (`this.helper(...)`), never as globals: every file
  is loaded into the same page.

## Style rules (from pixel-plays, adapted for VFX)

- Low resolution, hard pixels, a 4–7 step ramp per material. No anti-aliasing, no smooth gradients.
- Read the effect as a few big confident shapes plus a small number of crisp particles. At 240×150 a spark is
  1–2 px; do not spray hundreds of particles — 10–40 well-placed ones read better.
- Shadows of solids fall screen-right (built in). Emissive things light the ground with `p.light`.
- Keep a clear silhouette in all three modes. Check the `2d` row especially: things that lie flat on the
  ground become thin there, so give ground effects some vertical element (motes, pillars of light, rising
  particles) as the original usually does.
- Smoke and dust: `ball` with `rough` and `alpha` fading via dither. Light: ramps that end in warm white.
- Performance: stay under ~6 ms/frame in the snap tool (it prints ms/frame). Big `decal`s and many `glow`s with
  large radii are the expensive calls.

## Check your work

Snap times are *display* times through the timing layer (hit-stop, pacing, shake, flash); the tool prints the
display length and where each beat lands. `--raw` uses the effect clock instead.

```bash
node tools/snap.mjs <id>                       # 8 frames x 3 modes -> tools/out/<id>.png
node tools/snap.mjs <id> --times 1.40,1.48,1.56,1.64 --modes 25d --scale 3   # around a beat (display times)
node tools/snap.mjs <id> --param sparks=40,tailLength=2 --tune density=2      # extremes of your knobs
node tools/snap.mjs <id> --tune snap=1,hitstop=0,shake=0,flash=0              # the effect's own motion alone
node tools/snap.mjs <id> --night               # dark page variant -> tools/out/<id>-night.png
node tools/snap.mjs <id> --times 0.5,1.2 --scale 3 --modes 25d   # zoom into specific moments
```

Open the PNG and compare it with the original effect: every effect page on 00GameDevs
(`https://00gamedevs.com/zh-TW/effects/<id>/`) plays it live, and its source can be downloaded there (MIT).
The snap tool exits non-zero and prints ERRORS if `draw` throws.

Metadata for every effect (names, description, colour, original timings) is in `data/meta.json`.

## Ultimates pack: poses, stages and the module kit

The 28 effects with `pack: "ultimate"` in `data/meta.json` are original anime-style ultimate moves. Each is
built from reusable modules in `engine/kit.js` (loaded after `engine/pxfx.js`) and plays in six stages:
**Pose → Charge → Shape → Motion → Impact → Aftermath**. Tag every `timeline` entry with its stage
(`k: 'pose' | 'charge' | 'shape' | 'motion' | 'impact' | 'after'`) and list the modules the effect uses in
`modules: [...]` (keys of `PXFX.KIT`); the prompt builder prints the stage labels and a module section from them.
Never name an existing anime, game, character or technique: describe the visual language instead.

Caster and stage: `p.figure(x, y, { pose, face, lift, color, alpha, blade: { len }, scale })` draws a faceless
mannequin (~1.5 tall) and returns `{ hand, handL, elbow, head, chest, hip, foot, footL, tip, f, s }` — anchor the
effect to those (they are returned even when props are hidden for sprite export). Poses: idle, ready, point, palm,
raise, bothUp, spread, windup, swing, punch, charge, kick, dash, float, guard, gaze; blend with
`pose: { a, b, k }` and an eased k. Default layout: caster at x = −2.1 facing +x, `p.dummy(2.35, 0)` as the target.

Core additions in `engine/pxfx.js`:
- `p.scard(x, y, z, w, h, fn(u, v) → level | −1, ramp, o)` — camera-facing **solid** sprite (black flames,
  silhouettes, ink). `p.sribbon(left, right, fn(u, v) → level | −1, ramp, o)` — solid strip (dark slash bodies).
- `p.stain(x, y, R, fn(dx, dy, rho, ang) → 0..1, '#hex', amt)` — stains the ground immediately (char, frost, ink).
- `p.grade({ dark, desat, tint, tintAmt, bg, light })` — grades everything drawn so far; draw the world, grade
  it, then draw the light so the move stays bright.
- `p.cam()` → `{ right, up, fwd }` world axes of the screen (screen-plane rays, speed lines, billboards).

Kit modules (`engine/kit.js`):

| module | calls |
|---|---|
| Charge | `p.charge(x, y, z, u, { n, R, ramp, up, len })` — motes streaming into a point |
| Energy Core | `p.core(x, y, z, { r, ramp, I, t, rays, spin, ring })` |
| Slash | `p.crescent({ c, dir, side, tilt, R, thick, arc, body, edge, u, streaks })`, `p.slash(a, b, { u, w, ramp })` |
| Shockwave | `p.shock(x, y, z, u, { R, w, ramp, axis, ground, dust })`, `p.dome(x, y, z, r, { ramp, rim, refract, zmin })` |
| Impact | `p.speedLines(x, y, z, { n, R0, R1, ramp, seed })`, `p.impactFrame({ ink, paper, accent, invert })` |
| Particle Swarm | `p.formation(kind, k, n, t, { c, R, H, spin, path })` (scatter, orbit, spiral, sphere, stream), `p.petal(...)` |
| Growth | `p.spikes(path, u, { n, h, wid, ramp })`, `p.vine(pts, u, { r0, r1, ramp, thorn })` |
| Energy Creature | `p.serpent(path, { n, w, ramp, dark, t, jaw })` — head + body along a curve |
| Aura / black fire | `p.aura(x, y, z, { r, h, ramp, t })`, `p.blackFlame(x, y, z, { w, h, t, body, edge })`, `p.flameShape(u, v, t)` |
| Domain | `p.domain({ amt, c, sky, ground, solids, t })` — dithered radial wipe to another world; skies in `PXFX.SKIES` |
| Aftermath | `p.aftermath(x, y, R, 'burn' \| 'frost' \| 'crack' \| 'ink', { amt, ramp, glow })` |
| helpers | `p.rdir(k, salt, up)`, `p.arcPos(a, b, u, h)`, `p.v3.{ norm, cross, along, lerp }` |

During a `hit` / `burst` freeze the effect clock is held at `beat + min(.02, half the gap to the next beat)`, not
at the beat itself, so a 1–3 frame impact frame should be gated on `t - HIT <= .021`, not `< .02`. Contact flares
on the far side of the dummy are hidden by it: pull them towards the camera with `p.cam().fwd`.

Read `fx/crescent-fang.js` first: it uses the figure, charge, grade, crescent, shockwave, speed lines and
aftermath. Keep to one or two full-frame passes (`domain`, `grade`, `impactFrame`, `warp`) per frame.

## Mass Spells pack: the crowd module

The 10 effects with `pack: "mass"` are huge spells against a horde of small soldiers. They use the same stages and
kit as the Ultimates, plus the crowd module in `engine/kit.js`:

```js
const units = p.crowd({
  n: Math.round(p.param('crowd')), seed: 4, area: { x: 1.2, y: 0, rx: 2.5, ry: 2.2 }, t,
  at: [IX, IY, 0],                                              // origin of the push / pull
  hit: u => HIT + Math.hypot(u.x - IX, u.y - IY) / 7 + u.r1 * .04,   // the wave: distance / speed
  react: 'knock',                                               // or reactOf: u => name, or a custom fn
  power: u => 1.9 - .32 * Math.hypot(u.x - IX, u.y - IY),       // falloff is up to the effect
  fear: u => p.ph(t, 1.3, 2.1),                                 // lean back and tremble before the hit
  respawn: [3.85, 4.95],                                        // bodies fade, a fresh horde walks back in
});
```

- `p.crowdLayout(o)` returns the cached units `{ i, x, y, r1, r2, r3, face }` (an even but irregular spread inside
  the area); `p.crowd(o)` draws them and returns live states `{ u, hitT, alive, fresh, x, y, z, chest, head, hidden }`
  to anchor bolts, sigils or swords to; `p.crowdChain(units, x, y)` orders units by nearest neighbour (chains).
- Reactions: `knock` (thrown with a tumble, slides, lies down), `launch`, `fall`, `crush`, `freeze` (+ `shatter(u)`
  time), `burn` (burning → charcoal → ash), `zap`, `pull` (spiral into `at`), `vapor`. A custom
  `react(s, a, u, p, o)` edits the pawn state (`x, y, z, tilt, tdir, sq, wide, mat, alpha, hide, glow, fire, motes,
  shards, ash, walk, jit`); `p.pawn(s, { scale })` draws a pawn from any state.
- The first knob of every mass spell is `crowd` (horde size 10–60). Loop on a standing horde: hit everyone before
  `respawn[0]` and fade every stain and sky change out before the loop ends.
- Scale reads from contrast: soldiers are ~0.6 tall (40% of the caster), the spell's main shape is several times
  that and may leave the frame. Telegraph slowly (shadow, sky, sigils, `fear`), then let the hit sweep through the
  horde by distance. `fx/skyfall.js` is the reference.

## Scale Ladder pack: formations, LOD and honest areas

The 12 effects with `pack: "scale"` are attack spells in four tiers of scale (10, 100, 1,000 and 10,000 enemies),
three area shapes per tier, made for a spell-design game: the player has to wipe out the formation a level asks for.
They extend the crowd module:

```js
const st = p.crowd({
  n: Math.round(p.param('crowd')), seed: 11,
  formation: PXFX.TROOPS[p.param('formation') | 0].id,          // block | line | column | wedge | ring | crescent | squads | scatter
  area: { x: .8, y: 0, rx: 3.8, ry: 3.8 }, faceTo: [-5.2, 0], t,  // rx = half depth (towards the caster), ry = half width
  scale: 'auto',                                                // soldier size from the formation spacing
  hit: u => { const d = Math.hypot(u.x - CX, u.y - CY); return d <= RAD ? HIT + d / 5 : null; },   // honest area
  react: (s, a) => { s.mat = 'white'; if (a > .35) s.alpha = 1 - p.ph(a, .35, .6); if (a > .6) s.hide = true; },
  respawn: [4.6, 5.9], clear: [4.3, 4.6], enter: 'fade',
});
// ... effects ...
if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.5) });   // the kill counter goes last
```

- **Honest areas.** `hit(u)` returns a time only for units inside the spell's real area (the drawn ring, lane,
  blast circles, fog edge or wave reach use the same numbers), else `null`; those units survive and keep standing.
  At the default parameters and default formation every spell wipes out everybody; other formations or a smaller
  area knob leave survivors, which is the point.
- **Params** (same order everywhere): `crowd` (tier range: 5–20, 50–200, 500–2000, 2000–12000), `formation`
  (an index with `labels` / `labelsEn` from `PXFX.TROOPS`; the site and the prompts show the names), two knobs for the
  area (radius, width, pierce count, bolt count, bounces, rows, jump distance, star count, reach...), `tally` (0/1).
- **Formations.** `p.crowdLayout({ formation })` lays the units out inside the area; `units.spacing` is the soldier
  spacing and `scale: 'auto'` sizes the soldiers to it (`maxScale` caps it). A ring or a crescent surrounds the
  area centre / points its horns at the caster; `hole` keeps a clear radius around the centre (a ring around the
  caster).
- **Level of detail.** With `lod: 'auto'` the crowd draws full 3D pawns while a pawn is at least 7.5 px tall and
  switches to `p.pawnSprite` below: a 1–3 px wide stroke from the feet to the helmet with per-unit helmet shades,
  spear tips and a ground shadow pixel, written as soft solids (no outline). Ten thousand of them cost ~3 ms. At
  thousands of units avoid per-unit glows and motes (`vapor`, `burn`): change materials (`PXFX.PAWN_MATS`: ice,
  char, white, stone, bone, rot, wet) and draw shared big effects instead.
- **Helpers:** `p.crowdGrid(units, cell).near(x, y, r)` for neighbour queries (contagion, bounce targets; never call
  `p.crowdChain` on thousands), `freeze` with `freezeMat: 'stone'` (petrify, shatters into stone), `reach` (throw
  scale of knock / launch, defaults to the auto scale), `enter: 'fade'` (big armies fade in on the spot instead of
  walking in from the island edge), `pal` by name from `PXFX.PAWN_PALS` (red, steel, bone, jade, gold).
- **Kill counter.** `p.tally(states, { t, alpha, right })` draws a skull and "killed/total" in 3×5 pixel digits with a
  dark outline in a screen corner; it turns gold with a short pop on a full wipe. Draw it last and fade it out before
  the respawn. `fx/second-sun.js` is the reference.

## Twist pack: screen spells, moving ground and armies too big to list

The Twist pack (`pack: "twist"`, n 115–126) keeps the Scale Ladder rules (honest hit rules, `p.tally`, formations,
default = full wipe) but each spell hides a twist: it attacks the picture itself (resolution, an eraser, gravity),
rewrites the map (folds, jigsaw pieces), turns the enemy's own things on them (shadows, colours, arrows) or plays
with scale (one slime, one pebble, a million soldiers). Engine pieces added for it:

- **`p.post` passes `Q(sx, sy, h = 0)`**, the inverse of `P`: the world point under a screen pixel. Screen-space
  spells keep their *rule* in world space and only paint in the post pass what the rule already decided (an eraser
  paints the transparency checker on pixels whose ground point lies in the erased area).
- **`p.worldScale(k)`** scales everything drawn after it in this frame about the origin: zoom-outs and zoom-ins.
  The baked stage ground does not scale, so such effects use `stage: { ground: 'none' }` and draw their own ground.
- **`p.tally(null, { total, dead, last, t, alpha })`** takes counts computed by the effect when the army is too big
  for per-unit states.
- **A horde shader for a million soldiers** (`fx/million-host.js`): soldiers live in regiments (20 × 20 slots,
  position = regiment centre + slot + hashed jitter), so any soldier can be found from a world point in O(1). While a
  soldier is at least 4.5 px tall the effect draws real pawns for the ones in view; below that one pass over the
  pixels finds, for every ground pixel, the nearest soldier, and if that soldier's feet land in the pixel it draws a
  1 px body and helmet upwards (rows top to bottom, so nearer soldiers cover farther ones). The ground and this foot
  map are cached per camera, the continent texture once per army, and the counter is a binary search in the sorted
  distances of all soldiers from the ring centre — honest without a million states.
