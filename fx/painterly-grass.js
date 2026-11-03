// 風拂草地 / Windswept Meadow — pixel version of 00GameDevs "painterly-grass" (MIT)
PXFX.define({
  id: 'painterly-grass',
  loop: 4,
  view: { r: 2.2, h: 1.1 },
  stage: { ground: 'moss' },
  palette: {
    grass: ['#3b4a2b', '#506431', '#6a7f39', '#829544', '#9fb150', '#c0ca6a', '#dfe196'],
    petal: ['#9c99b4', '#c9c7d9', '#ecebf3', '#ffffff'],
    heart: ['#d9a52c', '#f2cf4a', '#fff0a0'],
  },
  timeline: [
    { t: [0, 4], zh: '無縫循環：草地一直存在，沒有開始或結束；每次循環有兩道風浪（0.3 秒強、2.3 秒較弱）由左向右掃過整片草地，風浪前緣略呈彎曲', en: 'seamless loop, no start or end: two gust fronts per loop (a strong one at 0.3 s, a weaker one at 2.3 s) sweep across the meadow from left to right, the front slightly curved' },
    { t: [0, 4], zh: '每片草在風浪到達的一刻 0.12 秒內急彎，之後以指數衰減慢慢回正，回彈時稍為擺過頭；所以同一刻只有風浪經過的一條帶在彎，前面未動、後面在回彈', en: 'each blade snaps over within 0.12 s when the front reaches it, then recovers with an exponential decay and a slight overshoot; at any moment only the band under the front is bent, ahead is still, behind is springing back' },
    { t: [0, 4], zh: '擺動以每秒 8 格更新，草尖位移取整到整像素，像手繪逐格動畫', en: 'sway updates at 8 fps and tip offsets snap to whole pixels, like hand-drawn frame animation' },
  ],
  layers: [
    { zh: '草叢：約 660 片草葉放在半徑 1.75 的圓內抖動網格（間距 0.12）上，中央較高（0.5–0.7）、邊緣較矮（0.22–0.42），形成密實小丘', en: 'grass: ~660 blades on a jittered 0.12 grid inside radius 1.75, taller in the middle (0.5–0.7) and shorter at the edge (0.22–0.42), forming a dense mound' },
    { zh: '草葉：寬 0.15 的闊葉，下半段為梯形、上半段為尖三角且亮一階；7 階橄欖綠（中間色 #829544），用低頻雜訊分出明暗色塊，像乾筆筆觸；被風壓彎時亮一階（露出葉背），風浪因此像一道亮帶掃過', en: 'blade: a 0.15-wide leaf, lower half a trapezoid and the tip a triangle one step lighter; 7-step olive ramp centred on #829544, low-frequency noise makes dry-brush light and dark patches; a bent blade turns one step lighter (its underside shows), so each gust reads as a bright band sweeping across' },
    { zh: '擺動：草尖沿 +x 偏移 = 高度 ×（0.18 × 風力 × 風浪曲線 ＋ 0.03 × 細碎抖動），根部不動', en: 'sway: tip offset along +x = height x (0.18 x wind x gust curve + 0.03 x flutter), roots stay put' },
    { zh: '小白花：24 朵，細莖頂在草面附近，花頭為 2–3 像素白點、中央 1 像素黃蕊，跟草一起擺', en: 'flowers: 24 white flowers on thin stems reaching the grass top, 2–3 px white heads with a 1-px yellow centre, swaying with the grass' },
  ],
  params: {
    wind: { zh: '風力', en: 'wind strength', min: 0, max: 2, step: .1, value: 1 },
    gustSpeed: { zh: '風浪推進速度', en: 'gust front speed', min: .5, max: 2.5, step: .1, value: 1 },
    grassHeight: { zh: '草的高度', en: 'grass height', min: .6, max: 1.5, step: .05, value: 1 },
    flowers: { zh: '小白花數量', en: 'flower count', min: 0, max: 60, step: 1, value: 24 },
  },
  GUSTS: [[.3, 1], [2.3, .65]],
  // bend of one gust, tau seconds after its front reached the blade: snap over in 0.12 s, decay with a slight spring-back
  bend(tau) {
    if (tau < .12) return Math.sin(tau / .12 * Math.PI / 2);
    const u = tau - .12;
    return Math.exp(-u * 2.6) * Math.cos(u * 4.2);
  },
  draw(p, t) {
    const G = this.palette.grass, PT = this.palette.petal, HT = this.palette.heart;
    const L = this.loop, tq = Math.floor(t * 8) / 8, w = p.TAU / L;   // 8 fps steps, frequencies are whole multiples of the loop
    const R = 1.75, step = .12, W = p.param('wind'), V = 2.6 * p.param('gustSpeed'), HS = p.param('grassHeight'), D = p.density;
    // gust curve at a point: each front sweeps +x at speed V with a slightly curved front; wrapped to the loop, so it is seamless
    const gust = (x, y) => {
      let g = 0;
      for (const [t0, a] of this.GUSTS) {
        const arrive = t0 + (x + 2.2 + .25 * Math.sin(y * 1.7 + t0 * 3)) / V;
        g += a * this.bend(((tq - arrive) % L + L) % L);
      }
      return g;
    };
    // tip offset along +x, snapped to whole pixels at that point
    const sway = (x, y, h, ph, g) => {
      const flut = Math.sin(w * 4 * tq + ph) * (1 + .8 * Math.abs(g));
      const d = h * (.18 * W * g + .03 * flut) + .02 * W;
      const q = p.project(x, y, h);
      return q ? Math.round(d * q[3]) / q[3] : d;
    };
    // one blade; extra = blades added by the density knob (own random salts)
    const keep = Math.pow(Math.min(1, D), .6), widen = Math.min(1.5, 1 / Math.sqrt(keep));   // fewer blades -> wider blades, so the meadow stays covered
    const blade = (k, gx, gy, s0) => {
      const x = gx + (p.r(k, 1 + s0) - .5) * step * 1.1, y = gy + (p.r(k, 2 + s0) - .5) * step * 1.1;
      const rho = Math.hypot(x / 1.05, y), edge = rho / R + (p.noise(x * 2 + 5, y * 2) - .5) * .25;
      if (edge > 1) return;
      const h = ((.22 + .2 * p.r(k, 3 + s0)) + .28 * (1 - edge * edge)) * HS;
      const a = p.r(k, 4 + s0) * Math.PI, ca = Math.cos(a) * .075 * widen, sa = Math.sin(a) * .075 * widen;
      const g = gust(x, y);
      const lean = (p.r(k, 5 + s0) - .5) * .12, dx = sway(x, y, h, p.r(k, 6 + s0) * 6.28, g) + lean, dy = (p.r(k, 7 + s0) - .5) * .1;
      const patch = p.noise(x * 1.3, y * 1.3 + 7);
      const s = p.clamp(.12 + .55 * patch + .25 * p.r(k, 8 + s0) + .15 * (1 - edge) + .2 * Math.max(0, g) * Math.min(1, W), 0, .92);
      const m = .55;   // where the tip triangle starts
      const b0 = [x - ca, y - sa, 0], b1 = [x + ca, y + sa, 0];
      const m0 = [x - ca * .7 + dx * m * m, y - sa * .7 + dy * m * m, h * m], m1 = [x + ca * .7 + dx * m * m, y + sa * .7 + dy * m * m, h * m];
      const tip = [x + dx, y + dy, h];
      p.quad(b0, b1, m1, m0, G, { shade: s * .85 });
      p.tri(m0, m1, tip, G, { shade: s + .13 });
    };
    let k = 0;
    for (let gx = -R; gx <= R; gx += step) for (let gy = -R; gy <= R; gy += step, k++) {
      if (keep >= 1 || p.r(k, 9) < keep) blade(k, gx, gy, 0);
      if (D > 1 && p.r(k, 10) < D - 1) blade(k, gx + step * .5, gy + step * .5, 40);
    }
    // flowers
    const nF = Math.round(p.param('flowers') * D);
    for (let f = 0; f < nF; f++) {
      const a = p.r(f, 21) * p.TAU, d = Math.sqrt(p.r(f, 22)) * R * .85, x = Math.cos(a) * d * 1.05, y = Math.sin(a) * d;
      const edge = Math.hypot(x / 1.05, y) / R, h = (.4 + .28 * (1 - edge * edge) + p.r(f, 23) * .06) * HS;
      const dx = sway(x, y, h, f * 1.7, gust(x, y));
      p.tri([x - .012, y, 0], [x + .012, y, 0], [x + dx, y, h], G, { shade: .3 });
      p.ball(x + dx, y, h + .03, .05 + p.r(f, 24) * .015, PT, { shadow: false, lit: .1 });
      const q = p.project(x + dx, y, h + .03);
      if (q) p.dot(x + dx, y, h + .03 + .5 / q[3], HT, .75);
    }
  },
});
