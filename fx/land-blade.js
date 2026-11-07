// 割地成劍 / Land Blade — Armory pack (original design): a point of light traces a giant sword on the ground around
// the army; the ground inside lifts out as one slab with the army standing on it, the caster swings it and the stop
// flings everyone off the blade, hilt first, tip last.
PXFX.define({
  id: 'land-blade',
  loop: 6.5,
  view: { r: 5.8, h: 3.4 },
  stage: { ground: 'dirt', r: 6.3 },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'debris'],
  palette: {
    cut: ['#7a3a1c', '#d8862a', '#ffd27a', '#fffbea'],
    strata: ['#2c2026', '#45322c', '#5e4636', '#7a5c44', '#957556', '#b0906a'],
    pit: ['#1a1418', '#261c1e', '#352826'],
    dust: ['#5a4a3c', '#7a6450', '#988068', '#b49a7e'],
  },
  beats: [{ t: .45, kind: 'cast', power: .5 }, { t: 1.9, kind: 'cast', power: .8 }, { t: 3.2, kind: 'hit', power: 1.35 }, { t: 4.45, kind: 'pulse', power: .8 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    length: { zh: '劍身長度', en: 'blade length', min: 3, max: 8.4, step: .1, value: 8.1 },
    width: { zh: '劍身寬度', en: 'blade width', min: 1.4, max: 6, step: .1, value: 5.4 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .45], k: 'pose', zh: '起手：施法者（縮放 0.85）站在 x = −4.3，面前是一千人的方陣（中心 (0.7, 0)、半深 2.6、半寬 2.5，像素小兵），站在一座半徑 6.3 的泥土島上；施法者伸手指向腳前的地面', en: 'pose: the caster (scale 0.85) stands at x = −4.3 facing 1,000 soldiers in a block (centre (0.7, 0), half depth 2.6, half width 2.5, pixel soldiers) on a dirt island of radius 6.3, and points at the ground at their feet' },
    { t: [.45, 1.9], k: 'charge', zh: '描線：兩個光點由施法者腳前的劍首出發，沿巨劍輪廓的上、下兩半各跑一遍（八角劍首、劍柄、護手、直刃、劍尖），先慢後快（位置 = 進度^1.35），第二個遲 0.13 秒，在劍尖會合（1.83 秒）。輪廓由固定數字組成：劍身長 length = 8.1、寬 width = 5.4、劍尖斜段長 = min(0.85 × 半寬, 0.32 × 長)、護手每邊比劍身寬 1.05、厚 0.55', en: 'trace: two points of light start at the pommel by the caster’s feet and run the upper and lower halves of a giant sword outline (octagonal pommel, grip, guard, straight edges, point), slow then fast (position = progress^1.35), the second 0.13 s late, meeting at the tip at 1.83 s. The outline is fixed numbers: blade length = 8.1, width = 5.4, point length = min(0.85 × half width, 0.32 × length), guard 1.05 wider than the blade on each side and 0.55 thick' },
    { t: [1.9, 2.55], k: 'shape', zh: '成形：整條輪廓同時爆亮（1.9 秒），輪廓內的地面整塊升起 0.8（回彈緩動，厚 0.45 的泥土板，頂面就是原來的地面，中線多了一道血槽），站在上面的士兵跟著升起並發抖；地上留下同形狀的坑，板邊掉落泥塊', en: 'shape: the whole outline flares at 1.9 s and the ground inside lifts out 0.8 as one slab (overshoot ease; a 0.45-thick earth slab whose top is the original ground, now with a fuller groove down the middle), the soldiers on it rise with it and tremble; a pit of the same shape is left behind and clods drop from the slab’s edges' },
    { t: [2.55, 3.2], k: 'motion', zh: '揮劍：施法者握住劍首，先把劍板拉向鏡頭（以劍首為軸轉 +0.15 弧度），再加速反向橫揮到 −0.32 弧度，3.2 秒急停（命中）', en: 'swing: the caster grips the pommel and pulls the slab back towards the camera (+0.15 rad about the pommel), then swings it the other way, accelerating to −0.32 rad, and stops dead at 3.2 s (hit)' },
    { t: [3.2, 4.45], k: 'impact', zh: '命中：急停的震波由護手沿劍身跑向劍尖（每秒 20 單位）；規則：士兵的位置在劍形輪廓內（點在多邊形內）即中招，命中時間 = 3.2 + max(0, x − 護手 x) ÷ 20；中招者沿揮動的切線方向被甩飛：先越過劍身的前緣，再多飛 0.5–1.4，拋物線高 1.5–2.2，落在島外的掉出戰場；輪廓外的士兵留在地上倖存；之後劍板轉回原位，4.45 秒砸回坑裡', en: 'impact: the stop sends a shock from the guard down the blade to the tip at 20 units/s. Rule: a soldier dies if its position is inside the sword outline (point in polygon); hit time = 3.2 + max(0, x − guard x) / 20; the hit ones are flung along the swing’s tangent, clearing the blade’s leading edge plus 0.5–1.4, on arcs 1.5–2.2 high, and those that would land off the island fall off it; soldiers outside the outline stay on the ground and survive. The slab turns back and slams into its pit at 4.45 s' },
    { t: [4.45, 6.5], k: 'after', zh: '餘波：砸回時輪廓再亮一下，然後亮芯先退、剩橙色殘影、再斷成碎段與單粒像素，地上的切口線 5.6 秒前癒合；計數 5.1–5.4 秒淡出；屍體 5.2–5.7 秒淡出，新一批敵兵 5.7–6.4 秒原地淡入', en: 'aftermath: the outline flashes once more on the slam, then the core retreats, an orange afterimage remains and it breaks into segments and single pixels; the cut line in the ground heals by 5.6 s; the counter fades at 5.1–5.4 s, bodies fade at 5.2–5.7 s and a fresh army fades in on its spots at 5.7–6.4 s' },
  ],
  layers: [
    { zh: '武器就是地面：劍形由固定數字組成（八角形劍首半徑 0.4、劍柄半寬 0.27、護手厚 0.55、直刃接斜尖），同一個函數既畫輪廓又判定；升起的板頂面用與舞台地面完全相同的紋理（同一個噪聲公式、同一格網），所以升起的就是那塊地，只多了一道血槽', en: 'the weapon is the ground: the sword is built from fixed numbers (octagonal pommel radius 0.4, grip half-width 0.27, guard 0.55 thick, straight edges into a point) and one function both draws the outline and decides hits; the lifted slab’s top uses exactly the stage ground’s texture (same noise formula and grid), so what rises is that piece of ground, plus a fuller groove' },
    { zh: '路徑先行：輪廓的上半與下半是兩條固定路徑（紅、綠），由劍首跑到劍尖，第二條遲 0.13 秒；升起後輪廓跟著劍板一起轉動，地上的坑口是第三條（藍）；揮停的震波是一條橫跨劍身的藍色路徑，由護手推向劍尖；金色弧線是劍尖揮過的路線', en: 'path first: the upper and lower halves of the outline are two fixed paths (red, green) from the pommel to the tip, the second 0.13 s late; once lifted the outline turns with the slab and the pit’s rim is a third (blue); the stop’s shock is a blue path across the blade pushed from the guard to the tip; the gold arc is the tip’s swing' },
    { zh: '筆觸與色階：琥珀色鋸齒筆觸（白芯、淡金、琥珀、深褐邊），每兩格換一次折角與分叉，跑得快的一段拉長；士兵和升起的劍板寫入深度，坑口走到劍板後面的一段被擋住並降一級亮度，在板邊再出現', en: 'stroke and tiers: an amber jagged stroke (white core, pale gold, amber, dark brown edge) that changes kinks and forks every other frame and stretches where it runs fast; the soldiers and the lifted slab write depth, so the stretch of the pit’s rim behind the slab is hidden (one tier dimmer near it) and reappears at its edge' },
    { zh: '消散：光點經過後亮芯先退、留下淡金殘影作為「切口」，地上同時刻出 1 像素深色裂縫；劍板升起後殘影斷成碎段；砸回時最後一次爆亮，再分三段消散成單粒像素，裂縫隨機逐點癒合', en: 'breakup: behind each point the core retreats and a pale gold afterimage stays as the cut, with a 1 px dark crack cut into the ground; once the slab lifts the afterimage splits into segments; on the slam it flares one last time and breaks up in three stages down to single pixels while the crack heals pixel by pixel' },
    { zh: '劍板與坑：厚 0.45 的泥土板，側面分層（表土、泥、岩），朝光的一面亮一級；地上的坑沿視線取三個深度，看到坑底或坑壁；劍板在地上投下影子；升起時板邊掉泥塊，砸回時沿輪廓揚起塵土', en: 'slab and pit: a 0.45-thick earth slab with layered sides (topsoil, earth, rock), faces towards the light one step brighter; the pit is painted by sampling the view ray at three depths (floor or wall); the slab casts its shadow on the ground; clods drop off its edges as it lifts and dust kicks up along the outline when it slams back' },
    { zh: '判定與倖存：輪廓內的士兵隨劍板升起、在震波經過時被甩飛（白閃、翻滾、倒地或掉出島外），輪廓外的留在地上發抖但倖存；預設長 8.1、寬 5.4 剛好圍住方陣；橫列兩翼、圓陣與鶴翼靠鏡頭的邊在劍身以外', en: 'rule and survivors: soldiers inside the outline ride the slab and are flung when the shock passes (white flash, tumble, lie down or fall off the island); those outside stay on the ground, tremble and survive; the default 8.1 × 5.4 just encloses the block; the flanks of a line and the near edge of a ring or crescent stand outside the blade' },
    { zh: '軍隊、計數與鏡頭：1000 名像素小兵；角落擊殺計數隨震波由劍柄到劍尖跳升，全滅變金色；鏡頭固定（視野半徑 5.8），劍板揮離鏡頭，士兵向後上方飛出，露出鏡頭這邊的坑', en: 'army, counter and camera: 1,000 pixel soldiers; the corner kill counter climbs as the shock runs from hilt to tip and turns gold on a full wipe; the camera stays put (view radius 5.8), the slab swings away from it so the soldiers fly up and back and the pit opens on the near side' },
  ],

  CX: -4.3, AREA: { x: .7, y: 0, rx: 2.6, ry: 2.5 }, PX: -3.68, PR: .4, GH: .27, XG: -2.4, GT: .55, TH: .45, Z1: .8,
  TR: [.45, 1.7], LAG: .13, FLARE: 1.9, L0: 2.0, TSW: 3.2, VF: 20, SLAM: 4.45, RS: [5.7, 6.4], CL: [5.2, 5.7],

  // ----- the sword shape (cached per length + width): outline halves and the analytic inside test -----
  shape(p, len, wid) {
    const key = len.toFixed(2) + '|' + wid.toFixed(2);
    if (this._sh && this._sh.key === key) return this._sh;
    const hw = wid / 2, xg = this.XG, xt = xg + len, tp = Math.min(hw * .85, len * .32), xs = xt - tp;
    const G = hw + 1.05, GB = xg - this.GT, PX = this.PX, r = this.PR, GH = this.GH;
    const half = [[PX - r, 0], [PX - r, .3 * r], [PX - .3 * r, r], [PX + .3 * r, r], [PX + 1.3 * r - GH, GH], [GB, GH], [GB, G], [xg, G], [xg, hw], [xs, hw], [xt, 0]];
    const dense = sgn => {   // resample the half outline so strokes and guides bend cleanly
      const out = [];
      for (let k = 0; k + 1 < half.length; k++) {
        const a = half[k], b = half[k + 1], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / .35));
        for (let j = 0; j < n; j++) out.push([a[0] + (b[0] - a[0]) * j / n, sgn * (a[1] + (b[1] - a[1]) * j / n)]);
      }
      out.push([xt, 0]);
      return out;
    };
    const A = dense(1), B = dense(-1);
    const ring = A.concat(B.slice(1, -1).reverse());   // closed outline (pommel -> upper half -> tip -> lower half)
    const sh = { key, hw, xg, xt, xs, tp, G, GB, A, B, ring };
    sh.pA = p.path(A.map(q => [q[0], q[1], .02])); sh.pB = p.path(B.map(q => [q[0], q[1], .02]));
    // outward normal and light for each side face of the slab
    sh.faces = ring.map((a, k) => {
      const b = ring[(k + 1) % ring.length], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      let nx = dy / l, ny = -dx / l;
      if (this.inside(sh, (a[0] + b[0]) / 2 + nx * .02, (a[1] + b[1]) / 2 + ny * .02)) { nx = -nx; ny = -ny; }
      return { nx, ny, lit: -(nx * 1.3 + ny * -.12) / 1.31 };
    });
    this._sh = sh;
    return sh;
  },
  // the same shape as the outline above: blade (straight then pointed), guard, grip, octagonal pommel
  inside(sh, x, y) {
    const ay = y < 0 ? -y : y;
    if (x >= sh.xg) return x <= sh.xt && ay <= (x <= sh.xs ? sh.hw : sh.hw * (sh.xt - x) / sh.tp);
    if (x >= sh.GB) return ay <= sh.G;
    if (x >= this.PX && ay <= this.GH) return true;
    const dx = Math.abs(x - this.PX), r = this.PR;
    return dx <= r && ay <= r && dx + ay <= 1.3 * r;
  },
  // slab pose: lift height of the top face and swing angle about the pommel
  lift(t, p) {
    if (t < this.L0 || t >= this.SLAM) return 0;
    const P = p || PXFX.Api.prototype;
    let z = this.Z1 * P.easeOutBack((t - this.L0) / .45, 1.3);
    if (t > 4.15) z = this.Z1 * (1 - P.easeInCubic((t - 4.15) / (this.SLAM - 4.15)));
    return z + .03 * Math.sin((t - this.L0) * 7) * Math.min(1, (t - this.L0) / .5) * (t < 4.15 ? 1 : 0);
  },
  phi(t, p) {
    const P = p || PXFX.Api.prototype;
    if (t < 2.55 || t > 4.15) return 0;
    if (t < 2.95) return .15 * P.ease((t - 2.55) / .4);
    if (t < this.TSW) return .15 - .47 * P.easeInCubic((t - 2.95) / (this.TSW - 2.95));
    if (t < 3.75) return -.32 - .045 * Math.sin(Math.PI * Math.min(1, (t - this.TSW) / .18)) * (t < this.TSW + .18 ? 1 : 0);
    return -.32 * (1 - P.ease((t - 3.75) / .4));
  },
  // rest point (x, y) on the slab -> world, for a pose
  xf(x, y, ph) { const c = Math.cos(ph), s = Math.sin(ph), rx = x - this.PX; return [this.PX + rx * c - y * s, rx * s + y * c]; },
  // honest rule, cached per layout + shape: inside the outline -> hit when the stop's shock reaches its x; throw data
  rule(units, sh) {
    if (this._r && this._r.units === units && this._r.key === sh.key) return this._r;
    const RI = this.stage.r, list = [];
    for (const u of units) {
      if (!this.inside(sh, u.x, u.y)) { list.push({ hitT: null }); continue; }
      const th = this.TSW + Math.max(0, u.x - sh.xg) / this.VF + u.r1 * .015;
      const z0 = this.lift(th), f = this.phi(th), w = this.xf(u.x, u.y, f), qx = w[0] - this.PX, qy = w[1], r = Math.hypot(qx, qy) || 1;
      let dx = qy / r + .25 * qx / r, dy = -qx / r + .25 * qy / r;   // the swing turns clockwise: away from the camera
      const dl = Math.hypot(dx, dy); dx /= dl; dy /= dl;
      // far enough to clear the blade's leading edge, then a spread
      const hwx = u.x <= sh.xs ? sh.hw : sh.hw * (sh.xt - u.x) / sh.tp, D = Math.max(0, hwx + u.y) + .5 + .9 * u.r2 + .06 * r;
      const lx = w[0] + dx * D, ly = w[1] + dy * D, off = Math.hypot(lx, ly) > RI * .92;
      list.push({ hitT: th, x0: w[0], y0: w[1], z0, dx, dy, D, T: .62 + .06 * D + .12 * u.r3, H: 1.5 + .7 * u.r1 + .05 * r,
        zL: off ? -2.4 : this.inside(sh, lx, ly) ? -this.TH : 0, off, spin: (u.r2 > .5 ? 1 : -1) * (6 + 5 * u.r3) });
    }
    this._r = { units, key: sh.key, list };
    return this._r;
  },
  // ground texture of the stage, replicated (same formula and grid as the baked ground) for the slab's top face
  tex() {
    if (this._tex) return this._tex;
    const R = this.stage.r, n = 256, ext = R * 1.15, step = 2 * ext / n, H = PXFX.hash, N = PXFX.noise;
    const tone = new Float32Array(n * n), speck = new Uint8Array(n * n);
    const u0 = Math.floor((-4.2 + ext) / step), u1 = Math.ceil((5.4 + ext) / step), w0 = Math.floor((-3.8 + ext) / step), w1 = Math.ceil((3.8 + ext) / step);
    for (let w = Math.max(0, w0); w <= Math.min(n - 1, w1); w++) for (let u = Math.max(0, u0); u <= Math.min(n - 1, u1); u++) {
      const x = -ext + (u + .5) * step, y = -ext + (w + .5) * step, k = w * n + u;
      const ax = Math.abs(x) / R, ay = Math.abs(y) / R, edge = Math.pow(Math.pow(ax, 2.4) + Math.pow(ay, 2.4), 1 / 2.4) + (N(x * 1.3 + 7, y * 1.3) - .5) * .14;
      const fine = H(Math.floor(x * 9), Math.floor(y * 9));
      if (fine > .972) { speck[k] = 1; continue; }
      if (H(Math.floor(x * 9) - 1, Math.floor(y * 9) - 1) > .972) { speck[k] = 2; continue; }
      tone[k] = .5 + (N(x * .7, y * .9) - .5) * .8 + (fine - .5) * .22 - edge * .18;
    }
    this._tex = { n, ext, inv: 1 / step, tone, speck };
    return this._tex;
  },
  cols(night) {
    const key = night ? 'n' : 'd';
    this._cols = this._cols || {};
    if (this._cols[key]) return this._cols[key];
    const g = PXFX.GROUNDS[this.stage.ground], conv = h => { let c = PXFX.hex(h); if (night) c = c.map((v, i) => v * .42 * .78 + [26, 24, 44][i] * .22); return PXFX.rgb(c[0], c[1], c[2]); };
    this._cols[key] = { tones: g.tones.map(conv), speck: g.speck.map(conv), pit: this.palette.pit.map(conv), strata: this.palette.strata.map(conv) };
    return this._cols[key];
  },
  // per-pixel view rays (ground point at h = 0 and its change per unit of height), cached per camera
  rays(W, H, mode, P, Q) {
    const key = [W, H, mode].concat([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]].map(v => { const q = P(v[0], v[1], v[2]); return q ? q[0].toFixed(3) + ',' + q[1].toFixed(3) : 'x'; })).join('|');
    if (this._ray && this._ray.key === key) return this._ray;
    const a = new Float32Array(W * H * 6), ok = new Uint8Array(W * H);
    for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
      const i = iy * W + ix, q0 = Q(ix + .5, iy + .5, 0), q1 = q0 && Q(ix + .5, iy + .5, 1);
      if (!q0 || !q1) continue;
      ok[i] = 1;
      const o = i * 6;
      a[o] = q0[0]; a[o + 1] = q0[1]; a[o + 2] = q0[2]; a[o + 3] = q1[0] - q0[0]; a[o + 4] = q1[1] - q0[1]; a[o + 5] = q1[2] - q0[2];
    }
    this._ray = { key, a, ok, ins: null, edges: null, shKey: null };
    return this._ray;
  },
  // pixels of the rest outline (inside flags) and its 1 px cut line with the trace position of each edge pixel
  mask(rc, sh, W, H) {
    if (rc.shKey === sh.key) return;
    const ins = new Uint8Array(W * H), a = rc.a;
    for (let i = 0; i < W * H; i++) if (rc.ok[i] && this.inside(sh, a[i * 6], a[i * 6 + 1])) ins[i] = 1;
    const edges = [];
    const near = (x, y) => {   // trace position (0..1 along its half) of the nearest outline point
      const half = y >= 0 ? sh.A : sh.B, path = y >= 0 ? sh.pA : sh.pB;
      let best = 1e9, bs = 0, acc = 0;
      for (let k = 0; k + 1 < half.length; k++) {
        const A = half[k], B = half[k + 1], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1e-6;
        const f = Math.max(0, Math.min(1, ((x - A[0]) * dx + (y - A[1]) * dy) / (L * L))), d = Math.hypot(x - A[0] - dx * f, y - A[1] - dy * f);
        if (d < best) { best = d; bs = (acc + f * L) / path.len; }
        acc += L;
      }
      return bs;
    };
    for (let iy = 0; iy < H - 1; iy++) for (let ix = 0; ix < W - 1; ix++) {
      const i = iy * W + ix;
      if (!rc.ok[i]) continue;
      if (ins[i] !== ins[i + 1] || ins[i] !== ins[i + W]) edges.push(i, near(a[i * 6], a[i * 6 + 1]) * 1e4 | 0, a[i * 6 + 1] >= 0 ? 0 : 1);
    }
    rc.ins = ins; rc.edges = edges; rc.shKey = sh.key;
  },
  // trace head (0..1 along a half outline) of path c at time t: slow then fast
  head(t, c) {
    const u = (t - this.TR[0] - c * this.LAG) / (this.TR[1] - this.TR[0]);
    return u <= 0 ? -1 : u >= 1 ? 1 : Math.pow(u, 1.35);
  },

  draw(p, t) {
    const self = this, PL = this.palette, TH = this.TH, ramp = PL.cut, seed = p.hold(t);
    const sh = this.shape(p, p.param('length'), p.param('width'));
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const units = p.crowdLayout({ n: Math.round(p.param('crowd')), seed: 31, formation: form, area: this.AREA, faceTo: [this.CX, 0] });
    const R = this.rule(units, sh), TX = this.tex(), cols = this.cols(p.night);
    const lift = this.lift(t, p), ph = this.phi(t, p), out = t >= this.L0 && t < this.SLAM, cs = Math.cos(ph), sn = Math.sin(ph);
    const heads = [this.head(t, 0), this.head(t, 1)];
    // ---- 1. ground pass: the pit, the slab's top face (the same ground texture), its shadow, the cut line ----
    p.post(({ pix, W, H, kind, zb, bayer, P, Q, mode }) => {
      const rc = self.rays(W, H, mode, P, Q), a = rc.a, flat = mode === '2d';
      self.mask(rc, sh, W, H);
      const ins = rc.ins, SX = PXFX.SHADOW_X, SY = PXFX.SHADOW_Y, hs = lift - TH * .5;
      if (out) {
        // only the screen box around the slab, its pit and its shadow
        let bx0 = W, bx1 = 0, by0 = H, by1 = 0;
        const grow = q => { if (!q) return; bx0 = Math.min(bx0, q[0]); bx1 = Math.max(bx1, q[0]); by0 = Math.min(by0, q[1]); by1 = Math.max(by1, q[1]); };
        for (const q of sh.ring) {
          const w = self.xf(q[0], q[1], ph);
          grow(P(w[0], w[1], lift)); grow(P(w[0], w[1], lift - TH)); grow(P(w[0] + SX * hs, w[1] + SY * hs, 0));
          grow(P(q[0], q[1], 0)); grow(P(q[0], q[1], -TH));
        }
        const X0 = Math.max(0, Math.floor(bx0) - 1), X1 = Math.min(W - 1, Math.ceil(bx1) + 1), Y0 = Math.max(0, Math.floor(by0) - 1), Y1 = Math.min(H - 1, Math.ceil(by1) + 1);
        for (let iy = Y0; iy <= Y1; iy++) for (let ix = X0; ix <= X1; ix++) {
          const i = iy * W + ix;
          if (!rc.ok[i]) continue;
          const o = i * 6;
          // the slab's top face: the view ray at the lift height, turned back into rest coordinates
          const X = a[o] + a[o + 3] * lift, Y = a[o + 1] + a[o + 4] * lift, D = a[o + 2] + a[o + 5] * lift;
          const rx = X - self.PX, lx = self.PX + rx * cs + Y * sn, ly = -rx * sn + Y * cs;
          if (D > zb[i] && self.inside(sh, lx, ly)) {
            const u = Math.floor((lx + TX.ext) * TX.inv), w = Math.floor((ly + TX.ext) * TX.inv), k = w * TX.n + u, sp = TX.speck[k];
            const ay = ly < 0 ? -ly : ly;
            // a fuller groove down the middle of the blade: the moment the ground reads as a sword
            if (ay < .17 && lx > sh.xg + .45 && lx < sh.xs - .35) pix[i] = cols.strata[ay < .09 ? 2 : 3];
            else pix[i] = sp ? cols.speck[sp - 1] : cols.tones[Math.max(0, Math.min(3, Math.floor(TX.tone[k] * 4 + (flat ? 0 : (bayer(ix, iy) - .5) * .6))))];
            zb[i] = D; kind[i] = 1;
            continue;
          }
          if (kind[i] !== 1) continue;
          let h = 0;
          // the pit: walls and floor found by walking down the view ray
          if (ins[i]) {
            let s = 1;
            for (; s <= 3; s++) { const hh = -TH * s / 3; if (!self.inside(sh, a[o] + a[o + 3] * hh, a[o + 1] + a[o + 4] * hh)) break; }
            h = -TH * Math.min(s, 3) / 3;
            pix[i] = s > 3 ? cols.pit[(flat ? 0 : bayer(ix, iy) > .8 ? 1 : 0)] : cols.strata[Math.max(0, 4 - s - (PXFX.hash(ix >> 1, iy) > .7 ? 1 : 0))];
            zb[i] = a[o + 2] + a[o + 5] * h;
          }
          // the slab's shadow, cast along the light from its middle height
          const gx = a[o] + a[o + 3] * h - SX * (hs - h), gy = a[o + 1] + a[o + 4] * h - SY * (hs - h), rx2 = gx - self.PX;
          if (self.inside(sh, self.PX + rx2 * cs + gy * sn, -rx2 * sn + gy * cs)) {
            const c = pix[i];
            pix[i] = PXFX.rgb((c & 255) * .6, (c >> 8 & 255) * .58, (c >> 16 & 255) * .76);
          }
        }
      }
      // the cut: a 1 px dark line wherever a trace point has passed, healed before the loop ends
      if (!out && t > self.TR[0] && t < 5.6) {
        const E = rc.edges, ink = cols.pit[2], heal = p.ph(t, 4.9, 5.6);
        for (let k = 0; k < E.length; k += 3) {
          const i = E[k];
          if (kind[i] !== 1 || E[k + 1] / 1e4 > heads[E[k + 2]]) continue;
          if (heal > 0 && PXFX.hash(i, 3) < heal) continue;
          pix[i] = ink;
        }
      }
    });
    // ---- 2. the slab's sides: layered earth, lit faces one step brighter ----
    if (out && lift > .01) {
      const ring = sh.ring, n = ring.length;
      for (let k = 0; k < n; k++) {
        const A = ring[k], B = ring[(k + 1) % n], F = sh.faces[k];
        const a0 = this.xf(A[0], A[1], ph), b0 = this.xf(B[0], B[1], ph), lt = F.lit > .35 ? 1 : F.lit < -.35 ? -1 : 0;
        p.sribbon([[a0[0], a0[1], lift], [b0[0], b0[1], lift]], [[a0[0], a0[1], lift - TH], [b0[0], b0[1], lift - TH]],
          (u, v) => (Math.max(0, Math.min(5, (v < .14 ? 4 : v < .55 ? 3 : v < .8 ? 2 : 1) + lt)) + .5) / 6, PL.strata);
      }
    }
    // ---- 3. caster: points, grips the pommel, pulls back and swings with the slab ----
    let pose;
    if (t < .45) pose = { a: 'idle', b: 'point', k: p.easeOutCubic(p.ph(t, .2, .45)) };
    else if (t < this.L0) pose = 'point';
    else if (t < 2.55) pose = { a: 'point', b: 'palm', k: p.easeOutCubic(p.ph(t, this.L0, 2.25)) };
    else if (t < 2.95) pose = { a: 'palm', b: 'windup', k: p.ease(p.ph(t, 2.55, 2.95)) };
    else if (t < 3.75) pose = { a: 'windup', b: 'swing', k: p.easeInCubic(p.ph(t, 2.95, this.TSW)) };
    else if (t < this.SLAM) pose = { a: 'swing', b: 'palm', k: p.ease(p.ph(t, 3.75, 4.15)) };
    else pose = { a: 'palm', b: 'idle', k: p.ease(p.ph(t, this.SLAM + .2, 5.3)) };
    p.figure(this.CX, 0, { scale: .85, pose, face: ph * .8 });
    // ---- 4. the army: riders on the slab, flung on the stop; outsiders stay ----
    const S0 = 240 / (2 * this.view.r * 1.12) * p.v.fs, sc = p.clamp((units.spacing || .3) / .4, .08, 1.5);
    const drawer = .62 * sc * S0 < 7.5 ? p.pawnSprite : p.pawn, po = { scale: sc };
    const fear = p.env(t, 1.95, 2.3, 4.3, 4.9);
    for (const u of units) {
      const r = R.list[u.i], th = r.hitT;
      const s = { i: u.i, vr: u.vr, x: u.x, y: u.y, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: u.face, alpha: 1, walk: null, spear: true };
      if (th != null && t >= th) {
        if (t >= this.RS[0]) {   // a fresh soldier fades in on the spot
          const len = (this.RS[1] - this.RS[0]) * .55, st0 = this.RS[0] + u.r1 * (this.RS[1] - this.RS[0] - len);
          s.alpha = p.ph(t, st0, st0 + len);
          if (s.alpha <= 0) continue;
        } else {
          const a = t - th, k = a / r.T;
          const kh = k < 1 ? 1 - Math.pow(1 - k, 1.5) : r.off ? Math.min(3, k) : 1;   // fast off the blade, then slowing
          s.x = r.x0 + r.dx * r.D * kh; s.y = r.y0 + r.dy * r.D * kh;
          s.tdir = [r.dx, r.dy]; s.spear = false; s.flash = a < .05; s.noShadow = k < 1;
          if (k < 1 || r.off) {
            s.z = r.z0 + (r.zL - r.z0) * k + 4 * r.H * k * (1 - k); s.tilt = a * r.spin;
            if (s.z < -2.2) continue;
          } else {
            s.z = r.zL; s.tilt = Math.PI / 2;
            const sl = p.easeOutCubic((a - r.T) / .3) * .12; s.x += r.dx * sl; s.y += r.dy * sl;
          }
          if (t > this.CL[0]) { const len = (this.CL[1] - this.CL[0]) * .5, st0 = this.CL[0] + u.r2 * (this.CL[1] - this.CL[0] - len); s.alpha = 1 - p.ph(t, st0, st0 + len); if (s.alpha <= 0) continue; }
        }
      } else {
        if (th != null && out) {   // riding the slab
          const w = this.xf(u.x, u.y, ph);
          s.x = w[0]; s.y = w[1]; s.z = lift + .01; s.noShadow = lift > .02; s.face = u.face + ph;
        }
        const fr = fear * (.5 + .5 * u.r2) * (th == null ? .7 : 1);
        s.tilt = .22 * fr; s.jit = .014 * fr; s.tdir = [-Math.cos(u.face), -Math.sin(u.face)];
      }
      drawer.call(p, s, po);
    }
    // ---- 5. clods off the slab's edge as it tears loose, dust on the slam ----
    const ring = sh.ring, nR = ring.length, nC = Math.round(26 * p.density);
    if (t > this.L0 && t < 3.0) {
      for (let k = 0; k < nC; k++) {
        const q = ring[Math.floor(p.r(k, 41) * nR)], a = t - this.L0 - p.r(k, 42) * .35;
        if (a <= 0 || a > .7) continue;
        const w = this.xf(q[0], q[1], ph), z = Math.max(-TH, this.lift(this.L0 + p.r(k, 42) * .35, p) - TH - 5 * a * a);
        p.ball(w[0], w[1], z, .05 + .05 * p.r(k, 43), PL.strata, { shadow: false, seed: k });
      }
    }
    if (t > this.SLAM - .02 && t < this.SLAM + .9) {
      const a = (t - this.SLAM) / .9;
      for (let k = 0; k < nC; k++) {
        const q = ring[Math.floor(p.r(k, 44) * nR)], F = sh.faces[Math.floor(p.r(k, 44) * nR)], d = p.drag(1.6, 4, t - this.SLAM) * (.4 + .6 * p.r(k, 45));
        p.ball(q[0] + F.nx * d, q[1] + F.ny * d, .05 + .35 * a * p.r(k, 46), .1 + .14 * a, PL.dust, { alpha: .85 * (1 - a), rough: .5, shadow: false, seed: k });
      }
    }
    // ---- 6. the light: trace heads with their breakup, the flare, the stop's shock, the slam ----
    // where a ground point is hidden by the lifted slab: one tier dimmer (reads in flat 2D too)
    const cf = p.cam().fwd, kz = p.mode === '2d' ? null : [cf[0] / cf[2], cf[1] / cf[2]];
    const back = !out ? null : pt => {
      const hh = lift - TH * .3, gx = pt[0] + (kz ? kz[0] * hh : 0), gy = pt[1] + (kz ? kz[1] * hh : hh / .55), rx = gx - this.PX;
      return this.inside(sh, this.PX + rx * cs + gy * sn, -rx * sn + gy * cs);
    };
    const paths = [sh.pA, sh.pB], marks = [[], []];
    if (t > this.TR[0] && t < this.FLARE + .05) {
      for (let c = 0; c < 2; c++) {
        const hd = heads[c];
        if (hd < 0) continue;
        const u = (t - this.TR[0] - c * this.LAG) / (this.TR[1] - this.TR[0]), vel = 1.35 * Math.pow(Math.max(u, .02), .35);
        const L = .035 + .06 * vel, sd = seed * 3 + c * 101;
        if (hd < 1) {
          p.zap(paths[c], Math.max(0, hd - L), hd, ramp, { seed: sd, jag: 1.6, tail: .45, forks: 1, thick: 1 });
          for (let ch = 0; ch < 3; ch++) {
            const a0 = hd - L - (ch + 1) * .05, a1 = hd - L - ch * .05;
            if (a1 > 0) p.zap(paths[c], Math.max(0, a0), Math.min(1, a1), ramp, { seed: sd + ch + 1, jag: 1.4, fade: .3 + ch * .22, forks: 0 });
          }
          marks[c].push(paths[c].at(hd));
          const hp = paths[c].at(hd); p.light(hp[0], hp[1], 0, .7, ramp, .7);
        }
        // the cut behind it: a pale gold afterimage (core gone)
        const end = hd < 1 ? hd - L - .15 : 1;
        if (end > 0) p.zap(paths[c], 0, end, ramp, { seed: seed * 7 + c, jag: .8, step: 6, thick: 0, fade: .4, gaps: .02, forks: 0 });
      }
      if (heads[0] >= 1 && t < this.TR[1] + .2) { const tp = sh.pA.at(1); p.sparkle(tp[0], tp[1], .1, 3, ramp, .9); }
    }
    // the flare as the cut closes, then the ground rim decays while the slab is out (hidden behind it)
    if (t >= this.FLARE && t < 3.3) {
      const k = p.ph(t, this.FLARE, this.FLARE + .5), fade = t < this.FLARE + .1 ? 0 : .3 + .25 * k + .35 * p.ph(t, 2.6, 3.2);
      for (let c = 0; c < 2; c++) p.zap(paths[c], 0, 1, ramp, { seed: seed * 11 + c, jag: 1.8, thick: fade < .1 ? 2 : 1, fade, back, forks: 2 });
      if (t < this.FLARE + .25) { const ii = 1 - p.ph(t, this.FLARE, this.FLARE + .25); for (let j = 0; j < 4; j++) { const q = sh.pA.at(j / 4 + .1), q2 = sh.pB.at(j / 4 + .1); p.light(q[0], q[1], 0, 1.4, ramp, ii); p.light(q2[0], q2[1], 0, 1.4, ramp, ii); } }
    }
    // the stop: a shock runs across the blade from the guard to the tip, lighting both edges behind it
    let front = null;
    if (t >= this.TSW - .01 && t < this.TSW + .75) {
      const xf = sh.xg + (t - this.TSW) * this.VF, done = p.ph(t, this.TSW + (sh.xt - sh.xg) / this.VF, this.TSW + (sh.xt - sh.xg) / this.VF + .35);
      const hwx = x => (x <= sh.xs ? sh.hw : Math.max(0, sh.hw * (sh.xt - x) / sh.tp));
      if (xf < sh.xt) {
        const h = hwx(xf);
        front = p.path(q => { const w = this.xf(xf, -h + 2 * h * q, ph); return [w[0], w[1], lift + .02]; }, 10);
        p.zap(front, 0, 1, ramp, { seed: seed * 13, jag: 2.2, thick: 2, forks: 2, step: 5 });
        const m = this.xf(xf, 0, ph); p.light(m[0], m[1], lift, 2.2, ramp, .9);
      }
      for (let c = 0; c < 2; c++) {
        const sg = c ? -1 : 1, x1 = Math.min(xf, sh.xt);
        if (x1 <= sh.xg + .05) continue;
        const edge = p.path(q => { const x = sh.xg + (x1 - sh.xg) * q, w = this.xf(x, sg * hwx(x), ph); return [w[0], w[1], lift + .02]; }, 16);
        p.zap(edge, 0, 1, ramp, { seed: seed * 17 + c, jag: 1.5, tail: .35, fade: .2 + .8 * done, forks: 1 });
      }
      if (t < this.TSW + .3) for (let j = 0; j < 3; j++) { const tip = this.xf(sh.xt, 0, this.phi(t - j * .03, p)); p.sparkle(tip[0], tip[1], lift + .1, 3 - j, ramp, .9 - j * .25); }
    }
    // the slam: the outline flashes once more and breaks up in three stages; the cut heals
    if (t >= this.SLAM - .01 && t < 5.5) {
      const fade = p.ph(t, this.SLAM + .08, 5.45);
      for (let c = 0; c < 2; c++) p.zap(paths[c], 0, 1, ramp, { seed: seed * 19 + c, jag: 1.8, thick: fade < .05 ? 2 : 1, fade, forks: 1 });
      if (t < this.SLAM + .3) for (let j = 0; j < 4; j++) { const q = sh.pA.at(j / 4 + .1), q2 = sh.pB.at(j / 4 + .1), ii = 1 - p.ph(t, this.SLAM, this.SLAM + .3); p.light(q[0], q[1], 0, 1.4, ramp, ii); p.light(q2[0], q2[1], 0, 1.4, ramp, ii); }
    }
    // ---- guides: the two outline halves (they turn with the slab), the stop's shock, the tip's swing ----
    if (p.guiding) {
      const zz = out ? lift : .02, moved = c => sh[c ? 'B' : 'A'].map(q => { const w = this.xf(q[0], q[1], ph); return [w[0], w[1], zz]; });
      p.guide(moved(0), 'red', { marks: marks[0] });
      p.guide(moved(1), 'green', { marks: marks[1] });
      if (out) p.guide(sh.A.map(q => [q[0], q[1], .02]).concat(sh.B.slice().reverse().map(q => [q[0], q[1], .02])), 'blue');
      if (front) p.guide(front, 'blue', { marks: [front.at(.5)] });
      if (t > 2.5 && t < 4.2) {
        const arc = [];
        for (let k = 0; k <= 16; k++) { const w = this.xf(sh.xt, 0, .15 - .47 * k / 16); arc.push([w[0], w[1], this.Z1]); }
        const tip = this.xf(sh.xt, 0, ph);
        p.guide(arc, 'gold', { marks: [[tip[0], tip[1], lift]] });
      }
    }
    if (p.param('tally')) p.tally(R.list, { t, alpha: p.ph(t, .1, .4) * (1 - p.ph(t, 5.1, 5.4)) });
  },
});
