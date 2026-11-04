// 斬獄神龕 / Shrine of Cuts — Ultimates pack (original design): a horned shrine rises from black smoke, the world turns blood red and slash lines cut everything
PXFX.define({
  id: 'shrine-of-cuts',
  loop: 5,
  beats: [{ t: 1, kind: 'cast', power: .7 }, { t: 2.45, kind: 'pulse', power: .6 }, { t: 3.05, kind: 'pulse', power: .8 }, { t: 3.45, kind: 'pulse', power: 1 }, { t: 3.75, kind: 'hit', power: 1.2 }],
  view: { r: 3.5, h: 3.6 },
  stage: { ground: 'stone', tiles: true, r: 3.4 },
  modules: ['figure', 'domain', 'slash', 'debris', 'impact', 'aftermath'],
  palette: {
    wood: ['#1a0a0e', '#2a0f15', '#3e161e', '#561e26', '#6e2a2e'],
    inner: ['#08040a', '#0e070e', '#160a12'],
    smoke: ['#0c080c', '#161016', '#221a20', '#30262c'],
    slash: ['#a0101e', '#e8203c', '#ff6a70', '#ffd0d0', '#ffffff'],
    lantern: ['#b01020', '#ff3a4a', '#ff8a7a', '#ffd8c8'],
    blood: ['#1a0408', '#2a070c', '#3e0b12', '#561018'],
    stone: ['#3a3038', '#544850', '#6e6068', '#8a7c82'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者在 x=−2.2 由站姿舉起單手到面前（結印式手勢）', en: 'pose: at x = −2.2 the caster raises one hand before the face (a sign-like gesture)' },
    { k: 'charge', t: [.3, 1.5], zh: '集氣：施法者身後（深度方向）黑煙翻滾湧起；巨大神龕由煙中升起（0.6–1.5 秒，easeOutCubic）：三層階梯底座、4 根柱、內壁、橫樑、彎曲帶角的屋頂、橫樑下一排獠牙飾物、兩盞紅燈籠與兩隻閃爍紅眼；同時由神龕向外抖色擦除，背景變血紅天空、地面重新映射成暗紅', en: 'charge: black smoke boils up behind the caster (in depth); a huge shrine rises out of it (0.6–1.5 s, easeOutCubic): a 3-step base, 4 pillars, an inner wall, a beam, a curved horned roof, a row of fang ornaments under the beam, two red lanterns and two blinking red eyes; a dithered wipe from the shrine turns the background into a blood-red sky and remaps the ground to dark reds' },
    { k: 'shape', t: [1.75, 2.45], zh: '成形：隨機斬擊線開始零星出現（白→紅細光線，由中間 0.04 秒伸展到全長再變細消失，每條 0.25 秒）', en: 'shape: random slash lines start appearing sparsely (thin white → red light lines that extend from the middle to full length in 0.04 s, then thin out; 0.25 s each)' },
    { k: 'motion', t: [2.45, 3.75], zh: '推進：斬擊節奏越來越密（共約 30 條），分佈在空中、地面（留下暗色刀痕）與目標身上，地面與目標被斬時碎石與草屑飛濺；2.45／3.05／3.45 秒三下特大斬擊落在目標上', en: 'motion: the slash rhythm accelerates (~30 in total), spread over the air, the ground (leaving dark cut marks) and the target; ground and target cuts throw rock chips and straw bits; three oversized cuts hit the target at 2.45 / 3.05 / 3.45 s' },
    { k: 'impact', t: [3.75, 4], zh: '命中：最後一下最大的交叉斬擊落在目標上，白閃＋放射速度線，目標劇烈晃動', en: 'impact: the last and biggest crossed cut lands on the target, a white flash and radial speed lines, the target shakes hard' },
    { k: 'after', t: [4, 5], zh: '餘波：斬擊停止，神龕沉回黑煙，血紅領域向神龕收回擦除，刀痕隨之消失，施法者放下手回到待機', en: 'aftermath: the slashes stop, the shrine sinks back into the smoke, the blood domain wipes back into the shrine, the cut marks go with it, the caster lowers the hand to idle' },
  ],
  layers: [
    { zh: '神龕：全部用實心方塊與三角形（深紅黑木色 5 級色階）：三層階梯、4 根柱、橫樑；屋頂為 2×6×3 格曲面網格，中脊高、屋簷四角向上翹成角，兩端各一支向外上方的角（菱形晶體）', en: 'shrine: solid boxes and triangles only (5-step dark red/black wood ramp): a 3-step base, 4 pillars, a beam; the roof is a 2 × 6 × 3 curved grid, high ridge, eave corners sweeping up into horns, plus a horn (bipyramid) at each ridge end pointing up and out' },
    { zh: '詭異細節：橫樑下 7 根向下的獠牙，底座兩角兩根向上的長牙；屋簷下兩盞紅色燈籠（實心小方塊＋紅光暈），內壁上兩隻紅眼每 1.3 秒眨一次', en: 'eerie details: 7 downward fangs under the beam, two upward tusks at the base corners; two red lanterns under the eaves (small solid box + red glow), two red eyes on the inner wall blinking every 1.3 s' },
    { zh: '黑煙：約 18 團粗糙抖色黑色煙球在神龕底部循環上升，神龕升起與沉下時最濃', en: 'black smoke: ~18 rough dithered black balls cycling upward around the shrine base, densest while the shrine rises and sinks' },
    { zh: '領域：由神龕位置向外的抖色圓形擦除，天空換成上暗下紅的血色漸層，地面按亮度重新映射成 4 級暗紅，實心物件壓暗 25%；完結時反向擦回', en: 'domain: a dithered radial wipe from the shrine; the sky becomes a dark-to-red blood gradient, the ground is remapped by brightness into 4 dark reds, solids darken 25%; it wipes back at the end' },
    { zh: '斬擊：每條為兩段由中點向外伸展的錐形光線（寬 0.08，白→紅），時間按 (k/N)^0.65 分佈令節奏加速；位置 2/5 在空中、2/5 貼地、1/5 在目標上', en: 'slashes: each is two tapered light segments growing out from the middle (0.08 wide, white → red), times spread as (k/N)^0.65 so the rhythm accelerates; 2/5 in the air, 2/5 flat on the ground, 1/5 on the target' },
    { zh: '刀痕與碎片：貼地斬擊在地面留下 0.03 寬的暗色刀痕；地面與目標被斬時各飛出 3 塊低多邊形碎石或草屑（帶重力）', en: 'cut marks and debris: ground slashes leave 0.03-wide dark cut marks; ground and target cuts each throw 3 low-poly chips or straw bits (with gravity)' },
  ],
  params: {
    slashCount: { zh: '斬擊數量', en: 'slash count', min: 8, max: 60, step: 1, value: 30 },
    shrineSize: { zh: '神龕大小', en: 'shrine size', min: .7, max: 1.15, step: .05, value: 1 },
    redStrength: { zh: '血紅程度', en: 'red strength', min: 0, max: 1, step: .05, value: 1 },
  },
  BIG: [2.45, 3.05, 3.45, 3.75],
  mixHex(a, b, k) {
    const A = PXFX.hex(a), B = PXFX.hex(b);
    return PXFX.toHex([0, 1, 2].map(i => Math.round(A[i] + (B[i] - A[i]) * k)));
  },
  // slash k: start time, kind (0 air, 1 ground, 2 target), endpoints; big ones are the beat cuts on the target
  slashAt(p, k, N) {
    const HX = 2.35, t0 = 1.75 + 1.95 * Math.pow(k / N, .65), kind = [0, 1, 2, 0, 1][k % 5];
    const r1 = p.r(k, 61), r2 = p.r(k, 62), r3 = p.r(k, 63), r4 = p.r(k, 64), c = p.cam();
    if (kind === 1) {
      const cx = -.6 + r1 * 3.6, cy = (r2 - .5) * 3, ang = r3 * Math.PI, L = .5 + .45 * r4;
      return { t0, kind, a: [cx - Math.cos(ang) * L, cy - Math.sin(ang) * L, .03], b: [cx + Math.cos(ang) * L, cy + Math.sin(ang) * L, .03], m: [cx, cy, .03] };
    }
    const ctr = kind === 2 ? [HX + c.fwd[0] * .45, c.fwd[1] * .45, .6 + r2 * .9 + c.fwd[2] * .45] : [-.4 + r1 * 3.6, (r2 - .5) * 2.4, .7 + r3 * 1.8];
    const ang = r4 * Math.PI, L = (kind === 2 ? .5 : .35) + .35 * p.r(k, 65);
    const d = [c.right[0] * Math.cos(ang) + c.up[0] * Math.sin(ang), c.right[1] * Math.cos(ang) + c.up[1] * Math.sin(ang), c.right[2] * Math.cos(ang) + c.up[2] * Math.sin(ang)];
    return { t0, kind, a: p.v3.along(ctr, d, -L), b: p.v3.along(ctr, d, L), m: ctr };
  },
  // the shrine: solid geometry at (sx, sy), scale s, sunk by dz below the ground (parts below z = 0 are clipped / skipped)
  shrine(p, sx, sy, s, dz, t) {
    const W = this.palette.wood, IN = this.palette.inner, LA = this.palette.lantern;
    const P = (x, y, z) => [sx + x * s, sy + y * s, z * s - dz];
    const box = (x0, y0, z0, x1, y1, z1, ramp) => {
      const za = z0 * s - dz, zb = z1 * s - dz;
      if (zb <= .01) return;
      p.box(sx + x0 * s, sy + y0 * s, Math.max(0, za), sx + x1 * s, sy + y1 * s, zb, ramp, { shadow: za >= 0 });
    };
    const tri = (a, b, c, o) => { if (a[2] > -.05 && b[2] > -.05 && c[2] > -.05) p.tri(a, b, c, W, o); };
    box(-1, -.6, 0, 1, .6, .14, W); box(-.86, -.5, .14, .86, .5, .28, W); box(-.72, -.42, .28, .72, .42, .4, W);
    box(-.5, -.34, .4, .5, -.24, 1.66, IN);
    for (const [px, py] of [[-.56, -.3], [.56, -.3], [-.56, .3], [.56, .3]]) box(px - .07, py - .07, .4, px + .07, py + .07, 1.7, W);
    box(-.8, -.4, 1.7, .8, .4, 1.84, W);
    // curved roof: ridge along x, eaves sweeping out and up at the corners
    const NU = 6, NV = 3, rp = (u, v, sg) => P(u * (.62 + .55 * v), sg * v * .8, 2.45 - .5 * Math.sqrt(v) + .38 * v * v * v * Math.pow(Math.abs(u), 3));
    for (const sg of [1, -1]) for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) {
      const u0 = i / NU * 2 - 1, u1 = (i + 1) / NU * 2 - 1, v0 = j / NV, v1 = (j + 1) / NV;
      const a = rp(u0, v0, sg), b = rp(u1, v0, sg), c = rp(u1, v1, sg), d = rp(u0, v1, sg);
      tri(a, b, c, {}); tri(a, c, d, {});
    }
    // gable ends fill
    for (const sx2 of [-1, 1]) {
      const top = rp(sx2, 0, 1), l = rp(sx2, 1, 1), r = rp(sx2, 1, -1), bl = P(sx2 * .8, .4, 1.84), br = P(sx2 * .8, -.4, 1.84);
      tri(top, l, bl, { shade: .3 }); tri(top, bl, br, { shade: .3 }); tri(top, br, r, { shade: .3 });
    }
    const horn = (x, y, z, dir, len, wid) => { const q = P(x, y, z); if (q[2] - len * .5 * s > -.05) p.shard(q[0], q[1], q[2], len * s, wid * s, dir, W, { back: .15, sides: 4, shadow: false }); };
    horn(-.72, 0, 2.62, [-.55, 0, 1], .75, .14); horn(.72, 0, 2.62, [.55, 0, 1], .75, .14);
    horn(-1.25, .82, 2.3, [-.4, .3, 1], .45, .1); horn(1.25, .82, 2.3, [.4, .3, 1], .45, .1);
    horn(-1.25, -.82, 2.3, [-.4, -.3, 1], .45, .1); horn(1.25, -.82, 2.3, [.4, -.3, 1], .45, .1);
    // fangs under the beam and tusks at the base
    for (let k = 0; k < 7; k++) { const fx = -.48 + k * .16, q = P(fx, .42, 1.62 + (k % 2) * .04); if (q[2] > .1) p.shard(q[0], q[1], q[2], (.3 - Math.abs(k - 3) * .03) * s, .08 * s, [0, 0, -1], ['#6a5a58', '#8a7a74', '#b0a098', '#d0c4b8'], { back: .1, sides: 3, shadow: false }); }
    horn(-1.02, .62, .45, [-.15, .2, 1], .7, .12); horn(1.02, .62, .45, [.15, .2, 1], .7, .12);
    // lantern bodies
    const lan = [];
    for (const lx of [-.95, .95]) {
      const q = P(lx, .62, 1.45);
      if (q[2] > .1) { p.box(q[0] - .07 * s, q[1] - .07 * s, q[2] - .1 * s, q[0] + .07 * s, q[1] + .07 * s, q[2] + .1 * s, LA, { shadow: false }); lan.push(q); }
    }
    return { lanterns: lan, eyes: [P(-.16, -.22, 1.22), P(.16, -.22, 1.22)] };
  },
  draw(p, t) {
    const SM = this.palette.smoke, SL = this.palette.slash, LA = this.palette.lantern, ST = this.palette.stone;
    const HX = 2.35, X0 = -2.2, s = 1.25 * p.param('shrineSize'), red = p.param('redStrength'), N = Math.round(p.param('slashCount'));
    const SX = -2.05 - .3 * (s - 1.25), SY = -1.45 - .3 * (s - 1.25), fr = Math.floor(t * 30);
    // ---- caster ----
    let pose;
    if (t < .6) pose = { a: 'idle', b: 'gaze', k: p.easeOutBack(p.ph(t, .15, .6), 1.3) };
    else if (t < 4.3) pose = 'gaze';
    else pose = { a: 'gaze', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.3, 4.85)) };
    // target shakes on each big cut
    let shake = 0;
    for (const bt of this.BIG) { const d = t - bt; if (d > 0 && d < .5) shake += .1 * Math.exp(-7 * d) * Math.sin(d * 60) * (bt === 3.75 ? 1.8 : 1); }
    p.dummy(HX + shake, 0);
    p.figure(X0, 0, { pose });
    // ---- shrine rising out of the smoke, sinking back at the end ----
    const up = p.easeOutCubic(p.ph(t, .6, 1.5)) * (1 - p.easeInCubic(p.ph(t, 4, 4.55)));
    const H = 3 * s, dz = (1 - up) * H;
    let sh = null;
    if (up > .01) sh = this.shrine(p, SX, SY, s, dz, t);
    // black smoke: boils while rising / sinking, a thinner layer while standing
    const boil = Math.max(p.env(t, .25, .6, 1.3, 1.9), p.env(t, 3.85, 4.05, 4.5, 4.95)), nS = Math.round(18 * p.density);
    const base = .25 + .75 * boil;
    if (t > .25 && t < 4.95) for (let k = 0; k < nS; k++) {
      const ph = (t * (.45 + .25 * p.r(k, 1)) + p.r(k, 2)) % 1, ang = p.r(k, 3) * p.TAU, rr = (.35 + .85 * p.r(k, 4)) * s;
      const x = SX + Math.cos(ang) * rr * 1.25, y = SY + Math.sin(ang) * rr * .8 + .3, z = .1 + ph * (1.2 + 1.4 * boil) * s;
      const al = (1 - ph) * base * p.env(t, .25, .45, 4.75, 4.95);
      if (al > .05) p.ball(x, y, z, (.22 + .3 * ph) * s * (.7 + .5 * boil), SM, { alpha: Math.min(.95, al * 1.1), rough: .6, shadow: false, seed: k });
    }
    // ---- slashes: cut marks on the ground (before the domain remaps the ground) ----
    const dom = p.ph(t, .75, 1.6) * (1 - p.ph(t, 4.15, 4.75));
    const S = [];
    for (let k = 0; k < N; k++) S.push(this.slashAt(p, k, N));
    for (const sl of S) {
      if (sl.kind !== 1 || t < sl.t0 + .02) continue;
      const a = sl.a, b = sl.b;
      p.stain(sl.m[0], sl.m[1], Math.hypot(b[0] - a[0], b[1] - a[1]) / 2 + .1, (dx, dy) => {
        const x = dx + sl.m[0], y = dy + sl.m[1];
        return p.sdSeg(x, y, a[0], a[1], b[0], b[1]) < .035 ? 1.3 : 0;
      }, '#1a0c10', 1 - p.ph(t, 4.15, 4.6));
    }
    // ---- debris: rock chips from ground cuts, straw bits from the target ----
    const nC = Math.round(3 * p.density);
    const chips = (k, o, born, ramp, big) => {
      for (let j = 0; j < nC * big; j++) {
        const age = t - born, g = 7;
        if (age < 0 || age > 1.2) continue;
        const vx = (p.r(k * 7 + j, 71) - .5) * 2.4, vy = (p.r(k * 7 + j, 72) - .5) * 2.4, vz = 1.8 + p.r(k * 7 + j, 73) * 1.8;
        const z = o[2] + vz * age - g * age * age / 2;
        if (z < 0) continue;
        p.rock(o[0] + vx * age, o[1] + vy * age, z + .04, (.04 + .04 * p.r(k * 7 + j, 74)) * (big > 1 ? 1.3 : 1), ramp, k * 7 + j);
      }
    };
    for (let k = 0; k < S.length; k++) {
      const sl = S[k];
      if (sl.kind === 1) chips(k, sl.m, sl.t0 + .03, ST, 1);
      else if (sl.kind === 2) chips(k, [HX, 0, sl.m[2]], sl.t0 + .03, '#d8b66a', 1);
    }
    this.BIG.forEach((bt, i) => chips(100 + i, [HX, 0, 1.05], bt + .02, '#d8b66a', 2));
    // ---- domain: blood sky, dark red ground ----
    if (dom > 0) {
      const sky = { top: this.mixHex('#05060a', '#140306', red), bottom: this.mixHex('#0e121a', '#4a0b14', red), nebula: this.mixHex('#18202c', '#6e1420', red), stars: 0 };
      const ground = this.palette.blood.map(c => this.mixHex(['#0c0c10', '#16161c', '#22222a', '#30303a'][this.palette.blood.indexOf(c)], c, red));
      p.domain({ amt: dom, c: [SX, SY, 1], sky, ground, solids: .25, t });
    }
    // ---- light: lanterns, eyes ----
    if (sh) {
      const lit = up * (.7 + .3 * Math.sin(t * 7));
      for (const q of sh.lanterns) { p.glow(q[0], q[1], q[2], .2 * s, LA, .9 * lit); p.light(q[0], q[1], 0, 1.2 * s, LA, .5 * lit); }
      const blink = ((t % 1.3) < .08) ? 0 : 1;
      for (const q of sh.eyes) if (q[2] > .2) { p.dot(q[0], q[1], q[2], LA, 1.3 * up * blink, 2); p.glow(q[0], q[1], q[2], .12 * s, LA, .7 * up * blink); }
    }
    // ---- slash lines (light) ----
    for (const sl of S) {
      const u = (t - sl.t0) / .25;
      if (u <= 0 || u >= 1) continue;
      p.slash(sl.a, sl.b, { u, ramp: SL, w: sl.kind === 1 ? .1 : .08, I: 1.4, glow: sl.kind === 2 ? .35 : 0 });
      if (u < .4) p.light(sl.m[0], sl.m[1], 0, .9, SL, .6 * (1 - u / .4));
    }
    // ---- the big cuts on the target (pulse beats + the final hit) ----
    const c = p.cam();
    this.BIG.forEach((bt, i) => {
      const u = (t - bt) / .35, fin = i === this.BIG.length - 1;
      if (u <= 0 || u >= 1) return;
      const ctr = [HX + c.fwd[0] * .5, c.fwd[1] * .5, 1.05 + c.fwd[2] * .5], cuts = fin ? 2 : 1;
      for (let j = 0; j < cuts; j++) {
        const ang = (i * 1.3 + .5) + j * 1.5, L = fin ? 1.6 : 1.2;
        const d = [c.right[0] * Math.cos(ang) + c.up[0] * Math.sin(ang), c.right[1] * Math.cos(ang) + c.up[1] * Math.sin(ang), c.right[2] * Math.cos(ang) + c.up[2] * Math.sin(ang)];
        p.slash(p.v3.along(ctr, d, -L), p.v3.along(ctr, d, L), { u, ramp: SL, w: fin ? .2 : .15, I: 1.6, glow: .5 });
      }
      if (u < .3) {
        const fl = 1 - u / .3;
        p.glow(ctr[0], ctr[1], ctr[2], .3 + .4 * fl, SL, 1.2 * fl, { pow: 1.4 });
        if (fin) p.speedLines(ctr[0], ctr[1], ctr[2], { n: 18, R0: .8, R1: 3, ramp: SL, I: .9 * fl, seed: fr });
      }
      p.light(HX, 0, 0, 1.8, SL, .8 * (1 - u));
    });
  },
});
