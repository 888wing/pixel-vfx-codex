// 稜晶瞬擋 / Prismatic Crystal Block — pixel version of 00GameDevs "prism-parry" (MIT)
// The original is a single 0.55 s block; this loop shows two parries with idle time between.
PXFX.define({
  id: 'prism-parry',
  loop: 2.5,
  beats: [{ t: .5, kind: 'hit', power: 1 }, { t: 1.6, kind: 'hit', power: 1.1 }],
  view: { r: 2.4, h: 2.2 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    plate: ['#76688e', '#a898b4', '#d9ccc0', '#ffe3a0', '#fffaf0'],
    shine: ['#d09a4c', '#e8bd6a', '#ffe3a0', '#fff2cc', '#fffbf0', '#ffffff'],
    hostile: ['#8a2a52', '#b83a5e', '#e8606a', '#ffa898', '#fff0e8'],
  },
  timeline: [
    { t: [0, .43], zh: '一發暗紅魔彈由左方飛向木人，越飛越快，拖尾隨速度拉長', en: 'a crimson bolt flies at the dummy from the left, accelerating, its tail stretching with speed' },
    { t: [.43, .5], zh: '4 片六角水晶小盾在木人前瞬間彈出（0.07 秒由三成放大到 115% 再回彈）', en: '4 small hexagonal crystal plates snap out in front of the dummy (30% → 115% in 0.07 s, then settle)' },
    { t: [.5, .62], zh: '格擋：首兩幀最大——白色亮線橫掃盾面、8 角白色星芒爆開後急縮；盾面被撞後退再彈回，魔彈高速反彈飛走再減速淡出', en: 'parry: biggest on the first two frames: a white line slashes across the plates and an 8-point starburst pops then collapses; the plates recoil and spring back, the bolt ricochets away fast, slows and fades' },
    { t: [.5, .95], zh: '18 片碎光高速飛散、受阻力減速並下墜；水晶盾停留片刻後急速縮小消失', en: '18 glinting shards burst out, drag slows them, gravity pulls them down; the plates hold briefly, then shrink away fast' },
    { t: [1.2, 2.05], zh: '第二發由左上方飛來，在較高位置重複一次格擋（更重）', en: 'a second bolt comes from the upper left and the parry repeats higher up, harder' },
    { t: [2.05, 2.5], zh: '空閒', en: 'idle' },
  ],
  layers: [
    { zh: '水晶盾：4 片六角厚板（半徑 0.2、厚 0.07），奶油白實心平面著色（暗面偏淡紫），排成微彎的小盾面，正面有 1 像素亮邊', en: 'plates: 4 thick hexagons (radius 0.2, 0.07 thick), cream-white flat-shaded solids (lilac-tinted shadow side) arranged as a slightly curved buckler, 1 px bright front outline' },
    { zh: '亮線：長 1.3 的白線，0.1 秒內由粗變細消失', en: 'flash line: a 1.3 long white line that thins out within 0.1 s' },
    { zh: '星芒：鏡頭向的 8 角尖星卡片，0.12 秒內收縮', en: 'starburst: a camera-facing 8-point spiky star card, collapsing within 0.12 s' },
    { zh: '碎光：12 片短亮線＋6 個光點，旋轉飛散，阻力＋重力', en: 'shards: 12 short bright slivers plus 6 dots, spinning out with drag and gravity' },
    { zh: '魔彈：暗紅光球＋5 節拖尾，命中後向上反彈並淡出', en: 'bolt: crimson orb with a 5-step tail, ricochets upward and fades after the hit' },
  ],
  params: {
    plates: { zh: '水晶盾片數', en: 'plate count', min: 2, max: 7, step: 1, value: 4 },
    plateSize: { zh: '水晶盾大小', en: 'plate size', min: .6, max: 1.5, step: .05, value: 1 },
    shards: { zh: '碎光數量', en: 'shard count', min: 0, max: 30, step: 1, value: 18 },
    starSize: { zh: '星芒大小', en: 'starburst size', min: .5, max: 2, step: .1, value: 1 },
  },
  draw(p, t) {
    const PL = this.palette.plate, SH = this.palette.shine, H = this.palette.hostile;
    const DXY = [.55, -.35], DC = [.55, -.35, .95];
    const nP = Math.round(p.param('plates')), ps = p.param('plateSize'), ss = p.param('starSize');
    p.dummy(DXY[0], DXY[1]);

    const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const plate = (n, ctr, size, rot, lit, alpha) => {
      const a = norm(cross([0, 0, 1], n)), b = cross(n, a), th = .035;
      const ring = off => Array.from({ length: 6 }, (_, k) => {
        const ang = rot + k / 6 * p.TAU, ca = Math.cos(ang) * size, sa = Math.sin(ang) * size;
        return [0, 1, 2].map(c => ctr[c] + a[c] * ca + b[c] * sa + n[c] * off);
      });
      const F = ring(th), Bk = ring(-th), cf = [0, 1, 2].map(c => ctr[c] + n[c] * th), cb = [0, 1, 2].map(c => ctr[c] - n[c] * th);
      const o = { lit, alpha };
      for (let k = 0; k < 6; k++) {
        const k2 = (k + 1) % 6;
        p.tri(cf, F[k], F[k2], PL, o);
        p.tri(cb, Bk[k2], Bk[k], PL, o);
        p.quad(F[k], Bk[k], Bk[k2], F[k2], PL, o);
      }
      if (alpha > .4) for (let k = 0; k < 6; k++) p.line(F[k], F[(k + 1) % 6], .03, SH, .5 + lit);
    };

    const parries = [
      { T: .5, dir: norm([-.25, 1, .05]), from: [-2.4, .9, 1.1], pw: 1 },
      { T: 1.6, dir: norm([.05, 1, .4]), from: [-1.9, 1.2, 2.3], pw: 1.15 },
    ];
    const offs = [[-.24, .22], [.2, .3], [-.3, -.2], [.16, -.1], [.44, .08], [-.04, .5], [-.06, -.44]];
    const hitIdx = Math.min(3, nP - 1);
    for (const P of parries) {
      const a = t - P.T;
      if (a < -.5 || a > .75) continue;
      const n = P.dir, ax = norm(cross([0, 0, 1], n)), bx = cross(n, ax);
      const ctr = [0, 1, 2].map(c => DC[c] + n[c] * .95);
      const ho = offs[hitIdx];
      const hitPt = [0, 1, 2].map(c => ctr[c] + (ax[c] * ho[0] + bx[c] * ho[1]) * ps + n[c] * .05);
      // incoming bolt (accelerating), then a fast ricochet that drags to a stop
      if (a < 0) {
        const at = x => { const u = Math.max(0, x), uu = .35 * u + .65 * u * u; return [0, 1, 2].map(c => p.lerp(P.from[c], hitPt[c], uu)); };
        const x = 1 + a / .43;
        if (x > 0) {
          const q = at(x), pts = [q];
          for (let s = 1; s <= 5; s++) pts.push(at(x - s * .045));
          p.trail(pts, .13, .02, H, .8, .1);
          p.orb(q[0], q[1], q[2], .055, H, 1);
          p.glow(q[0], q[1], q[2], .18, H, .6);
        }
      } else if (a < .4) {
        const d = p.drag(6, 7, a), dp = p.drag(6, 7, Math.max(0, a - .05)), dir = [-.35, .55, .75], u = a / .4;
        const q = [0, 1, 2].map(c => hitPt[c] + dir[c] * d), q0 = [0, 1, 2].map(c => hitPt[c] + dir[c] * dp);
        q[2] -= a * a * 1.5;
        p.orb(q[0], q[1], q[2], .05, H, 1 - u);
        p.line(q, q0, .08, H, .7 * (1 - u), { i1: 0 });
      }
      // plates: hard snap with overshoot just before the hit, recoil on contact, hold, then shrink away fast
      const popX = p.ph(a, -.07, 0), pop = Math.max(0, p.easeOutBack(popX, 3)), gone = p.easeInCubic(p.ph(a, .18, .42));
      if (popX > 0 && gone < 1) {
        const recoil = a > 0 ? .13 * P.pw * Math.exp(-a * 10) * Math.cos(a * 26) : 0;
        for (let i = 0; i < nP; i++) {
          const [ox, oy] = offs[i], s = .3 + .7 * pop, drift = p.ph(a, .1, .42) * .12;
          const c = [0, 1, 2].map(k => ctr[k] + (ax[k] * ox + bx[k] * oy) * ps * (s + drift) - n[k] * ((ox * ox + oy * oy) * .5 + recoil * (i === hitIdx ? 1.3 : .8)));
          const flash = a >= 0 ? (a < .05 ? 1 : Math.exp(-(a - .05) * 12)) : 0;
          const lit = (i === hitIdx ? .6 : .25) * flash + .12, flat = p.mode === '2d';
          plate(n, c, .2 * ps * s * (1 - gone), .2 + i * .4, lit, flat ? 1 : 1 - gone * .7);
        }
        p.light(ctr[0], ctr[1], .3, 1.1, SH, .5 * (1 - gone) + (a >= 0 ? .5 * Math.exp(-a * 10) : 0));
      }
      if (a >= 0) {
        // flash line across the buckler: thickest on the first frames
        const fl = Math.pow(1 - p.ph(a, 0, .1), 2);
        if (fl > 0) {
          const L = .65 * ps * (1 + (1 - fl) * .5);
          const A = [0, 1, 2].map(c => hitPt[c] + (ax[c] * .8 - bx[c] * .6) * L + n[c] * .06);
          const B = [0, 1, 2].map(c => hitPt[c] - (ax[c] * .8 - bx[c] * .6) * L + n[c] * .06);
          p.line(A, B, .1 * fl + .02, SH, 1.4 * fl);
        }
        // starburst: biggest on the first frame, collapses within 0.12 s
        const sb = Math.pow(1 - p.ph(a, 0, .12), 2);
        if (sb > 0) {
          const sz = (.4 + sb * .7) * ss * P.pw;
          p.card(hitPt[0], hitPt[1], hitPt[2], sz, sz, (u, v) => {
            const r = Math.hypot(u, v), ang = Math.atan2(v, u);
            const spike = .22 + .78 * Math.pow(Math.abs(Math.cos(ang * 4)), 12);
            return r < spike ? (r < .2 ? 1.1 : .85) : 0;
          }, SH, sb * 1.2);
          p.glow(hitPt[0], hitPt[1], hitPt[2], .3 * Math.sqrt(ss), SH, .9 * sb);
        }
        // shards: fast out, drag, gravity, spinning
        const nS = Math.round(p.param('shards') * p.density);
        for (let s = 0; s < nS; s++) {
          const life = .35 + p.r(s, 3) * .25, u = a / life;
          if (u >= 1) continue;
          const ang = p.r(s, 1) * p.TAU, sp = (2.2 + p.r(s, 2) * 2.8) * P.pw, d = p.drag(sp, 7, a);
          const v = [0, 1, 2].map(c => (ax[c] * Math.cos(ang) + bx[c] * Math.sin(ang)) + n[c] * (.5 + p.r(s, 4) * .5));
          const q = [hitPt[0] + v[0] * d, hitPt[1] + v[1] * d, hitPt[2] + v[2] * d - 2.5 * a * a];
          if (s % 3 !== 2) {
            const sp2 = p.r(s, 5) * p.TAU + a * 18, dd = [Math.cos(sp2) * .06, Math.sin(sp2) * .04, Math.sin(sp2 + 1) * .06];
            p.line([q[0] - dd[0], q[1] - dd[1], q[2] - dd[2]], [q[0] + dd[0], q[1] + dd[1], q[2] + dd[2]], .03, SH, 1.1 * (1 - u));
          } else p.dot(q[0], q[1], q[2], SH, 1 - u);
        }
      }
    }
  },
});
