// 千刃花嵐 / Thousand Petal Blades — Ultimates pack (original design): a sword sinks into the ground, a row of giant blades rises and shatters into a pink petal-blade swarm that scatters, spirals, wraps the target and cuts
PXFX.define({
  id: 'petal-blade-storm',
  loop: 5,
  beats: [{ t: .83, kind: 'cast', power: .8 }, { t: 1.95, kind: 'burst', power: .6 }, { t: 3.8, kind: 'hit', power: 1.3 }],
  view: { r: 3.4, h: 3 },
  stage: { ground: 'moss', tiles: true },
  modules: ['figure', 'charge', 'growth', 'swarm', 'slash', 'shockwave', 'impact'],
  palette: {
    petal: ['#8e3a86', '#c64d96', '#ff8fc0', '#ffc4de', '#fff4f8'],
    steel: ['#4a3a54', '#6c5674', '#94789a', '#c4a4bc', '#ecd6e6'],
    sword: ['#3c3a4e', '#62627a', '#9a9cb2', '#d2d4e0', '#f6f6fb'],
    slash: ['#c46aa4', '#eaa6cc', '#fbe2ef', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .45], zh: '起手：施法者右手由待機舉高，一把長 1.15 的劍在手中以粉紅閃光現形，劍尖向下', en: 'pose: the right hand rises from idle; a 1.15-long sword materialises point-down in it with a pink glint' },
    { k: 'charge', t: [.45, .83], zh: '集氣：16 粒粉紅光點匯聚到劍身，0.08 秒內下蹲把劍插入地面，劍尖沒入 z < 0', en: 'charge: 16 pink motes converge on the blade, then a 0.08 s crouch drives the sword into the ground (tip below z = 0)' },
    { k: 'shape', t: [.83, 1.95], zh: '成形：施法者放手，劍慢慢沉入地底；地面 3 圈粉紅波紋每 0.17 秒擴散一圈至半徑 2.3；地面光線由插劍點射向身後，6 把高 1.5–2.3 的巨刃逐把（間隔 0.09 秒）由地底升起', en: 'shape: the caster lets go and the sword sinks; 3 pink ripple rings spread to radius 2.3, one every 0.17 s; ground light lines race from the sword to the back row, where 6 giant blades (1.5–2.3 tall) rise one by one, 0.09 s apart' },
    { k: 'motion', t: [1.95, 3.6], zh: '推進：巨刃發光龜裂後碎成約 80 片粉紅花瓣刃；同一套素材依次切換陣形：散射 → 橫掃全場的龍捲螺旋 → 流向目標的帶狀流 → 包住目標、半徑 1.0 的旋轉球', en: 'motion: the giant blades crack and shatter into ~80 pink petal blades; the one sprite flows through formations: scatter → a tornado spiral sweeping across the field → a stream to the target → a spinning sphere of radius 1.0 around it' },
    { k: 'impact', t: [3.6, 3.95], zh: '命中：球體在 0.2 秒內向內壓縮至 35%，目標身上三道白色斬擊交錯閃現（間隔 0.05 秒），白閃＋放射速度線', en: 'impact: the sphere crushes inwards to 35% in 0.2 s, then three white slashes cross on the target 0.05 s apart, with a white flash and radial speed lines' },
    { k: 'after', t: [3.95, 5], zh: '餘波：花瓣刃向外爆散後減速，左右搖擺緩緩飄落並淡出；施法者收手回到待機', en: 'aftermath: the petal blades burst outwards, slow down, flutter and drift to the ground while fading; the caster returns to idle' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→舉手→下蹲插劍→雙手高舉→指向目標→待機；劍為實心刀身＋護手，插地後獨立下沉', en: 'caster: faceless mannequin, poses idle → raise → crouching plunge → both arms up → point at the target → idle; the sword is a solid blade with a crossguard that sinks on its own once released' },
    { zh: '地面波紋：以插劍點為圓心的 3 個粉紅光環，用 easeOutCubic 擴張並變細變暗，地面受粉紅光', en: 'ground ripples: 3 pink rings centred on the sword, expanding with easeOutCubic while thinning and dimming; pink light on the ground' },
    { zh: '巨刃：6 把扁平實心長刃（鋼粉色 5 階漸層，左右兩半不同明暗做出刀脊），沿施法者身後弧線排列，由地底以 easeOutBack 升起；碎裂前 0.15 秒出現發光鋸齒裂紋', en: 'giant blades: 6 flat solid blades (5-step steel-pink ramp, left and right halves shaded differently for a ridge) on an arc behind the caster, rising out of the ground with easeOutBack; glowing zigzag cracks 0.15 s before they shatter' },
    { zh: '花瓣刃：單一素材（菱形發光小刃，長 0.16），沿速度方向拉長；每片的位置是多個陣形之間的混合，混合權重按粒子索引錯開 0–0.25 秒，令陣形之間流動', en: 'petal blades: one sprite (a glowing diamond blade, 0.16 long) pointing along its velocity; each position blends between formations with weights staggered 0–0.25 s by index so the formations flow into each other' },
    { zh: '陣形：散射（半徑 1.7 的球殼）→ 螺旋（高 2.4、半徑 1.0，中心由 x −1.3 掃到 0.5）→ 沿弧形路徑流向目標 → 目標周圍的費波那契球面（自轉）→ 半徑收縮', en: 'formations: scatter (shell of radius 1.7) → spiral (2.4 high, radius 1.0, centre sweeping from x −1.3 to 0.5) → stream along an arc to the target → a spinning Fibonacci sphere around it → radius collapse' },
    { zh: '命中：三道長 2.9 的白色直線斬擊（/、\\、—）在目標前方由中點向兩端伸出再變細，中心白閃 0.15 秒，14 條放射速度線', en: 'impact: three 2.9-long white slashes (/, \\, —) grow from their middles in front of the target and thin out, a 0.15 s white flash at the centre, 14 radial speed lines' },
    { zh: '飄落：每片花瓣刃以阻力向外飛，再受輕微重力下墜並正弦擺動，0.5–1.0 秒內淡出', en: 'drift: each petal blade flies out with drag, then sinks under light gravity with a sine flutter, fading within 0.5–1.0 s' },
  ],
  params: {
    petals: { zh: '花瓣刃數量', en: 'petal count', min: 30, max: 140, step: 2, value: 80 },
    sphereRadius: { zh: '包圍球半徑', en: 'sphere radius', min: .6, max: 1.4, step: .05, value: 1 },
    spiralSpeed: { zh: '螺旋轉速', en: 'spiral speed', min: .5, max: 3, step: .1, value: 1.6 },
    blades: { zh: '巨刃數量', en: 'giant blades', min: 3, max: 9, step: 1, value: 6 },
  },
  // giant blade k of n: base on an arc behind and upstage of the caster
  bladeBase(k, n) {
    const s = n > 1 ? k / (n - 1) : .5;
    return [-2.95 + 2.05 * s, -.2 - 1.05 * Math.sin(s * Math.PI * .6), 1.5 + .8 * Math.sin(Math.PI * Math.min(1, s * 1.25))];
  },
  // flat bevelled blade: base point, unit direction, length, width (camera-facing, ridge towards the viewer).
  // The part below the ground (z < 0) is clipped, so blades can slide out of / sink into the ground.
  flatBlade(p, b, d, len, w, ramp, o) {
    const c = p.cam(), r = p.v3.norm(p.v3.cross(d, c.fwd)), hw = w / 2, sh = (o && o.shoulder) || .78, lit = (o && o.lit) || 0;
    const zAt = f => b[2] + d[2] * len * f;
    let fa = 0, fb = 1;
    if (d[2] > 1e-4 && zAt(0) < 0) fa = Math.min(1, -b[2] / (d[2] * len));
    if (d[2] < -1e-4 && zAt(1) < 0) fb = Math.max(0, b[2] / (-d[2] * len));
    const wAt = f => (f <= sh ? 1 : Math.max(0, (1 - f) / (1 - sh)));
    const at = (f, s) => { const k = wAt(f) * hw * s; return [b[0] + d[0] * len * f + r[0] * k, b[1] + d[1] * len * f + r[1] * k, b[2] + d[2] * len * f + r[2] * k]; };
    const ridge = f => { const q = at(f, 0), k = w * .22 * wAt(f); return [q[0] + c.fwd[0] * k, q[1] + c.fwd[1] * k, q[2] + c.fwd[2] * k]; };
    const fs = [fa];
    if (sh > fa && sh < fb) fs.push(sh);
    fs.push(fb);
    for (let i = 0; i + 1 < fs.length; i++) {
      const f0 = fs[i], f1 = fs[i + 1];
      if (f1 - f0 < 1e-4) continue;
      const tipSeg = f0 >= sh - 1e-6, L0 = at(f0, -1), R0 = at(f0, 1), L1 = at(f1, -1), R1 = at(f1, 1), M0 = ridge(f0), M1 = ridge(f1);
      const sl = (tipSeg ? .9 : .78) + lit, sr = (tipSeg ? .55 : .42) + lit;
      p.tri(L0, M0, M1, ramp, { shade: sl }); p.tri(L0, M1, L1, ramp, { shade: sl });
      p.tri(M0, R0, R1, ramp, { shade: sr }); p.tri(M0, R1, M1, ramp, { shade: sr });
    }
    return { r, ridge };
  },
  // petal position before the burst: blends blade spot -> scatter -> spiral -> stream -> sphere
  petalPos(p, k, n, t, nb, SR, spin) {
    const j = k % nb, B = this.bladeBase(j, nb), d = p.r(k, 3) * .25, c = p.cam();
    const r0 = p.v3.norm(p.v3.cross([0, 0, 1], c.fwd)), u = p.r(k, 1) * 2 - 1, v = .08 + p.r(k, 2) * .9;
    const wid = .36 * (v < .78 ? 1 : (1 - v) / .22);
    let pos = [B[0] + r0[0] * u * wid / 2, B[1] + r0[1] * u * wid / 2, v * B[2]];
    const tb = 1.95 + j * .03;
    const w1 = p.easeOutCubic(p.ph(t, tb, tb + .5));
    if (w1 > 0) pos = p.v3.lerp(pos, p.formation('scatter', k, n, t, { c: [-1.75, -.3, 1.35], R: 1.8, up: .35 }), w1);
    const w2 = p.smooth(0, 1, p.ph(t, 2.2 + d, 2.55 + d));
    if (w2 > 0) {
      const cx = p.lerp(-1.3, .5, p.ease(p.ph(t, 2.3, 3.05)));
      pos = p.v3.lerp(pos, p.formation('spiral', k, n, t, { c: [cx, -.1, 0], R: 1.05, H: 2.4, spin: spin }), w2);
    }
    const t3 = 2.9 + d * 1.2, w3 = p.smooth(0, 1, p.ph(t, t3, t3 + .14));
    if (w3 > 0) {
      const s = p.easeInCubic(p.ph(t, t3, t3 + .5)), a = [.5, -.1, .8 + 1.4 * p.r(k, 4)], b = [2.35, 0, 1.05];
      const q = p.arcPos(a, b, s, .7), wob = Math.sin(s * 9 + k) * .22 * (1 - s);
      pos = p.v3.lerp(pos, [q[0], q[1] + wob + (p.r(k, 5) - .5) * .4 * (1 - s), q[2] + (p.r(k, 6) - .5) * .3 * (1 - s)], w3);
    }
    const w4 = p.smooth(0, 1, p.ph(t, 3.2 + d * .9, 3.42 + d * .9));
    if (w4 > 0) {
      const cr = SR * (1 - .65 * p.easeInCubic(p.ph(t, 3.6, 3.8)));
      pos = p.v3.lerp(pos, p.formation('sphere', k, n, t, { c: [2.35, 0, 1.05], R: cr, spin: 2.2 + 3 * p.ph(t, 3.4, 3.8) }), w4);
    }
    return pos;
  },
  draw(p, t) {
    const PE = this.palette.petal, ST = this.palette.steel, SW = this.palette.sword, SL = this.palette.slash;
    const X0 = -2.1, CAST = .83, SH = 1.95, HIT = 3.8, DX = 2.35;
    const nb = Math.round(p.param('blades')), SR = p.param('sphereRadius'), spin = p.param('spiralSpeed');
    const n = Math.max(4, Math.round(p.param('petals') * p.density));
    p.dummy(DX, 0);
    // ---- caster pose ----
    let pose;
    if (t < .15) pose = 'idle';
    else if (t < .45) pose = { a: 'idle', b: 'raise', k: p.easeOutCubic(p.ph(t, .15, .45)) };
    else if (t < CAST - .08) pose = 'raise';
    else if (t < CAST) pose = { a: 'raise', b: 'palm', k: p.easeInCubic(p.ph(t, CAST - .08, CAST)) };
    else if (t < 1.1) pose = 'palm';
    else if (t < 1.45) pose = { a: 'palm', b: 'bothUp', k: p.easeOutBack(p.ph(t, 1.1, 1.45), 1.3) };
    else if (t < 2.75) pose = 'bothUp';
    else if (t < 3.0) pose = { a: 'bothUp', b: 'point', k: p.easeOutCubic(p.ph(t, 2.75, 3.0)) };
    else if (t < 4.05) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.05, 4.7)) };
    const fig = p.figure(X0, 0, { pose });
    // ---- the sword: materialises point-down in the hand, plunges, then sinks on its own ----
    const SLEN = 1.15, grow = p.easeOutBack(p.ph(t, .28, .45), 1.6), REL = 1.08;
    let top = null;
    if (t >= .28 && t < REL) top = [fig.hand[0], fig.hand[1], fig.hand[2] + .06];
    else if (t >= REL && t < 2.0) top = [-1.6, -.04, 1.06 - 1.35 * p.easeInCubic(p.ph(t, REL, 1.95))];
    if (top) {
      const L = SLEN * grow, tilt = t < CAST ? [.12, 0, -1] : [.04, 0, -1];
      const d = p.v3.norm(tilt);
      this.flatBlade(p, [top[0] + d[0] * .1, top[1], top[2] + d[2] * .1], d, L - .1, .11, SW, { shoulder: .85 });
      if (grow > .5) {
        const c = p.cam(), r = p.v3.norm(p.v3.cross(d, c.fwd)), g = [top[0] + d[0] * .1, top[1] + d[1] * .1, top[2] + d[2] * .1];
        p.capsule([g[0] - r[0] * .13, g[1] - r[1] * .13, g[2]], [g[0] + r[0] * .13, g[1] + r[1] * .13, g[2]], .025, .025, SW, { shadow: false });
        p.capsule(g, [top[0] - d[0] * .12, top[1], top[2] - d[2] * .12], .03, .03, ST, { shadow: false });
      }
    }
    // ---- giant blades rise behind the caster, crack, shatter ----
    const riseT = k => 1.18 + k * .09;
    for (let k = 0; k < nb; k++) {
      const B = this.bladeBase(k, nb), tb = SH + k * .03, r0 = riseT(k);
      if (t < r0 - .25 || t >= tb) continue;
      // ground light racing from the sword to the blade base just before it rises
      if (t < r0 + .1) {
        const u = p.easeOutCubic(p.ph(t, r0 - .25, r0)), fade = 1 - p.ph(t, r0, r0 + .1);
        p.line([-1.6, -.04, .02], p.v3.lerp([-1.6, -.04, .02], [B[0], B[1], .02], u), .07, PE, .9 * fade, { w1: .04, i1: .6 * fade });
      }
      if (t < r0) continue;
      const e = p.easeOutBack(p.ph(t, r0, r0 + .28), 1.4), h = B[2];
      const crack = p.ph(t, tb - .17, tb);
      const fb = this.flatBlade(p, [B[0], B[1], -h * (1 - e) - .02], [0, 0, 1], h, .36, ST, { lit: crack * .15 });
      if (t < r0 + .3) p.light(B[0], B[1], 0, .7, PE, .8 * (1 - p.ph(t, r0, r0 + .3)));
      if (crack > 0) {
        // zigzag cracks across the blade face, glowing before the break
        for (let c = 0; c < 4; c++) {
          const zc = h * (.18 + c * .2 + p.r(k * 7 + c, 9) * .08), pts = [];
          for (let s = 0; s <= 3; s++) {
            const q = fb.ridge(zc / h + (s % 2 ? .05 : -.03)), side = (s / 3 * 2 - 1) * .17;
            pts.push([q[0] + fb.r[0] * side + p.cam().fwd[0] * .04, q[1] + fb.r[1] * side + p.cam().fwd[1] * .04, q[2] + p.cam().fwd[2] * .04]);
          }
          p.trail(pts, .05, .03, PE, .6 + .7 * crack, .6 + .7 * crack);
        }
        p.glow(B[0], B[1], h * .55, .25 + .15 * crack, PE, .3 * crack);
      }
    }
    // ---- ground ripple rings from the sword ----
    for (let k = 0; k < 3; k++) {
      const a = t - (CAST + k * .17);
      if (a < 0 || a > .95) continue;
      const u = a / .95, rr = .15 + 2.2 * p.easeOutCubic(u);
      p.ring(-1.6, -.04, .01, rr, .1 * (1 - u) + .03, PE, 1.1 * Math.pow(1 - u, 1.3));
      if (k === 0) p.light(-1.6, -.04, 0, rr + .3, PE, .7 * (1 - u));
    }
    if (t > CAST && t < 2.0) {
      const g = 1 - p.ph(t, 1.6, 2.0);
      p.decal(-1.6, -.04, 0, .45, (x, y, rho) => p.band(rho, .28, .07) + (rho < .14 ? 1 : 0) * .6, PE, .9 * g);
    }
    // ---- charge on the raised sword ----
    if (t > .35 && t < CAST + .05 && top) {
      const ch = p.ph(t, .35, CAST), mid = [top[0] + .06, top[1], top[2] - .5];
      p.charge(mid[0], mid[1], mid[2], ch, { n: 16, R: 1.3, ramp: PE, up: .2 });
      p.line([top[0], top[1], top[2] - .1], [top[0] + .1, top[1], top[2] - 1.05], .1, PE, .35 + .5 * ch, { w1: .03 });
      p.glow(mid[0], mid[1], mid[2], .16 + .1 * ch, PE, .3 * ch);
      if (t < .5) p.sparkle(top[0], top[1], top[2] - .4, Math.round(6 * (1 - p.ph(t, .3, .5))), SL, 1);
    }
    // ---- the swarm ----
    if (t >= SH) {
      const a = t - HIT, burst = a >= 0, sc = burst ? SR * .35 : 0;
      let cx = 0, cy = 0, cz = 0, cn = 0;
      for (let k = 0; k < n; k++) {
        let pos, prev, I = 1;
        const j = k % nb;
        if (t < SH + j * .03) continue;
        if (!burst) {
          pos = this.petalPos(p, k, n, t, nb, SR, spin);
          prev = this.petalPos(p, k, n, t - .03, nb, SR, spin);
          if (t < SH + j * .03 + .12) I = 1.5;
        } else {
          // burst: out with drag, then a slow fluttering fall
          const dir = p.rdir(k, 21, 0), out = sc + p.drag(3.2 + 2.4 * p.r(k, 22), 3.4, a), fall = .35 * a * a + .1 * a;
          const fl = Math.sin(a * 7 + k * 1.7) * .12 * p.ph(a, .1, .5);
          const at = s => {
            const o2 = sc + p.drag(3.2 + 2.4 * p.r(k, 22), 3.4, s), f2 = .35 * s * s + .1 * s, w = Math.sin(s * 7 + k * 1.7) * .12 * p.ph(s, .1, .5);
            return [DX + dir[0] * o2 + w, dir[1] * o2 - w * .5, Math.max(.04, 1.05 + dir[2] * o2 - f2)];
          };
          pos = [DX + dir[0] * out + fl, dir[1] * out - fl * .5, Math.max(.04, 1.05 + dir[2] * out - fall)];
          prev = at(Math.max(0, a - .03));
          const life = .55 + .45 * p.r(k, 23);
          I = 1 - p.easeInCubic(p.ph(a, life * .45, life));
          if (I <= 0) continue;
        }
        let dv = [pos[0] - prev[0], pos[1] - prev[1], pos[2] - prev[2]];
        if (Math.hypot(dv[0], dv[1], dv[2]) < .004) dv = [Math.cos(k + t * 3), Math.sin(k + t * 3), .4];
        p.petal(pos[0], pos[1], pos[2], dv, .17, PE, I * (burst ? 1 : .95));
        cx += pos[0]; cy += pos[1]; cz += pos[2]; cn++;
      }
      if (cn) p.light(cx / cn, cy / cn, 0, 1.6, PE, burst ? .6 * (1 - p.ph(a, 0, .8)) : .55);
      // shatter flash on each blade
      for (let k = 0; k < nb; k++) {
        const B = this.bladeBase(k, nb), u = p.ph(t, SH + k * .03, SH + k * .03 + .18);
        if (u > 0 && u < 1) { p.glow(B[0], B[1], B[2] * .55, .2 + .25 * u, PE, .7 * Math.pow(1 - u, 2), { pow: 1.4 }); p.sparkle(B[0], B[1], B[2] * .55, Math.round(7 * (1 - u)), PE, 1.2 * (1 - u)); }
      }
    }
    // ---- tornado: faint wind arcs on the funnel while the swarm spirals ----
    const tw = p.env(t, 2.25, 2.5, 2.9, 3.15);
    if (tw > 0) {
      const cx = p.lerp(-1.3, .5, p.ease(p.ph(t, 2.3, 3.05))), H = 2.4;
      for (let i = 0; i < 5; i++) {
        const h = (i + .5) / 5 * H, rad = 1.05 * (.25 + .75 * Math.pow(h / H, .8)), a0 = t * spin * (2.2 - h / H) * 1.1 + i * 1.9;
        p.ring(cx, -.1, h, rad * 1.08, .05, PE, .55 * tw, { a0, a1: a0 + 2.4, fn: (ang, u) => Math.sin(Math.PI * u) });
      }
      p.ring(cx, -.1, .02, .45 + .15 * Math.sin(t * 9), .1, PE, .6 * tw);
    }
    // ---- sphere shell + glow, then crossing slashes on the target ----
    const sw = p.env(t, 3.25, 3.45, 3.7, HIT);
    if (sw > 0) {
      const cr = SR * (1 - .65 * p.easeInCubic(p.ph(t, 3.6, 3.8)));
      p.shell(DX, 0, 1.05, cr * 1.06, (nx, ny, nz, rim) => { const v = Math.pow(rim, 2.5); return v > .12 ? v : 0; }, PE, .65 * sw, { back: .25 });
    }
    if (t > 3.35 && t < HIT) {
      const g = p.ph(t, 3.35, HIT);
      p.glow(DX, 0, 1.05, SR * (.55 - .25 * g), PE, .2 + .5 * g * g);
      p.light(DX, 0, 0, 1.6, PE, .5 + .4 * g);
    }
    const a = t - HIT;
    if (a >= 0 && a < .6) {
      const C = [DX, 0, 1.05], fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      const cs = p.cam(), R = cs.right, U = cs.up, F = cs.fwd, cuts = [[1, 1], [1, -1], [1, .1]];
      if (fl > 0) { p.glow(C[0], C[1], C[2], .35 + .4 * fl, SL, 1.1 * fl, { pow: 1.3 }); p.orb(C[0] + F[0] * .4, C[1] + F[1] * .4, C[2] + F[2] * .4, .14 * fl, SL, 1); }
      cuts.forEach((cdir, i) => {
        const u = p.ph(a, i * .05, i * .05 + .32);
        if (u <= 0 || u >= 1) return;
        const L = 1.45, dx = (R[0] * cdir[0] + U[0] * cdir[1]) * L, dy = (R[1] * cdir[0] + U[1] * cdir[1]) * L, dz = (R[2] * cdir[0] + U[2] * cdir[1]) * L;
        const m = [C[0] + F[0] * .45, C[1] + F[1] * .45, C[2] + F[2] * .45];
        p.slash([m[0] - dx, m[1] - dy, m[2] - dz], [m[0] + dx, m[1] + dy, m[2] + dz], { u, ramp: SL, w: .17, I: 1.8, glow: .2 });
      });
      if (a < .22) p.speedLines(C[0], C[1], C[2], { n: 14, R0: .9, R1: 2.4, ramp: PE, I: .75 * (1 - a / .22), seed: Math.floor(t * 30) });
      p.shock(C[0], C[1], .05, p.ph(a, 0, .5), { R: 2, w: .2, ramp: PE });
    }
  },
});
