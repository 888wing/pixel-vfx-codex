// 穿陣光矛 / Piercing Lance — Scale Ladder pack (original design), tier 10: a gold-white spear of light hurled through a single-file column, skewering soldier after soldier until its pierce budget runs out
PXFX.define({
  id: 'piercing-lance',
  loop: 4.5,
  beats: [{ t: 1.45, kind: 'cast', power: .8 }, { t: 1.54, kind: 'hit', power: 1.35 }, { t: 2.0, kind: 'pulse', power: .5 }, { t: 2.55, kind: 'burst', power: .7 }],
  view: { r: 3.6, h: 2.9 },
  stage: { ground: 'slate' },
  modules: ['figure', 'charge', 'core', 'crowd', 'troops', 'impact', 'shockwave', 'aftermath', 'tally'],
  palette: {
    lance: ['#b4641c', '#e0982e', '#f6c454', '#ffe6a0', '#fff6dc', '#ffffff'],
    glint: ['#d8a040', '#ffe0a0', '#fff8e8', '#ffffff'],
    lane: ['#8a5a2a', '#c08a3a', '#f0c060', '#ffe6a0'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者（高 1.5）站在 (−2.4, 0)，面向敵陣重心，0.3 秒回彈緩動舉起右手；十個敵兵（高約 0.6）排成一路縱隊，由 x = −0.9 排到 x = 2.5，面向施法者', en: 'pose: the caster (1.5 tall) stands at (−2.4, 0) facing the formation centroid and raises the right hand with a 0.3 s overshoot ease; ten soldiers (~0.6 tall) stand in a single-file column from x = −0.9 to 2.5, facing the caster' },
    { k: 'charge', t: [.45, 1.45], zh: '集氣：14 道金白光線匯聚到舉起的手，手中一支長 1.25 的光矛由手心向兩端伸出（0.5 秒回彈緩動），矛頭閃四角星；地面亮起一條半寬 = width（0.3）的瞄準通道，兩條金邊，箭頭紋沿施法者→重心方向流動；敵兵輕微發抖', en: 'charge: 14 gold-white streaks converge on the raised hand and a 1.25-long spear of light grows out of the palm in both directions (0.5 s overshoot), its head flashing a four-point star; an aim lane of half-width = width (0.3) lights up on the ground, two gold edges with chevrons flowing along the caster→centroid axis; the soldiers tremble' },
    { k: 'shape', t: [1.18, 1.45], zh: '成形：1.18–1.42 秒施法者向後拉弓（光矛上翹 0.55 弧度、手收到肩後），1.45 秒在 0.1 秒內把矛擲出（姿勢 拉後→前刺），手部爆一圈光環', en: 'shape: from 1.18 to 1.42 s the caster draws back (the spear tilts up 0.55 rad, the hand goes behind the shoulder); at 1.45 s the spear is hurled within 0.1 s (pose windup → thrust) with a flash ring at the hand' },
    { k: 'motion', t: [1.45, 2.0], zh: '推進：光矛以每秒 8 單位沿施法者→敵陣重心的軸線飛行，先由手高 1.2 俯衝到胸口高度再水平穿過縱隊，身後拖 1.6 長的漸細光尾，地上燒出一條半寬 0.3 的金色焦痕；判定：與矛軸距離 ≤ width（0.3）且按沿軸距離排序位於前 pierce（10）人之內的敵兵中矛；命中時間 = 1.45 +（沿軸距離 − 0.75）÷ 8 秒；每穿過一人：全身閃白 0.07 秒、胸口一圈垂直於矛軸的光環擴張、一顆四角星與 4 道向前噴的光屑；光矛每穿一人就縮暗一級', en: 'motion: the spear flies at 8 units/s along the caster→centroid axis, diving from hand height 1.2 to chest height and then levelling through the column, with a 1.6-long tapering light trail and a gold scorch of half-width 0.3 burnt into the ground; area test: hit if the distance to the lance axis ≤ width (0.3) and the unit is among the first `pierce` (10) sorted by distance along the axis; hit time = 1.45 + (distance along the axis − 0.75) / 8 s; at every body: a 0.07 s white flash, a ring of light around the shaft expanding at the chest, a four-point star and 4 forward-spraying sparks; the spear dims one step per body pierced' },
    { k: 'impact', t: [1.54, 2.6], zh: '命中：第一人中矛時頓幀＋震屏；每個中矛者被矛拖前 0.12–0.32 單位再倒下（三種：向前對摺後趴下／被扭轉半圈後仰倒／跪下後側倒）；穿透額度用完時光矛停在最後一人體內，把他向後釘倒在地，矛尾顫動 0.3 秒，2.55 秒碎成 14 片光屑並在地上炸開半徑 0.75 的光環；額度未用完時光矛飛過最後一人，斜插入地面；額度以外或通道以外的敵兵只會縮一下身', en: 'impact: hit-stop and shake when the first body is skewered; each pierced soldier is dragged 0.12–0.32 units along the axis and then drops (three kinds: folds forward and falls face-down / is twisted half round and falls back / kneels and topples sideways); when the pierce budget runs out the spear stops inside the last body and pins it backwards to the ground, the shaft quivers for 0.3 s and at 2.55 s bursts into 14 light shards with a radius-0.75 ring on the ground; with budget left it flies past the last body and stabs into the ground at an angle; soldiers beyond the budget or outside the lane only flinch' },
    { k: 'after', t: [2.6, 4.5], zh: '餘波：焦痕與光屑在 3.5 秒前淡出，施法者收手回到站姿；屍體在 3.25–3.85 秒淡出，擊殺計數同時淡出，新一批敵兵由側面走回原位', en: 'aftermath: the scorch and shards fade by 3.5 s and the caster returns to idle; the bodies fade at 3.25–3.85 s together with the kill counter, and a fresh squad walks in from the side back to its spots' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→舉手→拉後→前刺→待機，永遠面向敵陣重心', en: 'caster: faceless mannequin, poses idle → raise → windup → thrust → idle, always facing the formation centroid' },
    { zh: '敵陣：5–20 個 3D 小兵（自動縮放，上限 1.5 倍），鋼盔配色，按陣型（預設縱隊）排在中心 (0.8, 0)、半深 1.6、半寬 1.4 的範圍內；右上角式擊殺計數「已擊殺／總數」，全滅時轉金色', en: 'formation: 5–20 3D soldiers (auto scale, capped at 1.5×) with steel helmets, laid out in a formation (default column) inside an area centred at (0.8, 0), half depth 1.6, half width 1.4; a kill counter "killed / total" in the corner turns gold on a full wipe' },
    { zh: '判定與倖存：矛軸 = 施法者→敵陣重心；與軸距離 ≤ width 且沿軸排序在前 pierce 人之內才中矛（按沿軸距離 ÷ 速度依次命中）；地上的瞄準通道與焦痕寬度正是 2 × width，焦痕在光矛停下處結束；其餘敵兵保持站立，只在矛經過或停下時縮身', en: 'area test and survivors: the lance axis runs caster → centroid; a unit is hit only if its distance to the axis ≤ width and it is among the first `pierce` along the axis (hit in order of distance along the axis / speed); the aim lane and the scorch on the ground are exactly 2 × width wide and the scorch ends where the spear stops; everyone else stays standing and only flinches as the spear passes or stops' },
    { zh: '光矛：發光線段（核心寬 0.04，外暈寬 0.1），矛頭是長 0.3、寬 0.1 的菱形，前端白熱；飛行時沿路徑取樣畫 1.6 長的漸細光尾，並照亮地面', en: 'spear: an emissive segment (core 0.04 wide, halo 0.1) with a 0.3-long, 0.1-wide diamond head that is white-hot at the point; in flight a 1.6-long tapering trail is sampled along its path and it lights the ground' },
    { zh: '穿刺特寫：每具中矛的身體閃白、胸口一圈以矛軸為法線的光環（半徑 0.12→0.47，0.18 秒）、一顆四角星、4 道向前噴出的光屑；自訂反應把身體沿矛軸拖前後對摺、扭轉或跪倒', en: 'pierce beats: each skewered body flashes white with a ring of light whose normal is the lance axis (radius 0.12 → 0.47 in 0.18 s), a four-point star and 4 forward sparks; a custom reaction drags the body along the axis and then folds, twists or kneels it' },
    { zh: '收尾：光矛釘入最後一人／地面後彈簧式顫動（振幅 0.07，衰減 6/秒），再碎成 14 片菱形光屑（拖曳減速＋重力），地面一圈衝擊光環', en: 'finish: the spear quivers like a spring once it sticks in the last body or the ground (amplitude 0.07, decay 6/s), then bursts into 14 diamond shards (drag plus gravity) with a shock ring on the ground' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 5, max: 20, step: 1, value: 10 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 2, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    pierce: { zh: '可穿透人數', en: 'pierce count', min: 1, max: 20, step: 1, value: 10 },
    width: { zh: '判定寬度', en: 'lane half-width', min: .15, max: .6, step: .05, value: .3 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  C: [-2.4, 0],
  AREA: { x: .8, y: 0, rx: 1.6, ry: 1.4 },
  REL: 1.45, V: 8, A0: .75, Z0: 1.2, LEN: 1.25,
  // the lance plan for one layout + knobs (cached): axis, who is hit and when, where the spear stops
  plan(units, pierce, width) {
    const c = this._pc;
    if (c && c.units === units && c.pierce === pierce && c.width === width) return c;
    const C = this.C, n = units.length;
    let mx = 0, my = 0;
    for (const u of units) { mx += u.x; my += u.y; }
    mx /= n; my /= n;
    const L = Math.hypot(mx - C[0], my - C[1]) || 1, d = [(mx - C[0]) / L, (my - C[1]) / L], nr = [-d[1], d[0]];
    const al = new Float64Array(n), of = new Float64Array(n), lane = [];
    for (const u of units) {
      const rx = u.x - C[0], ry = u.y - C[1], a = rx * d[0] + ry * d[1], o = rx * nr[0] + ry * nr[1];
      al[u.i] = a; of[u.i] = o;
      if (a > this.A0 && Math.abs(o) <= width) lane.push(u);
    }
    lane.sort((p1, p2) => al[p1.i] - al[p2.i]);
    const hits = lane.slice(0, pierce), hitT = new Array(n).fill(null);
    for (const u of hits) hitT[u.i] = this.REL + (al[u.i] - this.A0) / this.V;
    const exhausted = hits.length > 0 && lane.length >= pierce, last = hits.length ? hits[hits.length - 1] : null;
    // distance along the axis to the island edge (keep the spear on the island)
    const R = this.view.r * .92 * .9, b = C[0] * d[0] + C[1] * d[1], cc = C[0] * C[0] + C[1] * C[1] - R * R, edgeA = -b + Math.sqrt(Math.max(0, b * b - cc));
    const stopA = exhausted ? al[last.i] + .18 : Math.min(edgeA, (last ? al[last.i] : L) + 1.1);
    const stopT = this.REL + (stopA - this.A0) / this.V;
    // when each survivor flinches: the spear passes its spot along the axis (or stops short of it)
    const tp = new Float64Array(n);
    for (const u of units) tp[u.i] = this.REL + (Math.min(Math.max(al[u.i], this.A0), stopA) - this.A0) / this.V;
    const firstA = hits.length ? al[hits[0].i] : lane.length ? al[lane[0].i] : L;
    this._pc = { units, pierce, width, d, nr, al, of, hits, hitT, exhausted, lastI: last ? last.i : -1, stopA, stopT, tp, firstA, edgeA, burst: stopT + .55 };
    return this._pc;
  },
  draw(p, t) {
    const PL = this.palette, LA = PL.lance, GL = PL.glint, C = this.C, REL = this.REL, V = this.V, A0 = this.A0, LEN = this.LEN;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id, pierce = Math.round(p.param('pierce')), width = p.param('width');
    const co = { n, seed: 3, formation: form, area: this.AREA, faceTo: C };
    const units = p.crowdLayout(co), pl = this.plan(units, pierce, width), d = pl.d, nr = pl.nr, face = Math.atan2(d[1], d[0]);
    const STOP = pl.stopT, BT = pl.burst;
    // ---- caster ----
    let pose;
    if (t < .3) pose = 'idle';
    else if (t < .6) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .3, .6), 1.3) };
    else if (t < 1.18) pose = 'raise';
    else if (t < REL - .03) pose = { a: 'raise', b: 'windup', k: p.easeOutCubic(p.ph(t, 1.18, REL - .03)) };
    else if (t < 2.4) pose = { a: 'windup', b: 'punch', k: p.easeOutExpo(p.ph(t, REL - .03, REL + .07)) };
    else pose = { a: 'punch', b: 'idle', k: p.easeOutCubic(p.ph(t, 2.4, 3.1)) };
    const fig = p.figure(C[0], C[1], { pose, face, lean: t > REL && t < 2.4 ? .12 * Math.exp(-(t - REL) * 3) : 0 });
    // ---- the squad ----
    const react = (s, a, u, pp) => {
      s.walk = null; s.tdir = [d[0], d[1]];
      s.spear = a < .06;
      s.glow = a < .1 ? .55 * (1 - a / .1) : 0;
      if (u.i === pl.lastI && pl.exhausted) {
        // pinned: carried to the stop point, bent back over the shaft, nailed to the ground, dropped when the spear bursts
        const slide = (pl.stopA - pl.al[u.i] - .06) * pp.easeOutCubic(pp.ph(a, 0, .05)) + .3 * pp.easeInCubic(pp.ph(o0(a), 0, .22));
        s.x += d[0] * slide; s.y += d[1] * slide;
        const back = pp.easeInCubic(pp.ph(o0(a), 0, .22)), drop = pp.easeInCubic(pp.ph(pp.t, BT, BT + .16));
        s.tilt = .35 * pp.easeOutCubic(pp.ph(a, 0, .05)) + .85 * back + (Math.PI / 2 - 1.2) * drop;
        s.jit = pp.t > STOP + .22 && pp.t < BT ? .012 : 0;
        return;
      }
      const drag = (.12 + .2 * u.r3) * pp.easeOutCubic(pp.ph(a, 0, .14));
      s.x += d[0] * drag; s.y += d[1] * drag;
      if (u.r2 < .4) {
        // folds forward over the hole, then crumples face-down towards the caster
        s.tdir = [-d[0], -d[1]];
        const k1 = pp.easeOutCubic(pp.ph(a, 0, .16)), k2 = pp.easeInCubic(pp.ph(a, .28 + .14 * u.r1, .5 + .14 * u.r1));
        s.tilt = .85 * k1 + (Math.PI / 2 - .85) * k2;
        s.sq = 1 - .22 * k1 * (1 - k2);
        s.z = .08 * Math.sin(Math.PI * pp.ph(a, 0, .2));
      } else if (u.r2 < .75) {
        // twisted half round by the shaft, falls back along the axis
        s.face = u.face + (u.r1 > .5 ? 1 : -1) * 2.4 * pp.easeOutCubic(pp.ph(a, 0, .22));
        s.tilt = Math.PI / 2 * pp.easeIn(pp.ph(a, .06, .46 + .12 * u.r3));
      } else {
        // knees buckle, kneels a beat, topples sideways
        const sd = u.r1 > .5 ? 1 : -1;
        s.tdir = [nr[0] * sd, nr[1] * sd];
        const kn = pp.easeOutCubic(pp.ph(a, 0, .1)), tp = pp.easeIn(pp.ph(a, .36 + .1 * u.r3, .66 + .1 * u.r3));
        s.sq = 1 - .38 * kn * (1 - tp);
        s.tilt = .25 * kn + (Math.PI / 2 - .25) * tp;
      }
    };
    const o0 = a => a - (pl.stopT - pl.hitT[pl.lastI]);   // time since the spear stopped (pinned body)
    const pre = .35 * p.ph(t, .7, 1.4) * (1 - p.ph(t, 1.6, 2.2));
    const crowd = p.crowd(Object.assign({
      t, scale: 'auto', maxScale: 1.5, pal: 'steel', ramp: GL,
      hit: u => pl.hitT[u.i], react,
      at: u => (Math.abs(pl.of[u.i]) > .05 ? [C[0] + d[0] * pl.al[u.i], C[1] + d[1] * pl.al[u.i], 0] : [C[0], C[1], 0]),
      fear: u => Math.max(pre * (.6 + .4 * u.r3), p.ph(t, pl.tp[u.i] - .02, pl.tp[u.i] + .05) * (1 - p.ph(t, pl.tp[u.i] + .2, pl.tp[u.i] + .8)), p.ph(t, BT, BT + .05) * (1 - p.ph(t, BT + .15, BT + .6)) * .7),
      respawn: [3.5, 4.4], clear: [3.25, 3.85], from: [-.3, 1], enterD: 1.2,
    }, co));
    const sc = crowd.scale, ZC = .1 + .3 * sc;
    // ---- the flight path: dive from the hand to chest height, level through the column, stab into the ground when nothing is left to pierce ----
    const s1 = Math.max(A0 + .35, pl.firstA - .3);
    const zAt = s => {
      let z = this.Z0 + (ZC - this.Z0) * (1 - Math.pow(1 - p.clamp((s - A0) / (s1 - A0), 0, 1), 2));
      if (!pl.exhausted && s > pl.stopA - .6) z -= (ZC - .02) * Math.pow(p.clamp((s - pl.stopA + .6) / .6, 0, 1), 2);
      return z;
    };
    const P = s => [C[0] + d[0] * s, C[1] + d[1] * s, zAt(s)];
    // ---- ground: scorch along the lane where the spear has flown (solids pass) ----
    const tipS = t < REL ? A0 : Math.min(pl.stopA, A0 + (t - REL) * V);
    const scorch = t > REL ? 1 - p.ph(t, 2.9, 3.5) : 0;
    if (scorch > 0 && tipS > A0 + .05) {
      const mA = (A0 + tipS) / 2, half = (tipS - A0) / 2, cx = C[0] + d[0] * mA, cy = C[1] + d[1] * mA;
      p.stain(cx, cy, half + width + .05, (dx, dy) => {
        const along = dx * d[0] + dy * d[1], acr = Math.abs(dx * nr[0] + dy * nr[1]);
        return Math.abs(along) <= half && acr <= width ? (acr < width * .45 ? .75 : .45) + .2 * p.noise(along * 5, acr * 9) : 0;
      }, '#2c2218', scorch);
    }
    // ---- light ----
    const laneQuad = (s0, s2, fn, ramp, I) => {
      const a = [C[0] + d[0] * s0 + nr[0] * width, C[1] + d[1] * s0 + nr[1] * width, .015], b = [C[0] + d[0] * s2 + nr[0] * width, C[1] + d[1] * s2 + nr[1] * width, .015];
      const c2 = [C[0] + d[0] * s2 - nr[0] * width, C[1] + d[1] * s2 - nr[1] * width, .015], d2 = [C[0] + d[0] * s0 - nr[0] * width, C[1] + d[1] * s0 - nr[1] * width, .015];
      p.lquad(a, b, c2, d2, fn, ramp, I);
    };
    // aim lane telegraph: exactly 2 x width wide, chevrons flowing towards the formation, out to the island edge
    const tele = p.env(t, .55, .95, REL, REL + .25);
    if (tele > 0) {
      const len = pl.edgeA - A0;
      laneQuad(A0, pl.edgeA, (u, v) => {
        const e = v < .1 || v > .9 ? .85 : 0, ch = ((u * len * 2.2 - t * 3.2 - Math.abs(v - .5) * 1.6) % 1 + 1) % 1 < .16 ? .45 : 0;
        return Math.max(e, ch) * (1 - .6 * u) * p.ph(u, 0, .04 + .96 * tele);
      }, PL.lane, .8 * tele);
    }
    // burnt lane where the spear has been: bright edges, hot near the tip
    const burn = t > REL ? 1 - p.ph(t, STOP + .3, 3.2) : 0;
    if (burn > 0 && tipS > A0 + .05) {
      laneQuad(A0, tipS, (u, v) => (v < .1 || v > .9 ? .7 + .5 * u : .18 * Math.pow(u, 3)), PL.lane, burn);
    }
    // charge: motes into the raised hand, the spear grows out of the palm
    const hand = fig.hand;
    if (t > .45 && t < REL) {
      const u = p.ph(t, .45, 1.3);
      p.charge(hand[0], hand[1], hand[2], u, { n: 14, R: 1.1, ramp: LA, up: .2 });
      p.core(hand[0], hand[1], hand[2], { r: .04 + .04 * u, ramp: LA, I: .7 + .3 * u, t, halo: 2 });
      p.light(hand[0], hand[1], 0, 1.1, LA, .45 * u);
    }
    if (t > .5 && t < REL + .01) {
      const g = p.easeOutBack(p.ph(t, .5, 1.0), 1.4), pitch = t < 1.18 ? .3 : p.lerp(.3, .6, p.easeOutCubic(p.ph(t, 1.18, REL - .03))) - 1.0 * p.ph(t, REL - .03, REL);
      const hd = [d[0] * Math.cos(pitch), d[1] * Math.cos(pitch), Math.sin(pitch)], half = LEN / 2 * g;
      const ctr = [hand[0] - hd[0] * .1 * g, hand[1] - hd[1] * .1 * g, hand[2] - hd[2] * .1 * g];
      const tip = [ctr[0] + hd[0] * half, ctr[1] + hd[1] * half, ctr[2] + hd[2] * half], tail = [ctr[0] - hd[0] * half, ctr[1] - hd[1] * half, ctr[2] - hd[2] * half];
      this.spear(p, tail, tip, hd, .7 + .3 * g, 1);
      if (t > .85 && t < 1.1) p.sparkle(tip[0], tip[1], tip[2], 4 * p.env(t, .85, .9, .95, 1.1), GL, 1.3);
    }
    // release flash ring at the hand
    const ra = t - REL;
    if (ra >= 0 && ra < .2) {
      p.ring(hand[0], hand[1], hand[2], .08 + .24 * p.easeOutExpo(ra / .16), .04 * (1 - ra / .2) + .015, LA, 1.1 * (1 - ra / .2), { axis: [d[0], d[1], 0] });
      p.glow(hand[0], hand[1], hand[2], .2, LA, .9 * (1 - ra / .2));
    }
    // ---- the spear in flight ----
    const pierced = t >= REL ? pl.hits.filter(u => t >= pl.hitT[u.i]).length : 0, budget = 1 - .45 * pierced / Math.max(1, pierce);
    if (t >= REL && t < BT) {
      let tip, dir;
      if (t < STOP) {
        tip = P(tipS);
        const back = P(tipS - .35);
        dir = p.v3.norm([tip[0] - back[0], tip[1] - back[1], tip[2] - back[2]]);
      } else {
        // stopped: pinned bodies drag the point into the ground, the shaft tilts and quivers
        const k = p.easeInCubic(p.ph(t, STOP, STOP + .22)), end = P(pl.stopA), back = P(pl.stopA - .35);
        const d0 = p.v3.norm([end[0] - back[0], end[1] - back[1], end[2] - back[2]]);
        if (pl.exhausted) {
          tip = [end[0] + d[0] * .3 * k, end[1] + d[1] * .3 * k, p.lerp(end[2], .03, k)];
          const pt = p.lerp(Math.asin(p.clamp(d0[2], -1, 1)), -.55, k);
          dir = [d[0] * Math.cos(pt), d[1] * Math.cos(pt), Math.sin(pt)];
        } else { tip = end; dir = d0; }
        const q = t - STOP - .22;
        if (q > 0) {
          const w = .07 * Math.sin(q * 50) * Math.exp(-q * 6), w2 = .03 * Math.sin(q * 37 + 1) * Math.exp(-q * 6);
          dir = p.v3.norm([dir[0] - nr[0] * w / LEN, dir[1] - nr[1] * w / LEN, dir[2] - w2 / LEN]);
        }
      }
      const tail = [tip[0] - dir[0] * LEN, tip[1] - dir[1] * LEN, tip[2] - dir[2] * LEN];
      const flying = t < STOP;
      this.spear(p, tail, tip, dir, budget, flying ? 1.15 : 1);
      if (flying) {
        // trail sampled along the path behind the tail
        const tailS = tipS - LEN, s0 = Math.max(A0 - .2, tailS - 1.6);
        if (tailS > s0 + .05) {
          const pts = [];
          for (let k = 0; k <= 6; k++) pts.push(P(tailS - (tailS - s0) * k / 6));
          p.trail(pts, .08 * budget, .02, LA, .9, .1);
        }
        p.light(tip[0], tip[1], 0, 1.2, LA, .8);
      } else {
        p.light(tip[0], tip[1], 0, 1.0, LA, .6 * (1 - p.ph(t, BT - .2, BT)) + .3);
        if (t - STOP < .1) p.glow(tip[0], tip[1], tip[2] + .05, .4, LA, 1.1 * (1 - (t - STOP) / .1));
      }
    }
    // ---- pierce beats at every body ----
    const cf = p.cam().fwd;
    for (const u of pl.hits) {
      const a = t - pl.hitT[u.i];
      if (a < 0 || a > .3) continue;
      const st = crowd[u.i], ch = [u.x + d[0] * .05, u.y + d[1] * .05, ZC], k = a / .18;
      if (k < 1) p.ring(ch[0], ch[1], ch[2], .12 + .35 * p.easeOutExpo(k), .05 * (1 - k) + .02, LA, 1.3 * (1 - k), { axis: [d[0], d[1], 0] });
      if (a < .12) p.sparkle(ch[0] + cf[0] * .3, ch[1] + cf[1] * .3, ch[2] + cf[2] * .3 + .05, 4 * (1 - a / .12), GL, 1.4);
      if (a < .08) p.glow(ch[0] + cf[0] * .25, ch[1] + cf[1] * .25, ch[2] + cf[2] * .25, .18 * sc, GL, 1.1 * (1 - a / .08));
      const ns = Math.max(2, Math.round(4 * p.density));
      for (let j = 0; j < ns; j++) {
        const sp = p.rdir(u.i * 9 + j, 13, .3), v = [d[0] * 1.4 + sp[0] * .7, d[1] * 1.4 + sp[1] * .7, .3 + sp[2] * .6], r0 = p.drag(1, 9, a);
        const q = [ch[0] + v[0] * r0, ch[1] + v[1] * r0, Math.max(.03, ch[2] + v[2] * r0 - 2 * a * a)];
        p.line(q, [q[0] - v[0] * .08, q[1] - v[1] * .08, q[2] - v[2] * .08], .03, GL, 1.2 * (1 - a / .3), { w1: .01 });
      }
      if (st && a < .2) p.light(ch[0], ch[1], 0, .7, LA, .7 * (1 - a / .2));
      // first skewer: radial speed lines with the hit-stop
      if (u === pl.hits[0] && a < .12) p.speedLines(ch[0], ch[1], ch[2], { n: 14, R0: .45, R1: 1.6, ramp: LA, I: 1 - a / .12, seed: Math.floor(t * 30) });
    }
    // ---- burst into light shards ----
    const ba = t - BT;
    if (ba >= 0 && ba < .9) {
      const end = pl.exhausted ? [C[0] + d[0] * (pl.stopA + .3), C[1] + d[1] * (pl.stopA + .3), .03] : P(pl.stopA);
      const mid = [end[0] - d[0] * .45, end[1] - d[1] * .45, end[2] + .3];
      if (ba < .14) p.glow(mid[0] + cf[0] * .3, mid[1] + cf[1] * .3, mid[2] + cf[2] * .3, .6, LA, 1.4 * (1 - ba / .14));
      p.shock(end[0], end[1], .04, p.ph(ba, 0, .5), { R: .75, w: .12, ramp: LA });
      const N = Math.round(14 * p.density);
      for (let k = 0; k < N; k++) {
        const f = p.r(k, 41), o = [end[0] - d[0] * LEN * .8 * f, end[1] - d[1] * LEN * .8 * f, end[2] + LEN * .45 * f];
        const dv = p.rdir(k, 42, .55), vv = 1.6 + 1.4 * p.r(k, 43), r0 = p.drag(vv, 4.5, ba);
        const pos = [o[0] + dv[0] * r0, o[1] + dv[1] * r0, Math.max(.04, o[2] + dv[2] * r0 - 1.6 * ba * ba)];
        const life = 1 - p.ph(ba, .25 + .35 * p.r(k, 44), .9);
        if (life > 0) p.petal(pos[0], pos[1], pos[2], [dv[0], dv[1], dv[2] - ba], .14, k % 3 ? LA : GL, 1.2 * life);
      }
      if (ba < .4) p.light(end[0], end[1], 0, 1.6, LA, .9 * (1 - ba / .4));
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, 3.25, 3.7) });
  },
  // one spear of light from tail to tip: halo, core, diamond head, white-hot point. b = remaining budget (dims it)
  spear(p, tail, tip, dir, b, hot) {
    const LA = this.palette.lance, GL = this.palette.glint;
    p.line(tail, tip, .1 * b, LA, .35 * hot, { w1: .08 * b, i1: .6 * hot });
    p.line(tail, tip, .035, LA, .75 * hot * (.6 + .4 * b), { w1: .045, i1: 1.3 * hot });
    const hb = [tip[0] - dir[0] * .3, tip[1] - dir[1] * .3, tip[2] - dir[2] * .3], hm = [tip[0] - dir[0] * .18, tip[1] - dir[1] * .18, tip[2] - dir[2] * .18];
    p.line(hb, hm, .03, GL, 1.1 * hot, { w1: .1 * (.7 + .3 * b), i1: 1.3 * hot });
    p.line(hm, tip, .1 * (.7 + .3 * b), GL, 1.35 * hot, { w1: .01, i1: 1.6 * hot });
    p.glow(tip[0], tip[1], tip[2], .09 + .05 * b, GL, .8 * hot);
  },
});
