// 風刃手裏劍 / Gale Shuriken — Ultimates pack (original design): a spinning core grows curved wind blades, is thrown, and bursts into a storm sphere of tiny cuts
PXFX.define({
  id: 'gale-shuriken',
  loop: 4.2,
  beats: [{ t: 1.6, kind: 'cast', power: .9 }, { t: 2.15, kind: 'hit', power: 1.2 }, { t: 2.95, kind: 'pulse', power: .8 }],
  view: { r: 3.3, h: 3.3 },
  stage: { ground: 'moss', tiles: false },
  modules: ['figure', 'charge', 'core', 'slash', 'debris', 'shockwave', 'impact', 'aftermath'],
  palette: {
    wind: ['#3f86c0', '#5aaee0', '#9ae8ff', '#d2f6ff', '#ffffff'],
    pale: ['#7fb0d0', '#bfe4f4', '#f2fcff', '#ffffff'],
    dust: ['#55634c', '#6b7a60', '#839176', '#9ca88e'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者舉起右手過頭（0.35 秒，回彈緩動）', en: 'pose: the caster raises the right hand overhead (0.35 s, overshoot ease)' },
    { k: 'charge', t: [.35, 1.6], zh: '集氣：掌上 0.5 單位出現藍白核心，風粒匯聚；轉速 1.25 秒內由 0 加到每秒約 4.5 圈（越轉越快）；0.6 秒起 4 片彎月風刃由核心長出（半徑 0.62，回彈緩動），外圈一條旋轉虛線風環，刀尖拖弧形殘影', en: 'charge: a blue-white core appears 0.5 units above the palm while wind motes gather; the spin rises from 0 to about 4.5 turns per second over 1.25 s; from 0.6 s 4 curved wind blades grow out of the core (radius 0.62, overshoot ease), with a dashed spinning ring outside and arc smears behind the blade tips' },
    { k: 'shape', t: [1.6, 1.68], zh: '成形：0.08 秒內揮臂投擲，手裏劍以刀面（含飛行方向）脫手', en: 'shape: a throwing swing in 0.08 s; the shuriken leaves the hand edge-first (its plane contains the flight direction)' },
    { k: 'motion', t: [1.6, 2.15], zh: '推進：沿微弧線先急衝再加速飛向目標（0.55 秒），後方 3 條螺旋氣流線＋直線風痕', en: 'motion: a quick kick, then accelerating along a shallow arc into the target (0.55 s), trailing 3 helix air lines and straight wind streaks' },
    { k: 'impact', t: [2.15, 2.95], zh: '命中：0.2 秒膨脹成半徑 1.3 的旋轉風暴球（螺旋條紋球殼＋亮邊），球內 22 道短白斬擊隨機閃現（每道 0.12–0.2 秒），碎屑繞球旋轉；2.7 秒起 0.25 秒收縮成一點並白閃', en: 'impact: in 0.2 s it swells into a spinning storm sphere of radius 1.3 (spiral-striped shell with a bright rim); 22 short white cuts flash at random inside it (0.12–0.2 s each) and debris circles it; from 2.7 s it collapses to a point in 0.25 s with a white flash' },
    { k: 'after', t: [2.95, 4.2], zh: '餘波：收縮點放出地面風環與塵土，地面留下放射刀痕（淡藍光後淡出），施法者回到站姿', en: 'aftermath: the collapse releases a ground wind ring and dust, radial cut marks stay on the ground (pale blue, fading), the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→舉手→投擲揮臂→待機', en: 'caster: faceless mannequin, poses idle → hand raised → throwing swing → idle' },
    { zh: '手裏劍平面：法線約 (0, 0.55, 0.83)，平面包含飛行方向 +x；所有部件在此平面內旋轉', en: 'shuriken plane: normal about (0, 0.55, 0.83), containing the +x flight direction; every part spins in this plane' },
    { zh: '風刃：每片為一條彎月形發光條帶（根部寬、刀尖尖，刀尖向後彎），前緣最亮後緣漸暗；2–6 片平均分佈', en: 'blades: each a crescent-shaped light strip (wide at the root, pointed tip curving backwards), brightest on the leading edge, dimmer at the trailing edge; 2–6 spaced evenly' },
    { zh: '核心與風環：白熱核心＋光暈；外圈虛線風環以 1.5 倍轉速旋轉；刀尖拖 8 段漸暗弧形殘影', en: 'core and ring: a white-hot core with a halo; a dashed outer ring spinning 1.5x faster; 8-step fading arc smears behind each tip' },
    { zh: '飛行：3 條沿飛行路徑的螺旋線（半徑 0.3，越後越細越暗）＋4 條直線風痕', en: 'flight: 3 helix lines around the flight path (radius 0.3, thinner and dimmer further back) plus 4 straight wind streaks' },
    { zh: '風暴球：球殼以經度螺旋條紋＋菲涅耳亮邊表示，條紋隨時間旋轉；背面 35% 亮度；球內短白斬擊隨機出現，12 塊碎屑繞球飛轉', en: 'storm sphere: the shell shows twisted longitude stripes plus a fresnel rim, the stripes rotating over time; the back face at 35%; short white cuts pop at random inside; 12 debris bits whirl around it' },
    { zh: '地面：風球下方旋轉光環、收縮後的地面衝擊環與塵土、7 道放射刀痕', en: 'ground: a spinning light ring under the sphere, a ground shock ring with dust after the collapse, 7 radial cut marks' },
  ],
  params: {
    blades: { zh: '風刃數量', en: 'blade count', min: 2, max: 6, step: 1, value: 4 },
    sphereSize: { zh: '風暴球大小', en: 'storm sphere size', min: .7, max: 1.8, step: .05, value: 1.3 },
    cuts: { zh: '球內斬擊數量', en: 'micro-slash count', min: 0, max: 60, step: 1, value: 22 },
  },
  // spin angle: accelerating while charging (whine up), then a steady fast spin
  spin(t) {
    const t0 = .35, t1 = 1.6, w = 28;
    if (t < t0) return 0;
    if (t < t1) return w * (t - t0) * (t - t0) / (2 * (t1 - t0));
    return w * (t1 - t0) / 2 + w * (t - t1);
  },
  path(p, u, S, T) {
    const k = .12 * p.easeOutCubic(Math.min(1, u / .2)) + .88 * Math.pow(u, 1.8);
    return p.arcPos(S, T, k, .35);
  },
  // the shuriken in its plane: core, curved blades, dashed ring, tip smears. g = blade growth 0..1
  shuriken(p, c, e1, e2, N, th, g, I, n) {
    const W = this.palette.wind, PL = this.palette.pale, R = .88 * g;
    const P = (a, r) => [c[0] + (e1[0] * Math.cos(a) + e2[0] * Math.sin(a)) * r, c[1] + (e1[1] * Math.cos(a) + e2[1] * Math.sin(a)) * r, c[2] + (e1[2] * Math.cos(a) + e2[2] * Math.sin(a)) * r];
    if (R > .04) {
      for (let k = 0; k < n; k++) {
        const a0 = th + k / n * p.TAU, L = [], Rt = [], S = 10;
        for (let j = 0; j <= S; j++) {
          const s = j / S, rr = .08 + (R - .08) * s, aL = a0 - 1.05 * s * s, wid = .3 * R * Math.max(0, Math.sin(Math.PI * Math.min(1, .25 + s * .8)));
          L.push(P(aL, rr)); Rt.push(P(aL - wid / Math.max(rr, .05), rr * .95));
        }
        p.ribbon(L, Rt, (u, v) => (v < .3 ? 1.25 : .62 - .3 * v) * Math.min(1, u / .12 + .4), W, I);
        p.trail(L, .045, .015, PL, 1.1 * I, .9 * I);
        const tipA = a0 - 1.05, sm = [];
        for (let q = 0; q <= 7; q++) sm.push(P(tipA - q * .16, R * (1 - q * .015)));
        p.trail(sm, .05, .01, W, .8 * I, 0);
      }
      p.ring(c[0], c[1], c[2], R * 1.1, .035, W, .65 * I, { axis: N, fn: q => (Math.sin(q * 6 - th * 1.5) > -.2 ? 1 : 0) });
    }
    p.glow(c[0], c[1], c[2], .24 + .08 * g, W, .5 * I);
    p.orb(c[0], c[1], c[2], .1 + .03 * g, W, 1.25 * I);
  },
  draw(p, t) {
    const W = this.palette.wind, PL = this.palette.pale, DU = this.palette.dust;
    const X0 = -2.1, HX = 2.35, CAST = 1.6, HIT = 2.15, COL = 2.7, END = 2.95;
    const nB = Math.round(p.param('blades')), SS = p.param('sphereSize'), nC = Math.round(p.param('cuts') * p.density);
    const N = p.v3.norm([0, .55, .83]), e1 = [1, 0, 0], e2 = p.v3.cross(N, e1), th = this.spin(t);
    // ---- caster pose ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(t / .35, 1.4) };
    else if (t < CAST) pose = 'raise';
    else if (t < CAST + .08) pose = { a: 'raise', b: 'swing', k: p.easeInCubic(p.ph(t, CAST, CAST + .08)) };
    else if (t < 2.7) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.7, 3.5)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose });
    const S = [X0 + .1, 0, 2.2], T = [HX, 0, 1.05];
    // ---- ground cut marks (stain first) ----
    if (t > HIT + .1) p.aftermath(HX, 0, SS + .2, 'crack', { amt: 1 - p.ph(t, 3.6, 4.15), n: 7, ramp: PL, glow: .7 * (1 - p.ph(t, END, 3.9)), seed: 6, color: '#33402e' });
    // ---- debris whirling round the storm sphere ----
    const a = t - HIT, sw = a >= 0 && t < END ? (t < COL ? p.easeOutBack(p.ph(a, 0, .2), 1.6) : 1 - p.easeInCubic(p.ph(t, COL, END))) : 0;
    const RS = SS * sw;
    if (RS > .05) {
      const nD = Math.round(12 * p.density);
      for (let k = 0; k < nD; k++) {
        const ang = k / nD * p.TAU + a * (6 + p.r(k, 1) * 3), rr = RS * (.75 + .3 * p.r(k, 2)), z = T[2] - .5 + p.r(k, 3) * 1.2 * SS * sw;
        p.rock(T[0] + Math.cos(ang) * rr, Math.sin(ang) * rr, Math.max(.05, z), .05 + p.r(k, 4) * .04, DU, k);
      }
    }
    // ---- charge: core over the palm, blades grow, spin whines up ----
    if (t >= .35 && t < CAST) {
      const c = [fig.hand[0], fig.hand[1], fig.hand[2] + .58], on = p.easeOutCubic(p.ph(t, .35, .6)), g = p.easeOutBack(p.ph(t, .6, 1.2), 1.8);
      p.charge(c[0], c[1], c[2], p.ph(t, .35, 1.45), { n: 16, R: 1.3, ramp: W, seed: 3, len: .3 });
      this.shuriken(p, c, e1, e2, N, th, g, on * (.8 + .3 * p.ph(t, .6, CAST)), nB);
      p.light(c[0], 0, 0, 1.2 + .6 * g, W, .5 * on);
    }
    // ---- flight with a spiral air trail ----
    if (t >= CAST && t < HIT) {
      const u = p.ph(t, CAST, HIT), pos = this.path(p, u, S, T);
      for (let h = 0; h < 3; h++) {
        const pts = [];
        for (let q = 0; q <= 12; q++) {
          const uq = Math.max(0, u - q * .045), c = this.path(p, uq, S, T), ph = q * .9 - t * 18 + h * p.TAU / 3, rr = .32 * (1 - q / 14);
          pts.push([c[0], c[1] + Math.cos(ph) * rr, c[2] + Math.sin(ph) * rr]);
        }
        p.trail(pts, .07, .015, PL, .9, .05);
      }
      for (let k = 0; k < 4; k++) {
        const off = [(p.r(k, 5) - .5) * .5, (p.r(k, 6) - .5) * .6], b = this.path(p, Math.max(0, u - .25 - p.r(k, 7) * .15), S, T);
        p.line([b[0], b[1] + off[0], b[2] + off[1]], [pos[0] - .3, pos[1] + off[0], pos[2] + off[1]], .03, PL, .5, { w1: .02, i1: .7 });
      }
      this.shuriken(p, pos, e1, e2, N, th, 1, 1.05, nB);
      p.light(pos[0], 0, 0, 1.6, W, .7);
    }
    // ---- the storm sphere ----
    if (RS > .05) {
      const rot = a * 7;
      p.shell(T[0], 0, T[2], RS, (nx, ny, nz, rim) => {
        const lon = Math.atan2(ny, nx), str = Math.sin(lon * 5 + nz * 5 - rot);
        return (str > .55 ? .75 : str > .2 ? .25 : 0) + Math.pow(rim, 2.4) * .9;
      }, W, .95, { back: .35 });
      p.ring(T[0], 0, .03, RS * 1.05, .06, W, .7, { fn: q => (Math.sin(q * 6 + rot * 1.3) > 0 ? 1 : .2) });
      p.ring(T[0], 0, T[2], RS * .45, .05, PL, .6, { axis: N, fn: q => (Math.sin(q * 3 - rot * 2) > .2 ? 1 : 0) });
      // tiny cuts flashing inside
      for (let k = 0; k < nC; k++) {
        const per = .12 + p.r(k, 11) * .08, cyc = a / per + p.r(k, 12), ci = Math.floor(cyc), uu = cyc - ci;
        if (ci < 0 || a < .08) continue;
        const d = p.rdir(k * 17 + ci * 5, 13), rr = RS * .85 * Math.cbrt(p.r(k * 7 + ci, 14)), q = [T[0] + d[0] * rr, d[1] * rr, T[2] + d[2] * rr];
        const s = p.rdir(k * 19 + ci * 3, 15), L = .15 + p.r(k + ci, 16) * .18;
        p.slash([q[0] - s[0] * L, q[1] - s[1] * L, q[2] - s[2] * L], [q[0] + s[0] * L, q[1] + s[1] * L, q[2] + s[2] * L], { u: uu, ramp: PL, w: .065, I: 1.5 });
      }
      p.glow(T[0], 0, T[2], RS * .5, W, .35);
      p.light(T[0], 0, 0, RS + 1, W, .7);
    }
    // impact flash at the hit
    if (a >= 0 && a < .3) {
      const fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (fl > 0) p.glow(T[0], 0, T[2], .4 + .8 * fl, W, 1.5 * fl, { pow: 1.3 });
      if (a < .15) p.speedLines(T[0], 0, T[2], { n: 14, R0: .7, R1: 2.6, ramp: PL, I: 1 - a / .15, seed: Math.floor(t * 30) });
    }
    // ---- collapse: flash, ground wind ring, dust ----
    const b = t - END;
    if (b >= -.05 && b < .8) {
      const fl = Math.pow(1 - p.ph(b, -.05, .12), 2);
      if (fl > 0) { p.glow(T[0], 0, T[2], .2 + .6 * fl, W, 1.4 * fl, { pow: 1.4 }); p.sparkle(T[0], 0, T[2], 3 + 8 * fl, PL, 1.3 * fl); }
      if (b >= 0) p.shock(T[0], 0, 0, p.ph(b, 0, .6), { R: 2 * SS + .2, w: .16, ramp: W, dust: DU, dustN: 12 });
    }
  },
});
