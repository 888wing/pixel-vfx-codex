// 靈骸巨神 / Spirit Colossus — Ultimates pack (original design): a giant glowing skeleton builds up behind the caster, grows violet muscle and armour, and swings a huge energy blade in a sweeping band of light
PXFX.define({
  id: 'spirit-colossus',
  loop: 4.4,
  beats: [{ t: .45, kind: 'cast', power: .6 }, { t: 1.4, kind: 'pulse', power: .5 }, { t: 2.0, kind: 'hit', power: 1.5 }],
  view: { r: 3.4, h: 4.5 },
  stage: { ground: 'marble', tiles: true },
  modules: ['figure', 'grade', 'creature', 'slash', 'shockwave', 'impact', 'aftermath'],
  palette: {
    bone: ['#6a3fc0', '#9a6cf0', '#c9a8ff', '#efe4ff', '#ffffff'],
    flesh: ['#5a2aa8', '#7a3ad8', '#a060f8', '#c898ff'],
    plate: ['#3c2a8c', '#6046c0', '#8f78ec', '#c8b8ff', '#f4f0ff'],
    edge: ['#8a4cf0', '#b070ff', '#dcb8ff', '#fff4ff'],
  },
  timeline: [
    { k: 'pose', t: [0, .45], zh: '起手：施法者由站姿轉為雙手高舉的召喚姿勢，腳下亮起紫色法陣', en: 'pose: the caster goes from idle to both hands raised, a violet sigil lights up underfoot' },
    { k: 'charge', t: [.45, 1.7], zh: '集氣：身後由下而上掃描出一具高約 3.9（施法者 2.6 倍）的發光骨架（脊椎、骨盆、肋骨環、鎖骨、雙臂、雙腿、有眼窩的頭骨），0.35 秒後包上半透明紫色肌肉光層，再逐塊彈出 7 塊發光鎧甲（硬邊、內有裂紋）；環境壓暗 30%', en: 'charge: a glowing skeleton ~3.9 tall (2.6× the caster: spine, pelvis, rib rings, collarbones, arms, legs, skull with eye sockets) is scanned in bottom to top behind the caster, wrapped 0.35 s later in translucent violet muscle, then 7 glowing armour plates (hard rims, crack lines) pop on one by one; the scene darkens 30%' },
    { k: 'shape', t: [1.45, 1.85], zh: '成形：巨人右臂向上後方舉起，手中長出長約 2.8 的白紫能量巨刀（細長發光四邊形）', en: 'shape: the giant raises its right arm up and back, a white-violet energy blade ~2.8 long (a long bright quad) grows out of its hand' },
    { k: 'motion', t: [1.85, 2.0], zh: '推進：0.15 秒內由頭頂後方斬到前下方（約 185°），刀後拖出一道巨大彎月光帶，外緣一直延伸穿過木樁', en: 'motion: in 0.15 s the blade swings from overhead-back to forward-down (~185°), dragging a huge crescent band of light whose outer edge sweeps through the dummy' },
    { k: 'impact', t: [2.0, 2.35], zh: '命中：白閃、豎立衝擊環、18 條放射速度線，地面留下紫光裂紋；光帶由後向前溶解', en: 'impact: white flash, an upright shock ring, 18 radial speed lines, violet cracks on the ground; the band dissolves from its back end' },
    { k: 'after', t: [2.35, 4.4], zh: '餘波：巨人由腳到頭逐層消散成上升光點，裂紋淡出，施法者收勢', en: 'aftermath: the giant dissolves bottom to top into rising motes, the cracks fade, the caster lowers the arms' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→雙手高舉→與巨人同步揮斬→收勢', en: 'caster: faceless mannequin, poses idle → both hands up → swings in sync with the giant → recover' },
    { zh: '骨架：全部為發光線條（寬約 0.07，白紫漸層），顯示範圍由一條水平掃描光環控制（由下往上出現，再由下往上消失）', en: 'skeleton: all glowing lines (width ~0.07, white-violet ramp), clipped by a horizontal scan ring that reveals it bottom to top and later erases it bottom to top' },
    { zh: '頭骨：朝向鏡頭的發光卡片，圓形顱骨外框＋兩個空眼窩＋下顎；肌肉出現後眼窩亮起白點', en: 'skull: a camera-facing glowing card, round cranium outline + two empty eye sockets + jaw; the sockets light up white once the muscle forms' },
    { zh: '肌肉：沿骨骼的寬光線（強度約 0.35）＋胸腔與頭部的球面光層（邊緣較亮），半透明紫色', en: 'muscle: wide low-intensity lines (~0.35) along the bones plus sphere shells on the chest and head (brighter at the rim), translucent violet' },
    { zh: '鎧甲：7 張朝向鏡頭的發光板（胸甲、兩肩甲、頭盔、護臂、腰甲），硬邊亮框、內部填充 35%、2–3 條亮裂紋，以回彈緩動逐塊彈出', en: 'armour: 7 camera-facing glowing plates (breastplate, two pauldrons, helmet, bracer, tassets), hard bright rims, 35% fill, 2–3 bright crack lines, popping on one by one with an overshoot ease' },
    { zh: '巨刀與光帶：手到刀尖一條細長發光四邊形；揮動時沿刀尖弧線拖出彎月光帶（中段最厚、外緣最亮、向後漸淡），外緣延伸穿過木樁', en: 'blade and band: a long bright quad from hand to tip; the swing drags a crescent band along the tip arc (thickest mid-way, brightest at the outer edge, fading backwards) whose outer edge reaches through the dummy' },
    { zh: '命中：白閃、豎立衝擊環、18 條放射速度線、地面紫光裂紋', en: 'impact: white flash, an upright shock ring, 18 radial speed lines, violet glowing ground cracks' },
  ],
  params: {
    giantScale: { zh: '巨人大小', en: 'giant scale', min: .8, max: 1.2, step: .05, value: 1 },
    armour: { zh: '鎧甲（0/1）', en: 'armour (0/1)', min: 0, max: 1, step: 1, value: 1 },
    bladeLength: { zh: '巨刀長度', en: 'blade length', min: 2, max: 3.4, step: .1, value: 2.8 },
  },
  // sword-arm angle in the giant's x-z plane (degrees, 0 = forward, 90 = up): hangs, raises over the top, swings down
  armAngle(p, t) {
    if (t < 1.45) return -80;
    if (t < 1.85) return p.lerp(-80, 140, p.easeOutBack(p.ph(t, 1.45, 1.8), 1.3));
    if (t < 2.01) return 140 - 185 * Math.pow(p.ph(t, 1.85, 2.01), 2);
    return -45 - 8 * p.easeOutCubic(p.ph(t, 2.01, 2.3)) + 20 * p.ease(p.ph(t, 2.5, 3.2));
  },
  draw(p, t) {
    const BN = this.palette.bone, FL = this.palette.flesh, PL = this.palette.plate, ED = this.palette.edge;
    const X0 = -2.3, DX = 2.35, GX = -2.75, GY = -.55, H = 3.9 * p.param('giantScale'), L = p.param('bladeLength'), armour = p.param('armour') >= .5;
    const HIT = 2.0, cm = p.cam();
    const G = (x, y, z) => [GX + x * H, GY + y * H, z * H];
    // reveal (bottom to top) and erase (bottom to top) heights
    const zr = H * 1.08 * p.ease(p.ph(t, .45, 1.05)), zf = H * 1.08 * p.easeIn(p.ph(t, 2.45, 3.3));
    const vis = z => z <= zr && z >= zf;
    const seg = (a, b) => {
      let lo = Math.max(zf, -1), hi = zr;
      if (a[2] > b[2]) { const c = a; a = b; b = c; }
      if (b[2] < lo || a[2] > hi) return null;
      const dz = b[2] - a[2] || 1e-6, k0 = p.clamp((lo - a[2]) / dz, 0, 1), k1 = p.clamp((hi - a[2]) / dz, 0, 1);
      return [p.v3.lerp(a, b, k0), p.v3.lerp(a, b, k1)];
    };
    const bone = (a, b, w, I) => { const s = seg(a, b); if (s) p.line(s[0], s[1], w, BN, I); };
    // ---- ground cracks after the hit ----
    if (t > HIT) p.aftermath(DX - .1, 0, 1.4, 'crack', { amt: 1 - p.ph(t, 3.2, 4.1), ramp: ED, glow: Math.pow(1 - p.ph(t, HIT, HIT + 1.3), 2), seed: 6, n: 6 });
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < .45) pose = { a: 'ready', b: 'bothUp', k: p.easeOutBack(p.ph(t, .3, .45), 1.5) };
    else if (t < 1.85) pose = 'bothUp';
    else if (t < 1.93) pose = { a: 'bothUp', b: 'swing', k: p.easeInCubic(p.ph(t, 1.85, 1.93)) };
    else if (t < 2.6) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.6, 3.4)) };
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose });
    const dark = .38 * p.env(t, .35, .8, 2.4, 3.3);
    p.grade({ dark, desat: dark * .6, bg: 1 });
    // ---- summoning sigil + motes ----
    const sg = p.env(t, .3, .5, 1.0, 1.5);
    if (sg > 0) {
      p.decal(GX + .3, GY, 0, 1.5, (x, y, rho, ang) => {
        const r1 = p.band(rho, 1.3, .06), r2 = p.band(rho, 1.05, .04), tick = rho > 1.08 && rho < 1.27 && Math.abs(Math.sin(ang * 8 + t * 1.5)) < .12 ? .8 : 0;
        return Math.max(r1, r2 * .8, tick);
      }, ED, .95 * sg);
      p.light(GX + .3, GY, 0, 1.8, ED, .5 * sg);
    }
    // scan ring at the reveal / erase front
    const scanZ = t < 1.2 ? zr : zf, scanI = t < 1.2 ? p.env(t, .45, .5, .95, 1.1) : p.env(t, 2.45, 2.5, 3.2, 3.3);
    if (scanI > 0) p.ring(GX + .05 * H, GY, Math.min(scanZ, H), .32 * H, .06, ED, scanI, { fn: a => .6 + .4 * Math.cos(a - 1) });
    // ---- skeleton (giant local: x forward, y left, z up; units of H) ----
    const th = this.armAngle(p, t) * Math.PI / 180;
    const D = [Math.cos(th), -.12 * Math.sin(th), Math.sin(th)];
    const shR = G(.0, -.3, .79), shL = G(.0, .3, .79), neck = G(-.02, 0, .82), pelvis = G(0, 0, .46);
    const arm = .4 * H, handR = [shR[0] + D[0] * arm, shR[1] + D[1] * arm, shR[2] + D[2] * arm], elR = p.v3.lerp(shR, handR, .5);
    elR[2] -= .03 * H;
    const lth = t < 1.5 ? -95 : -95 + 45 * p.easeOutBack(p.ph(t, 1.5, 1.8)) * (1 - p.ease(p.ph(t, 2.4, 3)));
    const LD = [Math.cos(lth * Math.PI / 180) * .7, .3, Math.sin(lth * Math.PI / 180)];
    const handL = [shL[0] + LD[0] * arm, shL[1] + LD[1] * arm * .4, shL[2] + LD[2] * arm], elL = p.v3.lerp(shL, handL, .5);
    const legs = [[G(0, .1, .46), G(.04, .11, .24), G(0, .12, .02)], [G(0, -.1, .46), G(-.05, -.12, .24), G(-.08, -.13, .02)]];
    const bw = .09, bI = .95;
    // spine + pelvis
    bone(pelvis, neck, bw * 1.2, bI);
    for (let k = 0; k < 7; k++) { const z = (.48 + k * .05) * H, q = G(-.03, 0, .48 + k * .05); if (vis(z)) p.dot(q[0], q[1], q[2], BN, 1, 2); }
    bone(G(0, -.12, .5), G(0, .12, .5), bw, bI); bone(G(0, -.12, .5), G(.02, -.1, .42), bw, bI); bone(G(0, .12, .5), G(.02, .1, .42), bw, bI);
    // ribs: horizontal rings open at the front
    for (let k = 0; k < 4; k++) {
      const z = (.6 + k * .045) * H, rr = (.13 + .02 * Math.sin(k * .9 + .6)) * H;
      if (!vis(z)) continue;
      p.ring(GX + .02 * H, GY, z, rr, .055, BN, .85, { a0: .45, a1: p.TAU - .45 });
    }
    bone(G(.12, 0, .6), G(.14, 0, .74), bw, .8);
    // collarbones, arms, legs
    bone(neck, shR, bw, bI); bone(neck, shL, bw, bI);
    bone(shR, elR, bw * 1.1, bI); bone(elR, handR, bw, bI); bone(shL, elL, bw * 1.1, bI); bone(elL, handL, bw, bI);
    for (const [hp, kn, ft] of legs) { bone(hp, kn, bw * 1.2, bI); bone(kn, ft, bw * 1.1, bI); bone(ft, [ft[0] + .1 * H, ft[1], ft[2]], bw, .8); }
    // skull card
    const sk = G(.02, 0, .9), skR = .085 * H, mus = p.easeOutCubic(p.ph(t, 1.0, 1.35));
    if (vis(sk[2] - skR * .5)) {
      const eyes = mus * (1 - p.ph(t, 2.45, 3.0));
      p.card(sk[0], sk[1], sk[2], skR * 2.3, skR * 2.6, (u, v) => {
        const cr = Math.hypot(u, (v - .12) * 1.15), jaw = v < -.35 && v > -.92 && Math.abs(u) < .55 - (v + .35) * -.25;
        const eye = Math.min(Math.hypot(u - .36, v + .05), Math.hypot(u + .36, v + .05));
        if (eye < .22) return eye < .1 ? eyes * 1.4 : 0;
        if (cr < .82) return cr > .66 ? 1 : .4;
        if (jaw) return Math.abs(u) > .38 || v < -.78 ? 1 : (Math.abs(u * 5 % 1 - .5) < .12 ? .9 : .35);
        return 0;
      }, BN, .95);
    }
    // ---- muscle: translucent violet volume ----
    if (mus > 0) {
      const mI = .42 * mus;

      const vol = (a, b, w) => { const s = seg(a, b); if (s) p.line(s[0], s[1], w, FL, mI, { add: true, pow: 1 }); };
      vol(shR, elR, .17 * H); vol(elR, handR, .13 * H); vol(shL, elL, .17 * H); vol(elL, handL, .13 * H);
      for (const [hp, kn, ft] of legs) { vol(hp, kn, .17 * H); vol(kn, ft, .13 * H); }
      const shells = [[G(.03, 0, .67), .23 * H], [G(.02, 0, .52), .17 * H], [G(.02, 0, .9), .11 * H]];
      for (const [c, r] of shells) if (vis(c[2])) p.shell(c[0], c[1], c[2], r, (nx, ny, nz, rim) => .25 + .9 * Math.pow(rim, 2.5), FL, mI * 1.6, { back: .2 });
    }
    // ---- armour plates (camera-facing panels with hard rims and cracks) ----
    if (armour) {
      const plates = [
        { c: G(.08, 0, .66), w: .36, h: .24, shape: 'chest', seed: 1 },
        { c: G(0, -.27, .79), w: .2, h: .14, shape: 'round', seed: 2 },
        { c: G(0, .27, .79), w: .2, h: .14, shape: 'round', seed: 3 },
        { c: G(.03, 0, .96), w: .2, h: .14, shape: 'crest', seed: 4 },
        { c: p.v3.lerp(elR, handR, .5), w: .13, h: .13, shape: 'round', seed: 5, arm: true },
        { c: G(.04, -.08, .43), w: .14, h: .12, shape: 'chest', seed: 6 },
        { c: G(.04, .08, .43), w: .14, h: .12, shape: 'chest', seed: 7 },
      ];
      plates.forEach((pl, k) => {
        const pop = p.easeOutBack(p.ph(t, 1.35 + k * .045, 1.5 + k * .045), 2.2);
        if (pop <= .02 || !vis(pl.c[2])) return;
        const w = pl.w * H * pop, h = pl.h * H * pop, sd = pl.seed;
        p.card(pl.c[0], pl.c[1], pl.c[2], w, h, (u, v) => {
          let m;
          if (pl.shape === 'round') m = 1 - Math.hypot(u, v * 1.1);
          else if (pl.shape === 'crest') m = Math.min(1 - Math.abs(u) - Math.max(0, v) * .6, v + 1, 1 - Math.abs(u) * 1.2 + (v + 1) * .2) * .9;
          else m = Math.min(1 - Math.abs(u) * (1 + (1 - v) * .18), 1 - Math.abs(v));
          if (m <= 0) return 0;
          if (m < .14) return 1;
          const cr = Math.abs(u - .3 * Math.sin(v * 3 + sd) - (p.r(sd, 1) - .5) * .6);
          if (cr < .05 && v > -.6 + p.r(sd, 2) * .3) return .9;
          return .38;
        }, PL, pop > 1 ? 1.2 : 1);
      });
    }
    // ---- energy blade ----
    const bladeU = p.easeOutBack(p.ph(t, 1.55, 1.8), 1.4) * (1 - p.easeInCubic(p.ph(t, 2.35, 2.6)));
    let tip = null;
    if (bladeU > .02 && vis(handR[2] - .1)) {
      const len = L * bladeU, b0 = handR;
      tip = [b0[0] + D[0] * len, b0[1] + D[1] * len, b0[2] + D[2] * len];
      const pr = p.v3.norm(p.v3.cross(D, cm.fwd)), bw2 = .2 * Math.min(1, bladeU);
      const A = [b0[0] - pr[0] * bw2, b0[1] - pr[1] * bw2, b0[2] - pr[2] * bw2], B = [b0[0] + pr[0] * bw2, b0[1] + pr[1] * bw2, b0[2] + pr[2] * bw2];
      p.lquad(A, B, tip, tip, (u, v) => .65 + .6 * (1 - Math.abs(u - .5) * 2), ED, 1.1);
      p.line(b0, tip, .06, BN, 1.2, { w1: .02 });
      p.glow(b0[0], b0[1], b0[2], .4, ED, .7);
    }
    // ---- the sweeping band of light: a crescent trailing the blade, its outer edge sweeping through the dummy ----
    const fade = p.ph(t, HIT, HIT + .38), A0 = 24 * Math.PI / 180;
    if (t > 1.85 && fade < 1 && th < A0) {
      const dd = Math.hypot(DX - shR[0], -shR[1], 1.1 - shR[2]), rout = dd + .35, Wb = 1.35;
      const aEnd = th, aStart = Math.min(A0, th + 1.15), S = 24, inner = [], outer = [], halo = [];
      const drift = .6 * p.easeOutCubic(fade);
      for (let k = 0; k <= S; k++) {
        const u = k / S, an = aStart + (aEnd - aStart) * u, dv = [Math.cos(an), -.12 * Math.sin(an), Math.sin(an)];
        const w = Wb * Math.pow(Math.sin(Math.PI * Math.min(1, u * .55 + .45 * u * u + .001)), .8) * (1 - .4 * fade);
        const ro = rout + drift;
        outer.push([shR[0] + dv[0] * ro, shR[1] + dv[1] * ro, shR[2] + dv[2] * ro]);
        inner.push([shR[0] + dv[0] * (ro - w), shR[1] + dv[1] * (ro - w), shR[2] + dv[2] * (ro - w)]);
        halo.push([shR[0] + dv[0] * (ro + .14), shR[1] + dv[1] * (ro + .14), shR[2] + dv[2] * (ro + .14)]);
      }
      const I = 1.2 * (1 - p.easeInCubic(fade));
      p.ribbon(inner, outer, (u, v) => {
        if (fade > 0 && p.noise(u * 9 + 3, v * 3) < fade * 1.4 - u * .4) return 0;
        return (.42 + .8 * Math.pow(v, 3)) * (.45 + .55 * u);
      }, ED, I);
      p.ribbon(outer, halo, (u, v) => (1 - v) * (.4 + .6 * u), ED, .9 * I);
      p.light(DX - .6, 0, 0, 2.4, ED, .6 * I);
    }
    // ---- impact ----
    const a = t - HIT;
    if (a >= 0 && a < .6) {
      const C = [DX - .1, 0, 1.0], fl = Math.pow(1 - p.ph(a, 0, .16), 2);
      if (fl > 0) p.glow(C[0], C[1], C[2], .5 + .9 * fl, BN, 1.7 * fl, { pow: 1.3 });
      p.shock(C[0] - .15, 0, C[2], p.ph(a, 0, .45), { R: 1.8, w: .3, ramp: ED, axis: [.7, 0, .7], light: false });
      p.shock(DX, 0, .03, p.ph(a, .02, .55), { R: 2.2, w: .26, ramp: ED });
      if (a < .2) p.speedLines(C[0], 0, C[2], { n: 18, R0: .6, R1: 3, ramp: BN, I: 1 - a / .2, seed: Math.floor(t * 30) });
      p.light(DX, 0, 0, 2.4, ED, fl + .3);
    }
    // ---- motes rising off the giant as it dissolves ----
    const nM = Math.round(22 * p.density);
    for (let k = 0; k < nM; k++) {
      const t0 = 2.45 + p.r(k, 61) * .8, age = t - t0;
      if (age <= 0 || age > 1) continue;
      const z0 = H * 1.08 * p.easeIn(p.ph(t0, 2.45, 3.3)), q = G((p.r(k, 62) - .5) * .5, (p.r(k, 63) - .5) * .6, 0);
      p.dot(q[0], q[1], z0 + p.drag(1.5, 2, age), k % 3 ? ED : BN, 1.1 * (1 - age), k % 4 ? 1 : 2);
    }
    if (t > .45 && t < 3.3) p.light(GX + .4, GY, 0, 2.4, ED, .45 * p.env(t, .5, 1.1, 2.4, 3.3));
  },
});
