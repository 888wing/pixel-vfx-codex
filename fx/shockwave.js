// 揚塵震波 / Dust-Raising Shockwave — pixel version of 00GameDevs "shockwave" (MIT)
PXFX.define({
  id: 'shockwave',
  loop: 2.6,
  beats: [{ t: 0, kind: 'burst', power: 1.2 }],
  view: { r: 2.5, h: 1.8 },
  stage: { ground: 'slate', tiles: true },
  palette: {
    dust: ['#7a6068', '#a8876e', '#d2b084', '#f0cf9d', '#fbebcc'],
    shock: ['#c8a878', '#e6cfa2', '#fbefd6', '#ffffff'],
    rock: ['#3e3a48', '#5a5260', '#786e74', '#958a88'],
  },
  timeline: [
    { t: [0, .06], zh: '衝擊：前 2 幀最大最亮，中心白色爆點（半徑 0.9）', en: 'impact: the first 2 frames are the biggest and brightest, a white impact point (radius 0.9) at the centre' },
    { t: [0, .3], zh: '12 道塵柱 0.08 秒內以 ease-out-expo 斜向噴起到全長，之後根部被推離中心並淡出', en: '12 dust jets spray up and out to full length in 0.08 s (ease-out-expo), then their roots drift outward as they fade' },
    { t: [0, .55], zh: '淺色衝擊環貼地以 ease-out-expo 由半徑 0.15 急衝到 2.1，寬度 0.17→0.03，越擴越細越淡；第二道淡環以 ease-out-cubic 稍慢跟上', en: 'a pale shock ring races along the floor from radius 0.15 to 2.1 with ease-out-expo, width 0.17 → 0.03, thinning and fading; a fainter second ring follows on ease-out-cubic' },
    { t: [.01, .9], zh: '塵土以阻力曲線向外翻滾（頭 0.2 秒衝出大半距離），由實心圓盤變成甜甜圈形塵環，中心逐漸露空', en: 'dust billows outward on a drag curve (most of the distance in the first 0.2 s), turning a solid disc into a doughnut ring; the centre clears out' },
    { t: [.02, 1.1], zh: '碎石被拋起，水平方向受阻力減速、受重力落地並彈一下', en: 'stones are thrown up, slow down horizontally under drag, fall with gravity and bounce once' },
    { t: [1.0, 2.2], zh: '塵環慢慢上升變大，以抖色淡出消失', en: 'the dust ring slowly rises, swells and dithers away' },
  ],
  layers: [
    { zh: '衝擊環：1 條貼地亮環＋1 條稍慢的淡環，暖白色，半徑乘以「衝擊範圍」', en: 'shock rings: one bright floor ring plus a slower faint one, warm white; radius scales with "shock radius"' },
    { zh: '塵柱：預設 12 條由中心斜向上的漸細光線，長 0.6–1.1，0.45 秒內淡出', en: 'dust jets: 12 tapered lines by default slanting up from the centre, 0.6–1.1 long, gone within 0.45 s' },
    { zh: '塵環：預設外圈 18 顆、內圈 8 顆粗糙實心塵球（半徑 0.17–0.43，大小不一、半埋地面），沙色 5 階色階，內圈先散', en: 'dust ring: 18 outer and 8 inner rough solid puffs by default (radius 0.17–0.43, mixed sizes, half sunk into the floor) on a 5-step sand ramp; the inner ones clear first' },
    { zh: '塵球貼地，頭 0.15 秒急速鼓起，之後慢慢再大 50%；落在地上的影子讓塵環有厚度', en: 'puffs sit low on the floor, puff up fast in the first 0.15 s, then slowly swell another 50%; their cast shadows give the ring volume' },
    { zh: '碎石：預設 12 塊低多邊形小石，深灰紫色', en: 'debris: 12 low-poly pebbles by default, dark violet-grey' },
  ],
  params: {
    radius: { zh: '衝擊範圍', en: 'shock radius', min: .6, max: 1.3, step: .05, value: 1 },
    dust: { zh: '塵環煙團數量', en: 'dust puffs', min: 6, max: 30, step: 1, value: 18 },
    jets: { zh: '塵柱數量', en: 'dust jets', min: 0, max: 24, step: 1, value: 12 },
    debris: { zh: '碎石數量', en: 'debris count', min: 0, max: 28, step: 1, value: 12 },
  },
  draw(p, t) {
    const P = this.palette, D = P.dust, S = P.shock, TAU = p.TAU, RS = p.param('radius');
    // ----- impact point: biggest on the first frames, collapses fast -----
    const fl = Math.pow(1 - p.ph(t, 0, .14), 2);
    if (fl > 0) p.glow(0, 0, .15, (.8 * fl + .1) * Math.sqrt(RS), S, 1.5 * fl, { pow: 1.6 });
    // ----- dust jets: shoot to full length (expo), roots pushed outward, fade -----
    const nJ = Math.round(p.param('jets') * p.density);
    for (let k = 0; k < nJ; k++) {
      const t0 = p.r(k, 1) * .03, u = p.ph(t, t0, .42 + p.r(k, 2) * .1);
      if (u <= 0 || u >= 1) continue;
      const az = k / nJ * TAU + p.r(k, 3) * .4, el = .7 + p.r(k, 4) * .55;
      const L = (.6 + p.r(k, 5) * .5) * p.easeOutExpo(p.ph(t, t0, t0 + .08)) * Math.sqrt(RS);
      const b0 = .12 + p.drag(1.6, 4, t - t0) * RS, ce = Math.cos(el);
      p.line([Math.cos(az) * b0 * ce, Math.sin(az) * b0 * ce, .05 + Math.sin(el) * b0], [Math.cos(az) * ce * (b0 + L), Math.sin(az) * ce * (b0 + L), .05 + Math.sin(el) * (b0 + L)],
        .1 + .06 * fl, S, (.9 + .4 * fl) * Math.pow(1 - u, 1.5), { w1: .02, i1: .05 });
    }
    // ----- shock rings: shoot out (expo), thin out as they grow -----
    const rk = p.ph(t, 0, .55);
    if (rk < 1) p.ring(0, 0, .04, (.15 + 1.95 * p.easeOutExpo(rk)) * RS, .03 + .14 * Math.pow(1 - rk, 2), S, 1.25 * Math.pow(1 - rk, 1.5));
    const rk2 = p.ph(t, .04, .8);
    if (rk2 > 0 && rk2 < 1) p.ring(0, 0, .04, (.15 + 1.6 * p.easeOutCubic(rk2)) * RS, .02 + .04 * (1 - rk2), S, .5 * Math.pow(1 - rk2, 1.5));
    // ----- dust puffs: outer ring, rolled out on a drag curve -----
    const open = p.drag(5, 5, t - .01) / 1, late = .15 * p.easeOutCubic(p.ph(t, .9, 2.2));
    const swell = p.easeOutExpo(p.ph(t, 0, .15)) * (1 + .5 * p.easeOutCubic(p.ph(t, .15, 1.8)));
    const nD = Math.round(p.param('dust') * p.density);
    for (let k = 0; k < nD; k++) {
      const a = k / nD * TAU + p.r(k, 6) * .4;
      const u = p.ph(t, 1.05 + p.r(k, 7) * .35, 1.75 + p.r(k, 8) * .45), fade = 1 - u * u;
      if (fade <= 0 || t < .01) continue;
      const rr = (.18 + p.r(k, 9) * .15 + (.9 + p.r(k, 10) * .6) * open + late) * RS;
      const sz = (.17 + p.r(k, 11) * .26) * swell * Math.sqrt(RS) * Math.sqrt(18 / Math.max(12, nD / p.density));
      p.ball(Math.cos(a) * rr, Math.sin(a) * rr, sz * .3 + .3 * p.easeOutCubic(p.ph(t, .8, 2.2)), sz, D, { alpha: fade, rough: .35, seed: k });
    }
    // inner puffs fill the disc early, then clear
    const nI = Math.round(8 * p.density);
    for (let k = 0; k < nI; k++) {
      const a = k / nI * TAU + .4 + p.r(k, 12) * .5;
      const fade = 1 - p.easeInCubic(p.ph(t, .35 + p.r(k, 13) * .2, .85 + p.r(k, 13) * .2));
      if (fade <= 0 || t < .01) continue;
      const rr = ((.15 + p.r(k, 14) * .25) + .45 * open) * RS;
      const sz = (.18 + p.r(k, 15) * .1) * swell * Math.sqrt(RS);
      p.ball(Math.cos(a) * rr, Math.sin(a) * rr, sz * .45, sz, D, { alpha: fade, rough: .35, seed: k + 20, lit: .1 });
    }
    // ----- debris: drag horizontally, gravity, one bounce -----
    const nB = Math.round(p.param('debris') * p.density);
    for (let d = 0; d < nB; d++) {
      if (t > 1.15) break;
      const tt = t - .01 - p.r(d, 20) * .03;
      if (tt < 0) continue;
      const az = p.r(d, 16) * TAU, vh = (2 + p.r(d, 17) * 2.8) * RS, vz = 1.8 + p.r(d, 18) * 1.6, g = 8;
      const land = vz * 2 / g;
      let h = p.drag(vh, 2.2, tt), z = .05 + vz * tt - .5 * g * tt * tt;
      if (tt > land) { const b = tt - land; h = p.drag(vh, 2.2, land) + p.drag(vh * .3, 6, b); z = Math.max(0, vz * .25 * b - .5 * g * b * b); }
      p.rock(Math.cos(az) * (.1 + h), Math.sin(az) * (.1 + h), z + .05, .05 + p.r(d, 19) * .04, P.rock, d);
    }
    p.light(0, 0, .1, 2.3 * RS, S, .7 * Math.max(fl * 1.4, Math.pow(1 - rk, 1.5) * .7));
  },
});
