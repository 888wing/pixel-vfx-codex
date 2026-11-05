// 滾雷跳彈 / Thunder Bounce — Scale Ladder pack (original design), tier 100: a crackling ball of lightning bounces from squad to squad, bursting into a growing ring of lightning at every landing
PXFX.define({
  id: 'thunder-bounce',
  loop: 5.5,
  beats: [{ t: 1.0, kind: 'cast', power: .6 }, { t: 1.5, kind: 'pulse', power: .7 }, { t: 1.87, kind: 'pulse', power: .5 }, { t: 2.24, kind: 'pulse', power: .55 }, { t: 2.62, kind: 'pulse', power: .6 }, { t: 3.1, kind: 'hit', power: 1.45 }],
  view: { r: 4.8, h: 3.4 },
  stage: { ground: 'slate' },
  modules: ['figure', 'charge', 'core', 'crowd', 'troops', 'tally', 'domain', 'shockwave', 'impact', 'aftermath'],
  palette: {
    storm: ['#3b3fae', '#4a6ad8', '#5aa0f0', '#9fe8ff', '#d4f6ff', '#f6fdff'],
    ball: ['#4a6ad8', '#7ab8ff', '#bfeaff', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .75], zh: '起手：施法者（位於 x = −3.5）由站姿後拉右手；一百名敵兵分成 5 支分隊（每隊約 20 人、5×4 方塊），散佈在中心 (1.2, 0)、半寬 2.1 的範圍內', en: 'pose: the caster (at x = −3.5) draws the right hand back; a hundred soldiers stand in 5 squads (about 20 each, 5×4 blocks) spread over a 2.1 half-size area centred at (1.2, 0)' },
    { k: 'charge', t: [.2, 1.0], zh: '集氣：天空在 0.8 秒內轉成深藍雷雲，手中凝出一顆劈啪作響的雷球（半徑 0.1 的白藍光球＋3 條短電弧），14 道藍白電光匯聚到手上', en: 'charge: the sky turns to dark blue storm clouds over 0.8 s and a crackling ball of lightning (a white-blue orb of radius 0.1 with 3 short arcs) forms in the hand while 14 blue-white streaks converge on it' },
    { k: 'shape', t: [1.0, 1.5], zh: '成形：1.0 秒擲出（擲出時間 = 第一個落點 − 0.5 秒），雷球沿高 1.2 的弧線用 0.5 秒飛到第一個落點；落點預先計算一次：由施法者出發，第 k 個落點 = 離上一個落點最近的存活敵兵，再向它爆炸半徑內存活敵兵的重心移動 80%', en: 'shape: at 1.0 s (the throw is always 0.5 s before landing 0) the ball is thrown along a 1.2-high arc and lands 0.5 s later; landings are computed once: starting from the caster, landing k = the nearest still-alive unit to landing k−1, nudged 80% towards the centroid of the alive units inside its blast radius' },
    { k: 'motion', t: [1.5, 3.1], zh: '推進：共 彈跳次數（5）個落點，每段弧線高 0.35 + 0.3 × 距離，最後一個落點固定在 3.1 秒，之前每跳間隔 min(0.4, 1.6 ÷ (彈跳次數 − 0.7)) 秒（預設約 0.37 秒），最後一跳滯空多 30%，雷球每跳變大 15%；每次落地炸開一圈閃電環，半徑 r_k = 爆炸半徑（0.9）× 1.15^k，最後一跳 × 1.6；環以每秒 7 單位擴張，鋸齒閃電圈＋5 條放射電弧，地面留下焦黑圓圈。判定：敵兵在第 k 個落點 r_k 以內即中招（取最早的 k），命中時間 = 落地時間 + 距離 ÷ 7；中招者黑白閃爍抽搐 0.55 秒後倒下', en: 'motion: `bounces` (5) landings in all, each hop an arc 0.35 + 0.3 × distance high; the last landing is always at 3.1 s and the hops before it are min(0.4, 1.6 / (bounces − 0.7)) s apart (~0.37 s by default), the last hop hanging 30% longer, the ball growing 15% per bounce; every landing bursts into a ring of lightning of radius r_k = burst radius (0.9) × 1.15^k, ×1.6 on the last, expanding at 7 units/s as a jagged lightning circle with 5 radial arcs and leaving a scorched circle. Area test: a unit is hit if it is within r_k of landing k (earliest k wins); hit time = landing time + distance / 7; hit soldiers flicker white/charred for 0.55 s, then fall' },
    { k: 'impact', t: [3.1, 3.5], zh: '命中：最後一跳（3.1 秒）雷球最大，一道比畫面還高的巨雷同時劈下，1 格黑白衝擊格＋頓幀，r = 2.6 的閃電環與衝擊環、放射速度線', en: 'impact: on the last landing (3.1 s) the ball is at its biggest and a bolt taller than the frame strikes with it: one two-tone impact frame and a hit-stop, a lightning ring and shock ring of r = 2.6 and radial speed lines' },
    { k: 'after', t: [3.5, 5.5], zh: '餘波：未被波及的分隊站著發抖並倖存；焦黑圓圈與倒地的焦黑屍體冒煙，雷雲 3.6–4.4 秒散去，4.2–4.8 秒屍體與擊殺計數淡出，新一批敵兵由右邊走回原位', en: 'aftermath: any untouched squad stands trembling and survives; the scorched circles and charred bodies smoke, the storm clears at 3.6–4.4 s, and at 4.2–4.8 s the bodies and the kill counter fade while a fresh company walks back in from the right' },
  ],
  layers: [
    { zh: '敵陣：50–200 名敵兵（預設 100），按陣型排在中心 (1.2, 0)、半寬 2.1×2.1 的範圍內（預設分隊：約每 22 人一隊），兵距決定大小（3D 小兵）；角落的擊殺計數「骷髏 已擊殺／總數」即時累加，全滅時變金色', en: 'company: 50–200 soldiers (default 100) in a formation inside a 2.1×2.1 half-size area centred at (1.2, 0) (default squads: about one squad per 22 soldiers), sized by their spacing (3D pawns); a kill counter "skull killed/total" in the corner counts up live and turns gold on a full wipe' },
    { zh: '彈跳落點（只算一次並快取）：用空間格網查詢；落點 k = 離上一落點最近的存活敵兵向半徑 r_k 內存活敵兵的重心移動 80%，然後殺死 r_k 內所有存活敵兵，再找下一個；所有敵兵死光就提早結束', en: 'bounce landings (computed once and cached): a spatial grid answers the radius queries; landing k = the nearest alive unit to the previous landing moved 80% towards the centroid of the alive units within r_k, then every alive unit within r_k dies and the next landing is found; the chain stops early if nobody is left' },
    { zh: '判定與倖存者：命中 ⇔ 存在 k 使與落點 k 的距離 ≤ r_k = 爆炸半徑 × 1.15^k（最後一跳再 × 1.6），取最早的 k；命中時間 = 落地時間 + 距離 ÷ 7；畫出的閃電環與焦黑圓圈用同一個 r_k；彈跳次數用完後沒被波及的分隊發抖但倖存', en: 'area test and survivors: hit ⇔ some landing k has distance ≤ r_k = burst radius × 1.15^k (×1.6 on the last), earliest k wins; hit time = landing time + distance / 7; the drawn lightning ring and the scorched circle use the same r_k; once the bounces run out any untouched squad trembles but survives' },
    { zh: '雷球：白藍硬邊光球＋光暈＋3 條每 1/30 秒換種子的短電弧，拖 5 點殘光；半徑 0.1 × 1.15^k，最後一跳 × 1.5', en: 'ball: a white-blue hard orb with a halo and 3 short arcs reseeded every 1/30 s, trailing 5 motes; radius 0.1 × 1.15^k, ×1.5 on the last hop' },
    { zh: '閃電環：沿目前半徑的圓周由 10–26 段鋸齒閃電首尾相接，5 條由落點射出的放射電弧，落點閃白光、地面光池；環到達 r_k 後停留 0.15 秒再淡出；地面留下 r_k 大小的焦黑圓（邊緣一圈更深）', en: 'lightning ring: 10–26 jagged bolts joined head to tail around the current radius, 5 radial arcs from the landing, a white flash and a pool of ground light; the ring holds 0.15 s at r_k, then fades; a scorched circle of r_k (darker edge) stays on the ground' },
    { zh: '天空：領域模組把頁面換成深藍雷雲、地面換成深石板藍，閃電保持高亮', en: 'sky: the domain module swaps the page for dark blue storm clouds and the ground for dark slate while the lightning stays bright' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 50, max: 200, step: 1, value: 100 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 6, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    bounces: { zh: '彈跳次數', en: 'bounces', min: 1, max: 9, step: 1, value: 5 },
    radius: { zh: '爆炸半徑', en: 'burst radius', min: .4, max: 1.6, step: .1, value: .9 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.1, ry: 2.1 },
  SKY: { top: '#060914', bottom: '#162038', nebula: '#26324f', stars: 0 },
  GROUND: ['#121827', '#1a2234', '#232d44', '#2e3a56'],
  CASTER: [-3.5, 0],
  TF: 3.1, V: 7,
  // landing times: the last (big) landing is always at 3.1 s; the hops before it are evenly spaced (~0.37 s, at most
  // 0.4 s, squeezed to fit after 1.5 s) and the last hop hangs 30% longer. The throw leaves 0.5 s before landing 0
  times(nb) {
    const hop = nb > 1 ? Math.min(.4, 1.6 / (nb - 1 + .3)) : 0, T = [];
    for (let k = 0; k < nb; k++) T.push(this.TF - (k === nb - 1 ? 0 : (nb - 1 - k + .3) * hop));
    return T;
  },
  // greedy bounce chain over the layout (cached per layout and knobs)
  chain(p, units, nb, radius) {
    const key = nb + '|' + radius;
    if (this._bu === units && this._bk === key) return this._bv;
    const grid = p.crowdGrid(units), N = units.length, alive = new Uint8Array(N).fill(1), hitK = new Int16Array(N).fill(-1), hitD = new Float32Array(N);
    const lands = [];
    let left = N, px = this.CASTER[0], py = this.CASTER[1];
    for (let k = 0; k < nb && left > 0; k++) {
      let best = null, bd = Infinity;
      for (const u of units) if (alive[u.i]) { const d = (u.x - px) ** 2 + (u.y - py) ** 2; if (d < bd) { bd = d; best = u; } }
      const r = radius * Math.pow(1.15, k) * (k === nb - 1 ? 1.6 : 1);
      let sx = 0, sy = 0, c = 0;
      for (const u of grid.near(best.x, best.y, r)) if (alive[u.i]) { sx += u.x; sy += u.y; c++; }
      const lx = best.x + (sx / c - best.x) * .8, ly = best.y + (sy / c - best.y) * .8;
      for (const u of grid.near(lx, ly, r)) if (alive[u.i]) { alive[u.i] = 0; left--; hitK[u.i] = k; hitD[u.i] = Math.hypot(u.x - lx, u.y - ly); }
      lands.push({ x: lx, y: ly, r, k, final: k === nb - 1 });
      px = lx; py = ly;
    }
    // the chain ran out of targets early: the last landing still gets the finale (its kills are unchanged)
    const last = lands[lands.length - 1];
    if (last && !last.final) { last.final = true; last.r = Math.max(last.r, radius * Math.pow(1.15, last.k) * 1.6); }
    const T = this.times(lands.length);   // (an early end is re-timed so the finale still lands at 3.1 s)
    lands.forEach((L, k) => { L.t = T[k]; });
    this._bu = units; this._bk = key; this._bv = { lands, hitK, hitD };
    return this._bv;
  },
  draw(p, t) {
    const PL = this.palette, S = PL.storm, V = this.V;
    const nb = Math.round(p.param('bounces')), radius = p.param('radius');
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const CL = [4.2, 4.8], RS = [4.4, 5.35];
    const lay = { n, seed: 6, area: this.AREA, formation: form };
    const units = p.crowdLayout(lay), B = this.chain(p, units, nb, radius), LD = B.lands, NL = LD.length;
    const fin = LD[NL - 1], HIT = fin.t, CAST = LD[0].t - .5;
    // ---- caster: wind up, throw, follow through ----
    let pose;
    if (t < CAST - .8) pose = 'idle';
    else if (t < CAST - .1) pose = { a: 'idle', b: 'windup', k: p.easeOutCubic(p.ph(t, CAST - .8, CAST - .25)) };
    else if (t < CAST + .05) pose = { a: 'windup', b: 'punch', k: p.easeInCubic(p.ph(t, CAST - .1, CAST)) };
    else if (t < 3.3) pose = { a: 'punch', b: 'point', k: p.easeOutCubic(p.ph(t, CAST + .15, CAST + .6)) };
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.3, 4.1)) };
    const fig = p.figure(-3.5, 0, { pose });
    const hand = [fig.hand[0] + .05, fig.hand[1], fig.hand[2] + .05];
    // ---- the company ----
    const crowd = p.crowd(Object.assign({}, lay, {
      t, scale: 'auto', fill: 1.35, maxScale: 1, react: 'zap', ramp: S,
      at: u => { const k = B.hitK[u.i], L = LD[k >= 0 ? k : NL - 1]; return [L.x, L.y, 0]; },
      hit: u => { const k = B.hitK[u.i]; return k >= 0 ? LD[k].t + B.hitD[u.i] / V + u.r1 * .03 : null; },
      fear: u => {
        let f = .25 * p.env(t, .5, 1.0, 3.3, 3.9);
        for (const L of LD) { const a = t - L.t; if (a > -.25 && a < .8 && Math.hypot(u.x - L.x, u.y - L.y) < L.r + 1.3) f = Math.max(f, a < 0 ? .6 * (1 + a / .25) : .9 * (1 - a / .8)); }
        return f * (.6 + .4 * u.r3);
      },
      respawn: RS, clear: CL, from: [1, .12],
    }));
    // ---- scorched circles: the burst areas stay on the ground ----
    const scK = 1 - p.ph(t, 4.1, 4.8);
    if (scK > 0) for (const L of LD) {
      const a = t - L.t;
      if (a < 0) continue;
      const R = Math.min(L.r, V * a), s0 = L.k * 1.7;
      p.stain(L.x, L.y, R + .02, (dx, dy, rho, ang) => (Math.abs(rho - L.r) < .07 ? 1 : .3 + .25 * Math.abs(Math.cos(ang * 5 + s0)) * (1 - rho / L.r) + .15 * p.noise(dx * 3 + s0, dy * 3)), '#0e1220', scK * (L.final ? 1 : .9));
    }
    // ---- the storm sky ----
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .2, 1.0)) : 1 - p.ph(t, 3.6, 4.4);
    if (skyK > .01) p.domain({ amt: skyK, c: hand, sky: this.SKY, ground: this.GROUND, solids: .15, t, fade: t > 2 });
    // ---- light: charge, the ball ----
    if (t > Math.max(.2, CAST - .8) && t < CAST + .1) {
      const u = p.ph(t, Math.max(.2, CAST - .8), CAST);
      p.charge(hand[0], hand[1], hand[2], u, { n: 14, R: 1.1, ramp: S, up: .3 });
    }
    // ball position: in the hand, thrown, then hopping between the landings
    let ball = null, bk = 0;
    if (t > CAST - .65 && t < CAST) ball = hand;
    else if (t >= CAST && t < HIT) {
      let a0 = hand, a1 = [LD[0].x, LD[0].y, .1], t0 = CAST, t1 = LD[0].t, h = 1.2;
      for (let k = 1; k < NL; k++) if (t >= LD[k - 1].t) { a0 = [LD[k - 1].x, LD[k - 1].y, .1]; a1 = [LD[k].x, LD[k].y, .1]; t0 = LD[k - 1].t; t1 = LD[k].t; bk = k; h = .35 + .3 * Math.hypot(a1[0] - a0[0], a1[1] - a0[1]) + (LD[k].final ? .5 : 0); }
      const u = p.ph(t, t0, t1), e = bk === 0 ? .3 * u + .7 * u * u : u;
      ball = p.arcPos(a0, a1, e, h);
    }
    if (ball) {
      const grow = t < CAST ? p.ph(t, CAST - .65, CAST) : 1, rb = .1 * Math.pow(1.15, bk) * (bk === NL - 1 && NL > 1 ? 1.5 : 1) * grow, fq = Math.floor(t * 30);
      p.core(ball[0], ball[1], ball[2] + rb * .5, { r: rb, ramp: PL.ball, I: 1.2, halo: 2.6 });
      for (let j = 0; j < 3; j++) {
        const d = p.rdir(j + fq * 3, 9, 0), L = rb * (2 + 2 * p.r(j, fq));
        p.bolt([ball[0], ball[1], ball[2] + rb * .5], [ball[0] + d[0] * L, ball[1] + d[1] * L, ball[2] + rb * .5 + d[2] * L], S, { seed: fq * 7 + j, jag: .35, depth: 3, w: .025, I: 1, glow: .2 });
      }
      p.light(ball[0], ball[1], 0, .7 + rb * 3, S, .5);
    }
    // ---- the bursts ----
    const fq = Math.floor(t * 30);
    for (const L of LD) {
      const a = t - L.t;
      if (a < 0 || a > 1.2) continue;
      const grow = Math.min(L.r, V * a), done = Math.max(0, a - L.r / V), fade = 1 - p.ph(done, .15, .45);
      const I = 1.3 * fade, z = .07;
      if (I > 0) {
        // a jagged ring of lightning at the burst front
        const ns = Math.max(10, Math.min(26, Math.round(grow * 10)));
        let prev = [L.x + grow, L.y, z];
        for (let j = 1; j <= ns; j++) {
          const ang = j / ns * p.TAU, q = [L.x + Math.cos(ang) * grow, L.y + Math.sin(ang) * grow, z];
          p.bolt(prev, q, S, { seed: L.k * 97 + j + fq * 5, jag: .28, depth: 2, w: .045, I, glow: .3 });
          prev = q;
        }
        // radial arcs from the landing
        if (a < .35) for (let j = 0; j < 5; j++) {
          const ang = j / 5 * p.TAU + L.k + p.r(j, fq) * .6;
          p.bolt([L.x, L.y, .15], [L.x + Math.cos(ang) * grow, L.y + Math.sin(ang) * grow, z], S, { seed: L.k * 31 + j + fq * 3, jag: .25, depth: 3, w: .04, I: 1.2 * (1 - a / .35), glow: .25 });
        }
        p.light(L.x, L.y, 0, grow + .5, S, .8 * fade);
      }
      if (a < .15) { p.glow(L.x, L.y, .25, .7 + L.r * .4, S, 1.3 * (1 - a / .15)); p.line([L.x, L.y, 0], [L.x, L.y, .9], .14, S, 1.2 * (1 - a / .15), { w1: .02 }); }
    }
    // ---- the finale: a colossal bolt with the last landing ----
    const b = t - HIT;
    if (b >= 0 && b < .03 + 1 / 30) p.impactFrame({ ink: '#050816', paper: '#eef8ff', accent: '#9fe8ff' });
    if (b >= 0 && b < .9) {
      if (b < .2) p.bolt([fin.x - 1, fin.y - 2.2, 9], [fin.x, fin.y, .2], S, { seed: 41 + fq, jag: .12, depth: 6, branches: 4, w: .2, I: 1.5 * (1 - b / .2), glow: .6 });
      p.shock(fin.x, fin.y, .1, p.ph(b, 0, .8), { R: fin.r + .4, w: .32, ramp: S });
      if (b < .22) p.speedLines(fin.x, fin.y, 1.0, { n: 18, R0: 1.6, R1: 5, ramp: S, I: 1 - b / .22, seed: fq });
      p.light(fin.x, fin.y, 0, fin.r + 1.5, S, 1.1 * Math.pow(1 - b / .9, 2));
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, CL[0], CL[1]) });
  },
});
