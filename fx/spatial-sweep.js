// 裂空迴斬 / Riftblade Sweep — pixel version of 00GameDevs "spatial-sweep" (MIT)
PXFX.define({
  id: 'spatial-sweep',
  loop: 2,
  beats: [{ t: .57, kind: 'hit', power: 1 }],
  view: { r: 2.4, h: 1.7 },
  stage: { ground: 'sand', tiles: true },
  palette: {
    edge: ['#6a7fc4', '#97b0e2', '#c4dcf6', '#e9f5ff', '#ffffff'],
    cloth: ['#3a2a48', '#523c62', '#6c5480', '#8a70a0', '#a890bc'],
    steel: ['#4c5068', '#6e7490', '#9aa2ba', '#c8d0e0', '#eef2f8'],
    stone: ['#5a5464', '#736c7c', '#8e8794', '#a8a1aa', '#c2bcc0'],
  },
  timeline: [
    { t: [0, .38], zh: '起手（ease-in-back）：劍士持劍指向身後，再往後拉約一成弧長蓄力，拉到最後時劍尖白光一閃', en: 'wind-up (ease-in-back): the swordsman points the blade backwards, then draws it back about 10 % of the arc; a white glint on the tip at full draw' },
    { t: [.38, .57], zh: '橫掃：透明刀面加速掃出，最後約 0.1 秒內掃過大半弧長（2–3 幀），在 0.57 秒以約 9 成弧長「命中」；刀面後方的地磚、石柱被沿揮動方向拉長、錯開', en: 'sweep: the clear blade face accelerates; most of the arc appears in the last ~0.1 s (2–3 frames) and it connects at 0.57 s at about 90 % of the arc; tiles and pillars behind it are dragged along the swing' },
    { t: [.57, .71], zh: '命中：停格，扭曲在最初幾幀最強（約 1.6 倍），白刃加亮，之後迅速回落', en: 'contact: hit-stop; the distortion is strongest on the first frames (about 1.6x) and the white edge flares, then both settle quickly' },
    { t: [.57, 1.02], zh: '餘勢：刀頭以 ease-out 慢慢推完最後一成弧長，刀面逐漸變細', en: 'follow-through: the head eases out over the last 10 % of the arc while the face thins' },
    { t: [.69, 1.29], zh: '收尾：尾端以 ease-in 加速追上前端，扭曲隨刀光一起急縮消失，背景回正', en: 'close: the tail chases the head with an ease-in, the distortion shrinks away with the slash and the scenery snaps back' },
    { t: [1.15, 1.75], zh: '劍士順勢轉回起手方向', en: 'the swordsman turns back to the start pose' },
  ],
  layers: [
    { zh: '折射刀面：腰高水平弧帶，預設外半徑 1.5、寬 0.8、弧長 300 度，尾端收尖、前端寬；面內像素取樣自沿切線向後偏移的位置（最多約 8 像素），再加正弦橫紋的徑向小錯位', en: 'refraction face: horizontal arc band at waist height, default outer radius 1.5, width 0.8, 300 degree arc, pointed tail and broad head; each pixel inside samples the scene shifted back along the tangent (up to ~8 px) plus a small radial offset in sine bands' },
    { zh: '不加顏色：刀面只把背景提亮約 15%，看起來像玻璃', en: 'no colour fill: the face only lifts the scenery about 15 % so it reads as glass' },
    { zh: '亮刃：外緣 1 像素白線，亮度由尾到頭漸強，外側一層極淡的光暈；命中時加亮', en: 'edge: a 1 px white line on the outer rim, brighter towards the head, with a very faint halo outside; it flares on contact' },
    { zh: '流線：刀面內 4 條稀疏的細白線，只在弧中段出現', en: 'streaks: 4 sparse thin white lines inside the face, only in the middle of the arc' },
    { zh: '場景：中央劍士＋後方兩根石柱、一個木樁，讓扭曲看得出來', en: 'scene: swordsman in the middle plus two stone pillars and a training dummy behind, so the distortion has something to bend' },
  ],
  params: {
    arc: { zh: '揮斬角度（度）', en: 'arc angle (deg)', min: 90, max: 340, step: 5, value: 300 },
    reach: { zh: '刀光半徑', en: 'slash radius', min: 1, max: 2, step: .05, value: 1.5 },
    width: { zh: '刀面寬度', en: 'blade face width', min: .3, max: 1, step: .05, value: .8 },
    refract: { zh: '扭曲強度', en: 'distortion strength', min: 0, max: 2, step: .1, value: 1 },
  },
  draw(p, t) {
    const EG = this.palette.edge, CL = this.palette.cloth, ST = this.palette.steel;
    p.pillar(-1.25, -1.45, .4, 1.5, this.palette.stone);
    p.pillar(1.55, -1.05, .4, 1.15, this.palette.stone);
    p.dummy(-1.7, .55);
    const W0 = .05, HIT = .57, CONTACT = .9, Z = .62, A0 = -2.35;
    const R = p.param('reach'), SPAN = p.param('arc') * Math.PI / 180, WID = Math.min(p.param('width'), R - .2), RF = p.param('refract');
    const a = t - HIT;
    // head progress along the arc: ease-in-back = draw back, then snap through most of the arc into the contact
    let head;
    if (t < HIT) head = CONTACT * p.easeInBack(p.ph(t, W0, HIT), 1.7);
    else head = CONTACT + (1 - CONTACT) * p.easeOutCubic(p.ph(a, 0, .45));
    const tail = a > 0 ? head * p.easeInCubic(p.ph(a, .12, .72)) : 0;
    let face = A0 + SPAN * head;
    if (a > .58) {
      const k = p.ease(p.ph(a, .58, 1.18));
      face = A0 + SPAN + (SPAN >= Math.PI ? (p.TAU - SPAN) * k : -SPAN * k);
    }
    this.hero(p, face, R, CL, ST);

    const g = p.env(t, .18, .26, .3, .38);
    if (g > 0) p.sparkle(Math.cos(face) * (R - .12), Math.sin(face) * (R - .12), Z, 3 * g, EG, g);
    if (head <= .01 || a > .74) return;
    const fade = 1 - p.easeInCubic(p.ph(a, .44, .74));
    const fl = a >= 0 ? Math.pow(1 - p.ph(a, 0, .15), 2) : 0;          // contact: strongest on the first frames
    const thin = (1 - .3 * p.ph(a, .08, .6)) * (1 + .15 * fl);
    const N = 36, outer = [], inner = [], halo = [], short = Math.min(1, (head - tail) * SPAN * .48);
    for (let k = 0; k <= N; k++) {
      const x = k / N, along = p.lerp(tail, head, x), an = A0 + along * SPAN, c = Math.cos(an), s = Math.sin(an);
      const tap = Math.max(Math.pow(Math.max(0, Math.sin(x * Math.PI)), .45), p.smooth(.72, .96, x)) * short * thin;
      outer.push([c * R, s * R, Z]);
      inner.push([c * (R - WID * tap), s * (R - WID * tap), Z]);
      halo.push([c * (R + .12 * tap), s * (R + .12 * tap), Z]);
    }
    // refraction: drag the scene along the swing, small radial pressure bands
    const amt = RF * (1 + .6 * fl), ph = t / 1.4;
    if (amt > 0) this.glass(p, outer, inner, (u, v) => {
      const ends = p.smooth(0, .035, u) * (1 - p.smooth(.985, 1, u));
      const cov = fade * ends * p.smooth(0, .13, 1 - v) * (1 - p.smooth(.9, 1, 1 - v));
      if (cov < .02) return null;
      const band = Math.sin((1 - v) * 18 + Math.sin(u * 13 - ph * 8) * 1.25 - ph * 19);
      const shear = (.2 + .8 * p.smooth(0, .95, u)) * (.5 + .5 * band);
      return [(.06 + shear * .26) * cov * amt, band * .045 * cov * amt, (.16 + .1 * fl) * cov];
    });
    // thin white edge brightening towards the head, faint halo, sparse streaks
    p.ribbon(outer, inner, (u, v) => {
      const ends = p.smooth(0, .035, u) * (1 - p.smooth(.985, 1, u)), inten = p.lerp(.15, 1, p.smooth(.05, .92, u));
      if (v < .06 + .05 * fl) return ends * (inten + .6 * fl);
      const stream = p.smooth(.2, .4, u) * (1 - p.smooth(.78, 1, u));
      const lines = p.hard(v, .25, .022) + p.hard(v, .42, .02) + p.hard(v, .6, .02) + p.hard(v, .78, .02);
      return lines * stream * .42 * ((Math.floor(u * 22) & 1) ? 1 : .4);
    }, EG, fade);
    p.ribbon(halo, outer, (u, v) => (.22 + .3 * fl) * v * p.smooth(.05, .92, u), EG, fade);
    const ha = A0 + head * SPAN;
    if (a < .25) p.sparkle(Math.cos(ha) * R, Math.sin(ha) * R, Z, 2 + 3 * fl, EG, fade);
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
  hero(p, ang, reach, CL, ST) {
    const c = Math.cos(ang), s = Math.sin(ang), px = -s, py = c, L = reach - .12;
    p.capsule([px * .1, py * .1, .02], [px * .05, py * .05, .42], .055, .065, CL);
    p.capsule([-px * .1, -py * .1, .02], [-px * .05, -py * .05, .42], .055, .065, CL);
    p.capsule([0, 0, .42], [0, 0, .76], .13, .11, CL);
    p.ball(0, 0, .93, .1, ST, { lit: .1 });
    p.capsule([c * .06 + px * .1, s * .06 + py * .1, .74], [c * .3, s * .3, .62], .045, .04, CL, { shadow: false });
    p.capsule([c * .3 - px * .07, s * .3 - py * .07, .62], [c * .3 + px * .07, s * .3 + py * .07, .62], .03, .03, ST, { shadow: false });
    p.capsule([c * .32, s * .32, .62], [c * L, s * L, .62], .036, .022, ST, { shadow: false, lit: .35 });
  },
});
