// 湧升煙柱 / Billowing Smoke Column — pixel version of 00GameDevs "smoke-column" (MIT)
PXFX.define({
  id: 'smoke-column',
  loop: 5,
  beats: [{ t: .02, kind: 'cast', power: .6 }, { t: .85, kind: 'pulse', power: .45 }, { t: 1.65, kind: 'pulse', power: .55 }, { t: 2.4, kind: 'pulse', power: .45 }],
  view: { r: 1.9, h: 3.3 },
  stage: { ground: 'stone' },
  palette: {
    smoke: ['#4a4462', '#666985', '#8991a8', '#aeb9cb', '#d3dae4', '#f1eee6'],
    soot: ['#3b3648', '#4f4a5e', '#686377', '#827d8e'],
  },
  timeline: [
    { t: [0, .3], zh: '開場（cast）：第一團煙由地面急衝而出，根部 5 縷小煙沿地面向外噴（ease-out-expo 急衝、阻力減速、淡出）', en: 'start (cast): the first puff shoots out of the ground, 5 small wisps blast out along the ground at the root (ease-out-expo, drag, fade)' },
    { t: [.3, 2.95], zh: '持續：每 0.15 秒噴出一團煙，在 0.85、1.65、2.4 秒各「噗」一下：之後 0.35 秒內的煙團大 35%、衝得更高，根部再噴出一圈小煙縷；煙團離地時最快，越升越慢（1-(1-a)^2.4），先在 0.25 秒內鼓起再慢慢變大；整條煙柱呈 S 形擺動並向右上斜', en: 'sustain: a puff every 0.15 s, with a chug at 0.85, 1.65 and 2.4 s: puffs born in the next 0.35 s are 35% bigger and shoot higher, and another ring of wisps blasts out at the root; each puff leaves fastest and slows as it rises (1-(1-a)^2.4), billows out in 0.25 s then keeps growing slowly; the column sways in an S-curve and leans up-right' },
    { t: [2.95, 4.95], zh: '停止：不再噴出新煙，剩下的煙團繼續減速上飄、擴散並以 Bayer 抖色淡出，地面先空', en: 'stop: no new puffs; the remaining ones keep rising ever slower, spread and fade out through Bayer dither, the ground clears first' },
  ],
  layers: [
    { zh: '煙團：每團由 1 個主球＋2 個較小的側上方球組成，令輪廓凹凸，粗糙顆粒，暗面偏紫、亮面偏暖白，共 6 階藍灰', en: 'puff: one main ball plus 2 smaller balls up its sides for a lumpy outline, rough grain, violet in shadow and warm white in light, 6-step blue-grey ramp' },
    { zh: '運動：每團壽命 2 秒，高度按 1-(1-a)^2.4 上升到 2.8（離地最快、越升越慢）；半徑 0.15 → 0.7（每團 ±20%），0.25 秒內先鼓起一半；水平偏移 = 正弦擺動 0.2 ＋ 向右漂移 0.35（風力）＋ 隨高度增加的隨機散開 0.35', en: 'motion: 2 s life, height 1-(1-a)^2.4 up to 2.8 (fastest at the vent, slowing with height); radius 0.15 to 0.7 (each ±20%), half of the growth in the first 0.25 s; sideways = sine sway 0.2 + 0.35 drift to the right (wind) + random scatter up to 0.35 that grows with height' },
    { zh: '淡出：壽命過半後用抖色透明逐步消失（2D 則改為縮小）', en: 'fade: after half its life a puff dithers away (in 2D it shrinks instead)' },
    { zh: '地面：煙柱根部一圈雜訊邊緣的深灰煙垢，停止後淡去；每次「噗」根部有 5 縷小煙沿地面滑出', en: 'ground: a noisy-edged dark soot smudge at the root, fading after the stop; each chug sends 5 small wisps sliding out along the ground' },
  ],
  params: {
    columnHeight: { zh: '煙柱高度', en: 'column height', min: .5, max: 1.1, step: .05, value: 1 },
    puffSize: { zh: '煙團大小', en: 'puff size', min: .6, max: 1.5, step: .05, value: 1 },
    wind: { zh: '風力（向右飄）', en: 'wind drift', min: 0, max: 1, step: .05, value: .5 },
  },
  CHUGS: [0, .85, 1.65, 2.4],
  // chug strength for a puff born at tb: sharp onset, eases off over 0.35 s
  chug(tb) {
    let c = 0;
    for (const tc of this.CHUGS) { const d = tb - tc; if (d >= 0 && d < .35) c = Math.max(c, Math.pow(1 - d / .35, 2)); }
    return c;
  },
  // dithered smoke ball; the 2D view has no dither, so there the puff stays opaque and shrinks instead
  puff(p, x, y, z, r, ramp, alpha, seed, o) {
    if (alpha <= .02) return;
    if (p.mode === '2d') { if (alpha < .2) return; p.ball(x, y, z, r * (.45 + .55 * Math.min(1, alpha * 1.25)), ramp, Object.assign({ rough: .3, shadow: false, seed }, o)); return; }
    // one shared dither offset: overlapping puffs keep their holes aligned, so no false depth edges light up inside the cloud
    p.ball(x, y, z, r, ramp, Object.assign({ rough: .3, alpha, shadow: false, seed: 1 }, o));
  },
  draw(p, t) {
    const SM = this.palette.smoke, SO = this.palette.soot;
    const dt = .15, life = 2, STOP = 2.95, TOP = 2.8 * p.param('columnHeight'), PS = p.param('puffSize'), wind = p.param('wind') * 2;
    const root = p.env(t, 0, .3, 3, 3.8);
    if (root > 0) p.decal(0, 0, 0, .6, (x, y, rho) => (rho < .5 * (.6 + .4 * p.noise(x * 6, y * 6)) ? .5 : 0), SO, root);
    // ground wisps on each chug: shoot out, slowed by drag, fade
    const nW = Math.round(5 * p.density);
    for (const tc of this.CHUGS) {
      const a = t - tc;
      if (a <= 0 || a > .8) continue;
      for (let k = 0; k < nW; k++) {
        const ang = k * 2.39996 + tc * 3 + p.r(k, 31) * .6, d = (.2 + p.drag(3 + p.r(k, 32) * 1.5, 5, a)) * Math.sqrt(PS), u = a / .8;
        this.puff(p, Math.cos(ang) * d, Math.sin(ang) * d, .07, (.17 + .1 * u) * PS, SM, .85 * (1 - u * u), k + 200, { lit: .1 });
      }
    }
    // the column: lumps per puff follow the density knob (main ball first)
    const n = Math.floor(STOP / dt), lumps = Math.max(1, Math.round(3 * p.density));
    for (let k = 0; k <= n; k++) {
      const age = t - k * dt;
      if (age < 0 || age > life) continue;
      const ch = this.chug(k * dt), a = age / life;
      const z = .1 + TOP * (1 + .12 * ch) * (1 - Math.pow(1 - a, 2.4));
      const h = z / TOP, sway = Math.sin(z * 2 - t * 1.3) * .2 * h;
      const x = sway + .35 * wind * h * h + (p.r(k, 2) - .5) * .35 * h, y = Math.cos(z * 1.6 - t) * .14 * h + (p.r(k, 3) - .5) * .3 * h;
      const grow = .45 * p.easeOutCubic(age / .25) + .55 * a;
      const r = (.15 + .55 * grow) * (.8 + .4 * p.r(k, 5)) * (1 + .35 * ch) * PS;
      const alpha = .97 * (1 - p.smooth(.55, 1, a)) * p.ph(age, 0, .05);
      this.puff(p, x, y, z, r, SM, alpha, k);
      const b = p.r(k, 4) * p.TAU;
      if (lumps > 1) this.puff(p, x + Math.cos(b) * r * .7, y + Math.sin(b) * r * .7, z + r * .45, r * .66, SM, alpha * .9, k + 50, { lit: .08 });
      if (lumps > 2) this.puff(p, x - Math.cos(b) * r * .65, y - Math.sin(b) * r * .65, z + r * .2, r * .58, SM, alpha * .85, k + 90, { lit: .04 });
      for (let j = 3; j < lumps; j++) {
        const c = p.r(k * 7 + j, 6) * p.TAU, e = p.r(k * 7 + j, 7);
        this.puff(p, x + Math.cos(c) * r * .75, y + Math.sin(c) * r * .75, z + r * (e - .3) * .7, r * (.45 + .15 * e), SM, alpha * .85, k + 130 + j * 40, { lit: .05 });
      }
    }
  },
});
