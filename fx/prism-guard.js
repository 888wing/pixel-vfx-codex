// 稜晶護壁 / Prismatic Crystal Bulwark — pixel version of 00GameDevs "prism-guard" (MIT)
PXFX.define({
  id: 'prism-guard',
  loop: 4,
  beats: [{ t: .5, kind: 'cast', power: .6 }, { t: 1.25, kind: 'hit', power: .9 }, { t: 2.15, kind: 'hit', power: 1 }],
  view: { r: 2.6, h: 2.3 },
  stage: { ground: 'stone', tiles: true },
  palette: {
    crystal: ['#2b6f92', '#3f9cc4', '#5cc7ea', '#8ae6ff', '#d2f8ff'],
    prism: ['#3f86d0', '#4fb4ec', '#73e3ff', '#aef0ff', '#e6fcff', '#ffffff'],
    hostile: ['#a8283a', '#d84a2e', '#ff8a3c', '#ffc46a', '#fff0c8'],
  },
  timeline: [
    { t: [0, .5], zh: '7 片六角水晶板由外旋轉飛入，越飛越快，逐片（共 0.3 秒內）撞入定位，著陸時微彈（脹大約 20% 再回彈）並閃亮', en: '7 hexagonal crystal plates spin in from outside, accelerating, and slam into place one after another within 0.3 s; each lands with a springy ~20% swell and a glint' },
    { t: [.5, .8], zh: '鎖定：最後一片到位時，一道亮光急速掃過整面護牆', en: 'lock: as the last plate lands, a highlight races across the whole wall' },
    { t: [.8, 2.8], zh: '持續：護牆輕微浮動；1.25 秒及 2.15 秒各有一發紅色魔彈加速撞上水晶板：板面首兩幀閃白、被撞後退再彈回，漣漪環急速擴散變細，碎光高速彈出再減速下墜', en: 'hold: the wall bobs gently; at 1.25 s and 2.15 s a red bolt accelerates into a plate: the plate goes white for two frames, recoils and springs back, a ripple ring shoots out and thins, glints fly out fast, slow and drop' },
    { t: [2.8, 3.5], zh: '收回：水晶板一片片先微脹再急速翻轉縮小，化成星芒向外彈散', en: 'fold: the plates go one at a time: a slight swell, then a fast flipping collapse into star glints that pop outward' },
    { t: [3.5, 4], zh: '只剩木人', en: 'only the dummy remains' },
  ],
  layers: [
    { zh: '護牆：中心 1 片＋外圈 6 片六角厚板（半徑 0.27、厚 0.08），排在半徑 1.15 的球面上，擋在木人前方', en: 'wall: 1 centre plate plus a ring of 6 thick hexagonal plates (radius 0.27, 0.08 thick) on a sphere of radius 1.15 in front of the dummy' },
    { zh: '水晶板：淺青實心平面著色（飛入及收回時抖色半透明），正面六邊有 1 像素發光邊線', en: 'plates: pale cyan flat-shaded solids (dithered see-through while flying in and folding away) with a 1 px glowing outline on the front hexagon' },
    { zh: '魔彈：紅橙光球帶 6 節拖尾（加速時拖尾變長），命中時板面變白、板面方向的漣漪環由 0.1 以 ease-out-expo 擴到 0.6', en: 'bolts: red-orange orb with a 6-step tail that stretches as it speeds up; on hit the plate flashes white and a ripple ring in the plate plane grows 0.1 → 0.6 with ease-out-expo' },
    { zh: '碎光：命中時 6 個青色 4 角星（阻力＋重力），每片收回時 4 個', en: 'glints: 6 cyan four-point stars per hit (drag + gravity), 4 per plate folding away' },
    { zh: '地面：護牆下方淡青光照，著陸及命中時加亮', en: 'ground: faint cyan light under the wall, brighter on landings and hits' },
  ],
  params: {
    plates: { zh: '外圈水晶板數', en: 'ring plates', min: 3, max: 10, step: 1, value: 6 },
    wallRadius: { zh: '護牆半徑', en: 'wall radius', min: .8, max: 1.6, step: .05, value: 1.15 },
    plateSize: { zh: '水晶板大小', en: 'plate size', min: .6, max: 1.5, step: .05, value: 1 },
    shards: { zh: '碎光數量', en: 'glint count', min: 0, max: 16, step: 1, value: 6 },
  },
  draw(p, t) {
    const CR = this.palette.crystal, PR = this.palette.prism, H = this.palette.hostile;
    const nRing = Math.round(p.param('plates')), R = p.param('wallRadius'), ps = p.param('plateSize');
    const NP = nRing + 1, LOCK = .5, STOP = 2.8, th = .5 * Math.sqrt(Math.max(1, nRing / 6)) * Math.max(1, ps * .9);
    const DX = .55, DY = -.45, C = [DX, DY, Math.max(.95, Math.sin(th) * R + .3 * ps)];
    p.dummy(DX, DY);

    const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const D = norm([.1, 1, 0]), U1 = norm([-D[1], D[0], 0]), U2 = [0, 0, 1];
    const dirs = [D];
    for (let i = 0; i < nRing; i++) {
      const f = i / nRing * p.TAU + Math.PI / 6;
      dirs.push(norm([0, 1, 2].map(c => D[c] * Math.cos(th) + (U1[c] * Math.cos(f) + U2[c] * Math.sin(f)) * Math.sin(th))));
    }
    const hits = [{ T: 1.25, plate: 0 }, { T: 2.15, plate: 1 + Math.floor(nRing / 2) }];
    let wallOn = 0, land = 0;

    const plate = (n, ctr, size, rot, lit, alpha) => {
      const a = norm(cross([0, 0, 1], n)), b = cross(n, a), tk = .04 * Math.sqrt(ps);
      const ring = (off) => Array.from({ length: 6 }, (_, k) => {
        const ang = rot + k / 6 * p.TAU, ca = Math.cos(ang) * size, sa = Math.sin(ang) * size;
        return [0, 1, 2].map(c => ctr[c] + a[c] * ca + b[c] * sa + n[c] * off);
      });
      const F = ring(tk), Bk = ring(-tk), cf = [0, 1, 2].map(c => ctr[c] + n[c] * tk), cb = [0, 1, 2].map(c => ctr[c] - n[c] * tk);
      const o = { lit, alpha };
      for (let k = 0; k < 6; k++) {
        const k2 = (k + 1) % 6;
        p.tri(cf, F[k], F[k2], CR, o);
        p.tri(cb, Bk[k2], Bk[k], CR, o);
        p.quad(F[k], Bk[k], Bk[k2], F[k2], CR, o);
      }
      if (alpha > .4) for (let k = 0; k < 6; k++) p.line(F[k], F[(k + 1) % 6], .03, PR, .55 + lit);
    };
    const lockSweep = t >= LOCK ? p.ph(t, LOCK, LOCK + .3) : -1;       // highlight racing across the wall on the lock

    for (let i = 0; i < NP; i++) {
      const n = dirs[i], tl = .2 + i * .3 / Math.max(1, NP - 1);        // landing time: all plates in by 0.5 s
      const fx = p.ph(t, tl - .25, tl), al = t - tl;
      const tf = STOP + i * .6 / Math.max(1, NP - 1), fo = p.ph(t, tf, tf + .22);
      if (fx <= 0) continue;
      if (fo >= 1) {
        const g = p.ph(t, tf + .22, tf + .6);                           // star glints popping outward where the plate vanished
        if (g < 1) {
          const P = [0, 1, 2].map(c => C[c] + n[c] * R), nG = Math.round(4 * p.density);
          for (let k = 0; k < nG; k++) {
            const ang = k / Math.max(1, nG) * p.TAU + i, d = .05 + p.drag(1.6, 6, g * .38);
            p.sparkle(P[0] + Math.cos(ang) * d, P[1], P[2] + Math.sin(ang) * d, 2, PR, 1 - g);
          }
        }
        continue;
      }
      // fly in accelerating, then a springy settle; recoil when hit
      let push = al < 0 ? (1 - p.easeInCubic(fx)) * 1.3 : -.1 * Math.exp(-al * 9) * Math.sin(al * 26);
      let pop = al < 0 ? .55 + .45 * fx : 1 + .22 * Math.exp(-al * 8) * Math.sin(al * 24);
      let lit = .08 + (al >= 0 ? .45 * Math.exp(-al * 14) : 0);
      if (lockSweep >= 0 && lockSweep < 1) lit += .4 * p.band(p.easeOutCubic(lockSweep) * 1.6 - .3, (Math.atan2(n[2], n[0] * .7 + n[1] * .7) / Math.PI + 1) / 2, .22);
      else lit += .15 * p.band(((t * .5) % 1) * 2.4 - .7, n[0] * .5 + n[2] * .5, .25);
      for (const h of hits) if (h.plate === i && t >= h.T) {
        const ha = t - h.T;
        lit += ha < .07 ? 1 : .5 * Math.exp(-(ha - .07) * 10);
        push -= .16 * Math.exp(-ha * 8) * Math.cos(ha * 22);
      }
      land = Math.max(land, al >= 0 ? Math.exp(-al * 10) : 0);
      wallOn = Math.max(wallOn, Math.min(1, fx * 1.5) * (1 - fo));
      const fold = p.easeInBack(fo, 2.2), bob = Math.sin(t * 2 + i) * .02;
      const ctr = [0, 1, 2].map(c => C[c] + n[c] * (R + push));
      ctr[2] += bob + (1 - p.easeInCubic(fx)) * .4;
      plate(n, ctr, .27 * ps * pop * (1 - fold), (1 - fx) * 3 + fo * 2.5, lit, Math.min(1, fx * 1.6) * (1 - fo * .6));
    }
    if (wallOn > 0) p.light(C[0] + D[0] * R * .8, C[1] + D[1] * R * .8, .4, 1.6, PR, (.55 + .3 * land) * wallOn);

    // hostile bolts (accelerating in) and their impacts
    for (const h of hits) {
      const n = dirs[h.plate], P = [0, 1, 2].map(c => C[c] + n[c] * (R + .06));
      const fl = t - h.T;
      if (fl < -.4 || fl > .8) continue;
      if (fl < 0) {
        const from = [P[0] - 2.3, P[1] + 1.3, P[2] + .3];
        const at = x => { const u = Math.max(0, x), uu = .35 * u + .65 * u * u; return [0, 1, 2].map(c => p.lerp(from[c], P[c], uu)); };
        const x = 1 + fl / .4, q = at(x), pts = [q];
        for (let s = 1; s <= 6; s++) pts.push(at(x - s * .04));
        p.trail(pts, .14, .02, H, .8, .1);
        p.glow(q[0], q[1], q[2], .2, H, .7);
        p.orb(q[0], q[1], q[2], .06, H, 1);
        continue;
      }
      const u = p.ph(fl, 0, .45), strike = Math.pow(1 - p.ph(fl, 0, .12), 2);
      const a = norm(cross([0, 0, 1], n)), b = cross(n, a);
      p.glow(P[0], P[1], P[2], .2 + .35 * strike, PR, 1.4 * strike + .5 * (1 - u));
      if (u < 1) p.ring(P[0], P[1], P[2], (.1 + p.easeOutExpo(u) * .5) * Math.sqrt(ps), .07 * Math.pow(1 - u, 1.5) + .02, PR, 1.1 * (1 - u), { axis: n });
      const nS = Math.round(p.param('shards') * p.density);
      for (let k = 0; k < nS; k++) {
        const life = .4 + p.r(k, 7) * .35;
        if (fl > life) continue;
        const ang = k / Math.max(1, nS) * p.TAU + h.T + p.r(k, 8) * .5, d = p.drag(2.4 + p.r(k, 9) * 1.6, 6, fl);
        p.sparkle(P[0] + (a[0] * Math.cos(ang) + b[0] * Math.sin(ang)) * d + n[0] * d * .5,
          P[1] + (a[1] * Math.cos(ang) + b[1] * Math.sin(ang)) * d + n[1] * d * .5,
          P[2] + Math.sin(ang) * d - 2 * fl * fl, 1, PR, 1 - fl / life);
      }
    }
  },
});
