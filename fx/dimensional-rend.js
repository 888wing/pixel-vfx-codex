// 裂空碎斬 / Rift-Shattering Slashes — pixel version of 00GameDevs "dimensional-rend" (MIT)
PXFX.define({
  id: 'dimensional-rend',
  loop: 3.4,
  // first cut, the cross-shaped finishing cut, then the release that stretches the cuts and throws the shards
  beats: [{ t: .2, kind: 'hit', power: 1 }, { t: .56, kind: 'hit', power: .8 }, { t: 1, kind: 'burst', power: .7 }],
  view: { r: 2.6, h: 2.4 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    cut: ['#3f4fb0', '#5a74e0', '#729dff', '#a8c6ff', '#dceaff', '#ffffff'],
    glass: ['#1c2140', '#2a3160', '#3d4884', '#5866aa', '#7e8ccc'],
    stone: ['#4e4a5c', '#666174', '#7f7a8b', '#9993a2', '#b3adb8'],
  },
  timeline: [
    { t: [0, .2], zh: '預兆：第一道斬痕位置閃過一條極細的導引線，越閃越快', en: 'omen: a hair-thin guide line flickers where the first cut will be, flickering faster' },
    { t: [.2, .56], zh: '連斬：12 道斬痕依序出現，每道在 1–2 幀內由一端劃到另一端（ease-out-expo），出現首 0.1 秒最粗最白再收成細針；最後一道與第一道交叉成 X 字收招', en: 'slashes: 12 cuts appear one after another, each drawn end to end within 1–2 frames (ease-out-expo), thickest and whitest for the first 0.1 s, then thinning to a needle; the last cut crosses the first in an X as the finisher' },
    { t: [.25, .7], zh: '碎空：7 塊三角形空間碎片依次彈開（略為超出再回彈），把後面的景物錯開，碎片內偏暗偏藍，邊緣一像素亮線', en: 'shatter: 7 triangular panels pop open one by one with a slight overshoot and offset the scenery behind them like broken glass, darker and bluer inside with a 1 px bright edge' },
    { t: [1, 1.45], zh: '釋放：斬痕一下亮起並急速向兩端延長 1.5 倍，同時變細，0.45 秒內收縮消失', en: 'release: the cuts flare, shoot out to 1.5x length towards both ends while thinning, and collapse within 0.45 s' },
    { t: [1, 2.6], zh: '回復：錯位先慢後快地回正，最後輕微反彈一下；8 片三角碎片向外彈出、旋轉減速、受重力落下並縮小消失', en: 'recover: the offsets return slowly, then snap back with a small rebound; 8 triangular shards pop outwards, spin down with drag, fall under gravity and shrink away' },
  ],
  layers: [
    { zh: '斬痕：白色 1 像素芯線＋藍色光暈，針形（中間粗兩端尖），長 2.2–3.8；剛出現時寬 2.4 倍', en: 'cuts: 1 px white core with a blue halo, needle profile (thick middle, sharp ends), length 2.2–3.8; 2.4x wider on the first frames' },
    { zh: '劃出閃光：每道斬痕前端在劃出時帶一個四角星，中點彈出 3 粒帶阻力的光屑', en: 'draw flash: a four-point sparkle rides the leading end of each cut, and 3 sparks fly off its middle, slowed by drag' },
    { zh: '空間碎片：世界空間的三角形，內部像素取樣自沿斬痕方向偏移 4–9 像素的背景，偏移彈開（ease-out-back）後慢慢回正', en: 'space panels: world-space triangles whose pixels sample the scene shifted 4–9 px along the cut direction; the offset pops open (ease-out-back), then slowly returns' },
    { zh: '落片：8 片深藍玻璃三角形，亮邊，向外彈出、旋轉漸慢、受重力落下', en: 'falling shards: 8 dark-blue glass triangles with bright edges, popping outwards, spin slowing down, falling under gravity' },
    { zh: '場景：兩根石柱與一個木樁，讓錯位看得清楚；斬痕出現瞬間照亮地面，0.25 秒內暗下', en: 'scene: two stone pillars and a training dummy so the offsets read; each cut lights the ground for 0.25 s as it appears' },
  ],
  params: {
    cuts: { zh: '斬痕數量', en: 'cut count', min: 2, max: 24, step: 1, value: 12 },
    cutLength: { zh: '斬痕長度', en: 'cut length', min: .5, max: 1.5, step: .05, value: 1 },
    panels: { zh: '空間碎片數量', en: 'space panels', min: 0, max: 16, step: 1, value: 7 },
    offset: { zh: '錯位強度', en: 'distortion strength', min: 0, max: 2, step: .1, value: 1 },
  },
  // cut geometry per index (independent of the count, so cuts do not reshuffle when the count changes)
  cutGeo(p, i) {
    const G = this._geo || (this._geo = []);
    if (G[i]) return G[i];
    let a = p.r(i, 1) * p.TAU, tilt = (p.r(i, 2) - .5) * 1.1;
    let c = [(p.r(i, 3) - .5) * 2.6, (p.r(i, 4) - .5) * 2, .45 + p.r(i, 5) * 1.1];
    if (i === 0) { a = .25; tilt = .75; c = [0, 0, 1]; }
    const d = [Math.cos(a), Math.sin(a), tilt], l = Math.hypot(d[0], d[1], d[2]);
    return (G[i] = { c, d: d.map(v => v / l), L: 2.2 + p.r(i, 6) * 1.6, w: .05 + p.r(i, 7) * .03 });
  },
  // the cuts of this cast: n cuts between 0.2 and 0.56 s; the last one is the finisher crossing the first in an X
  cuts(p) {
    const n = Math.max(2, Math.round(p.param('cuts'))), len = p.param('cutLength'), key = n + ':' + len;
    if (this._cutsKey === key) return this._cuts;
    const out = [];
    for (let i = 0; i < n; i++) {
      let g = this.cutGeo(p, i);
      if (i === n - 1) {
        const d = [Math.cos(.35), Math.sin(.35), -.7], l = Math.hypot(d[0], d[1], d[2]);
        g = { c: [.05, .02, 1.02], d: d.map(v => v / l), L: 3.7, w: .085 };
      }
      out.push({ c: g.c, d: g.d, L: g.L * len, w: g.w, at: .2 + .36 * i / (n - 1), i, fin: i === n - 1 });
    }
    this._cutsKey = key;
    return (this._cuts = out);
  },
  draw(p, t) {
    const CU = this.palette.cut, GL = this.palette.glass, ST = this.palette.stone;
    p.pillar(-1.3, -1.2, .45, 1.9, ST);
    p.pillar(1.2, -1.45, .4, 1.4, ST);
    p.dummy(1.1, .6);
    const cuts = this.cuts(p), REL = 1;

    // glass panels: pop open with overshoot, return slowly, then snap back with a small rebound
    const back = p.ph(t, 1.15, 2.3);
    let spread = p.easeOutBack(p.ph(t, .25, .62), 2.2) * (1 - p.easeInCubic(back));
    if (t > 2.3) { const b = t - 2.3; spread = -.22 * Math.exp(-b * 6) * Math.sin(b * 26); }
    spread *= p.param('offset');
    const nP = Math.round(p.param('panels'));
    if (nP > 0 && Math.abs(spread) > .004 && t > .25) this.panels(p, nP, t, spread);

    // the guide line before the first cut: flickers faster as the cut approaches
    const g = p.env(t, .02, .06, .17, .2);
    if (g > 0) { const k = cuts[0], fr = t < .12 ? 15 : 30; p.line(this.pt(k, -1), this.pt(k, 1), .015, CU, .5 * g * ((Math.floor(t * fr) & 1) ? 1 : .45)); }

    // release: a flare, the cuts shoot out to 1.5x and thin, then collapse fast
    const rel = p.ph(t, REL, REL + .45), stretch = 1 + .5 * p.easeOutExpo(p.ph(t, REL, REL + .3));
    const relFade = 1 - p.easeInCubic(rel), relFlare = t >= REL ? Math.pow(1 - p.ph(t, REL, REL + .22), 3) : 0;
    const thin = 1 - .65 * p.easeOutCubic(rel);
    const nS = Math.round(3 * p.density);
    for (const k of cuts) {
      const age = t - k.at;
      if (age < 0 || relFade <= 0) continue;
      // near-instant draw: most of the length within the first frame
      const sweep = p.easeOutExpo(age / .07), x1 = sweep * 2 - 1;
      const kick = Math.pow(1 - p.ph(age, 0, .12), 2), fin = k.fin ? 1.35 : 1;
      const wMul = (1 + 1.4 * kick) * thin * fin, iMul = relFade * (1 + .5 * kick + .8 * relFlare);
      const pts = [], N = 8;
      for (let s = 0; s <= N; s++) pts.push(this.pt(k, (-1 + (x1 + 1) * s / N) * stretch));
      // needle profile: thick in the middle of the finished cut
      for (let s = 0; s < N; s++) {
        const q0 = -1 + (x1 + 1) * s / N, q1 = -1 + (x1 + 1) * (s + 1) / N;
        const tp = q => Math.pow(Math.max(0, 1 - q * q), .7);
        p.line(pts[s], pts[s + 1], k.w * 4 * tp(q0) * wMul, CU, .32 * iMul, { w1: k.w * 4 * tp(q1) * wMul, pow: 2 });
        p.line(pts[s], pts[s + 1], k.w * tp(q0) * wMul + .012, CU, iMul, { w1: k.w * tp(q1) * wMul + .012 });
      }
      if (age < .07) { const h = pts[N]; p.sparkle(h[0], h[1], h[2], k.fin ? 5 : 3, CU, 1); }
      if (age < .25) { const m = this.pt(k, 0); p.light(m[0], m[1], 0, k.fin ? 1.5 : 1, CU, .45 * Math.pow(1 - age / .25, 2)); }
      // sparks off the middle of the cut: fast, then slowed by drag
      if (age < .35) for (let s = 0; s < nS; s++) {
        const j = k.i * 7 + s, life = .2 + p.r(j, 31) * .15, u = age / life;
        if (u >= 1) continue;
        const m = this.pt(k, (p.r(j, 32) - .5) * .8), ang = p.r(j, 33) * p.TAU;
        const dir = [-k.d[1] * Math.cos(ang), k.d[0] * Math.cos(ang), Math.sin(ang)], dd = p.drag(3 + p.r(j, 34) * 2, 9, age);
        p.dot(m[0] + dir[0] * dd, m[1] + dir[1] * dd, m[2] + dir[2] * dd - age * age * 2, CU, 1 - u * .8);
      }
    }

    // falling shards: pop outwards, spin slows down, gravity, shrink away fast at the end
    const nF = Math.round(8 * p.density);
    for (let s = 0; s < nF; s++) {
      const t0 = REL + p.r(s, 11) * .15, T = t - t0, life = 1.3 + p.r(s, 12) * .5;
      if (T <= 0 || T >= life) continue;
      const k = cuts[s % cuts.length], m = this.pt(k, (p.r(s, 13) - .5) * 1.2);
      const da = p.r(s, 14) * p.TAU, out = p.drag(1.6 + p.r(s, 15) * 1.4, 3.5, T);
      const x = m[0] + Math.cos(da) * out, y = m[1] + Math.sin(da) * out, z = m[2] + p.drag(1.4, 4, T) - 1.5 * T * T;
      if (z < .05) continue;
      const shrink = 1 - p.easeInCubic(p.ph(T, life - .3, life));
      const sz = (.09 + p.r(s, 16) * .08) * shrink, sp = p.drag(14 + p.r(s, 17) * 12, 1.6, T) + s, c = Math.cos(sp), sn = Math.sin(sp);
      const A = [x + sz * c, y, z + sz * sn], B = [x - sz * .6 * c + sz * .5 * sn, y + sz * .7, z - sz * .6 * sn - sz * .5 * c], C = [x - sz * .4 * c, y - sz * .8, z + sz * .3 * sn];
      p.tri(A, B, C, GL, { alpha: Math.min(1, 1.6 - T / life) });
      if ((s + Math.floor(t * 12)) % 3 === 0) p.line(A, B, .015, CU, .8 * shrink);
    }
  },
  pt(k, q) { return [k.c[0] + k.d[0] * q * k.L * .5, k.c[1] + k.d[1] * q * k.L * .5, k.c[2] + k.d[2] * q * k.L * .5]; },
  // n triangular windows; each samples the scene shifted along a cut and darkened, with a lit edge
  panels(p, n, t, spread) {
    const tris = [], mag = Math.abs(spread), tint = Math.min(1, mag * 3);
    for (let i = 0; i < n; i++) {
      const k = this.cutGeo(p, (i * 5 + 1) % 12), at = .25 + .3 * (n > 1 ? i / (n - 1) : 0);
      if (t < at) continue;
      const open = p.easeOutBack(p.ph(t, at, at + .1), 2.4);
      const c = [(p.r(i, 21) - .5) * 2.4, (p.r(i, 22) - .5) * 1.8, .35 + p.r(i, 23) * 1.1];
      const len = (.8 + p.r(i, 24) * .7) * open, hgt = .35 + p.r(i, 25) * .45, skew = p.lerp(-.65, 1.2, p.r(i, 26));
      if (len < .02) continue;
      const up = [0, 0, 1], d = k.d, side = [d[1] * up[2] - d[2] * up[1], d[2] * up[0] - d[0] * up[2], d[0] * up[1] - d[1] * up[0]];
      const sl = Math.hypot(side[0], side[1], side[2]) || 1, nn = [side[0] / sl, side[1] / sl, side[2] / sl];
      const e = [d[1] * nn[2] - d[2] * nn[1], d[2] * nn[0] - d[0] * nn[2], d[0] * nn[1] - d[1] * nn[0]];
      const P0 = [c[0] - d[0] * len, c[1] - d[1] * len, c[2] - d[2] * len], P1 = [c[0] + d[0] * len, c[1] + d[1] * len, c[2] + d[2] * len];
      const P2 = [c[0] + d[0] * len * skew * .5 + e[0] * hgt, c[1] + d[1] * len * skew * .5 + e[1] * hgt, c[2] + d[2] * len * skew * .5 + e[2] * hgt];
      const amt = (.18 + p.r(i, 27) * .2) * spread * open * (p.r(i, 28) > .5 ? 1 : -1);
      tris.push({ P: [P0, P1, P2], sh: [k.d[0] * amt, k.d[1] * amt, k.d[2] * amt], c });
    }
    if (!tris.length) return;
    p.post(({ pix, W, H, P }) => {
      if (!this._buf || this._buf.length !== pix.length) this._buf = new Uint32Array(pix.length);
      const src = this._buf;
      src.set(pix);
      const lit = Math.min(1, mag * 1.6);
      for (const tr of tris) {
        const A = P(...tr.P[0]), B = P(...tr.P[1]), C = P(...tr.P[2]), O = P(...tr.c), S = P(tr.c[0] + tr.sh[0], tr.c[1] + tr.sh[1], tr.c[2] + tr.sh[2]);
        if (!A || !B || !C || !O || !S) continue;
        const ox = S[0] - O[0], oy = S[1] - O[1];
        const area = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
        if (Math.abs(area) < 1) continue;
        const inv = 1 / area;
        const x0 = Math.max(0, Math.floor(Math.min(A[0], B[0], C[0]))), x1 = Math.min(W - 1, Math.ceil(Math.max(A[0], B[0], C[0])));
        const y0 = Math.max(0, Math.floor(Math.min(A[1], B[1], C[1]))), y1 = Math.min(H - 1, Math.ceil(Math.max(A[1], B[1], C[1])));
        const eA = Math.hypot(B[0] - C[0], B[1] - C[1]), eB = Math.hypot(C[0] - A[0], C[1] - A[1]), eC = Math.hypot(A[0] - B[0], A[1] - B[1]);
        for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
          const px = ix + .5, py = iy + .5;
          const w0 = ((B[0] - px) * (C[1] - py) - (B[1] - py) * (C[0] - px)) * inv;
          const w1 = ((C[0] - px) * (A[1] - py) - (C[1] - py) * (A[0] - px)) * inv;
          const w2 = 1 - w0 - w1;
          if (w0 < 0 || w1 < 0 || w2 < 0) continue;
          const sx = Math.min(W - 1, Math.max(0, Math.round(ix - ox))), sy = Math.min(H - 1, Math.max(0, Math.round(iy - oy)));
          const c = src[sy * W + sx];
          let r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
          // distance to edges in pixels: w * (2 * area / edge length)
          const dA = w0 * Math.abs(area) / eA, dC = w2 * Math.abs(area) / eC;
          if (Math.min(dA, dC) < 1 && lit > .3) { r = 200; g = 222; b = 255; }
          else { r = r * (1 - .28 * tint); g = g * (1 - .24 * tint); b = Math.min(255, b * (1 - .1 * tint) + 26 * tint); }
          pix[iy * W + ix] = (0xff000000 | (b | 0) << 16 | (g | 0) << 8 | (r | 0)) >>> 0;
        }
      }
    });
  },
});
