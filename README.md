# Pixel VFX Codex

**114 pixel-art VFX: 64 game effects, 28 original anime-style ultimate moves, 10 mass spells that wipe out a whole horde and 12 attack spells scaled from 10 to 10,000 enemies. One definition, three cameras: 3D, 2.5D and 2D. Tune any effect, then copy a prompt that rebuilds it in your own engine.**

**[▶ Live demo](https://888wing.github.io/pixel-vfx-codex/)** · [Promo video](https://github.com/888wing/pixel-vfx-codex/releases/tag/v1.0.0) · [Write your own effect](docs/AUTHORING.md) · [中文說明](#中文說明)

![Blazing Fireball through the three cameras: 3D, 2.5D, 2D](docs/media/hero.gif)

The effects are pixel-art reinterpretations of the [00GameDevs](https://00gamedevs.com/) VFX library (MIT). They are drawn with the rendering rules of [pixel-plays](https://github.com/amirmushichge/pixel-plays) (MIT): a low-resolution buffer with a depth buffer, hue-shifted colour ramps, a 4×4 Bayer dither and hard cast shadows, on a small diorama.

| Camera | Look |
|---|---|
| **3D** | Perspective camera that orbits (drag in the detail view). 240×150 with a light dither, 30 fps |
| **2.5D** | Fixed 30° isometric orthographic camera, the pixel-plays camera. 240×150 with full Bayer dither and long shadows, 20 fps |
| **2D** | Front-on oblique view. 160×100 with flat colour bands, no dither and 1 px outlines, stepped at 12 fps |

### Ultimates pack (28 original moves)

Anime-style ultimate moves with a caster, built from one reusable kit instead of one-off code. Each move runs in six
stages, **Pose → Charge → Shape → Motion → Impact → Aftermath**, and is composed from shared modules: energy core,
crescent slash, particle swarm, energy creature, growth, shockwave, aura, domain (the whole frame becomes another
world), debris, impact frame and aftermath. Swap one or two modules and you have a new move. The designs are
original: they study how famous ultimates create pressure and scale (compress then release, recolour the whole
screen, one huge clear shape, hit-stop contrast, marks left on the ground) without using any work's characters,
names or art. Their prompts list the stages and the modules to build. See `engine/kit.js` and the
[authoring guide](docs/AUTHORING.md#ultimates-pack-poses-stages-and-the-module-kit).

### Mass Spells pack (10 original spells)

Huge spells against a horde of 30–60 small soldiers: a meteor, a rain of swords, light pillars on every head, a fan
of ice that freezes the field and shatters on a finger snap, a rolling wall of fire, a rock dragon, chain lightning
with a hop counter, a gravity vortex, a giant's foot from a split sky and a charge of phantom riders. They share a
**crowd module** (`p.crowd` in `engine/kit.js`): each soldier is hit at start time + its distance from the blast or
wave front / wave speed, so the damage visibly sweeps through the horde, then plays the spell's reaction (thrown,
launched, toppled, flattened, frozen and shattered, burnt to ash, electrocuted, pulled in or vaporised). Bodies fade
and a fresh horde marches back in, so every spell loops. Each has a horde-size knob, and its prompt explains the
wave timing and the reactions. See the [authoring guide](docs/AUTHORING.md#mass-spells-pack-the-crowd-module).

### Scale Ladder pack (12 original spells, 10 → 100 → 1,000 → 10,000 enemies)

Attack spells in four tiers of scale, three area shapes per tier, built for a spell-design game in which the player
must wipe out the formation a level asks for:

- **10 (squad):** a lance that pierces a column (pierce count), a ring of wind blades around the caster (radius),
  homing bolts, one per target (bolt count).
- **100 (company):** poison fog spreading in a circle (radius), a sun lens burning a path (width), a ball of
  lightning bouncing between squads (bounces, burst radius).
- **1,000 (legion):** a giant eye whose gaze turns the army to stone (radius), rows of sigils carpet-bombing the
  field (rows, blast radius), a blood curse that jumps from soldier to soldier (jump distance).
- **10,000 (army):** a second sun whose heat wave vaporises the army (radius), a storm of shooting stars (star count,
  crater radius), a tsunami (reach).

Every hit area is **honest**: the shape you see is the shape that kills, soldiers outside it survive, and a pixel
kill counter in the corner shows "killed / total" (gold on a full wipe). Each spell has knobs for the enemy count,
the **formation** (block, line, column, wedge, ring, crescent, squads, scatter) and its area, so you can try which
shape counters which formation. The crowd module switches its level of detail by itself: 3D soldiers up close, pixel
soldiers from a few hundred on, a sea of helmets at ten thousand. See the
[authoring guide](docs/AUTHORING.md#scale-ladder-pack-formations-lod-and-honest-areas).

![All 64 effects](docs/media/gallery.png)

## What you can do

- **Browse** the 114 effects by pack (library / ultimates / mass spells / scale ladder), type (projectile, beam, slash, domain, summon, aura…) or element, live in all three cameras, on a light or dark page.
- **Tune** every effect. Each one has 3–4 knobs of its own, such as missile count, fork count, flame height, arc angle or sector angle. Shared knobs cover main colour, size, brightness, particle density, hit-stop, screen shake, flash, pacing contrast, dither, outline and pixel density. Settings are remembered per effect.
- **Feel the hits.** A timing layer speeds up into each impact, freezes on it (hit-stop), shakes the camera, flashes and then slows out. A toggle switches it off so you can compare.
- **Copy a prompt** for Canvas 2D (plain JS), Three.js, Godot 4 or Unity URP, or an image-model prompt for a sprite sheet, in English or Traditional Chinese. Each prompt includes the camera spec, the palette in hex, the timeline, a layer-by-layer breakdown, the pacing and impact numbers, every knob with its current value, how to build it in that engine, and acceptance checks.
- **Export a sprite sheet** (PNG) of any effect in any camera, optionally without background and props.

## Run it

It is a static site with no build step and no runtime dependencies. Open `index.html` directly (it works from `file://`) or serve the folder with any static server. GitHub Pages serves it as-is.

## How it works

- `engine/pxfx.js` is a small software rasteriser. Its primitives cover solids (balls, crystals, rocks, boxes) and light (glows, beams, rings, lightning, ground decals, camera-facing cards, sphere shells, ribbons). Light is collected in a per-pixel buffer and resolved through colour ramps with ordered dithering. There are also screen operations: warp, flash and post.
- Every effect is `fx/<id>.js`: `PXFX.define({ id, loop, view, stage, palette, timeline, layers, beats, params, draw(p, t) })`. `draw` is a pure function of time, so any frame can be scrubbed to and exported.
- `PXFX.timing(def, tune)` turns an effect's `beats` (hit / burst / cast / pulse) into a display-time map with hit-stop, eased pacing, whole-pixel screen shake and a light flash.
- `engine/kit.js` holds the Ultimates modules (caster poses, charge, core, crescent, swarm formations, serpent, growth, shockwave, aura, domain, aftermath) and the crowd module of the Mass Spells and Scale Ladder packs (formations, level of detail, kill counter).
- `engine/prompt.js` writes the prompts from each definition. `app.js` runs the catalogue on one shared renderer with a per-frame time budget.

See [docs/AUTHORING.md](docs/AUTHORING.md) for the full API and the style and motion rules.

## Tools (optional, Node 18+)

```bash
node tools/snap.mjs fireball --night        # render an effect headless to a PNG contact sheet
node tools/gallery.mjs                       # QA every effect: errors, timing, loop pops, knob extremes
node tools/media.mjs fireball                # README hero GIF (needs ffmpeg)
npm install && node tools/site-check.mjs     # browser checks (puppeteer; set CHROME to use a local Chrome)
```

`promo/` holds the script for the vertical promo video. Its frames are rendered by the same engine; the audio files are not included.

## Credits and license

- Ultimates, Mass Spells and Scale Ladder packs: original designs, MIT, part of this repository.
- Effect designs of the 64-effect library: [00GameDevs](https://00gamedevs.com/) VFX library, MIT, © 00GameDevs (@00vchannel). Names, descriptions, colours and timings in `data/` come from its catalogue. The 00GameDevs website UI and branding are not used.
- Rendering rules and techniques: [pixel-plays](https://github.com/amirmushichge/pixel-plays) by Amir Mushich, MIT. Its music is not used.
- Promo music and sound effects were generated with PixelBananas and are not part of this repository.
- Everything here is MIT; see [LICENSE](LICENSE) for all notices.

---

## 中文說明

64 個 [00GameDevs](https://00gamedevs.com/zh-TW/) 遊戲特效的像素風重製版，用 [pixel-plays](https://github.com/amirmushichge/pixel-plays) 的渲染規則畫成：低解析度、深度緩衝、色相偏移色階、4×4 Bayer 抖色、硬陰影，場景是一個浮在紙上的小島。每個特效只寫一份 3D 世界座標定義，由三部相機輸出：3D 透視（可轉）、2.5D 等角（pixel-plays 鏡頭）、2D 斜視（色塊分層、無抖色、1px 描邊）。

**[▶ 線上試玩](https://888wing.github.io/pixel-vfx-codex/)**

**必殺技包（28 個原創招式）**：動畫風大招，附施法者人偶。每招分為起手、集氣、成形、推進、命中、餘波六段，由共用模組組合而成：能量核心、彎月斬擊、粒子群陣形、能量生物、生長、衝擊波、氣場、領域（整個畫面換成另一個世界）、碎片、衝擊格與餘波痕跡。換掉一兩個模組就是一個新招式。設計全部原創：拆解著名大招為何有壓迫感與規模感（先壓縮再爆發、整個畫面變色、一個巨大清晰的形狀、頓幀與速度反差、地面留下痕跡），但不使用任何作品的角色、名稱或美術。這些招式的 prompt 會列出六段時間軸和要做的模組。

**群體魔法包（10 個原創法術）**：一個巨大的法術對一整群 30–60 個細小敵兵：隕石、萬劍、每個頭頂一道光柱、扇形冰封再彈指碎裂、橫掃的火牆、岩石巨龍、帶跳數的連鎖閃電、重力漩渦、天空裂開踩下的巨人腳、幽靈騎兵衝鋒。全部共用一個群眾模組（`engine/kit.js` 的 `p.crowd`）：每個敵兵的命中時間 = 起始時間 + 與爆心或波前的距離 ÷ 波速，所以傷害像波浪一樣掃過人群，之後播放該招的反應（拋飛、升空、倒下、壓扁、冰封碎裂、燒成灰、觸電、被吸走、蒸發）。屍體淡出後新一批敵兵走回原位，所以每招都能循環。每招都有「敵兵數量」參數，prompt 會寫明波浪時間和群眾反應的做法。

**十百千萬包（12 個原創攻擊魔法）**：按規模分四級，每級三種範圍形狀，為「玩家自行設計法術、全滅關卡指定陣型」的法術模擬遊戲而做。十人：貫穿縱隊的光矛（可穿透人數）、以施法者為圓心的風刃環（半徑）、一發鎖定一人的追蹤魔彈（魔彈數量）。百人：圓形擴散的毒霧（半徑）、透鏡聚光燒出的路徑（焦線寬度）、在分隊之間彈跳的雷球（彈跳次數、爆炸半徑）。千人：石化大軍的天眼（凝視半徑）、逐排轟炸的法陣（排數、爆炸半徑）、在士兵之間傳染的血咒（傳染距離）。萬人：熱浪蒸發大軍的第二太陽（熱浪半徑）、流星暴雨（流星數量、星坑半徑）、滅世海嘯（推進距離）。所有命中範圍都與畫面一致：範圍外的敵兵會倖存，角落的像素擊殺計數顯示「已擊殺／總數」，全滅時變金色。每招都可以調敵兵數量、陣型（方陣、橫列、縱隊、楔形、圓陣、鶴翼、分隊、散兵）和範圍大小，用來試驗哪種範圍克制哪種陣型。群眾模組會自動換細節級別：近景是 3D 小兵，數百人以上是像素小兵，一萬人時是一片頭盔海。

- **瀏覽**：按特效包（特效庫／必殺技／群體魔法／十百千萬）、類型或元素篩選，三種鏡頭即時預覽，有日間和夜間底色。
- **調整**：每個特效有 3–4 個專屬參數。通用參數包括主色、尺寸、亮度、粒子密度、頓幀、震屏、閃光、節奏對比、抖色、描邊和像素密度。設定按特效分別記住。
- **打擊感**：節奏層會在命中前加速、命中時頓幀、鏡頭震動、瞬間閃光，命中後先快後慢；可以一鍵關閉作 A/B 對比。
- **一鍵複製 prompt**：目標可選 Canvas 2D、Three.js、Godot 4、Unity URP，或 AI 繪圖 sprite sheet，中英皆可。內容包括鏡頭規格、調色盤 hex、時間軸、圖層拆解、節奏與打擊感數值、全部參數現值、實作方法和驗收要求。
- **匯出 sprite sheet**（PNG），可去背景及道具。

直接打開 `index.html` 即可使用，無建置步驟、無依賴。寫新特效請看 [docs/AUTHORING.md](docs/AUTHORING.md)。

授權：MIT。00GameDevs 與 pixel-plays 的 MIT 聲明見 [LICENSE](LICENSE)。
