// 金光聖鎧 / Golden Aura Armor — Ultimates pack (original design): golden light seeps out of the caster, a gold shell forms, energy armour locks on piece by piece, then a dash leaves golden afterimages
PXFX.define({
  id: 'golden-aura-armor',
  loop: 5,
  beats: [
    { t: 1.0, kind: 'cast', power: .7 }, { t: 1.5, kind: 'pulse', power: .5 }, { t: 1.7, kind: 'pulse', power: .55 },
    { t: 1.9, kind: 'pulse', power: .6 }, { t: 2.1, kind: 'pulse', power: .8 }, { t: 2.75, kind: 'cast', power: .8 },
  ],
  view: { r: 2.6, h: 2.6 },
  stage: { ground: 'ash', tiles: true },
  modules: ['figure', 'aura', 'shockwave'],
  palette: {
    gold: ['#c47a1e', '#eaa834', '#ffcf4a', '#ffe9a0', '#fffbe6'],
    ghost: ['#c88a2a', '#e8ae3e', '#ffd25e', '#ffea9c', '#fff8d8'],
    plate: ['#6a4210', '#9a6a1c', '#c8962e', '#ecc456', '#fff0a0'],
  },
  timeline: [
    { k: 'pose', t: [0, .7], zh: '起手：施法者站在場中偏左（x = −0.4），由待機下蹲握拳轉為集氣姿勢', en: 'pose: the caster stands just left of centre (x = −0.4) and crouches from idle into a clenched charge pose' },
    { k: 'charge', t: [.5, 1.4], zh: '集氣：金色光點由身體表面向外滲出，火焰形金色氣場由腳下升起（高 1.8），地面受金光照亮', en: 'charge: gold motes seep outwards from the body surface and a flame-shaped gold aura rises from the feet (1.8 high), lighting the ground' },
    { k: 'shape', t: [1.0, 2.4], zh: '成形：半徑 0.95 的半透明金色護殼以回彈緩動出現，施法者張開雙臂；能量鎧甲逐件鎖上（每件間隔 0.2 秒、回彈縮放＋星芒＋脈衝）：雙肩甲 → 胸甲 → 前臂護手 → 頭冠；同時腳下每 0.5 秒一圈金色脈衝環擴散到半徑 1.4，6 條垂直光線向上流動，金粉飄浮閃爍', en: 'shape: a translucent gold shell (radius 0.95) pops in with an overshoot and the caster spreads the arms; the energy armour locks on piece by piece, 0.2 s apart (overshoot scale + sparkle + pulse): shoulder plates → chest plate → forearm gauntlets → helmet crest; meanwhile a gold pulse ring spreads from the feet to radius 1.4 every 0.5 s, 6 vertical light streaks stream upwards and gold dust floats and twinkles' },
    { k: 'motion', t: [2.4, 3.0], zh: '推進：護殼淡去，施法者起身備戰，0.17 秒衝刺到 x = 1.5 並帶回彈急停，沿途留下 4 個金色半透明殘影與地面光痕', en: 'motion: the shell fades, the caster rises into a stance and dashes to x = 1.5 in 0.17 s with an overshooting skid, leaving 4 translucent gold afterimages and a light streak on the ground' },
    { k: 'impact', t: [3.0, 3.6], zh: '回身：急停後轉身，再以 0.17 秒衝回原位，第二組 4 個殘影在 0.42 秒內淡出', en: 'return: after the skid the caster turns and dashes back in 0.17 s; the second set of 4 afterimages fades within 0.42 s' },
    { k: 'after', t: [3.6, 5], zh: '餘波：鎧甲由頭冠開始逐件縮小溶解成光點，氣場收回，施法者回到待機，畫面清空', en: 'aftermath: the armour dissolves piece by piece from the crest down into motes, the aura sinks back and the caster returns to idle on an empty scene' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→集氣→張開雙臂（鎧甲成形）→備戰→衝刺→備戰→待機；衝刺位置用 easeOutCubic，急停帶回彈', en: 'caster: faceless mannequin, poses idle → charge → arms spread (armour forms) → stance → dash → stance → idle; dash positions use easeOutCubic with an overshoot on the stop' },
    { zh: '氣場：面向鏡頭的火焰形金光卡片（噪聲火舌向上捲動）＋ 10 條向上流的短光線，地面金色光池', en: 'aura: a camera-facing flame-shaped gold light card (noise tongues scrolling upwards) plus 10 rising short streaks and a gold light pool on the ground' },
    { zh: '鎧甲：實心金色板塊加發光外框，錨定在人偶回傳的關節（胸口、頭、雙手、肘），向鏡頭偏移 0.16；板身上亮下暗帶一道斜向高光，外框最亮：肩甲半圓、胸甲盾形帶中脊、護手為前臂粗光線＋腕環、頭冠為三支向上的光刺', en: 'armour: solid gold plates with an emissive rim, anchored to the joints the mannequin returns (chest, head, hands, elbow), nudged 0.16 towards the camera; the body is lighter at the top with a diagonal sheen, the outline brightest: half-round shoulder plates, a shield-shaped chest plate with a ridge, gauntlets as thick forearm light with a wrist ring, a crest of three upward spikes' },
    { zh: '護殼：球面只畫菲涅耳亮邊（rim^3），隨呼吸脈動', en: 'shell: a sphere drawing only its fresnel rim (rim^3), breathing with a pulse' },
    { zh: '脈衝環與光線：每 0.5 秒一圈地面金環（easeOutCubic 擴張、越大越暗），身旁 6 條垂直光柱上流', en: 'rings and streaks: a gold ground ring every 0.5 s (easeOutCubic, dimming as it grows) and 6 vertical light columns streaming up beside the body' },
    { zh: '金粉：18 粒單像素金點緩慢上飄、左右擺動、輪流閃爍', en: 'gold dust: 18 single-pixel gold motes drifting slowly upwards, swaying and twinkling in turn' },
    { zh: '殘影：每次衝刺沿路徑等距留下 4 個金色抖色半透明人偶快照（衝刺姿勢、透明度 0.9 起），0.42 秒內淡出', en: 'afterimages: each dash leaves 4 evenly spaced snapshots along its path as dithered translucent gold mannequins (dash pose, alpha from 0.9), fading within 0.42 s' },
  ],
  params: {
    auraHeight: { zh: '氣場高度', en: 'aura height', min: 1.2, max: 2.4, step: .1, value: 1.8 },
    dust: { zh: '金粉數量', en: 'dust count', min: 0, max: 40, step: 1, value: 18 },
    afterimages: { zh: '殘影數量', en: 'afterimage count', min: 0, max: 6, step: 1, value: 4 },
  },
  X0: -.4,
  X1: 1.5,
  // caster x position and facing over time (dash out, skid, turn, dash back)
  path(p, t) {
    const X0 = this.X0, X1 = this.X1;
    let x = X0;
    if (t >= 2.75 && t < 3.15) x = p.lerp(X0, X1, p.easeOutBack(p.ph(t, 2.75, 2.92), 1.2));
    else if (t >= 3.15) x = p.lerp(X1, X0, p.easeOutBack(p.ph(t, 3.15, 3.32), 1.2));
    const face = Math.PI * (p.ease(p.ph(t, 2.95, 3.1)) - p.ease(p.ph(t, 3.36, 3.56)));
    return { x, face };
  },
  poseAt(p, t) {
    if (t < .3) return 'idle';
    if (t < .7) return { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .3, .7)) };
    if (t < 1.3) return 'charge';
    if (t < 1.55) return { a: 'charge', b: 'spread', k: p.easeOutBack(p.ph(t, 1.3, 1.55), 1.4) };
    if (t < 2.25) return 'spread';
    if (t < 2.55) return { a: 'spread', b: 'ready', k: p.easeOutBack(p.ph(t, 2.25, 2.55), 1.4) };
    if (t < 2.75) return 'ready';
    if (t < 2.92) return { a: 'ready', b: 'dash', k: p.easeOutCubic(p.ph(t, 2.75, 2.8)) };
    if (t < 3.15) return { a: 'dash', b: 'ready', k: p.easeOutCubic(p.ph(t, 2.92, 3.05)) };
    if (t < 3.32) return { a: 'ready', b: 'dash', k: p.easeOutCubic(p.ph(t, 3.15, 3.2)) };
    if (t < 3.7) return { a: 'dash', b: 'ready', k: p.easeOutCubic(p.ph(t, 3.32, 3.45)) };
    return { a: 'ready', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.7, 4.5)) };
  },
  // armour plate facing the camera: solid gold body (occludes the aura behind it) + emissive rim and sheen.
  // shape(u, v) -> signed margin (> 0 inside)
  plate(p, c, w, h, shape, I) {
    const G = this.palette.gold, PL = this.palette.plate, rim = .2;
    p.scard(c[0], c[1], c[2], w, h, (u, v) => { const m = shape(u, v); return m > 0 ? .3 + .45 * (v + 1) / 2 + (Math.abs(u + v * .5) < .12 ? .25 : 0) : -1; }, PL, { dz: .05 });
    p.card(c[0], c[1], c[2], w * 1.08, h * 1.08, (u, v) => {
      const m = shape(u / 1.08 * 1.0, v / 1.08);
      return m > -.06 && m < rim ? 1 : 0;
    }, G, I);
  },
  draw(p, t) {
    const G = this.palette.gold, GH = this.palette.ghost;
    const pth = this.path(p, t), X = pth.x, cam = p.cam(), F = cam.fwd;
    const AH = p.param('auraHeight');
    // ---- afterimages: snapshots left along each dash, fading over 0.4 s ----
    const na = Math.round(p.param('afterimages'));
    for (const [t0, t1] of [[2.75, 2.92], [3.15, 3.32]]) for (let i = 0; i < na; i++) {
      // snapshot where the dash has covered an even share of the distance (invert the ease by bisection)
      const goal = (i + .5) / na * .9;
      let lo = 0, hi = .6;
      for (let it = 0; it < 14; it++) { const m = (lo + hi) / 2; if (p.easeOutBack(m, 1.2) < goal) lo = m; else hi = m; }
      const ti = t0 + (t1 - t0) * lo, age = t - ti;
      if (age < 0 || age > .42) continue;
      const q = this.path(p, ti);
      if (Math.abs(q.x - X) < .2) continue;
      p.figure(q.x, 0, { pose: this.poseAt(p, ti), face: q.face, color: GH, alpha: .9 * (1 - age / .42) * (.5 + .5 * (i + 1) / na) });
    }
    const fig = p.figure(X, 0, { pose: this.poseAt(p, t), face: pth.face });
    // ---- envelopes ----
    const auraI = p.easeOutCubic(p.ph(t, .55, 1.3)) * (1 - p.easeInCubic(p.ph(t, 3.9, 4.5)));
    const shellI = p.easeOutBack(p.ph(t, 1.0, 1.25), 2) * (1 - p.ph(t, 2.35, 2.7));
    // ---- ground: dash streaks ----
    for (const [t0, a0, b0] of [[2.75, this.X0, this.X1], [3.15, this.X1, this.X0]]) {
      const u = p.ph(t, t0, t0 + .7);
      if (u <= 0 || u >= 1) continue;
      const head = p.lerp(a0, b0, p.easeOutCubic(p.ph(t, t0, t0 + .17))), tail = p.lerp(a0, head, p.easeInCubic(u));
      p.line([tail, 0, .02], [head, 0, .02], .18 * (1 - u), G, .9 * (1 - u), { w1: .06 });
      p.light((tail + head) / 2, 0, 0, Math.abs(head - tail) / 2 + .4, G, .5 * (1 - u));
    }
    // ---- aura, light columns ----
    if (auraI > 0) {
      p.aura(X - F[0] * .3, -F[1] * .3, 0, { r: .45, h: AH, ramp: G, I: auraI * (.7 + .12 * Math.sin(t * 11)), t, seed: 2, n: 10 });
      for (let k = 0; k < 6; k++) {
        const ph = (t * (.9 + .3 * p.r(k, 1)) + p.r(k, 2)) % 1, a = p.r(k, 3) * p.TAU, rr = .5 + .25 * p.r(k, 4);
        const x = X + Math.cos(a) * rr, y = Math.sin(a) * rr, z0 = ph * AH * 1.1;
        p.line([x, y, z0], [x, y, z0 + .45 + .3 * p.r(k, 5)], .05, G, .9 * auraI * Math.sin(Math.PI * ph), { w1: .015 });
      }
    }
    // ---- light seeping out: motes leave the body surface ----
    const seep = p.env(t, .45, .8, 1.5, 1.9);
    if (seep > 0) {
      const ns = Math.round(16 * p.density);
      for (let k = 0; k < ns; k++) {
        const ph = (t * 1.4 + p.r(k, 11)) % 1, d = p.rdir(k, 12, .3), z = .35 + 1.0 * p.r(k, 13);
        const r0 = .16 + .7 * p.easeOutCubic(ph);
        p.dot(X + d[0] * r0, d[1] * r0, z + d[2] * r0 * .5 + ph * .3, G, 1.1 * seep * (1 - ph), 1);
      }
    }
    // ---- shell ----
    if (shellI > .02) {
      const br = .85 + .15 * Math.sin(t * 7);
      p.shell(X, 0, .85, .95 * Math.min(1.1, shellI + .1), (nx, ny, nz, rim) => { const v = Math.pow(rim, 3); return v > .12 ? v : 0; }, G, .9 * br * Math.min(1, shellI), { back: .3 });
    }
    // ---- regular pulse rings ----
    for (let k = 0; k < 6; k++) {
      const a = t - (1.2 + k * .5);
      if (a < 0 || a > .7 || t > 3.95) continue;
      const u = a / .7;
      p.ring(X, 0, .02, .3 + 1.1 * p.easeOutCubic(u), .07 * (1 - u) + .02, G, .9 * Math.pow(1 - u, 1.4));
    }
    // ---- armour: shoulders, chest, gauntlets, crest ----
    const s = fig.s, ch = fig.chest, off = (pt, k) => [pt[0] + F[0] * k, pt[1] + F[1] * k, pt[2] + F[2] * k];
    const piece = (T, i) => {
      const on = p.easeOutBack(p.ph(t, T, T + .2), 2.2), off2 = 1 - p.easeInCubic(p.ph(t, 3.7 + i * .09, 3.95 + i * .09));
      return on * off2;
    };
    const flash = T => (t >= T && t < T + .16 ? 1 - (t - T) / .16 : 0);
    const shR = [ch[0] - s[0] * .2, ch[1] - s[1] * .2, ch[2] + .02], shL = [ch[0] + s[0] * .2, ch[1] + s[1] * .2, ch[2] + .02];
    const parts = [
      { T: 1.5, i: 3, draw: k => {
        for (const sh of [shR, shL]) this.plate(p, off([sh[0], sh[1], sh[2] + .04], .14), .36 * k, .26 * k, (u, v) => (v < -.55 ? -1 : 1 - Math.hypot(u, (v + .55) / 1.5)), 1.1);
      }, at: shL },
      { T: 1.7, i: 2, draw: k => {
        this.plate(p, off([ch[0], ch[1], ch[2] - .1], .17), .32 * k, .4 * k, (u, v) => {
          const half = v > .1 ? .95 : .95 * (v + 1) / 1.1;
          const m = Math.min(half - Math.abs(u), 1 - v);
          return m > 0 && Math.abs(u) < .08 && v < .8 ? .1 : m;
        }, 1.15);
      }, at: ch },
      { T: 1.9, i: 1, draw: k => {
        const fa = [fig.elbow, fig.hand], hl = fig.handL, el = [p.lerp(shL[0], hl[0], .5), p.lerp(shL[1], hl[1], .5), p.lerp(shL[2], hl[2], .5) - .06];
        for (const [e, h] of [fa, [el, hl]]) {
          const a = off(p.v3.lerp(h, e, .75), .1), b = off(h, .1), b2 = p.v3.lerp(a, b, k);
          p.line(a, b2, .12, G, 1.05, { w1: .1 });
          if (k > .6) p.ring(b[0], b[1], b[2], .07, .03, G, 1.2, { axis: p.v3.norm([h[0] - e[0], h[1] - e[1], h[2] - e[2]]) });
        }
      }, at: fig.hand },
      { T: 2.1, i: 0, draw: k => {
        const hd = off(fig.head, .1), base = [hd[0], hd[1], hd[2] + .1];
        const up = (dx, dz) => [base[0] + cam.right[0] * dx * k, base[1] + cam.right[1] * dx * k, base[2] + dz * k];
        p.line(base, up(0, .42), .09, G, 1.2, { w1: .01 });
        p.line([base[0], base[1], base[2] - .03], up(-.2, .3), .07, G, 1.1, { w1: .01 });
        p.line([base[0], base[1], base[2] - .03], up(.2, .3), .07, G, 1.1, { w1: .01 });
        p.line(off([fig.head[0], fig.head[1], fig.head[2] + .04], .02), up(0, .02), .08, G, .9, { w1: .08 });
      }, at: fig.head },
    ];
    for (const pt of parts) {
      const k = piece(pt.T, pt.i);
      if (k > .02) pt.draw(k);
      const f = flash(pt.T);
      if (f > 0) { p.sparkle(pt.at[0] + F[0] * .2, pt.at[1] + F[1] * .2, pt.at[2], Math.round(6 * f), G, 1.4 * f); p.glow(pt.at[0], pt.at[1], pt.at[2], .2 + .25 * f, G, .7 * f); }
      // dissolve into motes
      const d = p.ph(t, 3.7 + pt.i * .09, 4.25 + pt.i * .09);
      if (d > 0 && d < 1) for (let m = 0; m < 5; m++) {
        const dd = p.rdir(m + pt.i * 9, 61, .6), r = .1 + .5 * p.easeOutCubic(d);
        p.dot(pt.at[0] + dd[0] * r, pt.at[1] + dd[1] * r, pt.at[2] + dd[2] * r + .3 * d, G, 1.2 * (1 - d), 1);
      }
    }
    // ---- floating gold dust ----
    const nd = Math.round(p.param('dust') * p.density), dw = p.env(t, .8, 1.3, 3.9, 4.6);
    if (dw > 0) for (let k = 0; k < nd; k++) {
      const ph = (t * (.18 + .12 * p.r(k, 21)) + p.r(k, 22)) % 1, a = p.r(k, 23) * p.TAU, rr = .35 + .9 * p.r(k, 24);
      const x = X * .6 + this.X0 * .4 + Math.cos(a) * rr + Math.sin(t * 2 + k) * .06, y = Math.sin(a) * rr, z = .1 + ph * (AH + .3);
      const tw = (Math.floor(t * 10) + k) % 4 === 0 ? 1.3 : .75;
      p.dot(x, y, z, G, tw * dw * Math.sin(Math.PI * ph), 1);
    }
    if (auraI > 0) p.light(X, 0, 0, 1.6, G, .45 * auraI + .25 * shellI);
  },
});
