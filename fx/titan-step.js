// 巨神之足 / Titan Step — Mass Spells pack (original design): the sky splits and a stone giant's foot stamps down on the whole horde
PXFX.define({
  id: 'titan-step',
  loop: 5,
  beats: [{ t: .4, kind: 'cast', power: .8 }, { t: 1.15, kind: 'pulse', power: .4 }, { t: 2.5, kind: 'hit', power: 1.5 }],
  view: { r: 4.8, h: 3.8 },
  stage: { ground: 'moss' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'shockwave', 'impact', 'debris', 'aftermath'],
  palette: {
    stone: ['#3a322c', '#5a4e42', '#80725e', '#a8977a', '#d8c8a0', '#ece2c8'],
    rift: ['#7a5a3a', '#b08a58', '#d8c8a0', '#f2e8cc', '#fffcf2'],
    dust: ['#6a604e', '#8a7e66', '#a89c80', '#c6bca0'],
    rock: ['#2e2824', '#463c34', '#5e5246', '#786a58'],
  },
  timeline: [
    { k: 'pose', t: [0, .4], zh: '起手：施法者由站姿高舉雙手（0.35 秒，回彈緩動），手心聚集米白光點；敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster raises both arms (0.35 s, overshoot ease) as cream-white motes gather in the palms; a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.4, 1.2], zh: '集氣：施法者雙手向兩邊拉開；天空以抖色圓形擦除轉為暗灰風暴色，畫面頂部一條鋸齒裂縫在 0.3 秒內由中間向兩邊裂開，再在 0.65 秒內張開（中間最寬約 0.6，兩端收尖），裂縫內為米白強光，邊緣有 6 條細分叉裂紋', en: 'charge: the caster pulls both arms apart; a dithered radial wipe turns the sky storm grey, a jagged crack across the top of the frame splits outwards from the middle in 0.3 s, then opens over 0.65 s (about 0.6 wide in the middle, pointed at both ends), cream-white light inside and 6 thin branching cracks along its edges' },
    { k: 'shape', t: [1.2, 2.3], zh: '成形：一隻石巨人腳（腳掌約 3.4 × 2.2，五根腳趾，石柱般的小腿一直伸出畫面頂部）由裂縫中緩緩降下（離地高度 8.5 → 2.2，緩入緩出 1.1 秒），石面平面著色＋邊緣受光，小腿有發光石縫；地上腳掌形陰影由小而淡變大而深（0.55 → 1.15 倍腳掌），罩住整群敵人，敵群後縮發抖', en: 'shape: a stone giant’s foot (sole about 3.4 × 2.2, five toes, a stone-column leg running out of the top of the frame) lowers slowly out of the rift (height 8.5 → 2.2 over 1.1 s, ease in-out), flat-shaded stone with lit edges and glowing seams on the leg; its sole-shaped shadow grows from small and faint to large and dark (0.55 → 1.15× the sole) over the whole horde, and the soldiers lean back and tremble' },
    { k: 'motion', t: [2.22, 2.5], zh: '推進：腳先上提 0.25（0.1 秒蓄勢），施法者雙手向下一壓，巨足在 0.18 秒內以三次方緩入加速踩落地面', en: 'motion: the foot first lifts 0.25 (a 0.1 s wind-up), the caster slams both hands down and the foot stamps to the ground in 0.18 s with a cubic ease-in' },
    { k: 'impact', t: [2.5, 3.0], zh: '命中：1 格黑白衝擊格＋頓幀；腳底四周噴出米白光、半徑 5 的地面衝擊環、26 團塵土牆向外推、16 塊碎石、放射速度線、腳印四周裂紋；腳掌下的敵兵被壓扁，其餘按與腳掌邊緣的距離逐個中招（2.52 + 距離 ÷ 7.5 秒），力度隨距離遞減：0.9 內拋上半空翻滾，更遠的被擊飛', en: 'impact: one two-tone impact frame and a hit-stop; cream light bursts out around the sole, a radius 5 ground shock ring, a wall of 26 dust clouds pushing outwards, 16 rocks, radial speed lines and cracks around the footprint; soldiers under the sole are flattened, the rest are hit in order of distance from the sole edge (2.52 + distance / 7.5 s) with power falling off by distance: launched tumbling within 0.9, knocked away beyond' },
    { k: 'after', t: [3.0, 5], zh: '餘波：巨足停留 0.5 秒後在 3.0–3.75 秒升回裂縫外，留下深色腳印坑與被壓扁的敵兵；裂縫在 3.5–4.0 秒合上，天色在 3.45–3.95 秒收回裂縫復原，裂紋與腳印淡出；新一批敵兵在 3.95–4.95 秒由右邊走回原位', en: 'aftermath: the foot stays for 0.5 s, then lifts back out through the rift over 3.0–3.75 s, leaving a dark footprint crater and flattened soldiers; the rift closes over 3.5–4.0 s and the dark sky shrinks back into it over 3.45–3.95 s, the cracks and footprint fade; a fresh horde walks back in from the right over 3.95–4.95 s' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6），在以 x = 1.2 為中心、半徑 2.5 × 2.1 的橢圓內分佈；腳掌橢圓（半軸 1.7 × 1.15）內的被壓扁，其餘被衝擊環拋飛', en: 'horde: 30–60 small soldiers (~0.6 tall) in a 2.5 × 2.1 ellipse centred at x = 1.2; those inside the sole ellipse (semi-axes 1.7 × 1.15) are flattened, the rest are thrown by the shock ring' },
    { zh: '巨足：低多邊形實心石塊，平面著色（6 級米黃石色），腳掌為 13 邊三層稜柱（底部倒角、腳背由腳跟 0.9 高斜到腳尖 0.45 高），前端 5 根六邊形腳趾（大腳趾最大），小腿為 8 邊石柱（腳踝半徑 0.64，小腿加粗到 0.92），由 1.3 高的石段疊成，接縫內凹，正面兩條米白發光石縫', en: 'giant foot: low-poly solid stone, flat-shaded (6-step tan stone ramp): the sole is a 13-sided three-ring prism (bevelled bottom, instep sloping from 0.9 high at the heel to 0.45 at the toes), five hexagonal toes at the front (the big toe largest), the leg an 8-sided column (radius 0.64 at the ankle widening to 0.92 at the calf) stacked from 1.3 tall stone drums with recessed seams and two glowing cream seams on the front' },
    { zh: '天空裂縫：與畫面平行的鋸齒折線橫跨畫面頂部；以兩條邊線之間的發光帶畫出，中心白、邊緣米黃，外面再一層 2.4 倍寬的淡光；6 條分叉細裂紋；開合時寬度用回彈緩動', en: 'sky rift: a jagged polyline parallel to the screen across the top of the frame, drawn as a light band between two edge lines (white core, tan edges) with a faint 2.4× wider glow and 6 thin branching cracks; its width opens and closes with an overshoot ease' },
    { zh: '天色：以裂縫為中心的抖色圓形擦除，背景換成暗灰風暴天空，地面換成暗苔色，令裂縫與石足清楚', en: 'sky: a dithered radial wipe centred on the rift swaps the background for a dark grey storm sky and the ground for dark moss, so the rift and the stone foot read clearly' },
    { zh: '陰影：腳掌形橢圓陰影，隨巨足下降由 0.55 倍擴大到 1.15 倍腳掌並由淡轉深，落地前最深', en: 'shadow: a sole-shaped elliptical shadow that grows from 0.55× to 1.15× the sole and darkens as the foot comes down, darkest just before landing' },
    { zh: '命中：腳底一圈米白光噴出、地面衝擊環、塵土牆（26 團抖色塵球向外推並升高）、16 塊碎石拋物線飛出、放射速度線、腳印四周 9 條裂紋', en: 'impact: a ring of cream light bursting from under the sole, a ground shock ring, a dust wall (26 dithered dust balls pushed outwards and rising), 16 rocks on parabolic arcs, radial speed lines and 9 cracks around the footprint' },
    { zh: '腳印：腳掌與五趾形狀的深色凹痕，連同被壓扁的敵兵在腳升起後露出，於 3.9–4.6 秒淡出', en: 'footprint: a dark dent in the shape of the sole and five toes, revealed with the flattened soldiers when the foot lifts, fading over 3.9–4.6 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    footSize: { zh: '巨足大小', en: 'foot size', min: .7, max: 1.4, step: .05, value: 1.1 },
    force: { zh: '踩踏力度', en: 'stomp force', min: .5, max: 1.6, step: .05, value: 1 },
    dust: { zh: '塵土量', en: 'dust amount', min: 0, max: 2, step: .1, value: 1 },
  },
  CX: 1.2, CY: 0,
  sky: { top: '#0c0a12', bottom: '#2a2430', nebula: '#3a3038', stars: .003, star: '#d8c8a0' },
  dimGround: ['#262c22', '#30382a', '#3a4432', '#46503a'],
  // static foot geometry in local units (toes along +x, sole at z = 0); world = centre + local * size
  geo() {
    if (this._geo) return this._geo;
    const OUT = [[-1.5, 0], [-1.42, .5], [-1.1, .8], [-.5, .86], [.2, .9], [.75, 1.0], [1.05, .78], [1.05, -.78], [.75, -1.0], [.2, -.9], [-.5, -.86], [-1.1, -.8], [-1.42, -.5]];
    const cx = -.25, hTop = x => (x < -.4 ? 1.25 - .35 * ((-.4 - x) / 1.1) ** 2 : 1.25 - .8 * ((x + .4) / 1.45));
    const ring = (pts, k, z) => pts.map(([x, y]) => [cx + (x - cx) * k, y * k, typeof z === 'function' ? z(x) : z]);
    const main = { rings: [ring(OUT, .92, 0), ring(OUT, 1, .22), ring(OUT, .84, hTop)], cap: [-.35, 0, 1.3] };
    const toes = [];
    const TY = [-.66, -.3, .04, .36, .64], TL = [.56, .5, .46, .4, .34], TW = [.4, .33, .3, .27, .24], TH = [.52, .44, .4, .36, .3], TB = [0, .03, .08, .14, .22];
    for (let k = 0; k < 5; k++) {
      const tx = .95 + TL[k] / 2 - TB[k], ty = TY[k], hex = [];
      for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2; hex.push([Math.cos(a) * TL[k] / 2, Math.sin(a) * TW[k] / 2]); }
      const tr = (s, z) => hex.map(([x, y]) => [tx + x * s, ty + y * s, z]);
      toes.push({ rings: [tr(.88, 0), tr(1, TH[k] * .45), tr(.6, TH[k])], cap: [tx + TL[k] * .08, ty, TH[k] * 1.04], tx, ty, a: TL[k] / 2, b: TW[k] / 2 });
    }
    this._geo = { main, toes, OUT, cx };
    return this._geo;
  },
  // stacked rings -> side quads + a top fan
  prism(p, rings, cap, W, ramp, o) {
    for (let r = 0; r < rings.length - 1; r++) {
      const A = rings[r], B = rings[r + 1], m = A.length;
      for (let k = 0; k < m; k++) { const k2 = (k + 1) % m; p.quad(W(A[k]), W(A[k2]), W(B[k2]), W(B[k]), ramp, o); }
    }
    if (cap) { const T = rings[rings.length - 1], C = W(cap); for (let k = 0; k < T.length; k++) p.tri(C, W(T[k]), W(T[(k + 1) % T.length]), ramp, o); }
  },
  // is a local point inside the footprint (sole outline or a toe)? used for the crater stain
  inPrint(x, y) {
    const g = this.geo();
    for (const tt of g.toes) if (((x - tt.tx) / tt.a) ** 2 + ((y - tt.ty) / tt.b) ** 2 < 1) return 1;
    const O = g.OUT;
    let inside = false;
    for (let i = 0, j = O.length - 1; i < O.length; j = i++) {
      if ((O[i][1] > y) !== (O[j][1] > y) && x < (O[j][0] - O[i][0]) * (y - O[i][1]) / (O[j][1] - O[i][1]) + O[i][0]) inside = !inside;
    }
    return inside ? 1 : 0;
  },
  draw(p, t) {
    const PL = this.palette, ST = PL.stone, RF = PL.rift, CAST = .4, HIT = 2.5, CX = this.CX, CY = this.CY;
    const n = Math.round(p.param('crowd')), fs = p.param('footSize'), force = p.param('force'), dustK = p.param('dust');
    const A = 1.55 * fs, Bq = 1.05 * fs, c = p.cam();
    // ---- caster: both arms up, tear the sky apart, slam down for the stamp ----
    let pose;
    if (t < CAST) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .05, .4), 1.3) };
    else if (t < 1.0) pose = { a: 'bothUp', b: 'spread', k: p.ease(p.ph(t, CAST, 1.0)) };
    else if (t < 2.3) pose = 'spread';
    else if (t < 2.45) pose = { a: 'spread', b: 'charge', k: p.easeInCubic(p.ph(t, 2.3, 2.45)) };
    else if (t < 3.2) pose = 'charge';
    else pose = { a: 'charge', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.2, 4.0)) };
    const fig = p.figure(-3.5, .2, { pose });
    // ---- foot height (sole above the ground) ----
    let zf;
    if (t < 1.15) zf = 9.5;
    else if (t < 2.22) zf = 8.5 - 6.3 * p.ease(p.ph(t, 1.15, 2.22));
    else if (t < 2.32) zf = 2.2 + .25 * p.easeOut(p.ph(t, 2.22, 2.32));
    else if (t < HIT) zf = 2.45 * (1 - p.easeInCubic(p.ph(t, 2.32, HIT)));
    else if (t < 3.0) zf = 0;
    else zf = 10 * p.easeIn(p.ph(t, 3.0, 3.75));
    const footOn = zf < 9.4;
    // ---- the horde ----
    const area = { x: CX, y: CY, rx: 2.5, ry: 2.1 };
    const edge = u => {
      const dx = u.x - CX, dy = u.y - CY, rr = Math.hypot(dx / A, dy / Bq);
      return { inside: rr < 1, d: Math.max(0, Math.hypot(dx, dy) * (1 - 1 / Math.max(rr, 1e-3))) };
    };
    p.crowd({
      n, seed: 5, area, t, at: [CX, CY, 0],
      hit: u => { const e = edge(u); return e.inside ? HIT : HIT + .02 + e.d / 7.5 + u.r1 * .03; },
      reactOf: u => { const e = edge(u); return e.inside ? 'crush' : e.d < .9 ? 'launch' : 'knock'; },
      power: u => p.clamp((1.55 - .55 * edge(u).d) * force, .3, 1.6),
      ramp: RF,
      fear: u => p.ph(t, 1.3, 2.3) * (.5 + .5 * u.r3),
      respawn: [3.95, 4.95], clear: [3.55, 4.25], from: [1, .1],
    });
    // ---- the giant foot (solid stone) ----
    const g = this.geo(), W = q => [CX + q[0] * fs, CY + q[1] * fs, zf + q[2] * fs];
    if (footOn) {
      this.prism(p, g.main.rings, g.main.cap, W, ST);
      for (const toe of g.toes) this.prism(p, toe.rings, toe.cap, W, ST);
      // leg: 8-sided stone drums from the ankle up out of the frame (world height capped at 14)
      const lx = -.62, segH = 1.3, top = (14 - zf) / fs;
      for (let i = 0, z0 = 1.0; z0 < top; i++, z0 += segH) {
        const rr = .64 + .05 * (i % 2) + .07 * Math.min(i, 4), rot = .2 * (i % 2), z1 = Math.min(top, z0 + segH);
        const oct = (r, z) => { const out = []; for (let k = 0; k < 8; k++) { const a = rot + k / 8 * Math.PI * 2; out.push([lx + Math.cos(a) * r, Math.sin(a) * r, z]); } return out; };
        this.prism(p, [oct(rr * .9, z0), oct(rr, z0 + .14), oct(rr, z1)], null, W, ST, { lit: (p.r(i, 3) - .5) * .12 });
      }
    }
    // ---- storm sky ----
    const a0 = t - HIT;
    const skyK = .92 * (t < HIT ? p.easeOutCubic(p.ph(t, .25, 1.0)) : 1 - p.ph(t, 3.45, 3.95));
    // rift centre: a point above the foot that projects near the top of the frame
    const P0 = p.project(CX, CY, 0), P1 = p.project(CX, CY, 10);
    const zR = P0 && P1 ? p.clamp(10 * (P0[1] - p.H * .16) / (P0[1] - P1[1]), 3, 12) : 6.2, Q = [CX - .62 * fs, CY, zR];
    if (skyK > .01) p.domain({ amt: skyK, c: Q, sky: this.sky, ground: skyK > .45 ? this.dimGround : null, solids: .08, t });
    // ---- ground: shadow, footprint crater, cracks (after the domain so they stay dark on the dimmed ground) ----
    if (footOn && zf > .02) {
      const k = p.clamp(1 - zf / 8.5, 0, 1), sA = A * (.55 + .6 * k), sB = Bq * (.55 + .6 * k);
      p.stain(CX + .1, CY, sA * 1.05, (dx, dy) => { const q = (dx / sA) ** 2 + (dy / sB) ** 2; return q < 1 ? (.3 + .85 * k) * (1 - q * q * q) : 0; }, '#120e0c', 1);
    }
    const fp = a0 >= 0 ? 1 - p.ph(t, 3.9, 4.6) : 0;
    if (fp > 0) {
      p.stain(CX, CY, 1.95 * fs, (dx, dy) => (this.inPrint(dx / fs / 1.13, dy / fs / 1.13) && !this.inPrint(dx / fs, dy / fs) ? .55 + .5 * p.noise(dx * 5, dy * 5) : 0), '#a89470', fp);
      p.stain(CX, CY, 1.75 * fs, (dx, dy) => this.inPrint(dx / fs, dy / fs) * (.75 + .3 * p.noise(dx * 4, dy * 4)), '#1a140e', fp);
      p.aftermath(CX, CY, 3.4 * fs, 'crack', { amt: fp, n: 9, ramp: RF, glow: (1 - p.ph(a0, .1, 1.4)) * fp, seed: 7, color: '#1e1a16' });
    }
    // ---- light: palm charge ----
    if (t < 1.25) {
      const ch = p.ph(t, .05, CAST), I = t < CAST ? ch : 1 - p.ph(t, 1.0, 1.25);
      for (const h of [fig.hand, fig.handL]) {
        if (t < CAST) p.charge(h[0], h[1], h[2], ch, { n: 6, R: .7, ramp: RF, up: .2 });
        p.glow(h[0], h[1], h[2], .13 + .1 * I, RF, .85 * I);
      }
    }
    // ---- the rift ----
    const crack = p.easeOutExpo(p.ph(t, CAST, .7)), open = p.easeOutBack(p.ph(t, .55, 1.2), 1.5) * (1 - p.easeInCubic(p.ph(t, 3.5, 4.0)));
    if (crack > 0 && t < 4.0) {
      const N = 28, span = 9, up = c.up, rt = c.right, upper = [], lower = [], outU = [], outL = [], mid = [];
      for (let k = 0; k <= N; k++) {
        const s = k / N * 2 - 1, jag = .22 * (p.r(k, 3) - .5) + .1 * (k % 2 ? 1 : -1) + .25 * s * s;
        const show = Math.abs(s) <= crack ? 1 : 0;
        const hw = show * ((.3 * Math.pow(Math.max(0, 1 - s * s), .6)) * open * (.9 + .1 * Math.sin(t * 13 + k)) + .025 * (1 - Math.abs(s) / Math.max(crack, .01)) + .02);
        const b = [Q[0] + rt[0] * s * span + up[0] * jag, Q[1] + rt[1] * s * span + up[1] * jag, Q[2] + rt[2] * s * span + up[2] * jag];
        mid.push(b);
        upper.push([b[0] + up[0] * hw, b[1] + up[1] * hw, b[2] + up[2] * hw]); lower.push([b[0] - up[0] * hw, b[1] - up[1] * hw, b[2] - up[2] * hw]);
        outU.push([b[0] + up[0] * hw * 2.6, b[1] + up[1] * hw * 2.6, b[2] + up[2] * hw * 2.6]); outL.push([b[0] - up[0] * hw * 2.6, b[1] - up[1] * hw * 2.6, b[2] - up[2] * hw * 2.6]);
      }
      p.ribbon(outU, outL, (u, v) => { const d = Math.abs(v * 2 - 1); return d > .38 ? (1 - d) * 1.2 : 0; }, RF, .55);
      p.ribbon(upper, lower, (u, v) => 1 - Math.pow(Math.abs(v * 2 - 1), 2) * .6, RF, 1.2);
      for (let k = 0; k < 6; k++) {
        const s0 = (k / 5 * 2 - 1) * .62 + (p.r(k, 41) - .5) * .15;
        if (Math.abs(s0) > crack) continue;
        const b = mid[Math.round((s0 + 1) / 2 * N)], sg = k % 2 ? 1 : -1, L = (.7 + .6 * p.r(k, 42)) * (.3 + .7 * open);
        const e = [b[0] + up[0] * sg * L + rt[0] * (p.r(k, 43) - .5) * 1.2, b[1] + up[1] * sg * L + rt[1] * (p.r(k, 43) - .5) * 1.2, b[2] + up[2] * sg * L + rt[2] * (p.r(k, 43) - .5) * 1.2];
        p.bolt(b, e, RF, { seed: k * 7 + 1, jag: .3, depth: 3, w: .035, I: .8 * (.4 + .6 * open), glow: .25 });
      }
    }
    // glowing seams on the leg (on the side facing the camera)
    if (footOn) {
      const vI = (.5 + .15 * Math.sin(t * 7)) * (a0 >= 0 && a0 < .6 ? 1.6 - a0 : 1);
      const f2 = p.v3.norm([c.fwd[0], c.fwd[1], 0]), lx = CX - .62 * fs;
      for (let v = 0; v < 2; v++) {
        const side = (v ? .3 : -.24) * fs, pts = [];
        for (let k = 0; k <= 12; k++) {
          const zl = 1.3 + k * .75, z = zf + zl * fs, jg = (p.r(k + v * 20, 51) - .5) * .2 * fs;
          if (z > 14) break;
          const i = Math.floor((zl - 1) / 1.3), R0 = (.64 + .05 * (i % 2) + .07 * Math.min(i, 4)) * fs;
          const rad = R0 * Math.cos(Math.asin(p.clamp((side + jg) / R0, -.95, .95)));
          pts.push([lx + f2[0] * rad + c.right[0] * (side + jg), CY + f2[1] * rad + c.right[1] * (side + jg), z]);
        }
        if (pts.length > 1) p.trail(pts, .05, .03, RF, vI, vI * .7);
      }
    }
    // ---- impact ----
    if (a0 >= 0 && a0 < .03 + 1 / 30) p.impactFrame({ ink: '#16120e', paper: '#fbf4e2', accent: '#e8c890' });
    if (a0 >= 0) {
      const fb = 1 - p.ph(a0, 0, .4), e = p.easeOutExpo(a0 / .3);
      if (fb > 0) p.decal(CX, CY, 0, A * 1.9, (dx, dy) => { const q = Math.hypot(dx / A, dy / Bq); return p.band(q, 1 + .6 * e, .3 + .2 * e) * 1.2; }, RF, 1.3 * fb);
      p.shock(CX, CY, .12, p.ph(a0, 0, 1.1), { R: 5 * Math.sqrt(force) * Math.sqrt(fs), w: .55, ramp: RF, ground: true });
      if (a0 < .24) p.speedLines(CX, CY, .6, { n: 20, R0: A * 1.15, R1: 5, ramp: RF, I: 1 - a0 / .24, seed: Math.floor(t * 30) });
      // dust wall: dithered clouds pushed out from the sole edge, rising and thinning
      const nD = Math.round(26 * dustK * p.density);
      for (let k = 0; k < nD; k++) {
        const ang = k / nD * p.TAU + p.r(k, 61) * .3, b0 = .4 * p.r(k, 62), age = a0 - .02 * p.r(k, 63);
        if (age < 0 || age > 1.4) continue;
        const D = p.drag(3.4 * (.7 + .5 * p.r(k, 64)) * Math.sqrt(force), 2.6, age), ex = Math.cos(ang), ey = Math.sin(ang);
        const x = CX + ex * (A * 1.02 + D) * (1 - b0 * .1), y = CY + ey * (Bq * 1.02 + D), z = .15 + (.3 + 1.1 * p.r(k, 65) ** 2) * p.easeOut(age / .8);
        const r = (.18 + .34 * p.easeOut(age / .9)) * (.6 + .8 * p.r(k, 66)) * Math.sqrt(fs);
        p.ball(x, y, z, r, PL.dust, { alpha: .8 * (1 - p.ph(age, .15, 1.4)), rough: .5, shadow: false, seed: k });
      }
      // rocks thrown from the sole edge
      const nR = Math.round(16 * p.density);
      for (let k = 0; k < nR; k++) {
        const ang = p.r(k, 71) * p.TAU, v = (1.6 + 2.4 * p.r(k, 72)) * Math.sqrt(force), vz = 2 + 2.8 * p.r(k, 73), T = 2 * vz / 9.8, tt = Math.min(a0, T);
        if (a0 > T + 1.2) continue;
        const x0 = CX + Math.cos(ang) * A, y0 = CY + Math.sin(ang) * Bq;
        p.rock(x0 + Math.cos(ang) * v * tt, y0 + Math.sin(ang) * v * tt, Math.max(.07, .15 + vz * tt - 4.9 * tt * tt), .07 + .09 * p.r(k, 74), PL.rock, k);
      }
      p.light(CX, CY, 0, 4, RF, 1.1 * Math.pow(1 - p.ph(a0, 0, 1), 2));
    }
  },
});
