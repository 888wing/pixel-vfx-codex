// 浮符矩陣 / Floating Rune Matrix — pixel version of 00GameDevs "arcane-matrix" (MIT)
PXFX.define({
  id: 'arcane-matrix',
  loop: 4.4,
  beats: [{ t: .02, kind: 'cast', power: .5 }, { t: .56, kind: 'pulse', power: .5 }, { t: 1.5, kind: 'pulse', power: .65 }, { t: 2.5, kind: 'pulse', power: .65 }],
  view: { r: 2.4, h: 1.9 },
  stage: { ground: 'void', shape: 'square' },
  palette: {
    arcane: ['#6a4fb8', '#8c6ed8', '#bd9aff', '#d9c4ff', '#f2eaff', '#ffffff'],
    tile: ['#5c46a6', '#7d63cc', '#a585f0', '#cdb5ff', '#f4eeff'],
  },
  timeline: [
    { t: [0, .56], zh: '方格陣分成 4 條橫條，左右交替、逐條相隔 0.09 秒急速滑入（0.26 秒，衝過頭約 10% 再回彈對齊），0.56 秒全部鎖定時整個方陣閃亮一下', en: 'the grid arrives as 4 strips shooting in from alternating sides 0.09 s apart (0.26 s each, overshooting ~10% and snapping back); at 0.56 s the locked matrix flashes' },
    { t: [.62, 1], zh: '6 塊符文方牌逐塊由格子中心彈出：由地面急升到 0.5–0.8 高並由 0 放大（略超過再回彈）', en: '6 rune tiles pop out of their cells one by one: they shoot up to 0.5–0.8 height and scale from 0 with a slight overshoot' },
    { t: [1, 2.5], zh: '重新排隊（1 秒、2 秒各一次）：方牌逐塊錯開起跳，以拋物線跳向另一個空格（不重疊），起跳越晚飛得越快，全部在 +0.5 秒同一刻落地；落地時方牌壓扁再回彈、落點格子打出一圈向外擴的方框並亮起內框，符號更換，整個方陣閃亮', en: 're-shuffle at 1 s and 2 s: tiles take off one after another and hop in parabolic arcs to free cells (no overlaps), later tiles fly faster so all land together at +0.5 s; on landing each tile squashes and springs back, its cell stamps an expanding square and lights an inner frame, the glyph changes, the whole matrix flashes' },
    { t: [3.2, 4], zh: '收尾：方牌加速向上飛走並縮小，4 條橫條先往內縮一下再加速向兩側滑開並消失', en: 'end: the tiles accelerate upward and shrink away, the strips wind back slightly, then accelerate out to the sides and vanish' },
  ],
  layers: [
    { zh: '地面方陣：邊長 2.6、4×4 格；外框雙線（粗＋細），格線中等亮，半格虛線最暗，四角 L 形角標', en: 'ground matrix: 2.6 wide, 4x4 cells; double outer frame (thick + thin), medium cell lines, faint dashed half-cell lines, L-shaped corner marks' },
    { zh: '符文方牌：面向鏡頭的 0.46 方牌，亮邊框＋5×5 方塊符文，高度 0.5–0.8 上下浮動', en: 'rune tiles: camera-facing 0.46 squares with a bright border and a 5x5 blocky glyph, bobbing at 0.5–0.8 height' },
    { zh: '牽引光點：每塊方牌下方一串點狀光線連到所在格子中心', en: 'tether: a dotted light line drops from each tile to the centre of its cell' },
    { zh: '格子高亮：方牌所在格子出現內框與四個角點；落地時內框外再擴出一圈方框（ease-out-expo）並淡出', en: 'cell highlight: the occupied cell shows an inset frame with 4 corner dots; a landing stamps a square that expands outward (ease-out-expo) and fades' },
    { zh: '浮塵：方陣四周 12 粒小光點起飛快、之後慢慢上飄', en: 'dust: 12 small motes around the matrix lift off fast, then drift up' },
  ],
  params: {
    size: { zh: '方陣大小（半邊長）', en: 'matrix half-size', min: .9, max: 1.7, step: .05, value: 1.3 },
    cells: { zh: '每邊格數', en: 'cells per side', min: 3, max: 6, step: 1, value: 4 },
    tiles: { zh: '符文方牌數量', en: 'rune tiles', min: 1, max: 12, step: 1, value: 6 },
    hopHeight: { zh: '跳躍高度', en: 'hop height', min: 0, max: 1, step: .05, value: .4 },
  },
  draw(p, t) {
    const C = this.palette.arcane, T = this.palette.tile;
    const H = p.param('size'), N = Math.round(p.param('cells')), CELL = 2 * H / N, hopH = p.param('hopHeight');
    const NT = Math.max(1, Math.min(Math.round(p.param('tiles')), N * N - 1));
    const end = p.ph(t, 3.2, 4), fade = 1 - p.easeInCubic(p.ph(end, .35, 1));
    if (t < .02 || fade < .06) return;
    // strips: shoot in with overshoot; at the end wind back, then accelerate out
    const stag = .36 / N, offs = [], vis = [];
    for (let j = 0; j < N; j++) {
      const dir = j % 2 ? 1 : -1, t0 = .02 + j * stag, t1 = 3.2 + (N - 1 - j) * .06;
      offs.push(dir * ((1 - p.easeOutBack(p.ph(t, t0, t0 + .26), 1.6)) * 1.4 + p.easeInBack(p.ph(t, t1, t1 + .55), 1.4) * 1.8));
      vis.push(p.ph(t, t0, t0 + .12));
    }
    let flare = 0;
    for (const tp of [.56, 1.5, 2.5]) { const d = t - tp; if (d >= 0 && d < .6) flare = Math.max(flare, Math.pow(1 - d / .6, 3)); }
    // tiles: re-shuffle at 1 s and 2 s; staggered take-off, everyone lands together at +0.5 s
    const perm = s => [...Array(N * N).keys()].sort((a, b) => p.r(a + s * 31 + N * 97, 7) - p.r(b + s * 31 + N * 97, 7));
    const sIdx = t >= 2 ? 2 : t >= 1 ? 1 : 0, P0 = perm(Math.max(0, sIdx - 1)), P1 = perm(sIdx), age = t - sIdx;
    const cx = i => -H + CELL * ((i % N) + .5), cy = i => -H + CELL * (Math.floor(i / N) + .5);
    const land = sIdx > 0 ? age - .5 : -1, stamp = land >= 0 && land < .45 ? land / .45 : -1;
    const tiles = [];
    for (let k = 0; k < NT; k++) {
      const a = P0[k], b = P1[k];
      let u = 1;
      if (sIdx > 0) { const t0 = NT > 1 ? k / (NT - 1) * .3 : 0; u = p.ph(age, t0, .5); }
      const e = u * u * (3 - 2 * u);
      tiles.push({ x: p.lerp(cx(a), cx(b), e), y: p.lerp(cy(a), cy(b), e), hop: 4 * u * (1 - u), cell: u > .85 ? b : a, glyph: k * 13 + (u >= 1 ? sIdx : sIdx - 1) });
    }
    const lit = new Set(tiles.map(o => o.cell));
    const grid = (x, y) => {
      const ax = Math.abs(x), ay = Math.abs(y), m = Math.max(ax, ay);
      if (m > H + .14) return 0;
      let v = 0;
      if (Math.abs(m - H) < .04) v = 1;
      else if (Math.abs(m - (H - .1)) < .02) v = .55;
      else if (m > H + .06 && (ax > H - .25 && ay > H - .25)) v = .85;        // corner marks
      if (m > H - .1) return v;
      const fx = (x + H) / CELL, fy = (y + H) / CELL, gx = fx - Math.round(fx), gy = fy - Math.round(fy);
      if (Math.abs(gx) * CELL < .018 || Math.abs(gy) * CELL < .018) return .62;
      const hx = Math.abs(fx % 1 - .5) * CELL, hy = Math.abs(fy % 1 - .5) * CELL;
      if ((hx < .012 && (fy * 6) % 1 < .5) || (hy < .012 && (fx * 6) % 1 < .5)) v = .38;
      const id = Math.floor(fy) * N + Math.floor(fx);
      if (lit.has(id)) {
        const lx = Math.abs(fx % 1 - .5), ly = Math.abs(fy % 1 - .5), lm = Math.max(lx, ly);
        if (Math.abs(lm - .36) < .03) v = .9 + .3 * flare;
        if (lx > .24 && ly > .24 && lm < .3) v = 1;
      }
      return v;
    };
    p.light(0, 0, .3, H + .9, C, (.45 + .3 * flare) * fade * vis[N - 1]);
    const maxOff = Math.max(...offs.map(Math.abs));
    p.decal(0, 0, 0, H * 1.42 + .2 + maxOff, (x, y) => {
      const j = Math.max(0, Math.min(N - 1, Math.floor((y + H) / CELL)));
      if (!vis[j]) return 0;
      return grid(x - offs[j], y) * vis[j] * (1 + .35 * flare);
    }, C, .95 * fade);

    // tiles, tethers
    const ts = CELL / .65;
    for (let k = 0; k < tiles.length; k++) {
      const o = tiles[k], pop = p.ph(t, .62 + k * .04, .9 + k * .04), tin = p.easeOutBack(pop, 2), tout = p.ph(t, 3.2 + k * .03, 3.65 + k * .03);
      if (pop <= 0 || tout >= 1) continue;
      const sq = land >= 0 && land < .25 ? Math.pow(1 - land / .25, 2) * Math.cos(land * 40) : 0;     // landing squash, springing back
      const z = (.5 + .15 * Math.sin(t * 2.2 + k * 1.3)) * tin + o.hop * hopH + p.easeInCubic(tout) * 1.8;
      const s = Math.max(0, tin) * (1 - p.easeInCubic(tout)), I = Math.min(1, pop * 3) * (1 - tout * .5);
      if (s < .08) continue;
      p.card(o.x, o.y, z, .46 * ts * s * (1 + .22 * sq), .46 * ts * s * (1 - .22 * sq), (u, v) => {
        const m = Math.max(Math.abs(u), Math.abs(v));
        if (m > .8) return .95;
        if (m > .66) return 0;
        return p.rune(u * .78 + .5, v * .78 + .5, o.glyph) ? 1 : .32;
      }, T, I * (1 + .3 * Math.max(0, sq)));
      for (let d = 1; d < 7; d++) {
        const zz = z - .2 - d * (z - .2) / 7;
        if (zz > .05 && (d + Math.floor(t * 10)) % 2) p.dot(o.x, o.y, zz, C, .6 * I * (1 - tout));
      }
      p.light(o.x, o.y, .2, .5, C, .5 * I * (1 - tout));
      // landing stamp: a square shoots out of the cell, thins and fades
      if (stamp >= 0) {
        const hs = CELL * (.36 + .4 * p.easeOutExpo(stamp)), gx = cx(o.cell), gy = cy(o.cell), sI = 1.2 * Math.pow(1 - stamp, 2);
        const c4 = [[gx - hs, gy - hs, .02], [gx + hs, gy - hs, .02], [gx + hs, gy + hs, .02], [gx - hs, gy + hs, .02]];
        for (let q = 0; q < 4; q++) p.line(c4[q], c4[(q + 1) % 4], .07 * (1 - stamp) + .025, C, sI);
      }
    }
    // dust motes: lift off fast, then drift
    const nD = Math.round(12 * p.density);
    for (let k = 0; k < nD; k++) {
      const u = (t * .35 + p.r(k, 1)) % 1, side = k % 4, s = p.r(k, 2) * 2 - 1;
      const x = side < 2 ? (side ? H : -H) + (p.r(k, 4) - .5) * .3 : s * H, y = side < 2 ? s * H : (side === 2 ? H : -H);
      if (u < .9) p.dot(x, y, .1 + p.easeOutCubic(u) * 1.4, C, (1 - u) * .8 * fade * vis[N - 1]);
    }
  },
});
