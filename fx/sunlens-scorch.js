// 聚日焦線 / Sunlens Scorch — Scale Ladder pack (original design), tier 100: a huge lens of light in the sky focuses the sun into one white-hot point that burns an arc through a crescent of a hundred soldiers
PXFX.define({
  id: 'sunlens-scorch',
  loop: 5.5,
  beats: [{ t: 1.2, kind: 'cast', power: .7 }, { t: 1.45, kind: 'hit', power: 1.3 }, { t: 2.2, kind: 'pulse', power: .45 }, { t: 2.95, kind: 'pulse', power: .6 }],
  view: { r: 4.8, h: 3.4 },
  stage: { ground: 'grass' },
  modules: ['figure', 'charge', 'crowd', 'troops', 'tally', 'domain', 'shockwave', 'aftermath'],
  palette: {
    sun: ['#b0561c', '#e08a24', '#ffc24a', '#ffd25a', '#ffeca8', '#fffbe8'],
    ember: ['#8a2a16', '#c4481a', '#ee7a24', '#ffb84a', '#ffe8a0'],
    glass: ['#6e94b8', '#94bcd8', '#bcdcf0', '#e2f2fc', '#ffffff'],
    rim: ['#b86a20', '#e8a030', '#ffd060', '#fff0b0'],
    beam: ['#c8a060', '#f0d088', '#fff0c0', '#fffaf0'],
    smoke: ['#3a3438', '#4e474a', '#655d5e', '#7e7674'],
  },
  timeline: [
    { k: 'pose', t: [0, .7], zh: '起手：施法者（位於 x = −3.5）由站姿舉起雙手指向天空；一百名敵兵排成鶴翼陣（弧形，兩翼尖端指向施法者），中心 (1.2, 0)、半寬 2.1', en: 'pose: the caster (at x = −3.5) raises both arms to the sky; a hundred soldiers stand in a crescent (an arc whose horns point at the caster) centred at (1.2, 0), half size 2.1' },
    { k: 'charge', t: [.4, 1.2], zh: '集氣：敵陣上空 5.6 高處以回彈緩動張開一面半徑 1.6 × 透鏡大小的玻璃透鏡（半透明淡藍實心圓盤＋金色發光邊框沿圓周畫出，兩點高光滑過），上緣超出畫面；天空在 0.9 秒內轉成昏暗的暮色，好讓光線突出；8 道金光匯聚到施法者高舉的每一隻手', en: 'charge: a glass lens of radius 1.6 × lens size opens with an overshoot 5.6 above the army (a translucent pale blue solid disc, a gold glowing rim drawn on around it, two glints sliding over it), its top edge leaving the frame, while the sky dims to dusk over 0.9 s so the light reads; 8 gold streaks converge on each of the caster’s raised hands' },
    { k: 'shape', t: [1.2, 1.45], zh: '成形：1.2 秒透鏡下方射出光錐，0.25 秒內由寬變窄，聚焦成地面上一個白熱光點（光點周圍畫出半徑 = 焦線寬度的焦斑），位於弧形路徑起點', en: 'shape: at 1.2 s a cone of light drops from the lens and narrows over 0.25 s into one white-hot point on the ground (with a focal spot of radius = burn width around it) at the start of the path' },
    { k: 'motion', t: [1.45, 2.95], zh: '推進：路徑是與預設鶴翼陣吻合的圓弧：圓心 (x + 半深 × 0.5 − Rc, 0)、半徑 Rc = 1.35 × max(半深, 半寬)，半角 =（鶴翼張角 + 0.1）× 透鏡大小；光點用 smoothstep 緩動 1.5 秒由一翼掃到另一翼（中段最快約每秒 7 單位），透鏡跟著轉向；身後留下發光焦溝（橙白 → 暗紅，1.5 秒冷卻）與焦黑地面、上升的灰煙。判定：與路徑距離 ≤ 焦線寬度（0.4）的敵兵中招，命中時間 = 光點經過路徑上最近點的時間；中招者起火、燒成焦炭、崩成灰', en: 'motion: the path is an arc matching the default crescent: centre (x + half depth × 0.5 − Rc, 0), radius Rc = 1.35 × max(half depth, half width), half-angle = (crescent half-angle + 0.1) × lens size; the point sweeps it horn to horn in 1.5 s with a smoothstep ease (fastest ~7 units/s mid-way) while the lens tilts after it, leaving a glowing trench (orange-white → dark red, cooling over 1.5 s), scorched ground and rising grey smoke. Area test: hit if the distance to the path ≤ burn width (0.4); hit time = the time the point passes the closest point of the path; hit soldiers catch fire, char and crumble to ash' },
    { k: 'impact', t: [1.45, 3.1], zh: '命中：1.45 秒光點點燃（頓幀＋地面閃光環），掃過時每個敵兵在光點經過時閃白並起火；2.95 秒光點到達終點閃一下，光錐張開消失', en: 'impact: at 1.45 s the point ignites (hit-stop and a ground flash ring); as it sweeps, each soldier flashes white and catches fire the moment it passes; at 2.95 s the point flares at the end and the cone opens and vanishes' },
    { k: 'after', t: [3.1, 5.5], zh: '餘波：透鏡在 3.1–3.5 秒收縮消失，天空 3.2–4.0 秒復原；焦溝冷卻成焦黑弧線，灰煙上升，4.2–4.9 秒焦痕淡出、骨灰淡出、擊殺計數淡出，新一批敵兵由右邊走回原位', en: 'aftermath: the lens shrinks away at 3.1–3.5 s and the sky returns at 3.2–4.0 s; the trench cools to a black arc under rising smoke, and at 4.2–4.9 s the scorch, the ashes and the kill counter fade while a fresh company walks back in from the right' },
  ],
  layers: [
    { zh: '敵陣：50–200 名敵兵（預設 100），按陣型排在中心 (1.2, 0)、半寬 2.1×2.1 的範圍內（預設鶴翼），兵距決定大小（3D 小兵）；角落的擊殺計數「骷髏 已擊殺／總數」即時累加，全滅時變金色', en: 'company: 50–200 soldiers (default 100) in a formation inside a 2.1×2.1 half-size area centred at (1.2, 0) (default crescent), sized by their spacing (3D pawns); a kill counter "skull killed/total" in the corner counts up live and turns gold on a full wipe' },
    { zh: '判定與倖存者：命中 ⇔ 敵兵到弧形路徑（含兩端圓頭）的距離 ≤ 焦線寬度；命中時間 = 1.45 + smoothstep⁻¹(路徑上最近點的弧長比例) × 1.5 秒；焦斑半徑、焦黑帶寬與判定用同一個寬度；其他陣型被弧線切過，弧外的敵兵只會發抖，一直站到循環結束', en: 'area test and survivors: hit ⇔ the distance from the unit to the arc path (with round end caps) ≤ burn width; hit time = 1.45 + smoothstep⁻¹(arc fraction of the closest path point) × 1.5 s; the focal spot radius, the scorched band and the test share the same width; other formations are cut by the arc and the units off it only tremble and stay standing through the loop' },
    { zh: '透鏡：半透明（抖色 62%）淡藍實心圓盤，徑向漸層與一條旋轉的高光帶，外圈一條深色鏡緣（厚 0.14），再加金色發光邊框、半徑 72% 的內圈細光環、兩顆滑動的四角星，光錐亮起時鏡心有一點白光；圓盤法線永遠指向地面光點，所以透鏡會跟著光點轉向', en: 'lens: a translucent (62% dithered) pale blue solid disc with a radial gradient and a turning highlight streak, a darker edge band (0.14 thick), a gold glowing rim, a thin inner ring at 72% radius, two sliding four-point glints and a white hot spot at its centre while the cone is lit; the disc normal always points at the ground point, so the lens tilts to follow it' },
    { zh: '光錐：由透鏡左右邊緣到光點的面向鏡頭淡金色三角形（稀疏抖色，邊緣兩條亮線，越近光點越亮）加一條中心光柱；聚焦前底部是一個逐漸收細的光斑', en: 'light cone: a camera-facing pale gold triangle from the left and right of the lens rim down to the point (sparse dither, two bright edge lines, brighter towards the point) plus a central shaft; before focusing its foot is a shrinking spot' },
    { zh: '光點：白熱硬邊光球（半徑 0.1）＋光暈、一根 0.8 高的熱柱、每格隨機噴出的 8 條火花、地面光池；焦斑是半徑 = 焦線寬度的發光圓盤', en: 'point: a white-hot hard orb (radius 0.1) with a halo, a 0.8-high heat column, 8 sparks reseeded every frame and a pool of ground light; the focal spot is a glowing disc of radius = burn width' },
    { zh: '焦溝：沿已掃過的路徑，中心寬 0.12 的發光溝（橙白 → 暗紅，1.5 秒冷卻）＋半寬 = 焦線寬度的焦黑地面，邊緣一條更深的線；每 0.25 單位一團灰煙上升、變大、淡出', en: 'trench: along the swept path a 0.12-wide glowing groove (orange-white → dark red, cooling over 1.5 s) plus scorched ground of half-width = burn width with a darker edge line; a grey smoke puff every 0.25 units rises, grows and fades' },
    { zh: '天空：領域模組把頁面換成昏暗暮色、地面壓暗，光線與火焰保持高亮', en: 'sky: the domain module swaps the page for a dim dusk and darkens the ground while the light and the fire stay bright' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 50, max: 200, step: 1, value: 100 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 5, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    width: { zh: '焦線寬度', en: 'burn width', min: .15, max: .8, step: .05, value: .4 },
    lens: { zh: '透鏡大小', en: 'lens size', min: .6, max: 1.6, step: .1, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.1, ry: 2.1 },
  SKY: { top: '#241a32', bottom: '#5a3a34', nebula: '#6a4434', stars: .002, star: '#ffe0a0' },
  SKY_NIGHT: { top: '#0c0912', bottom: '#2a1a1e', nebula: '#382224', stars: .003, star: '#ffe0a0' },
  GROUND: ['#1e2e22', '#283c2a', '#344a32', '#40583a'],
  TS: 1.45, TD: 1.5,
  // the path: an arc fitted to the crescent formation of the area (same numbers as the kit's crescent)
  path(lens) {
    const A = this.AREA, Rc = Math.max(A.rx, A.ry) * 1.35, span = Math.min(1.25, Math.asin(Math.min(1, A.ry / Rc)) + .25);
    return { cx: A.x + A.rx * .5 - Rc, cy: A.y, Rc, H: (span + .1) * lens };
  },
  // smoothstep progress and its inverse
  sm: u => u * u * (3 - 2 * u),
  ism: s => .5 - Math.sin(Math.asin(1 - 2 * Math.min(1, Math.max(0, s))) / 3),
  // distance from a ground point to the path (round caps) and the path angle of its closest point
  near(P, x, y) {
    const dx = x - P.cx, dy = y - P.cy, ang = Math.atan2(dy, dx), rho = Math.hypot(dx, dy);
    if (Math.abs(ang) <= P.H) return [Math.abs(rho - P.Rc), ang];
    const a = ang > 0 ? P.H : -P.H;
    return [Math.hypot(x - P.cx - Math.cos(a) * P.Rc, y - P.cy - Math.sin(a) * P.Rc), a];
  },
  // the time the point passes path angle a
  passT(P, a) { return this.TS + this.ism((a + P.H) / (2 * P.H)) * this.TD; },
  // per-unit hit times (cached per layout and knobs)
  hits(units, width, lens) {
    const key = width + '|' + lens;
    if (this._hu === units && this._hk === key) return this._hv;
    const P = this.path(lens), v = units.map(u => {
      const [d, a] = this.near(P, u.x, u.y), tp = this.passT(P, a);
      return { d, tp, hit: d <= width ? tp + u.r1 * .03 : null };
    });
    this._hu = units; this._hk = key; this._hv = v;
    return v;
  },
  draw(p, t) {
    const coneOn = tt => tt > 1.2 && tt < 3.25;
    const PL = this.palette, SUN = PL.sun, EM = PL.ember, TS = this.TS, TE = TS + this.TD;
    const width = p.param('width'), lens = p.param('lens');
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const CL = [4.2, 4.8], RS = [4.4, 5.35];
    const P = this.path(lens), lay = { n, seed: 5, area: this.AREA, formation: form };
    const units = p.crowdLayout(lay), H = this.hits(units, width, lens);
    const thNow = -P.H + 2 * P.H * this.sm(p.ph(t, TS, TE));                 // the point's path angle
    const PT = [P.cx + Math.cos(thNow) * P.Rc, P.cy + Math.sin(thNow) * P.Rc, 0];
    const at = (a, z = 0) => [P.cx + Math.cos(a) * P.Rc, P.cy + Math.sin(a) * P.Rc, z];
    // ---- caster: arms to the sky, then a hand that steers the point ----
    let pose;
    if (t < .25) pose = 'idle';
    else if (t < 1.35) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .25, .7), 1.3) };
    else if (t < 3.1) pose = { a: 'bothUp', b: 'point', k: p.easeInCubic(p.ph(t, 1.35, 1.48)) };
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.1, 3.9)) };
    const fig = p.figure(-3.5, 0, { pose });
    // ---- the company ----
    const crowd = p.crowd(Object.assign({}, lay, {
      t, scale: 'auto', fill: 1.4, maxScale: 1, pal: 'steel', react: 'burn', ramp: SUN, at: [PT[0], PT[1], 0],
      hit: u => H[u.i].hit,
      fear: u => { const h = H[u.i]; return (.2 * p.env(t, .6, 1.2, 2.9, 3.6) + .8 * p.ph(t, h.tp - .7, h.tp - .1) * (1 - p.ph(t, h.tp + .3, h.tp + 1.2)) * (h.d < width + 1.2 ? 1 : .3)) * (.5 + .5 * u.r3); },
      respawn: RS, clear: CL, from: [1, .12],
    }));
    // ---- ground smoke along the swept path (soft solids) ----
    const L = 2 * P.H * P.Rc, nS = Math.max(6, Math.round(L / .25 * Math.min(1.4, p.density)));
    for (let k = 0; k < nS; k++) {
      const a = -P.H + 2 * P.H * (k + .5) / nS, tb = this.passT(P, a) + .05, age = t - tb;
      if (age < 0 || age > 2.2) continue;
      const u = age / 2.2, q = at(a), side = (p.r(k, 3) - .5) * width;
      const z = .12 + p.drag(1.4, 1.6, age), sz = .12 + .2 * p.easeOut(u);
      p.ball(q[0] + Math.cos(a) * side + .25 * u, q[1] + Math.sin(a) * side, z, sz, PL.smoke, { alpha: .75 * Math.pow(1 - u, 1.2), rough: .35, shadow: false, seed: k });
    }
    // ---- the lens (solid glass) ----
    const LC = [P.cx + P.Rc * .55, P.cy - .3, 5.6];
    const grow = p.easeOutBack(p.ph(t, .45, 1.1), 1.4) * (1 - p.easeInCubic(p.ph(t, 3.1, 3.5)));
    const Rl = 1.6 * lens * grow;
    let lensB = null;
    if (Rl > .03) {
      const tgt = t < TS ? at(-P.H) : PT, nn = p.v3.norm([tgt[0] - LC[0], tgt[1] - LC[1], tgt[2] - LC[2]]);
      const e1 = p.v3.norm(p.v3.cross(nn, [0, 1, 0])), e2 = p.v3.cross(nn, e1);
      const rim = (r, off) => Array.from({ length: 25 }, (_, k) => { const a = k / 24 * p.TAU; return [LC[0] + (e1[0] * Math.cos(a) + e2[0] * Math.sin(a)) * r + nn[0] * off, LC[1] + (e1[1] * Math.cos(a) + e2[1] * Math.sin(a)) * r + nn[1] * off, LC[2] + (e1[2] * Math.cos(a) + e2[2] * Math.sin(a)) * r + nn[2] * off]; });
      const outer = rim(Rl, 0), centre = outer.map(() => LC), glA = .62 * p.ph(t, .55, 1.0);
      const gl = (t - .5) * .7;
      if (glA > .05) {
        p.sribbon(centre, outer, (u, v) => .3 + .4 * v * v + (Math.abs(((u + gl) % 1) - .5) < .04 && v > .3 ? .5 : 0), PL.glass, { alpha: glA });
        p.sribbon(rim(Rl, .07), rim(Rl, -.07), (u, v) => .05 + .2 * v, PL.glass, { alpha: Math.min(1, glA * 1.6) });
      }
      lensB = { nn, e1, e2, Rl };
    }
    // ---- the world dims to dusk ----
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .4, 1.3)) : 1 - p.ph(t, 3.2, 4.0);
    if (skyK > .01) p.domain({ amt: skyK, c: [LC[0], LC[1], LC[2]], sky: p.night ? this.SKY_NIGHT : this.SKY, ground: this.GROUND, solids: .12, t, fade: t > 2 });
    // ---- scorched ground: the band of half-width = burn width, darker edge lines ----
    const swept = t < TS ? -1 : p.ph(t, TS, TE), scK = 1 - p.ph(t, 4.2, 4.9);
    if (swept >= 0 && scK > 0) {
      p.stain(P.cx, P.cy, P.Rc + width + .1, (dx, dy) => {
        const [d, a] = this.near(P, dx + P.cx, dy + P.cy);
        if (d > width || a > thNow + 1e-6) return 0;
        const edge = Math.abs(d - width) < .05 ? .4 : 0;
        return .45 + .45 * (1 - d / width) + edge + .15 * p.noise(dx * 3, dy * 3);
      }, '#16100e', scK);
    }
    // ---- light ----
    if (t > .25 && t < 1.3) {
      const ch = p.ph(t, .25, 1.15);
      for (const hd of [fig.hand, fig.handL]) {
        p.charge(hd[0], hd[1], hd[2] + .05, ch, { n: 8, R: .9, ramp: SUN, up: -.4 });
        p.glow(hd[0], hd[1], hd[2] + .05, .12 + .14 * ch, SUN, .7 * ch * (1 - p.ph(t, 1.2, 1.3)));
      }
    }
    // the lens: glowing rim, inner ring, glints
    if (lensB) {
      const rI = 1.15 * p.ph(t, .5, .95) * (1 - p.ph(t, 3.2, 3.5));
      p.ring(LC[0], LC[1], LC[2], lensB.Rl, .08, PL.rim, rI, { axis: lensB.nn, a1: p.TAU * p.easeOutCubic(p.ph(t, .45, .9)) });
      p.ring(LC[0], LC[1], LC[2], lensB.Rl * .72, .035, PL.rim, .35 * rI, { axis: lensB.nn });
      for (let j = 0; j < 2; j++) {
        const a = (t * .9 + j * .5) * p.TAU * .5, q = [LC[0] + (lensB.e1[0] * Math.cos(a) + lensB.e2[0] * Math.sin(a)) * lensB.Rl * .6, LC[1] + (lensB.e1[1] * Math.cos(a) + lensB.e2[1] * Math.sin(a)) * lensB.Rl * .6, LC[2] + (lensB.e1[2] * Math.cos(a) + lensB.e2[2] * Math.sin(a)) * lensB.Rl * .6];
        p.sparkle(q[0], q[1], q[2], 3, PL.beam, rI * (.7 + .3 * Math.sin(t * 9 + j)));
      }
      if (coneOn(t)) p.glow(LC[0], LC[1], LC[2] - .05, .35, PL.beam, .6 * rI);
    }
    // the cone: wide spot narrowing to a point, then the sweep
    const coneI = p.ph(t, 1.2, 1.3) * (1 - p.ph(t, TE, TE + .3));
    if (lensB && coneI > 0) {
      const foc = p.easeInCubic(p.ph(t, 1.2, TS)), base = t < TS ? at(-P.H) : PT, spread = t < TE ? lensB.Rl * .85 * (1 - foc) : lensB.Rl * .85 * p.easeOutCubic(p.ph(t, TE, TE + .3));
      const c = p.cam(), rr = p.v3.norm([c.right[0] - lensB.nn[0] * (c.right[0] * lensB.nn[0] + c.right[1] * lensB.nn[1] + c.right[2] * lensB.nn[2]), c.right[1] - lensB.nn[1] * (c.right[0] * lensB.nn[0] + c.right[1] * lensB.nn[1] + c.right[2] * lensB.nn[2]), c.right[2] - lensB.nn[2] * (c.right[0] * lensB.nn[0] + c.right[1] * lensB.nn[1] + c.right[2] * lensB.nn[2])]);
      const A = [LC[0] - rr[0] * lensB.Rl, LC[1] - rr[1] * lensB.Rl, LC[2] - rr[2] * lensB.Rl], B = [LC[0] + rr[0] * lensB.Rl, LC[1] + rr[1] * lensB.Rl, LC[2] + rr[2] * lensB.Rl];
      const fl = [c.right[0] * spread, c.right[1] * spread, 0];
      const F0 = [base[0] - fl[0], base[1] - fl[1], .02], F1 = [base[0] + fl[0], base[1] + fl[1], .02];
      const f0 = p.mode === '2d' ? .14 : .04;
      p.lquad(A, B, F1, F0, (u, v) => (Math.abs(u - .5) > .45 ? .3 + .3 * v : f0 + .2 * v * v * v), PL.beam, coneI);
      p.line([LC[0], LC[1], LC[2]], [base[0], base[1], .05], .08, PL.beam, .45 * coneI * (t < TS ? foc : 1), { w1: .05, i1: 1.1 * coneI });
      if (t < TS) p.decal(base[0], base[1], 0, spread + .1, (dx, dy, rho) => (rho < spread ? .3 + .5 * foc + .3 * p.band(rho, spread * .9, .1) : 0), SUN, coneI);
    }
    // the trench: a glowing groove cooling behind the point (segments along the swept arc)
    if (swept > 0) {
      const nG = Math.max(8, Math.ceil(P.H * P.Rc * 6)), cool = 1.5, heat = a => { const k = 1 - (t - this.passT(P, a)) / cool; return k > 0 ? .25 + .95 * k * k : .0; };
      for (let k = 0; k < nG; k++) {
        const a0 = -P.H + 2 * P.H * k / nG;
        if (a0 > thNow) break;
        const a1 = Math.min(thNow, -P.H + 2 * P.H * (k + 1) / nG), i0 = heat(a0), i1 = heat(a1);
        if (i0 <= 0 && i1 <= 0) continue;
        p.line(at(a0, .01), at(a1, .01), .14, EM, i0, { i1 });
      }
    }
    // the white-hot point
    if (t >= TS - .02 && t < TE + .25) {
      const a = t - TS, end = p.ph(t, TE, TE + .25), I = (a < .12 ? 1.6 - 3 * a : 1.25) * (1 - end * end);
      p.decal(PT[0], PT[1], 0, width + .05, (dx, dy, rho) => (rho < width ? .25 + .75 * Math.pow(1 - rho / width, 2) + .3 * p.band(rho, width - .03, .05) : 0), SUN, .9 * I);
      p.line([PT[0], PT[1], .02], [PT[0], PT[1], .8], .12, SUN, .9 * I, { w1: .02, i1: .1 });
      p.glow(PT[0], PT[1], .12, .55, SUN, .8 * I);
      p.orb(PT[0], PT[1], .07, .1, SUN, 1.2 * I);
      const fq = Math.floor(t * 30), ns = Math.round(8 * p.density);
      for (let j = 0; j < ns; j++) {
        const d = p.rdir(j + fq * 13, 4, .5), L0 = .15 + .35 * p.r(j, fq);
        p.line([PT[0] + d[0] * L0 * .3, PT[1] + d[1] * L0 * .3, .05 + d[2] * L0 * .3], [PT[0] + d[0] * L0, PT[1] + d[1] * L0, .05 + Math.abs(d[2]) * L0], .03, SUN, I * (.6 + .4 * p.r(j, fq + 1)), { w1: .01 });
      }
      p.light(PT[0], PT[1], 0, 1.5, SUN, .9 * I);
      if (a >= 0 && a < .5) p.shock(PT[0], PT[1], .05, a / .5, { R: 1.3, w: .18, ramp: SUN });
      if (end > 0 && end < 1) p.shock(PT[0], PT[1], .05, end, { R: 1, w: .14, ramp: SUN });
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, CL[0], CL[1]) });
  },
});
