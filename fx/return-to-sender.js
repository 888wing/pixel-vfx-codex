// 箭雨回送 / Return to Sender — Twist pack (original design): ten thousand archers loose one volley at a lone caster, the arrows stop in a hanging wall before one raised hand, turn round in a ripple and rain back down each on the archer who shot it
PXFX.define({
  id: 'return-to-sender',
  loop: 6.5,
  beats: [{ t: 1.15, kind: 'cast', power: .8 }, { t: 2.15, kind: 'hit', power: 1.2 }, { t: 2.55, kind: 'pulse', power: .6 }, { t: 3.0, kind: 'hit', power: 1.4 }],
  view: { r: 6.6, h: 3.9 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'domain', 'crowd', 'troops', 'tally', 'swarm', 'impact'],
  palette: {
    turn: ['#2a6a9a', '#4aa0d0', '#7fd0f4', '#c8f0ff', '#ffffff'],
    sigil: ['#3a7ab0', '#60b0e0', '#a0e0ff', '#e8faff'],
    arrowIn: ['#1c1820', '#2e2832', '#6e6878', '#c8ccd8'],
    arrowBack: ['#3a8ac0', '#7fd0f4', '#c8f0ff', '#ffffff'],
    shield: ['#2a5a8a', '#4a8ac0', '#90c8f0', '#e0f4ff'],
    bow: ['#6e7890', '#a8b4c8', '#e0e8f4'],
    deadBody: ['#1c161a', '#272024', '#342a2c', '#423636'],
    deadHelm: ['#3a2024', '#4e2a2a', '#663632', '#7e463c'],
  },
  timeline: [
    { k: 'pose', t: [0, 1.15], zh: '起手：施法者（縮放 0.7）獨自站在近邊 (−5.2, 0)；對面一萬名弓兵排成方陣（中心 (0.8, 0)、半深 3.8、半寬 3.8，每人 1–2 像素）；0.45–1.15 秒弓兵一齊向後仰身拉弓，舉起的弓在陣上閃起一片鋼灰小光點', en: 'pose: the caster (scale 0.7) stands alone at the near edge (−5.2, 0) facing ten thousand archers in a block (centre (0.8, 0), half depth 3.8, half width 3.8, 1–2 px each); at 0.45–1.15 s the archers lean back together, drawing their bows, and the raised bows speckle the army with steel glints' },
    { k: 'charge', t: [1.15, 2.15], zh: '集氣：1.15 秒萬箭齊發（弓弦一閃），每支箭沿自己的弧線飛向施法者胸口（起點 = 弓兵胸口；高度曲線 = 0.4 × 拋物線 + 0.6 × 後段陡降，所以最後以約 65–80° 俯衝；頂點高約 arc（預設 0.3）×（3 + 0.9 × 水平距離）× 0.8–1.2），放箭時間差 0–0.12 秒、每支箭的快慢略有不同，所以箭雨是一大片雲而不是一條線；天空由大軍上方以抖色圓形擦除換成灰藍陰天（0.6 秒）；畫出約 1500 支代表箭（深色 4 像素短線、亮色箭頭），規則仍按每個弓兵計算；1.4–2.0 秒施法者舉起右手迎向箭雨', en: 'charge: at 1.15 s the whole volley looses (a glint of bowstrings); each arrow flies its own arc towards the caster’s chest (from the archer’s chest; height profile = 0.4 × a parabola + 0.6 × a late plunge, so it comes down at about 65–80°; apex about arc (default 0.3) × (3 + 0.9 × range) × 0.8–1.2), with release offsets of 0–0.12 s and slightly different paces so the volley is a cloud, not a line, while the sky wipes out from above the army into a slate overcast (0.6 s); about 1500 representative arrows are drawn (dark 4 px strokes with light heads), but the rule is still per archer; at 1.4–2.0 s the caster raises the right hand towards the volley' },
    { k: 'shape', t: [2.15, 2.55], zh: '成形：2.15 秒所有箭同時在距施法者胸口 1.4–3.1 的位置停住（一定停在俯衝段，至少飛了 60% 的路），在施法者頭上前方形成一片懸空的箭雲（頓幀＋震屏），箭身微微顫動；手掌前亮起一個面向箭牆的青白色圓形法印（半徑 0.35）', en: 'shape: at 2.15 s every arrow stops dead 1.4–3.1 from the caster’s chest (always on the plunge, at least 60% of the way), a hanging cloud of arrows over and in front of the caster (hit-stop, shake), shafts quivering; a cyan-white circular sigil (radius 0.35) facing the wall lights in front of the palm' },
    { k: 'motion', t: [2.55, 3.8], zh: '推進：2.55 秒施法者向前推掌，掉頭由箭牆中心向外如漣漪擴散（0.32 秒）：每支被扭轉的箭在 0.12 秒內原地翻轉 180°，變成青白色，然後沿自己的弧線倒飛回去，越飛越快（緩入）。判定：弓兵 i 只在 hash(i) < turned（預設 1）時死亡；命中時間 = 2.55 + 漣漪延遲（0–0.32 秒，按箭在牆上離中心的角度）+ 0.12 + 0.1 + 回程弧長 ÷ 20；沒有被扭轉的箭繼續飛，撞碎在施法者身前半徑 0.8 的護盾上（3 片碎屑），其弓兵倖存', en: 'motion: at 2.55 s the caster pushes the palm forward and the turn ripples out from the centre of the wall (0.32 s): each turned arrow flips 180° in place within 0.12 s, turns cyan-white and flies back along its own arc, faster and faster (ease-in). Rule: archer i dies iff hash(i) < turned (default 1); hit time = 2.55 + ripple delay (0–0.32 s, by the arrow’s angle from the centre of the wall) + 0.12 + 0.1 + return arc length / 20; unturned arrows fly on and shatter on a 0.8-radius shield before the caster (3 fragments each), and their archers survive' },
    { k: 'impact', t: [2.95, 3.8], zh: '命中：約 3.0 秒第一批箭射回前排（頓幀＋震屏），箭雨由前排向後排一路落下：每個弓兵閃白後背向施法者倒下並改用暗色調色盤，代表箭插在他身上／腳邊，落點閃一點青光；擊殺計數一路升到 10000/10000 並變金色', en: 'impact: around 3.0 s the first arrows reach the front ranks (hit-stop, shake) and the rain sweeps back through the army: each archer flashes white, falls away from the caster and is redrawn dark, the representative arrow sticks in him / at his feet with a cyan spark; the kill counter climbs to 10000/10000 and turns gold' },
    { k: 'after', t: [3.8, 6.5], zh: '餘波：倒下的陣地插滿深色箭桿、鋼灰箭羽，施法者放下手回到待機；天空 3.9–4.6 秒以圓形擦除收回，擊殺計數 4.3–4.5 秒淡出，屍體與箭 4.5–4.9 秒淡出，新的弓兵方陣 4.9–6.1 秒原地淡入', en: 'aftermath: the fallen field bristles with dark shafts and steel fletching and the caster lowers the hand to idle; the sky wipes back at 3.9–4.6 s, the counter fades at 4.3–4.5 s, the bodies and arrows at 4.5–4.9 s, and a fresh block of archers fades in on its spots at 4.9–6.1 s' },
  ],
  layers: [
    { zh: '大軍與陣型：弓兵數量 2000–12000（預設 10000），按陣型（預設方陣）排在中心 (0.8, 0)、半深 3.8、半寬 3.8 的範圍內，不拿長矛，一萬人時是一片 1–2 像素的紅頭盔海；左上角擊殺計數「骷髏 已擊殺/總數」隨箭雨落下即時累加，全滅時變金色', en: 'army and formation: 2000–12000 archers (default 10000) in a formation (default block) inside centre (0.8, 0), half depth 3.8, half width 3.8, no spears; ten thousand are a sea of 1–2 px red helmets; the kill counter "skull killed/total" in the top-left climbs as the rain lands and turns gold on a full wipe' },
    { zh: '判定與倖存者：每個弓兵射一支箭，只會被自己那支箭射回；hash(i) < turned 的箭被扭轉，其弓兵死；其餘的箭撞碎在護盾上，弓兵倖存並原地發抖。所以 turned 決定死多少、arc 決定每支箭回程多久（arc 越高，回程越長、越遲落地）；陣型只改變箭雨的形狀，不改變死不死', en: 'rule and survivors: every archer shoots one arrow and can only be hit by his own arrow coming back; arrows with hash(i) < turned are turned and their archers die; the rest shatter on the shield and those archers survive and tremble. So `turned` decides how many die and `arc` how long each return takes (a higher arc means a longer, later return); the formation only shapes the rain, not who dies' },
    { zh: '箭：每支代表箭是 4–6 像素的實心短線（在後處理中逐像素畫入，有深度測試）：來程深色箭身＋淺色箭頭，回程青白色並隨速度拉長到約 2 倍；插地後箭桿深色，箭羽青光 0.12 秒後變鋼灰；箭的方向 = 弧線切線；每支箭的停點、漣漪延遲、回程長度按弓兵各算一次並緩存', en: 'arrows: each representative arrow is a 4–6 px solid stroke drawn pixel by pixel in a post pass with a depth test: dark shaft and light head on the way in, cyan-white and stretched up to about twice as long with speed on the way back; once stuck, a dark shaft whose cyan fletching turns steel grey after 0.12 s; direction = the arc tangent; every archer’s stop point, ripple delay and return length are computed once and cached' },
    { zh: '箭雲與法印：停住的箭在施法者頭上前方聚成一片厚箭雲（距胸口 1.4–3.1），顫動 0.3 秒；掌前青白法印 = 兩個同心圓環＋4 條短刻度，凍結時以回彈出現，掉頭時閃亮後收縮', en: 'cloud and sigil: the stopped arrows form a thick cloud over and in front of the caster (1.4–3.1 from the chest), quivering for 0.3 s; the palm sigil is two concentric cyan-white rings plus 4 ticks, popping in with an overshoot at the freeze, flaring on the turn and collapsing' },
    { zh: '天空：領域模組換成灰藍陰天（#363c4c → #7a8292，箭雨遮天），深色來程箭與青白回程箭在白天頁面都看得清楚；陣地上空在箭雨落下時有一片青色地面光', en: 'sky: the domain module swaps in a slate overcast (#363c4c → #7a8292, the volley blots out the sky), so both the dark incoming and the cyan-white returning arrows read on the white day page; a cyan ground light washes over the army as the rain lands' },
    { zh: '弓兵反應（自訂，一萬人也便宜）：拉弓時向後仰並微抖，放箭時彈回直立；中箭時閃白，背向施法者在 0.3 秒內倒下，倒地後改用暗色調色盤重畫（只記索引與傾角）；落地處插著代表箭', en: 'archer reactions (custom, cheap at ten thousand): lean back and tremble while drawing, snap upright on the release; on the hit a white flash and a fall away from the caster within 0.3 s, then a redraw with a dark palette (only index and tilt kept); the representative arrow stays stuck where it landed' },
  ],
  params: {
    crowd: { zh: '弓兵數量', en: 'archer count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    turned: { zh: '扭轉比例', en: 'turned fraction', min: 0, max: 1, step: .05, value: 1 },
    arc: { zh: '箭雨弧度', en: 'volley arc', min: .15, max: .5, step: .01, value: .3 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  CASTER: [-5.2, 0],
  LOOSE: 1.15, FREEZE: 2.15, TURN: 2.55, RIP: .32, FLIP: .12, VR: 20, RSH: .8,
  SKY: { top: '#363c4c', bottom: '#7a8292', nebula: '#5a6272', stars: 0 },
  // the volley's height profile along u (0 = archer, 1 = caster): a lob that plunges steeply at the end (~65 degrees),
  // so the stopped arrows hang over the caster's head instead of in front of him
  shape(u) { return .4 * 4 * u * (1 - u) + .6 * 9.48 * u * u * u * (1 - u); },
  dshape(u) { return .4 * 4 * (1 - 2 * u) + .6 * 9.48 * (3 * u * u - 4 * u * u * u); },
  // per archer: the arc, where it stops, the ripple delay and the hit time (cached per layout + arc)
  plan(p, units, arcK, sc) {
    const self = this;
    const key = arcK + '|' + sc;
    if (this._pl && this._pl.units === units && this._pl.key === key) return this._pl;
    const N = units.length, C = [this.CASTER[0] + .08, this.CASTER[1], .75], z0 = .55 * .62 * sc;
    const H = new Float32Array(N), uf = new Float32Array(N), us = new Float32Array(N), F = new Float32Array(N * 3), back = new Float32Array(N);
    const hsh = new Float32Array(N), rp = new Float32Array(N), tL = new Float32Array(N), gm = new Float32Array(N);
    const pos = (i, u, out) => {
      const un = units[i];
      out[0] = un.x + (C[0] - un.x) * u; out[1] = un.y + (C[1] - un.y) * u; out[2] = z0 + (C[2] - z0) * u + H[i] * self.shape(u);
      return out;
    };
    const q = [0, 0, 0];
    const dist = (i, u) => { pos(i, u, q); return Math.hypot(q[0] - C[0], q[1] - C[1], q[2] - C[2]); };
    const solve = (i, R) => {   // the last point of the arc at distance R from the chest: step back from the end, then bisect
      R = Math.min(R, dist(i, .6));   // always stop on the plunge, never near the archer
      let lo = 1;
      while (lo > 0 && dist(i, lo) < R) lo -= .02;
      lo = Math.max(0, lo);
      let hi = Math.min(1, lo + .02);
      for (let k = 0; k < 12; k++) { const m = (lo + hi) / 2; if (dist(i, m) > R) lo = m; else hi = m; }
      return (lo + hi) / 2;
    };
    let mx = 0, my = 0, mz = 0;
    for (const un of units) {
      const i = un.i, d = Math.hypot(C[0] - un.x, C[1] - un.y);
      H[i] = arcK * (3 + .9 * d) * (.8 + .4 * un.r2);
      uf[i] = solve(i, 1.4 + 1.7 * un.r3);
      us[i] = solve(i, this.RSH);
      pos(i, uf[i], q); F[i * 3] = q[0]; F[i * 3 + 1] = q[1]; F[i * 3 + 2] = q[2];
      const l = Math.hypot(q[0] - C[0], q[1] - C[1], q[2] - C[2]);
      mx += (q[0] - C[0]) / l; my += (q[1] - C[1]) / l; mz += (q[2] - C[2]) / l;
      // return arc length from the stop point back to the archer (8 segments)
      let L = 0, px = q[0], py = q[1], pz = q[2];
      for (let k = 1; k <= 8; k++) { pos(i, uf[i] * (1 - k / 8), q); L += Math.hypot(q[0] - px, q[1] - py, q[2] - pz); px = q[0]; py = q[1]; pz = q[2]; }
      back[i] = .1 + L / this.VR;
      hsh[i] = PXFX.hash(i * 1.37 + .5, 7.7);
      tL[i] = this.LOOSE + .12 * un.r1;
      gm[i] = .75 + .6 * PXFX.hash(i * .71 + .2, 4.4);
    }
    const ml = Math.hypot(mx, my, mz) || 1, ax = [mx / ml, my / ml, mz / ml];
    let amax = 1e-3;
    const ang = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const dx = F[i * 3] - C[0], dy = F[i * 3 + 1] - C[1], dz = F[i * 3 + 2] - C[2], l = Math.hypot(dx, dy, dz) || 1;
      ang[i] = Math.acos(Math.max(-1, Math.min(1, (dx * ax[0] + dy * ax[1] + dz * ax[2]) / l)));
      amax = Math.max(amax, ang[i]);
    }
    for (let i = 0; i < N; i++) rp[i] = this.RIP * ang[i] / amax;
    // representative arrows: ~1 in 6.5, spread evenly by a hash
    const rep = [];
    for (let i = 0; i < N; i++) if (PXFX.hash(i * .618 + .3, 2.9) < 1500 / N) rep.push(i);
    this._pl = { units, key, C, z0, H, uf, us, F, back, hsh, rp, tL, gm, rep, ax, pos };
    return this._pl;
  },
  draw(p, t) {
    const PL = this.palette, CA = this.CASTER, FR = this.FREEZE, TURN = this.TURN, FLIP = this.FLIP;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const turned = p.param('turned'), arcK = p.param('arc');
    const co = { n, seed: 17, formation: form, area: this.AREA, faceTo: CA };
    const units = p.crowdLayout(co);
    const sc = p.clamp((units.spacing || .4) / .4, .08, 1.5);
    const pl = this.plan(p, units, arcK, sc), C = pl.C;
    const isT = i => pl.hsh[i] < turned;
    const tR0 = i => TURN + pl.rp[i] + FLIP;                // the arrow starts back
    const hitT = i => (isT(i) ? tR0(i) + pl.back[i] : null);
    let anyUnturned = false;
    for (const i of pl.rep) if (!isT(i)) { anyUnturned = true; break; }
    // ---- caster ----
    let pose;
    if (t < 1.4) pose = 'idle';
    else if (t < 2.1) pose = { a: 'idle', b: 'point', k: p.easeOutCubic(p.ph(t, 1.4, 2.0)) };
    else if (t < 2.5) pose = { a: 'point', b: 'raise', k: .7 * p.easeOutBack(p.ph(t, 2.05, 2.2), 2) };
    else if (t < 3.9) pose = { a: 'point', b: 'palm', k: p.easeOutExpo(p.ph(t, 2.5, 2.6)) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.9, 4.6)) };
    const fig = p.figure(CA[0], CA[1], { pose, scale: .7, lean: t > 2.5 && t < 2.8 ? .12 * Math.exp(-(t - 2.55) * 10) : 0 });
    // ---- the archers ----
    // archers on the ground are redrawn with a dark palette (keep only index + tilt; no per-frame copies)
    const DOWN = [], dTilt = [];
    const st = p.crowd(Object.assign({
      t, scale: 'auto', spears: false,
      hit: u => hitT(u.i),
      react: (s, a, u) => {
        s.walk = null; s.tilt = Math.PI / 2 * p.easeIn(a / .3); s.spear = false;
        if (a > .32) { s.hide = true; if (t < 4.5 + u.r2 * .2 + .2) { DOWN.push(u.i); dTilt.push(s.tilt); } }
      },
      at: [CA[0], CA[1], 0],
      fear: u => {
        const draw = p.env(t, .45, .9, 1.1, 1.18) * (.7 + .3 * u.r2);
        return isT(u.i) ? draw : Math.max(draw, .5 * p.env(t, TURN + .2, TURN + .4, 4.2, 4.6));
      },
      respawn: [4.9, 6.1], clear: [4.5, 4.9], enter: 'fade',
    }, co));
    const dr = st.lod === 'sprite' ? p.pawnSprite : p.pawn, po = { scale: st.scale, pal: { body: PL.deadBody, helm: PL.deadHelm }, spears: false };
    const c = { i: 0, vr: 0, x: 0, y: 0, z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: 0, alpha: 1, walk: null, spear: false };
    for (let k = 0; k < DOWN.length; k++) {
      const u = units[DOWN[k]], st0 = 4.5 + u.r2 * .2, dx = u.x - CA[0], dy = u.y - CA[1], dl = Math.hypot(dx, dy) || 1;   // the kit's corpse fade
      c.i = u.i; c.vr = u.vr; c.x = u.x; c.y = u.y; c.tilt = dTilt[k]; c.tdir[0] = dx / dl; c.tdir[1] = dy / dl; c.face = u.face;
      c.alpha = 1 - p.ph(t, st0, st0 + .2);
      dr.call(p, c, po);
    }
    // ---- the sky goes dark under the volley ----
    const skyK = t < 3 ? p.easeOutCubic(p.ph(t, 1.2, 1.8)) : 1 - p.ph(t, 3.9, 4.6);
    if (skyK > .01) p.domain({ amt: skyK, c: [this.AREA.x, 0, 3], sky: this.SKY, solids: .05, t: 0 });
    // ---- arrows: solid pixel strokes in a post pass ----
    const segs = [];   // [x0, y0, z0, x1, y1, z1, colour set]
    const q = [0, 0, 0], q2 = [0, 0, 0];
    const tang = (i, u) => { const un = units[i], H = pl.H[i]; return [C[0] - un.x, C[1] - un.y, C[2] - pl.z0 + H * this.dshape(u)]; };
    const nrm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
    const push = (c, d, len, col) => segs.push(c[0] - d[0] * len, c[1] - d[1] * len, c[2] - d[2] * len, c[0], c[1], c[2], col);
    const AL = .3, nRep = Math.min(pl.rep.length, Math.round(pl.rep.length * Math.min(2, p.density)));
    const sparks = [], stuck = [];
    for (let k = 0; k < nRep; k++) {
      const i = pl.rep[k], tl = pl.tL[i];
      if (t < tl) continue;
      const T = isT(i), uf = pl.uf[i];
      if (t < FR) {
        // in flight: constant speed along the arc, every arrow reaching its stop point at the freeze
        const u = uf * Math.pow((t - tl) / (FR - tl), pl.gm[i]), d = nrm(tang(i, u));
        pl.pos(i, u, q); push(q, d, AL * 1.35, 0);
        continue;
      }
      const tt = TURN + pl.rp[i];
      if (t < tt) {
        // frozen in the wall, quivering
        const d = nrm(tang(i, uf)), a = t - FR, qv = .025 * Math.exp(-a * 9) * Math.sin(a * 70 + i);
        q[0] = pl.F[i * 3] + d[0] * qv; q[1] = pl.F[i * 3 + 1] + d[1] * qv; q[2] = pl.F[i * 3 + 2] + d[2] * qv;
        push(q, d, AL * .8, 0);
        continue;
      }
      if (!T) {
        // unturned: flies on and shatters on the shield
        const a = t - tt, us = pl.us[i];
        if (a < .08) { const u = uf + (us - uf) * a / .08, d = nrm(tang(i, u)); pl.pos(i, u, q); push(q, d, AL, 0); }
        else if (a < .6) {
          pl.pos(i, us, q2);
          const b = a - .08;
          for (let j = 0; j < 3; j++) {
            const r = p.rdir(i * 3 + j, 61, .3), v = .9 + .6 * p.r(i * 3 + j, 62);
            sparks.push([q2[0] + r[0] * v * b, q2[1] + r[1] * v * b, Math.max(.03, q2[2] + r[2] * v * b - 4.9 * b * b), 1 - b / .52]);
          }
        }
        continue;
      }
      const tb = tt + FLIP, th = tb + pl.back[i];
      if (t < tb) {
        // the flip: the arrow spins 180 degrees in place (vertical plane), turning cyan half way
        const k = p.easeOutCubic((t - tt) / FLIP), d0 = nrm(tang(i, uf)), h = Math.hypot(d0[0], d0[1]) || 1;
        const side = [-d0[2] * d0[0] / h, -d0[2] * d0[1] / h, h], ca = Math.cos(Math.PI * k), sa = Math.sin(Math.PI * k);
        const d = [d0[0] * ca + side[0] * sa, d0[1] * ca + side[1] * sa, d0[2] * ca + side[2] * sa];
        q[0] = pl.F[i * 3] - d[0] * AL / 2; q[1] = pl.F[i * 3 + 1] - d[1] * AL / 2; q[2] = pl.F[i * 3 + 2] - d[2] * AL / 2;
        q2[0] = q[0] + d[0] * AL; q2[1] = q[1] + d[1] * AL; q2[2] = q[2] + d[2] * AL;
        push(q2, d, AL, k > .5 ? 2 : 0);
        if (k > .4 && k < .7) sparks.push([pl.F[i * 3], pl.F[i * 3 + 1], pl.F[i * 3 + 2], 1.2]);
        continue;
      }
      if (t < th) {
        // back along its own arc, accelerating (ease-in), stretched with speed
        const k = (t - tb) / pl.back[i], u = uf * (1 - k * k), d = nrm(tang(i, u));
        d[0] = -d[0]; d[1] = -d[1]; d[2] = -d[2];
        pl.pos(i, u, q); push(q, d, AL * (1.1 + 1.1 * k), 1);
        continue;
      }
      // stuck where the archer stood
      if (t < 4.9) {
        const un = units[i], d = nrm(tang(i, 0)), a = t - th;
        stuck.push(un.x, un.y, d, a);
        if (a < .1) sparks.push([un.x, un.y, .08, 1.3 * (1 - a / .1)]);
      }
    }
    const COL = [
      [PL.arrowIn[1], PL.arrowIn[3]],            // incoming / frozen: dark shaft, light head
      [PL.arrowBack[1], PL.arrowBack[3]],        // returning: cyan streak, white head
      [PL.arrowBack[0], PL.arrowBack[3]],        // flipping
      [PL.arrowIn[1], PL.arrowIn[2]],            // stuck, glow gone: dark shaft, steel fletching
      [PL.arrowBack[1], PL.arrowBack[3]],        // stuck, still glowing
    ].map(c => c.map(h => { const v = PXFX.hex(h); return PXFX.rgb(v[0], v[1], v[2]); }));
    const fadeS = 1 - p.ph(t, 4.5, 4.9);
    for (let k = 0; k < stuck.length; k += 4) {
      const x = stuck[k], y = stuck[k + 1], d = stuck[k + 2], a = stuck[k + 3];
      const tip = [x - d[0] * .02, y - d[1] * .02, .01];   // buried tip; the shaft leans back the way it came, fletching up
      segs.push(tip[0], tip[1], tip[2], tip[0] + d[0] * AL * .6, tip[1] + d[1] * AL * .6, tip[2] + d[2] * AL * .6, a < .12 ? 4 : 3);
    }
    if (segs.length) {
      p.post(({ pix, zb, kind, W, H, P, bayer }) => {
        for (let k = 0; k < segs.length; k += 7) {
          const A = P(segs[k], segs[k + 1], segs[k + 2]), B = P(segs[k + 3], segs[k + 4], segs[k + 5]);
          if (!A || !B) continue;
          const cs = COL[segs[k + 6]], stuckSeg = segs[k + 6] >= 3;
          const m = Math.max(1, Math.round(Math.max(Math.abs(B[0] - A[0]), Math.abs(B[1] - A[1]))));
          for (let j = 0; j <= m; j++) {
            const f = j / m, ix = Math.floor(A[0] + (B[0] - A[0]) * f), iy = Math.floor(A[1] + (B[1] - A[1]) * f);
            if (ix < 0 || iy < 0 || ix >= W || iy >= H) continue;
            if (stuckSeg && fadeS < 1 && bayer(ix, iy) >= fadeS) continue;
            const i = iy * W + ix, dd = A[2] + (B[2] - A[2]) * f + .04;
            if (dd <= zb[i]) continue;
            pix[i] = j === m ? cs[1] : cs[0]; zb[i] = dd; kind[i] = 4;
          }
        }
      });
    }
    // ---- light ----
    // raised bows catch the light while the archers draw
    const bows = p.env(t, .5, .8, 1.1, 1.2);
    if (bows > 0) for (let k = 1; k < nRep; k += 2) { const un = units[pl.rep[k]]; p.dot(un.x, un.y, pl.z0 * 2.2 + .04, PL.bow, .6 * bows, 1); }
    // bowstrings glint on the release
    if (t >= this.LOOSE && t < this.LOOSE + .1) {
      const I = 1 - (t - this.LOOSE) / .1;
      for (let k = 0; k < nRep; k += 2) { const un = units[pl.rep[k]]; p.dot(un.x, un.y, pl.z0 + .05, PL.turn, .9 * I, 1); }
    }
    // the palm sigil facing the wall
    const sg = p.env(t, FR - .05, FR + .05, TURN + .1, TURN + .3);
    if (sg > 0) {
      const h = fig.hand, ax = pl.ax, pop = p.easeOutBack(p.ph(t, FR - .05, FR + .12), 2) * (1 - p.easeInCubic(p.ph(t, TURN + .1, TURN + .3)));
      const c = [h[0] + ax[0] * .18, h[1] + ax[1] * .18, h[2] + ax[2] * .18], fl = 1 + .6 * p.env(t, TURN - .03, TURN, TURN + .03, TURN + .12);
      p.ring(c[0], c[1], c[2], .35 * pop, .05, PL.sigil, sg * fl, { axis: ax });
      p.ring(c[0], c[1], c[2], .2 * pop, .04, PL.sigil, .8 * sg * fl, { axis: ax });
      p.glow(c[0], c[1], c[2], .3, PL.turn, .6 * sg * fl);
    }
    // the shield, only when some arrows are not turned
    if (anyUnturned) {
      const shI = p.env(t, FR - .1, FR + .1, TURN + .8, TURN + 1.1) * (.35 + .65 * p.env(t, TURN, TURN + .05, TURN + .45, TURN + .7));
      if (shI > 0) p.shell(C[0], C[1], C[2], this.RSH, (nx, ny, nz, rim) => Math.pow(rim, 3) * (nx * pl.ax[0] + ny * pl.ax[1] + nz * pl.ax[2] > .1 ? 1 : .2), PL.shield, .9 * shI, { back: 0 });
    }
    for (const s of sparks) p.dot(s[0], s[1], s[2], PL.turn, s[3], 1);
    // cyan wash over the army while the rain lands
    const rain = p.env(t, 2.9, 3.05, 3.6, 4.0);
    if (rain > 0) p.light(this.AREA.x, 0, 0, 5.2, PL.turn, .55 * rain);
    if (t >= TURN && t < TURN + .45) p.light(C[0], C[1], 0, 2.2, PL.turn, .7 * (1 - p.ph(t, TURN, TURN + .45)));
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.5) });
  },
});
