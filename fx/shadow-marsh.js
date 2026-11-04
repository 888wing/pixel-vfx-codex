// 影沼百獸 / Shadow Marsh — Ultimates pack (original design): liquid black shadow floods from the caster's feet, bulges, and shadow arms and a beast head burst out to strike the target before sinking back
PXFX.define({
  id: 'shadow-marsh',
  loop: 4.0,
  beats: [{ t: .7, kind: 'cast', power: .7 }, { t: 1.5, kind: 'hit', power: 1.1 }, { t: 1.72, kind: 'hit', power: 1.3 }],
  view: { r: 3.3, h: 2.6 },
  stage: { ground: 'stone', tiles: true },
  modules: ['figure', 'charge', 'grade', 'creature', 'growth', 'shockwave', 'impact', 'aftermath'],
  palette: {
    ink: ['#06070d', '#0c0f1b', '#141a2c', '#1f2740'],
    hide: ['#0d1020', '#18203a', '#24305a', '#34447a'],
    rim: ['#2c3f8a', '#4060b8', '#5a7cc8', '#8fb0ea', '#dbe8ff'],
    eye: ['#3f9ad8', '#7fd0ff', '#d6f4ff', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .3], zh: '起手：施法者由站姿轉為架式', en: 'pose: the caster shifts from idle into a stance' },
    { k: 'charge', t: [.3, .7], zh: '集氣：施法者蹲低雙手下壓，腳下冒出一灘黑影（半徑約 0.6），冷藍光點向腳下匯聚；環境壓暗 30%', en: 'charge: the caster crouches and presses down, a black pool (radius ~0.6) wells up under the feet, cold blue motes sink into it; the scene darkens 30%' },
    { k: 'shape', t: [.7, 1.35], zh: '成形：雙掌前推，黑水沿地面 0.4 秒內流到木樁並擴散成半徑約 1.5 的黑沼，邊緣有冷藍光澤與漣漪；黑沼多處隆起成半球', en: 'shape: palms thrust forward, the black liquid runs along the ground to the dummy in 0.4 s and floods into a marsh of radius ~1.5 with a cold blue glossy rim and ripples; several spots swell into domes' },
    { k: 'motion', t: [1.35, 1.72], zh: '推進：4 條影子手臂（膠囊鏈＋3 根爪）由隆起處衝出，先向上再向下勾擊木樁；一個狼形獸頭由黑水升起、張口、撲咬', en: 'motion: 4 shadow arms (capsule chains with 3 claws) burst out of the domes, rising and hooking down onto the dummy; a wolf-like beast head rises from the liquid, opens its jaws and lunges' },
    { k: 'impact', t: [1.5, 2.0], zh: '命中：每爪命中時藍白爪痕閃光（第一下），獸頭咬合時冷藍閃光、地面衝擊環、放射速度線（第二下），黑色水滴帶重力四濺', en: 'impact: blue-white claw flashes as each arm lands (first hit), a cold blue flash, a ground shock ring and radial speed lines as the jaws snap shut (second hit); black droplets splash out under gravity' },
    { k: 'after', t: [2.0, 4.0], zh: '餘波：手臂與獸頭以抖色透明溶解並沉回黑水，再濺起水滴；黑沼由外向內縮回施法者腳下消失，施法者收勢', en: 'aftermath: arms and head dissolve through dithered transparency and sink back into the liquid with a last splash; the marsh shrinks back to the caster’s feet and vanishes; the caster recovers' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→蹲低下壓→雙掌前推→收勢', en: 'caster: faceless mannequin, poses idle → stance → crouch pressing down → palms thrust → recover' },
    { zh: '黑沼：直接染黑地面的圖形（施法者腳下圓形＋通往木樁的通道＋木樁周圍大圓，邊緣用噪聲擾動），近黑靛色，不用發光畫黑色', en: 'marsh: a ground stain shape (disc under the caster + a channel + a large disc round the dummy, noisy edge) in near-black indigo; never draw the black as light' },
    { zh: '光澤：沿黑沼邊緣一圈 1–2 像素冷藍光帶，內部 2–3 道擴散漣漪與少量橫向高光', en: 'gloss: a 1–2 px cold blue band along the marsh edge, 2–3 spreading ripples inside and a few horizontal glints' },
    { zh: '隆起：每個出手點先升起實心深色半球（半徑約 0.3），外面一圈較大的藍色光暈作輪廓', en: 'bulges: each spawn point first swells into a solid dark dome (radius ~0.3) inside a larger blue glow that reads as a rim' },
    { zh: '影子手臂：8 點貝茲曲線上的膠囊鏈（半徑 0.14→0.07），沿線一條較粗藍光作輪廓，末端 3 根晶體爪；以回彈緩動 0.15 秒內伸出', en: 'shadow arms: a capsule chain along an 8-point Bézier curve (radius 0.14 → 0.07) with a wider blue line behind as the rim, 3 crystal claws at the end; extends in 0.15 s with an overshoot ease' },
    { zh: '獸頭：實心三角面組成的狼形長吻、上下顎、兩隻尖耳，冷藍輪廓線、白藍牙齒、發光雙眼（2×2 像素）；頸部為粗膠囊鏈', en: 'beast head: a wolf-like snout, upper and lower jaws and two pointed ears from solid triangles, cold blue edge lines, blue-white teeth and glowing 2×2 px eyes; the neck is a thick capsule chain' },
    { zh: '水滴：出手和沉沒時各濺起約 5 粒／處黑色小實心球，帶重力落回地面', en: 'droplets: ~5 small black solid balls per spot splash up when things burst out and sink back, falling under gravity' },
    { zh: '溶解：手臂與獸頭以 Bayer 抖色透明淡出並下沉 1.2 單位', en: 'dissolve: arms and head fade out through Bayer-dither transparency while sinking 1.2 units' },
  ],
  params: {
    arms: { zh: '手臂數量', en: 'arm count', min: 1, max: 6, step: 1, value: 4 },
    beast: { zh: '獸頭（0/1）', en: 'beast head (0/1)', min: 0, max: 1, step: 1, value: 1 },
    spread: { zh: '黑沼半徑', en: 'spread radius', min: 1, max: 2.2, step: .1, value: 1.5 },
  },
  // quadratic Bézier point
  bez(a, c, b, u) {
    const v = 1 - u;
    return [v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], v * v * a[1] + 2 * v * u * c[1] + u * u * b[1], v * v * a[2] + 2 * v * u * c[2] + u * u * b[2]];
  },
  // signed pool margin at ground point (x, y) in world units (> 0 inside)
  pool(p, x, y, t, S) {
    const dc = Math.hypot(x - S.X0, y), dd = Math.hypot(x - S.DX, y);
    const sx = p.clamp(x, S.X0, S.front), dseg = x < S.X0 ? dc : Math.hypot(x - sx, y);
    const m = Math.max(S.rc - dc, (x <= S.front + .2 ? S.wch : 0) - dseg, S.rd - dd);
    return m + .14 * (p.noise(x * 2.1 + 3, y * 2.1 + t * .4) - .5);
  },
  draw(p, t) {
    const IK = this.palette.ink, RM = this.palette.rim, EY = this.palette.eye;
    const CAST = .7, HIT = 1.5, BITE = 1.72, X0 = -2.1, DX = 2.35, R = p.param('spread'), NA = Math.round(p.param('arms')), beast = p.param('beast') >= .5;
    // ---- the marsh shape over time ----
    const shrink = 1 - p.easeInCubic(p.ph(t, 2.55, 3.4));
    const S = {
      X0, DX,
      rc: (t < CAST ? .6 * p.easeOutCubic(p.ph(t, .3, CAST)) : .6 + .25 * p.easeOutCubic(p.ph(t, CAST, 1.0))) * shrink,
      front: p.lerp(X0, DX, p.easeOutCubic(p.ph(t, CAST + .02, 1.1)) * Math.pow(shrink, .5)),
      wch: (.42 * p.easeOutCubic(p.ph(t, CAST, .9))) * shrink,
      rd: R * p.easeOutBack(p.ph(t, 1.0, 1.32), 1.4) * Math.pow(shrink, 1.4),
    };
    const poolOn = t > .3 && t < 3.45;
    if (poolOn) p.stain((X0 + DX) / 2, 0, (DX - X0) / 2 + R + .3, (dx, dy) => {
      const m = this.pool(p, dx + (X0 + DX) / 2, dy, t, S);
      return m > .06 ? 1.25 : m > 0 ? .55 : 0;
    }, IK[1], 1);
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < CAST) pose = { a: 'ready', b: 'charge', k: p.easeOutBack(p.ph(t, .3, .6), 1.4) };
    else if (t < CAST + .08) pose = { a: 'charge', b: 'palm', k: p.easeInCubic((t - CAST) / .08) };
    else if (t < 2.4) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.4, 3.2)) };
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose });
    // ---- spawn spots round the dummy: arms first, then the beast ----
    const spots = [], bAng = 2.25, gap = beast ? 1.3 : 0;
    for (let k = 0; k < NA; k++) {
      const ang = bAng + gap / 2 + (k + .5) / NA * (p.TAU - gap), rr = Math.min(R * .62, 1.05);
      spots.push({ k, x: DX + Math.cos(ang) * rr, y: Math.sin(ang) * rr, ang, t0: 1.12 + k * .03 });
    }
    const bR = Math.min(R * .72, 1.15), BS = { x: DX + Math.cos(bAng) * bR, y: Math.sin(bAng) * bR, t0: 1.2 };
    const sinkU = p.ph(t, 2.05, 2.6), alpha = 1 - p.easeInCubic(sinkU), sinkZ = -1.2 * p.easeInCubic(sinkU);
    // bulging domes at each spot (dark solid inside a blue glow rim)
    const domes = beast ? spots.concat([BS]) : spots;
    const domeR = [];
    for (const s of domes) {
      const u = p.easeOutBack(p.ph(t, s.t0, s.t0 + .22), 2), r = .3 * u * (1 - p.easeInCubic(p.ph(t, 2.2, 2.7)));
      domeR.push(r);
      if (r > .03) p.ball(s.x, s.y, -r * .25, r, IK, { shadow: false, lit: .1 });
    }
    // ---- shadow arms ----
    const dark = .3 * (t < CAST ? p.easeOutCubic(p.ph(t, .3, CAST)) : 1 - p.ph(t, 2.4, 3.2));
    p.grade({ dark, desat: dark * .5 });
    const armLines = [];
    for (const s of spots) {
      const k = s.k, out = p.easeOutBack(p.ph(t, 1.35 + k * .025, HIT), 1.3), ret = p.easeInCubic(sinkU);
      const g = Math.min(1, out) * (1 - ret);
      if (g <= .02) continue;
      const base = [s.x, s.y, -.1 + sinkZ * .3];
      const tip = [DX + Math.cos(s.ang) * .3, Math.sin(s.ang) * .3, 1.05 + .3 * p.r(k, 3) + sinkZ];
      const ctl = [s.x + Math.cos(s.ang) * .45, s.y + Math.sin(s.ang) * .45, 2.1 + .3 * p.r(k, 4) + sinkZ];
      const wig = t > HIT ? .05 * Math.sin(t * 30 + k) * Math.exp(-(t - HIT) * 6) : 0;
      const pts = [];
      for (let q = 0; q <= 8; q++) {
        const u = q / 8 * g, pt = this.bez(base, ctl, tip, u);
        pts.push([pt[0] + wig * Math.sin(q), pt[1], pt[2]]);
      }
      for (let q = 0; q < 8; q++) p.capsule(pts[q], pts[q + 1], .15 - q * .009, .15 - (q + 1) * .009, IK, { alpha, shadow: q === 2 });
      const tp = pts[8], pr = pts[7], dir = p.v3.norm([tp[0] - pr[0], tp[1] - pr[1], tp[2] - pr[2]]);
      // three claws fanning out of the tip
      const side = p.v3.norm(p.v3.cross(dir, [0, 0, 1]));
      for (let c = -1; c <= 1; c++) {
        const cd = p.v3.norm([dir[0] + side[0] * c * .55, dir[1] + side[1] * c * .55, dir[2] + side[2] * c * .55 - .15]);
        p.shard(tp[0] + cd[0] * .12, tp[1] + cd[1] * .12, tp[2] + cd[2] * .12, .36, .09, cd, IK, { back: .1, sides: 3, shadow: false, alpha });
        armLines.push([tp, [tp[0] + cd[0] * .3, tp[1] + cd[1] * .3, tp[2] + cd[2] * .3]]);
      }
      armLines.push(pts);
    }
    // ---- beast head ----
    let head = null;
    if (beast) {
      const rise = p.easeOutBack(p.ph(t, 1.42, 1.6), 1.5), lunge = p.easeInCubic(p.ph(t, 1.6, BITE)) - .4 * p.easeOutCubic(p.ph(t, BITE + .1, 2.1));
      const g = rise * (1 - p.easeInCubic(sinkU));
      if (g > .02) {
        const base = [BS.x, BS.y, -.2], up = [BS.x + Math.cos(bAng) * .15, BS.y + Math.sin(bAng) * .15, 1.4 * g + sinkZ];
        const hp = p.v3.lerp(up, [DX + Math.cos(bAng) * .5, Math.sin(bAng) * .5, 1.2 + sinkZ], .6 * lunge);
        const ctl = [BS.x + Math.cos(bAng) * .3, BS.y + Math.sin(bAng) * .3, .5 * g];
        for (let q = 0; q < 6; q++) p.capsule(this.bez(base, ctl, hp, q / 6), this.bez(base, ctl, hp, (q + 1) / 6), .2 - q * .012, .2 - (q + 1) * .012, IK, { alpha, shadow: q === 2 });
        const d = p.v3.norm([DX - hp[0], -hp[1], 1.1 - hp[2] + .25]);
        const jaw = t < BITE ? p.smooth(1.45, 1.62, t) : 1 - p.easeOutExpo(p.ph(t, BITE, BITE + .05)) * .85;
        head = this.wolf(p, hp, d, .48 * Math.max(.35, g), jaw, alpha, t);
      }
    }
    // ---- light pass: marsh gloss, rims, eyes ----
    if (poolOn) {
      const ripC = [[DX, 0, 1.05], [X0, 0, .45]];
      p.decal((X0 + DX) / 2, 0, 0, (DX - X0) / 2 + R + .3, (dx, dy) => {
        const x = dx + (X0 + DX) / 2, m = this.pool(p, x, dy, t, S);
        if (m <= 0 || x * x + dy * dy > 8.2) return 0;
        if (m < .07) return .85;
        let v = 0;
        for (const [cx, cy, t0] of ripC) {
          const age = t - t0;
          if (age < 0 || age > 1.8) continue;
          const rr = Math.hypot(x - cx, dy - cy);
          for (let w = 0; w < 2; w++) { const front = (age - w * .45) * 1.1; if (front > 0) v = Math.max(v, p.band(rr, front, .05) * .45 * (1 - age / 1.8)); }
        }
        if (p.noise(x * 2.5 + 9, dy * 7 + t * .6) > .8 && m > .15) v = Math.max(v, .4);
        return v;
      }, RM, 1);
    }
    domes.forEach((s, i) => { const r = domeR[i]; if (r > .03) p.glow(s.x, s.y, -r * .25, r * 1.45, RM, .9, { pow: 1.2 }); });
    for (const L of armLines) for (let q = 0; q < L.length - 1; q++) p.line(L[q], L[q + 1], L.length > 2 ? .4 - q * .025 : .1, RM, .75 * alpha, { w1: L.length > 2 ? .4 - (q + 1) * .025 : .02 });
    if (head) head.light();
    // charge: cold motes sink into the pool at the caster's feet
    if (t > .3 && t < CAST + .1) p.charge(X0, 0, .05, p.ph(t, .3, CAST + .05), { n: 14, R: 1.3, ramp: RM, up: .4, seed: 6 });
    p.light(DX, 0, 0, R + .4, RM, .3 * (t > 1 && t < 2.6 ? 1 : 0));
    // ---- hits ----
    const a1 = t - HIT, a2 = t - BITE;
    if (a1 >= 0 && a1 < .3) for (const s of spots) {
      const tp = [DX + Math.cos(s.ang) * .3, Math.sin(s.ang) * .3, 1.05 + .3 * p.r(s.k, 3)], u = a1 / .22;
      if (u < 1) {
        p.glow(tp[0], tp[1], tp[2], .3 * (1 - u), EY, 1.3 * (1 - u));
        const sd = p.v3.norm([-Math.sin(s.ang), Math.cos(s.ang), 0]);
        for (let c = -1; c <= 1; c++) p.slash([tp[0] - sd[0] * .25, tp[1] - sd[1] * .25, tp[2] + .35 + c * .12], [tp[0] + sd[0] * .25, tp[1] + sd[1] * .25, tp[2] - .25 + c * .12], { u, ramp: EY, w: .06, I: 1.3 });
      }
    }
    if (beast && a2 >= 0 && a2 < .6) {
      const fl = Math.pow(1 - p.ph(a2, 0, .15), 2), C = [DX - .2, 0, 1.15];
      if (fl > 0) p.glow(C[0], C[1], C[2], .4 + .7 * fl, RM, 1.5 * fl, { pow: 1.3 });
      p.shock(DX, 0, .03, p.ph(a2, 0, .5), { R: R + .5, w: .25, ramp: RM });
      if (a2 < .18) p.speedLines(C[0], 0, C[2], { n: 14, R0: .5, R1: 2.5, ramp: RM, I: 1 - a2 / .18, seed: Math.floor(t * 30) });
    } else if (!beast && a1 >= 0 && a1 < .5) p.shock(DX, 0, .03, p.ph(a1, 0, .5), { R: R + .4, w: .22, ramp: RM });
    // ---- black droplets: when things burst out (1.35) and sink back (2.1), under gravity ----
    const nd = Math.round(5 * p.density);
    domes.forEach((s, si) => {
      for (const t0 of [s === BS ? 1.42 : 1.35, 2.1]) {
        for (let k = 0; k < nd; k++) {
          const a = t - t0 - p.r(k + si * 13, 81) * .06;
          if (a <= 0) continue;
          const d = p.rdir(k + si * 13 + (t0 > 2 ? 50 : 0), 83, .85), v = 1.6 + 1.6 * p.r(k + si * 13, 84);
          const z = d[2] * v * a - 4.9 * a * a;
          if (z < 0 && a > .05) continue;
          p.ball(s.x + d[0] * v * .5 * a, s.y + d[1] * v * .5 * a, Math.max(.03, z), .045 + .025 * p.r(k, 85), IK, { shadow: false });
        }
      }
    });
  },
  // wolf-like head of solid triangles; returns { light() } to draw its rim, teeth and eyes after the solids
  wolf(p, h, d, hs, jaw, alpha, t) {
    const IK = this.palette.hide, RM = this.palette.rim, EY = this.palette.eye, v = p.v3;
    let side = v.cross([0, 0, 1], d);
    if (Math.hypot(side[0], side[1], side[2]) < .1) side = [0, 1, 0];
    side = v.norm(side);
    const up = v.cross(d, side), P = (f, s, u) => [h[0] + d[0] * f + side[0] * s + up[0] * u, h[1] + d[1] * f + side[1] * s + up[1] * u, h[2] + d[2] * f + side[2] * s + up[2] * u];
    const op = jaw;
    const back = P(-.5 * hs, 0, .35 * hs), brow = P(.35 * hs, 0, .5 * hs), cL = P(0, .5 * hs, .05 * hs), cR = P(0, -.5 * hs, .05 * hs);
    const nose = P(1.7 * hs, 0, (.15 + .3 * op) * hs), nL = P(1.2 * hs, .2 * hs, (.1 + .3 * op) * hs), nR = P(1.2 * hs, -.2 * hs, (.1 + .3 * op) * hs);
    const jL = P(-.1 * hs, .32 * hs, -.25 * hs), jR = P(-.1 * hs, -.32 * hs, -.25 * hs), chin = P(1.4 * hs, 0, -(.35 + 1.0 * op) * hs), throat = P(-.2 * hs, 0, -.45 * hs);
    const o = { alpha };
    p.tri(back, cL, brow, IK, Object.assign({ shade: .8 }, o)); p.tri(back, cR, brow, IK, Object.assign({ shade: .63 }, o));
    p.tri(cL, brow, nL, IK, Object.assign({ shade: .91 }, o)); p.tri(cR, brow, nR, IK, Object.assign({ shade: .69 }, o));
    p.tri(brow, nL, nose, IK, Object.assign({ shade: .95 }, o)); p.tri(brow, nR, nose, IK, Object.assign({ shade: .74 }, o));
    p.tri(cL, cR, nose, IK, Object.assign({ shade: .46 }, o)); p.tri(back, cL, throat, IK, Object.assign({ shade: .52 }, o)); p.tri(back, cR, throat, IK, Object.assign({ shade: .41 }, o));
    p.tri(jL, jR, chin, IK, Object.assign({ shade: .52 }, o)); p.tri(throat, jL, chin, IK, Object.assign({ shade: .63 }, o)); p.tri(throat, jR, chin, IK, Object.assign({ shade: .43 }, o));
    const ears = [];
    for (const sg of [1, -1]) {
      const e0 = P(-.15 * hs, sg * .38 * hs, .4 * hs), e1 = P(-.45 * hs, sg * .22 * hs, .45 * hs), tip = P(-.55 * hs, sg * .5 * hs, 1.25 * hs);
      p.tri(e0, e1, tip, IK, Object.assign({ shade: .74 }, o));
      ears.push([e0, tip]);
    }
    return {
      light() {
        const I = alpha;
        if (I <= .05) return;
        // cold halo just behind the head: hidden by the solid, it shows as a rim round the silhouette
        const cf = p.cam();
        for (const [f, u, r] of [[-.1, .2, .85], [.6, .05, .75], [1.25, -.1 * op, .6]]) {
          const hc = P(f * hs, 0, u * hs);
          p.glow(hc[0] - cf.fwd[0] * hs * .7, hc[1] - cf.fwd[1] * hs * .7, hc[2] - cf.fwd[2] * hs * .7, hs * r, RM, .8 * I, { pow: 1.2 });
        }
        p.line(back, brow, hs * .14, RM, .8 * I); p.line(brow, nose, hs * .12, RM, .95 * I, { w1: hs * .06 });
        p.line(jL, chin, hs * .12, RM, .85 * I, { w1: hs * .06 }); p.line(cL, nL, hs * .1, RM, .7 * I);
        for (const [e0, tip] of ears) p.line(e0, tip, hs * .12, RM, .9 * I, { w1: .01 });
        for (let k = 0; k < 4; k++) {
          const f = .55 + k * .28, tu = v.lerp(P(f * hs, 0, (.08 + .3 * op) * hs), nose, k * .05), tl = v.lerp(P(f * hs * .95, 0, -(.3 + .9 * op * f / 1.6) * hs), chin, k * .05);
          p.line(tu, v.lerp(tu, tl, .32), hs * .09, EY, 1.1 * I, { w1: .01 }); p.line(tl, v.lerp(tl, tu, .32), hs * .09, EY, 1.1 * I, { w1: .01 });
        }
        for (const sg of [1, -1]) { const e = P(.55 * hs, sg * .26 * hs, .42 * hs); p.dot(e[0], e[1], e[2], EY, 1.5 * I, 2); }
        if (op > .3) { const m0 = P(.2 * hs, 0, -.05 * hs), m1 = v.lerp(nose, chin, .5); p.line(m0, m1, hs * .5 * op, RM, .5 * I, { w1: hs * .15 }); }
      },
    };
  },
});
