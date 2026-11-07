// 描線浮劍 / Traced Halo — Armory pack (original design): a point of light traces each sword's outline, the sword fills
// from hilt to tip and cools from white to steel; a tilted halo of swords fires round after round at the nearest
// enemies and every sword is traced again along the same outline.
PXFX.define({
  id: 'traced-halo',
  loop: 6.5,
  view: { r: 3.4, h: 2.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    trace: ['#3a4fa0', '#7f9ee8', '#cfdcff', '#ffffff'],
    hot: ['#b9c6ea', '#d8e2fb', '#eef3ff', '#ffffff', '#ffffff'],
    warm: ['#8a9cc8', '#aebee6', '#d2def8', '#eef4ff', '#ffffff'],
    cool: ['#5f6a8e', '#8590b2', '#adb6d0', '#d5dbea', '#f2f5fa'],
  },
  beats: [{ t: .35, kind: 'cast', power: .5 }, { t: 2.15, kind: 'cast', power: .8 }, { t: 2.4, kind: 'pulse', power: .6 }, { t: 3.1, kind: 'pulse', power: .6 }, { t: 3.8, kind: 'hit', power: 1.2 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 8, max: 48, step: 1, value: 24 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 7, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    swords: { zh: '浮劍數量', en: 'sword count', min: 4, max: 12, step: 1, value: 8 },
    rounds: { zh: '發射輪數', en: 'volleys', min: 1, max: 4, step: 1, value: 3 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .35], k: 'pose', zh: '特寫（2.3 倍、場景壓暗）：施法者張開雙臂，身邊一個空的傾斜光環（半徑 0.8、高 0.7、傾斜約 14 度）', en: 'close-up (2.3x, the stage dimmed): the caster spreads his arms inside an empty tilted halo (radius 0.8, height 0.7, tilted about 14 degrees)' },
    { t: [.35, 1.7], k: 'charge', zh: '第 j 把劍在 0.35 + 0.13j 秒開始描線：一個光點沿劍的輪廓（劍首、劍柄、護手、一側刃、劍尖、另一側刃、回到劍首）走 0.32 秒，畫過的線留著；接著劍由劍柄向劍尖填色 0.16 秒，前沿一條白熱線；填滿後每 0.1 秒冷卻一級：白 → 淡藍白 → 淺鋼 → 鋼，輪廓隨即碎裂；光環每秒轉 0.55 弧度，轉到施法者背後的劍被身體擋住', en: 'sword j starts at 0.35 + 0.13j s: a point of light runs its outline (pommel, grip, guard, one edge, tip, the other edge, back) in 0.32 s and the line stays; the sword then fills from hilt to tip in 0.16 s behind a white-hot front and cools one hard step every 0.1 s: white, pale blue-white, light steel, steel, while the outline breaks up; the halo turns 0.55 rad/s and swords behind the caster are hidden by his body' },
    { t: [1.65, 2.15], k: 'shape', zh: '鏡頭拉遠到戰場，8 把劍全部就位', en: 'the camera pulls back to the battlefield with all 8 swords ready' },
    { t: [2.15, 2.6], k: 'motion', zh: '第一輪 2.15 秒：每把劍 0.14 秒內帶回彈轉向目標，再沿直線加速飛出（每秒 12 格），身後一條低鋸齒閃線；目標是離施法者最近的 8 名士兵，分給槽位方向最接近的劍', en: 'volley 1 at 2.15 s: each sword snaps round (0.14 s, with overshoot) to point at its target and flies straight, accelerating (12 units/s), trailing a low zigzag streak; the targets are the 8 soldiers nearest the caster, each given to the sword whose slot points its way' },
    { t: [2.15, 4.25], k: 'impact', zh: '規則：第 r 輪（r = 0、1、2）在 2.15 + 0.7r 秒發射，第 j 把劍晚 0.04j 秒，每把劍打最近的仍站著的士兵；士兵按到施法者距離排名 < 劍數 × 輪數（8 × 3 = 24）即死；命中時間 = 發射時間 + 0.08 + 飛行距離 ÷ 12；每把劍發射 0.1 秒後，空槽沿同一條輪廓重新描線（0.2 秒）、填色（0.08 秒），趕上下一輪；排名 24 以後的士兵倖存', en: 'rule: volley r (r = 0, 1, 2) fires at 2.15 + 0.7r s, sword j 0.04j s later, each at the nearest soldier still standing; a soldier dies iff his rank by distance to the caster < swords x volleys (8 x 3 = 24); hit time = launch + 0.08 + flight distance / 12; 0.1 s after a sword leaves, its empty slot is traced again along the same outline (0.2 s) and filled (0.08 s) in time for the next volley; soldiers ranked 24 and beyond survive' },
    { t: [4.25, 6.5], k: 'after', zh: '劍插在目標上 0.25 秒後消散：實體消失，換成同形輪廓，亮芯先退、剩藍色殘影、斷成碎段與單粒像素；沒有目標的劍 5.0 秒碎掉；屍體 5.15–5.5 秒淡出、新兵 5.45–6.0 秒出現；施法者 5.3–5.8 秒放下雙臂，鏡頭 5.8–6.4 秒推回空光環特寫', en: 'each sword stays in its target for 0.25 s, then dissolves: the solid goes, an outline of the same shape loses its core, leaves a blue afterimage, splits into segments and single pixels; swords with no target break up at 5.0 s; bodies fade over 5.15–5.5 s and a fresh army appears over 5.45–6.0 s; the caster lowers his arms over 5.3–5.8 s and the camera pushes back into the empty halo over 5.8–6.4 s' },
  ],
  layers: [
    { zh: '武器：程式畫的長劍（0.62 倍、長 0.71），劍身平面朝向鏡頭並寫入深度；劍柄掛在傾斜光環的槽位上，劍尖朝上、略向外傾', en: 'weapon: procedural swords (0.62x, 0.71 long), flats facing the camera and writing depth; their hilts sit on slots of the tilted halo, tips up and leaning slightly out' },
    { zh: '路徑先行：每把劍的輪廓是一條固定的封閉路徑（15 個點：劍首、劍柄、護手、刃、劍尖），描線與重描都沿同一條路徑；打開「引導線」可看到紅綠交替的輪廓、白色描線標記、金色光環與藍色飛行路線', en: 'path first: each sword’s outline is one fixed closed path (15 points: pommel, grip, guard, edges, tip); the first trace and every re-trace run the same path; the guide toggle shows the outlines in alternating red and green, the white tracing marker, the gold halo and the blue flight lines' },
    { zh: '筆觸與色階：描線是低鋸齒閃線（1 像素白芯、淡藍、深藍邊），描線頭是四角星；填色前沿一條白熱線；冷卻四級硬色階：白 → 淡藍白 → 淺鋼 → 鋼，每級 0.1 秒，不做漸變；光環是一圈斷續的藍點，背面暗一級', en: 'stroke and tiers: the trace is a low zigzag stroke (1 px white core, pale blue, dark blue edge) with a four-point star at its head; a white-hot line marks the fill front; cooling in four hard tiers: white, pale blue-white, light steel, steel, 0.1 s each, no gradient; the halo is a broken ring of blue pixels, one tier dimmer behind' },
    { zh: '消散：劍填滿後輪廓亮芯先退、剩藍色殘影、斷成碎段與單粒像素；命中的劍插在目標上 0.25 秒，實體消失，換成同形輪廓按同樣三段消散', en: 'breakup: once a sword is filled its outline loses the core, keeps a blue afterimage, then splits into segments and single pixels; a sword that hit stays 0.25 s, then the solid goes and an outline of the same shape breaks up in the same three stages' },
    { zh: '判定與倖存：按到施法者距離排序，每輪每把劍打最近的仍站著的士兵；死亡 ⇔ 名次 < 劍數 × 輪數；陣型只改變誰先死，人數超過劍數 × 輪數時最遠的士兵倖存', en: 'rule and survivors: soldiers are ranked by distance to the caster and every volley each sword takes the nearest one still standing; a soldier dies iff his rank < swords x volleys; the formation only changes the order, and when the army is bigger than swords x volleys the farthest soldiers survive' },
    { zh: '軍隊與計數：24 名小兵（默認散兵），約施法者 40% 高；被劍釘中時閃白、原地倒下；倖存者發抖；擊殺計數全滅時變金色', en: 'army and counter: 24 soldiers (scatter by default), about 40% of the caster’s height; a soldier pinned by a sword flashes white and falls on the spot; survivors tremble; the kill counter turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是 2.3 倍的施法者與光環特寫（場景壓暗），1.65–2.1 秒拉遠到 1.18 倍的戰場，5.8–6.4 秒推回', en: 'camera: the loop opens and closes on a 2.3x close-up of the caster and the halo (stage dimmed), pulls back to a 1.18x battlefield view over 1.65–2.1 s and pushes back in over 5.8–6.4 s' },
  ],

  C: [-2.2, 0], AREA: { x: .9, y: 0, rx: 1.6, ry: 1.5 },
  ZC: .7, RR: .8, OM: .55, NR: [.2, .14, 1], SS: .62,
  T0: .35, TT: .32, TF: .16, TT2: .2, TF2: .08, F0: 2.15, RP: .7, V: 12, DISS: 5.0,
  KC: 2.3, FOCUS: [-2.2, 0, 1.0], KB: 1.18, PAYC: [-.3, 0, .45],

  near(t, p) { return 1 - p.ease(p.ph(t, 1.65, 2.1)) + p.ease(p.ph(t, 5.8, 6.4)); },
  // close-up on the caster and the halo, a slight zoom on the battlefield for the volleys
  lensAt(t, p) {
    const b = this.near(t, p), F = this.FOCUS, Q = this.PAYC, V = [0, 0, 1.5];
    return { k: this.KB + (this.KC - this.KB) * b, c: p.v3.lerp(Q, F, b), to: p.v3.lerp(Q, V, b) };
  },
  basis() {
    if (this._b) return this._b;
    const n = this.NR, l = Math.hypot(n[0], n[1], n[2]), N = [n[0] / l, n[1] / l, n[2] / l];
    let e1 = [N[2], 0, -N[0]]; const l1 = Math.hypot(...e1); e1 = e1.map(v => v / l1);
    const e2 = [N[1] * e1[2] - N[2] * e1[1], N[2] * e1[0] - N[0] * e1[2], N[0] * e1[1] - N[1] * e1[0]];
    return (this._b = { N, e1, e2 });
  },
  // slot j of S on the tilted halo at time t: hilt point and the sword's resting direction (upright, leaning out)
  slot(j, S, t) {
    const B = this.basis(), a = j / S * Math.PI * 2 + this.OM * t, c = Math.cos(a) * this.RR, s = Math.sin(a) * this.RR;
    const rx = B.e1[0] * c + B.e2[0] * s, ry = B.e1[1] * c + B.e2[1] * s, P = [this.C[0] + rx, this.C[1] + ry, this.ZC + B.e1[2] * c + B.e2[2] * s];
    const h = Math.hypot(rx, ry) || 1, d = [rx / h * .22, ry / h * .22, 1], l = Math.hypot(...d);
    return { P, a, dir: [d[0] / l, d[1] / l, d[2] / l] };
  },
  // every round each sword fires at the nearest still-standing unit (sorted by distance to the caster); targets are
  // matched to the swords whose slots point their way. Cached per layout and knobs.
  plan(units, S, R) {
    const c = this._pc;
    if (c && c.units === units && c.S === S && c.R === R) return c;
    const C = this.C, dist = u => Math.hypot(u.x - C[0], u.y - C[1]);
    const order = units.slice().sort((a, b) => dist(a) - dist(b) || a.i - b.i);
    const hitT = new Array(units.length).fill(null), inc = Array.from({ length: S }, () => []);
    const L = this.SS * 1.15;
    for (let r = 0; r < R; r++) {
      const F = this.F0 + r * this.RP, tg = order.slice(r * S, r * S + S), free = Array.from({ length: S }, (_, j) => j);
      const pick = new Array(S).fill(null);
      for (const u of tg) {
        const bu = Math.atan2(u.y - C[1], u.x - C[0]);
        let bj = 0, bd = Infinity;
        free.forEach((j, q) => { const sl = this.slot(j, S, F); let d = Math.abs(((Math.atan2(sl.P[1] - C[1], sl.P[0] - C[0]) - bu) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); if (d < bd) { bd = d; bj = q; } });
        pick[free.splice(bj, 1)[0]] = u;
      }
      for (let j = 0; j < S; j++) {
        if (r > 0 && (inc[j].length < r || !inc[j][r - 1].u)) continue;   // nothing left to fire at: no new sword is traced
        const start = r === 0 ? this.T0 + j * .13 : inc[j][r - 1].launch + .1;
        const tt = r === 0 ? this.TT : this.TT2, tf = r === 0 ? this.TF : this.TF2, u = pick[j];
        const e = { r, u, start, tt, tf, filled: start + tt + tf, launch: null, hit: null };
        if (u) {
          e.launch = F + j * (.32 / S);
          const sl = this.slot(j, S, e.launch), M = [sl.P[0] + sl.dir[0] * L / 2, sl.P[1] + sl.dir[1] * L / 2, sl.P[2] + sl.dir[2] * L / 2];
          const tgt = [u.x, u.y, .12], d = [tgt[0] - M[0], tgt[1] - M[1], tgt[2] - M[2]], dl = Math.hypot(...d), dn = [d[0] / dl, d[1] / dl, d[2] / dl];
          e.M = M; e.tgt = tgt; e.dn = dn; e.tip0 = [M[0] + dn[0] * L / 2, M[1] + dn[1] * L / 2, M[2] + dn[2] * L / 2];
          e.ft = .08 + Math.hypot(tgt[0] - e.tip0[0], tgt[1] - e.tip0[1], tgt[2] - e.tip0[2]) / this.V;
          e.hit = e.launch + e.ft; hitT[u.i] = e.hit;
        }
        inc[j].push(e);
      }
    }
    return (this._pc = { units, S, R, inc, hitT, L });
  },
  // outline of a sword (from p.weapon geometry) as one closed path, pommel -> one edge -> tip -> other edge -> pommel
  outline(p, G) {
    const ws = this.SS, sp = G.spec, u0 = G.u0, ut = u0 + .84 * (1 - u0), g = .034 * ws, gw = sp.gw * ws + .022 * ws, hw = G.hw(u0 + .01);
    const P = (u, v) => { const a = G.axis(u); return [a[0] + G.side[0] * v, a[1] + G.side[1] * v, a[2] + G.side[2] * v]; };
    const pts = [P(-.035, 0), P(.02, g), P(.15, g), P(.15, gw), P(.195, gw), P(.195, hw), P(ut, hw), P(1, 0), P(ut, -hw), P(.195, -hw), P(.195, -gw), P(.15, -gw), P(.15, -g), P(.02, -g), P(-.035, 0)];
    return p.path(pts, 0);
  },

  draw(p, t) {
    const PL = this.palette, TR = PL.trace, v3 = p.v3, seed = p.hold(t);
    const S = Math.round(p.param('swords')), R = Math.round(p.param('rounds'));
    const formation = PXFX.TROOPS[p.param('formation') | 0].id;

    // ----- caster at the centre, arms spread to hold the halo -----
    const k = p.easeOut(p.ph(t, .25, .6)) * (1 - p.ease(p.ph(t, 5.3, 5.8)));
    let push = 0;
    for (let r = 0; r < R; r++) push = Math.max(push, p.env(t, this.F0 + r * this.RP - .1, this.F0 + r * this.RP, this.F0 + r * this.RP + .15, this.F0 + r * this.RP + .45));
    const fig = p.figure(this.C[0], this.C[1], { pose: { a: 'idle', b: 'spread', k }, lift: .06 * k, lean: -.12 * push });

    // ----- the enemies -----
    const lay = { n: Math.round(p.param('crowd')), seed: 7, formation, area: this.AREA, faceTo: this.C };
    const units = p.crowdLayout(lay), pl = this.plan(units, S, R);
    const st = p.crowd(Object.assign({
      t, scale: 'auto', maxScale: .6, hit: u => pl.hitT[u.i], react: 'fall',
      fear: u => (pl.hitT[u.i] == null ? .4 * p.env(t, 2.2, 2.5, 4.6, 5.0) : .25 * p.ph(t, 1.9, 2.3)),
      respawn: [5.45, 6.0], clear: [5.15, 5.5],
    }, lay));

    // close-up: the stage goes dim so the traced light reads
    const near = this.near(t, p);
    if (near > 0) p.grade({ dark: .62 * near, desat: .35 * near, tint: '#1a1e34', tintAmt: .3 * near, bg: near });

    // ----- the swords -----
    const L = pl.L, tagged = [];
    for (let j = 0; j < S; j++) for (const e of pl.inc[j]) {
      if (t < e.start) continue;
      const end = e.hit != null ? e.hit + .6 : this.DISS + .35;
      if (t > end) continue;
      const col = j & 1 ? 'green' : 'red';
      // where the sword is: resting in its slot, aiming, flying, or stuck in its target
      let base, dir, mode;
      if (e.launch == null || t < e.launch - .14) { const sl = this.slot(j, S, t); base = sl.P; dir = sl.dir; mode = 'rest'; }
      else if (t < e.launch) {
        const q = p.easeOutBack(p.ph(t, e.launch - .14, e.launch), 1.4), sl = this.slot(j, S, t);
        dir = v3.norm(v3.lerp(sl.dir, e.dn, q));
        const M = v3.lerp([sl.P[0] + sl.dir[0] * L / 2, sl.P[1] + sl.dir[1] * L / 2, sl.P[2] + sl.dir[2] * L / 2], e.M, p.ph(t, e.launch - .14, e.launch));
        base = v3.along(M, dir, -L / 2); mode = 'aim';
      } else if (t < e.hit) {
        const q = p.easeIn(p.ph(t, e.launch, e.hit)), tip = v3.lerp(e.tip0, e.tgt, q);
        dir = e.dn; base = v3.along(tip, dir, -L); mode = 'fly';
      } else { dir = e.dn; base = v3.along(e.tgt, dir, -L * .82); mode = 'stuck'; }

      const G = p.weapon('sword', base, dir, { scale: this.SS, draw: false });
      // the trace: a point of light runs the outline; the drawn line stays until the sword is filled, then breaks up
      const tr = p.ph(t, e.start, e.start + e.tt), dissolve = e.hit == null ? p.ph(t, this.DISS, this.DISS + .3) : p.ph(t, e.hit + .25, e.hit + .55);
      const outFade = mode === 'stuck' ? .3 + .7 * dissolve : p.ph(t, e.filled, e.filled + .3) + dissolve;
      if (mode === 'rest' || mode === 'stuck') {
        const path = this.outline(p, G);
        if (tr > 0 && outFade < 1 && (mode === 'stuck' ? t > e.hit + .25 : true)) {
          p.zap(path, 0, Math.max(.01, tr), TR, { seed: seed * 7 + j * 13 + e.r * 5, jag: .5, step: 3, thick: tr < 1 ? 1 : 0, tail: .35, forks: 0, gaps: 0, fade: Math.min(1, outFade) });
          if (tr < 1) { const h = path.at(tr); p.sparkle(h[0], h[1], h[2], 2, TR, 1.2); }
        }
        if (p.guiding && mode === 'rest') p.guide(path, col, { marks: tr > 0 && tr < 1 ? [path.at(tr)] : [] });
      }
      // the fill: hilt to tip behind a white-hot front, then cooling one hard step at a time
      const fill = p.ph(t, e.start + e.tt, e.filled);
      if (fill > 0 && (mode !== 'stuck' || t < e.hit + .25)) {
        const ag = t - e.filled, ramp = ag < .1 ? PL.hot : ag < .2 ? PL.warm : ag < .32 ? PL.cool : null;
        const fu = G.u0 + (1 - G.u0) * fill, alpha = e.hit == null ? 1 - dissolve : 1;
        p.weapon('sword', base, dir, { scale: this.SS, ramp: ramp || undefined, grip: ag < .2 ? PL.warm : undefined, guard: ag < .2 ? PL.hot : undefined, alpha, pattern: fill < 1 ? (u => (u > fu ? -1 : null)) : null });
        if (fill < 1) p.line(G.at(fu, -1.1, .01), G.at(fu, 1.1, .01), .03, TR, 1.2);
        if (ag > 0 && ag < .1) p.sparkle(...G.at(1, 0, .02), 3, TR, 1.1 * (1 - ag / .1));
      }
      // flight: a jagged streak from the launch point to the tip, breaking up behind it
      if (mode === 'fly' || (mode === 'stuck' && t < e.hit + .2)) {
        const fl = p.path([e.tip0, e.tgt], 0), q = mode === 'fly' ? p.easeIn(p.ph(t, e.launch, e.hit)) : 1, fd = mode === 'stuck' ? p.ph(t, e.hit, e.hit + .2) : 0;
        p.zap(fl, Math.max(0, q - .4), Math.max(.01, q - .04), TR, { seed: seed * 11 + j * 3, jag: .6, step: 6, tail: .3, forks: 0, gaps: .1, fade: Math.max(fd, .12) });
        if (p.guiding) tagged.push([fl, mode === 'fly' ? fl.at(q) : null]);
      }
      if (mode === 'stuck' && t - e.hit < .12) {
        const a = t - e.hit, c = e.tgt;
        p.sparkle(c[0], c[1], c[2] + .12, 5, TR, 1.4 * (1 - a / .12));
        p.light(c[0], c[1], 0, .5, TR, .5 * (1 - a / .12));
      }
    }
    if (p.guiding) for (const [fl, m] of tagged) p.guide(fl, 'blue', { marks: m ? [m] : [] });
    // the halo track itself: a broken ring while swords rest on it, one tier dimmer on its far side
    const cfw = p.cam().fwd;
    if (t > .3 && t < this.DISS + .3) {
      const B = this.basis(), hp = p.path(q => { const a = q * Math.PI * 2, c = Math.cos(a) * this.RR, s = Math.sin(a) * this.RR; return [this.C[0] + B.e1[0] * c + B.e2[0] * s, this.C[1] + B.e1[1] * c + B.e2[1] * s, this.ZC + B.e1[2] * c + B.e2[2] * s]; }, 64);
      p.zap(hp, 0, 1, TR, { seed: seed * 5, jag: .3, step: 3, thick: 0, gaps: .15, forks: 0, back: q => q[0] * cfw[0] + q[1] * cfw[1] + q[2] * cfw[2] < this.C[0] * cfw[0] + this.C[1] * cfw[1], fade: .5 + .5 * p.ph(t, this.DISS, this.DISS + .3) });
      if (p.guiding) p.guide(hp, 'gold');
    }

    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 1.95, 2.15) * (1 - p.ph(t, 5.25, 5.45)) });
  },
});
