// 審判光柱 / Judgment Lances — Mass Spells pack (original design): lock-on marks light up over every soldier, then a forest of light pillars falls at once
PXFX.define({
  id: 'judgment-lances',
  loop: 4.6,
  beats: [{ t: .6, kind: 'cast', power: .8 }, { t: 1.82, kind: 'pulse', power: .5 }, { t: 2.2, kind: 'hit', power: 1.4 }],
  view: { r: 4.8, h: 3.6 },
  stage: { ground: 'stone' },
  modules: ['figure', 'charge', 'crowd', 'domain', 'impact', 'aftermath'],
  palette: {
    light: ['#9a5a2a', '#d08a36', '#f2b84a', '#ffe08a', '#fff2c4', '#fffef6'],
    sigil: ['#a8482c', '#e07a34', '#ffb84a', '#ffe8a0', '#fffbea'],
    scorch: ['#1e1812', '#2e2418', '#46382a', '#5e4c3a'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者由站姿舉起右手（0.55 秒，回彈緩動），手心聚集 12 顆金色光點；敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster raises the right hand (0.55 s, overshoot ease) while 12 golden motes gather in the palm; a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.6, 1.8], zh: '集氣：0.6 秒一道細光束由手心射上天空；之後由最接近施法者的敵兵開始，沿最近鄰鏈逐一在頭頂 0.36 處亮起鎖定符號（直徑 0.42，0.16 秒回彈彈出），間隔越來越短，約 1 秒鎖完全場；每個符號出現前 0.1 秒有一道追蹤光由手飛到該處；天空以抖色圓形擦除轉為暗紫黃昏', en: 'charge: at 0.6 s a thin beam shoots from the palm into the sky; then, starting with the soldier nearest the caster and following a nearest-neighbour chain, a lock-on sigil (0.42 wide, 0.16 s overshoot pop) lights up 0.36 above each head with shrinking gaps, the whole horde locked in about 1 s; a tracer flies from the hand to each sigil 0.1 s before it appears; a dithered radial wipe turns the sky to a dark violet dusk' },
    { k: 'shape', t: [1.8, 2.12], zh: '成形：停頓一拍：所有符號在 1.82、1.97、2.08 秒同步脈衝（放大 25%），最後收緊轉白；地面與敵兵再壓暗，敵群向後縮並發抖；2.0 秒起每個符號向上伸出一條長 2.4 的 1 像素導引線', en: 'shape: a one-beat pause: every sigil pulses in sync at 1.82, 1.97 and 2.08 s (25% larger), then tightens and turns white; the ground and soldiers darken further, the horde leans back and trembles; from 2.0 s a 1 px guide line grows 2.4 units up from each sigil' },
    { k: 'motion', t: [2.12, 2.2], zh: '推進：施法者把手向前劈下，數十道光柱在 0.09 秒內由畫面頂部之外（高 10）以三次方緩入加速落到每個敵兵身上', en: 'motion: the caster chops the hand forward and dozens of light pillars fall from above the frame (height 10) onto every soldier within 0.09 s, accelerating with a cubic ease-in' },
    { k: 'impact', t: [2.2, 2.75], zh: '命中：1 格黑白衝擊格＋頓幀；每道光柱 = 寬 0.13 的白熱核心＋約 0.3 寬的柔和光暈、底部光球、半徑 0.85 地面光池與擴散到 0.6 的光環；命中時間 = 2.2 + 0.015 × 隨機（幾乎同時），敵兵全身變白發光，0.6 秒內化成光點蒸發；光柱在 0.55 秒內變細消失', en: 'impact: one two-tone impact frame and a hit-stop; each pillar = a 0.13 wide white-hot core, a ~0.3 wide soft halo, a base flare, a 0.85 radius light pool and a ring spreading to 0.6; hit time = 2.2 + 0.015 × random (all but simultaneous), each soldier turns white and glowing and evaporates into motes within 0.6 s; the pillars thin to nothing over 0.55 s' },
    { k: 'after', t: [2.75, 4.6], zh: '餘波：每個落點升起 3 顆光點，留下半徑 0.3 的焦黑圓環，於 3.3–4.1 秒淡出；天色在 2.9–3.7 秒復原；新一批敵兵在 3.5–4.5 秒由右邊走回原位', en: 'aftermath: three motes rise from every strike point, each leaving a scorched ring of radius 0.3 that fades over 3.3–4.1 s; the sky returns over 2.9–3.7 s; a fresh horde walks back in from the right over 3.5–4.5 s' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6），在以 x = 1.2 為中心、半徑 2.5 × 2.1 的橢圓內均勻但不規則分佈；反應為「蒸發」：變白、發光、溶解成上升光點', en: 'horde: 30–60 small soldiers (~0.6 tall) spread evenly but irregularly in a 2.5 × 2.1 ellipse centred at x = 1.2; reaction "vaporise": turns white, glows and dissolves into rising motes' },
    { zh: '鎖定符號：面向鏡頭的 0.42 寬發光卡片，外圈為三段缺口圓環（每秒轉 3 弧度），中央實心菱形；彈出時亮一下並放出一圈 0.12→0.42 的擴散小環', en: 'lock-on sigil: a camera-facing 0.42 wide light card, an outer ring broken into three arcs (spinning 3 rad/s) around a solid diamond; flashes on its pop and sends out a small ring that grows from 0.12 to 0.42' },
    { zh: '追蹤光：每個符號出現前 0.1 秒，一段漸細光線由施法者手心加速飛到符號位置', en: 'tracer: 0.1 s before each sigil appears, a tapering streak accelerates from the caster’s palm to the sigil' },
    { zh: '天色：以敵群上空為中心的抖色圓形擦除，背景換成暗紫黃昏天空（稀疏金色星點），地面換成暗灰石色，敵兵壓暗 15–40%；光效保持高亮', en: 'sky: a dithered radial wipe centred above the horde swaps the background for a dark violet dusk sky (sparse gold stars) and the ground for dark grey stone, soldiers darkened 15–40%; the light stays bright' },
    { zh: '光柱：每個敵兵一條由高 10 直落地面的垂直光柱：白熱核心＋寬 2.4 倍、強度 36% 的光暈；命中頭 0.08 秒加寬 70%，之後按 (1 − t/0.55)^1.6 變細', en: 'pillars: one vertical light pillar per soldier from height 10 to the ground: a white-hot core plus a halo 2.4× wider at 36% intensity; 70% wider for the first 0.08 s, then thinning by (1 − t/0.55)^1.6' },
    { zh: '地面：每道光柱的地面光池與擴散光環，命中瞬間全場一個半徑 3.4 的大光池；之後留下焦黑圓環（寬 0.14 的深褐色環）', en: 'ground: a light pool and a spreading ring under every pillar, one big light pool of radius 3.4 over the whole field at the hit, then scorched rings (a 0.14 wide dark brown band) left behind' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    pillarWidth: { zh: '光柱粗細', en: 'pillar width', min: .5, max: 1.8, step: .05, value: 1 },
    lockSpeed: { zh: '鎖定速度', en: 'lock-on speed', min: .9, max: 2.5, step: .05, value: 1 },
    darkness: { zh: '天色轉暗', en: 'sky darkening', min: 0, max: 1, step: .05, value: .8 },
  },
  sky: { top: '#120c1a', bottom: '#33243a', nebula: '#4c3446', stars: .01, star: '#ffe8a0' },
  dimStone: ['#3c3944', '#4a4752', '#585560', '#66636e'],
  darkStone: ['#2c2a34', '#383640', '#45434d', '#524f5a'],
  // lock-on order: nearest-neighbour chain starting at the soldier closest to the caster (cached per layout)
  order(p, units) {
    if (this._ord && this._ord.units === units) return this._ord.rank;
    const rank = new Array(units.length);
    p.crowdChain(units, -3.5, .2).forEach((u, k) => { rank[u.i] = k; });
    this._ord = { units, rank };
    return rank;
  },
  // targeting reticle: a ring broken into three spinning arcs around a solid diamond (u, v in -1..1)
  reticle(u, v, rot) {
    const rho = Math.hypot(u, v);
    if (rho > 1) return 0;
    if (rho > .64) {
      const a = Math.atan2(v, u) + rot, f = ((a / (Math.PI * 2 / 3)) % 1 + 1) % 1;
      return f < .74 ? .72 : 0;
    }
    const d = Math.abs(u) + Math.abs(v);
    return d < .38 ? 1 : 0;
  },
  draw(p, t) {
    const PL = this.palette, L = PL.light, SG = PL.sigil, CAST = .6, HIT = 2.2, CX = 1.2, CY = 0, ZT = 10;
    const n = Math.round(p.param('crowd')), wid = p.param('pillarWidth'), spd = p.param('lockSpeed'), dk = p.param('darkness');
    // ---- caster: raise one hand, chop it forward on the hit ----
    let pose;
    if (t < CAST) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .05, CAST), 1.3) };
    else if (t < HIT - .1) pose = 'raise';
    else if (t < HIT) pose = { a: 'raise', b: 'point', k: p.easeInCubic(p.ph(t, HIT - .1, HIT)) };
    else if (t < 3.1) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.1, 3.9)) };
    const fig = p.figure(-3.5, .2, { pose }), hand = fig.hand;
    // ---- the horde ----
    const area = { x: CX, y: CY, rx: 2.5, ry: 2.1 }, seed = 7;
    const units = p.crowdLayout({ n, seed, area }), rank = this.order(p, units);
    const lockT = u => .72 + .95 / spd * Math.pow(n > 1 ? rank[u.i] / (n - 1) : 0, .78);
    const pause = p.ph(t, 1.78, 2.06);
    const crowd = p.crowd({
      n, seed, area, t, at: [CX, CY, 0],
      hit: u => HIT + .015 * u.r1,
      react: 'vapor', ramp: L,
      fear: u => (t > lockT(u) ? .22 : 0) + .78 * pause * (.6 + .4 * u.r3),
      respawn: [3.5, 4.5], from: [1, .1],
    });
    // ---- scorched rings under every strike (ground marks: before the domain) ----
    const sc = 1 - p.ph(t, 3.3, 4.1);
    if (t > HIT && sc > 0) {
      const rr = .3 * Math.sqrt(wid);
      for (const s of crowd) {
        if (s.fresh || t < s.hitT) continue;
        const g = p.easeOutExpo((t - s.hitT) / .12);
        p.stain(s.u.x, s.u.y, rr + .16, (dx, dy, rho) => (p.band(rho, rr * g, .14) * 1.5 + (rho < rr * .45 ? .45 : 0)) * (.8 + .4 * p.noise(dx * 6 + s.u.i, dy * 6)), PL.scorch[1], sc);
      }
    }
    // ---- the world goes dusk-dark; a little darker still during the pause ----
    const skyK = dk * (t < HIT ? p.easeOutCubic(p.ph(t, .7, 1.6)) : 1 - p.ph(t, 2.9, 3.7));
    const deep = t < HIT + .3 ? pause : 0;
    if (skyK > .01) p.domain({ amt: skyK, c: [CX, CY, 3], sky: this.sky, ground: skyK > .45 ? (deep > .5 ? this.darkStone : this.dimStone) : null, solids: .15 + .3 * deep, t });
    // ---- light: palm charge and the signal beam ----
    if (t < CAST + .05) {
      const ch = p.ph(t, .05, CAST);
      p.charge(hand[0], hand[1], hand[2] + .1, ch, { n: 12, R: 1, ramp: L, up: .3 });
      p.glow(hand[0], hand[1], hand[2] + .1, .12 + .18 * ch, L, .8 * ch);
    }
    const ca = t - CAST;
    if (ca >= 0 && ca < .45) {
      const k = p.easeOutExpo(ca / .12), f = 1 - p.ph(ca, .08, .45);
      p.line([hand[0], hand[1], hand[2] + .15], [hand[0], hand[1], hand[2] + .2 + 9 * k], .16 * f + .02, L, 1.3 * f, { w1: .03 });
      p.glow(hand[0], hand[1], hand[2] + .1, .55 * f, L, 1.2 * f);
    }
    if (ca >= 0 && t < HIT + .15) p.glow(hand[0], hand[1], hand[2] + .08, .17 + .03 * Math.sin(t * 17), L, .75 * (1 - p.ph(t, HIT, HIT + .15)));
    // ---- lock-on sigils, tracers and guide lines ----
    const c = p.cam(), pulseTimes = [1.82, 1.97, 2.08];
    let beat = 0;
    for (const tp of pulseTimes) if (t >= tp) beat = Math.max(beat, Math.pow(1 - p.ph(t, tp, tp + .12), 3));
    const tight = p.ph(t, 2.08, 2.18), guide = p.ph(t, 2.0, 2.13);
    for (const s of crowd) {
      const u = s.u, tl = lockT(u);
      if (s.fresh || s.hidden || t < tl - .1 || t >= s.hitT) continue;
      const hd = s.head, S = [hd[0], hd[1], hd[2] + .36];
      if (t < tl) {
        const k = p.easeIn((t - (tl - .1)) / .1), A = p.v3.lerp(hand, S, Math.max(0, k - .35)), B = p.v3.lerp(hand, S, k);
        p.line(A, B, .02, SG, .5, { w1: .06, i1: 1 });
        continue;
      }
      const pop = p.easeOutBack(p.ph(t, tl, tl + .16), 2.6), fl = 1 - p.ph(t, tl, tl + .14);
      const size = .42 * pop * (1 + .25 * beat) * (1 - .22 * tight), rot = t * 3 * (u.r2 > .5 ? 1 : -1) + u.r2 * 6 + tight * 4;
      p.card(S[0], S[1], S[2], size, size, (uu, vv) => this.reticle(uu, vv, rot), SG, .74 + .9 * fl + .45 * beat + .45 * tight);
      if (fl > 0) p.ring(S[0], S[1], S[2], .12 + .3 * (1 - fl), .04, SG, fl, { axis: c.fwd });
      if (guide > 0) p.line([S[0], S[1], S[2] + .22], [S[0], S[1], S[2] + .3 + 2.4 * p.easeOutCubic(guide)], .02, L, .3 * (1 - .5 * tight), { i1: 0 });
    }
    // ---- impact frame on the hit (before the pillars, so they stay in colour) ----
    const a0 = t - HIT;
    if (a0 >= 0 && a0 < .03 + 1 / 30) p.impactFrame({ ink: '#1c1208', paper: '#fff8e6', accent: '#ffc040' });
    // ---- the pillars: fall from above the frame, thin out over ~0.55 s ----
    for (const s of crowd) {
      if (s.fresh) continue;
      const u = s.u, a = t - s.hitT, x = u.x, y = u.y;
      if (a < -.09 || a > .62) continue;
      if (a < 0) {
        const k = p.easeInCubic((a + .09) / .09), zf = ZT * (1 - k);
        p.line([x, y, ZT], [x, y, zf], .05 * wid, L, .5, { w1: .14 * wid, i1: 1.3 });
        p.glow(x, y, zf, .2 * wid, L, .8);
        continue;
      }
      const thin = Math.pow(1 - p.ph(a, .03, .55), 1.6), kick = 1 + .7 * (1 - p.ph(a, 0, .08));
      if (thin > 0) {
        const w = .13 * wid * thin * kick;
        p.line([x, y, 0], [x, y, ZT], w * 2.4, L, .36 * thin + .15 * (kick - 1), { pow: 2 });
        p.line([x, y, 0], [x, y, ZT], w, L, 1.35);
        p.glow(x, y, .14, .34 * wid * kick, L, 1.1 * thin);
        p.light(x, y, 0, .85 * Math.sqrt(wid), L, 1.1 * thin);
      }
      if (a < .3) p.ring(x, y, .03, .1 + .5 * Math.sqrt(wid) * p.easeOutExpo(a / .3), .06 * (1 - a / .3) + .02, L, 1 - a / .3);
    }
    if (a0 >= 0) p.light(CX, CY, 0, 3.4, L, 1.2 * Math.pow(1 - p.ph(a0, 0, .6), 2));
    // ---- motes rising from every strike point ----
    const nm = Math.round(3 * p.density);
    for (const s of crowd) {
      if (s.fresh) continue;
      const a = t - s.hitT;
      if (a < .12 || a > 2) continue;
      for (let k = 0; k < nm; k++) {
        const id = s.u.i * 5 + k, life = 1 + .4 * p.r(id, 3), age = (a - .12 - p.r(id, 4) * .45) / life;
        if (age < 0 || age > 1) continue;
        const ang = p.r(id, 5) * p.TAU, rr = .08 + .22 * p.r(id, 6) + .05 * Math.sin(age * 6 + k);
        p.dot(s.u.x + Math.cos(ang) * rr, s.u.y + Math.sin(ang) * rr, .1 + 1.9 * p.easeOut(age) * (.7 + .3 * p.r(id, 7)), L, 1.1 * (1 - age), 1);
      }
    }
  },
});
