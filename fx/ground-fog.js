// 貼地薄霧 / Ground-Hugging Mist — pixel version of 00GameDevs "ground-fog" (MIT)
PXFX.define({
  id: 'ground-fog',
  loop: 5,
  view: { r: 2.3, h: 1.3 },
  stage: { ground: 'moss' },
  palette: {
    fog: ['#7593a2', '#8eb0b8', '#a6c9ca', '#c4dfdb', '#e2f1eb'],
    bank: ['#7890a3', '#8fb0b9', '#a6c9ca', '#c0ddd8', '#dbeee8', '#f2faf5'],
  },
  timeline: [
    { t: [0, 1.2], zh: '開場：一小團霧（半徑 0.4）在中央貼地冒出，以 ease-out-expo 向四周湧開（約 0.4 秒已鋪開八成，之後越攤越慢），成約 3.6×2.6 的不規則霧床', en: 'start: a small patch (radius 0.4) appears on the ground and rolls outward with ease-out-expo (~80% spread by 0.4 s, then ever slower) into an irregular 3.6 x 2.6 bed' },
    { t: [1.2, 3], zh: '持續：霧面的雜訊紋理向右流動；1.4 與 2.6 秒各有一陣風：流速瞬間加快（0.05 秒起）、1.2 秒內三次方回落，霧床整體被推向右邊一點、霧堆翻滾加快', en: 'sustain: the noise texture of the fog sheet flows right; gusts at 1.4 and 2.6 s: the flow jumps (0.05 s attack) and eases back over 1.2 s (cubic), the bed is pushed slightly right and the banks roll faster' },
    { t: [3, 4.6], zh: '收尾：霧面由薄處開始穿洞（變稀速度先慢後快），整片以抖色變稀直到消失', en: 'end: holes open in the thin parts first (thinning starts slowly, then speeds up), the whole bed thins out through dither and is gone' },
  ],
  layers: [
    { zh: '地面染色：6 個圓形淡青地面光疊成霧床的影子，半透明分 3 級', en: 'ground tint: 6 overlapping round teal light pools tint the ground under the bed in 3 translucent steps' },
    { zh: '霧面：離地 0.06 的水平平面，用 2 層雜訊算出濃度；按濃度以 Bayer 抖色決定像素覆蓋率（濃處實心、薄處透出地面），5 階淡青色（中間色 #a6c9ca）', en: 'fog sheet: a horizontal plane 0.06 above the ground, two noise layers give density; density sets the Bayer-dither pixel coverage (solid where thick, ground shows through where thin), 5-step pale teal ramp centred on #a6c9ca' },
    { zh: '流動：紋理位移 = 風力 ×（基本流速 × 時間 ＋ 每陣風的積分位移），不是等速平移', en: 'flow: texture offset = wind x (base speed x time + the integrated push of each gust), not a constant-speed scroll' },
    { zh: '霧堆：14 團半埋地面的霧球（以光照明暗＋Bayer 抖色透明畫出，不加暗邊）（半徑 0.25–0.5），沿霧床邊緣高低起伏，給霧一點厚度', en: 'fog banks: 14 balls drawn as lit, Bayer-dithered see-through spheres (no dark rims) (radius 0.25–0.5) half sunk in the ground along the bed, giving the fog some height' },
  ],
  params: {
    coverage: { zh: '霧床範圍', en: 'fog coverage', min: .6, max: 1.25, step: .05, value: 1 },
    thickness: { zh: '霧的濃度', en: 'fog thickness', min: .5, max: 1.5, step: .05, value: 1 },
    wind: { zh: '風力（流速）', en: 'wind (flow speed)', min: 0, max: 2.5, step: .1, value: 1 },
  },
  GUSTS: [[1.4, 1], [2.6, .7]],
  // integrated flow: base drift plus each gust's push (speed jumps, then decays as (1 - d/D)^3, integrated in closed form)
  flow(t) {
    let f = .3 * t;
    for (const [tg, a] of this.GUSTS) {
      const d = t - tg, D = 1.2;
      if (d > 0) f += a * .9 * D / 4 * (1 - Math.pow(1 - Math.min(d, D) / D, 4));
    }
    return f;
  },
  gust(t) {
    let g = 0;
    for (const [tg, a] of this.GUSTS) { const d = t - tg; if (d >= 0 && d < 1.2) g = Math.max(g, a * Math.min(1, d / .05) * Math.pow(1 - d / 1.2, 3)); }
    return g;
  },
  // see-through puff drawn as light: a lit sphere surface whose pixels survive where the Bayer threshold is below
  // alpha. (Solid balls with dithered alpha get a darkened rim around every hole, which turns pale fog grey.)
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
    const FG = this.palette.fog, BK = this.palette.bank;
    const COV = p.param('coverage'), TH = p.param('thickness'), WN = p.param('wind');
    const grow = p.easeOutExpo(p.ph(t, 0, 1.2)), tq = p.ph(t, 3, 4.6), thin = tq * tq;
    const on = p.ph(t, 0, .12) * (1 - thin);
    if (on <= 0) return;
    const fl = this.flow(t) * WN, gu = this.gust(t) * Math.min(1, WN);
    const sc = (.25 + .75 * grow) * COV, push = (fl - .3 * t * WN) * .4 + .03 * t * WN;   // gusts shove the bed to the right
    // lobes of the bed: centre, radius
    const lobes = [];
    for (let k = 0; k < 6; k++) {
      const a = k / 6 * p.TAU + p.r(k, 1), d = k === 0 ? 0 : .7 + p.r(k, 2) * .45;
      lobes.push([(Math.cos(a) * d * 1.25 + Math.sin(t * .5 + k) * .08) * sc + push, (Math.sin(a) * d * .85) * sc, (.75 + p.r(k, 3) * .35) * sc]);
    }
    for (const [x, y, r] of lobes) p.light(x, y, 0, r * 1.15, FG, .7 * on * on * Math.min(1.3, TH));
    // fog sheet: density from two noise layers inside the lobes, drawn as dithered coverage (real see-through
    // fog in 3D / 2.5D: a pixel is kept when its Bayer threshold is below the local density)
    const flat = p.mode === '2d', bay = PXFX.bayerAt;
    p.decal(0, 0, .06, 2.3, (x, y, rho) => {
      let c = 0;
      for (let i = 0; i < 6; i++) {
        const L = lobes[i], dx = x - L[0], dy = y - L[1], q = 1 - (dx * dx + dy * dy) / (L[2] * L[2]);
        if (q > c) c = q;
      }
      c *= p.clamp((2 - rho) / .35, 0, 1);   // keep the sheet on the island
      if (c <= 0) return 0;
      const n = p.noise(x * 1.8 - fl * 2, y * 2.2) * .65 + p.noise(x * 4.1 - fl * 3.4, y * 4.6 + 3) * .35;
      const dens = Math.min(1, c * 1.8) * (.35 + .75 * n) * TH - thin * .9;
      if (dens <= .08) return 0;
      if (flat) return dens < .42 ? 0 : .45 + .4 * Math.min(1, dens);
      const pr = p.project(x, y, .06);
      if (!pr || bay(Math.floor(pr[0]), Math.floor(pr[1])) >= dens * 1.25) return 0;
      return .3 + .5 * Math.min(1, dens);
    }, FG, 1);
    // fog banks: half-sunk dithered balls, drawn after the sheet so their dither holes show fog, not ground
    const nB = Math.round(14 * p.density), roll = fl * .5;
    for (let k = 0; k < nB; k++) {
      const L = lobes[k % 6], a = p.r(k, 4) * p.TAU + (t * .15 + roll * .3) * (k % 2 ? 1 : -1), d = L[2] * (.35 + p.r(k, 5) * .55);
      const r = (.25 + p.r(k, 6) * .25) * sc / COV * Math.pow(COV, .3), bob = Math.sin(t * 1.4 + k * 1.3) * .04 + .05 * gu * p.r(k, 8);
      const bx = L[0] + Math.cos(a) * d, by = L[1] + Math.sin(a) * d, lim = Math.min(1, (1.65 - r) / (Math.hypot(bx, by * 1.45) + 1e-6));   // stay on the island
      this.mist(p, bx * lim, by * lim, -r * .3 + bob, r, BK, Math.min(.9, (.5 + .25 * p.r(k, 7)) * Math.min(1.2, TH)) * on * (1 - thin * .5), k, .05);
    }
  },
});
