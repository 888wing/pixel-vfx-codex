// 殺雞用牛刀 / Overkill — Twist pack (original design): the caster charges the biggest ultimate in the codex — sky, sigil tower, a pillar of light as wide as a world — and the camera only then finds the target: one small slime
PXFX.define({
  id: 'overkill',
  loop: 7,
  beats: [
    { t: .7, kind: 'cast', power: .8 }, { t: 1.6, kind: 'pulse', power: .5 }, { t: 2.3, kind: 'pulse', power: .6 },
    { t: 3.0, kind: 'pulse', power: .7 }, { t: 3.6, kind: 'pulse', power: .9 }, { t: 3.95, kind: 'cast', power: .4 },
    { t: 4.9, kind: 'hit', power: 1.5 },
  ],
  view: { r: 5.4, h: 3.6 },
  stage: { ground: 'none' },
  modules: ['figure', 'aura', 'domain', 'charge', 'core', 'swarm', 'shockwave', 'impact', 'aftermath', 'crowd', 'troops', 'tally'],
  palette: {
    gold: ['#a8601c', '#e09a2c', '#ffc848', '#ffe48a', '#fff6d0', '#ffffff'],
    sigil: ['#b0702a', '#e8a838', '#ffd060', '#fff0a8', '#fffcec'],
    reticle: ['#a8283a', '#e04a3a', '#ff8a4a', '#ffc890', '#fff2e0'],
    pillar: ['#c8a050', '#f0d488', '#fff0c0', '#fffaf0', '#ffffff'],
    slime: ['#1c4a3c', '#25704a', '#3c9e58', '#6cc870', '#b8f0a0'],
    eye: ['#141420', '#1e1e2c', '#2a2a3a', '#ffffff'],
    dust: ['#4a3e48', '#655862', '#83767e', '#a3979c'],
    char: ['#1a1418', '#2a2026', '#3a2e32'],
  },
  timeline: [
    { k: 'pose', t: [0, .9], zh: '起手：施法者（x = −3.4，高 1.5）站在草地小島左邊，面向右方；島中央有一隻小史萊姆（寬約 0.36，綠色半球，兩隻黑眼）原地擠壓彈跳；0.4 秒起施法者張開雙臂（英雄姿勢），0.7 秒全身爆出金色氣場（高 2.4，蓄力時長到 3.8）並放出一圈地面光環', en: 'pose: the caster (x = −3.4, 1.5 tall) stands on the left of a grassy island facing right; one small slime (~0.36 wide, a green dome with two black eyes) squashes and bounces in the middle; from 0.4 s the caster spreads both arms (hero pose) and at 0.7 s a gold aura bursts around them (2.4 tall, growing to 3.8 with the charge) with a ground ring' },
    { k: 'charge', t: [.7, 3.95], zh: '集氣：天空由施法者高舉的手向外以抖色圓形擦除變成星空，地面壓成暗紫石色；鏡頭在 0.8–2.6 秒以世界縮放 1 → 0.5 拉遠；目標地面亮起半徑 = pillar 的紅色瞄準圈（三圈＋十字準星＋刻度）；目標上方 charge（預設 5）層水平法陣在 1.1–2.9 秒由下而上逐層彈出（半徑 = max(pillar, 1.4) × (1 − 0.1 × 層數)、間隔 1.15、交替反向旋轉；外環、24 格符文帶、六芒星、內環）；最上層之上一顆金白能量核心越變越大，24 片光刃繞塔環繞，法陣之間打出金色閃電；2.3 秒天上張開一面朝向鏡頭的巨大符文圓；2.6–3.85 秒半徑 = pillar 的金色光柱外殼由天而降（兩條發亮的輪廓線、向下流的光紋、往下滑的光環），星光被吸進核心；3.65–3.9 秒法陣收縮再爆亮（吸氣）', en: 'charge: the sky wipes out from the caster’s raised hand into a starfield and the ground drops to dark violet stone; the camera pulls back over 0.8–2.6 s (world scale 1 → 0.5); a red targeting reticle of radius = pillar (three rings, crosshair, ticks) lights up under the target; over 1.1–2.9 s `charge` (default 5) horizontal sigils pop in above the target from the bottom up (radius = max(pillar, 1.4) × (1 − 0.1 × level), 1.15 apart, alternate spin; outer ring, 24-cell rune band, hexagram, inner rings); a gold-white core on top keeps growing, 24 light blades orbit the tower and gold lightning jumps between sigils; at 2.3 s a giant camera-facing rune circle opens in the sky; over 2.6–3.85 s the gold shell of the pillar (radius = pillar) comes down from the sky (two bright silhouette lines, streaks flowing down, rings sliding down) while starlight is pulled into the core; at 3.65–3.9 s the sigils contract and flare (an inhale)' },
    { k: 'shape', t: [3.95, 4.8], zh: '成形（反轉）：3.95 秒鏡頭 0.3 秒急推到世界縮放 3.6，中心移到目標（之後慢推到 3.9）；法陣塔在畫面外，近鏡只見草地被頭上的光照成金色、光點飄落，瞄準圈正中間只有一隻小史萊姆在彈跳；它眨眼，4.5 秒抬頭望天、停止彈跳，冒出一滴藍色汗', en: 'shape (the twist): at 3.95 s the camera rushes in over 0.3 s to world scale 3.6, centred on the target (then creeps to 3.9); the tower is off screen and the close-up shows only grass lit gold from above with drifting motes and, dead centre in the reticle, one small slime bouncing; it blinks, at 4.5 s stops and looks up, and breaks a blue sweat drop' },
    { k: 'motion', t: [4.78, 4.9], zh: '推進：光柱落下：0.12 秒內一道寬 2 × pillar 的白熱光柱由畫面頂部插到地面，史萊姆最後 0.08 秒變白', en: 'motion: the pillar comes down: in 0.12 s a white-hot column 2 × pillar wide drives from the top of the frame to the ground; the slime turns white for the last 0.08 s' },
    { k: 'impact', t: [4.9, 5.5], zh: '命中：判定 ⇔ 史萊姆與落點（最接近陣型中心的那隻史萊姆）的距離 ≤ pillar（預設 3.2，遠大於整個陣型）；命中時間 = 4.9 + 0.02 × 距離；1 格衝擊格（白紙、金色瞄準圈、史萊姆是一個黑色剪影加兩隻白眼）＋重頓幀＋大震屏，之後白光閃退；鏡頭 4.95–5.5 秒拉遠到 0.85：光柱變細消失，地面衝擊波擴到 1.5 × pillar 並揚起塵土，島沿落點裂成兩半（裂谷長 2 × min(5.2, 1.6 × pillar)、鋸齒狀，裂縫中露出星空，兩邊金色發光裂邊），半徑 pillar 內燒成焦黑並留一圈金色光環；擊殺計數顯示 1/1 並變金色；範圍外的史萊姆嚇得壓扁發抖但倖存', en: 'impact: rule ⇔ a slime’s distance to the impact point (the slime nearest the formation centre) ≤ pillar (default 3.2, far larger than the whole formation); hit time = 4.9 + 0.02 × distance; one impact frame (white paper, the gold reticle, the slime as a black silhouette with two white eyes), a heavy hit-stop and a big shake, then a white flash fading out; the camera pulls back to 0.85 over 4.95–5.5 s: the pillar thins away, a ground shockwave spreads to 1.5 × pillar with dust, the island splits in two along the impact point (a jagged rift 2 × min(5.2, 1.6 × pillar) long showing the stars, gold-glowing edges) and everything within `pillar` is scorched black inside a gold ring; the counter reads 1/1 and turns gold; slimes outside flatten and tremble but survive' },
    { k: 'after', t: [5.5, 7], zh: '餘波（笑點）：5.85–6.15 秒鏡頭推近施法者（世界縮放 2.6），施法者 5.95–6.2 秒轉身望向鏡頭、雙手微攤，頭上冒一滴汗；6.45–6.65 秒擊殺計數淡出，6.5–6.95 秒焦痕消失、裂谷合上、天空淡回，鏡頭 6.55–6.95 秒回到 1，施法者轉回面向右方，6.6–6.95 秒新的史萊姆彈回原位', en: 'aftermath (the punchline): over 5.85–6.15 s the camera pushes in on the caster (world scale 2.6), who turns to the camera at 5.95–6.2 s with palms slightly open and a sweat drop; the counter fades at 6.45–6.65 s, the scorch fades, the rift closes and the sky returns at 6.5–6.95 s, the camera returns to 1 at 6.55–6.95 s as the caster turns back to face right, and a fresh slime pops back in at 6.6–6.95 s' },
  ],
  layers: [
    { zh: '判定與倖存者：落點 = 最接近陣型中心的史萊姆；史萊姆與落點距離 ≤ pillar 才中招，命中時間 = 4.9 + 0.02 × 距離；地面瞄準圈、光柱外殼、焦黑圓與金色光環的半徑都是 pillar；pillar 調小、史萊姆調多時，圈外的史萊姆只會壓扁發抖，一直留到循環結束', en: 'rule and survivors: impact point = the slime nearest the formation centre; a slime is hit iff its distance to it ≤ pillar, at 4.9 + 0.02 × distance; the ground reticle, the pillar shell, the scorched disc and its gold ring all have radius pillar; with a smaller pillar and more slimes, the ones outside only flatten and tremble and stay through the loop' },
    { zh: '史萊姆與擊殺計數：1–20 隻（預設 1）史萊姆按陣型（預設方陣）排在原點附近半徑 1.5 的範圍；每隻是面向鏡頭的實心綠色半球卡（寬 0.36、平底、左上白色高光），兩隻黑色橢圓眼加白色反光點，持續擠壓伸展並每 1.2 秒跳一下；角落 3×5 像素字擊殺計數「骷髏 已擊殺/總數」，全滅時變金色', en: 'slimes and counter: 1–20 slimes (default 1) laid out in a formation (default block) within radius 1.5 of the origin; each is a camera-facing solid green dome card (0.36 wide, flat bottom, white top-left highlight) with two black oval eyes and white glints, squashing and stretching with a hop every 1.2 s; a 3×5 pixel kill counter "skull killed/total" in the corner turns gold on a full wipe' },
    { zh: '鏡頭：所有東西（自繪地面、施法者、史萊姆、法陣、光柱）以世界縮放 k 繪畫並平移到焦點：k = 1 → 0.5（拉遠容納整個招式）→ 3.6–3.9（急推到目標）→ 0.85 → 2.6（推近施法者）→ 1；地面在一個後處理裡把每個像素反投影回世界座標，用 512² 世界紋理取樣草地，所以縮放時地面跟著放大', en: 'camera: everything (the hand-drawn ground, caster, slimes, sigils, pillar) is drawn through a world scale k about a moving focus: k = 1 → 0.5 (pull back to fit the move) → 3.6–3.9 (rush onto the target) → 0.85 → 2.6 (push in on the caster) → 1; the ground is painted in one post pass by back-projecting each pixel to the world and sampling a 512² grass texture, so it zooms with everything else' },
    { zh: '法陣塔：charge 層水平發光法陣（外環、符文帶、六芒星、內環、中心環）疊在落點上方，交替反向旋轉，以回彈緩動彈出，每層彈出時閃亮；最上方金白能量核心（12 條光芒），天上一面朝向鏡頭的巨大符文圓（八芒星＋32 格符文帶），24 片光刃繞塔環繞，法陣之間閃電', en: 'sigil tower: `charge` horizontal glowing sigils (outer ring, rune band, hexagram, inner rings, centre ring) stacked over the impact point, alternate spin, popping in with an overshoot and a flash; a gold-white core with 12 rays on top, a giant camera-facing rune circle in the sky (an eight-point star and a 32-cell rune band), 24 light blades orbiting the tower, lightning between sigils' },
    { zh: '光柱：半徑 pillar 的圓柱外殼（兩條輪廓亮線、稀疏向下流動的縱向光紋、4 個往下滑的光環），蓄力時越來越亮；落下時是寬 2 × pillar 的白熱光柱＋1 格衝擊格＋白光閃退，之後 0.7 秒內變細淡出', en: 'pillar: a cylindrical shell of radius `pillar` (two bright silhouette lines, sparse streaks flowing down, 4 rings sliding down) brightening as it charges; on the drop a white-hot column 2 × pillar wide plus one impact frame and a white flash, then it thins away over 0.7 s' },
    { zh: '地面裂開：裂谷沿 y 方向穿過落點（中段最寬 0.5 × min(1, 長度 ÷ 4)、兩端收窄、噪聲鋸齒），裂谷像素直接露出背景星空（沒有天空時是深紫黑），兩邊各一條金色發光裂邊；焦黑圓用抖色畫在地面紋理上', en: 'split ground: a rift along y through the impact point (widest 0.5 × min(1, length / 4) in the middle, narrowing at the ends, noise-jagged) whose pixels show the starfield straight through (deep violet-black without the sky), with a gold glowing line on each edge; the scorched disc is dithered into the ground texture' },
    { zh: '收尾笑點：鏡頭推近後施法者轉身面向鏡頭、雙手微攤、頭上冒汗（一臉「這也要？」），再轉回原位；目標史萊姆在近鏡時也冒同一滴汗', en: 'punchline: after the push-in the caster turns to face the camera, palms slightly open, with a sweat drop (a deadpan "really?"), then turns back; the target slime breaks the same sweat drop in its close-up' },
  ],
  params: {
    crowd: { zh: '史萊姆數量', en: 'slime count', min: 1, max: 20, step: 1, value: 1 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    pillar: { zh: '光柱半徑', en: 'pillar radius', min: .2, max: 4.5, step: .1, value: 3.2 },
    charge: { zh: '蓄力層數', en: 'charge stages', min: 1, max: 7, step: 1, value: 5 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  SKY: { top: '#06050f', bottom: '#20163c', stars: .012, star: '#fff4d8' },
  STONE: ['#3a3450', '#4a4362', '#5a5274', '#6c6488'],
  CASTER: [-3.4, 0],
  HIT: 4.9,
  AREA: { x: 0, y: 0, rx: 1.5, ry: 1.5 },
  // world-space grass texture over the island (tone, speck, ragged edge), built once
  tex() {
    if (this._tex) return this._tex;
    const X = PXFX, n = 512, ext = 6.2, step = 2 * ext / n, R = 4.95;
    const T = { n, ext, inv: 1 / step, edge: new Float32Array(n * n), tone: new Float32Array(n * n), speck: new Uint8Array(n * n) };
    for (let w = 0; w < n; w++) for (let u = 0; u < n; u++) {
      const x = -ext + (u + .5) * step, y = -ext + (w + .5) * step, k = w * n + u, ax = Math.abs(x) / R, ay = Math.abs(y) / R;
      const e = Math.pow(Math.pow(ax, 2.4) + Math.pow(ay, 2.4), 1 / 2.4);
      T.edge[k] = e + (X.noise(x * 1.3 + 7, y * 1.3) - .5) * .14;
      const fine = X.hash(Math.floor(x * 9), Math.floor(y * 9)), fine2 = X.hash(Math.floor(x * 30) + .5, Math.floor(y * 30) + .5);
      if (fine > .972) { T.speck[k] = 1; continue; }
      if (X.hash(Math.floor(x * 9) - 1, Math.floor(y * 9) - 1) > .972) { T.speck[k] = 2; continue; }
      T.tone[k] = .5 + (X.noise(x * .7, y * .9) - .5) * .8 + (fine - .5) * .16 + (fine2 - .5) * .12 - e * .18;
    }
    this._tex = T;
    return T;
  },
  // grass colours per page mode (the engine's grass set, darkened for night like the baked grounds)
  cols(night) {
    const key = night ? 'n' : 'd';
    if (this._cols && this._cols.key === key) return this._cols;
    const X = PXFX, conv = h => { let c = X.hex(h); if (night) c = c.map((v, i) => v * .42 * .78 + [26, 24, 44][i] * .22); return X.rgb(c[0], c[1], c[2]); };
    const g = X.GROUNDS.grass;
    this._cols = { key, tones: g.tones.map(conv), speck: g.speck.map(conv), char: ['#1a1418', '#261c22', '#33282c'].map(conv) };
    return this._cols;
  },
  // the slime nearest the formation centre: the impact point and the camera's target (cached per layout)
  target(units) {
    if (this._tg && this._tg.units === units) return this._tg.u;
    let best = units[0], bd = Infinity;
    for (const u of units) { const d = Math.hypot(u.x - this.AREA.x, u.y - this.AREA.y); if (d < bd) { bd = d; best = u; } }
    this._tg = { units, u: best };
    return best;
  },
  // rift centre line (offset in x from the impact point as a function of y) and half width
  rift(y, L) { return (PXFX.noise(y * 1.6 + 3, 1.7) - .5) * .5 + (PXFX.noise(y * 5, 4.2) - .5) * .12; },
  // half width at y: widest at the impact, closing at y = ±L (L = min(island, 1.6 × pillar))
  riftW(y, open, L) { const q = Math.abs(y) / L; return q >= 1 ? 0 : open * .5 * Math.min(1, L / 4) * (.12 + .88 * (1 - q * q)) * (q > .9 ? (1 - q) * 10 : 1); },
  // a horizontal sigil (decal at height z): rings, a rune band, a hexagram, inner rings
  sigil(p, x, y, z, r, rot, I, seed, ramp) {
    if (r <= .02 || I <= 0) return;
    p.decal(x, y, z, r * 1.02, (dx, dy, rho, ang) => {
      const q = rho / r;
      if (q > 1.02) return 0;
      let v = p.band(q, .985, .025) + p.band(q, .86, .018) * .8 + p.band(q, .42, .02) * .7 + p.band(q, .2, .025) * .6;
      if (q > .875 && q < .97) {
        const a = ((ang + rot) / p.TAU % 1 + 1) % 1, cells = 24, uu = a * cells;
        v = Math.max(v, p.rune(uu % 1 * 1.1 - .05, (q - .875) / .095, seed * 31 + Math.floor(uu)) * .75);
      }
      if (q < .86) {
        const c = Math.cos(rot), s = Math.sin(rot), xx = (dx * c - dy * s) / r, yy = (dx * s + dy * c) / r;
        const d = Math.min(p.sdPoly(xx, yy, 3, .84, 0), p.sdPoly(xx, yy, 3, .84, Math.PI));
        if (d < .018) v = Math.max(v, .85);
      }
      return v > 1 ? 1 : v;
    }, ramp, I);
  },
  // a slime: camera-facing solid dome card + eyes. sq = squash (1 = round), look = eye offset up, blink 0..1
  slime(p, x, y, z, R, sq, look, blink, white) {
    const PL = this.palette, a = R * (1 + .5 * (1 - sq)), b = R * .82 * sq, h = b * 2;
    const cz = z + b * .96;
    p.scard(x, y, cz, a * 2.1, h * 1.05, (u, v) => {
      const uu = u * 1.05, vv = v * 1.05;
      if (vv < -.9) return -1;
      const q = uu * uu + vv * vv;
      if (q > 1) return -1;
      if (white === 1) return .9;
      if (white === 2) return 0;
      const hl = (uu + .42) * (uu + .42) * 6 + (vv - .45) * (vv - .45) * 9;
      if (hl < .32) return .99;
      return .22 + .5 * (1 - q) * .8 + (vv > 0 ? .1 * vv : 0) - (uu > .3 ? .12 * (uu - .3) : 0);
    }, white === 2 ? this.palette.char : PL.slime, { shadow: false });
    p.shadow(x, y, z, a * .9, z > .02 ? .6 : 1);
    if (white === 1) return;
    const eh = b * (.42 - .36 * blink), ew = a * .17, ex = a * .34, ey = cz + b * (.12 + .25 * look), c = p.cam();
    for (const sg of [-1, 1]) {
      const px = x + c.right[0] * ex * sg, py = y + c.right[1] * ex * sg, pz = ey + c.right[2] * ex * sg;
      p.scard(px, py, pz, ew * 2, Math.max(eh, R * .05) * 2, (u, v) => {
        if (u * u + v * v > 1) return -1;
        return white === 2 || (blink < .6 && u < -.05 && v > .25 && v < .75) ? .99 : .2;
      }, PL.eye, { dz: R * 1.2 });
    }
  },
  draw(p, t) {
    const PL = this.palette, v = p.v, X = PXFX, HIT = this.HIT, C0 = this.CASTER;
    const n = Math.round(p.param('crowd')), form = X.TROOPS[p.param('formation') | 0].id, PR = p.param('pillar'), NS = Math.round(p.param('charge'));
    const units = p.crowdLayout({ n, seed: 5, formation: form, area: this.AREA, faceTo: C0 }), tg = this.target(units), IX = tg.x, IY = tg.y;
    // ---- camera: world scale k about a focus that moves onto the target while zoomed in ----
    let k, fc = 0;
    if (t < .8) k = 1;
    else if (t < 2.6) k = 1 - .5 * p.ease(p.ph(t, .8, 2.6));
    else if (t < 3.95) k = .5;
    else if (t < 4.25) k = .5 + 3.1 * p.ease(p.ph(t, 3.95, 4.25));
    else if (t < HIT + .05) k = 3.6 + .3 * p.ph(t, 4.25, HIT);
    else if (t < 5.5) k = 3.9 - 3.05 * p.easeOutCubic(p.ph(t, HIT + .05, 5.5));
    else if (t < 5.85) k = .85;
    else if (t < 6.55) { fc = p.ease(p.ph(t, 5.85, 6.15)); k = .85 + 1.75 * fc; }   // push in on the caster
    else { fc = 1 - p.ease(p.ph(t, 6.55, 6.95)); k = 1 + 1.6 * fc; }
    const fk = t < 5.6 ? p.smooth(.6, 3.2, k) : 0, FX = IX * fk + C0[0] * fc, FY = IY * fk + C0[1] * fc;
    p.worldScale(k);
    // ---- ground: painted per pixel through the inverse projection (zooms with the world) ----
    const T = this.tex(), G = this.cols(p.night), R = 4.95, RL = Math.min(5.2, 1.6 * PR);
    const a = t - HIT, open = a < .05 ? 0 : t < 6.5 ? p.easeOutExpo((a - .05) / .25) : 1 - p.ease(p.ph(t, 6.5, 6.9));
    const scorch = a < 0 ? 0 : 1 - p.ph(t, 6.45, 6.85);
    const flat = v.mode === '2d';
    p.post(({ pix, W, H, kind, zb, bayer, rgb }) => {
      const fs = v.fs, voidC = rgb(12, 9, 22);
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        if (!v.Q(ix + .5, iy + .5, 0)) continue;
        const x = v.qx / fs + FX, y = v.qy / fs + FY, u = Math.floor((x + T.ext) * T.inv), w = Math.floor((y + T.ext) * T.inv);
        if (u < 0 || w < 0 || u >= T.n || w >= T.n) continue;
        const kk = w * T.n + u, e = T.edge[kk], b = bayer(ix, iy);
        if (e > 1.04 || (e > .93 && b < (e - .93) / .11)) continue;
        if (open > 0) { const off = x - IX - this.rift(y - IY, R), hw = this.riftW(y - IY, open, RL); if (Math.abs(off) < hw) { pix[iy * W + ix] = voidC; continue; } }
        const sp = T.speck[kk];
        let c = sp ? G.speck[sp - 1] : G.tones[Math.max(0, Math.min(3, Math.floor(T.tone[kk] * 4 + (flat ? 0 : (b - .5) * .6))))];
        if (scorch > 0) {
          const dx = x - IX, dy = y - IY, rho = Math.hypot(dx, dy);
          if (rho < PR && b < scorch * (1.4 - .5 * rho / PR)) c = G.char[Math.min(2, Math.floor(T.tone[kk] * 2.2 + (rho / PR) * .9))];
        }
        const i = iy * W + ix;
        pix[i] = c; zb[i] = v.qd; kind[i] = 1;
      }
    });
    const ox = -FX, oy = -FY, ix0 = IX + ox, iy0 = IY + oy;
    // ---- the caster: hero pose, arms to the sky, then a deadpan look at the camera ----
    const cf = p.cam().fwd, camA = Math.atan2(cf[1], cf[0]), turn = p.ease(p.ph(t, 5.95, 6.2)) * (1 - p.ease(p.ph(t, 6.55, 6.85)));
    let pose;
    if (t < .4) pose = 'idle';
    else if (t < .7) pose = { a: 'idle', b: 'spread', k: p.easeOutBack(p.ph(t, .4, .7), 1.4) };
    else if (t < 1.1) pose = 'spread';
    else if (t < 1.5) pose = { a: 'spread', b: 'bothUp', k: p.easeOutBack(p.ph(t, 1.1, 1.5), 1.2) };
    else if (t < 4.75) pose = 'bothUp';
    else if (t < HIT) pose = { a: 'bothUp', b: 'point', k: p.easeInCubic(p.ph(t, 4.75, HIT)) };
    else if (t < 5.4) pose = 'point';
    else if (t < 5.95) pose = { a: 'point', b: 'idle', k: p.ease(p.ph(t, 5.4, 5.8)) };
    else pose = { a: 'idle', b: 'spread', k: .38 * p.easeOutBack(p.ph(t, 6.05, 6.25), 2) * (1 - p.ease(p.ph(t, 6.55, 6.85))) };
    const fig = p.figure(C0[0] + ox, C0[1] + oy, { pose, face: camA * turn });
    // a sweat drop on the caster too, during the deadpan look
    if (t > 6.15 && t < 6.6) {
      const dk = p.ph(t, 6.15, 6.45), c = p.cam(), hd = fig.head;
      p.scard(hd[0] + c.right[0] * .2, hd[1] + c.right[1] * .2, hd[2] + .12 - .1 * dk, .1, .15, (uu, vv) => (uu * uu + (vv + .3) * (vv + .3) < .7 || (Math.abs(uu) < .5 - vv * .5 && vv > 0) ? .8 : -1), ['#4a7ab8', '#7ab0e8', '#c8e8ff'], { dz: .3 });
    }
    // ---- slimes (custom solids) ----
    const states = [];
    for (const u of units) {
      const d = Math.hypot(u.x - IX, u.y - IY), th = d <= PR ? HIT + .02 * d : null;
      states.push({ hitT: th });
      const x = u.x + ox, y = u.y + oy, ph = u.r1 * 6.28, Rs = .17;
      let sq = 1 + .08 * Math.sin(t * 7 + ph), z = 0, look = 0, blink = 0, scale = 1;
      const hop = (t * .85 + u.r2) % 1;
      if (hop > .72) { const hk = (hop - .72) / .28; z = .16 * 4 * hk * (1 - hk); sq = 1 + .18 * Math.sin(Math.PI * hk); }
      else if (hop > .62) sq = 1 - .25 * Math.sin(Math.PI * (hop - .62) / .1);
      const bl = (t + u.r3 * 3) % 2.3;
      if (bl < .12) blink = Math.sin(Math.PI * bl / .12);
      if (u === tg && t > 4.35 && t < HIT) { look = p.ease(p.ph(t, 4.5, 4.65)); if (t > 4.5) { z = 0; sq = 1 - .06 * look; } }
      if (th != null) {
        if (t >= th + .055 && t < 6.6) continue;               // gone in the light (an ink silhouette on the impact frame first)
        if (t >= 6.6) { scale = p.easeOutBack(p.ph(t, 6.6 + .08 * u.r2, 6.88 + .06 * u.r2), 2.2); if (scale <= .02) continue; }
      } else if (t > HIT) {
        const f = 1 - p.ph(t, HIT + .6, HIT + 1.1);
        sq *= 1 - .4 * f; z = 0; blink = Math.max(blink, f > .3 ? 1 : 0);
      }
      const jx = th == null && t > HIT && t < HIT + 1 ? (p.r(Math.floor(t * 30), u.i) - .5) * .03 : 0;
      this.slime(p, x + jx, y, z, Rs * scale, sq, look, blink, th != null && t > th - .08 && t < th ? 1 : th != null && t >= th && t < th + .055 ? 2 : 0);
      // the sweat drop on the target
      if (u === tg && t > 4.55 && t < HIT) {
        const dk = p.ph(t, 4.55, 4.85), c = p.cam();
        p.scard(x + c.right[0] * Rs * 1.05, y + c.right[1] * Rs * 1.05, Rs * 1.75 - dk * Rs * .35, Rs * .34, Rs * .5, (uu, vv) => (uu * uu + (vv + .3) * (vv + .3) < .7 || (Math.abs(uu) < .5 - vv * .5 && vv > 0) ? .8 : -1), ['#4a7ab8', '#7ab0e8', '#c8e8ff'], { dz: Rs });
      }
    }
    // ---- the world turns to space ----
    const skyK = t < 6 ? p.easeOutCubic(p.ph(t, .7, 1.5)) : 1 - p.ph(t, 6.5, 6.9);
    if (skyK > .01) p.domain({ amt: skyK, c: t < 6 ? fig.hand : [ox - 2.5, oy - 2.5, 5], sky: this.SKY, ground: skyK > .45 && k < 1.3 && t < HIT ? this.STONE : null, solids: .15, t: 0 });
    // ---- light: aura, reticle, sigil tower, core, pillar shell ----
    const charge = p.ph(t, 1.0, 3.9), live = t < HIT + .02, tw = t < 3.9 ? 1 : 1 - p.ph(k, .7, 1.4);
    if (t > .65 && t < 5.7) {
      const au = p.ph(t, .65, .8) * (1 - p.ph(t, 5.2, 5.7)) * (1 - p.ph(k, 1.0, 1.6));
      p.aura(C0[0] + ox, C0[1] + oy, 0, { r: .6 + .3 * charge, h: 2.4 + 1.4 * charge, ramp: PL.gold, I: (.85 + .3 * charge) * au, t, n: 16 });
      p.light(C0[0] + ox, C0[1] + oy, 0, 1.6, PL.gold, .6 * au);
      if (t < .9) p.ring(C0[0] + ox, C0[1] + oy, .05, .3 + 2.2 * p.easeOutExpo(p.ph(t, .7, .9)), .12, PL.gold, 1.2 * (1 - p.ph(t, .7, .9)));
    }
    const inhale = 1 - .1 * p.env(t, 3.65, 3.8, 3.85, 3.92), flare = p.env(t, 3.85, 3.9, 4.0, 4.3);
    const ret = live ? p.ph(t, 1.0, 1.3) : 0;
    if (ret > 0) {
      const rr = PR, rot = t * .4;
      p.decal(ix0, iy0, 0, rr * 1.03, (dx, dy, rho, ang) => {
        const q = rho / rr;
        let val = p.band(q, .985, .02 / Math.max(.4, rr)) + p.band(q, .66, .012 / Math.max(.3, rr)) * .7 + p.band(q, .33, .012 / Math.max(.3, rr)) * .7;
        const ad = Math.min(Math.abs(dx), Math.abs(dy)), lw = .012 + .0025 / Math.max(.1, k);
        if (ad < lw && rho > .06 && rho < rr * .95) val = Math.max(val, .8);
        const tick = ((ang + rot) / (p.TAU / 16) % 1 + 1) % 1;
        if (q > .91 && q < .97 && tick < .05) val = Math.max(val, .9);
        return val;
      }, PL.reticle, .95 * ret * (1 + .4 * flare));
    }
    const lvls = [];
    for (let s = 0; s < NS; s++) {
      const ts = 1.1 + s * 1.8 / Math.max(NS, 2), pop = live ? p.easeOutBack(p.ph(t, ts, ts + .28), 2.2) : 0;
      if (pop <= 0) continue;
      if (tw <= 0) break;
      const z = 1.0 + s * 1.15, r = Math.max(PR, 1.4) * (1 - .1 * s) * pop * inhale, rot = (s & 1 ? -1 : 1) * t * (.5 + .12 * s) + s;
      const flash = 1 - p.ph(t, ts, ts + .25);
      this.sigil(p, ix0, iy0, z, r, rot, (.75 + .25 * charge + .7 * flash + .5 * flare) * tw, s, PL.sigil);
      lvls.push([z, r]);
    }
    const topZ = 1.0 + (NS - 1) * 1.15 + 1.4;
    if (live && t > 1.4 && tw > 0) {
      const cg = p.easeInCubic(p.ph(t, 1.4, 3.85)), cr = (.25 + 1.0 * cg) * inhale * (1 + .5 * flare);
      p.core(ix0, iy0, topZ, { r: cr, ramp: PL.gold, I: 1.1 * tw, t, rays: 12, spin: 1.2, rayLen: 2.4, halo: 2.6 });
      p.charge(ix0, iy0, topZ, (t * .9) % 1, { n: 26, R: 3.5 + PR * .5, ramp: PL.gold, len: .6, seed: Math.floor(t * .9) });
      // light blades orbiting the tower
      const nb = Math.round(24 * Math.min(1.5, p.density)), orb = p.ph(t, 2.0, 2.5);
      if (orb > 0) for (let b = 0; b < nb; b++) {
        const q = p.formation('orbit', b, nb, t, { c: [ix0, iy0, 1 + (topZ - 1) * p.r(b, 9)], R: PR * (1.1 + .25 * p.r(b, 8)) * orb, H: .4, spin: (b & 1 ? -1 : 1) * .9 });
        p.petal(q[0], q[1], q[2], [-(q[1] - iy0), q[0] - ix0, 0], .3, PL.gold, .9 * orb);
      }
      // lightning between sigil levels
      if (lvls.length > 1 && t > 2.4) for (let j = 0; j < 2; j++) {
        const sd = Math.floor(t * 12) * 7 + j * 3, la = Math.floor(p.r(sd, 1) * (lvls.length - 1)), l0 = lvls[la], l1 = lvls[la + 1];
        if (p.r(sd, 2) > .6) continue;
        const an = p.r(sd, 3) * p.TAU, an2 = an + (p.r(sd, 4) - .5) * 1.2;
        p.bolt([ix0 + Math.cos(an) * l0[1], iy0 + Math.sin(an) * l0[1], l0[0]], [ix0 + Math.cos(an2) * l1[1], iy0 + Math.sin(an2) * l1[1], l1[0]], PL.pillar, { seed: sd, jag: .25, w: .05, I: 1.1 });
      }
      // the pillar's shell fills in from the sky
      const fill = p.ph(t, 2.6, 3.85), segs = 40, top = topZ + 8;
      if (fill > 0) {
        // the column: bright silhouette edges, sparse streaks flowing down, rings sliding down
        const bot = top - top * p.easeOutCubic(fill), Lp = [], Rp = [], cr2 = p.cam().right, I0 = (.5 + .5 * fill) * (1 + .6 * flare) * tw;
        for (let g = 0; g <= segs; g++) { const an = g / segs * p.TAU; Lp.push([ix0 + Math.cos(an) * PR, iy0 + Math.sin(an) * PR, bot]); Rp.push([ix0 + Math.cos(an) * PR, iy0 + Math.sin(an) * PR, top]); }
        p.ribbon(Lp, Rp, (uu, vv) => (p.noise(uu * 60, vv * 4 + t * 4) > .8 ? .55 : 0) * Math.min(1, vv / .1), PL.pillar, I0 * .8);
        for (const sg of [-1, 1]) p.line([ix0 + cr2[0] * PR * sg, iy0 + cr2[1] * PR * sg, bot], [ix0 + cr2[0] * PR * sg, iy0 + cr2[1] * PR * sg, top], .07, PL.pillar, 1.1 * I0, { w1: .05 });
        for (let g = 0; g < 4; g++) {
          const ph = (t * .9 + g / 4) % 1, z = top * (1 - p.easeIn(ph));
          if (z > bot) p.ring(ix0, iy0, z, PR, .06, PL.pillar, .9 * I0 * Math.sin(Math.PI * ph));
        }
        p.line([ix0, iy0, topZ], [ix0, iy0, top + 6], .2 + .3 * cg, PL.pillar, 1.1 * tw, { w1: .05 });
      }
      // the heavens open: a giant camera-facing sigil behind the core
      const hv = p.easeOutBack(p.ph(t, 2.3, 2.8), 1.6) * tw;
      if (hv > 0) {
        const HR = (2.6 + PR * .6) * hv * inhale, rot = -t * .3;
        p.card(ix0, iy0, topZ + .4, HR * 2, HR * 2, (uu, vv) => {
          const q = Math.hypot(uu, vv);
          if (q > 1) return 0;
          let val = p.band(q, .97, .03) + p.band(q, .8, .02) * .7 + p.band(q, .5, .02) * .5;
          if (q > .82 && q < .95) { const an = ((Math.atan2(vv, uu) + rot) / p.TAU % 1 + 1) % 1, uu2 = an * 32; val = Math.max(val, p.rune(uu2 % 1 * 1.1 - .05, (q - .82) / .13, 77 + Math.floor(uu2)) * .7); }
          if (q < .8) { const c = Math.cos(-rot * 2), sn = Math.sin(-rot * 2), xx = uu * c - vv * sn, yy = uu * sn + vv * c; if (p.sdPoly(xx, yy, 8, .78, 0, 3) < .012) val = Math.max(val, .7); }
          return val;
        }, PL.sigil, (.55 + .3 * charge + .5 * flare) * hv);
      }
      // starlight pulled out of the sky into the core
      if (t > 2.2) p.charge(ix0, iy0, topZ, (t * .7) % 1, { n: 30, R: 9, ramp: PL.pillar, len: 1.4, w: .06, seed: 40 + Math.floor(t * .7), I: tw });
      p.light(ix0, iy0, 0, PR * 1.1, PL.gold, .35 + .5 * cg);
    }
    // ---- close-up: the ground glows under the light overhead, motes drift down ----
    const cu = t > 3.9 && t < HIT ? p.ph(k, 1.0, 2.5) : 0;
    if (cu > 0) {
      p.light(ix0, iy0, 0, PR * 1.2, PL.gold, (.55 + .35 * p.ph(t, 4.3, HIT)) * cu);
      const nm = Math.round(40 * p.density);
      for (let m = 0; m < nm; m++) {
        const ph = (t * (.35 + .2 * p.r(m, 2)) + p.r(m, 3)) % 1, an = p.r(m, 4) * p.TAU, rr = Math.sqrt(p.r(m, 5)) * 1.4;
        p.dot(ix0 + Math.cos(an) * rr, iy0 + Math.sin(an) * rr, 1.6 * (1 - ph), PL.gold, (.5 + .5 * Math.sin(ph * Math.PI)) * cu, 1);
      }
    }
    // ---- the drop: white-out, impact frame, the pillar thinning away ----
    if (a >= -.12 && a < .9) {
      if (a < 0) {
        const k2 = p.easeIn((a + .12) / .12), bz = 4.5 * (1 - k2);
        p.line([ix0, iy0, 30], [ix0, iy0, bz], PR * 2, PL.pillar, 1.4);
      } else {
        const thin = Math.pow(1 - p.ph(a, .05, .75), 1.5);
        if (a <= .021 + 1 / 30) { p.light(ix0, iy0, 0, PR * 1.6, PL.pillar, 1.6); p.impactFrame({ ink: '#18101a', paper: '#fffaf0', accent: '#ffc040', thr: 90 }); }
        else if (thin > 0) {
          const w = PR * 2 * (.25 + .75 * thin);
          if (a > .15) p.line([ix0, iy0, -.1], [ix0, iy0, 30], w * 1.25, PL.pillar, .5 * thin, { pow: 2 });
          p.line([ix0, iy0, -.1], [ix0, iy0, 30], w * .8, PL.pillar, 1.4 * thin);
          p.light(ix0, iy0, 0, PR * 1.4, PL.pillar, 1.2 * thin);
        }
        if (a > .055) p.shock(ix0, iy0, .05, p.ph(a, .055, .85), { R: PR * 1.5, w: .4, ramp: PL.gold, ground: true, dust: PL.dust, dustN: 14 });
        if (a > .055 && a < .4) p.speedLines(ix0, iy0, 1, { n: 28, R0: PR * .9, R1: PR * 3, ramp: PL.pillar, I: 1 - (a - .055) / .345, seed: Math.floor(t * 30) });
      }
    }
    if (a > .021 + 1 / 30 && a < .25) p.flash('#fffbea', .9 * (1 - a / .25));
    // ---- aftermath: gold ring on the scorch edge, glowing rift edges, smoke ----
    if (scorch > 0 && a > .1) {
      p.ring(ix0, iy0, .02, PR, .06, PL.gold, .9 * scorch * (.6 + .4 * Math.pow(1 - p.ph(a, .1, 1.2), 2)));
      if (open > .05) for (const sg of [-1, 1]) {
        const pts = [];
        for (let g = 0; g <= 32; g++) { const yy = -RL + g / 32 * 2 * RL; pts.push([IX + this.rift(yy, RL) + sg * this.riftW(yy, open, RL) + ox, IY + yy + oy, .01]); }
        p.trail(pts, .06, .06, PL.gold, .72 * open, .72 * open);
      }
      const nsm = Math.round(12 * p.density);
      for (let s = 0; s < nsm; s++) {
        const life = p.ph(a, .15 + .1 * p.r(s, 2), 1.6 + .4 * p.r(s, 3));
        if (life <= 0 || life >= 1) continue;
        const an = p.r(s, 4) * p.TAU, rr = PR * Math.sqrt(p.r(s, 5)) * .9;
        p.ball(IX + Math.cos(an) * rr + ox, IY + Math.sin(an) * rr + oy, .2 + 1.4 * life, .25 + .35 * life, PL.dust, { alpha: .8 * (1 - life) * scorch, rough: .5, shadow: false, seed: s });
      }
    }
    p.worldScale(1);
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(states, { t, alpha: 1 - p.ph(t, 6.45, 6.65) });
  },
});
