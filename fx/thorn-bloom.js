// 荊棘綻放 / Thorn Bloom — Ultimates pack (original design): a thrown seed bursts into thorned vines that coil round the target, then a giant serrated flower opens round it and snaps shut
PXFX.define({
  id: 'thorn-bloom',
  loop: 4.2,
  beats: [{ t: .62, kind: 'cast', power: .6 }, { t: 1.12, kind: 'pulse', power: .6 }, { t: 2.05, kind: 'hit', power: 1.3 }],
  view: { r: 3.3, h: 2.8 },
  stage: { ground: 'sand', tiles: true },
  modules: ['figure', 'charge', 'growth', 'swarm', 'shockwave', 'impact', 'debris', 'aftermath'],
  palette: {
    vine: ['#13301a', '#1d4626', '#2a5e30', '#3c7a3a', '#56964a'],
    thorn: ['#3a2a18', '#6a5430', '#a08a58', '#d8c890'],
    petal: ['#4c0c26', '#7c1636', '#ac2248', '#e0306a', '#f47a9a'],
    wither: ['#2e2416', '#47391f', '#63512e', '#7f6c46'],
    glow: ['#3f9a3a', '#7ccc4a', '#c6f07a', '#f6ffd8'],
    pink: ['#b0204e', '#e0306a', '#ff7aa0', '#ffd2e0'],
  },
  timeline: [
    { k: 'pose', t: [0, .3], zh: '起手：施法者由站姿轉為架式', en: 'pose: the caster shifts from idle into a stance' },
    { k: 'charge', t: [.3, .62], zh: '集氣：手臂後拉，手中一粒種子發黃綠光，光點匯聚', en: 'charge: the arm draws back, a seed in the hand glows yellow-green, motes converge on it' },
    { k: 'shape', t: [.62, 1.12], zh: '成形：0.06 秒內前拋，種子以拋物線（高約 1.1）飛到木樁腳下，沿途拖光點，落地時地面亮起綠光環', en: 'shape: the throw snaps in 0.06 s, the seed arcs (~1.1 high) to the dummy’s feet trailing sparks, and a green ring lights the ground where it lands' },
    { k: 'motion', t: [1.12, 1.9], zh: '推進：5 條帶刺深綠藤蔓 0.45 秒內由地面衝出、以螺旋線纏上木樁（約 1.3 圈），泥塊飛起；隨後 7 片鋸齒玫紅巨大花瓣由地面升起並以回彈緩動張開成直徑約 3.5 的花', en: 'motion: 5 thorned dark-green vines burst out of the ground within 0.45 s and coil up the dummy on helices (~1.3 turns), clods flying; then 7 serrated rose-red giant petals rise and open with an overshoot ease into a flower ~3.5 across' },
    { k: 'impact', t: [1.9, 2.45], zh: '命中：花瓣 0.08 秒內向上合攏，把木樁包在花苞內；粉紅閃光、地面衝擊環，18 片小花瓣與 10 片葉子翻滾四散', en: 'impact: the petals snap shut upwards in 0.08 s, enclosing the dummy in a bud; a pink flash and a ground ring, 18 small petals and 10 leaves tumble outwards' },
    { k: 'after', t: [2.45, 4.2], zh: '餘波：花苞與藤蔓轉為枯褐色，花瓣向外垂落，藤蔓由頂端縮回地面，散落的花瓣飄落消失，施法者收勢', en: 'aftermath: bud and vines turn withered brown, the petals droop outwards, the vines retract tip-first into the ground, the loose petals flutter down and vanish; the caster recovers' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→後拉→前拋→收勢', en: 'caster: faceless mannequin, poses idle → wind-up → throw → recover' },
    { zh: '種子：深色小實心球＋黃綠光暈，拋物線飛行，拖 6 粒光點', en: 'seed: a small dark solid ball in a yellow-green glow on an arc, trailing 6 sparks' },
    { zh: '藤蔓：16 點螺旋路徑上的膠囊管（半徑 0.08→0.03），每 0.16 單位一根三稜刺，按長度比例生長，頂端最亮', en: 'vines: a capsule tube along a 16-point helix (radius 0.08 → 0.03) with a three-sided thorn every 0.16 units, growing along its length with the tip brightest' },
    { zh: '巨花：7 片花瓣，每片沿中脈 6 段三角面，邊緣隔段外突成鋸齒，微微內凹；背面 3 根尖刺；張開時傾角約 72°，合攏時向內傾', en: 'giant flower: 7 petals, each 6 segments of triangles along a midrib with every other edge point pushed out into serrations, slightly cupped; 3 thorns on the back; ~72° tilt when open, leaning inwards when shut' },
    { zh: '散落：18 片小三角花瓣與 10 片綠葉，帶阻力飛出後左右飄擺下落並旋轉', en: 'scatter: 18 small triangle petals and 10 green leaves fly out with drag, then flutter down while spinning' },
    { zh: '命中：粉紅閃光、地面衝擊環、14 條放射速度線', en: 'impact: a pink flash, a ground shock ring, 14 radial speed lines' },
    { zh: '枯萎：藤蔓與花瓣換成枯褐色漸層，花瓣向外垂落並抖色淡出，藤蔓由頂端縮回地面', en: 'wither: vines and petals switch to a withered brown ramp, petals droop outwards and dither out, vines retract tip-first into the ground' },
  ],
  params: {
    vines: { zh: '藤蔓數量', en: 'vine count', min: 2, max: 8, step: 1, value: 5 },
    flowerSize: { zh: '花朵大小', en: 'flower size', min: .7, max: 1.3, step: .05, value: 1 },
    petals: { zh: '花瓣數量', en: 'petal count', min: 5, max: 10, step: 1, value: 7 },
  },
  // petal tilt from vertical (radians) and scale over time
  petalState(p, t, HIT) {
    if (t < 1.5) return null;
    if (t < 1.88) { const u = p.ph(t, 1.5, 1.85); return { th: p.lerp(-.1, 1.25, p.easeOutBack(u, 1.6)), sc: p.easeOutBack(Math.min(1, u * 1.6), 1.4), wi: 0 }; }
    if (t < HIT - .08) return { th: 1.25 + .05 * Math.sin((t - 1.88) * 20) * Math.exp(-(t - 1.88) * 8), sc: 1, wi: 0 };
    if (t < HIT) return { th: p.lerp(1.25, -.18, p.easeInCubic(p.ph(t, HIT - .08, HIT))), sc: 1, wi: 0 };
    if (t < 2.5) return { th: -.18 + .08 * Math.sin((t - HIT) * 30) * Math.exp(-(t - HIT) * 9), sc: 1, wi: 0 };
    const u = p.ph(t, 2.5, 3.2);
    return { th: -.18 + 1.75 * p.easeInCubic(u), sc: 1 - .2 * u, wi: 1, alpha: 1 - p.easeInCubic(p.ph(t, 2.8, 3.25)) };
  },
  draw(p, t) {
    const VN = this.palette.vine, TH = this.palette.thorn, PT = this.palette.petal, WT = this.palette.wither, GL = this.palette.glow, PK = this.palette.pink;
    const THROW = .62, LAND = 1.12, HIT = 2.05, X0 = -2.1, DX = 2.35, fs = p.param('flowerSize'), NV = Math.round(p.param('vines')), NP = Math.round(p.param('petals'));
    const T = [DX - .05, 0, 0];
    // ---- ground: churned soil where the vines burst out ----
    if (t > LAND) p.aftermath(DX, 0, 1.1, 'crack', { amt: 1 - p.ph(t, 3.2, 4.0), color: '#5a4630', ramp: GL, glow: Math.pow(1 - p.ph(t, LAND, LAND + .7), 2), seed: 4, n: 5 });
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < THROW) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .3, .55), 1.4) };
    else if (t < THROW + .06) pose = { a: 'windup', b: 'point', k: p.easeInCubic((t - THROW) / .06) };
    else if (t < 2.6) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.6, 3.4)) };
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose });
    // ---- the seed ----
    let seed = null;
    if (t < THROW + .02) seed = t > .3 ? fig.hand : null;
    else if (t < LAND) {
      const u = p.ph(t, THROW, LAND), k = .2 * p.easeOutCubic(Math.min(1, u / .3)) + .8 * Math.pow(u, 1.5);
      seed = p.arcPos(fig.hand, [T[0], T[1], .05], k, 1.1);
    }
    if (seed) p.ball(seed[0], seed[1], seed[2], .065, ['#2a1c10', '#4a3418', '#6e5226'], { shadow: true });
    // ---- vines coiling up the dummy ----
    const withered = t > 2.55, ret = 1 - p.easeInCubic(p.ph(t, 2.75, 3.35)), vtips = [];
    for (let k = 0; k < NV; k++) {
      const u = p.easeOutCubic(p.ph(t, LAND + k * .035, LAND + .45 + k * .035)) * ret;
      if (u <= .01) continue;
      const b = k / NV * p.TAU + .3, sg = k % 2 ? 1 : -1, H = 1.25 + .3 * p.r(k, 3), pts = [];
      for (let q = 0; q <= 16; q++) {
        const s = q / 16, r = .36 + .45 * Math.pow(1 - s, 3), a = b + sg * p.TAU * 1.3 * s;
        pts.push([DX + Math.cos(a) * r, Math.sin(a) * r, -.06 + H * Math.pow(s, 1.1)]);
      }
      const tip = p.vine(pts, u, { r0: .085, r1: .03, thorn: .16, ramp: withered ? WT : VN, thornRamp: withered ? WT : TH });
      if (tip && !withered) vtips.push([tip, u]);
    }
    // clods thrown up as the vines burst out
    const nCl = Math.round(10 * p.density);
    for (let k = 0; k < nCl; k++) {
      const a = t - LAND - p.r(k, 11) * .08;
      if (a <= 0 || a > 1) continue;
      const d = p.rdir(k, 13, .9), v = 2 + 1.5 * p.r(k, 14), z = d[2] * v * a - 5 * a * a;
      if (z < 0) continue;
      p.rock(DX + d[0] * (.5 + v * .4 * a), d[1] * (.5 + v * .4 * a), z + .04, .05 + .04 * p.r(k, 15), ['#4a3820', '#6a5232', '#8a7048'], k);
    }
    // ---- the giant flower ----
    const st = this.petalState(p, t, HIT);
    if (st && (st.alpha == null || st.alpha > .02)) {
      const Lp = 1.95 * fs * st.sc, Wp = .5 * fs * st.sc, S = 6, ramp = st.wi ? WT : PT, o = { alpha: st.alpha == null ? 1 : st.alpha };
      for (let k = 0; k < NP; k++) {
        const a = k / NP * p.TAU + .2, ca = Math.cos(a), sa = Math.sin(a), th = st.th + .06 * Math.sin(k * 2.1);
        const rh = [ca, sa, 0], tg = [-sa, ca, 0], D = [rh[0] * Math.sin(th), rh[1] * Math.sin(th), Math.cos(th)];
        const nI = [-rh[0] * Math.cos(th), -rh[1] * Math.cos(th), Math.sin(th)];   // towards the flower's inside
        const B = [DX + ca * .22, sa * .22, .04], L = [], R = [], M = [];
        for (let i = 0; i <= S; i++) {
          const s = i / S, w = Wp * Math.pow(Math.sin(Math.PI * Math.min(1, s * 1.12 + .02)), .7) * (i % 2 && i < S ? 1.4 : 1), c = .22 * Wp * Math.sin(Math.PI * s);
          const sp = [B[0] + D[0] * Lp * s + nI[0] * c, B[1] + D[1] * Lp * s + nI[1] * c, B[2] + D[2] * Lp * s + nI[2] * c];
          M.push(sp);
          L.push([sp[0] + tg[0] * w + nI[0] * c * .8, sp[1] + tg[1] * w + nI[1] * c * .8, sp[2] + nI[2] * c * .8]);
          R.push([sp[0] - tg[0] * w + nI[0] * c * .8, sp[1] - tg[1] * w + nI[1] * c * .8, sp[2] + nI[2] * c * .8]);
        }
        for (let i = 0; i < S; i++) {
          p.tri(M[i], L[i], L[i + 1], ramp, Object.assign({ lit: -.06 }, o)); p.tri(M[i], L[i + 1], M[i + 1], ramp, Object.assign({ lit: -.06 }, o));
          p.tri(M[i], R[i + 1], R[i], ramp, Object.assign({ lit: -.14 }, o)); p.tri(M[i], M[i + 1], R[i + 1], ramp, Object.assign({ lit: -.14 }, o));
        }
        for (let j = 1; j <= 3; j++) {
          const q = M[j * 2 - 1], dn = p.v3.norm([-nI[0] + D[0] * .4, -nI[1] + D[1] * .4, -nI[2] + D[2] * .4]);
          p.shard(q[0] - nI[0] * .06, q[1] - nI[1] * .06, q[2] - nI[2] * .06, .22 * fs * st.sc, .07, dn, st.wi ? WT : TH, { back: .1, sides: 3, shadow: false, alpha: o.alpha });
        }
      }
    }
    // ---- scattered petals and leaves (tumbling triangles) ----
    const nPet = Math.round(18 * p.density), nLf = Math.round(10 * p.density);
    for (let k = 0; k < nPet + nLf; k++) {
      const a = t - HIT - p.r(k, 21) * .05, life = 1.2 + .7 * p.r(k, 22);
      if (a <= 0 || a > life) continue;
      const d = p.rdir(k, 23, .5), m = p.drag(3 + 2.5 * p.r(k, 24), 3, a), fall = Math.max(0, a - .25);
      const c = [DX + d[0] * m + .15 * Math.sin(a * 7 + k), d[1] * m + .15 * Math.cos(a * 6 + k), Math.max(.03, 1.1 + d[2] * m - .55 * fall * fall * 2)];
      const sp = a * (6 + 6 * p.r(k, 25)) + k, sz = (k < nPet ? .13 : .11) * (1 - .3 * a / life);
      const e1 = [Math.cos(sp) * sz, Math.sin(sp * .7) * sz, Math.sin(sp) * sz], e2 = [-Math.sin(sp * 1.3) * sz * .6, Math.cos(sp) * sz * .6, Math.cos(sp * .8) * sz * .6];
      p.tri([c[0] + e1[0], c[1] + e1[1], c[2] + e1[2]], [c[0] - e1[0] + e2[0], c[1] - e1[1] + e2[1], c[2] - e1[2] + e2[2]], [c[0] - e1[0] - e2[0], c[1] - e1[1] - e2[1], c[2] - e1[2] - e2[2]], k < nPet ? PT : VN, { lit: .2, alpha: a > life - .3 ? (life - a) / .3 : 1 });
    }
    // ===== light =====
    if (seed) {
      const ch = p.ph(t, .3, THROW);
      p.glow(seed[0], seed[1], seed[2], .16 + .1 * ch, GL, .6 + .5 * ch);
      if (t < THROW) p.charge(seed[0], seed[1], seed[2], ch, { n: 10, R: .9, ramp: GL, seed: 2 });
      else for (let k = 1; k <= 6; k++) {
        const tb = t - k * .035;
        if (tb < THROW) break;
        const u = p.ph(tb, THROW, LAND), kk = .2 * p.easeOutCubic(Math.min(1, u / .3)) + .8 * Math.pow(u, 1.5), q = p.arcPos(fig.hand, [T[0], T[1], .05], kk, 1.1);
        p.dot(q[0], q[1], q[2], GL, 1 - k * .14, 1);
      }
    }
    const aL = t - LAND;
    if (aL >= 0 && aL < .6) {
      p.shock(T[0], 0, .03, p.ph(aL, 0, .5), { R: 1.4, w: .22, ramp: GL });
      const fl = Math.pow(1 - p.ph(aL, 0, .14), 2);
      if (fl > 0) p.glow(T[0], 0, .2, .3 + .4 * fl, GL, 1.3 * fl);
    }
    for (const [tip, u] of vtips) if (u < .98) p.glow(tip[0], tip[1], tip[2], .14, GL, 1.1 * (1 - u));
    const aH = t - HIT;
    if (aH >= 0 && aH < .6) {
      const fl = Math.pow(1 - p.ph(aH, 0, .15), 2), C = [DX, 0, 1.1];
      if (fl > 0) p.glow(C[0], C[1], 1.95 * fs, .25 + .45 * fl, PK, 1.4 * fl, { pow: 1.3 });
      p.shock(DX, 0, .03, p.ph(aH, 0, .5), { R: 2.2 * fs, w: .26, ramp: PK });
      if (aH < .18) p.speedLines(C[0], 0, C[2], { n: 14, R0: .7, R1: 2.6, ramp: PK, I: 1 - aH / .18, seed: Math.floor(t * 30) });
      p.light(DX, 0, 0, 2.2, PK, fl + .3);
    }
    if (st && !st.wi && t < HIT) p.light(DX, 0, 0, 1.8 * fs, PK, .35 * p.ph(t, 1.5, 1.8));
  },
});
