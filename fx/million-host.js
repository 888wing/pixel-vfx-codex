// 百萬大軍 / Million Host — Twist pack (original design): the camera pulls back from one soldier until a million-strong army covers a continent, then a ring of light comes down around the coast and closes in
PXFX.define({
  id: 'million-host',
  loop: 7,
  beats: [{ t: 3.75, kind: 'cast', power: .8 }, { t: 5.0, kind: 'hit', power: 1.5 }, { t: 5.9, kind: 'pulse', power: .4 }],
  view: { r: 6, h: 3.4 },
  stage: { ground: 'none' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'shockwave', 'impact', 'aftermath', 'grade'],
  palette: {
    halo: ['#7a5a20', '#c89a3a', '#f2d070', '#fff0b0', '#ffffff'],
    spark: ['#c88a2a', '#ffc860', '#fff0b8', '#ffffff'],
    pillar: ['#8a6ac8', '#c8a8ff', '#f0e4ff', '#ffffff'],
    land: ['#3a6a44', '#4a7a46', '#5a8a4a', '#6c984e'],
    shore: ['#c8ac82', '#dcc497'],
    sea: ['#1a3462', '#20407a', '#284c8a', '#36609e', '#9ec4e6'],
    scorch: ['#1e1a1e', '#2c2428', '#3e3030', '#5a3a2a'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：近景，施法者（高約 1.5）站在大軍最前排前方 2.4 處；前排士兵高約 0.55，是有頭盔、肩甲和長矛的 3D 小兵，背後的軍陣延伸出畫面', en: 'pose: close-up; the caster (~1.5 tall) stands 2.4 in front of the army’s first rank; the front soldiers are ~0.55-tall 3D pawns with helmets, pauldrons and spears, and the ranks run on out of frame' },
    { k: 'charge', t: [.5, 3.3], zh: '集氣（拉遠）：鏡頭以對數速度由 1.5 倍拉遠到整片大軍入鏡（約 0.025 倍），每拉遠十倍用時相同，先慢、中段快、最後慢；士兵由 3D 小兵變成 1 像素的像素小兵，再變成一片頭盔海；鏡頭中心同時由前排移到大軍中心；大軍外圍出現海岸線、沙灘和海洋，最後百萬大軍鋪滿整個大陸', en: 'charge (pull-back): the camera pulls back on a log scale from 1.5× until the whole army fits (~0.025×), each tenfold step taking the same time, slow-fast-slow; soldiers go from 3D pawns to 1 px pixel soldiers to a sea of helmets while the view centre drifts from the front rank to the army centre; a coastline, beach and ocean appear around the army until a million soldiers cover the continent' },
    { k: 'shape', t: [3.3, 3.75], zh: '成形：天色壓暗轉紫；一道金白光環（地面光帶寬約 3.5 像素，加一圈由地面升起、向上淡出的光幕，高約軍陣半徑的四分之一）由高空落下，套住整個大軍，落地時閃光', en: 'shape: the world dims to violet; a gold-white ring of light (a ~3.5 px ground band plus a light curtain rising a quarter of the army radius and fading upwards) drops from high above around the whole army and flashes as it lands' },
    { k: 'motion', t: [3.75, 5.0], zh: '推進：光環向內收緊，半徑 r(t) = R0 − (R0 − ringEnd × R) × u²（u = (t − 3.75) / 1.25，先慢後快）；前緣不斷噴出金色火星；光環掃過的士兵先閃白，化成上升的光點，再剩一粒灰燼，地面燒成焦黑', en: 'motion: the ring closes in, radius r(t) = R0 − (R0 − ringEnd × R) × u² (u = (t − 3.75) / 1.25, slow then fast); its front keeps spraying golden sparks; every soldier it passes flashes white, rises as a spark of light and leaves a speck of ash on scorched black ground' },
    { k: 'impact', t: [5.0, 5.4], zh: '命中：光環收到中心時坍縮成一道紫白光柱直衝天際（高度約軍陣半徑的 1.2 倍），衝擊閃光＋頓幀，再一圈白色衝擊波向外擴散；判定：與光環中心的距離 ≥ 光環半徑的士兵中招，命中時間 = 3.75 + 1.25 × √((R0 − 距離) / (R0 − ringEnd × R))；距離 < ringEnd × R 的士兵倖存；計數器顯示 1,000,000/1,000,000 並變金色', en: 'impact: when the ring reaches the centre it collapses into a violet-white pillar shooting into the sky (~1.2 × the army radius tall), an impact flash and hit-stop, then a white shockwave rolls outwards; rule: soldiers whose distance from the ring centre ≥ the ring radius are hit, at 3.75 + 1.25 × √((R0 − distance) / (R0 − ringEnd × R)); soldiers closer than ringEnd × R survive; the counter reads 1,000,000/1,000,000 and turns gold' },
    { k: 'after', t: [5.4, 7], zh: '餘波：焦黑的大陸上餘燼閃爍；5.9 秒起鏡頭用 0.9 秒急速推回近景，天色恢復，焦土退去，大軍在原位淡入，回到第一格的畫面；計數器 5.9–6.1 秒淡出', en: 'aftermath: embers glitter across the scorched continent; from 5.9 s the camera rushes back to the close-up in 0.9 s, the sky returns, the scorch recedes and the army fades back in on the spot, matching the first frame; the counter fades at 5.9–6.1 s' },
  ],
  layers: [
    { zh: '大軍結構：一百萬人分成 2,500 個團（每團 20×20 = 400 人）；團按陣型（預設方陣）排列，團距 7，兵距 0.35；每名士兵的位置 = 團中心 + 團內格位 + 0.3 倍兵距的隨機抖動；敵兵數量參數以 400 人為單位增減團數', en: 'army structure: a million soldiers in 2,500 regiments (20×20 = 400 each); regiments stand in the formation (default block) 7 apart, soldiers 0.35 apart; a soldier’s position = regiment centre + its slot + jitter of 0.3 × spacing; the enemy-count knob adds or removes regiments of 400' },
    { zh: '細節級別：士兵高 4.5 像素以上時畫真正的小兵（近景是 3D 小兵，之後是像素小兵）；更小時改用逐像素的「人海著色器」：對每個地面像素找出最近的士兵，若該士兵的腳正好落在這個像素，就由腳向上畫 1 像素寬的身體和頭盔，外觀與像素小兵一致；士兵小於一個像素時，每個像素顯示最近那名士兵的顏色，成為一片頭盔海', en: 'level of detail: while a soldier is ≥ 4.5 px tall real pawns are drawn (3D pawns up close, then pixel soldiers); below that a per-pixel "horde shader" takes over: for each ground pixel find the nearest soldier, and if his feet land in that pixel draw a 1 px body and helmet upwards from it, matching the pixel soldiers; once soldiers are smaller than a pixel each pixel shows its nearest soldier, a sea of helmets' },
    { zh: '拉遠：所有東西（地面、大軍、施法者、光環）以世界縮放係數 k 繪畫，k 由 1.5 以對數插值到剛好容納大軍；鏡頭中心由前排移到大軍中心；地面紋理（草地斑塊、沙灘、海浪）用世界座標取樣，所以縮放時細節一起變細', en: 'pull-back: everything (ground, army, caster, ring) is drawn through a world scale k that goes from 1.5 to just fitting the army on a log scale; the view centre moves from the front rank to the army centre; ground texture (grass patches, beach, waves) is sampled in world coordinates so its detail shrinks with the zoom' },
    { zh: '判定與倖存：光環中心 = 大軍中心 + offset × 大軍半徑（沿 x 軸）；士兵與中心的距離 ≥ 光環半徑時中招；ringEnd > 0 時光環停在 ringEnd × 大軍半徑，圈內的士兵倖存，光環停下後升回天上', en: 'rule and survivors: ring centre = army centre + offset × army radius (along x); a soldier is hit once his distance from the centre ≥ the ring radius; with ringEnd > 0 the ring stops at ringEnd × the army radius, everyone inside survives and the ring rises back into the sky' },
    { zh: '擊殺計數：一百萬人不逐一建立狀態；預先算好每名士兵到光環中心的距離並排序，每格以二分搜尋數出「距離 ≥ 光環半徑」的人數，顯示在 3×5 像素字計數器上，全滅時變金色', en: 'kill counter: no per-soldier state for a million; every soldier’s distance from the ring centre is precomputed and sorted, and each frame a binary search counts how many have distance ≥ the ring radius; shown on the 3×5 pixel counter, gold on a full wipe' },
    { zh: '光環：地面上的金白色光帶（寬約 3.5 像素）＋一圈由地面升起、向上淡出的光幕；前緣每處噴出上升的火星（約 400 粒，各自在光環經過時出生、上升 0.6 秒）', en: 'ring: a gold-white ground band (~3.5 px wide) plus a light curtain rising from it and fading upwards; its front sprays rising sparks (~400, each born where the ring passes and rising for 0.6 s)' },
    { zh: '天色與焦土：光環出現時全畫面壓暗、去飽和並偏紫（發光部分不受影響）；光環掃過的地面變成焦黑色並有零星餘燼，5.9–6.4 秒退去', en: 'sky and scorch: when the ring appears the whole picture darkens, desaturates and shifts violet (emissive parts untouched); ground the ring has passed turns scorched black with scattered embers, receding at 5.9–6.4 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 100000, max: 1000000, step: 100000, value: 1000000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    ringEnd: { zh: '光環停止半徑', en: 'ring stop radius', min: 0, max: .8, step: .05, value: 0 },
    offset: { zh: '光環中心偏移', en: 'ring centre offset', min: -.5, max: .5, step: .05, value: 0 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },

  // integer hash in [0, 1): fast enough for a million soldiers
  ih(i, s) { let h = Math.imul(i ^ Math.imul(s, 0x9e3779b1), 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return (h >>> 0) / 4294967296; },
  // the army: regiments of m x m soldiers laid out in the formation; cached per (count, formation)
  army(p, N, form) {
    const key = N + '|' + form;
    if (this._army && this._army.key === key) return this._army;
    const m = 20, M = Math.max(1, Math.round(N / (m * m))), RA = 3.5 * Math.sqrt(M);
    let cx = [], cy = [], cell;
    if (form === 'block') {
      const cols = Math.round(Math.sqrt(M)), rows = Math.ceil(M / cols);
      cell = 7;
      for (let j = 0; j < M; j++) { const r = Math.floor(j / cols), c = j % cols; cx.push((r - (rows - 1) / 2) * cell); cy.push((c - (cols - 1) / 2) * cell); }
    } else {
      const u = p.crowdLayout({ n: M, seed: 5, formation: form, area: { x: 0, y: 0, rx: RA, ry: RA }, faceTo: [-4 * RA, 0] });
      cell = Math.max(2, u.spacing * .98);
      for (const q of u) { cx.push(q.x); cy.push(q.y); }
    }
    const Mr = cx.length;
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (let j = 0; j < Mr; j++) { x0 = Math.min(x0, cx[j]); x1 = Math.max(x1, cx[j]); y0 = Math.min(y0, cy[j]); y1 = Math.max(y1, cy[j]); }
    const ACx = (x0 + x1) / 2, ACy = (y0 + y1) / 2;
    let R = 0, fj = 0;
    for (let j = 0; j < Mr; j++) { R = Math.max(R, Math.hypot(cx[j] - ACx, cy[j] - ACy)); if (cx[j] < cx[fj] - 1e-6 || (Math.abs(cx[j] - cx[fj]) < 1e-6 && Math.abs(cy[j]) < Math.abs(cy[fj]))) fj = j; }
    R += cell * .71;
    // spatial hash of regiment centres (cell-sized buckets)
    const gx0 = x0 - cell, gy0 = y0 - cell, gw = Math.ceil((x1 - x0) / cell) + 3, gh = Math.ceil((y1 - y0) / cell) + 3;
    const head = new Int32Array(gw * gh).fill(-1), next = new Int32Array(Mr);
    for (let j = 0; j < Mr; j++) { const k = Math.floor((cy[j] - gy0) / cell) * gw + Math.floor((cx[j] - gx0) / cell); next[j] = head[k]; head[k] = j; }
    const A = { key, m, M: Mr, N: Mr * m * m, cell, cols: form === 'block' ? Math.round(Math.sqrt(M)) : 0, rows: form === 'block' ? Math.ceil(M / Math.round(Math.sqrt(M))) : 0, s: cell / m, cx, cy, ACx, ACy, R, gx0, gy0, gw, gh, head, next, front: [cx[fj] - cell / 2, cy[fj]] };
    this._army = A; this._dist = null;
    return A;
  },
  // soldier i of regiment j at slot (a, b): world position (jittered)
  pos(A, j, a, b, out) {
    const i = (j * A.m + a) * A.m + b, s = A.s;
    out[0] = A.cx[j] + ((a + .5) / A.m - .5) * A.cell + (this.ih(i, 1) - .5) * .3 * s;
    out[1] = A.cy[j] + ((b + .5) / A.m - .5) * A.cell + (this.ih(i, 2) - .5) * .3 * s;
    return i;
  },
  // the soldier nearest to world point (x, y): regiment j and slot, or -1
  nearest(A, x, y, out) {
    if (A.cols) {   // block: a plain grid of regiments
      const r = Math.floor(x / A.cell + A.rows / 2), c = Math.floor(y / A.cell + A.cols / 2), j = r * A.cols + c;
      if (r < 0 || c < 0 || c >= A.cols || j >= A.M) return -1;
      const qx = x - A.cx[j], qy = y - A.cy[j];
      return this.pos(A, j, Math.min(A.m - 1, Math.max(0, Math.floor((qx / A.cell + .5) * A.m))), Math.min(A.m - 1, Math.max(0, Math.floor((qy / A.cell + .5) * A.m))), out);
    }
    const gx = Math.floor((x - A.gx0) / A.cell), gy = Math.floor((y - A.gy0) / A.cell), h = A.cell / 2;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = gx + dx, Y = gy + dy;
      if (X < 0 || Y < 0 || X >= A.gw || Y >= A.gh) continue;
      for (let j = A.head[Y * A.gw + X]; j >= 0; j = A.next[j]) {
        const qx = x - A.cx[j], qy = y - A.cy[j];
        if (qx < -h || qx >= h || qy < -h || qy >= h) continue;
        const a = Math.min(A.m - 1, Math.floor((qx / A.cell + .5) * A.m)), b = Math.min(A.m - 1, Math.floor((qy / A.cell + .5) * A.m));
        return this.pos(A, j, a, b, out);
      }
    }
    return -1;
  },
  // sorted distances of every soldier from the ring centre (for the honest counter), cached per army + centre
  dists(A, rcx, rcy) {
    const key = A.key + '|' + rcx.toFixed(3);
    if (this._dist && this._dist.key === key) return this._dist.d;
    const d = new Float32Array(A.N), q = [0, 0];
    let n = 0;
    for (let j = 0; j < A.M; j++) for (let a = 0; a < A.m; a++) for (let b = 0; b < A.m; b++) { this.pos(A, j, a, b, q); d[n++] = Math.hypot(q[0] - rcx, q[1] - rcy); }
    d.sort();
    this._dist = { key, d };
    return d;
  },

  // world texture of the continent (land / shore / sea / foam and a tone per cell), cached per army
  tex(p, A) {
    if (A.tex) return A.tex;
    const n = 512, E = A.R * 1.75, X0 = A.ACx - E, Y0 = A.ACy - E, cell = 2 * E / n;
    const typ = new Uint8Array(n * n), tone = new Float32Array(n * n), coastR = an => A.R * 1.22 * (.86 + .3 * p.noise(Math.cos(an) * 2.2 + 3.1, Math.sin(an) * 2.2 - 1.7));
    for (let w = 0; w < n; w++) for (let u = 0; u < n; u++) {
      const x = X0 + (u + .5) * cell, y = Y0 + (w + .5) * cell, dx = x - A.ACx, dy = y - A.ACy, dc = Math.hypot(dx, dy), coast = coastR(Math.atan2(dy, dx)), k = w * n + u;
      if (dc > coast + 4) { const s = p.noise(x * .05, y * .05); typ[k] = dc < coast + 9 && s > .6 ? 3 : 0; tone[k] = s - (dc - coast) / 60; }
      else if (dc > coast) typ[k] = 1;
      else { typ[k] = 2; tone[k] = p.noise(x * .04, y * .04); }
    }
    A.tex = { n, X0, Y0, inv: 1 / cell, typ, tone };
    return A.tex;
  },
  // ground under every pixel (world point, depth, base colour) and the soldier whose feet land in it; cached per camera
  ground(p, A, Fx, Fy, hpx, R) {
    const v = p.v, W = v.W, H = v.H, fs = v.fs;
    const key = [A.key, v.mode, W, H, fs.toFixed(8), Fx.toFixed(4), Fy.toFixed(4), v.yawV, v.OX, v.OY.toFixed(3), p.night ? 1 : 0, v.hue, hpx > 0 ? Math.round(hpx * 100) : 0].join('|');
    let G = this._ground;
    if (G && G.key === key) return G;
    const N0 = W * H;
    if (!G || G.N0 !== N0) G = { N0, ok: new Uint8Array(N0), wx: new Float32Array(N0), wy: new Float32Array(N0), zb: new Float32Array(N0), col: new Uint32Array(N0), typ: new Uint8Array(N0), footI: new Int32Array(N0), footD: new Float32Array(N0), footX: new Float32Array(N0), footY: new Float32Array(N0) };
    G.key = key;
    const T = this.tex(p, A), tn = T.n, bay = PXFX.bayerAt, land = R.land, shore = R.shore, sea = R.sea, ortho = !v.persp;
    // orthographic cameras map pixels to the ground affinely: three inverse projections, then increments
    let ax = 0, ay = 0, ad = 0, xx = 0, xy = 0, xd = 0, yx = 0, yy = 0, yd = 0;
    if (ortho) {
      v.Q(.5, .5, 0); ax = v.qx; ay = v.qy; ad = v.qd;
      v.Q(1.5, .5, 0); xx = v.qx - ax; xy = v.qy - ay; xd = v.qd - ad;
      v.Q(.5, 1.5, 0); yx = v.qx - ax; yy = v.qy - ay; yd = v.qd - ad;
    }
    for (let iy = 0, i = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++, i++) {
      G.footI[i] = -1;
      let qx, qy, qd;
      if (ortho) { qx = ax + ix * xx + iy * yx; qy = ay + ix * xy + iy * yy; qd = ad + ix * xd + iy * yd; }
      else { if (!v.Q(ix + .5, iy + .5, 0)) { G.ok[i] = 0; continue; } qx = v.qx; qy = v.qy; qd = v.qd; }
      const x = qx / fs + Fx, y = qy / fs + Fy, b = bay(ix, iy);
      G.ok[i] = 1; G.wx[i] = x; G.wy[i] = y; G.zb[i] = qd;
      const u = Math.floor((x - T.X0) * T.inv), w = Math.floor((y - T.Y0) * T.inv), inside = u >= 0 && w >= 0 && u < tn && w < tn;
      const ty = inside ? T.typ[w * tn + u] : 0, tone = inside ? T.tone[w * tn + u] : .1;
      if (ty === 2) { G.typ[i] = 2; G.col[i] = land[Math.max(0, Math.min(3, Math.floor(tone * 4 + (b - .5) * .9)))]; }
      else if (ty === 1) { G.typ[i] = 1; G.col[i] = shore[b > .5 ? 1 : 0]; }
      else { G.typ[i] = 0; G.col[i] = ty === 3 ? sea[4] : sea[Math.max(0, Math.min(3, Math.floor(tone * 4 + (b - .5) * .6)))]; }
    }
    if (hpx > 0) {
      const q = [0, 0], m = A.cell;
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (let j = 0; j < A.M; j++) { x0 = Math.min(x0, A.cx[j]); x1 = Math.max(x1, A.cx[j]); y0 = Math.min(y0, A.cy[j]); y1 = Math.max(y1, A.cy[j]); }
      x0 -= m; x1 += m; y0 -= m; y1 += m;
      for (let iy = 0, i = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++, i++) {
        if (!G.ok[i] || G.typ[i] !== 2) continue;
        const x = G.wx[i], y = G.wy[i];
        if (x < x0 || x > x1 || y < y0 || y > y1) continue;
        const s = this.nearest(A, x, y, q);
        if (s < 0 || !v.P(q[0] - Fx, q[1] - Fy, 0) || Math.floor(v.px) !== ix || Math.floor(v.py) !== iy) continue;
        G.footI[i] = s; G.footD[i] = v.pd; G.footX[i] = q[0]; G.footY[i] = q[1];
      }
    }
    this._ground = G;
    return G;
  },

  draw(p, t) {
    const PL = this.palette, v = p.v, X = PXFX;
    const N = Math.round(p.param('crowd')), form = X.TROOPS[p.param('formation') | 0].id;
    const A = this.army(p, N, form), m2 = A.m * A.m;
    // ---- camera: log-scale pull-back, then a rush back in ----
    const K0 = 1.5, KE = 4.5 / A.R, lk0 = Math.log(K0), lkE = Math.log(KE);
    const zo = t < .5 ? 0 : t < 3.3 ? p.ease(p.ph(t, .5, 3.3)) : t < 5.9 ? 1 : 1 - p.ease(p.ph(t, 5.9, 6.8));
    const k = Math.exp(lk0 + (lkE - lk0) * zo), psi = p.smooth(.15, .85, zo);
    const Fx = A.front[0] + (A.ACx - A.front[0]) * psi, Fy = A.front[1] + (A.ACy - A.front[1]) * psi;
    p.worldScale(k);
    // ---- the ring: honest radius over time ----
    const RCx = A.ACx + p.param('offset') * A.R, RCy = A.ACy, rEndF = p.param('ringEnd');
    const D = this.dists(A, RCx, RCy), R0 = D[D.length - 1] + 2 * A.s, rEnd = rEndF * A.R;
    const T0 = 3.75, T1 = 5.0, TR = 5.9;
    const ringR = tt => (tt < T0 ? R0 : tt >= T1 ? rEnd : R0 - (R0 - rEnd) * Math.pow((tt - T0) / (T1 - T0), 2));
    const hitAt = d => (d < rEnd ? null : T0 + (T1 - T0) * Math.sqrt(Math.max(0, (R0 - d) / Math.max(1e-6, R0 - rEnd))));
    const rNow = ringR(t), live = t >= T0 && t < TR + .8;
    // soldier state: 0 alive, else time since hit (respawned soldiers count as alive)
    const respawnAt = i => TR + .5 * this.ih(i, 7);
    // ---- ground + horde shader (one full-frame pass) ----
    const sc = p.clamp(A.s / .4, .08, 1.5), hpx = .62 * sc * v.S * v.fs, shader = hpx < 4.5;
    const night = p.night, hue = v.hue;
    const ramp = arr => X.rampArr(X.rampId(arr), hue);
    const pal = X.PAWN_PALS.red, body = ramp(pal.body), helm = ramp(pal.helm), white = ramp(['#c8c8d8', '#e8e8f2', '#ffffff']), sparkC = ramp(PL.spark), ashC = ramp(PL.scorch);
    const land = ramp(PL.land), shore = ramp(PL.shore), sea = ramp(PL.sea), scorch = ramp(PL.scorch);
    const scorchK = t < T0 ? 0 : t < TR ? 1 : 1 - p.ph(t, TR, TR + .5);
    const G = this.ground(p, A, Fx, Fy, shader ? hpx : 0, { land, shore, sea });
    p.post(({ pix, W, H, kind, zb, bayer }) => {
      const N0 = W * H, ok = G.ok, wx = G.wx, wy = G.wy, base = G.col, typ = G.typ, gz = G.zb, dim = p.night ? .78 : 1;
      const shade = (c, f) => X.rgb((c & 255) * f, (c >> 8 & 255) * f, (c >> 16 & 255) * f);
      const sk = scorchK > 0, r2 = rNow * rNow, rr0 = R0 * R0;
      for (let i = 0; i < N0; i++) {
        if (!ok[i]) continue;
        let c = base[i];
        const ty = typ[i];
        if (ty === 0) { if (Math.sin(wx[i] * .07 + wy[i] * .045 + t * 1.6) > .93 && bayer(i % W, (i / W) | 0) < .5) c = sea[3]; }
        else if (sk && ty === 2) {
          const dx = wx[i] - RCx, dy = wy[i] - RCy;
          const d2 = dx * dx + dy * dy;
          if (d2 >= r2 && d2 < rr0 && bayer(i % W, (i / W) | 0) < scorchK) c = scorch[(this.ih(Math.floor(wx[i] * 3) * 7919 + Math.floor(wy[i] * 3), 9) * 3) | 0];
        }
        pix[i] = dim < 1 ? shade(c, dim) : c; zb[i] = gz[i]; kind[i] = 1;
      }
      if (!shader) return;
      // soldiers: each foot pixel (cached per camera) draws its soldier upwards, rows top to bottom
      const n = Math.max(1, Math.round(hpx)), speck = hpx < 3, hl = body.length - 1, hh = helm.length - 1, fI = G.footI, fD = G.footD, fX = G.footX, fY = G.footY;
      for (let o0 = 0; o0 < N0; o0++) {
        const i = fI[o0];
        if (i < 0) continue;
        const ix = o0 % W, iy = (o0 / W) | 0, d0 = fD[o0];
        let st = 0, th = null;
        if (live) {
          th = hitAt(Math.hypot(fX[o0] - RCx, fY[o0] - RCy));
          if (th != null && t >= th && t < respawnAt(i)) st = t - th + 1e-4;
          else if (th != null && t >= TR && bayer(ix, iy) >= p.ph(t, respawnAt(i), respawnAt(i) + .25)) continue;   // fading back in
        }
        if (st > 0) {
          if (st < .08) { for (let r = 0; r < n && iy - r >= 0; r++) { const o = (iy - r) * W + ix; pix[o] = white[2]; zb[o] = d0 + .03; kind[o] = 4; } }
          else if (st < .55) { const e = (st - .08) / .47 + this.ih(i, 5) * .35; pix[o0] = e < .45 ? sparkC[e < .2 ? 2 : 1] : e < .8 ? sparkC[0] : ashC[3]; kind[o0] = e < .45 ? 3 : 1; }
          else if ((i & 3) === 0) pix[o0] = ashC[2 + (i >> 2 & 1)];
          continue;
        }
        const vr = this.ih(i, 3), hc = vr < (speck ? .4 : .55) ? hh - 1 : vr < (speck ? .62 : .85) ? Math.max(1, hh - 2) : -1;
        for (let r = 0; r < n && iy - r >= 0; r++) {
          const top = r === n - 1, o = (iy - r) * W + ix;
          pix[o] = top && hc >= 0 ? helm[hc] : body[top ? (speck ? 1 : hl) : speck ? 1 : hl - 1]; zb[o] = d0 + .03; kind[o] = 4;
        }
        if (ix + 1 < W && kind[o0 + 1] === 1) pix[o0 + 1] = shade(pix[o0 + 1], .62);
        if (n >= 4 && vr > .93 && iy - n >= 0) pix[(iy - n) * W + Math.min(W - 1, ix + 1)] = helm[hh];
      }
    });
    // ---- close range: real pawns for the soldiers in view ----
    const q = [0, 0];
    if (!shader) {
      const win = 6 * 1.35 / k, S0 = 240 / (2 * 6 * 1.12) * v.fs, full = .62 * sc * S0 >= 7.5, po = { scale: sc, pal, spears: full };
      const draw = full ? p.pawn : p.pawnSprite;
      for (let j = 0; j < A.M; j++) {
        if (Math.abs(A.cx[j] - Fx) > win + A.cell || Math.abs(A.cy[j] - Fy) > win + A.cell) continue;
        for (let a = 0; a < A.m; a++) for (let b = 0; b < A.m; b++) {
          const i = this.pos(A, j, a, b, q);
          if (Math.abs(q[0] - Fx) > win || Math.abs(q[1] - Fy) > win) continue;
          let alpha = 1;
          if (t >= TR) { const th = hitAt(Math.hypot(q[0] - RCx, q[1] - RCy)); if (th != null) alpha = p.ph(t, respawnAt(i) - .05, respawnAt(i) + .2); }
          if (alpha <= 0) continue;
          draw.call(p, { i, vr: this.ih(i, 3), x: q[0] - Fx, y: q[1] - Fy, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: Math.PI + (this.ih(i, 4) - .5) * .3, alpha, walk: null, spear: true }, po);
        }
      }
    }
    // ---- the caster, in front of the first rank ----
    const cxr = A.front[0] - 2.4 - Fx, cyr = A.front[1] - Fy;
    const pose = t < 3.2 ? 'idle' : t < 3.6 ? { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, 3.2, 3.6)) } : t < 5.6 ? 'bothUp' : { a: 'bothUp', b: 'idle', k: p.ease(p.ph(t, 5.6, 6.2)) };
    p.figure(cxr, cyr, { pose, scale: 1 });
    // ---- the world dims while the ring is out ----
    const gk = p.env(t, 3.2, 3.6, 5.6, 6.3);
    if (gk > 0) p.grade({ dark: .32 * gk, desat: .2 * gk, tint: '#5a4a9a', tintAmt: .22 * gk, bg: gk });
    // ---- the ring of light (and its curtain), the sparks, the collapse ----
    const px1 = 1 / (v.S * k), rcx = RCx - Fx, rcy = RCy - Fy;
    if (t >= 3.3 && t < 5.7) {
      const drop = 1 - p.easeOutCubic(p.ph(t, 3.3, T0)), up = rEndF > 0 ? p.easeInCubic(p.ph(t, T1 + .2, T1 + .7)) : 0;
      const z = (drop + up) * .6 * R0, a = p.ph(t, 3.3, 3.45) * (rEndF > 0 ? 1 - p.ph(t, T1 + .5, T1 + .7) : 1 - p.ph(t, T1 - .02, T1 + .05));
      if (a > 0) {
        const I = (1.1 + (t >= T0 && t < T0 + .15 ? .6 * (1 - (t - T0) / .15) : 0)) * a, segs = 72, hc = .12 * R0;
        p.ring(rcx, rcy, z, rNow, 3.5 * px1, PL.halo, I);
        p.light(rcx, rcy, 0, rNow * 1.05, PL.halo, .5 * a * (z < 1 ? 1 : 0));
        // a fence of light rays standing on the ring, flickering
        for (let s = 0; s < segs; s++) {
          const an = (s + .5) / segs * p.TAU, c = Math.cos(an), sn = Math.sin(an), fl = .55 + .45 * p.noise(s * 1.7, t * 5), hh = hc * (.6 + .4 * fl);
          p.line([rcx + c * rNow, rcy + sn * rNow, z], [rcx + c * rNow, rcy + sn * rNow, z + hh], 1.6 * px1, PL.halo, .9 * a * fl, { i1: 0 });
        }
      }
      // sparks: each born where the ring passes, rising for 0.6 s
      const ns = Math.round(420 * p.density);
      for (let s = 0; s < ns; s++) {
        const tb = T0 + (T1 - T0) * p.r(s, 1), age = t - tb;
        if (age < 0 || age > .6 || ringR(tb) < rEnd + 1e-6) continue;
        const an = p.r(s, 2) * p.TAU, rr = ringR(tb) + (p.r(s, 3) - .5) * 6 * px1;
        p.dot(rcx + Math.cos(an) * rr, rcy + Math.sin(an) * rr, p.drag(.35 * R0, 2.5, age) * .25, PL.spark, (1 - age / .6) * 1.2, 1);
      }
    }
    if (rEndF === 0 && t >= T1 - .02 && t < T1 + .8) {
      const a = t - T1, I = 1.6 * Math.pow(1 - p.ph(a, 0, .8), 2), w = (5 - 3 * p.ph(a, 0, .8)) * px1;
      p.line([rcx, rcy, 0], [rcx, rcy, 1.2 * R0], w, PL.pillar, I, { w1: w * .3 });
      p.glow(rcx, rcy, 0, 7 * px1, PL.pillar, I);
      const sr = p.easeOutExpo(p.ph(a, 0, .7)) * .8 * R0;
      p.ring(rcx, rcy, 0, sr, (6 - 4 * p.ph(a, 0, .7)) * px1, PL.pillar, 1.3 * (1 - p.ph(a, .1, .7)));
    }
    // embers over the scorched land
    if (t >= T1 && t < TR + .5) {
      const ne = Math.round(160 * p.density), fade = 1 - p.ph(t, TR, TR + .5);
      for (let e = 0; e < ne; e++) {
        const an = p.r(e, 11) * p.TAU, rr = Math.sqrt(p.r(e, 12)) * R0, tw = Math.sin(t * (6 + 5 * p.r(e, 13)) + e) * .5 + .5;
        if (rr < rEnd) continue;
        p.dot(rcx + Math.cos(an) * rr, rcy + Math.sin(an) * rr, 0, PL.spark, .7 * tw * fade, 1);
      }
    }
    p.worldScale(1);
    // ---- the honest counter: soldiers with distance ≥ ring radius, by binary search ----
    if (p.param('tally')) {
      let dead = 0, last = T1;
      if (t >= T0) {
        let lo = 0, hi = D.length;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (D[mid] < rNow) lo = mid + 1; else hi = mid; }
        dead = D.length - lo;
        let lo2 = 0, hi2 = D.length;
        while (lo2 < hi2) { const mid = (lo2 + hi2) >> 1; if (D[mid] < rEnd) lo2 = mid + 1; else hi2 = mid; }
        if (lo2 < D.length) last = hitAt(D[lo2]) ?? T1;
      }
      p.tally(null, { t, total: A.N, dead, last, alpha: 1 - p.ph(t, TR, TR + .2) });
    }
  },
});
