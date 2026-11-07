// 回音刃 / Echo Blade — Armory pack (original design): twin daggers cut one fixed arc; delayed echoes replay the same
// arc one step further forward each, so the swordsman has lowered his blades while the kill count keeps climbing.
PXFX.define({
  id: 'echo-blade',
  loop: 6.5,
  loopWindow: [.95, 2.55],   // seamless enchant loop in the close-up: one 1.6 s cycle of the echo procession
  view: { r: 4.0, h: 3.0 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    echo: ['#2a4a8a', '#4f8fd0', '#9fd8ff', '#f0fbff'],
    ghost: ['#4f6ca4', '#7290c8', '#a2bfe8', '#d6e6ff'],
  },
  beats: [{ t: .35, kind: 'cast', power: .5 }, { t: 3.0, kind: 'cast', power: .7 }, { t: 3.6, kind: 'pulse', power: .5 }, { t: 4.0, kind: 'pulse', power: .5 }, { t: 4.6, kind: 'hit', power: 1.3 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 50, max: 200, step: 1, value: 100 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 2, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    echoes: { zh: '殘影數量', en: 'echo count', min: 1, max: 12, step: 1, value: 8 },
    stride: { zh: '每個殘影前進距離', en: 'echo stride', min: .2, max: 1, step: .02, value: .6 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .35], k: 'pose', zh: '特寫：劍士雙手各持一把短劍（長 0.69），交叉護在胸前；背景壓暗', en: 'close-up: the swordsman holds a dagger (0.69 long) in each hand, crossed in front of his chest; the background is darkened' },
    { t: [.35, 2.6], k: 'charge', zh: '附魔循環：只有一條固定刀路：以劍士為軸、半徑 1.17，右刀尖高 1.08 由右側 −74° 掃到左側 +100°，左刀尖高 0.9、落後 26 度；每 1.6 ÷ 殘影數 = 0.2 秒出一個殘影：一對半透明短劍沿刀路掃 0.3 秒，身後拖新月形刀光；轉到身後的一段被身體遮住', en: 'enchant loop: there is one fixed blade path: radius 1.17 about the swordsman, the right tip at height 1.08 sweeping from -74 to +100 degrees, the left tip at 0.9 and 26 degrees behind; every 1.6 s / echo count = 0.2 s an echo appears: a pair of see-through daggers sweeps the path in 0.3 s trailing crescent smears; the stretch behind him is hidden by his body' },
    { t: [2.6, 3.0], k: 'shape', zh: '鏡頭拉遠到戰場；劍士壓低身體，雙刀收到身側蓄勢', en: 'the camera pulls back to the battlefield; the swordsman crouches and draws both daggers back' },
    { t: [3.0, 3.5], k: 'motion', zh: '3.0 秒出一刀：劍士原地旋身，雙刀沿同一刀路掃 0.2 秒，面前其實沒有敵人；3.2–3.5 秒他已收刀、雙手垂下', en: 'at 3.0 s he makes one cut: he spins on the spot and both daggers sweep the same path in 0.2 s, with no enemy in reach; by 3.2–3.5 s he has already lowered his blades' },
    { t: [3.2, 4.8], k: 'impact', zh: '殘影 k（k = 1…8）在 3.0 + 0.2k 秒出現在 x = −2.6 + 0.6k，重演同一刀；規則：士兵到殘影軸心距離 ≤ 1.17 且方位角在 ±100° 內即死；命中時間 = 3.0 + 0.2k + (φ + 74°) ÷ 15.2 弧度／秒，φ 為最先掃到他的刀尖角度（右刀在方位角處，左刀晚 26 度），取所有殘影中最早的；默認 8 個殘影 × 0.6 步距剛好蓋住縱隊，方陣、橫列的兩翼在刀弧以外倖存', en: 'echo k (k = 1…8) appears at 3.0 + 0.2k s at x = -2.6 + 0.6k and replays the same cut. Rule: a soldier dies if he is within 1.17 of the echo pivot and his bearing is within ±100 degrees; hit time = 3.0 + 0.2k + (phi + 74 deg) / 15.2 rad/s, phi = the tip angle that reaches him first (the right tip at his bearing, the left 26 degrees later), the earliest over all echoes. The default 8 echoes x 0.6 stride exactly cover the column; the flanks of a block or a line stay outside every arc and survive' },
    { t: [4.8, 6.5], k: 'after', zh: '每個殘影掃完即消散：刃口白芯先退、剩藍色殘影、斷成碎段與單粒像素，地上扇形同時碎開；屍體 5.2–5.55 秒淡出、新兵 5.5–6.1 秒出現；劍士 5.35–5.85 秒回到交叉護胸，鏡頭 5.75–6.35 秒推回特寫', en: 'each echo breaks up right after its sweep: the white edge retreats, a blue afterimage remains, then segments and single pixels, and the ground fan breaks up with it; bodies fade over 5.2–5.55 s and a fresh army appears over 5.5–6.1 s; the swordsman crosses his daggers again over 5.35–5.85 s and the camera pushes back into the close-up over 5.75–6.35 s' },
  ],
  layers: [
    { zh: '武器：兩把程式畫的短劍（加大 1.25 倍），雙手各一，劍身平面朝向鏡頭並寫入深度；殘影的人形與短劍是淡藍色的半透明（抖色）實體', en: 'weapon: two procedural daggers (1.25x size), one per hand, flats facing the camera and writing depth; the echoes’ bodies and daggers are pale blue see-through (dithered) solids' },
    { zh: '路徑先行：刀路只有一條固定弧（右刀尖紅、左刀尖綠），每個殘影都是同一條弧平移 k × 步距；打開「引導線」可看到每個殘影的弧、白色刀尖標記與金色的殘影軸心', en: 'path first: the blade path is one fixed arc (right tip red, left tip green); every echo is the same arc moved by k x stride; the guide toggle shows each echo’s arc, white tip markers and gold pivot ticks' },
    { zh: '筆觸與色階：新月形刀光夾在手（半徑 0.74）與刀尖（1.17）之間，越近刀頭越厚；硬邊四級：刃口白芯（只在刀頭一段）、亮藍、主藍、暗藍內緣，不用光暈；刃口另有一條低鋸齒閃線，每兩格換形；殘影短劍走在刀光最前面', en: 'stroke and tiers: crescent smears between the hand (radius 0.74) and the tip (1.17), thickening towards the head; four hard tiers: a white edge (only near the head), bright blue, main blue, a dark blue inner edge, no bloom; a low zigzag edge stroke reshapes every other frame; the ghost daggers ride in front of the smear' },
    { zh: '消散：殘影掃完後亮芯先退，剩藍色殘影，再斷成碎段與單粒像素；地上的扇形同步碎開；殘影人形淡出', en: 'breakup: after its sweep each echo loses its core, keeps a blue afterimage, then splits into segments and single pixels; its ground fan breaks up in step and the ghost body fades' },
    { zh: '判定與倖存：每個殘影是半徑 1.17、±100° 的扇形，地上畫出與判定完全相同、已掃過部分的扇形；殘影數或步距不夠時縱隊前端倖存，寬陣型兩翼永遠在扇形外', en: 'rule and survivors: every echo is a sector of radius 1.17 and ±100 degrees, and the ground shows exactly the swept part of that sector; with fewer echoes or a shorter stride the head of the column survives, and the flanks of wide formations are always outside' },
    { zh: '軍隊與計數：100 名小兵（默認縱隊）；被刀掃到時閃白並被擊飛（遠離該殘影軸心），命中點一顆藍色星光；刀弧外的倖存者發抖；劍士收刀後擊殺數仍在上升，全滅變金色', en: 'army and counter: 100 soldiers (column by default); when swept they flash white and are knocked away from that echo’s pivot with a blue sparkle; survivors outside the arcs tremble; the count keeps climbing after he has lowered his blades and turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是放大 4 倍的雙刀特寫（背景壓暗），2.55–2.95 秒拉遠到 1.22 倍的戰場，5.75–6.35 秒推回', en: 'camera: the loop opens and closes on a 4x close-up of the daggers (background darkened), pulls back to a 1.22x battlefield view over 2.55–2.95 s and pushes back in over 5.75–6.35 s' },
  ],

  P0: -2.6, AREA: { x: .9, y: 0, rx: 1.8, ry: 1.6 },
  // the arc: tip radius R about the swing pivot, right tip from -A + D to +A, left tip DL behind it
  R: 1.17, A: 1.745, DL: .45, ZR: 1.08, ZL: .9, DS: .2, DSC: 1.25,
  TS: 3.0, LAG: .2, LIFE: .6, CYC: 1.6, C0: .35, CSW: .3,
  KC: 4.0, FOCUS: [-2.35, 0, 1.05], KB: 1.22, PAYC: [.25, 0, .45],

  near(t, p) { return 1 - p.ease(p.ph(t, 2.55, 2.95)) + p.ease(p.ph(t, 5.75, 6.35)); },
  // close-up on the daggers, a slight zoom on the column for the payoff
  lensAt(t, p) {
    const b = this.near(t, p), F = this.FOCUS, Q = this.PAYC, V = [0, 0, 1.5];
    return { k: this.KB + (this.KC - this.KB) * b, c: p.v3.lerp(Q, F, b), to: p.v3.lerp(Q, V, b) };
  },
  // tip position at swing angle a about pivot x
  tip(px, a, z) { return [px + Math.cos(a) * this.R, Math.sin(a) * this.R, z]; },
  // the honest rule: earliest time any echo's twin tips sweep over the unit inside its sector
  hitOf(u, E, stride, out) {
    const A = this.A, DL = this.DL, om = (2 * A - DL) / this.DS;
    let best = null;
    for (let k = 0; k <= E; k++) {
      const px = this.P0 + k * stride, dx = u.x - px, dy = u.y, d = Math.hypot(dx, dy);
      if (d > this.R) continue;
      const th = Math.atan2(dy, dx);
      if (Math.abs(th) > A) continue;
      const ph = th >= -A + DL ? th : th + DL, hit = this.TS + k * this.LAG + (ph + A - DL) / om;
      if (best == null || hit < best) { best = hit; if (out) out.k = k; }
    }
    return best;
  },
  // which echo killed a unit (cached with the hit times)
  plan(units, E, stride) {
    const c = this._pc;
    if (c && c.units === units && c.E === E && c.stride === stride) return c;
    const h = new Array(units.length).fill(null), ek = new Array(units.length).fill(0);
    const o = { k: 0 };
    for (const u of units) { o.k = 0; h[u.i] = this.hitOf(u, E, stride, o); ek[u.i] = o.k; }
    return (this._pc = { units, E, stride, h, ek });
  },
  // one echo: ghost body, twin ghost daggers, two jagged strokes along the fixed arc, the swept sector on the ground
  echo(p, o) {
    const { px, t0, sw, seed, alpha, body, ground } = o, A = this.A, DL = this.DL, PL = this.palette, v3 = p.v3;
    const a = p.clamp((o.t - t0) / sw, 0, 1.6), u = Math.min(1, a), phi = -A + DL + (2 * A - DL) * u;
    const fade = p.ph(o.t - t0 - sw, 0, this.LIFE - sw);
    const pathR = p.path(q => this.tip(px, -A + DL + (2 * A - DL) * q, this.ZR), 40), pathL = p.path(q => this.tip(px, -A + (2 * A - DL) * q, this.ZL), 40);
    // the smear: a crescent between the hand radius and the tip path, thick at the head, thin at the tail, hard tiers
    const L = .42, s0 = Math.max(0, u - L), RI = .74, uh = u - .035 * (1 - fade);
    if (uh - s0 > .01 && fade < 1) {
      const coreOn = fade < .12, brightOn = fade < .4, drop = fade > .45 ? (fade - .45) / .55 : 0;
      for (const [z, a0, sd] of [[this.ZR, -A + DL, 0], [this.ZL, -A, 1]]) {
        const ang = q => a0 + (2 * A - DL) * (s0 + (uh - s0) * q);
        const Lp = [], Rp = [], N = 14;
        for (let j = 0; j <= N; j++) { const a = ang(j / N); Lp.push([px + Math.cos(a) * RI, Math.sin(a) * RI, z - .06]); Rp.push(this.tip(px, a, z)); }
        p.ribbon(Lp, Rp, (q, v) => {
          const th = .12 + .88 * q * q;             // crescent: the smear thickens towards the head
          if (v < 1 - th) return 0;
          const w = (v - (1 - th)) / th;            // 0 inner edge .. 1 tip edge
          if (drop > 0 && p.r(Math.floor(q * 24) * 7 + Math.floor(w * 5) + sd * 131 + seed, 9) < drop) return 0;
          const lv = w > .84 ? (q > .55 && coreOn ? 3 : brightOn ? 2 : 1) : w > .5 ? (brightOn ? 2 : 1) : w > .2 ? 1 : 0;
          return (lv + .5) / 4;
        }, PL.echo, 1);
      }
    }
    // the cutting edge: a jagged stroke along each tip path, reshaped every other frame, breaking up behind
    for (const [path, sd] of [[pathR, 0], [pathL, 1]]) {
      p.zap(path, Math.max(0, u - .2), Math.max(.02, u), PL.echo, { seed: seed * 3 + sd * 17, jag: .9, step: 5, tail: .5, forks: 1, fade, thick: o.thick == null ? 1 : o.thick });
      for (let ch = 0; ch < 2; ch++) {
        const s1 = u - .2 - ch * .1, sa = s1 - .1;
        if (s1 > 0) p.zap(path, Math.max(0, sa), s1, PL.echo, { seed: seed * 3 + sd * 17 + ch + 1, jag: .8, step: 5, fade: Math.max(fade, .4 + ch * .25), forks: 0 });
      }
    }
    // the swept sector on the ground: exactly the honest area, lit behind the tips, breaking up after the swing
    if (ground) {
      const drop = fade > .3 ? (fade - .3) / .7 : 0, R = this.R;
      p.decal(px, 0, 0, R, (x, y, rho, ang) => {
        if (Math.abs(ang) > A) return 0;
        const sweptTo = ang >= -A + DL ? phi : phi - DL;
        if (ang > sweptTo) return 0;
        if (drop > 0 && p.r(Math.floor(x / .1) * 57 + Math.floor(y / .1), 3) < drop) return 0;
        const lead = sweptTo - ang < .14 && u < 1;
        const lv = lead && fade < .1 ? 3 : rho > R - .08 ? (fade < .4 ? 2 : 1) : 0;
        return (lv + .5) / 4;
      }, PL.echo, fade < .7 ? 1 : 0);
    }
    if (fade >= 1 || alpha <= 0) return { phi, pathR, pathL, live: u < 1 };
    // ghost swordsman spinning through the cut, and his twin ghost daggers
    const ga = alpha * (1 - fade);
    let hand = [px + .5 * Math.cos(phi - DL / 2), .5 * Math.sin(phi - DL / 2), 1.0], handL = hand;
    if (body) {
      const f = p.figure(px, 0, { pose: 'palm', face: phi - DL / 2, alpha: ga * .9, color: PL.ghost });
      hand = f.hand; handL = f.handL;
    }
    if (ga > .08) for (const [hd, ang, z] of [[hand, phi, this.ZR], [handL, phi - DL, this.ZL]]) {
      const tp = this.tip(px, ang, z), d = v3.norm([tp[0] - hd[0], tp[1] - hd[1], tp[2] - hd[2]]), len = Math.hypot(tp[0] - hd[0], tp[1] - hd[1], tp[2] - hd[2]);
      p.weapon('dagger', hd, d, { len, alpha: ga, ramp: PL.ghost, grip: PL.ghost, guard: PL.ghost, width: this.DSC });
    }
    return { phi, pathR, pathL, live: u < 1 };
  },

  draw(p, t) {
    const PL = this.palette, v3 = p.v3, A = this.A, DL = this.DL;
    const E = Math.round(p.param('echoes')), stride = p.param('stride'), near = this.near(t, p);
    const formation = PXFX.TROOPS[p.param('formation') | 0].id;
    const LW = this.loopWindow, inWin = t >= LW[0] && t < 2.9, cy = (t - LW[0]) / this.CYC, seed = inWin ? p.hold(LW[0] + (cy - Math.floor(cy + 1e-9)) * this.CYC + 1e-9) : p.hold(t);

    // ----- the swordsman: guard with crossed daggers, one spinning cut, blades lowered -----
    const TS = this.TS, sw = p.ph(t, TS, TS + this.DS), phi = -A + DL + (2 * A - DL) * sw;
    const wind = p.ease(p.ph(t, 2.6, 2.95)), low = p.ease(p.ph(t, TS + .22, TS + .5)), back = p.ease(p.ph(t, 5.35, 5.85));
    let pose, face = 0, daggers;
    if (t < TS) {
      pose = { a: 'guard', b: 'windup', k: wind };
      face = -A * .4 * wind;
    } else if (t < TS + this.DS + .02) {
      pose = 'palm'; face = phi - DL / 2;
    } else {
      pose = back > 0 ? { a: 'idle', b: 'guard', k: back } : { a: 'palm', b: 'idle', k: low };
      face = (A - DL / 2) * (1 - low);
    }
    const fig = p.figure(this.P0, 0, { pose, face });

    // ----- the column -----
    const lay = { n: Math.round(p.param('crowd')), seed: 17, formation, area: this.AREA, faceTo: [this.P0, 0] };
    const units = p.crowdLayout(lay), pl = this.plan(units, E, stride);
    const st = p.crowd(Object.assign({
      t, scale: 'auto', maxScale: 1.2, hit: u => pl.h[u.i], react: 'knock', power: u => .7 + .3 * u.r3,
      at: u => [this.P0 + pl.ek[u.i] * stride, 0, 0],
      fear: u => (pl.h[u.i] == null ? .35 * p.env(t, 3.1, 3.3, 4.9, 5.3) : 0),
      respawn: [5.5, 6.1], clear: [5.2, 5.55],
    }, lay));

    if (near > 0) p.grade({ dark: .8 * near, desat: .45 * near, tint: '#141a2e', tintAmt: .35 * near, bg: near });

    // the real daggers
    const sideDir = (hd, ang, z) => { const tp = this.tip(this.P0, ang, z); return v3.norm([tp[0] - hd[0], tp[1] - hd[1], tp[2] - hd[2]]); };
    if (t >= TS && t < TS + this.DS + .02) daggers = [[fig.hand, sideDir(fig.hand, phi, this.ZR)], [fig.handL, sideDir(fig.handL, phi - DL, this.ZL)]];
    else if (t >= TS) {
      const k = Math.max(low, back);
      const fw = [Math.cos(face), Math.sin(face), 0];
      const dn = v3.norm([fw[0] * .25, fw[1] * .25, -1]), crossR = v3.norm([.3, .5, .8]), crossL = v3.norm([.3, -.5, .8]);
      daggers = back > 0 ? [[fig.hand, v3.norm(v3.lerp(dn, crossR, back))], [fig.handL, v3.norm(v3.lerp(dn, crossL, back))]]
        : [[fig.hand, v3.norm(v3.lerp(sideDir(fig.hand, A, this.ZR), dn, k))], [fig.handL, v3.norm(v3.lerp(sideDir(fig.handL, A - DL, this.ZL), dn, k))]];
    } else {
      const crossR = v3.norm([.3, .5, .8]), crossL = v3.norm([.3, -.5, .8]), cw = [Math.cos(face), Math.sin(face)];
      const rot = d => [d[0] * cw[0] - d[1] * cw[1], d[0] * cw[1] + d[1] * cw[0], d[2]];
      daggers = [[fig.hand, v3.norm(v3.lerp(rot(crossR), [-.6, .3, .5], wind))], [fig.handL, v3.norm(v3.lerp(rot(crossL), [-.6, -.3, .5], wind))]];
    }
    for (const [hd, d] of daggers) p.weapon('dagger', v3.along(hd, d, -.06), d, { scale: this.DSC });

    // ----- enchant loop in the close-up: echoes of the cut sweep the same arc around him, one every 1.6 / E s -----
    const marks = [[], []];
    let arcR = null, arcL = null;
    if (t > this.C0 && t < 2.9 + this.LIFE) {
      const gap = this.CYC / E, i1 = Math.floor((Math.min(t, 2.9) - this.C0) / gap + 1e-6), i0 = Math.max(0, Math.ceil((t - this.LIFE - this.C0) / gap - 1e-6));
      for (let i = i0; i <= i1; i++) {
        const t0 = this.C0 + i * gap, j = i % E;
        if (t0 > 2.6) break;
        const e = this.echo(p, { px: this.P0, t0, t, sw: this.CSW, seed: seed * 5 + j * 13, alpha: .75 - .03 * j, body: false, ground: false, thick: 1 });
        arcR = e.pathR; arcL = e.pathL;
        if (e.live) { marks[0].push(e.pathR.at(p.ph(t, t0, t0 + this.CSW))); marks[1].push(e.pathL.at(p.ph(t, t0, t0 + this.CSW))); }
      }
    }
    if (p.guiding && t < 3.0) {
      const pR = arcR || p.path(q => this.tip(this.P0, -A + DL + (2 * A - DL) * q, this.ZR), 40), pL = arcL || p.path(q => this.tip(this.P0, -A + (2 * A - DL) * q, this.ZL), 40);
      p.guide(pR, 'red', { marks: marks[0] });
      p.guide(pL, 'green', { marks: marks[1] });
    }

    // ----- the cut and its echoes: echo k replays the arc at pivot P0 + k * stride, LAG later -----
    for (let k = 0; k <= E; k++) {
      const t0 = TS + k * this.LAG;
      if (t < t0 - .06 || t > t0 + this.LIFE + .05) continue;
      const px = this.P0 + k * stride, aIn = p.easeOut(p.ph(t, t0 - .06, t0));
      const e = this.echo(p, { px, t0, t, sw: this.DS, seed: seed * 7 + k * 29, alpha: k ? .85 * aIn : 0, body: k > 0, ground: true, thick: 2 });
      if (p.guiding) p.guide(e.pathR, k & 1 ? 'green' : 'red', { marks: e.live && t >= t0 ? [e.pathR.at(p.ph(t, t0, t0 + this.DS))] : [] });
    }
    if (p.guiding && t > TS - .3 && t < TS + E * this.LAG + this.LIFE) {
      for (let k = 0; k <= E; k++) p.guide([[this.P0 + k * stride, -.12, .02], [this.P0 + k * stride, .12, .02]], 'gold');
    }

    // impact sparks on every soldier as an echo reaches him
    for (const s of st) {
      if (s.hitT == null || t < s.hitT || t > s.hitT + .12 || s.hidden) continue;
      p.sparkle(s.chest[0], s.chest[1], s.chest[2], 3, PL.echo, 1.2 * (1 - (t - s.hitT) / .12));
    }

    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 2.75, 2.95) * (1 - p.ph(t, 5.25, 5.45)) });
  },
});
