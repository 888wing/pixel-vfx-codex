// 炎紋灼地 / Flame-Etched Ground — pixel version of 00GameDevs "burning-ground" (MIT)
PXFX.define({
  id: 'burning-ground',
  loop: 4.4,
  beats: [{ t: .08, kind: 'cast', power: .6 }, { t: 1.1, kind: 'pulse', power: .7 }, { t: 2, kind: 'pulse', power: .6 }, { t: 2.9, kind: 'pulse', power: .7 }],
  view: { r: 2.5, h: 2 },
  stage: { ground: 'ash' },
  palette: {
    fire: ['#a8321f', '#d9521f', '#ff914a', '#ffbb6e', '#ffe2a6', '#fffbe8'],
    ember: ['#8a2430', '#b0331f', '#d9521f', '#ff914a', '#ffbb6e'],
  },
  timeline: [
    { t: [0, .08], zh: '中心先爆一點白熱火星（頭兩幀最大最亮，0.3 秒內收細）', en: 'a white-hot spark at the centre, biggest on the first frames, shrinking within 0.3 s' },
    { t: [.08, .55], zh: '法陣由中心彈出：0.47 秒內放大到約 110% 再回彈到 100%，同時由內向外燒出，邊轉邊減速', en: 'the sigil pops out of the centre: scales to ~110% within 0.47 s and settles back to 100% while burning outward, spinning fast then slowing' },
    { t: [.55, 3.2], zh: '持續：火舌各自 0.15 秒內急竄到頂（略超高再回落），搖曳後 0.45 秒縮回；1.1、2.0、2.9 秒三次爆燃：裂紋瞬間發亮，一圈火環由中心急衝到外圈後減速，經過處火舌竄高 1.8 倍，並噴出一束火星', en: 'sustain: each flame shoots to full height in 0.15 s (slight overshoot), sways, then shrinks over 0.45 s; three flare-ups at 1.1, 2.0 and 2.9 s: cracks flash, a ring of fire shoots from the centre to the rim and slows, flames under the ring jump to 1.8x and a spray of sparks is thrown up' },
    { t: [3.2, 4], zh: '收尾：火舌在 0.55 秒內加速縮矮熄滅，法陣以噪聲侵蝕方式越燒越快地消失', en: 'end: flames shrink away faster and faster within 0.55 s, the sigil erodes through an accelerating noise dissolve' },
  ],
  layers: [
    { zh: '地面法陣（預設半徑 1.72）：外圈＋向外 72 齒、28 格方塊符文環（慢轉）、雙內圈、中心雙圈輪轂', en: 'ground sigil (default radius 1.72): outer ring with 72 outward teeth, band of 28 blocky runes (slow turn), double inner ring, double-ring hub' },
    { zh: '四道彎刃：由輪轂向外螺旋彎出的弧形雙線刃，跟符文環一起轉', en: '4 curved blades: double-line scythe arcs spiralling out from the hub, turning with the rune band' },
    { zh: '裂紋：噪聲等高線做成的暗紅發光裂縫，平時微亮，爆燃時被火環掃過的位置瞬間變白熱', en: 'cracks: dark-red glowing fissures from noise contour lines, dim at rest, flashing white-hot where the flare ring sweeps over them' },
    { zh: '火舌：約 34 道面向鏡頭的火焰卡片，底寬頂尖、尖端左右擺；中心白熱，邊緣深紅；每輪換位置', en: 'flame tongues: ~34 camera-facing flame cards, wide base, swaying pointed tip; white-hot core, deep-red edge; new spot every cycle' },
    { zh: '爆燃：每次一圈地面火環（寬 0.13→0.03，ease-out-expo 擴張）＋12 道火星短線，先快後慢（阻力）上衝再受重力回落', en: 'flare-up: one ground fire ring per flare (0.13 to 0.03 wide, ease-out-expo growth) plus 12 spark streaks thrown up fast, slowed by drag, pulled back by gravity' },
    { zh: '餘燼：14 粒 1 像素火星起飛快、之後慢慢飄升並左右漂；地面被染成橙色，爆燃時更亮', en: 'embers: 14 one-pixel sparks lifting off fast, then drifting up and sideways; the ground is tinted orange, brighter on each flare' },
  ],
  params: {
    radius: { zh: '法陣半徑', en: 'sigil radius', min: 1, max: 2.2, step: .05, value: 1.72 },
    flames: { zh: '火舌數量', en: 'flame tongues', min: 0, max: 60, step: 1, value: 34 },
    flameHeight: { zh: '火舌高度', en: 'flame height', min: .4, max: 2, step: .1, value: 1 },
    spin: { zh: '法陣轉速', en: 'sigil spin', min: 0, max: 3, step: .1, value: 1 },
  },
  draw(p, t) {
    const F = this.palette.fire, K = this.palette.ember, TAU = p.TAU;
    const R = p.param('radius'), fh = p.param('flameHeight'), spinK = p.param('spin'), PULSES = [1.1, 2, 2.9];
    const end = p.ph(t, 3.2, 4), on = 1 - end, eat = p.easeIn(end) * 1.15;
    // ignition spark: biggest on the first frames
    const spark = Math.pow(1 - p.ph(t, 0, .3), 2);
    if (spark > 0) { p.sparkle(0, 0, .05, 5 * spark + 1, F, 1.2 * spark); p.glow(0, 0, .1, .15 + .3 * spark, F, spark); }
    const sc = p.easeOutBack(p.ph(t, .08, .55), 1.8);                 // sigil scale: overshoots, settles
    if (sc <= .02 || on < .08) return;
    const burn = p.easeOutCubic(p.ph(t, .08, .5)), reach = (R + .14) * burn;   // burn-out front, sigil space
    const spin = spinK * (.22 * t - .9 * (1 - p.easeOutCubic(p.ph(t, .08, 1.1))));   // spins in fast, settles
    // flare-ups: sharp attack, slow decay; a hot front sweeps out from the centre
    let flare = .8 * Math.pow(1 - p.ph(t, .08, .6), 3);
    const fronts = [];
    for (const tp of PULSES) {
      const d = t - tp;
      if (d < 0 || d >= .8) continue;
      flare = Math.max(flare, Math.pow(1 - d / .8, 3));
      fronts.push([(R + .1) * p.easeOutExpo(d / .6), Math.pow(1 - d / .8, 2)]);
    }
    const wave = rho => { let w = 0; for (const [f, a] of fronts) w = Math.max(w, a * p.band(rho, f, .4)); return w; };
    const gone = (x, y) => end > 0 && p.noise(x * 3.2 / sc + 9, y * 3.2 / sc) < eat;

    p.light(0, 0, .3, R + .8, F, (.45 + .35 * flare + .06 * Math.sin(t * 11)) * Math.min(1, sc) * on);
    // the sigil (drawn in its own scaled space so it can overshoot)
    p.decal(0, 0, 0, (R + .14) * Math.max(1, sc), (x, y, rho, ang) => {
      rho /= sc;
      if (rho > reach || gone(x, y)) return 0;
      let v = Math.max(p.band(rho, R, .045), p.band(rho, R - .3, .03) * .85, p.band(rho, R - .38, .022) * .6);
      if (rho > R + .03 && rho < R + .12 && ((ang / TAU * 72 + 72) % 1) < .34) v = Math.max(v, .6);
      if (rho > R - .27 && rho < R - .05) {
        const a = ((ang - spin) / TAU % 1 + 1) % 1, cell = Math.floor(a * 28), u = a * 28 - cell;
        v = Math.max(v, p.rune(u * 1.3 - .15, (rho - (R - .26)) / .2, cell + 40) * .7);
      }
      v = Math.max(v, p.band(rho, .24, .045), p.band(rho, .13, .03) * .75);
      const bo = R - .46;                                             // blades run from the hub to just inside the rings
      if (rho > .24 && rho < bo) {
        const k = (rho - .24) / (bo - .24), c0 = 1.26 / bo;
        for (const [c, off] of [[1.35, 0], [1.9, .3]]) {
          const q = ang + spin - rho * c * c0 - off * (1 - k);
          const s = ((q % (TAU / 4)) + TAU / 4) % (TAU / 4) - TAU / 8;
          if (Math.abs(s) * rho < .04 * (1 - k * .5)) v = Math.max(v, off ? .7 : .95);
        }
      }
      return v * (1 + .3 * flare);
    }, F, .92 * on);
    // glowing cracks: dim at rest, white-hot where a flare front passes
    p.decal(0, 0, 0, R * Math.max(1, sc), (x, y, rho) => {
      const lr = rho / sc;
      if (lr > reach - .1 || gone(x, y)) return 0;
      const c = Math.abs(p.noise(x / sc * 2.1 / R * 1.72 + 3, y / sc * 2.1 / R * 1.72 - 1) - .5);
      return c < .034 ? (1 - c / .034 * .6) * (.5 + .9 * wave(lr)) : 0;
    }, K, on * 1.1);
    // flare rings: shoot out from the centre, thin and fade as they slow
    for (const tp of PULSES) {
      const u = (t - tp) / .6;
      if (u <= 0 || u >= 1) continue;
      p.ring(0, 0, .03, .2 + p.easeOutExpo(u) * (R - .1) * sc, .13 * (1 - u) + .03, F, Math.pow(1 - u, 1.5) * 1.3 * on);
    }

    // flame tongues: shoot up with overshoot, sway, sink; flares push the ones under the front higher
    const nF = Math.round(p.param('flames') * p.density), exit = 1 - p.easeInCubic(p.ph(t, 3.2, 3.75));
    for (let k = 0; k < nF; k++) {
      const per = .55 + p.r(k, 1) * .45, cyc = Math.floor(t / per + p.r(k, 2)), u = (t / per + p.r(k, 2)) % 1;
      const s = k * 31 + cyc;
      const ang = p.r(s, 3) * TAU, rad = Math.sqrt(p.r(s, 4)) * (R - .17);
      if (rad > reach - .15) continue;
      const life = Math.max(0, p.easeOutBack(p.ph(u, 0, .25), 2.2) * (1 - p.easeInCubic(p.ph(u, .55, 1))));
      const h = (.5 + p.r(s, 5) * .65) * life * fh * (1 + .8 * wave(rad)) * exit * Math.min(1, sc);
      if (h < .08) continue;
      const ph = p.r(k, 6) * 6 + t * 9, x = Math.cos(ang) * rad * sc, y = Math.sin(ang) * rad * sc;
      p.card(x, y, h * .5, .28 * (.5 + .5 * Math.min(1, life)) * (.75 + .25 * fh), h, (a, b) => {
        const s1 = (b + 1) * .5, sway = Math.sin(s1 * 4 - ph) * .2 * s1;
        const w = Math.pow(1 - s1, .7) * Math.min(1, (s1 + .06) * 5);
        const d = Math.abs(a - sway) / (w + 1e-3);
        return d >= 1 ? 0 : (1 - d * .7) * (1.05 - s1 * .5);
      }, F, (.55 + .5 * Math.min(1, life)) * on);
    }
    // flare sparks: thrown up fast, drag, gravity
    const nS = Math.round(12 * p.density);
    PULSES.forEach((tp, i) => {
      const d = t - tp;
      if (d <= 0 || d >= .9) return;
      for (let k = 0; k < nS; k++) {
        const q = k + i * 50, ang = p.r(q, 21) * TAU, r0 = (.2 + p.r(q, 22) * .8) * R, vz = 3 + p.r(q, 23) * 3, vr = .6 + p.r(q, 24);
        const pos = dd => [Math.cos(ang) * (r0 + p.drag(vr, 3, dd)), Math.sin(ang) * (r0 + p.drag(vr, 3, dd)), .1 + p.drag(vz, 3.2, dd) - 1.6 * dd * dd];
        const a = pos(d), b = pos(Math.max(0, d - .05));
        if (a[2] > .05) p.line(a, b, .045, F, (1 - d / .9) * 1.1 * on);
      }
    });
    // embers: lift off fast, then drift
    const nE = Math.round(14 * p.density);
    for (let e = 0; e < nE; e++) {
      const per = 1.5 + p.r(e, 10) * .9, u = ((t + p.r(e, 7) * per) / per) % 1, ang = p.r(e, 8) * TAU, rad = p.r(e, 9) * (R - .2) * Math.min(1, sc);
      if (rad > reach) continue;
      const x = Math.cos(ang) * rad + Math.sin(u * 7 + e) * .12, y = Math.sin(ang) * rad;
      p.dot(x, y, .2 + p.easeOutCubic(u) * 1.7, F, (1 - u) * .95 * on);
    }
  },
});
