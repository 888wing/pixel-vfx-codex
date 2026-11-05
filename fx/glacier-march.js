// 冰河行軍 / Glacier March — Mass Spells pack (original design): a fan of ice spikes freezes a horde into statues, a finger snap shatters them all
PXFX.define({
  id: 'glacier-march',
  loop: 5,
  beats: [{ t: .95, kind: 'cast', power: .8 }, { t: 3.2, kind: 'pulse', power: .5 }, { t: 3.25, kind: 'hit', power: 1.4 }],
  view: { r: 4.8, h: 3.4 },
  stage: { ground: 'slate' },
  modules: ['figure', 'charge', 'growth', 'crowd', 'grade', 'shockwave', 'impact', 'debris', 'aftermath'],
  palette: {
    ice: ['#1f3c76', '#2f64aa', '#5596d6', '#a8e0ff', '#e6f8ff'],
    frost: ['#3d74c4', '#6aaeea', '#a8e0ff', '#dcf4ff', '#ffffff'],
    mist: ['#a9bfdc', '#c4d8ee', '#ddebf8', '#f4faff'],
  },
  timeline: [
    { k: 'pose', t: [0, .8], zh: '起手：施法者（高 1.5）下蹲蓄勢，右掌收到腰側；敵群（36 個細小敵兵，高約 0.6）在前方 4 單位外列陣', en: 'pose: the caster (1.5 tall) crouches and draws the right palm to the hip; a horde of 36 small soldiers (~0.6 tall) stands 4 units ahead' },
    { k: 'charge', t: [.3, .95], zh: '集氣：冰藍光點（#a8e0ff）由四周匯聚到掌心，掌心光暈半徑由 0.2 漲到 0.45', en: 'charge: ice-blue motes (#a8e0ff) stream into the palm and its halo grows from radius 0.2 to 0.45' },
    { k: 'shape', t: [.95, 1.1], zh: '成形：0.08 秒內推掌，腳下爆出一圈霜環；以掌前為圓心張開 ±35° 的扇形冰原', en: 'shape: the palm thrusts forward in 0.08 s and a frost ring bursts at the feet; a ±35° fan of ice opens from just in front of the palm' },
    { k: 'motion', t: [1.0, 2.7], zh: '推進：生長前沿以每秒 4.2 單位向前推（約 1.7 秒走完 7.2 單位），前沿是一道發亮的弧線；約 35 根冰刺按距離逐根以回彈緩動破土，高度 0.6–3.4（越遠越高，每第 5 根再大 1.5 倍，最高約敵兵的 8 倍），0.65 秒後回落到 50%，好讓冰雕露出來；地面同步結霜。每個敵兵在前沿到達時（命中時間 = 1.0 + 與掌前的距離 ÷ 速度 + 0–0.04 隨機）全身閃白，0.1 秒內凍成霜白冰雕，腳邊長出兩根小冰刺；扇形外的敵兵只會發抖', en: 'motion: the growth front advances at 4.2 units/s (7.2 units in ~1.7 s) as a bright arc; ~35 ice spikes erupt one by one with an overshoot ease, 0.6–3.4 tall (taller further out, every 5th one 1.5× larger, up to ~8× soldier height), settling to 50% after 0.65 s so the statues show; frost spreads over the ground with it. Each soldier flashes white when the front reaches it (hit time = 1.0 + distance from the palm / speed + 0–0.04 random) and turns into a frosted white statue within 0.1 s with two small spikes at its feet; soldiers outside the fan only tremble' },
    { k: 'impact', t: [2.7, 3.6], zh: '命中：全場靜止約 0.5 秒，環境壓暗並偏冷色，一道高光由近到遠掃過所有冰雕；施法者舉手，3.2 秒彈指（手部閃一圈小光環），3.25 秒所有冰雕與冰刺同時碎裂（按距離延遲不超過 0.1 秒），1 格冷色衝擊格＋頓幀，每根冰刺炸成 3 塊碎冰沿拋物線飛散，白色霜霧向上翻起', en: 'impact: the field holds still for ~0.5 s, the world darkens and cools and a glint runs over the statues from near to far; the caster raises a hand and snaps at 3.2 s (a small flash ring at the hand); at 3.25 s every statue and spike shatters at once (stagger ≤ 0.1 s by distance), one cold two-tone impact frame and a hit-stop, each spike breaks into 3 chunks flying on parabolas, white frost mist billows up' },
    { k: 'after', t: [3.6, 5], zh: '餘波：碎冰落地後在 3.9–4.6 秒縮小融化，霜地淡出，新一批敵兵由右邊走回原位，施法者收手回到站姿', en: 'aftermath: the chunks lie on the ground and melt (shrink) over 3.9–4.6 s, the frost fades, a fresh horde walks in from the right back to its spots and the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→蓄勢→推掌→舉手→彈指→待機', en: 'caster: faceless mannequin, poses idle → crouch → palm thrust → raised hand → snap → idle' },
    { zh: '敵群：30–60 個細小敵兵（高約 0.6），均勻但不規則地分佈在中心 x = 1.2、半徑 2.4×2.0 的橢圓內，面向施法者', en: 'horde: 30–60 small soldiers (~0.6 tall) spread evenly but irregularly in an ellipse of 2.4×2.0 centred at x = 1.2, facing the caster' },
    { zh: '冰刺：實心四棱雙錐（5 階冰藍色 #1f3c76→#e6f8ff），在扇形內用黃金比例分佈，避開敵兵 0.3 單位；高度 =（0.6 + 0.3×距離）×隨機 0.65–1.25，每第 5 根加大 1.5 倍，向外傾斜；破土時回彈到最高，再回落到 50%', en: 'ice spikes: solid four-sided bipyramids (5-step ice ramp #1f3c76 → #e6f8ff) spread over the fan with a golden-ratio pattern, kept 0.3 units clear of soldiers; height = (0.6 + 0.3 × distance) × random 0.65–1.25, every 5th one 1.5× larger, leaning outwards; each overshoots to full height as it erupts, then settles to 50%' },
    { zh: '生長前沿：地面上一條發亮弧帶（寬 0.35，冰藍到白），前沿後方地面染成霜白，帶星形紋理', en: 'growth front: a glowing arc band on the ground (0.35 wide, ice blue to white); behind it the ground is stained frost white with a star pattern' },
    { zh: '冰雕：敵兵換成霜白材質（與藍色冰刺分開），外圈一層淡青色光邊，腳邊兩根小冰刺；靜止時一道高光沿 +x 方向掃過，每個冰雕頭頂閃一顆四角星', en: 'statues: soldiers switch to a frosted white material (set apart from the blue spikes) with a faint cyan rim glow and two small spikes at their feet; during the hold a glint sweeps along +x and a four-point star flashes on each statue' },
    { zh: '碎裂：冰雕碎成 5 塊冰片、每根冰刺碎成 3 塊碎冰，拋物線飛出後落地旋轉停下，再縮小融化', en: 'shatter: each statue breaks into 5 shards and each spike into 3 chunks that fly on parabolas, land, settle and then shrink as they melt' },
    { zh: '霜霧：抖色半透明圓球（#a9bfdc→#f4faff），靜止時貼地漂移，碎裂瞬間由扇形內翻起後淡出', en: 'frost mist: dithered translucent balls (#a9bfdc → #f4faff) drifting low during the hold and billowing up over the fan at the shatter, then fading' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    fan: { zh: '扇形半角（度）', en: 'fan half-angle (deg)', min: 25, max: 50, step: 1, value: 35 },
    speed: { zh: '蔓延速度', en: 'spread speed', min: 3.5, max: 6, step: .1, value: 4.2 },
    shards: { zh: '碎冰數量', en: 'shard amount', min: .4, max: 2, step: .1, value: 1 },
  },
  // ice spike layout in the fan (cached per fan angle / crowd count): [{ x, y, rr, h, lean, wid, k }]
  spikeField(p, fan, units) {
    if (this._sf && this._sf.units === units && this._sf.fan === fan) return this._sf.list;
    const O = this.O, REACH = this.REACH, N = Math.round(42 * Math.max(.6, fan / .61)), list = [];
    for (let k = 0; k < N; k++) {
      const rr = .6 + (REACH - .6) * Math.pow((k + .5) / N, .62);
      const ang = fan * (2 * ((k * .618034 + .13) % 1) - 1) * .94 + (p.r(k, 3) - .5) * .06;
      const x = O[0] + Math.cos(ang) * rr, y = O[1] + Math.sin(ang) * rr;
      let near = false;
      for (const u of units) if ((u.x - x) * (u.x - x) + (u.y - y) * (u.y - y) < .09) { near = true; break; }
      if (near) continue;
      const hero = k % 5 === 2 ? 1.5 : 1;
      const h = (.6 + .3 * rr) * (.65 + .6 * p.r(k, 4)) * hero;
      const lean = p.v3.norm([Math.cos(ang) * .35 + (p.r(k, 5) - .5) * .4, Math.sin(ang) * .35 + (p.r(k, 6) - .5) * .4, 1]);
      list.push({ x, y, rr, h, lean, wid: h * (.26 + .1 * p.r(k, 7)), k });
    }
    this._sf = { units, fan, list };
    return list;
  },
  O: [-3.05, .2],
  REACH: 7.2,
  draw(p, t) {
    const PL = this.palette, IC = PL.ice, FR = PL.frost, MI = PL.mist;
    const CAST = .95, T0 = 1.0, SNAP = 3.2, HIT = 3.25, O = this.O, REACH = this.REACH;
    const fan = p.param('fan') * Math.PI / 180, v = p.param('speed'), shAmt = p.param('shards');
    const rf = Math.max(0, (t - T0) * v);                        // growth front radius
    const stagger = d => p.clamp(d / REACH, 0, 1) * .1;          // shatter delay by distance
    // ---- caster ----
    let pose;
    if (t < .25) pose = 'idle';
    else if (t < .8) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .25, .8)) };
    else if (t < CAST) pose = { a: 'charge', b: 'palm', k: p.easeInCubic(p.ph(t, .87, CAST)) };
    else if (t < 2.55) pose = 'palm';
    else if (t < SNAP) pose = { a: 'palm', b: 'raise', k: p.easeOutBack(p.ph(t, 2.55, 2.95), 1.4) };
    else if (t < 3.9) pose = { a: 'raise', b: 'point', k: p.easeInCubic(p.ph(t, SNAP, SNAP + .04)) };
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.9, 4.6)) };
    const fig = p.figure(-3.5, .2, { pose });
    // ---- frost on the ground (drawn first: a stain, graded with the world) ----
    const frostK = t < HIT ? 1 : 1 - p.ph(t, 3.8, 4.7);
    if (rf > 0 && frostK > 0) {
      const R = Math.min(rf, REACH + .3);
      p.stain(O[0], O[1], R + .6, (dx, dy, rho, ang) => {
        if (rho > R + .15 * p.noise(ang * 9, 3) || Math.abs(ang) > fan + .12 + .1 * p.noise(rho * 2, 1)) return 0;
        const star = Math.abs(Math.cos(ang * 23 + rho * 1.7)) > .93 ? .3 : 0;
        return .75 + star - p.noise(dx * 2.5, dy * 2.5) * .45 - p.ph(rho, R - .5, R + .1) * .3;
      }, '#e2eef9', frostK);
      if (t < CAST + .5) p.aftermath(fig.foot[0] + .3, fig.foot[1], 1.1, 'frost', { amt: p.ph(t, CAST, CAST + .15) * (1 - p.ph(t, CAST + .2, CAST + .5)) * .9, seed: 2 });
    }
    // ---- the horde ----
    const units = p.crowdLayout({ n: Math.round(p.param('crowd')), seed: 7, area: { x: 1.2, y: 0, rx: 2.4, ry: 2.0 } });
    const inFan = u => Math.abs(Math.atan2(u.y - O[1], u.x - O[0])) <= fan;
    const dist = u => Math.hypot(u.x - O[0], u.y - O[1]);
    const crowd = p.crowd({
      n: Math.round(p.param('crowd')), seed: 7, area: { x: 1.2, y: 0, rx: 2.4, ry: 2.0 }, t,
      at: [O[0], O[1], 0], ramp: FR,
      // statues: the built-in freeze, then a frosted white body with a faint cyan rim so they read apart from the spikes
      react: (s, a, u, pp, o) => { PXFX.REACT.freeze(s, a, u, pp, o); if (s.mat === 'ice') { s.mat = 'white'; s.glow = .24; } },
      hit: u => (inFan(u) ? T0 + dist(u) / v + u.r1 * .04 : null),
      shatter: u => HIT + stagger(dist(u)),
      fear: u => {
        if (!inFan(u)) return p.env(t, 1.6, 2.2, 3.4, 3.9) * .7;
        const th = T0 + dist(u) / v;
        return p.ph(t, th - .8, th - .15) * (.5 + .5 * u.r3);
      },
      respawn: [3.95, 4.95], clear: [3.7, 4.35], from: [1, .1],
    });
    // small spikes at the feet of every statue
    for (const s of crowd) {
      if (s.hitT == null || s.fresh || t < s.hitT + .05) continue;
      const ts = HIT + stagger(dist(s.u));
      if (t >= ts) continue;
      const g = p.easeOutBack(p.ph(t, s.hitT + .05, s.hitT + .2), 2);
      for (let j = 0; j < 2; j++) {
        const a = s.u.face + (j ? 1.9 : -1.9) + (s.u.r2 - .5), dx = Math.cos(a), dy = Math.sin(a);
        p.shard(s.x + dx * .1, s.y + dy * .1, .1 * g, .36 * g, .1, [dx * .5, dy * .5, 1], IC, { back: .2, shadow: false, spin: j + s.u.r1 });
      }
    }
    // ---- ice spikes: erupt as the front passes, settle, shatter on the snap ----
    const field = this.spikeField(p, fan, units), tips = [];
    for (const sp of field) {
      const th = T0 + sp.rr / v, ts = HIT + stagger(sp.rr);
      if (t < th) continue;
      if (t < ts) {
        const l = p.ph(t, th, th + .16), hh = sp.h * p.easeOutBack(l, 2.2) * (1 - .5 * p.easeOutCubic(p.ph(t, th + .14, th + .8)));
        if (hh < .03) continue;
        const d = sp.lean, mid = [sp.x + d[0] * hh * .3, sp.y + d[1] * hh * .3, hh * .3];
        p.shard(mid[0], mid[1], mid[2], hh * 1.35, sp.wid * Math.min(1, .4 + l), d, IC, { back: .25, sides: 4, spin: p.r(sp.k, 8) * 3 });
        tips.push([sp.x + d[0] * hh, sp.y + d[1] * hh, hh, sp, l]);
        continue;
      }
      // chunks: thrown out, land, then melt (shrink) away
      const a = t - ts, nC = Math.max(1, Math.round(3 * shAmt * p.density)), hh = sp.h * .6;
      for (let j = 0; j < nC; j++) {
        const id = sp.k * 11 + j, dir = p.rdir(id, 41, .8), sv = (1.4 + 2.2 * p.r(id, 42)) * (.8 + .25 * sp.h);
        const z0 = .15 + hh * p.r(id, 43), vz = dir[2] * sv + 1, land = (vz + Math.sqrt(vz * vz + 4 * 4.9 * z0)) / 9.8, tt = Math.min(a, land);
        const melt = 1 - p.ph(t, 3.85 + .35 * p.r(id, 44), 4.5 + .25 * p.r(id, 45));
        if (melt <= 0) continue;
        const x = sp.x + dir[0] * sv * tt, y = sp.y + dir[1] * sv * tt, z = Math.max(.05, z0 + vz * tt - 4.9 * tt * tt);
        const spin = tt * 11 + j, dd = a < land ? [Math.cos(spin), Math.sin(spin), Math.sin(spin * .7)] : [Math.cos(id), Math.sin(id), .2];
        const L = (.16 + .14 * p.r(id, 46)) * (.7 + .3 * sp.h) * melt;
        p.shard(x, y, z, L, L * .55, dd, IC, { back: .4, sides: 3, shadow: a < land });
      }
    }
    // ---- frost mist: low drift during the hold, a big billow at the shatter ----
    const nM = Math.round(14 * Math.min(1.5, p.density));
    for (let k = 0; k < nM; k++) {
      const rr = 1.2 + (REACH - 1) * p.r(k, 61), ang = fan * (p.r(k, 62) * 2 - 1) * .85;
      const bx = O[0] + Math.cos(ang) * rr, by = O[1] + Math.sin(ang) * rr;
      const born = T0 + rr / v + .1;
      // low drifting mist after the front passed, fading as the hold ends
      const lowA = p.ph(t, born, born + .5) * (1 - p.ph(t, HIT, HIT + .2)) * .45;
      if (lowA > .04) p.ball(bx + (t - born) * .15, by, .12, .32 + .12 * p.r(k, 63), MI, { alpha: lowA, rough: .4, shadow: false, seed: k });
      // billow
      const a = t - HIT - stagger(rr);
      if (a > 0 && a < 1.4) {
        const u = a / 1.4, e = p.easeOutCubic(Math.min(1, a / .7));
        p.ball(bx + (p.r(k, 64) - .5) * .8 * e, by + (p.r(k, 65) - .5) * .8 * e, .25 + 1.1 * e * (.5 + .5 * p.r(k, 66)), (.3 + .45 * e) * (.8 + .4 * p.r(k, 67)), MI, { alpha: Math.pow(1 - u, .8) * .85, rough: .45, shadow: false, seed: k + 20 });
      }
    }
    // ---- the quiet beat: the world goes cold and still ----
    const cold = p.ph(t, 2.5, 3.0) * (1 - p.ph(t, HIT + .05, HIT + .55));
    if (cold > .01) p.grade({ dark: .18 * cold, desat: .35 * cold, tint: '#a8e0ff', tintAmt: .25 * cold });
    const a = t - HIT;
    if (a >= 0 && a < .021 + 1 / 30) p.impactFrame({ ink: '#0b1a33', paper: '#eef8ff', accent: '#6fb8f0' });
    // ---- light: charge on the palm ----
    if (t > .3 && t < CAST + .3) {
      const ch = p.ph(t, .3, CAST), hd = fig.hand;
      p.charge(hd[0], hd[1], hd[2], ch, { n: 14, R: 1.1, ramp: FR, up: .2 });
      p.glow(hd[0], hd[1], hd[2], .2 + .25 * ch, FR, t < CAST ? .5 + .5 * ch : 1 - p.ph(t, CAST, CAST + .3));
    }
    if (t >= CAST && t < CAST + .4) {
      const u = p.ph(t, CAST, CAST + .4);
      p.shock(fig.foot[0] + .2, fig.foot[1], .05, u, { R: 1.3, w: .22, ramp: FR });
    }
    // growth front: a bright arc band on the ground + sparkles on the newest spikes
    if (rf > 0 && rf < REACH + .6) {
      const fI = 1 - p.ph(rf, REACH - .3, REACH + .6);
      p.decal(O[0], O[1], 0, rf + .3, (dx, dy, rho, ang) => (Math.abs(ang) < fan + .08 ? p.band(rho, rf, .35) * (.6 + .5 * p.noise(ang * 14, t * 3)) : 0), FR, 1.15 * fI);
      for (let k = 0; k < 5; k++) {
        const ang = fan * (k / 4 * 2 - 1) * .9;
        p.light(O[0] + Math.cos(ang) * rf, O[1] + Math.sin(ang) * rf, 0, 1.1, FR, .55 * fI);
      }
    }
    for (const tp of tips) if (tp[4] < 1) p.sparkle(tp[0], tp[1], tp[2] + .05, 3, FR, 1.2 * (1 - tp[4]));
    // the glint: a highlight running over the statues and spikes during the hold
    if (t > 2.6 && t < SNAP) {
      const gx = p.lerp(-2.6, 4.2, p.ease(p.ph(t, 2.62, 3.12)));
      for (const tp of tips) { const w = p.band(tp[0], gx, .45); if (w > 0) p.sparkle(tp[0], tp[1], tp[2] + .04, 3, FR, 1.3 * w); }
      for (const s of crowd) {
        if (s.alive || s.hidden || s.hitT == null) continue;
        const w = p.band(s.x, gx, .4);
        if (w > 0) p.sparkle(s.head[0], s.head[1], s.head[2] + .08, 2, FR, 1.2 * w);
      }
    }
    // the snap: pose snap + small flash ring at the hand
    if (t >= SNAP - .01 && t < SNAP + .3) {
      const u = p.ph(t, SNAP, SNAP + .3), hd = fig.hand, c = p.cam();
      p.ring(hd[0], hd[1], hd[2], .08 + .45 * p.easeOutExpo(u), .07 * (1 - u) + .02, FR, 1.3 * (1 - u), { axis: c.fwd });
      p.sparkle(hd[0], hd[1], hd[2], 4, FR, 1.4 * (1 - u));
      p.glow(hd[0], hd[1], hd[2], .3, FR, 1 - u);
    }
    // the shatter: a white sweep over the fan, speed lines, cold light
    if (a >= 0 && a < 1) {
      const sw = p.ph(a, 0, .14), sI = Math.pow(1 - p.ph(a, .04, .24), 2);
      if (sI > 0) {
        const Rs = REACH * p.easeOutCubic(sw) + .3;
        p.decal(O[0], O[1], 0, Rs + .2, (dx, dy, rho, ang) => (Math.abs(ang) < fan + .1 ? p.band(rho, Rs, .7) * (.6 + .5 * p.noise(ang * 12, rho)) : 0), FR, 1.2 * sI);
      }
      if (a < .22) p.speedLines(1.2, 0, .6, { n: 18, R0: 2.6, R1: 5.2, ramp: FR, I: 1 - a / .22, seed: Math.floor(t * 30) });
      p.light(1.0, 0, 0, 4.2, FR, .9 * Math.pow(1 - p.ph(a, 0, .8), 2));
    }
  },
});
