// 霜延 / Frost Overgrowth — Armory pack (original design): frost grows up a spear along one helix as a growth front,
// leaving hard crystals behind; it does not stop at the tip and builds an ice lance longer than the battlefield, which
// falls across the army, cracks along the same helix and shatters.
PXFX.define({
  id: 'frost-overgrowth',
  loop: 6.5,
  loopWindow: [.8125, 2.4375],   // seamless enchant loop in the close-up: two 0.8125 s frost cycles on the spear
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'dirt', tiles: true },
  modules: ['figure', 'armory', 'growth', 'crowd', 'troops', 'tally', 'grade', 'aftermath'],
  palette: {
    ice: ['#3f63a8', '#6c9fd8', '#a6d4f2', '#dcf2ff', '#ffffff'],
    frost: ['#3d6fc0', '#7cc0ee', '#bfefff', '#ffffff'],
    band: ['#2f5a9a', '#5e9ad6', '#a8dcf6', '#e8f8ff'],
    statue: ['#34507a', '#4e6f98', '#7896b8', '#a8c0d8'],
  },
  beats: [{ t: 2.44, kind: 'cast', power: .6 }, { t: 3.95, kind: 'hit', power: 1.5 }, { t: 4.15, kind: 'pulse', power: .5 }, { t: 4.6, kind: 'burst', power: .9 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 1, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    length: { zh: '冰槍總長', en: 'lance length', min: 3, max: 14, step: .1, value: 12 },
    frost: { zh: '冰霜半徑', en: 'frost radius', min: .2, max: 2.5, step: .05, value: .9 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .4], k: 'pose', zh: '特寫：施法者（縮放 0.85）右手直握一支長 1.2 的長槍，槍尾離地 0.35；背景壓暗，鏡頭放大 6.7 倍，只見木槍桿與槍頭', en: 'close-up: the caster (scale 0.85) holds a 1.2-long spear upright in the right hand, butt 0.35 above the ground; the background is darkened and the lens zooms 6.7× on the shaft and head' },
    { t: [.4, 2.44], k: 'charge', zh: '附魔循環：一條螺旋路徑由手上方繞槍桿到槍尖（每單位 4.3 圈、半徑 0.07）；生長前沿（最亮一級）0.5 秒由手跑到槍尖，身後每 1/7 圈留下一顆硬邊冰晶（長 0.1–0.18，0.06 秒回彈冒出），繞到槍桿後的被擋住；每週期 0.8125 秒，週期末冰晶降一級再碎成像素掉落；0.8125–2.4375 秒可無縫循環', en: 'enchant loop: one helix path winds from above the hand to the spear tip (4.3 turns per unit, radius 0.07); the growth front (the brightest tier) runs from the hand to the tip in 0.5 s and leaves a hard-edged crystal every 1/7 turn (0.1–0.18 long, popping out in 0.06 s with overshoot), hidden behind the shaft; on a 0.8125 s cycle, at its end the crystals drop a tier and fall off as pixels; 0.8125–2.4375 s loops seamlessly' },
    { t: [2.44, 3.62], k: 'shape', zh: '過度生長：2.44 秒起前沿不在槍尖停下，沿同一條螺旋（槍身以外每單位 1.4 圈）加速向上（進度^2.1），0.9 秒內長到 length（12，槍長的 10 倍）；身後是面向鏡頭的冰槍實心體（半寬 0.2、尖端收窄、左亮右暗硬色階）與每 1/5 圈一顆大冰晶；鏡頭跟著前沿上移並縮小到 0.68 倍，冰槍比整個戰場還長；3.35–3.62 秒槍頂閃光，施法者蓄力', en: 'overgrowth: from 2.44 s the front does not stop at the tip and accelerates up the same helix (1.4 turns per unit beyond the spear, progress^2.1) to length (12, ten times the spear) in 0.9 s; behind it a camera-facing solid lance body (half-width 0.2, tapered tip, bright left half and dark right half in hard steps) and a large crystal every 1/5 turn; the camera follows the front and zooms out to 0.68× — the lance is longer than the battlefield; 3.35–3.62 s the top glints and the caster winds up' },
    { t: [3.62, 3.95], k: 'motion', zh: '施法者一推，槍尖以外的冰槍（長 length − 1.2）脫離槍頭，加速轉 90° 並向前飛，3.95 秒整條橫躺落在敵陣中線 x = 1.0 上（沿 y 方向，兩端伸出島外）；施法者手中只剩長槍', en: 'the caster heaves: the ice beyond the spear tip (length − 1.2) breaks off the head, turns 90° with an accelerating fall while moving forward, and at 3.95 s lands flat across the army centre line x = 1.0 (along y, both ends past the island); the caster keeps the bare spear' },
    { t: [3.95, 4.6], k: 'impact', zh: '規則：士兵到冰槍地面線段（x = 1.0，|y| ≤ (length − 1.2) ÷ 2）的距離 d < frost（0.9）即被凍住，命中時間 = 3.95 + d ÷ 5（整條同時著地，冰霜向兩側擴散）；地上硬邊光帶正好 frost 寬，邊緣冒出一排冰晶；4.15–4.6 秒一道裂紋沿同一條螺旋由一端跑到另一端，經過時凍住的士兵碎裂；默認橫列（x 0.28–1.72）全滅，方陣、縱隊、楔形、散兵與圓陣在 ±frost 以外的排倖存', en: 'rule: a soldier whose distance d to the lance’s ground segment (x = 1.0, |y| ≤ (length − 1.2) / 2) is < frost (0.9) freezes at 3.95 + d / 5 (the whole length lands at once, the frost spreads sideways); a hard-edged ground band exactly frost wide with a row of crystals at its edge; 4.15–4.6 s a crack runs along the same helix from one end to the other and every frozen soldier shatters as it passes; the default line (x 0.28–1.72) is wiped, block, column, wedge, scatter and ring rows outside ±frost survive' },
    { t: [4.6, 6.5], k: 'after', zh: '碎裂：4.6 秒冰槍碎成 30–40 塊冰片與像素（向外彈、受重力落地、淡出）；光帶 4.9–5.35 秒熄滅，留下的白霜到 5.75 秒退去；槍上自己的冰晶 5.0–5.4 秒碎掉；屍體 4.8–5.1 秒清走，新敵軍 5.1–5.6 秒出現；鏡頭 5.4–6.15 秒推回槍身特寫，5.69 秒起冰霜循環重新開始', en: 'shatter: at 4.6 s the lance bursts into 30–40 ice chunks and pixels (thrown out, falling under gravity, fading); the band goes out 4.9–5.35 s and the frost left on the ground clears by 5.75 s; the spear’s own crystals break off 5.0–5.4 s; bodies clear 4.8–5.1 s and a fresh army fades in 5.1–5.6 s; the camera pushes back into the spear close-up 5.4–6.15 s and the frost loop restarts at 5.69 s' },
  ],
  layers: [
    { zh: '武器：程式畫的長槍（木槍桿 + 葉形槍頭），寫入深度，螺旋繞到槍後的冰晶與筆觸被擋住；冰槍本體是面向鏡頭的實心條帶（中脊略向鏡頭凸起），可以擋住背後的冰晶', en: 'weapon: a procedural spear (wooden shaft and leaf head) that writes depth, hiding crystals and strokes on the far side of the helix; the lance body is a camera-facing solid strip (spine raised towards the camera) that hides the crystals behind it' },
    { zh: '路徑先行：只有一條螺旋（槍上每單位 4.3 圈、冰槍上 1.4 圈），由固定數字建出，每格不變；生長、裂紋、冰晶位置都沿這一條；引導線顯示紅色螺旋與白色前沿標記、金色的倒下弧線、藍色冰霜邊界、綠色裂紋', en: 'path first: a single helix (4.3 turns per unit on the spear, 1.4 on the lance) built from fixed numbers, unchanged between frames; growth, crack and crystal positions all follow it; the guides show the red helix with the white front marker, the gold arc of the fall, the blue frost limits and the green crack' },
    { zh: '筆觸與色階：生長前沿是白芯冰藍筆觸（2 像素、偶有分叉）加四角星，前沿以後亮芯退去；冰晶是 5 級硬色階的雙錐體（白、淺藍、冰藍、藍、深藍），沒有柔光', en: 'stroke and tiers: the growth front is a white-cored ice-blue stroke (2 px, the odd fork) with a four-point star; behind it the core retreats; crystals are bipyramids in a 5-step hard ramp (white, pale, ice blue, blue, deep blue), no soft glow' },
    { zh: '消散：先是裂紋沿螺旋跑過（亮芯先退、留冰藍殘影），再整支碎成冰片與單粒像素；槍上的冰晶降一級後碎成像素掉落', en: 'breakup: first the crack runs along the helix (core retreats, an ice-blue afterimage remains), then the lance bursts into chunks and single pixels; the crystals on the spear drop a tier and fall off as pixels' },
    { zh: '判定與倖存：線段距離 < frost；地上光帶與邊緣冰晶正好在 frost 處；frost 小於陣型半深或 length 短於陣型寬度時，前後排或兩端的士兵倖存，保持站立', en: 'rule and survivors: segment distance < frost; the band and its edge crystals sit exactly at frost; with frost under the formation’s half depth or length under its width, the front and back rows or the ends survive and keep standing' },
    { zh: '軍隊與計數：1000 名像素小兵（默認橫列 14 排）；凍住時換成藍灰冰雕材質，裂紋經過時碎成 3 粒冰像素（不加逐兵光暈）；角落擊殺計數全滅時變金色', en: 'army and counter: 1,000 pixel soldiers (default line, 14 rows); frozen ones switch to a blue-grey statue material and burst into 3 ice pixels as the crack passes (no per-unit glow); the corner kill counter turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是放大 6.7 倍的槍身特寫（背景壓暗染藍）；過度生長時鏡頭跟著前沿上升並縮小到 0.68 倍，冰槍落地時回到正常戰場視角', en: 'camera: the loop opens and closes on a 6.7× close-up of the spear (background darkened and tinted blue); during the overgrowth it follows the front up and zooms out to 0.68×, returning to the normal battlefield view as the lance lands' },
  ],

  CX: -4.3, SC: .85, AREA: { x: 1.0, y: 0, rx: 2.6, ry: 2.6 }, XC: 1.0,
  LS: 1.2, L0: .5, T1: 4.3, T2: 1.4, CYC: .8125, RUN: .5,
  TG: 2.4375, TG1: 3.35, TT: 3.62, TL: 3.95, VF: 5, TK: 4.15, TK1: 4.6, TX: 4.6,
  // the spear: held upright in the right hand of the 'ready' pose, butt at height 0.35
  SB() { const s = this.SC; return [this.CX + .34 * s, -.19 * s, .35]; },
  nrm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; },
  slerp(a, b, k) {
    const d = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(d);
    if (om < 1e-4) return b;
    const s = Math.sin(om), wa = Math.sin((1 - k) * om) / s, wb = Math.sin(k * om) / s;
    return [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
  },
  // growth front (distance along the lance from the spear butt) during the big growth
  front(t, L) {
    if (t < this.TG) return 0;
    const u = Math.min(1, (t - this.TG) / (this.TG1 - this.TG));
    return this.L0 + (L - this.L0) * Math.pow(u, 2.1);
  },
  // the lance in its own frame: half-width of the ice body and radius of the helix at distance l from the butt
  bodyW(l, L, lf) {
    const LS = this.LS;
    if (l < LS * .9) return 0;
    const grow = Math.min(1, .45 + (l - LS * .9) / .7), tip = Math.min(1, .15 + (L - l) / 1.1), fr = Math.min(1, .35 + (lf - l) / .35);
    return .2 * grow * tip * fr;
  },
  helixR(l, L) { return l < this.LS * .95 ? .07 : Math.max(.07, this.bodyW(l, L, 1e9) + .03); },
  // cached local geometry for one lance length: helix samples and the crystals along it (stable, from fixed numbers)
  local(L) {
    const c = this._loc;
    if (c && c.L === L) return c;
    const hel = [], cry = [], LS = this.LS;
    // helix samples: dense on the spear (4.3 turns per unit), coarser along the lance (1.4 turns per unit)
    for (let l = this.L0; l <= L + 1e-6; l += 1 / ((l < LS ? this.T1 : this.T2) * 14)) hel.push(l);
    if (hel[hel.length - 1] < L) hel.push(L);
    let k = 0;
    for (let l = this.L0 + .03; l < L - .1; l += 1 / ((l < LS ? this.T1 : this.T2) * (l < LS ? 7 : 5)), k++) {
      const h = PXFX.hash(k * 1.37, 4.1), h2 = PXFX.hash(k * 2.11, 7.3), sp = l < LS;
      cry.push({ l, k, len: (sp ? .13 : .26) * (.75 + .6 * h), wid: sp ? .07 : .12, up: .5 + .6 * h2, tw: (h2 - .5) * .7 });
    }
    this._loc = { L, hel, cry };
    return this._loc;
  },
  th(l) { const LS = this.LS; return Math.PI * 2 * (this.T1 * (Math.min(l, LS) - this.L0) + this.T2 * Math.max(0, l - LS)); },
  // world frame of the lance at time t: butt B, axis a, side s, normal n (n faces the camera)
  frame(t, p, L) {
    const SB = this.SB(), LS = this.LS, mid = (LS + L) / 2, zr = .16;
    const g = p.ph(t, this.TT, this.TL), ga = g * g * g * .65 + g * .35, gx = p.ease(g);
    const a0 = [0, 0, 1], a1 = [0, -1, 0], a = this.slerp(a0, a1, ga);
    const C0 = [SB[0], SB[1], SB[2] + mid], C1 = [this.XC, 0, zr];
    const C = [C0[0] + (C1[0] - C0[0]) * gx, C0[1] + (C1[1] - C0[1]) * gx, C0[2] + (C1[2] - C0[2]) * Math.max(ga, gx * .5)];
    const B = [C[0] - a[0] * mid, C[1] - a[1] * mid, C[2] - a[2] * mid];
    const f = p.cam().fwd, d = f[0] * a[0] + f[1] * a[1] + f[2] * a[2];
    let n = [f[0] - a[0] * d, f[1] - a[1] * d, f[2] - a[2] * d];
    n = Math.hypot(n[0], n[1], n[2]) < 1e-3 ? [0, 0, 1] : this.nrm(n);
    return { B, a, n, s: this.nrm(this.cross(a, n)), g };
  },
  at(F, l, th, r) {
    const c = Math.cos(th) * r, s = Math.sin(th) * r;
    return [F.B[0] + F.a[0] * l + F.s[0] * c + F.n[0] * s, F.B[1] + F.a[1] * l + F.s[1] * c + F.n[1] * s, F.B[2] + F.a[2] * l + F.s[2] * c + F.n[2] * s];
  },
  // honest rule: distance to the lance's ground segment (x = XC, |y| <= half the thrown length) < frost
  segD(u, L) { const h = (L - this.LS) / 2, dy = Math.max(0, Math.abs(u.y) - h); return Math.hypot(u.x - this.XC, dy); },
  hitOf(u, L, R) { const d = this.segD(u, L); return d < R ? this.TL + d / this.VF : null; },
  crackT(y, L) { const h = (L - this.LS) / 2; return this.TK + (this.TK1 - this.TK) * Math.min(1, Math.max(0, (h - y) / (2 * h))); },
  // camera: close-up on the spear, follow the front up the growing lance (zoom out below 1x), back to the field
  KC: 6.7,
  lensAt(t, p) {
    const L = p.param('length'), SB = this.SB(), K = this.KC;
    const close = (k, cz) => {   // k >= 1: spear-centred; k < 1: battlefield-centred, lance mid-height at the centre
      const c = [SB[0], SB[1], cz], f = Math.min(1, Math.max(0, (k - 1) / (K - 1)));
      const toF = [SB[0] * Math.min(1, k), SB[1] * Math.min(1, k), 1.36], toC = [0, 0, 1.3];
      return { k, c, to: [toF[0] + (toC[0] - toF[0]) * f, toF[1] + (toC[1] - toF[1]) * f, toF[2] + (toC[2] - toF[2]) * f] };
    };
    const vis = lf => Math.max(1.25, lf + .25);
    if (t < this.TG) return close(K, SB[2] + vis(0) / 2);
    if (t < this.TT) { const v = vis(this.front(t, L)); return close(Math.min(K, 8.4 / v), SB[2] + v / 2); }
    if (t < 5.4) {
      const g = p.ease(p.ph(t, this.TT - .05, this.TL + .1)), v = vis(L), T = close(Math.min(K, 8.4 / v), SB[2] + v / 2), I = [0, 0, 1.36];
      if (g >= 1) return null;
      const lp = (a, b) => [a[0] + (b[0] - a[0]) * g, a[1] + (b[1] - a[1]) * g, a[2] + (b[2] - a[2]) * g];
      return { k: T.k + (1 - T.k) * g, c: lp(T.c, I), to: lp(T.to, I) };
    }
    const b = p.ease(p.ph(t, 5.4, 6.15));
    if (b <= 0) return null;
    const c = [SB[0], SB[1], SB[2] + vis(0) / 2];
    return { k: 1 + (K - 1) * b, c, to: [c[0] * (1 - b), c[1] * (1 - b), c[2] + (1.3 - c[2]) * b] };
  },
  near(t) { return t < this.TG ? 1 : t < this.TG + .5 ? 1 - (t - this.TG) / .5 : t > 5.4 ? Math.min(1, (t - 5.4) / .75) : 0; },

  draw(p, t) {
    const L = p.param('length'), R = p.param('frost'), PL = this.palette, ICE = PL.ice, FR = PL.frost, TAU = Math.PI * 2;
    const sc = this.SC, LS = this.LS, near = this.near(t), formation = PXFX.TROOPS[p.param('formation') | 0].id;
    const loc = this.local(L), SB = this.SB(), hold = p.hold(t, 15, 1.625), CY = this.CYC;   // seeds repeat every 1.625 s: the loop (6.5 s) and the enchant window are both whole periods

    // ---- caster: holds the spear upright, heaves the lance forward, then rests ----
    const heave = p.ph(t, this.TT - .25, this.TT + .08), rec = p.ease(p.ph(t, 4.4, 5.1));
    let pose = 'ready';
    if (heave > 0 && rec <= 0) pose = heave < .7 ? { a: 'ready', b: 'windup', k: p.ease(heave / .7) } : { a: 'windup', b: 'punch', k: p.easeOutCubic((heave - .7) / .3) };
    if (rec > 0) pose = { a: 'punch', b: 'ready', k: rec };
    const fig = p.figure(this.CX, 0, { scale: sc, pose });

    // ---- army: frozen if within frost of the lance's ground segment, shattered when the crack passes ----
    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 29, formation, area: this.AREA, faceTo: [this.CX, 0], t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, L, R),
      react: 'freeze', freezeMat: this.palette.statue, shatter: u => this.crackT(u.y, L),
      fear: u => (t > this.TT && t < this.TL ? .6 * p.ph(t, this.TT, this.TL) : 0),
      respawn: [5.1, 5.6], clear: [4.8, 5.1],
    });

    if (near > 0) p.grade({ dark: .72 * near, desat: .4 * near, tint: '#16223a', tintAmt: .35 * near, bg: near });

    // ---- the spear stays in the hand (its butt follows the hand once the lance is gone) ----
    const thrown = t >= this.TT;
    const sb = thrown ? [fig.hand[0], fig.hand[1], fig.hand[2] - .4] : SB;
    p.weapon('spear', sb, [0, 0, 1], { scale: sc, len: LS / sc });
    const spearF = { B: sb, a: [0, 0, 1], n: null, s: null };
    { const f = p.cam().fwd, n = this.nrm([f[0], f[1], 0.0001]); spearF.n = n; spearF.s = this.nrm(this.cross([0, 0, 1], n)); }

    // ---- growth front: one helix, crystals stay behind it (hidden behind the shaft), front = brightest tier ----
    const lf = this.front(t, L);
    const F = t < this.TT ? Object.assign({ g: 0 }, spearF, { B: SB }) : this.frame(t, p, L);
    const marks = [];
    const crystal = (Fr, c, sz, al) => {
      const th = this.th(c.l), r = this.helixR(c.l, L), q = this.at(Fr, c.l, th, r);
      const rad = [Fr.s[0] * Math.cos(th) + Fr.n[0] * Math.sin(th), Fr.s[1] * Math.cos(th) + Fr.n[1] * Math.sin(th), Fr.s[2] * Math.cos(th) + Fr.n[2] * Math.sin(th)];
      const dir = [rad[0] + Fr.a[0] * c.up, rad[1] + Fr.a[1] * c.up, rad[2] + Fr.a[2] * c.up];
      p.shard(q[0], q[1], q[2], c.len * sz, c.wid * sz, dir, ICE, { shadow: false, spin: c.tw, back: .3, alpha: al });
    };
    const helixPath = (Fr, l0, l1) => {
      const pts = [];
      for (const l of loc.hel) if (l >= l0 - 1e-6 && l <= l1 + 1e-6) pts.push(this.at(Fr, l, this.th(l), this.helixR(l, L)));
      return pts.length > 1 ? p.path(pts) : null;
    };
    const backF = Fr => pt => { const d = [pt[0] - Fr.B[0], pt[1] - Fr.B[1], pt[2] - Fr.B[2]]; return d[0] * Fr.n[0] + d[1] * Fr.n[1] + d[2] * Fr.n[2] < 0; };

    // (1) the enchant loop: a front runs from the hand to the spear tip, crystals stay, then break off (periodic)
    const loopOn = t < this.TG || t >= 5.6875;
    if (loopOn) {
      const ph = ((t % CY) + CY) % CY, u = ph / this.RUN, head = Math.min(1, Math.pow(u, 1.2)), lh = this.L0 + (LS - this.L0) * head;
      const brk = p.ph(ph, .62, .8);
      for (const c of loc.cry) {
        if (c.l > LS) break;
        if (c.l > lh) break;
        const age = (lh - c.l) / (LS - this.L0) * this.RUN;
        const pop = p.easeOutBack(Math.min(1, age / .06), 2.2);
        if (brk <= 0) crystal(F, c, pop, 1);
        else {   // break off: the crystal drops a step, then falls as two pixels
          const k = brk, q = this.at(F, c.l, this.th(c.l), this.helixR(c.l, L));
          if (k < .35) crystal(F, c, 1 - k, 1);
          else if (p.r(c.k, 31) > (k - .35) * 1.4) p.dot(q[0], q[1], q[2] - (k - .35) * .5, FR, .5, 1);
        }
      }
      const path = helixPath(F, this.L0, LS);
      if (path && u < 1.25) {
        const sH = Math.min(1, head);
        p.zap(path, Math.max(0, sH - .16), sH, FR, { seed: (Math.floor((ph + 1 / 32) * 16) % 13), jag: 1.5, step: 3, back: backF(F), forks: 1, tail: .5, thick: 2 });
        if (sH > .16) p.zap(path, Math.max(0, sH - .5), sH - .16, FR, { seed: (Math.floor((ph + 1 / 32) * 16) % 13) + 3, jag: 1, step: 3, back: backF(F), forks: 0, fade: .3 + .5 * Math.min(1, u) });
        if (u < 1) { const q = path.at(sH); marks.push(q); p.sparkle(q[0], q[1], q[2], 3, FR, 1); }
      }
      if (p.guiding) p.guide(helixPath(F, this.L0, Math.max(LS, t >= 5.6875 ? LS : L)), 'red', { marks });
    }

    // (2) the big growth: the front does not stop at the tip and builds the lance
    if (t >= this.TG && t < this.TX + .02) {
      const shat = p.ph(t, this.TX, this.TX + .02) > 0;
      const lt = Math.min(lf, L);
      // ice body beyond the spear tip: a camera-facing solid, bright left half, dark right half, hard steps
      if (!shat) {
        const l0 = LS * .9, N = Math.max(2, Math.ceil((lt - l0) / .22)), Lp = [], Mp = [], Rp = [];
        if (lt > l0 + .02) {
          for (let k = 0; k <= N; k++) {
            const l = l0 + (lt - l0) * k / N, w = this.bodyW(l, L, lt), ax = this.at(F, l, 0, 0);
            Lp.push([ax[0] + F.s[0] * w, ax[1] + F.s[1] * w, ax[2] + F.s[2] * w]);
            Mp.push([ax[0] + F.n[0] * .03, ax[1] + F.n[1] * .03, ax[2] + F.n[2] * .03]);
            Rp.push([ax[0] - F.s[0] * w, ax[1] - F.s[1] * w, ax[2] - F.s[2] * w]);
          }
          p.sribbon(Lp, Mp, (uu, vv) => (vv < .25 ? .99 : vv > .8 ? .82 : .62), ICE);
          p.sribbon(Mp, Rp, (uu, vv) => (vv > .78 ? .22 : .42), ICE);
        }
        // crystals: on the spear part they stay with the spear once the lance is thrown
        for (const c of loc.cry) {
          if (c.l > lt) break;
          const onSpear = c.l < LS * .95, Fr = onSpear && thrown ? Object.assign({}, spearF, { B: sb }) : F;
          if (onSpear && t > 5.0) continue;
          const age = lt - c.l;
          crystal(Fr, c, p.easeOutBack(Math.min(1, age / .12), 2.2), 1);
        }
      }
      // the growth front: brightest tier, a short stroke on the helix plus a star
      if (lf < L && t < this.TT) {
        const path = helixPath(F, Math.max(this.L0, lt - .5), lt);
        if (path) {
          p.zap(path, .45, 1, FR, { seed: hold, jag: 1, step: 3, back: backF(F), forks: 1, thick: 1, tail: .5 });
          p.zap(path, 0, .45, FR, { seed: hold + 5, jag: 1, step: 3, back: backF(F), forks: 0, fade: .45 });
          const q = path.at(1); marks.push(q); p.sparkle(q[0], q[1], q[2], 3, FR, 1);
        }
      }
      if (p.guiding) p.guide(helixPath(F, this.L0, L), 'red', { marks: lf < L ? marks : [] });
      // glint at the top while it stands (the comic beat), and the fall arc of the far end as a guide
      if (t > this.TG1 && t < this.TT) { const q = this.at(F, L - .05, 0, 0); p.sparkle(q[0], q[1], q[2], 5, FR, 1 - p.ph(t, this.TG1, this.TT) * .5); }
      if (p.guiding && t > this.TG1 && t < this.TL + .2) {
        const arc = [];
        for (let k = 0; k <= 16; k++) { const Fk = this.frame(this.TT + (this.TL - this.TT) * k / 16, p, L); arc.push(this.at(Fk, L, 0, 0)); }
        p.guide(arc, 'gold', { marks: t < this.TL ? [this.at(F, L, 0, 0)] : [] });
      }
    }

    // (3) landing: frost band on the ground exactly `frost` around the lance's ground segment; impact dust
    const half = (L - LS) / 2, IR = this.view.r * .92 * .97;
    if (t >= this.TL - .01 && t < 5.4) {
      const fr = Math.min(R, (t - this.TL) * this.VF), fade = p.ph(t, 4.9, 5.35);
      const RR = half + R + .1;
      p.decal(this.XC, 0, 0, RR, (x, y) => {
        if (Math.hypot(this.XC + x, y) > IR) return 0;   // ground only (the lance itself overhangs the island)
        const d = Math.hypot(x, Math.max(0, Math.abs(y) - half));
        if (d >= fr) return 0;
        return d > fr - .07 ? 1 : .22;
      }, PL.band, .85 * (1 - fade));
      // frost crystals sprout from the ground along the frost front (the edge of the rule), and break with the lance
      const brk = p.ph(t, this.TX, this.TX + .35), nC = Math.ceil(half / .32);
      if (fr > .05 && brk < 1) for (let j = -nC; j <= nC; j++) for (const sg of [-1, 1]) {
        const y = j * half / nC, k = (j + nC) * 2 + (sg > 0 ? 1 : 0), d0 = Math.min(fr, R) - .04, x = this.XC + sg * d0;
        if (Math.hypot(x, y) > IR) continue;
        const age = Math.min(1, (t - this.TL - d0 / this.VF) / .1);
        if (age <= 0) continue;
        const h = (.18 + .14 * p.r(k, 81)) * p.easeOutBack(age, 2) * (1 - brk);
        if (h > .02) p.shard(x, y + (p.r(k, 82) - .5) * .12, h * .45, h, .09, [sg * .35, (p.r(k, 83) - .5) * .4, 1], ICE, { shadow: false, back: .2 });
      }
      if (t < this.TL + .5) {
        const k = p.ph(t, this.TL, this.TL + .5), n = Math.round(10 * p.density);
        for (let j = 0; j < n; j++) {
          const y = -half + 2 * half * (j + .5) / n, sd = p.r(j, 61) > .5 ? 1 : -1, d = p.drag(1.6, 5, t - this.TL);
          p.ball(this.XC + sd * (.15 + d * .5), y, .1 + d * .25, (.12 + .1 * p.r(j, 62)) * (1 + k), ['#9fb4c8', '#c9d8e6', '#eef6ff'], { alpha: 1 - k, rough: .5, shadow: false });
        }
      }
      if (p.guiding) {
        const box = [[this.XC - R, -half, .02], [this.XC - R, half, .02]], box2 = [[this.XC + R, -half, .02], [this.XC + R, half, .02]];
        p.guide(box, 'blue'); p.guide(box2, 'blue');
      }
    }

    if (t >= 4.9 && t < 5.8) p.stain(this.XC, 0, half + R + .1, (x, y) => (Math.hypot(x, Math.max(0, Math.abs(y) - half)) < R ? .55 : 0), '#cfe3f2', 1 - p.ph(t, 5.2, 5.75));
    // (4) the crack runs along the SAME helix, end to end; then the lance shatters into shards
    if (t >= this.TK - .02 && t < this.TX) {
      const k = p.ph(t, this.TK, this.TK1), l0 = LS, lc = l0 + (L - l0) * k;
      const path = helixPath(F, l0, Math.max(l0 + .05, lc));
      if (path) {
        p.zap(path, Math.max(0, 1 - 1.2 / Math.max(.1, lc - l0)), 1, FR, { seed: hold, jag: 1.5, step: 3, back: backF(F), thick: 1, forks: 1, tail: .5 });
        p.zap(path, 0, 1, FR, { seed: hold + 9, jag: 1.5, step: 3, back: backF(F), forks: 0, fade: .25 });
        marks.push(path.at(1));
        if (p.guiding) p.guide(path, 'green', { marks: k < 1 ? [path.at(1)] : [] });
      }
    }
    if (t >= this.TX && t < 5.35) {
      const a = t - this.TX, g = 4.9, Fz = this.frame(this.TL + .01, p, L), n0 = Math.ceil((L - LS * .9) / .3);
      for (let j = 0; j < n0; j++) {   // body chunks
        const l = LS * .9 + (L - LS * .9) * (j + .5) / n0, c = this.at(Fz, l, 0, 0), d = p.rdir(j, 71, .8), v = 1 + 1.3 * p.r(j, 72);
        const vz = d[2] * v * 1.4, land = (vz + Math.sqrt(vz * vz + 4 * g * c[2])) / (2 * g), tt = Math.min(a, land);
        const x = c[0] + d[0] * v * tt * .6, y = c[1] + d[1] * v * tt * .3, z = Math.max(.04, c[2] + vz * tt - g * tt * tt);
        const w = this.bodyW(l, L, L) * 2, al = 1 - p.ph(t, 5.0 + .2 * p.r(j, 73), 5.35);
        if (al > .05) p.shard(x, y, z, Math.max(.12, w * 1.6), Math.max(.06, w), a < land ? [Math.cos(a * 9 + j), Math.sin(a * 7 + j), .6] : [Math.cos(j), Math.sin(j), .12], ICE, { shadow: false, alpha: al });
      }
      for (const c of loc.cry) {   // the crystals of the thrown part fly off and drop as pixels
        if (c.l < LS) continue;
        if (c.k % 2) continue;
        const q = this.at(Fz, c.l, this.th(c.l), this.helixR(c.l, L)), d = p.rdir(c.k, 75, .9), v = .8 + 1.2 * p.r(c.k, 76), tt = Math.min(a, .55);
        const z = q[2] + d[2] * v * tt * 1.6 - g * tt * tt;
        if (z < .02 || a > .9) continue;
        p.dot(q[0] + d[0] * v * tt, q[1] + d[1] * v * tt, z, FR, a < .2 ? 1 : .6, a < .2 ? 2 : 1);
      }
      if (a < .15) for (let j = -2; j <= 2; j++) p.light(this.XC, j * half / 2.5, .2, 1.2, FR, .8 * (1 - a / .15));
    }
    // the spear's own crystals break off and drop during the aftermath (back to a bare spear for the loop)
    if (t >= 5.0 && t < 5.6875) {
      const k = p.ph(t, 5.0, 5.4), Fs = Object.assign({}, spearF, { B: sb });
      for (const c of loc.cry) {
        if (c.l > LS * .95) break;
        if (k < .3) crystal(Fs, c, 1 - k, 1);
        else if (k < 1 && p.r(c.k, 33) > k) { const q = this.at(Fs, c.l, this.th(c.l), this.helixR(c.l, L)); p.dot(q[0], q[1], q[2] - (k - .3) * .6, FR, .5, 1); }
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, this.TL - .05, this.TL + .05) * (1 - p.ph(t, 4.95, 5.15)) });
  },
});
