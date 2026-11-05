// 天眼石化 / Petrifying Eye — Scale Ladder pack (original design), tier 1000: storm clouds part over a legion, a giant gold eye opens, its spreading gaze turns the army to stone and one blink crumbles every statue
PXFX.define({
  id: 'petrify-eye',
  loop: 5.5,
  beats: [{ t: 1.25, kind: 'cast', power: .7 }, { t: 1.55, kind: 'pulse', power: .5 }, { t: 3.42, kind: 'hit', power: 1.4 }],
  view: { r: 5.5, h: 3.6 },
  stage: { ground: 'grass' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'troops', 'tally', 'shockwave', 'impact', 'debris'],
  palette: {
    gaze: ['#8a5a1c', '#c08a2a', '#f0d060', '#fff0a8', '#fffbe8'],
    iris: ['#9a5418', '#d88a26', '#f6c848', '#fff0a0', '#ffffff'],
    rift: ['#4e4266', '#76668e', '#a898b8', '#d8ccd4', '#fff4e4'],
    lid: ['#100c18', '#1c1626', '#2a2236', '#3a3048'],
    dust: ['#4a4450', '#6a6472', '#8e8996', '#b0abb6'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者（縮放 0.85，站在 x = −4.3）由待機舉起右手指向天空（0.4 秒回彈緩動）；千人大軍（預設 1000 人方陣，中心 (1.0, 0)、半深 2.8、半寬 2.6）在場中列陣，每個士兵是 3–5 像素高的像素小兵', en: 'pose: the caster (scale 0.85, at x = −4.3) raises the right hand to the sky (0.4 s overshoot ease); a legion of 1000 (block by default, centre (1.0, 0), half depth 2.8, half width 2.6) stands on the field as 3–5 px pixel soldiers' },
    { k: 'charge', t: [.15, 1.25], zh: '集氣：天空由巨眼位置向外以抖色圓形擦除換成厚重的灰紫雲層（0.75 秒），地面壓暗成灰紫；14 粒金光點匯聚到舉起的手；0.6–1.1 秒大軍正上方的雲層裂開一道透鏡形的亮縫（寬約 14 單位），縫中是一隻閉著的巨眼（寬 8.4 單位，比整支大軍還大，上緣伸出畫面）', en: 'charge: the sky wipes out from the eye into heavy grey-violet clouds (0.75 s, dithered radial wipe) and the ground darkens to grey-violet; 14 gold motes stream into the raised hand; at 0.6–1.1 s the clouds above the army split into a lens-shaped bright rift (~14 units wide) holding a closed giant eye (8.4 units wide, bigger than the whole army, its top leaving the frame)' },
    { k: 'shape', t: [1.0, 1.55], zh: '成形：1.0–1.3 秒上下眼瞼（深紫實心、外緣 1 像素金紫光邊）以回彈緩動滑開，露出淡紫眼白與發光金色虹膜（直條狀瞳孔、外圈亮邊、一點高光）；虹膜偏下，眼睛向下望；1.25 秒眼睛一亮，一道淡金色光錐由瞳孔垂直照到大軍中心 (1.0, 0)', en: 'shape: at 1.0–1.3 s the lids (dark violet solids with a 1 px gold-violet rim) slide apart with an overshoot, revealing a pale violet eyeball and a glowing gold iris (vertical slit pupil, bright rim, one catch light) set low so the eye looks down; at 1.25 s it flares and a pale gold cone of light drops from the pupil onto the army centre (1.0, 0)' },
    { k: 'motion', t: [1.55, 3.36], zh: '推進：凝視落地成一圈淡金光池，半徑 G(t) = 3.6 × 擴散速度 × (t − 1.55)^0.75 先快後慢擴大，到「凝視半徑」（預設 4.2）停下；光池前緣是一條發亮光帶並有光點上升。判定：與凝視中心 (1.0, 0) 的距離 d ≤ 凝視半徑，且光池在眨眼前到達（G(3.42) ≥ d）即中招；命中時間 = 1.55 + (d ÷ (3.6 × 擴散速度))^(4/3) 秒（預設約 1.2 秒掃完整支大軍）。中招士兵閃白 1 格後變成灰色石像，石化像波浪一樣由中心向外推；半徑以外的士兵向後縮、發抖但不受影響', en: 'motion: the gaze lands as a pool of pale gold light whose radius G(t) = 3.6 × speed × (t − 1.55)^0.75 grows fast then slows until it reaches the gaze radius (default 4.2); its front is a bright band with rising motes. Area test: hit if the distance d to the gaze centre (1.0, 0) ≤ radius and the pool gets there before the blink (G(3.42) ≥ d); hit time = 1.55 + (d / (3.6 × speed))^(4/3) s (about 1.2 s across the army at the default). Hit soldiers flash white for one frame and turn into grey stone statues, a wave rolling outwards from the centre; soldiers beyond the radius lean back and tremble but stay unharmed' },
    { k: 'impact', t: [3.36, 3.7], zh: '命中：3.36 秒眼瞼在 0.06 秒內合上（眨眼），3.42 秒 1 格灰紫／米白兩色衝擊格＋頓幀，所有石像同時崩裂（按距離最多延遲 0.08 秒）：每個石像噴出 3 粒石屑，原地留下一小堆碎石；約 48 團灰色塵土升起，地面一圈淡紫色衝擊環', en: 'impact: at 3.36 s the lids snap shut in 0.06 s (the blink); at 3.42 s one two-tone grey-violet / off-white impact frame and a hit-stop, and every statue crumbles at once (up to 0.08 s later by distance): each statue spits 3 stone chips and leaves a small rubble heap; about 48 grey dust puffs rise and a pale violet shock ring runs over the ground' },
    { k: 'after', t: [3.7, 5.5], zh: '餘波：塵土上升變淡，光池在 0.3 秒內熄滅；3.7–4.2 秒巨眼沉回雲中、雲縫合上，4.0–4.8 秒天空與地面以抖色淡回原色；碎石堆在 3.95–4.6 秒淡出，擊殺計數在 4.2–4.6 秒淡出，4.45–5.3 秒新一批士兵原地淡入，施法者放下手回到待機', en: 'aftermath: the dust rises and thins, the pool dies out in 0.3 s; at 3.7–4.2 s the eye sinks back into the clouds and the rift closes, at 4.0–4.8 s the sky and ground dither back; the rubble fades at 3.95–4.6 s, the kill counter fades at 4.2–4.6 s, a fresh army fades in on its spots at 4.45–5.3 s and the caster lowers the hand to idle' },
  ],
  layers: [
    { zh: '大軍：敵兵數量 500–2000（預設 1000），按陣型（預設方陣）排在中心 (1.0, 0)、半深 2.8、半寬 2.6 的範圍內；士兵大小按兵距自動縮放，遠景細節級別自動換成 3–5 像素的像素小兵（紅頭盔、暗色身體、偶有矛尖反光）；左上角擊殺計數 HUD 即時顯示「已擊殺／總數」，全滅時變金色', en: 'army: 500–2000 soldiers (default 1000) in a formation (default block) inside centre (1.0, 0), half depth 2.8, half width 2.6; soldier size follows the spacing and the far LOD swaps to 3–5 px pixel soldiers (red helmets, dark bodies, the odd spear glint); a kill counter HUD in the top-left shows killed / total live and turns gold on a full wipe' },
    { zh: '判定與倖存者：圓形範圍，圓心固定在大軍中心 (1.0, 0) 的巨眼正下方；距離 ≤ 凝視半徑（1.5–5，預設 4.2）且光池在眨眼前到達才中招，命中時間 = 光池前緣到達的時間；畫出來的光池半徑就是判定半徑。擴散速度太慢時光池在眨眼前未到邊緣，外圈士兵倖存；倖存者只會發抖，整個循環都站著', en: 'area test and survivors: a circle centred under the eye at the army centre (1.0, 0); hit if the distance ≤ gaze radius (1.5–5, default 4.2) and the pool reaches the unit before the blink; hit time = when the pool front gets there; the drawn pool radius is the test radius. With a slow spread the pool does not reach the edge before the blink and the outer ranks survive; survivors only tremble and stay standing through the loop' },
    { zh: '天空：領域模組換成灰紫雲層（雲塊為噪聲色塊），地面重新映射成灰紫色；巨眼後方是一道透鏡形的淡紫亮雲縫，邊緣按噪聲參差並較亮', en: 'sky: the domain module swaps the page for grey-violet clouds (noise cloud blobs) and remaps the ground to grey-violet; behind the eye a lens-shaped pale violet rift with ragged, brighter noise edges' },
    { zh: '巨眼：面向鏡頭的實心精靈畫上下眼瞼（杏仁形，上瞼較厚，中間一條暗摺痕），兩片眼瞼的內緣按開眼程度滑開；後方一張發光卡片畫淡紫眼白、金色虹膜（13 條放射紋、外圈亮邊、高光一點），瞳孔是一條直的實心暗縫，帶深度偏移放在光的前面', en: 'eye: a camera-facing solid sprite draws the almond lids (thicker upper lid with a dark crease) whose inner edges slide apart with the opening; a light card behind draws the pale violet eyeball and the gold iris (13 radial fibres, bright rim, one catch light); the pupil is a solid vertical slit with a depth bias in front of the light' },
    { zh: '凝視光池：地面先用淡金色染色填滿半徑 G 的圓，再疊一條寬 0.28 的發光前緣帶與向內移動的細波紋，地面受光；由瞳孔到光池邊緣 12 條淡金細光線組成光錐，光錐內有光點緩緩落下', en: 'gaze pool: the ground is first tinted pale gold over the disc of radius G, then a glowing front band 0.28 wide and thin inward ripples are added, with ground light; 12 faint gold lines from the pupil to the pool edge form a cone with motes drifting down inside it' },
    { zh: '石化與崩裂：中招士兵用內建冰封反應配石頭材質（灰色石像）；眨眼時每個石像碎成 3 粒石屑，落地後換成一小堆碎石；另有約 30 塊低多邊形碎石與 48 團塵土共用於整片範圍，不做每個單位的發光，保持千人時的效能', en: 'stone and crumble: hit soldiers use the built-in freeze reaction with the stone material (grey statues); on the blink each statue breaks into 3 chips that land and turn into a small rubble heap; about 30 low-poly rocks and 48 dust puffs are shared over the whole area, with no per-unit light so a thousand units stay fast' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    radius: { zh: '凝視半徑', en: 'gaze radius', min: 1.5, max: 5, step: .1, value: 4.2 },
    speed: { zh: '擴散速度', en: 'spread speed', min: .5, max: 2, step: .1, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  C: [1.0, 0],
  SKY: { top: '#1a1624', bottom: '#433d54', nebula: '#57506a', stars: 0 },
  GROUND: ['#2a2732', '#363340', '#45414f', '#55505f'],
  T0: 1.55, BLINK: 3.42, V: 3.6,
  // eye centre in the sky above the army: each camera frames the sky differently, keep the lids near the top edge
  eyeAt(p) {
    const z = p.mode === '2d' ? 5.9 : p.mode === '3d' ? 6.3 : 6.5;
    return [this.C[0] + .4, this.C[1], z];
  },
  // almond eye in eye-local units: x across (-1..1), y up (same units). o = opening 0..1
  // almond profile .27 * (1 - x^2)^0.8, tabulated once (the eye cards evaluate it for every pixel)
  ATAB: (() => { const a = new Float32Array(1025); for (let i = 0; i <= 1024; i++) { const x = i / 512 - 1; a[i] = .27 * Math.pow(Math.max(0, 1 - x * x), .8); } return a; })(),
  eyeGeo(o) {
    const T = this.ATAB, A = x => (x <= -1 || x >= 1 ? 0 : T[((x + 1) * 512) | 0]);
    return {
      A, YI: -.06, RI: .21,
      up: x => A(x) * (1.1 * o - .1), lo: x => -A(x) * (.95 * o - .05),
      Lu: x => A(x) * 1.5 + .05 * (1 - x * x), Ll: x => -(A(x) * 1.25 + .04 * (1 - x * x)),
    };
  },
  // lids + slit pupil: one camera-facing solid sprite, biased towards the camera so the eye light stays behind it
  eyeSolid(p, E, W, o, alpha, pupil) {
    const g = this.eyeGeo(o), k = .5;
    p.scard(E[0], E[1], E[2], W, W * k, (u, v) => {
      const x = u, y = v * k, up = g.up(x), lo = g.lo(x), Lu = g.Lu(x), Ll = g.Ll(x);
      if (y >= up && y <= Lu) {
        const s = (y - up) / (Lu - up + 1e-4);
        return Math.abs(s - .55) < .07 ? .02 : .62 - .5 * s;
      }
      if (y <= lo && y >= Ll) return .5 - .4 * (lo - y) / (lo - Ll + 1e-4);
      if (y < up && y > lo) {
        const dy = y - g.YI, q = 1 - dy * dy / (g.RI * g.RI * .9);
        if (q > 0 && Math.abs(x) < pupil * Math.sqrt(q)) return .05;
      }
      return -1;
    }, this.palette.lid, { dz: .45, alpha });
  },
  // eye light: rims, pale eyeball, gold iris with fibres and a catch light
  eyeLight(p, E, W, o, I, t) {
    const g = this.eyeGeo(o), k = .5, PL = this.palette;
    p.card(E[0], E[1], E[2], W, W * k, (u, v) => {
      const x = u, y = v * k, du = y - g.Lu(x), dl = g.Ll(x) - y;
      let val = 0;
      if (du > 0 && du < .035) val = .62 * (1 - du / .035);
      if (dl > 0 && dl < .03) val = Math.max(val, .5 * (1 - dl / .03));
      if (y < g.up(x) && y > g.lo(x)) {
        const r = Math.hypot(x, y - g.YI);
        val = Math.max(val, .48 + .16 * Math.max(0, 1 - (r - g.RI) / .3));
      }
      return val;
    }, PL.rift, I);
    p.card(E[0], E[1], E[2], W, W * k, (u, v) => {
      const x = u, y = v * k, up = g.up(x), lo = g.lo(x);
      if (!(y < up && y > lo)) return 0;
      let val = 0;
      const dy = y - g.YI, r = Math.hypot(x, dy);
      if (r < g.RI) {
        const ang = Math.atan2(dy, x);
        val = r > g.RI * .86 ? 1.05 : .36 + .24 * (r / g.RI) + (Math.sin(ang * 13 + t * 1.5) > .55 ? .12 : 0);
        if ((x + .065) * (x + .065) + (dy - .07) * (dy - .07) < .0011) val = 1.3;
      }
      if (up - y < .022 || y - lo < .018) val = Math.max(val, .9);
      return val;
    }, PL.iris, I);
  },
  draw(p, t) {
    const PL = this.palette, C = this.C, T0 = this.T0, BLINK = this.BLINK, V = this.V;
    const R = p.param('radius'), sp = p.param('speed'), n = Math.round(p.param('crowd'));
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    // gaze reach: grows fast then slows, stops at the radius or at the blink
    const reach = tt => (tt <= T0 ? 0 : V * sp * Math.pow(tt - T0, .75));
    const Rcap = Math.min(R, reach(BLINK));
    const G = Math.min(Rcap, reach(t));
    const dist = u => Math.hypot(u.x - C[0], u.y - C[1]);
    const hitAt = d => (d <= Rcap ? T0 + Math.pow(d / (V * sp), 4 / 3) : null);
    const E = this.eyeAt(p), W = 8.4;
    // ---- eye opening, rift, sky ----
    let o;
    if (t < 1.0) o = 0;
    else if (t < 1.3) o = p.easeOutBack(p.ph(t, 1.0, 1.3), 1.6);
    else if (t < 3.36) o = 1 - .12 * p.env(t, 2.9, 3.1, 3.3, 3.36);
    else o = 1 - p.easeInCubic(p.ph(t, 3.36, BLINK));
    if (t >= BLINK) o = 0;
    const rift = p.easeOutCubic(p.ph(t, .6, 1.1)) * (1 - p.easeInCubic(p.ph(t, 3.7, 4.2)));
    const eyeA = p.ph(t, .62, .95) * (1 - p.ph(t, 3.75, 4.15));
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .15, .9)) : 1 - p.ph(t, 4.0, 4.8);
    // ---- caster ----
    let pose;
    if (t < .15) pose = 'idle';
    else if (t < .55) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .15, .55), 1.3) };
    else if (t < 3.3) pose = 'raise';
    else if (t < 4.0) pose = { a: 'raise', b: 'palm', k: p.easeInCubic(p.ph(t, 3.3, BLINK)) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.0, 4.7)) };
    const fig = p.figure(-4.3, 0, { pose, scale: .85 });
    // ---- the army: stone wave, then rubble on the blink ----
    const st = p.crowd({
      n, seed: 11, formation: form, area: this.AREA, scale: 'auto', t, pal: 'red',
      at: [C[0], C[1], 0],
      hit: u => hitAt(dist(u)),
      react: (s, a, u, pp, oo) => {
        PXFX.REACT.freeze(s, a, u, pp, oo);
        if (s.shards != null && s.shards > .45) { s.shards = null; s.ash = 1; }
      },
      freezeMat: 'stone',
      shatter: u => BLINK + .08 * Math.min(1, dist(u) / 5),
      fear: u => {
        const th = hitAt(dist(u));
        if (th == null) return p.env(t, 1.7, 2.3, 3.7, 4.3) * (.45 + .4 * u.r3);
        return p.ph(t, th - .55, th - .05) * (.5 + .4 * u.r3);
      },
      respawn: [4.45, 5.3], clear: [3.95, 4.6], enter: 'fade',
    });
    // shared rubble: low-poly rocks thrown from a few statues on the blink
    const a = t - BLINK;
    const hitList = this.hitList(st, Rcap);
    if (a >= 0 && a < 1.25 && hitList.length) {
      const nR = Math.round(30 * p.density), fade = 1 - p.ph(t, 3.95, 4.6);
      for (let k = 0; k < nR; k++) {
        const s = hitList[Math.floor(p.r(k, 41) * hitList.length)], dir = p.rdir(k, 42, .9), v0 = 1 + 1.2 * p.r(k, 43);
        const vz = 1.4 + 1.6 * p.r(k, 44), T = 2 * vz / 9.8, tt = Math.min(a, T);
        const x = s.u.x + dir[0] * v0 * tt * .45, y = s.u.y + dir[1] * v0 * tt * .45, z = Math.max(.05, .2 + vz * tt - 4.9 * tt * tt);
        if (fade > .3) p.rock(x, y, z, .05 + .05 * p.r(k, 45), PL.dust, k, { shadow: a < T });
      }
    }
    // ---- world: grey-violet clouds ----
    if (skyK > .01) p.domain({ amt: skyK, c: t < 2 ? E : C.concat(0), sky: this.SKY, ground: this.GROUND, solids: .12, t, fade: t > 2 });
    // eye lids + pupil (solids, after the sky so they keep their own dark violet)
    if (eyeA > 0) this.eyeSolid(p, E, W, o, eyeA, .045 - .015 * p.ph(t, 1.5, 2.2));
    // ---- the gaze pool on the ground (tint first, light after) ----
    const poolA = t < BLINK ? p.ph(t, T0, T0 + .08) : 1 - p.ph(t, BLINK, BLINK + .3);
    if (G > .02 && poolA > 0) {
      p.stain(C[0], C[1], G, (dx, dy, rho) => (rho < G ? .66 + .3 * p.noise(dx * 1.4 + 3, dy * 1.4) : 0), '#e8d68e', .8 * poolA);
    }
    // ---- light ----
    if (t > .3 && t < 1.45) {
      const ch = p.ph(t, .3, 1.25), h = fig.hand, f = t < 1.25 ? ch : 1 - p.ph(t, 1.25, 1.45);
      p.charge(h[0], h[1], h[2] + .05, ch, { n: 14, R: 1.1, ramp: PL.gaze, up: .3 });
      p.glow(h[0], h[1], h[2] + .05, .16 + .18 * ch, PL.gaze, .9 * f);
    }
    if (rift > 0) this.riftLight(p, E, W, rift, t);
    if (eyeA > 0) this.eyeLight(p, E, W, o, eyeA * (1 + .25 * p.env(t, 1.2, 1.25, 1.3, 1.5)), t);
    const c = p.cam(), PI = [E[0] + c.up[0] * -.06 * W / 2, E[1] + c.up[1] * -.06 * W / 2, E[2] + c.up[2] * -.06 * W / 2];
    // the gaze cone: pupil -> pool edge
    const cone = (t < BLINK ? p.ph(t, 1.25, T0) : 1 - p.ph(t, BLINK - .06, BLINK)) * eyeA;
    if (cone > 0) {
      const gr = Math.max(.25, G), tip = p.v3.lerp(PI, [C[0], C[1], 0], t < T0 ? p.easeInCubic(p.ph(t, 1.25, T0)) : 1);
      for (let k = 0; k < 12; k++) {
        const ang = k / 12 * p.TAU + .3, end = t < T0 ? tip : [C[0] + Math.cos(ang) * gr, C[1] + Math.sin(ang) * gr, 0];
        p.line(PI, end, .03, PL.gaze, .2 * cone, { w1: .03, i1: (k & 1 ? .26 : .36) * cone });
      }
      const core = cone * (1 - p.ph(t, T0 + .05, T0 + .3));
      if (core > 0) p.line(PI, tip, .5, PL.gaze, .45 * core, { w1: .9, i1: .3 * core });
      const nm = Math.round(26 * p.density);
      for (let k = 0; k < nm; k++) {
        const ph = (t * (.35 + .25 * p.r(k, 11)) + p.r(k, 12)) % 1, ang = p.r(k, 13) * p.TAU, rr = Math.sqrt(p.r(k, 14)) * gr * ph;
        p.dot(p.lerp(PI[0], C[0] + Math.cos(ang) * rr, ph), p.lerp(PI[1], C[1] + Math.sin(ang) * rr, ph), PI[2] * (1 - ph), PL.gaze, .7 * cone * Math.sin(Math.PI * ph));
      }
    }
    // pool: bright front band, inward ripples, rising motes at the front, ground light
    if (G > .02 && poolA > 0) {
      const settled = p.ph(G, Rcap - .02, Rcap), pulse = .85 + .15 * Math.sin(t * 9);
      p.decal(C[0], C[1], 0, G + .3, (dx, dy, rho, ang) => {
        let v = p.band(rho, G, .28);
        if (v > 0) v *= .85 + .25 * p.noise(ang * 9, t * 4);
        if (rho < G - .25 && Math.abs(((rho - t * 1.6) % .9 + .9) % .9 - .45) < .04) v = Math.max(v, .32);
        return v;
      }, PL.gaze, 1.05 * poolA * (settled ? pulse : 1));
      p.light(C[0], C[1], 0, G * 1.15, PL.gaze, .55 * poolA);
      const nf = Math.round(40 * p.density);
      for (let k = 0; k < nf; k++) {
        const ang = k / nf * p.TAU + p.r(k, 21) * .3, ph = (t * 1.3 + p.r(k, 22)) % 1;
        p.dot(C[0] + Math.cos(ang) * G, C[1] + Math.sin(ang) * G, .05 + ph * .7, PL.gaze, poolA * (1 - ph) * .9);
      }
    }
    // ---- the blink: impact frame, flash light, shock ring, dust ----
    if (a >= 0 && a < .021 + 1 / 30) p.impactFrame({ ink: '#1a1424', paper: '#f2ead8', accent: '#f0c050' });
    if (a >= 0 && a < 1.6) {
      p.shock(C[0], C[1], .1, p.ph(a, 0, .7), { R: Rcap + .6, w: .3, ramp: PL.rift, ground: true });
      p.light(C[0], C[1], 0, Rcap + 1, PL.gaze, .9 * Math.pow(1 - p.ph(a, 0, .45), 2));
    }
    if (a >= 0 && a < 1.6 && hitList.length) {
      const nD = Math.round(48 * Math.min(1.5, p.density));
      for (let k = 0; k < nD; k++) {
        const s = hitList[Math.floor(p.r(k, 31) * hitList.length)], u = p.ph(a, .02 * p.r(k, 32), 1.3 + .3 * p.r(k, 33));
        if (u <= 0 || u >= 1) continue;
        const e = p.easeOutCubic(u);
        p.ball(s.u.x + (p.r(k, 34) - .5) * .4 * e, s.u.y + (p.r(k, 35) - .5) * .4 * e, .1 + .6 * e, .13 + .2 * e, PL.dust, { alpha: .8 * Math.pow(1 - u, 1.1), rough: .45, shadow: false, seed: k });
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.2, 4.6) });
  },
  // states that were hit (cached per frame list identity is not stable, so filter cheaply)
  hitList(st, Rcap) {
    const out = [];
    for (const s of st) if (s.hitT != null && !s.fresh) out.push(s);
    return out;
  },
  // the cloud rift behind the eye: a lens of pale light with ragged, brighter edges
  riftLight(p, E, W, open, t) {
    const c = p.cam(), B = [E[0] - c.fwd[0] * 2, E[1] - c.fwd[1] * 2, E[2] - c.fwd[2] * 2], RW = W * 1.7, RH = W * .8;
    // per-column lens half height with ragged noise edges, tabulated per frame
    const N = 256, HT = new Float32Array(N + 1), ET = new Float32Array(N + 1);
    for (let i = 0; i <= N; i++) { const u = i / N * 2 - 1; HT[i] = .5 * Math.pow(Math.max(0, 1 - u * u), .7) * open; ET[i] = HT[i] * (1 + .35 * (p.noise(u * 7 + 2, t * .4) - .5)); }
    p.card(B[0], B[1], B[2], RW, RH, (u, v) => {
      const ci = Math.max(0, Math.min(N, ((u + 1) * N / 2) | 0)), half = HT[ci], av = Math.abs(v);
      if (av > half * 1.2) return 0;
      const edge = ET[ci];
      if (av > edge) return 0;
      const q = av / Math.max(1e-3, edge);
      return q > .86 ? .5 : .17 + .1 * p.noise(u * 5, v * 3 + t * .3);
    }, this.palette.rift, 1);
  },
});
