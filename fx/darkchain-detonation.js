// 闇鏈崩陣 / Darkchain Sigil Rupture — pixel version of 00GameDevs "darkchain-detonation" (MIT)
PXFX.define({
  id: 'darkchain-detonation',
  loop: 5.2,
  // ignition, chains snapping taut, three of the (accelerating) charge pulses, the rupture
  beats: [
    { t: .05, kind: 'cast', power: .6 }, { t: .88, kind: 'pulse', power: .5 },
    { t: 2, kind: 'pulse', power: .35 }, { t: 2.77, kind: 'pulse', power: .4 }, { t: 3.26, kind: 'pulse', power: .5 },
    { t: 3.65, kind: 'burst', power: 1.3 },
  ],
  view: { r: 2.6, h: 3 },
  stage: { ground: 'ash', tiles: true },
  palette: {
    sigil: ['#3c1a96', '#6a0fd8', '#8300ff', '#b44cff', '#ff6ad0', '#ffe0f4'],
    bolt: ['#8a1040', '#c81850', '#ff2a6a', '#ff7aa0', '#ffd0dc', '#ffffff'],
    // inverse ramp: more light = darker, for black energy with a purple rim
    abyss: ['#7a3ac0', '#5a2496', '#3c1468', '#240c40', '#140822'],
    link: ['#140c1e', '#22162e', '#342446', '#4c3662', '#6a5084'],
    orb: ['#06040a', '#0c0814', '#140e20', '#1e162e'],
  },
  timeline: [
    { t: [0, .45], zh: '雙陣：地面小法陣（半徑 1.2）與頭頂大法陣（高 2.5、半徑 1.9）由中心彈出（超出約 10% 再回彈），點亮瞬間最亮，先急轉再減速並反向旋轉', en: 'twin sigils: a small ground circle (radius 1.2) and a large overhead circle (height 2.5, radius 1.9) pop out with ~10% overshoot, brightest on ignition, whip round then slow to a steady counter-rotation' },
    { t: [.45, .85], zh: '鎖鏈：12 條黑鏈（一半向下、一半向上）沿外彎弧線射出，起步一下急衝再加速撞上對面法陣，接上時閃一下', en: 'chains: 12 black chains (half down, half up) shoot along outward-bowed arcs, a quick kick then accelerating into the opposite sigil, with a spark where each latches' },
    { t: [.88, 1.15], zh: '拉緊：0.88 秒全部鎖鏈一下彈直（約 0.1 秒），向內過衝後回彈靜止', en: 'snap taut: at 0.88 s all chains snap straight in about 0.1 s, overshoot inwards and settle with a damped rebound' },
    { t: [1.15, 3.45], zh: '蓄力：中間黑球彈出並逐拍脹大，表面爬著紅色電紋；脈衝越來越密（間隔 0.4→0.12 秒），每拍一圈紫環由外加速收進黑球、黑球一跳、鎖鏈向內一扯；黑煙沿螺線加速吸入，法陣越轉越快', en: 'charge: a black orb pops in and swells with every beat, red lightning crawling on it; pulses come faster (0.4 → 0.12 s apart); before each one a violet ring accelerates inwards onto the orb, the orb kicks and the chains jerk inwards; black smoke spirals in faster and faster, the sigils spin up' },
    { t: [3.45, 3.65], zh: '壓縮：黑球先微脹，再急縮到 1/5（ease-in-back），鎖鏈與光被一起吸向中心', en: 'compress: the orb swells slightly, then collapses to a fifth (ease-in-back) while the chains and light are pulled inwards' },
    { t: [3.65, 4.35], zh: '崩裂：首兩幀最大最亮的白紫閃光後急收；24 道黑色能量 ease-out-expo 急射後減速、越伸越細；6 組紅紫閃電亂竄；地面震波環急衝外擴並變細；空間一圈圈扭曲；鎖鏈碎成鏈節飛散（阻力減速＋重力下墜）', en: 'rupture: a white-violet flash, biggest on the first two frames, collapses fast; 24 black energy jets shoot out with ease-out-expo and thin as they reach; 6 red-violet lightning groups lash out; a ground shock ring races out and thins; space ripples; the chains shatter into links that fly fast, slow down (drag) and fall' },
    { t: [4.25, 5.2], zh: '餘燼：鏈節落地抖色消失，黑煙散去，法陣急速收縮熄滅', en: 'aftermath: links land and dither away, black smoke thins out, the sigils shrink away quickly' },
  ],
  layers: [
    { zh: '法陣：雙圈＋齒輪狀刻度＋22 格符文環＋五芒星，紫色線條、亮處偏粉紅；蓄力時隨脈衝變亮，崩裂時爆亮後回落', en: 'sigils: double rings, gear-tooth ticks, a 22-cell rune band and a pentagram in violet lines that turn pink where brightest; they flare with each charge pulse and blaze at the rupture' },
    { zh: '鎖鏈：每條 28 節深紫小實心球，下面墊一條寬紫色光暈線', en: 'chains: 28 small dark-violet solid beads per chain over a wide violet glow line' },
    { zh: '黑球：純黑實心球（最大半徑 0.42），外面一圈黑芯紫邊的光暈，表面紅色電紋每 0.08 秒換形', en: 'orb: solid black sphere (up to 0.42 radius) inside a black-core violet-rim aura, red lightning pattern on its surface re-rolled every 0.08 s' },
    { zh: '黑煙：8 道螺旋吸入的黑煙尾（黑芯紫邊光團），越近中心轉得越快', en: 'ink smoke: 8 spiralling trails of black-core violet-rim puffs, turning faster as they near the orb' },
    { zh: '爆發：24 道黑能射線、6 組帶分岔的紅紫閃電、地面震波環、衰減的放射狀空間扭曲、約 60 個飛散鏈節、8 團黑煙', en: 'burst: 24 black energy jets, 6 branching red-violet lightning groups, a ground shock ring, a decaying radial space ripple, about 60 flying chain links, 8 black smoke puffs' },
  ],
  params: {
    chains: { zh: '鎖鏈數量', en: 'chain count', min: 4, max: 16, step: 2, value: 12 },
    burstSize: { zh: '爆發範圍', en: 'burst radius', min: .6, max: 1.3, step: .05, value: 1 },
    jets: { zh: '黑能射線數量', en: 'energy jets', min: 0, max: 40, step: 1, value: 24 },
    bolts: { zh: '閃電組數', en: 'lightning groups', min: 0, max: 12, step: 1, value: 6 },
  },
  // charge pulses, closer and closer together towards the rupture
  PULSES: [1.25, 1.65, 2, 2.3, 2.55, 2.77, 2.96, 3.12, 3.26, 3.38],
  geo(p, n) {
    if (this._g && this._g.n === n) return this._g.ch;
    const ch = [], h = n / 2;
    for (let i = 0; i < n; i++) {
      const down = i < h, j = i % h, a = (j / h) * p.TAU + (down ? 0 : p.TAU / n) + (p.r(i, 1) - .5) * .3;
      const b = a + (p.r(i, 2) - .5) * 1.2 + (down ? .5 : -.5);
      const U = [Math.cos(a) * 1.7, Math.sin(a) * 1.7, 2.5], Lo = [Math.cos(b) * 1.05, Math.sin(b) * 1.05, .03];
      ch.push({ A: down ? U : Lo, B: down ? Lo : U, grow0: .45 + p.r(i, 3) * .1, grow1: .76 + p.r(i, 4) * .08, out: [Math.cos((a + b) / 2), Math.sin((a + b) / 2)] });
    }
    this._g = { n, ch };
    this._fl = null;
    return ch;
  },
  // sigil spin: a whip on ignition, a steady turn, spinning up through the charge, easing off after the burst
  spinAt(t) {
    const B = 3.65, u = Math.min(1, Math.max(0, (t - 1.15) / (B - 1.15)));
    const up = t < B ? 2.5 * u * u * u : 2.5 + 1.2 * (1 - Math.exp(-(t - B) / .4));
    return .4 * t + 1.2 * (1 - Math.exp(-t / .3)) + up;
  },
  draw(p, t) {
    const SG = this.palette.sigil, BO = this.palette.bolt, AB = this.palette.abyss, LK = this.palette.link, OR = this.palette.orb;
    const BURST = 3.65, C = [0, 0, 1.3], bs = p.param('burstSize');
    const charge = p.smooth(1.15, 2.2, t);
    // charge pulses: sharp attack, slow decay; the ring for the next pulse falls inwards before it
    let beat = 0, prevP = 1.15, nextP = 0;
    for (const tp of this.PULSES) {
      if (t >= tp) { beat = Math.max(beat, Math.pow(1 - Math.min(1, (t - tp) / .28), 3)); prevP = tp; } else if (!nextP) nextP = tp;
    }
    const squeeze = p.easeInCubic(p.ph(t, 3.4, BURST));      // everything is pulled in just before the rupture
    // ---------- chains ----------
    const nC = Math.max(2, Math.round(p.param('chains') / 2) * 2), chains = this.geo(p, nC);
    const SNAP = .88, sa = t - SNAP;
    // bowed out while growing (sagging a little more just before), then a hard snap straight with a damped rebound
    const bend = sa < 0 ? 1.05 * (1 + .25 * p.easeInCubic(p.ph(t, .76, SNAP))) : 1.05 * Math.exp(-8 * sa) * Math.cos(p.TAU * 2.6 * sa);
    if (t < BURST) for (const c of chains) {
      const f = p.ph(t, c.grow0, c.grow1);
      if (f <= 0) continue;
      const g = .15 * p.easeOutCubic(f / .2) + .85 * p.easeInCubic(f);   // kick, then accelerate into the far sigil
      const pull = -.18 * beat * charge - .45 * squeeze;
      const pt = s => {
        const k = Math.sin(Math.PI * s), ob = (bend * .55 + pull) * k;
        return [p.lerp(c.A[0], c.B[0], s) + c.out[0] * ob, p.lerp(c.A[1], c.B[1], s) + c.out[1] * ob, p.lerp(c.A[2], c.B[2], s)];
      };
      const n = Math.floor(28 * g);
      let prev = pt(0);
      for (let k = 1; k <= n; k++) {
        const P = pt(k / 28);
        p.ball(P[0], P[1], P[2], k % 2 ? .058 : .04, LK, { shadow: false, lit: k % 2 ? .1 : 0 });
        if (k % 4 === 0) { p.line(prev, P, .16, SG, .2 + .3 * beat + .4 * squeeze, { pow: 2 }); prev = P; }
      }
      const latch = t - c.grow1;                                         // spark where the chain latches on
      if (latch >= 0 && latch < .15) p.glow(c.B[0], c.B[1], c.B[2], .2, SG, 1.3 * Math.pow(1 - latch / .15, 3));
    }
    // ---------- sigils ----------
    const off = p.easeInCubic(p.ph(t, 4.25, 4.75));
    const popG = p.easeOutBack(p.ph(t, 0, .38), 2.2), popU = p.easeOutBack(p.ph(t, .05, .45), 2.2);
    const on = p.ph(t, 0, .06) * (1 - off);
    if (on > 0) {
      const ignite = 1 + 1.3 * Math.pow(1 - p.ph(t, .05, .45), 3) * p.ph(t, 0, .05);
      const blast = t > BURST ? 1 + 2 * Math.pow(1 - p.ph(t, BURST, BURST + .45), 3) : 1;
      const lit = on * ignite * blast * (1 + .5 * beat * charge) * (1 - .35 * squeeze);
      const sp = this.spinAt(t), sc = 1 - off;
      if (popG * sc > .03) this.sigil(p, 0, 0, 0, 1.2 * popG * sc, sp, SG, lit, 1);
      if (popU * sc > .03) this.sigil(p, 0, 0, 2.5, 1.9 * popU * sc, -sp * .62, SG, lit * .9, 2);
      p.light(0, 0, .5, 2, SG, .45 * on * Math.min(2, ignite * blast));
    }
    // ---------- charge ----------
    if (t > 1.15 && t < BURST + .04) {
      const pop = p.easeOutBack(p.ph(t, 1.15, 1.35), 2.5);
      let R = .42 * pop * (.3 + .7 * p.easeOutCubic(p.ph(t, 1.15, 3.3))) * (1 + .16 * beat);
      R *= 1 - .82 * p.easeInBack(p.ph(t, 3.45, BURST), 2.5);              // swell slightly, then collapse to a fifth
      // ink smoke spirals: radius and turn speed both accelerate towards the orb
      const nW = Math.round(8 * p.density);
      for (let w = 0; w < nW; w++) {
        const per = 1.3, u = ((t - 1.15) / per + (w * .381966) % 1) % 1, a0 = ((w * .618034) % 1) * p.TAU;
        for (let k = 0; k < 5; k++) {
          const uu = u - k * .045;
          if (uu <= 0) continue;
          const rr = 1.7 * (1 - uu * uu) * (1 - .4 * squeeze) + R, a = a0 + uu * uu * uu * 8, z = C[2] + (1 - uu * uu) * Math.sin(a0 * 3) * .5;
          p.glow(Math.cos(a) * rr, Math.sin(a) * rr, z, (.2 - k * .025) * (.5 + .5 * (1 - uu)), AB, .9 * charge * (1 - k * .15) * p.smooth(0, .3, uu));
        }
      }
      // the ring of the coming pulse accelerates inwards and lands on the orb as the pulse fires
      if (nextP && t < 3.45) {
        const u = p.ph(t, prevP, nextP);
        p.ring(C[0], C[1], C[2], R + 1.5 * (1 - p.easeInCubic(u)), .04 + .03 * u, SG, (.2 + .7 * u) * charge, { axis: [0, 0, 1] });
      }
      // in-streaming motes, accelerating
      const nM = Math.round(10 * p.density);
      for (let k = 0; k < nM; k++) {
        const u = ((t * 1.4 + p.r(k, 7)) % 1), a = p.r(k, 8) * p.TAU + u * u * 2.5, rr = R + 1.6 * (1 - u * u), z = C[2] + (p.r(k, 9) - .5) * 1.2 * (1 - u * u);
        p.dot(Math.cos(a) * rr, Math.sin(a) * rr, z, SG, u * charge);
        if (u > .6) p.line([Math.cos(a) * rr, Math.sin(a) * rr, z], [Math.cos(a - .2) * (rr + .25 * u), Math.sin(a - .2) * (rr + .25 * u), z], .03, SG, .6 * u * charge, { i1: 0 });
      }
      // the orb
      if (R > .02) {
        p.glow(C[0], C[1], C[2], R * 2.4, AB, 1.1 * charge, { pow: 1.2 });
        p.ball(C[0], C[1], C[2], R, OR, { shadow: false, flat: true });
        const st = Math.floor(t * 12);
        p.shell(C[0], C[1], C[2], R * 1.02, (nx, ny, nz, rim, front) => {
          if (!front) return 0;
          const v = Math.abs(p.noise(nx * 2.6 + st * 3.1, ny * 2.6 + nz * 2.6 + st * 1.7) - .5);
          return v < .07 + .04 * squeeze ? 1 : 0;
        }, BO, charge * (.52 + .35 * beat + .4 * squeeze), { back: 0 });
        p.light(0, 0, 0, 1.4, BO, .3 * charge * Math.max(beat, squeeze));
      }
    }
    // ---------- burst ----------
    const a = t - BURST;
    if (a >= 0 && a < 1.5) {
      // space ripple (resolves the scene drawn so far): strongest at once, decays fast
      const amp = .08 * Math.exp(-a * 4) * (1 - p.smooth(1, 1.4, a));
      if (amp > .003) p.warp(C[0], C[1], C[2], 2.3 * bs, (dx, dy, rho) => {
        const s = Math.sin(rho * 14 - a * 42) * amp * (1 - rho);
        return [dx / (rho + .01) * s, dy / (rho + .01) * s];
      });
      // flash: biggest on the first frames, collapses fast
      const fl = Math.pow(1 - p.ph(a, 0, .25), 3);
      if (fl > .01) {
        p.glow(C[0], C[1], C[2], (.4 + .95 * fl) * bs, SG, 1.6 * fl, { pow: 1.3 });
        p.orb(C[0], C[1], C[2], .24 * fl * bs, BO, 1);
        p.sparkle(C[0], C[1], C[2], Math.round(9 * fl), BO, fl);
      }
      // black energy jets: heads shoot out (ease-out-expo), tails chase them, thinning as they reach
      const nJ = Math.round(p.param('jets')), ju = p.ph(a, 0, .5);
      if (ju < 1) for (let j = 0; j < nJ; j++) {
        const th = j / nJ * p.TAU + p.r(j, 11) * .2, el = (p.r(j, 12) - .45) * 1.1, len = 2.2 * bs * (.75 + .35 * p.r(j, 10));
        const d = [Math.cos(th) * Math.cos(el), Math.sin(th) * Math.cos(el), Math.sin(el)];
        const r1 = len * p.easeOutExpo(p.ph(a, 0, .3)), r0 = len * .95 * p.easeOutCubic(p.ph(a, .04, .5));
        if (r1 - r0 < .03) continue;
        const P0 = [C[0] + d[0] * r0, C[1] + d[1] * r0, C[2] + d[2] * r0], P1 = [C[0] + d[0] * r1, C[1] + d[1] * r1, C[2] + d[2] * r1];
        if (P1[2] < 0) continue;
        p.line(P0, P1, .13 * Math.pow(1 - ju, 1.5) + .02, AB, .9, { w1: .02, i1: .5 });
      }
      // red-violet lightning: lashes out in 0.1 s, sharp decay
      const nB = Math.round(p.param('bolts'));
      if (a < .5) for (let g = 0; g < nB; g++) {
        const seed = Math.floor(a / .05) * 7 + g, th = g / nB * p.TAU + p.r(seed, 13), reach = (1.2 + p.r(seed, 14) * .8) * bs * p.easeOutExpo(p.ph(a, 0, .1));
        const end = [C[0] + Math.cos(th) * reach, C[1] + Math.sin(th) * reach, Math.max(.05, C[2] + (p.r(seed, 15) - .5) * 1.8 * Math.min(1, reach))];
        p.bolt(C, end, g % 2 ? BO : SG, { seed, jag: .22, depth: 4, branches: 2, w: .04, I: Math.pow(1 - a / .5, 2), glow: .3 });
      }
      // ground shock ring: races out (ease-out-expo), thinning as it grows
      const sk = p.ph(a, 0, .75);
      if (sk < 1) {
        p.ring(0, 0, .03, .3 + p.easeOutExpo(sk) * 2.1 * bs, .17 * Math.pow(1 - sk, 2) + .025, SG, Math.pow(1 - sk, 1.5), { fn: ang => .6 + .4 * Math.cos(ang * 7 + 1) });
        p.light(0, 0, 0, .5 + 2.2 * bs * p.easeOutCubic(sk), SG, .9 * Math.pow(1 - sk, 2));
      }
      // chain links flung outwards: fast, then slowed by drag, falling under gravity; they dither away on the ground
      const base = this.flungLinks(p, chains), nL = Math.min(base.length, Math.round(base.length / 2 * p.density));
      const sink = 1 - p.ph(a, .9, 1.4);
      for (let k = 0; k < nL; k++) {
        const L = base[k], D = p.drag(L.sp * bs, 3.2, a);
        const x = L.x + L.dx * D, y = L.y + L.dy * D;
        let z = L.z + L.dz * D + .9 * a - 2.8 * a * a;
        if (z < .03) z = .03;
        if (Math.hypot(x, y) > 2.4 || sink <= 0) continue;
        p.ball(x, y, z, .045, LK, { shadow: false, lit: .1, alpha: sink < 1 ? sink : undefined });
        if (a < .25 && k % 4 === 0) p.dot(x, y, z, SG, 1 - a / .25, 2);
      }
      // black smoke thinning out
      const nS = Math.round(8 * p.density);
      for (let s = 0; s < nS; s++) {
        const u = p.ph(a, .03, 1.4), ang = ((s * .618034) % 1) * p.TAU + .4, rr = .3 + p.easeOutExpo(u) * 1.5 * bs;
        if (u >= 1) continue;
        p.glow(C[0] + Math.cos(ang) * rr, C[1] + Math.sin(ang) * rr, C[2] - .6 * p.easeOutCubic(u) + Math.sin(ang * 2) * .3, (.35 + .3 * p.easeOutCubic(u)) * Math.pow(1 - u, .8), AB, .85);
      }
    }
  },
  // chain links at the moment of the burst, with outward directions; ordered slot by slot so that a lower density
  // still covers every chain (fixed layout from the chain geometry)
  flungLinks(p, chains) {
    if (this._fl) return this._fl;
    const out = [], SL = [2, 14, 8, 20, 26, 5, 17, 11, 23, 25];
    SL.forEach((k, j) => chains.forEach((c, i) => {
      const s = k / 28, P = [p.lerp(c.A[0], c.B[0], s), p.lerp(c.A[1], c.B[1], s), p.lerp(c.A[2], c.B[2], s)];
      const dx = P[0], dy = P[1], dz = P[2] - 1.3, d = Math.hypot(dx, dy, dz) || 1;
      out.push({ x: P[0], y: P[1], z: P[2], dx: dx / d, dy: dy / d, dz: dz / d, sp: 4.5 + p.r(i * 40 + k, 17) * 4.5 });
    }));
    return (this._fl = out);
  },
  sigil(p, cx, cy, cz, R, spin, SG, I, seed) {
    p.decal(cx, cy, cz, R + .04, (x, y, rho, ang) => {
      let v = Math.max(p.band(rho, R, .045), p.band(rho, R * .93, .03) * .8, p.band(rho, R * .7, .03) * .85, p.band(rho, R * .25, .03));
      if (rho > R * .74 && rho < R * .9) {
        const aa = ((ang + spin) / p.TAU % 1 + 1) % 1, cell = Math.floor(aa * 22);
        v = Math.max(v, p.rune((aa * 22 - cell) * 1.2 - .1, (rho - R * .75) / (R * .14), cell + seed * 50) * .7);
      }
      if (rho > R * .95 && rho < R * 1.02) {                 // gear teeth
        const aa = (((ang - spin * 1.5) / p.TAU % 1) + 1) % 1 * 48;
        if (aa % 1 < .35) v = Math.max(v, .6);
      }
      if (rho < R * .7 && p.sdPoly(x, y, 5, R * .66, -spin * 2, 2) < .03) v = Math.max(v, .9);
      // red core, violet rim
      return v * (rho < R * .5 ? 1 : .8);
    }, SG, I);
  },
});
