// 燼刃焦土 / Cinder Edge — Ultimates pack (original design): blade flames contract into a white-hot edge, then one low 200° fire arc scorches the field
PXFX.define({
  id: 'cinder-edge',
  loop: 4,
  beats: [{ t: 1.55, kind: 'cast', power: 1 }, { t: 1.8, kind: 'hit', power: 1.2 }],
  view: { r: 3.4, h: 2.6 },
  stage: { ground: 'dirt', tiles: true },
  modules: ['figure', 'charge', 'grade', 'slash', 'impact', 'aftermath'],
  palette: {
    fire: ['#a3301c', '#d84a1f', '#ff7a2a', '#ffb050', '#ffe08a', '#fffbe8'],
    edge: ['#ff8a3a', '#ffc670', '#fff0c8', '#ffffff'],
    ash: ['#5a5058', '#787078', '#9a929a', '#c0b8bc'],
    char: ['#140e12', '#1e161a', '#2a2024', '#382c2e'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿轉為持刀架式，刀長 1.05', en: 'pose: idle into a sword stance, blade length 1.05' },
    { k: 'charge', t: [.35, 1.55], zh: '集氣：刀身先被 5 團大火焰包住（每團高 0.75），0.95–1.5 秒火焰先微脹再急縮，全部收進一條 1–2 像素寬的白熱刀鋒；刀旁空氣以熱浪扭曲，環境壓暗 28%，火星由外向刀身吸入', en: 'charge: 5 big flame tongues (0.75 tall) wrap the blade; from 0.95 to 1.5 s they swell slightly then collapse into a 1–2 px white-hot edge; heat haze wobbles the air around the blade, the scene darkens 28%, sparks are sucked into the blade' },
    { k: 'shape', t: [1.55, 1.62], zh: '成形：0.07 秒內揮刀，身前生成一道貼地的巨型火焰弧斬（彎月形、無實心主體、弧度約 200°、離地 0.5）', en: 'shape: a 0.07 s swing spawns a giant low arc of fire in front (crescent, no solid body, ~200° arc, 0.5 above the ground)' },
    { k: 'motion', t: [1.62, 1.8], zh: '推進：火弧先急衝再加速橫掃向前，半徑由 0.8 長到 1.8，外緣有火舌與速度線，掃過之處地面即時燒黑', en: 'motion: the arc kicks out then accelerates forward, radius growing 0.8 → 1.8, flame licks and streaks on the outer edge; the ground blackens behind it' },
    { k: 'impact', t: [1.8, 2], zh: '命中：火弧穿過目標，白熱閃光 0.15 秒收縮，火星四濺，目標身上短暫著火', en: 'impact: the arc cuts through the target, a white-hot flash collapsing in 0.15 s, a spray of sparks, the target briefly on fire' },
    { k: 'after', t: [2, 4], zh: '餘波：扇形焦黑地面布滿發光餘燼裂紋（1.3 秒內冷卻），灰色灰燼由地面緩慢上飄，零星火星；施法者收刀，焦痕於 3.9 秒前淡出', en: 'aftermath: a scorched black fan with glowing ember cracks (cooling over 1.3 s), grey ash flecks drifting up slowly, a few embers; the caster recovers, the scorch fades by 3.9 s' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→後拉蓄勢→0.07 秒揮斬→收刀，刀為細長實心四邊形', en: 'caster: faceless mannequin, idle → stance → coil back → 0.07 s swing → recover; the sword is a thin solid quad' },
    { zh: '刀身火焰：沿刀均勻放 5 張面向鏡頭的火焰形發光卡片（寬 0.42、高 0.75），收斂時寬高同時縮到 0，刀鋒線同步由暗變白熱', en: 'blade flames: 5 camera-facing flame-shaped light cards along the blade (0.42 × 0.75); during the contraction they shrink to zero while the edge line ramps to white-hot' },
    { zh: '刀鋒：刀柄到刀尖一條極細白熱線（寬 0.03），蓄滿時最亮；熱浪：刀旁半徑 0.7 的螢幕扭曲，像素左右擺動 1–2 格', en: 'edge: one very thin white-hot line hilt → tip (0.03 wide), brightest when fully charged; heat haze: a 0.7-radius screen warp around the blade, pixels wobbling 1–2 px sideways' },
    { zh: '火焰弧斬：彎月形發光網格，弧度約 200°、近乎水平（傾斜 9°），外緣白熱、內側轉紅；外緣 7 張火舌卡片向上燒，後方拖 10 條速度線', en: 'fire arc: a glowing crescent mesh, ~200° arc, nearly horizontal (9° tilt), white-hot outer edge fading red inside; 7 flame-lick cards burn upward from the outer edge, 10 speed streaks behind' },
    { zh: '命中：目標處白熱光暈＋8 道星芒＋20 粒帶重力火星，目標身上 3 張火焰卡片燒 0.6 秒', en: 'impact: white-hot glow + 8 star rays + 20 gravity sparks at the target; 3 flame cards burn on the target for 0.6 s' },
    { zh: '焦土：掃過的扇形範圍即時染成焦黑（三級抖色），上面一層噪聲裂紋貼花發橙紅光並慢慢冷卻', en: 'scorch: the swept fan is stained black at once (three dithered steps), with a noisy crack decal glowing orange-red that slowly cools' },
    { zh: '灰燼：18 粒灰色小點由焦土緩慢上升（每秒 0.3）並左右飄擺；另有 6 粒火星閃爍上升', en: 'ash: 18 grey flecks rise slowly from the scorch (0.3 per second) with a sideways sway; 6 flickering embers rise too' },
  ],
  params: {
    arcWidth: { zh: '弧斬角度（度）', en: 'arc width (deg)', min: 120, max: 220, step: 5, value: 200 },
    flameReach: { zh: '火焰範圍', en: 'flame reach', min: .7, max: 1.3, step: .05, value: 1 },
    ash: { zh: '灰燼數量', en: 'ash flecks', min: 0, max: 40, step: 1, value: 18 },
    heatHaze: { zh: '熱浪強度', en: 'heat haze', min: 0, max: 1, step: .05, value: .6 },
  },
  // flight of the arc front: a kick off the blade, then accelerating into the target (0..1)
  travel(p, u) { return .3 * p.easeOutCubic(Math.min(1, u / .3)) + .7 * u * u; },
  // swept front x and crescent radius at time t
  sweep(p, t, reach) {
    const CAST = 1.55, HIT = 1.8, X0 = -2.1, HX = 2.35;
    if (t < CAST) return null;
    const k = this.travel(p, p.ph(t, CAST + .02, HIT));
    const front = p.lerp(X0 + .55, HX + .15, k) + (t > HIT ? p.drag(6, 5, t - HIT) : 0);
    const R = (1.15 + .85 * k) * reach * p.easeOutBack(p.ph(t, CAST, CAST + .1), 1.5);
    return { front, R };
  },
  draw(p, t) {
    const F = this.palette.fire, ED = this.palette.edge, ASH = this.palette.ash;
    const X0 = -2.1, HX = 2.35, CAST = 1.55, HIT = 1.8;
    const arc = p.param('arcWidth') * Math.PI / 180, reach = p.param('flameReach'), haze = p.param('heatHaze');
    // ---- caster pose ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .35) };
    else if (t < .95) pose = 'ready';
    else if (t < CAST) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .95, 1.45), 1.3) };
    else if (t < CAST + .07) pose = { a: 'windup', b: 'swing', k: p.easeInCubic((t - CAST) / .07) };
    else if (t < 2.7) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.7, 3.6)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose, blade: { len: 1.05 } });

    // ---- scorched fan: stained as the arc sweeps over it, fades at the end ----
    const sw = this.sweep(p, t, reach), xs = X0 + .35;
    const fade = 1 - p.ph(t, 3.2, 3.9);
    const fanW = x => Math.min(1.9, .35 + .42 * (x - xs)) * reach * Math.sin(Math.min(arc / 2, Math.PI / 2));
    if (sw && fade > 0) {
      const xe = Math.min(sw.front - .1, HX + 1.3), cx = (xs + xe) / 2, Rb = Math.hypot((xe - xs) / 2, fanW(xe)) + .15;
      if (xe > xs + .05) p.stain(cx, 0, Rb, (dx, dy) => {
        const x = dx + cx, xp = x - xs;
        if (xp < 0 || x > xe) return 0;
        const e = Math.abs(dy) / fanW(x) + (p.noise(x * 2.3, dy * 2.3 + 4) - .5) * .5;
        const tail = Math.min(1, (xe - x) / .35, xp / .3);
        return e < 1 ? (1.25 - e * .5) * tail : 0;
      }, '#1a1216', fade);
    }

    // ---- environment darkens while the flames contract ----
    const con = p.ph(t, .95, 1.5);
    const dark = .28 * (t < HIT ? p.easeOutCubic(con) : 1 - p.ph(t, HIT + .2, HIT + 1));
    if (dark > .01) p.grade({ dark, desat: dark * .5 });

    // ---- blade flames → razor edge ----
    const ign = p.easeOutBack(p.ph(t, .3, .6), 1.4);
    const fl = ign * Math.max(0, 1 - p.easeInBack(con, 1.4));
    const mid = fig.tip ? p.v3.lerp(fig.hand, fig.tip, .55) : fig.hand;
    if (fig.tip && t < CAST + .1 && fl > .02) {
      for (let k = 0; k < 6; k++) {
        const s = (k + .5) / 6, q = p.v3.lerp(fig.hand, fig.tip, s), w = .46 * fl * (1 - .35 * s), h = 1.05 * fl * (1 - .3 * s) * (.85 + .3 * p.noise(k * 2.1, t * 5));
        p.card(q[0], q[1], q[2] + h * .32, w, h, (u, v) => {
          const m = p.flameShape(u, v, t * 1.4, k * 3.1, 1.3);
          return m > 0 ? Math.min(1, .2 + m * 1.9) : 0;
        }, F, .9);
      }
      p.glow(mid[0], mid[1], mid[2], .4 * fl, F, .3 * fl);
      p.light(mid[0], mid[1], 0, 1.6, F, .7 * fl);
    }
    if (fig.tip && t > .9 && t < CAST) p.charge(mid[0], mid[1], mid[2], con, { n: 14, R: 1.2, ramp: F, up: .2, seed: 3 });

    // ---- the fire arc ----
    if (sw && t < HIT + .55) {
      const life = t < HIT ? 0 : p.ph(t, HIT + .05, HIT + .55), R = sw.R, tl = .12, cz = .5;
      const side = [0, Math.cos(tl), Math.sin(tl)], c = [sw.front - R, 0, cz];
      const fly = p.ph(t, CAST + .02, HIT);
      const res = p.crescent({ c, dir: [1, 0, 0], side, R, thick: .42 * reach, arc, body: null, edge: F, I: 1.2, u: life, streaks: t < HIT ? 8 : 0, streakLen: .4 + 1 * fly, seed: 5, segs: 30 });
      // flame licks burning upward from the outer edge
      if (res) {
        const nL = 5, hI = 1 - life;
        for (let k = 0; k < nL; k++) {
          const s = .2 + .6 * k / (nL - 1), j = Math.round(s * (res.outer.length - 1)), q = res.outer[j], prof = Math.sin(Math.PI * s);
          const h = (.3 + .25 * prof) * reach * hI * (.8 + .4 * p.noise(k * 3.3, t * 6));
          if (h < .05) continue;
          p.card(q[0], q[1], q[2] + h * .4, h * .6, h, (u, v) => {
            const m = p.flameShape(u, v, t * 1.5, k * 2.7 + 1, 1);
            return m > 0 ? Math.min(1, .3 + m * 2) : 0;
          }, F, .9 * hI);
        }
      }
      p.light(sw.front - R * .3, 0, 0, R + .9, F, 1 - life);
    }

    // ---- impact on the target ----
    const a = t - HIT;
    if (a >= 0 && a < .9) {
      const hz = .95, flI = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (flI > 0) {
        p.glow(HX, 0, hz, .3 + .55 * flI, F, 1.5 * flI, { pow: 1.3 });
        for (let r = 0; r < 8; r++) {
          const ang = r / 8 * p.TAU + .4, len = (.9 + p.r(r, 9) * .9) * (.3 + flI);
          p.line([HX, 0, hz], [HX - .1, Math.cos(ang) * len, hz + Math.sin(ang) * len], .1, ED, 1.2 * flI, { w1: .01, i1: .3 });
        }
      }
      const nS = Math.round(20 * p.density);
      for (let s = 0; s < nS; s++) {
        const life = .35 + p.r(s, 1) * .4, u = a / life;
        if (u <= 0 || u >= 1) continue;
        const ang = p.r(s, 2) * p.TAU, sp = 3.5 + p.r(s, 3) * 3.5, dx = .4 + p.r(s, 4) * .8, dy = Math.cos(ang) * .9, dz = Math.sin(ang) * .7 + .5;
        const d = p.drag(sp, 5, a), d0 = p.drag(sp, 5, Math.max(0, a - .05));
        const z = hz + dz * d - 3 * a * a, z0 = hz + dz * d0 - 3 * Math.max(0, a - .05) ** 2;
        if (z < 0) continue;
        p.line([HX + dx * d, dy * d, z], [HX + dx * d0, dy * d0, z0], .05, F, 1 - u * .6);
      }
      // the target burns briefly
      const burn = Math.pow(1 - p.ph(a, .05, .7), 1.5);
      if (burn > .02) for (let k = 0; k < 3; k++) {
        const h = (.55 + .2 * k) * burn;
        p.card(HX + (k - 1) * .05, (k - 1) * .22, .45 + k * .3 + h * .3, h * .6, h, (u, v) => {
          const m = p.flameShape(u, v, t * 1.3, k * 5 + 2, 1);
          return m > 0 ? Math.min(1, .3 + m * 2) : 0;
        }, F, .9);
      }
      p.light(HX, 0, 0, 2.2, F, Math.max(flI, .5 * burn));
    }

    // ---- aftermath: glowing ember cracks across the fan, ash rising, a few embers ----
    if (t > CAST + .1 && fade > 0) {
      const cool = t < HIT ? 1 : Math.pow(1 - p.ph(t, HIT, HIT + 1.3), 1.6);
      const xe = Math.min(sw.front - .1, HX + 1.3), cx = (xs + xe) / 2;
      if (cool > .02 && xe > xs + .2) p.decal(cx, 0, 0, Math.hypot((xe - xs) / 2, fanW(xe)) + .1, (dx, dy) => {
        const x = dx + cx, xp = x - xs;
        if (xp < .15 || x > xe) return 0;
        const e = Math.abs(dy) / fanW(x);
        if (e > .9) return 0;
        const n = p.noise(x * 1.9 + 7, dy * 1.9), cr = Math.abs(n - .5);
        return cr < .035 ? (1 - e) * 1.3 : 0;
      }, F, cool);
      if (t > HIT) p.aftermath(HX, 0, 1.1, 'burn', { amt: fade, ramp: F, glow: cool, seed: 4, color: '#1a1216' });
    }
    if (t > HIT && fade > 0) {
      const nA = Math.round(p.param('ash') * p.density);
      for (let k = 0; k < nA; k++) {
        const born = HIT + .1 + p.r(k, 11) * 1.4, age = t - born;
        if (age < 0) continue;
        const x0 = xs + .3 + p.r(k, 12) * (HX + 1 - xs), y0 = (p.r(k, 13) * 2 - 1) * fanW(x0) * .8;
        const z = .05 + age * (.22 + p.r(k, 14) * .15), sway = Math.sin(age * 2.2 + k) * .12;
        const I = Math.min(1, age * 3) * (1 - p.ph(t, 3.1 + p.r(k, 15) * .5, 3.85)) * (.6 + .3 * p.r(k, 16));
        if (z < 2.6) p.dot(x0 + sway * .5, y0 + sway, z, ASH, I, 1);
      }
      const nE = Math.round(6 * p.density);
      for (let k = 0; k < nE; k++) {
        const ph = ((t - HIT) * (.35 + p.r(k, 21) * .3) + p.r(k, 22)) % 1, x0 = xs + .5 + p.r(k, 23) * (HX + .6 - xs);
        const fl2 = .5 + .5 * Math.sin(t * 23 + k * 4);
        p.dot(x0 + Math.sin(ph * 6 + k) * .1, (p.r(k, 24) - .5) * fanW(x0), ph * 1.4, F, (1 - ph) * fl2 * fade * (1 - p.ph(t, 2.9, 3.6)), 1);
      }
    }

    // ---- heat haze around the blade, then the razor edge drawn crisp on top ----
    const hz = haze * (t < CAST ? p.ph(t, .5, .9) * (.5 + .5 * con) : 1 - p.ph(t, CAST, CAST + .25));
    if (fig.tip && hz > .02) {
      const ph = t * 31;
      p.warp(mid[0], mid[1], mid[2] + .15, .75, (dx, dy, rho) => {
        const f = (1 - rho) * hz;
        return [Math.sin(dy * 16 + ph) * .1 * f, Math.sin(dx * 13 - ph * .8) * .04 * f];
      });
    }
    if (fig.tip && t > .3 && t < CAST + .25) {
      const eI = t < CAST ? ign * (.2 + .95 * p.easeInCubic(con)) : 1 - p.ph(t, CAST, CAST + .25);
      p.line(fig.hand, fig.tip, .2, ED, .28 * eI * p.ph(t, .95, 1.4), { w1: .1, pow: 2 });
      p.line(fig.hand, fig.tip, .09, ED, eI, { w1: .05, i1: eI * .9 });
      if (t < CAST && con > .6) p.sparkle(fig.tip[0], fig.tip[1], fig.tip[2], 2 + 3 * p.ph(con, .6, 1), ED, eI);
    }
  },
});
