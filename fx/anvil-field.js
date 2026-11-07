// 鐵砧戰場 / Anvil Field — Armory pack (original design): the caster's sword melts into two molten streams that coil off
// the blade and pour into a sword mould hanging over the army; an invisible giant hammer strikes the mould band by band,
// flattening the soldiers under its face, and every blow cools the iron one hard colour step until the forged sword
// flies back into the caster's hand.
PXFX.define({
  id: 'anvil-field',
  loop: 6.5,
  view: { r: 5.6, h: 3.6 },
  stage: { ground: 'ash', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'shockwave', 'debris', 'grade'],
  palette: {
    molten: ['#a8322a', '#f07028', '#ffd070', '#ffffff'],
    heat0: ['#e0602a', '#ffb43a', '#ffe9a0', '#ffffff'],
    heat1: ['#c84a26', '#ff9a30', '#ffd060', '#fff2b8'],
    heat2: ['#a8322a', '#f07028', '#ffa83a', '#ffd070'],
    heat3: ['#7a2228', '#c03a2a', '#e8602c', '#ff9040'],
    heat4: ['#4a1a24', '#7a2228', '#a8322a', '#d04a2c'],
    mould: ['#2a2830', '#45414c', '#625d68', '#827c88', '#a49eaa'],
    steel: ['#454a5e', '#6c7286', '#979db0', '#c6cad6', '#eef0f5'],
    dust: ['#3a3438', '#544c4e', '#6e6566', '#8a8080'],
  },
  beats: [{ t: .65, kind: 'cast', power: .6 }, { t: 2.1, kind: 'hit', power: 1.2 }, { t: 2.6, kind: 'hit', power: 1.2 }, { t: 3.1, kind: 'hit', power: 1.5 }, { t: 4.0, kind: 'pulse', power: .6 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    blows: { zh: '錘擊次數', en: 'hammer blows', min: 1, max: 5, step: 1, value: 3 },
    face: { zh: '錘面寬度', en: 'hammer face width', min: .6, max: 2.6, step: .05, value: 1.8 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .65], k: 'pose', zh: '起手（特寫，放大 4.2 倍、背景壓暗）：施法者手持上一輪鍛成的劍；0.3–0.65 秒劍身每 0.07 秒升溫一級：鐵色、暗紅、紅、橙、黃、白，每級是整塊硬換色', en: 'pose (close-up, 4.2×, background darkened): the caster holds the sword forged last loop; at 0.3–0.65 s the blade heats one step every 0.07 s: steel, dark red, red, orange, yellow, white, each a hard switch of the whole blade' },
    { t: [.65, 1.85], k: 'charge', zh: '熔流：兩條熔鐵沿固定螺旋（半徑 0.16、2.5 圈、相差半圈，第二條遲 0.12 秒）由護手爬上劍身 0.4 秒，繞到劍後被擋住；劍身由護手往上被吃掉；到劍尖後化成兩道拋物線（最高 3.3，0.2 秒，最快、筆觸最長）飛到敵陣上空的鑄模劍首，再沿鑄模兩側水道（半寬的 60%）跑到劍尖（0.45 秒，減速）；後面的鑄模由劍首到劍尖灌滿白熱的鐵；鏡頭 0.95–1.45 秒拉遠', en: 'pour: two streams of molten iron climb the blade on fixed helices (radius 0.16, 2.5 turns, half a turn apart, the second 0.12 s late) from the guard in 0.4 s, hidden behind the blade; the blade is eaten from the guard up; at the tip they leap as two arcs (apex 3.3, 0.2 s, fastest and longest stroke) to the pommel end of the mould over the army and race down its two channels (at 60% of the half width) to the tip in 0.45 s, slowing; behind them the mould fills white-hot from pommel to tip; the camera pulls back at 0.95–1.45 s' },
    { t: [.45, 2.1], k: 'shape', zh: '鑄模：5.9 長的劍形凹槽，平放在敵陣上空 1.5 處（x 由 −2.0 到 3.9），鐵管外框加深色槽底，0.45–0.7 秒由上方落位並回彈；第一錘前 0.42 秒，無形巨錘的影子在第一條錘面範圍上逐漸變深', en: 'mould: a 5.9-long sword-shaped cavity lying flat 1.5 above the army (x from −2.0 to 3.9), an iron tube outline over a dark cavity floor, dropping in at 0.45–0.7 s with an overshoot; 0.42 s before the first blow the invisible hammer’s shadow darkens over its face' },
    { t: [2.1, 3.4], k: 'motion', zh: '錘擊：blows = 3 錘，第 k 錘在 2.1 + 0.5k 秒，錘面中心 x_k = −1.6 + (k + 0.5) × 5.2 ÷ blows，錘面寬 face = 1.8、長 5.5；施法者每錘舉手再揮下；鑄模被打沉 0.28 再彈回；每一錘鐵只降一級：第 j 錘後狀態 = round(5j ÷ blows)，階梯為白、黃、橙、紅、暗紅、鐵色，三錘即白 → 橙 → 紅 → 鐵色', en: 'blows: blows = 3, blow k at 2.1 + 0.5k s on a face centred at x_k = −1.6 + (k + 0.5) × 5.2 / blows, face = 1.8 wide and 5.5 long; the caster raises a hand and brings it down on each; the mould is knocked down 0.28 and springs back; each blow cools the iron exactly one step: after blow j the state = round(5j / blows) on the ladder white, yellow, orange, red, dark red, steel, so three blows go white → orange → red → steel' },
    { t: [2.1, 3.4], k: 'impact', zh: '命中（每錘頓幀）：錘面在地上閃出鐵當時的顏色，每 0.07 秒降一級（不漸變）；錘面形狀的方環向外推 0.8；長邊揚塵、被打的鑄模段濺出 14 粒火花。規則：|x − x_k| ≤ face ÷ 2 且 |y| ≤ 2.75 即中招，命中時間 = 第 k 錘的時間，士兵被壓扁、變成深色；三錘 × 1.8 剛好覆蓋方陣 5.1 的縱深；兩錘或錘面較窄時錘與錘之間的橫排倖存，橫列兩翼超出 2.75 的也倖存', en: 'impact (hit-stop on every blow): the face flashes on the ground in the iron’s colour and drops one tier every 0.07 s (no gradient); a ring the shape of the face pushes out 0.8; dust along the long edges and 14 sparks off the struck section of the mould. Rule: a soldier dies if |x − x_k| ≤ face / 2 and |y| ≤ 2.75; hit time = blow k’s time; it is crushed flat and goes dark. Three faces of 1.8 just cover the block’s 5.1 depth; two blows or a narrower face leave rows standing between the bands, and the flanks of a line beyond 2.75 survive' },
    { t: [3.4, 6.5], k: 'after', zh: '餘波：最後一錘後 0.3 秒鑄模外框碎成十段落下，鍛成的劍浮出、縮成手中大小（5.9 → 1.3）並沿弧線飛回施法者手中（0.65 秒），一道金光沿劍刃跑上去再碎成像素；錘印 4.7–5.5 秒淡出，計數 5.0–5.3 秒淡出，屍體 5.15–5.65 秒淡出，新一批敵兵 5.7–6.4 秒淡入；5.6–6.4 秒鏡頭推回手中的劍（循環接回開頭）', en: 'aftermath: 0.3 s after the last blow the mould’s outline breaks into ten falling pieces, the forged sword lifts out, shrinks to hand size (5.9 → 1.3) and flies back along an arc into the caster’s hand (0.65 s), and a gleam runs up its edge and breaks into pixels; the imprints fade at 4.7–5.5 s, the counter at 5.0–5.3 s, bodies at 5.15–5.65 s, a fresh army fades in at 5.7–6.4 s and the camera pushes back into the sword in hand at 5.6–6.4 s (the loop seam)' },
  ],
  layers: [
    { zh: '一個劍形：同一個函數（圓劍首、劍柄、護手、直刃、劍尖的半寬）畫手中的劍、鑄模凹槽、熔鐵、鍛成的劍；手中的劍劍面朝鏡頭並寫入深度，所以熔流繞到劍後的一段被擋住，在劍緣再出現', en: 'one sword shape: the same half-width function (round pommel, grip, guard, straight blade, point) draws the held sword, the mould’s cavity, the molten fill and the forged sword; the held sword faces the camera and writes depth, so the stretch of each stream behind it is hidden and reappears at its edge' },
    { zh: '路徑先行：兩條熔流路徑固定（劍上螺旋 → 空中拋物線 → 鑄模水道，紅、綠），第二條遲 0.12 秒；錘面是固定的矩形（藍＝將打、金＝已打），飛回的劍走金色弧線', en: 'path first: the two pour paths are fixed (helix on the blade → arc through the air → mould channel; red, green), the second 0.12 s late; the hammer faces are fixed rectangles (blue = about to strike, gold = struck) and the returning sword follows a gold arc' },
    { zh: '色階就是重點：熔鐵是四階硬色（中心白芯、亮、主色、深邊），每一錘整條鐵只換到下一套四階（白熱、黃、橙、紅、暗紅），最後換成實心鐵色；錘面閃光也是每 0.07 秒降一階，沒有任何漸變', en: 'the colour tiers are the lesson: molten iron is four hard tiers (white core in the middle, bright, main, dark edge) and each blow swaps the whole bar to the next four-tier set (white-hot, yellow, orange, red, dark red), finally solid steel; the face flash also drops one tier every 0.07 s, with no gradient anywhere' },
    { zh: '筆觸與消散：熔流是粗的鋸齒筆觸，頭部最亮，後面是失去白芯的主色長流，再後面斷成碎段；鑄模灌滿後整條熔流斷成像素；鍛成的劍飛回時沿刃一道殘光，接住後再一道金光跑上劍刃後碎掉', en: 'stroke and breakup: each stream is a heavy jagged stroke, brightest at the head, a long main-colour pour behind it that has lost its core, then segments; once the mould is full the pour breaks into pixels; a dim gleam rides the edge of the returning sword and a gold one runs up the blade after the catch and breaks up' },
    { zh: '無形的錘：看不見錘本身，只見它的影子（錘前 0.42 秒在錘面範圍逐漸變深）、錘面形狀的閃光與方環、被打沉再彈回的鑄模、火花與揚塵、留在地上的裂紋錘印', en: 'the invisible hammer: the hammer itself is never drawn, only its shadow (darkening over the face 0.42 s before), the face-shaped flash and ring, the mould knocked down and springing back, sparks and dust, and the cracked imprint left on the ground' },
    { zh: '判定與倖存：每一錘是一條垂直於 x 的帶（寬 face、長 5.5），在帶內的士兵在那一錘被壓扁成深色的一片；預設三錘 × 1.8 覆蓋整個方陣；錘數減少或錘面變窄，錘與錘之間的橫排站著倖存並發抖', en: 'rule and survivors: each blow is a band across x (face wide, 5.5 long) and soldiers inside it are crushed into a dark layer on that blow; the default 3 × 1.8 covers the whole block; fewer blows or a narrower face leave the rows between bands standing and trembling' },
    { zh: '軍隊、計數與鏡頭：1000 名像素小兵站在灰燼地面；計數每錘跳一大截，全滅變金色，特寫時隱藏；鏡頭以手中的劍特寫開場與收尾，中段拉遠看整個戰場', en: 'army, counter and camera: 1,000 pixel soldiers on ash ground; the counter jumps a block per blow, turns gold on a full wipe and hides during the close-up; the camera opens and closes on the sword in hand and pulls back to the whole battlefield in between' },
  ],

  CX: -4.3, AREA: { x: 1.0, y: 0, rx: 2.6, ry: 2.5 }, X0: -1.6, SPAN: 5.2, HL: 2.75, ZM: 1.5,
  MX: -2.0, MLEN: 5.9, HLEN: 1.3, POUR: .65, B0: 2.1, BG: .5, RS: [5.7, 6.4], CL: [5.15, 5.65],
  // blow k (0-based) of B: band centre and time
  bandX(k, B) { return this.X0 + (k + .5) * this.SPAN / B; },
  blowT(k) { return this.B0 + this.BG * k; },
  // heat state after j blows of B: 0 white, 1 yellow, 2 orange, 3 red, 4 dark red, 5 steel (hard steps, never a blend)
  heat(j, B) { return j <= 0 ? 0 : Math.round(j * 5 / B); },
  heatRamp(st) { return this.palette['heat' + Math.min(4, st)]; },
  // honest rule: inside any hammer face (|x - x_k| <= face / 2 and |y| <= 2.75) -> hit at that blow's time
  hitOf(u, B, F) {
    if (Math.abs(u.y) > this.HL) return null;
    for (let k = 0; k < B; k++) if (Math.abs(u.x - this.bandX(k, B)) <= F / 2) return this.blowT(k);
    return null;
  },
  // ONE sword shape (length 1) for the held sword, the mould's cavity, the molten fill and the forged blade:
  // half width at x (0 = pommel end, 1 = tip): round pommel, grip, guard bar, straight blade, point
  W(x) {
    if (x < 0 || x > 1) return 0;
    if (x < .07) { const d = x - .04; return Math.sqrt(Math.max(0, .0016 - d * d)); }
    if (x < .17) return .022;
    if (x < .205) return .21;
    return x < .84 ? .085 : .004 + .081 * (1 - x) / .16;
  },
  XS: (() => { const a = []; for (let k = 0; k <= 48; k++) a.push(k / 48); for (const b of [.07, .17, .205, .84]) a.push(b - 1e-4, b + 1e-4); return a.sort((p, q) => p - q); })(),
  // a sword frame: pommel end o, unit dir d, face normal n, length; at(x, w, lift) in unit sword coordinates
  frame(o, d, n, len) {
    const s = [d[1] * n[2] - d[2] * n[1], d[2] * n[0] - d[0] * n[2], d[0] * n[1] - d[1] * n[0]];
    return { o, d, n, s, len, at: (x, w, lift = 0) => [o[0] + (d[0] * x + s[0] * w) * len + n[0] * lift, o[1] + (d[1] * x + s[1] * w) * len + n[1] * lift, o[2] + (d[2] * x + s[2] * w) * len + n[2] * lift] };
  },
  // the shape between x0 and x1 as a strip: solid (sribbon) or light (ribbon); fn(u, v) gets v across (0 = one edge)
  strip(p, F, x0, x1, fn, ramp, lift, solid) {
    if (x1 <= x0) return;
    const xs = [x0].concat(this.XS.filter(x => x > x0 && x < x1), [x1]), L = [], R = [];
    for (const x of xs) { const w = Math.max(this.W(x), .012); L.push(F.at(x, w, lift)); R.push(F.at(x, -w, lift)); }
    if (solid) p.sribbon(L, R, fn, ramp); else p.ribbon(L, R, fn, ramp, 1);
  },
  // molten iron in hard tiers across the shape: centre = core, then bright, main, dark edge
  iron(u, v) { const e = Math.min(v, 1 - v); return (e < .12 ? .5 : e < .25 ? 1.5 : e < .37 ? 2.5 : 3.5) / 4; },
  steelFn(u, v) { return v < .07 ? .95 : v < .5 ? .72 : v < .93 ? .45 : .28; },
  // closed outline of the shape, pushed out by `off` (unit lengths): the mould's iron frame and the guides
  outline(off) {
    const up = this.XS.map(x => [x, this.W(x) + off]);
    return [[-off, 0]].concat(up, [[1 + off * 1.5, 0]], up.slice().reverse().map(q => [q[0], -q[1]]));
  },

  // close-up on the held sword at the start and the end of the loop (it is last loop's forged sword)
  near(t, p) { return 1 - p.ease(p.ph(t, .95, 1.45)) + p.ease(p.ph(t, 5.6, 6.4)); },
  FOCUS: [-4.0, -.1, 1.55], KC: 4.2,
  lensAt(t, p) {
    const b = this.near(t, p);
    if (b <= 0) return null;
    const c = this.FOCUS;
    return { k: 1 + (this.KC - 1) * b, c, to: [c[0] * (1 - b), c[1] * (1 - b), c[2] + (1.4 - c[2]) * b] };
  },
  draw(p, t) {
    const PL = this.palette, seed = p.hold(t), B = Math.round(p.param('blows')), F = p.param('face');
    const form = PXFX.TROOPS[p.param('formation') | 0].id, TL = this.blowT(B - 1), CRACK = TL + .3, FLY = CRACK, CATCH = FLY + .65;
    let done = 0; for (let k = 0; k < B; k++) if (t >= this.blowT(k)) done++;
    const state = this.heat(done, B);
    // ---- caster: holds last loop's sword, melts it, mimes each hammer blow, catches the new one ----
    let pose;
    if (t < 1.6) pose = 'point';
    else if (t < TL + .1) {
      let k = 0; while (k < B - 1 && t > this.blowT(k) + .1) k++;
      const tb = this.blowT(k), up = p.easeOutCubic(p.ph(t, tb - .38, tb - .12)), dn = p.easeInCubic(p.ph(t, tb - .12, tb));
      pose = dn > 0 ? { a: 'raise', b: 'swing', k: dn } : { a: k ? 'swing' : 'point', b: 'raise', k: up };
    } else if (t < CATCH) pose = { a: 'swing', b: 'point', k: p.easeOutCubic(p.ph(t, FLY, CATCH)) };
    else pose = 'point';
    p.figure(this.CX, 0, { scale: .85, pose });
    // the sword is only ever held in the 'point' pose: its frame is fixed (an invisible figure gives the hand)
    const hand = p.figure(this.CX, 0, { scale: .85, pose: 'point', alpha: 0 }).hand, cf = p.cam().fwd;
    const hd = p.v3.norm([.18, 0, 1]), hn0 = p.v3.norm([cf[0] - hd[0] * (cf[0] * hd[0] + cf[2] * hd[2]), cf[1], cf[2] - hd[2] * (cf[0] * hd[0] + cf[2] * hd[2])]);
    const HF = this.frame(p.v3.along(hand, hd, -.1), hd, hn0, this.HLEN);
    // ---- the army: the invisible hammer flattens every soldier under its face ----
    // in the close-up the army is off screen: skip drawing it (the counter is hidden there anyway)
    const nr = this.near(t, p), co = { n: Math.round(p.param('crowd')), seed: 43, formation: form, area: this.AREA, faceTo: [this.CX, 0] };
    let onScreen = nr <= 0;
    if (!onScreen) {
      const A = this.AREA, ex = A.rx * 1.3, ey = A.ry * 1.3;
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (const [dx, dy, z] of [[-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0], [-1, -1, .4], [1, -1, .4], [1, 1, .4], [-1, 1, .4]]) {
        const q = p.project(A.x + dx * ex, A.y + dy * ey, z);
        if (!q) { onScreen = true; break; }
        x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]);
      }
      if (!onScreen) onScreen = !(x1 < 0 || x0 > p.W || y1 < 0 || y0 > p.H);
    }
    const st = !onScreen ? (this._st && this._st.key === [co.n, form, B, F].join() ? this._st.list : (this._st = { key: [co.n, form, B, F].join(), list: p.crowdLayout(co).map(u => ({ hitT: this.hitOf(u, B, F) })) }).list) : p.crowd({
      ...co, t, scale: 'auto', enter: 'fade',
      hit: u => this.hitOf(u, B, F), at: [1, 0, 0],
      react: (s, a, u, pp, o) => { PXFX.REACT.crush(s, a, u, pp, o); if (a > .06) s.mat = 'char'; },   // hammered flat into the ground
      fear: u => { const tb = this.hitOf(u, B, F); return tb == null ? .5 * p.env(t, 1.9, 2.1, TL, TL + .4) : p.env(t, tb - .45, tb - .1, 9, 9); },
      respawn: this.RS, clear: this.CL,
    });
    // the close-up: the world goes dark behind the sword so the heat tiers read (light drawn after this stays bright)
    if (nr > 0) p.grade({ dark: .7 * nr, desat: .4 * nr, tint: '#2a1414', tintAmt: .3 * nr, bg: nr });
    // ---- the hammer's shadow grows over its band before each blow; a cracked imprint stays after it ----
    for (let k = 0; k < B; k++) {
      const tb = this.blowT(k), bx = this.bandX(k, B), hw = F / 2, HL = this.HL;
      if (t < tb - .42) continue;
      const pre = p.ph(t, tb - .42, tb), amt = t < tb ? .35 + .65 * pre * pre : 1 - p.ph(t, 4.7, 5.5);
      if (amt <= .02) continue;
      p.stain(bx, 0, Math.hypot(hw, HL) + .05, (dx, dy) => {
        const ax = Math.abs(dx), ay = Math.abs(dy);
        if (ax > hw || ay > HL) return 0;
        const rim = ax > hw - .08 || ay > HL - .08 ? 1 : 0;
        if (t < tb) return .55 + .45 * rim;
        return .5 + (Math.abs(Math.sin(dx * 7 + p.noise(dy * 2, k) * 3)) < .12 || Math.abs(Math.sin(dy * 5 + k)) < .06 ? .45 : 0) + .4 * rim;
      }, t < tb ? '#120e14' : '#1a1418', amt);
    }
    // ---- the mould: an iron outline of the sword over a dark cavity; drops in, dips on every blow, breaks after the last ----
    let dip = 0;
    for (let k = 0; k < B; k++) { const a = t - this.blowT(k); if (a >= 0 && a < .45) dip -= .28 * Math.exp(-a * 9) * Math.cos(a * 18) * Math.min(1, a / .04); }
    const drop = t < .45 ? 3 : t < .7 ? 1.4 * (1 - p.easeOutBack(p.ph(t, .45, .7), 1.6)) : 0;
    const MF = this.frame([this.MX, 0, this.ZM + dip + drop], [1, 0, 0], [0, 0, 1], this.MLEN), MP = PL.mould, mouldOn = t > .45 && t < CRACK;
    const ol = this.outline(.016);
    if (mouldOn) {
      this.strip(p, MF, 0, 1, (u, v) => (Math.min(v, 1 - v) < .1 ? .1 : .3), MP, -.02, true);
      for (let k = 0; k < ol.length; k++) { const A = ol[k], Bq = ol[(k + 1) % ol.length]; p.capsule(MF.at(A[0], A[1], .02), MF.at(Bq[0], Bq[1], .02), .055, .055, MP, { shadow: k % 3 === 0 }); }
    }
    if (t >= CRACK && t < CRACK + 1.1) {   // the frame breaks into ten pieces that fall away
      const a = t - CRACK, n = ol.length, M0 = this.frame([this.MX, 0, this.ZM], [1, 0, 0], [0, 0, 1], this.MLEN);
      for (let j = 0; j < 10; j++) {
        const k0 = Math.floor(j * n / 10), k1 = Math.floor((j + 1) * n / 10), vx = (p.r(j, 3) - .5) * 1.4, vy = (ol[k0][1] > 0 ? 1 : -1) * (.5 + .8 * p.r(j, 4));
        const off = [vx * a, vy * a, 1.2 * a * p.r(j, 5) - 5.5 * a * a];
        if (this.ZM + off[2] < .1) continue;
        for (let k = k0; k < k1; k++) { const A = M0.at(ol[k][0], ol[k][1], .02), Bq = M0.at(ol[k + 1 < n ? k + 1 : 0][0], ol[k + 1 < n ? k + 1 : 0][1], .02); p.capsule([A[0] + off[0], A[1] + off[1], A[2] + off[2]], [Bq[0] + off[0], Bq[1] + off[1], Bq[2] + off[2]], .055, .055, MP, { shadow: false }); }
      }
    }
    // ---- pour paths (stable: built from the fixed held frame and the mould at rest), cached per camera ----
    const ckey = [p.mode, p.project(0, 0, 0).join(), p.project(1, 1, 1).join()].join('|');
    if (!this._pp || this._ppKey !== ckey) {
      const pp = [], M0 = this.frame([this.MX, 0, this.ZM], [1, 0, 0], [0, 0, 1], this.MLEN);
      for (let c = 0; c < 2; c++) {
        const hx = p.helix({ c: HF.at(.22, 0), dir: HF.d, len: .78 * this.HLEN, side: HF.s, nrm: HF.n, r: .16, turns: 2.5, phase: c * Math.PI });
        const tip = hx.pts[hx.pts.length - 1], sp = M0.at(.04, 0, .03), sg = c ? -1 : 1, mid = [(tip[0] + sp[0]) / 2, sg * .9, 3.3], arc = [];
        for (let k = 1; k <= 16; k++) {
          const q = k / 16, A = [0, 1, 2].map(i => tip[i] + (mid[i] - tip[i]) * q), Bq = [0, 1, 2].map(i => mid[i] + (sp[i] - mid[i]) * q);
          arc.push([0, 1, 2].map(i => A[i] + (Bq[i] - A[i]) * q));
        }
        const ch = this.XS.filter(x => x > .05).map(x => M0.at(x, sg * .6 * this.W(x), .03));
        const pts = hx.pts.concat(arc, ch), path = p.path(pts);
        const seg = n => { let L = 0; for (let k = 1; k < n; k++) L += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1], pts[k][2] - pts[k - 1][2]); return L / path.len; };
        pp.push({ path, f1: seg(hx.pts.length), f2: seg(hx.pts.length + arc.length) });
      }
      this._pp = pp; this._ppKey = ckey;
    }
    const PP = this._pp;
    // head along a pour path (0..1): coil .4 s (slow, accelerating), arc .2 s (fast), channel .45 s (slowing)
    const head = c => {
      const P = PP[c], a = t - this.POUR - c * .12;
      if (a <= 0) return -1;
      if (a < .4) return P.f1 * p.easeIn(a / .4);
      if (a < .6) return P.f1 + (P.f2 - P.f1) * ((a - .4) / .2);
      if (a < 1.05) return P.f2 + (1 - P.f2) * p.easeOutCubic((a - .6) / .45);
      return 1 + (a - 1.05);
    };
    const H = [head(0), head(1)], melt = t >= CATCH ? 0 : Math.min(...H.map((h, c) => (h < 0 ? 0 : Math.min(1, h / PP[c].f1))));
    // ---- the held sword: last loop's forged sword, heated step by step, then eaten from the guard up by the coils ----
    if (t < CATCH ? melt < 1 : true) {
      const hs = t < .3 || t >= CATCH ? 5 : Math.max(0, 4 - Math.floor((t - .3) / .07)), x0 = melt > 0 ? .205 + .795 * melt : 0;
      if (melt <= 0) this.strip(p, HF, 0, .205, this.steelFn, PL.steel, 0, true);
      this.strip(p, HF, Math.max(.205, x0), 1, this.steelFn, PL.steel, 0, true);
      if (hs < 5) this.strip(p, HF, melt > 0 ? x0 : 0, 1, this.iron, this.heatRamp(hs), .01, false);
    }
    // ---- the pour: two coils run up the held blade (hidden behind it), arc over the field and race down the mould's channels ----
    const marks = [[], []];
    for (let c = 0; c < 2; c++) {
      const P = PP[c], h = H[c];
      if (h < 0 || h > 1.6) continue;
      const hh = Math.min(1, h), fast = hh > P.f1 && hh < P.f2, L = fast ? .1 : .05, sd = seed * 5 + c * 77;
      const back = pt => hh < P.f1 && (pt[0] - HF.o[0]) * HF.n[0] + (pt[1] - HF.o[1]) * HF.n[1] + (pt[2] - HF.o[2]) * HF.n[2] < 0;
      if (h < 1) {
        p.zap(P.path, Math.max(0, hh - L), hh, PL.molten, { seed: sd, jag: 1.6, thick: 2, tail: .45, forks: 1, back });
        const hp = P.path.at(hh); marks[c].push(hp); p.light(hp[0], hp[1], hp[2], .8, PL.molten, .6);
      }
      // the stream behind the head: a continuous pour (core gone, main colour) that breaks up once the mould is full
      const s0 = Math.max(0, hh - L - .5), s1 = hh - L, end = Math.max(0, h - 1) * 2.2;
      if (s1 > s0) {
        p.zap(P.path, s0, s1, PL.molten, { seed: sd + 9, jag: 1.4, step: 5, back, tail: .5, fade: Math.min(1, .2 + end), forks: 0 });
        if (s0 > 0) p.zap(P.path, Math.max(0, s0 - .06), s0, PL.molten, { seed: sd + 10, jag: 1.2, back, fade: Math.min(1, .62 + end), forks: 0 });
      }
    }
    // ---- the iron in the mould: fills behind the channel heads, then cools ONE hard step per blow ----
    let fillX = 0;
    if (H[0] >= PP[0].f2 && H[1] >= PP[1].f2) fillX = Math.min(...H.map((h, c) => (h >= 1 ? 1 : (PP[c].path.at(h)[0] - this.MX) / this.MLEN)));
    if (mouldOn && fillX > 0) {
      if (state >= 5) this.strip(p, MF, 0, 1, this.steelFn, PL.steel, .005, true);
      else {
        this.strip(p, MF, 0, fillX, this.iron, this.heatRamp(state), .01, false);
        if (fillX < 1) { const fp = MF.at(fillX, 0, .05); p.sparkle(fp[0], fp[1], fp[2], 3, PL.heat0, 1); }
        p.light(this.MX + this.MLEN * .5, 0, this.ZM, 2.6, this.heatRamp(state), [1, .85, .7, .5, .3][state]);
      }
    }
    // ---- each blow: the face flashes down the tiers, a face-shaped ring runs out, dust, sparks off the mould ----
    for (let k = 0; k < B; k++) {
      const a = t - this.blowT(k);
      if (a < -.01 || a > .7) continue;
      const bx = this.bandX(k, B), hw = F / 2, HL = this.HL, ramp = this.heatRamp(this.heat(k, B));   // the iron's colour as it was struck
      // flash: core for two frames, then one tier down every .07 s (never a smooth fade)
      const tier = a < .07 ? 3 : 2 - Math.floor((a - .07) / .07);
      if (tier >= 0) p.decal(bx, 0, .02, Math.hypot(hw, HL) + .05, (dx, dy) => (Math.abs(dx) <= hw && Math.abs(dy) <= HL ? (tier + .5) / 4 : 0), ramp, 1);
      const o = .05 + .75 * p.easeOutCubic(a / .45), rx = hw + o, ry = HL + o * .6, per = 2 * (rx + ry);
      const rect = p.path(q => {
        const d = q * 2 * per;
        const xy = d < 2 * rx ? [-rx + d, -ry] : d < 2 * rx + 2 * ry ? [rx, -ry + d - 2 * rx] : d < 4 * rx + 2 * ry ? [rx - (d - 2 * rx - 2 * ry), ry] : [-rx, ry - (d - 4 * rx - 2 * ry)];
        return [bx + xy[0], xy[1], .04];
      }, 48);
      p.zap(rect, 0, 1, ramp, { seed: seed * 11 + k, jag: 1.6, step: 5, thick: a < .12 ? 2 : 1, fade: p.ph(a, .1, .65), forks: 1 });
      if (a < .2) p.light(bx, 0, .1, 2.6, ramp, 1 - a / .2);
      const nD = Math.round(10 * p.density);
      for (let j = 0; j < nD; j++) {
        const sg = j & 1 ? 1 : -1, y = (p.r(j + k * 31, 3) * 2 - 1) * HL, d = p.drag(2.2, 5, a);
        p.ball(bx + sg * (hw + d), y, .06 + .25 * a, .08 + .16 * Math.min(1, a / .5), PL.dust, { alpha: .85 * (1 - a / .7), rough: .5, shadow: false, seed: j });
      }
      const nS = Math.round(14 * p.density);
      for (let j = 0; j < nS; j++) {
        const an = p.r(j + k * 17, 5) * p.TAU, sp = 1.5 + 2.5 * p.r(j + k * 17, 6), vz = 1 + 2.5 * p.r(j + k * 17, 7), aa = Math.min(a, .55);
        const x = bx + Math.cos(an) * sp * aa, y = Math.sin(an) * sp * aa * .6, z = this.ZM + dip + vz * aa - 6 * aa * aa;
        if (z > 0 && a < .55) p.dot(x, y, z, ramp, 1 - a / .6, a < .15 ? 2 : 1);
      }
    }
    // ---- the forged sword flies back, turning over and shrinking from mould size to hand size ----
    if (t >= FLY && t < CATCH) {
      const q = p.ph(t, FLY, CATCH), e = p.ease(q), es = p.easeOutCubic(q);   // it shrinks early, then flies
      const len = this.MLEN + (this.HLEN - this.MLEN) * es, d = p.v3.norm([1 - e + HF.d[0] * e, HF.d[1] * e, HF.d[2] * e]);
      const nn = [HF.n[0] * e, HF.n[1] * e, (1 - e) + HF.n[2] * e], dn = nn[0] * d[0] + nn[1] * d[1] + nn[2] * d[2];
      const n0 = p.v3.norm([nn[0] - d[0] * dn, nn[1] - d[1] * dn + .001, nn[2] - d[2] * dn]);
      const c0 = [this.MX + this.MLEN * .5, 0, this.ZM], c1 = HF.at(.5, 0);
      const ctr = [c0[0] + (c1[0] - c0[0]) * e, c0[1] + (c1[1] - c0[1]) * e, c0[2] + (c1[2] - c0[2]) * e + 1.3 * Math.sin(Math.PI * q)];
      const Fy = this.frame([ctr[0] - d[0] * len * .5, ctr[1] - d[1] * len * .5, ctr[2] - d[2] * len * .5], d, n0, len);
      this.strip(p, Fy, 0, 1, this.steelFn, PL.steel, 0, true);
      const edge = p.path(qq => Fy.at(.21 + .79 * qq, this.W(.21 + .79 * qq), .01), 12);
      p.zap(edge, 0, 1, PL.heat1, { seed: seed * 23, jag: 1, step: 4, thick: 0, fade: .3 + .6 * q, forks: 0 });
      if (p.guiding) { const arc = []; for (let k = 0; k <= 16; k++) { const qq = k / 16, ee = p.ease(qq); arc.push([c0[0] + (c1[0] - c0[0]) * ee, c0[1] + (c1[1] - c0[1]) * ee, c0[2] + (c1[2] - c0[2]) * ee + 1.3 * Math.sin(Math.PI * qq)]); } p.guide(arc, 'gold', { marks: [ctr] }); }
    }
    // the catch: one glint runs up the new blade and breaks up
    if (t >= CATCH && t < CATCH + .7) {
      const a = t - CATCH, edge = p.path(qq => HF.at(.21 + .79 * qq, this.W(.21 + .79 * qq), .01), 12), h = p.easeOut(a / .2);
      p.zap(edge, Math.max(0, h - .4), h, PL.heat0, { seed: seed * 29, jag: 1, step: 4, tail: .4, fade: p.ph(a, .2, .7), forks: 0 });
      if (a < .2) { const tp = HF.at(1, 0); p.sparkle(tp[0], tp[1], tp[2], 3, PL.heat0, 1 - a / .2); }
    }
    // ---- guides: the two pour paths, the hammer faces (honest bands: blue before the blow, gold after) ----
    if (p.guiding) {
      if (t < 2.2) { p.guide(PP[0].path, 'red', { marks: marks[0] }); p.guide(PP[1].path, 'green', { marks: marks[1] }); }
      for (let k = 0; k < B; k++) {
        const bx = this.bandX(k, B), hw = F / 2, HL = this.HL;
        p.guide([[bx - hw, -HL, .03], [bx + hw, -HL, .03], [bx + hw, HL, .03], [bx - hw, HL, .03], [bx - hw, -HL, .03]], t >= this.blowT(k) ? 'gold' : 'blue');
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: (1 - Math.min(1, nr * 4)) * (1 - p.ph(t, 5.0, 5.3)) });
  },
});
