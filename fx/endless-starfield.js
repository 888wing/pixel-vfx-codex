// 無垠星域 / Endless Starfield — Ultimates pack (original design): a hand sign, a blackout, and the whole frame becomes endless space with layered stars and giant turning rings while the target floats frozen
PXFX.define({
  id: 'endless-starfield',
  loop: 4.8,
  beats: [{ t: .92, kind: 'cast', power: 1 }, { t: 1.6, kind: 'hit', power: 1.1 }, { t: 2.3, kind: 'pulse', power: .5 }, { t: 3.0, kind: 'pulse', power: .5 }, { t: 4.05, kind: 'pulse', power: .6 }],
  view: { r: 3.4, h: 2.8 },
  stage: { ground: 'marble', tiles: true },
  modules: ['figure', 'charge', 'domain', 'shockwave', 'aura', 'impact', 'aftermath'],
  palette: {
    ring: ['#3a3f9e', '#5464d8', '#6f8cff', '#a8c0ff', '#e4ecff', '#ffffff'],
    star: ['#5a6ad0', '#8a9cf0', '#c4d0ff', '#ffffff'],
    nebula: ['#3a2e7a', '#5a4cb0', '#8a7ee0', '#c4bcff', '#f0eeff'],
    space: ['#0b0e26', '#121840', '#1a2256', '#232d6c'],
    dust: ['#6e6a78', '#878292', '#a19cab', '#bcb7c4'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者由站姿轉為凝視目標（單手半舉）', en: 'pose: the caster shifts from idle to a fixed gaze at the target, one hand half raised' },
    { k: 'charge', t: [.5, .83], zh: '集氣：手舉到頭頂（ease-out-back），8–16 粒星光沿短光線匯聚到指尖，指尖一點白光', en: 'charge: the hand rises overhead (ease-out-back); 8–16 star motes streak into the fingertip, which holds a white pinpoint' },
    { k: 'shape', t: [.83, 1.2], zh: '成形：出手前整個畫面黑屏 0.085 秒（1–2 幀），之後以施法者為圓心 0.25 秒抖色擦除成宇宙：深藍漸層天空＋星雲＋閃爍星點，地面變深海軍藍，地上一個旋轉螺旋星系貼花；3 個巨大光環 ease-out-back 張開', en: 'shape: a 0.085 s (1–2 frame) blackout over the whole frame right before the release, then a 0.25 s dithered wipe from the caster turns it into space: a deep blue gradient sky with nebulae and twinkling stars, a deep navy ground with a slowly turning spiral-galaxy decal; 3 giant rings open with ease-out-back' },
    { k: 'motion', t: [1.05, 3.6], zh: '推進：目標 0.55 秒內浮起 0.45 後完全定住，旁邊一顆淡藍小星；3 層星點（遠小暗、中、近大帶四角星）分佈在 12×12×6 的空間裡（3D 鏡頭有視差）各自閃爍；光環沿傾斜軸緩慢旋轉，亮段（粗）沿環繞行、暗段變細', en: 'motion: the target floats up 0.45 in 0.55 s and hangs frozen with a small pale-blue star beside it; 3 layers of stars (far small dim, mid, near large with four-point glints) fill a 12×12×6 volume (parallax in the 3D camera) and twinkle; the rings turn slowly about tilted axes, a thick bright section travelling round each and thinning towards the dim side' },
    { k: 'impact', t: [1.6, 3.2], zh: '命中：目標定住時（1.6 秒）與 2.3、3.0 秒各有一次縱深扭曲脈衝：以目標為圓心的空間扭曲圓環向外擴散（像素沿半徑錯位），同步一圈淡藍光環', en: 'impact: when the target locks (1.6 s) and again at 2.3 and 3.0 s a depth-distortion pulse spreads from the target: a ring that shifts pixels along the radius, with a matching faint blue ring of light' },
    { k: 'after', t: [3.6, 4.8], zh: '餘波：宇宙由外向施法者 0.5 秒退回原狀，光環收細消失；目標 0.2 秒內加速下墜落地，揚起 6 團塵土；施法者放下手回到待機', en: 'aftermath: space wipes back towards the caster in 0.5 s and the rings thin away; the target drops in 0.2 s (accelerating) and lands in 6 dust puffs; the caster lowers the hand and returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，待機→凝視→舉手（結手勢）→待機；領域內身體換成較淺的星光藍灰，才能在宇宙背景上看清', en: 'caster: faceless mannequin, idle → gaze → hand raised (the sign) → idle; inside the domain the body switches to a paler starlit blue-grey so it reads against space' },
    { zh: '黑屏：整個畫面直接填黑 0.08 秒，作為轉場', en: 'blackout: the whole frame is filled black for 0.08 s as the cut' },
    { zh: '領域：天空換成宇宙預設（4 階深藍漸層、紫藍星雲、螢幕空間閃爍星點），地面映射到 4 階深海軍藍', en: 'domain: the sky becomes the cosmos preset (4-band deep blue gradient, violet-blue nebulae, screen-space twinkling stars) and the ground is remapped to 4 deep navy tones' },
    { zh: '星點：70 粒世界座標星點分 3 層（遠 1 像素暗、中 1 像素亮、近 2 像素＋四角星），各自以銳利脈衝閃爍；位於地面以下的被地面遮住，島外露出無底星空', en: 'stars: 70 world-space stars in 3 layers (far 1 px dim, mid 1 px bright, near 2 px with four-point glints), each twinkling with a sharp pulse; those below the ground are hidden by it, so open space shows past the island edge' },
    { zh: '光環：3 個半徑 2.2–3.4 的巨大光環，軸傾斜 0.5–1.1 弧度並緩慢進動；每環 72 段線段，寬度與亮度隨角度變化（亮段粗、暗段細），亮段沿環繞行', en: 'rings: 3 giant rings (radius 2.2–3.4) on axes tilted 0.5–1.1 rad that precess slowly; each is 72 segments whose width and brightness follow the angle (bright = thick, dim = thin) with the bright section travelling round' },
    { zh: '螺旋星系：地面半徑 2.6 的雙臂螺旋貼花，臂寬隨半徑變細，緩慢旋轉', en: 'galaxy: a two-armed spiral decal (radius 2.6) on the ground, arms thinning outwards, turning slowly' },
    { zh: '目標：稻草人整體抬高 0.45 懸空定住（影子留在地上），旁邊一顆淡藍小星；脈衝時以目標為圓心做扭曲圓環', en: 'target: the straw dummy is lifted 0.45 and frozen in the air (its shadow stays on the ground) with a small pale-blue star beside it; the warp rings centre on it' },
  ],
  params: {
    rings: { zh: '光環數量', en: 'ring count', min: 1, max: 4, step: 1, value: 3 },
    stars: { zh: '星點密度', en: 'star density', min: .3, max: 2, step: .1, value: 1 },
    warp: { zh: '扭曲強度', en: 'warp strength', min: 0, max: 1, step: .05, value: .6 },
    floatHeight: { zh: '懸浮高度', en: 'float height', min: .15, max: .8, step: .05, value: .45 },
  },
  STARLIT: ['#3c4270', '#525a90', '#6d76ad', '#8e97c8', '#b4bce0'],
  SKY: { top: '#04040f', bottom: '#110c30', nebula: '#2a1f62', neb2: '#13306a', stars: .03, star: '#ffffff' },
  // the training dummy with a hover height (p.dummy always stands on the ground)
  dummyAt(p, x, y, lift) {
    if (!p.props) return;
    const v = p.v, hue = v.hue, wood = p.solidRamp('#9a6e48'), straw = p.solidRamp('#d8b66a'), z = lift;
    v.hue = 0;
    p.capsule([x, y, z], [x, y, z + 1.05], .08, .08, wood);
    p.capsule([x, y, z + .55], [x, y, z + 1.15], .3, .26, straw);
    p.capsule([x - .45, y, z + .95], [x + .45, y, z + .95], .07, .07, wood, { shadow: false });
    p.ball(x, y, z + 1.48, .22, straw);
    v.hue = hue;
  },
  // ring of light whose width and intensity follow the angle: f(a) in 0..1 picks between thin/dim and thick/bright
  ringVar(p, c, R, axis, f, w0, w1, ramp, I) {
    const n = p.v3.norm(axis), e1 = p.v3.norm(Math.abs(n[2]) > .9 ? p.v3.cross(n, [1, 0, 0]) : p.v3.cross(n, [0, 0, 1])), e2 = p.v3.cross(n, e1), S = 72;
    let prev = null, pf = 0;
    for (let k = 0; k <= S; k++) {
      const a = k / S * p.TAU, ca = Math.cos(a) * R, sa = Math.sin(a) * R, ff = f(a);
      const pt = [c[0] + e1[0] * ca + e2[0] * sa, c[1] + e1[1] * ca + e2[1] * sa, c[2] + e1[2] * ca + e2[2] * sa];
      if (prev && (ff > .02 || pf > .02)) p.line(prev, pt, w0 + (w1 - w0) * pf, ramp, I * pf, { w1: w0 + (w1 - w0) * ff, i1: I * ff });
      prev = pt; pf = ff;
    }
  },
  draw(p, t) {
    const P = this.palette, RG = P.ring, ST = P.star, NB = P.nebula, TAU = p.TAU;
    const X0 = -2, HX = 2.35, CAST = .92, LOCK = 1.6, DROP = 3.85, LAND = 4.05, OUT = 3.55;
    // ---- caster: gaze, then the hand goes up as the sign ----
    let pose;
    if (t < .5) pose = { a: 'idle', b: 'gaze', k: p.easeOutCubic(t / .5) };
    else if (t < CAST) pose = { a: 'gaze', b: 'raise', k: p.easeOutBack(p.ph(t, .5, .88), 1.4) };
    else if (t < OUT) pose = 'raise';
    else pose = { a: 'raise', b: 'idle', k: p.easeOutCubic(p.ph(t, OUT, 4.4)) };
    // inside the domain the caster is starlit (a paler body) so it reads against space
    const lit = t >= CAST && t < OUT + .3;
    const fig = p.figure(X0, 0, { pose, color: lit ? this.STARLIT : undefined });
    // ---- target: floats up, hangs frozen, drops ----
    const H = p.param('floatHeight');
    const lift = t < DROP ? H * p.easeOutCubic(p.ph(t, 1.05, LOCK)) : H * (1 - p.easeInCubic(p.ph(t, DROP, LAND)));
    this.dummyAt(p, HX, 0, lift);
    const la = t - LAND;
    if (la >= 0 && la < .8) for (let k = 0; k < Math.round(6 * p.density); k++) {
      const ang = k / 6 * TAU + .4, d = .3 + p.drag(1.2, 4, la), u = la / .8;
      p.ball(HX + Math.cos(ang) * d, Math.sin(ang) * d * .8, .08 + u * .25, .12 + .12 * p.easeOutCubic(u), P.dust, { alpha: (1 - u) * .8, rough: .5, shadow: false, seed: k });
    }

    // ---- space: fast wipe out of the blackout, back out at the end ----
    const amt = t < OUT ? p.easeOutExpo(p.ph(t, CAST, CAST + .26)) : 1 - p.easeInCubic(p.ph(t, OUT, OUT + .5));
    if (amt > 0) p.domain({ amt, c: [X0, 0, 1], sky: this.SKY, ground: P.space, t });
    const on = amt;   // everything celestial follows the wipe

    // ---- charge at the raised hand ----
    if (t > .5 && t < CAST + .05) {
      const u = p.ph(t, .5, CAST);
      p.charge(fig.hand[0], fig.hand[1], fig.hand[2], u, { n: 12, R: 1.1, ramp: ST, I: .9, len: .18 });
      p.glow(fig.hand[0], fig.hand[1], fig.hand[2], .08 + .1 * u, ST, .6 + .6 * u);
    }
    if (on > 0) {
      // galaxy on the ground: two arms, thinning outwards, turning slowly
      const rot = t * .35;
      p.decal(.2, 0, 0, 2.6, (x, y, rho, ang) => {
        if (rho < .15) return .9;
        const arm = ((ang - Math.log(rho + .2) * 2.6 - rot) / Math.PI % 1 + 1) % 1, w = .13 * (1 - rho / 2.8) + .02;
        const v = Math.min(arm, 1 - arm);
        return v < w ? (1 - rho / 2.6) * (.55 + .45 * (1 - v / w)) * (p.noise(x * 4, y * 4) > .3 ? 1 : .4) : 0;
      }, NB, .6 * on);
      // stars in a big volume: far / mid / near layers, each with its own sharp twinkle
      const nS = Math.round(70 * p.param('stars') * p.density);
      for (let k = 0; k < nS; k++) {
        const x = (p.r(k, 1) - .5) * 12, y = (p.r(k, 2) - .5) * 12, z = -2 + p.r(k, 3) * 6, layer = k % 3;
        const born = CAST + .1 + p.r(k, 4) * .5;
        if (t < born) continue;
        const tw = Math.pow(.5 + .5 * Math.sin(t * (2 + p.r(k, 5) * 4) + p.r(k, 6) * TAU), 3);
        const I = Math.min(1, (t - born) * 6) * on * (layer === 0 ? .45 + .3 * tw : .65 + .45 * tw);
        if (layer === 2 && tw > .55) p.sparkle(x, y, z, 2, ST, I);
        else p.dot(x, y, z, ST, I, layer === 2 ? 2 : 1);
      }
      // giant rings on tilted, slowly precessing axes; a thick bright section travels round each
      const nR = Math.round(p.param('rings')), open = p.easeOutBack(p.ph(t, CAST + .1, CAST + .55), 1.3);
      const fade = t < OUT ? 1 : 1 - p.ph(t, OUT, OUT + .4);
      for (let k = 0; k < nR; k++) {
        const R = (2.2 + k * .6) * open * (t < OUT ? 1 : 1 + .2 * p.ph(t, OUT, OUT + .4)), tilt = .5 + k * .2 + p.r(k, 11) * .2, prec = t * (.18 + .05 * k) * (k % 2 ? -1 : 1) + k * 2.1;
        const axis = [Math.sin(tilt) * Math.cos(prec), Math.sin(tilt) * Math.sin(prec), Math.cos(tilt)], ph = t * (.9 - .15 * k) * (k % 2 ? 1 : -1) + k * 1.7;
        if (R > .05) this.ringVar(p, [.3, 0, 1.25], R, axis, a => .12 + .88 * Math.pow(.5 + .5 * Math.cos(a - ph), 4), .012, .08, RG, .8 * fade * on);
      }
    }
    // ---- depth pulses: a ring of displaced pixels spreads from the target (resolves everything drawn so far) ----
    const cz = 1.0 + lift, ws = p.param('warp');
    for (const [tb, pw] of [[LOCK, 1], [2.3, .7], [3.0, .7]]) {
      const u = p.ph(t, tb, tb + .75);
      if (u <= 0 || u >= 1 || on <= 0) continue;
      const rr = .1 + .9 * p.easeOutCubic(u), amp = .09 * ws * pw * Math.pow(1 - u, 1.5);
      if (amp > .002) p.warp(HX, 0, cz, 2.8, (dx, dy, rho) => {
        const d = rho - rr;
        if (Math.abs(d) > .14) return null;
        const s = Math.sin(d / .14 * Math.PI) * amp;
        return [dx / (rho + .01) * s, dy / (rho + .01) * s];
      });
      p.ring(HX, 0, cz, rr * 2.8 * .92, .05 * (1 - u) + .015, RG, .8 * pw * (1 - u) * on, { axis: p.cam().fwd });
    }
    // ---- the frozen target: a small pale star beside it, a flash when it locks ----
    if (on > 0 && lift > .02) {
      const s = p.ph(t, 1.2, LOCK);
      p.glow(HX - .5, .35, 1.35 + lift, .22 * s, ST, .9 * s * on);
      p.sparkle(HX - .5, .35, 1.35 + lift, 2, ST, s * on);
      p.ring(HX, 0, .5 + lift, .55, .03, RG, .5 * s * on, { fn: a => .4 + .6 * Math.pow(.5 + .5 * Math.cos(a - t * 2), 3) });
      const lk = 1 - p.ph(t, LOCK, LOCK + .2);
      if (t >= LOCK && lk > 0) p.glow(HX, 0, cz, .4 + .7 * lk, RG, 1.3 * lk * lk, { pow: 1.4 });
    }
    // ---- blackout: 1-2 frames over everything ----
    if (t >= CAST - .085 && t < CAST) p.flash('#000000', 1);
  },
});
