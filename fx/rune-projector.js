// 符文投影 / Rune Projector — Armory pack (original design): three rune rings orbit a greatsword and press into it
// as cut-outs; raised against the sun, the blade projects three giant runes of light onto the army and slides them
// across the field, burning every soldier a lit stroke touches.
PXFX.define({
  id: 'rune-projector',
  loop: 6.5,
  loopWindow: [.9, 2.5],   // seamless enchant loop in the close-up: two 0.8 s cycles of the ring heads (ring turns are whole glyph steps)
  view: { r: 5.5, h: 3.5 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    rune: ['#8a4a1a', '#d08a2a', '#ffd36a', '#fff6dc'],
    beam: ['#7a6440', '#b39a62', '#e2d09a', '#fff6de'],
  },
  beats: [{ t: .35, kind: 'cast', power: .5 }, { t: 2.64, kind: 'pulse', power: .5 }, { t: 3.35, kind: 'hit', power: 1.4 }, { t: 3.95, kind: 'pulse', power: .5 }, { t: 4.55, kind: 'pulse', power: .5 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    stroke: { zh: '符文筆畫寬度', en: 'rune stroke width', min: .16, max: .6, step: .02, value: .34 },
    slide: { zh: '投影擺動幅度', en: 'projection swing', min: 0, max: 7, step: .1, value: 6.2 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .35], k: 'pose', zh: '特寫：施法者單手把大劍豎直舉起，劍身平面朝向鏡頭；背景壓暗，只見灰色劍身', en: 'close-up: the caster holds a greatsword upright in one hand, its flat facing the camera; the background is darkened so only the grey blade reads' },
    { t: [.35, 2.5], k: 'charge', zh: '附魔循環：三個符文環在劍身三個高度彈出（半徑 0.23／0.26／0.22，各自傾斜），每環三個符文；下環與上環順時針、中環逆時針，每 1.6 秒轉過一或兩個符文位；每環一個亮頭每 0.8 秒繞一圈，身後兩段碎裂；轉到劍後的符文與亮頭被劍身遮住，在劍緣再出現', en: 'enchant loop: three rune rings pop out at three heights of the blade (radius 0.23 / 0.26 / 0.22, each tilted), three glyphs per ring; the low and high rings turn one way, the middle ring the other, by one or two glyph slots per 1.6 s; a bright head runs each ring once per 0.8 s with two breaking chunks behind it; glyphs and heads behind the blade are hidden and reappear at its edge' },
    { t: [2.5, 2.85], k: 'shape', zh: '三環依次（2.5、2.6、2.7 秒起）收緊到劍身寬度並壓入：每壓入一環，劍身上對應的格位被刻成鏤空符文，鏤空處先白後金', en: 'the rings tighten one after another (from 2.5, 2.6, 2.7 s) to the blade width and press in: each one cuts its glyph slot into the blade as a cut-out rune that shines white, then gold' },
    { t: [2.85, 3.35], k: 'motion', zh: '鏡頭拉遠到戰場；施法者把劍前傾 42 度指向敵陣；3.35 秒陽光由後上方照在劍身，穿過三個鏤空，三道光束在敵陣中央投出三個巨型符文（沿劍身方向排成一列，每個約 1.8 × 1.6），劍身的影子壓在敵陣上', en: 'the camera pulls back to the battlefield; the caster tilts the sword 42 degrees towards the army; at 3.35 s sunlight from high behind hits the blade, passes the three cut-outs, and three shafts throw three giant runes onto the middle of the army (in a row along the blade, about 1.8 x 1.6 each) inside the blade’s shadow' },
    { t: [3.35, 4.85], k: 'impact', zh: '劍身左右擺動，投影沿 y 軸位移 o = 3.1 × sin(2πu)，u 在 3.65–4.85 秒由 0 到 1（先到近側、再到遠側、回中）；規則：士兵位置曾被任何一條筆畫覆蓋（到筆畫中線距離 < 筆畫寬度 0.34 的一半）即死；命中時間 = 首次被照亮的時刻：落地時已在筆畫內為 3.35 秒，否則 3.65 + 1.2 × u（首次覆蓋的擺動相位）；擺幅為 0 時站在筆畫之間暗處的士兵倖存', en: 'the blade rocks and the projection swings along y: o = 3.1 x sin(2 pi u), u from 0 to 1 over 3.65–4.85 s (near flank, far flank, back to the centre). Rule: a soldier dies if any stroke ever covers its position (distance to the stroke centre line < half the 0.34 stroke width); hit time = the first moment it is lit: 3.35 s if it stands in a stroke when the runes land, else 3.65 + 1.2 x u at the first covering swing phase. With swing 0 the soldiers in the dark between strokes survive' },
    { t: [4.85, 6.5], k: 'after', zh: '地上筆畫的白芯先退、剩金色殘影、斷成碎段與單粒像素（4.95–5.4 秒）；光束與劍影淡出；與判定同形的焦痕 5.05–5.45 秒淡出；劍上鏤空冷卻成暗金後癒合；屍體淡出、新一批敵兵出現；劍回到豎直，鏡頭 5.8–6.4 秒推回劍身特寫', en: 'the ground strokes lose their white core, leave a gold afterimage, then split into segments and single pixels (4.95–5.4 s); the shafts and the blade shadow fade; the scorch, the same shape as the rule, fades over 5.05–5.45 s; the cut-outs cool to dark gold and close; bodies fade and a fresh army appears; the sword returns upright and the camera pushes back into the close-up over 5.8–6.4 s' },
  ],
  layers: [
    { zh: '武器：程式畫的大劍（長 1.43、加寬 1.5 倍），劍身平面朝向鏡頭並寫入深度；劍身 8–29%、32–53%、56–77% 三個格位（寬度 ±75%）可被鏤空：鏤空像素不畫鋼，畫鏤空裡的光', en: 'weapon: a procedural greatsword (length 1.43, 1.5x wide) whose flat faces the camera and writes depth; three glyph slots at 8–29%, 32–53% and 56–77% of the blade (±75% of its width) can be cut out: cut pixels draw no steel, only the light inside' },
    { zh: '路徑先行：三個符文環是固定的圓形路徑（套在劍軸上、各自傾斜），每格不變；打開「引導線」可看到紅、綠、藍三環與白色移動標記；投影時引導線改畫地上的筆畫與金色的擺動軌道', en: 'path first: the three rings are fixed circular paths around the blade axis, each tilted, unchanged between frames; the guide toggle shows them in red, green and blue with white moving markers; during the projection it shows the ground strokes and the gold swing track instead' },
    { zh: '符文：三個原創符文以線段定義在單位方格內（三叉、鋸齒、菱形加橫線）；同一組線段畫環上的符文卡、劍上的鏤空與地上的投影，形狀完全一致', en: 'glyphs: three original runes defined as line segments in a unit box (a forked stave, a zigzag, a diamond with a bar); the same segments draw the ring cards, the blade cut-outs and the ground projection, so the shapes match exactly' },
    { zh: '筆觸與色階：亮頭為 1 像素白芯、金色、暗金邊，鋸齒每兩格換形，環軌道是一圈單粒像素虛線；地上筆畫分三級硬邊：中線 40% 白芯、78% 內金色、外圈暗金，不用光暈；投影落地那 2 格整片閃白', en: 'stroke and tiers: the heads are a 1 px white core, gold, a dark gold edge, reshaped every other frame, the ring track a dotted line of single pixels; ground strokes in three hard tiers: white core within 40% of the half-width, gold to 78%, dark gold outside, no bloom; the 2 frames when the runes land flash white' },
    { zh: '消散：筆畫亮芯先退、剩金色殘影、斷成 0.12 格的碎段、最後只剩單粒像素；環上的亮頭壓入時同樣三段消散；劍上鏤空由金冷卻成暗金再癒合', en: 'breakup: the strokes lose their core, keep a gold afterimage, split into 0.12-unit segments, then single pixels; the ring heads break up the same way as they press in; the cut-outs cool from gold to dark gold and close' },
    { zh: '判定與倖存：見規則；地上的焦痕是同一判定的柵格（0.04 格）；縱隊的頭尾、圓陣與鶴翼的外緣在投影長度或擺幅以外，倖存', en: 'rule and survivors: see the rule; the ground scorch is a 0.04-unit raster of the same test; the ends of a column and the outer edge of a ring or crescent lie beyond the projection length or swing and survive' },
    { zh: '軍隊與計數：1000 名像素小兵（默認方陣）；被照到時閃白 2 格、變焦炭、抽搐、矮下倒地；倖存者在光下發抖；角落擊殺計數全滅時變金色', en: 'army and counter: 1,000 pixel soldiers (block by default); when lit they flash white for 2 frames, turn to charcoal, twitch, sag and fall; survivors tremble in the light; the corner kill counter turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是放大 5.6 倍的劍身特寫（背景壓暗），2.85–3.35 秒拉遠到戰場，5.8–6.4 秒推回', en: 'camera: the loop opens and closes on a 5.6x close-up of the blade (background darkened), pulls back to the battlefield over 2.85–3.35 s and pushes back in over 5.8–6.4 s' },
  ],

  CX: -4.3, AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  // glyph boxes on the blade (fraction b of the blade from guard to tip) and across it (a = -AW..AW of the half-width)
  B0: .08, BS: .24, BG: .21, AW: .75,
  // ground mapping (same scale both ways, so the runes keep their shape): x = X0 + (b - B0) * SX, y = a * SY + slide offset
  X0: -2.05, SX: 8.55, SY: 1.05,
  // three original glyphs as strokes in a unit box: [gu0, gv0, gu1, gv1], gu across the blade, gv along it (towards the tip)
  GLYPHS: [
    [[0, .1, 1, .1], [.5, 0, .5, 1], [.5, .45, 0, .85], [.5, .45, 1, .85]],
    [[0, 0, 1, .33], [1, .33, 0, .67], [0, .67, 1, 1]],
    [[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0], [0, .5, 1, .5]],
  ],
  NG: 3, CYC: .8, LW: [.9, 2.5],
  // rings: height on the blade (its glyph slot), radius, tilt towards the camera (tf) and sideways (ts), glyph steps per loop window
  RING: [{ b: .185, R: .23, tf: .2, ts: .3, steps: 1 }, { b: .425, R: .26, tf: -.12, ts: -.32, steps: -1 }, { b: .665, R: .22, tf: .16, ts: .24, steps: 2 }],
  TI: 2.5, PR: .14, T_ON: 3.35, S0: 3.65, S1: 4.85, BRK: [4.95, 5.4],
  KC: 5.6, FOCUS: [-4.24, -.18, 2.02],

  near(t, p) { return 1 - p.ease(p.ph(t, 2.85, 3.35)) + p.ease(p.ph(t, 5.8, 6.4)); },
  lensAt(t, p) {
    const b = this.near(t, p);
    if (b <= 0) return null;
    const c = this.FOCUS, to = [c[0] * (1 - b), c[1] * (1 - b), c[2] + (1.5 - c[2]) * b];
    return { k: 1 + (this.KC - 1) * b, c, to };
  },
  // distance from (x, y) to glyph k's strokes, the unit box scaled to sx (across) x sy (along)
  gd(k, x, y, sx, sy) {
    let best = 1e9;
    for (const s of this.GLYPHS[k]) {
      const ax = s[0] * sx, ay = s[1] * sy, dx = s[2] * sx - ax, dy = s[3] * sy - ay, L2 = dx * dx + dy * dy || 1e-9;
      let q = ((x - ax) * dx + (y - ay) * dy) / L2; q = q < 0 ? 0 : q > 1 ? 1 : q;
      const ex = x - ax - dx * q, ey = y - ay - dy * q, d = ex * ex + ey * ey;
      if (d < best) best = d;
    }
    return Math.sqrt(best);
  },
  // the ground strokes in stencil coordinates (slide offset 0): [ax, ay, bx, by, glyph]
  segs() {
    if (this._segs) return this._segs;
    const out = [];
    this.GLYPHS.forEach((g, k) => g.forEach(([u0, v0, u1, v1]) => {
      const m = (u, v) => [this.X0 + (k * this.BS + v * this.BG) * this.SX, (-this.AW + u * 2 * this.AW) * this.SY];
      out.push([...m(u0, v0), ...m(u1, v1), k]);
    }));
    return (this._segs = out);
  },
  // distance from a stencil point to the nearest ground stroke (only the glyph boxes near x are tested)
  sdist(x, y) {
    const GLx = this.BS * this.SX, k0 = Math.floor((x - this.X0) / GLx), segs = this.segs();
    let best = 1e9;
    for (const s of segs) {
      if (s[4] < k0 - 1 || s[4] > k0 + 1) continue;
      const dx = s[2] - s[0], dy = s[3] - s[1], L2 = dx * dx + dy * dy || 1e-9;
      let q = ((x - s[0]) * dx + (y - s[1]) * dy) / L2; q = q < 0 ? 0 : q > 1 ? 1 : q;
      const ex = x - s[0] - dx * q, ey = y - s[1] - dy * q, d = ex * ex + ey * ey;
      if (d < best) best = d;
    }
    return Math.sqrt(best);
  },
  // y-interval of the line X = x inside the capsule of stroke s (radius r), or null
  span(s, x, r) {
    const ax = s[1], ay = s[0], bx = s[3], by = s[2], y = x;   // swapped axes: the line runs along y
    let lo = Infinity, hi = -Infinity;
    const add = (a, b) => { if (a <= b) { if (a < lo) lo = a; if (b > hi) hi = b; } };
    for (let e = 0; e < 2; e++) { const cx = e ? bx : ax, cy = e ? by : ay; if (Math.abs(y - cy) <= r) { const h = Math.sqrt(r * r - (y - cy) * (y - cy)); add(cx - h, cx + h); } }
    const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy, L = Math.sqrt(L2), ey = y - ay;
    if (Math.abs(dy) < 1e-9) { if (Math.abs(ey) <= r) add(Math.min(ax, bx), Math.max(ax, bx)); }
    else {
      let p0 = (ey * dx - r * L) / dy, p1 = (ey * dx + r * L) / dy; if (p0 > p1) { const q = p0; p0 = p1; p1 = q; }
      let t0 = -Infinity, t1 = Infinity;
      if (Math.abs(dx) > 1e-9) { t0 = -ey * dy / dx; t1 = (L2 - ey * dy) / dx; if (t0 > t1) { const q = t0; t0 = t1; t1 = q; } }
      else { const q = ey * dy / L2; if (q < 0 || q > 1) { t0 = 1; t1 = 0; } }
      add(ax + Math.max(p0, t0), ax + Math.min(p1, t1));
    }
    return lo <= hi ? [lo, hi] : null;
  },
  // the honest rule: the stencil lands centred on the army, then swings along y as o(u) = (D/2) sin(2 pi u), u = 0..1
  // (near flank, far flank, back to the centre). Returns the first swing phase u at which a lit stroke covers world
  // point (x, y), else Infinity.
  firstLit(x, y, r, D) { return this.firstFrom(this.spans(x, r), y, D); },
  // the y-spans of every stroke on the line X = x (they depend on x only, so rasters reuse them down a column)
  spans(x, r) { const out = []; for (const s of this.segs()) { const sp = this.span(s, x, r); if (sp) out.push(sp); } return out; },
  firstFrom(spans, y, D) {
    const A = D / 2;
    let best = Infinity;
    for (const sp of spans) {
      const oa = y - sp[1], ob = y - sp[0];   // offsets at which this stroke covers the point
      let u = Infinity;
      if (oa <= 0 && ob >= 0) u = 0;
      else if (oa > 0) { if (oa <= A) u = Math.asin(oa / A) / (2 * Math.PI); }
      else if (ob >= -A) u = .5 - Math.asin(ob / A) / (2 * Math.PI);
      if (u < best) best = u;
    }
    return best;
  },
  swingU(t) { return Math.min(1, Math.max(0, (t - this.S0) / (this.S1 - this.S0))); },
  slideAt(t, D) { return D / 2 * Math.sin(2 * Math.PI * this.swingU(t)); },
  // hit time of every unit (cached per layout and knobs): lit when the stencil lands, or when the swing first reaches it
  hits(units, r, D) {
    const c = this._hc;
    if (c && c.units === units && c.r === r && c.D === D) return c.h;
    const h = new Array(units.length).fill(null);
    for (const u of units) {
      const q = this.firstLit(u.x, u.y, r, D);
      if (q === Infinity) continue;
      h[u.i] = q === 0 ? this.T_ON : this.S0 + q * (this.S1 - this.S0) + .005;
    }
    this._hc = { units, r, D, h };
    return h;
  },
  // scorch raster (first swing phase per ground cell), cached per stroke width and slide
  scorch(r, D) {
    if (this._sc && this._sc.r === r && this._sc.D === D) return this._sc;
    const st = .04, x0 = this.X0 - .6, y0 = -D / 2 - this.SY - .5, nx = Math.ceil((this.SX * .72 + 1.2) / st), ny = Math.ceil((D + 2 * this.SY + 1) / st);
    const data = new Float32Array(nx * ny);
    for (let i = 0; i < nx; i++) { const sp = this.spans(x0 + (i + .5) * st, r); for (let j = 0; j < ny; j++) data[j * nx + i] = sp.length ? this.firstFrom(sp, y0 + (j + .5) * st, D) : Infinity; }
    return (this._sc = { r, D, st, x0, y0, nx, ny, data });
  },
  // ring k at time t around weapon w: centre, in-plane basis, radius, spin angle
  ring(k, t, w, p) {
    const R = this.RING[k], v3 = p.v3, d = w.dir, u = w.u0 + (1 - w.u0) * R.b;
    const n = v3.norm([d[0] + w.nrm[0] * R.tf + w.side[0] * R.ts, d[1] + w.nrm[1] * R.tf + w.side[1] * R.ts, d[2] + w.nrm[2] * R.tf + w.side[2] * R.ts]);
    const sd = w.side, sn = sd[0] * n[0] + sd[1] * n[1] + sd[2] * n[2];
    const e1 = v3.norm([sd[0] - n[0] * sn, sd[1] - n[1] * sn, sd[2] - n[2] * sn]), e2 = v3.cross(e1, n);
    const ti = this.TI + k * .1, grow = p.easeOutBack(p.ph(t, .35 + k * .08, .65 + k * .08), 1.6);
    const tight = p.easeIn(p.ph(t, ti, ti + this.PR)), hw = w.hw(u) * 1.08;
    const rad = (R.R + (hw - R.R) * tight) * grow;
    const om = R.steps * (Math.PI * 2 / this.NG) / (this.LW[1] - this.LW[0]);
    return { c: w.axis(u), n, e1, e2, R: rad, rot: om * t + k * 1.1, dir: Math.sign(R.steps), tight, grow, u };
  },
  rpt(g, a, r) { const c = Math.cos(a) * (r == null ? g.R : r), s = Math.sin(a) * (r == null ? g.R : r); return [g.c[0] + g.e1[0] * c + g.e2[0] * s, g.c[1] + g.e1[1] * c + g.e2[1] * s, g.c[2] + g.e1[2] * c + g.e2[2] * s]; },

  draw(p, t) {
    const PL = this.palette, RUNE = PL.rune, BEAM = PL.beam, TAU = Math.PI * 2, v3 = p.v3;
    const r = p.param('stroke') / 2, D = p.param('slide'), near = this.near(t, p);
    const formation = PXFX.TROOPS[p.param('formation') | 0].id;
    const cy = (t - this.LW[0]) / this.CYC, inWin = t >= this.LW[0] && t < 3.0, seed = inWin ? p.hold(this.LW[0] + (cy - Math.floor(cy + 1e-9)) * this.CYC + 1e-9) : p.hold(t);

    // ----- caster: sword raised upright, then tilted forward against the sun -----
    const lift = p.ease(p.ph(t, 2.9, 3.3)) * (1 - p.ease(p.ph(t, 5.35, 5.85)));
    const sw = Math.sin(2 * Math.PI * this.swingU(t));
    const fig = p.figure(this.CX, 0, { scale: .85, pose: { a: 'raise', b: 'point', k: lift } });
    const el = (90 - 42 * lift) * Math.PI / 180, dir = v3.norm([Math.cos(el), .32 * sw * lift, Math.sin(el)]);
    const base = v3.along(fig.hand, dir, -.12);

    // ----- the army -----
    const lay = { n: Math.round(p.param('crowd')), seed: 31, formation, area: this.AREA, faceTo: [this.CX, 0] };
    const units = p.crowdLayout(lay), H = this.hits(units, r, D);
    const st = p.crowd(Object.assign({
      t, scale: 'auto', enter: 'fade', hit: u => H[u.i],
      react: (s, a) => {
        s.walk = null;
        if (a < .07) s.mat = 'white';
        else { s.mat = 'char'; s.jit = a < .3 ? .025 : 0; if (a > .3) { const k = p.easeIn((a - .3) / .3); s.sq = 1 - .35 * k; s.tilt = Math.PI / 2 * k; s.spear = false; } }
      },
      fear: () => .3 * p.env(t, this.T_ON, this.T_ON + .1, 4.9, 5.2),
      respawn: [5.6, 6.15], clear: [5.3, 5.7],
    }, lay));

    // ----- ground: the blade's shadow over the army, and the scorch the strokes leave -----
    const on = t >= this.T_ON && t < 5.45, s = this.slideAt(t, D), brk = p.ph(t, this.BRK[0], this.BRK[1]);
    const SX = this.SX, SY = this.SY, B0 = this.B0, X0 = this.X0;
    if (on) {
      const shade = .62 * (1 - brk), sc = this.scorch(r, D), burn = 1 - p.ph(t, 5.05, 5.45), lit = t >= this.T_ON + .05, su = this.swingU(t);
      p.stain(1.5, s, 4.6, (dx, dy) => {
        const x = dx + 1.5, y = dy + s;
        const b = (x - X0) / SX + B0, hwf = b < 0 || b > 1 ? 0 : b < .86 ? 1 : (1 - b) / .14;
        let q = Math.abs(dy) <= hwf * SY ? shade : 0;
        if (lit) {
          const i = Math.floor((x - sc.x0) / sc.st), j = Math.floor((y - sc.y0) / sc.st);
          if (i >= 0 && j >= 0 && i < sc.nx && j < sc.ny && sc.data[j * sc.nx + i] <= su) q = Math.max(q, .85 * burn);
        }
        return q;
      }, '#1b1420', 1);
    }

    // ----- close-up: grade the world dark behind the blade -----
    if (near > 0) p.grade({ dark: .8 * near, desat: .45 * near, tint: '#1e1a2a', tintAmt: .35 * near, bg: near });

    // ----- the greatsword, with the rune cut-outs once the rings have pressed in -----
    const AW = this.AW, BG = this.BG, BS = this.BS;
    const wg = p.weapon('greatsword', base, dir, { scale: .75, width: 1.5, draw: false });
    const bladeLen = (1 - wg.u0) * wg.len, hwB = .105 * 1.125, gwB = 2 * AW * hwB, glB = BG * bladeLen;
    const press = k => this.TI + k * .1 + this.PR;
    const close = 1 - p.ph(t, 5.3, 5.6), hb = .016 * close;
    const cut = k => t >= press(k) && hb > .002;
    const pattern = (u, vv, half) => {
      const a = half ? -vv : 1 - vv, b = (u - wg.u0) / (1 - wg.u0);
      if (a < -AW || a > AW) return null;
      const k = Math.floor((b - B0) / BS);
      if (k < 0 || k > 2 || b - B0 - k * BS > BG || !cut(k)) return null;
      return this.gd(k, (a + AW) / (2 * AW) * gwB, (b - B0 - k * BS) / BG * glB, gwB, glB) < hb ? -1 : null;
    };
    const w = p.weapon('greatsword', base, dir, { scale: .75, width: 1.5, pattern });

    // light through the cut-outs: white when a ring presses in, then gold; hot while projecting; cools and closes
    for (let k = 0; k < 3; k++) {
      if (!cut(k)) continue;
      const ub = w.u0 + (1 - w.u0) * (B0 + k * BS), ue = ub + (1 - w.u0) * BG, a0 = w.at(ub, -AW), a1 = w.at(ub, AW), a2 = w.at(ue, AW), a3 = w.at(ue, -AW);
      const ap = t - press(k), hot = ap < .08 || (t >= this.T_ON && t < this.T_ON + .06);
      const cool = p.ph(t, 5.0, 5.3), lvTop = hot ? 3 : t >= this.T_ON && t < 5.0 ? 3 : cool > .66 ? 0 : cool > .33 ? 1 : 2;
      p.lquad(a0, a1, a2, a3, (uq, vq) => {
        const d = this.gd(k, uq * gwB, vq * glB, gwB, glB);
        if (d >= hb) return 0;
        const lv = hot ? 3 : d < hb * .45 ? lvTop : Math.max(0, lvTop - 1);
        return (lv + .5) / 4;
      }, RUNE, 1);
      if (ap < .12) p.sparkle(...w.at((ub + ue) / 2, 0, .02), 4, RUNE, 1.2 * (1 - ap / .12));
    }

    // ----- enchant: three rune rings orbit the blade in opposite directions, then press into it -----
    const back = pt => w.behind(pt), marks = [[], [], []], ringPaths = [];
    for (let k = 0; k < 3 && t > .35 && t < press(k) + .35; k++) {
      const g = this.ring(k, t, w, p), pk = press(k), fade = p.ph(t, pk - .06, pk + .3);
      if (g.R <= .001) continue;
      const path = p.path(q => this.rpt(g, g.dir * q * 2 * TAU), 96);
      ringPaths.push([path, k]);
      // the track: a dotted orbit of single pixels
      p.zap(path, 0, .5, RUNE, { seed: seed * 7 + k * 31, jag: .4, step: 3, thick: 0, gaps: 0, forks: 0, back, fade: Math.max(.73, fade) });
      // the running head: one turn per 0.8 s, with a two-stage breakup behind it
      const ph = (((t - this.LW[0]) / this.CYC + k * .37) % 1 + 1) % 1, head = .5 + ph * .5, L = .12 + .1 * g.tight;
      p.zap(path, head - L, head, RUNE, { seed: seed * 3 + k * 101, jag: 1, step: 4, back, tail: .45, forks: 0, fade });
      for (let ch = 0; ch < 2; ch++) p.zap(path, head - L - (ch + 1) * .045, head - L - ch * .045, RUNE, { seed: seed * 3 + k * 101 + ch + 1, jag: .8, back, fade: Math.max(fade, .35 + ch * .25), forks: 0 });
      if (fade < .5) marks[k].push(path.at(head));
      // glyphs riding the ring: lit rune cards, squeezed as they turn edge-on, hidden by the blade when behind it
      const sc = g.grow * (1 - .55 * g.tight), gI = 1 - fade, cf = p.cam().fwd;
      if (gI > 0 && sc > .05) for (let j = 0; j < this.NG; j++) {
        const al = g.rot * g.dir + j * TAU / this.NG, c = this.rpt(g, al), rd = [c[0] - g.c[0], c[1] - g.c[1], c[2] - g.c[2]];
        const f = (rd[0] * cf[0] + rd[1] * cf[1] + rd[2] * cf[2]) / (g.R || 1), bk = w.behind(c), flip = f < 0;
        const gw = .13 * sc * (.3 + .7 * Math.abs(f)), gh = .16 * sc, top = bk ? 1 : 3, hs = .012 * sc;
        p.card(c[0], c[1], c[2], gw, gh, (uq, vq) => {
          const d = this.gd(k, ((flip ? -uq : uq) + 1) / 2 * gw, (vq + 1) / 2 * gh, gw, gh);
          return d < hs ? ((d < hs * .4 ? top : top - 1) + .5) / 4 : 0;
        }, RUNE, gI);
      }
    }
    if (p.guiding) for (const [path, k] of ringPaths) p.guide(path, ['red', 'green', 'blue'][k], { marks: marks[k] });

    // ----- the projection: three shafts of light from the cut-outs to three giant runes on the ground -----
    if (on) {
      const beamI = (t < this.T_ON + .06 ? 1 : (1 - p.ph(t, 4.9, 5.15)) * .5) * (p.mode === '2d' ? 1.6 : 1);
      const gx = k => X0 + (k * BS + BG / 2) * SX;
      // the sun shaft coming in from high behind the caster onto the blade's flat
      if (beamI > 0) {
        const m0 = w.at(w.u0 + (1 - w.u0) * B0, 0), m1 = w.at(w.u0 + (1 - w.u0) * (B0 + 2 * BS + BG), 0), sky = [-2.6, 0, 3.4];
        p.lquad(v3.along(m0, sky, 1), v3.along(m1, sky, 1), m1, m0, (uq, vq) => (vq < .04 ? 0 : (uq < .08 || uq > .92 ? .32 : .16) * vq), BEAM, beamI);
      }
      if (beamI > 0) for (let k = 0; k < 3; k++) {
        const ub = w.u0 + (1 - w.u0) * (B0 + k * BS + BG / 2), src0 = w.at(ub, -AW), src1 = w.at(ub, AW);
        const g0 = [gx(k), s - AW * SY, .02], g1 = [gx(k), s + AW * SY, .02];
        p.lquad(src0, src1, g1, g0, (uq, vq) => (vq > .985 ? 0 : .2 + .25 * (uq < .06 || uq > .94 ? 1 : 0)) * (1 - vq * .35), BEAM, beamI);
      }
      // the stencil: exactly the lit strokes, white core / gold / dark edge, breaking up after the slide
      const flash = t < this.T_ON + .06, CXS = .85;
      const coreOn = brk < .12, ringOn = brk < .55, single = brk > .72, drop = brk > .4 ? (brk - .4) / .6 : 0;
      p.decal(CXS, s, 0, 3.5, (dx, dy) => {
        const x = dx + CXS, d = this.sdist(x, dy);
        if (d >= r) return 0;
        if (drop > 0) {
          const ci = Math.floor(x / .12), cj = Math.floor(dy / .12), h = p.r(ci * 131 + cj, 7);
          if (h < drop) return 0;
          if (single && p.r(ci * 17 + cj * 3, 8) > .35) return 0;
        }
        const lv = flash ? 3 : d < r * .4 ? (coreOn ? 3 : ringOn ? 2 : 1) : d < r * .78 ? (ringOn ? 2 : 1) : (ringOn ? 1 : 0);
        return (lv + .5) / 4;
      }, RUNE, 1);
      p.light(CXS, s, 0, 3.2, RUNE, .35 * (1 - brk));
      p.sparkle(...w.at(w.u0 + (1 - w.u0) * .42, 0, .03), 5, RUNE, beamI);
      if (p.guiding) {
        for (const sg of this.segs()) p.guide([[sg[0], sg[1] + s, .03], [sg[2], sg[3] + s, .03]], ['red', 'green', 'blue'][sg[4]]);
        const gxT = X0 - .35;
        p.guide([[gxT, -D / 2, .05], [gxT, D / 2, .05]], 'gold', { marks: t < this.S1 + .05 ? [[gxT, s, .05]] : [] });
      }
    }

    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 3.1, 3.3) * (1 - p.ph(t, 5.3, 5.5)) });
  },
});
