// 換色倒戈 / Palette Swap — Twist pack (original design): a dithered colour wave from the caster repaints every other red soldier in the caster's blue, and on one beat the converts turn their spears on the reds beside them
PXFX.define({
  id: 'palette-swap',
  loop: 6,
  beats: [{ t: 1.0, kind: 'cast', power: .7 }, { t: 3.25, kind: 'hit', power: 1.4 }, { t: 3.8, kind: 'pulse', power: .35 }],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'stone' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'impact'],
  palette: {
    wave: ['#2a4a9a', '#3a72d8', '#5aa8ff', '#a8d8ff', '#f0f8ff'],
    swatchRed: ['#5a1e22', '#7e2a2c', '#a8403a', '#cc6a52'],
    swatchBlue: ['#1e3a7a', '#2c5cb0', '#4a8ae0', '#8ac4ff'],
    blueBody: ['#1c3270', '#24449a', '#2e5cc4', '#4078e0'],
    blueHelm: ['#4a90f0', '#6cb0ff', '#a0d4ff', '#e0f2ff'],
    deadBody: ['#1c161a', '#272024', '#342a2c', '#423636'],
    deadHelm: ['#3a1c22', '#4e2428', '#682e30', '#803a38'],
    stab: ['#6a7a98', '#b8c8e0', '#eef6ff', '#ffffff'],
    caster: ['#1e2c52', '#2a3e70', '#3a5490', '#5070b0', '#7898d0'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者（縮放 0.85，藍色衣甲）站在 (−4.3, 0)；對面一千人紅軍方陣（中心 (1.0, 0)、半深 2.8、半寬 2.6，30 × 34，兵距約 0.17，3–5 像素高的像素小兵）；地面是灰色石地', en: 'pose: the caster (scale 0.85, in blue) stands at (−4.3, 0) facing a red block of a thousand (centre (1.0, 0), half depth 2.8, half width 2.6, 30 × 34, spacing ~0.17, 3–5 px pixel soldiers) on grey stone' },
    { k: 'charge', t: [.4, 1.0], zh: '集氣：0.4–0.7 秒施法者舉起右手，手上方浮出一條 4 格調色盤色票（每格 0.19，紅軍頭盔的 4 個紅色，實心）；0.8–0.95 秒 4 格由左到右逐格閃白並換成 4 個藍色', en: 'charge: at 0.4–0.7 s the caster raises the right hand and a strip of 4 palette swatches (0.19 each, solid, the 4 reds of the enemy helmets) floats above it; at 0.8–0.95 s the swatches flash white one by one, left to right, and turn into 4 blues' },
    { k: 'shape', t: [1.0, 1.1], zh: '成形：1.0 秒施法者向前揮手，色票收縮消失並閃一下藍光，一道色波由施法者腳下以 5 單位／秒向外擴散', en: 'shape: at 1.0 s the caster sweeps the arm forward, the swatches collapse in a blue flash and a colour wave spreads from the caster’s feet at 5 units/s' },
    { k: 'motion', t: [1.05, 3.05], zh: '推進：色波是寬 0.9 的地面光帶，帶內地面按 4×4 有序抖動（Bayer）格子著色：格子對齊陣型的行列（方陣：行距 × 列距），Bayer 值 ÷ 16 < dither（預設 0.5，即棋盤格）的格子塗亮藍，其餘塗深藍；光帶後拖一段 0.8 寬漸淡的尾巴，大軍腳下被選中的格子保留淡藍直到刺殺；前緣有一道藍光弧與上升光點。判定：色波經過（距施法者 ≤ wave，預設 9）而且所站格子被選中的士兵倒戈，倒戈時間 = 1.05 + 距離 ÷ 5；倒戈者閃白 2 格，身上衝起一道 0.25 秒的藍色短光柱，之後換成藍身淺藍盔', en: 'motion: the wave is a 0.9-wide ground band; inside it the ground is painted with a 4×4 ordered (Bayer) dither on cells aligned with the formation’s rows and files (block: row pitch × file pitch): cells whose Bayer value / 16 < dither (default 0.5, a checkerboard) turn bright blue, the rest dark navy; a 0.8-wide fading tail trails the band and under the army the picked cells keep a faint blue until the strike; a blue light arc and rising motes mark the front. Rule: a soldier converts if the wave reaches him (distance from the caster ≤ wave, default 9) and his cell is picked; conversion time = 1.05 + distance / 5; converts flash white for 2 frames with a short blue pillar of light through the body (0.25 s), then wear a blue body and pale blue helmet' },
    { k: 'impact', t: [2.9, 3.5], zh: '命中：2.9 秒起藍兵向後蓄勢、紅兵發抖；3.25 秒施法者握拳（頓幀＋震屏），所有藍兵同時轉身刺向身旁的紅兵：每個藍兵向最近的目標刺出一道鋼白色矛光（0.16 秒，矛尖一點白光）。判定：紅兵在 1.5 × 兵距（矛的長度）內有任何一個藍兵就倒下，命中時間 = 3.25 + 0–0.06 秒；身旁沒有藍兵的紅兵倖存。棋盤格時每個紅兵四邊都是藍兵，全軍覆沒；擊殺計數 = 倒戈 + 被刺，跳到 1000/1000 變金色', en: 'impact: from 2.9 s the blues wind up and the reds tremble; at 3.25 s the caster clenches a fist (hit-stop, shake) and every blue turns and stabs at once: one steel-white spear streak (0.16 s, a white point at the tip) from each blue to its nearest target. Rule: a red falls if any blue stands within 1.5 × spacing (a spear’s reach), hit time = 3.25 + 0–0.06 s; reds with no blue neighbour survive. On a checkerboard every red has blues on all four sides, so the whole army goes; the counter (converted + stabbed) jumps to 1000/1000 and turns gold' },
    { k: 'after', t: [3.5, 6], zh: '餘波：3.65–4.05 秒藍兵轉向施法者，由前排到後排接連跳起 0.09 敬禮，倒下的紅兵改用暗色調色盤（近黑身體、暗紅頭盔），地面圖案 3.3–3.8 秒淡出；擊殺計數 4.3–4.5 秒淡出，紅兵屍體 4.4–4.8 秒淡出；4.7–5.4 秒藍兵由遠到近逐個閃白換回紅色，倒下的紅兵 4.85–5.7 秒原地淡入，回到開場', en: 'aftermath: at 3.65–4.05 s the blues face the caster and hop 0.09 in salute in a ripple from the front ranks back, the fallen reds are redrawn dark (near-black body, dull red helmet), and the ground pattern fades at 3.3–3.8 s; the counter fades at 4.3–4.5 s and the red bodies at 4.4–4.8 s; at 4.7–5.4 s the blues flash white and swap back to red, far ranks first, and the fallen reds fade in on their spots at 4.85–5.7 s, back to the opening frame' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵數量 500–2000（預設 1000），按陣型（預設方陣）排在中心 (1.0, 0)、半深 2.8、半寬 2.6 的範圍內，紅盔像素小兵；左上角擊殺計數「骷髏 已擊殺/總數」，倒戈和被刺都算，全滅時變金色', en: 'army and formation: 500–2000 soldiers (default 1000) in a formation (default block) inside centre (1.0, 0), half depth 2.8, half width 2.6, red-helmeted pixel soldiers; a kill counter "skull killed/total" in the top-left counts both converts and stabbed soldiers and turns gold on a full wipe' },
    { zh: '判定與倖存者：每個士兵按陣型的行號 r、列號 c 取 4×4 Bayer 值 B[r mod 4][c mod 4] ÷ 16；B ÷ 16 < dither 且距施法者 ≤ wave 就倒戈；之後每個紅兵若在 1.5 × 兵距內有藍兵就被刺死，否則倖存。dither 0.5 = 棋盤格（全滅）；0.25 時每 2×2 只有一個藍兵，斜對角的紅兵多數仍在矛的範圍內；0.0625 時大約一半紅兵倖存；wave 小時後排沒有被色波掃到，只有前排倒戈與被刺。鄰居查詢用空間網格，每個陣型與參數只算一次', en: 'rule and survivors: each soldier takes the 4×4 Bayer value B[r mod 4][c mod 4] / 16 of his formation row r and file c; he converts if B / 16 < dither and his distance from the caster ≤ wave; then every red with a blue within 1.5 × spacing is stabbed, the rest survive. dither 0.5 = a checkerboard (full wipe); at 0.25 one blue per 2×2, and most diagonal reds are still within a spear’s reach; at 0.0625 about half the reds survive; with a short wave the rear ranks are never painted and only the front converts and dies. Neighbour queries use a spatial grid, computed once per formation and knob values' },
    { zh: '色波與網點：地面染色只改沒有被擋住的地面像素（按每個像素下方的地面點計算格子），帶內選中的格子混入 85% 亮藍、未選中的混入 85% 深藍，帶後拖一段 0.8 寬漸淡的尾巴；只有大軍範圍內的選中格子保留 30% 淡藍，直到刺殺之後淡出；前緣是一道藍白色光弧（只畫在島上）加 30 粒上升藍光點', en: 'wave and dither: the ground stain only touches uncovered ground pixels (the cell is computed from the ground point under each pixel); inside the band picked cells mix 85% bright blue and unpicked cells 85% dark navy, with a 0.8-wide fading tail behind; only inside the army’s footprint do picked cells keep a 30% blue tint until after the strike; the front is a blue-white light arc (only over the island) with 30 rising blue motes' },
    { zh: '倒戈外觀（自訂反應）：倒戈者先閃白 0.07 秒，再用藍色調色盤（藍身體、淺藍頭盔）重畫；刺殺前向後蓄勢傾斜 0.2，刺出時向目標前傾 0.35 並前移 0.3 個兵距；敬禮時轉向施法者，由前排到後排接連跳高 0.09', en: 'convert look (custom reaction): a 0.07 s white flash, then the soldier is redrawn with a blue palette (blue body, pale blue helmet); before the strike it leans back 0.2, on the strike it lunges 0.35 towards the target and steps 0.3 spacing forward; in the salute they turn to the caster and hop 0.09 in a ripple from the front ranks back' },
    { zh: '刺殺：每個藍兵一道由胸口刺向最近目標胸口的白色矛光（0.05 秒內伸出，0.15 秒消失）；被刺的紅兵閃白，背向藍兵倒下，倒地後改用暗色調色盤；刺殺瞬間大軍上空一片藍白地面光', en: 'stab: one white spear streak per blue, from its chest to the nearest target’s chest (extends within 0.05 s, gone after 0.15 s); stabbed reds flash white, fall away from the blue and are redrawn dark once down; a blue-white ground light washes over the army on the strike' },
    { zh: '色票：4 個實心小方格浮在施法者手上方，紅色逐格閃白換成藍色，提示「把紅色換成藍色」；施法者本身也是藍色，表示藍色是施法者一方', en: 'swatches: 4 small solid squares float over the caster’s hand and flip one by one from red to blue through a white flash, telling the viewer “red becomes blue”; the caster is dressed in blue, so blue reads as the caster’s side' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    dither: { zh: '網點密度', en: 'dither fraction', min: .0625, max: 1, step: .0625, value: .5 },
    wave: { zh: '色波範圍', en: 'wave reach', min: 2, max: 10, step: .1, value: 9 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  T0: 1.05, V: 5, BW: .9, STRIKE: 3.25,
  BAYER: [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
  // the formation's row / file lattice in its local frame (q = depth away from the caster, w = across)
  lattice(form, n, D, Wd, sp) {
    if (form === 'block') {
      const cols = Math.max(1, Math.round(Math.sqrt(n * Wd / D))), nr = Math.ceil(n / cols), sw = 2 * Wd / cols, sd = 2 * D / nr;
      return { sd, sw, q0: -(nr - 1) / 2 * sd, w0: -(cols - 1) / 2 * sw, shear: 0 };
    }
    if (form === 'line') {
      const nr = Math.max(1, Math.round(Math.sqrt(n / 5))), per = Math.ceil(n / nr), sw = 2.3 * Wd / per, sd = Math.min(sw * 1.3, 2 * D / nr);
      return { sd, sw, q0: -(nr - 1) / 2 * sd, w0: -(per - 1) / 2 * sw, shear: 0 };
    }
    if (form === 'column') {
      const files = Math.max(1, Math.round(Math.sqrt(n / 5))), per = Math.ceil(n / files), sd = 2.4 * D / per, sw = Math.min(sd * 1.3, 2 * Wd / files);
      return { sd, sw, q0: -(per - 1) / 2 * sd, w0: -(files - 1) / 2 * sw, shear: 0 };
    }
    if (form === 'wedge') {
      let R = 1;
      while (R * (R + 1) / 2 < n) R++;
      const sd = 2 * D / R, sw = Math.min(sd * 1.2, 2.2 * Wd / R);
      return { sd, sw, q0: -D + sd / 2, w0: 0, shear: .5 };
    }
    return { sd: sp, sw: sp, q0: 0, w0: 0, shear: 0 };
  },
  // dither value of the cell under world point (x, y): the same function picks soldiers and paints the ground
  ditherAt(G, x, y) {
    const dx = x - G.cx, dy = y - G.cy, q = dx * G.ex + dy * G.ey, w = -dx * G.ey + dy * G.ex, L = G.L;
    const r = Math.round((q - L.q0) / L.sd), c = Math.round((w - L.w0) / L.sw + L.shear * r);
    return this.BAYER[(r & 3) * 4 + (c & 3)] / 16;
  },
  // conversions, victims and hit times (cached per layout + dither + wave)
  plan(p, units, form, n, dither, wave) {
    const key = [form, n, dither, wave].join('|');
    if (this._pl && this._pl.units === units && this._pl.key === key) return this._pl;
    const A = this.AREA, CA = this.CASTER, sp = units.spacing, RK = 1.5 * sp;
    const fl = Math.hypot(CA[0] - A.x, CA[1] - A.y);
    const G = { cx: A.x, cy: A.y, ex: -(CA[0] - A.x) / fl, ey: -(CA[1] - A.y) / fl, L: this.lattice(form, n, A.rx, A.ry, sp) };
    const N = units.length, conv = new Uint8Array(N), tc = new Float32Array(N), dist = new Float32Array(N);
    let dmax = 0;
    for (const u of units) {
      const d = Math.hypot(u.x - CA[0], u.y - CA[1]);
      dist[u.i] = d; dmax = Math.max(dmax, d);
      if (d <= wave && this.ditherAt(G, u.x, u.y) < dither) { conv[u.i] = 1; tc[u.i] = this.T0 + d / this.V; }
    }
    const grid = p.crowdGrid(units, Math.max(.05, RK));
    const killer = new Int32Array(N).fill(-1), victim = new Int32Array(N).fill(-1), hitT = new Array(N).fill(null);
    for (const u of units) {
      if (conv[u.i]) { hitT[u.i] = tc[u.i]; continue; }
      let bd = Infinity;
      for (const v of grid.near(u.x, u.y, RK)) if (conv[v.i]) { const d = (v.x - u.x) ** 2 + (v.y - u.y) ** 2; if (d < bd) { bd = d; killer[u.i] = v.i; } }
      if (killer[u.i] >= 0) hitT[u.i] = this.STRIKE + .06 * u.r1;
    }
    for (const u of units) {
      if (!conv[u.i]) continue;
      let bd = Infinity;
      for (const v of grid.near(u.x, u.y, RK)) if (!conv[v.i] && killer[v.i] >= 0) { const d = (v.x - u.x) ** 2 + (v.y - u.y) ** 2; if (d < bd) { bd = d; victim[u.i] = v.i; } }
    }
    this._pl = { units, key, G, conv, tc, dist, dmax, killer, victim, hitT };
    return this._pl;
  },
  draw(p, t) {
    const PL = this.palette, CA = this.CASTER, A = this.AREA, STRIKE = this.STRIKE;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const dither = p.param('dither'), wave = p.param('wave');
    const co = { n, seed: 41, formation: form, area: A, faceTo: CA };
    const units = p.crowdLayout(co);
    const pl = this.plan(p, units, form, n, dither, wave);
    const sc = p.clamp((units.spacing || .4) / .4, .08, 1.5), sp = units.spacing;
    // ---- caster ----
    let pose;
    if (t < .4) pose = 'idle';
    else if (t < .98) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .4, .7), 1.3) };
    else if (t < 2.85) pose = { a: 'raise', b: 'point', k: p.easeOutExpo(p.ph(t, .98, 1.12)) };
    else if (t < 3.6) pose = { a: 'point', b: 'punch', k: p.easeInCubic(p.ph(t, 2.85, STRIKE)) };
    else if (t < 4.3) pose = { a: 'punch', b: 'raise', k: p.easeOutCubic(p.ph(t, 3.6, 3.9)) };
    else pose = { a: 'raise', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.3, 4.9)) };
    const fig = p.figure(CA[0], CA[1], { pose, scale: .85, color: PL.caster });
    // ---- the army ----
    const BLUE = { body: PL.blueBody, helm: PL.blueHelm, spear: ['#3d4660', '#8a9ab8', '#e0ecff'] };
    const blues = [], dead = [];
    const swapT = i => 4.7 + .6 * (1 - pl.dist[i] / pl.dmax);   // blues swap back to red, far ranks first
    const salute = p.env(t, 3.6, 3.7, 4.15, 4.3);
    const react = (s, a, u) => {
      const i = u.i;
      s.walk = null;
      if (pl.conv[i]) {
        const sw = swapT(i);
        if (t >= sw + .07) { s.flash = false; return; }          // back in the red army
        const c = Object.assign({}, s);
        c.flash = a < .07 || t >= sw; c.spear = true;
        const v = pl.victim[i];
        if (v >= 0 && t < STRIKE + .5) {
          const tu = units[v], dx = tu.x - u.x, dy = tu.y - u.y, dl = Math.hypot(dx, dy) || 1;
          c.tdir = [dx / dl, dy / dl];
          const wind = p.ph(t, STRIKE - .35, STRIKE - .02), lunge = t >= STRIKE ? p.easeOutExpo(p.ph(t, STRIKE, STRIKE + .06)) * (1 - p.ph(t, STRIKE + .2, STRIKE + .45)) : 0;
          c.tilt = -.2 * wind * (1 - lunge) + .35 * lunge;
          c.x += c.tdir[0] * .3 * sp * lunge; c.y += c.tdir[1] * .3 * sp * lunge;
        }
        if (salute > 0) { c.z = .09 * sc / .41 * Math.sin(Math.PI * p.ph(t, 3.65 + .1 * pl.dist[i] / pl.dmax, 3.95 + .1 * pl.dist[i] / pl.dmax)); c.face = Math.atan2(CA[1] - u.y, CA[0] - u.x); c.tilt = 0; }
        blues.push(c);
        s.hide = true;
        return;
      }
      // a stabbed red: falls away from his killer, the body fades, then a fresh soldier fades in on the spot
      const k = units[pl.killer[i]], dx = u.x - k.x, dy = u.y - k.y, dl = Math.hypot(dx, dy) || 1;
      s.tdir = [dx / dl, dy / dl];
      const f0 = 4.4 + .2 * u.r2, back = 4.85 + .4 * u.r1;
      if (t >= back) { s.flash = false; s.tdir = [1, 0]; s.alpha = p.easeOut(p.ph(t, back, back + .45)); if (s.alpha <= 0) s.hide = true; return; }
      s.tilt = Math.PI / 2 * p.easeIn(a / .3); s.spear = a < .12;
      s.alpha = 1 - p.ph(t, f0, f0 + .2);
      if (s.alpha <= 0) s.hide = true;
      else if (a > .32) { dead.push(Object.assign({}, s)); s.hide = true; }
    };
    const st = p.crowd(Object.assign({
      t, scale: 'auto', hit: u => pl.hitT[u.i], react, at: [CA[0], CA[1], 0],
      fear: u => (pl.killer[u.i] >= 0 ? .55 * p.ph(t, STRIKE - .4, STRIKE - .05) : pl.hitT[u.i] == null ? .3 * p.env(t, 3.2, 3.4, 4.0, 4.6) : 0),
    }, co));
    const drawer = st.lod === 'sprite' ? p.pawnSprite : p.pawn, heads = [], DEAD = { body: PL.deadBody, helm: PL.deadHelm };
    for (const c of dead) { c.hide = false; drawer.call(p, c, { scale: st.scale, pal: DEAD }); }
    for (const c of blues) {
      c.hide = false;
      const r = drawer.call(p, c, { scale: st.scale, pal: BLUE });
      if (r) heads.push([c.i, r.head, r.chest]);
    }
    // ---- the dithered colour wave on the ground (same cells as the rule) ----
    const F = Math.min(this.V * (t - this.T0), wave), end = (wave / this.V) + this.T0;
    const bandA = t < this.T0 ? 0 : 1 - p.ph(t, end, end + .3), tintA = t < this.T0 ? 0 : 1 - p.ph(t, 3.3, 3.8);
    const G = pl.G, BW = this.BW;
    if (tintA > 0 && F > .05) {
      // inside the band: picked cells bright blue, the others dark; a short tail behind the band, and under the
      // army the picked cells stay faintly blue until the strike
      const on = (dx, dy) => this.ditherAt(G, CA[0] + dx, CA[1] + dy) < dither;
      const inArmy = (dx, dy) => { const ex = (CA[0] + dx - A.x) / (A.rx + .25), ey = (CA[1] + dy - A.y) / (A.ry + .25); return ex * ex + ey * ey < 1; };
      p.stain(CA[0], CA[1], F, (dx, dy, rho) => {
        if (!on(dx, dy)) return 0;
        const b = rho > F - BW ? 1.5 * bandA : rho > F - BW - .8 ? (1 - (F - BW - rho) / .8) * .9 * bandA : 0;
        return Math.max(b, inArmy(dx, dy) ? .45 * tintA : 0);
      }, '#5aa8ff', 1);
      if (bandA > 0) p.stain(CA[0], CA[1], F, (dx, dy, rho) => (rho > F - BW && !on(dx, dy) ? .9 * bandA : 0), '#1e2a48', 1);
    }
    // ---- light ----
    const IR = (p.def.stage.r || 5.5 * .92) * .97;
    if (bandA > 0 && F > .05) {
      // the front: a light arc drawn only over the island, plus rising motes
      p.ring(CA[0], CA[1], .03, F, .1, PL.wave, 1.1 * bandA, { fn: a => (Math.hypot(CA[0] - Math.sin(a) * F, CA[1] + Math.cos(a) * F) < IR ? 1 : 0) });
      const nm = Math.round(30 * p.density);
      for (let k = 0; k < nm; k++) {
        const ang = (p.r(k, 7) - .5) * 1.6, x = CA[0] + Math.cos(ang) * (F - .1), y = CA[1] + Math.sin(ang) * (F - .1);
        if (Math.hypot(x, y) > IR) continue;
        const ph = (t * 1.7 + p.r(k, 8)) % 1;
        p.dot(x, y, .05 + .5 * ph, PL.wave, (1 - ph) * bandA, 1);
      }
    }
    // swatches over the raised hand: red -> white flash -> blue
    if (t > .5 && t < 1.15) {
      const pop = p.easeOutBack(p.ph(t, .5, .68), 1.6) * (1 - p.easeInCubic(p.ph(t, 1.0, 1.12))), h = fig.hand, c = p.cam();
      if (pop > .02) {
        for (let k = 0; k < 4; k++) {
          const off = (k - 1.5) * .22 * pop, x = h[0] + c.right[0] * off, y = h[1] + c.right[1] * off, z = h[2] + .32;
          const ft = .8 + k * .05, ramp = t < ft ? PL.swatchRed : t < ft + .05 ? PL.stab : PL.swatchBlue;
          p.scard(x, y, z, .19 * pop, .19 * pop, (u, v) => (Math.max(Math.abs(u), Math.abs(v)) > .78 ? .1 : .3 + .23 * k), ramp);
        }
        if (t > .95 && t < 1.12) p.glow(h[0], h[1], h[2] + .32, .3, PL.wave, .9 * (1 - p.ph(t, .98, 1.12)));
      }
    }
    // a converted soldier flares: a short blue pillar of light through the body
    for (const [i, hd] of heads) {
      const a = t - pl.tc[i];
      if (a >= 0 && a < .25) { const k = 1 - a / .25; p.line([units[i].x, units[i].y, 0], [hd[0], hd[1], hd[2] + .25 * sc / .41 * k], .05, PL.wave, 1.1 * k, { i1: .5 * k }); }
    }
    // the stab: one spear streak from each blue to its nearest target
    const sa = t - STRIKE;
    if (sa >= -.02 && sa < .18) {
      const ext = p.easeOutExpo(p.ph(sa, -.02, .04)), I = .9 * (1 - p.ph(sa, .04, .16));
      for (const [i, , ch] of heads) {
        const v = pl.victim[i];
        if (v < 0) continue;
        const s2 = st[v], tc2 = [units[v].x, units[v].y, ch[2]];
        const tip = p.v3.lerp(ch, tc2, .85 * ext);
        p.line(p.v3.lerp(ch, tc2, .25 * ext), tip, .02, PL.stab, .55 * I, { i1: I });
        if (s2 && sa > .02 && sa < .08) p.dot(tip[0], tip[1], tip[2], PL.stab, 1.1, 1);
      }
      if (sa >= 0) p.light(A.x, A.y, 0, 3.6, PL.wave, .8 * (1 - p.ph(sa, 0, .18)));
    }
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.5) });
  },
});
