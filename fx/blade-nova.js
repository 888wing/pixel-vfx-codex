// 迴旋刃環 / Blade Nova — Scale Ladder pack (original design), tier 10: the caster spins on the spot and a ring of crescent wind blades expands from their feet, slicing a surrounding squad outwards
PXFX.define({
  id: 'blade-nova',
  loop: 4.5,
  beats: [{ t: 1.3, kind: 'cast', power: .9 }, { t: 1.57, kind: 'hit', power: 1.3 }, { t: 1.74, kind: 'pulse', power: .45 }],
  view: { r: 3.6, h: 2.8 },
  stage: { ground: 'dirt' },
  modules: ['figure', 'charge', 'slash', 'swarm', 'shockwave', 'crowd', 'troops', 'impact', 'aftermath', 'tally'],
  palette: {
    wind: ['#2a8a86', '#3cb4a8', '#6cdcc8', '#9ff0e0', '#d4fff4', '#ffffff'],
    edge: ['#5ec8b8', '#a8f4e4', '#e8fff8', '#ffffff'],
    leaf: ['#2e4a1e', '#4a7228', '#74a036', '#b0cc4a'],
    dust: ['#5a4a3a', '#7a6650', '#9a8468', '#b8a282'],
  },
  timeline: [
    { k: 'pose', t: [0, .8], zh: '起手：施法者（高 1.5）站在場中央 (0, 0)，十個敵兵（高約 0.9）在半徑 1.6 的圓陣上包圍他，全部面向圓心；0.35–0.8 秒施法者下蹲收手到腰側', en: 'pose: the caster (1.5 tall) stands in the middle of the field at (0, 0) with ten soldiers (~0.9 tall) surrounding him on a ring of radius 1.6, all facing the centre; at 0.35–0.8 s the caster crouches with both hands at the hips' },
    { k: 'charge', t: [.4, 1.3], zh: '集氣：14 道青白風線與 8 片樹葉由半徑 2.2 螺旋收進腳下，地上亮起一圈半徑 = radius（2.6）的虛線預告圈並慢慢轉動；0.8 秒起施法者張開雙臂原地旋轉，角速度按二次曲線加速，身邊三層弧形速度線', en: 'charge: 14 teal-white wind streaks and 8 leaves spiral in from radius 2.2 to the feet while a dashed warning circle of radius = radius (2.6) lights up on the ground and slowly turns; from 0.8 s the caster spreads both arms and spins on the spot, angular speed rising quadratically, with three layers of curved speed lines around the body' },
    { k: 'shape', t: [1.3, 1.4], zh: '成形：1.3 秒轉速到頂（約每秒 7 圈），腳下爆出一圈塵土衝擊環，blades（6）把青白彎月風刃（半徑 0.65、厚 0.2、弧長 2.1 弧度）由腳下水平甩出，刃口朝旋轉方向', en: 'shape: at 1.3 s the spin peaks (~7 turns per second), a dust shock ring bursts at the feet and `blades` (6) teal-white crescent wind blades (radius 0.65, 0.2 thick, 2.1 rad arc) are flung out horizontally from the feet, edges leading in the spin direction' },
    { k: 'motion', t: [1.3, 1.75], zh: '推進：刃環以每秒 6 單位等速擴張，風刃一邊公轉一邊由腳邊升到腰高 0.45，刃環外沿有一條細光圈與一圈地面塵土；判定：與施法者距離 ≤ radius（2.6）的敵兵中刃；命中時間 = 1.3 + 距離 ÷ 6 秒 + 0–0.025 秒隨機；刃環到 radius 即停下，風刃在 0.25 秒內溶解', en: 'motion: the ring expands at a constant 6 units/s while the blades orbit and rise from the feet to waist height 0.45, with a thin ring of light and a ring of ground dust at its edge; area test: hit if the distance from the caster ≤ radius (2.6); hit time = 1.3 + distance / 6 s + 0–0.025 s random; the ring stops at radius and the blades dissolve within 0.25 s' },
    { k: 'impact', t: [1.57, 2.4], zh: '命中：第一個敵兵中刃時頓幀＋震屏；每個中刃者身上閃一道白色斜斬光（0.18 秒）與白閃，被向外拋飛：四成被捲上半空轉兩圈（高 1–1.9），其餘拋物線翻滾後滑行躺下，身體同時被風扭轉；半徑以外的敵兵只被風吹得後仰', en: 'impact: hit-stop and shake when the first soldier is cut; each cut soldier gets a white diagonal slash flash (0.18 s) and a white flash and is thrown outwards: 40% are swept up into the air with two spins (1–1.9 high), the rest tumble on a parabola, slide and lie down, all twisted round by the wind; soldiers beyond the radius only lean back in the gust' },
    { k: 'after', t: [1.9, 4.5], zh: '餘波：施法者在 2.1 秒剛好轉完三圈回到原本朝向，2.5 秒回到站姿；地上留下一片放射狀風痕，外緣一圈深色刮痕正是 radius；樹葉打轉飄落，3.3 秒前全部淡出；屍體淡出、擊殺計數淡出，新一批敵兵由圓陣外沿徑向走回原位', en: 'aftermath: the caster finishes exactly three turns at 2.1 s back at the original facing and is idle by 2.5 s; a radial wind-swept mark stays on the ground with a dark scuffed rim exactly at radius; leaves twirl down and everything fades by 3.3 s; the bodies and the kill counter fade, and a fresh squad walks radially back in from outside the ring' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→下蹲→張臂旋轉→待機；旋轉角 = 角速度積分（0.8–1.3 秒二次加速、1.3–2.1 秒二次減速，總共三圈）', en: 'caster: faceless mannequin, poses idle → crouch → arms-spread spin → idle; the spin angle integrates the angular speed (quadratic ramp-up 0.8–1.3 s, quadratic ramp-down 1.3–2.1 s, three turns in total)' },
    { zh: '敵陣：5–20 個 3D 小兵（自動縮放，上限 1.5 倍），紅盔配色，以施法者為中心排陣（預設圓陣，半徑 1.6），中心留空 0.7；擊殺計數「已擊殺／總數」，全滅時轉金色', en: 'formation: 5–20 3D soldiers (auto scale, capped at 1.5×) with red helmets, laid out around the caster (default ring of radius 1.6) with a clear radius of 0.7 at the centre; the kill counter "killed / total" turns gold on a full wipe' },
    { zh: '判定與倖存：圓形範圍，圓心 = 施法者，半徑 = radius；刃環、地面光圈和最後留下的刮痕圈都畫在同一個半徑上；圈外的敵兵保持站立，只在風到達時後仰', en: 'area test and survivors: a circle centred on the caster with radius = radius; the blade ring, the ground ring of light and the scuffed rim it leaves are all drawn at that same radius; soldiers outside stay standing and only lean back when the gust reaches them' },
    { zh: '風刃：kit 彎月模組，整片發光（無實心主體），青白漸層，刃口最亮，後方 3 條短速度線；每片沿圓周均分，公轉角速度隨施法者旋轉衰減', en: 'wind blades: the kit crescent module, fully emissive (no solid body), teal to white with the brightest edge and 3 short motion streaks behind; spaced evenly round the circle, orbiting with the caster’s decaying spin' },
    { zh: '風與塵：放射線風痕、刃環外沿 12 團抖色塵土、8 片樹葉（小三角實心面）先螺旋收入再被甩出翻滾飄落', en: 'wind and dust: radial wind marks, 12 dithered dust puffs riding the ring edge, 8 leaves (small solid triangles) that spiral in, are flung out, tumble and drift down' },
    { zh: '中刃特寫：每具身體白閃 0.07 秒，胸前一道 0.7 長的白色斬光沿切線方向劃過並在 0.18 秒內變細消失', en: 'cut beats: each body flashes white for 0.07 s and a 0.7-long white slash flash crosses its chest along the tangent, thinning out within 0.18 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 5, max: 20, step: 1, value: 10 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 4, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    radius: { zh: '刃環半徑', en: 'nova radius', min: 1.2, max: 3.2, step: .1, value: 2.6 },
    blades: { zh: '風刃數量', en: 'blade count', min: 3, max: 12, step: 1, value: 6 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  // faceTo sits a hair off the centre: exactly on it the layout frame degenerates (kit issue)
  AREA: { x: 0, y: 0, rx: 1.6, ry: 1.6 },
  REL: 1.3, VR: 6, W: 6 * Math.PI / (1.3 / 3),
  // caster spin angle: quadratic ramp-up .8 -> REL, quadratic ramp-down REL -> 2.1; three whole turns
  spin(t) {
    const W = this.W, R = this.REL;
    if (t <= .8) return 0;
    if (t < R) return W * Math.pow(t - .8, 3) / (3 * .25);
    const k = Math.min(1, (t - R) / .8);
    return W * .5 / 3 + W * .8 / 3 * (1 - Math.pow(1 - k, 3));
  },
  omega(t) { const R = this.REL; return t <= .8 || t >= 2.1 ? 0 : t < R ? Math.pow((t - .8) / .5, 2) : Math.pow(1 - (t - R) / .8, 2); },
  draw(p, t) {
    const PL = this.palette, WD = PL.wind, ED = PL.edge, REL = this.REL, VR = this.VR;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id, RAD = p.param('radius'), NB = Math.round(p.param('blades'));
    const TS = REL + RAD / VR, rr = t < REL ? 0 : Math.min(RAD, (t - REL) * VR), dist = u => Math.hypot(u.x, u.y);
    const hitT = u => (dist(u) <= RAD ? REL + dist(u) / VR + u.r1 * .025 : null);
    // ---- caster: crouch, spread the arms and spin on the spot ----
    let pose;
    if (t < .35) pose = 'idle';
    else if (t < .8) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .35, .8)) };
    else if (t < 1.9) pose = { a: 'charge', b: 'spread', k: p.easeOutBack(p.ph(t, .8, 1.2), 1.2) };
    else pose = { a: 'spread', b: 'idle', k: p.easeOutCubic(p.ph(t, 1.9, 2.5)) };
    const th = this.spin(t), om = this.omega(t);
    const fig = p.figure(0, 0, { pose, face: th, lift: .12 * Math.sin(Math.PI * p.ph(t, REL - .08, REL + .3)) });
    // ---- the squad around the caster ----
    const react = (s, a, u, pp, o) => {
      if (u.r2 < .4) PXFX.REACT.launch(s, a, u, pp, o); else PXFX.REACT.knock(s, a, u, pp, o);
      s.face = u.face + (u.r1 > .5 ? 1 : -1) * (4 + 4 * u.r3) * pp.easeOutCubic(Math.min(1, a / .9));
    };
    const pre = .3 * p.ph(t, .8, 1.25);
    const co = { n, seed: 5, formation: form, area: this.AREA, faceTo: [-1e-3, 0], hole: .7 };
    const crowd = p.crowd(Object.assign({
      t, scale: 'auto', maxScale: 1.5, pal: 'red', ramp: ED,
      hit: hitT, react, at: [0, 0, 0], power: u => .75 + .4 * u.r3,
      fear: u => Math.max(pre * (.5 + .5 * u.r3), p.env(t, TS + (dist(u) - RAD) / VR - .05, TS + (dist(u) - RAD) / VR + .06, TS + .35, TS + .9) * .9),
      clear: [3.1, 3.65],
    }, co));
    const sc = crowd.scale, ZB = .1 + .25 * sc;
    // fresh squad walking radially back in from outside the ring (the kit walks everyone in from one side)
    const R0 = 3.5, R1 = 4.35, len = (R1 - R0) * .55, edge = this.view.r * .92 * .9, pawn = crowd.lod === 'sprite' ? p.pawnSprite : p.pawn, pal = PXFX.PAWN_PALS.red;
    for (const st of crowd) {
      const u = st.u;
      if (st.hitT == null) continue;
      const s0 = R0 + u.r1 * (R1 - R0 - len);
      if (t < s0) continue;
      const k = p.easeOut((t - s0) / len), r = Math.hypot(u.x, u.y) || 1, D = p.clamp(edge - r, .3, 1.2) * (.85 + .15 * u.r2);
      const s = { i: u.i, x: u.x + u.x / r * D * (1 - k), y: u.y + u.y / r * D * (1 - k), z: 0, tilt: 0, tdir: [1, 0], sq: 1, wide: 1, face: u.face, alpha: p.ph(k, 0, .4), walk: k < 1 ? t * 11 + u.r1 * p.TAU : null, spear: true };
      pawn.call(p, s, { scale: sc, pal });
    }
    // ---- ground: radial wind marks inside the radius, a dark scuffed rim exactly at it (solids pass) ----
    const mark = t > REL ? 1 - p.ph(t, 2.7, 3.3) : 0;
    if (mark > 0 && rr > .3) {
      p.stain(0, 0, rr + .05, (dx, dy, rho, ang) => {
        if (rho < .35) return 0;
        const rim = t >= TS && rho > RAD - .1 ? .85 : 0, streak = p.noise(ang * 9, rho * .5) > .7 ? .32 : 0;
        return Math.max(rim, streak);
      }, '#4a382a', mark);
    }
    // ---- leaves: spiral in during the charge, flung out with the ring, tumble down (solids) ----
    const NL = Math.round(8 * p.density);
    for (let k = 0; k < NL; k++) {
      const a0 = p.r(k, 11) * p.TAU, l = p.ph(t, .4 + .2 * p.r(k, 12), 1.3);
      let x, y, z, life = 1;
      if (t < REL) {
        if (l <= 0) continue;
        const r = 2.2 * (1 - p.easeInCubic(l)) + .35, a = a0 + 3 * l;
        x = Math.cos(a) * r; y = Math.sin(a) * r; z = .1 + .7 * l;
      } else {
        const a = t - REL, out = Math.min(RAD + .4, .35 + p.drag(RAD * 2.4 * (.8 + .3 * p.r(k, 13)), 3.2, a)), ang = a0 + 3 + 2.2 * p.drag(1, 2.5, a);
        x = Math.cos(ang) * out; y = Math.sin(ang) * out;
        z = Math.max(.03, .8 + 1.6 * p.drag(1, 3, a) * (.5 + p.r(k, 14)) - .55 * a * a);
        life = 1 - p.ph(t, 2.7 + .3 * p.r(k, 15), 3.2);
      }
      if (life <= 0) continue;
      const sp = t * (7 + 5 * p.r(k, 16)) + k, ca = [Math.cos(sp) * .07, Math.sin(sp) * .07, Math.sin(sp * 1.3) * .05], cb = [-Math.sin(sp) * .035, Math.cos(sp) * .035, .03];
      p.tri([x + ca[0], y + ca[1], z + ca[2]], [x - ca[0] + cb[0], y - ca[1] + cb[1], z - ca[2] + cb[2]], [x - ca[0] - cb[0], y - ca[1] - cb[1], z - ca[2] - cb[2]], PL.leaf, { alpha: life > .99 ? 1 : life });
    }
    // dust riding the ring edge, then settling at the radius
    const ND = Math.round(12 * p.density);
    if (t > REL && t < TS + 1) {
      const a = t - REL, fade = t < TS ? 1 : 1 - p.ph(t, TS, TS + 1);
      for (let k = 0; k < ND; k++) {
        const ang = k / ND * p.TAU + p.r(k, 21) * .4 + th * .1, rad = rr * (.9 + .1 * p.r(k, 22));
        if (rad < .3) continue;
        p.ball(Math.cos(ang) * rad, Math.sin(ang) * rad, .05 + .18 * p.ph(a, 0, 1) + p.r(k, 23) * .06, .07 + .06 * p.r(k, 24) + .06 * p.ph(a, 0, .8), PL.dust, { alpha: .8 * fade, rough: .5, shadow: false, seed: k });
      }
    }
    // ---- light ----
    // warning circle: dashed, exactly at the radius
    const warn = p.env(t, .45, .8, REL, REL + .3);
    if (warn > 0) {
      p.ring(0, 0, .02, RAD, .045, WD, .85 * warn, { fn: (ang) => (((ang + t * .8) / p.TAU * 24) % 1 + 1) % 1 < .55 ? 1 : 0 });
    }
    // wind gathering: streaks spiralling into the feet
    if (t > .4 && t < REL + .05) {
      const NS = Math.round(14 * p.density), fade = t < REL ? 1 : 1 - (t - REL) / .05;
      for (let k = 0; k < NS; k++) {
        const b = .4 + .55 * p.r(k, 31), l = p.ph(t, b, b + .35);
        if (l <= 0 || l >= 1) continue;
        const a0 = p.r(k, 32) * p.TAU + 2.6 * l, r0 = 2.2 * (1 - p.easeInCubic(l)) + .2, z0 = .08 + .9 * p.r(k, 33) * (1 - l);
        const a1 = a0 - .35, r1 = r0 + .25;
        p.line([Math.cos(a0) * r0, Math.sin(a0) * r0, z0], [Math.cos(a1) * r1, Math.sin(a1) * r1, z0 + .03], .045, WD, (.5 + .6 * l) * fade, { w1: .01, i1: .15 });
      }
    }
    // spin speed lines: curved arcs round the body at three heights
    if (om > .05) {
      for (let h = 0; h < 3; h++) {
        const z = .35 + .45 * h, r = .42 + .08 * h + .1 * om, a0 = -th * 1.0 + h * 1.7;
        for (let j = 0; j < 2; j++) {
          const s0 = a0 + j * Math.PI;
          p.ring(0, 0, z, r, .035, WD, .9 * om, { a0: s0, a1: s0 + 1.1 + .6 * om, fn: (a, u) => u });
        }
      }
      p.light(0, 0, 0, 1.2, WD, .4 * om);
    }
    // release: dust shock at the feet
    const ra = t - REL;
    if (ra >= 0 && ra < .6) {
      p.shock(0, 0, .05, p.ph(ra, 0, .5), { R: 1.0, w: .12, ramp: WD, dust: PL.dust, dustN: 10 });
      if (ra < .1) p.glow(0, 0, .35, .55, ED, 1.2 * (1 - ra / .1));
    }
    // the blade ring
    if (t >= REL && t < TS + .28) {
      const life = t < TS ? 0 : p.ph(t, TS, TS + .25), rise = p.easeOutCubic(p.clamp(rr / 1.1, 0, 1)), z = .08 + (ZB - .08) * rise;
      const orbit = th * .55, Rb = .35 + .3 * rise;
      for (let k = 0; k < NB; k++) {
        const ang = k / NB * p.TAU + orbit, ca = Math.cos(ang), sa = Math.sin(ang), r = Math.max(.2, rr);
        const dir = p.v3.norm([-sa * .8 + ca * .6, ca * .8 + sa * .6, 0]);
        const c = [ca * r - dir[0] * Rb, sa * r - dir[1] * Rb, z];
        p.crescent({ c, dir, R: Rb, thick: .2 * (.6 + .4 * rise), arc: 2.1, body: null, edge: WD, I: 1.35, u: life, streaks: life < .3 ? 3 : 0, streakLen: .35, seed: k, segs: 14 });
      }
      // thin ring of light at the exact radius, a brighter ground band under it
      const I = 1 - life;
      p.ring(0, 0, z, Math.max(.2, rr), .04, ED, .7 * I);
      p.ring(0, 0, .02, Math.max(.2, rr), .06, WD, .8 * I);
      p.light(0, 0, 0, rr + .4, WD, .3 * I);
    }
    // the boundary glows a moment after the ring stops
    if (t >= TS && t < TS + .7) p.ring(0, 0, .02, RAD, .05, WD, .7 * (1 - p.ph(t, TS, TS + .7)));
    // ---- slice flashes at every cut body ----
    const cf = p.cam().fwd;
    for (const st of crowd) {
      if (st.hitT == null) continue;
      const a = t - st.hitT;
      if (a < 0 || a > .18) continue;
      const u = st.u, r = Math.hypot(u.x, u.y) || 1, tg = [-u.y / r, u.x / r, 0], c = [u.x + cf[0] * .3, u.y + cf[1] * .3, ZB + .08 + cf[2] * .3], L = .35 * sc / 1.5 + .12, tl = (u.r2 - .5) * .9;
      p.slash([c[0] - tg[0] * L, c[1] - tg[1] * L, c[2] - L * tl], [c[0] + tg[0] * L, c[1] + tg[1] * L, c[2] + L * tl], { u: a / .18, w: .08, ramp: ED, I: 1.5, glow: a < .06 ? .25 : 0 });
    }
    if (p.param('tally')) p.tally(crowd, { t, alpha: 1 - p.ph(t, 3.1, 3.55) });
  },
});
