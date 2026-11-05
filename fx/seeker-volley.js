// 追魂彈幕 / Seeker Volley — Scale Ladder pack (original design), tier 10: violet bolts gather in a ring round the caster, lock onto the nearest soldiers one each and home in on their own curved paths
PXFX.define({
  id: 'seeker-volley',
  loop: 4.5,
  beats: [{ t: 1.3, kind: 'cast', power: .8 }, { t: 1.58, kind: 'hit', power: 1.2 }, { t: 2.38, kind: 'pulse', power: .55 }],
  view: { r: 3.6, h: 3.0 },
  stage: { ground: 'slate' },
  modules: ['figure', 'charge', 'core', 'swarm', 'crowd', 'troops', 'impact', 'aftermath', 'tally'],
  palette: {
    arcane: ['#5a2a9a', '#7a44c8', '#a070f0', '#c9a0ff', '#eadcff', '#ffffff'],
    mark: ['#8a3ad0', '#c070ff', '#f0c8ff', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者（高 1.5）站在 (−2.4, 0)，0.3–0.6 秒張開雙臂；十個敵兵（高約 0.9）散兵陣散佈在中心 (0.9, 0)、半深 1.7、半寬 1.5 的橢圓內', en: 'pose: the caster (1.5 tall) stands at (−2.4, 0) and spreads both arms at 0.3–0.6 s; ten soldiers (~0.9 tall) stand in a loose scatter inside an ellipse centred at (0.9, 0), half depth 1.7, half width 1.5' },
    { k: 'charge', t: [.45, 1.3], zh: '集氣：施法者肩高 1.35 處出現一圈半徑 0.7 的淡紫光環，0.45–1.05 秒內 bolts（10）顆紫色魔彈逐顆以回彈緩動彈出（每顆亮一圈小光環），光環慢慢轉動、魔彈上下浮動；每出現一顆，就有一個敵兵（按與施法者距離由近到遠）腳下亮起鎖定圈、頭上閃菱形標記，閃 4 下後常亮；被鎖定者發抖', en: 'charge: a faint violet ring of radius 0.7 appears at shoulder height 1.35 round the caster and over 0.45–1.05 s `bolts` (10) violet bolts pop in one by one with an overshoot (each with a small flash ring), the ring slowly turning and the bolts bobbing; with each new bolt one soldier (nearest to the caster first) gets a lock-on circle at its feet and a diamond above its head that blinks 4 times and then stays lit; locked soldiers tremble' },
    { k: 'shape', t: [1.18, 1.3], zh: '成形：1.18–1.3 秒施法者收臂指向敵陣，魔彈由 1.3 秒起每隔 0.05 秒依次發射，先向外上方甩開成扇形', en: 'shape: at 1.18–1.3 s the caster swings an arm to point at the enemy; from 1.3 s the bolts launch one every 0.05 s, first kicking outwards and upwards into a fan' },
    { k: 'motion', t: [1.3, 2.4], zh: '推進：每顆魔彈沿自己的三次貝茲曲線追向目標胸口（起點 = 光環上的位置，控制點 1 = 向外上方甩出，控制點 2 = 目標前方再向側面偏移 turn（0.6）× 距離 × 0.55），沿弧長由慢到快加速，身後拖 6 段漸細紫色光尾；判定：按與施法者距離排序的前 bolts（10）個敵兵各分配一顆魔彈，其餘倖存；命中時間 = 1.3 + 序號 × 0.05 + 路徑長 ÷ 9 秒', en: 'motion: each bolt homes on its target’s chest along its own cubic Bézier (start = its slot on the ring, control 1 = kicked outwards and up, control 2 = in front of the target pushed sideways by turn (0.6) × distance × 0.55), speeding up along the arc length, with a 6-segment tapering violet trail; area test: the first `bolts` (10) units sorted by distance from the caster get one bolt each, the rest survive; hit time = 1.3 + index × 0.05 + path length / 9 s' },
    { k: 'impact', t: [1.58, 2.6], zh: '命中：第一顆命中時頓幀＋震屏；每次命中一團紫白爆光、一圈面向鏡頭的光環、6 點火花、地面受光，目標閃白後沿魔彈來向被輕輕擊飛（約一半向上彈起翻身，其餘拋物線翻滾後躺下），身上殘留紫光 0.2 秒，鎖定標記同時碎散；未被鎖定的敵兵四處張望後縮身', en: 'impact: hit-stop and shake on the first impact; each hit is a violet-white pop, a camera-facing ring, 6 sparks and lit ground; the target flashes white and is knocked lightly along the bolt’s incoming direction (about half bounce up and flip, the rest tumble on a parabola and lie down) with a violet glow for 0.2 s, and its lock-on mark shatters; soldiers that were never locked look around and flinch' },
    { k: 'after', t: [2.6, 4.5], zh: '餘波：每個命中點留下紫色星形焦痕，0.6 秒內冷卻淡出，施法者在 2.5–3.1 秒收手回到站姿；屍體在 3.3–3.9 秒淡出，擊殺計數同時淡出，新一批敵兵由側面走回原位', en: 'aftermath: each impact leaves a violet star-shaped burn that cools and fades within 0.6 s, and the caster lowers the arm to idle at 2.5–3.1 s; the bodies fade at 3.3–3.9 s together with the kill counter, and a fresh squad walks in from the side back to its spots' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→張臂→指向→待機，面向敵陣重心', en: 'caster: faceless mannequin, poses idle → arms spread → point → idle, facing the formation centroid' },
    { zh: '敵陣：5–20 個 3D 小兵（自動縮放，上限 1.5 倍），金盔配色，按陣型（預設散兵）排在中心 (0.9, 0)、半深 1.7、半寬 1.5 的範圍內；擊殺計數「已擊殺／總數」，全滅時轉金色', en: 'formation: 5–20 3D soldiers (auto scale, capped at 1.5×) with gold helmets, in a formation (default scatter) inside an area centred at (0.9, 0), half depth 1.7, half width 1.5; the kill counter "killed / total" turns gold on a full wipe' },
    { zh: '判定與倖存：每個目標單獨判定；按與施法者距離排序，前 bolts 個各分配一顆魔彈（一對一，沒有濺射），鎖定圈只出現在這些目標腳下；其餘敵兵沒有標記，全程站立，只會張望縮身', en: 'area test and survivors: per target; sorted by distance from the caster, the first `bolts` get one bolt each (one to one, no splash) and only they get a lock-on circle; everyone else is unmarked, stays standing and only looks around and flinches' },
    { zh: '魔彈：硬邊紫白光球（半徑 0.055，飛行時 0.07）＋光暈（半徑 0.13，飛行時 0.17），待發時在光環上浮動；飛行時沿曲線取樣畫 6 段漸細光尾，前端拉長', en: 'bolts: a hard violet-white orb (radius 0.055, 0.07 in flight) with a halo (radius 0.13, 0.17 in flight), bobbing on the ring while waiting; in flight a 6-segment tapering trail sampled along the curve, stretched at the front' },
    { zh: '鎖定標記：目標腳下一個淡紫圓圈加 4 條刻度、頭上一個發光菱形，出現時閃 4 下（每 1/12 秒），命中瞬間碎散成 4 點', en: 'lock-on mark: a faint violet circle with 4 ticks at the target’s feet and a glowing diamond over its head, blinking 4 times (every 1/12 s) as it appears and bursting into 4 dots on the hit' },
    { zh: '路徑：三次貝茲曲線，以 24 點取樣計算弧長並緩存；沿弧長位置 = 弧長 ×（0.6u + 0.4u²），抵達時間不變而速度先慢後快', en: 'paths: cubic Béziers sampled at 24 points for arc length (cached); position along the arc = length × (0.6u + 0.4u²), so the arrival time stays exact while the bolt starts slow and speeds up' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 5, max: 20, step: 1, value: 10 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 7, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    bolts: { zh: '魔彈數量', en: 'bolt count', min: 1, max: 20, step: 1, value: 10 },
    turn: { zh: '追蹤弧度', en: 'homing curve', min: 0, max: 1, step: .05, value: .6 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  C: [-2.4, 0],
  AREA: { x: .9, y: 0, rx: 1.7, ry: 1.5 },
  LAUNCH: 1.3, ST: .05, V: 9, RING: .7, RZ: 1.35, APPEAR: [.45, 1.05],
  // ring slot of bolt k (the ring turns slowly)
  slot(k, N, t) {
    const a = (k + .5) / N * Math.PI * 2 + t * .9 + Math.PI;
    return [this.C[0] + Math.cos(a) * this.RING, this.C[1] + Math.sin(a) * this.RING, this.RZ + .05 * Math.sin(t * 5 + k * 1.7), a];
  },
  // targets, one Bézier per bolt, arc lengths and hit times (cached per layout / knobs / pawn scale)
  plan(p, units, nb, turn, sc) {
    const c = this._pc;
    if (c && c.units === units && c.nb === nb && c.turn === turn && c.sc === sc) return c;
    const C = this.C, order = units.slice().sort((a, b) => Math.hypot(a.x - C[0], a.y - C[1]) - Math.hypot(b.x - C[0], b.y - C[1]));
    const tg = order.slice(0, Math.min(nb, units.length)), N = tg.length, hitT = new Array(units.length).fill(null), bolts = [];
    let mx = 0, my = 0;
    for (const u of units) { mx += u.x; my += u.y; }
    mx /= units.length; my /= units.length;
    const ax = p.v3.norm([mx - C[0], my - C[1], 0]);
    const zc = .1 + .3 * sc;
    tg.forEach((u, k) => {
      const t0 = this.LAUNCH + k * this.ST, P0 = this.slot(k, N, t0), sa = P0[3];
      const P3 = [u.x, u.y, zc], f = p.v3.norm([P3[0] - P0[0], P3[1] - P0[1], 0]), sd = [-f[1], f[0], 0];
      const D = Math.hypot(P3[0] - P0[0], P3[1] - P0[1]);
      const lat = (u.x - C[0]) * -ax[1] + (u.y - C[1]) * ax[0], sg = Math.abs(lat) < .2 ? (k % 2 ? 1 : -1) : Math.sign(lat);
      const kick = .55 + .5 * turn, rad = [Math.cos(sa), Math.sin(sa), 0];
      const P1 = [P0[0] + (rad[0] * .7 + f[0] * .5) * kick, P0[1] + (rad[1] * .7 + f[1] * .5) * kick, P0[2] + .55 * kick];
      const so = sg * turn * D * .55;
      const P2 = [P3[0] - f[0] * D * .3 + sd[0] * so, P3[1] - f[1] * D * .3 + sd[1] * so, P3[2] + .45 + .35 * turn];
      const pts = [];
      let L = 0;
      for (let j = 0; j <= 24; j++) {
        const s = j / 24, m = 1 - s, w0 = m * m * m, w1 = 3 * m * m * s, w2 = 3 * m * s * s, w3 = s * s * s;
        const q = [w0 * P0[0] + w1 * P1[0] + w2 * P2[0] + w3 * P3[0], w0 * P0[1] + w1 * P1[1] + w2 * P2[1] + w3 * P3[1], w0 * P0[2] + w1 * P1[2] + w2 * P2[2] + w3 * P3[2]];
        if (j) L += Math.hypot(q[0] - pts[j - 1][0], q[1] - pts[j - 1][1], q[2] - pts[j - 1][2]);
        q.push(L); pts.push(q);
      }
      const th = t0 + L / this.V;
      hitT[u.i] = th;
      bolts.push({ u, k, t0, th, L, pts, P2, tm: this.APPEAR[0] + (this.APPEAR[1] - this.APPEAR[0]) * (N > 1 ? k / (N - 1) : 0) });
    });
    // survivors flinch at the nearest impact
    const fl = new Float64Array(units.length).fill(-9);
    for (const u of units) {
      if (hitT[u.i] != null) continue;
      let bd = Infinity;
      for (const b of bolts) { const dd = Math.hypot(b.u.x - u.x, b.u.y - u.y); if (dd < bd) { bd = dd; fl[u.i] = b.th; } }
    }
    const first = bolts.reduce((m, b) => Math.min(m, b.th), Infinity), last = bolts.reduce((m, b) => Math.max(m, b.th), 0);
    this._pc = { units, nb, turn, sc, bolts, hitT, fl, N, first, last, ax };
    return this._pc;
  },
  // position on a bolt's path at arc length l
  at(b, l) {
    const P = b.pts;
    if (l <= 0) return P[0];
    for (let j = 1; j < P.length; j++) if (P[j][3] >= l) { const k = (l - P[j - 1][3]) / (P[j][3] - P[j - 1][3] || 1); return [P[j - 1][0] + (P[j][0] - P[j - 1][0]) * k, P[j - 1][1] + (P[j][1] - P[j - 1][1]) * k, P[j - 1][2] + (P[j][2] - P[j - 1][2]) * k]; }
    return P[P.length - 1];
  },
  draw(p, t) {
    const PL = this.palette, AR = PL.arcane, MK = PL.mark, C = this.C, LAUNCH = this.LAUNCH;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id, nb = Math.round(p.param('bolts')), turn = p.param('turn');
    const co = { n, seed: 9, formation: form, area: this.AREA, faceTo: C };
    const units = p.crowdLayout(co);
    // the auto pawn scale (same rule as the kit) sets the chest height the bolts aim at
    const sc = p.clamp((units.spacing || .4) / .4, .08, 1.5), pl = this.plan(p, units, nb, turn, sc);
    const face = Math.atan2(pl.ax[1], pl.ax[0]);
    // ---- caster ----
    let pose;
    if (t < .3) pose = 'idle';
    else if (t < 1.18) pose = { a: 'idle', b: 'spread', k: p.easeOutBack(p.ph(t, .3, .6), 1.2) };
    else if (t < 2.5) pose = { a: 'spread', b: 'point', k: p.easeOutExpo(p.ph(t, 1.18, 1.3)) };
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.5, 3.1)) };
    const fig = p.figure(C[0], C[1], { pose, face, lean: t > LAUNCH ? -.1 * Math.exp(-(t - LAUNCH) * 8) : 0 });
    // ---- the squad ----
    const bolt = new Map();
    for (const b of pl.bolts) bolt.set(b.u.i, b);
    const react = (s, a, u, pp, o) => {
      (u.r2 < .5 ? PXFX.REACT.launch : PXFX.REACT.knock)(s, a, u, pp, o);
      s.glow = a < .2 ? 1 - a / .2 : 0;
      s.face = u.face + (u.r1 - .5) * 3 * pp.easeOutCubic(Math.min(1, a / .5));
    };
    const crowd = p.crowd(Object.assign({
      t, scale: 'auto', maxScale: 1.5, pal: 'gold', ramp: AR,
      hit: u => pl.hitT[u.i], react, power: u => .55 + .35 * u.r3,
      at: u => { const b = bolt.get(u.i); return b ? [b.P2[0], b.P2[1], 0] : [C[0], C[1], 0]; },
      fear: u => {
        const b = bolt.get(u.i);
        if (b) return .55 * p.ph(t, b.tm, b.tm + .3);
        return Math.max(.25 * p.ph(t, .6, 1.2) * (1 - p.ph(t, 1.6, 2.2)), p.env(t, pl.fl[u.i] - .02, pl.fl[u.i] + .06, pl.fl[u.i] + .3, pl.fl[u.i] + .8));
      },
      respawn: [3.55, 4.4], clear: [3.3, 3.9], from: [.3, 1], enterD: 1.0,
    }, co));
    const zc = .1 + .3 * crowd.scale;
    // ---- ground: violet star burns where bolts struck (solids pass) ----
    for (const b of pl.bolts) {
      const a = t - b.th;
      if (a < 0 || a > 1.3) continue;
      const amt = 1 - p.ph(a, .6, 1.3), sd = b.k * 1.7;
      p.stain(b.u.x, b.u.y, .38, (dx, dy, rho, ang) => (1 - rho / .38) * (.8 + .8 * Math.abs(Math.cos(ang * 2.5 + sd))), '#2a1838', amt);
    }
    // ---- light ----
    const N = pl.N, cf = p.cam().fwd;
    // the summoning ring at shoulder height
    const ringI = p.env(t, .4, .6, LAUNCH, LAUNCH + .4 + N * this.ST);
    if (ringI > 0) p.ring(C[0], C[1], this.RZ, this.RING, .02, AR, .35 * ringI);
    if (t > .35 && t < LAUNCH + .1) {
      p.light(C[0], C[1], 0, 1.4, AR, .45 * p.ph(t, .35, 1.0));
      p.charge(fig.chest[0], fig.chest[1], this.RZ, p.ph(t, .35, 1.15), { n: 12, R: 1.3, ramp: AR, up: .1 });
    }
    for (const b of pl.bolts) {
      const k = b.k;
      // lock-on mark over the target: blinks 4 times, then steady until the hit
      const lm = t - b.tm - .04;
      if (lm > 0 && t < b.th + .25) {
        const st = crowd[b.u.i], on = lm > .33 || Math.floor(lm * 12) % 2 === 0, near = p.ph(t, b.th - .3, b.th);
        if (t < b.th && on) {
          const rr = .2 + .12 * crowd.scale, I = .7 + .5 * near;
          p.ring(b.u.x, b.u.y, .02, rr * (1 + .5 * (1 - p.easeOutCubic(Math.min(1, lm / .15)))), .03, MK, I);
          for (let j = 0; j < 4; j++) {
            const a = j * Math.PI / 2 + t * 2, cx = Math.cos(a), sx = Math.sin(a);
            p.line([b.u.x + cx * rr * 1.1, b.u.y + sx * rr * 1.1, .02], [b.u.x + cx * rr * 1.5, b.u.y + sx * rr * 1.5, .02], .03, MK, I);
          }
          const h = [st.head[0] + cf[0] * .2, st.head[1] + cf[1] * .2, st.head[2] + .3 + .03 * Math.sin(t * 9 + k)];
          const up = p.cam().up, rt = p.cam().right, dd = .09;
          const q = [[0, 1], [1, 0], [0, -1], [-1, 0]].map(([x, y]) => [h[0] + rt[0] * x * dd + up[0] * y * dd * 1.3, h[1] + rt[1] * x * dd + up[1] * y * dd * 1.3, h[2] + rt[2] * x * dd + up[2] * y * dd * 1.3]);
          for (let j = 0; j < 4; j++) p.line(q[j], q[(j + 1) % 4], .03, MK, 1.1 * I);
        } else if (t >= b.th) {
          // the mark shatters into 4 dots
          const a = t - b.th, h = [b.u.x, b.u.y, zc + .45];
          for (let j = 0; j < 4; j++) {
            const d = p.rdir(k * 5 + j, 71, .4), r0 = p.drag(1.6, 8, a);
            p.dot(h[0] + d[0] * r0, h[1] + d[1] * r0, h[2] + d[2] * r0, MK, 1.1 * (1 - a / .25), 2);
          }
        }
      }
      // the bolt: pops into its slot, waits, launches, homes in
      if (t < b.tm || t >= b.th) continue;
      let pos, trail = null;
      if (t < b.t0) {
        pos = this.slot(k, N, t);
        const g = p.easeOutBack(p.ph(t, b.tm, b.tm + .14), 2);
        const pa = t - b.tm;
        if (pa < .14) p.ring(pos[0], pos[1], pos[2], .05 + .14 * p.easeOutExpo(pa / .14), .025, MK, 1.1 * (1 - pa / .14), { axis: cf });
        this.orb(p, pos, g, 1);
        if (t > b.t0 - .08) p.glow(pos[0], pos[1], pos[2], .18, MK, .6 * p.ph(t, b.t0 - .08, b.t0));
      } else {
        const T = b.th - b.t0, e = q => { const x = p.clamp(q, 0, 1); return b.L * (.6 * x + .4 * x * x); }, u = (t - b.t0) / T;
        pos = this.at(b, e(u));
        trail = [pos];
        for (let j = 1; j <= 6; j++) trail.push(this.at(b, e(u - j * .035)));
        p.trail(trail, .12, .02, AR, 1.2, .2);
        const fw = this.at(b, e(u + .03));
        p.line(pos, fw, .1, MK, 1.2, { w1: .04 });
        this.orb(p, pos, 1.3, 1.2);
        p.light(pos[0], pos[1], 0, .7, AR, .35);
      }
    }
    // impacts: pop, ring, sparks
    for (const b of pl.bolts) {
      const a = t - b.th;
      if (a < 0 || a > .45) continue;
      const h = [b.u.x + cf[0] * .3, b.u.y + cf[1] * .3, zc + cf[2] * .3];
      if (a < .1) p.glow(h[0], h[1], h[2], .3, AR, 1.3 * Math.pow(1 - a / .1, 2));
      if (a < .2) p.ring(h[0], h[1], h[2], .1 + .35 * p.easeOutExpo(a / .2), .05 * (1 - a / .2) + .015, MK, 1.2 * (1 - a / .2), { axis: cf });
      if (a < .06) p.sparkle(h[0], h[1], h[2] + .05, 5, MK, 1.5);
      const ns = Math.round(6 * p.density);
      for (let j = 0; j < ns; j++) {
        const d = p.rdir(b.k * 13 + j, 17, .5), r0 = p.drag(2.4, 7, a), q = [b.u.x + d[0] * r0, b.u.y + d[1] * r0, Math.max(.03, zc + d[2] * r0 - 2.5 * a * a)];
        p.line(q, [q[0] - d[0] * .1, q[1] - d[1] * .1, q[2] - d[2] * .1], .03, AR, 1.2 * (1 - a / .45), { w1: .01 });
      }
      if (a < .3) p.light(b.u.x, b.u.y, 0, 1.0, AR, .8 * (1 - a / .3));
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, 3.3, 3.75) });
  },
  // a bolt orb: halo + hard core, g = pop-in scale
  orb(p, pos, g, I) {
    const AR = this.palette.arcane;
    p.glow(pos[0], pos[1], pos[2], .13 * g, AR, .6 * I);
    p.orb(pos[0], pos[1], pos[2], .055 * g, AR, I);
  },
});
