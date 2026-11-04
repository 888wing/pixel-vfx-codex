// 白寂霜葬 / White Silence — Ultimates pack (original design): the caster turns white and colour drains away, one swing sends a frost sphere across the field, everything freezes into white crystal, holds still, then shatters
PXFX.define({
  id: 'white-silence',
  loop: 4.4,
  beats: [{ t: 1.2, kind: 'cast', power: .4 }, { t: 1.44, kind: 'hit', power: 1.2 }, { t: 1.92, kind: 'burst', power: 1.4 }],
  view: { r: 3.4, h: 2.8 },
  stage: { ground: 'stone', tiles: true },
  modules: ['figure', 'charge', 'grade', 'domain', 'shockwave', 'growth', 'impact', 'debris', 'aftermath'],
  palette: {
    frost: ['#6f8fc0', '#9db9df', '#c8dcf2', '#e8f2ff', '#fbfdff'],
    crystal: ['#5d76a0', '#8aa3c6', '#b9cde4', '#e2ecf7', '#ffffff'],
    fog: ['#b4c2d4', '#cad5e2', '#dde5ee', '#eef3f8', '#ffffff'],
    snowfield: ['#8d9cb3', '#a6b4c8', '#c0ccdb', '#d8e1eb'],
    white: ['#9aa7bb', '#b9c5d4', '#d6dfe9', '#eef3f8', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .35], zh: '起手：施法者由站姿轉為持刀架式，全程無聲，沒有任何光效', en: 'pose: the caster shifts from idle into a sword stance; silent, no light at all' },
    { k: 'charge', t: [.35, 1.2], zh: '集氣：刀舉到身後，施法者身體顏色 0.8 秒內由灰藍漸變為近白 #eef3f8；整個場景去飽和由 0 升到 1；6–14 粒白色光點匯聚到刀尖，腳下結出一小片霜', en: 'charge: blade raised behind; over 0.8 s the body colour lerps from grey-blue to near-white #eef3f8 while scene desaturation rises 0 → 1; 6–14 white motes converge on the tip, a small frost patch forms underfoot' },
    { k: 'shape', t: [1.2, 1.27], zh: '成形：0.07 秒內揮刀，身前閃出一道白色弧光，同時以施法者為中心生出半透明寒氣球（只畫地面以上）', en: 'shape: a 0.07 s swing flashes a white arc in front, and a translucent frost sphere (upper half only) is born around the caster' },
    { k: 'motion', t: [1.22, 1.44], zh: '推進：寒氣球以 ease-out-expo 在 0.3 秒內擴張到半徑約 4.6，掃過整個戰場；球面經過之處背景換成霜白天空、地面變成雪白，低矮白霧團湧入並停住，地上冒出小冰晶簇', en: 'motion: the sphere expands with ease-out-expo to radius ~4.6 in 0.3 s; where its rim passes the sky turns frost-white, the ground turns snow-white, low white fog rolls in and stops, small crystal clusters pop up' },
    { k: 'impact', t: [1.44, 1.92], zh: '命中：11 根白色冰晶 0.06 秒內合攏包住目標，地面霜紋亮起；之後約 0.45 秒完全靜止（只有最後 0.1 秒冰面爬出亮白裂紋）；1.92 秒全部同時碎裂：白閃、地面衝擊環、碎冰片向外飛散、冰塵閃爍', en: 'impact: 11 white crystals snap shut around the target in 0.06 s and ground frost lines light up; then ~0.45 s of total stillness (only bright cracks crawl over the ice in the last 0.1 s); at 1.92 s everything shatters at once: white flash, a ground shock ring, ice shards flying out, glittering ice dust' },
    { k: 'after', t: [1.92, 4.4], zh: '餘波：0.7 秒內色彩回復、背景由外向施法者退回原狀；碎冰落地縮小消失，白霧變稀散去，地面霜跡 1.5 秒內淡出，施法者收刀', en: 'aftermath: colour returns within 0.7 s and the domain wipes back towards the caster; ice shards land and shrink away, the fog thins out, frost marks fade over 1.5 s, the caster lowers the blade' },
  ],
  layers: [
    { zh: '施法者：無臉人偶持刀，身體色階按進度在 6 級之間由灰藍換成白色（#eef3f8），碎裂後換回', en: 'caster: faceless mannequin with a sword; the body ramp steps through 6 levels from grey-blue to white (#eef3f8) and back after the shatter' },
    { zh: '去飽和：場景調色 desat 0→1（發光部分不受影響），碎裂後 0.6 秒內回到 0', en: 'desaturation: a scene grade with desat 0 → 1 (light unaffected), back to 0 within 0.6 s after the shatter' },
    { zh: '寒氣球：以施法者為中心的半透明球殼（zmin 0），只畫邊緣菲涅耳亮帶與稀疏霜紋（不畫整片填色，否則抖色會蓋滿），半徑 0→4.6；領域擦除跟隨球面：霜白天空＋4 階雪白地面', en: 'frost sphere: a translucent shell centred on the caster (zmin 0) drawn only as a bright fresnel rim plus sparse frost veins (no flat fill, faint light would dither over everything), radius 0 → 4.6; a domain wipe follows the rim: frost-white sky plus a 4-step snow ground' },
    { zh: '白霧：18 團半徑 0.3–0.52 的白色粗糙球，半埋地面成低矮霧堆，抖色半透明（55%），隨球面湧入後完全停住，碎裂後被衝擊推開、上升變稀', en: 'fog: 18 rough white balls (radius 0.3–0.52) half sunk into the ground as low mounds, 55 % dithered see-through; they roll in with the rim, stop dead, then get pushed away by the blast, lift and thin out' },
    { zh: '冰封：目標四周 11 根向內傾的白色冰晶（高 1.3–2.1、雙錐體），面向鏡頭的稜邊畫一條冰藍光線；另有 6 簇小冰晶散在戰場；地面六角霜紋發光', en: 'freeze: 11 white bipyramid crystals (1.3–2.1 tall) lean in around the target with an ice-blue light line on the camera-facing ridge; 6 small crystal clusters dot the field; a glowing six-fold frost pattern on the ground' },
    { zh: '碎裂：28 片冰片（前 11 片是大塊 0.46–0.66，其餘 0.2–0.38）帶旋轉向外飛，先快後慢並受重力落地，頭 0.7 秒每片帶一條冰藍反光線，2 秒內縮小消失；20 粒冰塵四角星閃爍；14 條放射速度線、地面衝擊環＋白閃 2 幀', en: 'shatter: 28 ice pieces (the first 11 are big 0.46–0.66 chunks, the rest 0.2–0.38) spin outwards, fast then slow with gravity, each with an ice-blue glint line for 0.7 s, shrinking away within 2 s; 20 four-point ice-dust sparkles; 14 radial speed lines, a ground shock ring and a 2-frame white flash' },
    { zh: '靜止：冰封後到碎裂前約 0.45 秒畫面完全不動，只在最後 0.1 秒於冰面爬出 5 條亮白裂紋作預兆', en: 'stillness: ~0.45 s with nothing moving between the freeze and the shatter, except 5 bright cracks crawling over the ice in the last 0.1 s as a tell' },
  ],
  params: {
    sphereSize: { zh: '寒氣球半徑', en: 'frost sphere radius', min: 3, max: 6, step: .1, value: 4.6 },
    fog: { zh: '白霧量', en: 'fog amount', min: 0, max: 1.6, step: .1, value: 1 },
    pieces: { zh: '碎冰片數量', en: 'shatter pieces', min: 8, max: 48, step: 1, value: 28 },
    drain: { zh: '褪色程度', en: 'colour drain', min: .4, max: 1, step: .05, value: 1 },
  },
  SKY: { top: '#d9e4f1', bottom: '#f5f8fc', nebula: '#e8eef6', stars: .004, star: '#ffffff' },
  FIG: ['#2b2a3c', '#3c3b53', '#51536c', '#6a6e87', '#868ba2'],
  // the body ramp turning white, quantised to 6 steps so only a handful of ramps are ever registered
  body(k) {
    const q = Math.round(Math.max(0, Math.min(1, k)) * 6);
    this._body = this._body || [];
    if (!this._body[q]) {
      const W = this.palette.white, f = q / 6;
      this._body[q] = this.FIG.map((c, i) => {
        const a = PXFX.hex(c), b = PXFX.hex(W[i]);
        return PXFX.toHex([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]);
      });
    }
    return this._body[q];
  },
  // fixed spots of the small crystal clusters scattered over the field
  CLUSTERS: [[-.7, 1.35], [.3, -1.55], [1.05, 1.25], [-.3, -.75], [.6, .45], [1.6, -1.1]],
  draw(p, t) {
    const P = this.palette, FR = P.frost, CR = P.crystal, FG = P.fog;
    const X0 = -1.8, HX = 2.35, CAST = 1.2, FREEZE = 1.44, SHATTER = 1.92;
    const R = p.param('sphereSize'), drain = p.param('drain'), TAU = p.TAU;
    // ---- caster pose ----
    let pose;
    if (t < .35) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .35) };
    else if (t < CAST) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .35, 1.05), 1.2) };
    else if (t < CAST + .07) pose = { a: 'windup', b: 'swing', k: p.easeInCubic((t - CAST) / .07) };
    else if (t < 2.55) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.55, 3.5)) };
    const white = t < CAST ? p.easeOutCubic(p.ph(t, .3, 1.1)) : 1 - p.easeOutCubic(p.ph(t, SHATTER + .05, SHATTER + .8));
    p.dummy(HX, 0);
    const fig = p.figure(X0, 0, { pose, blade: { len: 1 }, color: this.body(white) });

    // ---- the sphere front: fast out, frozen at FREEZE ----
    const front = tt => (tt < CAST + .02 ? 0 : R * p.easeOutExpo(p.ph(tt, CAST + .02, CAST + .34)));
    const rr = front(Math.min(t, FREEZE));
    // time the front reaches distance d from the caster (inverse of front), or Infinity
    const reach = d => (d >= R * .999 ? Infinity : CAST + .02 + .32 * (-Math.log2(1 - d / R) / 10));
    const frozen = t >= FREEZE && t < SHATTER, broken = t >= SHATTER, a = t - SHATTER;

    // ---- crystals: encasing the target, clusters on the field (solids) ----
    const nEnc = 11, enc = [];
    for (let k = 0; k < nEnc; k++) {
      const ang = k / nEnc * TAU + p.r(k, 3) * .4, rad = .34 + p.r(k, 4) * .14;
      const bx = HX + Math.cos(ang) * rad, by = Math.sin(ang) * rad, h = 1.3 + p.r(k, 5) * .8;
      const d = p.v3.norm([-Math.cos(ang) * .32, -Math.sin(ang) * .32, 1]);
      enc.push({ bx, by, h, d, w: .38 + p.r(k, 6) * .16, born: FREEZE - .02 + k * .006 });
    }
    if (!broken) {
      for (const c of enc) {
        const g = p.easeOutBack(p.ph(t, c.born, c.born + .06), 2), hh = c.h * g;
        if (hh < .03) continue;
        p.shard(c.bx + c.d[0] * hh * .3, c.by + c.d[1] * hh * .3, hh * .3, hh * 1.35, c.w, c.d, CR, { back: .25, sides: 4, spin: c.bx * 3 });
      }
      this.CLUSTERS.forEach(([cx, cy], j) => {
        const born = reach(Math.hypot(cx - X0, cy));
        if (t < born) return;
        for (let m = 0; m < 3; m++) {
          const g = p.easeOutBack(p.ph(t, born + m * .015, born + m * .015 + .08), 2.2), hh = (.28 + p.r(j * 3 + m, 8) * .3) * g;
          if (hh < .02) continue;
          const ang = p.r(j * 3 + m, 9) * TAU, d = p.v3.norm([Math.cos(ang) * .45, Math.sin(ang) * .45, 1]);
          p.shard(cx + d[0] * hh * .3, cy + d[1] * hh * .3, hh * .3, hh * 1.35, .16, d, CR, { back: .25, sides: 4, spin: ang });
        }
      });
    }
    // ---- shatter: the crystals burst into tumbling ice pieces that land and shrink away ----
    const nP = broken && a < 2 ? Math.round(p.param('pieces') * p.density) : 0, pieces = [];
    for (let j = 0; j < nP; j++) {
      const pc = this.piece(p, j, a, enc, HX);
      if (!pc) continue;
      pieces.push(pc);
      p.shard(pc.x, pc.y, pc.z, pc.len, pc.len * .55, pc.dir, CR, { back: .45, sides: 3, spin: j, shadow: pc.z > .1 });
    }
    // ---- fog: rolls in with the front, stops dead at the freeze, rises and thins after the shatter ----
    const nF = Math.round(18 * p.param('fog') * p.density);
    for (let k = 0; k < nF; k++) {
      const ang = p.r(k, 21) * TAU, dist = .4 + Math.sqrt(p.r(k, 22)) * 2.5;
      const fx = .35 + Math.cos(ang) * dist, fy = Math.sin(ang) * dist * .85;
      const dx = fx - X0, dc = Math.hypot(dx, fy), born = reach(dc);
      if (t < born) continue;
      const roll = p.easeOutCubic(p.ph(Math.min(t, FREEZE), born, born + .22));
      const back = .55 * (1 - roll), px = fx - dx / dc * back, py = fy - fy / dc * back;
      const fade = broken ? 1 - p.easeOutCubic(p.ph(a, .05 + p.r(k, 23) * .3, .7 + p.r(k, 23) * .5)) : 1;
      if (fade <= .05) continue;
      // after the shatter the blast pushes the fog away from the target and lifts it
      const ox = px - HX, oy = py, od = Math.hypot(ox, oy) || 1, push = broken ? p.drag(1.6, 3, a) / (1 + od) : 0;
      const rad = (.3 + p.r(k, 24) * .22) * (.4 + .6 * roll);
      p.ball(px + ox / od * push, py + oy / od * push, -rad * .35 + push * .4, rad, FG, { alpha: .55 * fade, rough: .3, shadow: false, seed: k, lit: .2 });
    }
    // ---- the white world: domain follows the sphere front, out again after the shatter ----
    const pc = p.project(X0, 0, .5), maxD = Math.hypot(p.W, p.H) * .62;
    let amt = 0;
    if (t >= CAST && pc) amt = Math.max((rr * pc[3] / maxD + .15) / 1.3, p.ph(t, FREEZE - .08, FREEZE));
    if (broken) amt = 1 - this.easeInOutish(p, p.ph(a, .05, .75));
    if (amt > 0) p.domain({ amt: Math.min(1, amt), c: [X0, 0, .5], sky: this.SKY, ground: P.snowfield, t: frozen ? FREEZE : t });
    // frost marks on the (now white) ground; they outlive the domain and fade slowly
    const frostAmt = t < FREEZE ? 0 : broken ? 1 - p.ph(a, .4, 1.9) : 1;
    if (frostAmt > 0) p.aftermath(HX, 0, 1.5, 'frost', { amt: frostAmt, seed: 2, color: '#f6f9fd' });
    if (t > .4 && t < SHATTER + 1.6) {
      const under = t < CAST ? p.ph(t, .4, CAST) : broken ? 1 - p.ph(a, .3, 1.6) : 1;
      p.aftermath(X0, 0, .45 + .35 * under, 'frost', { amt: under, seed: 5, color: '#f6f9fd' });
    }
    // colour drains during the charge and returns after the shatter
    const desat = drain * (t < CAST ? p.easeOutCubic(p.ph(t, .35, 1.15)) : broken ? 1 - p.easeOutCubic(p.ph(a, .05, .65)) : 1);
    p.grade({ desat, tint: '#eef3f8', tintAmt: .12 * desat });

    // ---- light: blade, motes, swing arc, sphere rim ----
    if (fig.tip && t > .35 && t < CAST + .25) {
      const ch = p.ph(t, .35, CAST), bI = t < CAST ? .25 + .6 * ch : 1 - p.ph(t, CAST, CAST + .25);
      p.line(fig.hand, fig.tip, .06, FR, bI, { w1: .02 });
      p.charge(fig.tip[0], fig.tip[1], fig.tip[2], ch, { n: 12, R: 1.2, ramp: FR, I: .9, len: .2 });
    }
    if (t >= CAST && t < CAST + .2) {
      const u = p.ph(t, CAST, CAST + .2);
      p.crescent({ c: [X0 - .2, 0, .95], dir: [1, 0, 0], side: [0, .35, .94], R: 1.05, thick: .26, arc: 2.4, edge: FR, I: 1.1, u });
    }
    if (t >= CAST + .02 && t < FREEZE + .1 && rr > .05) {
      const I = 1 - p.ph(t, FREEZE - .04, FREEZE + .1);
      // translucent: a bright fresnel rim plus sparse frost veins; no flat fill (faint light dithers to >= 50 % cover)
      p.shell(X0, 0, 0, rr, (nx, ny, nz, rim) => {
        const vein = Math.abs(p.noise(nx * 3.2 + 7, ny * 3.2 + nz * 4.1) - .5);
        return (rim > .3 ? Math.pow((rim - .3) / .7, 2.2) * 1.1 : 0) + (vein < .022 ? .45 : 0);
      }, FR, I, { zmin: 0, back: 0 });
      p.light(X0 + rr * .7, 0, 0, 1.6, FR, .6 * I);
    }
    // the freeze: ground frost lines light up and hold perfectly still
    if (t >= FREEZE && !broken) {
      const g = p.easeOutCubic(p.ph(t, FREEZE, FREEZE + .06));
      p.decal(HX, 0, 0, 1.45 * g, (x, y, rho, ang) => {
        const arm = Math.abs(Math.sin(ang * 3 + .4)), feather = Math.abs(Math.sin(rho * 9 + ang * 2));
        return rho > .3 && (arm < .06 || (arm < .22 && feather < .12)) ? 1 - rho / 1.45 : 0;
      }, FR, .9);
      // icy ridge lines on the near edge of each crystal (light, so the drained crystals still read as ice)
      const cm = p.cam();
      enc.forEach((c, k) => {
        const g = p.easeOutBack(p.ph(t, c.born, c.born + .06), 2), hh = c.h * g;
        if (hh < .1) return;
        const o = c.w * .42, b0 = [c.bx + cm.fwd[0] * o, c.by + cm.fwd[1] * o, .05 + cm.fwd[2] * o];
        const o2 = c.w * .12, tip = [c.bx + c.d[0] * hh * .95 + cm.fwd[0] * o2, c.by + c.d[1] * hh * .95 + cm.fwd[1] * o2, c.d[2] * hh * .95 + cm.fwd[2] * o2];
        p.line(b0, tip, .035, FR, .5, { w1: .015, i1: .95 });
        if (k % 3 === 0) p.sparkle(tip[0], tip[1], tip[2], 2, FR, .9);
      });
      // the tell: bright cracks crawl over the ice in the last 0.1 s
      const ck = p.ph(t, SHATTER - .1, SHATTER);
      if (ck > 0) for (let k = 0; k < 5; k++) {
        const ang = k / 5 * TAU + .5, c0 = [HX, 0, .8 + (p.r(k, 31) - .5) * .5], cm = p.cam();
        const L = .55 * p.easeInCubic(ck) * (.7 + .5 * p.r(k, 32));
        const d = [cm.right[0] * Math.cos(ang) + cm.up[0] * Math.sin(ang), cm.right[1] * Math.cos(ang) + cm.up[1] * Math.sin(ang), cm.right[2] * Math.cos(ang) + cm.up[2] * Math.sin(ang)];
        const f = [cm.fwd[0] * .5, cm.fwd[1] * .5, cm.fwd[2] * .5];
        p.line([c0[0] + f[0], c0[1] + f[1], c0[2] + f[2]], [c0[0] + f[0] + d[0] * L, c0[1] + f[1] + d[1] * L, c0[2] + f[2] + d[2] * L], .04, FR, 1.1, { w1: .01, i1: .6 });
      }
    }
    // ---- the shatter: flash, shock ring, ice dust ----
    if (broken && a < 1.6) {
      const fl = Math.pow(1 - p.ph(a, 0, .14), 2);
      if (fl > 0) {
        p.glow(HX, 0, .85, .3 + .55 * fl, FR, 1.4 * fl, { pow: 1.4 });
        p.sparkle(HX + .3, 0, .9, Math.round(9 * fl), FR, fl * 1.2);
      }
      if (a < .16) p.speedLines(HX, 0, .85, { n: 14, R0: .55, R1: 2.4, ramp: FR, I: 1 - a / .16, seed: Math.floor(t * 30) });
      // each flying piece catches the light for the first 0.6 s
      for (const pc of pieces) if (a < .7) p.line(pc.a, pc.b, .055, FR, (1 - a / .7) * 1.3, { w1: .02, i1: .5 });
      p.shock(HX, 0, .05, p.ph(a, 0, .6), { R: 2.4, w: .3, ramp: FR, ground: true });
      const nD = Math.round(20 * p.density);
      for (let k = 0; k < nD; k++) {
        const life = .7 + p.r(k, 41) * .8, u = a / life;
        if (u >= 1) continue;
        const ang = p.r(k, 42) * TAU, dd = p.drag(2.5 + p.r(k, 43) * 2.5, 3, a), up = p.r(k, 44);
        const x = HX + Math.cos(ang) * dd, y = Math.sin(ang) * dd * .8, z = .3 + up * 1.3 + p.drag(1.2, 2, a) - .8 * a * a;
        const tw = .55 + .45 * Math.sin(t * 40 + k * 2.1);
        if (z > 0) p.sparkle(x, y, z, k % 3 === 0 ? 2 : 1, FR, (1 - u) * tw * 1.1);
      }
      if (a < .05) p.flash('#ffffff', .55 * (1 - a / .05));
    }
  },
  // flying ice piece j at time a after the shatter: the first 9 are big chunks of the encasing crystals
  piece(p, j, a, enc, HX) {
    const TAU = p.TAU, big = j < enc.length, c = enc[j % enc.length];
    const life = (big ? 1.4 : 1) + p.r(j, 15) * .6, shrink = 1 - p.easeInCubic(p.ph(a, life * .55, life));
    if (shrink <= .02) return null;
    const h0 = big ? c.h * .45 : .15 + p.r(j, 11) * c.h;
    const ox = c.bx - HX, oy = c.by, ol = Math.hypot(ox, oy) || 1, ang = Math.atan2(oy, ox) + (p.r(j, 12) - .5) * (big ? .4 : 1.6);
    const sp = (big ? 1.3 : 2.4) + p.r(j, 13) * (big ? 1 : 2.6), up = (big ? .4 : .5) + p.r(j, 14) * 1.1;
    const dd = p.drag(sp, 2.6, a), x = c.bx + Math.cos(ang) * dd, y = c.by + Math.sin(ang) * dd;
    const len = (big ? .46 + p.r(j, 18) * .2 : .2 + p.r(j, 18) * .18) * shrink;
    const z = Math.max(len * .25, h0 + up * p.drag(2.6, 2, a) - 4.4 * a * a);
    const spin = (p.r(j, 16) - .5) * (big ? 8 : 16) * (1 - Math.exp(-a * 3)) / 3 + p.r(j, 17) * TAU;
    const dir = [Math.cos(spin) * Math.cos(ang), Math.cos(spin) * Math.sin(ang), Math.sin(spin)], hl = len * .4;
    return { x, y, z, len, dir, a: [x - dir[0] * hl, y - dir[1] * hl, z - dir[2] * hl], b: [x + dir[0] * hl, y + dir[1] * hl, z + dir[2] * hl] };
  },
  // smooth in-out without overshoot (wipe back out)
  easeInOutish(p, u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
});
