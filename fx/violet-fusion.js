// 紅藍合紫 / Violet Fusion — Ultimates pack (original design): a blue and a red orb spiral together, fuse into a violet sphere and plough through the target
PXFX.define({
  id: 'violet-fusion',
  loop: 4.6,
  beats: [{ t: 1.7, kind: 'pulse', power: .8 }, { t: 2.15, kind: 'cast', power: 1 }, { t: 3.05, kind: 'hit', power: 1.4 }],
  view: { r: 3.4, h: 3.0 },
  stage: { ground: 'dirt', tiles: false },
  modules: ['figure', 'charge', 'core', 'grade', 'shockwave', 'debris', 'impact', 'aftermath'],
  palette: {
    blue: ['#2440a8', '#2f6ee0', '#4ea6ff', '#9ad6ff', '#eaf7ff'],
    red: ['#9a1a3a', '#d42a3c', '#ff5a48', '#ffa07a', '#fff0e4'],
    violet: ['#4a1f9a', '#6a2cc8', '#9442ec', '#b45cff', '#d89cff', '#f2dcff', '#ffffff'],
    rock: ['#3c2c2a', '#584238', '#745a4a', '#907460'],
    smoke: ['#3a2e3c', '#52444e', '#6c5c64', '#86767a'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿張開雙臂（0.35 秒），兩掌向左右兩側', en: 'pose: the caster spreads both arms to the sides in 0.35 s, palms out' },
    { k: 'charge', t: [.3, 1.7], zh: '集氣：左掌凝聚藍球、右掌凝聚紅球（半徑 0.2，各有 4 條反向旋轉光芒，光點匯聚）；1.0 秒起兩球沿傾斜螺旋繞圈靠近，1.3 圈，越近越快並收縮變亮；環境壓暗 30%', en: 'charge: a blue orb forms at the left palm and a red orb at the right (radius 0.2, 4 rays each spinning opposite ways, motes converging); from 1.0 s they spiral together on a tilted plane, 1.3 turns, accelerating and shrinking brighter; the scene darkens 30%' },
    { k: 'shape', t: [1.7, 2.15], zh: '成形：兩球相撞，0.05 秒壓縮成白熱小點並閃白，再 0.2 秒回彈膨脹成半徑 0.6 的紫色巨球（白熱核心、流動電漿表面）；發射前球體收縮 12%', en: 'shape: the orbs collide, compress into a white-hot point for 0.05 s with a white flash, then spring out in 0.2 s into a violet sphere of radius 0.6 (white-hot core, flowing plasma surface); it contracts 12% before launch' },
    { k: 'motion', t: [2.15, 3.05], zh: '推進：雙掌前推，巨球起步緩慢再加速（0.9 秒）並下沉貼地，周圍空間被放射＋旋轉扭曲；後方拖長紫色能量尾與藍紅雙螺旋殘流，地面犁出深溝，碎石向兩側拋飛', en: 'motion: a double palm push; the sphere starts slow and accelerates (0.9 s), sinking to graze the ground, with a radial + swirl space warp around it; a long violet trail with a blue/red double helix behind, a deep trench ploughed and rocks thrown to both sides' },
    { k: 'impact', t: [3.05, 3.5], zh: '命中：巨球吞沒目標後爆開——紫白大閃光、球殼急速膨脹變薄、豎立衝擊環、地面衝擊波、24 粒火花、放射速度線', en: 'impact: the sphere swallows the target and bursts: a big violet-white flash, the shell balloons and thins, an upright shock ring, a ground shockwave, 24 sparks, radial speed lines' },
    { k: 'after', t: [3.5, 4.6], zh: '餘波：溝槽與命中焦痕慢慢淡出，塵煙上升散去，碎石落地後消失，施法者收掌回站姿', en: 'aftermath: the trench and the scorch fade, dust rises and thins, rocks settle and vanish, the caster lowers the arms to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→張臂→雙掌前推→待機，發射瞬間 0.07 秒前傾', en: 'caster: faceless mannequin, poses idle → arms spread → double palm push → idle, snapping into a forward lean in 0.07 s at launch' },
    { zh: '雙色球：藍球與紅球各為硬邊亮球＋光暈＋4 條旋轉光芒（藍順時針、紅逆時針），沿傾斜螺旋互繞靠近，各拖一段弧形殘影', en: 'twin orbs: a blue and a red hot orb, each with a halo and 4 rotating rays (blue clockwise, red counter-clockwise), circling each other on a tilted spiral, each with a short arc trail' },
    { zh: '紫色巨球：球面用兩層噪聲做流動電漿紋理＋菲涅耳亮邊，中心白熱核心，外圈光暈；4 粒光點繞球旋轉', en: 'violet sphere: a shell with two noise layers for flowing plasma plus a fresnel rim, a white-hot core and an outer halo; 4 motes orbit it' },
    { zh: '空間扭曲：以球心為中心、半徑約 2 倍球徑的螢幕扭曲，環形區域向外取樣並加旋轉，令地面與背景彎曲', en: 'space warp: a screen warp around the sphere (about 2x its radius) that samples outwards with a swirl in a ring, bending the ground and background' },
    { zh: '能量尾：由球後拖出長 3 單位的錐形紫光尾，內有藍、紅兩條雙螺旋光線反向流動', en: 'trail: a 3-unit tapered violet tail behind the sphere with a blue and a red line coiling around each other inside it' },
    { zh: '地面：沿路徑兩層污跡（外層翻土、內層深溝），溝底一道紫光；14 塊低多邊形碎石向兩側拋出落地，8 團塵煙上升', en: 'ground: two stain layers along the path (churned rim, dark groove) with a violet glow in the groove; 14 low-poly rocks thrown to both sides, 8 dust puffs rising' },
    { zh: '命中：大光暈閃光、膨脹球殼、豎立衝擊環＋地面衝擊波與塵土、24 粒受重力火花（紫為主、混藍紅）、16 條放射速度線，命中點留焦痕', en: 'impact: a big flash halo, a ballooning shell, an upright shock ring plus a ground shockwave with dust, 24 gravity sparks (mostly violet, some blue and red), 16 radial speed lines, a scorch at the hit point' },
  ],
  params: {
    sphereSize: { zh: '紫球大小', en: 'sphere size', min: .6, max: 1.4, step: .05, value: 1 },
    warp: { zh: '空間扭曲強度', en: 'warp strength', min: 0, max: 1, step: .05, value: .6 },
    trenchWidth: { zh: '溝槽寬度', en: 'trench width', min: .4, max: 1.6, step: .1, value: 1 },
    debris: { zh: '碎石數量', en: 'debris count', min: 0, max: 30, step: 1, value: 14 },
  },
  // rotate v about the unit axis k by angle a (Rodrigues)
  rot(v, k, a) {
    const c = Math.cos(a), s = Math.sin(a), d = (k[0] * v[0] + k[1] * v[1] + k[2] * v[2]) * (1 - c);
    return [v[0] * c + (k[1] * v[2] - k[2] * v[1]) * s + k[0] * d, v[1] * c + (k[2] * v[0] - k[0] * v[2]) * s + k[1] * d, v[2] * c + (k[0] * v[1] - k[1] * v[0]) * s + k[2] * d];
  },
  // push: a tiny kick, then a slow start that keeps accelerating
  travel(p, u) { return .05 * p.easeOutCubic(Math.min(1, u / .2)) + .95 * Math.pow(u, 2.3); },
  // inverse of travel (bisection), for the moment the sphere passes a point
  untravel(p, f) {
    let a = 0, b = 1;
    for (let k = 0; k < 14; k++) { const m = (a + b) / 2; if (this.travel(p, m) < f) a = m; else b = m; }
    return (a + b) / 2;
  },
  draw(p, t) {
    const BL = this.palette.blue, RD = this.palette.red, V = this.palette.violet, RK = this.palette.rock, SM = this.palette.smoke;
    const X0 = -2.1, HX = 2.35, FORM = .3, SPIN = 1.0, FUSE = 1.7, CAST = 2.15, HIT = 3.05;
    const sz = p.param('sphereSize'), RS = .66 * sz, tw = p.param('trenchWidth'), ws = p.param('warp');
    const C = [X0 + .5 + RS * .85, 0, 1.15], XE = HX - .15;
    // ---- caster pose ----
    let pose, lean = 0;
    if (t < .35) pose = { a: 'idle', b: 'spread', k: p.easeOutCubic(t / .35) };
    else if (t < SPIN) pose = 'spread';
    else if (t < FUSE - .1) pose = { a: 'spread', b: 'palm', k: p.ease(p.ph(t, SPIN, FUSE - .1)) };
    else if (t < 3.4) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.4, 4.2)) };
    if (t > 1.9 && t < CAST) lean = -.12 * p.easeOutCubic(p.ph(t, 1.9, CAST));
    else if (t >= CAST) lean = (-.12 + .32 * p.easeOutCubic(p.ph(t, CAST, CAST + .07))) * (1 - p.ph(t, 3.2, 4));
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose, lean });
    // ---- sphere path ----
    const u = p.ph(t, CAST, HIT), f = this.travel(p, u);
    const sx = t < CAST ? C[0] : p.lerp(C[0], XE, f), sz0 = RS * .78;
    const szz = t < CAST ? C[2] : p.lerp(C[2], sz0, p.easeOutCubic(p.ph(u, 0, .35)));
    const front = t < HIT ? sx : XE;
    // ---- trench: a churned rim and a dark groove, ploughed where the sphere grazes the ground ----
    const xT0 = C[0] + .35, trA = 1 - p.ph(t, 3.6, 4.45), half = .3 * tw * sz;
    const wAt = x => half * p.clamp((x - xT0) / .7, 0, 1) * (.85 + .3 * p.noise(x * 2.3, 4.1));
    if (t > CAST && front > xT0 && trA > 0) {
      const cx = (xT0 + front) / 2, R = (front - xT0) / 2 + half * 1.5 + .1;
      p.stain(cx, 0, R, (dx, dy) => { const x = dx + cx; return x > xT0 && x < front && Math.abs(dy) < wAt(x) * 1.45 ? .62 : 0; }, '#5e4a3c', trA);
      p.stain(cx, 0, R, (dx, dy) => { const x = dx + cx; return x > xT0 && x < front && Math.abs(dy) < wAt(x) * .8 ? 1.15 : 0; }, '#1e1418', trA);
    }
    // scorch where it burst
    if (t > HIT) p.aftermath(XE, 0, 1.1 * sz + .3, 'burn', { amt: 1 - p.ph(t, 3.7, 4.5), seed: 3 });
    // ---- debris rocks thrown sideways as the sphere passes ----
    const nD = Math.round(p.param('debris') * p.density);
    for (let d = 0; d < nD; d++) {
      const xk = xT0 + .3 + (d + .5) / Math.max(1, nD) * (XE - xT0 - .5) + (p.r(d, 1) - .5) * .2;
      const tb = CAST + this.untravel(p, (xk - C[0]) / (XE - C[0])) * (HIT - CAST), a = t - tb;
      if (a < 0 || a > 1.5 || t > 4.35) continue;
      const side = d % 2 ? 1 : -1, vy = side * (1.3 + p.r(d, 2) * 1.6), vz = 1.6 + p.r(d, 3) * 1.8, vx = .3 + p.r(d, 4) * .8, g = 7;
      const y0 = side * wAt(xk) * .7, land = 2 * vz / g;
      let x = xk + vx * a, y = y0 + vy * a, z = vz * a - g * a * a / 2;
      if (a > land) { const b = a - land; x = xk + vx * land + vx * .3 * b; y = y0 + vy * land + vy * .25 * Math.min(b, .5); z = Math.max(0, vz * .25 * b - g * b * b / 2); }
      const rr = (.06 + p.r(d, 5) * .07) * (1 - p.ph(a, 1.2, 1.5)) * (1 - p.ph(t, 4.1, 4.35));
      if (rr > .015) p.rock(x, y, z + rr * .8, rr, RK, d);
    }
    // ---- dust puffs rising from the trench ----
    const nP = Math.round(8 * p.density);
    for (let s = 0; s < nP; s++) {
      const xk = xT0 + .4 + (s + .5) / nP * (XE - xT0 - .6);
      const tb = CAST + this.untravel(p, (xk - C[0]) / (XE - C[0])) * (HIT - CAST), a = (t - tb) / 1.3;
      if (a <= 0 || a >= 1) continue;
      const out = p.easeOutExpo(a);
      p.ball(xk + out * .15, (p.r(s, 7) - .5) * .4 + (s % 2 ? 1 : -1) * out * .35, .15 + a * .9, .14 + out * .2, SM, { alpha: (1 - a) * .8, rough: .5, shadow: false, seed: s });
    }
    // ---- the scene darkens while the energy gathers ----
    const dark = .3 * (t < HIT ? p.easeOutCubic(p.ph(t, SPIN - .4, FUSE)) : 1 - p.ph(t, HIT + .2, 4.0));
    p.grade({ dark, desat: dark * .5 });
    // ---- space warp around the sphere (before its light, so the sphere itself stays crisp) ----
    const alive = t >= FUSE && t < HIT + .1;
    if (alive && ws > 0) {
      const wk = ws * (t < CAST ? .45 * p.ph(t, FUSE, CAST) : 1) * (t > HIT ? 1 - p.ph(t, HIT, HIT + .1) : 1), sw = Math.sin(t * 3);
      if (wk > .01) p.warp(sx, 0, szz, RS * 2.1, (dx, dy, rho) => {
        if (rho < .42) return null;
        const b = Math.sin(Math.PI * (rho - .42) / .58) * wk;
        return [dx * b * .38 - dy * b * (.22 + .08 * sw), dy * b * .38 + dx * b * (.22 + .08 * sw)];
      });
    }
    // ---- twin orbs: form at the palms, then spiral together ----
    if (t >= FORM && t < FUSE) {
      const g = p.easeOutBack(p.ph(t, FORM, FORM + .45), 2), s = p.ph(t, SPIN, FUSE);
      const axis = p.v3.norm([.5, 0, .86]);
      const shrink = 1 - .45 * p.easeInCubic(p.ph(s, .55, 1));
      [[fig.handL, BL, 1, 3.2], [fig.hand, RD, -1, -3.2]].forEach(([hand, ramp, sd, spin], j) => {
        const A0 = [X0 + .03, sd * .75, 1.3];
        const at = q => { const o = this.rot([A0[0] - C[0], A0[1] - C[1], A0[2] - C[2]], axis, 1.3 * p.TAU * q * q); const k = 1 - q * q; return [C[0] + o[0] * k, C[1] + o[1] * k, C[2] + o[2] * k]; };
        const pos = t < SPIN ? [hand[0], hand[1] + sd * .1, hand[2] + .12] : at(s);
        const r = .2 * g * shrink;
        p.core(pos[0], pos[1], pos[2], { r, ramp, I: 1 + .3 * s, t, rays: 4, spin, rayLen: 1.8, halo: 2.3 });
        p.charge(pos[0], pos[1], pos[2], p.ph(t, FORM, SPIN + .2), { n: 10, R: 1.1, ramp, seed: j * 9 + 1, len: .2 });
        if (s > 0) {
          const pts = [];
          for (let q = 0; q <= 6; q++) pts.push(at(Math.max(0, s - q * .035)));
          p.trail(pts, r * 1.1, .02, ramp, .9, 0);
        }
        p.light(pos[0], pos[1], 0, .9, ramp, .5 * g);
      });
    }
    // ---- collision: compress to a white point, flash, sparks ----
    const ca = t - FUSE;
    if (ca >= 0 && ca < .5) {
      const fl = Math.pow(1 - p.ph(ca, 0, .16), 2);
      if (fl > 0) {
        p.glow(C[0], C[1], C[2], .18 + .5 * fl, V, 1.3 * fl, { pow: 1.4 });
        p.sparkle(C[0], C[1], C[2], 3 + 9 * fl, V, 1.3 * fl);
      }
      p.ring(C[0], C[1], C[2], .2 + 1.3 * p.easeOutExpo(p.ph(ca, 0, .35)), .08 * (1 - p.ph(ca, 0, .35)) + .02, V, .9 * (1 - p.ph(ca, 0, .35)), { axis: p.cam().fwd });
      const nS = Math.round(14 * p.density);
      for (let k = 0; k < nS; k++) {
        const life = .25 + p.r(k, 21) * .25, uu = ca / life;
        if (uu >= 1) continue;
        const d = p.rdir(k, 22, .2), dd = p.drag(5 + p.r(k, 23) * 3, 7, ca), d0 = p.drag(5 + p.r(k, 23) * 3, 7, Math.max(0, ca - .04));
        p.line([C[0] + d[0] * dd, C[1] + d[1] * dd, C[2] + d[2] * dd], [C[0] + d[0] * d0, C[1] + d[1] * d0, C[2] + d[2] * d0], .05, k % 2 ? BL : RD, 1 - uu);
      }
    }
    // ---- the fused violet sphere ----
    if (alive && t < HIT) {
      const g = ca < .05 ? .22 : p.easeOutBack(p.ph(ca, .05, .25), 1.8);
      const c = t < CAST ? 1 - .12 * p.easeInCubic(p.ph(t, 1.95, CAST)) : .88 + .12 * p.easeOutBack(p.ph(t, CAST, CAST + .1), 2);
      const r = RS * Math.max(.2, g * c);
      if (ca < .05) p.orb(sx, 0, szz, .12, V, 2.2);
      else {
        // long trail with a blue / red double helix inside
        if (t > CAST) {
          const L = Math.min(3.2, sx - C[0] + .3), pts = [], hb = [], hr = [];
          for (let q = 0; q <= 10; q++) {
            const s = q / 10, x = sx - r * .4 - s * L, wob = (p.noise(s * 4 - t * 6, 3) - .5) * .2 * s;
            const zc = p.lerp(szz, Math.min(C[2], szz + .25 * s), s);
            pts.push([x, wob, zc]);
            const ph = s * 10 - t * 16, rad = r * .62 * (1 - s * .7);
            hb.push([x, Math.cos(ph) * rad, zc + Math.sin(ph) * rad]);
            hr.push([x, -Math.cos(ph) * rad, zc - Math.sin(ph) * rad]);
          }
          p.trail(pts, r * 1.45, .08, V, .95, .12);
          p.trail(hb, .09, .02, BL, 1, .1);
          p.trail(hr, .09, .02, RD, 1, .1);
        }
        p.glow(sx, 0, szz, r * 1.7, V, .38);
        p.shell(sx, 0, szz, r, (nx, ny, nz, rim) => {
          const n1 = p.noise(nx * 2.6 + t * 1.7, nz * 2.6 - t * 2.4 + ny * 1.4), n2 = p.noise(ny * 4.2 - t * 2.9, nz * 4 + nx * 2 + t * 1.3);
          const fil = Math.abs(n1 - n2) < .08 ? .38 : 0;
          return .12 + .34 * n1 + fil + .7 * rim * rim;
        }, V, 1, { back: 0 });
        p.orb(sx, 0, szz, r * .3, V, 1.2 + .15 * Math.sin(t * 40));
        // lens ripples: broken rings where space bends around the sphere
        if (t > CAST) for (let k = 0; k < 2; k++) p.ring(sx, 0, szz, r * (1.45 + .4 * k + .08 * Math.sin(t * 9 + k)), .025, V, .45 - .15 * k, { axis: p.cam().fwd, fn: a => Math.max(0, Math.sin(a * 3 + t * (8 - 14 * k))) });
        for (let k = 0; k < 4; k++) {
          const a = t * (5 + k) + k * 1.7, e = [Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25 * Math.cos(k), Math.sin(a) * r * 1.25 * Math.sin(k + 1)];
          p.dot(sx + e[0] * .6, e[1], szz + e[2], V, 1, 2);
        }
        if (t < CAST) p.charge(sx, 0, szz, p.ph(t, FUSE + .1, CAST + .05), { n: 12, R: 1.3, ramp: V, seed: 40, len: .25 });
        // groove glow behind the sphere
        if (front > xT0) {
          const gp = [];
          for (let q = 0; q <= 5; q++) gp.push([Math.max(xT0, front - q * .35), 0, .01]);
          p.trail(gp, half * .9, half * .2, V, .8, 0);
        }
        p.light(sx, 0, 0, r * 3 + .6, V, .9);
      }
    }
    // ---- impact: the sphere swallows the target and bursts ----
    const a = t - HIT;
    if (a >= 0 && a < .9) {
      const fl = Math.pow(1 - p.ph(a, 0, .18), 2), bu = p.ph(a, 0, .4);
      if (fl > 0) p.glow(XE, 0, sz0, .5 + 1.1 * fl * sz, V, 1.6 * fl, { pow: 1.3 });
      if (bu < 1) p.shell(XE, 0, sz0, RS * (1 + 1.5 * p.easeOutExpo(bu)), (nx, ny, nz, rim) => Math.pow(rim, 2.2) * 1.2 + .1 * p.noise(nx * 3 + a * 4, nz * 3), V, 1.2 * Math.pow(1 - bu, 1.4), { back: .2, zmin: -.3 });
      p.shock(XE - .2, 0, sz0, p.ph(a, 0, .45), { R: 2 * sz + .3, w: .3, ramp: V, axis: [1, 0, 0], light: false });
      p.shock(XE, 0, 0, p.ph(a, .02, .6), { R: 2.4 * sz + .4, w: .25, ramp: V, ground: true, dust: SM, dustN: 12 });
      if (a < .2) p.speedLines(XE, 0, sz0 + .2, { n: 16, R0: .7 * sz + .2, R1: 3, ramp: V, I: 1 - a / .2, seed: Math.floor(t * 30) });
      const nS = Math.round(24 * p.density);
      for (let k = 0; k < nS; k++) {
        const life = .4 + p.r(k, 31) * .45, uu = a / life;
        if (uu >= 1) continue;
        const d = p.rdir(k, 32, .45), sp = 4 + p.r(k, 33) * 4, dd = p.drag(sp, 4.5, a), d0 = p.drag(sp, 4.5, Math.max(0, a - .05));
        const o = [XE + d[0] * RS, d[1] * RS, sz0 + d[2] * RS];
        const pz = o[2] + d[2] * dd - 3 * a * a, pz0 = o[2] + d[2] * d0 - 3 * Math.max(0, a - .05) ** 2;
        if (pz < 0) continue;
        p.line([o[0] + d[0] * dd, o[1] + d[1] * dd, pz], [o[0] + d[0] * d0, o[1] + d[1] * d0, pz0], .05, k % 5 === 0 ? BL : k % 5 === 1 ? RD : V, 1 - uu * .7);
      }
      const heat = 1 - p.ph(a, .1, .9);
      p.glow(XE, 0, .3, .8 * sz, V, .6 * heat * heat);
      p.light(XE, 0, 0, 2.6, V, Math.max(fl, .6 * heat));
    }
  },
});
