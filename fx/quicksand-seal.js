// 聚砂咒印 / Sand-Gathering Sigil — pixel version of 00GameDevs "quicksand-seal" (MIT)
PXFX.define({
  id: 'quicksand-seal',
  loop: 4.5,
  beats: [{ t: .02, kind: 'cast', power: .5 }, { t: .93, kind: 'pulse', power: .5 }, { t: 1.43, kind: 'pulse', power: .45 }, { t: 1.93, kind: 'pulse', power: .45 }, { t: 2.43, kind: 'pulse', power: .45 }, { t: 2.93, kind: 'pulse', power: .5 }],
  view: { r: 2.3, h: 1.6 },
  stage: { ground: 'slate' },
  palette: {
    seal: ['#a2743c', '#c6964f', '#dfba7c', '#f0d6a0', '#fff3d8', '#ffffff'],
    sand: ['#6e5248', '#93724f', '#bf9a66', '#dfba7c', '#f3dcaa'],
    dust: ['#8a7a70', '#a89482', '#c4ae92', '#dccaa8'],
  },
  timeline: [
    { t: [0, .55], zh: '三角咒印由三個頂點沿邊急速畫出（先快後慢），整個咒印放大到約 109% 再回彈；中心圓亮起，三堆沙同時由地面彈起（衝高再回落）', en: 'the triangle seal draws itself along its edges from the 3 corners (fast, then slowing) while the whole seal pops to ~109% and settles; the centre circle lights, three sand piles bounce up out of the ground together (overshoot, settle)' },
    { t: [.55, 3.2], zh: '持續：每 0.5 秒（0.93、1.43、1.93、2.43、2.93 秒）輪到一堆沙砸落：沙堆先 0.55 秒彈升（衝高約 10% 再回落），停一下，再 0.18 秒加速沉落；落地一刻地面一圈衝擊環急速擴開、10 粒沙先快後慢噴出再受重力落下、冒一團塵煙；放射虛線上的細沙在沙堆升起時加速往內流', en: 'sustain: every 0.5 s (0.93, 1.43, 1.93, 2.43, 2.93 s) one pile slams down: it springs up over 0.55 s (~10% overshoot, settle), hangs, then drops with acceleration over 0.18 s; on impact a ground shock ring shoots out, 10 grains burst out fast, slow down and fall, a dust puff blooms; the sand on the radial dashes surges inward while a pile rises' },
    { t: [3.2, 3.95], zh: '收尾：仍立著的沙堆 0.4 秒內加速沉入地面，咒印由外三角、內三角到中心圓依次快速熄滅', en: 'end: any standing pile sinks into the ground with acceleration within 0.4 s, the seal snaps off from the outer triangle to the inner triangle to the centre circle' },
  ],
  layers: [
    { zh: '咒印：外接半徑 1.7 的雙線三角形（間距 0.12，邊上每 0.2 一道刻痕）、反向小三角形（0.95）、中心圓 0.3＋虛線圓 0.42', en: 'seal: double-line triangle of circumradius 1.7 (0.12 apart, a tick every 0.2 along the edges), inverted inner triangle (0.95), centre circle 0.3 plus dashed circle 0.42' },
    { zh: '流沙紋：18 條放射虛線，虛線段平時每秒 0.4 單位向中心移動，沙堆升起時加速，只在三角形內出現', en: 'sand flow: 18 radial dashed lines whose dashes move inward at 0.4 units/s, surging while a pile rises, only inside the triangle' },
    { zh: '沙堆：每堆 1 顆大＋4 顆小的粗糙實心球（顆粒噪點），升起時放大上浮，沉落時壓扁下沉並向外攤開', en: 'sand piles: 1 big + 4 small rough solid balls (grain noise) each; they swell and lift when rising, squash, sink and spread when dropping' },
    { zh: '沙粒：升起時 8 粒沙沿地面加速被吸向沙堆；砸落時 10 粒沙帶阻力與重力噴出、一圈衝擊光環、一團抖色塵煙', en: 'grains: 8 grains are sucked along the ground into a rising pile, accelerating; an impact throws 10 grains with drag and gravity, one shock ring of light and one dithered dust puff' },
  ],
  params: {
    piles: { zh: '沙堆數量', en: 'sand piles', min: 2, max: 6, step: 1, value: 3 },
    pileSize: { zh: '沙堆大小', en: 'pile size', min: .6, max: 1.4, step: .05, value: 1 },
    flowSpeed: { zh: '流沙速度', en: 'sand flow speed', min: 0, max: 3, step: .1, value: 1 },
    grains: { zh: '噴沙數量', en: 'impact grains', min: 0, max: 30, step: 1, value: 10 },
  },
  draw(p, t) {
    const C = this.palette.seal, S = this.palette.sand, D = this.palette.dust, TAU = p.TAU;
    const NP = Math.round(p.param('piles')), ps = p.param('pileSize'), flowK = p.param('flowSpeed');
    const end = p.ph(t, 3.2, 3.95);
    if (t < .02 || end >= 1) return;
    const rot = Math.PI / 2, T3 = TAU / 3;
    const draw = p.easeOutCubic(p.ph(t, .02, .5)), sc = p.easeOutBack(p.ph(t, .02, .45), 1.6);
    const offA = p.easeInCubic(p.ph(t, 3.22, 3.5)), offB = p.easeInCubic(p.ph(t, 3.42, 3.7)), offC = p.easeInCubic(p.ph(t, 3.62, 3.95));
    // impacts every 0.5 s, handed to the piles in turn
    const EV = [];
    for (let j = 0; ; j++) { const c = .93 + .5 * j; if (c - 1 > 3.2) break; EV.push({ c, k: j % NP, j }); }
    let flare = 0, surge = 0;
    for (const e of EV) {
      if (e.c >= 3.2) continue;
      const d = t - e.c;
      if (d >= 0 && d < .5) flare = Math.max(flare, Math.pow(1 - d / .5, 3));
      surge += p.ease(p.ph(t, e.c - 1, e.c - .45));
    }
    const flow = flowK * (.4 * t + .35 * surge);
    const triD = (rho, ang, r, a0) => { const a = ((ang - a0) % T3 + T3) % T3 - T3 / 2; return rho * Math.cos(a) - r * .5; };
    p.light(0, 0, .3, 2.2, C, (.42 + .25 * flare) * (1 - end) * Math.min(1, draw * 2));
    p.decal(0, 0, 0, 1.75 * Math.max(1, sc), (x, y, rho, ang) => {
      rho /= sc;
      let v = 0;
      const d1 = triD(rho, ang, 1.7, rot);
      // edge draw-in: along each edge, reveal from its corner
      const a = ((ang - rot) % T3 + T3) % T3 - T3 / 2, along = .5 + Math.tan(a) / (2 * Math.tan(Math.PI / 3));
      if (offA < 1 && along < draw) {
        if (Math.abs(d1) < .035) v = 1;
        else if (Math.abs(d1 + .12) < .022) v = .75;
        else if (d1 < 0 && d1 > -.12 && ((along * 3 * 1.7 / .2) % 1) < .22) v = .55;
        if (v) return v * (1 - offA) * (1 + .25 * flare);
      }
      if (d1 > 0) return 0;
      const d2 = triD(rho, ang, .95, rot + Math.PI);
      if (Math.abs(d2) < .025 && offB < 1 && draw > .5) v = .8 * (1 - offB);
      if (draw > .3 && offC < 1) {
        if (Math.abs(rho - .3) < .035) v = Math.max(v, 1 - offC);
        if (Math.abs(rho - .42) < .02 && ((ang / TAU * 16 + 16) % 1) < .5) v = Math.max(v, .6 * (1 - offC));
      }
      if (rho > .5 && d1 < -.18 && end < .5) {
        const k = (ang / TAU * 18 + 18) % 1;
        if (Math.abs(k - .5) * rho * 1.1 < .02 && ((rho * 2.5 + flow * 2.5) % 1) < .3) v = Math.max(v, .45 * Math.min(1, draw * 2) * (1 - end * 2));
      }
      return v;
    }, C, .95);

    // sand piles
    const intro = p.easeOutBack(p.ph(t, .1, .55), 2), sink = 1 - p.easeInCubic(p.ph(t, 3.2, 3.6));
    const nG = Math.round(p.param('grains') * p.density), nIn = Math.round(8 * p.density), pr = (.62 + .05 * Math.max(0, NP - 3)) * (.85 + .15 * ps);
    for (let k = 0; k < NP; k++) {
      const ang = rot + k * TAU / NP, cx = Math.cos(ang) * pr, cy = Math.sin(ang) * pr;
      const mine = EV.filter(e => e.k === k);
      let h = 0, col = 0, rising = -1;
      for (const e of mine) {
        const up = p.easeOutBack(p.ph(t, e.c - 1, e.c - .45), 1.8), fall = e.c < 3.2 ? p.easeInCubic(p.ph(t, e.c - .18, e.c)) : 0;
        if (t >= e.c - 1 && (t < e.c || e.c >= 3.2)) { h = Math.max(h, up * (1 - fall)); col = Math.max(col, fall); }
        if (t >= e.c - 1 && t < e.c - .45) rising = p.ph(t, e.c - 1, e.c - .45);
      }
      const first = mine.length ? mine[0].c - .18 : 9;
      if (t < first) h = Math.max(h, intro * (k === 0 ? 1 : .6));
      h *= sink;
      if (h > .05) {
        p.ball(cx, cy, .1 * h - .12, .36 * h * ps, S, { rough: .55, seed: k + 1 });
        for (let j = 0; j < 4; j++) {
          const a = j / 4 * TAU + k, sp = (.22 + col * .25) * ps;
          p.ball(cx + Math.cos(a) * sp, cy + Math.sin(a) * sp, .02 - col * .08, (.19 * h + .02) * ps, S, { rough: .6, seed: k * 4 + j, shadow: false });
        }
        // a few grains on the top
        for (let j = 0; j < 3; j++) p.dot(cx + (p.r(j, k) - .5) * .3 * h * ps, cy, .14 + .32 * h * ps, S, 1);
      }
      // grains sucked in while it rises: accelerate into the pile
      if (rising >= 0 && t < 3.2) for (let g = 0; g < nIn; g++) {
        const q = p.easeInCubic((rising * 1.6 + p.r(g, 3)) % 1), ga = ang + (p.r(g, 4) - .5) * 1.8, gr = (.35 + (1 - q) * 1.0) * ps;
        p.dot(cx + Math.cos(ga) * gr * .9, cy + Math.sin(ga) * gr * .9, .03, C, .8 * q + .2);
      }
      // impact: shock ring, grains with drag and gravity, dust puff
      for (const e of mine) {
        const a0 = t - e.c;
        if (e.c >= 3.2 || a0 < 0 || a0 >= .7) continue;
        const ru = a0 / .45;
        if (ru < 1) p.ring(cx, cy, .03, (.25 + p.easeOutExpo(ru) * .55) * ps, .1 * (1 - ru) + .025, C, Math.pow(1 - ru, 1.5));
        for (let g = 0; g < nG; g++) {
          const ga = p.r(g + e.j * 40, 5) * TAU, sp = 1.6 + p.r(g + e.j * 40, 6) * 2, vz = 2.2 + p.r(g + e.j * 40, 7) * 2;
          const out = p.drag(sp, 4, a0) * ps, z = .2 + p.drag(vz, 3, a0) - 4.5 * a0 * a0;
          if (z > 0) p.dot(cx + Math.cos(ga) * out, cy + Math.sin(ga) * out, z, C, 1);
        }
        const pu = p.ph(a0, 0, .6), grow = p.easeOutExpo(pu);
        // dust puff (dither transparency reads as a checkerboard with the 2D outline, so 2D gets a grain ring instead)
        if (p.mode !== '2d') p.ball(cx, cy, .2 + pu * .3, (.15 + grow * .35) * ps, D, { alpha: .75 * (1 - pu), rough: .6, shadow: false, seed: k + 7 });
        else for (let g = 0; g < 8; g++) { const ga = g / 8 * TAU; p.dot(cx + Math.cos(ga) * (.25 + grow * .55) * ps, cy + Math.sin(ga) * (.25 + grow * .55) * ps, .02, D, 1 - pu); }
      }
    }
  },
});
