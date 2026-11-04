// 萬晶天葬 / Crystal Requiem — Ultimates pack (original design): a swarm of crystal shards circles the target in layered orbits, is pulled in and packed into a giant spiky crystal sphere that bursts
PXFX.define({
  id: 'crystal-requiem',
  loop: 5,
  beats: [
    { t: .5, kind: 'cast', power: .6 }, { t: 2.3, kind: 'cast', power: .8 }, { t: 2.62, kind: 'pulse', power: .5 },
    { t: 2.98, kind: 'pulse', power: .7 }, { t: 3.6, kind: 'hit', power: 1.4 },
  ],
  view: { r: 3.4, h: 3.1 },
  stage: { ground: 'void', tiles: true },
  modules: ['figure', 'swarm', 'core', 'growth', 'shockwave', 'impact', 'debris'],
  palette: {
    crystal: ['#2a6aa0', '#36a0c8', '#7af0e0', '#c4fff4', '#f4fffd'],
    solid: ['#1c4466', '#28708e', '#3ea8b8', '#72dcd6', '#c8fff6'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由待機轉身伸手指向目標', en: 'pose: the caster shifts from idle to pointing at the target' },
    { k: 'charge', t: [.5, 2.3], zh: '集氣：約 120 塊青藍晶片（長 0.16 的菱形發光片）在 0.7 秒內於目標周圍逐塊閃現（回彈縮放＋星芒），沿 3 條不同傾角的軌道（半徑 0.9/1.25/1.6）以相反方向環繞，轉速逐漸加快，軌道留下淡淡光環', en: 'charge: ~120 cyan crystal chips (glowing diamonds, 0.16 long) flash into being around the target over 0.7 s (overshoot scale + sparkle), circling on 3 orbits of different tilt (radius 0.9/1.25/1.6) in alternating directions, speeding up, with faint orbit rings' },
    { k: 'shape', t: [2.3, 3.1], zh: '成形：施法者雙掌前推，中央引力把各層晶片由內而外螺旋拉入；晶片抵達球面即熄滅並凝成實心尖刺晶體：內層 0.55×R、外層 0.85×R，尖端向外，每完成一層地面震一下；中心實心冰球同步長大', en: 'shape: the caster pushes both palms forward and a central gravity spirals each orbit inwards, inner layer first; chips that reach the sphere go out and solidify into outward-pointing solid crystal spikes — inner shell 0.55×R, outer shell 0.85×R — with a ground rumble per layer; a solid ice core grows with them' },
    { k: 'motion', t: [3.1, 3.6], zh: '推進：巨大尖刺晶球包住目標停住 0.5 秒，慢慢自轉，表面星芒流動、內部青光脈動越來越快', en: 'motion: the giant spiky crystal ball encases the target and holds for 0.5 s, slowly turning, sparkles crawling over it and the inner cyan glow pulsing faster and faster' },
    { k: 'impact', t: [3.6, 3.85], zh: '命中：晶球爆裂：白青閃光 0.15 秒、地面衝擊環、放射速度線、頓幀震屏；冰核瞬間消失', en: 'impact: the ball bursts — a 0.15 s white-cyan flash, a ground shock ring, radial speed lines, hit-stop and shake; the ice core vanishes at once' },
    { k: 'after', t: [3.85, 5], zh: '餘波：尖刺晶體以阻力向外飛散並受重力下墜、翻轉，0.5–1.0 秒內縮小消失；細碎晶屑閃爍飄落，施法者回到待機', en: 'aftermath: the spikes fly outwards with drag, tumble and fall, shrinking away within 0.5–1.0 s; fine crystal dust twinkles down and the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→指向→雙掌前推→張開雙手→待機', en: 'caster: faceless mannequin, poses idle → point → both palms forward → arms spread → idle' },
    { zh: '晶片群：單一素材（發光菱形小片，沿速度方向），每片屬於一條軌道層；位置 = 軌道位置與球面位置的混合，混合曲線 easeInCubic，按索引錯開 0.1 秒', en: 'chip swarm: one sprite (a glowing diamond pointing along its velocity); each chip belongs to one orbit layer; its position blends the orbit position into a sphere position with easeInCubic, staggered 0.1 s by index' },
    { zh: '軌道：每層一個傾斜圓環（傾角 0.45、−0.6、0.9 弧度），奇偶層反向旋轉，角速度隨時間加速；淡光環標示軌道', en: 'orbits: one tilted ring per layer (0.45, −0.6, 0.9 rad), alternate layers spin opposite ways and accelerate; a faint light ring marks each orbit' },
    { zh: '晶球：約 48 根實心四棱雙錐尖刺，按費波那契球面分佈、指向外，以 easeOutBack 逐根冒出；中心實心冰球；整體慢轉', en: 'crystal ball: ~48 solid four-sided bipyramid spikes on Fibonacci spheres pointing outwards, popping in one by one with easeOutBack around a solid ice core; the whole ball turns slowly' },
    { zh: '爆裂：尖刺沿法線飛出（阻力＋重力＋翻轉）、縮小消失，30 粒晶屑星芒，白青閃光與衝擊環', en: 'burst: spikes fly out along their normals (drag + gravity + tumble) and shrink away, 30 twinkling crystal flecks, a white-cyan flash and a shock ring' },
    { zh: '地面：晶片照亮地面（青色光池），每層完成時一圈地波', en: 'ground: the chips light the ground (cyan pool), a ground ripple each time a layer completes' },
  ],
  params: {
    crystals: { zh: '晶片數量', en: 'crystal count', min: 60, max: 200, step: 2, value: 120 },
    sphereRadius: { zh: '晶球半徑', en: 'sphere radius', min: .7, max: 1.3, step: .05, value: 1 },
    orbitLayers: { zh: '軌道層數', en: 'orbit layers', min: 1, max: 4, step: 1, value: 3 },
  },
  C: [1.3, 0, 1.0],
  TILT: [.45, -.6, .9, -.25],
  // orbit position of chip k (layer l) at time t
  orbitPos(p, k, l, t) {
    const C = this.C, R = .9 + .35 * l, tilt = this.TILT[l], dirn = l % 2 ? -1 : 1;
    const w = 1.6 + .5 * l, acc = t + .35 * Math.pow(Math.max(0, t - 1.2), 2) * 1.6;
    const a = p.r(k, 1) * p.TAU + dirn * w * acc, rr = R * (.92 + .16 * p.r(k, 2)), h = (p.r(k, 3) - .5) * .18;
    const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
    return [C[0] + x, C[1] + y * Math.cos(tilt) - h * Math.sin(tilt), C[2] + y * Math.sin(tilt) + h * Math.cos(tilt)];
  },
  draw(p, t) {
    const CR = this.palette.crystal, SO = this.palette.solid, C = this.C;
    const X0 = -2.3, HIT = 3.6, PULL = 2.3, SR = p.param('sphereRadius'), L = Math.round(p.param('orbitLayers'));
    const n = Math.max(L * 4, Math.round(p.param('crystals') * p.density));
    p.dummy(C[0], 0);
    // ---- caster ----
    let pose;
    if (t < .15) pose = 'idle';
    else if (t < .45) pose = { a: 'idle', b: 'point', k: p.easeOutCubic(p.ph(t, .15, .45)) };
    else if (t < PULL - .08) pose = 'point';
    else if (t < PULL) pose = { a: 'point', b: 'palm', k: p.easeInCubic(p.ph(t, PULL - .08, PULL)) };
    else if (t < HIT) pose = 'palm';
    else if (t < HIT + .06) pose = { a: 'palm', b: 'spread', k: p.easeOutCubic(p.ph(t, HIT, HIT + .06)) };
    else if (t < 4.0) pose = 'spread';
    else pose = { a: 'spread', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.0, 4.6)) };
    const fig = p.figure(X0, 0, { pose });
    // ---- sphere slots: inner and outer shells of solid spikes ----
    const ns = Math.round(p.clamp(n * .4, 20, 60)), nIn = Math.round(ns * .35), spin = .5 * (Math.min(t, HIT) - 2.5);
    const shellDone = [2.62, 2.98];
    const slot = j => {
      const inner = j < nIn, i = inner ? j : j - nIn, m = inner ? nIn : ns - nIn;
      const zz = 1 - 2 * (i + .5) / m, s = Math.sqrt(Math.max(0, 1 - zz * zz)), a = i * 2.39996 + (inner ? .7 : 0) + spin;
      const d = [Math.cos(a) * s, Math.sin(a) * s, zz], pop = inner ? 2.42 + .2 * i / m : 2.72 + .26 * i / m;
      return { d, r: SR * (inner ? .55 : .85), len: SR * (inner ? .5 : .62) * (.8 + .4 * p.r(j, 4)), pop, inner };
    };
    const coreR = SR * (.5 * p.easeOutBack(p.ph(t, 2.4, 2.6), 2) + .2 * p.easeOutBack(p.ph(t, 2.85, 3.05), 2));
    if (t < HIT) {
      // solid spikes pop in, ice core
      if (coreR > .02) p.ball(C[0], C[1], C[2], coreR, SO, { lit: .05 + .1 * p.ph(t, 3.1, HIT), seed: 3 });
      for (let j = 0; j < ns; j++) {
        const s = slot(j), e = p.easeOutBack(p.ph(t, s.pop, s.pop + .14), 2.2);
        if (e <= .01) continue;
        const len = s.len * e, b = s.r + len * .3;
        p.shard(C[0] + s.d[0] * b, C[1] + s.d[1] * b, C[2] + s.d[2] * b, len, len * .38, s.d, SO, { back: .25, sides: 4, spin: p.r(j, 5) * 2, shadow: j % 3 === 0 });
      }
    } else {
      // burst: spikes fly out, tumble, fall, shrink
      const a = t - HIT;
      for (let j = 0; j < ns; j++) {
        const s = slot(j), v0 = (3.2 + 2.4 * p.r(j, 6)) * (s.inner ? .8 : 1), out = s.r + s.len * .3 + p.drag(v0, 3, a);
        const life = 1 - p.easeInCubic(p.ph(a, .45 + .35 * p.r(j, 7), .8 + .35 * p.r(j, 7)));
        if (life <= .02) continue;
        const tw = a * (4 + 5 * p.r(j, 8)), d = p.v3.norm([s.d[0] + Math.sin(tw) * .5 * p.ph(a, 0, .3), s.d[1] + Math.cos(tw) * .5 * p.ph(a, 0, .3), s.d[2]]);
        const z = Math.max(.08, C[2] + s.d[2] * out - 2.2 * a * a);
        p.shard(C[0] + s.d[0] * out, C[1] + s.d[1] * out, z, s.len * life, s.len * .38 * life, d, SO, { back: .25, sides: 4, spin: p.r(j, 5) * 2 + tw, shadow: j % 3 === 0 });
      }
    }
    // ---- orbit rings ----
    const ow = p.env(t, .5, 1.1, PULL, PULL + .4);
    if (ow > 0) for (let l = 0; l < L; l++) {
      const tl = this.TILT[l], R = .9 + .35 * l, I = .3 * ow * (1 - .5 * p.ph(t, PULL, PULL + .4));
      p.ring(C[0], C[1], C[2], R, .03, CR, I, { axis: [0, -Math.sin(tl), Math.cos(tl)] });
    }
    // ---- the chip swarm ----
    let lit = 0;
    if (t < HIT + .05) for (let k = 0; k < n; k++) {
      const l = k % L, born = .45 + .7 * p.r(k, 9);
      if (t < born) continue;
      const tg = PULL + .05 + .32 * l + .1 * p.r(k, 10), pull = p.easeInCubic(p.ph(t, tg, tg + .42));
      if (pull >= 1) continue;
      const j = k % ns, s = slot(j), tip = [C[0] + s.d[0] * (s.r + s.len * .6), C[1] + s.d[1] * (s.r + s.len * .6), C[2] + s.d[2] * (s.r + s.len * .6)];
      const at = tt => { const pl = p.easeInCubic(p.ph(tt, tg, tg + .42)); return p.v3.lerp(this.orbitPos(p, k, l, tt), tip, pl); };
      const pos = at(t), prev = at(t - .03), sc = p.easeOutBack(p.ph(t, born, born + .16), 2.4);
      let dv = [pos[0] - prev[0], pos[1] - prev[1], pos[2] - prev[2]];
      if (Math.hypot(dv[0], dv[1], dv[2]) < .003) dv = [0, 0, 1];
      const I = (1 - p.ph(pull, .8, 1)) * (t < born + .12 ? 1.6 : 1);
      p.petal(pos[0], pos[1], pos[2], dv, .17 * sc, CR, I);
      if (t < born + .14) p.sparkle(pos[0], pos[1], pos[2], Math.round(4 * (1 - p.ph(t, born, born + .14))), CR, 1);
      if (pull > .85) p.sparkle(pos[0], pos[1], pos[2], 2, CR, 1.2);
      lit++;
    }
    if (lit) p.light(C[0], 0, 0, 2.1, CR, .25 + .3 * Math.min(1, lit / n));
    // ---- hold: glints crawling over the ball, inner pulse ----
    if (t > 2.6 && t < HIT) {
      const h = p.ph(t, 3.0, HIT), rate = 6 + 18 * h, pulse = Math.pow(.5 + .5 * Math.sin(t * rate), 3);
      p.glow(C[0], C[1], C[2] + coreR * .2, coreR * 1.05, CR, (.25 + .5 * pulse) * p.ph(t, 2.6, 2.9));
      const ng = Math.round(5 * p.density);
      for (let g = 0; g < ng; g++) {
        const j = Math.floor(p.r(g + Math.floor(t * 8) * 13, 11) * ns), s = slot(j);
        const q = [C[0] + s.d[0] * (s.r + s.len * .55), C[1] + s.d[1] * (s.r + s.len * .55), C[2] + s.d[2] * (s.r + s.len * .55)];
        if (t > s.pop + .1) p.sparkle(q[0], q[1], q[2], 3, CR, 1.1);
      }
      p.light(C[0], 0, 0, 2, CR, .35 + .35 * pulse);
    }
    // ---- rumble per completed layer ----
    shellDone.forEach(td => {
      const a = t - td;
      if (a < 0 || a > .45) return;
      const u = a / .45;
      p.ring(C[0], 0, .02, .6 + 1.8 * p.easeOutExpo(u), .08 * (1 - u) + .02, CR, .8 * Math.pow(1 - u, 1.4));
    });
    // ---- burst ----
    const a = t - HIT;
    if (a >= 0 && a < 1.2) {
      const fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (fl > 0) { p.glow(C[0], C[1], C[2], SR * (.6 + .7 * fl), CR, 1.5 * fl, { pow: 1.3 }); p.orb(C[0], C[1], C[2], .25 * fl, CR, 1); }
      p.shock(C[0], 0, .03, p.ph(a, 0, .5), { R: 2.6, w: .3, ramp: CR, ground: true });
      p.shock(C[0], C[1], C[2], p.ph(a, 0, .4), { R: 2.2 * SR, w: .2, ramp: CR, axis: p.cam().fwd, light: false });
      if (a < .2) p.speedLines(C[0], C[1], C[2], { n: 18, R0: SR, R1: 3, ramp: CR, I: .8 * (1 - a / .2), seed: Math.floor(t * 30) });
      const nf = Math.round(30 * p.density);
      for (let f = 0; f < nf; f++) {
        const d = p.rdir(f, 41, .3), out = SR * .5 + p.drag(4 + 3 * p.r(f, 42), 3.2, a), z = C[2] + d[2] * out - 1.4 * a * a;
        const life = 1 - p.ph(a, .4 + .5 * p.r(f, 43), .9 + .3 * p.r(f, 43));
        if (life <= 0 || z < .02) continue;
        const tw = (Math.floor(t * 20) + f) % 3 === 0;
        p.dot(C[0] + d[0] * out, C[1] + d[1] * out, z, CR, (tw ? 1.2 : .7) * life, 1);
      }
      p.light(C[0], 0, 0, 2.6, CR, fl);
    }
  },
});
