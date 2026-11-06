// 計數崩落 / Falling Score — Twist pack (original design): the kill counter's own digits peel off the HUD as gold pixel blocks and stamp the army; every stamp raises the count, so the next number is longer and bigger, until the total slams down
PXFX.define({
  id: 'falling-score',
  loop: 6.5,
  beats: [{ t: .55, kind: 'cast', power: .5 }, { t: 1.35, kind: 'pulse', power: .6 }, { t: 2.2, kind: 'pulse', power: .8 }, { t: 3.05, kind: 'pulse', power: 1 }, { t: 3.9, kind: 'hit', power: 1.5 }],
  view: { r: 6.6, h: 3.8 },
  stage: { ground: 'slate' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'impact'],
  palette: {
    gold: ['#5a3a10', '#8a5c18', '#c08a28', '#e8b840', '#fff0a0'],
    glint: ['#c08a28', '#f0c040', '#ffe890', '#fffbe8', '#ffffff'],
    crushed: ['#2a0a0e', '#3e1014', '#561818', '#6e2020'],
    dust: ['#4a4650', '#6a6570', '#8e8996', '#b0abb6'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者（縮放 0.7）站在 x = −5.2 的近邊，對面是一萬人的大軍（預設 100 × 100 方陣，中心 (0.8, 0)、半深半寬 3.8，一片頭盔海）；左上角擊殺計數「骷髏 0/10000」', en: 'pose: the caster (scale 0.7) stands at the near edge (x = −5.2) facing an army of ten thousand (default 100 × 100 block, centre (0.8, 0), half depth and width 3.8, a sea of helmets); the kill counter in the top-left reads "skull 0/10000"' },
    { k: 'charge', t: [.55, 1.35], zh: '集氣：施法者舉手指向角落的計數，計數抖動 0.25 秒，數字「0」變成金色像素方塊由 HUD 彈出（每格 2 像素，0.12 秒內放大一倍），沿弧線飛到大軍上空並長大到 cellSize（預設 0.35），平躺著懸停在 1.4 + 1.3 × 格子大小 的高度；落地前 0.5 秒起，格子下面的敵兵變暗、地面印上暗影（真實落點預告）', en: 'charge: the caster raises a hand at the counter, which shakes for 0.25 s; the digit "0" pops out of the HUD as gold pixel blocks (2 px per cell, doubling in 0.12 s), arcs over the army growing to cellSize (default 0.35) and hangs flat at 1.4 + 1.3 × cell size; from 0.5 s before it lands the soldiers under its cells darken and the ground under it shadows (the exact footprint, telegraphed)' },
    { k: 'shape', t: [1.15, 1.35], zh: '成形：方塊在最後 0.2 秒加速砸下（三次緩入），每個數字比前一個晚 0.035 秒落地', en: 'shape: the blocks slam down over the last 0.2 s (cubic ease-in), each digit 0.035 s after the one before' },
    { k: 'motion', t: [1.35, 3.6], zh: '推進：共 drops 波（預設 4）。第 k 波寫的是落地前的擊殺數（3×5 像素字，和計數 HUD 同一套字形，字距 4 格），格子大小 = cellSize × G^k，G 令最後一波剛好蓋住大軍；落點：在陣型範圍上取 7 × 7 個候選中心，選壓死最多存活敵兵的（× (1 − 0.03 × 離中心的格數)，不會蓋到施法者）；預設三波寫著 0、261、2013，落地後計數依次為 261、2013、5025', en: 'motion: drops waves in total (default 4). Wave k spells the kill count before it lands (3×5 pixel digits, the same glyphs as the counter HUD, 4-cell advance), cell size = cellSize × G^k with G chosen so the last wave just covers the army; aim: of 7 × 7 candidate centres over the formation, the one that crushes the most living soldiers (× (1 − 0.03 × cells from the middle), never over the caster); by default the waves read 0, 261 and 2013 and leave the counter at 261, 2013 and 5025' },
    { k: 'impact', t: [3.1, 4.2], zh: '命中：最後一波是總數「10000」，由 HUD 的「/10000」脫出，在天上排成一行（每格 0.62）懸停，最後 0.3 秒五個數字互相擠到只隔 1 格（相鄰的 0 互相填滿空心）並長大成每格 1.58、9.5 × 7.9 的實心金磚（格子 = max(7.6 ÷ (位數 + 1), 7.6 ÷ 5) × 1.04，連續的 0 那一段置中在大軍範圍 (0.8, 0)，施法者正好站在開頭「1」的缺口裡），3.9 秒砸下：1 格衝擊格＋頓幀＋強震屏，計數變金色。判定：落地時站在任何「亮」格下的存活敵兵中招，命中時間 = 該數字落地時間；站在數字空心或字縫裡、或在金磚外的倖存（圓陣、鶴翼兩翼、橫列兩端會露出去）', en: 'impact: the last wave is the total "10000", peeling off the "/10000" of the HUD; it hangs in the sky as a row (0.62 per cell), then over the last 0.3 s the five digits squeeze to a 1-cell advance (neighbouring zeros fill each other’s hollows) and grow into a solid 9.5 × 7.9 gold brick (cell = max(7.6 / (digits + 1), 7.6 / 5) × 1.04 = 1.58, the run of zeros centred on the army area (0.8, 0), the caster standing in the notch of the leading 1) that slams down at 3.9 s: one impact frame, a hit-stop and a hard shake, and the counter turns gold. Rule: a living soldier standing under any "on" cell when the digit lands dies, hit time = that digit’s landing time; soldiers in a hollow, a gap between digits or outside the brick survive (a ring, the crescent’s horns and the ends of a line spill out)' },
    { k: 'after', t: [4.2, 6.5], zh: '餘波：每波最後一個數字落地 0.2 秒後（最後一波 0.6 秒）方塊抖色溶解，化成金色光點飛回計數；被壓扁的敵兵變成深紅色的扁平印子，看得出數字的形狀；計數 4.7–5.0 秒淡出，屍體 4.8–5.2 秒淡出，新一批大軍 5.2–6.3 秒原地淡入', en: 'aftermath: 0.2 s after a wave’s last digit lands (0.6 s for the last wave) its blocks dither away into gold motes that fly back into the counter; crushed soldiers become flat dark red prints that show the digit’s shape; the counter fades at 4.7–5.0 s, the prints at 4.8–5.2 s, and a fresh army fades in on its spots at 5.2–6.3 s' },
  ],
  layers: [
    { zh: '大軍與計數：敵兵數量 2000–12000（預設 10000），按陣型排列，1–2 像素的像素小兵；角落 3×5 像素字擊殺計數，每波落地即時跳升，全滅變金色；每波脫出前計數抖動', en: 'army and counter: 2000–12000 soldiers (default 10000) in the chosen formation as 1–2 px pixel soldiers; the 3×5 pixel kill counter jumps as each wave lands and turns gold on a full wipe; it shakes before each wave breaks off' },
    { zh: '判定與倖存者：每波的「亮」格（數字字形的 1）是實心方塊，平躺地面，列沿 +x、行沿 −y；落地時格子下面的存活敵兵死；字形空心（0、8 的中間）、字縫和數字外的倖存；下一波的數字 = 這一波後的擊殺數；最後一波 = 總數，字距收到 1 格令連續的 0 變成實心；總數不是一串 0（例如 7531）時金磚會留空心', en: 'rule and survivors: each wave’s "on" cells (the 1s of the glyphs) are solid blocks lying flat, columns along +x and rows along −y; living soldiers under them when they land die; hollows (the middle of a 0 or 8), gaps between digits and everything outside survive; the next wave’s number = the kill count after this one; the last wave is the total with a 1-cell advance, so a run of zeros becomes solid; a total that is not a run of zeros (e.g. 7531) leaves hollows in the brick' },
    { zh: '方塊：每格一個金色立方體（高 0.7 格，五階金色，按面向光源上色，只畫頂面和朝鏡頭、不與同一數字相鄰格相貼的側面）；飛行時由 HUD 數字那個像素的視線上離大軍最近的一點沿高 1.2 的弧線飛到落點上空，格子由 2 像素長到目標大小', en: 'blocks: one gold cube per cell (0.7 cell tall, a five-step gold ramp shaded by facing; only the top and the camera-facing sides not shared with a neighbour cell of the same digit are drawn); in flight they arc (1.2 high) from the point on the HUD digit’s view ray nearest the army to above the landing spot while the cells grow from 2 px to full size' },
    { zh: '預告：方塊懸停和下落時，落點格子下面的敵兵改用暗色調色盤（同一套格子判定），地面也印上暗影，所以看得出哪些人會死', en: 'telegraph: while a wave hangs and falls, the soldiers under its cells switch to a dark palette (the same cell test) and the ground under it darkens, so you can see who is about to die' },
    { zh: '中招反應（自訂，一萬人也便宜）：閃白 1 格後壓扁（高度 15%、寬 1.6 倍），換成深紅色，整片看得出數字的印子', en: 'hit reaction (custom, cheap at ten thousand): one white frame, then flattened (15% height, 1.6× wide) in dark red, so the digit shows as a print in the army' },
    { zh: '落地：沿每個數字外框噴出約 30 團灰塵、金色火花；方塊 0.25 秒後抖色溶解，約 24 粒（最後一波 60 粒）金色光點沿弧線飛回計數', en: 'landing: about 30 dust puffs along each digit’s outline and gold sparks; 0.25 s later the blocks dither away and about 24 gold motes (60 for the last wave) arc back into the counter' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    drops: { zh: '落下波數', en: 'drop waves', min: 2, max: 6, step: 1, value: 4 },
    cellSize: { zh: '首波格子大小', en: 'first cell size', min: .2, max: .8, step: .05, value: .35 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  CASTER: [-5.2, 0],
  // the counter HUD's 3x5 digit glyphs (same table as p.tally)
  GLYPH: { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001010010', 8: '111101111101111', 9: '111101111001111' },
  L0: 1.35, TF: 3.9, STAG: .035, RESP: [5.2, 6.3], CLEAR: [4.8, 5.2],
  CRUSH: { body: ['#2a0a0e', '#3e1014', '#561818', '#6e2020'], helm: ['#3e1014', '#561818', '#6e2020', '#822828'], spear: ['#3d3640', '#6e6672', '#d8d2dc'] },
  SHADE: { body: ['#16121a', '#1e1824', '#28202e', '#322838'], helm: ['#2e1418', '#3e1a1e', '#522226', '#642a2c'], spear: ['#2a262e', '#3e3a44', '#5a5660'] },
  // occupancy of a number: cols x 5 rows, value = 1 + index of the first glyph covering the cell (0 = off)
  occ(str, adv) {
    const L = str.length, W = (L - 1) * adv + 3, g = new Uint8Array(W * 5);
    for (let j = 0; j < L; j++) {
      const gl = this.GLYPH[str[j]];
      for (let k = 0; k < 15; k++) if (gl[k] === '1') { const X = j * adv + k % 3, r = Math.floor(k / 3); if (!g[r * W + X]) g[r * W + X] = j + 1; }
    }
    return { str, adv, W, g };
  },
  // which glyph (0-based) covers world point (x, y) for a number centred at (cx, cy) with cell c, or -1
  cellAt(o, cx, cy, c, x, y) {
    const X = Math.floor((x - cx) / c + o.W / 2), r = Math.floor((y - cy) / c + 2.5);
    if (X < 0 || r < 0 || X >= o.W || r > 4) return -1;
    return o.g[r * o.W + X] - 1;
  },
  // the whole spell, decided once per layout + knobs: every wave's number, size, place, landing times, and each unit's hit time
  plan(units, K, c0) {
    const key = K + '|' + c0;
    if (this._pl && this._pl.units === units && this._pl.key === key) return this._pl;
    const n = units.length, hit = new Float32Array(n).fill(-1), [qx, qy] = this.CASTER;
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (const u of units) { x0 = Math.min(x0, u.x); x1 = Math.max(x1, u.x); y0 = Math.min(y0, u.y); y1 = Math.max(y1, u.y); }
    // the last wave is sized to the standard army area (it exactly covers the default block; wider formations spill out)
    const A = this.AREA, tot = String(n), LF = tot.length, fit = Math.max(2 * A.rx / (LF + 1), 2 * A.ry / 5) * 1.04;
    const G = Math.max(1.08, Math.pow(fit / c0, 1 / Math.max(1, K - 1))), drops = [];
    const land = k => this.L0 + (this.TF - this.L0) * k / Math.max(1, K - 1);
    const safe = (o, cx, cy, c) => { for (let a = 0; a < 9; a++) if (this.cellAt(o, cx, cy, c, qx + (a % 3 - 1) * .3, qy + (Math.floor(a / 3) - 1) * .3) >= 0) return false; return true; };
    let count = 0;
    for (let k = 0; k < K - 1; k++) {
      const o = this.occ(String(count), 4), c = c0 * Math.pow(G, k), L = land(k);
      // aim: the candidate centre (7 x 7 over the army) that crushes the most living soldiers, mildly preferring the middle
      let best = -1, bx = (x0 + x1) / 2, by = (y0 + y1) / 2;
      for (let a = 0; a < 7; a++) for (let b = 0; b < 7; b++) {
        const cx = x0 + (x1 - x0) * (a + .5) / 7, cy = y0 + (y1 - y0) * (b + .5) / 7;
        if (!safe(o, cx, cy, c)) continue;
        let s = 0;
        for (const u of units) if (hit[u.i] < 0 && this.cellAt(o, cx, cy, c, u.x, u.y) >= 0) s++;
        s *= 1 - .03 * Math.hypot(a - 3, b - 3);
        if (s > best) { best = s; bx = cx; by = cy; }
      }
      // no candidate clear of the caster (a huge wave): slide it away from them
      if (best < 0) for (let s = 0; s < 60 && !safe(o, bx, by, c); s++) bx += c * .25;
      for (const u of units) if (hit[u.i] < 0) { const j = this.cellAt(o, bx, by, c, u.x, u.y); if (j >= 0) { hit[u.i] = L + this.STAG * j; count++; } }
      drops.push({ o, c, cx: bx, cy: by, L, final: false });
    }
    // the last wave: the total with a 1-cell advance (a run of zeros fills itself in), covering the survivors' bounding box
    {
      const o = this.occ(tot, 1), cPrev = drops.length ? drops[drops.length - 1].c : c0, c = Math.max(fit, cPrev * G);
      // columns 1..L+1 (the run that fills itself in; column 0 belongs to the first digit alone) centred on the army area
      let cx = A.x - c / 2, cy = A.y;
      for (let s = 0; s < 40 && !safe(o, cx, cy, c); s++) cx += c * .25;
      for (const u of units) if (hit[u.i] < 0 && this.cellAt(o, cx, cy, c, u.x, u.y) >= 0) { hit[u.i] = this.TF; count++; }
      drops.push({ o, c, cx, cy, L: this.TF, final: true });
    }
    // peel times: after the previous wave has landed (its count is final)
    drops.forEach((d, k) => { const prev = k ? drops[k - 1].L + this.STAG * (drops[k - 1].o.str.length - 1) + .06 : 0; d.P = Math.max(prev, d.L - (d.final ? .8 : .8)); });
    const states = Array.from({ length: n }, (_, i) => ({ hitT: hit[i] >= 0 ? hit[i] : null }));
    this._pl = { units, key, drops, hit, states, G };
    return this._pl;
  },
  // pose of wave d at time t: { cx, cy, H, c, adv, alpha, phase } or null. Digit j lands at d.L + STAG * j (the final: all at once)
  wavePose(d, t, anchor, cStart) {
    if (t < d.P || !anchor) return null;
    const air = d.final ? .62 : d.c, fly1 = d.L - (d.final ? .42 : .22), last = d.L + (d.final ? 0 : this.STAG * (d.o.str.length - 1));
    const out = last + (d.final ? .6 : .2), fade = d.final ? .3 : .2;
    if (t >= out + fade) return null;
    const H = 1.4 + 1.3 * Math.min(1.1, d.c);
    if (t < fly1) {
      // pop out of the HUD (0.12 s, cells double), then a smooth arc to the hover point while growing
      const T = fly1 - d.P, pop = Math.min(1, (t - d.P) / .12), k = Math.max(0, (t - d.P - .12) / (T - .12)), e = k * k * (3 - 2 * k), A = anchor;
      const c1 = cStart * (1 + pop);
      return { cx: A[0] + (d.cx - A[0]) * e, cy: A[1] + (d.cy - A[1]) * e, H: A[2] + (H - A[2]) * e + Math.sin(Math.PI * e) * 1.2, c: c1 + (air - c1) * e * e, adv: 4, alpha: 1, phase: 'fly' };
    }
    if (t < last) {
      // hover; the final wave squeezes to a 1-cell advance and grows while it falls
      const sq = d.final ? Math.min(1, Math.max(0, (t - (d.L - .3)) / .26)) : 0, es = sq * sq * (3 - 2 * sq);
      return { cx: d.cx, cy: d.cy, H, c: air + (d.c - air) * es, adv: 4 - 3 * es, alpha: 1, phase: 'fall' };
    }
    return { cx: d.cx, cy: d.cy, H: 0, c: d.c, adv: d.final ? 1 : 4, alpha: t < out ? 1 : 1 - (t - out) / fade, phase: 'down' };
  },
  // height of digit j of wave d: hovering at H, then a cubic slam over the last 0.2 s before its landing time
  digitZ(d, ps, j, t) {
    if (ps.phase !== 'fall') return ps.H;
    const Lj = d.L + (d.final ? 0 : this.STAG * j), k = Math.max(0, Math.min(1, (t - (Lj - .2)) / .2));
    return ps.H * (1 - k * k * k) + .05 * Math.sin(t * 9 + j) * (1 - k);
  },
  draw(p, t) {
    const PL = this.palette, self = this;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id, K = Math.round(p.param('drops')), c0 = Math.round(p.param('cellSize') * 20) / 20;
    const units = p.crowdLayout({ n, seed: 11, formation: form, area: this.AREA, faceTo: this.CASTER });
    const pl = this.plan(units, K, c0), D = pl.drops;
    // ---- the point in space behind the HUD's digits (where each wave breaks off the screen) ----
    let anchors = null, ppu = 13;
    const cur = (() => { let c = 0; for (const s of pl.states) if (s.hitT != null && t >= s.hitT) c++; return c; })();
    p.post(({ P, Q }) => {
      const pp = P(0, 0, 0); ppu = pp ? pp[3] : 13;
      anchors = D.map((d, k) => {
        // count digits sit at HUD columns 7.. (4 per character), the total after the slash
        const len = d.o.str.length, col = d.final ? 7 + 4 * String(cur).length + 4 + (4 * len - 1) / 2 : 7 + (4 * len - 1) / 2;
        // the point on that pixel's view ray nearest the army (every point of the ray projects onto the digit)
        const sx = 3 + col - .5, sy = 5.5, g0 = Q(sx, sy, 0), gh = Q(sx, sy, 5);
        if (!g0 || !gh) return null;
        const dx = gh[0] - g0[0], dy = gh[1] - g0[1], dz = 5, L2 = dx * dx + dy * dy + dz * dz;
        const m = Math.max(.2, ((self.AREA.x - g0[0]) * dx + (self.AREA.y - g0[1]) * dy + (2.5 - 0) * dz) / L2);
        return [g0[0] + dx * m, g0[1] + dy * m, dz * m];
      });
    });
    const cStart = 2 / Math.max(4, ppu);
    // ---- caster ----
    const P0 = D[0].P;
    let pose;
    if (t < P0 - .35) pose = 'idle';
    else if (t < P0) pose = { a: 'idle', b: 'gaze', k: p.easeOutBack(p.ph(t, P0 - .35, P0 - .05)) };
    else if (t < D[D.length - 1].P) pose = { a: 'gaze', b: 'point', k: p.easeOutCubic(p.ph(t, P0, P0 + .3)) };
    else if (t < this.TF + .1) pose = { a: 'point', b: 'bothUp', k: p.easeOutBack(p.ph(t, D[D.length - 1].P, D[D.length - 1].P + .3)) };
    else if (t < 4.6) pose = { a: 'bothUp', b: 'swing', k: p.easeOutExpo(p.ph(t, this.TF - .05, this.TF + .05)) };
    else pose = { a: 'swing', b: 'idle', k: p.ease(p.ph(t, 4.6, 5.3)) };
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .7 });
    // ---- waves in the air / on the ground ----
    const poses = D.map((d, k) => this.wavePose(d, t, anchors && anchors[k], cStart));
    // the wave that is about to land (its footprint darkens the soldiers under it)
    let tele = -1;
    for (let k = 0; k < D.length; k++) if (poses[k] && poses[k].phase !== 'down' && t > D[k].L - .5) { tele = k; break; }
    // ---- the army: custom pawns ----
    const S0 = 240 / (2 * this.view.r * 1.12) * p.v.fs, sc = p.clamp((units.spacing || .3) / .4, .08, 1.5);
    const drawer = .62 * sc * S0 < 7.5 ? p.pawnSprite : p.pawn, po = { scale: sc }, poS = { scale: sc, pal: this.SHADE }, poC = { scale: sc, pal: this.CRUSH };
    const fear = p.env(t, P0, P0 + .4, this.TF, this.TF + .5), [R0, R1] = this.RESP, [C0, C1] = this.CLEAR;
    const tw = tele >= 0 ? D[tele] : null, s = { tdir: [1, 0], walk: null };   // one state object reused for all ten thousand (no per-frame garbage)
    for (const u of units) {
      const h = pl.hit[u.i];
      s.i = u.i; s.vr = u.vr; s.x = u.x; s.y = u.y; s.z = 0; s.tilt = 0; s.tdir[0] = 1; s.tdir[1] = 0; s.sq = 1; s.wide = 1; s.face = u.face; s.alpha = 1; s.spear = true; s.flash = false; s.jit = 0;
      if (h >= 0 && t >= h) {
        if (t >= R0) {
          const len = (R1 - R0) * .55, st0 = R0 + u.r1 * (R1 - R0 - len);
          s.alpha = p.ph(t, st0, st0 + len);
          if (s.alpha <= 0) continue;
          drawer.call(p, s, po);
          continue;
        }
        const a = t - h;
        if (a < .05) { s.flash = true; drawer.call(p, s, po); continue; }
        s.sq = .15; s.wide = 1.6; s.spear = false;
        const st0 = C0 + u.r2 * (C1 - C0) * .5;
        s.alpha = 1 - p.ph(t, st0, st0 + (C1 - C0) * .5);
        if (s.alpha <= 0) continue;
        drawer.call(p, s, poC);
        continue;
      }
      const fr = fear * (.4 + .6 * u.r3);
      s.tilt = .22 * fr; s.jit = .012 * fr; s.tdir[0] = -Math.cos(u.face); s.tdir[1] = -Math.sin(u.face);
      const under = tw && this.cellAt(tw.o, tw.cx, tw.cy, tw.c, u.x, u.y) >= 0;
      drawer.call(p, s, under ? poS : po);
    }
    // ground shadow under the footprint of the wave about to land
    if (tw) {
      const amt = .35 + .55 * p.ph(t, tw.L - .5, tw.L);
      const R = Math.hypot(tw.o.W, 5) * tw.c * .55;
      p.stain(tw.cx, tw.cy, R, (dx, dy) => (this.cellAt(tw.o, 0, 0, tw.c, dx, dy) >= 0 ? 1 : 0), '#1a1620', amt);
    }
    // ---- the blocks: one gold cube per on-cell ----
    const GOLD = PL.gold, cf = p.cam().fwd, sxF = p.mode === '2d' ? 0 : Math.sign(cf[0]), syF = p.mode === '2d' ? 1 : Math.sign(cf[1]);
    D.forEach((d, k) => {
      const ps = poses[k];
      if (!ps || ps.alpha <= 0) return;
      const o = d.o, L = o.str.length, c = ps.c, hc = c * .7, W3 = (L - 1) * ps.adv + 3, oa = ps.alpha < 1 ? { alpha: ps.alpha, shadow: false } : { shadow: false };
      for (let j = 0; j < L; j++) {
        const gl = this.GLYPH[o.str[j]], zz = this.digitZ(d, ps, j, t);
        for (let q = 0; q < 15; q++) {
          if (gl[q] !== '1') continue;
          const X = j * ps.adv + q % 3, r = Math.floor(q / 3);
          const x0 = ps.cx + (X - W3 / 2) * c, y0 = ps.cy + (r - 2.5) * c;
          // a gold cube: top + the sides that face the camera and are not shared with a neighbouring cell of the same digit
          const x1 = x0 + c * .98, y1 = y0 + c * .98, z1 = zz + hc, cx3 = q % 3, on = (dc, dr) => { const a = cx3 + dc, b = r + dr; return a >= 0 && a < 3 && b >= 0 && b < 5 && gl[b * 3 + a] === '1'; };
          p.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], GOLD, oa);
          if (sxF > 0 && !on(1, 0)) p.quad([x1, y0, zz], [x1, y1, zz], [x1, y1, z1], [x1, y0, z1], GOLD, oa);
          if (sxF < 0 && !on(-1, 0)) p.quad([x0, y0, zz], [x0, y1, zz], [x0, y1, z1], [x0, y0, z1], GOLD, oa);
          if (syF > 0 && !on(0, 1)) p.quad([x0, y1, zz], [x1, y1, zz], [x1, y1, z1], [x0, y1, z1], GOLD, oa);
          if (syF < 0 && !on(0, -1)) p.quad([x0, y0, zz], [x1, y0, zz], [x1, y0, z1], [x0, y0, z1], GOLD, oa);
        }
      }
    });
    // ---- landing: dust along the footprint, sparks; motes flying back into the counter ----
    D.forEach((d, k) => {
      const a = t - d.L;
      if (a < 0 || a > 1.4) return;
      const o = d.o, c = d.c, nd = Math.round((d.final ? 46 : 26) * p.density);
      for (let j = 0; j < nd; j++) {
        const b = (a - .02 * p.r(j, 5)) / (.6 + .5 * p.r(j, 6));
        if (b < 0 || b > 1) continue;
        // a point on the outline of the footprint
        const side = p.r(j + k * 50, 7), along = p.r(j + k * 50, 8), Wd = o.W * c, Hd = 5 * c;
        const ex = side < .5 ? (along - .5) * Wd : (p.r(j, 9) > .5 ? .5 : -.5) * Wd, ey = side < .5 ? (p.r(j, 10) > .5 ? .5 : -.5) * Hd : (along - .5) * Hd;
        const L2 = Math.hypot(ex, ey) || 1, out = (.15 + .6 * c) * p.easeOutCubic(b);
        p.ball(d.cx + ex + ex / L2 * out, d.cy + ey + ey / L2 * out, .1 + .5 * c * p.easeOut(b), (.08 + .16 * Math.min(1.5, c)) * (.6 + .6 * p.easeOutCubic(b)), PL.dust, { alpha: .9 * (1 - b), rough: .5, shadow: false, seed: j });
      }
      if (a < .3) {
        p.light(d.cx, d.cy, 0, Math.max(1.2, o.W * c * .55), PL.glint, .8 * (1 - a / .3));
        const ns = d.final ? 8 : 4;
        for (let j = 0; j < ns; j++) { const sx = d.cx + (p.r(j + k * 9, 41) - .5) * o.W * c, sy = d.cy + (p.r(j + k * 9, 42) - .5) * 5 * c, f = 1 - a / .3; p.sparkle(sx, sy, c * .75 + .1, 1 + 3 * f, PL.glint, 1.1 * f); }
      }
      // motes back to the counter
      const anc = anchors && anchors[k];
      if (anc) {
        const t0 = (d.final ? .6 : .2), nm = Math.round((d.final ? 60 : 24) * p.density);
        for (let j = 0; j < nm; j++) {
          const b = (a - t0 - .25 * p.r(j, 31)) / .55;
          if (b < 0 || b > 1) continue;
          const sx = d.cx + (p.r(j, 32) - .5) * o.W * c, sy = d.cy + (p.r(j, 33) - .5) * 5 * c, e = p.easeInCubic(b);
          const q = p.arcPos([sx, sy, .4], anc, e, 1.5);
          p.dot(q[0], q[1], q[2], PL.glint, 1.1 - .3 * b, b > .7 ? 1 : 2);
        }
      }
    });
    // the final slam: one impact frame
    if (t >= this.TF && t - this.TF <= .021) p.impactFrame({ ink: '#2a1a08', paper: '#fff4d0', accent: '#e8a020' });
    // glint on the raised hand while it calls a wave
    const hg = D.reduce((m, d) => Math.max(m, p.env(t, d.P - .3, d.P - .05, d.P + .05, d.P + .3)), 0);
    if (hg > 0) p.glow(fig.hand[0], fig.hand[1], fig.hand[2], .2, PL.glint, .9 * hg);
    // ---- the kill counter: shakes before each wave breaks off; goes last ----
    if (p.param('tally')) {
      let sx = 0, sy = 0;
      for (const d of D) { const a = d.P - t; if (a > 0 && a < .3) { const f = Math.floor(t * 30); sx = Math.round((PXFX.hash(f, 3.1) - .5) * 3); sy = Math.round((PXFX.hash(f, 7.7) - .5) * 2); } }
      p.tally(pl.states, { t, alpha: 1 - p.ph(t, 4.7, 5.0), x: 3 + sx, y: 3 + sy });
    }
  },
});
