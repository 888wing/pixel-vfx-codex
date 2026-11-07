// 拔雷 / Drawn Lightning — Armory pack (original design): two lightning coils wind around an empty scabbard; on the
// draw only a bare hilt comes out, the coils straighten and stream out of the mouth through the hilt, and the blade
// they become is a straight lane of lightning that crosses the whole battlefield.
PXFX.define({
  id: 'drawn-lightning',
  loop: 6.5,
  loopWindow: [.8125, 2.4375],   // seamless enchant loop in the close-up: two 0.8125 s cycles of both coils
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    bolt: ['#2f3c9c', '#5f86ea', '#bfe4ff', '#fbfdff'],
    lane: ['#1f2a6e', '#3a56b8', '#7aa6f0', '#cfe6ff'],
    sheath: ['#1d1830', '#33294e', '#4f4274', '#76689c', '#a496c4'],
  },
  beats: [{ t: 2.44, kind: 'cast', power: .7 }, { t: 2.82, kind: 'hit', power: 1.4 }, { t: 3.12, kind: 'pulse', power: .6 }, { t: 3.7, kind: 'pulse', power: .4 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 2, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    reach: { zh: '雷刀長度', en: 'blade reach', min: 2, max: 9.5, step: .1, value: 8.3 },
    width: { zh: '刀路半寬', en: 'lane half-width', min: .15, max: 2, step: .05, value: .9 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .4], k: 'pose', zh: '特寫：施法者（縮放 0.85）左手握刀鞘斜掛在左腰前，鞘口高 0.81、鞘尾向後下垂約 50°，鞘口露出刀柄與圓形護手；背景壓暗，鏡頭放大 7 倍', en: 'close-up: the caster (scale 0.85) holds a scabbard at the left hip, mouth at height 0.81, the end tilted about 50° back and down, a grip and round guard showing at the mouth; the background is darkened and the lens zooms 7×' },
    { t: [.4, 2.44], k: 'charge', zh: '附魔循環：兩條螺旋路徑繞刀鞘（半徑 0.1、4 圈、相位差 π），電流頭部由鞘尾跑到鞘口，每次 0.5 秒、週期 0.8125 秒，第二條延遲半個週期；繞到鞘後的一段被鞘身遮住；筆觸每秒換 16 次形狀，每兩個週期重複一次，所以 0.8125–2.4375 秒可無縫循環', en: 'enchant loop: two helix paths wrap the scabbard (radius 0.1, 4 turns, phase π apart); a lightning head runs each from the end to the mouth in 0.5 s on a 0.8125 s cycle, the second half a cycle late; the stretch behind the scabbard is hidden; the zigzag changes 16 times a second and repeats every two cycles, so 0.8125–2.4375 s loops seamlessly' },
    { t: [2.44, 2.8], k: 'shape', zh: '拔刀：兩條線圈填滿成連續電圈、半徑縮到一半；2.44–2.54 秒刀柄被拔出，護手後面甚麼都沒有（鞘內無鐵）；2.54–2.64 秒刀柄在前衝的右手中轉向前方；2.64–2.8 秒路徑變形：線圈半徑收到 0，電流由鞘口流出、穿過刀柄，成為一段長 0.95 的刀身；鏡頭同時拉遠', en: 'the draw: both coils fill into continuous windings and shrink to half radius; 2.44–2.54 s the hilt is pulled out and there is nothing behind the guard (no steel); 2.54–2.64 s the hilt turns forward in the lunging right hand; 2.64–2.8 s the path morphs: the coil radius goes to 0 and the current streams out of the mouth, through the hilt, into a 0.95-long blade; the camera pulls back meanwhile' },
    { t: [2.8, 3.15], k: 'motion', zh: '雷刀由護手（x = −3.62）沿 +x 以每秒 25 單位伸長到 reach（8.3），每單位下降 0.075；刀頭四角星，經過之處地面亮起半寬 = width（0.9）的硬邊光帶，兩邊緣最亮；刀身每 0.55–1.05 單位向光帶兩邊各打一道放電弧', en: 'the lightning blade grows from the guard (x = −3.62) along +x at 25 units/s to reach (8.3), dipping 0.075 per unit; a four-point star at the tip; behind it the ground lights a hard-edged band of half-width = width (0.9), brightest at the two edges; every 0.55–1.05 units the blade throws a discharge arc to each edge of the band' },
    { t: [2.82, 3.7], k: 'impact', zh: '規則：|y| < width 且 0 ≤ x − xG ≤ reach 的士兵中招（xG = 護手 x）；命中時間 = 2.8 + max(0, x − xG − 0.95) ÷ 25；中招者黑白閃爍 0.3 秒，燒焦後向光帶外側倒下；光帶以外的士兵在刀頭經過時後仰一下；默認縱隊（半寬 0.78）全滅，橫列、方陣、楔形、鶴翼兩翼與圓陣上下兩段倖存', en: 'rule: a soldier dies if |y| < width and 0 ≤ x − xG ≤ reach (xG = guard x); hit time = 2.8 + max(0, x − xG − 0.95) / 25; the hit ones flicker black and white for 0.3 s, char and fall away from the lane; soldiers outside the band flinch as the tip passes; the default column (half-width 0.78) is wiped, line, block, wedge, crescent wings and the top and bottom of a ring survive' },
    { t: [3.7, 6.5], k: 'after', zh: '消散：3.7 秒起刀身由刀尖向護手分 8 段消散（每段相隔 0.06 秒）：亮芯先退、剩藍色殘影、再斷成碎段與單粒像素，只留護手前 0.95 的短刀；4.7–4.96 秒短刀反向流回刀柄與鞘口，重新繞成兩條線圈後消散；4.98–5.4 秒空刀柄轉回並插回鞘口；5.69 秒起線圈循環重新開始；屍體 4.5–4.95 秒淡出，新敵軍 4.95–5.5 秒出現，鏡頭 5.4–6.15 秒推回刀鞘特寫', en: 'breakup: from 3.7 s the blade breaks up tip-first in 8 pieces 0.06 s apart: the core retreats, a blue afterimage remains, then segments and single pixels, leaving only 0.95 in front of the guard; 4.7–4.96 s that short blade streams back through the hilt into the mouth and winds into the two coils, which break up; 4.98–5.4 s the bare hilt turns back and slides into the mouth; the coil loop restarts at 5.69 s; bodies fade 4.5–4.95 s, a fresh army fades in 4.95–5.5 s and the camera pushes back into the close-up 5.4–6.15 s' },
  ],
  layers: [
    { zh: '武器：程式畫的漆鞘（長 0.85，紫黑漆色 5 級）與只有握柄和圓護手的刀柄（blade: false），鞘身平面朝向鏡頭並寫入深度，路徑繞到鞘後自動被遮住；拔出時護手後空無一物', en: 'weapon: a procedural lacquered scabbard (0.85 long, a 5-step violet-black ramp) and a hilt with only grip and round guard (blade: false); the scabbard flat faces the camera and writes depth so paths behind it are hidden; when drawn there is nothing behind the guard' },
    { zh: '路徑先行：兩條螺旋（半徑 0.1、4 圈、相位差 π）每格不變；拔刀時同一條路徑插值變形：半徑 → 0，並延長為 鞘尾 → 鞘口 → 刀柄頭 → 護手 → 刀尖；伸長後的刀身是一條固定直線；引導線顯示紅綠兩條路徑、刀身紅線、光帶藍色邊界與白色移動標記', en: 'path first: two helices (radius 0.1, 4 turns, phase π apart) that never change between frames; on the draw the same path is interpolated: radius → 0 and extended to end → mouth → pommel → guard → tip; the grown blade is one fixed straight line; the guides show the red and green paths, the red blade line, the blue lane edges and the white moving markers' },
    { zh: '筆觸：沿路徑畫 1 像素白芯（部分段 2 像素）、外圈淺藍、再外一圈藍、最外深藍邊；鋸齒 2–2.5 像素，偶有大折角與分叉；鞘後一段降一級；伸長中的刀頭一段筆觸較長', en: 'stroke: a 1 px white core (2 px on some segments), a pale blue ring, a blue ring and a dark blue edge; 2–2.5 px zigzag with the odd big kink and fork; the stretch behind the scabbard drops one tier; the stroke is longer at the growing tip' },
    { zh: '消散：刀身分 8 段由刀尖往回散：亮芯退成淺藍、剩藍色殘影、斷成碎段與單粒像素；放電弧與光帶同時熄滅；最後一段流回鞘中繞成線圈再散', en: 'breakup: the blade breaks up in 8 pieces from the tip back: the core drops to pale blue, a blue afterimage remains, then segments and single pixels; the arcs and the band go out with it; the last piece streams back into the scabbard, winds into the coils and breaks up' },
    { zh: '判定與倖存：直線刀路 y = 0，半寬 width；地上光帶正好 2 × width 寬、長度到刀頭為止；width 小於陣型半寬時兩側士兵倖存，reach 不夠時後排倖存', en: 'rule and survivors: a straight lane at y = 0 with half-width width; the ground band is exactly 2 × width wide and lit up to the tip; with width under the formation half-width the flanks survive, with too little reach the back rows survive' },
    { zh: '軍隊與計數：1000 名像素小兵（默認縱隊，14 列）；中招時黑白閃爍再燒焦倒下（只換材質，不加逐兵光暈）；角落擊殺計數全滅時變金色', en: 'army and counter: 1,000 pixel soldiers (default column, 14 files); hit soldiers flicker black and white, char and fall (material changes only, no per-unit glow); the corner kill counter turns gold on a full wipe' },
    { zh: '鏡頭：開場與結尾是放大 7 倍的刀鞘特寫（背景壓暗、去飽和、染藍），拔刀時拉遠到整個戰場，收刀後推回', en: 'camera: the loop opens and closes on a 7× close-up of the scabbard (background darkened, desaturated, tinted blue), pulls back to the battlefield on the draw and pushes back in after the re-sheath' },
  ],

  CX: -4.3, CY: .06, SC: .85, AREA: { x: .9, y: 0, rx: 2.7, ry: 2.6 },
  CYC: .8125, RUN: .5, TURNS: 4, R0: .1, KC: 7,
  TP: 2.44, TF: 2.54, TM: 2.64, TD: 2.8, V: 25, LB0: .95, TB: 3.7, TR: 4.7, TS: 4.98,
  FINAL: { a: 'punch', b: 'punch', k: 0 },

  // ---- small vector helpers (kept on the definition: every file shares one page) ----
  add(a, b, k = 1) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; },
  nrm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  slerp(a, b, k) {   // rotate unit vector a towards b by fraction k
    const d = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(d);
    if (om < 1e-4) return b;
    const s = Math.sin(om), wa = Math.sin((1 - k) * om) / s, wb = Math.sin(k * om) / s;
    return [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
  },
  // the right hand of the caster for a pose blend (same maths as p.figure, facing +x)
  handOf(pose) {
    const P = PXFX.POSES, A = P[pose.a], B = P[pose.b], k = pose.k, mix = (a, b) => a + (b - a) * k;
    const lean = mix(A.lean, B.lean), crouch = mix(A.crouch, B.crouch), hipZ = .76 * (1 - .28 * crouch);
    const cx = Math.sin(lean) * .4, cz = hipZ + Math.cos(lean) * .4, sc = this.SC;
    return [this.CX + (cx + mix(A.hr[0], B.hr[0])) * sc, this.CY + (-.17 + mix(A.hr[1], B.hr[1])) * sc, (cz - .03 + mix(A.hr[2], B.hr[2])) * sc];
  },
  // the scabbard: mouth in front of the left hip, chape back and down
  MOUTH() { const s = this.SC; return [this.CX + .2 * s, this.CY + .26 * s, .95 * s]; },
  SDIR: [-.55, .3, -.78],
  // the drawn blade: from the guard (final hand) straight along +x to reach, dipping towards the far end
  blade(reach) {
    const c = this._bl;
    if (c && c.reach === reach) return c;
    const h = this.handOf(this.FINAL), E0 = [h[0] + reach, 0, Math.max(.1, h[2] - reach * .075)];
    const B = this.nrm([E0[0] - h[0], E0[1] - h[1], E0[2] - h[2]]), G = this.add(h, B, .138);
    const E = [G[0] + reach, 0, E0[2]];
    this._bl = { reach, h, G, E, B: this.nrm([E[0] - G[0], E[1] - G[1], E[2] - G[2]]) };
    return this._bl;
  },
  // honest rule: inside the lane |y| < width and within reach along x; hit when the growing tip passes the unit
  hitOf(u, reach, W) {
    if (Math.abs(u.y) >= W) return null;
    const G = this.blade(reach).G, d = u.x - G[0];
    if (d < 0 || d > reach) return null;
    return this.TD + Math.max(0, d - this.LB0) / this.V;
  },
  near(t, p) { return 1 - p.ease(p.ph(t, 2.48, 2.92)) + p.ease(p.ph(t, 5.4, 6.15)); },
  FOCUS: [-4.29, .37, .59],
  lensAt(t, p) {
    const b = this.near(t, p);
    if (b <= 0) return null;
    const c = this.FOCUS, to = [c[0] * (1 - b), c[1] * (1 - b), c[2] + (1.3 - c[2]) * b];
    return { k: 1 + (this.KC - 1) * b, c, to };
  },
  // seed for the stroke shape: changes 16 times a second and repeats every two coil cycles (seamless loops)
  seedAt(t) { const P = 2 * this.CYC, q = (((t + 1 / 32) % P) + P) % P; return Math.floor(q * 16) % 26; },   // buckets centred on the loop seam
  // one coil around the scabbard from the chape (s = 0) to the mouth, optionally continued through the hilt into a
  // short blade: chape -> mouth -> pommel -> guard -> tip. Returns the path and the arc fractions of its joints.
  coilPath(p, w, r, phase, hilt) {
    const pts = [], N = 56, side = w.side, nr = w.nrm;
    for (let k = 0; k <= N; k++) {
      const q = k / N, a = w.axis(.95 - .9 * q), th = phase + this.TURNS * Math.PI * 2 * q;
      pts.push([a[0] + side[0] * Math.cos(th) * r + nr[0] * Math.sin(th) * r, a[1] + side[1] * Math.cos(th) * r + nr[1] * Math.sin(th) * r, a[2] + side[2] * Math.cos(th) * r + nr[2] * Math.sin(th) * r]);
    }
    const L = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    let len = 0;
    for (let k = 1; k < pts.length; k++) len += L(pts[k - 1], pts[k]);
    if (!hilt) return { path: p.path(pts), sM: 1, sG: 1 };
    const lc = len, mouth = w.axis(0);
    const extra = [mouth, hilt.pom, hilt.G, this.add(hilt.G, hilt.B, this.LB0)];
    let prev = pts[pts.length - 1], lm = 0, lg = 0;
    extra.forEach((q, i) => { len += L(prev, q); prev = q; if (i === 0) lm = len; if (i === 2) lg = len; });
    return { path: p.path(pts.concat(extra)), sM: lm / len, sG: lg / len, sC: lc / len };
  },

  draw(p, t) {
    const reach = p.param('reach'), W = p.param('width'), PL = this.palette, BR = PL.bolt, TAU = Math.PI * 2;
    const near = this.near(t, p), seed = this.seedAt(t), hold = p.hold(t, 15, 1.625), sc = this.SC;   // seeds repeat every 1.625 s (loop = 4 periods)
    const formation = PXFX.TROOPS[p.param('formation') | 0].id;
    const bl = this.blade(reach), G = bl.G, B = bl.B, TD = this.TD, V = this.V;

    // ---- caster: rest (hand near the hilt) -> grab -> draw-cut lunge -> hold -> back to rest ----
    const grab = p.ease(p.ph(t, this.TP, this.TF)), cut = p.easeOutCubic(p.ph(t, this.TF, this.TM + .04));
    const back = p.ease(p.ph(t, this.TS, this.TS + .45));
    let pose;
    if (cut <= 0) pose = { a: 'ready', b: 'guard', k: grab };
    else if (back <= 0) pose = { a: 'guard', b: 'punch', k: cut };
    else pose = { a: 'punch', b: 'ready', k: back };
    const fig = p.figure(this.CX, this.CY, { scale: sc, pose });

    // ---- army: a straight lane, hit when the growing blade tip passes ----
    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 21, formation, area: this.AREA, faceTo: [this.CX, 0], t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, reach, W),
      fear: u => {
        if (Math.abs(u.y) > W + .9) return 0;
        const pt = TD + Math.max(0, u.x - G[0] - this.LB0) / V;
        return t > pt && t < pt + .6 ? .8 * (1 - (t - pt) / .6) : 0;
      },
      react: (s, a, u) => {
        s.walk = null; s.tdir = [.25, u.y >= 0 ? 1 : -1];
        if (a < .3) { s.mat = (Math.floor(a * 22 + u.r1 * 2) & 1) ? 'white' : 'char'; s.jit = .02; }
        else { s.mat = 'char'; s.jit = 0; s.tilt = Math.PI / 2 * p.easeIn((a - .3) / (.25 + .15 * u.r2)); s.spear = false; }
      },
      respawn: [4.95, 5.5], clear: [4.5, 4.95],
    });

    // close-up: grade the world dark behind the weapon, the weapon and the light stay bright
    if (near > 0) p.grade({ dark: .78 * near, desat: .45 * near, tint: '#151a30', tintAmt: .35 * near, bg: near });

    // ---- the scabbard (empty) and the hilt ----
    const M = this.MOUTH(), Ds = this.nrm(this.SDIR);
    const w = p.weapon('scabbard', M, Ds, { scale: sc, ramp: PL.sheath });
    const gOff = .26 * 1.25 * sc;            // pommel -> guard along the katana
    // rest: guard in the mouth, grip sticking out. Pull: slides out along the scabbard axis (nothing behind the guard).
    // Flip: turns to point down the lane, guard first, held in the lunging hand. Re-sheath: the same, reversed.
    const pull = p.ease(p.ph(t, this.TP, this.TF)) * (1 - p.ease(p.ph(t, this.TS + .2, this.TS + .42)));
    const flip = p.easeOutCubic(p.ph(t, this.TF, this.TM)) * (1 - p.easeInCubic(p.ph(t, this.TS, this.TS + .26)));
    // the grip centre slides from its rest spot (guard in the mouth) into the hand, and turns from the scabbard axis to the lane
    const rest = this.add(M, Ds, -gOff * .5), gc = this.add(rest, [fig.hand[0] - rest[0], fig.hand[1] - rest[1], fig.hand[2] - rest[2]], pull);
    const hd = this.slerp(Ds, B, flip), pom = this.add(gc, hd, -gOff * .5);
    p.weapon('katana', pom, hd, { scale: sc, blade: false });
    const hilt = { pom: this.add(G, B, -gOff), G, B };

    const back3 = pt => w.behind(pt), marks = [[], []], guideCoils = [];
    const CY = this.CYC, RUN = this.RUN, TL = 5.6875;
    // ----- enchant loop: two coils (half a cycle apart) run up the scabbard from the chape to the mouth -----
    const coilOn = t < TD - .16 || t >= TL;
    if (coilOn) {
      const charge = t < this.TM ? p.ph(t, 2.4375, this.TM) : 0, r = this.R0 * (1 - .5 * p.ease(charge));
      for (let c = 0; c < 2; c++) {
        const cp = this.coilPath(p, w, r, c * Math.PI, null), path = cp.path;
        guideCoils.push(path);
        const t0 = c * CY / 2, tc = t - t0, k = Math.floor(tc / CY), u = (tc - k * CY) / RUN;
        if (t >= TL && t0 + k * CY < TL) continue;   // after the re-sheath each coil restarts on its own cycle
        const sd = seed * 3 + c * 101 + (k & 1) * 7;
        if (charge > 0) {   // charge: the coil fills to the mouth and stays lit, thick
          const head = Math.max(Math.min(1, Math.pow(Math.min(u, 1.6), 1.4)), p.easeOut(p.ph(t, 2.4375, 2.56)));
          p.zap(path, 0, head, BR, { seed: sd, jag: 2, back: back3, thick: charge > .5 ? 2 : 1, tail: .7, forks: 2 });
          if (head < 1) marks[c].push(path.at(head));
          continue;
        }
        const sh = Math.pow(Math.min(u, 1.6), 1.4), vel = u < 1 ? 1.4 * Math.pow(u, .4) : 0, L = .2 + .22 * vel, head = Math.min(sh, 1);
        if (u < 1.4) {
          p.zap(path, Math.max(0, sh - L), head, BR, { seed: sd, jag: 2, back: back3, thick: 1, tail: .45, forks: 1 });
          for (let ch = 0; ch < 3; ch++) {
            const a0 = sh - L - (ch + 1) * .1, a1 = sh - L - ch * .1;
            if (a1 > 0) p.zap(path, Math.max(0, a0), Math.min(1, a1), BR, { seed: sd + ch + 1, jag: 2, back: back3, fade: .3 + ch * .25, forks: 0 });
          }
          if (u < 1) marks[c].push(path.at(head));
          if (u > .95 && u < 1.12) { const m0 = w.axis(.02); p.sparkle(m0[0], m0[1], m0[2], 3, BR, .9); }
        }
      }
    }

    // ----- the draw: the coils lose their radius and stream out of the mouth, through the hilt, into a blade -----
    if (t >= this.TM - .02 && t < TD + .02) {
      const m = p.ease(p.ph(t, this.TM, TD));
      for (let c = 0; c < 2; c++) {
        const cp = this.coilPath(p, w, this.R0 * .5 * (1 - m), c * Math.PI, hilt), path = cp.path;
        guideCoils.push(path);
        const s0 = cp.sG * m, s1 = cp.sC + (1 - cp.sC) * m;
        p.zap(path, s0, Math.max(s0 + .01, s1), BR, { seed: hold * 3 + c * 11, jag: 2, back: back3, thick: 2, tail: .8, forks: 2 });
        marks[c].push(path.at(s1));
      }
      const mo = w.axis(0);
      p.sparkle(mo[0], mo[1], mo[2], 4, BR, 1);
    }

    // ----- the blade: grows from the guard along +x at V units/s, through the lane -----
    const bladePath = p.path([G, bl.E], 2), xh = Math.min(reach, this.LB0 + Math.max(0, t - TD) * V), sH = xh / reach, sR = Math.min(1, this.LB0 / reach);
    if (t >= TD && t < this.TR) {
      const grow = t < TD + (reach - this.LB0) / V, K = 8;
      // the far part breaks up tip-first in three stages; the first LB0 stays as a short blade on the hilt
      for (let j = 0; j < K; j++) {
        const a0 = sR + (1 - sR) * j / K, a1 = Math.min(sH, sR + (1 - sR) * (j + 1) / K);
        if (a1 <= a0) continue;
        const tj = this.TB + (K - 1 - j) * .06, fade = p.ph(t, tj, tj + .6);
        if (fade >= 1) continue;
        p.zap(bladePath, a0, a1, BR, { seed: hold * 5 + j * 13, jag: 2.5, step: 5, thick: 2, forks: fade > 0 ? 0 : 1, fade, tail: grow && j === Math.floor((sH - sR) / (1 - sR) * K) ? .5 : 1 });
      }
      p.zap(bladePath, 0, Math.min(sH, sR), BR, { seed: hold * 5 + 99, jag: 2, step: 5, thick: 2, forks: 1 });
      if (grow) {
        const hp = bladePath.at(sH);
        p.sparkle(hp[0], hp[1], hp[2], 5, BR, 1);
        p.light(hp[0], hp[1], .1, 1.2, BR, .9);
        marks[0].push(hp);
      }
      // the lane on the ground: hard-edged band exactly 2 x width wide, lit up to the tip
      const bandI = (1 - p.ph(t, this.TB + .2, this.TB + .8)) * .9;
      if (bandI > 0) {
        const cx = G[0] + reach / 2, x0 = G[0] - cx, x1 = G[0] + xh - cx, eg = Math.min(.08, W * .3);
        const IR = this.view.r * .92 * .97;
        p.decal(cx, 0, 0, Math.hypot(reach / 2, W) + .05, (x, y) => {
          if (x < x0 || x > x1 || Math.abs(y) >= W || Math.hypot(cx + x, y) > IR) return 0;
          return Math.abs(y) > W - eg ? 1 : Math.abs(y) < .05 ? .75 : .42;
        }, PL.lane, bandI);
      }
      // discharge arcs from the blade down to both edges of the lane (stable paths, fired as the tip passes)
      for (let k0 = 0, x = 1.2; x < reach - .2; k0++, x += .55 + .5 * p.r(k0, 41)) {
        const tk = TD + Math.max(0, x - this.LB0) / V;
        if (t < tk) break;
        const fade = p.ph(t, this.TB + .1, this.TB + .7);
        if (fade >= 1) break;
        const top = bladePath.at(x / reach), k = Math.round(x * 10);
        for (const sg of [-1, 1]) {
          if (t > tk + .14 && p.r(hold * 7 + k, sg + 3) < .45) continue;
          const g = [top[0] + .3, sg * W, .02], mid = [top[0] + .1, sg * W * .55, top[2] * .45];
          p.zap(p.path([top, mid, g], 3), 0, 1, BR, { seed: hold * 11 + k + sg, jag: 1.5, step: 4, thick: t < tk + .1 ? 1 : 0, forks: 0, fade: Math.max(fade, t > tk + .14 ? .15 : 0), tail: .6 });
        }
      }
      for (let k = 1; k <= 4; k++) { const q = bladePath.at(Math.min(sH, k / 4)); p.light(q[0], q[1], .1, .9, BR, .55 * (1 - p.ph(t, this.TB, this.TB + .6))); }
    }

    // ----- re-sheath: the short blade streams back through the hilt and the mouth and wraps into the coils again -----
    if (t >= this.TR && t < TL) {
      const e = p.ease(p.ph(t, this.TR, this.TR + .26));
      for (let c = 0; c < 2; c++) {
        const cp = this.coilPath(p, w, this.R0 * e, c * Math.PI, hilt), path = cp.path;
        guideCoils.push(path);
        const s1 = 1 + (cp.sC - 1) * e, s0 = cp.sG * (1 - e);
        const fade = p.ph(t, this.TR + .32, TL - .05);
        if (fade < 1) p.zap(path, s0, s1, BR, { seed: hold * 3 + c * 17, jag: 2, back: back3, thick: e < 1 ? 2 : 1, tail: .8, forks: e < 1 ? 1 : 0, fade });
        if (e < 1) marks[c].push(path.at(s0));
      }
    }

    // ----- guides: coil paths, blade path, lane edges -----
    if (p.guiding) {
      guideCoils.forEach((g, i) => p.guide(g, i & 1 ? 'green' : 'red', { marks: marks[i & 1] }));
      if (t >= this.TM && t < this.TR + .3) {
        p.guide(bladePath, 'red', { marks: t >= TD && sH < 1 ? [bladePath.at(sH)] : [] });
        for (const sg of [-1, 1]) p.guide([[G[0], sg * W, .02], [G[0] + reach, sg * W, .02]], 'blue');
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 2.82, 2.95) * (1 - p.ph(t, 4.45, 4.7)) });
  },
});
