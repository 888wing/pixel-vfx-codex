// 蝠彈連爆 / Bat Bomb Barrage — Ultimates pack (original design): dark bat-shaped bombs circle the target, dive in one by one and end in one big blast
PXFX.define({
  id: 'bat-bomb-barrage',
  loop: 5.0,
  beats: [
    { t: .95, kind: 'cast', power: .7 },
    { t: 2.65, kind: 'pulse', power: .45 }, { t: 2.81, kind: 'pulse', power: .45 }, { t: 2.97, kind: 'pulse', power: .45 },
    { t: 3.13, kind: 'pulse', power: .45 }, { t: 3.29, kind: 'pulse', power: .45 }, { t: 3.45, kind: 'pulse', power: .5 },
    { t: 3.62, kind: 'hit', power: 1.4 },
  ],
  view: { r: 3.4, h: 3.0 },
  stage: { ground: 'marble', tiles: true },
  modules: ['figure', 'charge', 'swarm', 'creature', 'shockwave', 'impact', 'aftermath'],
  palette: {
    bat: ['#140e1a', '#21172a', '#30223c', '#43304f'],
    ember: ['#a8321c', '#e0542a', '#ff8a3a', '#ffc070', '#fff0c8'],
    hex: ['#5a2a8a', '#8a3ec0', '#c070f0', '#f0c8ff'],
    smoke: ['#1c1620', '#2c2430', '#3e3442', '#524656'],
    dust: ['#8a8078', '#a29a90', '#bab2a8', '#d0c8be'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者高舉雙臂（0.35 秒）', en: 'pose: the caster raises both arms overhead (0.35 s)' },
    { k: 'charge', t: [.35, .95], zh: '集氣：頭頂凝聚一顆暗色實心球（半徑 0.28，橙色發光外緣），黑煙繞球旋轉、橙色光點匯聚；發射前 0.1 秒球體收縮', en: 'charge: a dark solid orb gathers overhead (radius 0.28, glowing orange rim), black smoke wisps circle it and orange motes converge; it contracts in the last 0.1 s' },
    { k: 'shape', t: [.95, 1.05], zh: '成形：暗球爆開成 6 隻蝙蝠形炸彈（暗色實心身體、三角翼拍動、橙色眼睛與發光核心），施法者雙臂向外甩開', en: 'shape: the orb bursts into 6 bat-shaped bombs (dark solid bodies, flapping triangle wings, orange eyes and a glowing core) as the caster flings both arms outwards' },
    { k: 'motion', t: [1.05, 3.45], zh: '推進：蝙蝠以弧線飛到目標上空，繞半徑 0.85 的圓上下起伏盤旋並拖黑煙；2.35 秒起逐一沿彎曲追蹤路徑加速俯衝，每隔 0.16 秒引爆一隻（橙紫小爆炸：光暈、小衝擊環、8 粒火花、煙團）', en: 'motion: the bats arc over to the target and circle it at radius 0.85, bobbing and trailing black smoke; from 2.35 s they dive one by one on curved homing paths, accelerating, one detonating every 0.16 s (small orange-violet blasts: glow, small shock ring, 8 sparks, a smoke puff)' },
    { k: 'impact', t: [3.62, 4.0], zh: '命中：最後一次大爆炸——大白閃、半徑 2.4 的地面衝擊波＋塵煙、豎立衝擊環、24 粒火花、放射速度線', en: 'impact: one final big blast: a large white flash, a ground shockwave of radius 2.4 with smoke, an upright shock ring, 24 sparks, radial speed lines' },
    { k: 'after', t: [4.0, 5.0], zh: '餘波：黑煙柱上升散去，地面焦痕發橙光後淡出，施法者放下手臂', en: 'aftermath: a black smoke column rises and thins, the scorch glows orange then fades, the caster lowers the arm' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→雙手高舉→向外甩開→指向目標（指揮）→待機', en: 'caster: faceless mannequin, poses idle → both arms up → flung outwards → pointing at the target (directing) → idle' },
    { zh: '蝙蝠炸彈：暗色實心球身與頭、兩個小耳三角、每邊兩片三角翼（翼尖上下拍動，每秒約 4 次），身後放一個較大的橙色光暈令身體出現發光輪廓，頭前 2 粒橙色眼點', en: 'bat bomb: a dark solid body and head, two small ear triangles, two triangle wing panels per side (tips flapping about 4 times a second), a larger orange glow behind the body so it shows a glowing rim, 2 orange eye pixels on the head' },
    { zh: '盤旋：沿目標上方圓軌道繞圈，高度正弦起伏，每隻身後 4 團漸淡黑煙（抖色透明實心球）', en: 'orbit: circling on a ring above the target with sine bobbing, each bat trailing 4 fading black smoke puffs (dithered soft solids)' },
    { zh: '俯衝：由軌道位置經向上偏移的控制點以二次貝茲曲線追向目標，加速並沿速度方向拉長', en: 'dive: a quadratic Bezier from the orbit position through a raised control point into the target, accelerating and stretched along its velocity' },
    { zh: '連爆：每隻引爆＝橙色光暈＋紫色外暈＋面向鏡頭的小衝擊環＋8 粒火花＋2 團煙，時間錯開形成節奏', en: 'chain blasts: each detonation = orange glow + violet outer glow + a small camera-facing shock ring + 8 sparks + 2 smoke puffs, staggered in time for rhythm' },
    { zh: '終爆：大光暈、地面衝擊波與塵煙、豎立衝擊環、24 粒火花、速度線，8 團黑煙柱上升，地面橙光焦痕淡出', en: 'finale: a big halo, a ground shockwave with smoke, an upright shock ring, 24 sparks, speed lines, an 8-puff black smoke column rising, an orange-glowing scorch that fades' },
  ],
  params: {
    bombs: { zh: '蝙蝠炸彈數量', en: 'bomb count', min: 3, max: 10, step: 1, value: 6 },
    orbit: { zh: '盤旋半徑', en: 'orbit radius', min: .5, max: 1.4, step: .05, value: .85 },
    blast: { zh: '爆炸大小', en: 'explosion size', min: .5, max: 1.6, step: .05, value: 1 },
  },
  // one bat: dark solid body, flapping wings, glowing rim and eyes. d = heading, st = stretch along it
  bat(p, pos, d, k, t, sc, st) {
    const BT = this.palette.bat, OR = this.palette.ember, v = p.v3;
    let side = v.cross([0, 0, 1], d);
    if (Math.hypot(side[0], side[1]) < .2) side = [0, 1, 0];
    side = v.norm(side);
    const up = v.cross(d, side), at = (o, a, b, c) => [pos[0] + d[0] * a + side[0] * b + up[0] * c, pos[1] + d[1] * a + side[1] * b + up[1] * c, pos[2] + d[2] * a + side[2] * b + up[2] * c];
    const f = Math.sin(t * 26 + k * 1.7), s = sc;
    // glow behind the body (away from the camera) so the solid shows a hot rim
    const cf = p.cam().fwd;
    p.glow(pos[0] - cf[0] * .22, pos[1] - cf[1] * .22, pos[2] - cf[2] * .22, .2 * s, OR, .85);
    p.ball(pos[0], pos[1], pos[2], .085 * s, BT, { shadow: false });
    if (st > 1.05) p.ball(...at(0, -.09 * s * st, 0, 0), .07 * s, BT, { shadow: false });
    const h = at(0, .1 * s, 0, .02 * s);
    p.ball(h[0], h[1], h[2], .06 * s, BT, { shadow: false });
    for (const sg of [1, -1]) {
      p.tri(at(0, .1 * s, sg * .025 * s, .05 * s), at(0, .09 * s, sg * .06 * s, .13 * s), at(0, .07 * s, sg * .055 * s, .04 * s), BT, { shade: .4 });
      const sh = at(0, .02 * s, sg * .05 * s, 0), tip = at(0, .02 * s, sg * .42 * s, f * .2 * s + .04 * s), mid = at(0, -.12 * s, sg * .25 * s, f * .1 * s - .02 * s), back = at(0, -.1 * s, sg * .05 * s, 0);
      p.tri(sh, tip, mid, BT, { shade: .35 + .25 * f });
      p.tri(sh, mid, back, BT, { shade: .3 + .2 * f });
    }
    for (const sg of [1, -1]) { const e = at(0, .15 * s, sg * .03 * s, .035 * s); p.dot(e[0], e[1], e[2], OR, 1.3, 1); }
    p.light(pos[0], pos[1], 0, .4, OR, .25);
  },
  boom(p, c, a, sz, k) {
    const OR = this.palette.ember, HX = this.palette.hex, SM = this.palette.smoke;
    if (a < 0 || a > 1.1) return;
    const fl = Math.pow(1 - p.ph(a, 0, .12), 2), u = p.ph(a, 0, .32);
    // smoke puffs after the flash (soft solids)
    for (let s = 0; s < 2; s++) {
      const q = p.ph(a, .06 + s * .05, 1.05);
      if (q > 0 && q < 1) p.ball(c[0] + (s - .5) * .2 * sz, c[1] + (p.r(k, 40 + s) - .5) * .3, c[2] + q * .7, (.1 + .16 * p.easeOutCubic(q)) * sz, SM, { alpha: (1 - q) * .8, rough: .5, shadow: false, seed: k * 3 + s });
    }
    if (fl > 0) { p.glow(c[0], c[1], c[2], (.22 + .45 * fl) * sz, OR, 1.5 * fl, { pow: 1.4 }); p.orb(c[0], c[1], c[2], .1 * sz * fl, OR, 1.4); }
    if (u < 1) {
      p.glow(c[0], c[1], c[2], (.35 + .35 * u) * sz, HX, .55 * (1 - u));
      p.ring(c[0], c[1], c[2], (.1 + .65 * p.easeOutExpo(u)) * sz, .07 * (1 - u) + .02, OR, 1 - u, { axis: p.cam().fwd });
    }
    const n = Math.round(8 * p.density);
    for (let s = 0; s < n; s++) {
      const life = .25 + p.r(k * 11 + s, 1) * .3, uu = a / life;
      if (uu >= 1) continue;
      const d = p.rdir(k * 11 + s, 2, .3), sp = 4 + p.r(k * 11 + s, 3) * 3, dd = p.drag(sp, 6, a) * sz, d0 = p.drag(sp, 6, Math.max(0, a - .04)) * sz;
      p.line([c[0] + d[0] * dd, c[1] + d[1] * dd, c[2] + d[2] * dd - 2 * a * a], [c[0] + d[0] * d0, c[1] + d[1] * d0, c[2] + d[2] * d0 - 2 * Math.max(0, a - .04) ** 2], .05, s % 3 ? OR : HX, 1 - uu * .6);
    }
    p.light(c[0], c[1], 0, 1.2 * sz, OR, Math.max(fl, .4 * (1 - u)));
  },
  draw(p, t) {
    const BT = this.palette.bat, OR = this.palette.ember, HX = this.palette.hex, SM = this.palette.smoke;
    const X0 = -2.1, HXD = 2.35, CAST = .95, FIN = 3.62, v = p.v3;
    const N = Math.round(p.param('bombs')), RO = p.param('orbit'), BS = p.param('blast');
    const gap = Math.min(.16, .95 / Math.max(1, N - 1)), det = k => 3.45 - (N - 1 - k) * gap;
    // ---- caster pose ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'bothUp', k: p.easeOutCubic(t / .35) };
    else if (t < CAST) pose = 'bothUp';
    else if (t < 1.3) pose = { a: 'bothUp', b: 'spread', k: p.easeOutBack(p.ph(t, CAST, CAST + .08), 1.6) };
    else if (t < 3.75) pose = { a: 'spread', b: 'point', k: p.easeOutCubic(p.ph(t, 1.3, 1.6)) };
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.75, 4.5)) };
    p.dummy(HXD, 0);
    const fig = p.figure(X0, 0, { pose });
    const E = [X0 + .05, 0, 2.05];
    // ---- scorch (ground first) ----
    if (t > det(0)) p.aftermath(HXD, 0, 1.1 * BS + .3, 'burn', { amt: (t < FIN ? .5 * p.ph(t, det(0), FIN) : 1) * (1 - p.ph(t, 4.4, 4.95)), ramp: OR, glow: t < FIN ? .4 : Math.pow(1 - p.ph(t, FIN, 4.6), 2), seed: 2 });
    // ---- charge: a dark orb with a hot rim over the raised hands ----
    if (t >= .3 && t < CAST + .05) {
      const g = p.easeOutCubic(p.ph(t, .3, .8)) * (1 - .3 * p.easeInCubic(p.ph(t, .82, CAST))), r = .28 * g + .02, cf = p.cam().fwd;
      p.ball(E[0], E[1], E[2], r, BT, { shadow: false });
      for (let k = 0; k < 5; k++) {
        const a = t * 5 + k / 5 * p.TAU, rr = r + .12;
        p.ball(E[0] + Math.cos(a) * rr, E[1] + Math.sin(a) * rr, E[2] + Math.sin(a * 2 + k) * .08, .07 * g + .01, SM, { alpha: .75, rough: .4, shadow: false, seed: k });
      }
      p.glow(E[0] - cf[0] * .4, E[1] - cf[1] * .4, E[2] - cf[2] * .4, r * 1.5 + .05, OR, .95 * g);
      p.charge(E[0], E[1], E[2], p.ph(t, .35, CAST), { n: 14, R: 1.1, ramp: OR, seed: 5, len: .25 });
      p.light(E[0], 0, 0, 1.2, OR, .4 * g);
    }
    const cb = t - CAST;
    if (cb >= 0 && cb < .3) {
      const fl = Math.pow(1 - p.ph(cb, 0, .14), 2);
      if (fl > 0) p.glow(E[0], E[1], E[2], .2 + .5 * fl, OR, 1.3 * fl, { pow: 1.4 });
      p.ring(E[0], E[1], E[2], .2 + .8 * p.easeOutExpo(p.ph(cb, 0, .3)), .05, HX, 1 - p.ph(cb, 0, .3), { axis: p.cam().fwd });
    }
    // ---- the bats: fly out, circle, dive, detonate ----
    const orb = (k, tt) => {
      const a = k / N * p.TAU + tt * 2.3, rr = RO * (1 + .08 * Math.sin(tt * 3 + k));
      return [HXD + Math.cos(a) * rr, Math.sin(a) * rr, 1.75 + .22 * Math.sin(tt * 4.5 + k * 1.3)];
    };
    const posAt = (k, tt) => {
      const t0 = CAST + k * .035, u = p.ph(tt, t0, t0 + .85), dk = det(k), ds = dk - .3;
      if (tt < ds) {
        if (u >= 1) return orb(k, tt);
        const e = p.ease(u), o = orb(k, tt), sd = (k % 2 ? 1 : -1) * (.5 + .5 * p.r(k, 9)), arc = Math.sin(Math.PI * u);
        return [p.lerp(E[0], o[0], e), p.lerp(E[1], o[1], e) + sd * arc * 1.2, p.lerp(E[2], o[2], e) + arc * .7];
      }
      const q = p.easeIn(p.ph(tt, ds, dk)), A = orb(k, ds), H = this.hitAt(p, k, HXD), Cp = [A[0] + (A[0] - HXD) * .5, A[1] * 1.5, A[2] + .6];
      const m = 1 - q;
      return [m * m * A[0] + 2 * m * q * Cp[0] + q * q * H[0], m * m * A[1] + 2 * m * q * Cp[1] + q * q * H[1], m * m * A[2] + 2 * m * q * Cp[2] + q * q * H[2]];
    };
    for (let k = 0; k < N; k++) {
      const t0 = CAST + k * .035, dk = det(k);
      if (t >= t0 && t < dk) {
        const pos = posAt(k, t), prev = posAt(k, Math.max(t0, t - .03)), dv = [pos[0] - prev[0], pos[1] - prev[1], pos[2] - prev[2]];
        const sp = Math.hypot(dv[0], dv[1], dv[2]) / .03, d = sp > .01 ? v.norm(dv) : [1, 0, 0];
        const sc = 1.25 * p.easeOutBack(p.ph(t, t0, t0 + .15), 2);
        // black smoke puffs left behind
        for (let j = 1; j <= 4; j++) {
          const tj = t - j * .08;
          if (tj < t0 + .1) break;
          const q = posAt(k, tj), al = (1 - j / 5) * .7;
          p.ball(q[0], q[1], q[2] - .02 * j, (.05 + .025 * j) * sc, SM, { alpha: al, rough: .5, shadow: false, seed: k * 5 + j });
        }
        this.bat(p, pos, d, k, t, sc, Math.min(1.8, 1 + sp * .08));
        if (t > dk - .3) p.line(prev, pos, .06, OR, .6, { w1: .02 });
      }
      this.boom(p, this.hitAt(p, k, HXD), t - dk, .9 * BS, k);
    }
    // ---- finale: one big shockwave + flash ----
    const a = t - FIN;
    if (a >= 0 && a < 1.4) {
      const C = [HXD, 0, .9], fl = Math.pow(1 - p.ph(a, 0, .18), 2);
      for (let s = 0; s < Math.round(8 * p.density); s++) {
        const q = p.ph(a, .05 + s * .04, 1.05);
        if (q <= 0 || q >= 1) continue;
        const ang = s * 2.4;
        p.ball(C[0] + Math.cos(ang) * .3 * BS, Math.sin(ang) * .3 * BS, .3 + q * 1.8 * Math.sqrt(BS) + (s % 8) * .05, (.2 + .3 * p.easeOutCubic(q)) * Math.sqrt(BS), SM, { alpha: (1 - q) * (1 - q) * .9, rough: .5, shadow: false, seed: 60 + s });
      }
      if (fl > 0) { p.glow(C[0], 0, C[2], (.5 + 1.2 * fl) * BS, OR, 1.7 * fl, { pow: 1.3 }); p.glow(C[0], 0, C[2], 1.6 * BS * fl, HX, .7 * fl); }
      p.shock(C[0], 0, 0, p.ph(a, 0, .6), { R: 2.4 * BS, w: .18, ramp: OR, dust: this.palette.dust, dustN: 14 });
      p.shock(C[0] - .1, 0, C[2], p.ph(a, 0, .45), { R: 1.8 * BS, w: .2, ramp: HX, axis: p.v3.norm([1, .35, .25]), light: false });
      if (a < .2) p.speedLines(C[0], 0, C[2], { n: 16, R0: .6 * BS, R1: 2.8, ramp: OR, I: 1 - a / .2, seed: Math.floor(t * 30) });
      const nS = Math.round(24 * p.density);
      for (let s = 0; s < nS; s++) {
        const life = .4 + p.r(s, 71) * .5, uu = a / life;
        if (uu >= 1) continue;
        const d = p.rdir(s, 72, .5), sp = (4 + p.r(s, 73) * 4) * Math.sqrt(BS), dd = p.drag(sp, 4.5, a), d0 = p.drag(sp, 4.5, Math.max(0, a - .05));
        const z = C[2] + d[2] * dd - 3 * a * a, z0 = C[2] + d[2] * d0 - 3 * Math.max(0, a - .05) ** 2;
        if (z < 0) continue;
        p.line([C[0] + d[0] * dd, d[1] * dd, z], [C[0] + d[0] * d0, d[1] * d0, z0], .05, s % 4 ? OR : HX, 1 - uu * .7);
      }
      p.light(C[0], 0, 0, 2.8 * BS, OR, Math.max(fl, .5 * (1 - p.ph(a, 0, .8))));
    }
  },
  // where bomb k detonates: scattered around the target's body
  hitAt(p, k, hx) { return [hx + Math.cos(k * 2.4) * .28, Math.sin(k * 2.4) * .38, .55 + .7 * p.r(k, 30)]; },
});
