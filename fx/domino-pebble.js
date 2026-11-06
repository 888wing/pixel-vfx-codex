// 骨牌一彈 / Domino Pebble — Twist pack (original design): the caster flicks one tiny pebble at the nearest soldier, he topples into the next man and a chain of falling bodies races through ten thousand, faster and faster
PXFX.define({
  id: 'domino-pebble',
  loop: 6,
  beats: [{ t: 1.25, kind: 'cast', power: .4 }, { t: 1.5, kind: 'pulse', power: .45 }, { t: 2.05, kind: 'pulse', power: .3 }, { t: 3.8, kind: 'hit', power: 1.35 }],
  view: { r: 6.6, h: 3.6 },
  stage: { ground: 'grass' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'debris', 'impact'],
  palette: {
    pebble: ['#4a4038', '#6e6252', '#968a74', '#c4b89c'],
    glint: ['#c8a868', '#f0d898', '#fff6d8', '#ffffff'],
    dust: ['#6e5e48', '#9a8668', '#c4b08c', '#e6d8b8'],
    fallenBody: ['#1c161a', '#272024', '#342a2c', '#423636'],
    fallenHelm: ['#3a2024', '#4e2a2a', '#663632', '#7e463c'],
  },
  timeline: [
    { k: 'pose', t: [0, 1.05], zh: '起手：施法者（縮放 0.7）站在近邊 (−5.2, 0)；對面一萬人方陣（中心 (0.8, 0)、半深 3.8、半寬 3.8，100 × 100，每人 1–2 像素）。0.45–0.8 秒施法者蹲下拾起一粒小石子（半徑 0.06），站起後在掌心往上拋一下（高 0.15）', en: 'pose: the caster (scale 0.7) stands at the near edge (−5.2, 0) facing a block of ten thousand (centre (0.8, 0), half depth 3.8, half width 3.8, 100 × 100, 1–2 px each); at 0.45–0.8 s the caster crouches and picks up one small pebble (radius 0.06), stands and tosses it once in the palm (0.15 high)' },
    { k: 'charge', t: [1.05, 1.25], zh: '集氣：沒有集氣——施法者只把手往後一收（0.15 秒），刻意顯得很隨便', en: 'charge: none on purpose — the caster only draws the hand back for 0.15 s, deliberately casual' },
    { k: 'shape', t: [1.25, 1.5], zh: '成形：1.25 秒用手指一彈，石子沿高 0.55 的弧線飛 0.25 秒，身後 3 點淡金光點，1 像素白色反光；1.5 秒敲中離施法者最近的士兵頭盔（4 角白色小星光＋3 粒碎屑），石子反彈落地', en: 'shape: at 1.25 s a finger flick sends the pebble along a 0.55-high arc for 0.25 s with 3 pale-gold specks behind and a 1 px white glint; at 1.5 s it taps the helmet of the soldier nearest the caster (a small 4-point white star and 3 chips) and bounces to the ground' },
    { k: 'motion', t: [1.5, 3.85], zh: '推進：被敲中的士兵前後搖兩下（0.3 秒），1.8 秒開始倒下，2.05 秒壓到身旁的人。規則：士兵之間距離 ≤ reach（預設 1.0）× 身高（0.62 × 兵距 ÷ 0.4）就連一條邊，由第一個士兵沿邊做最短路徑（Dijkstra，按鏈長 L 累加），連得到的人倒下；命中時間 = 2.05 + (0.4 ÷ speed) × ln(1 + L ÷ 0.1)，即每一跳的延遲隨鏈長變短，越倒越快（第一跳約 0.24 秒，第五十跳約 0.01 秒）；4.35 秒後鏈條停止。每人倒向遠離撞倒他的人的方向，倒地時身長正好 = reach × 身高，倒地後換成暗色（近黑身體、暗磚紅頭盔），鏈條最前 31 跳每一下在被撞的人頭上閃一點白色小星，落地處冒起塵團', en: 'motion: the tapped soldier rocks twice (0.3 s), starts to topple at 1.8 s and lands on the next man at 2.05 s. Rule: soldiers closer than reach (default 1.0) × body height (0.62 × spacing / 0.4) are linked; a shortest-path search (Dijkstra on chain length L) from the first soldier finds everyone the chain reaches, and they fall; hit time = 2.05 + (0.4 / speed) × ln(1 + L / 0.1), so each hop’s delay shrinks as the chain grows (first hop ~0.24 s, fiftieth ~0.01 s); the chain stops at 4.35 s. Each soldier falls away from the man who hit him, lies exactly reach × body height long and turns dark once down (near-black body, dull brick helmet); each of the first 31 links flashes a small white tick on the struck man’s helmet, and a dust puff rises where he lands' },
    { k: 'impact', t: [3.75, 4.1], zh: '命中：約 3.8 秒浪頭撞到方陣最後一排：頓幀＋震屏，最後幾排一同倒下，後排揚起約 26 團低矮塵雲；擊殺計數由 1 一路跳到 10000/10000 並變金色', en: 'impact: around 3.8 s the front reaches the last rank: hit-stop and shake, the last ranks drop together and about 26 low dust clouds roll up off the back ranks; the kill counter has climbed from 1 to 10000/10000 and turns gold' },
    { k: 'after', t: [3.85, 6], zh: '餘波：塵雲升起變淡，施法者由手搭涼棚觀望（1.7–3.9 秒）回到待機；擊殺計數 4.45–4.65 秒淡出，倒地的士兵 4.6–5.0 秒淡出，新的方陣 4.95–5.85 秒原地淡入；石子留在地上直到淡出', en: 'aftermath: the dust rises and thins, the caster drops the hand-over-the-eyes watching pose (1.7–3.9 s) back to idle; the counter fades at 4.45–4.65 s, the fallen soldiers fade at 4.6–5.0 s and a fresh block fades in on its spots at 4.95–5.85 s; the pebble stays on the ground until it fades' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵數量 2000–12000（預設 10000），按陣型（預設方陣）排在中心 (0.8, 0)、半深 3.8、半寬 3.8 的範圍內，兵距決定大小，一萬人時是一片 1–2 像素的紅頭盔海；左上角擊殺計數「骷髏 已擊殺/總數」由 1 開始每倒一人加一，全滅時變金色', en: 'army and formation: 2000–12000 soldiers (default 10000) in a formation (default block) inside centre (0.8, 0), half depth 3.8, half width 3.8; spacing sets their size, so ten thousand are a sea of 1–2 px red helmets; the kill counter "skull killed/total" in the top-left counts every fall from 1 and turns gold on a full wipe' },
    { zh: '判定與倖存者：鄰接圖 = 距離 ≤ reach × 身高的士兵對（空間網格查詢，每個陣型與參數只算一次並緩存）；由第一個士兵做最短路徑，連得到而且命中時間早於 4.35 秒的人倒下。分隊之間的空隙比身高寬，鏈條在第一隊就斷（約 11%）；散兵在一萬人時仍密到可以傳下去；reach 0.7 時只剩方陣（與大部分鶴翼）傳得下去，橫列、縱隊、楔形、圓陣、散兵都在頭幾人就斷；0.6 以下連方陣也斷；倖存者原地發抖', en: 'rule and survivors: a link graph of soldier pairs closer than reach × body height (spatial-grid queries, computed once per formation and knob values and cached); a shortest-path search from the first soldier; whoever it reaches before 4.35 s falls. The gaps between squads are wider than a body, so the chain dies in the first squad (~11%); scatter at ten thousand is still dense enough to carry it; at reach 0.7 only the block (and most of the crescent) carries the chain while line, column, wedge, ring and scatter stop within a few men; below 0.6 even the block stops; survivors stay standing and tremble' },
    { zh: '倒下動作（自訂反應，一萬人也便宜）：只改傾斜、方向、身長與材質——傾角 = 90° × 緩入（時間 ÷ 倒地時長），倒地時長 = 2.2 × 這一跳的延遲（0.1–0.3 秒），所以鏈條越快、每人倒得越乾脆；倒地 0.05 秒後改用暗色調色盤重畫（只記索引與傾角，不逐幀複製狀態）', en: 'fall (custom reaction, cheap at ten thousand): only tilt, direction, body length and material change — tilt = 90° × ease-in(time / fall time), fall time = 2.2 × that hop’s delay (0.1–0.3 s), so the faster the chain, the snappier each fall; 0.05 s after landing the body is redrawn with a dark palette (only index and tilt are kept, no per-frame state copies)' },
    { zh: '石子：低多邊形小石（半徑 0.06，灰褐色）＋1 像素白色反光，飛行時拖 3 點淡金光點；敲中時 0.12 秒白色 4 角星光，反彈 0.35 秒後落地', en: 'pebble: a tiny low-poly rock (radius 0.06, grey-brown) with a 1 px white glint, 3 trailing pale-gold specks in flight; a white 4-point star for 0.12 s on the tap, then it bounces for 0.35 s and lies on the ground' },
    { zh: '塵土：鏈條最前的 25 人和另外約 150 個抽樣士兵倒地時各冒一團塵（土黃色粗糙半透明球，半徑 0.07–0.22，0.6–0.9 秒升起散開），塵團沿著浪頭一路排開；命中時後排另有 26 團低矮塵雲（半徑 0.18–0.44）', en: 'dust: the first 25 soldiers in the chain plus about 150 sampled others each raise a puff when they land (rough translucent tan balls, radius 0.07–0.22, rising and spreading over 0.6–0.9 s), so the puffs trace the racing front; 26 low clouds (radius 0.18–0.44) roll off the back ranks on the hit' },
    { zh: '施法者：無臉人偶，姿勢 待機 → 蹲下拾石 → 收手 → 指彈 → 手搭涼棚觀望 → 待機', en: 'caster: faceless mannequin, poses idle → crouch to pick up → hand back → flick → hand over the eyes, watching → idle' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    reach: { zh: '倒地觸及（身長倍數）', en: 'fall reach (× body height)', min: .5, max: 1.5, step: .05, value: 1 },
    speed: { zh: '連鎖速度', en: 'chain speed', min: .8, max: 2, step: .05, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  CASTER: [-5.2, 0],
  FLICK: 1.25, TP: 1.5, TIP: 1.8, T1: 2.05, TAU: .4, C: .1, CUT: 4.35,
  // shortest chain length from the first soldier over links <= reach x body height (cached per layout + reach)
  chain(p, units, R) {
    const key = R.toFixed(5);
    if (this._ch && this._ch.units === units && this._ch.key === key) return this._ch;
    const n = units.length, L = new Float64Array(n).fill(Infinity), par = new Int32Array(n).fill(-1);
    const grid = p.crowdGrid(units, Math.max(.02, R));
    let src = 0, bd = Infinity;
    for (const u of units) { const d = Math.hypot(u.x - this.CASTER[0], u.y - this.CASTER[1]); if (d < bd) { bd = d; src = u.i; } }
    L[src] = 0;
    const hk = [0], hv = [src];   // binary heap of (chain length, index)
    const push = (k, v) => {
      let i = hk.length; hk.push(k); hv.push(v);
      while (i) { const q = (i - 1) >> 1; if (hk[q] <= k) break; hk[i] = hk[q]; hv[i] = hv[q]; i = q; }
      hk[i] = k; hv[i] = v;
    };
    const pop = () => {
      const v = hv[0], lk = hk.pop(), lv = hv.pop();
      if (hk.length) {
        let i = 0;
        for (;;) {
          const l = 2 * i + 1, r = l + 1;
          let m = i, mk = lk;
          if (l < hk.length && hk[l] < mk) { m = l; mk = hk[l]; }
          if (r < hk.length && hk[r] < mk) { m = r; mk = hk[r]; }
          if (m === i) break;
          hk[i] = hk[m]; hv[i] = hv[m]; i = m;
        }
        hk[i] = lk; hv[i] = lv;
      }
      return v;
    };
    const done = new Uint8Array(n);
    while (hk.length) {
      const i = pop();
      if (done[i]) continue;
      done[i] = 1;
      const u = units[i];
      for (const v of grid.near(u.x, u.y, R)) {
        if (done[v.i]) continue;
        const nl = L[i] + Math.hypot(v.x - u.x, v.y - u.y);
        if (nl < L[v.i]) { L[v.i] = nl; par[v.i] = i; push(nl, v.i); }
      }
    }
    // fall direction: away from the man who hit you (the first one falls away from the caster)
    const dir = new Float32Array(n * 2), tdir = new Array(n).fill(null), order = [];
    for (let i = 0; i < n; i++) {
      if (L[i] === Infinity) continue;
      order.push(i);
      const u = units[i], q = par[i] >= 0 ? units[par[i]] : { x: this.CASTER[0], y: this.CASTER[1] };
      const dx = u.x - q.x, dy = u.y - q.y, dl = Math.hypot(dx, dy) || 1;
      dir[i * 2] = dx / dl; dir[i * 2 + 1] = dy / dl;
      tdir[i] = [dx / dl, dy / dl];
    }
    order.sort((a, b) => L[a] - L[b]);
    // dust puffs: the first 24 links of the chain plus ~150 hashed samples
    const puffs = order.slice(0, 25);
    const step = Math.max(1, Math.floor(order.length / 150));
    for (let k = 25; k < order.length; k += step) puffs.push(order[Math.min(order.length - 1, k + Math.floor(PXFX.hash(k * .37, 3.1) * step))]);
    this._ch = { units, key, L, par, src, order, dir, tdir, puffs };
    return this._ch;
  },
  // hit time and fall time of every unit for a chain speed (cached): hit = 2.05 + (0.4 / speed) ln(1 + L / 0.1)
  times(ch, speed) {
    if (ch.tm && ch.tm.speed === speed) return ch.tm;
    const n = ch.L.length, T = new Float64Array(n).fill(-1), F = new Float32Array(n), tau = this.TAU / speed;
    const tOf = i => (i === ch.src ? this.TP : this.T1 + tau * Math.log(1 + ch.L[i] / this.C));
    for (const i of ch.order) {
      const th = tOf(i);
      if (th <= this.CUT) T[i] = th;
      F[i] = i === ch.src ? .25 : Math.min(.3, Math.max(.1, 2.2 * (th - (ch.par[i] === ch.src ? this.T1 : tOf(ch.par[i])))));
    }
    ch.tm = { speed, T, F };
    return ch.tm;
  },
  draw(p, t) {
    const PL = this.palette, CA = this.CASTER, TP = this.TP;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const reachK = p.param('reach'), speed = p.param('speed');
    const co = { n, seed: 23, formation: form, area: this.AREA, faceTo: CA };
    const units = p.crowdLayout(co);
    const sc = p.clamp((units.spacing || .4) / .4, .08, 1.5), bodyH = .62 * sc, R = reachK * bodyH;
    const ch = this.chain(p, units, R);
    const tm = this.times(ch, speed), TH = tm.T, FT = tm.F;
    const hit = i => (TH[i] >= 0 ? TH[i] : null);
    const fallT = i => FT[i];
    // ---- caster ----
    let pose;
    if (t < .45) pose = 'idle';
    else if (t < .8) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .45, .7)) };
    else if (t < 1.05) pose = { a: 'charge', b: 'idle', k: p.easeOutCubic(p.ph(t, .8, 1.0)) };
    else if (t < 1.22) pose = { a: 'idle', b: 'windup', k: p.easeOutCubic(p.ph(t, 1.05, 1.2)) * .45 };
    else if (t < 1.7) pose = { a: 'idle', b: 'point', k: .55 + .45 * p.easeOutExpo(p.ph(t, 1.22, 1.3)) };
    else if (t < 3.9) pose = { a: 'point', b: 'gaze', k: p.easeOutCubic(p.ph(t, 1.7, 2.05)) };
    else pose = { a: 'gaze', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.9, 4.5)) };
    const fig = p.figure(CA[0], CA[1], { pose, scale: .7 });
    // ---- the army: a falling chain ----
    // bodies on the ground are redrawn with a dull palette (dark, dust-dulled helmets): keep only index + tilt
    const DOWN = [], dTilt = [], CL0 = 4.6, CL1 = 5.0;
    const down = (s, u) => { s.hide = true; if (t < CL0 + u.r2 * .2 + .2) { DOWN.push(u.i); dTilt.push(s.tilt); } };
    const react = (s, a, u) => {
      const i = u.i;
      s.tdir = ch.tdir[i]; s.walk = null; s.flash = false;
      if (i === ch.src) {
        // the tapped soldier rocks twice, then topples
        if (a < .3) { s.tilt = .3 * Math.sin(a / .3 * Math.PI * 2) * (1 - a / .3 * .5); return; }
        const k = p.easeIn((a - .3) / .25);
        s.tilt = Math.PI / 2 * k; s.sq = 1 + (reachK - 1) * k; s.spear = k < .5;
        if (a > .6) down(s, u);
        return;
      }
      const T = fallT(i), k = p.easeIn(a / T);
      s.tilt = Math.PI / 2 * k - (a > T ? .12 * Math.exp(-(a - T) * 14) * Math.sin((a - T) * 40) : 0);
      s.sq = 1 + (reachK - 1) * k; s.spear = k < .5;
      if (a > T + .05) down(s, u);
    };
    const st = p.crowd(Object.assign({
      t, scale: 'auto', hit: u => hit(u.i), react, at: [CA[0], CA[1], 0],
      fear: u => (TH[u.i] < 0 ? .4 * p.env(t, 2.2, 2.8, 4.4, 4.9) * (.5 + .5 * u.r2) : 0),
      respawn: [4.95, 5.85], clear: [CL0, CL1], enter: 'fade',
    }, co));
    const FP = { body: PL.fallenBody, helm: PL.fallenHelm }, dr = st.lod === 'sprite' ? p.pawnSprite : p.pawn, po = { scale: st.scale, pal: FP };
    const c = { i: 0, vr: 0, x: 0, y: 0, z: 0, tilt: 0, tdir: null, sq: reachK, wide: 1, face: 0, alpha: 1, walk: null, spear: false };
    for (let k = 0; k < DOWN.length; k++) {
      const u = units[DOWN[k]], st0 = CL0 + u.r2 * .2;   // the same corpse fade as the kit's clear window
      c.i = u.i; c.vr = u.vr; c.x = u.x; c.y = u.y; c.tilt = dTilt[k]; c.tdir = ch.tdir[u.i]; c.face = u.face;
      c.alpha = 1 - p.ph(t, st0, st0 + .2);
      dr.call(p, c, po);
    }
    // ---- dust where bodies land, and a tick where each of the first links strikes the next man ----
    const dn = Math.round(ch.puffs.length * Math.min(1.5, p.density));
    for (let k = 0; k < dn && k < ch.puffs.length; k++) {
      const i = ch.puffs[k], th = hit(i);
      if (th == null) continue;
      const land = th + fallT(i) + (i === ch.src ? .3 : 0), life = .6 + .3 * p.r(k, 3), u = (t - land) / life;
      if (u <= 0 || u >= 1) continue;
      const e = p.easeOutCubic(u), un = units[i], dx = ch.dir[i * 2], dy = ch.dir[i * 2 + 1], L = R * .8;
      const big = k < 25 ? .9 - k * .006 : .85;
      p.ball(un.x + dx * L + (p.r(k, 4) - .5) * .2 * e, un.y + dy * L + (p.r(k, 5) - .5) * .2 * e, .05 + .3 * e, (.07 + .15 * e) * big, PL.dust, { alpha: .85 * Math.pow(1 - u, 1.2), rough: .5, shadow: false, seed: k });
    }
    for (let k = 1; k < 32 && k < ch.order.length; k++) {
      const i = ch.order[k], th = hit(i);
      if (th == null || t < th || t > th + .1) continue;
      const un = units[i];
      p.sparkle(un.x, un.y, bodyH * .9, k < 12 ? 2 : 1, PL.glint, 1 - (t - th) * 5);
    }
    // a low cloud rolls up off the back ranks on the hit
    const hb = t - 3.8;
    if (hb > -.2 && hb < 1.4 && ch.order.length > 30) {
      const nb = Math.round(26 * Math.min(1.5, p.density));
      for (let k = 0; k < nb; k++) {
        const i = ch.order[Math.floor(ch.order.length * (.7 + .3 * p.r(k, 11)))], th = hit(i);
        if (th == null) continue;
        const u = p.ph(t, th + .05 + .1 * p.r(k, 12), th + 1.0 + .4 * p.r(k, 13));
        if (u <= 0 || u >= 1) continue;
        const e = p.easeOutCubic(u), un = units[i];
        p.ball(un.x + (p.r(k, 14) - .5) * .5 * e, un.y + (p.r(k, 15) - .5) * .5 * e, .12 + .45 * e, .18 + .26 * e, PL.dust, { alpha: .65 * Math.pow(1 - u, 1.1), rough: .55, shadow: false, seed: k + 50 });
      }
    }
    // ---- the pebble ----
    const s0 = st[ch.src], head = s0 ? [s0.u.x, s0.u.y, bodyH * .9] : [this.AREA.x - this.AREA.rx, 0, .1];
    let peb = null;
    if (t >= .72 && t < this.FLICK) {
      const toss = p.env(t, .95, 1.03, 1.05, 1.13);
      peb = [fig.hand[0] + .04, fig.hand[1], fig.hand[2] + .04 + .15 * Math.sin(Math.PI * p.ph(t, .95, 1.13)) * (toss > 0 ? 1 : 0)];
    } else if (t >= this.FLICK && t < TP) {
      const u = p.ph(t, this.FLICK, TP), a = [fig.hand[0], fig.hand[1], fig.hand[2]];
      peb = p.arcPos(a, head, u, .55);
      for (let j = 1; j <= 3; j++) {
        const q = p.arcPos(a, head, Math.max(0, u - j * .07), .55);
        p.dot(q[0], q[1], q[2], PL.glint, .7 - j * .15, 1);
      }
    } else if (t >= TP && t < 5.0) {
      const u = p.ph(t, TP, TP + .35), gx = head[0] - .3, gy = head[1] + .1;
      peb = [p.lerp(head[0], gx, u), p.lerp(head[1], gy, u), Math.max(.05, head[2] * (1 - u) + .3 * 4 * u * (1 - u))];
    }
    if (peb) {
      const fade = 1 - p.ph(t, 4.7, 5.0);
      if (fade > 0) {
        p.rock(peb[0], peb[1], peb[2], .06, PL.pebble, 3, { alpha: fade < 1 ? fade : undefined });
        if (t < TP + .5) p.dot(peb[0], peb[1], peb[2] + .05, PL.glint, .95, 1);
      }
    }
    // the tap: a little white star and chips
    const ta = t - TP;
    if (ta >= 0 && ta < .3) {
      if (ta < .12) p.sparkle(head[0], head[1], head[2] + .05, 3 - ta * 12, PL.glint, 1.1);
      for (let j = 0; j < 3; j++) {
        const d = p.rdir(j, 21, .6), r0 = p.drag(1.2, 7, ta);
        p.dot(head[0] + d[0] * r0, head[1] + d[1] * r0, head[2] + d[2] * r0 - 2 * ta * ta, PL.glint, .9 * (1 - ta / .3), 1);
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.45, 4.65) });
  },
});
