// 重力漩渦 / Gravity Maelstrom — Mass Spells pack (original design): a black core over the field spirals the whole horde up into a tumbling ball of bodies, crushes it, then bursts and scatters them
PXFX.define({
  id: 'gravity-maelstrom',
  loop: 5,
  beats: [{ t: .85, kind: 'cast', power: .8 }, { t: 2.3, kind: 'pulse', power: .5 }, { t: 2.72, kind: 'hit', power: 1.5 }],
  view: { r: 4.8, h: 3.6 },
  stage: { ground: 'sand' },
  modules: ['figure', 'charge', 'core', 'crowd', 'domain', 'shockwave', 'impact', 'aftermath'],
  palette: {
    violet: ['#4a2c96', '#7048d0', '#b07cff', '#d8bcff', '#f6efff'],
    core: ['#06040a', '#0e0a18', '#171026', '#221838'],
    dust: ['#5a4a5e', '#76647a', '#948098', '#b09cb2'],
    mass: ['#1c1420', '#2a1e2c', '#3a2a3a', '#4e3a4a'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者向兩側張開雙手（0.38 秒回彈緩動），雙手亮起紫光；敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster spreads both arms (0.38 s overshoot ease) and both hands light up violet; a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.3, .85], zh: '集氣：18 粒紫光點由四周匯聚到敵群中心上方 z = 1.7；頁面背景由該點向外抹成紫黑虛空（0.5 秒）；敵兵發抖、向外後仰', en: 'charge: 18 violet motes converge on a point 1.7 above the middle of the horde; the page wipes out from there into a violet-black void (0.5 s); the soldiers tremble and lean away' },
    { k: 'shape', t: [.55, 1.0], zh: '成形：半徑 0.42 的實心黑球以回彈緩動張開，外圈 1 像素紫色光邊＋光暈；傾斜的吸積環（半徑約 1.8，3 段亮弧）高速旋轉；地面亮起半徑 3.1 的三臂螺旋，螺旋紋路不斷向中心收縮', en: 'shape: a solid black core (radius 0.42) opens with an overshoot, ringed by a 1 px violet rim and a halo; a tilted accretion ring (radius ~1.8, three bright arcs) spins fast; a three-arm spiral (radius 3.1) lights the ground, its arms crawling inwards' },
    { k: 'motion', t: [1.0, 2.62], zh: '推進：敵兵由近到遠被捲起，命中時間 = 1.0 + 與核心地面點的距離 ÷ 3.6 秒；每個敵兵沿螺旋（平均 0.8 圈，半徑與高度按 0.2·sin + 0.8·k² 加速收縮）翻滾著飛向核心，身後拖紫色殘影；到達後貼在核心周圍的球面上（半徑約 1.2，頭向外），內部一團暗色甲冑實心球隨到達人數長大（表面紫色裂縫光紋），整團屍球繞傾斜軸翻轉；2.25–2.62 秒屍球壓縮到 70%，劇烈顫動', en: 'motion: the soldiers are swept up nearest first, hit time = 1.0 + distance from the core’s ground point / 3.6 s; each one tumbles along a spiral into the core (0.8 turns on average, radius and height closing as 0.2·sin + 0.8·k², accelerating) trailing violet streaks; arrivals stick to a sphere around the core (radius ~1.2, heads out) over a dark solid mass of armour that grows with every arrival (violet seams of light on it), and the whole ball of bodies tumbles about a tilted axis; at 2.25–2.62 s the ball crushes to 70% and shudders' },
    { k: 'impact', t: [2.5, 3.2], zh: '命中：吸積環收縮進核心、18 道光線向內吸，屍球前方亮起一點白光；2.72 秒 1 格黑白衝擊格，屍球背後一面紫白爆光（屍體成剪影），屍體按拋物線向外飛散（落點距中心 1.0–3.6），空中衝擊環＋地面衝擊環＋塵土、放射速度線，地面裂開', en: 'impact: the accretion ring collapses into the core, 18 streaks rush inwards and a white point flares in front of the ball; at 2.72 s one two-tone impact frame and a violet-white flash behind the ball (the bodies read as silhouettes), the bodies fly out on parabolas (landing 1.0–3.6 from the centre), an air shock ring, a ground shock ring with dust, radial speed lines, and the ground cracks' },
    { k: 'after', t: [3.2, 5], zh: '餘波：屍體四散躺在地上，落地處揚起塵土，紫光裂紋慢慢冷卻；虛空在 3.4–4.2 秒向遠方退去，屍體淡出，新一批敵兵由右邊走回原位', en: 'aftermath: the bodies lie scattered with dust where they landed and the violet cracks cool; the void recedes into the distance at 3.4–4.2 s, the bodies fade and a fresh horde walks in from the right' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6）分佈在中心 (1.2, 0)、半徑 2.45×2.1 的橢圓內；反應為自訂的吸入：螺旋路徑（極座標插值半徑、角度、高度）＋翻滾，到達後鎖在旋轉球面的槽位上', en: 'horde: 30–60 small soldiers (~0.6 tall) in an ellipse 2.45×2.1 around (1.2, 0); the reaction is a custom pull: a spiral path (polar interpolation of radius, angle and height) with a tumble, then locked to a slot on the spinning sphere' },
    { zh: '屍球：每個槽位的方向 = 到達時的方位角（起始方位 + 旋轉圈數）＋隨機高度（±0.75），到達後整體繞傾斜軸以每秒約 1.7 弧度轉動（壓縮時加速）；身體方向用傾斜角 = acos(法線 z) 令頭部朝外；內部暗色實心球半徑 = 0.74 × 球半徑 × √(已到達比例)', en: 'ball of bodies: each slot direction = its arrival azimuth (start azimuth + swirl turns) and a random height (±0.75); after arrival the whole set turns about a tilted axis at ~1.7 rad/s (faster while crushing); each body is tilted by acos(normal z) so the heads point out; a dark solid filler sphere inside has radius 0.74 × ball radius × √(share arrived)' },
    { zh: '核心：實心深色球（不要用發光畫黑色），外圈面向鏡頭的紫色細環和光暈；周圍一圈螺旋扭曲（只扭曲屍球外側），表現重力透鏡；雙手各拉一條搖擺的紫色細線連到核心', en: 'core: a solid dark sphere (never draw black as light) with a camera-facing violet rim ring and a halo; a swirl warp around it (outside the ball only) sells the gravitational lensing; a wavering violet thread runs from each hand to the core' },
    { zh: '吸積環：傾斜的發光圓環，亮度沿圓周按 3 段正弦變化並高速旋轉，外圈再一條細環；26 粒紫光點沿螺旋由地面吸入核心', en: 'accretion ring: a tilted ring of light whose brightness varies in three sine arcs around it and spins fast, plus a thin outer ring; 26 violet motes are sucked from the ground into the core along spirals' },
    { zh: '地面：領域模組換成紫黑虛空背景和深紫地面；三臂對數螺旋貼花，相位隨時間增加令紋路向內收縮', en: 'ground: the domain module swaps in a violet-black void and dark violet ground; a three-arm logarithmic spiral decal whose phase grows with time so the arms crawl inwards' },
    { zh: '爆散：爆光是放在屍球後方的面向鏡頭光片，屍體在前面成剪影；每具屍體由爆炸瞬間的球面位置沿外向水平方向拋出（拋物線，重力 11），落地後滑行 0.25 並平躺；落點限制在場地內', en: 'burst: the flash is a camera-facing light card placed behind the ball so the bodies burst out as silhouettes; each body leaves its sphere position at the blast along its outward horizontal direction on a parabola (gravity 11), slides 0.25 after landing and lies flat; landing points are kept inside the stage' },
    { zh: '餘波：放射裂紋（8 條，發紫光後冷卻）、落地塵土、衝擊環塵土，1.5 秒後淡出', en: 'aftermath: radial cracks (8, glowing violet, then cooling), landing dust and the shock-ring dust, fading after 1.5 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    swirl: { zh: '吸入旋轉圈數', en: 'pull swirl (turns)', min: .2, max: 1.5, step: .05, value: .8 },
    coreSize: { zh: '核心大小', en: 'core size', min: .7, max: 1.4, step: .05, value: 1 },
    burstForce: { zh: '爆散力度', en: 'burst force', min: .5, max: 1.6, step: .05, value: 1 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.45, ry: 2.1 },
  C: [1.2, 0, 1.7], HIT: 2.72,
  AX: [.33, -.24, .91],
  SKYG: ['#100c18', '#18122a', '#221a38', '#2e2448'],
  // a point moved d along the view axis without moving on screen (2D: compensate the oblique depth)
  toward(p, P, d) {
    const f = p.cam().fwd;
    return [P[0] + f[0] * d, P[1] + f[1] * d, P[2] + f[2] * d + (p.mode === '2d' ? .55 * d : 0)];
  },
  rot(v, ang) {
    const K = this.AX, c = Math.cos(ang), s = Math.sin(ang), d = K[0] * v[0] + K[1] * v[1] + K[2] * v[2];
    const cr = [K[1] * v[2] - K[2] * v[1], K[2] * v[0] - K[0] * v[2], K[0] * v[1] - K[1] * v[0]];
    return [v[0] * c + cr[0] * s + K[0] * d * (1 - c), v[1] * c + cr[1] * s + K[1] * d * (1 - c), v[2] * c + cr[2] * s + K[2] * d * (1 - c)];
  },
  spin(p, t) { return 1.7 * t + 3 * Math.pow(p.ph(t, 2.2, this.HIT), 2); },
  ballR(p, t, n, cs) {
    const R0 = .42 * cs + .42 + .42 * Math.sqrt(n / 60);
    return R0 * (1 - .3 * p.easeInCubic(p.ph(t, 2.25, 2.62)) - .2 * p.easeInCubic(p.ph(t, 2.6, this.HIT))) * (1 + .03 * Math.sin(t * 90) * p.env(t, 2.35, 2.45, 2.6, 2.7));
  },
  // per-unit plan (cached): hit time, pull duration, arrival slot direction, landing radius
  plan(p, n, swirl, force) {
    const key = n + '|' + swirl + '|' + force;
    if (this._pk === key) return this._pv;
    const C = this.C, units = p.crowdLayout({ n, seed: 9, area: this.AREA });
    const pl = units.map(u => {
      const dx = u.x - C[0], dy = u.y - C[1], r0 = Math.hypot(dx, dy), th0 = Math.atan2(dy, dx);
      const th = 1.0 + r0 / 3.6 + u.r1 * .06, T = .42 + .16 * u.r2;
      const zz = (PXFX.hash(u.i * 1.37 + 3, 7.7) * 2 - 1) * .75, Dl = p.TAU * swirl + (u.r3 - .5) * .6, az = th0 + Dl, sq = Math.sqrt(1 - zz * zz);
      return { r0, th0, th, T, ta: th + T, Dl, dir: [Math.cos(az) * sq, Math.sin(az) * sq, zz] };
    });
    this._pk = key; this._pv = pl;
    return pl;
  },
  // body centre, tilt and fall direction of unit u at time t (the pull, the ball, the burst)
  body(p, u, P, t, n, cs, force) {
    const C = this.C, HIT = this.HIT, a = t - P.th;
    if (t < HIT) {
      const k = p.clamp(a / P.T, 0, 1);
      if (k < 1) {
        const R = this.ballR(p, P.ta, n, cs), e = .2 * Math.sin(Math.PI * k / 2) + .8 * k * k, d = P.dir;
        const rs = R * Math.hypot(d[0], d[1]), r = p.lerp(P.r0, rs, e), ang = P.th0 + P.Dl * e;
        const zc = p.lerp(.3, C[2] + R * d[2], e) + .35 * Math.sin(Math.PI * e);
        const hl = Math.hypot(d[0], d[1]) || 1;
        return { c: [C[0] + Math.cos(ang) * r, C[1] + Math.sin(ang) * r, zc], tilt: Math.acos(d[2]) * e + Math.sin(Math.PI * e) * (2 + 3 * u.r2), tdir: [d[0] / hl, d[1] / hl], k };
      }
      const R = this.ballR(p, t, n, cs), d = this.rot(P.dir, this.spin(p, t) - this.spin(p, P.ta)), hl = Math.hypot(d[0], d[1]) || 1;
      return { c: [C[0] + d[0] * R, C[1] + d[1] * R, C[2] + d[2] * R], tilt: Math.acos(p.clamp(d[2], -1, 1)) + (u.r1 - .5) * .4, tdir: [d[0] / hl, d[1] / hl], k: 1 };
    }
    // ballistic burst from the slot it held at HIT
    const b = t - HIT, R = this.ballR(p, HIT, n, cs), d = this.rot(P.dir, this.spin(p, HIT) - this.spin(p, P.ta));
    let hl = Math.hypot(d[0], d[1]);
    const h = hl > .05 ? [d[0] / hl, d[1] / hl] : [Math.cos(u.r1 * 6.28), Math.sin(u.r1 * 6.28)];
    const z0 = C[2] + d[2] * R, rStart = R * hl, tilt0 = Math.acos(p.clamp(d[2], -1, 1)) + (u.r1 - .5) * .4;
    // landing radius, kept inside the island (radius ~4.15 about the origin)
    const px = C[0], py = C[1], pd = px * h[0] + py * h[1], sB = -pd + Math.sqrt(Math.max(0, pd * pd - (px * px + py * py - 4.15 * 4.15))) - .15;
    const RL = Math.max(rStart + .1, Math.min((1.0 + 2.6 * Math.pow(u.r1, .8)) * (.55 + .45 * force), sB));
    const vz = (.4 + 1.6 * u.r2 + 1.0 * d[2]) * Math.sqrt(force), g = 11, tl = (vz + Math.sqrt(vz * vz + 2 * g * Math.max(.01, z0 - .1))) / g;
    const m = u.r3 > .5 ? 2 : 1, endTilt = Math.PI / 2 + p.TAU * m;
    let r, zc, tilt;
    if (b < tl) { r = p.lerp(rStart, RL, b / tl); zc = z0 + vz * b - g / 2 * b * b; tilt = p.lerp(tilt0, endTilt, b / tl); }
    else { r = RL + .25 * force * p.easeOut(p.ph(b, tl, tl + .3)); zc = .1; tilt = endTilt; }
    return { c: [C[0] + h[0] * r, C[1] + h[1] * r, zc], tilt, tdir: h, k: 1, land: tl, RL };
  },
  draw(p, t) {
    const PL = this.palette, V = PL.violet, C = this.C, CAST = .85, HIT = this.HIT, b = t - HIT;
    const n = Math.round(p.param('crowd')), swirl = p.param('swirl'), cs = p.param('coreSize'), force = p.param('burstForce');
    const plan = this.plan(p, n, swirl, force);
    // ---- caster: arms spread, flinches at the blast ----
    let pose;
    if (t < .5) pose = { a: 'idle', b: 'spread', k: p.easeOutBack(p.ph(t, .12, .5), 1.4) };
    else if (t < 3.1) pose = 'spread';
    else pose = { a: 'spread', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.1, 3.9)) };
    const fig = p.figure(-3.5, .2, { pose, lean: b > 0 ? -.18 * Math.exp(-b * 5) : 0 });
    // ---- the horde ----
    const react = (s, a, u, pp, o) => {
      const B = this.body(pp, u, plan[u.i], o.t, n, cs, force), ct = Math.cos(B.tilt);
      s.x = B.c[0]; s.y = B.c[1]; s.z = Math.max(0, B.c[2] - (.08 + .22 * Math.abs(ct)));
      s.tilt = B.tilt; s.tdir = B.tdir; s.walk = null; s.spear = false;
      if (o.t >= HIT && o.t - HIT < .06) s.mat = 'white';
      if (o.t < HIT && o.t > 2.4) s.jit = .015;
    };
    const crowd = p.crowd({
      n, seed: 9, area: this.AREA, t, hit: u => plan[u.i].th, react, ramp: V, at: [C[0], C[1], 0],
      fear: u => p.ph(t, .55, 1.0) * (.35 + .4 * u.r3),
      respawn: [4.1, 4.95], clear: [3.85, 4.45], from: [1, .15],
    });
    // ---- the black core (solid) ----
    const open = p.easeOutBack(p.ph(t, .55, .85), 1.8), rc = .42 * cs * open * (1 + .15 * p.ph(t, 1.0, 2.3)) * (1 - p.easeInCubic(p.ph(t, 2.5, HIT)));
    if (rc > .01 && t < HIT) p.ball(C[0], C[1], C[2], rc, PL.core, { shadow: true });
    // the packed mass: a dark ball of armour that grows with every arrival, under the bodies stuck to it
    let arrived = 0;
    for (const P of plan) if (t >= P.ta) arrived++;
    const Rb = this.ballR(p, t, n, cs), fill = t < HIT ? Rb * .74 * Math.sqrt(arrived / plan.length) : 0;
    if (fill > rc * 1.05) p.ball(C[0], C[1], C[2], fill, PL.mass, { rough: .45, seed: 3 });
    // ---- ground marks and dust (before the void) ----
    const fade = b >= 0 ? 1 - p.ph(t, 4.0, 4.6) : 0;
    if (fade > 0) p.aftermath(C[0], C[1], 2.7, 'crack', { amt: fade, n: 8, seed: 4, ramp: V, glow: fade * (.25 + .75 * Math.pow(1 - p.ph(b, 0, 1.1), 2)), color: '#2a2030' });
    if (b > 0) {
      for (const st of crowd) {
        const P = plan[st.u.i], B = this.body(p, st.u, P, HIT + .001, n, cs, force), land = B.land || 0;
        // B.land is the flight time of this body; the puff starts when it lands
        const bt = t - HIT - land, life = p.ph(bt, 0, .55);
        if (bt < 0 || life >= 1 || st.fresh) continue;
        const L = this.body(p, st.u, P, HIT + land, n, cs, force);
        p.ball(L.c[0], L.c[1], .08 + .25 * life, .1 + .16 * life, PL.dust, { alpha: .8 * (1 - life), rough: .5, shadow: false, seed: st.u.i });
      }
    }
    // ---- the world falls into the void ----
    const dom = t < 2 ? p.easeOutCubic(p.ph(t, .45, .95)) : 1 - p.ph(t, 3.4, 4.2);
    // opens from the core; recedes towards a point far behind the field so no dark blot is left mid-frame
    if (dom > .01) p.domain({ amt: dom, c: t < 2 ? C : [C[0] - 4, C[1] - 9, 7], sky: 'void', ground: this.SKYG, solids: .1, t });
    // ---- gravitational lensing around the ball (outside it) ----
    const lens = p.env(t, .8, 1.1, 2.45, 2.62);
    if (lens > 0) {
      const R = 2.3, inner = this.ballR(p, t, n, cs) / R + .06;
      p.warp(C[0], C[1], C[2], R, (dx, dy, rho) => {
        if (rho < inner) return null;
        const th = 1.0 * lens * Math.pow(1 - rho, 2) * p.smooth(inner, inner + .12, rho), c = Math.cos(th), s = Math.sin(th);
        return [dx * c - dy * s - dx, dx * s + dy * c - dy];
      });
    }
    // ---- light: hands, charge, spiral, ring, rim ----
    const hands = p.env(t, .3, .6, 2.6, 2.8);
    if (hands > 0) for (const h of [fig.hand, fig.handL]) {
      p.glow(h[0], h[1], h[2], .2, V, .8 * hands);
      // a thin wavering thread from each hand to the core
      if (t > CAST && t < HIT) {
        const pts = [];
        for (let j = 0; j <= 8; j++) {
          const q = j / 8, w = Math.sin(q * Math.PI) * (.25 * Math.sin(t * 9 + j * 1.3 + h[1] * 3));
          pts.push([p.lerp(h[0], C[0], q), p.lerp(h[1], C[1], q) + w, p.lerp(h[2], C[2], q) + Math.sin(q * Math.PI) * .5]);
        }
        p.trail(pts, .04, .02, V, .55 * hands, .25 * hands);
      }
    }
    if (t > .3 && t < CAST + .05) p.charge(C[0], C[1], C[2], p.ph(t, .3, CAST), { n: 18, R: 2.2, ramp: V, up: .1 });
    const spiral = p.env(t, .65, 1.0, 2.45, 2.75);
    if (spiral > 0) {
      const Rs = 3.1 * p.easeOutCubic(p.ph(t, .65, 1.1)), ph = t * 1.4;
      p.decal(C[0], C[1], 0, Rs, (x, y, rho, ang) => {
        if (rho < .25) return 0;
        const v = ((ang * 3 / p.TAU + Math.log(rho) * 1.25 + ph) % 1 + 1) % 1;
        return p.band(v, .5, .16) * Math.min(1, (Rs - rho) * 1.5) * (.45 + .55 * (1 - rho / 3.1));
      }, V, .95 * spiral);
      p.light(C[0], C[1], 0, 3, V, .4 * spiral);
    }
    // accretion ring: opens with the core, collapses into it before the blast
    const ringK = p.easeOutBack(p.ph(t, .62, 1.0), 1.4) * (1 - p.easeInCubic(p.ph(t, 2.45, HIT - .03)));
    if (ringK > .01 && t < HIT) {
      const Rr = (this.ballR(p, 1.5, n, cs) + .6) * ringK, ra = t * 5 + 3 * Math.pow(p.ph(t, 2.2, HIT), 2) * 4, ax = [.22, -.38, 1];
      p.ring(C[0], C[1], C[2], Rr, .13, V, 1.05, { axis: ax, fn: a => .35 + .65 * Math.pow(.5 + .5 * Math.sin(a * 3 - ra), 3) });
      p.ring(C[0], C[1], C[2], Rr * 1.22, .04, V, .7, { axis: ax, fn: a => .3 + .7 * (.5 + .5 * Math.sin(a * 2 + ra * .7)) });
    }
    if (fill > rc * 1.05) {
      const sp = this.spin(p, t), I = .7 + .3 * Math.sin(t * 17);
      p.shell(C[0], C[1], C[2], fill * 1.02, (nx, ny, nz) => (Math.abs(p.noise(Math.atan2(ny, nx) * 1.6 + sp, nz * 3.2 + 4) - .5) < .06 ? 1 : 0), V, I, { back: 0 });
    }
    if (rc > .01 && t < HIT) {
      const cf = p.cam().fwd;
      p.ring(C[0], C[1], C[2], rc * 1.12, .05, V, 1.25, { axis: cf });
      p.glow(C[0], C[1], C[2], rc * 2.6, V, .65);
      p.light(C[0], C[1], 0, 2.2, V, .5);
    }
    // motes and streaks sucked in along spirals
    const inflow = p.env(t, .9, 1.2, 2.3, 2.6);
    if (inflow > 0) {
      const nm = Math.round(26 * p.density);
      for (let k = 0; k < nm; k++) {
        const pos = s => { const rr = 3.1 * Math.pow(1 - s, 1.3) + .3, a = p.r(k, 2) * p.TAU + s * 5; return [C[0] + Math.cos(a) * rr, C[1] + Math.sin(a) * rr, .1 + (C[2] - .1) * Math.pow(s, 1.5)]; };
        const s = ((t - 1) * (.5 + .3 * p.r(k, 3)) + p.r(k, 1)) % 1, A = pos(s), B = pos(Math.max(0, s - .05));
        p.line(A, B, .04, V, inflow * (.4 + .8 * s), { w1: .01, i1: .1 });
      }
    }
    // violet streaks behind the flying bodies
    if (t < HIT) for (const st of crowd) {
      const P = plan[st.u.i], a = t - P.th;
      if (a <= .03 || a >= P.T || st.fresh) continue;
      const B0 = this.body(p, st.u, P, t - .07, n, cs, force), B1 = this.body(p, st.u, P, t, n, cs, force);
      p.line(B1.c, B0.c, .07, V, .8, { w1: .02, i1: .1 });
    }
    // implosion: streaks rush in, the core shrinks to a white point
    if (t > 2.42 && t < HIT) {
      const u = p.ph(t, 2.42, HIT);
      const F = this.toward(p, C, this.ballR(p, t, n, cs) + .3);
      p.charge(C[0], C[1], C[2], u, { n: 18, R: 2.6, ramp: V, len: .5, seed: 7 });
      p.glow(F[0], F[1], F[2], .2 + .35 * u, V, .5 + .9 * u);
      p.sparkle(F[0], F[1], F[2], 2 + 5 * u, V, 1.3);
    }
    // ---- impact: the flash sits behind the bodies so they burst out as silhouettes ----
    if (b >= 0) {
      const fb = Math.pow(1 - p.ph(b, 0, .3), 2);
      if (fb > 0) {
        const Rf = 1.3 + 1.9 * p.easeOutExpo(b / .2), B = this.toward(p, C, -1.8);
        p.card(B[0], B[1], B[2], Rf * 2, Rf * 2, (u, v) => { const q = 1 - u * u - v * v; return q > 0 ? Math.pow(q, 1.3) : 0; }, V, 1.5 * fb);
      }
    }
    if (b >= 0 && b < .03 + 1 / 30) p.impactFrame({ ink: '#0c0616', paper: '#f6efff', accent: '#b07cff' });
    if (b >= 0) {
      p.shock(C[0], C[1], C[2], p.ph(b, 0, .55), { R: 3.6, w: .3, ramp: V, axis: p.cam().fwd, light: false });
      p.shock(C[0], C[1], .05, p.ph(b, .05, .9), { R: 4.2 * Math.sqrt(force), w: .4, ramp: V, ground: true, dust: PL.dust, dustN: 18 });
      if (b < .22) p.speedLines(C[0], C[1], C[2], { n: 20, R0: 1.0, R1: 4.6, ramp: V, I: 1 - b / .22, seed: Math.floor(t * 30) });
      // short streaks behind the bodies flung out
      if (b < .35) for (const st of crowd) {
        const P = plan[st.u.i], B0 = this.body(p, st.u, P, Math.max(HIT, t - .06), n, cs, force), B1 = this.body(p, st.u, P, t, n, cs, force);
        p.line(B1.c, B0.c, .06, V, .9 * (1 - b / .35), { w1: .02, i1: .1 });
      }
      p.light(C[0], C[1], 0, 4, V, 1.1 * Math.pow(1 - p.ph(b, 0, 1.2), 2));
    }
  },
});
