// 冰翼龍嘯 / Frost Wing Surge — Ultimates pack (original design): ice wings and a shard tail unfold behind the caster, ice spikes erupt in a line to the target, crystals creep over it and shatter
PXFX.define({
  id: 'frost-wing-surge',
  loop: 4.2,
  beats: [{ t: 1.2, kind: 'cast', power: .9 }, { t: 1.62, kind: 'hit', power: 1 }, { t: 2.3, kind: 'burst', power: 1.2 }],
  view: { r: 3.3, h: 2.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'grade', 'growth', 'shockwave', 'debris', 'impact', 'aftermath'],
  palette: {
    ice: ['#35659c', '#5d9fd6', '#8fd8ff', '#c8f0ff', '#f4fdff'],
    glow: ['#3f8fd0', '#6cc0f0', '#a8e4ff', '#e8faff'],
    mist: ['#a9bccd', '#c4d3e0', '#dbe6ef', '#eef4f9'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由站姿轉為雙臂張開', en: 'pose: the caster goes from idle to arms spread wide' },
    { k: 'charge', t: [.35, 1.2], zh: '集氣：背後兩扇冰翼（每扇 7 根長冰羽＋5 根短冰羽，翼展約 1.25）由收起狀態錯開展開，翼間有淡藍半透明光膜；腰後長出 7 節冰晶尾巴；腳邊白色寒霧上升；環境轉冷色', en: 'charge: two ice wings (7 long + 5 short shard feathers each, ~1.25 span) unfold from folded with a stagger, a faint translucent blue membrane between the feathers; a 7-segment shard tail grows from the hips; white cold mist rises round the feet; the scene cools' },
    { k: 'shape', t: [1.2, 1.3], zh: '成形：0.08 秒內雙掌前推、雙翼向前一拍', en: 'shape: palms thrust forward in 0.08 s and the wings beat forward once' },
    { k: 'motion', t: [1.3, 1.62], zh: '推進：9 根冰柱由施法者前方沿地面一根接一根冒出到木樁腳下（回彈緩動，最新一根最亮），前方一道冷光波，後方地面結霜', en: 'motion: 9 ice spikes erupt one after another along the ground from the caster to the dummy’s feet (overshoot ease, the newest brightest), a cold light wave leads and frost spreads behind it' },
    { k: 'impact', t: [1.62, 2.3], zh: '命中：接觸點藍白閃光與地面寒波環；冰殼與約 44 粒冰晶由木樁腳下接觸點向上爬滿表面（生長前沿發白光），2.3 秒時全部碎裂', en: 'impact: a blue-white flash at the contact point and a cold ground ring; an ice coat and ~44 crystals creep up over the dummy from the contact point (the growth front glows white) and at 2.3 s all of them shatter' },
    { k: 'after', t: [2.3, 4.2], zh: '餘波：碎冰帶阻力與重力四散、冰塵閃爍淡出，冰柱下沉，冰翼收起並抖色淡出，地面霜痕慢慢退去', en: 'aftermath: ice shards fly out with drag and gravity, ice dust twinkles out, the spikes sink, the wings fold away and dither out, the frost stain slowly fades' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→雙臂張開→雙掌前推→收勢', en: 'caster: faceless mannequin, poses idle → arms spread → palms thrust → recover' },
    { zh: '冰翼：每扇由背後一點放射出 7 根四稜晶體長羽（外長內短）＋5 根短羽，實心冰藍漸層；羽與羽之間用低強度（約 0.3）淡藍發光三角面作半透明翼膜，前緣一條亮線', en: 'ice wings: each a fan of 7 long four-sided crystal feathers (longest at the leading edge) + 5 short ones from a point on the back, solid ice-blue ramp; low-intensity (~0.3) pale blue emissive triangles between feathers as a translucent membrane, a bright line on the leading edge' },
    { zh: '冰尾：7 節由大到小的晶體沿地面向後排列，左右輕擺', en: 'ice tail: 7 crystals shrinking along the ground behind the caster, swaying side to side' },
    { zh: '寒霧：8 團白色粗糙抖色球在腳邊上升淡出', en: 'cold mist: 8 rough white dithered balls rising and fading round the feet' },
    { zh: '冰柱：沿直線 9 根晶體尖刺依次冒出（回彈緩動），新冒出的頂端有藍白光暈；前方地面一道冷光帶，後方結霜貼圖', en: 'ice spikes: 9 crystal spikes along a line erupt in turn (overshoot ease), each new tip with a blue-white glow; a cold light band on the ground ahead and a frost stain behind' },
    { zh: '冰晶包覆：半透明冰殼（抖色實心膠囊）由腳下往上包住木樁，前沿一圈白光環；表面約 44 點按與接觸點的距離依序長出晶體，前沿晶體發白光', en: 'crystal crust: a translucent ice coat (dithered solid capsules) climbs the dummy from its feet behind a white ring; ~44 surface points grow crystals in order of distance from the contact point, the front ones glowing white' },
    { zh: '碎裂：晶體沿表面法線帶阻力飛出並受重力下落、旋轉；20 粒白色冰塵閃爍淡出；藍白閃光＋衝擊環', en: 'shatter: crystals fly off along the surface normals with drag, fall under gravity and spin; 20 white ice-dust pixels twinkle out; a blue-white flash and a shock ring' },
    { zh: '地面：沿冰柱路徑與木樁周圍留下白色霜痕，1 秒內退去', en: 'ground: white frost along the spike path and round the dummy, receding over 1 s' },
  ],
  params: {
    spikes: { zh: '冰柱數量', en: 'spike count', min: 5, max: 14, step: 1, value: 9 },
    wingSpan: { zh: '翼展', en: 'wing span', min: .7, max: 1.5, step: .05, value: 1.25 },
    coverage: { zh: '冰晶覆蓋', en: 'crystal coverage', min: .3, max: 1, step: .05, value: .9 },
  },
  // one ice wing: fan of crystal feathers from the back. side +1 = left (+y), -1 = right. u = unfold 0..1, flap 0..1
  wing(p, root, side, u, span, flap, alpha, light) {
    const IC = this.palette.ice, GL = this.palette.glow, v = p.v3;
    // the far (right) wing sweeps further back so the iso cameras do not see it edge-on
    const Eout = side > 0 ? v.norm([-.38 + .55 * flap, .68, .62]) : v.norm([-.62 + .55 * flap, -.42, .66]);
    const Edn = side > 0 ? v.norm([-.45 + .3 * flap, .3, -.84]) : v.norm([-.5 + .3 * flap, -.15, -.85]), Ef = v.norm([-.28, side * .2, -.94]);
    const N = 7, tips = [];
    for (let k = 0; k < N; k++) {
      const q = k / (N - 1), a = -.35 + 1.75 * q, dir = v.norm([Eout[0] * Math.cos(a) + Edn[0] * Math.sin(a), Eout[1] * Math.cos(a) + Edn[1] * Math.sin(a), Eout[2] * Math.cos(a) + Edn[2] * Math.sin(a)]);
      const len = span * (1.45 - .7 * q) * (.9 + .2 * p.r(k, 7 + side)), eu = p.easeOutBack(p.ph(u, q * .3, q * .3 + .6), 1.6);
      if (eu <= .01) { tips.push(null); continue; }
      const d = v.norm(v.lerp(Ef, dir, Math.min(1.1, eu))), L = p.lerp(.3, 1, Math.min(1, eu)) * len;
      const c = [root[0] + d[0] * (L * .5 + .06), root[1] + d[1] * (L * .5 + .06), root[2] + d[2] * (L * .5 + .06)];
      if (!light) {
        p.shard(c[0], c[1], c[2], L, .26 * (1 - .4 * q), d, IC, { back: .08, sides: 4, spin: side * .5, alpha, shadow: false });
        if (k < N - 2) {
          const d2 = v.norm(v.lerp(d, Edn, .25)), L2 = L * .5, c2 = [root[0] + d2[0] * (L2 * .5 + .04), root[1] + d2[1] * (L2 * .5 + .04), root[2] + d2[2] * (L2 * .5 + .04)];
          p.shard(c2[0], c2[1], c2[2], L2, .2, d2, IC, { back: .1, sides: 4, spin: side * .9, alpha, shadow: false });
        }
      }
      tips.push([root[0] + d[0] * (L + .06), root[1] + d[1] * (L + .06), root[2] + d[2] * (L + .06)]);
    }
    if (light) {
      for (let k = 0; k < N - 1; k++) if (tips[k] && tips[k + 1]) p.lquad(root, v.lerp(root, tips[k], .75), v.lerp(root, tips[k + 1], .75), root, (uu, vv) => .55 - .3 * uu, GL, .55 * alpha);
      for (let k = 0; k < N; k += 2) if (tips[k]) p.line(v.lerp(root, tips[k], .3), tips[k], .05, GL, .85 * alpha, { w1: .01, i1: .3 * alpha });
    }
  },
  draw(p, t) {
    const IC = this.palette.ice, GL = this.palette.glow, MS = this.palette.mist;
    const CAST = 1.2, HIT = 1.62, SH = 2.3, X0 = -2.1, DX = 2.35, span = p.param('wingSpan'), cov = p.param('coverage');
    const P0 = -1.45, P1 = DX - .35, path = s => [p.lerp(P0, P1, s), .1 * Math.sin(s * 7 + .5)];
    const front = p.ph(t, CAST + .08, HIT), fu = p.easeIn(front) * .55 + front * .45, xf = p.lerp(P0, P1, fu);
    // ---- ground frost (stains first, they sit under everything) ----
    const frostAmt = 1 - p.ph(t, 3.0, 4.0);
    if (t > CAST + .08 && frostAmt > 0) {
      p.stain((P0 + DX) / 2, 0, (DX - P0) / 2 + .3, (dx, dy) => {
        const x = dx + (P0 + DX) / 2;
        return x < xf && x > P0 - .2 && Math.abs(dy - .1 * Math.sin((x - P0) / (P1 - P0) * 7 + .5)) < .32 + .12 * p.noise(x * 3, 2) ? .9 : 0;
      }, '#dcebf8', frostAmt);
      if (t > HIT) p.aftermath(DX, 0, 1.3, 'frost', { amt: frostAmt * p.easeOutCubic(p.ph(t, HIT, HIT + .4)), seed: 3 });
    }
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < CAST) pose = { a: 'ready', b: 'spread', k: p.easeOutBack(p.ph(t, .3, .5), 1.5) };
    else if (t < CAST + .08) pose = { a: 'spread', b: 'palm', k: p.easeInCubic((t - CAST) / .08) };
    else if (t < 2.7) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.7, 3.5)) };
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose });
    const cool = .35 * p.env(t, .4, .9, 2.8, 3.6);
    p.grade({ desat: cool, tint: '#9fd4ff', tintAmt: cool * .45 });
    // ---- wings + tail ----
    const wu = p.ph(t, .35, 1.05) * (1 - p.easeInCubic(p.ph(t, 2.7, 3.15))), walpha = 1 - p.easeInCubic(p.ph(t, 2.85, 3.3));
    const flap = Math.sin(Math.PI * p.ph(t, CAST, CAST + .35)) * (t > CAST ? 1 : 0);
    const root = [fig.chest[0] - .14, fig.chest[1], fig.chest[2] + .04];
    const wingsOn = wu > .01 && walpha > .02;
    if (wingsOn) for (const sd of [1, -1]) this.wing(p, [root[0], root[1] + sd * .08, root[2]], sd, wu, span, flap, walpha, false);
    const tu = p.easeOutCubic(p.ph(t, .55, 1.05)) * (1 - p.easeInCubic(p.ph(t, 2.75, 3.2)));
    if (tu > .02) {
      const NT = 7;
      for (let j = 0; j < NT; j++) {
        const q = j / (NT - 1), g = p.ph(tu, q * .6, q * .6 + .4);
        if (g <= 0) continue;
        const x = fig.hip[0] - .32 - j * .3 * span, y = .22 * Math.sin(j * .9 - t * 3) * q, z = Math.max(.1, fig.hip[2] * (1 - q * 1.3) * .7) + .45 * q * q * q;
        const L = (.6 - .36 * q) * p.easeOutBack(g, 1.5), d = p.v3.norm([-1, .3 * Math.cos(j * .9 - t * 3) * q, -.3 + 1.1 * q * q]);
        p.shard(x, y, z, L, (.3 - .17 * q) * Math.min(1, g * 1.5), d, IC, { back: .3, sides: 4, spin: j * .4, alpha: walpha, shadow: j % 2 === 0 });
      }
    }
    // ---- cold mist round the feet ----
    const mI = p.env(t, .45, .9, 2.9, 3.6);
    if (mI > 0) {
      const nM = Math.round(8 * p.density);
      for (let k = 0; k < nM; k++) {
        const ph = (t * .45 + p.r(k, 21)) % 1, a = p.r(k, 22) * p.TAU, rr = .35 + .5 * p.r(k, 23);
        p.ball(X0 + Math.cos(a) * rr - .2, Math.sin(a) * rr, .1 + ph * 1.1, .18 + .22 * ph, MS, { alpha: mI * .85 * (1 - ph) * Math.min(1, ph * 4), rough: .6, shadow: false, seed: k });
      }
    }
    // ---- ice spikes along the ground ----
    const nSp = Math.round(p.param('spikes')), sink = p.easeInCubic(p.ph(t, 2.45, 2.95));
    let tips = [];
    if (t > CAST + .06 && sink < 1) tips = p.spikes(path, fu * 1.02, { n: nSp, h: .95, wid: .3, ramp: IC, spread: .82, rise: .18, seed: 5, shrink: sink });
    // ---- ice crust creeping up the dummy from the contact point, then shattering ----
    const C0 = [DX - .3, 0, .12], cr = p.ph(t, HIT, 2.2), F = 2.0 * cov * p.easeOutCubic(cr), zc = 1.8 * cov * p.easeOutCubic(cr);
    const nC = Math.round(44 * Math.max(.5, p.density)), crystals = [];
    for (let k = 0; k < nC; k++) {
      const z = .08 + 1.6 * p.r(k, 31), a = p.r(k, 32) * p.TAU;
      const R = (z < .5 ? .1 : z < 1.2 ? .34 : z < 1.28 ? .26 : .26 * Math.sqrt(Math.max(0, 1 - Math.pow((z - 1.48) / .28, 2))));
      if (R < .03) continue;
      const pos = [DX + Math.cos(a) * R, Math.sin(a) * R, z], dist = Math.hypot(pos[0] - C0[0], pos[1] - C0[1], pos[2] - C0[2]);
      if (dist > 2.0 * cov) continue;
      crystals.push({ k, pos, dist, nrm: p.v3.norm([Math.cos(a), Math.sin(a), .35 + .5 * (p.r(k, 33) - .5)]) });
    }
    if (t >= HIT && t < SH) {
      // translucent ice coat (dithered soft solid) rising up the dummy
      const ca = .78;
      p.capsule([DX, 0, .02], [DX, 0, Math.min(zc, .56)], .15, .14, IC, { alpha: ca, shadow: false });
      if (zc > .56) p.capsule([DX, 0, .56], [DX, 0, Math.min(zc, 1.18)], .37, .33, IC, { alpha: ca, shadow: false });
      if (zc > .95) { const k = p.ph(zc, .95, 1.15); p.capsule([DX - .5 * k, 0, .95], [DX + .5 * k, 0, .95], .12, .12, IC, { alpha: ca, shadow: false }); }
      if (zc > 1.25) p.ball(DX, 0, 1.48, .28 * p.easeOutBack(p.ph(zc, 1.25, 1.7), 1.5), IC, { alpha: ca, shadow: false });
      for (const c of crystals) {
        if (F < c.dist) continue;
        const g = p.easeOutBack(Math.min(1, (F - c.dist) / .35), 1.8), L = (.28 + .2 * p.r(c.k, 34)) * g;
        if (L < .02) continue;
        p.shard(c.pos[0] + c.nrm[0] * L * .3, c.pos[1] + c.nrm[1] * L * .3, c.pos[2] + c.nrm[2] * L * .3, L, .15, c.nrm, IC, { back: .2, sides: 4, spin: c.k, shadow: false, lit: .1 });
      }
    } else if (t >= SH) {
      const a = t - SH;
      for (const c of crystals) {
        if (a > 1.1) break;
        const v0 = 2.2 + 1.6 * p.r(c.k, 35), m = p.drag(v0, 3, a), z = c.pos[2] + c.nrm[2] * m + 1.2 * a - 3.2 * a * a;
        if (z < .02) continue;
        const L = (.26 + .18 * p.r(c.k, 34)) * (1 - .5 * p.ph(a, .4, 1.1)), sp = p.r(c.k, 36) * 4 + a * 14;
        const d = p.v3.norm([c.nrm[0] + Math.cos(sp) * .7, c.nrm[1] + Math.sin(sp) * .7, c.nrm[2] + Math.sin(sp * 1.3) * .7]);
        p.shard(c.pos[0] + c.nrm[0] * m, c.pos[1] + c.nrm[1] * m, z, L, .14, d, IC, { back: .2, sides: 4, shadow: false, lit: .15 });
      }
    }
    // ===== light =====
    if (wingsOn) for (const sd of [1, -1]) this.wing(p, [root[0], root[1] + sd * .08, root[2]], sd, wu, span, flap, walpha, true);
    // the newest spike tips glow; a cold band leads along the ground
    for (const tp of tips) if (tp[4] < 1) p.glow(tp[0], tp[1], tp[2], .3, GL, 1.2 * (1 - tp[4]));
    if (front > 0 && front < 1) {
      p.decal(xf, 0, 0, .7, (x, y, rho) => p.band(x, .15, .2) * (1 - rho / .7), GL, .9);
      p.light(xf, 0, 0, 1.2, GL, .6);
    }
    // contact flash + cold ring at the hit
    const a1 = t - HIT;
    if (a1 >= 0 && a1 < .6) {
      const fl = Math.pow(1 - p.ph(a1, 0, .15), 2);
      if (fl > 0) p.glow(C0[0], C0[1], C0[2] + .2, .3 + .6 * fl, GL, 1.5 * fl, { pow: 1.3 });
      p.shock(DX, 0, .03, p.ph(a1, 0, .55), { R: 1.9, w: .25, ramp: GL });
    }
    // growth front of the crust glows white
    if (t > HIT && t < SH) {
      for (const c of crystals) { const e = F - c.dist; if (e > 0 && e < .3) p.glow(c.pos[0] + c.nrm[0] * .2, c.pos[1] + c.nrm[1] * .2, c.pos[2] + c.nrm[2] * .2, .16, GL, 1.2 * (1 - e / .3)); }
      if (zc < 1.75) p.ring(DX, 0, zc, zc < .56 ? .17 : zc < 1.2 ? .4 : .3, .07, GL, .9, { fn: an => .5 + .5 * Math.cos(an - .6) });
      p.light(DX, 0, 0, 1.4, GL, .5 * cr);
    }
    // shatter: flash, ring, twinkling ice dust
    const a2 = t - SH;
    if (a2 >= 0 && a2 < 1.4) {
      const fl = Math.pow(1 - p.ph(a2, 0, .16), 2), C = [DX, 0, .9];
      if (fl > 0) p.glow(C[0], C[1], C[2], .5 + .9 * fl, GL, 1.6 * fl, { pow: 1.3 });
      p.shock(C[0], 0, C[2], p.ph(a2, 0, .45), { R: 1.6, w: .22, ramp: GL, axis: [1, 0, 0], light: false });
      if (a2 < .16) p.speedLines(C[0], 0, C[2], { n: 14, R0: .5, R1: 2.4, ramp: GL, I: 1 - a2 / .16, seed: Math.floor(t * 30) });
      const nD = Math.round(20 * p.density);
      for (let k = 0; k < nD; k++) {
        const life = .6 + .7 * p.r(k, 41), u = a2 / life;
        if (u >= 1) continue;
        const d = p.rdir(k, 43, .4), m = p.drag(2.6 + 2 * p.r(k, 44), 3.5, a2), tw = (Math.floor(t * 15) + k) % 3 ? 1 : .4;
        p.dot(C[0] + d[0] * m, C[1] + d[1] * m, Math.max(.05, C[2] + d[2] * m - .4 * a2 * a2), GL, 1.2 * (1 - u) * tw, k % 5 ? 1 : 2);
      }
      p.light(DX, 0, 0, 2, GL, fl + .3 * (1 - p.ph(a2, 0, .8)));
    }
  },
});
