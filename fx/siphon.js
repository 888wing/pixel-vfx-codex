// 血吸 / Siphon — Armory pack (original design): red streams spiral up a war axe along fixed helix paths while its head
// glows in hard steps; the caster advances on the army, every soldier within reach gives up a stream that curves to the
// axe, and the head climbs one brightness step with every fifth of the kill count.
PXFX.define({
  id: 'siphon',
  loop: 6.5,
  loopWindow: [.8125, 2.4375],   // seamless enchant loop in the close-up: two 0.8125 s cycles of both streams
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'stone', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade'],
  palette: {
    blood: ['#6a0f24', '#b01c34', '#e0324a', '#ffd6d6'],
    head: ['#4a0a1a', '#8e1428', '#e0324a', '#ff8c8c', '#fff2ee'],
    reach: ['#3a0c18', '#6e1424', '#a8243a', '#e0526a'],
  },
  beats: [{ t: 2.46, kind: 'cast', power: .5 }, { t: 3.0, kind: 'cast', power: .8 }, { t: 3.12, kind: 'hit', power: 1.3 }, { t: 3.8, kind: 'pulse', power: .7 }, { t: 5.05, kind: 'pulse', power: .4 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    reach: { zh: '吸取半徑', en: 'siphon reach', min: 1, max: 8, step: .1, value: 6.9 },
    flow: { zh: '血流速度', en: 'stream speed', min: 6, max: 16, step: .5, value: 9 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .4], k: 'pose', zh: '特寫：施法者（縮放 0.85）右手直握一把長 1.42 的戰斧，斧頭朝上；背景壓暗染暗紅，鏡頭放大 5.4 倍，斧刃邊緣兩級紅光', en: 'close-up: the caster (scale 0.85) holds a 1.42-long war axe upright in the right hand, head up; the background is darkened with a dark red tint, the lens zooms 5.4×, the cutting edge glows in two red tiers' },
    { t: [.4, 2.46], k: 'charge', zh: '附魔循環：兩條螺旋路徑由手繞斧柄到斧頭（半徑 0.075、3 圈、相位差 π），血流頭部 0.5 秒跑完、週期 0.8125 秒，第二條延遲半個週期，繞到斧柄後的一段被擋住；每次到達斧頭，刃邊亮度暫升一級；0.8125–2.4375 秒可無縫循環', en: 'enchant loop: two helix paths wind from the hand up the haft to the head (radius 0.075, 3 turns, phase π apart); a blood head runs each in 0.5 s on a 0.8125 s cycle, the second half a cycle late, the stretch behind the haft hidden; every arrival lifts the edge one tier for a moment; 0.8125–2.4375 s loops seamlessly' },
    { t: [2.46, 3.0], k: 'shape', zh: '施法者衝刺到敵陣前 x = −2.75（2.46–2.92 秒），鏡頭拉遠到 1.35 倍的戰場視角；2.9 秒舉起戰斧（斧柄握點高 1.37），2.95 秒地上先畫出半徑 = reach（6.9）的吸取邊界圈', en: 'the caster dashes to x = −2.75 in front of the army (2.46–2.92 s) while the camera pulls back to a 1.35× battlefield view; at 2.9 s the axe is raised (grip at height 1.37) and at 2.95 s the reach circle (radius = reach, 6.9) is drawn on the ground before anything dies' },
    { t: [3.0, 3.8], k: 'motion', zh: '規則：士兵與斧柄握點的地面距離 d < reach 即被吸，命中時間 = 3.0 + d ÷ flow（9）：一道寬 0.1 的硬邊紅圈由斧頭向外以每秒 flow 擴張，近的先倒；中招者閃白，變成蒼白骨色並縮水（高 −30%、寬 −25%）0.3 秒，再倒下', en: 'rule: a soldier whose ground distance d to the axe grip is < reach is drained, hit time = 3.0 + d / flow (9): a hard red front 0.1 wide expands from the axe at flow units/s and the near ones go first; hit soldiers flash white, turn pale bone and shrivel (height −30 %, width −25 %) for 0.3 s, then fall' },
    { t: [3.0, 4.98], k: 'impact', zh: '血流：200 條代表血流（取雜湊值 < 200 ÷ 人數的士兵），每條是固定的三次曲線：由胸口升起（0.25–0.6 + 0.06 × d）、全部同一方向旋轉、由斧柄外側收進握點；在命中時間離開士兵，以每秒 flow 沿曲線跑到斧頭，再沿螺旋衝上斧頭（期間螺旋改為 0.34 秒一圈、加粗）；斧頭亮度 = 2 + floor(5 × 已擊殺 ÷ 總數)，在 20/40/60/80/100% 各升一級並閃星，地面隨等級染紅；默認方陣全滅，圓陣後半（距斧 7.2）倖存', en: 'streams: 200 representative streams (soldiers whose hash < 200 / count), each a fixed cubic curve: up from the chest (0.25–0.6 + 0.06 × d), all swirling the same way, into the grip from just outside the haft; each leaves its soldier at the hit time and runs at flow units/s, then surges up the helices (now 0.34 s a cycle, thick); head level = 2 + floor(5 × killed / total), one step and a star at 20/40/60/80/100 %, the ground under the caster tinting red with the level; the default block is wiped, the back of a ring (7.2 from the axe) survives' },
    { t: [3.8, 6.5], k: 'after', zh: '消散：每條血流的亮芯先退、剩紅色殘影、再斷成血滴；邊界圈與紅圈 4.4–4.95 秒熄滅；4.98–5.38 秒施法者跳回 x = −4.3，斧頭每 0.12 秒降一級回到兩級；屍體 4.6–5.0 秒清走，新敵軍 5.0–5.55 秒出現，計數 4.75–4.98 秒淡出；鏡頭 5.4–6.15 秒推回斧頭特寫，5.69 秒起血流循環重新開始', en: 'breakup: each stream loses its core, leaves a red afterimage and breaks into droplets; the reach circle and front go out 4.4–4.95 s; 4.98–5.38 s the caster hops back to x = −4.3 and the head steps down one tier every 0.12 s back to two; bodies clear 4.6–5.0 s, a fresh army fades in 5.0–5.55 s, the counter fades 4.75–4.98 s; the camera pushes back into the axe close-up 5.4–6.15 s and the loop restarts at 5.69 s' },
  ],
  layers: [
    { zh: '武器：程式畫的戰斧（木柄、扇形斧刃、背刺），斧身平面朝向鏡頭並寫入深度，螺旋繞到柄後的一段被擋住；斧刃上疊一層發光條帶，由刃邊向內每 0.2 寬一級', en: 'weapon: a procedural war axe (wooden haft, fan-shaped bit, back spike) whose flat faces the camera and writes depth, hiding the far side of the helices; an emissive strip over the bit steps one tier per 0.2 of its width from the edge inward' },
    { zh: '路徑先行：兩條固定螺旋（紅、綠）與 200 條固定血流曲線，由陣型位置與參數算出並快取，每格不變，只有筆觸形狀每秒換 15–16 次；引導線顯示螺旋、每 6 條取 1 條血流路徑、藍色吸取邊界與白色移動標記', en: 'path first: two fixed helices (red, green) and 200 fixed stream curves computed from the layout and the knobs and cached, unchanged between frames; only the stroke shape changes 15–16 times a second; the guides show the helices, one in six stream paths, the blue reach circle and the white moving markers' },
    { zh: '筆觸與色階：血流 1 像素淺粉芯、紅色外圈、暗紅邊；斧頭 5 級發光色階（暗紅、紅、亮紅、粉、白），等級越高亮的條帶越多；不用柔光', en: 'stroke and tiers: streams have a 1 px pale pink core, a red ring and a dark red edge; the head uses a 5-step emissive ramp (dark red, red, bright red, pink, white), more bands lit at higher levels; no soft glow' },
    { zh: '消散：每條血流尾端亮芯先退成紅色殘影，再斷成碎段與單粒血滴；斧頭在餘波中一級一級降回原狀', en: 'breakup: the tail of each stream loses its core into a red afterimage, then breaks into segments and single droplets; the head steps back down tier by tier in the aftermath' },
    { zh: '判定與倖存：圓形範圍 d < reach，以斧柄握點為圓心；地上邊界圈與擴張紅圈用同一個 reach 與 flow；reach 小於陣型最遠一角的距離時後排倖存（默認下圓陣後半也在圈外）', en: 'rule and survivors: a circle d < reach about the axe grip; the ground limit and the expanding front use the same reach and flow; with reach under the distance to the farthest corner the back rows survive (at the defaults the back half of a ring is outside too)' },
    { zh: '軍隊與計數：1000 名像素小兵（默認方陣）；中招時只換材質（骨色）、縮水再倒下，不加逐兵光暈；角落擊殺計數全滅時變金色，斧頭同時到最高一級', en: 'army and counter: 1,000 pixel soldiers (default block); hit ones only change material (bone), shrivel and fall, no per-unit glow; the corner kill counter turns gold on a full wipe as the head reaches the top level' },
    { zh: '鏡頭：開場與結尾是放大 5.4 倍的斧頭特寫（背景壓暗染紅），衝刺時拉到 1.35 倍的戰場視角（施法者與全軍同框），跳回後推回特寫', en: 'camera: the loop opens and closes on a 5.4× close-up of the axe (background darkened, tinted red), pulls back to a 1.35× battlefield view (caster and army in frame) during the dash and pushes back in after the hop back' },
  ],

  CX: -4.3, XA: -2.75, CY: .18, SC: .85, AREA: { x: 1.0, y: 0, rx: 2.6, ry: 2.5 },
  CYC: .8125, RUN: .5, TURNS: 3, KC: 5.4, AS: 1.05, T0: 3.0, NS: 200, LST: .4, KM: 1.35, CM: [.35, 0, .4], TOM: [0, 0, .75],
  TA: 2.46, TA1: 2.92, TB: 4.98, TB1: 5.38,
  // caster x: advances to stand in front of the army, hops back at the end
  cx(t, p) { return this.CX + (this.XA - this.CX) * (p.easeInCubic(p.ph(t, this.TA, this.TA1)) * .3 + p.easeOutCubic(p.ph(t, this.TA, this.TA1)) * .7) * (1 - p.ease(p.ph(t, this.TB, this.TB1))); },
  // the right hand for a pose blend (same maths as p.figure, facing +x)
  handOf(x, pose) {
    const P = PXFX.POSES, A = P[pose.a], B = P[pose.b], k = pose.k, mix = (a, b) => a + (b - a) * k;
    const lean = mix(A.lean, B.lean), crouch = mix(A.crouch, B.crouch), hipZ = .76 * (1 - .28 * crouch);
    const cx = Math.sin(lean) * .4, cz = hipZ + Math.cos(lean) * .4, sc = this.SC;
    return [x + (cx + mix(A.hr[0], B.hr[0])) * sc, this.CY + (-.17 + mix(A.hr[1], B.hr[1])) * sc, (cz - .03 + mix(A.hr[2], B.hr[2])) * sc];
  },
  // the siphon centre: the raised hand on the axe haft, standing in front of the army
  H() { return this.handOf(this.XA, { a: 'raise', b: 'raise', k: 0 }); },
  // honest rule: within reach of the axe (ground distance); hit when the front passes = T0 + distance / flow
  hitOf(u, reach, flow) {
    const H = this.H(), d = Math.hypot(u.x - H[0], u.y - H[1]);
    return d < reach ? this.T0 + d / flow : null;
  },
  // representative streams: every unit whose hash falls under NS / n, a fixed curved path to the hand (cached)
  streams(p, units, reach, flow) {
    const c = this._st;
    const dens = p.density;
    if (c && c.units === units && c.reach === reach && c.flow === flow && c.dens === dens) return c.list;
    const H = this.H(), n = units.length, keep = Math.min(1, this.NS * dens / n), list = [];
    for (const u of units) {
      if (u.r3 >= keep) continue;
      const hit = this.hitOf(u, reach, flow);
      if (hit == null) continue;
      const dx = u.x - H[0], dy = u.y - H[1], d = Math.hypot(dx, dy) || 1, ex = dx / d, ey = dy / d, sw = .45 + .35 * u.r2;
      // leave the chest, rise and swirl (all the same way: a vortex), come in to the hand from just outside the haft
      const P0 = [u.x, u.y, .12], P1 = [u.x - ex * d * .2 - ey * d * sw * .35, u.y - ey * d * .2 + ex * d * sw * .6, .25 + .35 * u.r1 + d * .06];
      const P2 = [H[0] + ex * .7 - ey * .5, H[1] + ey * .7 + ex * .5, H[2] + .35], P3 = [H[0], H[1], H[2] - .05];
      const bez = q => { const a = 1 - q; return [0, 1, 2].map(i => a * a * a * P0[i] + 3 * a * a * q * P1[i] + 3 * a * q * q * P2[i] + q * q * q * P3[i]); };
      const path = p.path(bez, 14);
      list.push({ u, hit, path, arr: hit + path.len / flow });
    }
    this._st = { units, reach, flow, dens, list };
    return list;
  },
  near(t, p) { return 1 - p.ease(p.ph(t, 2.46, 2.95)) + p.ease(p.ph(t, 5.4, 6.15)); },
  FOCUS() { const h = this.handOf(this.CX, { a: 'ready', b: 'ready', k: 0 }); return [h[0], h[1], h[2] + .4]; },
  // the close-up on the axe blends into a slightly zoomed battlefield (army and caster, so the head steps read)
  lensAt(t, p) {
    const b = this.near(t, p), F = this.FOCUS(), CM = this.CM, TM = this.TOM;
    const kk = this.KM + (this.KC - this.KM) * b, lp = (a, c) => [a[0] + (c[0] - a[0]) * b, a[1] + (c[1] - a[1]) * b, a[2] + (c[2] - a[2]) * b];
    return { k: kk, c: lp(CM, F), to: lp(TM, [0, 0, 1.05]) };
  },
  seedAt(t) { const P = 2 * this.CYC, q = (((t + 1 / 32) % P) + P) % P; return Math.floor(q * 16) % 26; },   // buckets centred on the loop seam

  draw(p, t) {
    const reach = p.param('reach'), flow = p.param('flow'), PL = this.palette, BL = PL.blood, TAU = Math.PI * 2;
    const near = this.near(t, p), sc = this.SC, seed = this.seedAt(t), hold = p.hold(t), CY = this.CYC;
    const formation = PXFX.TROOPS[p.param('formation') | 0].id, H = this.H(), T0 = this.T0, IR = this.view.r * .92 * .97;

    // ---- caster: holds the axe upright, dashes forward, raises it, hops back ----
    const x = this.cx(t, p), dash = p.ph(t, this.TA, this.TA1), up = p.easeOutBack(p.ph(t, 2.9, 3.02), 1.4), down = p.ease(p.ph(t, 4.8, 5.1));
    let pose = 'ready';
    if (dash > 0 && dash < 1) pose = { a: 'ready', b: 'dash', k: Math.sin(Math.PI * dash) };
    if (up > 0) pose = { a: 'ready', b: 'raise', k: Math.min(1, up) * (1 - down) };
    if (t >= this.TB && t < this.TB1) pose = { a: 'ready', b: 'dash', k: .6 * Math.sin(Math.PI * p.ph(t, this.TB, this.TB1)) };
    const fig = p.figure(x, this.CY, { scale: sc, pose });

    // ---- army ----
    const units = p.crowdLayout({ n: Math.round(p.param('crowd')), seed: 33, formation, area: this.AREA, faceTo: [this.CX, 0] });
    const st = p.crowd({
      n: Math.round(p.param('crowd')), seed: 33, formation, area: this.AREA, faceTo: [this.CX, 0], t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, reach, flow),
      react: (s, a, u) => {
        s.walk = null; s.spear = a < .2;
        // drained: pale and shrivelled while the stream leaves, then falls
        if (a > .05) s.mat = 'bone';
        const k = p.easeOut(p.ph(a, .02, .3));
        s.sq = 1 - .3 * k; s.wide = 1 - .25 * k; s.jit = a < .25 ? .012 : 0;
        if (a > .3) s.tilt = Math.PI / 2 * p.easeIn((a - .3) / (.25 + .2 * u.r2));
      },
      fear: u => (t > 2.95 && t < T0 + 1 ? .5 * p.ph(t, 2.95, 3.1) : 0),
      respawn: [5.0, 5.55], clear: [4.6, 5.0],
    });
    // the kill fraction drives the axe head: 6 hard steps (start, then every 20 %)
    let dead = 0, deadP = 0;
    for (const s of st) if (s.hitT != null) { if (t >= s.hitT) dead++; if (t - .1 >= s.hitT) deadP++; }
    const frac = st.length ? dead / st.length : 0, fracP = st.length ? deadP / st.length : 0;
    const lvl = c => 2 + Math.min(5, Math.floor(c * 5 + 1e-9));   // 2 at rest, +1 at 20/40/60/80/100 %
    let G = lvl(frac);
    const stepUp = lvl(frac) > lvl(fracP);
    // venting back down after the kill: one step every 0.12 s
    if (t > this.TB) G = Math.max(2, Math.min(G, 7 - Math.floor((t - this.TB) / .12)));
    if (t < 2.9) G = 2;

    if (near > 0) p.grade({ dark: .78 * near, desat: .45 * near, tint: '#241020', tintAmt: .35 * near, bg: near });

    // ---- the axe: held upright (head up) in the right hand ----
    const ax = p.weapon('axe', [fig.hand[0], fig.hand[1], fig.hand[2] - .3], [0, 0, 1], { scale: this.AS });
    // glowing head: emissive bands from the cutting edge inward, tier count = brightness level G
    {
      const Lp = [], Rp = [], ws = this.AS, cf = ax.nrm;
      for (let k = 0; k <= 8; k++) {
        const b = k / 8, a0 = ax.axis(.7 + .27 * b), w = (.08 + .24 * Math.pow(Math.sin(Math.PI * b), .6)) * ws;
        const e = [a0[0] + ax.side[0] * w + ax.dir[0] * (b - .5) * .12 * ws, a0[1] + ax.side[1] * w + ax.dir[1] * (b - .5) * .12 * ws, a0[2] + ax.side[2] * w + ax.dir[2] * (b - .5) * .12 * ws];
        Lp.push([a0[0] + ax.side[0] * .03 * ws + cf[0] * .012, a0[1] + ax.side[1] * .03 * ws + cf[1] * .012, a0[2] + ax.side[2] * .03 * ws + cf[2] * .012]);
        Rp.push([e[0] + cf[0] * .012, e[1] + cf[1] * .012, e[2] + cf[2] * .012]);
      }
        const ph = ((t % CY) + CY) % CY, beat = (t < 2.9 || t >= 5.6875) && ((ph > .5 && ph < .56) || (ph > .094 && ph < .15)) ? 1 : 0;
      const g = G + beat + (stepUp ? 1 : 0), n = 5;
      p.ribbon(Lp, Rp, (u, v) => {
        const lv = Math.min(4, (g - 1) - Math.floor((1 - v) / .2));
        return lv < 0 ? 0 : (lv + .5) / n;
      }, PL.head, 1);
      if (G >= 7 || stepUp) { const tip = ax.head.at(.5, 1.05); p.sparkle(tip[0], tip[1], tip[2], G >= 7 ? 5 : 3, PL.head, 1); }
      if (G > 2) p.light(fig.hand[0], fig.hand[1], 0, .2 + .2 * G, PL.head, .02 + .08 * G);
    }

    // ---- enchant loop: two streams spiral up the haft from the hand to the head (hidden behind the haft) ----
    const helices = [0, 1].map(c => p.helix({ w: ax, u0: .27, u1: .74, r: .075, turns: this.TURNS, phase: c * Math.PI }));
    const backA = pt => ax.behind(pt), marks = [[], []];
    const list = this.streams(p, units, reach, flow);
    const busy = t > T0 && list.some(s => t > s.arr - .05 && t < s.arr + .35);
    const loopOn = t < 2.9 || t >= 5.6875 || busy;
    if (loopOn) {
      const cyc = busy ? .34 : CY, run = busy ? .24 : this.RUN;
      for (let c = 0; c < 2; c++) {
        const path = helices[c], t0 = c * cyc / 2, tc = t - t0, k = Math.floor(tc / cyc), u = (tc - k * cyc) / run;
        if (t >= 5.6875 && t0 + k * cyc < 5.6875) continue;
        const sh = Math.pow(Math.min(u, 1.6), 1.3), L = .28 + .2 * (u < 1 ? 1 : 0), head = Math.min(sh, 1);
        const sd = (busy ? hold : seed) * 3 + c * 101 + (k & 1) * 7;
        if (u < 1.45) {
          p.zap(path, Math.max(0, sh - L), head, BL, { seed: sd, jag: 1.5, back: backA, thick: busy ? 2 : 1, tail: .45, forks: 0 });
          for (let ch = 0; ch < 3; ch++) {
            const a0 = sh - L - (ch + 1) * .1, a1 = sh - L - ch * .1;
            if (a1 > 0) p.zap(path, Math.max(0, a0), Math.min(1, a1), BL, { seed: sd + ch + 1, jag: 1.5, back: backA, fade: .3 + ch * .25, forks: 0 });
          }
          if (u < 1) marks[c].push(path.at(head));
        }
      }
    }
    if (p.guiding) { p.guide(helices[0], 'red', { marks: marks[0] }); p.guide(helices[1], 'green', { marks: marks[1] }); }

    // ---- the siphon: a hard-edged front expands from the axe at `flow`; the reach circle is the honest limit ----
    if (t > 2.95 && t < 4.95) {
      const fr = Math.min(reach, Math.max(0, (t - T0) * flow)), fade = p.ph(t, 4.4, 4.95), tel = p.ph(t, 2.95, 3.05);
      p.decal(H[0], H[1], 0, reach + .05, (dx, dy, rho) => {
        if (rho > reach || Math.hypot(H[0] + dx, H[1] + dy) > IR) return 0;   // ground only (island radius)
        if (rho > reach - .07) return .9 * tel;                          // the limit: drawn before anything dies
        if (fr < reach && rho > fr - .1 && rho < fr) return 1;          // the moving front
        if (fr < reach && rho > fr - .45 && rho < fr - .1) return .3;   // a short wake behind the front
        return 0;
      }, PL.reach, 1 - fade);
      if (p.guiding) {
        const ring = [];
        for (let k = 0; k <= 48; k++) ring.push([H[0] + Math.cos(k / 48 * TAU) * reach, H[1] + Math.sin(k / 48 * TAU) * reach, .02]);
        p.guide(ring, 'blue');
      }
    }
    // ---- the streams: each leaves its soldier at the hit time, runs its fixed curve to the hand at `flow` ----
    if (t > T0 - .02 && t < 5.0) {
      const gl = p.guiding;
      let gi = 0;
      for (const s of list) {
        const a = t - s.hit;
        if (a < 0) continue;
        const len = s.path.len, sH = a * flow / len, Ls = this.LST / len;
        if (sH - Ls > 1.5) continue;
        const head = Math.min(1, sH), s0 = Math.max(0, sH - Ls), late = p.ph(t, 4.7, 4.98);   // slow streams break up before the respawn
        if (s0 < 1) p.zap(s.path, s0, head, BL, { seed: hold * 7 + s.u.i, jag: 1.2, step: 4, thick: 0, forks: 0, tail: .5, gaps: .03, fade: late });
        // behind the stroke: the core is gone, a red afterimage, then droplets
        const b0 = Math.max(0, sH - Ls * 1.5), b1 = Math.min(1, s0);
        if (b1 > b0) p.zap(s.path, b0, b1, BL, { seed: hold * 7 + s.u.i + 3, jag: 1.2, step: 4, forks: 0, fade: Math.min(1, .45 + .3 * Math.max(0, sH - 1) + late) });
        if (gl && (gi++ % 6 === 0)) p.guide(s.path, s.u.i & 1 ? 'green' : 'red', { marks: sH < 1 ? [s.path.at(head)] : [] });
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 3.0, 3.1) * (1 - p.ph(t, 4.75, 4.98)) });
  },
});
