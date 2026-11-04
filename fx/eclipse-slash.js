// 月蝕斬 / Eclipse Slash — Ultimates pack (original design): a diagonal pitch-black crescent lands in red lightning and a black sphere ringed like an eclipse
PXFX.define({
  id: 'eclipse-slash',
  loop: 3.8,
  beats: [{ t: 1, kind: 'cast', power: 1 }, { t: 1.5, kind: 'hit', power: 1.3 }, { t: 1.72, kind: 'pulse', power: .8 }],
  view: { r: 3.3, h: 2.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'charge', 'grade', 'slash', 'impact', 'shockwave', 'aftermath'],
  palette: {
    edge: ['#7a0e22', '#b01830', '#e8203c', '#ff5a64', '#ffb4b4', '#fff2f2'],
    body: ['#0a0608', '#140a0e', '#1e0f15', '#2a141c'],
    corona: ['#b01830', '#ff3a4a', '#ff9a9a', '#ffe6e6', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿轉為持刀架式', en: 'pose: idle into a sword stance' },
    { k: 'charge', t: [.35, 1], zh: '集氣：刀舉到身後，刀身發暗紅光，紅色光點與細小電弧匯聚到刀尖；刀尖出現一顆小黑球配紅色光環（月蝕預告）；環境壓暗 30%', en: 'charge: blade raised behind, glowing dark red; red motes and tiny arcs gather at the tip, where a small black orb with a red ring appears (eclipse foreshadow); the scene darkens 30%' },
    { k: 'shape', t: [1, 1.08], zh: '成形：0.08 秒內斜劈，身前出現漆黑彎月斬擊：斜 35°、半徑 1.6、弧度 155°、最厚 0.5（比一般彎月更寬更扁），外緣暗紅刀邊', en: 'shape: a 0.08 s diagonal swing spawns a pitch-black crescent: tilted 35°, radius 1.6, 155° arc, 0.5 thick (wider and flatter than a usual crescent), dark-red edge' },
    { k: 'motion', t: [1.08, 1.5], zh: '推進：斬擊先急衝再加速飛向目標，外緣拖 8 條紅色速度線', en: 'motion: the crescent kicks off then accelerates into the target, 8 red streaks trailing from its edge' },
    { k: 'impact', t: [1.5, 2.15], zh: '命中：9 條紅色閃電由命中點向四方爆出（每格換形）；黑色力場球 0.16 秒內脹到半徑 0.75，外圍暗紅光暈；0.2 秒時球外出現面向鏡頭的白紅細光環與放射日冕光芒（月蝕），閃一下後球急縮消失，地面衝擊環擴散', en: 'impact: 9 red bolts burst from the hit point (re-rolled every frame); a black force sphere swells to radius 0.75 in 0.16 s with a dark-red halo; at 0.2 s a thin white-red camera-facing ring and radial corona rays flash around it (the eclipse), then the sphere collapses fast and a ground shock ring spreads' },
    { k: 'after', t: [2.15, 3.8], zh: '餘波：命中點留下黑色墨痕與發紅裂紋，紅色火星緩慢上飄；施法者收刀，痕跡於 3.7 秒前淡出', en: 'aftermath: a black ink mark and red-glowing cracks at the hit point, red sparks drifting up; the caster recovers, the marks fade by 3.7 s' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→舉刀→0.08 秒斜劈→收刀，刀為細長實心四邊形', en: 'caster: faceless mannequin, idle → stance → wind-up → 0.08 s diagonal swing → recover; the sword is a thin solid quad' },
    { zh: '斬擊：彎月形網格，在 xz 平面內旋轉 −35° 成斜線；主體不透明黑色實心（不要用加法混色畫黑），外緣暗紅亮邊＋外層光暈，命中後以噪聲溶解', en: 'slash: a crescent mesh rotated −35° in the xz plane so it reads as a diagonal; an opaque black solid body (never draw black additively), a dark-red outer edge plus a halo; dissolves with noise after the hit' },
    { zh: '閃電：9 條鋸齒閃電（長 1–2，各 1 條分支），由命中點向上半球隨機方向噴出，每格換隨機種子，0.6 秒內縮短', en: 'lightning: 9 jagged bolts (1–2 long, one branch each) spraying from the hit point into random upper-hemisphere directions, a new seed every frame, shrinking over 0.6 s' },
    { zh: '黑球：實心平塗黑球，先以指數緩動脹大、停 0.2 秒、再以 easeInCubic 急縮；外面放一個半徑 1.35 倍的暗紅光暈，黑球擋住中間只剩外圈發光', en: 'black sphere: a flat solid black ball that swells (exponential ease), holds 0.2 s, then collapses (easeInCubic); a dark-red glow 1.35× its radius sits behind it so only the outer rim shows' },
    { zh: '月蝕：面向鏡頭的細光環（寬 0.05，白→紅）緊貼黑球輪廓，加 16 條長短不一的放射日冕光芒，在 0.2 秒左右最亮', en: 'eclipse: a thin camera-facing ring (0.05 wide, white → red) hugging the sphere outline plus 16 uneven radial corona rays, brightest around 0.2 s' },
    { zh: '地面：命中時地面衝擊環擴到半徑 2 並變細；之後黑色墨痕＋5 向紅色裂紋貼花，12 粒紅色火星上飄', en: 'ground: a ground shock ring expands to radius 2 and thins at the hit; then a black ink mark plus a 5-way red crack decal, 12 red sparks drifting up' },
  ],
  params: {
    crescentSize: { zh: '斬擊大小', en: 'crescent size', min: .7, max: 1.4, step: .05, value: 1 },
    bolts: { zh: '閃電數量', en: 'bolt count', min: 3, max: 14, step: 1, value: 9 },
    sphereSize: { zh: '黑球大小', en: 'sphere size', min: .6, max: 1.5, step: .05, value: 1 },
    tilt: { zh: '斬擊斜度（度）', en: 'slash tilt (deg)', min: -60, max: -10, step: 5, value: -35 },
  },
  travel(p, u) { return .3 * p.easeOutCubic(Math.min(1, u / .3)) + .7 * u * u; },
  draw(p, t) {
    const ED = this.palette.edge, B = this.palette.body, CO = this.palette.corona;
    const CAST = 1, HIT = 1.5, X0 = -2.1, HX = 2.35, C = [HX - .15, 0, 1.05], fr = Math.floor(t * 30), a = t - HIT;
    const sz = p.param('crescentSize'), R = 1.6 * sz, ss = p.param('sphereSize'), tl = p.param('tilt') * Math.PI / 180;
    // ---- caster ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .35) };
    else if (t < CAST) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .35, .85), 1.2) };
    else if (t < CAST + .08) pose = { a: 'windup', b: 'swing', k: p.easeInCubic((t - CAST) / .08) };
    else if (t < 2.6) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.6, 3.4)) };
    p.dummy(HX + .2, 0);
    const fig = p.figure(X0, 0, { pose, blade: { len: 1.05 } });
    // ---- ground marks (before the grade so they sit in the scene) ----
    const fade = 1 - p.ph(t, 3.1, 3.7);
    if (a > 0) {
      p.aftermath(C[0], 0, .9 * ss, 'ink', { amt: fade * p.ph(a, .1, .3), seed: 3 });
      p.aftermath(C[0], 0, 1.6 * ss, 'crack', { amt: fade, ramp: ED, glow: Math.pow(1 - p.ph(a, .2, 1.6), 1.5), seed: 8, n: 5 });
    }
    // ---- scene darkens while charging, recovers after the eclipse ----
    const ch = p.ph(t, .35, CAST);
    const dark = .3 * (t < CAST ? p.easeOutCubic(ch) : 1 - p.ph(t, HIT + .4, HIT + 1.2));
    if (dark > .01) p.grade({ dark, desat: dark * .5 });
    // ---- charge: red blade, motes, arcs, a tiny eclipse at the tip ----
    if (fig.tip && t < CAST + .25) {
      const bI = t < CAST ? .3 + .7 * ch : 1 - p.ph(t, CAST, CAST + .25), tp = fig.tip;
      p.line(fig.hand, tp, .07, ED, bI, { w1: .03 });
      if (t < CAST) {
        p.charge(tp[0], tp[1], tp[2], ch, { n: 14, R: 1.3, ramp: ED, up: .3, seed: 1 });
        const orb = .1 * p.easeOutBack(p.ph(ch, .3, .9), 2);
        if (orb > .01) {
          p.ball(tp[0], tp[1], tp[2] + .12, orb, B, { flat: true, shadow: false });
          p.glow(tp[0], tp[1], tp[2] + .12, orb * 1.7, ED, .9 * ch);
          p.ring(tp[0], tp[1], tp[2] + .12, orb * 1.15, .03, CO, ch, { axis: p.cam().fwd });
        }
        if (ch > .4 && p.r(fr, 4) < .6) {
          const d = p.rdir(fr, 5, .2);
          p.bolt(tp, [tp[0] + d[0] * .35, tp[1] + d[1] * .35, tp[2] + d[2] * .35], ED, { seed: fr, jag: .35, depth: 3, w: .03, I: .9, glow: .2 });
        }
      }
    }
    // ---- the crescent: diagonal (rotated in the xz plane: convex side forward-up, tips upper-back / lower-front) ----
    const dir = [Math.cos(tl), 0, -Math.sin(tl)], side = p.v3.norm([Math.sin(tl), .25, Math.cos(tl)]), ARC = 2.7;
    if (t >= CAST && t < HIT + .45) {
      const fly = p.ph(t, CAST + .02, HIT), grow = p.easeOutBack(p.ph(t, CAST, CAST + .1), 1.6), k = this.travel(p, fly);
      const Rg = R * grow;
      // keep the lower tip above the ground
      let low = 0;
      for (let j = 0; j <= 8; j++) { const q = (j / 8 - .5) * ARC; low = Math.min(low, dir[2] * Math.cos(q) + side[2] * Math.sin(q)); }
      const cz = Math.max(1.05, .1 - low * Rg), cx = p.lerp(X0 + .4 - Rg * .3, C[0] - Rg * .8, k) + (a > 0 ? a * 1.2 : 0);
      const u = a < 0 ? 0 : p.ph(a, 0, .45);
      p.crescent({ c: [cx, 0, cz], dir, side, R: Rg, thick: .5 * sz, arc: ARC, body: B, edge: ED, I: 1.1, u, streaks: a < 0 ? 8 : 0, streakLen: .5 + 1.4 * fly, seed: 6, segs: 26 });
      p.light(cx + Rg * .8, 0, .5, 1.4, ED, .5 * (1 - u));
    }
    // ---- the black sphere (solid) ----
    const sr = a < 0 ? 0 : .75 * ss * p.easeOutExpo(p.ph(a, .02, .18)) * (1 - p.easeInCubic(p.ph(a, .38, .6)));
    if (sr > .02) p.ball(C[0], C[1], C[2], sr, B, { flat: true, shadow: true });
    // ---- impact light ----
    if (a >= 0 && a < .9) {
      const fl = Math.pow(1 - p.ph(a, 0, .12), 2), cam = p.cam();
      if (fl > 0) p.glow(C[0] - .2, 0, C[2], .3 + .6 * fl, CO, 1.4 * fl, { pow: 1.3 });
      // rim glow around the sphere (hidden in the middle by the solid)
      if (sr > .02) p.glow(C[0], C[1], C[2], sr * 1.35, ED, 1.1, { pow: 1.2 });
      // eclipse: thin blazing ring + corona rays, flashing around 0.2 s
      const ec = p.env(a, .1, .2, .26, .4);
      if (sr > .05 && ec > 0) {
        p.ring(C[0], C[1], C[2], sr * 1.06, .05, CO, 1.3 * ec, { axis: cam.fwd });
        for (let k = 0; k < 16; k++) {
          const ang = k / 16 * p.TAU + .1, L = sr * (.35 + .6 * p.r(k + fr, 9)) * ec, d = p.v3.norm([cam.right[0] * Math.cos(ang) + cam.up[0] * Math.sin(ang), cam.right[1] * Math.cos(ang) + cam.up[1] * Math.sin(ang), cam.right[2] * Math.cos(ang) + cam.up[2] * Math.sin(ang)]);
          const s0 = p.v3.along(C, d, sr * 1.1);
          p.line(s0, p.v3.along(s0, d, L), .06, CO, ec, { w1: .01, i1: .1 });
        }
      }
      // red lightning storm erupting from the hit
      const nB = Math.round(p.param('bolts')), bl = 1 - p.ph(a, .05, .6);
      for (let k = 0; k < nB && bl > 0; k++) {
        const d = p.rdir(k, 11, .35), L = (1 + p.r(k + fr * 3, 12)) * (.45 + .55 * p.easeOutExpo(p.ph(a, 0, .08))) * (.4 + .6 * bl) * (.8 + .2 * ss);
        const end = [C[0] + d[0] * L, C[1] + d[1] * L, Math.max(.03, C[2] + d[2] * L)];
        p.bolt(C, end, ED, { seed: fr * 13 + k * 7, jag: .28, depth: 4, branches: 1, w: .05, I: 1.05 * (.45 + .55 * bl), glow: .3 });
      }
      p.shock(C[0], 0, 0, p.ph(a, .35, .85), { R: 2 * ss, w: .2, ramp: ED, I: .9 });
      p.light(C[0], 0, 0, 2.3, ED, Math.max(fl, .7 * bl));
    }
    // ---- sparks drifting up afterwards ----
    if (a > .2) {
      const n = Math.round(12 * p.density);
      for (let k = 0; k < n; k++) {
        const born = HIT + .2 + p.r(k, 21) * .9, age = t - born;
        if (age < 0 || age > 1.6) continue;
        const ang = p.r(k, 22) * p.TAU, rr = .2 + p.r(k, 23) * 1.1 * ss;
        p.dot(C[0] + Math.cos(ang) * rr, Math.sin(ang) * rr, .1 + age * (.4 + .3 * p.r(k, 24)), ED, (1 - age / 1.6) * (.6 + .5 * Math.sin(t * 20 + k)), 1);
      }
    }
  },
});
