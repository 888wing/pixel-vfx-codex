// 裂空刃影 / Riftblade Trail — pixel version of 00GameDevs "spatial-smear" (MIT)
PXFX.define({
  id: 'spatial-smear',
  loop: 3.2,
  view: { r: 2.3, h: 2.2 },
  stage: { ground: 'sand', tiles: true },
  palette: {
    edge: ['#6a7fc4', '#97b0e2', '#c4dcf6', '#e9f5ff', '#ffffff'],
    cloth: ['#3a2a48', '#523c62', '#6c5480', '#8a70a0', '#a890bc'],
    steel: ['#4c5068', '#6e7490', '#9aa2ba', '#c8d0e0', '#eef2f8'],
    stone: ['#5a5464', '#736c7c', '#8e8794', '#a8a1aa', '#c2bcc0'],
  },
  timeline: [
    { t: [0, .25], zh: '起手：劍士把劍向右後方拉開（ease-out 停在蓄力位）', en: 'wind-up: the swordsman draws the blade back to the right (ease-out into the cocked pose)' },
    { t: [.25, .53], zh: '第一刀：ease-in-back，先再往後拉一點，然後在最後約 0.1 秒內加速橫斬約 220 度到命中位（0.53 秒命中）；劍掃過的扇面像透明玻璃，後方地磚與石柱被拉彎', en: 'swing 1 (ease-in-back): a small extra draw-back, then the blade accelerates through a ~220 degree horizontal slash, most of it in the last ~0.1 s, connecting at 0.53 s; the swept area acts as clear glass that bends the tiles and pillars behind it' },
    { t: [.53, .85], zh: '命中後：刀身急停，扭曲在最初幾幀最強（約 1.6 倍）再迅速回落，白刃一閃；之後以 ease-out 慢慢帶完最後約兩成弧度', en: 'after contact: the blade stops hard, the distortion peaks on the first frames (about 1.6x) and settles fast, the edge flashes; it then eases out through the last ~20 % of the arc' },
    { t: [.85, 1.62], zh: '第二刀：由右下拉到蓄力位，同樣先微拉再急撩向左上（1.33 秒命中），扭曲跟著刀走', en: 'swing 2: back to a low-right cock, the same small draw-back and snap into a rising backhand diagonal (contact 1.33 s); the distortion follows the blade' },
    { t: [1.62, 2.5], zh: '第三刀：高舉過頭蓄力，急劈而下（2.13 秒命中，最重的一下），石柱在刀痕內被錯開', en: 'swing 3: raised overhead, then a sudden vertical chop (contact 2.13 s, the heaviest hit); the pillar is visibly offset inside the cut' },
    { t: [2.5, 3.2], zh: '停手：拖影在 0.26 秒內消失，景物回正，劍士平順地回到起手姿勢', en: 'stop: the trail drains within 0.26 s, the scenery snaps back, the swordsman eases back to guard' },
  ],
  layers: [
    { zh: '拖影：最近 0.26 秒的刀根與刀尖位置（約 28 組）連成帶狀面，只在揮斬與收勢段記錄', en: 'trail: base and tip positions from the last 0.26 s (about 28 pairs) joined into a strip, recorded only during swings and follow-throughs' },
    { zh: '折射：帶內像素取樣自沿揮劍方向偏移的背景（最多約 9 像素），再加橫向正弦紋小錯位；越舊越弱（(1−age)^1.35）', en: 'refraction: pixels inside sample the scenery shifted along the swing (up to ~9 px) plus a small sine-banded sideways offset; weaker with age as (1 - age)^1.35' },
    { zh: '不加顏色：只把背景提亮約 18%，刀尖一側再加極淡藍白光暈', en: 'no colour fill: the scenery is lifted about 18 %, with a very faint blue-white halo along the tip side' },
    { zh: '亮刃：刀尖軌跡 1 像素白線＋刀面內 4 條稀疏細線；命中時刀尖四角星由大縮小', en: 'edge: a 1 px white line along the tip path plus 4 sparse thin lines inside the face; a tip star shrinks back after each contact' },
    { zh: '場景：劍士後方兩根石柱和一個木樁，讓扭曲看得出來', en: 'scene: two stone pillars and a training dummy behind the swordsman, so the distortion has something to bend' },
  ],
  beats: [{ t: .53, kind: 'hit', power: .8 }, { t: 1.33, kind: 'hit', power: .9 }, { t: 2.13, kind: 'hit', power: 1.2 }],
  params: {
    arc: { zh: '揮斬幅度', en: 'swing arc scale', min: .6, max: 1.4, step: .05, value: 1 },
    bladeLength: { zh: '劍身長度', en: 'blade length', min: .7, max: 1.6, step: .05, value: 1.1 },
    trailLife: { zh: '拖影長度（秒）', en: 'trail length (s)', min: .1, max: .5, step: .02, value: .26 },
    refract: { zh: '扭曲強度', en: 'distortion strength', min: 0, max: 2, step: .1, value: 1 },
  },
  // three swings as flat arcs: the blade direction turns about axis n through the middle direction m (yaw, pitch)
  // by -h..+h radians (scaled by the arc knob); contact (the hit) is at 82 % of the way. tw = torso twist at start/end
  swings: [
    { n: [0, 0, -1], m: [-.15, .08], h: 2.05, tw: [1.9, -2.2] },               // horizontal slash
    { n: [-.378, -.866, -.328], m: [-.73, .74], h: 1.62, tw: [-.6, 1.9] },      // rising backhand, low right -> high left
    { n: [-.0998, .995, 0], m: [.1, .225], h: 1.275, tw: [.15, .05] },          // overhead chop
  ],
  times: [[.25, .53, .85], [1.05, 1.33, 1.62], [1.85, 2.13, 2.5]],   // cocked, contact (hit beat), end of follow-through
  dir(yaw, pitch) { return [Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch)]; },
  rot(j, th) {                                                        // swing j's blade direction at angle th
    const S = this.swings[j], n = S.n, m = this.dir(S.m[0], S.m[1]), c = Math.cos(th), s = Math.sin(th);
    const x = [n[1] * m[2] - n[2] * m[1], n[2] * m[0] - n[0] * m[2], n[0] * m[1] - n[1] * m[0]], k = (n[0] * m[0] + n[1] * m[1] + n[2] * m[2]) * (1 - c);
    return [m[0] * c + x[0] * s + n[0] * k, m[1] * c + x[1] * s + n[1] * k, m[2] * c + x[2] * s + n[2] * k];
  },
  // keyframes [time, direction, torso twist, ease of the segment ending here, recorded into the trail, swing, angle]
  keys(arc) {
    if (this._k && this._ka === arc) return this._k;
    const G = this.dir(.5, .35), K = [[0, G, .5, 's', 0]];
    let last;
    this.swings.forEach((S, j) => {
      const h = S.h * arc, tm = (S.tw[0] + S.tw[1]) / 2, tS = tm + (S.tw[0] - tm) * arc, tE = tm + (S.tw[1] - tm) * arc;
      const [tc, th, te] = this.times[j], aC = -h + 1.64 * h;
      K.push([tc, this.rot(j, -h), tS, 'o', 0, j, -h], [th, this.rot(j, aC), tS + (tE - tS) * .82, 'b', 1, j, aC], [te, this.rot(j, h), tE, 'f', 1, j, h]);
      last = K[K.length - 1];
    });
    K.push([2.65, last[1], last[2], 's', 0], [3.1, G, .5, 's', 0], [3.2, G, .5, 's', 0]);
    this._ka = arc;
    return (this._k = K);
  },
  pose(t, arc, len) {
    const K = this.keys(arc);
    let k = 0;
    while (k < K.length - 2 && t >= K[k + 1][0]) k++;
    const a = K[k], b = K[k + 1], u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0])));
    // o: ease-out into a pose, b: ease-in-back (draw back, then snap into the contact), f: ease-out follow-through
    const e = b[3] === 'o' || b[3] === 'f' ? 1 - (1 - u) ** 3 : b[3] === 'b' ? u * u * (2.4 * u - 1.4) : u * u * (3 - 2 * u);
    let d;
    if (b[3] === 'b' || b[3] === 'f') d = this.rot(b[5], a[6] + (b[6] - a[6]) * e);
    else {
      d = [a[1][0] + (b[1][0] - a[1][0]) * e, a[1][1] + (b[1][1] - a[1][1]) * e, a[1][2] + (b[1][2] - a[1][2]) * e];
      const l = Math.hypot(d[0], d[1], d[2]) || 1;
      d = [d[0] / l, d[1] / l, d[2] / l];
    }
    const yaw = a[2] + (b[2] - a[2]) * e, sh = [Math.cos(yaw * .5) * .06, Math.sin(yaw * .5) * .06 - .05, .8], L = .3 + len;
    return { yaw, d, swing: b[4] && e > 0 ? 1 : 0, base: [sh[0] + d[0] * .3, sh[1] + d[1] * .3, sh[2] + d[2] * .3], tip: [sh[0] + d[0] * L, sh[1] + d[1] * L, sh[2] + d[2] * L], sh };
  },
  draw(p, t) {
    const EG = this.palette.edge, CL = this.palette.cloth, ST = this.palette.steel;
    p.pillar(.3, -1.55, .44, 1.75, this.palette.stone);
    p.pillar(1.75, -.75, .38, 1.1, this.palette.stone);
    p.dummy(-1.1, -1.25);
    const arc = p.param('arc'), len = p.param('bladeLength'), LIFE = p.param('trailLife'), RF = p.param('refract');
    const now = this.pose(t, arc, len);
    this.hero(p, now, CL, ST);
    // contact: time since the latest hit, strongest on the first frames
    let ah = -1;
    this.times.forEach(T => { if (t >= T[1]) ah = t - T[1]; });
    const fl = ah >= 0 && ah < .15 ? Math.pow(1 - ah / .15, 2) : 0;
    // trail from the pose history: u = 0 newest .. 1 oldest
    const M = Math.max(12, Math.round(28 * LIFE / .26)), base = [], tip = [], on = [];
    for (let k = 0; k <= M; k++) {
      const q = this.pose(((t - k / M * LIFE) % this.loop + this.loop) % this.loop, arc, len);
      base.push(q.base); tip.push(q.tip); on.push(q.swing);
    }
    if (on.every(x => !x)) return;
    const age = u => Math.pow(1 - u, 1.35) * on[Math.round(u * M)];
    // refraction (v = 0 at the tip, 1 at the base): drag the scenery along the swing
    const amt = RF * (1 + .6 * fl);
    if (amt > 0) this.glass(p, tip, base, (u, v) => {
      const cov = age(u) * p.smooth(0, .08, 1 - v) * (1 - p.smooth(.96, 1, 1 - v));
      if (cov < .03) return null;
      const y = 1 - v, band = Math.sin(y * 18 + Math.sin(u * 13) * 1.25 - u * 19), fine = Math.sin(y * 40 + u * 33) * .12;
      return [-(.1 + .26 * (.5 + .5 * band + fine)) * cov * amt, (band * .06 + fine * .03) * cov * amt, (.18 + .12 * fl) * cov];
    });
    p.ribbon(base, tip, (u, v) => {
      const f = age(u);
      if (!f) return 0;
      if (v > .95 - .04 * fl) return .2 + .8 * f + .3 * fl;                           // tip edge
      let lines = 0;
      for (let i = 0; i < 4; i++) lines += p.hard(v, .12 + i * .105, .014);
      const val = Math.max(Math.exp(-Math.pow((1 - v) * 7.5, 2)) * (.3 + .25 * fl), lines * .3 * ((Math.floor(u * 18) & 1) ? 1 : 0)) * f;
      return val < .1 ? 0 : val;                                                     // hard cut: 2D has no dither
    }, EG, 1);
    if (on[0]) p.sparkle(tip[0][0], tip[0][1], tip[0][2], 2 + 4 * fl, EG, .9);
  },
  // screen-space refraction over a strip: fn(u, v) -> [along, across, lift] in world units (or null).
  // Pixels inside sample the scene shifted back along the strip, so the scenery is dragged with the swing.
  glass(p, outer, inner, fn) {
    p.post(({ pix, W, H, zb, P }) => {
      const O = [], I = [];
      for (let k = 0; k < outer.length; k++) {
        const a = P(outer[k][0], outer[k][1], outer[k][2]), b = P(inner[k][0], inner[k][1], inner[k][2]);
        if (!a || !b) return;
        O.push(a); I.push(b);
      }
      if (!this._buf || this._buf.length !== pix.length) this._buf = new Uint32Array(pix.length);
      const src = this._buf;
      src.set(pix);
      const n = O.length - 1;
      const tri = (A, B, C, ua, va, ub, vb, uc, vc, tx, ty, rx, ry) => {
        const area = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
        if (Math.abs(area) < 1e-6) return;
        const inv = 1 / area, ps = A[3];
        const x0 = Math.max(0, Math.floor(Math.min(A[0], B[0], C[0]))), x1 = Math.min(W - 1, Math.ceil(Math.max(A[0], B[0], C[0])));
        const y0 = Math.max(0, Math.floor(Math.min(A[1], B[1], C[1]))), y1 = Math.min(H - 1, Math.ceil(Math.max(A[1], B[1], C[1])));
        for (let iy = y0; iy <= y1; iy++) for (let ix = x0; ix <= x1; ix++) {
          const px = ix + .5, py = iy + .5;
          const w0 = ((B[0] - px) * (C[1] - py) - (B[1] - py) * (C[0] - px)) * inv;
          const w1 = ((C[0] - px) * (A[1] - py) - (C[1] - py) * (A[0] - px)) * inv;
          const w2 = 1 - w0 - w1;
          if (w0 < -1e-4 || w1 < -1e-4 || w2 < -1e-4) continue;
          const i = iy * W + ix, d = w0 * A[2] + w1 * B[2] + w2 * C[2];
          if (zb[i] > d + .05) continue;
          const o = fn(w0 * ua + w1 * ub + w2 * uc, w0 * va + w1 * vb + w2 * vc);
          if (!o) continue;
          const sx = Math.round(ix - (tx * o[0] + rx * o[1]) * ps), sy = Math.round(iy - (ty * o[0] + ry * o[1]) * ps);
          let c = src[(sy < 0 ? 0 : sy >= H ? H - 1 : sy) * W + (sx < 0 ? 0 : sx >= W ? W - 1 : sx)];
          const l = o[2] || 0;
          if (l > 0) {
            const r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
            c = (0xff000000 | (b + (255 - b) * l) << 16 | (g + (255 - g) * l) << 8 | (r + (255 - r) * l)) >>> 0;
          }
          pix[i] = c;
        }
      };
      for (let k = 0; k < n; k++) {
        const a = O[k], b = O[k + 1], c = I[k + 1], d = I[k];
        let tx = b[0] - a[0] + c[0] - d[0], ty = b[1] - a[1] + c[1] - d[1];
        const tl = Math.hypot(tx, ty) || 1;
        tx /= tl; ty /= tl;
        let rx = d[0] - a[0] + c[0] - b[0], ry = d[1] - a[1] + c[1] - b[1];
        const rl = Math.hypot(rx, ry) || 1;
        rx /= rl; ry /= rl;
        const u0 = k / n, u1 = (k + 1) / n;
        tri(a, b, c, u0, 0, u1, 0, u1, 1, tx, ty, rx, ry);
        tri(a, c, d, u0, 0, u1, 1, u0, 1, tx, ty, rx, ry);
      }
    });
  },
  hero(p, q, CL, ST) {
    const f = q.yaw * .5, c = Math.cos(f), s = Math.sin(f), px = -s, py = c;
    p.capsule([px * .1, py * .1, .02], [px * .05, py * .05, .42], .055, .065, CL);
    p.capsule([-px * .1 + c * .08, -py * .1 + s * .08, .02], [-px * .05, -py * .05, .42], .055, .065, CL);
    p.capsule([0, 0, .42], [0, 0, .76], .13, .11, CL);
    p.ball(0, 0, .93, .1, ST, { lit: .1 });
    const hand = q.base;
    p.capsule([q.sh[0], q.sh[1], .74], hand, .045, .04, CL, { shadow: false });
    const d = q.d, gx = -d[1] * .07, gy = d[0] * .07;
    p.capsule([hand[0] - gx, hand[1] - gy, hand[2]], [hand[0] + gx, hand[1] + gy, hand[2]], .03, .03, ST, { shadow: false });
    p.capsule([hand[0] + d[0] * .03, hand[1] + d[1] * .03, hand[2] + d[2] * .03], q.tip, .036, .022, ST, { shadow: false, lit: .35 });
  },
});
