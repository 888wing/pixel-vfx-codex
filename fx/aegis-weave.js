// 織光護盾 / Aegis Weave — pixel version of 00GameDevs "aegis-weave" (MIT)
PXFX.define({
  id: 'aegis-weave',
  loop: 4.2,
  beats: [{ t: .03, kind: 'cast', power: .6 }, { t: 1.7, kind: 'hit', power: .9 }],
  view: { r: 2.3, h: 2.5 },
  stage: { ground: 'teal', tiles: true },
  palette: {
    aegis: ['#3c66aa', '#4a8cc8', '#68badc', '#9ad8ee', '#d2f1fa', '#ffffff'],
    hostile: ['#9a3040', '#d04a3a', '#ff8a4a', '#ffc47a', '#fff0d0'],
  },
  timeline: [
    { t: [0, .4], zh: '護罩由 30% 急速彈大到約 112% 再回彈到全尺寸，地面波浪環先快後慢畫出', en: 'the bubble pops from 30% to ~112% and settles back to full size; the wavy ground rings draw themselves fast, then slow' },
    { t: [.4, 3], zh: '持續：球面編織紋由靜止慢慢加速轉動，赤道光環轉動，8 粒菱形光點繞球飄動，木人頭頂上方的鋸齒符文閃爍', en: 'hold: the woven pattern spins up from rest, the equator ring turns, 8 diamond glints drift round it, a zigzag glyph flickers above the dummy head' },
    { t: [1.25, 1.7], zh: '一發紅色魔彈由左方加速飛來', en: 'a red bolt accelerates in from the left' },
    { t: [1.7, 2.3], zh: '命中：首兩幀命中點白閃、整個球面亮起後慢慢回落；護罩被撞凹再彈動，漣漪環沿球面 ease-out-expo 擴散變細，魔彈碎片高速散開再減速，編織紋被撞得加速一轉', en: 'hit: a white flash at the contact for two frames and the whole shell flares, then eases down; the bubble wobbles like a spring, a ripple ring spreads over the sphere (ease-out-expo) and thins, bolt fragments scatter fast then slow, the weave gets kicked into a faster turn' },
    { t: [3, 3.4], zh: '停止：護罩先微脹，再急速收縮熄滅，光點向外彈散', en: 'stop: the bubble swells slightly, then collapses fast and goes out; the glints scatter outward' },
    { t: [3.4, 4.2], zh: '只剩木人', en: 'only the dummy remains' },
  ],
  layers: [
    { zh: '護罩：半徑 1.2 的球面，中心透明，只在邊緣（菲涅耳）亮起，背面約三成亮度', en: 'bubble: sphere of radius 1.2, clear in the middle, lit only at the silhouette (fresnel), back side at ~35 %' },
    { zh: '編織紋：兩組反向的螺旋細線在球面交織，每組 5 條', en: 'weave: two families of 5 counter-turning spiral lines crossing on the sphere surface' },
    { zh: '赤道光環：比中心高 0.15 的水平白環，帶 3 段轉動亮點', en: 'equator ring: a horizontal white ring 0.15 above centre with 3 travelling bright spots' },
    { zh: '符文：球內木人頭頂上方、鏡頭向的鋸齒線（5 個尖），閃爍', en: 'glyph: a camera-facing zigzag (5 peaks) inside the bubble above the dummy head, flickering' },
    { zh: '光點：8 粒 2×2 像素菱形光點在球面附近繞轉，收起時向外飛散（阻力減速）', en: 'glints: 8 diamond glints of 2x2 px orbiting near the surface, flung outward with drag when the bubble collapses' },
    { zh: '地面：底部兩條波浪光環（6 個起伏）＋青色地面光照', en: 'ground: two wavy rings (6 bumps) at the base plus cyan ground light' },
  ],
  params: {
    radius: { zh: '護罩半徑', en: 'shield radius', min: .95, max: 1.5, step: .05, value: 1.2 },
    weaveLines: { zh: '編織線數量', en: 'weave lines', min: 2, max: 8, step: 1, value: 5 },
    glints: { zh: '光點數量', en: 'glint count', min: 0, max: 20, step: 1, value: 8 },
    spin: { zh: '編織轉速', en: 'weave spin', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const A = this.palette.aegis, H = this.palette.hostile;
    const R0 = p.param('radius'), lines = p.param('weaveLines'), spinK = p.param('spin');
    const C = [0, 0, .875 * R0], STOP = 3, HIT = 1.7;
    p.dummy(0, 0);

    const pop = p.easeOutBack(p.ph(t, 0, .35), 2.4), out = p.easeInCubic(p.ph(t, STOP + .1, STOP + .38));
    const swell = p.easeOutCubic(p.ph(t, STOP, STOP + .12));
    const on = Math.min(1, t / .05) * (1 - out);
    const ha = t - HIT, strike = ha >= 0 ? Math.pow(1 - p.ph(ha, 0, .1), 2) : 0, flare = ha >= 0 && ha < .7 ? Math.pow(1 - ha / .7, 3) : 0;
    const wobble = ha >= 0 ? 1 - .06 * Math.exp(-ha * 7) * Math.cos(ha * 24) : 1;
    const R = R0 * (.3 + .7 * pop) * wobble * (1 + .06 * swell) * (1 - .45 * out);
    const hitDir = (() => { const v = [-.92, .3, .25], l = Math.hypot(...v); return v.map(c => c / l); })();
    const rip = ha >= 0 ? p.easeOutExpo(p.ph(ha, 0, .6)) : -1, ripI = ha >= 0 ? 1 - p.ph(ha, 0, .6) : 0;
    // spin eases in from rest; the hit kicks it round faster for a moment
    const spin = spinK * (.5 * (t - .6 * (1 - Math.exp(-t / .6))) + (ha > 0 ? 1.4 * (1 - Math.exp(-ha * 5)) : 0));

    if (on > 0) {
      p.shell(C[0], C[1], C[2], R, (nx, ny, nz, rim, front) => {
        let v = Math.pow(rim, 2.2) * (1.15 + .5 * flare);
        const az = Math.atan2(ny, nx);
        const w1 = Math.abs(Math.sin(az * lines / 2 + nz * 2.4 + spin)), w2 = Math.abs(Math.sin(az * lines / 2 - nz * 2.4 - spin * .7));
        if (w1 < .07 || w2 < .07) v = Math.max(v, .3 + .35 * flare);
        if (ripI > 0) {
          const ang = Math.acos(p.clamp(nx * hitDir[0] + ny * hitDir[1] + nz * hitDir[2], -1, 1));
          v = Math.max(v, p.band(ang, rip * 1.9, .1 + .1 * ripI) * (.5 + .5 * ripI) * ripI * 1.3);
        }
        return v > .1 ? v : 0;
      }, A, on);
      // equator ring with travelling bright spots
      p.ring(C[0], C[1], C[2] + .15, Math.sqrt(Math.max(0, R * R - .0225)), .035, A, (.85 + .3 * flare) * on, { fn: a => .7 + .5 * Math.max(0, Math.cos(a * 3 - spin * 5)) ** 6 });
      // zigzag glyph inside
      const fl = .55 + .45 * Math.sin(t * 6);
      p.card(C[0], C[1], Math.min(C[2] + .88 * R0 / 1.2, 1.75), .6, .2, (u, v) => {
        const tri = Math.abs(((u + 1) * 2.5) % 1 - .5) * 4 - 1;
        return Math.abs(v - tri * .7) < .28 ? 1 : 0;
      }, A, .6 * Math.max(fl, flare) * on);
      // wavy ground rings: drawn fast, then slow
      const draw = p.easeOutExpo(p.ph(t, .02, .5));
      for (let r2 = 0; r2 < 2; r2++) {
        let prev = null;
        for (let k = 0; k <= 48; k++) {
          const a = k / 48 * p.TAU, rr = (.8 + r2 * .25) * R / 1.2 + Math.sin(a * 6 + t * (r2 ? -2 : 2.5)) * .06;
          const q = [Math.cos(a) * rr, Math.sin(a) * rr, .02];
          if (prev && k / 48 <= draw) p.line(prev, q, .03, A, (r2 ? .4 : .6) * on);
          prev = q;
        }
      }
      p.light(0, 0, .3, 1.7 * R0 / 1.2, A, (.6 + .4 * flare) * on);
    }
    // orbiting glints; flung outward with drag when the bubble collapses
    const nG = Math.round(p.param('glints') * p.density), fling = t > STOP + .1 ? t - STOP - .1 : 0;
    const gOn = Math.min(1, t / .3) * (1 - p.ph(fling, .15, .5));
    if (gOn > 0) for (let k = 0; k < nG; k++) {
      const lat = (p.r(k, 1) - .5) * 1.8, az = p.r(k, 2) * p.TAU + spin * (.8 + p.r(k, 3)) * (k % 2 ? 1 : -1);
      const rr = R0 * (1.03 + p.drag(2.5 + p.r(k, 4) * 2, 4, fling)) * (fling > 0 ? 1 : (.3 + .7 * Math.max(0, pop)));
      const q = [C[0] + Math.cos(az) * Math.cos(lat) * rr, C[1] + Math.sin(az) * Math.cos(lat) * rr, C[2] + Math.sin(lat) * rr];
      const tw = .6 + .4 * Math.sin(t * 5 + k * 1.7);
      if (k % 3 === 0) p.sparkle(q[0], q[1], q[2], 1, A, tw * gOn);
      else p.dot(q[0], q[1], q[2], A, tw * gOn, 2);
    }

    // a hostile bolt accelerates into the bubble to show it blocking
    const P = [C[0] + hitDir[0] * R0, C[1] + hitDir[1] * R0, C[2] + hitDir[2] * R0];
    if (ha > -.45 && ha < 0) {
      const from = [P[0] - 1.6, P[1] + .5, P[2] + .3];
      const at = x => { const u = Math.max(0, x), uu = .35 * u + .65 * u * u; return [0, 1, 2].map(c => p.lerp(from[c], P[c], uu)); };
      const x = 1 + ha / .45, q = at(x), pts = [q];
      for (let s = 1; s <= 5; s++) pts.push(at(x - s * .045));
      p.trail(pts, .14, .02, H, .8, .1);
      p.orb(q[0], q[1], q[2], .06, H, 1);
      p.glow(q[0], q[1], q[2], .2, H, .6);
    } else if (ha >= 0 && ha < .6) {
      const u = ha / .6;
      p.glow(P[0], P[1], P[2], .15 + .45 * strike + .15 * (1 - u), A, 1.6 * strike + .6 * (1 - u));
      if (strike > 0) p.sparkle(P[0], P[1], P[2], 4, A, strike * 1.2);
      const nF = Math.round(8 * p.density);
      for (let s = 0; s < nF; s++) {
        const ang = s / Math.max(1, nF) * p.TAU + p.r(s, 8), d = p.drag(2.2 + p.r(s, 9) * 1.6, 6, ha);
        p.dot(P[0] - d * .8, P[1] + Math.cos(ang) * d * .7, P[2] + Math.sin(ang) * d * .7 - ha * ha * 1.2, H, 1 - u, s % 3 ? 1 : 2);
      }
    }
  },
});
