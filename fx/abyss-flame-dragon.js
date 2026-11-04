// 冥炎黑龍 / Abyss Flame Dragon — Ultimates pack (original design): black fire coils round the outstretched arm and erupts into a long black-flame dragon that weaves across the field onto the target
PXFX.define({
  id: 'abyss-flame-dragon',
  loop: 4.2,
  beats: [{ t: 1.2, kind: 'cast', power: .9 }, { t: 2.05, kind: 'hit', power: 1.4 }],
  view: { r: 3.3, h: 3.1 },
  stage: { ground: 'ash', tiles: true },
  modules: ['figure', 'charge', 'grade', 'creature', 'aura', 'shockwave', 'impact', 'aftermath'],
  palette: {
    body: ['#0a0710', '#130c1c', '#1e1329', '#2b1b3a'],
    edge: ['#5b1fa8', '#8a3ff0', '#b06cff', '#dca6ff', '#fbefff'],
    ember: ['#8c1f86', '#c03fd6', '#e67cf2', '#ffd2fb'],
    smoke: ['#141018', '#211b27', '#2f2737', '#3e3448'],
  },
  timeline: [
    { k: 'pose', t: [0, .42], zh: '起手：施法者由站姿轉為架式，0.12 秒內把右臂向前猛然伸直', en: 'pose: idle into a stance, then the right arm thrusts straight forward in 0.12 s' },
    { k: 'charge', t: [.42, 1.2], zh: '集氣：3 條紫色螺旋火舌沿前臂收緊，手臂上 3 團小型黑炎（不透明黑色、紫色邊緣）逐漸變大，紫色光點匯聚到手心；環境壓暗 40%', en: 'charge: 3 violet spiral licks tighten round the forearm, 3 small black flames (opaque black, violet rim) grow on the arm, violet motes converge on the palm; the scene darkens 40%' },
    { k: 'shape', t: [1.2, 1.35], zh: '成形：黑炎在手心爆開，一條黑炎龍（30 節黑色實心身體、紫色外緣、龍頭與雙角）由手中噴出，龍尾仍連着手心', en: 'shape: the black fire bursts from the palm and a black-flame dragon (30 dark solid segments, violet rim, horned head) pours out of the hand, its tail still anchored there' },
    { k: 'motion', t: [1.35, 2.05], zh: '推進：龍頭先急衝再加速，沿上升弧線左右蛇行（擺幅約 0.65），身體沿同一路徑跟隨，邊緣不斷飄出紫色火星，接近目標時張大嘴', en: 'motion: the head kicks out then accelerates along a rising arc that weaves side to side (~0.65 sway), the body follows the same path shedding violet embers; the jaws open wide near the target' },
    { k: 'impact', t: [2.05, 2.45], zh: '命中：龍頭咬中木樁，紫白閃光、放射速度線、地面衝擊環；龍身在 0.35 秒內加速灌入目標，木樁被 5 團黑炎包住', en: 'impact: the jaws hit the dummy, violet-white flash, radial speed lines, a ground shock ring; the body pours into the target within 0.35 s and 5 black flames engulf the dummy' },
    { k: 'after', t: [2.45, 4.2], zh: '餘波：黑炎縮小燒盡，紫色火星與黑煙上升散去，地面焦痕上的紫色裂紋慢慢熄滅，施法者收手', en: 'aftermath: the black flames shrink and burn out, violet embers and black smoke rise away, violet cracks in the scorch fade, the caster lowers the arm' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→架式→伸臂指向→收手；噴發瞬間身體向後微仰', en: 'caster: faceless mannequin, poses idle → stance → arm thrust (point) → recover; leans back slightly at the eruption' },
    { zh: '手臂黑炎：前臂上 3 張朝向鏡頭的黑色火焰剪影（實心深黑紫、1–2 像素紫色亮邊）＋3 條繞手臂旋轉的紫色螺旋光線', en: 'arm fire: 3 camera-facing black flame silhouettes on the forearm (solid near-black violet, 1–2 px violet rim) plus 3 violet spiral light lines circling the arm' },
    { zh: '黑炎龍身：沿曲線取樣 30 節實心黑球（頭粗尾細，半徑約 0.3），每節外面一層較大的紫色光暈作輪廓，隔節向上冒紫色火舌', en: 'dragon body: 30 solid black balls sampled along a curve (thick head, thin tail, radius ~0.3), each inside a larger violet glow that reads as the rim, violet flame licks on every other segment' },
    { zh: '龍頭：黑色三角面上顎與下顎、紫色亮邊、兩隻向後的角、品紅色眼點；張口幅度隨接近目標增加', en: 'head: black triangle upper and lower jaws with violet edges, two swept-back horns, magenta eye dots; the jaws open wider as it nears the target' },
    { zh: '路徑：由手心出發，先升到約 2.5 高再俯衝向目標，左右正弦擺動並帶隨時間流動的小波浪', en: 'path: starts at the palm, climbs to ~2.5 high then dives onto the target, with a sinusoidal side-to-side weave plus a small travelling wave' },
    { zh: '火星：約 26 粒紫色／品紅色像素點由龍身飄出，先快後慢上升淡出；命中時再爆出 18 粒', en: 'embers: ~26 violet/magenta pixels drift off the body, fast then slow, rising and fading; 18 more burst out at the hit' },
    { zh: '命中：紫白閃光、16 條放射速度線、地面衝擊環、5 團黑炎包住木樁（彈出後縮小燒盡）、6 團黑煙上升', en: 'impact: a violet-white flash, 16 radial speed lines, a ground shock ring, 5 black flames engulfing the dummy (pop in, then shrink and burn out), 6 black smoke puffs rising' },
    { zh: '地面：命中點焦痕＋紫色發光裂紋，1.5 秒內淡出；龍頭下方有紫色地面受光跟隨', en: 'ground: a scorch with violet glowing cracks at the hit, fading over 1.5 s; violet light pools under the dragon head' },
  ],
  params: {
    bodyLength: { zh: '龍身長度', en: 'body length', min: .4, max: 1, step: .05, value: .9 },
    sway: { zh: '蛇行擺幅', en: 'sway amplitude', min: 0, max: 1.2, step: .05, value: .65 },
    jaw: { zh: '張口幅度', en: 'jaw opening', min: 0, max: 1, step: .05, value: .85 },
    embers: { zh: '火星數量', en: 'ember count', min: 0, max: 60, step: 1, value: 26 },
  },
  // head progress along the guide 0..1: a kick out of the palm, then accelerating into the target
  head(p, t, CAST, HIT) { const u = p.ph(t, CAST, HIT); return .34 * p.easeOutCubic(Math.min(1, u / .3)) + .66 * u * u; },
  // guide curve from the palm (H0) to the target: climbs, dives, weaves side to side; g 0..1
  guide(p, g, H0, A, t) {
    g = p.clamp(g, 0, 1);
    const T = [1.9, 0, 1.2], s = Math.sin(Math.PI * g), arc = Math.sin(Math.PI * Math.pow(g, .8));
    return [
      H0[0] + (T[0] - H0[0]) * g,
      H0[1] + (T[1] - H0[1]) * g + A * Math.sin(g * 7 + .4) * Math.pow(s, .7) + .1 * Math.sin(g * 16 - t * 9) * s,
      H0[2] + (T[2] - H0[2]) * g + 1.3 * arc + .5 * A * Math.sin(g * 9.5 + 1) * s + .08 * Math.sin(g * 13 - t * 8) * s,
    ];
  },
  // big readable head: dark solid wedge skull and lower jaw, violet edges, magenta eyes and throat, horns, a flame mane.
  // h = neck point, d = forward, hs = head size, jaw 0..1
  dhead(p, h, d, hs, jaw, t) {
    const B = this.palette.body, ED = this.palette.edge, EM = this.palette.ember, v = p.v3;
    let side = v.cross([0, 0, 1], d);
    if (Math.hypot(side[0], side[1], side[2]) < .1) side = [0, 1, 0];
    side = v.norm(side);
    const up = v.cross(d, side), P = (f, s, u) => [h[0] + d[0] * f + side[0] * s + up[0] * u, h[1] + d[1] * f + side[1] * s + up[1] * u, h[2] + d[2] * f + side[2] * s + up[2] * u];
    const op = .15 + .55 * jaw;
    const back = P(-.35 * hs, 0, .3 * hs), brow = P(.45 * hs, 0, .42 * hs), U = P(1.55 * hs, 0, (.05 + op * .45) * hs);
    const cL = P(.1 * hs, .42 * hs, .05 * hs), cR = P(.1 * hs, -.42 * hs, .05 * hs), nL = P(1.2 * hs, .18 * hs, op * .3 * hs), nR = P(1.2 * hs, -.18 * hs, op * .3 * hs);
    const J = P(0, 0, -.25 * hs), jL = P(.05 * hs, .3 * hs, -.15 * hs), jR = P(.05 * hs, -.3 * hs, -.15 * hs), Lw = P(1.3 * hs, 0, -(.2 + op * .9) * hs);
    // throat glow first so the jaws sit in front of it
    const m0 = P(.35 * hs, 0, 0), m1 = v.lerp(U, Lw, .5);
    p.line(m0, m1, hs * (.25 + .35 * jaw), EM, .9 + .4 * jaw, { w1: hs * .1, i1: .5 });
    p.tri(back, cL, brow, B, { shade: .4 }); p.tri(back, cR, brow, B, { shade: .25 });
    p.tri(cL, brow, nL, B, { shade: .5 }); p.tri(cR, brow, nR, B, { shade: .3 });
    p.tri(brow, nL, U, B, { shade: .55 }); p.tri(brow, nR, U, B, { shade: .35 }); p.tri(cL, cR, U, B, { shade: .15 });
    p.tri(jL, jR, Lw, B, { shade: .2 }); p.tri(J, jL, Lw, B, { shade: .3 }); p.tri(J, jR, Lw, B, { shade: .1 });
    // glowing edges: brow ridge, upper lip, lower jaw, teeth
    p.line(back, brow, hs * .12, ED, .8, { w1: hs * .1 }); p.line(brow, U, hs * .1, ED, 1, { w1: hs * .05 });
    p.line(cL, nL, hs * .08, ED, .75); p.line(nL, U, hs * .08, ED, .9);
    p.line(jL, Lw, hs * .09, ED, .85, { w1: hs * .05 });
    for (let k = 0; k < 3; k++) {
      const f = .55 + k * .3, tu = P(f * hs, 0, (.02 + op * .4 * f / 1.5) * hs), tl = P(f * hs * .95, 0, -(.18 + op * .85 * f / 1.5) * hs);
      p.line(tu, v.lerp(tu, tl, .3), hs * .07, ED, 1.1, { w1: .01 }); p.line(tl, v.lerp(tl, tu, .3), hs * .07, ED, 1.1, { w1: .01 });
    }
    // horns sweeping back
    for (const sg of [1, -1]) {
      const base = P(.05 * hs, sg * .25 * hs, .38 * hs), mid = P(-.5 * hs, sg * .45 * hs, .75 * hs), tip = P(-1.15 * hs, sg * .55 * hs, .95 * hs);
      p.line(base, mid, hs * .16, ED, .95, { w1: hs * .1 }); p.line(mid, tip, hs * .1, ED, .85, { w1: .01, i1: .4 });
      const eye = P(.62 * hs, sg * .2 * hs, .4 * hs);
      p.dot(eye[0], eye[1], eye[2], EM, 1.4, 2);
    }
    // flame mane behind the skull
    for (let k = 0; k < 2; k++) {
      const q = P(-.45 * hs - k * .35 * hs, (k ? -1 : 1) * .15 * hs, .2 * hs);
      p.blackFlame(q[0], q[1], q[2], { w: hs * (1 - .25 * k), h: hs * (1.5 - .3 * k), t: t * 1.7, seed: 51 + k, body: B, edge: ED, I: .9 });
    }
    return { mouth: m1 };
  },
  draw(p, t) {
    const B = this.palette.body, ED = this.palette.edge, EM = this.palette.ember, SM = this.palette.smoke;
    const CAST = 1.2, HIT = 2.05, X0 = -2.1, DX = 2.35;
    const L0 = p.param('bodyLength'), A = p.param('sway'), jawMax = p.param('jaw');
    const a = t - HIT;
    // ---- ground marks (darken with the scene) ----
    if (a > 0) p.aftermath(DX, 0, 1.4, 'burn', { amt: 1 - p.ph(t, 3.2, 4.1), ramp: ED, glow: Math.pow(1 - p.ph(a, .1, 1.6), 2), seed: 5 });
    // ---- caster ----
    let pose;
    if (t < .3) pose = { a: 'idle', b: 'ready', k: p.easeOutCubic(t / .3) };
    else if (t < .42) pose = { a: 'ready', b: 'point', k: p.easeOutBack(p.ph(t, .3, .42), 1.6) };
    else if (t < 2.75) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.75, 3.6)) };
    const recoil = t > CAST ? -.22 * Math.pow(1 - p.ph(t, CAST, CAST + .6), 2) : 0;
    p.dummy(DX, 0);
    const fig = p.figure(X0, 0, { pose, lean: recoil });
    // ---- the scene darkens through the charge and recovers after the hit ----
    const ch = p.ph(t, .42, CAST);
    const dark = .4 * (t < CAST ? p.easeOutCubic(ch) : 1 - p.ph(t, HIT + .5, HIT + 1.5));
    p.grade({ dark, desat: dark * .5 });
    const hd = fig.hand, el = fig.elbow;
    // ---- black fire coiling round the forearm ----
    const ci = t < CAST ? p.easeOutCubic(ch) : 1 - p.ph(t, CAST, CAST + .15);
    if (t > .42 && ci > .01) {
      const d = p.v3.norm([hd[0] - el[0], hd[1] - el[1], hd[2] - el[2]]);
      let e1 = p.v3.cross(d, [0, 0, 1]);
      if (Math.hypot(e1[0], e1[1], e1[2]) < .1) e1 = [0, 1, 0];
      e1 = p.v3.norm(e1);
      const e2 = p.v3.cross(d, e1), len = Math.hypot(hd[0] - el[0], hd[1] - el[1], hd[2] - el[2]);
      for (let k = 0; k < 3; k++) {
        const s0 = k / 3, bx = el[0] + d[0] * len * (.15 + s0 * .9), by = el[1] + d[1] * len * (.15 + s0 * .9), bz = el[2] + d[2] * len * (.15 + s0 * .9);
        const sz = .45 + .55 * ci;
        p.blackFlame(bx, by, bz - .08, { w: (.22 + .1 * k) * sz, h: (.42 + .14 * k) * sz, t: t + k * .3, seed: 11 + k, body: B, edge: ED, I: .95 * ci });
      }
      for (let j = 0; j < 3; j++) {
        const pts = [];
        for (let q = 0; q <= 12; q++) {
          const s = -.1 + q / 12 * 1.4, ang = s * 2.4 * p.TAU + t * 13 + j * p.TAU / 3, rad = (.08 + .05 * s) * (1.6 - .6 * ci);
          pts.push([el[0] + d[0] * len * s + (e1[0] * Math.cos(ang) + e2[0] * Math.sin(ang)) * rad,
            el[1] + d[1] * len * s + (e1[1] * Math.cos(ang) + e2[1] * Math.sin(ang)) * rad,
            el[2] + d[2] * len * s + (e1[2] * Math.cos(ang) + e2[2] * Math.sin(ang)) * rad]);
        }
        p.trail(pts, .05, .02, ED, .45 * ci, 1 * ci);
      }
      if (t < CAST) {
        p.charge(hd[0], hd[1], hd[2], ch, { n: 14, R: 1.3, ramp: ED, up: .2, seed: 3 });
        p.glow(hd[0] + .08, hd[1], hd[2], .18 + .22 * ch, ED, .55 * ch);
      }
      p.light(hd[0], hd[1], 0, 1.2, ED, .5 * ci);
    }
    // ---- the dragon ----
    const hNow = t < HIT ? this.head(p, t, CAST, HIT) : 1;
    if (t >= CAST && t < HIT + .38) {
      const grow = p.easeOutBack(p.ph(t, CAST, CAST + .16), 1.8);
      let path, L, head = true, jaw = jawMax * (.3 + .7 * p.smooth(.55, .95, hNow));
      if (t < HIT) {
        L = Math.min(L0, hNow);
        path = s => this.guide(p, hNow - s * L, hd, A, t);
      } else {
        L = L0 * (1 - p.easeIn(p.ph(a, 0, .35)));
        path = s => this.guide(p, 1 - s * L, hd, A, t);
        head = false;
      }
      if (L > .01) {
        const w = .44 * grow * (t < HIT ? .6 + .4 * Math.min(1, L / L0) : 1 - .4 * p.ph(a, 0, .35));
        p.serpent(path, { n: 30, w, ramp: ED, dark: B, t, I: .85, head: false });
        // black flame tongues along the back so the body reads as fire, not a smooth worm
        for (let j = 0; j < 7; j++) {
          const s = .12 + j * .12, prof = Math.pow(1 - (s - .12) / .88, .75), q = path(s), fk = Math.floor(t * 10);
          p.blackFlame(q[0], q[1], q[2] - w * prof * .3, { w: w * 1.5 * prof, h: w * (2.4 + .8 * p.r(j + fk, 3)) * prof, t: t * 1.6, seed: 31 + j, body: B, edge: ED, I: .9 });
        }
        const hp = path(0);
        if (head) {
          const bk = path(.04), dir = p.v3.norm([hp[0] - bk[0], hp[1] - bk[1], hp[2] - bk[2]]);
          this.dhead(p, hp, dir, .6 * grow, jaw, t);
        }
        p.light(hp[0], hp[1], 0, 1.2, ED, .35);
      }
      // eruption burst at the palm
      const eb = 1 - p.ph(t, CAST, CAST + .3);
      if (eb > 0) {
        p.blackFlame(hd[0] - .05, hd[1], hd[2] - .25, { w: .7 * eb, h: 1.1 * eb, t, seed: 17, body: B, edge: ED, I: 1.1 * eb });
        p.glow(hd[0] + .15, hd[1], hd[2], .15 + .3 * eb, ED, 1.1 * eb * eb, { pow: 1.3 });
      }
    }
    // ---- violet embers shed by the body during the flight ----
    const nE = Math.round(p.param('embers') * p.density);
    for (let k = 0; k < nE; k++) {
      const tb = CAST + .05 + p.r(k, 1) * (HIT - CAST + .05), age = t - tb, life = .6 + .5 * p.r(k, 2);
      if (age <= 0 || age >= life) continue;
      const hb = this.head(p, tb, CAST, HIT), Lb = Math.min(L0, hb), sp = this.guide(p, hb - (.08 + .8 * p.r(k, 3)) * Lb, hd, A, tb);
      const dr = p.rdir(k, 9, .6), m = p.drag(1.1, 3.5, age), u = age / life;
      p.dot(sp[0] + dr[0] * m, sp[1] + dr[1] * m, sp[2] + dr[2] * m + .5 * age, k % 3 ? ED : EM, 1.1 * (1 - u * u), 1);
    }
    // ---- impact: the dragon bursts into black fire on the dummy ----
    if (a >= 0) {
      const C = [DX - .2, 0, 1.1];
      const fl = Math.pow(1 - p.ph(a, 0, .16), 2);
      // black flames engulf the dummy, then shrink and burn out
      const burn = 1 - p.easeInCubic(p.ph(a, .7, 1.65)), cf = p.cam();
      for (let k = 0; k < 5; k++) {
        const st = k === 0 ? 0 : .03 + k * .04, pop = p.easeOutBack(p.ph(a, st, st + .16), 2), sz = pop * burn;
        if (sz <= .02) continue;
        const ang = k === 0 ? 0 : (k - 1) / 4 * p.TAU + .6, rad = k === 0 ? 0 : .5;
        const fw = k === 0 ? -.25 : k % 2 ? .35 : -.1;
        const fx = DX + Math.cos(ang) * rad + cf.fwd[0] * fw, fy = Math.sin(ang) * rad + cf.fwd[1] * fw;
        p.blackFlame(fx, fy, 0, { w: (k === 0 ? 1.15 : .55) * sz, h: (k === 0 ? 2.3 : 1.15) * sz * (.85 + .15 * Math.sin(t * 9 + k)), t: t * 1.3, seed: 21 + k, body: B, edge: ED, I: 1.1 });
      }
      if (fl > 0) p.glow(C[0], C[1], C[2], .45 + .9 * fl, ED, 1.6 * fl, { pow: 1.3 });
      p.shock(DX, 0, .04, p.ph(a, 0, .55), { R: 1.95, w: .3, ramp: ED });
      p.shock(C[0] - .1, 0, C[2], p.ph(a, .01, .4), { R: 1.5, w: .22, ramp: EM, axis: [1, 0, 0], light: false });
      if (a < .2) p.speedLines(C[0], 0, C[2], { n: 16, R0: .55, R1: 2.8, ramp: ED, I: 1 - a / .2, seed: Math.floor(t * 30) });
      // embers burst out and rise
      const nB = Math.round(18 * p.density);
      for (let k = 0; k < nB; k++) {
        const life = .7 + .6 * p.r(k, 31), u = a / life;
        if (u >= 1) continue;
        const dr = p.rdir(k, 33, .5), m = p.drag(3 + 2 * p.r(k, 34), 3.2, a);
        p.dot(C[0] + dr[0] * m, C[1] + dr[1] * m, Math.max(.05, C[2] + dr[2] * m + .6 * a), k % 2 ? EM : ED, 1.2 * (1 - u), k % 4 ? 1 : 2);
      }
      // black smoke rising out of the burn-out
      for (let k = 0; k < 6; k++) {
        const u = p.ph(a, .5 + k * .08, 1.7 + k * .1);
        if (u <= 0 || u >= 1) continue;
        const ang = k / 6 * p.TAU;
        p.ball(DX + Math.cos(ang) * .35, Math.sin(ang) * .35, .45 + u * .9 + p.r(k, 41) * .25, .13 + u * .15, SM, { alpha: (1 - u) * .75, rough: .5, shadow: false, seed: k });
      }
      p.light(DX, 0, 0, 2.2, ED, Math.max(fl, .6 * burn));
    }
  },
});
