// 療光法陣 / Healing Sigil — pixel version of 00GameDevs "healing-field" (MIT)
PXFX.define({
  id: 'healing-field',
  loop: 4,
  beats: [{ t: .05, kind: 'cast', power: .6 }, { t: .5, kind: 'pulse', power: .6 }, { t: 1.3, kind: 'pulse', power: .5 }, { t: 2.1, kind: 'pulse', power: .5 }, { t: 2.9, kind: 'pulse', power: .5 }],
  view: { r: 2.6, h: 2.2 },
  stage: { ground: 'moss' },
  palette: {
    heal: ['#2f8a6a', '#4fbf8d', '#86e9b2', '#b9f5d2', '#e6fff0', '#ffffff'],
    deep: ['#1f5a52', '#2f7d68', '#4fa88a', '#86e9b2'],
  },
  timeline: [
    { t: [0, .7], zh: '法陣由中心向外彈出（超出約 8% 再回彈），內圈→六芒星→符文環→外圈', en: 'sigil pops outward with ~8% overshoot: inner ring, hexagram, rune band, outer ring' },
    { t: [.7, 3.2], zh: '持續：每 0.8 秒一下脈衝（0.5、1.3、2.1、2.9 秒），法陣瞬間變亮、脈衝環急速擴張後減速；小十字向上飄，光點閃爍', en: 'sustain: a pulse every 0.8 s (0.5, 1.3, 2.1, 2.9 s): the sigil flares and a ring shoots out then slows; crosses float up, motes twinkle' },
    { t: [3.2, 4], zh: '收尾：法陣由外向內熄滅', en: 'end: the sigil switches off from the outside in' },
  ],
  layers: [
    { zh: '地面法陣：外雙圈、24 格方塊符文環、六芒星（兩個三角形）、中心十字', en: 'ground sigil: double outer ring, band of 24 blocky runes, hexagram (two triangles), centre cross' },
    { zh: '符文環慢慢逆時針轉，六芒星順時針轉', en: 'rune band turns slowly counter-clockwise, hexagram clockwise' },
    { zh: '脈衝環：每次脈衝一個，半徑 0.3→1.9，ease-out-expo 急衝後減速，越擴越細越淡', en: 'pulse ring: one per pulse, radius 0.3→1.9 with ease-out-expo, thinning and fading as it grows' },
    { zh: '上浮十字：14 個 5×5 像素十字，一邊上升一邊淡出', en: 'rising crosses: 14 crosses of 5x5 pixels, rising and fading' },
    { zh: '光柱光點：細直線光絲由地面升起＋四角星閃光', en: 'motes: thin vertical light threads rising from the ground, plus four-point sparkles' },
    { zh: '地面柔光：法陣範圍內地面被染成薄荷綠', en: 'ground glow: the ground inside the sigil is tinted mint green' },
  ],
  params: {
    crosses: { zh: '上浮十字數量', en: 'rising crosses', min: 0, max: 30, step: 1, value: 14 },
    spin: { zh: '法陣轉速', en: 'sigil spin', min: 0, max: 3, step: .1, value: 1 },
    pulseSize: { zh: '脈衝環大小', en: 'pulse ring size', min: .5, max: 1.6, step: .05, value: 1 },
    motes: { zh: '光絲數量', en: 'light threads', min: 0, max: 24, step: 1, value: 10 },
  },
  draw(p, t) {
    const C = this.palette.heal, D = this.palette.deep;
    const grow = p.easeOutBack(p.ph(t, 0, .6), 1.4), shrink = 1 - p.easeInCubic(p.ph(t, 3.25, 3.85)), on = Math.min(1, p.ph(t, 0, .25)) * shrink;
    if (on <= 0) return;
    const R = 1.85, reach = R * Math.max(0, grow) * (t > 3.25 ? .75 + .25 * shrink : 1);
    const spin = p.param('spin'), spinA = -t * .35 * spin, spinB = t * .5 * spin;
    // pulses: sharp attack, slow decay
    let flare = 0;
    for (const tp of [.5, 1.3, 2.1, 2.9]) { const d = t - tp; if (d >= 0 && d < .6) flare = Math.max(flare, Math.pow(1 - d / .6, 3)); }
    p.light(0, 0, .2, 2.4, C, (.5 + .4 * flare) * on);
    p.decal(0, 0, 0, R + .05, (x, y, rho, ang) => {
      if (rho > reach) return 0;
      let v = 0;
      v = Math.max(v, p.band(rho, R, .05), p.band(rho, R - .1, .03) * .8);
      if (rho > 1.42 && rho < 1.68) {                                   // rune band
        const a = ((ang + spinA) / p.TAU % 1 + 1) % 1, cell = Math.floor(a * 24), u = a * 24 - cell, vv = (rho - 1.45) / .2;
        v = Math.max(v, p.rune(u * 1.25 - .12, vv, cell) * .75);
      }
      v = Math.max(v, p.band(rho, 1.4, .035) * .9, p.band(rho, .95, .04));
      const star = Math.min(p.sdPoly(x, y, 3, .93, spinB), p.sdPoly(x, y, 3, .93, spinB + Math.PI));
      v = Math.max(v, star < .035 ? .85 : 0);
      if (rho < .32) v = Math.max(v, Math.abs(x) < .06 || Math.abs(y) < .06 ? 1 : 0, p.band(rho, .3, .03));
      return v;
    }, C, (.9 + .35 * flare) * on);
    // soft fill so the sigil reads as a lit disc, not only lines
    p.decal(0, 0, 0, R, (x, y, rho) => (rho < reach ? (.14 + .12 * flare) * (1 - rho / R) : 0), D, on, { add: true });
    // one pulse ring per beat: shoots out, then slows and fades
    const ps = p.param('pulseSize');
    for (const tp of [.5, 1.3, 2.1, 2.9]) {
      const u = (t - tp) / .9;
      if (u <= 0 || u >= 1) continue;
      p.ring(0, 0, .02, (.3 + p.easeOutExpo(u) * 1.6) * ps, .07 * (1 - u) + .025, C, Math.pow(1 - u, 1.5) * on);
    }
    // rising crosses: quick lift-off, then drift
    const nC = Math.round(p.param('crosses') * p.density);
    for (let k = 0; k < nC; k++) {
      const period = 1.6 + p.r(k, 1) * .8, u = ((t + p.r(k, 2) * period) / period) % 1;
      const ang = p.r(k, 3) * p.TAU, rad = .3 + p.r(k, 4) * 1.4, z = .1 + p.easeOutCubic(u) * 1.9;
      const fade = p.env(u, 0, .1, .6, 1) * on;
      p.card(Math.cos(ang) * rad, Math.sin(ang) * rad, z, .2, .2, (a, b) => (Math.abs(a) < .34 || Math.abs(b) < .34 ? 1 : 0), C, fade);
    }
    // motes and threads
    const nM = Math.round(p.param('motes') * p.density);
    for (let k = 0; k < nM; k++) {
      const u = ((t * .7 + p.r(k, 7)) % 1), ang = p.r(k, 8) * p.TAU, rad = p.r(k, 9) * 1.7;
      const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad, z = p.easeOutCubic(u) * 1.4;
      p.line([x, y, z], [x, y, z + .35], .03, C, .55 * (1 - u) * on, { i1: 0 });
      if (k % 3 === 0) p.sparkle(x, y, z + .5, 2, C, (1 - u) * on);
    }
  },
});
