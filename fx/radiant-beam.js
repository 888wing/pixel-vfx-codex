// 日輪輝柱 / Solar Halo Beam — pixel version of 00GameDevs "radiant-beam" (MIT)
PXFX.define({
  id: 'radiant-beam',
  loop: 3.6,
  beats: [
    { t: .35, kind: 'cast', power: .6 }, { t: .5, kind: 'hit', power: .9 },
    { t: 1.35, kind: 'pulse', power: .6 }, { t: 2.15, kind: 'pulse', power: .7 },
  ],
  view: { r: 3.1, h: 2.2 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    sun: ['#b8823e', '#d9a457', '#f0c879', '#ffe3a0', '#fff4d4', '#ffffff'],
    stone: ['#5a5468', '#726b7c', '#8c8592', '#a69fa8', '#c0b9bc'],
  },
  timeline: [
    { t: [0, .35], zh: '左邊圓形印記由小彈出（超出約 12% 再回彈），轉速由靜止加速；中心光點先脹大，發射前一刻急縮', en: 'the round sigil pops out with ~12% overshoot and spins up from rest; its centre dot swells, then snaps small just before firing' },
    { t: [.35, .5], zh: '發射：光柱由印記中心射出，越伸越快，0.15 秒撞上石柱', en: 'fire: the beam leaves the sigil centre, accelerating, and strikes the pillar in 0.15 s' },
    { t: [.5, .9], zh: '命中：首兩幀大白光；6 片花瓣光圈急速彈開並超出後回彈，旋轉由快變慢；衝擊光環 ease-out-expo 擴散變細', en: 'impact: a big white flash on the first frames; the 6-petal flower snaps open with overshoot, spinning fast then slowing; a shock ring expands (ease-out-expo) and thins' },
    { t: [.9, 2.8], zh: '持續：亮珠由慢到快沿光柱衝向命中點；1.35 及 2.15 秒各有一顆大光團加速衝下，命中時光柱瞬間變粗、花瓣伸長再慢慢回落', en: 'sustain: beads accelerate down the beam into the hit; at 1.35 and 2.15 s a big surge orb races down, the beam thickens instantly and the petals stretch, then ease back' },
    { t: [2.8, 3.1], zh: '停止：印記急縮消失，光柱尾端加速收回命中點', en: 'stop: the sigil collapses quickly, the beam tail retracts into the hit, accelerating' },
    { t: [3.1, 3.4], zh: '命中花瓣先微微張開，再向內急速合攏熄滅', en: 'the hit petals flare open slightly, then snap shut inward and go out' },
  ],
  layers: [
    { zh: '印記：直立圓環（半徑 0.5）＋8 個刻度＋內圈，面向光柱方向，帶 3 片繞圈的新月形花瓣', en: 'sigil: upright ring (radius 0.5) with 8 ticks and an inner ring, facing along the beam, 3 crescent petals circling it' },
    { zh: '光點：印記外 8 粒金色光點沿圓周閃爍漂移', en: 'motes: 8 gold dots drifting and twinkling around the sigil' },
    { zh: '光柱：白色核心線＋金色外層（寬約 4 像素），7 顆亮珠沿線加速流動並拉出短拖影', en: 'beam: white core line inside a gold outer band (~4 px); 7 bright beads accelerate along it, smeared by speed' },
    { zh: '命中花：6 片淚滴形花瓣輪廓圍成一圈，脈動伸縮並慢轉，中心白熱光點', en: 'hit flower: 6 teardrop petal outlines in a circle, pulsing in length and turning slowly, white-hot centre' },
    { zh: '衝擊光環：命中及每次光團到達時，光柱方向的圓環急速擴散後減速變細', en: 'shock ring: on the strike and on each surge a ring facing along the beam shoots out, slows and thins' },
    { zh: '火花：命中點 8 個四角星向外彈出，先快後慢', en: 'glints: 8 four-point stars fly out of the hit, fast then slow' },
    { zh: '道具：左邊矮石座承托印記，右邊石柱為目標', en: 'props: a short stone plinth under the sigil at the left, a stone pillar target at the right' },
    { zh: '地面：沿光柱的暖金色光照', en: 'ground: warm gold light along the beam' },
  ],
  params: {
    beamWidth: { zh: '光柱粗細', en: 'beam width', min: .5, max: 2.5, step: .1, value: 1 },
    petals: { zh: '花瓣數量', en: 'petal count', min: 3, max: 10, step: 1, value: 6 },
    beads: { zh: '亮珠數量', en: 'bead count', min: 0, max: 16, step: 1, value: 7 },
    sigilSize: { zh: '印記大小', en: 'sigil size', min: .6, max: 1.5, step: .05, value: 1 },
  },
  draw(p, t) {
    const C = this.palette.sun, ST = this.palette.stone;
    const A = [-2.3, 0, 1.15], B = [2.2, 0, 1.05];
    const FIRE = .35, HIT = .5, STOP = 2.8, END = 3.1, SURGES = [1.35, 2.15];
    const bw = p.param('beamWidth'), nPet = p.param('petals'), sz = p.param('sigilSize');
    p.box(-2.55, -.22, 0, -2.05, .22, .42, ST);
    p.pillar(2.55, 0, .62, 2.1, ST);

    // disc basis facing (mostly) along +x, tilted a little towards the viewer so it never collapses to a line
    const N = p.mode === '2d' ? [1, 1.6, 0] : [1, .42, 0], nl = Math.hypot(N[0], N[1]);
    const n = [N[0] / nl, N[1] / nl, 0], e1 = [-n[1], n[0], 0], e2 = [0, 0, 1];
    const D = (c, r, a, dx = 0) => [c[0] + (e1[0] * Math.cos(a) + e2[0] * Math.sin(a)) * r + n[0] * dx,
      c[1] + (e1[1] * Math.cos(a) + e2[1] * Math.sin(a)) * r + n[1] * dx, c[2] + Math.sin(a) * r];
    const petal = (c, ang, len, wid, I, dx) => {         // teardrop outline from the centre outward and back
      const pts = [];
      for (let k = 0; k <= 10; k++) {
        const u = k / 10, a = ang + (u - .5) * wid * 2, r = len * Math.sin(u * Math.PI) * (.55 + .45 * Math.sin(u * Math.PI));
        pts.push(D(c, r, a, dx * Math.sin(u * Math.PI)));
      }
      for (let k = 0; k < 10; k++) p.line(pts[k], pts[k + 1], .05, C, I * (.55 + .45 * Math.sin(k / 10 * Math.PI)));
    };
    // surges: sharp attack, slow decay
    let surge = 0;
    for (const ts of SURGES) { const d = t - ts; if (d >= 0 && d < .6) surge = Math.max(surge, Math.pow(1 - d / .6, 3)); }

    // ----- source sigil: pops out with overshoot, spins up from rest, collapses fast at the stop -----
    const pop = p.easeOutBack(p.ph(t, 0, .3), 2.2), shut = p.easeInCubic(p.ph(t, STOP, STOP + .22));
    const sOn = Math.min(1, t / .1) * (1 - shut);
    if (sOn > 0) {
      const R = .5 * sz * Math.max(0, pop) * (1 - shut * .9), spin = 1.8 * (t - .4 * (1 - Math.exp(-t / .4)));
      p.ring(A[0], A[1], A[2], R, .055, C, 1.15 * sOn, { axis: n });
      p.ring(A[0], A[1], A[2], R * .6, .04, C, .9 * sOn, { axis: n, fn: a => (Math.sin(a * 6 - spin * 2) > -.4 ? 1 : 0) });
      for (let k = 0; k < 8; k++) {
        const a = spin + k / 8 * p.TAU;
        p.line(D(A, R * 1.04, a), D(A, R * 1.18, a), .04, C, .95 * sOn);
      }
      for (let k = 0; k < 3; k++) {                       // crescents circling the ring
        const a = -spin * 1.3 + k / 3 * p.TAU;
        p.ring(A[0] + n[0] * .06, A[1] + n[1] * .06, A[2], R * 1.4, .055, C, 1.05 * sOn, { axis: n, a0: a, a1: a + 1.1, fn: (ang, u) => Math.min(1, Math.sin(u * Math.PI) * 2.5) });
      }
      const nM = Math.round(8 * p.density);
      for (let k = 0; k < nM; k++) {
        const a = p.r(k, 1) * p.TAU + spin * (.25 + p.r(k, 2) * .35), r = R * (1.45 + p.r(k, 3) * .5);
        const tw = .5 + .5 * Math.sin(t * 9 + k * 2.3);
        p.dot(...D(A, r, a, (p.r(k, 4) - .5) * .4), C, (.45 + .5 * tw) * sOn);
      }
      // centre: swells while charging, snaps small at the release, kicks bright as the beam leaves
      const c = p.ph(t, .1, FIRE), core = t < FIRE ? (c < .65 ? p.easeOutCubic(c / .65) : 1 - p.easeInCubic((c - .65) / .35) * .8) : .5;
      const kick = t >= FIRE ? Math.pow(1 - p.ph(t, FIRE, FIRE + .18), 2) : 0;
      p.glow(A[0], A[1], A[2], (.14 + .18 * core + kick * .25 + surge * .1) * sz, C, (.45 + .35 * core + kick * .6) * sOn);
      p.orb(A[0], A[1], A[2], (.05 + .06 * core) * sz, C, sOn);
      p.light(A[0], 0, .5, 1.3, C, .7 * sOn);
    }

    // ----- beam -----
    const P = u => [p.lerp(A[0], B[0], u), p.lerp(A[1], B[1], u), p.lerp(A[2], B[2], u)];
    const head = p.easeIn(p.ph(t, FIRE, HIT)), tail = p.easeInCubic(p.ph(t, STOP, END - .02));
    const a = t - HIT, strike = a >= 0 ? Math.pow(1 - p.ph(a, 0, .14), 2) : 0;
    if (t >= FIRE && head > tail + .01) {
      const s0 = P(tail), s1 = P(head), shim = .92 + .08 * Math.sin(t * 40), wide = bw * (1 + surge * .7 + strike * .6);
      p.line(s0, s1, .26 * wide, C, (.5 + surge * .2) * shim, { pow: 1 });
      p.line(s0, s1, .1 * Math.sqrt(wide), C, 1.05 + surge * .3);
      // beads: slow near the sigil, fast into the hit (u = .35x + .65x²), smeared along the beam
      const nB = Math.round(p.param('beads') * p.density), path = x => .35 * x + .65 * x * x;
      for (let k = 0; k < nB; k++) {
        const x = (t * .9 + k / Math.max(1, nB)) % 1, u = path(x), u0 = path(Math.max(0, x - .06));
        if (u < tail || u > head) continue;
        const q = P(u), q0 = P(Math.max(tail, u0));
        p.glow(q[0], q[1], q[2], .17, C, .55);
        p.line(q0, q, .06, C, .9, { i1: 0 });
        p.dot(q[0], q[1], q[2], C, 1.2, 2);
      }
      p.glow(s1[0], s1[1], s1[2], .2, C, .8);
      for (let k = 0; k < 6; k++) p.light(p.lerp(s0[0], s1[0], (k + .5) / 6), 0, .7, .85, C, .38 + surge * .2);
    }
    // surge orbs: launched 0.3 s before each surge, accelerating down the beam
    for (const ts of SURGES) {
      const x = p.ph(t, ts - .3, ts);
      if (x <= 0 || x >= 1) continue;
      const u = p.easeInCubic(x), q = P(u), q0 = P(p.easeInCubic(Math.max(0, x - .18)));
      p.line(q0, q, .2 * bw, C, 1.1, { w1: .04, i1: .2 });
      p.glow(q[0], q[1], q[2], .3 * Math.sqrt(bw), C, 1);
      p.orb(q[0], q[1], q[2], .07 * Math.sqrt(bw), C, 1);
    }

    // ----- hit flower: drawn over the target (the hit face points away from the 2.5D camera) -----
    const close = p.ph(t, END - .08, END + .25), fold = Math.max(0, 1 - p.easeInBack(close, 2.5));
    if (a >= 0 && fold > 0) {
      p.post(({ zb }) => zb.fill(-1e9));                  // local helper: later light ignores the solids' depth
      const open = Math.max(0, p.easeOutBack(p.ph(a, 0, .3), 2.4)), spin = -(1.1 * a + 2.6 * (1 - Math.exp(-a * 6)));
      const hOn = Math.min(1, a / .04) * fold;
      for (let k = 0; k < nPet; k++) {
        const pulse = .82 + .18 * Math.sin(t * 8 + k * 1.7);
        petal(B, spin + k / nPet * p.TAU, (.68 + strike * .3 + surge * .3) * pulse * open * fold, .3 * 6 / Math.max(6, nPet), 1.1 * hOn, -.22);
      }
      p.ring(B[0], B[1], B[2], .2 * open * fold, .04, C, .8 * hOn, { axis: n });
      p.glow(B[0], B[1], B[2], .22 + strike * .5 + surge * .2, C, (.6 + strike * .9 + surge * .4) * hOn);
      p.orb(B[0], B[1], B[2], .07 + strike * .06, C, hOn);
      // glints: fly out fast, slow down (drag), respawn
      const nG = Math.round(8 * p.density);
      for (let k = 0; k < nG; k++) {
        const life = .4 + p.r(k, 33) * .45, cyc = a / life, j = Math.floor(cyc), u = cyc - j;
        const ang = p.r(k + j * 5, 32) * p.TAU, d = .2 + p.drag(3.2, 5, u * life);
        const q = D(B, d, ang, -d * .6);
        p.sparkle(q[0], q[1], q[2], 1, C, (1 - u) * hOn);
      }
      p.light(B[0] - .3, 0, .7, 1.4, C, (.8 + strike * .4) * hOn);
    }
    // shock rings facing along the beam: on the strike and on each surge
    for (const [t0, size, I] of [[HIT, 1.1, 1.1], ...SURGES.map(s => [s, .7, .8])]) {
      const u = p.ph(t, t0, t0 + .45);
      if (t < t0 || u >= 1) continue;
      p.ring(B[0] - .2, B[1], B[2], .2 + p.easeOutExpo(u) * size, .12 * Math.pow(1 - u, 1.5) + .02, C, I * (1 - u), { axis: n });
    }
  },
});
