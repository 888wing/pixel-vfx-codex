// 星落如雨 / Starfall Storm — Scale Ladder pack (original design), tier 10000: a night sky draws over the field and a thickening downpour of shooting stars pits the whole army with glowing craters
PXFX.define({
  id: 'starfall-storm',
  loop: 6,
  beats: [{ t: 1.3, kind: 'cast', power: .8 }, { t: 1.78, kind: 'pulse', power: .5 }, { t: 3.84, kind: 'hit', power: 1.3 }],
  view: { r: 6.6, h: 3.8 },
  stage: { ground: 'grass' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'troops', 'tally', 'impact', 'aftermath'],
  palette: {
    star: ['#3b3a9e', '#4f5fd0', '#7f9cf0', '#b8c8ff', '#e4ecff', '#ffffff'],
    rune: ['#4a3a9a', '#7a6ad8', '#b8acff', '#f0ecff'],
    night: ['#1a2140', '#212a4c', '#293358', '#323d64'],
    pit: ['#07060e'],
  },
  timeline: [
    { k: 'pose', t: [0, .9], zh: '起手：施法者（縮放 0.7，站在 x = -5.2 的場邊）由站姿用 0.6 秒回彈緩動高舉雙手；萬人大軍（預設 10000 個 1–2 像素的金盔小兵，散兵陣）鋪滿中心 (0.8, 0)、半徑 3.8 的圓形範圍', en: 'pose: the caster (scale 0.7, at the field edge x = -5.2) raises both arms with a 0.6 s overshoot ease; an army of 10000 gold-helmeted 1–2 px soldiers (scatter formation) fills a circle of radius 3.8 around (0.8, 0)' },
    { k: 'charge', t: [.35, 1.3], zh: '集氣：天空由大軍上方以抖色圓形擦除換成深藍星空（1.0 秒），地面壓暗成夜色；空中 7 顆亮星逐顆閃現並連成星座；12 道藍白光點匯聚到雙手；敵兵抬頭發抖', en: 'charge: the sky wipes (dithered circle, 1.0 s) from above the army into a deep blue starfield and the ground darkens to night; 7 bright stars blink on one by one high above and link into a constellation; 12 blue-white streaks converge on the hands; the soldiers look up and tremble' },
    { k: 'shape', t: [1.3, 1.8], zh: '成形：1.3 秒施法者張開雙臂，一道光柱由雙手射上天空，星座閃亮；每個落點在命中前 0.3 秒於地上浮現一圈半徑 = 星坑半徑（0.35）的淡藍細環作預告', en: 'shape: at 1.3 s the caster spreads both arms, a pillar of light shoots from the hands into the sky and the constellation flares; 0.3 s before each impact a thin pale blue ring of radius = crater radius (0.35) fades in on the ground as its telegraph' },
    { k: 'motion', t: [1.3, 3.85], zh: '推進：流星由右上後方（方向 (0.7, 0.2, 1)）斜斜劃落，起點在畫面外 12 單位，0.38–0.52 秒內加速落地；每顆是一條藍白短光線（長 0.35–1.45，越快越長）加一點亮頭；落點是覆蓋大軍範圍（半徑 3.95）的抖動向日葵格（黃金角 137.5°，共「流星數量」400 格，每格隨機偏移 ±0.15 格距），落地次序隨機，第 k 顆的落地時間 = 1.78 + 2.07 ×（k ÷ 總數）^(1 ÷ 2.3)，所以先疏後密、越落越快', en: 'motion: shooting stars streak down at a slant from the upper back (direction (0.7, 0.2, 1)), starting 12 units away outside the frame and accelerating to the ground in 0.38–0.52 s; each is a short blue-white streak (0.35–1.45 long, longer when faster) with a bright head dot; the impact points are a jittered sunflower grid (golden angle 137.5°, "star count" 400 cells, each offset ±0.15 of the spacing) covering the army (radius 3.95), landing in random order: impact k lands at 1.78 + 2.07 × (k / total)^(1 / 2.3), sparse at first, then a downpour' },
    { k: 'impact', t: [1.78, 3.9], zh: '命中：每顆落地時閃白核心 0.1 秒、光環 0.06 秒內擴到星坑半徑、噴 3 粒火星；判定：與任一落點距離 ≤ 星坑半徑（0.35）即命中，命中時間 = 最早覆蓋它的落點時間 + 距離 ÷ 半徑 × 0.06；距落點 0.15 × 半徑內的敵兵被壓扁，其餘沿落點向外拋到坑邊（距落點 1.02–1.16 × 半徑，0.22–0.36 秒小拋物線後躺下），坑底留空，0.05 秒後燒成焦黑；3.84 秒最後一批落地、最密時頓幀，擊殺計數同時轉金色', en: 'impact: each star flashes a white core for 0.1 s, a ring expands to the crater radius in 0.06 s and 3 sparks fly; test: hit if the distance to any impact point ≤ crater radius (0.35), hit time = the earliest covering impact + distance / radius × 0.06; soldiers within 0.15 × radius of the impact are crushed, the rest are thrown out to the crater rim (1.02–1.16 × radius from the impact, a 0.22–0.36 s low arc, then lying down) so the pit is left bare, and they are charred after 0.05 s; hit-stop at 3.84 s as the last, densest wave lands and the kill counter turns gold' },
    { k: 'after', t: [3.9, 6], zh: '餘波：星坑（中心深坑、外圈亮邊）由白藍冷卻成暗紫光（約 0.45 秒半衰），整片戰場佈滿坑洞；4.35–5.05 秒焦屍淡出，4.7–5.5 秒星空與星坑淡出，4.95–5.85 秒新一批大軍原地淡入，施法者放下雙手', en: 'aftermath: the craters (dark pit, bright rim) cool from white-blue to dim violet (half-life ~0.45 s), leaving the whole field pockmarked; the charred bodies fade at 4.35–5.05 s, the starfield and craters fade at 4.7–5.5 s, a fresh army fades in on the spot at 4.95–5.85 s and the caster lowers the arms' },
  ],
  layers: [
    { zh: '大軍與陣型：p.crowd 以「敵兵數量」（2000–12000，預設 10000）和陣型（預設散兵）排在中心 (0.8, 0)、半徑 3.8 × 3.8 的範圍，scale 自動、遠景 LOD 成 1–2 像素的金盔像素兵（頭盔深淺隨機），一萬人時是一片頭盔海；角落擊殺計數（骷髏＋已擊殺／總數）即時累加，全滅時變金色', en: 'army and formation: p.crowd with "enemy count" (2000–12000, default 10000) in the chosen formation (default scatter) inside a 3.8 × 3.8 area around (0.8, 0), auto scale, far LOD as 1–2 px gold-helmeted pixel soldiers with random helmet shades, a sea of helmets at ten thousand; the corner kill counter (skull + killed/total) counts up live and turns gold on a full wipe' },
    { zh: '判定與倖存者：落點 = 向日葵格（第 k 格半徑 = 3.95 × √((k + 0.5) ÷ N)、角度 = k × 137.5°，再偏移 ±0.15 格距）；敵兵與任一落點距離 ≤ 星坑半徑即死，命中時間取最早的那一顆；預設 400 顆、格距約 0.35，格距 × 0.75 < 半徑 0.35，所以全場覆蓋；流星太少或半徑太小時坑與坑之間留空，空隙中的敵兵繼續站著；陣型伸出半徑 3.95 以外的部分也會倖存', en: 'area test and survivors: impact points = a sunflower grid (cell k at radius 3.95 × √((k + 0.5) / N), angle k × 137.5°, then jittered ±0.15 of the spacing); a soldier dies if it is within crater radius of any impact, at the earliest such impact; at the default 400 stars the spacing is ~0.35 and spacing × 0.75 < radius 0.35, so coverage is complete; with fewer stars or a smaller radius the gaps between craters survive, and so does any part of a formation that sticks out past radius 3.95' },
    { zh: '流星：只畫正在下落的那些（預設約 200 顆、800 顆時約 400 顆同時在空中）；每顆 = 一條由頭到尾漸細漸暗的光線（寬 0.07 → 0.012）＋頭部 1 像素亮點（每 7 顆一顆 2 像素的大星），方向每顆隨機偏 ±0.12', en: 'stars: only the ones falling at time t are drawn (about 200 in the air at once at the default, ~400 at 800); each = a light line tapering and dimming from head to tail (width 0.07 → 0.012) plus a 1 px bright head (every 7th a 2 px hero star), each direction jittered by ±0.12' },
    { zh: '星坑：所有落點放入邊長 = 半徑 + 0.08 的格網，地面每像素只查 3 × 3 格；暗色污漬（中心深坑 < 0.42 × 半徑、外圈較淺）一次畫完；同一次光貼圖畫落地前 0.3 秒的預告細環、落地閃光、擴散光環和冷卻中的亮邊', en: 'craters: all impact points go into a grid of cell size radius + 0.08 and each ground pixel looks up only 3 × 3 cells; one dark stain pass (deep pit < 0.42 × radius, lighter rim) and one light decal pass for the 0.3 s telegraph rings, the landing flash, the expanding ring and the cooling rims' },
    { zh: '天空：領域模組把頁面換成深藍星空（#03040e → #11163a，暗紫星雲，2.6% 像素是星）、地面換成夜色藍 4 階（#1a2140 → #323d64），兵身變暗 12%；結束時抖色淡出', en: 'sky: the domain module swaps the page for a deep blue starfield (#03040e → #11163a, dim violet nebula, 2.6% of pixels are stars) and remaps the ground to 4 night blues (#1a2140 → #323d64), darkening the soldiers by 12%; it dithers out at the end' },
    { zh: '施法者與星座：雙手集氣光點、張臂瞬間一道上天光柱（寬 0.16、0.4 秒消失）；7 顆星座亮星（四角星）與連線在空中閃亮後淡出', en: 'caster and constellation: motes gathering into the hands, a pillar of light into the sky when the arms spread (width 0.16, gone in 0.4 s); 7 four-point constellation stars and their links flare high in the sky, then fade' },
    { zh: '中招反應（自訂）：坑心 0.15 × 半徑內壓扁，其餘被拋到坑邊躺下並轉成焦黑材質；每顆落地噴 3 粒藍白火星（阻力減速、重力落下，0.4 秒），下雨時地面一層淡藍星光；坑邊一圈屍體＋空坑令整片戰場佈滿坑洞', en: 'hit reaction (custom): flattened within 0.15 × radius of the centre, everyone else thrown to the crater rim, lying down in the charred material; 3 blue-white sparks per impact (drag, then gravity, 0.4 s) and a faint blue starlight over the ground during the storm; rims of bodies around bare pits make the whole field look pitted' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 7, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    stars: { zh: '流星數量', en: 'star count', min: 60, max: 800, step: 10, value: 400 },
    radius: { zh: '星坑半徑', en: 'crater radius', min: .15, max: .6, step: .05, value: .35 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  SKY: { top: '#03040e', bottom: '#11163a', nebula: '#262058', neb2: '#0e2250', stars: .026, star: '#ffffff' },
  ZONE: { x: .8, y: 0, r: 3.95 },          // impact zone: the army area plus a small margin
  T0: 1.78, T1: 3.85, Q: 2.3, PRE: .3, L0: 12,
  DIR: [.7, .2, 1],
  // impact layout, per-unit hit times and the crater grid; cached per layout / star count / radius
  plan(p, units, N, R) {
    const c = this._pl;
    if (c && c.units === units && c.N === N && c.R === R) return c;
    const Z = this.ZONE, T0 = this.T0, T1 = this.T1, s = Math.sqrt(Math.PI * Z.r * Z.r / N);
    const ix = new Float64Array(N), iy = new Float64Array(N), it = new Float64Array(N), fd = new Float64Array(N);
    const dx = new Float64Array(N), dy = new Float64Array(N), dz = new Float64Array(N);
    for (let k = 0; k < N; k++) {
      const rr = Z.r * Math.sqrt((k + .5) / N), a = k * 2.399963;
      ix[k] = Z.x + Math.cos(a) * rr + (p.r(k, 12) - .5) * .3 * s;
      iy[k] = Z.y + Math.sin(a) * rr + (p.r(k, 13) - .5) * .3 * s;
      const d = p.v3.norm([this.DIR[0] + (p.r(k, 14) - .5) * .24, this.DIR[1] + (p.r(k, 15) - .5) * .24, this.DIR[2]]);
      dx[k] = d[0]; dy[k] = d[1]; dz[k] = d[2];
      fd[k] = .38 + .14 * p.r(k, 16);
    }
    // random landing order with an accelerating rate: rank k lands at T0 + (T1 - T0) * (k / (N - 1))^(1 / Q)
    const ord = Array.from({ length: N }, (_, k) => k).sort((a, b) => p.r(a, 11) - p.r(b, 11));
    ord.forEach((k, rank) => { it[k] = T0 + (T1 - T0) * Math.pow(rank / Math.max(1, N - 1), 1 / this.Q); });
    const byT = Int32Array.from(Array.from({ length: N }, (_, k) => k).sort((a, b) => it[a] - it[b]));
    // grid of impacts (cell >= the largest query distance), each cell sorted by landing time
    const cs = R + .08, gx0 = Z.x - Z.r - 2 * cs, gy0 = Z.y - Z.r - 2 * cs, gn = Math.ceil((2 * Z.r + 4 * cs) / cs);
    const cells = Array.from({ length: gn * gn }, () => []);
    for (const k of byT) cells[Math.floor((iy[k] - gy0) / cs) * gn + Math.floor((ix[k] - gx0) / cs)].push(k);
    const start = new Int32Array(gn * gn + 1), idx = new Int32Array(N);
    let m = 0;
    cells.forEach((l, j) => { start[j] = m; for (const k of l) idx[m++] = k; });
    start[gn * gn] = m;
    // honest hit: the earliest impact within R of the unit, plus a short ring delay
    const hit = new Float64Array(units.length).fill(-1), dist = new Float64Array(units.length), at = new Array(units.length);
    const def = [Z.x, Z.y, 0];
    for (const u of units) {
      const cx = Math.floor((u.x - gx0) / cs), cy = Math.floor((u.y - gy0) / cs);
      let best = Infinity, bk = -1, bd = 0;
      for (let b = cy - 1; b <= cy + 1; b++) for (let a = cx - 1; a <= cx + 1; a++) {
        if (a < 0 || b < 0 || a >= gn || b >= gn) continue;
        const j = b * gn + a;
        for (let q = start[j]; q < start[j + 1]; q++) {
          const k = idx[q], d = Math.hypot(u.x - ix[k], u.y - iy[k]);
          if (d > R) continue;
          const th = it[k] + d / R * .06;
          if (th < best) { best = th; bk = k; bd = d; }
        }
      }
      if (bk >= 0) { hit[u.i] = best; dist[u.i] = bd; at[u.i] = [ix[bk], iy[bk], 0]; } else at[u.i] = def;
    }
    this._pl = { units, N, R, ix, iy, it, fd, dx, dy, dz, byT, cs, gx0, gy0, gn, start, idx, hit, dist, at, s };
    return this._pl;
  },
  // first index in byT whose landing time is >= t
  lower(pl, t) {
    let lo = 0, hi = pl.byT.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (pl.it[pl.byT[m]] < t) lo = m + 1; else hi = m; }
    return lo;
  },
  draw(p, t) {
    const PL = this.palette, S = PL.star, Z = this.ZONE, T0 = this.T0, T1 = this.T1, CAST = 1.3, PRE = this.PRE;
    const N = Math.round(p.param('stars')), R = p.param('radius');
    // ---- caster at the near edge ----
    let pose;
    if (t < .3) pose = 'idle';
    else if (t < 1.22) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(p.ph(t, .3, .9), 1.3) };
    else if (t < 4.1) pose = { a: 'bothUp', b: 'spread', k: p.easeOutCubic(p.ph(t, 1.22, 1.32)) };
    else pose = { a: 'spread', b: 'idle', k: p.ease(p.ph(t, 4.1, 4.9)) };
    const fig = p.figure(-5.2, 0, { pose, scale: .7 });
    // ---- the army ----
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const co = { n: Math.round(p.param('crowd')), seed: 3, formation: form, area: this.AREA };
    const units = p.crowdLayout(co), pl = this.plan(p, units, N, R);
    // blast reaction: flattened at the very centre, everyone else thrown out to the crater rim (the pit is left bare)
    const react = (s, a, u, pp, o) => {
      const d = pl.dist[u.i];
      if (d < .15 * R) PXFX.REACT.crush(s, a, u, pp, o);
      else {
        const D = Math.max(0, R * (1.02 + .14 * u.r2) - d), T = .22 + .14 * u.r3, k = p.ph(a, 0, T), e = p.easeOut(k);
        s.x += s.tdir[0] * D * e; s.y += s.tdir[1] * D * e; s.z = 4 * (.04 + .3 * D) * k * (1 - k);
        s.tilt = (Math.PI / 2 + (d < .5 * R ? p.TAU : 0)) * e; s.walk = null; s.spear = false;
      }
      if (a > .05) s.mat = 'char';
    };
    const fearK = p.env(t, .9, 1.6, 3.9, 4.5) * .7;
    const st = p.crowd(Object.assign(co, {
      t, scale: 'auto', pal: 'gold', enter: 'fade', power: .7, react, fear: fearK,
      hit: u => (pl.hit[u.i] >= 0 ? pl.hit[u.i] : null), at: u => pl.at[u.i],
      respawn: [4.95, 5.85], clear: [4.35, 5.05],
    }));
    // ---- night sky: radial wipe in from above the army, dithered fade out ----
    const skyIn = p.easeOutCubic(p.ph(t, .35, 1.35)), skyOut = 1 - p.ph(t, 4.7, 5.5);
    if (skyIn > 0 && skyOut > 0) p.domain({ amt: t < 2 ? skyIn : skyOut, fade: t >= 2, c: [Z.x, Z.y, 4], sky: this.SKY, ground: PL.night, solids: .12, t: 0 });
    // ---- craters: one stain pass (pits) over the zone, looked up in the impact grid ----
    const crK = 1 - p.ph(t, 4.7, 5.5);
    const { ix, iy, it, cs, gx0, gy0, gn, start, idx } = pl;
    if (t > T0 && crK > 0) {
      p.stain(Z.x, Z.y, Z.r + R, (lx, ly) => {
        const wx = lx + Z.x, wy = ly + Z.y, cx = Math.floor((wx - gx0) / cs), cy = Math.floor((wy - gy0) / cs);
        let best = R * R;
        for (let b = cy - 1; b <= cy + 1; b++) for (let a = cx - 1; a <= cx + 1; a++) {
          const j = b * gn + a;
          for (let q = start[j]; q < start[j + 1]; q++) {
            const k = idx[q];
            if (it[k] > t) break;
            const ddx = wx - ix[k], ddy = wy - iy[k], d2 = ddx * ddx + ddy * ddy;
            if (d2 < best) best = d2;
          }
        }
        if (best >= R * R) return 0;
        const dn = Math.sqrt(best) / R;
        return dn < .42 ? 1 : dn < .58 ? .62 : dn < .88 ? .2 : .42;
      }, PL.pit[0], crK);
    }
    // ---- light: hands, pillar, constellation ----
    if (t > .35 && t < CAST + .1) {
      const ch = p.ph(t, .35, CAST), hz = Math.max(fig.hand[2], fig.handL[2]) + .1;
      p.charge((fig.hand[0] + fig.handL[0]) / 2, (fig.hand[1] + fig.handL[1]) / 2, hz, ch, { n: 12, R: 1, ramp: S, up: .5 });
      p.glow(fig.hand[0], fig.hand[1], fig.hand[2], .12 + .1 * ch, S, .8 * ch);
      p.glow(fig.handL[0], fig.handL[1], fig.handL[2], .12 + .1 * ch, S, .8 * ch);
    }
    if (t >= CAST && t < CAST + .4) {
      const u = p.ph(t, CAST, CAST + .4), hx = (fig.hand[0] + fig.handL[0]) / 2, hy = (fig.hand[1] + fig.handL[1]) / 2, hz = fig.head[2] + .1;
      p.line([hx, hy, hz], [hx + .4, hy, hz + 9], .16 * (1 - u) + .03, S, 1.3 * (1 - u), { w1: .04 });
      p.glow(hx, hy, hz, .5, S, 1 - u);
    }
    const cst = p.env(t, .55, 1.0, 1.6, 2.4);
    if (cst > 0) {
      const pts = this.CONST, lit = [];
      pts.forEach((q, k) => {
        const on = p.ph(t, .6 + k * .07, .75 + k * .07), fl = t >= CAST && t < CAST + .3 ? 1.4 : 1;
        if (on > 0) { p.sparkle(q[0], q[1], q[2], 2 + (k % 3 === 0 ? 1 : 0), S, 1.1 * on * cst * fl); lit.push(k); }
      });
      const lk = p.ph(t, 1.0, 1.3) * cst;
      if (lk > 0) for (const [a, b] of this.LINKS) p.line(pts[a], pts[b], .03, PL.rune, .55 * lk * (t >= CAST && t < CAST + .3 ? 1.6 : 1));
    }
    // ---- crater light: telegraph rings, landing flash, expanding ring, cooling rims (one decal pass) ----
    if (t > T0 - PRE && crK > 0) {
      p.decal(Z.x, Z.y, 0, Z.r + R + .05, (lx, ly) => {
        const wx = lx + Z.x, wy = ly + Z.y, cx = Math.floor((wx - gx0) / cs), cy = Math.floor((wy - gy0) / cs);
        let v = 0;
        for (let b = cy - 1; b <= cy + 1; b++) for (let a = cx - 1; a <= cx + 1; a++) {
          const j = b * gn + a;
          for (let q = start[j]; q < start[j + 1]; q++) {
            const k = idx[q], age = t - it[k];
            if (age < -PRE) break;
            if (age > 1.6) continue;
            const ddx = wx - ix[k], ddy = wy - iy[k], d2 = ddx * ddx + ddy * ddy;
            if (d2 > (R + .05) * (R + .05)) continue;
            const d = Math.sqrt(d2) / R;
            let w;
            if (age < 0) w = .34 * (1 + age / PRE) * Math.max(0, 1 - Math.abs(d - 1) / .14);
            else {
              const heat = Math.exp(-age / .45), re = .3 + .7 * p.easeOutExpo(age / .06);
              w = Math.max(
                age < .1 && d < 1 ? 1.4 * (1 - age / .1) * (1 - d * .6) : 0,
                age < .16 ? 1.2 * (1 - age / .16) * Math.max(0, 1 - Math.abs(d - re) / .16) : 0,
                d < 1 ? heat * (.95 * Math.max(0, 1 - Math.abs(d - .72) / .2) + (d < .35 ? .45 : 0)) : 0);
            }
            if (w > v) v = w;
          }
        }
        return v;
      }, S, crK);
    }
    // ---- falling stars (only those in the air at t) and impact flashes / sparks ----
    const L0 = this.L0;
    for (let q = this.lower(pl, t), n = pl.byT.length; q < n; q++) {
      const k = pl.byT[q], ttl = pl.it[k] - t;
      if (ttl > .52) break;
      if (ttl > pl.fd[k]) continue;
      const u = 1 - ttl / pl.fd[k], rem = L0 * (1 - Math.pow(u, 1.6)), tail = .35 + 1.1 * Math.pow(u, .6);
      const hx = ix[k] + pl.dx[k] * rem, hy = iy[k] + pl.dy[k] * rem, hz = pl.dz[k] * rem;
      p.line([hx, hy, hz], [hx + pl.dx[k] * tail, hy + pl.dy[k] * tail, hz + pl.dz[k] * tail], .07, S, 1.15, { w1: .012, i1: .12 });
      p.dot(hx, hy, hz, S, 1.3, k % 7 === 0 ? 2 : 1);
    }
    const nSp = Math.max(1, Math.round(3 * p.density));
    for (let q = this.lower(pl, t - .4), n = pl.byT.length; q < n; q++) {
      const k = pl.byT[q], age = t - pl.it[k];
      if (age < 0) break;
      if (age < .08) p.glow(ix[k], iy[k], .12, R * .8, S, 1.2 * (1 - age / .08));
      for (let j = 0; j < nSp; j++) {
        const id = k * 5 + j, d = p.rdir(id, 41, .9), sp = 1.2 + 1.4 * p.r(id, 42), dd = p.drag(sp, 5, age);
        const z = Math.max(0, d[2] * dd * 1.4 - 2.2 * age * age);
        p.dot(ix[k] + d[0] * dd, iy[k] + d[1] * dd, z + .03, S, 1.1 * (1 - age / .4));
      }
    }
    // faint starlight on the ground while the storm lasts
    const rain = p.ph(t, T0 - .2, T0 + .6) * (1 - p.ph(t, T1, T1 + 1));
    if (rain > 0) p.light(Z.x, Z.y, 0, Z.r + 1, S, .35 * rain);
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, .2, .6) * (1 - p.ph(t, 4.35, 4.85)) });
  },
  // constellation high above the back of the field, and its links
  CONST: [[2.6, -3.6, 4.6], [3.6, -2.2, 5.0], [3.2, -.4, 4.4], [4.4, .8, 4.8], [3.4, 2.2, 4.2], [4.6, 3.2, 4.5], [2.4, 3.6, 4.9]],
  LINKS: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [1, 3]],
});
