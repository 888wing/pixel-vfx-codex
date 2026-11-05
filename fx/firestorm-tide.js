// 焚城炎潮 / Firestorm Tide — Mass Spells pack (original design): a wall of fire taller than a house rolls across the field and burns a horde to ash
PXFX.define({
  id: 'firestorm-tide',
  loop: 5,
  beats: [{ t: .75, kind: 'cast', power: .9 }, { t: 1.4, kind: 'pulse', power: .6 }, { t: 3.1, kind: 'hit', power: 1.35 }],
  view: { r: 4.8, h: 3.8 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'charge', 'core', 'aura', 'grade', 'crowd', 'impact', 'aftermath'],
  palette: {
    fire: ['#8a1c12', '#c4320f', '#ff5a1f', '#ff9638', '#ffd070', '#fff4d6'],
    deep: ['#5e1410', '#8e2210', '#c43a12', '#ef6a24'],
    smoke: ['#1c1416', '#2e2020', '#45302a', '#5e4234'],
    ash: ['#4a4240', '#6a605a', '#8c8078', '#aa9e92'],
  },
  timeline: [
    { k: 'pose', t: [0, .7], zh: '起手：施法者（高 1.5）下蹲，雙掌收到腰前；敵群（36 個細小敵兵，高約 0.6）在前方列陣', en: 'pose: the caster (1.5 tall) crouches with both palms drawn in at the waist; a horde of 36 small soldiers (~0.6 tall) stands ahead' },
    { k: 'charge', t: [.2, .75], zh: '集氣：橙紅火星（#ff5a1f）匯聚到雙掌之間，掌間火球半徑由 0.08 漲到 0.2', en: 'charge: orange-red sparks (#ff5a1f) stream in between the palms and a fireball there grows from radius 0.08 to 0.2' },
    { k: 'shape', t: [.75, 1.1], zh: '成形：0.06 秒內雙掌推出；施法者前方 0.9 單位處，一道火牆在 0.35 秒內由地面升起（回彈緩動），高 2.8（敵兵的 4–5 倍）、闊 5.8（覆蓋整個戰場），由三排火焰卡組成（前排最亮、後排較高較暗），火舌頂端向前捲，頂部冒黑煙；環境壓暗 45%，地面映成橙色', en: 'shape: both palms thrust out in 0.06 s; 0.9 units ahead of the caster a wall of fire rises from the ground in 0.35 s (overshoot ease), 2.8 tall (4–5× a soldier) and 5.8 wide (the whole field), built from three rows of flame cards (bright front, taller dimmer back) with the tongue tips curling forward, dark smoke on top; the world darkens 45% and the ground is lit orange' },
    { k: 'motion', t: [1.0, 3.1], zh: '推進：火牆在 2.1 秒內由 x = −2.6 推到 3.75（約每秒 3 單位，近遠端時減速到零）；前沿掃過的敵兵逐個中招（命中時間 = 火牆前沿到達該兵 x 座標的時刻）：全身閃白→燃燒的火人（0.7 秒）→焦黑→壓扁崩成一堆灰；火牆後方留下焦土與飄升的火星', en: 'motion: the wall rolls from x = −2.6 to 3.75 in 2.1 s (~3 units/s, easing out to a stop at the far edge); every soldier the front passes is hit (hit time = the moment the front reaches its x): a white flash → a burning figure (0.7 s) → charcoal → squashes into an ash pile; scorched ground and rising embers trail behind the wall' },
    { k: 'impact', t: [3.1, 3.45], zh: '命中：火牆到達遠端時先向上竄高 30%，撞上邊緣：1 格衝擊格＋頓幀，前沿噴出一排火舌與火星，然後火牆在 0.35 秒內由上而下塌落熄滅，冒出一排黑煙', en: 'impact: at the far edge the wall surges 30% higher and crashes: one two-tone impact frame and a hit-stop, a row of flame tongues and embers sprays forward, then the wall collapses from the top down in 0.35 s and dies, leaving a row of black smoke' },
    { k: 'after', t: [3.45, 5], zh: '餘波：灰堆冒著暗紅餘燼慢慢淡出，焦土淡去，環境回復亮度，新一批敵兵由右邊走回原位，施法者收手', en: 'aftermath: the ash piles smoulder with dull red embers and fade, the scorch fades, the world brightens again, a fresh horde walks in from the right and the caster lowers the hands' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→下蹲蓄力→雙掌前推→待機', en: 'caster: faceless mannequin, poses idle → crouched charge → two-palm thrust → idle' },
    { zh: '敵群：30–60 個細小敵兵，均勻但不規則地分佈在中心 x = 1.2、半徑 2.4×2.1 的橢圓內', en: 'horde: 30–60 small soldiers spread evenly but irregularly in a 2.4×2.1 ellipse centred at x = 1.2' },
    { zh: '火牆：沿 y 方向（−2.9 到 2.9）每排 12 張面向鏡頭的火焰卡（闊 1.4，後排 6 張闊 2.6），三排前後相距 0.45×厚度；火焰形狀用向上捲動的噪聲火舌、頂端向前傾，底部白熱、中段橙、頂端暗紅，兩端高度收窄成圓角', en: 'fire wall: rows of 12 camera-facing flame cards (1.4 wide; the back row 6 cards 2.6 wide) along y (−2.9 to 2.9), three rows 0.45 × depth apart; upward-scrolling noise tongues leaning forward at the top, white-hot at the base, orange in the middle, dark red at the tips, the height tapering at both ends' },
    { zh: '光照：火牆前沿一條白熱地線，沿牆 7 個地面光照圈（半徑 1.5）把地面映成橙色；火牆燃燒時環境壓暗 45%、去飽和 20%，令火焰更突出', en: 'lighting: a white-hot ground line along the front and 7 ground light pools (radius 1.5) along the wall paint the ground orange; while the wall burns the world is darkened 45% and desaturated 20% so the fire pops' },
    { zh: '黑煙：13 團由 4 個噪聲圓瓣拼成的實心煙雲，由牆頂後方升起、向後上方飄散，最後抖色淡出', en: 'smoke: 13 solid billows (four noisy round lobes each) rising from behind the wall top, drifting up and backwards, dithering out at the end' },
    { zh: '焦土與火星：火牆掃過的地面染成焦黑並有暗紅餘燼閃爍；30 顆火星由牆頂與後方升起、向後飄', en: 'scorch and embers: the ground behind the wall is stained black with flickering dull red embers; 30 embers rise from the wall top and back and drift backwards' },
    { zh: '群眾反應：燃燒的火人身上兩條火舌＋光暈，0.2 秒後變焦黑，0.7–1.05 秒壓扁成灰堆，灰堆上有暗紅餘燼', en: 'crowd reaction: burning figures carry two flame tongues and a glow, turn to charcoal after 0.2 s, squash into ash piles at 0.7–1.05 s; the piles keep dull red embers' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    height: { zh: '火牆高度', en: 'wall height', min: 1.8, max: 3.4, step: .1, value: 2.8 },
    depth: { zh: '火牆厚度', en: 'wall depth', min: .5, max: 1.6, step: .05, value: 1 },
    smoke: { zh: '黑煙濃度', en: 'smoke amount', min: 0, max: 1.5, step: .05, value: 1 },
  },
  X0: -2.6, X1: 3.75, TR0: 1.0, HIT: 3.1,
  // wall travel 0..1: about constant speed, then easing out at the far edge
  fW(u) { return .4 * (3 * u * u - 2 * u * u * u) + .6 * (1 - (1 - u) * (1 - u)); },
  wallX(p, t) { return this.X0 + (this.X1 - this.X0) * this.fW(p.ph(t, this.TR0, this.HIT)); },
  // time the wall front reaches x (bisection on the travel curve)
  reach(x) {
    const g = (x - this.X0) / (this.X1 - this.X0);
    if (g <= 0) return this.TR0;
    if (g >= 1) return this.HIT;
    let a = 0, b = 1;
    for (let k = 0; k < 18; k++) { const m = (a + b) / 2; if (this.fW(m) < g) a = m; else b = m; }
    return this.TR0 + (a + b) / 2 * (this.HIT - this.TR0);
  },
  // a billowing smoke cloud: a camera-facing solid sprite made of a few noisy lobes, warmer at the bottom
  billow(p, x, y, z, sz, seed, alpha, t, ramp) {
    const l3 = (p.r(seed, 1) - .5) * .6;
    p.scard(x, y, z, sz * 1.7, sz * 1.5, (u, v) => {
      const a = ((u + .42) ** 2 + (v + .2) ** 2 * 1.2) / .3, b = ((u - .4) ** 2 + (v + .25) ** 2 * 1.2) / .3;
      const c = (u * u + (v - .2) ** 2 * 1.2) / .38, d = ((u - l3) ** 2 + (v + .45) ** 2 * 1.2) / .25;
      const m = Math.min(a, b, c, d) + (p.noise(u * 3 + seed, v * 3 - t * .7) - .5) * .9;
      return m < 1 ? .1 + .32 * (1 - (v + 1) / 2) + .3 * (1 - m) : -1;
    }, ramp, { alpha });
  },
  draw(p, t) {
    const PL = this.palette, F = PL.fire, DP = PL.deep, SM = PL.smoke, CAST = .75, HIT = this.HIT;
    const H0 = p.param('height'), depth = p.param('depth'), smoke = p.param('smoke');
    const W = this.wallX(p, t), YS = 2.9;
    // wall height multiplier: rise, surge at the far edge, collapse
    const rise = p.easeOutBack(p.ph(t, CAST, CAST + .35), 1.4);
    const surge = 1 + .3 * p.easeOutCubic(p.ph(t, HIT - .18, HIT)) * (t < HIT + .05 ? 1 : 1 - p.ph(t, HIT + .05, HIT + .2));
    const fall = 1 - p.easeInCubic(p.ph(t, HIT + .04, HIT + .38));
    const Hm = H0 * rise * surge * fall, on = t >= CAST && Hm > .03;
    // ---- caster ----
    let pose;
    if (t < .15) pose = 'idle';
    else if (t < .68) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .15, .6)) };
    else if (t < 3.5) pose = { a: 'charge', b: 'palm', k: p.easeInCubic(p.ph(t, .69, CAST)) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.5, 4.3)) };
    const fig = p.figure(-3.5, .2, { pose });
    // ---- scorched ground behind the wall (a stain, graded with the world) ----
    const scK = 1 - p.ph(t, 3.9, 4.75);
    if (t > CAST + .1 && scK > 0) {
      const back = this.X0 - .25, cx = (back + W) / 2, hl = (W - back) / 2;
      p.stain(cx, 0, Math.hypot(hl, YS + .3), (dx, dy) => {
        const x = dx + cx;
        if (x > W - .15 || Math.abs(dy) > YS + .1 - .3 * p.noise(x * 2, 4)) return 0;
        return .95 - .55 * p.noise(x * 1.7, dy * 1.7) - p.ph(x, W - 1.2, W - .15) * .35;
      }, '#241818', scK);
    }
    // ---- the horde ----
    const crowd = p.crowd({
      n: Math.round(p.param('crowd')), seed: 11, area: { x: 1.2, y: 0, rx: 2.4, ry: 2.1 }, t,
      at: [-3.5, 0, 0], react: 'burn', ramp: F,
      hit: u => this.reach(u.x - .08) + u.r1 * .04,
      fear: u => { const th = this.reach(u.x - .08); return p.ph(t, Math.max(.9, th - .9), th - .1) * (.55 + .45 * u.r3); },
      respawn: [4.05, 4.95], clear: [3.95, 4.55], from: [1, .1],
    });
    // ---- smoke plumes rolling off the wall top (solid, dithering out at the end of their life) ----
    const nS = Math.round(13 * smoke * Math.min(1.5, p.density));
    for (let k = 0; k < nS; k++) {
      const born = CAST + .2 + (k / Math.max(1, nS)) * 2.4 + p.r(k, 71) * .15, age = t - born, life = Math.min(1.1 + .5 * p.r(k, 72), 4.55 - born);
      if (age < 0 || age > life) continue;
      const a = age / life, Wb = this.wallX(p, born), Hb = H0 * Math.min(1, p.ph(born, CAST, CAST + .35) * 1.15);
      const y = (p.r(k, 73) * 2 - 1) * (YS - .5), endTaper = 1 - Math.pow(Math.abs(y) / YS, 4);
      const x = Wb + (this.wallX(p, t) - Wb) * .45 - depth - .25 - p.drag(.9, 2, age), z = Hb * .88 * endTaper + p.drag(1.3, 1.5, age) + .1;
      const al = Math.min(1, (1 - a) * 2.2), sz = (.65 + .6 * p.easeOut(a)) * (.85 + .3 * p.r(k, 74));
      this.billow(p, x, y, z, sz, k * 7 + 3, al, t, SM);
    }
    // after the collapse: a row of black smoke rising from the far edge
    const ca = t - HIT;
    if (ca > 0 && ca < 1.45 && smoke > 0) {
      const nR = Math.round(4 * Math.min(1.5, smoke) * Math.min(1.5, p.density));
      for (let k = 0; k < nR; k++) {
        const u = p.ph(ca, .08 + p.r(k, 81) * .25, 1.45), y = ((k + .5) / nR * 2 - 1) * (YS - .6) + (p.r(k, 84) - .5) * .6;
        if (u <= 0 || u >= 1) continue;
        this.billow(p, this.X1 - .2 + (p.r(k, 82) - .5) * .6, y, 1 + 2.2 * p.easeOut(u) + p.r(k, 83) * .4, (.5 + .6 * u) * Math.min(1.2, .6 + smoke * .4), k * 5 + 60, Math.min(.95, (1 - u) * 1.3), t, SM);
      }
    }
    // ---- the world goes dark while the wall burns ----
    const dk = p.env(t, CAST - .05, CAST + .35, HIT + .2, HIT + .9);
    if (dk > .01) p.grade({ dark: .45 * dk, desat: .2 * dk, tint: '#ff5a1f', tintAmt: .12 * dk });
    const a = t - HIT;
    if (a >= 0 && a < .021 + 1 / 30) p.impactFrame({ ink: '#1c0604', paper: '#fff0d8', accent: '#ff5a1f' });
    // ash mounds (solids drawn after the grade so the piles read on the dark scorched ground)
    if (!(a >= 0 && a < .021 + 1 / 30)) for (const s of crowd) {
      if (s.hitT == null || s.fresh || t < s.hitT + .95) continue;
      const g = p.easeOutCubic(p.ph(t, s.hitT + .95, s.hitT + 1.15)) * (1 - p.ph(t, 3.95 + s.u.r2 * .3, 4.25 + s.u.r2 * .3));
      if (g <= .05) continue;
      p.ball(s.x, s.y, -.04, .15 * g, PL.ash, { shadow: false, rough: .3, seed: s.u.i });
      p.ball(s.x + .05, s.y - .03, .05 * g, .08 * g, PL.ash, { shadow: false, lit: .1, seed: s.u.i + 3 });
    }
    // ---- light: charge between the palms ----
    const mid = [(fig.hand[0] + fig.handL[0]) / 2 + .05, (fig.hand[1] + fig.handL[1]) / 2, (fig.hand[2] + fig.handL[2]) / 2];
    if (t > .2 && t < CAST + .25) {
      const ch = p.ph(t, .2, CAST);
      p.charge(mid[0], mid[1], mid[2], ch, { n: 14, R: 1.1, ramp: F, up: .3 });
      p.core(mid[0], mid[1], mid[2], { r: (.08 + .12 * ch) * (t < CAST ? 1 : 1 - p.ph(t, CAST, CAST + .25)), ramp: F, I: 1, t, rays: 4 });
      p.light(mid[0], mid[1], 0, 1.2, F, .5 * ch);
    }
    // ---- the wall: three rows of flame cards ----
    if (on) {
      const nC = 12, rows = 3;
      for (let row = rows - 1; row >= 0; row--) {
        const xr = W - .12 - row * depth * .45, tall = 1 + row * .16, Ir = [1, .85, .8][row], ramp = row === 2 ? DP : F;
        for (let k = 0; k < nC; k++) {
          if (row === 2 && k % 2) continue;   // the back row is mostly hidden: half the cards, twice as wide
          const y = -YS + (k + .5 + (row % 2) * .5 - .25 + (row === 2 ? .5 : 0)) / nC * 2 * YS, ey = Math.min(1, Math.abs(y) / YS);
          const hk = Hm * tall * (.78 + .3 * p.noise(k * .9 + row * 3, t * .8)) * Math.sqrt(Math.max(0, 1 - Math.pow(ey, 5)));
          if (hk < .05) continue;
          const seed = k * 3.7 + row * 11, wC = (.95 + .25 * row) * (row === 2 ? 2.2 : 1.45), lean = .32;
          p.card(xr + (p.r(k, row + 5) - .5) * .15 + .12, y, hk * .5, wC, hk, (u, v) => {
            const h = (v + 1) / 2, uu = (u + lean * (h - .35)) * 1.5, q = 1 - h;
            if (Math.abs(uu) > Math.pow(q, .55) * 1.75 + .14) return 0;   // cheap reject outside the widest possible flame
            const m = p.flameShape(uu, v, t * 1.6, seed, 1.25);
            if (m <= 0) return 0;
            const streak = .8 + .3 * Math.sin(uu * 6.5 + seed + 2.2 * Math.sin(h * 4.7 - t * 7.3 + seed));
            const core = Math.min(1, m * 3.2);
            return (h < .16 ? 1.02 : .95 - .55 * h) * (.45 + .55 * core) * streak;
          }, ramp, Ir);
        }
      }
      // white-hot base line and ground light along the front
      const lI = Math.min(1, Hm / H0);
      p.line([W + .02, -YS * .97, .06], [W + .02, YS * .97, .06], .16, F, 1.25 * lI, { w1: .16 });
      for (let k = 0; k < 7; k++) p.light(W + .35, -YS + (k + .5) / 7 * 2 * YS, 0, 1.55, F, .95 * lI);
      p.light(W - depth, 0, 0, 2.6, DP, .5 * lI);
    }
    // ---- embers rising from the wall and trailing behind ----
    const nE = Math.round(30 * p.density);
    for (let k = 0; k < nE; k++) {
      const born = CAST + .15 + (k / nE) * (HIT - CAST) + p.r(k, 91) * .12, age = t - born, life = .7 + .6 * p.r(k, 92);
      if (age < 0 || age > life) continue;
      const Wb = this.wallX(p, born), y = (p.r(k, 93) * 2 - 1) * YS * .95, z0 = H0 * (.3 + .6 * p.r(k, 94));
      const x = Wb - depth * .4 - p.drag(1.4, 2.5, age) - .2 * p.r(k, 95), z = z0 + p.drag(1.6, 1.8, age);
      p.dot(x, y + Math.sin(age * 7 + k) * .1, z, F, 1.1 * (1 - age / life), 1);
    }
    // ---- scorched ground embers + smouldering ash piles ----
    if (t > CAST + .2 && scK > 0) {
      const nG = Math.round(22 * p.density);
      for (let k = 0; k < nG; k++) {
        const gx = this.X0 + p.r(k, 101) * (this.X1 - this.X0), gy = (p.r(k, 102) * 2 - 1) * YS * .9;
        if (gx > W - .25) continue;
        const fl = .5 + .5 * Math.sin(t * (5 + 4 * p.r(k, 103)) + k * 2.1);
        p.dot(gx, gy, .03, DP, (.55 + .45 * fl) * scK * (1 - .5 * p.ph(t, HIT, 3.9)), 1);
      }
    }
    for (const s of crowd) {
      if (s.hitT == null || s.fresh || t < s.hitT + 1.05) continue;
      const fade = 1 - p.ph(t, 3.95 + s.u.r2 * .3, 4.25 + s.u.r2 * .3);
      if (fade <= 0) continue;
      const fl = .55 + .45 * Math.sin(t * 6 + s.u.i * 1.7);
      p.dot(s.x + (s.u.r3 - .5) * .1, s.y, .07, DP, .9 * fl * fade, 1);
      if (s.u.r1 > .5) p.dot(s.x, s.y, .12 + ((t * .6 + s.u.r2) % 1) * .4, DP, .8 * fade * (1 - ((t * .6 + s.u.r2) % 1)), 1);
    }
    // ---- the crash at the far edge ----
    if (a >= 0 && a < .9) {
      const fl = Math.pow(1 - p.ph(a, 0, .3), 2);
      if (fl > 0) {
        p.glow(this.X1 + .1, 0, H0 * .45, H0 * .45, F, 1.3 * fl, { pow: 1.2 });
        for (let k = 0; k < 9; k++) {
          const y = -YS * .9 + k / 8 * YS * 1.8, L = (.8 + .8 * p.r(k, 111)) * p.easeOutExpo(a / .2) * H0 * .45;
          const b = [this.X1, y, .2 + H0 * .25 * p.r(k, 112)];
          p.line(b, [b[0] + L, b[1] + (p.r(k, 113) - .5) * .4, b[2] + L * .5], .3 * fl + .05, F, 1.1 * fl, { w1: .03, i1: .2 });
        }
      }
      if (a < .2) p.speedLines(this.X1, 0, H0 * .45, { n: 12, R0: H0 * .6, R1: 4.6, ramp: F, I: 1.4 * (1 - a / .2), seed: Math.floor(t * 30) });
      const nB = Math.round(20 * p.density);
      for (let k = 0; k < nB; k++) {
        const d = p.rdir(k, 121, .5), sv = 2 + 2.5 * p.r(k, 122), tt = a, life = .5 + .4 * p.r(k, 123);
        if (tt > life) continue;
        const x = this.X1 + Math.abs(d[0]) * p.drag(sv, 3, tt), y = (p.r(k, 124) * 2 - 1) * YS * .9 + d[1] * p.drag(sv, 3, tt) * .5;
        p.dot(x, y, .3 + H0 * .3 * p.r(k, 125) + d[2] * p.drag(sv, 3, tt) - 2 * tt * tt, F, 1.2 * (1 - tt / life), 1);
      }
      p.light(this.X1, 0, 0, 3.4, F, .9 * Math.pow(1 - p.ph(a, 0, .7), 2));
    }
  },
});
