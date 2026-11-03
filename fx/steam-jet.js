// 沖天汽柱 / Rising Steam Jet — pixel version of 00GameDevs "steam-jet" (MIT)
PXFX.define({
  id: 'steam-jet',
  loop: 4.5,
  beats: [{ t: .2, kind: 'cast', power: .9 }, { t: 1.15, kind: 'pulse', power: .5 }, { t: 1.9, kind: 'pulse', power: .65 }, { t: 2.55, kind: 'pulse', power: .5 }],
  view: { r: 1.7, h: 3.4 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    steam: ['#7d91a7', '#9cb1c2', '#bbcedb', '#d1dfe8', '#ebf2f5', '#ffffff'],
    metal: ['#2f3040', '#454656', '#5f6070', '#7c7c8a', '#9a98a4'],
  },
  timeline: [
    { t: [0, .2], zh: '預備：氣孔先漏出一小團白汽，一跳一跳地脹大（壓力累積）', en: 'anticipation: a small wisp leaks from the vent and swells in two quick throbs (pressure building)' },
    { t: [.2, .6], zh: '噴發（cast）：一圈扁平白汽貼地急射開（ease-out-expo＋阻力），汽柱前端以約 2 倍速度衝上 3 米後減速', en: 'blast (cast): a flat ring of steam shoots out along the ground (ease-out-expo + drag), the jet front shoots up 3 m at about twice the normal speed, then slows' },
    { t: [.6, 3], zh: '持續：每 0.06 秒射出一團蒸汽，離開氣孔時最快、越升越慢（1-(1-a)^(3×壓力)）；1.15、1.9、2.55 秒各一下「噴湧」：之後 0.5 秒內射出的汽團更大、衝得更高，速度線更亮；上段到 2 米以上變大並分成左右兩股散開', en: 'sustain: a steam puff every 0.06 s, fastest at the vent and slowing as it rises (1-(1-a)^(3 x pressure)); spurts at 1.15, 1.9 and 2.55 s: puffs born in the next 0.5 s are bigger and shoot higher, speed lines flare; above 2 m the jet swells and splits into two plumes' },
    { t: [3, 4.4], zh: '停止：氣孔壓力在 0.15 秒內掉光，汽柱底部先斷開，剩下的汽團繼續減速上飄、擴散並以抖色淡出', en: 'stop: the vent pressure drops within 0.15 s, the jet detaches from the bottom, the remaining steam keeps rising ever slower, spreads and dithers away' },
  ],
  layers: [
    { zh: '氣孔：地上一個 0.4×0.4、高 0.1 的深色金屬方座，中央一個更暗的圓孔', en: 'vent: a dark metal block 0.4 x 0.4, 0.1 tall, with a darker round hole in the middle' },
    { zh: '汽團：受光的半透明球（Bayer 抖色決定覆蓋率），壽命 1.3 秒，高度按 1-(1-a)^(3×壓力) 衝到 3×(0.92+0.08×壓力)（壓力取出生一刻），壓力越大起步越快、衝得越高；半徑由 0.07 增到 0.5，頂部按奇偶分成不對稱的兩股（右股偏 0.5 且較早分開，左股偏 0.3），並隨高度隨機散開', en: 'steam puffs: lit see-through spheres (Bayer dither sets coverage), 1.3 s life, height 1-(1-a)^(3 x pressure) up to 3 x (0.92 + 0.08 x pressure), pressure taken at birth: more pressure = faster launch and higher; radius 0.07 to 0.5; odd/even puffs split into two uneven plumes at the top (right bends 0.5 and splits earlier, left 0.3), plus random scatter growing with height' },
    { zh: '壓力：基準 1，噴發時 +0.6、每次噴湧 +0.45，都是瞬間升起、0.5 秒內二次方回落', en: 'pressure: base 1, +0.6 at the blast and +0.45 per spurt, each rising instantly and easing back over 0.5 s (quadratic)' },
    { zh: '速度線：汽柱下段 3 條 1 像素白線上竄，先快後慢', en: 'speed lines: 3 one-pixel white streaks race up the lower jet, fast then slowing' },
    { zh: '地面：氣孔周圍一圈濕痕，持續時微微泛白光', en: 'ground: a damp ring around the vent with a faint white light while it blows' },
  ],
  params: {
    jetHeight: { zh: '汽柱高度', en: 'jet height', min: .6, max: 1.1, step: .05, value: 1 },
    jetWidth: { zh: '汽柱粗細', en: 'jet width', min: .6, max: 1.5, step: .05, value: 1 },
    plumeSplit: { zh: '頂部分叉幅度', en: 'plume split', min: 0, max: 1.6, step: .1, value: 1 },
    speedLines: { zh: '速度線數量', en: 'speed lines', min: 0, max: 8, step: 1, value: 3 },
  },
  BLAST: .2, STOP: 3,
  SPURTS: [1.15, 1.9, 2.55],
  // vent pressure for a puff born at tb: instant rise, quadratic ease-back over 0.5 s; cut off at the stop
  pressure(tb) {
    let P = 1;
    const db = tb - this.BLAST;
    if (db >= 0 && db < .6) P += .6 * Math.pow(1 - db / .6, 2);
    for (const ts of this.SPURTS) { const d = tb - ts; if (d >= 0 && d < .5) P = Math.max(P, 1 + .45 * Math.pow(1 - d / .5, 2)); }
    if (tb > this.STOP - .15) P *= 1 - .5 * Math.min(1, (tb - this.STOP + .15) / .15);
    return P;
  },
  // see-through puff drawn as light: a lit sphere surface whose pixels survive where the Bayer threshold is below
  // alpha. (Solid balls with dithered alpha get a darkened rim around every hole, which turns white steam grey.)
  // 2D has no dither, so there the puff is opaque and shrinks with alpha instead.
  mist(p, x, y, z, r, ramp, alpha, seed, lift = 0) {
    if (alpha <= .02) return;
    const flat = p.mode === '2d', bay = PXFX.bayerAt, off = (seed * 7) & 3;
    if (flat) { if (alpha < .25) return; r *= .45 + .55 * Math.min(1, alpha * 1.3); }
    p.shell(x, y, z, r, (nx, ny, nz) => {
      let l = (-.79 * nx + .07 * ny + .61 * nz) * .5 + .5 + lift;
      if (!flat) {
        const q = p.project(x + nx * r, y + ny * r, z + nz * r);
        if (!q) return 0;
        const ix = Math.floor(q[0]), iy = Math.floor(q[1]);
        if (bay(ix + off, iy + off) >= alpha) return 0;
        l += (p.r(ix * 13 + iy * 7, seed) - .5) * .22;
      }
      return .1 + .82 * p.clamp(l, 0, 1);
    }, ramp, 1, { back: 0 });
  },
  draw(p, t) {
    const ST = this.palette.steam, MT = this.palette.metal;
    const BL = this.BLAST, STOP = this.STOP, dt = .06, life = 1.3, TOP = 3 * p.param('jetHeight');
    const W = p.param('jetWidth'), SPL = p.param('plumeSplit');
    const blow = p.env(t, BL - .02, BL + .04, STOP, STOP + .15);
    // vent block with a dark hole
    p.box(-.2, -.2, 0, .2, .2, .1, MT);
    p.decal(0, 0, .1, .12, (x, y, rho) => (rho < .1 ? 1 : 0), ['#1c1c28', '#1c1c28'], 1);
    p.decal(0, 0, 0, .75, (x, y, rho) => (rho > .28 && rho < .62 + .08 * p.noise(x * 7, y * 7) ? .5 : 0), ['#4a4f62', '#566075'], p.env(t, BL, .7, 3.4, 4.3));
    p.light(0, 0, .3, 1.1, ST, .5 * blow * this.pressure(t));
    // anticipation: a wisp swells in two throbs before the blast
    if (t < BL) {
      const u = t / BL, throb = .6 + .4 * Math.abs(Math.sin(u * Math.PI * 2));
      this.mist(p, 0, 0, .16 + .05 * u, (.06 + .08 * u * throb) * W, ST, .9, 77, .15);
    }
    // the blast: flat ring of steam shooting out along the ground, slowed by drag
    const a = t - BL, nR = Math.round(7 * p.density);
    if (a > 0 && a < .9) {
      const b = a / .9;
      for (let k = 0; k < nR; k++) {
        const ang = k * 2.39996 + p.r(k, 1), d = .15 + p.drag(3.2 * (.8 + .4 * p.r(k, 2)), 4.5, a) * Math.sqrt(W);
        this.mist(p, Math.cos(ang) * d, Math.sin(ang) * d, .12 + b * .2, (.16 + b * .16) * Math.sqrt(W), ST, .85 * (1 - b * b), k + 40, .1);
      }
    }
    // the jet: one puff every 0.06 s; the body is one continuous shape, so density only adds half-step puffs (> 1)
    const n = Math.floor((STOP - BL) / dt) * 2, D = p.density;
    for (let j = 0; j <= n; j++) {
      const even = j % 2 === 0, k = even ? j / 2 : 1000 + j;
      if (!even && p.r(j, 98) >= D - 1) continue;
      const tb = BL + j * dt / 2, age = t - tb;
      if (age < 0 || age > life) continue;
      const P = this.pressure(tb), aa = age / life;
      const z = .12 + TOP * (.92 + .08 * P) * (1 - Math.pow(1 - aa, 3 * P)), h = p.clamp((z - .12) / TOP, 0, 1);
      const side = (even ? k : j >> 1) % 2 ? 1 : -1, split = side > 0 ? p.smooth(.45, 1, h) : p.smooth(.6, 1.05, h);   // uneven plumes
      const x = (side * (side > 0 ? .5 : .3) * split * SPL + Math.sin(t * 2 + z) * .06 * h + (p.r(k, 2) - .5) * .32 * h * h) * Math.sqrt(W);
      const y = ((p.r(k, 3) - .5) * .2 * h + side * .08 * split * SPL) * Math.sqrt(W);
      const r = (.07 + .43 * Math.pow(h, 1.4) * (.8 + .4 * p.r(k, 4))) * W * (1 + .25 * (P - 1));
      const alpha = (.95 - .2 * h) * (1 - p.smooth(.7, 1, aa));
      this.mist(p, x, y, z, r, ST, alpha, k, .08 - .2 * h);
    }
    // speed lines in the fast lower jet: race up, fast then slowing; brighter on spurts
    const front = .12 + TOP * 1.12 * (1 - Math.pow(1 - Math.min(1, Math.max(0, a) / life), 3));
    const nL = Math.round(p.param('speedLines') * p.density), P = this.pressure(t);
    if (blow > 0) for (let k = 0; k < nL; k++) {
      const per = .38 + p.r(k, 21) * .1, u = ((t + p.r(k, 22) * per) / per) % 1;
      const z0 = .15 + (1 - Math.pow(1 - u, 2)) * 1.6 * TOP / 3, xo = (k % 3 - 1) * .04 * W + (k >= 3 ? (p.r(k, 23) - .5) * .1 * W : 0);
      const len = (.25 + .2 * (1 - u)) * P;
      if (z0 + len > front) continue;
      p.line([xo, 0, z0], [xo, 0, z0 + len], .02, ST, Math.min(1, .95 * blow * (1 - u) * P), { i1: .2 * blow });
    }
  },
});
