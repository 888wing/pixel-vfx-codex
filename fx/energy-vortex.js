// 符環渦流 / Runic Ring Vortex — pixel version of 00GameDevs "energy-vortex" (MIT)
PXFX.define({
  id: 'energy-vortex',
  loop: 5,
  beats: [{ t: .35, kind: 'cast', power: .9 }, { t: 1.5, kind: 'pulse', power: .5 }, { t: 2.3, kind: 'pulse', power: .7 }, { t: 3.05, kind: 'pulse', power: .5 }],
  view: { r: 2.2, h: 3.1 },
  stage: { ground: 'slate' },
  palette: {
    arcane: ['#5a4aa0', '#7c68d2', '#bba5ff', '#d8cbff', '#f2edff', '#ffffff'],
    mist: ['#5a5290', '#7268b0', '#8f84cc', '#ada2e6', '#cbc2f6', '#ebe6ff'],
  },
  timeline: [
    { t: [0, .35], zh: '蓄勢：地面湧起紫色能量霧，矮寬的碗形光帶慢慢轉動並略為收緊（約 15%），轉速由 0.15 倍加速到 0.5 倍', en: 'wind-up: violet energy mist wells up; a squat bowl of glowing bands turns slowly and tightens ~15%, spin accelerating from 0.15x to 0.5x' },
    { t: [.35, 1], zh: '成形（cast）：漏斗在 0.6 秒內急速拉高（ease-out-back，高度先衝過頭約 8% 再回落），轉速在 0.06 秒內衝到 1.7 倍再回落；地面一圈光環以 ease-out-expo 急衝後減速、越擴越細；符片以回彈方式彈出', en: 'cast: the funnel whips up within 0.6 s (ease-out-back, ~8% overshoot), spin jumps to 1.7x within 0.06 s then settles; a light ring shoots across the ground (ease-out-expo, thinning); glyphs pop in with overshoot' },
    { t: [1, 3.6], zh: '持續：12 條刻有方塊符文的光帶急轉往上爬；1.5、2.3、3.05 秒各一次能量湧動：轉速瞬間加 80%（0.04 秒起，0.9 秒三次方衰減）、漏斗鼓脹 14%、符文與內光猛然變亮再慢慢回落、符片被推向外側並加快翻轉、地面再彈出一圈較小的光環', en: 'sustain: 12 bands carved with blocky runes spin and climb; energy surges at 1.5, 2.3 and 3.05 s: spin +80% (0.04 s attack, cubic decay over 0.9 s), the funnel bulges 14%, runes and core flare then ease back, glyphs are pushed outward and flip faster, a smaller ground ring pops out' },
    { t: [3.6, 4.8], zh: '收尾：轉速按指數衰減；漏斗底部加速散開，上半部先快後慢地攤開成一圈橫向光帶後迅速消失；符片帶阻力向外飄散', en: 'end: spin decays exponentially; the base dissolves with acceleration, the top spreads fast then slower into one wide band and drops out; glyphs drift outward with drag' },
  ],
  layers: [
    { zh: '漏斗：半徑由底部 0.15 漸寬到頂部 1.1、高 2.7（可調高度、寬度），軸線上半段畫圓搖擺 0.2', en: 'funnel: radius 0.15 at the base to 1.1 at the top, 2.7 tall (height and width are knobs), upper axis sways in a 0.2 circle' },
    { zh: '轉動：所有旋轉與上爬共用一條「轉速曲線」積分出的相位，不是固定角速度', en: 'motion: every spin and climb reads one phase integrated from the speed curve, never a fixed angular speed' },
    { zh: '光帶：12 條寬 0.25–0.5 的月牙帶；下緣深紫、中段淡紫、上緣近白；正面的帶身中間有一行 5×5 方塊符文（每條 10 格）；背面 50% 亮度', en: 'bands: 12 crescent strips 0.25–0.5 wide; deep violet lower lip, lilac body, near-white top edge; one row of 5x5 blocky runes (10 cells per band) on the front-facing part; back half at 50%' },
    { zh: '符片：14 個 1 像素線框的空心菱形，沿螺旋上升並周期性壓扁表示翻轉', en: 'glyphs: 14 hollow 1-px diamond outlines rise along the spiral and squash periodically to show a flip' },
    { zh: '內光：漏斗內沿軸線 4 團紫色疊加光暈', en: 'core: 4 additive violet glows along the inside of the funnel' },
    { zh: '地面：16 團紫霧球（以光照明暗＋Bayer 抖色透明畫出）繞底部轉，2 圈斷續光弧，光環每次越擴越細，底部紫色地面光', en: 'ground: 16 violet mist balls (lit, Bayer-dithered see-through spheres) circle the base, 2 broken light arcs, light rings thin as they grow, violet light pool under the base' },
  ],
  params: {
    funnelHeight: { zh: '漏斗高度', en: 'funnel height', min: .6, max: 1.15, step: .05, value: 1 },
    funnelWidth: { zh: '漏斗寬度', en: 'funnel width', min: .7, max: 1.3, step: .05, value: 1 },
    spin: { zh: '旋轉速度', en: 'spin speed', min: .3, max: 2, step: .1, value: 1 },
    glyphs: { zh: '符片數量', en: 'glyph count', min: 0, max: 36, step: 1, value: 14 },
  },
  CAST: .35, END: 3.6,
  GUSTS: [[1.5, .8], [2.3, 1], [3.05, .75]],
  // surge strength: sharp attack (0.04 s), slow cubic decay (0.9 s)
  gust(t) {
    let g = 0;
    for (const [tg, a] of this.GUSTS) {
      const d = t - tg;
      if (d >= 0 && d < .94) g = Math.max(g, a * Math.min(1, d / .04) * Math.pow(1 - Math.max(0, d - .04) / .9, 3));
    }
    return g;
  },
  // spin speed (x base): slow wind-up, whip at the cast with overshoot, surge kicks, exponential spin-down
  speed(t) {
    const C = this.CAST;
    let s;
    if (t < C) { const u = t / C; s = .15 + .35 * u * u; }
    else {
      const d = t - C, up = 1 - Math.pow(1 - Math.min(1, d / .3), 3);
      s = .5 + .5 * up + .7 * Math.min(1, d / .06) * Math.pow(1 - Math.min(1, Math.max(0, d - .06) / 1.1), 3);
    }
    s += .8 * this.gust(t);
    if (t > this.END) s *= .12 + .88 * Math.exp(-2.4 * (t - this.END));
    return s;
  },
  // spin phase = integral of the speed curve (numeric, so draw stays a pure function of t)
  phase(t) {
    const h = 1 / 120;
    let a = 0, x = 0;
    for (; x + h <= t; x += h) a += this.speed(x + h * .5) * h;
    return a + this.speed((x + t) * .5) * (t - x);
  },
  geo(p, t) {
    const C = this.CAST, hs = p.param('funnelHeight'), ws = p.param('funnelWidth');
    const g = t < C ? p.easeInCubic(t / C) : 0;                              // the bowl tightens before the whip
    const m = Math.max(0, p.easeOutBack(p.ph(t, C, C + .6), 1.6)), mc = Math.min(1, m);
    const e = p.ph(t, this.END, 4.7), eo = p.easeOutCubic(e), gu = this.gust(t);
    const H = p.lerp(1.3, 2.7, m) * hs;
    const rb = (p.lerp(1.05, .15, mc) * (1 - .15 * g) + eo * .55) * ws, rt = p.lerp(1.7, 1.1, m) * (1 - .12 * g) * (1 + eo * .7) * ws;
    const zmin = e * e * H * .8, lean = (.1 + .1 * mc + .12 * gu) * hs;
    const ax = z => {
      const k = Math.pow(Math.max(0, z) / H, 1.6);
      return [Math.cos(t * 1.2 + 4) * lean * k + Math.sin(t * .8) * .05 * mc, Math.sin(t * 1.2 + 4) * lean * k * .7];
    };
    const bulge = 1 + .14 * gu;
    const rad = z => (rb + (rt - rb) * Math.pow(p.clamp(z / H, 0, 1.2), 1.2)) * bulge;
    const on = p.ease(p.ph(t, 0, .3)) * (1 - p.easeInCubic(e));
    return { m: mc, e, eo, H, rb, rt, zmin, ax, rad, on, gu, ws, ph: this.phase(t), spin: p.param('spin') };
  },
  // rune bands wrapped on the funnel surface
  bands(p, t, G, n, ramp, o) {
    const S = 18, cut = p.mode === '2d' ? .1 : .03;   // the lowest ramp level never dithers below ~50 %, so drop faint values instead of drawing them
    const climb = G.ph * o.climb * (.5 + .5 * G.spin), turn = G.ph * o.spin * G.spin, runeHi = o.hi * (1.15 + .35 * G.gu);
    for (let k = 0; k < n; k++) {
      const f = ((k / n + climb + p.r(k, 7) * .05) % 1 + 1) % 1;
      const z0 = G.zmin + (f * 1.12 - .2) * (G.H - G.zmin);
      const span = o.span * (.8 + p.r(k, 1) * .4), rise = o.rise * G.H, a0 = p.r(k, 2) * p.TAU + turn;
      const L = [], R = [], I = [], FR = [];
      const fade = p.env(f, 0, .1, .8, 1) * G.on;
      for (let s = 0; s <= S; s++) {
        const u = s / S, a = a0 + u * span, z = z0 + u * rise, zc = Math.max(0, z);
        const w = o.w * (.6 + .7 * zc / G.H), r0 = G.rad(zc), r1 = G.rad(zc + w);
        const c0 = G.ax(zc), c1 = G.ax(zc + w), ca = Math.cos(a), sa = Math.sin(a);
        L.push([c0[0] + ca * r0, c0[1] + sa * r0, zc]);
        R.push([c1[0] + ca * r1, c1[1] + sa * r1, zc + w]);
        const pp = p.project(c0[0] + ca * r0, c0[1] + sa * r0, zc), pc = p.project(c0[0], c0[1], zc);
        const front = pp && pc ? p.clamp(.5 + (pp[2] - pc[2]) / (r0 + .05) * .5, 0, 1) : .5;
        const inside = z < G.zmin || z > G.H + .05 ? 0 : 1;
        I.push(inside * fade * p.lerp(o.back, 1, front)); FR.push(front);
      }
      const cells = 10;
      p.ribbon(L, R, (u, v) => {
        const x = u * S, i0 = Math.min(S - 1, x | 0), ii = I[i0] + (I[i0 + 1] - I[i0]) * (x - i0);
        if (ii <= .01) return 0;
        const tp = Math.pow(Math.sin(Math.PI * u), .5), dv = (v - .5) * 2;
        if (Math.abs(dv) > tp) return 0;
        let lvl = dv > tp * .55 ? o.hi : dv < -tp * .5 ? o.lo : o.mid;
        if (FR[i0] > .55 && tp > .6 && Math.abs(dv) < .42) {                       // rune row on the front side
          const cu = u * cells, c = Math.floor(cu);
          if (p.rune((cu - c) * 1.2 - .1, (dv + .42) / .84, k * 17 + c)) lvl = runeHi;
        }
        const val = ii * lvl;
        return val < cut ? 0 : val;
      }, ramp, 1);
    }
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
    const A = this.palette.arcane, M = this.palette.mist;
    const G = this.geo(p, t), C = this.CAST, END = this.END, sp = .5 + .5 * G.spin, dc = t - C;
    const mistOn = p.ease(p.ph(t, 0, .5)) * (1 - p.easeInCubic(p.ph(t, 3.9, 4.9)));
    const blast = dc > 0 ? p.easeOutExpo(dc / .12) * Math.pow(Math.max(0, 1 - dc / 1), 2) : 0;
    const glow = 1 + .6 * G.gu + .8 * (dc > 0 ? Math.pow(Math.max(0, 1 - dc / .5), 3) : 0);   // flares on the cast and each surge
    const nM = Math.round(16 * p.density);
    for (let k = 0; k < nM; k++) {
      const ang = k * 2.39996 + G.ph * sp + p.r(k, 1) * .4;
      const r = (.26 + p.r(k, 3) * .2) * (.55 + .45 * mistOn);
      const rr = Math.min(1.85 - r * .6, ((.35 + p.r(k, 2) * 1.05) * (1 + (1 - G.m) * .25) * (1 + .4 * blast + .12 * G.gu) + G.eo * .6) * G.ws);   // stay on the island
      this.mist(p, Math.cos(ang) * rr, Math.sin(ang) * rr, -r * .2 + Math.sin(t * 2.6 + k) * .04, r, M, (.5 + .3 * p.r(k, 4)) * mistOn, k);
    }
    p.light(0, 0, .2, 2 * G.ws, A, .6 * mistOn * glow);
    for (let i = 0; i < 2; i++) {
      const rr = Math.min(1.85, (.85 + i * .55 + G.eo * .4) * G.ws), a0 = -G.ph * (2.4 - i * .6) * sp + i * 2;
      if (mistOn > .12) p.ring(0, 0, .02, rr, .04, A, .5 * mistOn, { fn: a => (Math.sin(a * 3 + a0) > .3 ? 1 : 0) });
    }
    // light rings on the cast and each surge: shoot out, slow down, thin out
    const rings = [[C, 1.55, .75, 1]].concat(this.GUSTS.map(([tg, a]) => [tg, 1.1 * a, .6, .65 * a]));
    for (const [tr, reach, dur, I] of rings) {
      const u = (t - tr) / dur;
      if (u <= 0 || u >= 1) continue;
      p.ring(0, 0, .03, Math.min(1.9, (.3 + p.easeOutExpo(u) * reach) * G.ws), .1 * Math.pow(1 - u, 1.5) + .02, A, I * Math.pow(1 - u, 1.5));
    }
    // hollow diamond glyphs rising around the open centre: pop in at the cast, pushed out by surges, drift away at the end
    const nG = Math.round(p.param('glyphs') * p.density), drift = t > END ? t - END : 0;
    for (let k = 0; k < nG; k++) {
      const u = ((G.ph * (.24 + p.r(k, 1) * .14) * sp + p.r(k, 2)) % 1 + 1) % 1;
      const pop = p.easeOutBack(p.ph(t, C + p.r(k, 9) * .25, C + .25 + p.r(k, 9) * .25), 2.2);
      const vis = p.env(u, 0, .08, .85, 1) * (1 - G.e);
      if (vis < .15 || pop <= 0) continue;
      const z = .15 + u * G.H, ang = p.r(k, 3) * p.TAU + G.ph * (2.6 + p.r(k, 4)) * G.spin + u * 3;
      const rr = G.rad(z) * (k % 3 === 0 ? .45 : 1.12 + p.r(k, 5) * .35) + .35 * G.gu * p.r(k, 6) + p.drag(2.2 * (.5 + p.r(k, 6)), 2, drift);
      const c = G.ax(z), sq = Math.abs(Math.cos(G.ph * 2 + t + k * 1.7));   // flip: squash horizontally, faster while spinning hard
      const sz = (.22 + p.r(k, 6) * .08) * pop;
      p.card(c[0] + Math.cos(ang) * rr, c[1] + Math.sin(ang) * rr, z, sz * (.25 + .75 * sq), sz, (a, b) => {
        const d = Math.abs(a) + Math.abs(b);
        return d > .62 && d <= 1 ? 1 : 0;
      }, A, .9 * vis * Math.min(1.25, glow));
    }
    if (p.mode !== '2d') for (let i = 0; i < 4; i++) {   // 2D draws every glow tail as a flat disc, so skip it there
      const z = G.zmin + (i + .6) / 6 * (G.H - G.zmin), c = G.ax(z);
      if (G.on > .12) p.glow(c[0], c[1], z, G.rad(z) * .7, A, .2 * G.on * glow);
    }
    this.bands(p, t, G, 12, A, { climb: .38, spin: 4, span: 4.4, rise: .15, w: .36, back: .5, hi: .74, mid: .52, lo: .32 });
  },
});
