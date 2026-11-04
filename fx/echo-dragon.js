// 殘響龍 / Echo Dragon — Ultimates pack (original design): a dragon of rushing wind S-curves across the field and on impact breaks apart into spinning wind blades that cut outwards
PXFX.define({
  id: 'echo-dragon',
  loop: 3.8,
  beats: [{ t: .9, kind: 'cast', power: .8 }, { t: 1.52, kind: 'hit', power: 1.3 }, { t: 1.72, kind: 'pulse', power: .5 }],
  view: { r: 3.3, h: 2.8 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'charge', 'slash', 'creature', 'swarm', 'shockwave', 'impact', 'aftermath'],
  palette: {
    wind: ['#16807e', '#22b39b', '#4fe6b4', '#a8ffd9', '#efffff'],
    deep: ['#145f74', '#1d8c9c', '#3fc0c8', '#9ef0f0'],
    scar: ['#232a31'],
  },
  timeline: [
    { k: 'pose', t: [0, .3], zh: '起手：施法者由站姿轉為架式', en: 'pose: the caster shifts from idle into a stance' },
    { k: 'charge', t: [.3, .9], zh: '集氣：右臂拉到身後蓄力，3 道螺旋氣流（14 條薄荷綠短光線）繞身體旋轉上升，光點匯聚到手上', en: 'charge: the right arm draws back; 3 spiral air streams (14 short mint streaks) circle and rise round the body, motes converge on the hand' },
    { k: 'shape', t: [.9, 1.0], zh: '成形：0.07 秒內揮臂，身前掃出一道薄荷綠彎月氣刃，一條風之龍（22 節發光身體＋龍頭）由手中衝出', en: 'shape: the arm swings in 0.07 s, a mint crescent of air sweeps in front, and a wind dragon (22 glowing segments + head) shoots out of the hand' },
    { k: 'motion', t: [1.0, 1.52], zh: '推進：龍以 S 形路徑（擺幅約 1.3，斜向上下左右）高速飛越戰場，身體兩側拖着 2 排平行速度線', en: 'motion: the dragon streaks across the field on an S-curve (~1.3 amplitude, tilted sideways and up), two rows of parallel speed lines trailing along its body' },
    { k: 'impact', t: [1.52, 1.8], zh: '命中：龍頭撞中木樁，白閃＋豎立風環＋地面衝擊環；整條龍瞬間分解，每節化成 4 片旋轉月牙風刃向外飛散，0.25 秒內 10 道斬擊閃光交錯出現', en: 'impact: the head hits the dummy, white flash, an upright wind ring and a ground ring; the whole dragon breaks apart, each segment turning into 4 spinning crescent wind blades that fly outwards, with 10 slash flashes crossing within 0.25 s' },
    { k: 'after', t: [1.8, 3.8], zh: '餘波：風刃先快後慢、邊轉邊縮小消散，5 縷捲曲氣流上升淡出，地面留下細長刀痕慢慢淡出，施法者收手', en: 'aftermath: the blades slow down, spinning and shrinking until they vanish; 5 curling wisps of air rise and fade; thin cut scars on the ground fade; the caster recovers' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→後拉→揮臂→收手', en: 'caster: faceless mannequin, poses idle → stance → wind-up → swing → recover' },
    { zh: '風之龍：沿 S 形曲線取樣 22 節發光圓（頭粗尾細，半徑約 0.22），薄荷綠到白色漸層，隔節冒出短氣流舌；龍頭為發光線條的上下顎與雙角', en: 'wind dragon: 22 glowing circles sampled along an S-curve (thick head, thin tail, radius ~0.22), mint to white ramp, short air licks on every other segment; the head is glowing line jaws and two horns' },
    { zh: '速度線：沿龍身兩側各 1 排細線，方向與身體切線平行、向後拖長', en: 'speed lines: one row of thin streaks on each side of the body, parallel to its tangent and trailing backwards' },
    { zh: '風刃：命中時每節身體生成 4 片（共約 88 片）面向鏡頭的小月牙，中間厚兩端尖，帶阻力向外飛散並旋轉，0.6–0.9 秒內縮小消失', en: 'wind blades: at the hit every segment spawns 4 small camera-facing crescents (~88 in total), thick in the middle and pointed at the ends, flying outwards with drag while spinning, shrinking away within 0.6–0.9 s' },
    { zh: '斬擊閃光：10 道直線閃光，由中間向兩端伸長再變細，隨機角度交錯在木樁四周', en: 'slash flashes: 10 straight flashes that grow from the middle out and then thin, at random angles criss-crossing round the dummy' },
    { zh: '命中：白色閃光、豎立風環、地面衝擊環、14 條放射速度線', en: 'impact: a white flash, an upright wind ring, a ground shock ring, 14 radial speed lines' },
    { zh: '地面：6 條細長深色刀痕貼地，1.2 秒內淡出', en: 'ground: 6 long thin dark cut scars on the ground, fading over 1.2 s' },
  ],
  params: {
    blades: { zh: '每節風刃數', en: 'blades per segment', min: 1, max: 6, step: 1, value: 4 },
    length: { zh: '龍身長度', en: 'dragon length', min: .3, max: .9, step: .05, value: .6 },
    spin: { zh: '風刃轉速', en: 'blade spin speed', min: .5, max: 6, step: .25, value: 3 },
  },
  // head progress along the guide: launched hard off the swing, then keeps accelerating
  head(p, t, CAST, HIT) { const u = p.ph(t, CAST, HIT); return .3 * p.easeOutCubic(Math.min(1, u / .25)) + .7 * u * u; },
  // S-curve from the hand to the target in a tilted plane (reads in 2D as well), with a travelling body wave
  guide(p, g, H0, t) {
    g = p.clamp(g, 0, 1);
    const T = [2.0, 0, 1.15], S = 1.3 * Math.sin(p.TAU * g) * Math.pow(Math.sin(Math.PI * g), .4), w = .07 * Math.sin(g * 18 - t * 16) * Math.sin(Math.PI * g);
    return [H0[0] + (T[0] - H0[0]) * g, H0[1] + (T[1] - H0[1]) * g + S * .4 + w, H0[2] + (T[2] - H0[2]) * g + S * .72 + .4 * Math.sin(Math.PI * g) + w];
  },
  // one small camera-facing crescent blade: centre c, radius r, facing angle ang (screen plane)
  blade(p, c, r, ang, ramp, I, cm) {
    let prev = null;
    for (let i = 0; i <= 4; i++) {
      const th = ang - 1.15 + i / 4 * 2.3, ca = Math.cos(th) * r, sa = Math.sin(th) * r;
      const pt = [c[0] + cm.right[0] * ca + cm.up[0] * sa, c[1] + cm.right[1] * ca + cm.up[1] * sa, c[2] + cm.right[2] * ca + cm.up[2] * sa];
      if (prev) p.line(prev, pt, .015 + r * .5 * Math.sin(Math.PI * (i - 1) / 4), ramp, I, { w1: .015 + r * .5 * Math.sin(Math.PI * i / 4) });
      prev = pt;
    }
  },
  draw(p, t) {
    const WD = this.palette.wind, DP = this.palette.deep;
    const CAST = .9, HIT = 1.52, X0 = -2.1, DX = 2.35, L0 = p.param('length'), NS = 22, cm = p.cam();
    const a = t - HIT;
    // ---- ground scars ----
    if (a > 0) {
      const amt = 1 - p.ph(a, .6, 1.8);
      p.stain(DX - .4, 0, 1.6, (dx, dy) => {
        for (let k = 0; k < 6; k++) {
          const an = p.r(k, 71) * Math.PI, ox = (p.r(k, 72) - .5) * 1.1, oy = (p.r(k, 73) - .5) * 1.1;
          const ux = Math.cos(an), uy = Math.sin(an), qx = dx - ox, qy = dy - oy, al = qx * ux + qy * uy, pe = Math.abs(qx * uy - qy * ux);
          const hl = .45 + .35 * p.r(k, 74);
          if (Math.abs(al) < hl * p.easeOutExpo(a / .12) && pe < .035 * (1 - Math.abs(al) / hl) + .012) return 1.2;
        }
        return 0;
      }, this.palette.scar[0], amt);
    }
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < CAST) pose = { a: 'ready', b: 'windup', k: p.easeOutBack(p.ph(t, .3, .7), 1.3) };
    else if (t < CAST + .07) pose = { a: 'windup', b: 'swing', k: p.easeInCubic((t - CAST) / .07) };
    else if (t < 2.3) pose = 'swing';
    else pose = { a: 'swing', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.3, 3.1)) };
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose });
    const ch = p.ph(t, .3, CAST);
    // ---- charge: spiral air streams round the caster, motes into the hand ----
    const si = t < CAST ? p.easeOutCubic(ch) : 1 - p.ph(t, CAST, CAST + .3);
    if (si > .01 && t > .3) {
      const n = Math.round(14 * p.density);
      for (let k = 0; k < n; k++) {
        const o = { c: [X0, 0, 0], R: .75, H: 1.9, spin: 3.2 };
        const q0 = p.formation('spiral', k, n, t, o), q1 = p.formation('spiral', k, n, t - .05, o);
        p.line(q0, q1, .05, WD, .9 * si, { w1: .01, i1: .2 * si });
      }
      if (t < CAST) {
        p.charge(fig.hand[0], fig.hand[1], fig.hand[2], ch, { n: 12, R: 1.2, ramp: WD, up: .2, seed: 4 });
        p.glow(fig.hand[0], fig.hand[1], fig.hand[2], .12 + .15 * ch, WD, .6 * ch);
      }
      p.light(X0, 0, 0, 1.2, WD, .35 * si);
    }
    // ---- the swing sweeps a crescent of air ----
    if (t >= CAST && t < CAST + .3) {
      const u = p.ph(t, CAST, CAST + .3);
      p.crescent({ c: [X0 + .1, 0, .95], dir: [1, 0, 0], side: [0, .35, .94], R: .8 * p.easeOutBack(Math.min(1, u * 3), 1.5), thick: .3, arc: 2.6, edge: WD, I: 1.1, u, seed: 2 });
    }
    // ---- the wind dragon in flight ----
    const H0 = fig.hand;
    if (t >= CAST && t < HIT + .06) {
      const hN = t < HIT ? this.head(p, t, CAST, HIT) : 1, L = Math.min(L0, hN), tt = Math.min(t, HIT);
      const path = s => this.guide(p, hN - s * L, H0, tt);
      const grow = p.easeOutBack(p.ph(t, CAST, CAST + .12), 1.6), w = .27 * grow * (.6 + .4 * Math.min(1, L / L0));
      const fl = t >= HIT ? 1.3 : .8;
      p.serpent(path, { n: NS, w, ramp: WD, t, jaw: .55, eye: DP, headScale: 2.1, I: fl });
      // two rows of speed lines along the body, parallel to its tangent
      for (let k = 1; k < NS; k += 2) {
        const s = k / NS, q = path(s), q2 = path(Math.min(1, s + .04)), tg = p.v3.norm([q[0] - q2[0], q[1] - q2[1], q[2] - q2[2]]);
        const prof = Math.pow(1 - s, .75), off = w * prof * 1.5 + .06, sg = k % 4 === 1 ? 1 : -1;
        const b0 = [q[0] + cm.up[0] * off * sg, q[1] + cm.up[1] * off * sg, q[2] + cm.up[2] * off * sg];
        const len = .35 + .45 * p.r(k + Math.floor(t * 20), 5);
        p.line(b0, [b0[0] - tg[0] * len, b0[1] - tg[1] * len, b0[2] - tg[2] * len], .04, WD, .8, { w1: .01, i1: .1 });
      }
      const hp = path(0);
      p.light(hp[0], hp[1], 0, 1.3, WD, .45);
    }
    // ---- impact: the dragon breaks into spinning wind blades ----
    if (a >= 0) {
      const C = [DX - .15, 0, 1.15];
      const fl = Math.pow(1 - p.ph(a, 0, .15), 2);
      if (fl > 0) p.glow(C[0], C[1], C[2], .4 + .8 * fl, WD, 1.6 * fl, { pow: 1.3 });
      p.shock(C[0] - .1, 0, C[2], p.ph(a, 0, .4), { R: 1.5, w: .22, ramp: WD, axis: [1, 0, 0], light: false });
      p.shock(DX, 0, .04, p.ph(a, .02, .55), { R: 2.1, w: .26, ramp: DP });
      if (a < .18) p.speedLines(C[0], 0, C[2], { n: 14, R0: .5, R1: 2.6, ramp: WD, I: 1 - a / .18, seed: Math.floor(t * 30) });
      // blades: every body segment (frozen at the hit) becomes `blades` spinning crescents flying outwards
      const per = Math.round(p.param('blades')), nB = Math.round(NS * per * p.density), spin = p.param('spin');
      const frozen = s => this.guide(p, 1 - s * L0, H0, HIT);
      for (let j = 0; j < nB; j++) {
        const k = j % NS, s = (k + .5) / NS, life = .55 + .4 * p.r(j, 11), st = s * .08, ag = a - st, u = ag / life;
        if (ag < 0 || u >= 1) continue;
        const o = frozen(s), d = p.rdir(j, 13, .15), v0 = (2.6 + 2.4 * p.r(j, 14)) * (1 - .4 * s), m = p.drag(v0, 3.6, ag);
        const c = [o[0] + d[0] * m, o[1] + d[1] * m, Math.max(.1, o[2] + d[2] * m + .25 * ag)];
        const sg = p.r(j, 15) < .5 ? -1 : 1, ang = p.r(j, 16) * p.TAU + sg * p.TAU * spin * p.drag(1, 1.4, ag);
        const r = (.13 + .09 * p.r(j, 17)) * (1 - .55 * u) * (1 - .3 * s);
        this.blade(p, c, r, ang, j % 3 ? WD : DP, 1.25 * Math.pow(1 - u, .8), cm);
      }
      // slash flashes criss-crossing round the dummy and along the broken body
      const nS = Math.round(10 * Math.min(1.5, p.density));
      for (let k = 0; k < nS; k++) {
        const st = p.r(k, 21) * .25, u = (a - st) / .2;
        if (u < 0 || u >= 1) continue;
        const o = k < 6 ? [C[0] + (p.r(k, 22) - .5) * 1.2, (p.r(k, 23) - .5) * .8, .5 + p.r(k, 24) * 1.3] : frozen(.2 + p.r(k, 25) * .6);
        const an = p.r(k, 26) * Math.PI, L = .45 + .35 * p.r(k, 27), ex = Math.cos(an) * L, ey = Math.sin(an) * L;
        const A = [o[0] - cm.right[0] * ex - cm.up[0] * ey, o[1] - cm.right[1] * ex - cm.up[1] * ey, o[2] - cm.right[2] * ex - cm.up[2] * ey];
        const B = [o[0] + cm.right[0] * ex + cm.up[0] * ey, o[1] + cm.right[1] * ex + cm.up[1] * ey, o[2] + cm.right[2] * ex + cm.up[2] * ey];
        p.slash(A, B, { u, ramp: WD, w: .08, I: 1.4 });
      }
      // lingering wind wisps curl upwards and fade
      const nW = Math.round(5 * p.density);
      for (let k = 0; k < nW; k++) {
        const u = p.ph(a, .25 + k / nW * .4, 1.4 + k / nW * .45);
        if (u <= 0 || u >= 1) continue;
        const an = k / nW * p.TAU + p.r(k, 41), rad = .5 + .5 * p.easeOutCubic(u);
        p.ring(DX + Math.cos(an) * rad * .6, Math.sin(an) * rad * .6, .5 + p.r(k, 42) * .6 + u * .9, .22 + .12 * u, .04, WD, .8 * (1 - u), { axis: p.rdir(k, 43, .3), a0: u * 4 + k, a1: u * 4 + k + 2.4, fn: (ang, uu) => Math.sin(Math.PI * uu) });
      }
      p.light(DX, 0, 0, 2, WD, .8 * fl + .3 * (1 - p.ph(a, 0, .8)));
    }
  },
});
