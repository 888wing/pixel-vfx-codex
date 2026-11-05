// 萬劍天降 / Sword Rain — Mass Spells pack (original design): a sky formation of light swords rains into the horde one by one, then a giant sword lands in the centre
PXFX.define({
  id: 'sword-rain',
  loop: 5,
  beats: [{ t: .5, kind: 'cast', power: .8 }, { t: 1.42, kind: 'pulse', power: .4 }, { t: 3.0, kind: 'hit', power: 1.5 }],
  view: { r: 4.8, h: 3.8 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'charge', 'swarm', 'crowd', 'domain', 'shockwave', 'impact', 'debris', 'aftermath'],
  palette: {
    blade: ['#3a5aa8', '#5a8ad8', '#7fb8f0', '#9fd8ff', '#d4f0ff', '#f8fdff'],
    steel: ['#22305e', '#34508a', '#5278b4', '#86aee0', '#c4e0fa'],
    dust: ['#4a3e34', '#6a5a4a', '#8a7a64', '#a8977c'],
    rock: ['#2a2226', '#3e3236', '#544448', '#6a5856'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由站姿舉起右手指向天空（0.45 秒，回彈緩動）；敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster raises the right hand to the sky (0.45 s, overshoot ease); a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.5, 1.4], zh: '集氣：0.5 秒手心閃光並射出一道光束；天空轉為深藍夜空；敵群上空高 3.6–4.5 處由內向外逐圈浮現 40 把光劍（三圈同心圓，半徑 0.75／1.4／2.07，劍尖朝下，每把 0.2 秒回彈彈出），整個劍陣上下輕微浮動 ±0.06', en: 'charge: at 0.5 s the palm flashes and fires a beam upwards; the sky turns deep night blue; 40 light swords appear ring by ring from the inside out at height 3.6–4.5 above the horde (three concentric rings of radius 0.75 / 1.4 / 2.07, points down, each popping in over 0.2 s with an overshoot), the whole formation bobbing ±0.06' },
    { k: 'shape', t: [1.4, 2.6], zh: '成形：光劍按隨機次序逐把落下，節奏越來越快（第 k 把在 1.42 + 1.12 × (k/N)^0.62 秒出發）：先上提 0.14 並轉向目標（0.1 秒），再以二次方加速在 0.13 秒內插入地面；每把瞄準最近的一個外圍敵兵，命中時小閃光、地面小光環、5 粒火花，敵兵向外倒下，劍插在地上', en: 'shape: the swords drop one by one in random order with an accelerating rhythm (sword k leaves at 1.42 + 1.12 × (k/N)^0.62 s): each lifts 0.14 and turns towards its target (0.1 s), then plunges with a quadratic ease-in into the ground in 0.13 s; each aims at the nearest outer soldier, the hit gives a small flash, a ground ring and 5 sparks, the soldier topples outwards and the sword stays stuck in the ground' },
    { k: 'motion', t: [2.0, 3.0], zh: '推進：一把巨劍（劍身長 3.4，連劍柄 4.3，插地後露出約 3.4、約敵兵高度的 5.5 倍）由畫面頂部之外緩緩降到劍尖高 4.5（2.0–2.72 秒，緩入緩出），地面中央亮起半徑 1.4 的目標法陣，剩餘敵兵後縮發抖；最後 0.28 秒三次方加速插入敵群中心', en: 'motion: a giant sword (3.4 long blade, 4.3 with the hilt; about 3.4 stands above the ground once planted, ~5.5× a soldier’s height) lowers slowly from above the frame until its tip is at height 4.5 (2.0–2.72 s, ease in-out) while a 1.4 radius target sigil lights up on the ground and the remaining soldiers lean back and tremble; over the last 0.28 s it plunges with a cubic ease-in into the centre of the horde' },
    { k: 'impact', t: [3.0, 3.6], zh: '命中：1 格黑白衝擊格＋頓幀；劍尖插入地下 0.9，白色閃光、半徑 4.4 衝擊環＋塵土環、放射速度線、12 塊碎石、中心放射裂紋；剩餘敵兵按距離逐個中招（3.02 + 距離 ÷ 6.5 秒），力度隨距離遞減：中心壓扁、1.4 內拋上半空、其餘被擊飛', en: 'impact: one two-tone impact frame and a hit-stop; the tip sinks 0.9 into the ground, a white flash, a 4.4 radius shock ring with a dust ring, radial speed lines, 12 rocks and radial cracks; the remaining soldiers are hit in order of distance (3.02 + distance / 6.5 s) with power falling off by distance: flattened at the centre, launched within 1.4, knocked away beyond' },
    { k: 'after', t: [3.6, 5], zh: '餘波：插在地上的光劍在 3.55–4.45 秒逐把化成上升光點消失，巨劍在 3.75–4.25 秒抖色淡出，裂紋冷卻淡出，天色復原；屍體淡出，新一批敵兵在 4.05–4.95 秒由右邊走回原位', en: 'aftermath: the stuck swords dissolve one by one into rising motes over 3.55–4.45 s, the giant sword dithers out over 3.75–4.25 s, the cracks cool and fade, the sky returns; the bodies fade and a fresh horde walks back in from the right over 4.05–4.95 s' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6），在以 x = 1.2 為中心、半徑 2.5 × 2.1 的橢圓內分佈；外圍敵兵由小劍擊倒（原地向外倒下），中心附近的留給巨劍', en: 'horde: 30–60 small soldiers (~0.6 tall) in a 2.5 × 2.1 ellipse centred at x = 1.2; the outer soldiers are felled by the small swords (toppling outwards on the spot), the ones near the centre are left for the giant sword' },
    { zh: '小光劍：長 0.8 的發光劍形：劍身為由 0.1 收窄到劍尖的亮線，外加 0.34 寬的柔和光暈，0.32 寬的護手橫線、短劍柄與 1 像素劍首；在小尺寸下仍可辨認為劍', en: 'small light sword: a 0.8 long glowing sword shape: a bright blade line tapering from 0.1 to the point, a 0.34 wide soft halo, a 0.32 wide crossguard line, a short grip and a 1 px pommel; still readable as a sword at small size' },
    { zh: '劍陣：三圈同心圓上的光劍，每圈一條淡藍細光環（不同高度），劍數按圓周長分配；落下時拖一條漸細的速度殘影', en: 'formation: swords on three concentric rings, each ring traced by a faint blue circle at its own height, sword count per ring in proportion to the circumference; each falling sword leaves a tapering smear' },
    { zh: '巨劍：面向鏡頭的實心劍身（藍鋼色階，中脊最亮、左亮右暗）、實心護手（寬 1.6）、劍柄與圓形劍首；兩邊刃口與中脊有發光線，劍後有寬 1.15 的光暈（放在劍身後面，不蓋住實心劍身）', en: 'giant sword: a solid camera-facing blade (blue steel ramp, brightest along the ridge, lit left half and shaded right half), a solid crossguard 1.6 wide, a grip and a round pommel; glowing lines on both edges and the ridge, and a 1.15 wide halo placed behind the blade so it never covers the solid body' },
    { zh: '天色：以劍陣為中心的抖色圓形擦除，背景換成深藍星空，地面換成暗褐色，令發光的劍在白色頁面上仍然清楚', en: 'sky: a dithered radial wipe centred on the formation swaps the background for a deep blue starry sky and the ground for dark brown, so the glowing swords read even on the white page' },
    { zh: '命中與餘波：巨劍落點白閃、地面衝擊環、塵土、碎石、放射裂紋（藍光後冷卻）；插地小劍逐把化成光點上升消失', en: 'impact and aftermath: a white flash at the giant sword, a ground shock ring, dust, rocks and radial cracks (glowing blue, then cooling); the stuck small swords dissolve one by one into rising motes' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    swords: { zh: '光劍數量', en: 'sword count', min: 20, max: 50, step: 1, value: 40 },
    giantSize: { zh: '巨劍大小', en: 'giant sword size', min: .7, max: 1.4, step: .05, value: 1 },
    dropSpeed: { zh: '落劍速度', en: 'drop speed', min: .6, max: 2, step: .05, value: 1 },
  },
  CX: 1.2, CY: 0,
  sky: { top: '#060a1c', bottom: '#121c40', nebula: '#1a2850', stars: .016, star: '#e4f6ff' },
  dimGround: ['#2e2622', '#3c322c', '#4a3e36', '#5a4c40'],
  // formation slots on three rings, a random drop order and a target for every drop (cached per layout + count)
  plan(p, units, nS) {
    if (this._plan && this._plan.units === units && this._plan.nS === nS) return this._plan;
    const CX = this.CX, CY = this.CY, RR = [.34, .64, .94], ZZ = [4.45, 4.0, 3.55], FR = 2.2, slots = [];
    let left = nS;
    for (let i = 0; i < 3; i++) {
      const m = i === 2 ? left : Math.max(3, Math.round(nS * RR[i] / 1.92));
      left -= m;
      for (let j = 0; j < m; j++) {
        const a = (j + .5 * (i % 2)) / m * Math.PI * 2 + i * .7;
        slots.push({ ring: i, x: CX + Math.cos(a) * RR[i] * FR, y: CY + Math.sin(a) * RR[i] * FR, z: ZZ[i], j: slots.length, R: RR[i] * FR });
      }
    }
    const order = slots.map(s => s.j).sort((a, b) => p.r(a, 11) - p.r(b, 11));
    const taken = new Set(), victimOf = new Map(), drops = [];
    order.forEach((j, k) => {
      const s = slots[j];
      let best = null, bd = 1.3 * 1.3;
      for (const u of units) {
        if (taken.has(u.i) || Math.hypot((u.x - CX) / 2.5, (u.y - CY) / 2.1) < .4) continue;
        const d = (u.x - s.x) ** 2 + (u.y - s.y) ** 2;
        if (d < bd) { bd = d; best = u; }
      }
      let tx, ty;
      if (best) { taken.add(best.i); victimOf.set(best.i, k); tx = best.x; ty = best.y; }
      else { tx = s.x + (p.r(j, 12) - .5) * .5; ty = s.y + (p.r(j, 13) - .5) * .5; }
      drops.push({ k, s, tx, ty, victim: best });
      s.drop = k;
    });
    this._plan = { units, nS, slots, drops, victimOf };
    return this._plan;
  },
  // small light sword drawn from its tip T along direction d (pointing at the tip)
  sword(p, T, d, len, I, ramp, c) {
    if (I <= .02) return;
    const G = [T[0] - d[0] * len * .7, T[1] - d[1] * len * .7, T[2] - d[2] * len * .7];
    const H = [G[0] - d[0] * len * .24, G[1] - d[1] * len * .24, G[2] - d[2] * len * .24];
    const sd = p.v3.norm(p.v3.cross(d, c.fwd)), gw = len * .2;
    p.line(G, T, len * .42, ramp, I * .32, { w1: len * .12, pow: 2 });
    p.line(G, T, len * .12, ramp, I, { w1: .012, i1: I * .85 });
    p.line([G[0] - sd[0] * gw, G[1] - sd[1] * gw, G[2] - sd[2] * gw], [G[0] + sd[0] * gw, G[1] + sd[1] * gw, G[2] + sd[2] * gw], len * .07, ramp, I * .9);
    p.line(G, H, len * .06, ramp, I * .7);
    p.dot(H[0], H[1], H[2], ramp, I, 1);
  },
  // giant sword outline, tip at T (vertical, facing the camera): returns edge point lists
  giantShape(p, T, GS) {
    const c = p.cam(), R = c.right, BL = 3.4 * GS, HW = .3 * GS, N = 10, left = [], right = [], mid = [];
    for (let k = 0; k <= N; k++) {
      const s = k / N, w = HW * (s < .78 ? 1 - .12 * s : .906 * (1 - (s - .78) / .22)), z = T[2] + BL * (1 - s);
      left.push([T[0] - R[0] * w, T[1] - R[1] * w, z]); right.push([T[0] + R[0] * w, T[1] + R[1] * w, z]); mid.push([T[0], T[1], z]);
    }
    const gz = T[2] + BL, GW = .8 * GS, gh = .1 * GS, gL = [], gR = [];
    for (let k = 0; k <= 6; k++) {
      const s = k / 6 * 2 - 1, droop = -Math.abs(s) * Math.abs(s) * .07 * GS;
      gL.push([T[0] + R[0] * GW * s, T[1] + R[1] * GW * s, gz + gh + droop]); gR.push([T[0] + R[0] * GW * s, T[1] + R[1] * GW * s, gz - gh + droop]);
    }
    return { left, right, mid, gL, gR, gz, R, c };
  },
  draw(p, t) {
    const PL = this.palette, B = PL.blade, CAST = .5, HIT = 3.0, CX = this.CX, CY = this.CY;
    const n = Math.round(p.param('crowd')), nS = Math.round(p.param('swords')), GS = p.param('giantSize'), FD = .13 / p.param('dropSpeed');
    const LEN = .8, c = p.cam();
    // ---- caster: point to the sky, then point at the centre for the giant sword ----
    let pose;
    if (t < CAST) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .05, CAST), 1.3) };
    else if (t < 2.7) pose = 'raise';
    else if (t < 2.85) pose = { a: 'raise', b: 'point', k: p.easeInCubic(p.ph(t, 2.7, 2.85)) };
    else if (t < 3.5) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.5, 4.2)) };
    const fig = p.figure(-3.5, .2, { pose }), hand = fig.hand;
    // ---- plan: formation slots, drop order, targets ----
    const area = { x: CX, y: CY, rx: 2.5, ry: 2.1 }, seed = 11;
    const units = p.crowdLayout({ n, seed, area }), plan = this.plan(p, units, nS);
    const tDrop = k => 1.42 + 1.12 * Math.pow(nS > 1 ? k / (nS - 1) : 0, .62);
    const dist = u => Math.hypot(u.x - CX, u.y - CY);
    const crowd = p.crowd({
      n, seed, area, t, at: [CX, CY, 0],
      hit: u => { const k = plan.victimOf.get(u.i); return k != null ? tDrop(k) + FD : HIT + .02 + dist(u) / 6.5 + u.r1 * .03; },
      reactOf: u => (plan.victimOf.has(u.i) ? 'fall' : dist(u) < .3 * GS ? 'crush' : dist(u) < 1.4 ? 'launch' : 'knock'),
      power: u => p.clamp((1.85 - .42 * dist(u)) * Math.sqrt(GS), .4, 1.9),
      ramp: B,
      fear: u => (plan.victimOf.has(u.i) ? .3 * p.ph(t, 1.2, 1.5) : p.ph(t, 1.6, 2.9) * (.5 + .5 * u.r3)),
      respawn: [4.05, 4.95], clear: [3.6, 4.3], from: [1, .1],
    });
    // ---- giant sword: slow descent from above the frame, then a plunge ----
    let gT = null;
    if (t >= 2.0 && t < 4.3) {
      const z = t < 2.72 ? 7.6 - 3.1 * p.ease(p.ph(t, 2.0, 2.72)) : 4.5 - 5.4 * p.easeInCubic(p.ph(t, 2.72, HIT));
      gT = [CX, CY, z];
    }
    const gFade = 1 - p.ph(t, 3.75, 4.25);
    let G = null;
    if (gT && gFade > .02) {
      G = this.giantShape(p, gT, GS);
      const al = gFade < 1 ? gFade : 1, so = { alpha: al };
      p.sribbon(G.left, G.right, (u, v) => (v < .5 ? .3 + 1.1 * v : .85 - .9 * (v - .5)) - .12 * u, PL.steel, so);
      p.sribbon(G.gL, G.gR, (u, v) => .45 + .35 * (1 - Math.abs(u * 2 - 1)) - .2 * v, PL.steel, so);
      const gr = .06 * GS, top = G.gz + .7 * GS, R = G.R;
      p.sribbon([[gT[0] - R[0] * gr, gT[1] - R[1] * gr, G.gz], [gT[0] - R[0] * gr, gT[1] - R[1] * gr, top]], [[gT[0] + R[0] * gr, gT[1] + R[1] * gr, G.gz], [gT[0] + R[0] * gr, gT[1] + R[1] * gr, top]], (u, v) => .15 + .3 * (1 - v) + (Math.floor(u * 6) % 2 ? .1 : 0), PL.steel, so);
      p.ball(gT[0], gT[1], top + .1 * GS, .13 * GS, PL.steel, { alpha: al, shadow: false });
    }
    // ---- ground marks: cracks at the centre (light part resolves before the domain) ----
    const a0 = t - HIT, cr = a0 >= 0 ? 1 - p.ph(t, 3.9, 4.6) : 0;
    if (cr > 0) p.aftermath(CX, CY, 2.2 * GS, 'crack', { amt: cr, n: 8, ramp: B, glow: (1 - p.ph(a0, .1, 1.5)) * cr, seed: 3, color: '#241e22' });
    // ---- the sky turns to deep night ----
    const skyK = .9 * (t < HIT ? p.easeOutCubic(p.ph(t, .3, 1.1)) : 1 - p.ph(t, 3.55, 4.05));
    if (skyK > .01) p.domain({ amt: skyK, c: [CX, CY, 4], sky: this.sky, ground: skyK > .45 ? this.dimGround : null, solids: .1, t });
    // ---- light: palm flash and beam ----
    if (t < CAST + .05) {
      const ch = p.ph(t, .05, CAST);
      p.charge(hand[0], hand[1], hand[2] + .1, ch, { n: 10, R: .9, ramp: B, up: .3 });
      p.glow(hand[0], hand[1], hand[2] + .1, .12 + .16 * ch, B, .8 * ch);
    }
    const ca = t - CAST;
    if (ca >= 0 && ca < .4) {
      const k = p.easeOutExpo(ca / .1), f = 1 - p.ph(ca, .06, .4);
      p.line([hand[0], hand[1], hand[2] + .15], [hand[0], hand[1], hand[2] + .2 + 8 * k], .14 * f + .02, B, 1.3 * f, { w1: .03 });
      p.glow(hand[0], hand[1], hand[2] + .1, .5 * f, B, 1.2 * f);
      p.ring(hand[0], hand[1], hand[2] + .1, .1 + .5 * p.easeOutExpo(ca / .3), .05, B, f, { axis: c.fwd });
    }
    if (ca >= 0 && t < 2.9) p.glow(hand[0], hand[1], hand[2] + .08, .16 + .03 * Math.sin(t * 15), B, .7 * (1 - p.ph(t, 2.7, 2.9)));
    // ---- formation rings ----
    const ringI = p.env(t, .5, 1.0, 2.3, 2.75);
    if (ringI > 0) {
      const RZ = [4.45, 4.0, 3.55], RR = [.34, .64, .94];
      for (let i = 0; i < 3; i++) {
        const g = p.easeOutBack(p.ph(t, .5 + .2 * i, .85 + .2 * i), 1.4);
        if (g > 0) p.ring(CX, CY, RZ[i] + .62, RR[i] * 2.2 * g, .03, B, .32 * ringI, { fn: a => .6 + .4 * Math.sin(a * 6 - t * 4 + i) });
      }
    }
    // ---- the swords: appear, hover, aim, fall, stick, dissolve ----
    const nSp = Math.round(5 * p.density);
    for (const d of plan.drops) {
      const s = d.s, j = s.j, k = d.k, ta = .55 + .25 * s.ring + .15 * p.r(j, 4), td = tDrop(k), tl = td + FD;
      if (t < ta) continue;
      const pop = p.easeOutBack(p.ph(t, ta, ta + .2), 2), fl = 1 - p.ph(t, ta, ta + .15);
      const bob = .06 * Math.sin(t * 2.4 + j * 1.7);
      const T0 = [s.x, s.y, s.z + bob], T1 = [d.tx, d.ty, -.14], dd = p.v3.norm([T1[0] - T0[0], T1[1] - T0[1], T1[2] - T0[2]]);
      if (t < td - .1) { this.sword(p, T0, [0, 0, -1], LEN * pop, .85 + .8 * fl, B, c); continue; }
      if (t < td) {
        const k2 = p.easeOut((t - (td - .1)) / .1), dir = p.v3.norm(p.v3.lerp([0, 0, -1], dd, k2));
        this.sword(p, [T0[0], T0[1], T0[2] + .14 * k2], dir, LEN, .9 + .5 * k2, B, c);
        continue;
      }
      const S0 = [T0[0], T0[1], T0[2] + .14];
      if (t < tl) {
        const k2 = (t - td) / FD, e = k2 * k2, tip = p.v3.lerp(S0, T1, e), back = p.v3.lerp(S0, T1, Math.max(0, e - .45));
        p.line([back[0] - dd[0] * LEN, back[1] - dd[1] * LEN, back[2] - dd[2] * LEN], [tip[0] - dd[0] * LEN * .5, tip[1] - dd[1] * LEN * .5, tip[2] - dd[2] * LEN * .5], .03, B, .25, { w1: .12, i1: .9 });
        this.sword(p, tip, dd, LEN, 1.3, B, c);
        continue;
      }
      // stuck in the ground, then dissolving
      const a = t - tl, tdis = 3.55 + .55 * p.r(j, 9), dis = p.ph(t, tdis, tdis + .35);
      const I = (.75 + .5 * Math.pow(1 - p.ph(a, 0, .3), 2)) * (1 - p.easeIn(dis));
      this.sword(p, T1, dd, LEN, I, B, c);
      if (dis > 0 && dis < 1) for (let m = 0; m < 3; m++) {
        const id = j * 3 + m, q = p.ph(t, tdis + .1 * p.r(id, 21), tdis + .35 + .3 * p.r(id, 22)), sp = .15 + .55 * p.r(id, 23);
        if (q > 0 && q < 1) p.dot(d.tx - dd[0] * sp, d.ty - dd[1] * sp, -.14 - dd[2] * sp + .6 * p.easeOut(q), B, 1 - q, 1);
      }
      if (a < .45) {
        const f = 1 - a / .45, hz = .14;
        p.glow(d.tx, d.ty, hz, .32, B, 1.4 * Math.pow(1 - p.ph(a, 0, .12), 2));
        p.ring(d.tx, d.ty, .03, .08 + .35 * p.easeOutExpo(a / .25), .05, B, Math.max(0, 1 - a / .25));
        p.light(d.tx, d.ty, 0, .7, B, f);
        for (let m = 0; m < nSp; m++) {
          const id = j * 7 + m, dir = p.rdir(id, 3, .6), D = p.drag(2.4, 8, a), z = hz + dir[2] * D - 3 * a * a;
          if (z > 0 && a < .35) p.dot(d.tx + dir[0] * D, d.ty + dir[1] * D, z, B, 1.2 * (1 - a / .35), 1);
        }
      }
    }
    // ---- giant sword light: halo behind, glowing edges and ridge, target sigil, plunge streaks ----
    if (G) {
      const gI = gFade * (a0 < 0 ? .75 + .25 * p.ph(t, 2.72, HIT) : 1 - .35 * p.ph(a0, .2, .8)), bk = c.fwd, o = .35;
      const top = G.mid[0], tipP = G.mid[G.mid.length - 1];
      p.line([top[0] - bk[0] * o, top[1] - bk[1] * o, top[2] - bk[2] * o], [tipP[0] - bk[0] * o, tipP[1] - bk[1] * o, tipP[2] - bk[2] * o], 1.15 * GS, B, .42 * gI, { w1: .3 * GS, pow: 2 });
      p.trail(G.left, .05, .03, B, .95 * gI, .8 * gI);
      p.trail(G.right, .05, .03, B, .95 * gI, .8 * gI);
      p.line(G.mid[1], G.mid[8], .05 * GS, B, .75 * gI, { w1: .02 });
      p.line(G.gL[0], G.gL[6], .04, B, .8 * gI);
      p.glow(gT[0], gT[1], G.gz + .8 * GS, .2 * GS, B, gI);
      if (a0 < 0) {
        const pl = p.ph(t, 2.72, HIT);
        if (pl > 0) for (let m = 0; m < 6; m++) {
          const off = (m / 5 * 2 - 1) * .7 * GS, z0 = G.gz + .3 + p.r(m, 31) * .8;
          p.line([gT[0] + G.R[0] * off, gT[1] + G.R[1] * off, z0], [gT[0] + G.R[0] * off, gT[1] + G.R[1] * off, z0 + 1.5 * pl], .03, B, .7 * pl, { i1: 0 });
        }
      }
    }
    // target sigil on the ground and the sword's light pool as it comes down
    const tg = t < HIT ? p.easeOutBack(p.ph(t, 2.2, 2.5), 1.6) : 0;
    if (tg > 0) {
      const RT = 1.4 * GS * tg, rot = t * 1.4, I = .75 * (.7 + .3 * Math.sin(t * 22));
      p.decal(CX, CY, 0, RT + .05, (dx, dy, rho, ang) => {
        const q = rho / RT;
        if (q > .9 && q < 1) return 1;
        if (Math.abs(q - .58) < .05) return .8;
        const a = ang + rot, ca2 = Math.abs(Math.cos(a) * q), sa = Math.abs(Math.sin(a) * q);
        if (q < .9 && (ca2 < .04 || sa < .04) && q > .12) return .7;
        return 0;
      }, B, I);
    }
    if (gT && a0 < 0) { const k = p.ph(t, 2.0, HIT); p.light(CX, CY, 0, 1 + 1.8 * k, B, .3 + .7 * k * k); }
    // ---- impact ----
    if (a0 >= 0 && a0 < .03 + 1 / 30) p.impactFrame({ ink: '#0a1024', paper: '#f0f8ff', accent: '#7fc8ff' });
    if (a0 >= 0) {
      const fb = 1 - p.ph(a0, 0, .45);
      if (fb > 0) {
        const fr = 1.3 * GS * (.6 + .4 * p.easeOutExpo(a0 / .2));
        p.glow(CX, CY, .4, fr * 1.4, B, 1.5 * fb * fb, { pow: 1.4 });
        p.glow(CX + c.fwd[0] * .4, CY + c.fwd[1] * .4, .3 + c.fwd[2] * .4, fr * .55, B, 1.4 * fb);
      }
      p.shock(CX, CY, .12, p.ph(a0, 0, 1), { R: 4.4 * Math.sqrt(GS), w: .45, ramp: B, ground: true, dust: PL.dust, dustN: 22 });
      if (a0 < .22) p.speedLines(CX, CY, 1, { n: 18, R0: 1.1 * GS, R1: 4.5, ramp: B, I: 1 - a0 / .22, seed: Math.floor(t * 30) });
      const nR = Math.round(12 * p.density);
      for (let k = 0; k < nR; k++) {
        const ang = p.r(k, 21) * p.TAU, v = 1.8 + 2.2 * p.r(k, 22), vz = 2.2 + 2.6 * p.r(k, 23), T = 2 * vz / 9.8, tt = Math.min(a0, T);
        if (a0 > T + 1.2) continue;
        p.rock(CX + Math.cos(ang) * (.3 + v * tt), CY + Math.sin(ang) * (.3 + v * tt), Math.max(.07, .2 + vz * tt - 4.9 * tt * tt), .07 + .08 * p.r(k, 24), PL.rock, k);
      }
      p.light(CX, CY, 0, 3.6, B, 1.2 * Math.pow(1 - p.ph(a0, 0, 1.2), 2));
    }
  },
});
