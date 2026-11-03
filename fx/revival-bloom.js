// 生機光綻 / Vitality Blossom — pixel version of 00GameDevs "revival-bloom" (MIT)
PXFX.define({
  id: 'revival-bloom',
  loop: 2.6,
  beats: [{ t: .28, kind: 'cast', power: .5 }, { t: .85, kind: 'cast', power: .85 }],
  view: { r: 1.8, h: 2.0 },
  stage: { ground: 'grass' },
  palette: {
    petal: ['#9a4a78', '#d0689a', '#ff8fbd', '#ffbcd8', '#ffe8f2'],
    inner: ['#b45a88', '#e87aaa', '#ffa8cc', '#ffd2e6', '#fff4f8'],
    glow: ['#d0508a', '#ff8fbd', '#ffb8d6', '#ffe2ee', '#ffffff'],
  },
  timeline: [
    { t: [0, .28], zh: '聚光：地面亮起粉色光環（半徑 0.42），先略向外張再加速向內收成一點（ease-in-back），粉色光點開始上升', en: 'gathering: a pink ground ring (radius 0.42) eases slightly outward, then accelerates inward to a point (ease-in-back); pink motes start to rise' },
    { t: [.28, .72], zh: '花苞由地面竄出：8 片外瓣＋8 片內瓣緊閉成燈籠形，ease-out-back 長到約 1.0 高（衝過頭約 10% 再回落）', en: 'a bud shoots out of the ground: 8 outer and 8 inner petals closed into a lantern shape, growing to ~1.0 tall with ease-out-back (overshoots ~10%, settles)' },
    { t: [.85, 1.2], zh: '綻放：花心一下白閃，花瓣 ease-out-back 彈開（外瓣衝到約 60° 再回到 52°，內瓣 31°），一批光點急射向上後減速；頂上 3 顆菱形光彈出', en: 'bloom: the heart flashes white and the petals spring open with ease-out-back (outer ones overshoot to ~60° and settle at 52°, inner at 31°); a batch of motes shoots up and slows; 3 diamond lights pop in above' },
    { t: [1.2, 1.85], zh: '盛開停留，花瓣輕擺，光點不斷螺旋上升', en: 'full bloom holds with a gentle sway while motes keep spiralling up' },
    { t: [1.85, 2.3], zh: '收花：花瓣略合攏並以 ease-in-cubic 急縮消失，菱形光縮走，光點散去', en: 'close: the petals fold in slightly and shrink away quickly (ease-in-cubic), the diamonds shrink out, motes disperse' },
  ],
  layers: [
    { zh: '花瓣：每片為沿中脈對折的兩半，每半是 2 個三角形組成的橢圓葉形（4 點：基部、0.32 處、0.7 處、尖端），邊緣向內收，平面著色出明暗兩面', en: 'petals: each is two halves folded along the midrib, each half a 2-triangle leaf outline (base, 0.32, 0.7, tip), edges turned inward so flat shading gives a light and a dark side' },
    { zh: '外層預設 8 片長 1.0、內層同數長 0.78 錯開半格，張開角由 6° 開到 52°／31°（乘以「張開角度」），大小乘以「花朵大小」', en: 'outer layer 8 petals by default, 1.0 long; inner layer the same count, 0.78 long, offset half a step; opening angle 6° → 52° / 31° (x "opening angle"), size x "bloom size"' },
    { zh: '花心：粉白光暈＋白熱小球，綻放瞬間放大一倍；地面粉色光', en: 'heart: pink-white glow with a white-hot core that doubles in size on the bloom; pink light on the ground' },
    { zh: '菱形光：3 張菱形發光卡片在花頂上下浮動', en: 'diamonds: 3 glowing diamond cards bobbing above the flower' },
    { zh: '光點：預設 22 粒粉色像素螺旋上升，三分一在綻放時一起急射，帶四角星閃光', en: 'motes: 22 pink pixels by default spiralling upward, a third of them launched together on the bloom, with four-point sparkles' },
  ],
  params: {
    petals: { zh: '每層花瓣數', en: 'petals per layer', min: 5, max: 12, step: 1, value: 8 },
    bloomSize: { zh: '花朵大小', en: 'bloom size', min: .6, max: 1.4, step: .05, value: 1 },
    openAngle: { zh: '張開角度', en: 'opening angle', min: .5, max: 1.3, step: .05, value: 1 },
    motes: { zh: '光點數量', en: 'mote count', min: 0, max: 44, step: 1, value: 22 },
  },
  draw(p, t) {
    const P = this.palette, G = P.glow, TAU = p.TAU;
    const NP = Math.round(p.param('petals')), BS = p.param('bloomSize'), OA = p.param('openAngle');
    const BLOOM = .85, close = p.easeInCubic(p.ph(t, 1.85, 2.3)), fade = 1 - close;
    const grow = p.easeOutBack(p.ph(t, .28, .72), 1.8) * BS, open = p.easeOutBack(p.ph(t, BLOOM, 1.2), 2.4) * (1 - .25 * close);
    const a = t - BLOOM, fl = a >= 0 ? Math.pow(1 - p.ph(a, 0, .16), 2) : 0;
    // ground ring that gathers inward: eases out, then accelerates into a point
    const rg = p.ph(t, 0, .28);
    if (rg < 1) p.ring(0, 0, .03, (.42 * (1 - p.easeInBack(rg, 1.6)) + .03) * BS, .09, G, .9 * Math.min(1, t / .05) * (.6 + .4 * rg));
    // petals
    const petal = (az, L, th, W, cup, ramp, alpha) => {
      const st = Math.sin(th), ct = Math.cos(th), ca = Math.cos(az), sa = Math.sin(az);
      const d = [st * ca, st * sa, ct], s = [-sa, ca, 0], o = [ct * ca, ct * sa, -st];
      const B = [ca * .05, sa * .05, .04];
      const T = [B[0] + d[0] * L, B[1] + d[1] * L, B[2] + d[2] * L];
      const edge = (f, k, wk) => [B[0] + d[0] * L * f + s[0] * W * wk * k - o[0] * cup, B[1] + d[1] * L * f + s[1] * W * wk * k - o[1] * cup, B[2] + d[2] * L * f - o[2] * cup];
      for (const k of [1, -1]) {
        const E1 = edge(.32, k, .85), E2 = edge(.7, k, .8);
        p.tri(B, E1, E2, ramp, { alpha });
        p.tri(B, E2, T, ramp, { alpha });
      }
    };
    const sz = grow * fade;
    if (sz > .02 && t >= .28) {
      const sway = .03 * Math.sin(t * 3), wk = Math.sqrt(8 / NP);
      for (let i = 0; i < NP; i++) {
        const az = i / NP * TAU + .2;
        petal(az, 1.0 * sz, .1 + open * .8 * OA + sway, .24 * (.6 + .4 * Math.min(1, grow / BS)) * wk * BS, (.06 + .05 * open) * BS, P.petal, fade);
      }
      for (let i = 0; i < NP; i++) {
        const az = (i + .5) / NP * TAU + .2;
        petal(az, .78 * sz, .05 + open * .5 * OA - sway, .2 * (.6 + .4 * Math.min(1, grow / BS)) * wk * BS, .05 * BS, P.inner, fade);
      }
      if (fade > .5) p.shadow(0, 0, .3 * sz, (.3 + .35 * open) * BS);
    }
    // heart glow: flashes on the bloom
    const heart = Math.min(1, p.ph(t, .05, .3) * 1.5) * fade;
    if (heart > 0) {
      const pulse = .85 + .15 * Math.sin(t * 8), hz = .1 + .12 * Math.max(0, grow);
      p.glow(0, 0, hz, ((.12 + .08 * open) * BS + .3 * fl) * heart, G, heart * pulse * (.6 + .4 * open) + 1.2 * fl);
      p.orb(0, 0, hz, (.04 + .02 * open + .05 * fl) * BS, G, heart);
    }
    if (fl > 0) p.glow(0, 0, .5 * BS, (.25 + .6 * fl) * BS, G, 1.3 * fl, { pow: 1.8 });   // bloom flash above the cup
    // diamonds above: pop in, bob, shrink away
    const dPop = p.easeOutBack(p.ph(t, .95, 1.15), 2.4) * (1 - p.easeInCubic(p.ph(t, 1.85, 2.25)));
    for (let k = 0; k < 3 && dPop > .02; k++) {
      const ang = (k - 1) * .45, z = (1.25 + .07 * Math.sin(t * 4 + k * 2) + (k === 1 ? .1 : 0)) * BS;
      p.card(Math.sin(ang) * .35 * BS, Math.cos(ang) * .1, z, .12 * dPop, .22 * dPop, (u, v) => (Math.abs(u) + Math.abs(v) < 1 ? (Math.abs(u) + Math.abs(v) < .45 ? 1 : .7) : 0), G, Math.min(1, dPop));
    }
    // motes: steady spiral, plus a batch launched on the bloom (fast up, drag)
    const nM = Math.round(p.param('motes') * p.density);
    for (let k = 0; k < nM; k++) {
      const batch = k % 3 === 2, tb = batch ? BLOOM + p.r(k, 1) * .05 : .15 + p.r(k, 1) * 1.5, life = .9 + p.r(k, 2) * .4, tt = t - tb, u = tt / life;
      if (u <= 0 || u >= 1) continue;
      const ang = p.r(k, 3) * TAU + u * 2.5, rr = (.15 + p.r(k, 4) * .7) * (.5 + .5 * Math.min(1, open) + .3 * u) * BS;
      const x = Math.cos(ang) * rr, y = Math.sin(ang) * rr, z = .1 + (batch ? p.drag(4.5, 3, tt) : p.easeOutCubic(u) * 1.5) * BS;
      const I = (1 - u * u) * (t > 2.1 ? 1 - p.ph(t, 2.1, 2.35) : 1);
      p.dot(x, y, z, G, I, batch && tt < .1 ? 2 : 1);
      if (k % 5 === 0) p.sparkle(x, y, z, 2, G, I * .9);
    }
    p.light(0, 0, .3, 1.7 * Math.max(.8, BS), G, .75 * Math.max(.6 * p.env(t, 0, .05, .25, .4), heart * (.5 + .5 * Math.min(1, open)) + .6 * fl));
  },
});
