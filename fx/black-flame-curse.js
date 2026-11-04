// 黑焰咒燒 / Black Flame Curse — Ultimates pack (original design): a stare ignites opaque black flames with magenta rims all over the target, spreading into a burning zone on the ground
PXFX.define({
  id: 'black-flame-curse',
  loop: 4.6,
  beats: [
    { t: .62, kind: 'cast', power: .6 }, { t: .72, kind: 'burst', power: 1.1 }, { t: 1.75, kind: 'pulse', power: .5 },
    { t: 2.3, kind: 'pulse', power: .5 }, { t: 2.85, kind: 'pulse', power: .5 },
  ],
  view: { r: 3.4, h: 2.8 },
  stage: { ground: 'stone', tiles: true },
  modules: ['figure', 'aura', 'grade', 'aftermath', 'shockwave'],
  palette: {
    body: ['#0a0610', '#140a1a', '#1e1026', '#2a1634'],
    edge: ['#6a1450', '#a0206e', '#d03a8a', '#ff6ab0', '#ffc6e2'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由待機轉為凝視姿勢，抬手遮在臉側，盯住目標', en: 'pose: the caster shifts from idle into the gaze pose, a hand raised beside the face, staring at the target' },
    { k: 'charge', t: [.35, .72], zh: '集氣：場景壓暗 25%、去飽和；0.62 秒時眼部一點紫紅星芒閃亮（2 格）', en: 'charge: the scene darkens 25% and desaturates; at 0.62 s a tiny magenta sparkle flashes at the eyes (2 frames)' },
    { k: 'shape', t: [.72, 1.0], zh: '成形：目標表面突然冒出 6 團不透明黑色火焰（高 0.6–1.4，按身體、頭、手臂分佈，前後交錯），以回彈緩動在 0.25 秒內長出，間隔 0.05 秒由身體中心向外蔓延；邊緣 1–2 像素紫紅發光；燃起瞬間紫紅閃光＋目標周圍一圈紫紅衝擊環', en: 'shape: 6 opaque black flames (0.6–1.4 tall, on the body, head and arm ends, alternating in front and behind) burst from the target, growing in 0.25 s with an overshoot and spreading outwards 0.05 s apart, with 1–2 px glowing magenta rims; a magenta flash and a magenta shock ring at ignition' },
    { k: 'motion', t: [1.0, 1.8], zh: '推進：火焰持續向上扭動；黑火沿地面蔓延：一圈 14 團小黑火（高 0.35–0.55）以 easeOutCubic 向外推進到半徑 1.2，暗紫焦痕隨之擴大', en: 'motion: the flames keep writhing upwards; the black fire spreads over the ground — a ring of 14 small black flames (0.35–0.55 tall) marches out to radius 1.2 with easeOutCubic and a dark purple scorch grows with it' },
    { k: 'impact', t: [1.8, 3.4], zh: '持續傷害：燃燒區成形，紫紅地環每 0.55 秒脈動一次（急升慢降並向外放出一圈細環），黑色火屑向上飄', en: 'damage over time: the burning zone is set; the magenta ground ring pulses every 0.55 s (sharp attack, slow decay, shedding a thin outer ring) and black embers rise' },
    { k: 'after', t: [3.4, 4.6], zh: '餘波：火焰逐團以 easeInCubic 縮小熄滅，地環與焦痕淡出，環境恢復亮度，施法者回到待機', en: 'aftermath: the flames shrink out one by one with easeInCubic, the ground ring and scorch fade, the scene brightens again and the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→凝視→待機；眼部 0.1 單位前方畫星芒', en: 'caster: faceless mannequin, poses idle → gaze → idle; a sparkle 0.1 in front of the eyes' },
    { zh: '黑焰：面向鏡頭的實心卡片，輪廓 = 由下往上收窄的火焰形狀＋向上捲動的雙層噪聲火舌；內部 4 階近黑紫實色，外圈一條紫紅發光邊（不可用加法混色畫黑色）', en: 'black flame: a camera-facing SOLID card whose outline is a flame tapering upwards with two layers of noise tongues scrolling up; the inside is 4 near-black violet solid tones, the outside a glowing magenta rim (never draw black additively)' },
    { zh: '附著：火焰錨點分佈在目標的身體、頭、雙臂末端與底座，前排向鏡頭偏移 0.3、後排向後偏移 0.3，令火焰包住目標輪廓', en: 'attachment: flame anchors on the target body, head, arm ends and base; the front row is nudged 0.3 towards the camera and the back row 0.3 away, so the flames wrap its silhouette' },
    { zh: '燃燒區：地面暗紫焦痕（帶噪聲邊緣）＋一圈小黑火（高 0.35–0.55）＋紫紅地環（脈衝：急升慢降）', en: 'burning zone: a dark purple scorch with a noisy edge, a ring of small black flames (0.35–0.55 tall) and a magenta ground ring that pulses with a sharp attack and slow decay' },
    { zh: '黑火屑：24 粒 1–2 像素實心暗點，正弦擺動向上飄，約 1/4 帶一點紫紅光', en: 'black embers: 24 solid dark flecks of 1–2 px drifting upwards with a sine sway, about a quarter with a magenta glint' },
    { zh: '環境：先畫場景與焦痕，再壓暗去飽和，最後畫黑焰與光，令招式保持高對比', en: 'grade: draw the scene and the scorch, then darken and desaturate, then draw the black flames and the light so the move keeps its contrast' },
  ],
  params: {
    flames: { zh: '火焰數量', en: 'flame count', min: 3, max: 9, step: 1, value: 6 },
    flameHeight: { zh: '火焰高度', en: 'flame height', min: .6, max: 1.6, step: .05, value: 1 },
    zoneRadius: { zh: '燃燒區半徑', en: 'zone radius', min: .8, max: 1.6, step: .05, value: 1.2 },
  },
  DX: 2.0,
  // flame anchors on the target: [dx, dy, z0, w, h, side (+1 front / -1 back), birth delay]
  ANCH: [
    [-.05, 0, .4, .55, 1.05, 1, 0], [.05, 0, .55, .6, 1.4, -1, .03], [0, 0, 1.25, .42, .8, 1, .08], [-.42, 0, .82, .32, .62, 1, .12],
    [.42, 0, .82, .32, .62, -1, .14], [0, 0, 0, .62, .75, 1, .18], [.22, 0, .25, .38, .7, -1, .2], [-.25, 0, .15, .4, .65, 1, .22], [0, 0, .95, .5, .9, -1, .1],
  ],
  draw(p, t) {
    const BD = this.palette.body, ED = this.palette.edge, DX = this.DX, BURST = .72, DIE = 3.4;
    const nF = Math.round(p.param('flames')), FH = p.param('flameHeight'), ZR = p.param('zoneRadius');
    const cam = p.cam(), F = cam.fwd, ISL = 3.0;
    p.dummy(DX, 0);
    // ---- caster ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'gaze', k: p.easeOutCubic(p.ph(t, .05, .35)) };
    else if (t < DIE) pose = 'gaze';
    else pose = { a: 'gaze', b: 'idle', k: p.easeOutCubic(p.ph(t, DIE, 4.0)) };
    const fig = p.figure(-2.1, 0, { pose });
    // ---- burning zone on the ground (before the grade so it darkens with the scene) ----
    const spread = p.easeOutCubic(p.ph(t, 1.0, 1.8)), zr = (.35 + (ZR - .35) * spread) * (1 - .3 * p.ph(t, 3.6, 4.2));
    const zone = (t > .9 ? 1 : 0) * (1 - p.ph(t, 3.6, 4.2));
    if (zone > 0) p.stain(DX, 0, zr + .15, (dx, dy, rho, ang) => (rho < zr * (.85 + .25 * p.noise(ang * 2 + 3, t * .5)) ? 1.25 - .5 * rho / zr : 0), '#24121e', zone);
    // ---- grade: darken while the curse burns ----
    const dark = .25 * p.env(t, .35, .7, 3.5, 4.3);
    p.grade({ dark, desat: dark * 1.2 });
    // ---- eye flash ----
    const ef = t >= .62 && t < .72 ? 1 - (t - .62) / .1 : 0;
    if (ef > 0) {
      const e = [fig.head[0] + fig.f[0] * .11 + F[0] * .05, fig.head[1] + fig.f[1] * .11 + F[1] * .05, fig.head[2] + .02];
      p.sparkle(e[0], e[1], e[2], Math.round(2 + 4 * ef), ED, 1.4);
      p.glow(e[0], e[1], e[2], .12, ED, .8 * ef);
    }
    // ---- flames on the target ----
    const flameT = t * 1.15;
    for (let k = 0; k < nF; k++) {
      const A = this.ANCH[k], born = BURST + A[6], die = DIE + .07 * k;
      const g = p.easeOutBack(p.ph(t, born, born + .25), 1.8) * (1 - p.easeInCubic(p.ph(t, die, die + .38)));
      if (g <= .02) continue;
      const sway = Math.sin(t * 3 + k) * .03, off = A[5] * .3;
      const x = DX + A[0] + F[0] * off + sway, y = A[1] + F[1] * off, h = A[4] * FH * g;
      p.blackFlame(x, y, A[2] - .04, { w: A[3] * 1.3 * (.5 + .5 * g), h, t: flameT + k * .37, seed: k * 3 + 1, body: BD, edge: ED, I: 1.3, rim: .22, tongues: 1.7 });
    }
    // ---- ring of small black flames marching outwards ----
    const nr = Math.round((10 + 4 * ZR) * Math.min(1.5, p.density));
    if (zone > 0 && t > 1.0) for (let k = 0; k < nr; k++) {
      const ang = k / nr * p.TAU + p.r(k, 1) * .3, rr = zr * (.88 + .18 * p.r(k, 2));
      const x = DX + Math.cos(ang) * rr, y = Math.sin(ang) * rr;
      if (Math.hypot(x, y) > ISL) continue;
      const born = 1.0 + .5 * p.r(k, 3), g = p.easeOutBack(p.ph(t, born, born + .2), 2) * (1 - p.easeInCubic(p.ph(t, 3.3 + .4 * p.r(k, 4), 3.75 + .4 * p.r(k, 4))));
      if (g <= .03) continue;
      p.blackFlame(x, y, -.02, { w: .3 * (.6 + .4 * g), h: (.35 + .2 * p.r(k, 5)) * FH * g, t: flameT + k * .21, seed: 40 + k, body: BD, edge: ED, I: 1.05, rim: .2 });
    }
    // ---- zone ring: pulses with a sharp attack and slow decay ----
    if (zone > 0 && t > 1.3) {
      const ph = ((t - 1.75) / .55 % 1 + 1) % 1, pulse = t < 1.75 ? p.ph(t, 1.3, 1.75) * .5 : Math.pow(1 - ph, 3);
      const I = (.55 + .6 * pulse) * zone * p.ph(t, 1.3, 1.6);
      const onIsl = ang => (Math.hypot(DX + Math.cos(ang) * zr, Math.sin(ang) * zr) < ISL ? 1 : 0);
      p.ring(DX, 0, .02, zr + .08, .07 + .05 * pulse, ED, I, { fn: onIsl });
      if (pulse > .05 && t > 1.75) p.ring(DX, 0, .02, zr + .08 + .35 * (1 - Math.pow(1 - ph, 2)), .05, ED, .7 * pulse * zone, { fn: ang => (Math.hypot(DX + Math.cos(ang) * (zr + .4), Math.sin(ang) * (zr + .4)) < ISL ? 1 : 0) });
      p.light(DX, 0, 0, zr + .6, ED, (.35 + .3 * pulse) * zone);
    }
    // ---- ignition flash + shock ring ----
    const a = t - BURST;
    if (a >= 0 && a < .5) {
      const fl = Math.pow(1 - p.ph(a, 0, .14), 2);
      if (fl > 0) { p.glow(DX + F[0] * .45, F[1] * .45, .75, .2 + .3 * fl, ED, 1.2 * fl, { pow: 1.4 }); p.sparkle(DX + F[0] * .5, F[1] * .5, .75, Math.round(7 * fl), ED, 1.3 * fl); }
      p.shock(DX, 0, .03, p.ph(a, 0, .45), { R: 1.6, w: .22, ramp: ED });
    }
    // ---- black embers rising ----
    const ne = Math.round(24 * p.density), ew = p.env(t, .8, 1.1, 3.5, 4.1);
    if (ew > 0) for (let k = 0; k < ne; k++) {
      const ph = (t * (.45 + .3 * p.r(k, 11)) + p.r(k, 12)) % 1, ang = p.r(k, 13) * p.TAU, rr = .15 + zr * .8 * p.r(k, 14);
      const x = DX + Math.cos(ang) * rr + Math.sin(ph * 7 + k) * .1, y = Math.sin(ang) * rr, z = .2 + ph * (1.6 + .8 * FH);
      if (Math.sin(Math.PI * ph) * ew < .25) continue;
      const sz = p.r(k, 15) > .6 ? .045 : .03;
      p.scard(x, y, z, sz, sz, () => .2, BD, { dz: .02, alpha: .99 });
      if (k % 4 === 0) p.dot(x, y, z - .04, ED, .9 * ew * Math.sin(Math.PI * ph), 1);
    }
  },
});
