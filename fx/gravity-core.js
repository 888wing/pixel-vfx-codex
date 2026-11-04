// 引力天核 / Gravity Core — Ultimates pack (original design): a tiny black orb hovers above the field, tears rocks out of the ground and packs them into a giant stone sphere that drops and crumbles
PXFX.define({
  id: 'gravity-core',
  loop: 5,
  beats: [
    { t: 1.08, kind: 'cast', power: .8 }, { t: 1.52, kind: 'pulse', power: .7 }, { t: 2.56, kind: 'pulse', power: .5 },
    { t: 2.86, kind: 'pulse', power: .6 }, { t: 3.18, kind: 'pulse', power: .8 }, { t: 3.7, kind: 'hit', power: 1.4 },
  ],
  view: { r: 3.4, h: 3.3 },
  stage: { ground: 'dirt', tiles: false },
  modules: ['figure', 'charge', 'core', 'debris', 'shockwave', 'impact', 'aftermath'],
  palette: {
    violet: ['#4a2c96', '#6c50d0', '#a08cff', '#d2c6ff', '#f6f2ff'],
    core: ['#07040c', '#120a1e', '#1e1230', '#2c1a44'],
    rock: ['#2c2632', '#413846', '#594e5c', '#756a76', '#958a94'],
    dust: ['#6a5a50', '#847262', '#9e8a78', '#b8a490'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者由待機下蹲，雙手合攏在腰前（集氣姿勢）', en: 'pose: the caster crouches from idle and cups both hands at the waist (charge pose)' },
    { k: 'charge', t: [.55, 1.08], zh: '集氣：14 粒紫光點匯聚到雙手之間，一粒半徑 0.09 的實心黑球以回彈緩動長出，外圍 1–2 像素紫色光邊', en: 'charge: 14 violet motes converge between the hands; a solid black orb (radius 0.09) grows with an overshoot, ringed by a 1–2 px violet rim' },
    { k: 'shape', t: [1.08, 2.0], zh: '成形：0.08 秒內舉手拋出黑球，沿弧線在 0.42 秒內減速升到場中央 z = 2.2 懸停；周圍空間旋渦扭曲，地面以 0.5 秒由中心向外龜裂（裂縫發紫光）', en: 'shape: a 0.08 s throw sends the orb up an arc, slowing to hover at z = 2.2 over the field centre in 0.42 s; space swirls around it and the ground cracks outwards over 0.5 s (cracks glow violet)' },
    { k: 'motion', t: [2.0, 3.45], zh: '推進：約 40 塊大小不一的低多邊形岩石由四方破土而出（先彈起 0.25，留下坑洞與塵土），沿彎曲路徑加速飛向黑球；約 35% 先繞核心公轉一圈；岩石按到達先後由內到外排成 3 層球殼（半徑 0.45/0.78/1.0 × 0.9），每完成一層地面震一下；塵土繞球旋轉', en: 'motion: ~40 low-poly rocks of many sizes tear out of the ground from every side (popping up 0.25, leaving pits and dust) and accelerate along curves into the orb; ~35% orbit the core first; rocks pack in arrival order into 3 spherical shells (radius 0.45/0.78/1.0 × 0.9), with a ground rumble each time a layer completes; dust swirls around the ball' },
    { k: 'impact', t: [3.45, 3.85], zh: '命中：核心熄滅、紫光閃爍，巨大岩球以 easeInCubic 在 0.25 秒內墜地，重擊：頓幀、強震屏、紫光一閃、塵土環與新裂紋', en: 'impact: the core gives out with a violet flicker and the giant rock ball drops in 0.25 s (easeInCubic) for a heavy hit: hit-stop, hard shake, a violet flash, a dust ring and fresh cracks' },
    { k: 'after', t: [3.85, 5], zh: '餘波：岩球崩散，岩石向外滾開、彈跳一次後抖色淡出，塵雲升起變淡，裂紋與坑洞慢慢消失，施法者回到待機', en: 'aftermath: the ball crumbles, rocks roll outwards, bounce once and dither out, dust clouds rise and thin, cracks and pits fade, the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→合手集氣→舉手拋出→雙手高舉控制→防護姿勢→待機', en: 'caster: faceless mannequin, poses idle → cupped-hands charge → throw upwards → both arms up controlling → guard → idle' },
    { zh: '黑球核心：面向鏡頭的實心黑色圓片（帶深度偏移），外圈紫色光環＋光暈；懸停時周圍用螺旋扭曲（取樣角度隨距離衰減）表現引力', en: 'core: a camera-facing solid black disc (with a depth bias) inside a violet rim ring and halo; while hovering, a swirl warp around it (sample angle falls off with distance) sells the gravity' },
    { zh: '岩石：預先生成的低多邊形八面體（頂點隨機抖動，大小 0.1–0.24），不做物理，全部用動畫曲線：破土彈起 → 帶側向偏移的弧線（arcPos，easeInCubic）→ 球殼槽位；公轉組先沿傾斜 0.35 弧度的軌道環繞', en: 'rocks: pre-made low-poly octahedra with jittered corners (size 0.1–0.24) on animation curves, no physics: pop out of the ground → a curved arc with a sideways swing (arcPos, easeInCubic) → a slot on a spherical shell; the orbiting group first circles on a ring tilted 0.35 rad' },
    { zh: '岩球：槽位按費波那契球面分佈，整體慢慢自轉；每完成一層，內部實心粗糙填充球以回彈緩動長大，表面紫色裂縫光紋跳動', en: 'rock ball: slots on Fibonacci spheres, the whole ball slowly spinning; each completed layer grows a solid rough filler ball inside with an overshoot, with violet seams of light pulsing on its surface' },
    { zh: '地面：放射狀裂紋貼花（發紫光）由中心擴張至半徑 2.4；每塊岩石留下暗色坑洞；每次震動一圈紫色地波', en: 'ground: a radial crack decal (glowing violet) spreading to radius 2.4; a dark pit where each rock tore out; a violet ground ripple on every rumble' },
    { zh: '塵土：抖色半透明粗糙球，破土時小團噴起、聚球時繞球旋轉、墜地時沿地面成環擴散後上升淡出', en: 'dust: dithered rough translucent balls — small puffs at each tear-out, a swirl around the ball while it packs, a ground ring on the drop that rises and fades' },
  ],
  params: {
    rocks: { zh: '岩石數量', en: 'rock count', min: 16, max: 70, step: 1, value: 40 },
    sphereRadius: { zh: '岩球半徑', en: 'sphere radius', min: .6, max: 1.2, step: .05, value: .9 },
    orbitShare: { zh: '先公轉的比例', en: 'orbiting share', min: 0, max: .8, step: .05, value: .35 },
  },
  C: [.3, 0, 2.2],
  // low-poly rock with a full tumble (yaw + pitch); same corner jitter as p.rock
  rockT(p, x, y, z, r, ramp, seed, yaw, pitch, o) {
    const j = k => .7 + p.r(seed, k) * .55, cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const P = (a, b, c) => { const b2 = b * cp - c * sp, c2 = b * sp + c * cp; return [x + a * cy - b2 * sy, y + a * sy + b2 * cy, z + c2]; };
    const v = [P(r * j(1), 0, 0), P(-r * j(2), 0, 0), P(0, r * j(3), 0), P(0, -r * j(4), 0), P(0, 0, r * .8 * j(5)), P(0, 0, -r * .6 * j(6))];
    const F = [[4, 0, 2], [4, 2, 1], [4, 1, 3], [4, 3, 0], [5, 2, 0], [5, 1, 2], [5, 3, 1], [5, 0, 3]];
    for (const [a, b, c] of F) p.tri(v[a], v[b], v[c], ramp, o);
    if (!o || o.shadow !== false) p.shadow(x, y, z, r * .85);
  },
  // the black orb: solid disc biased towards the viewer, so the halo behind it reads as a rim
  orb(p, x, y, z, r, I) {
    if (r <= .005) return;
    const V = this.palette.violet, c = p.cam();
    p.scard(x, y, z, r * 2, r * 2, (u, v) => { const q = u * u + v * v; return q < 1 ? .1 + .5 * Math.max(0, -u - v) * .5 : -1; }, this.palette.core, { dz: .35 });
    p.ring(x, y, z, r * 1.2, .035, V, 1.1 * I, { axis: c.fwd });
    p.glow(x, y, z, r * 3.2, V, .6 * I);
  },
  draw(p, t) {
    const V = this.palette.violet, RK = this.palette.rock, DU = this.palette.dust, C = this.C;
    const X0 = -2.1, CAST = 1.08, ARR = 1.5, HIT = 3.7, DROP = 3.45, SR = p.param('sphereRadius');
    const n = Math.max(4, Math.round(p.param('rocks') * p.density)), share = p.param('orbitShare');
    p.dummy(2.35, 0);
    // ---- caster ----
    let pose;
    if (t < .2) pose = 'idle';
    else if (t < .55) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .2, .55)) };
    else if (t < CAST - .08) pose = 'charge';
    else if (t < CAST) pose = { a: 'charge', b: 'raise', k: p.easeInCubic(p.ph(t, CAST - .08, CAST)) };
    else if (t < 1.6) pose = 'raise';
    else if (t < 1.9) pose = { a: 'raise', b: 'bothUp', k: p.easeOutBack(p.ph(t, 1.6, 1.9), 1.3) };
    else if (t < 3.35) pose = 'bothUp';
    else if (t < 3.5) pose = { a: 'bothUp', b: 'guard', k: p.easeOutCubic(p.ph(t, 3.35, 3.5)) };
    else if (t < 4.0) pose = 'guard';
    else pose = { a: 'guard', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.0, 4.6)) };
    const fig = p.figure(X0, 0, { pose });
    // ---- sphere centre: hovers, then drops ----
    const fall = p.easeInCubic(p.ph(t, DROP, HIT)), jolt = Math.sin(Math.PI * p.ph(t, 3.35, DROP)) * .06;
    const cz = C[2] + jolt - (C[2] - SR * .92) * fall, spin = .9 * (Math.min(t, HIT) - 2);
    const shellR = [.45 * SR, .78 * SR, SR], cut = [Math.round(n * .25), Math.round(n * .55), n];
    const tArr = k => 2.3 + .85 * (n > 1 ? k / (n - 1) : 0) + (p.r(k, 7) - .5) * .06;
    const layerOf = k => (k < cut[0] ? 0 : k < cut[1] ? 1 : 2);
    const done = [tArr(Math.max(0, cut[0] - 1)), tArr(Math.max(0, cut[1] - 1)), tArr(n - 1)];
    const slot = (k, tt) => {
      const L = layerOf(k), i0 = L ? cut[L - 1] : 0, m = Math.max(1, cut[L] - i0), i = k - i0;
      const zz = 1 - 2 * (i + .5) / m, s = Math.sqrt(Math.max(0, 1 - zz * zz)), a = i * 2.39996 + L * 1.1 + spin, R = shellR[L];
      return [C[0] + Math.cos(a) * s * R, Math.sin(a) * s * R, cz + zz * R, L];
    };
    // ground start of rock k: all around the core's ground point, kept off the caster and the dummy
    const start = k => {
      const a = p.r(k, 1) * p.TAU;
      let rad = 1.1 + 1.55 * p.r(k, 2);
      const gx = () => C[0] + Math.cos(a) * rad, gy = () => Math.sin(a) * rad;
      for (let it = 0; it < 4 && (Math.hypot(gx() - X0, gy()) < .65 || Math.hypot(gx() - 2.35, gy()) < .5); it++) rad *= .75;
      return [gx(), gy(), a];
    };
    // ---- ground: cracks, pits ----
    if (t > ARR) {
      const cr = p.easeOutCubic(p.ph(t, ARR, ARR + .5)), fade = 1 - p.ph(t, 4.2, 4.95);
      const glow = (.35 + .4 * Math.pow(1 - p.ph(t, ARR, ARR + .6), 2) + .5 * Math.pow(1 - p.ph(t, HIT, HIT + .5), 2) * (t > HIT ? 1 : 0)) * fade;
      p.aftermath(C[0], 0, .5 + 1.9 * cr, 'crack', { amt: fade, ramp: V, glow, n: 7, seed: 3, color: '#3a2c2a' });
    }
    const vis = [];
    for (let k = 0; k < n; k++) {
      const orbit = p.r(k, 8) < share, ta = tArr(k), T0 = Math.max(1.62 + p.r(k, 9) * .15, ta - (orbit ? 1.25 : .75));
      vis.push({ orbit, ta, T0 });
      const pit = p.ph(t, T0, T0 + .1) * (1 - p.ph(t, 4.2, 4.9));
      if (pit > 0) { const g = start(k); p.stain(g[0], g[1], .22, (dx, dy, rho) => 1.2 - rho / .22, '#3a2c28', pit); }
    }
    // ---- rocks ----
    const crumble = t >= HIT;
    let anyIn = 0;
    for (let k = 0; k < n; k++) {
      const { orbit, ta, T0 } = vis[k];
      if (t < T0) continue;
      const g = start(k), rr = (.1 + .05 * layerOf(k) + .07 * p.r(k, 3)) * (.8 + .25 * SR), seed = k * 3 + 1;
      let pos, yaw = p.r(k, 4) * 6 + t * (1 + 2 * p.r(k, 5)), pitch = p.r(k, 6) * 3 + t * 1.5, alpha = 1;
      const lifted = [g[0], g[1], .25];
      const pop = p.easeOutBack(p.ph(t, T0, T0 + .2), 2);
      if (!crumble) {
        if (t < T0 + .2) pos = [g[0], g[1], -rr + (.25 + rr) * pop];
        else if (t >= ta) { pos = slot(k, t); yaw = p.r(k, 4) * 6 + spin; pitch = p.r(k, 6) * 3; anyIn++; }
        else if (!orbit) {
          const u = p.ph(t, T0 + .2, ta), e = p.easeInCubic(u) * .8 + u * .2, s = slot(k, t), q = p.arcPos(lifted, s, e, .5);
          const tg = [-Math.sin(g[2]), Math.cos(g[2])], sw = Math.sin(Math.PI * u) * .7;
          pos = [q[0] + tg[0] * sw, q[1] + tg[1] * sw, q[2]];
        } else {
          const RO = SR * 1.75, tilt = .35, th = tt => g[2] + 2.4 * Math.max(0, tt - (T0 + .2)) * (.8 + .4 * p.r(k, 10));
          const ring = tt => { const a = th(tt); return [C[0] + Math.cos(a) * RO, Math.sin(a) * RO * Math.cos(tilt), cz + Math.sin(a) * RO * Math.sin(tilt) + (p.r(k, 11) - .5) * .3]; };
          const t1 = T0 + .6, t2 = Math.max(t1 + .1, ta - .3);
          if (t < t1) pos = p.arcPos(lifted, ring(t), p.ease(p.ph(t, T0 + .2, t1)), .4);
          else if (t < t2) pos = ring(t);
          else pos = p.v3.lerp(ring(t), slot(k, t), p.easeInCubic(p.ph(t, t2, ta)));
        }
      } else {
        // crumble: out along the ground with drag, fall, one bounce, dither out
        const a = t - HIT, s = slot(k, HIT), hx = s[0] - C[0], hy = s[1], hl = Math.hypot(hx, hy) || 1, dirx = hx / hl, diry = hy / hl;
        const out = hl * .6 + p.drag(1.8 + 2.6 * p.r(k, 12) * (.6 + .4 * (s[2] - cz) / SR + .4), 3, a);
        const z0 = s[2], land = .3 + .2 * p.r(k, 13), fallU = p.ph(a, 0, land);
        let z = rr * .7 + (z0 - rr * .7) * (1 - fallU * fallU);
        if (a > land) z = rr * .7 + .22 * Math.sin(Math.PI * p.ph(a, land, land + .3)) * (1 - p.r(k, 14) * .5);
        pos = [C[0] + dirx * out, diry * out, Math.max(rr * .5, z)];
        yaw += a * 4; pitch += a * 3;
        alpha = 1 - p.ph(a, .6 + .35 * p.r(k, 15), 1.05 + .2 * p.r(k, 15));
        if (alpha <= 0) continue;
      }
      this.rockT(p, pos[0], pos[1], pos[2], rr, RK, seed, yaw, pitch, alpha < 1 ? { alpha } : undefined);
      // tear-out dust puff
      const pu = p.ph(t, T0, T0 + .55);
      if (pu > 0 && pu < 1) p.ball(g[0], g[1], .1 + .35 * pu, .1 + .14 * pu, DU, { alpha: .8 * (1 - pu), rough: .5, shadow: false, seed: k });
    }
    // ---- the filler ball grows layer by layer, violet seams of light ----
    let fillR = 0;
    for (let L = 0; L < 3; L++) if (t > done[L] - .1) fillR = Math.max(fillR, shellR[L] * .86 * p.easeOutBack(p.ph(t, done[L] - .1, done[L] + .12), 1.6));
    if (crumble) fillR *= 1 - p.easeInCubic(p.ph(t, HIT, HIT + .14));
    if (fillR > .02) {
      p.ball(C[0], 0, cz, fillR, RK, { rough: .35, seed: 5 });
      const off = t > 3.35 ? (Math.floor(t * 30) % 2 ? .2 : 1) * (1 - p.ph(t, 3.35, DROP)) : 1;
      const I = (.75 + .35 * Math.sin(t * 13)) * off;
      if (I > .02) p.shell(C[0], 0, cz, fillR * 1.03, (nx, ny, nz) => {
        const a = Math.atan2(ny, nx) + spin, s = p.noise(a * 1.6 + 4, nz * 3.2) ;
        return Math.abs(s - .5) < .065 ? 1 : 0;
      }, V, I, { back: 0 });
    }
    // ---- dust swirl around the packing ball ----
    const sw = p.env(t, 2.2, 2.6, 3.3, 3.6);
    if (sw > 0) {
      const nd = Math.round(10 * p.density);
      for (let d = 0; d < nd; d++) {
        const a = d / nd * p.TAU + t * 2.6, rad = SR * (1.35 + .2 * p.r(d, 21));
        p.ball(C[0] + Math.cos(a) * rad, Math.sin(a) * rad, cz + (p.r(d, 22) - .5) * SR * 1.2, .14 + .08 * p.r(d, 23), DU, { alpha: .5 * sw, rough: .5, shadow: false, seed: d });
      }
    }
    // ---- swirl warp around the hovering core (before it is buried) ----
    const lens = p.env(t, ARR - .05, ARR + .15, 2.35, 2.6);
    if (lens > 0) p.warp(C[0], 0, C[2], .85, (dx, dy, rho) => {
      const th = 1.1 * lens * Math.pow(1 - rho, 2), c = Math.cos(th), s = Math.sin(th);
      return [dx * c - dy * s - dx, dx * s + dy * c - dy];
    });
    // ---- the orb: forms between the hands, thrown up, hovers ----
    if (t > .45 && t < 2.62) {
      let o, r = .09 * p.easeOutBack(p.ph(t, .45, .85), 2);
      if (t < CAST - .08) o = [(fig.hand[0] + fig.handL[0]) / 2 + .12, (fig.hand[1] + fig.handL[1]) / 2, (fig.hand[2] + fig.handL[2]) / 2 + .05];
      else if (t < CAST) o = [fig.hand[0] + .05, fig.hand[1], fig.hand[2] + .08];
      else if (t < ARR) o = p.arcPos([fig.hand[0] + .05, fig.hand[1], fig.hand[2] + .08], C, p.easeOutCubic(p.ph(t, CAST, ARR)), .45);
      else { o = [C[0], 0, C[2] + Math.sin(t * 5) * .03]; r = .09 + .03 * p.ph(t, ARR, 2.2); }
      this.orb(p, o[0], o[1], o[2], r, 1);
      if (t < CAST) p.charge(o[0], o[1], o[2], p.ph(t, .5, CAST), { n: 14, R: 1, ramp: V, up: .2 });
      if (t >= CAST && t < ARR) p.line(o, [o[0] - .25, o[1], o[2] - .3], .06, V, .7, { w1: .01, i1: .1 });
      p.light(o[0], 0, 0, 1.4, V, .5);
    }
    // ---- arrival pulse + rumbles: violet rings in the air and on the ground ----
    const rumbles = [ARR + .02, done[0] + .02, done[1] + .02, done[2] + .02];
    rumbles.forEach((rt, i) => {
      const a = t - rt;
      if (a < 0 || a > (i ? .45 : .6)) return;
      const u = a / (i ? .45 : .6);
      if (i === 0) p.ring(C[0], 0, C[2], .2 + 1.3 * p.easeOutExpo(u), .08 * (1 - u) + .02, V, 1.1 * (1 - u), { axis: p.cam().fwd });
      p.ring(C[0], 0, .02, .5 + (i ? 1.6 : 2.2) * p.easeOutExpo(u), .1 * (1 - u) + .02, V, (i ? .7 : .9) * Math.pow(1 - u, 1.5));
      p.light(C[0], 0, 0, 2.4, V, .45 * (1 - u));
    });
    if (t > ARR && t < DROP) p.light(C[0], 0, 0, 2, V, .35 + .15 * Math.sin(t * 9));
    // ---- impact ----
    const a = t - HIT;
    if (a >= 0 && a < 1.2) {
      const fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (fl > 0) p.glow(C[0], 0, SR * .6, SR * (1 + .8 * fl), V, 1.3 * fl, { pow: 1.4 });
      p.shock(C[0], 0, .03, p.ph(a, 0, .6), { R: 2.8, w: .3, ramp: V, ground: true, dust: DU, dustN: 16 });
      // rising dust clouds
      const nc = Math.round(9 * p.density);
      for (let d = 0; d < nc; d++) {
        const ang = d / nc * p.TAU + p.r(d, 31), out = SR * .8 + p.drag(2.6, 2.6, a) * (.7 + .3 * p.r(d, 32));
        const life = p.ph(a, 0, .9 + .3 * p.r(d, 33));
        if (life >= 1) continue;
        p.ball(C[0] + Math.cos(ang) * out, Math.sin(ang) * out, .2 + .7 * life, .25 + .3 * life, DU, { alpha: .85 * (1 - life), rough: .55, shadow: false, seed: d + 40 });
      }
    }
  },
});
