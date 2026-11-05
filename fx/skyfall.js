// 天墜星 / Skyfall — Mass Spells pack (original design): a meteor from a sky circle flattens a whole horde
PXFX.define({
  id: 'skyfall',
  loop: 5,
  beats: [{ t: 1.0, kind: 'cast', power: .8 }, { t: 2.3, kind: 'hit', power: 1.5 }, { t: 2.62, kind: 'pulse', power: .6 }],
  view: { r: 4.8, h: 3.6 },
  stage: { ground: 'grass' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'shockwave', 'impact', 'debris', 'aftermath'],
  palette: {
    fire: ['#5a1408', '#a8300c', '#e8641a', '#ffa040', '#ffe08a', '#fffbe8'],
    rune: ['#5a1a10', '#c0401a', '#ff8a3a', '#ffd890'],
    rock: ['#1e1418', '#33222a', '#4a3036', '#5e4040'],
    smoke: ['#1c1618', '#2e2628', '#433a3a', '#5a504c'],
    dust: ['#4a3e34', '#6a5a4a', '#8a7a64', '#a8977c'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由站姿高舉雙手，敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster raises both arms while a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.5, 1.6], zh: '集氣：敵群正上方的天空浮現半徑 2.4 的旋轉火紋法陣，天空轉暗紅；隕石（半徑 1.5）由畫面右上方外面出現', en: 'charge: a rotating fire sigil (radius 2.4) opens in the sky over the horde and the sky turns dark red; a meteor (radius 1.5) appears from outside the top-right of the frame' },
    { k: 'shape', t: [1.6, 2.0], zh: '成形：隕石穿過法陣，前緣燒得發白，身後拖著火尾；地上陰影由小變大罩住敵群，敵兵向後縮、發抖', en: 'shape: the meteor passes through the sigil with a white-hot front and a fire trail; its shadow on the ground grows over the horde, and the soldiers lean back and tremble' },
    { k: 'motion', t: [2.0, 2.3], zh: '推進：最後 0.3 秒隕石加速（慢→快的二次曲線）砸向敵群中心', en: 'motion: over the last 0.3 s the meteor accelerates (quadratic ease-in) into the middle of the horde' },
    { k: 'impact', t: [2.3, 2.9], zh: '命中：1 格黑白衝擊格＋頓幀，白熱火球膨脹，衝擊環半徑 4.6 向外掃；每個敵兵按與撞擊點的距離延遲中招（距離 ÷ 7 秒），中心 1 單位內的直接蒸發，其餘按距離減力拋飛，碎石四射', en: 'impact: one two-tone impact frame and a hit-stop, a white-hot fireball swells and a shock ring sweeps out to radius 4.6; each soldier is hit after a delay of distance / 7 s, those within 1 unit vaporise and the rest are thrown with power falling off by distance, rocks fly out' },
    { k: 'after', t: [2.9, 5], zh: '餘波：蘑菇煙柱升起，隕坑留下熔岩裂紋慢慢冷卻，敵兵屍體淡出，新一批敵兵由右邊走回原位', en: 'aftermath: a mushroom of smoke rises, the crater keeps cooling lava cracks, the bodies fade and a fresh horde walks in from the right back to its spots' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6，施法者的 40%），暗紫身體、紅色頭盔、手持長矛，用均勻但不規則的點陣分佈在半徑約 2.3 的橢圓內', en: 'horde: 30–60 small soldiers (~0.6 tall, 40% of the caster), dark purple bodies, red helmets and spears, spread evenly but irregularly inside an ellipse of radius ~2.3' },
    { zh: '天空法陣：水平圓盤上的發光圖案（兩圈圓環、12 個符文、內部六芒星），慢慢旋轉，出現時由中心向外展開', en: 'sky sigil: a glowing pattern on a horizontal disc (two rings, 12 runes, a hexagram inside), slowly rotating, unfolding from the centre outwards' },
    { zh: '隕石：低多邊形暗紅岩石（實心），表面有發光裂紋，前緣一圈白熱光暈，後方拖 6 條漸細的火尾和火星', en: 'meteor: a low-poly dark red rock (solid) with glowing cracks, a white-hot halo on the leading side, six tapering fire trails and sparks behind' },
    { zh: '陰影：撞擊點地面一個由小變大的深色圓，令人在隕石落地前已感到體積', en: 'shadow: a dark circle on the ground at the impact point that grows as the meteor approaches, selling its size before it lands' },
    { zh: '群眾反應：命中時間 = 撞擊時刻 + 距離 ÷ 波速；拋飛 = 拋物線＋翻滾＋落地滑行後躺下；蒸發 = 變白發光後溶解', en: 'crowd reaction: hit time = impact time + distance / wave speed; thrown = a parabola with a tumble, a short slide and lying down; vaporised = turns white and glowing, then dissolves' },
    { zh: '撞擊：白熱火球、地面衝擊環＋塵土環、14 塊碎石沿拋物線飛出、蘑菇煙柱', en: 'impact: a white-hot fireball, a ground shock ring with a dust ring, 14 rocks on parabolic arcs and a mushroom smoke column' },
    { zh: '隕坑：焦黑地面＋熔岩裂紋（橙色發光後冷卻成暗紅），1.5 秒後淡出', en: 'crater: scorched ground with lava cracks (glowing orange, cooling to dark red), fading after 1.5 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    meteor: { zh: '隕石大小', en: 'meteor size', min: .6, max: 1.4, step: .05, value: 1 },
    force: { zh: '衝擊力', en: 'blast force', min: .5, max: 1.6, step: .05, value: 1 },
    sky: { zh: '天空轉紅', en: 'sky reddening', min: 0, max: 1, step: .05, value: .7 },
  },
  draw(p, t) {
    const PL = this.palette, F = PL.fire, CAST = 1.0, HIT = 2.3, IX = 1.3, IY = 0;
    const R = 1.5 * p.param('meteor'), force = p.param('force');
    // ---- caster ----
    let pose;
    if (t < .5) pose = { a: 'idle', b: 'bothUp', k: p.easeOutBack(t / .5, 1.2) };
    else if (t < 2.05) pose = 'bothUp';
    else if (t < 2.15) pose = { a: 'bothUp', b: 'palm', k: p.easeInCubic((t - 2.05) / .1) };
    else if (t < 3.2) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.2, 4)) };
    const fig = p.figure(-3.5, .2, { pose });
    // ---- the horde ----
    const crowd = p.crowd({
      n: Math.round(p.param('crowd')), seed: 4, area: { x: IX - .1, y: IY, rx: 2.5, ry: 2.2 }, t,
      at: [IX, IY, 0],
      hit: u => HIT + .02 + Math.hypot(u.x - IX, u.y - IY) / 7 + u.r1 * .04,
      reactOf: u => (Math.hypot(u.x - IX, u.y - IY) < .55 + .3 * R ? 'vapor' : 'knock'),
      power: u => p.clamp((1.9 - .32 * Math.hypot(u.x - IX, u.y - IY)) * force, .45, 2),
      ramp: F,
      fear: u => p.ph(t, 1.3, 2.1) * (.5 + .5 * u.r3),
      respawn: [3.85, 4.95], clear: [3.4, 4.1], from: [1, .15],
    });
    // ---- falling meteor: slow from far above, quadratic speed-up at the end ----
    const fall = p.ph(t, CAST, HIT), fe = fall * fall;
    const M0 = [IX + 3.2, IY + 2.4, 10.5], M1 = [IX, IY, R * .35];
    const M = [p.lerp(M0[0], M1[0], fe), p.lerp(M0[1], M1[1], fe), p.lerp(M0[2], M1[2], fe)];
    const dir = p.v3.norm([M1[0] - M0[0], M1[1] - M0[1], M1[2] - M0[2]]);
    // shadow grows under it (drawn before the grade so it darkens with the world)
    if (t > CAST && t < HIT + .1) {
      const k = fall, Rs = R * (.5 + 1.3 * k);
      p.stain(IX, IY, Rs, (dx, dy, rho) => (rho < Rs ? (.35 + .75 * k) * (1 - Math.pow(rho / Rs, 3)) : 0), '#160f12', 1);
    }
    // crater: scorch + cooling lava cracks
    const cr = t > HIT ? 1 - p.ph(t, 3.9, 4.7) : 0;
    if (cr > 0) p.aftermath(IX, IY, 1.9 * Math.sqrt(R / 1.5), 'burn', { amt: cr, color: '#1e1416' });
    // meteor rock (solid) until it breaks on contact
    if (t >= CAST && t < HIT + .03) p.ball(M[0], M[1], M[2], R, PL.rock, { rough: .6, seed: 3 });
    // ---- world goes dark red ----
    const skyK = p.param('sky') * (t < HIT ? p.easeOutCubic(p.ph(t, .4, 1.4)) : 1 - p.ph(t, 3.1, 4.2));
    if (skyK > .01) p.domain({ amt: skyK, c: t > HIT ? [IX, IY, 0] : [IX, IY, 4.3], sky: 'ember', ground: skyK > .5 ? ['#1a1c12', '#283018', '#38401e', '#4a5226'] : null, solids: .15, t });
    // ---- light: charge on the hands, sky sigil, meteor heat ----
    if (t > .4 && t < 2.2) {
      const ch = p.ph(t, .4, 1.6), hz = Math.max(fig.hand[2], fig.handL[2]) + .25;
      p.charge(fig.hand[0], fig.hand[1], hz, ch, { n: 12, R: 1.2, ramp: PL.rune, up: .4 });
      p.glow(fig.hand[0], fig.hand[1], hz, .2 + .2 * ch, PL.rune, .7 * (t < 2.05 ? ch : 1 - p.ph(t, 2.05, 2.2)));
    }
    const sig = p.env(t, .5, 1.3, 2.0, 2.5);
    if (sig > 0) {
      const SR = 2.4 * p.easeOutBack(p.ph(t, .5, 1.2), 1.3), rot = t * .6;
      p.decal(IX, IY, 4.3, SR + .1, (dx, dy, rho, ang) => {
        const u = rho / SR, a = ang + rot;
        if (Math.abs(u - .96) < .03 || Math.abs(u - .78) < .025) return 1;
        if (u > .8 && u < .94) { const cell = (a / p.TAU * 12 % 1 + 1) % 1; return p.rune(cell, (u - .8) / .14, Math.floor((a / p.TAU + 1) * 12)) ? .8 : 0; }
        if (u < .76) return p.sdPoly(dx / SR, dy / SR, 6, .7, rot, 2) < .018 ? .85 : 0;
        return 0;
      }, PL.rune, 1.1 * sig);
    }
    if (t >= CAST && t < HIT + .03) {
      const I = .6 + .6 * fall;
      p.glow(M[0] + dir[0] * R * .3, M[1] + dir[1] * R * .3, M[2] + dir[2] * R * .3, R * 1.35, F, .9 * I, { pow: 1.6 });
      // glowing cracks on the rock
      p.shell(M[0], M[1], M[2], R * 1.02, (nx, ny, nz) => (Math.abs(p.noise(nx * 2.6 + 7, ny * 2.6 + nz * 1.9) - .5) < .05 ? .9 : 0), F, .9 * I, { back: 0 });
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * p.TAU + t * 2, c = p.cam(), off = p.v3.norm([c.right[0] * Math.cos(a) + c.up[0] * Math.sin(a), c.right[1] * Math.cos(a) + c.up[1] * Math.sin(a), c.right[2] * Math.cos(a) + c.up[2] * Math.sin(a)]);
        const st = [M[0] + off[0] * R * .7, M[1] + off[1] * R * .7, M[2] + off[2] * R * .7], L = R * (2.2 + 1.6 * p.r(k, 3)) * (.6 + fall);
        p.line(st, [st[0] - dir[0] * L, st[1] - dir[1] * L, st[2] - dir[2] * L], R * .32, F, .9 * I, { w1: .02, i1: .1 });
      }
      p.light(M1[0], M1[1], 0, R * (1 + 2 * fall), F, .5 * fall);
    }
    // ---- impact ----
    const a = t - HIT;
    if (a >= 0 && a < .03 + 1 / 30) p.impactFrame({ ink: '#1a0806', paper: '#fff4e0', accent: '#ff6a1e' });
    if (a >= 0) {
      const fb = 1 - p.ph(a, .05, .55);
      if (fb > 0) {
        const fr = R * (.55 + .4 * p.easeOutExpo(a / .25));
        p.glow(IX, IY, fr * .5, fr * 1.5, F, 1.3 * fb * fb, { pow: 1.4 });
        const orr = fr * .75 * (1 - p.ph(a, .08, .45));
        if (orr > .05) p.orb(IX, IY, fr * .45, orr, F, 1.2);
      }
      p.shock(IX, IY, .15, p.ph(a, 0, 1), { R: 4.6 * Math.sqrt(force), w: .45, ramp: F, ground: true, dust: PL.dust, dustN: 22 });
      if (a < .25) p.speedLines(IX, IY, .8, { n: 18, R0: R * 1.1, R1: 4.5, ramp: F, I: 1 - a / .25, seed: Math.floor(t * 30) });
      // rocks
      const nR = Math.round(14 * p.density);
      for (let k = 0; k < nR; k++) {
        const ang = p.r(k, 21) * p.TAU, vz = 2.5 + 3 * p.r(k, 23), T = 2 * vz / 9.8, v = Math.min(2 + 2.6 * p.r(k, 22), (2.9 - R * .5) / T), tt = Math.min(a, T);
        if (a > T + 1.4) continue;
        const x = IX + Math.cos(ang) * (R * .5 + v * tt), y = IY + Math.sin(ang) * (R * .5 + v * tt), z = Math.max(.08, .3 + vz * tt - 4.9 * tt * tt);
        p.rock(x, y, z, .09 + .1 * p.r(k, 24), PL.rock, k);
        if (a < T) p.dot(x, y, z + .08, F, .8 * (1 - a / T), 1);
      }
      // mushroom smoke: a stem and a cap ring that rise and spread
      const sm = Math.sqrt(R / 1.5), u = p.ph(a, .35, 2.8);
      if (u > 0 && u < 1) {
        const Hs = (1 + 2.3 * p.easeOut(u)) * sm, al = Math.pow(1 - u, .8) * .95, nStem = 5, nCap = Math.round(9 * Math.min(1.5, p.density));
        for (let k = 0; k < nStem; k++) {
          const z = (k + .5) / nStem * Hs, w = (.28 + .12 * u) * sm * (1 - .3 * k / nStem);
          p.ball(IX + (p.r(k, 31) - .5) * .15, IY + (p.r(k, 32) - .5) * .15, z, w, PL.smoke, { alpha: al, rough: .4, shadow: false, seed: k });
        }
        for (let k = 0; k < nCap; k++) {
          const ang = k / nCap * p.TAU + p.r(k, 33), rr = (.35 + .85 * p.easeOut(u)) * sm;
          p.ball(IX + Math.cos(ang) * rr, IY + Math.sin(ang) * rr, Hs + (p.r(k, 34) - .3) * .3 * sm, (.36 + .3 * u) * sm, PL.smoke, { alpha: al, rough: .4, shadow: false, seed: k + 9 });
        }
        p.ball(IX, IY, Hs + .25 * sm, (.45 + .3 * u) * sm, PL.smoke, { alpha: al, rough: .4, shadow: false, seed: 30 });
      }
      if (cr > 0) p.aftermath(IX, IY, 1.6 * Math.sqrt(R / 1.5), 'crack', { amt: cr, n: 7, ramp: F, glow: (1 - p.ph(a, .2, 2.4)) * cr, seed: 5, color: '#2a1414' });
      p.light(IX, IY, 0, 3.5, F, 1.2 * Math.pow(1 - p.ph(a, 0, 1.4), 2));
    }
  },
});
