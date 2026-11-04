// 黑紅雷拳 / Crimson Spark Fist — Ultimates pack (original design): a dash punch that lands in a black radial star, dark-red lightning and a two-tone negative frame
PXFX.define({
  id: 'crimson-spark-fist',
  loop: 3.6,
  beats: [{ t: .78, kind: 'cast', power: .7 }, { t: 1.15, kind: 'hit', power: 1.5 }],
  view: { r: 3.3, h: 2.6 },
  stage: { ground: 'stone', tiles: true },
  modules: ['figure', 'charge', 'impact', 'shockwave', 'aftermath'],
  palette: {
    bolt: ['#7a0e22', '#b01830', '#e8203c', '#ff5a64', '#ffb4b4', '#fff2f2'],
    star: ['#0c0609', '#160a10', '#221016', '#30161e'],
    ghost: ['#3a0c18', '#5a1424', '#7a1c2c', '#9a2836'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者在 x=−2.2 由站姿壓低成架式', en: 'pose: at x = −2.2 the caster drops from idle into a low stance' },
    { k: 'charge', t: [.35, .68], zh: '集氣：右拳周圍 2–3 條細小暗紅電弧閃爍，紅色光點吸向拳頭', en: 'charge: 2–3 tiny dark-red arcs crackle around the right fist, red motes are pulled into it' },
    { k: 'shape', t: [.68, .85], zh: '成形：身體猛然前傾 40° 成衝刺姿勢（0.1 秒），拳頭亮起暗紅光，身後開始拖出紅黑殘影', en: 'shape: the body snaps into a 40° forward dash lean (0.1 s), the fist lights up dark red and red-black afterimages start trailing' },
    { k: 'motion', t: [.85, 1.15], zh: '推進：0.37 秒衝刺約 3.6 單位（先急起步再加速），身後 3 個紅黑抖色殘影（透明度 0.55／0.38／0.22），拳頭拖出 6 條速度線；接觸前 0.06 秒衝刺姿勢急切換成直拳', en: 'motion: a 0.37 s dash of ~3.6 units (quick kick-off, then accelerating), 3 red-black dithered afterimages behind (alpha 0.55 / 0.38 / 0.22), 6 streaks trailing from the fist; 0.06 s before contact the dash pose snaps into a straight punch' },
    { k: 'impact', t: [1.15, 1.6], zh: '命中：拳頭接觸點爆出黑色放射星形（12 根實心黑刺，直徑約 2.4，邊緣暗紅發光），7 條暗紅閃電每格換形向外噴射；命中首 2–3 格整個畫面變成黑白反相雙色衝擊格；放射速度線、豎立衝擊環、強烈短促震屏', en: 'impact: a black radial star bursts from the contact point (12 solid black spikes, ~2.4 across, dark-red glowing rim), 7 dark-red bolts re-rolled every frame spray outwards; the first 2–3 frames flip the whole frame to a two-tone negative; radial speed lines, an upright shock ring, a short hard shake' },
    { k: 'after', t: [1.6, 3.6], zh: '餘波：命中點周圍地面出現發紅裂紋，細小紅色電弧沿地面爬行並逐漸稀疏；施法者後躍回原位並回到待機，裂紋於 3.5 秒前淡出', en: 'aftermath: red-glowing cracks around the hit point, small red arcs crawling over the ground and thinning out; the caster leaps back to the start into idle, the cracks fade by 3.5 s' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，位置以緩動曲線由 x=−2.2 衝到目標前，姿勢 待機→架式→衝刺→（0.06 秒）直拳→後躍→待機', en: 'caster: faceless mannequin moved along an eased path from x = −2.2 to the target; poses idle → stance → dash → (0.06 s) punch → back-leap → idle' },
    { zh: '殘影：同一人偶以紅黑色、抖色透明度重畫 3 次，取 0.035 秒間隔前的位置與姿勢', en: 'afterimages: the same mannequin redrawn 3 times in red-black with dithered alpha, at the positions and poses of 0.035 s steps back in time' },
    { zh: '黑色放射星：面向鏡頭的實心卡片，以極座標畫 12 根長短不一的尖刺＋中心圓，0.06 秒內以指數緩動長到全尺寸，0.45 秒內尖刺縮短消失；外緣 1–2 像素暗紅發光', en: 'black radial star: a camera-facing solid card, 12 uneven spikes plus a round core in polar coordinates, reaching full size in 0.06 s (exponential ease), spikes retracting within 0.45 s; a 1–2 px dark-red glowing rim' },
    { zh: '閃電：7 條由接觸點向外的鋸齒閃電（長 1–1.8，各 1 條分支），每格換隨機種子，0.5 秒內縮短變暗', en: 'lightning: 7 jagged bolts from the contact point outwards (1–1.8 long, one branch each), a new random seed every frame, shrinking and dimming over 0.5 s' },
    { zh: '衝擊格：命中凍結的 2–3 格把整個畫面轉為雙色（墨黑／紙白），發光像素轉紅；第二格黑白對調', en: 'impact frame: during the 2–3 hit-stop frames the whole frame turns two-tone (ink / paper), light pixels turn red; the second frame swaps black and white' },
    { zh: '速度線：22 條由命中點向外的放射細線，每格重排；豎立衝擊環 0.4 秒內擴張到半徑 1.6 並變細', en: 'speed lines: 22 radial streaks around the hit point, reshuffled every frame; an upright shock ring expanding to radius 1.6 and thinning over 0.4 s' },
    { zh: '地面：命中點下方 5 向放射裂紋貼花（發紅後冷卻），8 條貼地短電弧隨機閃現，越來越疏', en: 'ground: a 5-way radial crack decal under the hit (red-hot, then cooling), 8 short ground-hugging arcs flickering at random, ever sparser' },
  ],
  params: {
    bolts: { zh: '閃電數量', en: 'bolt count', min: 2, max: 12, step: 1, value: 7 },
    impactSize: { zh: '衝擊星大小', en: 'impact size', min: .6, max: 1.5, step: .05, value: 1 },
    impactFrame: { zh: '反相衝擊格（0／1）', en: 'negative impact frame (0/1)', min: 0, max: 1, step: 1, value: 1 },
    dashDistance: { zh: '衝刺距離', en: 'dash distance', min: 2, max: 4.2, step: .1, value: 3.6 },
  },
  // caster x at time t: start, dash (kick then accelerate), hold, leap back
  pos(p, t, x0, x1) {
    const DASH = .78, HIT = 1.15;
    if (t < DASH) return [x0, 0];
    if (t < HIT) { const u = p.ph(t, DASH, HIT - .03); return [p.lerp(x0, x1, .12 * p.easeOutCubic(Math.min(1, u / .25)) + .88 * p.easeInCubic(u)), 0]; }
    if (t < 1.85) return [x1 - p.drag(1.2, 6, t - HIT), 0];
    const u = p.ph(t, 1.85, 2.5), xh = x1 - p.drag(1.2, 6, 1.85 - HIT);
    return [p.lerp(xh, x0, p.ease(u)), Math.sin(Math.PI * u) * .55];
  },
  pose(p, t) {
    const DASH = .78, HIT = 1.15;
    if (t < .35) return { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .35) };
    if (t < DASH - .1) return { a: 'ready', b: 'charge', k: p.easeOutBack(p.ph(t, .35, .6), 1.4) * .6 };
    if (t < DASH) return { a: 'charge', b: 'dash', k: p.easeInCubic(p.ph(t, DASH - .1, DASH)) };
    if (t < HIT - .06) return 'dash';
    if (t < HIT) return { a: 'dash', b: 'punch', k: p.easeOutCubic((t - HIT + .06) / .06) };
    if (t < 1.85) return 'punch';
    if (t < 2.5) return { a: 'punch', b: 'float', k: p.easeOutCubic(p.ph(t, 1.85, 2.1)) };
    if (t < 2.65) return { a: 'float', b: 'ready', k: p.easeOutCubic(p.ph(t, 2.5, 2.65)) };
    return { a: 'ready', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.65, 3.3)) };
  },
  draw(p, t) {
    const BO = this.palette.bolt, ST = this.palette.star, GH = this.palette.ghost;
    const HX = 2.35, DASH = .78, HIT = 1.15, C = [HX - .3, 0, 1.03], X1 = C[0] - .64;
    const X0 = X1 - p.param('dashDistance'), size = p.param('impactSize'), a = t - HIT, fr = Math.floor(t * 30);
    // ---- target recoils on the hit ----
    const rec = a > 0 ? .16 * Math.exp(-5 * a) * Math.cos(a * 22) * Math.min(1, a * 40) : 0;
    p.dummy(HX + rec, 0);
    // ---- afterimages during the dash (drawn before the caster) ----
    if (t > DASH && t < HIT + .12) {
      for (let k = 3; k >= 1; k--) {
        const tk = t - k * .035;
        if (tk < DASH) continue;
        const pk = this.pos(p, tk, X0, X1), fade = t > HIT ? 1 - p.ph(t, HIT, HIT + .12) : 1;
        p.figure(pk[0], 0, { pose: this.pose(p, tk), color: GH, alpha: (.7 - k * .16) * fade });
      }
    }
    const ps = this.pos(p, t, X0, X1);
    const fig = p.figure(ps[0], 0, { pose: this.pose(p, t), lift: ps[1] });
    // ---- black radial star at the contact point (solid) ----
    const sg = a >= 0 && a < .5 ? p.easeOutExpo(p.ph(a, 0, .06)) * size : 0, shrink = Math.pow(1 - p.ph(a, .12, .5), 1.5);
    const star = (u, v) => {
      const r = Math.hypot(u, v), ang = Math.atan2(v, u) + .2, n = 10, kf = ang / p.TAU * n, k = Math.round(kf);
      const kk = ((k % n) + n) % n, L = (.45 + .55 * p.r(kk, 3)) * shrink + .001, d = Math.abs(kf - k) * p.TAU / n;
      const w = .5 * Math.pow(Math.max(0, 1 - r / L), 1.3), core = .24 * (.4 + .6 * shrink) - r;
      return Math.max((w - d) * r, core);
    };
    if (sg > .02) {
      const W = 2.4 * sg;
      p.scard(C[0] - .05, C[1], C[2], W, W, (u, v) => { const m = star(u, v); return m > 0 ? .1 + .5 * Math.min(1, m * 8) : -1; }, ST, { dz: .3 });
    }
    // ---- charge: tiny arcs around the fist ----
    const ch = p.ph(t, .35, DASH);
    if (ch > 0 && t < DASH + .05) {
      const h = fig.hand;
      for (let k = 0; k < 3; k++) {
        if (p.r(fr + k * 13, 41) > .35 + .5 * ch) continue;
        const d = p.rdir(fr * 3 + k, 42, .2), L = .25 + .3 * ch;
        p.bolt(h, [h[0] + d[0] * L, h[1] + d[1] * L, h[2] + d[2] * L], BO, { seed: fr * 5 + k, jag: .35, depth: 3, w: .03, I: .9, glow: .2 });
      }
      p.charge(h[0], h[1], h[2], ch, { n: 10, R: .9, ramp: BO, seed: 2 });
      p.glow(h[0], h[1], h[2], .12 + .1 * ch, BO, .6 * ch);
    }
    // ---- dash: streaks from the fist ----
    if (t > DASH && t < HIT + .05) {
      const sp = p.ph(t, DASH, HIT), h = fig.hand, nS = 6;
      for (let k = 0; k < nS; k++) {
        const off = [(p.r(k, 7) - .5) * .35, (p.r(k, 8) - .5) * .35], L = (.6 + 1.6 * sp) * (.6 + .4 * p.r(k, 9));
        p.line([h[0] - .05, h[1] + off[0], h[2] + off[1]], [h[0] - L, h[1] + off[0] * 1.6, h[2] + off[1] * 1.6], .05, BO, .9, { w1: .01, i1: .05 });
      }
      p.glow(h[0], h[1], h[2], .2, BO, .7);
    }
    // ---- impact: rim of the star, lightning, speed lines, ring ----
    if (a >= 0 && a < .6) {
      const fl = Math.pow(1 - p.ph(a, 0, .14), 2);
      if (sg > .02) {
        const W = 2.4 * sg * 1.08;
        p.card(C[0] - .05, C[1], C[2], W, W, (u, v) => { const m = star(u / 1.08 * 1.08, v); return m <= 0 && m > -.035 ? 1 : 0; }, BO, .95 * shrink, { });
      }
      const nB = Math.round(p.param('bolts')), bl = 1 - p.ph(a, .05, .5);
      for (let k = 0; k < nB; k++) {
        if (bl <= 0) break;
        const ang = (k + .3 * p.r(k, 21)) / nB * p.TAU, out = [-.25 * Math.abs(Math.cos(ang)) - .1, Math.cos(ang) * .9, Math.sin(ang) * .75];
        const L = (1 + .8 * p.r(k + fr * 7, 22)) * size * (.4 + .6 * p.easeOutExpo(p.ph(a, 0, .08))) * (.5 + .5 * bl);
        p.bolt(C, [C[0] + out[0] * L, C[1] + out[1] * L, Math.max(.05, C[2] + out[2] * L)], BO, { seed: fr * 11 + k * 3, jag: .3, depth: 4, branches: 1, w: .05, I: .9 * (.4 + .6 * bl), glow: .3 });
      }
      if (a < .22) p.speedLines(C[0], C[1], C[2], { n: 16, R0: 1.1 * size, R1: 3.2, ramp: BO, I: .8 * (1 - a / .22), seed: fr, w: .04 });
      p.shock(C[0] - .1, 0, C[2], p.ph(a, .01, .42), { R: 1.6 * size, w: .22, ramp: BO, axis: [1, 0, 0], light: false });
      if (fl > 0) p.glow(C[0] - .2, 0, C[2], .3 + .3 * fl, BO, 1.3 * fl, { pow: 1.4 });
      p.light(C[0], 0, 0, 2.2, BO, Math.max(fl, .5 * bl));
    }
    // ---- aftermath: cracks and crawling ground arcs ----
    if (a > 0) {
      const fade = 1 - p.ph(t, 2.8, 3.45);
      p.aftermath(C[0] + .05, 0, 1.3 * size, 'crack', { amt: fade, ramp: BO, glow: Math.pow(1 - p.ph(a, 0, 1.4), 1.5), seed: 6, n: 5 });
      const nG = Math.round(8 * p.density);
      for (let k = 0; k < nG; k++) {
        const slot = Math.floor((a - .15) * 10 + p.r(k, 31) * 10), on = p.r(slot * 7 + k, 32) < .55 * (1 - p.ph(a, .2, 1.9));
        if (a < .15 || !on) continue;
        const ang = p.r(slot + k * 3, 33) * p.TAU, rr = .3 + p.r(slot + k * 5, 34) * 1.1 * size, gx = C[0] + Math.cos(ang) * rr, gy = Math.sin(ang) * rr;
        const da = ang + (p.r(slot, 35) - .5) * 2, L = .25 + .3 * p.r(k, 36);
        p.bolt([gx, gy, .03], [gx + Math.cos(da) * L, gy + Math.sin(da) * L, .03], BO, { seed: fr * 3 + k, jag: .4, depth: 3, w: .035, I: .9, glow: .2 });
        p.light(gx, gy, 0, .5, BO, .5);
      }
    }
    // ---- two-tone negative impact frame on the hit-stop frames ----
    // (the hit-stop holds the effect clock at HIT + 0.02: the negative covers the freeze, the plain two-tone frame follows)
    if (p.param('impactFrame') >= .5 && a >= 0 && a < .09) p.impactFrame({ ink: '#120709', paper: '#f6eeee', accent: '#e8203c', invert: a <= .021, thr: 80 });
  },
});
