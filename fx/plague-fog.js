// 瘴霧吞營 / Plague Fog — Scale Ladder pack (original design), tier 100: a lobbed poison seed splits the ground and a rolling green fog swallows a hundred-strong block, leaving piles of bones
PXFX.define({
  id: 'plague-fog',
  loop: 5.5,
  beats: [{ t: .9, kind: 'cast', power: .6 }, { t: 1.4, kind: 'hit', power: 1.25 }, { t: 2.05, kind: 'pulse', power: .45 }],
  view: { r: 4.8, h: 3.3 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'charge', 'crowd', 'troops', 'tally', 'shockwave', 'grade', 'aftermath'],
  palette: {
    toxic: ['#2e6a3a', '#4a9a2c', '#7cc43a', '#a8e05a', '#dcf890', '#f8ffe0'],
    fog: ['#587a3e', '#6e9248', '#88ac52', '#a4c464', '#c0d87e', '#dceaa8'],
    swirl: ['#2c3a22', '#3a4c2a', '#4a6032', '#5c7438'],
    front: ['#5c8a3a', '#78a844', '#98c652', '#bce06c', '#dcf49c'],
    seed: ['#1c2c12', '#2e4a18', '#4a7024', '#6c9a30'],
  },
  timeline: [
    { k: 'pose', t: [0, .8], zh: '起手：施法者（高 1.5，位於 x = −3.5）由站姿後拉右手蓄勢；一百名敵兵排成 10×10 方陣（中心 (1.2, 0)、半寬 2.0），面向施法者', en: 'pose: the caster (1.5 tall, at x = −3.5) draws the right hand back; a hundred soldiers stand in a 10×10 block (centre (1.2, 0), half size 2.0) facing the caster' },
    { k: 'charge', t: [.3, .9], zh: '集氣：手中一顆毒種（半徑 0.09 的暗綠實心球）亮起，12 道黃綠光點匯聚到手上，光暈半徑由 0.15 漲到 0.32', en: 'charge: a poison seed (dark green solid ball, radius 0.09) lights up in the hand while 12 yellow-green streaks converge on it and its halo grows from radius 0.15 to 0.32' },
    { k: 'shape', t: [.9, 1.4], zh: '成形：0.9 秒揮手放出，毒種沿高 1.8 的拋物線用 0.5 秒落到方陣的重心（全體敵兵座標平均值），拖 4 點綠色殘光', en: 'shape: at 0.9 s the arm swings and the seed flies a 1.8-high arc for 0.5 s onto the formation centroid (mean of all unit positions), trailing 4 green motes' },
    { k: 'motion', t: [1.4, 2.8], zh: '推進：霧的邊緣半徑 R(t) = 毒霧半徑 × easeOut((t − 1.4) ÷ (1.4 ÷ 擴散速度))，預設 2.8 單位、1.4 秒擴散完（先快後慢）；前沿是一道緊貼 R(t) 翻滾的亮黃綠霧牆，加一圈光環與地面光帶。判定：與毒種距離 ≤ 毒霧半徑（2.8）的敵兵中招，命中時間 = R(t) 到達該兵的時間 + 0–0.05 秒隨機；中招者咳嗽發抖 0.5 秒 → 0.3 秒內跪下 → 倒地 → 0.6 秒起身體轉成腐綠、1.25 秒起變成白骨，留作骨堆；半徑以外的敵兵向後縮、發抖但倖存', en: 'motion: the fog edge radius is R(t) = fog radius × easeOut((t − 1.4) / (1.4 / spread speed)), 2.8 units over 1.4 s by default (fast, then slowing); the front is a wall of bright yellow-green rolling puffs riding exactly on R(t), with a rim ring and a ground band. Area test: hit if the distance to the seed ≤ fog radius (2.8); hit time = the time R(t) reaches the unit + 0–0.05 s jitter. A hit soldier coughs and trembles for 0.5 s, sinks to the knees in 0.3 s, falls, turns rotten green from 0.6 s and bone white from 1.25 s, and stays as a pile of bones; units beyond the radius recoil and tremble but survive' },
    { k: 'impact', t: [1.4, 1.7], zh: '命中：1.4 秒毒種落地，地面裂開 6 道發綠光的裂紋（半徑 1.3），綠色衝擊環擴到 1.2，第一批霧團以回彈緩動冒出', en: 'impact: at 1.4 s the seed lands and the ground splits into 6 glowing green cracks (radius 1.3), a green shock ring expands to 1.2 and the first fog puffs pop out with an overshoot' },
    { k: 'after', t: [2.8, 5.5], zh: '餘波：霧團在原地翻滾、深色漩渦慢慢旋轉；3.6–4.4 秒霧變薄、縮小並流回中央裂縫，露出一地白骨；4.25–4.85 秒骨堆淡出、擊殺計數淡出，新一批敵兵由右邊走回原位', en: 'aftermath: the puffs keep rolling while dark swirls turn slowly; at 3.6–4.4 s the fog thins, shrinks and drains back into the central crack, revealing a field of bones; at 4.25–4.85 s the bones and the kill counter fade and a fresh company walks in from the right' },
  ],
  layers: [
    { zh: '敵陣：50–200 名敵兵（預設 100），按陣型排在中心 (1.2, 0)、半寬 2.0×2.0 的範圍內（預設方陣），兵距決定大小（約 0.6 高的 3D 小兵）；右上角擊殺計數「骷髏 已擊殺／總數」即時累加，全滅時變金色', en: 'company: 50–200 soldiers (default 100) in a formation inside a 2.0×2.0 half-size area centred at (1.2, 0) (default block), sized by their spacing (~0.6 tall 3D pawns); a kill counter "skull killed/total" in the corner counts up live and turns gold on a full wipe' },
    { zh: '判定與倖存者：命中 ⇔ 與毒種落點的水平距離 ≤ 毒霧半徑；命中時間 = 1.4 + (1 − √(1 − 距離 ÷ 半徑)) × 1.4 ÷ 擴散速度 + 0–0.05 秒；畫出來的霧邊、光環與地面染色全部用同一個 R(t)，半徑以外的敵兵只會後仰發抖，一直站到循環結束', en: 'area test and survivors: hit ⇔ the ground distance to the seed ≤ fog radius; hit time = 1.4 + (1 − √(1 − distance / radius)) × 1.4 / spread speed + 0–0.05 s; the drawn fog edge, rim ring and ground stain all use the same R(t), and units beyond the radius only lean back and tremble and stay standing through the loop' },
    { zh: '毒霧：約 34 團半徑 0.42–0.56 的淡黃綠實心霧團（92% 抖色、平塗光影），按黃金角分佈在半徑 − 0.5 以內，前沿經過時以回彈緩動冒出並向外滾動；每團不斷冒出一團向上升 0.45、逐漸變細變淡的霧捲；三條各 6 團的深色漩渦臂在霧頂以每秒 0.55 弧度旋轉；霧高約到敵兵胸口，看得見頭盔，倒下的屍體沒入霧中，霧散後才露出白骨', en: 'fog: about 34 pale yellow-green solid puffs of radius 0.42–0.56 (92% dithered, flat shading) on a golden-angle spread within radius − 0.5, popping in with an overshoot as the front passes and rolling outwards; each keeps throwing off a billow that rises 0.45 while shrinking and thinning; three spiral arms of 6 murky puffs turn on the fog top at 0.55 rad/s; the fog reaches chest height so the helmets stay readable, and the fallen sink into it until it drains and reveals the bones' },
    { zh: '毒霧邊緣：每 0.4 單位一團亮黃綠霧團（半徑 0.24–0.34）組成的霧牆，緊貼 R(t) − 0.16 滾動；半徑 R(t) 的貼地發光圓環（寬 0.07，#a8e05a 到淡黃白）與離地 0.42 的第二道細光環，地面一條寬 0.25 的光帶，16 顆沿邊緣上飄的光點；擴散完後光環減弱成淡淡的邊界，直到霧散', en: 'fog edge: a wall of bright yellow-green puffs (radius 0.24–0.34), one every 0.4 units, rolling along R(t) − 0.16; a glowing ground ring at radius R(t) (0.07 wide, #a8e05a to pale yellow-white) and a second thin ring 0.42 up, a 0.25-wide ground band and 16 motes drifting up along the edge; once fully grown the rings dim to a faint boundary until the fog drains' },
    { zh: '中招反應（自訂）：咳嗽發抖（抖動 0.03、身體前彎、冒 3 點綠色光點）→ 跪下（高度壓到 65%）→ 倒地 → 腐綠材質 → 白骨材質，壓扁成骨堆並在旁邊放一個小頭骨', en: 'hit reaction (custom): coughing tremble (0.03 jitter, bending over, 3 rising green motes) → kneeling (height squashed to 65%) → falling → rotten green material → bone material, flattened into a pile with a small skull beside it' },
    { zh: '毒種與裂地：手中的毒種是暗綠實心球加光暈；落地時地面裂出 6 道發光裂紋並留下焦黑裂痕，3.8–4.6 秒淡出', en: 'seed and split ground: the seed is a dark green solid ball with a halo; on landing the ground splits into 6 glowing cracks over a dark scorch, fading at 3.8–4.6 s' },
    { zh: '環境：毒霧存在時整個場景偏黃綠並稍為壓暗（調色 18%），霧散時復原', en: 'mood: while the fog is out the scene is tinted yellow-green and slightly darkened (18% grade), restored as the fog drains' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 50, max: 200, step: 1, value: 100 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    radius: { zh: '毒霧半徑', en: 'fog radius', min: 1, max: 3.2, step: .1, value: 2.8 },
    speed: { zh: '擴散速度', en: 'spread speed', min: .5, max: 2, step: .1, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.0, ry: 2.0 },
  CAST: .9, T0: 1.4, T: 1.4,
  // formation centroid (cached per layout)
  centre(units) {
    if (this._cu === units) return this._cc;
    let sx = 0, sy = 0;
    for (const u of units) { sx += u.x; sy += u.y; }
    this._cu = units; this._cc = [sx / units.length, sy / units.length];
    return this._cc;
  },
  // fog puffs on a golden-angle spread inside the radius (cached per radius / count)
  puffs(p, radius, N) {
    const key = radius + '|' + N;
    if (this._pk === key) return this._pv;
    const list = [];
    for (let k = 0; k < N; k++) {
      const f = (k + .5) / N, rho = Math.max(.05, radius - .5) * Math.sqrt(f);
      list.push({ k, rho, th: k * 2.39996 + .4, r: .42 + .14 * p.r(k, 3), z: .04 + .08 * p.r(k, 4) });
    }
    this._pk = key; this._pv = list;
    return list;
  },
  draw(p, t) {
    const PL = this.palette, TX = PL.toxic, CAST = this.CAST, T0 = this.T0;
    const radius = p.param('radius'), speed = p.param('speed'), Tsp = this.T / speed;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const CL = [4.25, 4.85], RS = [4.45, 5.4], DR = [3.6, 4.4];
    const lay = { n, seed: 3, area: this.AREA, formation: form };
    const units = p.crowdLayout(lay), C = this.centre(units);
    const Rt = t < T0 ? 0 : radius * p.easeOut((t - T0) / Tsp);         // the fog edge
    const drain = p.ph(t, DR[0], DR[1]);
    const dist = u => Math.hypot(u.x - C[0], u.y - C[1]);
    // ---- caster: wind up with the seed, lob it, then steer the fog with an open palm ----
    let pose;
    if (t < .3) pose = 'idle';
    else if (t < .8) pose = { a: 'idle', b: 'windup', k: p.easeOutCubic(p.ph(t, .3, .8)) };
    else if (t < CAST) pose = { a: 'windup', b: 'swing', k: p.easeInCubic(p.ph(t, .8, CAST)) };
    else if (t < 1.55) pose = 'swing';
    else if (t < 3.7) pose = { a: 'swing', b: 'palm', k: p.easeOutCubic(p.ph(t, 1.55, 2.1)) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.7, 4.5)) };
    const fig = p.figure(-3.5, 0, { pose });
    // ---- the company ----
    const react = (s, a, u, pp) => {
      s.walk = null;
      if (a < .55) {                                          // coughing tremble, bending over
        s.jit = .03 * (1 - a / .8);
        s.tilt = .22 + .14 * Math.abs(Math.sin(a * 21 + u.r1 * 6));
        if (a > .3) s.spear = false;
      } else {                                                // knees, then down
        const kn = pp.easeOutCubic(pp.ph(a, .45, .75)), fall = pp.easeIn(pp.ph(a, .7, 1.05));
        s.sq = 1 - .35 * kn + .1 * fall; s.tilt = .3 + (Math.PI / 2 - .3) * fall; s.spear = false; s.jit = a < .75 ? .015 : 0;
      }
      if (a > .6) s.mat = 'rot';
      if (a > 1.25) { s.mat = 'bone'; const k = pp.easeOutCubic(pp.ph(a, 1.25, 1.6)); s.sq = .75 - .25 * k; s.wide = 1 + .2 * k; }
      if (a < 1.1) s.motes = { a: a * 1.2, ramp: TX, n: 3 };
    };
    const crowd = p.crowd(Object.assign({}, lay, {
      t, scale: 'auto', at: [C[0], C[1], 0], react, ramp: TX,
      hit: u => { const d = dist(u); return d <= radius ? T0 + (1 - Math.sqrt(1 - d / radius)) * Tsp + u.r1 * .05 : null; },
      fear: u => { const d = dist(u); return p.ph(Rt, d - 1.1, d - .1) * (.55 + .45 * u.r3) * (1 - p.ph(t, 3.7, 4.3)); },
      respawn: RS, clear: CL, from: [1, .12],
    }));
    // small skulls on the bone piles
    for (const s of crowd) {
      if (s.hitT == null || s.fresh || s.hidden || t < s.hitT + 1.3) continue;
      const fa = 1 - p.ph(t, CL[0] + s.u.r2 * .3, CL[0] + .3 + s.u.r2 * .3);
      if (fa <= .05) continue;
      const sc = crowd.scale, a = s.u.face + 1.3;
      p.ball(s.x + Math.cos(a) * .2 * sc, s.y + Math.sin(a) * .2 * sc, .05 * sc, .06 * sc, PXFX.PAWN_MATS.bone, { alpha: fa, shadow: false });
    }
    // ---- ground: the split under the seed, the sickly stain inside the fog ----
    const crk = t >= T0 ? 1 - p.ph(t, 3.8, 4.6) : 0;
    if (crk > 0) p.aftermath(C[0], C[1], 1.3, 'crack', { amt: crk * p.ph(t, T0, T0 + .12), n: 6, seed: 4, color: '#1a2212' });
    const stainK = Rt > 0 ? (1 - drain) : 0;
    if (stainK > 0) p.stain(C[0], C[1], Rt, (dx, dy, rho) => .55 + .35 * p.noise(dx * 1.7 + 3, dy * 1.7) - .3 * p.ph(rho, Rt - .3, Rt), '#2a3818', stainK);
    // ---- the seed: in the hand, then lobbed onto the centroid ----
    const hand = fig.hand;
    let seedP = null;
    if (t > .3 && t < CAST) seedP = [hand[0], hand[1], hand[2] + .06];
    else if (t >= CAST && t < T0) {
      const u = p.ph(t, CAST, T0), e = .35 * u + .65 * u * u;
      seedP = p.arcPos([hand[0], hand[1], hand[2]], [C[0], C[1], .06], e, 1.8);
    }
    if (seedP) p.ball(seedP[0], seedP[1], seedP[2], .09, PL.seed, { lit: .1 });
    // ---- the fog: rolling base puffs, billows rising off them, dark spiral swirls on top ----
    const N = Math.round(34 * (.55 + .45 * p.density));
    const field = this.puffs(p, radius, N);
    const fogA = 1 - drain;
    if (Rt > 0 && fogA > 0) {
      for (const f of field) {
        const born = T0 + (1 - Math.sqrt(Math.max(0, 1 - Math.min(1, (f.rho + .1) / radius)))) * Tsp;
        const a = t - born;
        if (a < 0) continue;
        const dk = p.ph(t, DR[0] + .25 * p.r(f.k, 7), DR[1] - .15 + .15 * p.r(f.k, 8));
        const grow = p.easeOutBack(p.ph(a, 0, .4), 1.6) * (1 + .2 * p.ph(a, .4, 2.6)) * (1 - .75 * dk);
        if (grow <= .02) continue;
        const roll = .72 + .28 * p.easeOutCubic(p.ph(a, 0, .7)) + .04 * p.ph(a, .7, 3);
        const rr = f.rho * roll * (1 - .7 * dk), th = f.th + .05 * Math.sin(t * .9 + f.k);
        const x = C[0] + Math.cos(th) * rr, y = C[1] + Math.sin(th) * rr, bob = .04 * Math.sin(t * 2.1 + f.k * 1.7);
        const fresh = a < .45 ? 1 - a / .45 : 0;
        p.ball(x, y, f.z * (1 - .6 * dk) + bob, f.r * grow, PL.fog, { alpha: .92 * fogA, rough: .08, flat: true, shadow: false, seed: f.k, lit: .25 * fresh + .05 });
        // a billow rolling up off the puff and thinning out
        const ph = (a * .42 + p.r(f.k, 9)) % 1, bz = f.z + .3 + .45 * ph;
        const ba = .55 * fogA * (1 - ph) * p.ph(a, .1, .5) * (1 - dk);
        if (ba > .08) p.ball(x + Math.cos(th) * .25 * ph, y + Math.sin(th) * .25 * ph, bz, f.r * (.75 - .35 * ph) * grow, PL.fog, { alpha: ba, rough: .08, flat: true, shadow: false, seed: f.k + 3, lit: .2 });
      }
      // the advancing front: a wall of bright rolling puffs riding exactly on R(t)
      const M = Math.max(8, Math.round(p.TAU * radius / .4)), fk = p.ph(Rt, 0, .9), dkF = p.ph(t, DR[0], DR[1] - .2);
      if (fk > 0 && dkF < 1) for (let k = 0; k < M; k++) {
        const ang = (k + .5 * p.r(k, 14)) / M * p.TAU + .08 * Math.sin(t * 1.3 + k), rr = Math.max(0, Rt - .16) * (1 - .6 * dkF);
        const sz = (.24 + .1 * p.r(k, 15)) * fk * (1 - .8 * dkF) * (1 + .12 * Math.sin(t * 3.1 + k * 2.3));
        p.ball(C[0] + Math.cos(ang) * rr, C[1] + Math.sin(ang) * rr, .2 + .12 * p.r(k, 16) + .05 * Math.sin(t * 2.4 + k), sz, PL.front, { alpha: .8 * fogA, rough: .08, flat: true, shadow: false, seed: k + 5, lit: .1 });
      }
      // dark swirls: three spiral arms of murky puffs turning on the fog top
      const arms = 3, per = Math.round(6 * (.6 + .4 * p.density)), spin = (t - T0) * .55;
      for (let j = 0; j < arms; j++) for (let i = 0; i < per; i++) {
        const rho = (i + 1) / (per + 1) * (radius - .4), born = T0 + (1 - Math.sqrt(Math.max(0, 1 - Math.min(1, (rho + .3) / radius)))) * Tsp;
        const a = t - born;
        if (a < 0) continue;
        const dk = p.ph(t, DR[0], DR[1] - .2), g = p.easeOutCubic(p.ph(a, 0, .5)) * (1 - dk);
        if (g < .05) continue;
        const ang = j / arms * p.TAU + rho * 1.25 + spin, rr = rho * (1 - .6 * dk);
        p.ball(C[0] + Math.cos(ang) * rr, C[1] + Math.sin(ang) * rr, .5 + .05 * Math.sin(t * 1.7 + i), (.24 + .08 * p.r(i + j * 9, 13)) * g, PL.swirl, { alpha: .7 * fogA, rough: .1, flat: true, shadow: false, seed: i + j });
      }
    }
    // ---- mood: the scene turns sickly while the fog is out ----
    const moodK = Rt > 0 ? p.ph(t, T0, T0 + .6) * (1 - drain) : 0;
    if (moodK > .01) p.grade({ tint: '#9ab848', tintAmt: .18 * moodK, dark: .1 * moodK });
    // ---- light ----
    if (t > .3 && t < CAST + .05) {
      const ch = p.ph(t, .3, CAST);
      p.charge(hand[0], hand[1], hand[2] + .06, ch, { n: 12, R: 1, ramp: TX, up: .3 });
      p.glow(hand[0], hand[1], hand[2] + .06, .15 + .17 * ch, TX, .55 + .45 * ch);
    }
    if (seedP && t >= CAST) {
      p.glow(seedP[0], seedP[1], seedP[2], .3, TX, .9);
      const u = p.ph(t, CAST, T0);
      for (let j = 1; j <= 4; j++) {
        const uj = Math.max(0, u - j * .05), e = .35 * uj + .65 * uj * uj, q = p.arcPos([hand[0], hand[1], hand[2]], [C[0], C[1], .06], e, 1.8);
        p.dot(q[0], q[1], q[2], TX, .9 - j * .18, 1);
      }
    }
    const a0 = t - T0;
    if (a0 >= 0) {
      // landing: flash, green shock ring, glowing cracks
      if (a0 < .3) p.glow(C[0], C[1], .3, .9, TX, 1.2 * Math.pow(1 - a0 / .3, 2));
      p.shock(C[0], C[1], .08, p.ph(a0, 0, .6), { R: 1.2, w: .2, ramp: TX });
      if (crk > 0) p.decal(C[0], C[1], 0, 1.2, (dx, dy, rho, ang) => (Math.abs(Math.sin(ang * 6 + p.noise(rho * 2.5 + 4, ang) * 2.2)) < .07 && rho > .08 ? 1 - rho / 1.2 : 0), TX, (1.1 - .6 * p.ph(a0, .2, 1.5)) * crk * p.ph(a0, 0, .1));
      // the fog edge: rim ring, ground band, drifting motes
      const grow = p.ph(t, T0, T0 + Tsp), rimI = (1.15 - .75 * p.ph(grow, .8, 1)) * (1 - p.ph(t, DR[0], DR[0] + .5));
      if (Rt > .05 && rimI > 0) {
        p.ring(C[0], C[1], .1, Rt, .07, TX, rimI);
        p.ring(C[0], C[1], .42, Math.max(.05, Rt - .16), .05, TX, .7 * rimI);
        const band = 1 - p.ph(grow, .7, 1);
        if (band > 0) p.decal(C[0], C[1], 0, Rt + .2, (dx, dy, rho) => p.band(rho, Rt - .05, .25), TX, .75 * rimI * band);
        const nm = Math.round(16 * Math.min(1.5, p.density));
        for (let k = 0; k < nm; k++) {
          const ang = k / nm * p.TAU + t * .35 + p.r(k, 11), ph = (t * .8 + p.r(k, 12)) % 1;
          p.dot(C[0] + Math.cos(ang) * Rt, C[1] + Math.sin(ang) * Rt, .15 + .45 * ph, TX, rimI * (1 - ph), 1);
        }
        p.light(C[0], C[1], 0, Rt + .5, TX, .35 * rimI);
      }
      // toxic motes rising out of the fog
      const nmo = Math.round(18 * p.density);
      if (fogA > 0) for (let k = 0; k < nmo; k++) {
        const rr = Rt * Math.sqrt(p.r(k, 21)) * .9, ang = p.r(k, 22) * p.TAU, ph = (t * .5 + p.r(k, 23)) % 1;
        p.dot(C[0] + Math.cos(ang) * rr, C[1] + Math.sin(ang) * rr, .4 + .9 * ph, TX, .9 * (1 - ph) * fogA, 1);
      }
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, CL[0], CL[1]) });
  },
});
