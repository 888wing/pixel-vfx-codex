// 螺旋掌波 / Spiral Palm Wave — Ultimates pack (original design): coiling aura rings compress into the palms, then a double palm thrust fires a widening cone of light and wind
PXFX.define({
  id: 'spiral-palm-wave',
  loop: 4.0,
  beats: [{ t: 1.5, kind: 'cast', power: 1.1 }, { t: 1.78, kind: 'hit', power: 1.3 }],
  view: { r: 3.3, h: 3.0 },
  stage: { ground: 'grass', tiles: false },
  modules: ['figure', 'charge', 'core', 'aura', 'swarm', 'shockwave', 'impact', 'aftermath'],
  palette: {
    light: ['#3a78c8', '#4ea2e8', '#7cc4f8', '#9ad8ff', '#d4f0ff', '#ffffff'],
    wind: ['#6f9cc4', '#a4cce8', '#d8eefa', '#ffffff'],
    dust: ['#6a7a5a', '#82916e', '#9aa884', '#b2bf9a'],
    leaf: ['#3e6a34', '#5a8a44', '#7aa858', '#9cc470'],
  },
  timeline: [
    { k: 'pose', t: [0, .4], zh: '起手：施法者下蹲成蓄力式，雙手收在腰側（0.4 秒）', en: 'pose: the caster drops into a crouched charge stance, hands cupped at the hip (0.4 s)' },
    { k: 'charge', t: [.4, 1.5], zh: '集氣：4 圈傾斜光環由腳下螺旋上升到頭頂，24 粒光點沿螺旋上升；1.25 秒起光環與光點全部向內收縮，壓縮成雙掌間半徑 0.08 的白熱小核', en: 'charge: 4 tilted rings coil upwards from the feet to above the head and 24 motes rise on a spiral; from 1.25 s every ring and mote is pulled inwards and compressed into a white-hot core of radius 0.08 between the palms' },
    { k: 'shape', t: [1.5, 1.57], zh: '成形：0.07 秒內雙掌前推，小核爆開成一個沿 +x 方向張開的錐形光波（半角 16°），掌前星芒閃光', en: 'shape: a double palm thrust in 0.07 s; the core bursts into a cone of light opening along +x (16° half-angle), with a star flash at the palms' },
    { k: 'motion', t: [1.5, 1.78], zh: '推進：錐形前沿 0.28 秒推到目標；錐內 6 圈由小到大的光環（虛線、旋轉），3 條螺旋光線與 24 粒風粒沿錐面旋轉前進，錐身 8 條母線勾出輪廓', en: 'motion: the cone front reaches the target in 0.28 s; inside it 6 rings of increasing radius (dashed, spinning), 3 helix lines and 24 wind motes swirl forwards, 8 faint generator lines outline the cone' },
    { k: 'impact', t: [1.78, 2.2], zh: '命中：前沿撞上目標，豎立圓形壓力環（面向 +x、半徑 2）雙層擴散，地面衝擊環＋草屑塵土，白閃與放射速度線，風線從目標兩側掠過', en: 'impact: the front hits the target: a double upright pressure ring (facing +x, radius 2) expands, a ground shock ring with dust, a white flash and radial speed lines, wind streaks rushing past both sides of the target' },
    { k: 'after', t: [2.2, 4.0], zh: '餘波：錐形光環向外擴散淡出，塵土落下，施法者收掌回站姿', en: 'aftermath: the cone rings drift outwards and fade, dust settles, the caster draws the palms back to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→蓄力下蹲（雙手腰側）→0.07 秒雙掌前推→待機', en: 'caster: faceless mannequin, poses idle → crouched charge (hands at the hip) → a 0.07 s double palm thrust → idle' },
    { zh: '螺旋氣環：4 個光環繞身體，傾斜軸隨時間旋進，由下往上循環升起並在頂端淡出', en: 'coil rings: 4 rings around the body on a precessing tilted axis, cycling upwards and fading at the top' },
    { zh: '集氣核心：雙掌間硬邊亮球，先長大後壓縮變小變亮，周圍 4 條旋轉光芒', en: 'charge core: a hot orb between the palms that grows, then compresses smaller and brighter, with 4 rotating rays' },
    { zh: '錐形光波：錐頂在掌前，沿 +x 張開；錐內一串面向 +x 的光環（越前越大越亮，虛線圖樣旋轉），最前一圈為最亮的前沿', en: 'cone wave: apex at the palms, opening along +x; a row of rings facing +x inside it (larger and brighter towards the front, with spinning dashes), the leading ring brightest' },
    { zh: '螺旋：3 條沿錐面旋轉的螺旋光線＋風粒子，表示氣流旋轉前進', en: 'spiral: 3 helix lines winding along the cone plus wind motes, showing the air twisting forwards' },
    { zh: '命中：兩層豎立壓力環（easeOutExpo 擴張、越大越細）、地面衝擊環＋12 團塵土、16 條速度線、8 條掠過目標的風線', en: 'impact: two upright pressure rings (easeOutExpo, thinning as they grow), a ground ring with 12 dust puffs, 16 speed lines, 8 wind streaks rushing past the target' },
  ],
  params: {
    coneAngle: { zh: '錐形半角（度）', en: 'cone half-angle (deg)', min: 8, max: 24, step: 1, value: 16 },
    rings: { zh: '錐內光環數量', en: 'ring count', min: 2, max: 12, step: 1, value: 6 },
    spiral: { zh: '螺旋粒子數量', en: 'spiral particles', min: 0, max: 60, step: 1, value: 24 },
  },
  // cone front progress: an instant burst out of the palms, then pushing on, gaining speed
  front(p, u) { return .3 * p.easeOutExpo(Math.min(1, u / .12)) + .7 * Math.pow(u, 1.5); },
  draw(p, t) {
    const L = this.palette.light, WD = this.palette.wind, DU = this.palette.dust;
    const X0 = -2.1, HX = 2.35, CAST = 1.5, HIT = 1.78, ang = p.param('coneAngle') * Math.PI / 180, nR = Math.round(p.param('rings'));
    const nP = Math.round(p.param('spiral') * p.density), tg = Math.tan(ang);
    // ---- caster pose ----
    let pose, lean = 0;
    if (t < .4) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(t / .4) };
    else if (t < CAST) pose = { a: 'charge', b: 'palm', k: .22 * p.easeOutCubic(p.ph(t, .4, 1)) - .1 * p.easeInCubic(p.ph(t, 1.2, CAST)) };
    else if (t < CAST + .07) pose = { a: 'charge', b: 'palm', k: .12 + .88 * p.easeOutBack(p.ph(t, CAST, CAST + .07), 1.5) };
    else if (t < 2.6) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.6, 3.4)) };
    if (t >= CAST) lean = .15 * p.easeOutCubic(p.ph(t, CAST, CAST + .07)) * (1 - p.ph(t, 2.4, 3.2));
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose, lean });
    const mid = p.v3.lerp(fig.hand, fig.handL, .5);
    const a = t - HIT;
    // ---- aftermath on the ground: grass flattened in a wedge along the cone ----
    const apex0 = [X0 + .6, 0];
    if (t > CAST + .05) {
      const reach = Math.min(1, this.front(p, p.ph(t, CAST, HIT))), xEnd = apex0[0] + (HX - apex0[0]) * reach, amt = 1 - p.ph(t, 3, 3.8), cx = (apex0[0] + xEnd) / 2;
      if (amt > 0 && xEnd > apex0[0] + .1) p.stain(cx, 0, (xEnd - apex0[0]) / 2 + (xEnd - apex0[0]) * tg + .1, (dx, dy) => {
        const d = dx + cx - apex0[0];
        if (d < 0 || d > xEnd - apex0[0]) return 0;
        const w = d * tg * .75 + .05;
        return Math.abs(dy) < w ? .45 + .5 * (p.noise(d * 1.5, dy * 9) > .55 ? 1 : 0) : 0;
      }, p.night ? '#3e5a36' : '#a8c47a', amt);
    }
    // ---- grass bits tossed up at the hit, fluttering down ----
    const nL = Math.round(10 * p.density);
    for (let k = 0; k < nL; k++) {
      const b = a - p.r(k, 21) * .08;
      if (b <= 0 || b > 1.9) continue;
      const side = p.r(k, 22) * 2 - 1, up = 1.4 + p.r(k, 23) * 1.4, fall = Math.max(0, b - .35);
      const x = HX - .2 + p.drag(1.6 + p.r(k, 24) * 1.4, 3, b), y = side * p.drag(1.8, 3, b) + Math.sin(b * 6 + k) * .12;
      const z = Math.max(.02, .3 + p.drag(up * 2, 4, b) - fall * fall * .9 - fall * .35);
      const sz = .07 * (1 - p.ph(b, 1.5, 1.9)), sp = b * (5 + k) + k;
      if (sz < .01) continue;
      const c = Math.cos(sp) * sz, s2 = Math.sin(sp) * sz;
      p.tri([x + c, y + s2, z], [x - c, y - s2, z + sz * .4], [x + s2 * .6, y - c * .6, z - sz * .8], this.palette.leaf, { shade: .5 + .4 * Math.sin(sp * 1.3) });
    }
    // ---- charge: coil rings rising around the body, compressing into the palms ----
    const ch = p.ph(t, .4, CAST), comp = p.easeInCubic(p.ph(t, 1.22, CAST));
    const core = [mid[0] + .2, mid[1], mid[2] + .04];
    if (t >= .3 && t < CAST) {
      const on = p.easeOutCubic(p.ph(t, .3, .7));
      for (let k = 0; k < 4; k++) {
        const ph = (t * .75 + k / 4) % 1, z = .1 + ph * 1.8, pa = t * 2.2 + k * 1.7;
        const ax = p.v3.norm([Math.cos(pa) * .38, Math.sin(pa) * .38, 1]);
        const rr = (.42 + .14 * Math.sin(ph * Math.PI)) * (1 - comp);
        const c = p.v3.lerp([X0, 0, z], core, comp);
        const I = on * Math.sin(Math.PI * ph) * (.75 + .3 * comp);
        if (rr > .03 && I > .02) p.ring(c[0], c[1], c[2], rr, .045, L, I, { axis: ax, fn: q => .55 + .45 * Math.sin(q * 2 + t * 9 + k) });
      }
      for (let k = 0; k < nP; k++) {
        const fp = p.formation('spiral', k, nP, t, { c: [X0, 0, 0], R: .62, H: 2, spin: 2.6 });
        const q = p.v3.lerp(fp, core, comp), fade = on * (.5 + .5 * p.r(k, 3));
        p.dot(q[0], q[1], q[2], L, fade, 1);
        if (k % 3 === 0) p.line(q, [q[0], q[1], q[2] - .22 * (1 - comp)], .04, L, .6 * fade, { w1: .01, i1: .05 });
      }
      p.aura(X0, 0, 0, { r: .42, h: 1.6, ramp: L, I: .45 * on * (1 - comp), t, n: 8, seed: 4 });
      const r = (.06 + .1 * p.easeOutCubic(ch)) * (1 - .45 * comp);
      p.core(core[0], core[1], core[2], { r, ramp: L, I: .8 + .6 * comp, t, rays: 4, spin: 3 + 8 * comp, rayLen: 2 + comp * 2, halo: 2.4 });
      p.light(X0, 0, 0, 1.2, L, .5 * on);
    }
    // ---- the cone wave ----
    const u = p.ph(t, CAST, HIT), apex = [mid[0] + .15, 0, mid[2]];
    const dMax = HX - .25 - apex[0];
    if (t >= CAST && t < HIT + .4) {
      const D = dMax * this.front(p, u) + (t > HIT ? .5 * p.easeOutCubic(p.ph(t, HIT, HIT + .4)) : 0);
      const fade = 1 - p.ph(t, HIT, HIT + .4), I0 = Math.pow(fade, 1.6);
      const P = (d, a2, rad) => [apex[0] + d, apex[1] + Math.cos(a2) * rad, apex[2] + Math.sin(a2) * rad];
      // generator lines outlining the cone
      for (let k = 0; k < 6; k++) {
        const a2 = k / 6 * p.TAU + t * 1.5;
        p.line(apex, P(D, a2, D * tg), .03, L, .3 * I0, { w1: .05, i1: .5 * I0 });
      }
      // rings of increasing radius, dashed and spinning; the front is brightest
      for (let k = 0; k < nR; k++) {
        const s = Math.pow((k + 1) / nR, .8), d = D * s, rad = Math.max(.05, d * tg) * (1 + (t > HIT ? .2 * p.easeOutCubic(p.ph(t, HIT, HIT + .4)) : 0));
        const lead = k === nR - 1, sp = (k % 2 ? 1 : -1) * (6 + k);
        p.ring(apex[0] + d, 0, apex[2], rad, lead ? .09 : .05, L, I0 * (lead ? 1.15 : .35 + .5 * s), { axis: [1, 0, 0], fn: lead ? null : q => (Math.sin(q * 5 + t * sp) > -.3 ? 1 : .15) });
      }
      // leading front glow + light pooled under the cone
      p.glow(apex[0] + D, 0, apex[2], D * tg * .9 + .15, L, .45 * I0);
      // helix lines winding along the cone
      for (let h = 0; h < 3; h++) {
        const pts = [];
        for (let j = 0; j <= 18; j++) { const s = j / 18, d = D * s; pts.push(P(d, s * 4.5 * Math.PI - t * 14 + h * p.TAU / 3, d * tg * .8)); }
        p.trail(pts, .02, .08, WD, .25 * I0, 1 * I0);
      }
      // wind motes riding the spiral
      for (let k = 0; k < nP; k++) {
        const s = ((t - CAST) * (1.6 + p.r(k, 7)) + p.r(k, 8)) % 1, d = D * Math.sqrt(s);
        const a2 = p.r(k, 9) * p.TAU + s * 9 - t * 6, rad = d * tg * (.3 + .65 * p.r(k, 10));
        const q = P(d, a2, rad), q2 = P(Math.max(0, d - .25), a2 - .4, rad);
        p.line(q2, q, .035, WD, .9 * I0, { w1: .015, i1: .15 * I0 });
      }
      p.light(apex[0] + D * .6, 0, 0, D * .55 + .4, L, .5 * I0);
      // palm flash at the release
      const mf = Math.pow(1 - p.ph(t, CAST, CAST + .14), 2);
      if (mf > 0) { p.glow(apex[0], 0, apex[2], .2 + .4 * mf, L, 1.4 * mf, { pow: 1.4 }); p.sparkle(apex[0], 0, apex[2], 3 + 8 * mf, L, 1.3 * mf); }
    }
    // ---- impact: pressure rings, ground shock, wind rushing past ----
    if (a >= 0 && a < 1) {
      const T = [HX - .2, 0, apex[2]], fl = Math.pow(1 - p.ph(a, 0, .15), 2), cf = p.cam().fwd, pax = p.v3.norm([1 + .4 * cf[0], .4 * cf[1], .4 * cf[2]]);
      if (fl > 0) p.glow(T[0], 0, T[2], .4 + .9 * fl, L, 1.5 * fl, { pow: 1.3 });
      p.shock(T[0], 0, T[2], p.ph(a, 0, .45), { R: 2.1, w: .26, ramp: L, axis: pax, light: false });
      p.shock(T[0] + .25, 0, T[2], p.ph(a, .08, .6), { R: 1.6, w: .14, ramp: WD, axis: pax, light: false });
      p.shock(HX, 0, 0, p.ph(a, .02, .6), { R: 2, w: .14, ramp: L, dust: DU, dustN: 12 });
      if (a < .2) p.speedLines(T[0], 0, T[2], { n: 16, R0: .6, R1: 2.6, ramp: L, I: 1 - a / .2, seed: Math.floor(t * 30) });
      const nW = Math.round(8 * p.density);
      for (let k = 0; k < nW; k++) {
        const s = p.ph(a, p.r(k, 13) * .15, .35 + p.r(k, 13) * .15);
        if (s <= 0 || s >= 1) continue;
        const side = k % 2 ? 1 : -1, y = side * (.45 + p.r(k, 14) * .5), z = .3 + p.r(k, 15) * 1.4, x = HX - .6 + p.easeOutCubic(s) * 1.8;
        p.line([x - .5 * (1 - s) - .2, y, z], [x, y + side * .1 * s, z], .04, WD, 1 - s, { w1: .015 });
      }
      p.light(HX, 0, 0, 2.2, L, Math.max(fl, .4 * (1 - p.ph(a, 0, .6))));
    }
  },
});
