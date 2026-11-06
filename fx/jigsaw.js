// 拼圖崩落 / Jigsaw — Twist pack (original design): glowing seams reveal the battlefield is a jigsaw puzzle floating in the void, and every piece but the caster's flips and falls away with the soldiers on it
PXFX.define({
  id: 'jigsaw',
  loop: 6,
  beats: [{ t: .6, kind: 'cast', power: .7 }, { t: 1.25, kind: 'pulse', power: .4 }, { t: 1.75, kind: 'hit', power: 1.3 }, { t: 2.45, kind: 'pulse', power: .5 }],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'none' },
  modules: ['figure', 'domain', 'crowd', 'troops', 'tally', 'debris'],
  palette: {
    grass: ['#3a6a44', '#4a7a46', '#5a8a4a', '#6c984e', '#a8b45a'],
    soil: ['#3a2a26', '#54382c', '#6e4a34', '#8a5e40', '#a8784e'],
    under: ['#1e1620', '#2a2028', '#382a30', '#4a3838'],
    seam: ['#a86a30', '#e0a040', '#ffd878', '#fff4d0', '#ffffff'],
    dust: ['#4a3e34', '#6a5a4a', '#8a7a64', '#a8977c'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者（縮放 0.85）站在 x = −4.3，對面是一片普通草地上的千人大軍（預設 1000 人方陣，中心 (1.0, 0)、半深 2.8、半寬 2.6，像素小兵）', en: 'pose: the caster (scale 0.85) stands at x = −4.3 facing an army of 1000 on an ordinary grass field (default block, centre (1.0, 0), half depth 2.8, half width 2.6, pixel soldiers)' },
    { k: 'charge', t: [.6, 1.6], zh: '集氣：0.6 秒施法者打一下響指，金色接縫由施法者腳下向外以每秒 20 單位擴散，整片戰場原來是 5 × 5 的拼圖（10 × 10 的板，每塊 2 × 2，有凸榫和凹槽）；天空同時由施法者向外抹成虛空星空；1.2–1.75 秒接縫發白閃爍（拼圖要鬆脫），敵兵發抖', en: 'charge: at 0.6 s the caster snaps their fingers and gold seams spread out from their feet at 20 units/s: the whole field was a 5 × 5 jigsaw (a 10 × 10 board, 2 × 2 pieces with tabs and blanks); the sky wipes out from the caster into a starry void; at 1.2–1.75 s the seams flare white and throb as the pieces strain to come loose, and the soldiers tremble' },
    { k: 'shape', t: [1.4, 1.75], zh: '成形：掉落次序是一道由遠端滾向施法者的波：排序值 = −(塊中心 x − 施法者 x) + 0.35 × |塊中心 y|，一列一列、每列中間先掉；drop（預設 1 = 除施法者腳下那塊外全部）決定前多少比例會掉；每塊在自己掉落前 0.32 秒浮起 0.07–0.14 並抖動', en: 'shape: the drop order is a wave rolling from the far side to the caster: key = −(piece centre x − caster x) + 0.35 × |piece centre y|, column by column with the middle of each column first; drop (default 1 = every piece except the one under the caster) picks how much of that order falls; each piece lifts 0.07–0.14 and wobbles in the 0.32 s before its own drop' },
    { k: 'motion', t: [1.75, 3.05], zh: '推進：第 k 塊在 1.75 + 1.3 × (k ÷ (N − 1))^0.7 秒掉落（先慢後快）；每塊是厚 0.45 的泥土板（上面草地、側面土層、底面深色），以重力 12 下墜並繞一條隨機水平軸越翻越快（角度 = 2.4a + 4.5a²），站在上面的敵兵跟著整塊翻落，0.7 秒後抖色淡出', en: 'motion: piece k drops at 1.75 + 1.3 × (k / (N − 1))^0.7 s (slow, then faster); each is a 0.45-thick slab of earth (grass on top, soil layers on the sides, a dark underside) that falls with gravity 12 and flips faster and faster about a random horizontal axis (angle = 2.4a + 4.5a²), carrying its soldiers with it, and dithers out after 0.7 s' },
    { k: 'impact', t: [1.75, 3.1], zh: '命中：第一塊掉落時頓幀震屏；判定：每個敵兵按真正的拼圖輪廓（含凸榫／凹槽，世界座標）判定站在哪一塊，該塊掉落即中招，命中時間 = 該塊的掉落時間；留下的拼圖塊上的敵兵倖存；洞口看到下面的虛空和留下拼圖塊的泥土側面', en: 'impact: hit-stop and shake when the first piece drops; rule: each soldier belongs to the piece whose real jigsaw outline (tabs and blanks, world space) contains its feet, and dies when that piece drops, hit time = the piece’s drop time; soldiers on pieces that stay survive; the holes show the void below and the soil sides of the pieces left behind' },
    { k: 'after', t: [3.1, 6], zh: '餘波：施法者獨自站在最後一塊拼圖上漂在虛空中；計數 4.0–4.3 秒淡出；4.2–5.0 秒拼圖塊由近到遠從虛空升回原位（回彈落位），4.9–5.5 秒接縫和天空淡回，新一批敵兵 5.0–5.9 秒原地淡入', en: 'aftermath: the caster stands alone on the last piece floating in the void; the counter fades at 4.0–4.3 s; at 4.2–5.0 s the pieces rise back out of the void into their slots, nearest first, with an overshoot; the seams and the sky fade back at 4.9–5.5 s and a fresh army fades in on its spots at 5.0–5.9 s' },
  ],
  layers: [
    { zh: '拼圖板：10 × 10、厚 0.45 的板（舞台地面設為 none，每格自行畫），pieces × pieces 塊；每條內部邊有一個凸榫（圓頭半徑 0.15 格、頸寬 0.14 格、圓心在邊外 0.22 格，沿邊隨機偏移 ±0.06 格），方向隨機；表面是四階抖色草地加亮點，靜止的拼圖塊畫成地面，掉落中的畫成實心泥土板（頂面草地、外輪廓每段一塊側面、底面深色）', en: 'board: a 10 × 10 board 0.45 thick (stage ground none, painted per frame), pieces × pieces; every inner edge has one tab (knob radius 0.15 cell, neck 0.14 cell wide, knob centre 0.22 cell past the edge, shifted ±0.06 cell along it) pointing a random way; the top is a four-tone dithered grass with specks; resting pieces are painted as ground, moving ones are solid earth slabs (grass top, one side face per outline segment, dark underside)' },
    { zh: '判定與倖存者：拼圖塊歸屬用真正的輪廓（先找格子，再看四條邊上的凸榫有沒有伸進來）；施法者腳下（半徑 0.2 內）的塊永不掉落（拼圖數為雙數時是兩塊）；施法者那塊的凸榫伸進鄰格時，站在凸榫上的敵兵也倖存；按 drop 掉落的塊上的敵兵全滅，其餘倖存並發抖；預設 drop = 1，任何陣型都會被清空', en: 'rule and survivors: piece membership uses the real outline (find the cell, then test whether a neighbour’s tab reaches into it on any of its four edges); the piece under the caster (within 0.2 of their feet; two pieces for an even count) never falls, and soldiers standing on its tab where it reaches into a neighbouring cell survive too; soldiers on the pieces that drop all die, the rest survive and tremble; with the default drop = 1 every formation is wiped out' },
    { zh: '大軍與計數：敵兵數量 500–2000（預設 1000），按陣型排列，像素小兵；掉落時跟著拼圖塊的剛體變換（位置與站立方向），角落 3×5 像素字擊殺計數隨每塊掉落跳升，全滅變金色', en: 'army and counter: 500–2000 soldiers (default 1000) in the chosen formation as pixel soldiers; while falling they follow their piece’s rigid transform (position and up direction); the 3×5 pixel kill counter jumps with every piece and turns gold on a full wipe' },
    { zh: '接縫：每像素比較左右上下的拼圖塊編號找出 1 像素接縫線，揭示時由施法者向外擴散的金色亮線（前緣最亮），之後保持淡金色並隨浮起脈動', en: 'seams: 1-pixel seam lines found by comparing the piece id of neighbouring pixels; on the reveal they light up as gold lines spreading out from the caster (brightest at the front), then stay pale gold and pulse while the pieces lift' },
    { zh: '洞與側面：拼圖塊掉走後的洞（和板的外緣），沿視線在一半厚度和整個厚度兩處取樣，落在靜止拼圖塊的輪廓內就是它的泥土側面（較深處較暗），否則看見下面的虛空', en: 'holes and sides: in a hole left by a piece (and around the board’s rim) the view ray is sampled at half and full slab depth; where it lands inside a resting piece’s outline it shows that piece’s soil side (darker lower down), otherwise the void below' },
    { zh: '天空：領域模組由施法者向外把白色背景換成虛空星空（深紫、星點），結束時抖色淡回', en: 'sky: the domain module wipes the white page into a starry void (deep violet with stars) out from the caster and dithers back at the end' },
    { zh: '收尾：拼圖塊由下方 3 單位處升回原位（回彈緩動），落位時邊緣揚起少量泥塵', en: 'reset: the pieces rise back from 3 units below into their slots with an overshoot ease, kicking up a little dust as they click in' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    pieces: { zh: '拼圖塊數（每邊）', en: 'pieces per side', min: 3, max: 8, step: 1, value: 5 },
    drop: { zh: '掉落比例', en: 'drop fraction', min: 0, max: 1, step: .05, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  BOARD: [-5.2, -5, 10],   // x0, y0, size
  TH: .45, SNAP: .6, T0: 1.75, DUR: 1.3, LIFT: [1.25, 1.6], BACK: [4.2, 5.0],
  SKY: { top: '#07060f', bottom: '#191230', nebula: '#2e2357', stars: .012, star: '#d8d4ff' },
  NIGHT: [26, 24, 44],
  // ---- the puzzle: cells, tab signs and offsets (cached per piece count) ----
  board(P) {
    if (this._b && this._b.P === P) return this._b;
    const [X0, Y0, SZ] = this.BOARD, c = SZ / P, H = PXFX.hash;
    const sv = new Int8Array(P * P), ov = new Float32Array(P * P), sh = new Int8Array(P * P), oh = new Float32Array(P * P);
    for (let j = 0; j < P; j++) for (let i = 0; i < P; i++) {
      const k = j * P + i;
      sv[k] = H(i * 3.1 + P, j * 1.7 + .3) > .5 ? 1 : -1; ov[k] = (H(i * 5.3 + .1, j * 2.9 + P) - .5) * .12;
      sh[k] = H(i * 2.3 + .7, j * 4.1 + P * 1.3) > .5 ? 1 : -1; oh[k] = (H(i * 1.9 + P, j * 6.7 + .9) - .5) * .12;
    }
    const b = { P, c, X0, Y0, SZ, sv, ov, sh, oh, dc: .22 * c, rk: .15 * c, nw: .07 * c };
    // membership with tabs: the cell, unless a neighbour's knob reaches in across one of its four edges
    b.mem = (x, y) => {
      const fx = (x - X0) / c, fy = (y - Y0) / c;
      if (fx < 0 || fy < 0 || fx >= P || fy >= P) return -1;
      const i = Math.floor(fx), j = Math.floor(fy), lx = (fx - i) * c, ly = (fy - j) * c, dc = b.dc, rk2 = b.rk * b.rk, nw = b.nw;
      const tab = (q, a) => q > 0 && ((q - dc) * (q - dc) + a * a < rk2 || (q < dc && Math.abs(a) < nw));
      if (i > 0 && sv[j * P + i - 1] > 0 && tab(lx, ly - (.5 + ov[j * P + i - 1]) * c)) return j * P + i - 1;
      if (i < P - 1 && sv[j * P + i] < 0 && tab(c - lx, ly - (.5 + ov[j * P + i]) * c)) return j * P + i + 1;
      if (j > 0 && sh[(j - 1) * P + i] > 0 && tab(ly, lx - (.5 + oh[(j - 1) * P + i]) * c)) return (j - 1) * P + i;
      if (j < P - 1 && sh[j * P + i] < 0 && tab(c - ly, lx - (.5 + oh[j * P + i]) * c)) return (j + 1) * P + i;
      return j * P + i;
    };
    // outline polygon of piece (i, j) in world x, y (for the side faces of moving slabs)
    const olc = [];
    b.outline = id => olc[id] || (olc[id] = b.outline0(id));
    b.outline0 = id => {
      const i = id % P, j = Math.floor(id / P), x0 = X0 + i * c, y0 = Y0 + j * c, x1 = x0 + c, y1 = y0 + c, pts = [];
      const al = Math.asin(b.nw / b.rk), NB = c > 1.6 ? 8 : 5;
      // edge from S to E (traversal), outward normal N, tab: { off, out } or null
      const edge = (S, Ed, N, tb) => {
        pts.push(S);
        if (!tb) return;
        const ux = (Ed[0] - S[0]) / c, uy = (Ed[1] - S[1]) / c, Tx = S[0] + ux * (.5 + tb.off) * c, Ty = S[1] + uy * (.5 + tb.off) * c, D = tb.out ? 1 : -1;
        pts.push([Tx - ux * b.nw, Ty - uy * b.nw]);
        for (let k = 0; k <= NB; k++) {
          const be = -(Math.PI - al) + 2 * (Math.PI - al) * k / NB, q = b.dc + b.rk * Math.cos(be), a = b.rk * Math.sin(be);
          pts.push([Tx + N[0] * D * q + ux * a, Ty + N[1] * D * q + uy * a]);
        }
        pts.push([Tx + ux * b.nw, Ty + uy * b.nw]);
      };
      // bottom (y0): neighbour j-1, edge index (j-1, i) in sh; tab owned by the lower cell when sh > 0
      edge([x0, y0], [x1, y0], [0, -1], j > 0 ? { off: oh[(j - 1) * P + i], out: sh[(j - 1) * P + i] < 0 } : null);
      edge([x1, y0], [x1, y1], [1, 0], i < P - 1 ? { off: ov[j * P + i], out: sv[j * P + i] > 0 } : null);
      // top and left edges run backwards along their axis: mirror the offset so the knob sits where mem() puts it
      edge([x1, y1], [x0, y1], [0, 1], j < P - 1 ? { off: -oh[j * P + i], out: sh[j * P + i] > 0 } : null);
      edge([x0, y1], [x0, y0], [-1, 0], i > 0 ? { off: -ov[j * P + i - 1], out: sv[j * P + i - 1] < 0 } : null);
      return pts;
    };
    this._b = b;
    return b;
  },
  // drop plan (cached per piece count + drop fraction): order by distance from the caster's piece, drop times
  plan(b, drop) {
    const key = b.P + '|' + drop;
    if (this._p && this._p.key === key) return this._p;
    const P = b.P, N = P * P, [cx, cy] = this.CASTER, keep = new Uint8Array(N);
    for (let a = 0; a < 9; a++) { const id = b.mem(cx + (a % 3 - 1) * .2, cy + (Math.floor(a / 3) - 1) * .2); if (id >= 0) keep[id] = 1; }
    const ctr = id => [b.X0 + (id % P + .5) * b.c, b.Y0 + (Math.floor(id / P) + .5) * b.c];
    const order = [];
    // a wave rolling from the far side towards the caster: column by column, the middle of each column first
    for (let id = 0; id < N; id++) if (!keep[id]) { const q = ctr(id); order.push([id, -(q[0] - cx) + .35 * Math.abs(q[1] - cy) + PXFX.hash(id * 1.3, P) * .01]); }
    order.sort((a, c) => a[1] - c[1]);
    const nd = order.length, K = Math.round(drop * nd), td = new Float32Array(N).fill(-1), rank = new Float32Array(N).fill(-1);
    order.forEach(([id], r) => { rank[id] = r / Math.max(1, nd - 1); if (r < K) td[id] = this.T0 + this.DUR * Math.pow(rank[id], .7); });
    this._p = { key, keep, td, rank, ctr };
    return this._p;
  },
  rule(units, b, pl) {
    if (this._r && this._r.units === units && this._r.key === pl.key) return this._r;
    const pid = new Int16Array(units.length), hitT = [];
    for (const u of units) { const id = b.mem(u.x, u.y); pid[u.i] = id; hitT.push({ hitT: id >= 0 && pl.td[id] >= 0 ? pl.td[id] : null }); }
    this._r = { units, key: pl.key, pid, hitT };
    return this._r;
  },
  // grass texture over the board (tone, speck), cached
  tex() {
    if (this._tex) return this._tex;
    const [X0, Y0, SZ] = this.BOARD, n = 256, R = SZ / n, tone = new Float32Array(n * n), speck = new Uint8Array(n * n), H = PXFX.hash, N = PXFX.noise;
    for (let w = 0; w < n; w++) for (let u = 0; u < n; u++) {
      const x = X0 + (u + .5) * R, y = Y0 + (w + .5) * R, k = w * n + u, fine = H(Math.floor(x * 9), Math.floor(y * 9));
      if (fine > .972) speck[k] = 1;
      tone[k] = .5 + (N(x * .7, y * .9) - .5) * .8 + (fine - .5) * .22;
    }
    this._tex = { n, R, X0, Y0, tone, speck };
    return this._tex;
  },
  cols(night) {
    const key = night ? 'n' : 'd';
    this._cols = this._cols || {};
    if (this._cols[key]) return this._cols[key];
    const PL = this.palette, conv = h => { let c = PXFX.hex(h); if (night) c = c.map((v, i) => v * .42 * .78 + this.NIGHT[i] * .22); return PXFX.rgb(c[0], c[1], c[2]); };
    const nconv = r => r.map(h => { let c = PXFX.hex(h); if (night) c = c.map((v, i) => v * .42 * .78 + this.NIGHT[i] * .22); return PXFX.toHex(c); });
    this._cols[key] = { grass: PL.grass.map(conv), soil: PL.soil.map(conv), seam: PL.seam.map(h => { const c = PXFX.hex(h); return PXFX.rgb(c[0], c[1], c[2]); }), grassR: nconv(PL.grass), soilR: nconv(PL.soil), underR: nconv(PL.under) };
    return this._cols[key];
  },
  // rigid transform of a piece at time t: { z, ang, ax, ay, alpha, gone } (rotation angle about a horizontal axis)
  pose(id, t, pl, b) {
    const td = pl.td[id], r = PXFX.hash(id * 2.7, b.P * .3), r2 = PXFX.hash(id * 1.1 + 4, b.P);
    if (pl.keep[id]) return null;
    // each piece lifts and wobbles for a moment right before it drops
    const lw = td >= 0 ? Math.max(0, Math.min(1, (t - (td - .32)) / .22)) : 0;
    const lift = (.07 + .07 * r) * (1 - Math.pow(1 - lw, 3));
    const ax = Math.cos(r2 * 6.283), ay = Math.sin(r2 * 6.283);
    if (td < 0 || t < td) {
      if (lift <= .002) return null;
      return { z: lift, ang: .07 * Math.sin(t * 31 + id) * lw, ax, ay, alpha: 1, ox: 0, oy: 0 };
    }
    const a = t - td, [B0, B1] = this.BACK;
    // return from the void (nearest first): rises flat with an overshoot
    const rb = B0 + (B1 - B0 - .4) * (1 - pl.rank[id]);
    if (t >= rb) {
      const k = Math.min(1, (t - rb) / .4), e = 1 + (k - 1) * (k - 1) * ((2.2 + 1) * (k - 1) + 2.2);
      if (k >= 1) return null;
      return { z: -3.2 * (1 - e), ang: 0, ax, ay, alpha: Math.min(1, k * 3), ox: 0, oy: 0, back: true };
    }
    if (a > 1.15) return { gone: true };
    const spin = (r > .5 ? 1 : -1) * (a * 2.4 + a * a * 4.5);
    return { z: lift - 6 * a * a, ang: spin, ax, ay, alpha: 1 - Math.max(0, Math.min(1, (a - .7) / .45)), ox: 0, oy: 0 };
  },
  // world point of a flat board point (x, y, zl) on a moving piece
  xf(b, id, ps, x, y, zl) {
    const cx = b.X0 + (id % b.P + .5) * b.c, cy = b.Y0 + (Math.floor(id / b.P) + .5) * b.c;
    const lx = x - cx, ly = y - cy, lz = zl, c = Math.cos(ps.ang), s = Math.sin(ps.ang), ax = ps.ax, ay = ps.ay;
    // Rodrigues about the horizontal axis (ax, ay, 0)
    const d = lx * ax + ly * ay, cxx = ay * lz, cyy = -ax * lz, czz = ax * ly - ay * lx;
    return [cx + lx * c + cxx * s + ax * d * (1 - c), cy + ly * c + cyy * s + ay * d * (1 - c), ps.z + lz * c + czz * s];
  },
  draw(p, t) {
    const PL = this.palette, { SNAP, T0, TH, BACK } = this, self = this;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const b = this.board(Math.round(p.param('pieces'))), pl = this.plan(b, Math.round(p.param('drop') * 20) / 20);
    const units = p.crowdLayout({ n, seed: 23, formation: form, area: this.AREA, faceTo: this.CASTER });
    const R = this.rule(units, b, pl), T = this.tex(), cols = this.cols(p.night);
    const P = b.P, N = P * P, poses = new Array(N);
    for (let id = 0; id < N; id++) poses[id] = this.pose(id, t, pl, b);
    // a piece is painted as ground while it rests in its slot
    const resting = id => id >= 0 && poses[id] === null;
    // seams: reveal front spreads from the caster; brightness envelope
    const [qx, qy] = this.CASTER, front = 20 * (t - SNAP), seamOn = t >= SNAP && t < 5.5, seamFade = 1 - p.ph(t, 4.9, 5.4);
    // the seams flare and throb on the lift beat (1.25 s) while the pieces strain to come loose
    const strain = p.env(t, this.LIFT[0] - .05, this.LIFT[0] + .05, T0 - .1, T0 + .5);
    const seamBase = (.42 + strain * (.35 + .25 * Math.sin(t * 26))) * seamFade;
    // ---- 1. the board, painted per pixel: resting tops, soil sides seen through the holes ----
    p.post(({ pix, W, H, kind, zb, bayer, P, Q, mode }) => {
      const flat = mode === '2d', ids = self._ids && self._ids.length === W * H ? self._ids : (self._ids = new Int16Array(W * H));
      // every pixel's view ray as ground point + change per unit of height (rays are straight: linear in h);
      // cached until the camera moves, so a still camera costs no inverse projections
      const key = [W, H, mode].concat([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]].map(v => { const q = P(v[0], v[1], v[2]); return q ? q[0].toFixed(3) + ',' + q[1].toFixed(3) : 'x'; })).join('|');
      let rc = self._ray;
      if (!rc || rc.key !== key) {
        rc = self._ray = { key, a: new Float32Array(W * H * 6), ok: new Uint8Array(W * H) };
        for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
          const i = iy * W + ix, q0 = Q(ix + .5, iy + .5, 0), q1 = q0 && Q(ix + .5, iy + .5, -TH);
          if (!q0 || !q1) continue;
          rc.ok[i] = 1;
          const o = i * 6;
          rc.a[o] = q0[0]; rc.a[o + 1] = q0[1]; rc.a[o + 2] = q0[2]; rc.a[o + 3] = (q0[0] - q1[0]) / TH; rc.a[o + 4] = (q0[1] - q1[1]) / TH; rc.a[o + 5] = (q0[2] - q1[2]) / TH;
        }
      }
      const RA = rc.a;
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const i = iy * W + ix;
        ids[i] = -1;
        if (!rc.ok[i]) continue;
        const o = i * 6, gx = RA[o], gy = RA[o + 1];
        const id = b.mem(gx, gy);
        if (resting(id)) {
          const u = Math.floor((gx - T.X0) / T.R), w = Math.floor((gy - T.Y0) / T.R), k = Math.min(T.n - 1, Math.max(0, w)) * T.n + Math.min(T.n - 1, Math.max(0, u));
          pix[i] = T.speck[k] ? cols.grass[4] : cols.grass[Math.max(0, Math.min(3, Math.floor(T.tone[k] * 4 + (flat ? 0 : (bayer(ix, iy) - .5) * .6))))];
          kind[i] = 1; zb[i] = RA[o + 2]; ids[i] = id;
          continue;
        }
        // a hole or outside the board: look down the view ray for the side of a resting piece
        // (a ray that ends inside a resting piece's footprint at slab depth entered through its side)
        for (let s = 1; s <= 2; s++) {
          const h = -TH * s / 2, qx2 = gx + RA[o + 3] * h, qy2 = gy + RA[o + 4] * h;
          const id2 = b.mem(qx2, qy2);
          if (resting(id2)) {
            const band = Math.floor(PXFX.hash(Math.floor(qx2 * 6 + qy2 * 6), s) * 2);
            pix[i] = cols.soil[Math.max(0, 3 - s - band + (flat ? 0 : bayer(ix, iy) > .7 ? 1 : 0))];
            kind[i] = 1; zb[i] = RA[o + 2] + RA[o + 5] * h; ids[i] = -2;
            break;
          }
        }
      }
      // seam lines: a pixel whose right or lower neighbour is another resting piece
      if (!seamOn) return;
      for (let iy = 0; iy < H - 1; iy++) for (let ix = 0; ix < W - 1; ix++) {
        const i = iy * W + ix, a = ids[i];
        if (a < 0) continue;
        const r = ids[i + 1], d = ids[i + W];
        if ((r === a || r < 0) && (d === a || d < 0)) continue;
        if (r === -2 || d === -2) continue;
        const dist = Math.hypot(RA[i * 6] - qx, RA[i * 6 + 1] - qy), f = front - dist;
        if (f < 0) continue;
        const I = Math.max(seamBase, f < 1.5 ? 1.1 - f * .25 : 0) * (seamFade > 0 ? 1 : 0);
        const lv = flat ? Math.floor(I * 4) : Math.floor(I * 4 + (bayer(ix, iy) - .5) * .9);
        if (lv < 0 || I <= 0) continue;
        pix[i] = cols.seam[Math.min(4, lv)];
        kind[i] = 3;
      }
    });
    // ---- 2. caster ----
    let pose;
    if (t < SNAP - .3) pose = 'idle';
    else if (t < SNAP + .05) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, SNAP - .3, SNAP - .05)) };
    else if (t < T0 - .1) pose = { a: 'raise', b: 'point', k: p.easeOutCubic(p.ph(t, SNAP + .05, SNAP + .3)) };
    else if (t < 3.3) pose = { a: 'point', b: 'palm', k: p.easeOutExpo(p.ph(t, T0 - .1, T0 + .05)) };
    else if (t < BACK[0]) pose = { a: 'palm', b: 'gaze', k: p.easeOutCubic(p.ph(t, 3.3, 3.8)) };
    else if (t < 5.0) pose = { a: 'gaze', b: 'spread', k: p.easeOutCubic(p.ph(t, BACK[0] - .1, BACK[0] + .3)) };
    else pose = { a: 'spread', b: 'idle', k: p.ease(p.ph(t, 5.0, 5.6)) };
    const fig = p.figure(qx, qy, { pose, scale: .85 });
    // ---- 3. moving pieces: earth slabs (grass top, soil sides, dark underside) ----
    const cam = p.cam(), V = p.mode === '2d' ? [0, .8, .6] : cam.fwd, LL = Math.hypot(PXFX.SHADOW_X, PXFX.SHADOW_Y, 1);
    const LV = [-PXFX.SHADOW_X / LL, -PXFX.SHADOW_Y / LL, 1 / LL];
    for (let id = 0; id < N; id++) {
      const ps = poses[id];
      if (!ps || ps.gone || ps.alpha <= 0) continue;
      const i = id % P, j = Math.floor(id / P), m = .42 * b.c, x0 = b.X0 + i * b.c - m, y0 = b.Y0 + j * b.c - m, ext = b.c + 2 * m;
      const o = ps.alpha < 1 ? { alpha: ps.alpha } : undefined;
      // top normal -> which way the slab faces
      const up = this.xf(b, id, Object.assign({}, ps, { z: 0 }), b.X0 + (i + .5) * b.c, b.Y0 + (j + .5) * b.c, 1);
      const nz = [up[0] - (b.X0 + (i + .5) * b.c), up[1] - (b.Y0 + (j + .5) * b.c), up[2]];
      const topVis = nz[0] * V[0] + nz[1] * V[1] + nz[2] * V[2] > 0, lit = nz[0] * LV[0] + nz[1] * LV[1] + nz[2] * LV[2];
      const face = (zl, ramp, fn) => {
        const S = 3, L = [], Rr = [];
        for (let a = 0; a < S; a++) {
          const ya = y0 + ext * a / S, yb = y0 + ext * (a + 1) / S, l = [], r = [];
          for (let k = 0; k <= S; k++) { const x = x0 + ext * k / S; l.push(this.xf(b, id, ps, x, ya, zl)); r.push(this.xf(b, id, ps, x, yb, zl)); }
          p.sribbon(l, r, (u, v) => { const x = x0 + ext * u, y = ya + (yb - ya) * v; return b.mem(x, y) === id ? fn(x, y) : -1; }, ramp, o);
        }
      };
      if (topVis) {
        const sh = lit > .75 ? 1 : lit > .35 ? 0 : -1;
        face(0, cols.grassR, (x, y) => {
          const u = Math.floor((x - T.X0) / T.R), w = Math.floor((y - T.Y0) / T.R), k = Math.min(T.n - 1, Math.max(0, w)) * T.n + Math.min(T.n - 1, Math.max(0, u));
          return T.speck[k] ? .9 : (Math.max(0, Math.min(3, Math.floor(T.tone[k] * 4) + sh)) + .5) / 5;
        });
      } else face(-TH, cols.underR, (x, y) => ((PXFX.hash(Math.floor(x * 5), Math.floor(y * 5)) * 2 + (lit < -.3 ? 0 : 1)) | 0) / 4 + .1);
      // sides: one quad per outline segment
      const ol = b.outline(id);
      for (let k = 0; k < ol.length; k++) {
        const A = ol[k], B = ol[(k + 1) % ol.length];
        p.quad(this.xf(b, id, ps, A[0], A[1], 0), this.xf(b, id, ps, B[0], B[1], 0), this.xf(b, id, ps, B[0], B[1], -TH), this.xf(b, id, ps, A[0], A[1], -TH), cols.soilR, o);
      }
    }
    // ---- 4. the army: soldiers ride their piece ----
    const S0 = 240 / (2 * this.view.r * 1.12) * p.v.fs, sc = p.clamp((units.spacing || .3) / .4, .08, 1.5);
    const drawer = .62 * sc * S0 < 7.5 ? p.pawnSprite : p.pawn, po = { scale: sc };
    const fear = p.env(t, SNAP + .2, this.LIFT[0], 3.6, 4.4), RS = [5.0, 5.9];
    for (const u of units) {
      const id = R.pid[u.i], hit = R.hitT[u.i].hitT, ps = id >= 0 ? poses[id] : null;
      const s = { i: u.i, vr: u.vr, x: u.x, y: u.y, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: u.face, alpha: 1, walk: null, spear: true };
      if (hit != null && t >= hit) {
        if (t >= RS[0]) {
          const len = (RS[1] - RS[0]) * .55, st0 = RS[0] + u.r1 * (RS[1] - RS[0] - len);
          s.alpha = p.ph(t, st0, st0 + len);
          if (s.alpha <= 0) continue;
        } else {
          if (!ps || ps.gone || ps.back || ps.alpha <= 0) continue;
          const a = t - hit, w = this.xf(b, id, ps, u.x, u.y, .02), up = this.xf(b, id, ps, u.x, u.y, 1.02);
          const ux = up[0] - w[0], uy = up[1] - w[1], uz = up[2] - w[2], hl = Math.hypot(ux, uy) || 1e-6;
          // flail a little off the slab as it tumbles
          s.x = w[0]; s.y = w[1]; s.z = w[2] + Math.max(0, a - .15) * .4 * u.r2;
          s.tilt = Math.acos(Math.max(-1, Math.min(1, uz))) + (a > .15 ? (a - .15) * (2 + 3 * u.r3) : 0); s.tdir = [ux / hl, uy / hl];
          s.alpha = ps.alpha; s.spear = false; s.flash = a < .045;
        }
      } else {
        if (ps && !ps.gone && !ps.back) {
          const w = this.xf(b, id, ps, u.x, u.y, .02);
          s.x = w[0]; s.y = w[1]; s.z = w[2];
        }
        const fr = fear * (.5 + .5 * u.r2) * (hit == null && t > 3.1 ? .6 : 1);
        s.tilt = .25 * fr; s.jit = .015 * fr; s.tdir = [Math.cos(u.face + Math.PI), Math.sin(u.face + Math.PI)];
      }
      drawer.call(p, s, po);
    }
    // ---- 5. dust: crumbs from each dropping piece, a puff as pieces click back in ----
    const nD = Math.round(6 * Math.min(1.5, p.density) * Math.min(1, b.c / 2));
    for (let id = 0; id < N; id++) {
      const td = pl.td[id];
      if (td < 0) continue;
      const ctr = pl.ctr(id);
      for (let k = 0; k < nD; k++) {
        const a = (t - td - .02 * k) / .8;
        if (a > 0 && a < 1) {
          const ang = p.r(id * 7 + k, 11) * p.TAU, rr = b.c * (.35 + .2 * p.r(id * 7 + k, 12));
          p.ball(ctr[0] + Math.cos(ang) * rr, ctr[1] + Math.sin(ang) * rr, -a * a * 3.5 + .05, .06 + .05 * p.r(k, 13), cols.soilR, { alpha: 1 - a, shadow: false, seed: k });
        }
        const rb = BACK[0] + (BACK[1] - BACK[0] - .4) * (1 - pl.rank[id]) + .32, c2 = (t - rb) / .6;
        if (c2 > 0 && c2 < 1 && k < 4) {
          const ang = p.r(id * 5 + k, 21) * p.TAU, rr = b.c * .55 + .3 * p.easeOutCubic(c2);
          p.ball(ctr[0] + Math.cos(ang) * rr, ctr[1] + Math.sin(ang) * rr, .08 + .25 * c2, .1 + .12 * c2, PL.dust, { alpha: .8 * (1 - c2), rough: .5, shadow: false, seed: k });
        }
      }
    }
    // ---- 6. the void: the page turns into a starry abyss under the puzzle ----
    const skyK = t < 3 ? p.easeOutCubic(p.ph(t, SNAP + .05, SNAP + .75)) : 1 - p.ph(t, 4.9, 5.5);
    if (skyK > .01) p.domain({ amt: skyK, c: [qx, qy, 0], sky: this.SKY, t: 0, fade: t > 3 });   // a static sky: no rebuild
    // snap spark on the caster's hand, glow under the caster's piece
    if (t > SNAP - .05 && t < SNAP + .3) { const h = fig.hand, k = p.ph(t, SNAP - .05, SNAP + .3); p.sparkle(h[0], h[1], h[2] + .05, 4 * (1 - k) + 1, PL.seam, 1.1 * (1 - k)); p.glow(h[0], h[1], h[2], .3, PL.seam, .9 * (1 - k)); }
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(R.hitT, { t, alpha: 1 - p.ph(t, 4.0, 4.3) });
  },
});
