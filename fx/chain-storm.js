// 連鎖雷暴 / Chain Storm — Mass Spells pack (original design): one bolt hops soldier to soldier through the whole horde, faster every hop under a hop counter, then every stunned soldier bursts at once
PXFX.define({
  id: 'chain-storm',
  loop: 5,
  beats: [{ t: 1.0, kind: 'cast', power: .75 }, { t: 3.0, kind: 'hit', power: 1.45 }],
  view: { r: 4.8, h: 3.4 },
  stage: { ground: 'slate' },
  modules: ['figure', 'charge', 'crowd', 'domain', 'shockwave', 'impact', 'aftermath'],
  palette: {
    storm: ['#3b3fae', '#4a6ad8', '#5aa0f0', '#8fd0ff', '#c8ecff', '#f4fbff'],
    digit: ['#8fd0ff', '#e2f4ff', '#ffffff'],
    plate: ['#0a0f22', '#141b38', '#1e2850'],
    smoke: ['#3a3a48', '#565666', '#767688', '#9a9aac'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由站姿伸出右手指向敵群（0.38 秒回彈緩動），敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster points the right hand at the horde (0.38 s overshoot ease) while 36 small soldiers stand in the middle of the field' },
    { k: 'charge', t: [.1, 1.0], zh: '集氣：天空由施法者指尖向外抹成深藍雷雲（0.8 秒），遠處兩道雲中閃電；14 道藍白電光匯聚到指尖，指尖周圍劈啪閃出 2 條短電弧；敵兵發抖後仰', en: 'charge: the sky wipes out from the fingertip into dark blue storm clouds (0.8 s) with two distant cloud bolts; 14 blue-white streaks converge on the fingertip, two short arcs crackle around it, the soldiers tremble and lean back' },
    { k: 'shape', t: [1.0, 1.2], zh: '成形：1.0 秒施法者後座一下，一道粗閃電（寬 0.08、2 條分叉）在 0.05 秒內由指尖弧形躍到最近的敵兵，命中點噴 5 點火花並照亮地面，跳數牌顯示「×1」', en: 'shape: at 1.0 s the caster recoils and a thick bolt (width 0.08, 2 branches) arcs from the fingertip to the nearest soldier in 0.05 s, spraying 5 sparks and lighting the ground; the counter shows "×1"' },
    { k: 'motion', t: [1.0, 2.78], zh: '推進：閃電按最近鄰次序跳過整群敵兵；第 k 跳時間 = 1.0 + 前 k 個間隔之和，間隔由約 0.10 秒等比縮短到約 0.02 秒（首末比 4.5 倍），總長固定 1.78 秒；每跳是兩個胸口之間經過拱起中點（高 0.12 + 0.3 × 距離）的鋸齒閃電，停留 0.12 秒並噴 5 點火花；中招者原地抽搐（白／焦黑每 1/24 秒閃爍、抖動 0.025、胸口淡藍光），保持站立；跳過的路徑留下淡藍電網；跳數牌（3×5 像素字「×12」「×24」…）跟著最新目標移動', en: 'motion: the bolt hops through the horde in nearest-neighbour order; hop k lands at 1.0 + the sum of the first k intervals, which shrink geometrically from ~0.10 s to ~0.02 s (4.5× speed-up) over a fixed 1.78 s; each hop is a jagged bolt between two chests through a raised midpoint (0.12 + 0.3 × distance high) that lingers 0.12 s with 5 sparks; a hit soldier convulses in place (white/charred flicker every 1/24 s, 0.025 jitter, faint blue chest glow) and stays standing; the hops leave a faint blue net; the counter tag (3×5 pixel digits "×12", "×24"…) follows the latest target' },
    { k: 'impact', t: [2.78, 3.4], zh: '命中：最後一跳後靜止 0.22 秒，電網漸亮、敵群上空雲層劈啪作響，跳數牌移到敵群上方並放大；3.0 秒一道比畫面還高的巨雷（寬 0.2、4 條分叉）劈中敵群中心，1 格黑白衝擊格，整個電網同時爆亮，所有中招敵兵同一瞬間閃白爆開（55% 向上拋飛翻滾，其餘噴火花後倒下），半徑 4.3 的衝擊環與放射速度線', en: 'impact: after the last hop everything holds for 0.22 s while the net brightens, the clouds over the horde crackle and the counter moves above the horde and grows; at 3.0 s a bolt taller than the frame (width 0.2, 4 branches) strikes the middle of the horde, one two-tone impact frame, the whole net flares and every stunned soldier bursts in the same frame (55% thrown up with a tumble, the rest spray sparks and topple), a shock ring to radius 4.3 and radial speed lines' },
    { k: 'after', t: [3.4, 5], zh: '餘波：焦黑屍體冒煙，每具屍體原位一個星形焦痕，微弱電弧在相鄰屍體之間貼地爬動；雷雲在 3.6–4.4 秒退回指尖，屍體淡出，新一批敵兵由右邊走回原位', en: 'aftermath: charred bodies smoke over star-shaped scorch marks where they stood while faint arcs crawl along the ground between neighbouring bodies; the storm wipes back into the fingertip at 3.6–4.4 s, the bodies fade and a fresh horde walks in from the right' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6），均勻但不規則地分佈在中心 (1.2, 0)、半徑 2.45×2.1 的橢圓內；每個敵兵的命中時間 = 它在連鎖次序中的跳躍時間', en: 'horde: 30–60 small soldiers (~0.6 tall) spread evenly but irregularly in an ellipse 2.45×2.1 around (1.2, 0); each soldier’s hit time is its hop time in the chain order' },
    { zh: '連鎖次序：由施法者位置出發的貪婪最近鄰路徑；跳躍間隔按等比數列縮短再縮放到固定總長，令最後一跳永遠落在 2.78 秒、爆發永遠在 3.0 秒', en: 'chain order: a greedy nearest-neighbour path from the caster; hop intervals shrink geometrically and are scaled to a fixed total, so the last hop always lands at 2.78 s and the burst at 3.0 s' },
    { zh: '閃電：遞迴中點位移的鋸齒線（3–4 層細分、偏移 20%），外加 4 倍寬的半透明光暈和 1 條分叉；每 1/30 秒換種子閃爍；每跳經拱起的中點分兩段，以指數緩動由起點伸到終點', en: 'bolts: jagged midpoint-displacement lines (3–4 subdivisions, 20% offset) with a halo 4× wider and one branch; reseeded every 1/30 s; each hop runs in two pieces through a raised midpoint and extends from start to end with an exponential ease' },
    { zh: '中招反應（自訂）：抽搐時身體在白色與焦黑之間閃爍、抖動、胸口發光；爆發時閃白 0.09 秒，之後焦黑，按拋物線上拋（高 0.45–1.2）翻滾落地，或原地小跳後倒下', en: 'hit reaction (custom): while stunned the body flickers white/charred, jitters and glows at the chest; on the burst it flashes white for 0.09 s, then turns charred and is thrown up on a parabola (0.45–1.2 high) with a tumble, or hops and topples in place' },
    { zh: '跳數牌：面向鏡頭的深藍實心小牌（1 像素淡藍框），內有自製 3×5 點陣字「×N」，每格 2 像素（2D 為 1 像素），對齊像素格；牌往鏡頭方向偏移避免被遮；每跳 0.06 秒內滑到新目標頭上 0.75 處並亮一下；完成後移到敵群中心上方放大一級，爆發後閃爍消失', en: 'hop counter: a small camera-facing dark blue solid tag (1 px pale blue frame) with a custom 3×5 bitmap "×N", 2 px per cell (1 px in 2D), snapped to the pixel grid and pulled towards the camera so nothing hides it; each hop it slides above the new target (0.75 over the head) in 0.06 s and brightens; when the chain is done it moves above the horde centre one size bigger, then blinks out after the burst' },
    { zh: '天空：領域模組把頁面背景換成深藍雷雲（雲塊為噪聲色塊），地面換成深石板藍，閃電與敵兵發光保持高亮', en: 'sky: the domain module swaps the page for dark blue storm clouds (noise cloud blobs) and remaps the ground to dark slate blue, while bolts and glows stay bright' },
    { zh: '餘波：每具屍體原位一個星形焦痕（半徑 0.34）、1–2 團上升的抖色灰煙、隨機在相鄰屍體之間閃現的貼地細電弧，約 1 秒後淡出', en: 'aftermath: a star-shaped scorch (radius 0.34) where each soldier stood, 1–2 rising dithered grey smoke puffs, thin ground arcs flickering between neighbouring bodies, fading after about 1 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    speedUp: { zh: '跳躍加速倍數', en: 'hop speed-up', min: 1, max: 8, step: .5, value: 4.5 },
    boltWidth: { zh: '閃電粗細', en: 'bolt thickness', min: .5, max: 2, step: .05, value: 1 },
    burstForce: { zh: '爆發力度', en: 'burst force', min: .5, max: 1.6, step: .05, value: 1 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.45, ry: 2.1 },
  SKY: { top: '#060914', bottom: '#162038', nebula: '#26324f', stars: 0 },
  GROUND: ['#121827', '#1a2234', '#232d44', '#2e3a56'],
  // 3×5 pixel font, rows top to bottom, 3 bits per row (4 = left column)
  FONT: { 0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [7, 1, 7, 4, 7], 3: [7, 1, 7, 1, 7], 4: [5, 5, 7, 1, 1], 5: [7, 4, 7, 1, 7], 6: [7, 4, 7, 5, 7], 7: [7, 1, 1, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 7], x: [0, 5, 2, 5, 0] },
  T0: 1.0, T1: 2.78,
  // hop order and hop times for a horde size and speed-up (cached: the layout is cached too)
  chain(p, n, accel) {
    const key = n + '|' + accel;
    if (this._ck === key) return this._cv;
    const units = p.crowdLayout({ n, seed: 7, area: this.AREA });
    const order = p.crowdChain(units, -3.1, .2), N = order.length, times = [this.T0], d = [];
    let S = 0;
    for (let k = 0; k < N - 1; k++) { const v = Math.pow(accel, -k / Math.max(1, N - 2)); d.push(v); S += v; }
    for (let k = 0; k < N - 1; k++) times.push(times[k] + d[k] * (this.T1 - this.T0) / S);
    const hitT = units.map(() => null);
    order.forEach((u, k) => { hitT[u.i] = times[k]; });
    this._ck = key; this._cv = { order, times, hitT, N };
    return this._cv;
  },
  // counter layout: an anchor pulled towards the camera, snapped so every glyph cell lands on whole pixels
  counterLayout(p, at, str, c) {
    const cam = p.cam(), b = 1.2;
    const A = [at[0] + cam.fwd[0] * b, at[1] + cam.fwd[1] * b, at[2] + cam.fwd[2] * b + (p.mode === '2d' ? .55 * b : 0)];
    const pr = p.project(A[0], A[1], A[2]);
    if (!pr) return null;
    const glyphs = [...str].map(ch => this.FONT[ch]), cols = glyphs.length * 4 - 1, ps = pr[3];
    const X0 = Math.round(pr[0] - cols * c / 2), Y0 = Math.round(pr[1] - 5 * c / 2);
    const W3 = (sx, sy) => { const dx = (sx - pr[0]) / ps, dy = (pr[1] - sy) / ps; return [A[0] + cam.right[0] * dx + cam.up[0] * dy, A[1] + cam.right[1] * dx + cam.up[1] * dy, A[2] + cam.right[2] * dx + cam.up[2] * dy]; };
    return { glyphs, cols, c, X0, Y0, ps, W3 };
  },
  // dark solid tag behind the digits (drawn with the solids, before the sky change)
  counterPlate(p, L) {
    const c = L.c, w = (L.cols + 2) * c, h = 7 * c, m = L.W3(L.X0 + L.cols * c / 2, L.Y0 + 2.5 * c);
    p.scard(m[0], m[1], m[2], (w - .02) / L.ps, (h - .02) / L.ps, () => .4, this.palette.plate);
  },
  // the digits: one pixel block per lit glyph cell, plus a thin frame
  counterDigits(p, L, I) {
    const c = L.c, D = this.palette.digit, S = this.palette.storm;
    L.glyphs.forEach((g, gi) => {
      for (let row = 0; row < 5; row++) for (let col = 0; col < 3; col++) {
        if (!(g[row] >> (2 - col) & 1)) continue;
        const q = L.W3(L.X0 + (gi * 4 + col) * c + (c - 1) / 2 + .5, L.Y0 + row * c + (c - 1) / 2 + .5);
        p.dot(q[0], q[1], q[2], D, I * (row === 0 ? 1.15 : 1), c);
      }
    });
    const x0 = L.X0 - c, x1 = L.X0 + (L.cols + 1) * c - 1, y0 = L.Y0 - c, y1 = L.Y0 + 6 * c - 1;
    for (let x = x0; x <= x1; x++) for (const y of [y0, y1]) { const q = L.W3(x + .5, y + .5); p.dot(q[0], q[1], q[2], S, .55 * I, 1); }
    for (let y = y0 + 1; y < y1; y++) for (const x of [x0, x1]) { const q = L.W3(x + .5, y + .5); p.dot(q[0], q[1], q[2], S, .55 * I, 1); }
  },
  draw(p, t) {
    const PL = this.palette, S = PL.storm, CAST = 1.0, HIT = 3.0, HC = [1.2, 0];
    const n = Math.round(p.param('crowd')), bw = p.param('boltWidth'), force = p.param('burstForce'), accel = p.param('speedUp');
    const ch = this.chain(p, n, accel), N = ch.N, b = t - HIT;
    // ---- caster: point, small recoil on the release ----
    let pose;
    if (t < .5) pose = { a: 'idle', b: 'point', k: p.easeOutBack(p.ph(t, .12, .5), 1.4) };
    else if (t < 3.35) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.35, 4.1)) };
    const fig = p.figure(-3.5, .2, { pose, lean: t > CAST ? -.14 * Math.exp(-(t - CAST) * 9) : 0 });
    const hand = [fig.hand[0] + .06, fig.hand[1], fig.hand[2] + .02];
    // ---- the horde: stunned in chain order, all burst at HIT ----
    const react = (s, a, u, pp, o) => {
      s.walk = null;
      const bb = o.t - HIT;
      if (bb < 0) {
        const f = Math.floor(o.t * 24 + u.r1 * 7), hot = a < .14;
        s.mat = hot || f % 3 === 0 ? 'white' : 'char';
        s.jit = hot ? .05 : .025;
        s.tilt = .12 + .08 * Math.sin(o.t * 41 + u.r2 * 9);
        s.glow = hot ? .8 : .12 + .2 * (f % 2);
        s.spear = a < .3;
        return;
      }
      s.spear = false;
      const dx = u.x - HC[0], dy = u.y - HC[1], dl = Math.hypot(dx, dy) || 1;
      s.tdir = [dx / dl, dy / dl];
      s.mat = bb < .09 ? 'white' : 'char';
      s.glow = bb < .12 ? 1.2 * (1 - bb / .12) : 0;
      if (u.r2 < .55) {
        const T = (.55 + .3 * u.r3) * (.7 + .3 * force), H = (.45 + .75 * u.r3) * force, k = pp.clamp(bb / T, 0, 1);
        const d = (.2 + .45 * u.r1) * force * pp.easeOut(k);
        s.x += s.tdir[0] * d; s.y += s.tdir[1] * d; s.z = 4 * H * k * (1 - k);
        s.tilt = (Math.PI / 2 + (u.r1 > .5 ? pp.TAU : 0)) * pp.easeOut(k);
      } else {
        s.z = .12 * force * Math.sin(Math.PI * pp.ph(bb, 0, .2));
        s.tilt = Math.PI / 2 * pp.easeIn(pp.ph(bb, .04 + .08 * u.r3, .36 + .1 * u.r3));
      }
    };
    const crowd = p.crowd({
      n, seed: 7, area: this.AREA, t, hit: u => ch.hitT[u.i], react, ramp: S, at: [-4.5, .2, 0],
      fear: u => p.ph(t, .55, 1.0) * (.25 + .35 * u.r3),
      respawn: [4.1, 4.95], clear: [3.85, 4.45], from: [1, .1],
    });
    const chest = u => crowd[u.i].chest;
    let last = -1;
    for (let k = 0; k < N; k++) { if (t >= ch.times[k]) last = k; else break; }
    // ---- aftermath on the ground: scorch per body, smoke (solids, before the sky change) ----
    const after = b >= 0 ? 1 - p.ph(t, 3.9, 4.6) : 0;
    if (after > 0) {
      for (const u of ch.order) {
        const sd = u.r1 * 6;
        p.stain(u.x, u.y, .34, (dx, dy, rho, ang) => (1 - rho / .34) * (.9 + .7 * Math.abs(Math.cos(ang * 3 + sd))), '#120e16', after);
      }
      const sm = 1 - p.ph(t, 4.0, 4.45), per = p.density > 1.3 ? 2 : 1;
      if (sm > 0 && b > .25) for (const st of crowd) {
        if (st.fresh || st.hidden || p.r(st.u.i, 5) > .8 * p.density) continue;
        for (let j = 0; j < per; j++) {
          const ph = ((b - .25) * .8 + p.r(st.u.i, 6 + j)) % 1, k = st.u.i * 3 + j;
          p.ball(st.x + (p.r(k, 7) - .5) * .2 + ph * .15, st.y, st.z + .15 + ph * .75, .06 + .08 * ph, PL.smoke, { alpha: .75 * sm * (1 - ph), rough: .5, shadow: false, seed: k });
        }
      }
    }
    // ---- hop counter: tag over the latest target, then over the horde centre ----
    let cnt = null;
    if (last >= 0 && b < .55) {
      const u = ch.order[last], tk = ch.times[last], prev = last ? ch.order[last - 1] : null;
      const gap = last ? Math.max(.015, Math.min(.06, tk - ch.times[last - 1])) : .06, mv = p.easeOutCubic(p.ph(t, tk, tk + gap));
      let at = [u.x + .1, u.y, 1.08];
      if (prev) at = p.v3.lerp([prev.x + .1, prev.y, 1.08], at, mv);
      let c = p.mode === '2d' ? 1 : 2;
      const done = p.ph(t, ch.times[N - 1] + .05, ch.times[N - 1] + .17);
      if (done > 0) { at = p.v3.lerp(at, [HC[0], HC[1], 1.95], p.easeOutBack(done, 1.6)); if (done > .5) c += 1; }
      const blink = b < 0 || b < .2 || Math.floor(b * 16) % 2 === 0;
      if (blink) {
        cnt = this.counterLayout(p, at, 'x' + (last + 1), c);
        if (cnt) { cnt.I = (b >= 0 ? 1.5 : t - tk < .04 ? 1.4 : 1.05); this.counterPlate(p, cnt); }
      }
    }
    // ---- the world turns to storm ----
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .1, .9)) : 1 - p.ph(t, 3.6, 4.4);
    if (skyK > .01) p.domain({ amt: skyK, c: hand, sky: this.SKY, ground: this.GROUND, solids: .2, t });
    // ---- light: distant cloud bolts, charge at the fingertip ----
    for (const [t0, x, y, s] of [[.48, 2.8, -3.4, 1], [.78, -.6, -3.8, 2], [1.9, 3.6, -3.0, 3]]) {
      const a = t - t0;
      if (a < 0 || a > .14) continue;
      p.bolt([x, y, 6.5], [x + .7, y + .3, 2.6], S, { seed: s * 9 + Math.floor(t * 30), jag: .22, depth: 5, branches: 2, w: .07, I: 1.1 * (1 - a / .14), glow: .3 });
    }
    if (t > .3 && t < 1.2) {
      const u = p.ph(t, .3, CAST), fade = t < CAST ? u : 1 - p.ph(t, CAST, 1.2);
      p.charge(hand[0], hand[1], hand[2], u, { n: 14, R: 1.1, ramp: S, up: .3 });
      p.glow(hand[0], hand[1], hand[2], .14 + .22 * u, S, .95 * fade);
      const fq = Math.floor(t * 15);
      for (let j = 0; j < 2; j++) {
        if (p.r(j, fq) > u) continue;
        const d = p.rdir(j + fq * 3, 5, .2), L = .25 + .25 * u;
        p.bolt(hand, [hand[0] + d[0] * L, hand[1] + d[1] * L, hand[2] + d[2] * L], S, { seed: fq * 5 + j, jag: .35, depth: 3, w: .025, I: .9 * fade, glow: .2 });
      }
      p.light(hand[0], hand[1], 0, 1.2, S, .5 * fade);
    }
    // ---- the chain: live hops ----
    if (b < 0) for (let k = Math.max(0, last - 12); k <= last; k++) {
      const age = t - ch.times[k], L = k === 0 ? .22 : .12;
      if (age > L) continue;
      const to = chest(ch.order[k]), from = k === 0 ? hand : chest(ch.order[k - 1]);
      const gap = k === 0 ? .05 : Math.max(.012, (ch.times[k] - ch.times[k - 1]) * .5);
      const g = Math.max(.08, p.easeOutExpo(Math.min(1, age / gap))), life = age / L, I = 1.3 * (1 - life * life);
      // the hop leaps in an arc: two bolts through a raised midpoint
      const D = Math.hypot(to[0] - from[0], to[1] - from[1]), M = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2 + (k === 0 ? .35 : .12 + .3 * D)];
      const sd = k * 17 + Math.floor(t * 30), w = (k === 0 ? .08 : .06) * bw;
      if (g < .5) p.bolt(from, p.v3.lerp(from, M, g * 2), S, { seed: sd, jag: .2, depth: 3, w, I, glow: .5 });
      else {
        p.bolt(from, M, S, { seed: sd, jag: .2, depth: 3, branches: k === 0 ? 1 : 0, w, I, glow: .5 });
        p.bolt(M, p.v3.lerp(M, to, g * 2 - 1), S, { seed: sd + 5, jag: .2, depth: 3, branches: 1, w, I, glow: .5 });
      }
      if (g >= 1) {
        const ns = Math.round(5 * p.density);
        for (let j = 0; j < ns; j++) {
          const d = p.rdir(k * 11 + j, 3, .4), r0 = p.drag(2.4, 9, age), q = [to[0] + d[0] * r0, to[1] + d[1] * r0, to[2] + d[2] * r0];
          p.line(q, [q[0] - d[0] * .1, q[1] - d[1] * .1, q[2] - d[2] * .1], .03, S, 1.1 * (1 - life), { w1: .01 });
        }
        p.light(to[0], to[1], 0, 1.1, S, .7 * (1 - life));
      }
    }
    // ---- the net left behind, brightening in the silent beat, flaring on the hit ----
    if (b < .14) {
      const flare = b >= 0, build = p.ph(t, ch.times[N - 1], HIT), fq = Math.floor(t * 15);
      for (let k = 1; k <= last; k++) {
        if (t - ch.times[k] < .06) continue;
        const A = chest(ch.order[k - 1]), B = chest(ch.order[k]);
        if (flare) p.bolt(A, B, S, { seed: k * 7 + 3, jag: .22, depth: 4, w: .06 * bw, I: 1.4 * (1 - b / .14), glow: .5 });
        else {
          const I = (.24 + .4 * build) * (.6 + .4 * p.r(k, fq));
          p.bolt(A, B, S, { seed: k * 7 + fq, jag: .24, depth: 3, w: .022 * bw, I, glow: 0 });
        }
      }
      if (!flare && build > 0) {
        p.light(HC[0], HC[1], 0, 3.2, S, .35 * build);
        // the clouds above the horde start to crackle
        for (let j = 0; j < 3; j++) {
          if (p.r(j, fq + 40) > .45 + .55 * build) continue;
          const x = HC[0] - 1.6 + 1.6 * j + (p.r(j, fq) - .5) * .8, y = HC[1] - 2.6;
          p.bolt([x, y, 5.6], [x + 1.4, y + .2, 5.2 + p.r(j, fq + 3) * .6], S, { seed: fq * 3 + j, jag: .3, depth: 4, branches: 1, w: .045, I: .5 + .6 * build, glow: .3 });
        }
      }
    }
    // the storm answers: one colossal bolt from above the frame into the middle of the horde
    if (b >= 0 && b < .2) {
      const I = 1.5 * (1 - b / .2), top = [HC[0] - .9, HC[1] - 2.4, 9], hitP = [HC[0], HC[1], .35];
      p.bolt(top, hitP, S, { seed: 31 + Math.floor(t * 30), jag: .12, depth: 6, branches: 4, w: .2 * bw, I, glow: .6 });
    }
    // ---- impact: two-tone frame, every soldier bursts ----
    if (b >= 0 && b < .03 + 1 / 30) p.impactFrame({ ink: '#050816', paper: '#eef8ff', accent: '#8fd0ff' });
    if (b >= 0) {
      if (b < .2) p.glow(HC[0], HC[1], .8, 2.4, S, .8 * Math.pow(1 - b / .2, 2));
      p.shock(HC[0], HC[1], .1, p.ph(b, 0, .7), { R: 4.3, w: .35, ramp: S });
      if (b < .22) p.speedLines(HC[0], HC[1], 1.0, { n: 18, R0: 2.6, R1: 5.2, ramp: S, I: 1 - b / .22, seed: Math.floor(t * 30) });
      const nsp = Math.max(2, Math.round(4 * p.density));
      for (const u of ch.order) {
        const c0 = [u.x, u.y, .32];
        if (b < .15) p.glow(c0[0], c0[1], c0[2], .4, S, 1.3 * Math.pow(1 - b / .15, 2));
        if (b < .4) for (let j = 0; j < nsp; j++) {
          const d = p.rdir(u.i * 7 + j, 11, .5), r0 = p.drag(3.4 * force, 7, b), q = [c0[0] + d[0] * r0, c0[1] + d[1] * r0, c0[2] + d[2] * r0];
          p.line(q, [q[0] - d[0] * .16, q[1] - d[1] * .16, q[2] - d[2] * .16], .035, S, 1.2 * (1 - b / .4), { w1: .01 });
        }
      }
      // faint arcs crawling between neighbouring bodies
      const arcs = (1 - p.ph(t, 3.7, 4.3)) * p.ph(b, .12, .3), fq = Math.floor(t * 12);
      if (arcs > 0) for (let k = 2; k < N; k += 2) {
        if (p.r(k, fq) > .38) continue;
        const A = crowd[ch.order[k - 1].i], B = crowd[ch.order[k].i];
        if (A.hidden || B.hidden || A.fresh || B.fresh) continue;
        p.bolt([A.x, A.y, .04], [B.x, B.y, .04], S, { seed: k + fq * 13, jag: .3, depth: 3, w: .02, I: .6 * arcs, glow: .25 });
      }
      p.light(HC[0], HC[1], 0, 4.2, S, 1.1 * Math.pow(1 - p.ph(b, 0, 1.0), 2));
    }
    if (cnt) this.counterDigits(p, cnt, cnt.I);
  },
});
