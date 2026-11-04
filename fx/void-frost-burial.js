// 虛域冰葬 / Void Frost Burial — Ultimates pack (original design): the field drops into dark space over a black mirror floor, white crystals grow up from under the target until it is encased, a beat of stillness, then everything shatters
PXFX.define({
  id: 'void-frost-burial',
  loop: 4.6,
  beats: [{ t: .75, kind: 'cast', power: .9 }, { t: 2.1, kind: 'hit', power: 1.2 }, { t: 2.45, kind: 'burst', power: 1.4 }],
  view: { r: 3.4, h: 2.8 },
  stage: { ground: 'slate', tiles: true, r: 3.2 },
  modules: ['figure', 'charge', 'domain', 'growth', 'impact', 'debris', 'shockwave', 'aftermath'],
  palette: {
    frost: ['#4f7fb8', '#7fb2e0', '#bfe8ff', '#e6f7ff', '#ffffff'],
    ice: ['#5a6f96', '#8aa2c4', '#bcd2ea', '#e4f1fb', '#ffffff'],
    mirror: ['#05050b', '#0a0a14', '#10101d', '#171728'],
    echo: ['#3a3026', '#54452f', '#6e5c40'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿轉為架式', en: 'pose: the caster shifts from idle into a stance' },
    { k: 'charge', t: [.35, .75], zh: '集氣：手收到身側，10–16 粒冰藍光點匯聚到掌心，掌心一點白光', en: 'charge: the hand draws back, 10–16 ice-blue motes converge on the palm, which holds a white point' },
    { k: 'shape', t: [.75, 1.05], zh: '成形：掌一推（0.06 秒），以施法者為圓心 0.3 秒抖色擦除：背景換成深紫黑虛空（暗雲＋淡紫星點），地面變成近黑鏡面；鏡面上出現光澤條紋與閃爍的倒影星點', en: 'shape: a 0.06 s palm thrust and a 0.3 s dithered wipe from the caster: the background becomes a violet-black void (dark clouds, pale violet stars) and the ground a near-black mirror with gloss streaks and twinkling reflected stars' },
    { k: 'motion', t: [.95, 2.1], zh: '推進：白色冰晶分 3 波由目標腳下長出（0.95、1.35、1.75 秒，圈半徑 0.55→0.38→0.18，高度 0.45→0.72→1.08 倍，ease-out-back 衝過頭再回），生長前沿的尖端發亮；霜線沿目標身體由下往上爬到 1.7 高，半透明冰塊同步由腳下往上包住目標；每根冰晶在鏡面上有一條向鏡頭延伸的倒影光帶（到島邊被切斷）', en: 'motion: white crystals grow from under the target in 3 waves (0.95, 1.35, 1.75 s; ring radius 0.55 → 0.38 → 0.18; height ×0.45 → 0.72 → 1.08; ease-out-back overshoot), their growing tips glowing; a frost line crawls up the target to 1.7 while a see-through ice block closes over it from the feet up; every crystal casts a reflection band on the mirror stretching towards the camera, cut off at the island edge' },
    { k: 'impact', t: [2.1, 2.5], zh: '命中：最後一波合攏完全封住目標，一下藍白閃光；之後約 0.35 秒完全靜止；2.45 秒全部同時碎裂：白閃、14 條放射速度線、鏡面衝擊環、碎冰片向外飛散（鏡面上同步有倒影閃光）', en: 'impact: the last wave closes and encases the target with a blue-white flash; then ~0.35 s of total stillness; at 2.45 s everything shatters at once: white flash, 14 radial speed lines, a shock ring on the mirror, ice pieces flying out (the burst is mirrored in the floor)' },
    { k: 'after', t: [2.5, 4.6], zh: '餘波：虛空 0.6 秒內由外向施法者退回原狀，碎冰落地縮小消失，地面霜跡 1.2 秒淡出，施法者回到待機', en: 'aftermath: the void wipes back towards the caster in 0.6 s, the ice pieces land and shrink away, the frost mark fades over 1.2 s, the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，待機→架式→收掌→推掌（0.06 秒）→待機', en: 'caster: faceless mannequin, idle → stance → palm drawn back → palm thrust (0.06 s) → idle' },
    { zh: '領域：虛空預設天空（深紫黑漸層＋暗紫雲＋淡紫星點），地面映射到 4 階近黑藍紫，人物壓暗 35%', en: 'domain: the void sky preset (violet-black gradient, dark violet clouds, pale violet stars), the ground remapped to 4 near-black blue-violet tones, figures darkened 35 %' },
    { zh: '鏡面倒影：光線畫不到地面以下，所以把倒影直接畫在地面上：物體高度 z 的倒影落在沿鏡頭方向偏移 z×(水平/垂直分量) 的地面點；冰晶倒影是由底部延伸到倒影尖端的冰藍光帶，目標倒影是一條暗稻草色光帶，加上沿畫面水平方向的光澤短條紋與 20 粒閃爍倒影星點', en: 'mirror reflections: light below z = 0 is hidden by the ground, so reflections are painted on the ground plane: a point at height z reflects to the ground point offset along the camera direction by z × (horizontal / vertical component); crystals reflect as ice-blue bands from base to mirrored tip, the target as a dim straw-coloured band, plus gloss streaks along the screen horizontal and 20 twinkling reflected stars' },
    { zh: '冰晶：p.spikes 沿目標腳下的小圓圈生長，3 波共 18 根白色雙錐體，越內圈越高越粗（寬 0.22→0.4），尖端在生長時有光暈', en: 'crystals: p.spikes along small rings under the target, 3 waves totalling 18 white bipyramids, inner rings taller and thicker (0.22 → 0.4 wide), glowing tips while they grow' },
    { zh: '霜爬與冰封：目標身體前方 14 粒冰藍光點與一圈霜線，由地面升到 1.7；同時一個半徑 0.46 的抖色半透明冰色膠囊體（覆蓋率 35%→65%）由腳下長到 1.75 包住目標；地面以目標為中心一片白色霜跡', en: 'frost crawl and encasing: 14 ice-blue points and a frost ring on the target\'s front rising from the ground to 1.7, while a dithered see-through ice capsule (radius 0.46, 35 % → 65 % coverage) grows from the feet to 1.75 around the target; a white frost mark on the floor around it' },
    { zh: '碎裂：26 片冰片（前 8 片是 0.4–0.6 大塊）帶旋轉向外飛、受重力落地、2 秒內縮小消失，頭 0.7 秒帶反光線；鏡面衝擊環、放射速度線、白閃', en: 'shatter: 26 ice pieces (the first 8 are 0.4–0.6 chunks) spin out, fall under gravity and shrink away within 2 s, with glint lines for 0.7 s; a shock ring on the mirror, radial speed lines and a white flash' },
  ],
  params: {
    crystals: { zh: '冰晶數量', en: 'crystal count', min: 8, max: 30, step: 1, value: 18 },
    height: { zh: '冰晶高度', en: 'crystal height', min: 1, max: 2.4, step: .05, value: 1.8 },
    reflection: { zh: '鏡面倒影強度', en: 'reflection strength', min: 0, max: 1, step: .05, value: .7 },
    pieces: { zh: '碎冰片數量', en: 'shatter pieces', min: 8, max: 44, step: 1, value: 26 },
  },
  WAVES: [[.95, .55, .45, .22, .25], [1.35, .38, .72, .3, .33], [1.75, .18, 1.08, .42, .42]],   // start, ring radius, height, width, share
  // ground point where a point at height z appears reflected (same screen pixel as (x, y, -z))
  mirror(p, x, y, z) {
    if (p.mode === '2d') return [x, y + z / .55];
    const f = p.cam().fwd, k = z / Math.max(.2, f[2]);
    return [x + f[0] * k, y + f[1] * k];
  },
  // reflection band from a ground base point to the mirrored point of a tip, cut off at the island edge
  reflect(p, base, tip, w, ramp, I0, I1, RI) {
    const m = this.mirror(p, tip[0], tip[1], tip[2]), dx = m[0] - base[0], dy = m[1] - base[1];
    let s = 1;
    const a = dx * dx + dy * dy, b = 2 * (base[0] * dx + base[1] * dy), c = base[0] * base[0] + base[1] * base[1] - RI * RI;
    if (c >= 0) return;
    if (a > 1e-6) s = Math.min(1, (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a));
    p.line([base[0], base[1], .004], [base[0] + dx * s, base[1] + dy * s, .004], w, ramp, I0, { w1: w * (1 - s * .6), i1: I0 + (I1 - I0) * s });
  },
  draw(p, t) {
    const P = this.palette, FR = P.frost, IC = P.ice, TAU = p.TAU;
    const X0 = -2.0, HX = 1.6, CAST = .75, ENCASE = 2.1, SHATTER = 2.45, RI = 2.95;
    const HS = p.param('height'), NC = p.param('crystals'), RF = p.param('reflection');
    // ---- caster ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .35) };
    else if (t < CAST) pose = { a: 'ready', b: 'charge', k: p.easeOutBack(p.ph(t, .35, .7), 1.3) };
    else if (t < CAST + .06) pose = { a: 'charge', b: 'palm', k: p.easeInCubic((t - CAST) / .06) };
    else if (t < 3.0) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.0, 3.9)) };
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose });
    const broken = t >= SHATTER, a = t - SHATTER;

    // ---- crystals: 3 waves of spikes on shrinking rings under the target ----
    const crystals = [];
    if (!broken) this.WAVES.forEach(([t0, R, hk, wid, share], w) => {
      const n = Math.max(2, Math.round(NC * share)), u = p.ph(t, t0, t0 + .38);
      if (u <= 0) return;
      const path = s => { const an = s * TAU * (n - 1) / n + w * .7; return [HX + Math.cos(an) * R, Math.sin(an) * R]; };
      const tips = p.spikes(path, u, { n, h: HS * hk, wid, ramp: IC, spread: .55, rise: .42, seed: w * 10 + 3, sides: 4 });
      for (const tp of tips) crystals.push({ base: path(n > 1 ? tp[3] / (n - 1) : 0), tip: [tp[0], tp[1], tp[2]], l: tp[4], wid });
    });
    // ice block closing over the target: a see-through (dithered) capsule that grows up with the frost front
    if (!broken && t > 1.0) {
      const top = 1.75 * p.ease(p.ph(t, 1.0, ENCASE)), al = .35 + .3 * p.ph(t, 1.6, ENCASE);
      if (top > .1) p.capsule([HX, 0, .05], [HX, 0, top], .46, .4, IC, { alpha: al, shadow: false });
    }
    // ---- shatter pieces (solids) ----
    const pieces = [], nP = broken && a < 2 ? Math.round(p.param('pieces') * p.density) : 0;
    for (let j = 0; j < nP; j++) {
      const big = j < 8, life = (big ? 1.5 : 1.1) + p.r(j, 15) * .5, shrink = 1 - p.easeInCubic(p.ph(a, life * .55, life));
      if (shrink <= .02) continue;
      const ang = p.r(j, 12) * TAU, r0 = .1 + p.r(j, 11) * .4, h0 = .15 + p.r(j, 13) * HS * (big ? .6 : .9);
      const sp = (big ? 1.2 : 2.2) + p.r(j, 14) * (big ? 1 : 2.4), up = .4 + p.r(j, 16) * 1.1, d = p.drag(sp, 2.6, a);
      const len = (big ? .4 + p.r(j, 17) * .2 : .16 + p.r(j, 17) * .18) * shrink;
      const x = HX + Math.cos(ang) * (r0 + d), y = Math.sin(ang) * (r0 + d), z = Math.max(len * .25, h0 + up * p.drag(2.4, 2, a) - 4.4 * a * a);
      const spin = (p.r(j, 18) - .5) * (big ? 8 : 16) * (1 - Math.exp(-a * 3)) / 3 + p.r(j, 19) * TAU;
      const dir = [Math.cos(spin) * Math.cos(ang), Math.cos(spin) * Math.sin(ang), Math.sin(spin)], hl = len * .4;
      p.shard(x, y, z, len, len * .55, dir, IC, { back: .45, sides: 3, spin: j, shadow: z > .1 });
      pieces.push({ x, y, z, a: [x - dir[0] * hl, y - dir[1] * hl, z - dir[2] * hl], b: [x + dir[0] * hl, y + dir[1] * hl, z + dir[2] * hl] });
    }

    // ---- the void: dark sky, black mirror floor ----
    const amt = t < SHATTER ? p.easeOutCubic(p.ph(t, CAST, CAST + .3)) : 1 - p.easeInCubic(p.ph(a, .25, .85));
    if (amt > 0) p.domain({ amt, c: [X0, 0, .8], sky: 'void', ground: P.mirror, solids: .35 * amt, t });
    // frost mark around the target's feet (stays a little after the void is gone)
    const fm = t < 1.0 ? 0 : t < SHATTER ? p.ph(t, 1.0, 1.6) : 1 - p.ph(a, .3, 1.5);
    if (fm > 0) p.aftermath(HX, 0, 1.1, 'frost', { amt: fm, seed: 4, color: '#e8f3fb' });

    // ---- light ----
    if (t > .35 && t < CAST + .1) {
      const u = p.ph(t, .35, CAST), h = fig.hand;
      p.charge(h[0], h[1], h[2], u, { n: 13, R: 1, ramp: FR, I: .9, len: .16 });
      p.glow(h[0], h[1], h[2], .08 + .1 * u, FR, .6 + .6 * u);
    }
    if (amt > 0) {
      const RA = RF * amt;
      // gloss streaks and reflected stars on the mirror
      if (RA > .02) {
        // gloss: short streaks running along the screen horizontal
        const cr = p.cam().right, rl = Math.hypot(cr[0], cr[1]) || 1, rx = cr[0] / rl, ry = cr[1] / rl;
        p.decal(0, 0, 0, RI, (x, y) => {
          const u = x * rx + y * ry, v = -x * ry + y * rx, b = v * 2.6 + p.noise(u * .4, 7) * .5, fb = b - Math.floor(b);
          return Math.abs(fb - .5) < .035 && p.noise(u * 1.1 + Math.floor(b) * 5.3, Math.floor(b)) > .62 ? .55 : 0;
        }, FR, .7 * RA);
        const nS = Math.round(20 * p.density);
        for (let k = 0; k < nS; k++) {
          const an = p.r(k, 81) * TAU, rr = Math.sqrt(p.r(k, 82)) * RI * .95, tw = Math.pow(.5 + .5 * Math.sin(t * (2 + p.r(k, 83) * 3) + k), 3);
          p.dot(Math.cos(an) * rr, Math.sin(an) * rr, .003, FR, (.35 + .5 * tw) * RA);
        }
        // the target's dim reflection, then the crystals' bright ones
        if (!broken || a < .1) this.reflect(p, [HX, 0], [HX, 0, 1.6], .42, P.echo, .55 * RA, .2 * RA, RI);
        for (const c of crystals) this.reflect(p, c.base, c.tip, c.wid * .75, FR, .75 * RA, .3 * RA, RI);
        for (const pc of pieces) if (pc.z > .15) { const m = this.mirror(p, pc.x, pc.y, pc.z); if (Math.hypot(m[0], m[1]) < RI) p.dot(m[0], m[1], .003, FR, .7 * RA * (1 - p.ph(a, 0, 1)), 2); }
      }
    }
    // growth front: the tips glow while they grow
    for (const c of crystals) if (c.l < 1) p.glow(c.tip[0], c.tip[1], c.tip[2], .16, FR, 1.1 * (1 - c.l));
    // frost crawling up the target
    if (!broken && t > 1.0) {
      const front = 1.7 * p.ease(p.ph(t, 1.0, ENCASE)), cm = p.cam(), fl = Math.hypot(cm.fwd[0], cm.fwd[1]) || 1;
      const fa = Math.atan2(cm.fwd[1] / fl, cm.fwd[0] / fl);
      for (let k = 0; k < 14; k++) {
        const z = p.r(k, 91) * front, an = fa + (p.r(k, 92) - .5) * 2.4, rr = z > .55 && z < 1.15 ? .33 : z > 1.25 ? .24 : .11;
        p.dot(HX + Math.cos(an) * rr, Math.sin(an) * rr, z, FR, .85, k % 4 ? 1 : 2);
      }
      if (front > .05 && t < ENCASE + .05) p.ring(HX, 0, front, front > .55 && front < 1.15 ? .34 : .2, .04, FR, .9);
    }
    // encased: one blue-white flash, then perfect stillness until the shatter tell
    const ea = t - ENCASE;
    if (ea >= 0 && !broken) {
      const f = Math.pow(1 - p.ph(ea, 0, .14), 2);
      if (f > 0) p.glow(HX + .2, .1, 1, .3 + .7 * f, FR, 1.3 * f, { pow: 1.4 });
      const ck = p.ph(t, SHATTER - .1, SHATTER);
      if (ck > 0) for (let k = 0; k < 5; k++) {
        const an = k / 5 * TAU + .3, cm = p.cam(), L = .6 * p.easeInCubic(ck) * (.7 + .5 * p.r(k, 95));
        const c0 = [HX + cm.fwd[0] * .5, cm.fwd[1] * .5, .9 + cm.fwd[2] * .5];
        const d = [cm.right[0] * Math.cos(an) + cm.up[0] * Math.sin(an), cm.right[1] * Math.cos(an) + cm.up[1] * Math.sin(an), cm.right[2] * Math.cos(an) + cm.up[2] * Math.sin(an)];
        p.line(c0, [c0[0] + d[0] * L, c0[1] + d[1] * L, c0[2] + d[2] * L], .04, FR, 1.1, { w1: .01, i1: .6 });
      }
    }
    // ---- the shatter ----
    if (broken && a < 1.5) {
      const f = Math.pow(1 - p.ph(a, 0, .14), 2);
      if (f > 0) {
        p.glow(HX, 0, .9, .3 + .6 * f, FR, 1.4 * f, { pow: 1.4 });
        p.sparkle(HX + .3, 0, .95, Math.round(9 * f), FR, 1.2 * f);
        const m = this.mirror(p, HX, 0, .9);
        if (Math.hypot(m[0], m[1]) < RI) p.glow(m[0], m[1], .003, .25 + .4 * f, FR, RF * f);
      }
      if (a < .16) p.speedLines(HX, 0, .9, { n: 14, R0: .5, R1: 2.4, ramp: FR, I: 1 - a / .16, seed: Math.floor(t * 30) });
      for (const pc of pieces) if (a < .7) p.line(pc.a, pc.b, .055, FR, (1 - a / .7) * 1.3, { w1: .02, i1: .5 });
      p.shock(HX, 0, .02, p.ph(a, 0, .6), { R: 2.2, w: .28, ramp: FR, ground: true });
    }
  },
});
