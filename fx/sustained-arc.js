// 連續雷流 / Sustained Arc — pixel version of 00GameDevs "sustained-arc" (MIT)
PXFX.define({
  id: 'sustained-arc',
  loop: 3.2,
  beats: [
    { t: .05, kind: 'cast', power: .5 }, { t: .18, kind: 'hit', power: .7 },
    { t: .9, kind: 'pulse', power: .6 }, { t: 1.5, kind: 'pulse', power: .7 }, { t: 2.1, kind: 'pulse', power: .8 },
  ],
  view: { r: 3, h: 2.4 },
  stage: { ground: 'slate' },
  palette: {
    arc: ['#5a4fc0', '#6f7ae2', '#a4b6ff', '#cad5ff', '#eef2ff', '#ffffff'],
    lilac: ['#6a4cc0', '#8a6ee6', '#b8a2ff', '#ddd2ff'],
    stone: ['#3c3f50', '#525667', '#686c7e', '#808496', '#9a9dad'],
  },
  timeline: [
    { t: [0, .18], zh: '兩端齒輪印記彈出（超出再回彈），主電弧由石柱頂加速射出，0.13 秒接通木人', en: 'cog sigils pop in with overshoot at both ends; the main arc shoots from the pylon top, accelerating, and connects to the dummy in 0.13 s' },
    { t: [.18, .5], zh: '接通：木人端白光一閃、火花向外噴出再被阻力拖慢下墜', en: 'connect: a white flash at the dummy end, sparks burst out, drag slows them, gravity pulls them down' },
    { t: [.5, 2.6], zh: '持續：折線主電弧每 0.08 秒換形；0.9、1.5、2.1 秒各一次電湧，電弧瞬間變粗、拱弧全亮並升高、一顆亮珠沿接地線加速衝落地面、地面線亮點由左掃到右，之後慢慢回落', en: 'sustain: the angular main arc reshapes every 0.08 s; surges at 0.9, 1.5 and 2.1 s thicken it instantly, light and raise every arch, send a bright bead accelerating down each ground wire and a bright spot sweeping along the ground line, then ease back' },
    { t: [2.6, 2.85], zh: '停止：所有線條閃斷並急速變暗，齒輪印記先微脹再急縮消失', en: 'stop: every line stutters and dims fast, the cogs swell slightly, then collapse' },
    { t: [2.85, 3.2], zh: '空白', en: 'empty' },
  ],
  layers: [
    { zh: '主電弧：9 段折線（上下 ±0.2 隨機），白色 1–2 像素核心＋藍紫外光，另有 2 條較細的副折線；電湧時寬度約 1.9 倍', en: 'main arc: a 9-segment angular polyline (±0.2 random offsets), 1-2 px white core in a blue-violet halo, plus 2 thinner secondary zigzags; about 1.9x wider during a surge' },
    { zh: '拱弧：2 道由端點向上拱起 0.35–0.5 的淡紫細弧，強度閃爍', en: 'arches: 2 thin lilac curves bowing 0.35-0.5 up between the ends, flickering' },
    { zh: '齒輪印記：兩端半徑 0.2 的光環＋10 個外齒，慢轉，上方有 4 角小星', en: 'cog sigils: radius 0.2 rings with 10 outer teeth at both ends, turning slowly, a small 4-point star above each' },
    { zh: '接地線：電流沿石柱（半徑 0.3）及木人（半徑 0.4）螺旋繞下到地面，約 2.5 圈，向下流動', en: 'ground wires: current spirals down the pylon (radius 0.3) and the dummy (radius 0.4) to the ground, about 2.5 turns, flowing downward' },
    { zh: '地面線：兩端之間地面上一條淡藍正弦光線', en: 'ground line: a faint blue sine line on the ground between the two ends' },
    { zh: '火花：木人端持續噴出 10 條藍白短線，接通及每次電湧時多噴一陣；先快後慢＋重力', en: 'sparks: 10 blue-white streaks keep spitting from the dummy end, with an extra burst on the connect and each surge; fast then slow, with gravity' },
    { zh: '道具：左邊細石柱（施放源），右邊木人（目標）', en: 'props: slim stone pylon at the left (source), training dummy at the right (target)' },
  ],
  params: {
    arcWidth: { zh: '電弧粗細', en: 'arc width', min: .5, max: 2.5, step: .1, value: 1 },
    arches: { zh: '拱弧數量', en: 'arch count', min: 0, max: 5, step: 1, value: 2 },
    wireTurns: { zh: '接地線圈數', en: 'wire turns', min: 1, max: 4, step: .5, value: 2.5 },
    sparks: { zh: '火花數量', en: 'spark count', min: 0, max: 30, step: 1, value: 10 },
  },
  draw(p, t) {
    const C = this.palette.arc, L = this.palette.lilac, ST = this.palette.stone;
    const A = [-2.05, 0, 1.78], B = [2.02, 0, 1.22];
    const FIRE = .05, LINK = .18, STOP = 2.6, END = 2.85, SURGES = [.9, 1.5, 2.1];
    const aw = p.param('arcWidth'), nArch = p.param('arches'), turns = p.param('wireTurns');
    p.pillar(-2.05, 0, .36, 1.42, ST);
    p.box(-2.2, -.15, 1.42, -1.9, .15, 1.5, ST);
    p.dummy(2.36, 0);

    const pop = Math.max(0, p.easeOutBack(p.ph(t, 0, .16), 2.4)) * (1 + .12 * p.easeOutCubic(p.ph(t, STOP, STOP + .08)) - 1.12 * p.easeInCubic(p.ph(t, STOP + .06, END)));
    const fade = 1 - p.easeInCubic(p.ph(t, STOP, END));
    const seed = Math.floor(t / .08);
    // stutter while fading: drop random frames
    const on = Math.min(1, t / .04) * fade * (t > STOP && p.r(seed, 99) < .35 ? .35 : 1);
    if (on <= 0) return;
    let surge = 0, sd = 9;
    for (const ts of SURGES) { const d = t - ts; if (d >= 0 && d < .5) { surge = Math.max(surge, Math.pow(1 - d / .5, 3)); sd = Math.min(sd, d); } }
    const head = p.easeIn(p.ph(t, FIRE, LINK)), la = t - LINK, strike = la >= 0 ? Math.pow(1 - p.ph(la, 0, .12), 2) : 0;

    // ----- main arc: angular polyline, grows from the pylon to the dummy -----
    const zig = (sd, amp) => {
      const pts = [];
      for (let k = 0; k <= 9; k++) {
        const u = k / 9 * head, e = Math.sin(k / 9 * Math.PI);
        pts.push([p.lerp(A[0], B[0], u), (p.r(sd * 17 + k, 1) - .5) * amp * .8 * e,
          p.lerp(A[2], B[2], u) + (p.r(sd * 17 + k, 2) - .5) * amp * 2 * e]);
      }
      return pts;
    };
    if (t >= FIRE) {
      const main = zig(seed, .3), boost = aw * (1 + surge * .9 + strike * .6);
      for (let k = 0; k < 9; k++) {
        p.line(main[k], main[k + 1], .24 * boost, C, (.42 + surge * .2) * on, { pow: 2 });
        p.line(main[k], main[k + 1], .05 * Math.sqrt(boost), C, (1.2 + surge * .3) * on);
      }
      for (let s = 0; s < 2; s++) {
        const pts = zig(seed * 3 + s + 7, .3);
        for (let k = 0; k < 9; k++) p.line(pts[k], pts[k + 1], .02 * Math.sqrt(aw), C, .6 * on * (p.r(seed + s, 5) > .3 - surge ? 1 : .4));
      }
      const tip = main[9];
      if (head < 1) { p.glow(tip[0], tip[1], tip[2], .25, C, 1); p.sparkle(tip[0], tip[1], tip[2], 2, C, 1); }
    }
    // ----- arches: flicker; all on and taller during a surge -----
    if (la >= 0) for (let s = 0; s < nArch; s++) {
      const hgt = (.35 + s * .15 + p.r(seed + s, 8) * .08) * (1 + surge * .35), fl = p.r(seed * 2 + s, 9) > .25 - surge ? 1 : 0;
      let prev = null;
      for (let k = 0; k <= 16; k++) {
        const u = k / 16, q = [p.lerp(A[0], B[0], u), (s % 2 - .5) * (.25 + s * .06) * Math.sin(u * Math.PI), p.lerp(A[2], B[2], u) + Math.sin(u * Math.PI) * hgt];
        if (prev) p.line(prev, q, .02, L, (.55 + surge * .4) * on * fl);
        prev = q;
      }
    }

    // ----- cog sigils, stars, ground wires -----
    const ax = p.mode === '2d' ? [1, 1.6, 0] : [1, .42, 0];
    const al = Math.hypot(ax[0], ax[1]), n = [ax[0] / al, ax[1] / al, 0], e1 = [-n[1], n[0], 0];
    const cog = (c, spin, kick) => {
      const r = .2 * Math.max(0, pop) * (1 + kick * .25);
      if (r < .01) return;
      p.ring(c[0], c[1], c[2], r, .04, C, .95 * on, { axis: n });
      for (let k = 0; k < 10; k++) {
        const a = spin + k / 10 * p.TAU, ca = Math.cos(a), sa = Math.sin(a);
        const P = rr => [c[0] + e1[0] * ca * rr, c[1] + e1[1] * ca * rr, c[2] + sa * rr];
        p.line(P(r * 1.05), P(r * 1.4), .035, C, .8 * on);
      }
      p.glow(c[0], c[1], c[2], .3 + kick * .22, C, (.55 + kick * .5) * on);
      p.orb(c[0], c[1], c[2], .06, C, on);
      p.sparkle(c[0], c[1], c[2] + .42, 2, C, .9 * on);
      p.light(c[0], 0, .5, 1.1, C, (.5 + .3 * kick) * on);
    };
    // spin speeds up on each surge and coasts back down
    const spin = t * 1.5 + SURGES.reduce((s, ts) => s + (t > ts ? 2.5 * (1 - Math.exp(-(t - ts) * 5)) : 0), 0);
    const wire = (c, rad, top) => {                     // current spiralling down the pylon / the dummy to the ground
      let prev = null;
      const rate = turns * p.TAU / top, bead = sd < .4 ? top * (1 - p.easeIn(sd / .4)) : -9;   // surge bead races down
      for (let k = 0; k <= 40; k++) {
        const z = top * (1 - k / 40), a = z * rate + t * 9, w = rad * (1 + Math.sin(z * 25 - t * 20) * .12);
        const q = [c[0] + Math.cos(a) * w, Math.sin(a) * w, z];
        if (prev) p.line(prev, q, .025, C, (.6 + 1.2 * Math.max(0, 1 - Math.abs(z - bead) / .25)) * on);
        prev = q;
      }
      if (bead > 0) { const a = bead * rate + t * 9; p.glow(c[0] + Math.cos(a) * rad, Math.sin(a) * rad, bead, .18, C, 1 * on); }
    };
    cog(A, spin, Math.max(surge, t < .3 ? Math.pow(1 - p.ph(t, FIRE, .3), 2) : 0));
    if (la >= 0) {
      wire([-2.05, 0], .3, 1.4);
      wire([2.36, 0], .4, 1.05);
      // ground line between the two bases, a bright spot sweeps along it on each surge
      const spot = sd < .45 ? p.easeOutCubic(sd / .45) : -9;
      let prev = null;
      for (let k = 0; k <= 24; k++) {
        const u = k / 24, x = p.lerp(A[0] + .1, B[0] + .1, u), q = [x, Math.sin(u * 18 - t * 6) * .1, .015];
        if (prev) p.line(prev, q, .03, C, (.3 + .9 * Math.max(0, 1 - Math.abs(u - spot) / .12)) * on);
        prev = q;
      }
    }
    // ----- sparks at the dummy end: steady spit + bursts on the connect and each surge; drag + gravity -----
    const nS = Math.round(p.param('sparks') * p.density);
    const spark = (age, life, ang, sp, I) => {
      const u = age / life;
      if (u <= 0 || u >= 1) return;
      const d = p.drag(sp, 6, age), dp = p.drag(sp, 6, Math.max(0, age - .04));
      const dir = [-.6, Math.cos(ang) * .8, Math.sin(ang) * .7 + .3];
      const z = B[2] + dir[2] * d - 3 * age * age, zp = B[2] + dir[2] * dp - 3 * Math.max(0, age - .04) ** 2;
      if (z < 0) return;
      p.line([B[0] + dir[0] * d, dir[1] * d, z], [B[0] + dir[0] * dp, dir[1] * dp, zp], .035, C, I * (1 - u) * on);
    };
    if (la >= 0) {
      for (let s = 0; s < nS; s++) {
        const life = .3 + p.r(s, 11) * .25, cyc = la / life + p.r(s, 12), k = Math.floor(cyc), q = s * 13 + k;
        if (t < STOP) spark((cyc - k) * life, life, p.r(q, 13) * p.TAU, 1.5 + p.r(q, 14) * 2, .8);
        spark(la, life + .1, p.r(s, 15) * p.TAU, 4 + p.r(s, 16) * 4, 1);                 // connect burst
        SURGES.forEach((ts, i) => spark(t - ts, life, p.r(s + i * 50, 17) * p.TAU, 3 + p.r(s + i * 50, 18) * 3, .9));
      }
    }
    if (strike > 0) p.glow(B[0], 0, B[2], .25 + .35 * strike, C, 1.2 * strike);
    // the hit-side cog sits on the dummy's far face from the 2.5D camera: draw it over the solids
    p.post(({ zb }) => zb.fill(-1e9));
    if (la >= 0 || t > .1) cog(B, -spin, Math.max(surge, strike));
  },
});
