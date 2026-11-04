// 墨潮縛絲 / Ink Tide Binding — Ultimates pack (original design): a slow ritual; black water floods the field and rises, then glowing white threads spiral around the target and snap tight
PXFX.define({
  id: 'ink-tide-binding',
  loop: 4.6,
  beats: [{ t: .5, kind: 'cast', power: .5 }, { t: 2.05, kind: 'pulse', power: .5 }, { t: 2.8, kind: 'hit', power: 1.4 }],
  view: { r: 3.3, h: 2.6 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'charge', 'domain', 'growth', 'impact', 'aftermath'],
  palette: {
    thread: ['#6a60a0', '#a49ad6', '#d8d0ff', '#f4f0ff', '#ffffff'],
    ripple: ['#3a3560', '#5a5288', '#8a80b8', '#c4bcec'],
    water: ['#04050a', '#080a12', '#0d1019', '#141824', '#1e2334'],
    ink: ['#0a0912', '#15121f', '#221d31', '#332c48'],
  },
  timeline: [
    { k: 'pose', t: [0, 1.1], zh: '起手：施法者 1.1 秒內緩緩張開雙臂（待機→張臂，緩入緩出），雙手泛出淡紫微光', en: 'pose: over 1.1 s the caster slowly spreads both arms (idle → spread, ease in-out); faint lavender light gathers in both hands' },
    { k: 'charge', t: [.5, 1.5], zh: '集氣：由施法者向外以抖色圓形擦除把背景換成墨黑天空；黑水由腳下向外漫開（半徑 0→5），水邊一圈淡紫波紋，每 0.45 秒由腳下擴出一圈漣漪', en: 'charge: a dithered radial wipe from the caster turns the background ink-black; black water spreads from the feet (radius 0 → 5) with a lavender ripple at its edge, and a ring ripples out from the feet every 0.45 s' },
    { k: 'shape', t: [1.3, 2.4], zh: '成形：近黑水面（實心平面）由地面升到 0.5 高，淹沒目標下半身與施法者雙腳；水面有淡紫高光條紋與散落漣漪；16 粒墨滴（帶淡紫邊光的暗色小球）由水面浮起', en: 'shape: a near-black solid water plane rises from the ground to 0.5, drowning the lower part of the target and the caster\'s feet; lavender gloss streaks and scattered ripples on the surface; 16 ink droplets (dark balls with a lavender rim) float up' },
    { k: 'motion', t: [2.05, 2.8], zh: '推進：5 條發光白線由水面圍著目標升起，各自不同相位與螺距螺旋纏繞（半徑 0.95→0.65，向上 1.45，相鄰兩條反向），越纏越慢越緊', en: 'motion: 5 glowing white threads rise from the water around the target and spiral up with their own phase and pitch (radius 0.95 → 0.65, 1.45 tall, neighbours turning opposite ways), slowing and tightening' },
    { k: 'impact', t: [2.8, 3.1], zh: '命中：施法者雙臂 0.06 秒內一合，白線同一格收緊到半徑 0.3 並變成 8 段拉直的折線，白色光暈照亮水面＋目標上 5 道交叉短斬線；0.1 秒後白線斷成碎段向外飄散', en: 'impact: the caster\'s arms close in 0.06 s and in the same frame the threads snap tight to radius 0.3 as straight 8-segment chords, a white glow lights the water and 5 short crossing cut lines on the target; 0.1 s later the threads break into drifting fragments' },
    { k: 'after', t: [3.1, 4.6], zh: '餘波：水面 0.65 秒內退回地面，黑水向施法者收回，天空由外向內退回原狀，光線恢復，施法者回到待機', en: 'aftermath: the water drains back to the ground in 0.65 s, the black flood recedes into the caster, the sky wipes back, the light returns and the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，待機→張臂（1.1 秒緩動）→命中時雙臂一合→待機', en: 'caster: faceless mannequin, idle → arms spread (1.1 s ease) → arms snap shut on the hit → idle' },
    { zh: '領域：天空換成墨黑（3 階藍黑＋暗雲），人物與目標壓暗約 45%；地面以施法者為圓心的近黑墨跡擴張成黑水', en: 'domain: the sky becomes ink-black (3 blue-black bands plus dark clouds), caster and target darkened ~45 %; a near-black ink stain spreads from the caster as the flood' },
    { zh: '水位：半徑 3 的實心近黑圓盤（分成 4 圈小三角形，透視下深度才準）＋側邊裙板，由 z 0 升到 0.5，遮住目標下半部；表面用貼花畫稀疏淡紫高光條紋', en: 'water level: a solid near-black disc of radius 3 (split into 4 rings of small triangles so perspective depth stays right) with a side skirt rises from z 0 to 0.5 and hides the lower target; a decal paints sparse lavender gloss streaks on its surface' },
    { zh: '漣漪：淡紫細圓環貼在水面，ease-out-cubic 擴大到 0.6–1.2 並變暗，腳下週期 0.45 秒，另有 8 處隨機位置', en: 'ripples: thin lavender rings on the water surface grow with ease-out-cubic to 0.6–1.2 and fade; one from the feet every 0.45 s plus 8 at random spots' },
    { zh: '墨滴：16 粒半徑 0.04–0.08 的暗色實心球由水面浮起並左右擺動，背後偏移的淡紫光暈只在球外露出一圈邊光（不用加法畫黑）', en: 'ink droplets: 16 dark solid balls (radius 0.04–0.08) float up from the water and sway; a lavender glow offset behind each shows only as a rim (black is never drawn as light)' },
    { zh: '白線：每條 24 點的螺旋折線（p.trail，寬 0.035），由水面向上長出；命中時半徑一格收緊，之後用噪聲切成碎段向外飄並淡出', en: 'threads: each a 24-point helix polyline (p.trail, width 0.035) growing up from the water; snaps tight in one frame on the hit, then noise cuts it into fragments that drift out and fade' },
    { zh: '命中：目標中心白色光暈、5 道 0.9 長交叉斬線（0.25 秒），水面一圈衝擊漣漪', en: 'impact: a white glow at the target, 5 crossing 0.9-long cut lines (0.25 s), one shock ripple on the water' },
  ],
  params: {
    waterLevel: { zh: '水位高度', en: 'water level', min: .2, max: .8, step: .05, value: .5 },
    threads: { zh: '白線數量', en: 'thread count', min: 2, max: 8, step: 1, value: 5 },
    darkness: { zh: '環境壓暗', en: 'darkness', min: .2, max: 1, step: .05, value: .7 },
    ripples: { zh: '漣漪數量', en: 'ripple count', min: 0, max: 16, step: 1, value: 8 },
  },
  SKY: { top: '#05060a', bottom: '#0d1019', nebula: '#121722', stars: 0 },
  draw(p, t) {
    const P = this.palette, TH = P.thread, RP = P.ripple, WA = P.water, IK = P.ink, TAU = p.TAU;
    const X0 = -1.8, HX = 2.35, SNAP = 2.8, RW = 3.0;
    // ---- caster: slow spread, arms snap shut on the hit ----
    let pose;
    if (t < 1.1) pose = { a: 'idle', b: 'spread', k: p.ease(t / 1.1) };
    else if (t < SNAP - .06) pose = 'spread';
    else if (t < SNAP) pose = { a: 'spread', b: 'guard', k: p.easeInCubic((t - SNAP + .06) / .06) };
    else if (t < 3.4) pose = 'guard';
    else pose = { a: 'guard', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.4, 4.3)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose });

    // ---- water level: rises after the flood, drains after the hit ----
    const lvl = p.param('waterLevel') * (t < SNAP ? p.ease(p.ph(t, 1.3, 2.4)) : 1 - p.ease(p.ph(t, 3.15, 3.8)));
    if (lvl > .01) {
      // a disc split into rings: small triangles keep the 3D (perspective) depth accurate against the ground
      const N = 28, RS = [0, .8, 1.6, 2.3, RW], at = (ri, k) => { const a = k / N * TAU; return [Math.cos(a) * RS[ri], Math.sin(a) * RS[ri], lvl]; };
      for (let ri = 0; ri < RS.length - 1; ri++) for (let k = 0; k < N; k++) {
        if (ri === 0) p.tri([0, 0, lvl], at(1, k), at(1, k + 1), WA, { shade: .25 });
        else p.quad(at(ri, k), at(ri + 1, k), at(ri + 1, k + 1), at(ri, k + 1), WA, { shade: .25 });
      }
      for (let k = 0; k < N; k++) {
        const A = at(RS.length - 1, k), B = at(RS.length - 1, k + 1);
        p.quad([A[0], A[1], 0], [B[0], B[1], 0], B, A, WA, { shade: .55 });
      }
    }
    // ---- ink droplets float up from the surface (solids; their rims are drawn as light later) ----
    const drops = [], nDr = t > 1.3 && t < 3.6 ? Math.round(16 * p.density) : 0;
    for (let k = 0; k < nDr; k++) {
      const born = 1.35 + p.r(k, 1) * 1.6, life = 1 + p.r(k, 2) * .7, u = (t - born) / life;
      if (u <= 0 || u >= 1) continue;
      const ang = p.r(k, 3) * TAU, rad = .4 + Math.sqrt(p.r(k, 4)) * 2.3;
      const x = .3 + Math.cos(ang) * rad + Math.sin(t * 3 + k) * .06, y = Math.sin(ang) * rad * .85;
      const z = lvl + .05 + p.drag(1.6, 1.4, t - born), r = (.04 + p.r(k, 5) * .04) * (1 - Math.pow(u, 3));
      p.ball(x, y, z, r, IK, { shadow: false, flat: true });
      drops.push([x, y, z, r, 1 - u]);
    }

    // ---- the ink world: sky wipe from the caster, solids darkened ----
    const amt = t < SNAP ? p.ease(p.ph(t, .4, 1.5)) : 1 - p.ease(p.ph(t, 3.35, 4.2));
    if (amt > 0) p.domain({ amt, c: [X0, 0, .8], sky: this.SKY, solids: .65 * p.param('darkness') * amt, t });
    // black water floods out from the feet over the ground, recedes at the end
    const flood = t < SNAP ? 5 * p.easeOutCubic(p.ph(t, .45, 1.45)) : 5 * (1 - p.easeInCubic(p.ph(t, 3.5, 4.35)));
    if (flood > .05) p.stain(X0, 0, flood, (dx, dy, rho) => (rho < flood - .08 * p.noise(dx * 3, dy * 3) ? 1.2 : 0), '#05060b', 1);

    // ---- light: hands, flood edge, ripples, gloss ----
    if (t > .3 && t < 1.6) {
      const hI = p.env(t, .3, .9, 1.2, 1.6);
      for (const h of [fig.hand, fig.handL]) p.glow(h[0], h[1], h[2], .2, RP, .8 * hI);
      p.charge(X0, 0, 1.05, p.ph(t, .3, 1.5), { n: 10, R: 1.2, ramp: RP, I: .6, len: .15, up: -.4 });
    }
    if (flood > .05 && flood < 4.9 && t < SNAP) p.ring(X0, 0, .01, flood, .05, RP, .7, { fn: ang => (Math.hypot(X0 + Math.cos(ang) * flood, Math.sin(ang) * flood) < RW * .98 ? 1 : 0) });
    const zs = lvl + .005;
    if (amt > 0 && t < 3.9) {
      // gloss streaks on the water surface
      if (lvl > .01) {
        const g = p.ph(lvl, 0, .2);
        p.decal(0, 0, zs, RW * .97, (x, y) => {
          const s = p.noise(x * .7 + t * .25, y * 4 + 3), w = Math.abs(s - .5);
          return w < .018 && p.noise(x * 1.3 + 9, y * 2) > .45 ? .6 : 0;
        }, RP, .75 * g * amt);
      }
      // ripples from the feet, then at random spots
      const base = t < SNAP ? 1 : 1 - p.ph(t, SNAP, 3.6);
      for (let k = 0; k < 6; k++) {
        const b = .5 + k * .45, u = p.ph(t, b, b + 1.1);
        if (u <= 0 || u >= 1) continue;
        p.ring(X0, 0, zs, .2 + 1.1 * p.easeOutCubic(u), .035, RP, .6 * Math.pow(1 - u, 1.5) * base);
      }
      const nR = Math.round(p.param('ripples') * p.density);
      for (let k = 0; k < nR; k++) {
        const b = 1.4 + p.r(k, 11) * 1.8, u = p.ph(t, b, b + .9);
        if (u <= 0 || u >= 1) continue;
        const ang = p.r(k, 12) * TAU, rad = .6 + p.r(k, 13) * 2;
        p.ring(.3 + Math.cos(ang) * rad, Math.sin(ang) * rad * .85, zs, .1 + (.5 + p.r(k, 14) * .4) * p.easeOutCubic(u), .03, RP, .55 * Math.pow(1 - u, 1.5));
      }
    }
    // droplet rims: a glow pushed behind each ball shows only around its silhouette
    const cm = p.cam();
    for (const [x, y, z, r, f] of drops) p.glow(x - cm.fwd[0] * .18, y - cm.fwd[1] * .18, z - cm.fwd[2] * .18, r * 1.9, RP, .9 * f);

    // ---- threads: rise and spiral around the target, snap tight in one frame, then break ----
    const nT = Math.round(p.param('threads')), TB = 2.05;
    if (t > TB && t < SNAP + .55) {
      const snapped = t >= SNAP, a = t - SNAP;
      const loose = .95 - .3 * p.ease(p.ph(t, TB, SNAP)), R = snapped ? .3 + .05 * Math.exp(-a * 18) * Math.cos(a * 60) : loose;
      const spin = 2.4 * (1 - Math.pow(1 - p.ph(Math.min(t, SNAP), TB, SNAP), 2));
      const brk = snapped ? p.ph(a, .08, .5) : 0;
      for (let j = 0; j < nT; j++) {
        // each strand has its own phase, pitch and start height; taut chords once snapped
        const a0 = j / nT * TAU + p.r(j, 31) * .6, turns = .75 + p.r(j, 32) * .45, z0 = p.r(j, 33) * .2;
        const grow = p.easeOutCubic(p.ph(t, TB + j * .06, TB + j * .06 + .55)), S = snapped ? 8 : 24, pts = [];
        for (let k = 0; k <= S; k++) {
          const s = k / S * grow, ang = a0 + s * turns * TAU + spin * (1 - s * .4) * (j % 2 ? -1 : 1);
          const rr = R * (1 - .2 * s) + (snapped ? 0 : Math.sin(s * 7 + t * 4 + j * 2) * .06);
          pts.push([HX + Math.cos(ang) * rr, Math.sin(ang) * rr, lvl + .02 + z0 + s * 1.45]);
        }
        const I = snapped ? (a < .05 ? 1.6 : 1.2) * (1 - brk * .5) : .45 + .35 * grow;
        if (!brk) { p.trail(pts, snapped ? .05 : .035, .02, TH, I, I * .7); continue; }
        // broken: noise cuts the strand into fragments that drift outwards and fade
        for (let k = 0; k < S * 2; k++) {
          if (p.noise(k * .9 + j * 7, 3.1) < brk * 1.1) continue;
          const A = pts[k >> 1], B = pts[(k >> 1) + 1], f0 = (k & 1) * .5, q0 = p.v3.lerp(A, B, f0), q1 = p.v3.lerp(A, B, f0 + .5);
          const push = p.drag(1.4, 4, a - .08) * (.6 + p.r(j * 31 + k, 7)), dx = (q0[0] - HX) * push, dy = q0[1] * push;
          p.line([q0[0] + dx, q0[1] + dy, q0[2] + push * .2], [q1[0] + dx, q1[1] + dy, q1[2] + push * .2], .035, TH, I * (1 - brk));
        }
      }
    }
    // ---- impact: flash, cut lines, shock ripple ----
    const a = t - SNAP;
    if (a >= 0 && a < .6) {
      const fl = Math.pow(1 - p.ph(a, 0, .16), 2);
      if (fl > 0) { p.glow(HX, 0, 1.0, .35 + .8 * fl, TH, 1.5 * fl, { pow: 1.4 }); p.light(HX, 0, 0, 2.4, TH, fl); }
      for (let k = 0; k < 5; k++) {
        const ang = k / 5 * Math.PI + .35 + p.r(k, 21) * .3, c0 = [HX + cm.fwd[0] * .4, cm.fwd[1] * .4, .55 + p.r(k, 22) * .9 + cm.fwd[2] * .4], L = .45;
        const d = [cm.right[0] * Math.cos(ang) + cm.up[0] * Math.sin(ang), cm.right[1] * Math.cos(ang) + cm.up[1] * Math.sin(ang), cm.right[2] * Math.cos(ang) + cm.up[2] * Math.sin(ang)];
        p.slash([c0[0] - d[0] * L, c0[1] - d[1] * L, c0[2] - d[2] * L], [c0[0] + d[0] * L, c0[1] + d[1] * L, c0[2] + d[2] * L], { u: p.ph(a, k * .015, .25 + k * .015), w: .07, ramp: TH, I: 1.4 });
      }
      p.shock(HX, 0, zs, p.ph(a, 0, .55), { R: 1.8, w: .12, ramp: RP, light: false });
    }
  },
});
