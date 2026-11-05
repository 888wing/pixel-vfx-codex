// 亡魂鐵騎 / Phantom Cavalry — Mass Spells pack (original design): a ghost gate opens behind the caster and two ranks of translucent riders charge through the whole horde, then melt into green mist
PXFX.define({
  id: 'phantom-cavalry',
  loop: 5,
  beats: [{ t: 1.0, kind: 'cast', power: .7 }, { t: 1.75, kind: 'hit', power: 1.3 }],
  view: { r: 4.8, h: 3.4 },
  stage: { ground: 'ash' },
  modules: ['figure', 'charge', 'crowd', 'domain', 'shockwave', 'impact', 'aftermath'],
  palette: {
    ghost: ['#1f7a6a', '#2fae8c', '#4fd6a8', '#7ff0c8', '#c4fff0', '#f2fffb'],
    mist: ['#2a5852', '#3c7468', '#58978a', '#80bcad'],
    body: ['#0a2420', '#1f6e5e', '#2f9a7e', '#4cc49c', '#86e8c4', '#c8fbe8'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者伸手指向前方（0.38 秒回彈緩動），敵群（36 個細小敵兵）在場中央列陣', en: 'pose: the caster points forward (0.38 s overshoot ease) while a horde of 36 small soldiers stands in the middle of the field' },
    { k: 'charge', t: [.2, 1.0], zh: '集氣：頁面背景由門的位置抹成墨綠深淵（0.7 秒）；施法者身後 0.85 處一道高約 3.3 的直立圓門（半徑 1.75，面向 +x 偏 30°，下緣埋入地面）以回彈緩動張開：外圈綠白光環、16 格符文環、內圈雙臂旋渦薄膜，門腳湧出綠霧並照亮地面；12 粒綠光點匯聚到指尖', en: 'charge: the page wipes into a dark green abyss from the gate (0.7 s); 0.85 behind the caster an upright ring gate ~3.3 tall (radius 1.75, facing +x turned 30° to the camera, its rim sunk into the ground) opens with an overshoot: a green-white rim, a band of 16 runes and a two-arm swirl membrane, green mist pouring from its foot and lighting the ground; 12 green motes converge on the fingertip' },
    { k: 'shape', t: [.95, 1.5], zh: '成形：6 名半透明幽靈騎兵（馬＋騎士剪影高約 1.35，前後兩排各 3 名）由門面逐點穿出，穿越門面處有一條亮縫；每名騎兵由門內的起點散開到 -1.7 至 1.7 之間的路線，避開施法者', en: 'shape: 6 translucent phantom riders (horse + rider silhouettes ~1.35 tall, two ranks of 3) come through the gate face pixel by pixel with a bright seam where they cross it, then fan out from their start points in the gate to lanes between -1.7 and 1.7, avoiding the caster' },
    { k: 'motion', t: [1.0, 2.9], zh: '推進：兩排騎兵以每秒 5.5 單位向 +x 衝過全場（衝鋒前由 0.76 倍速度加速），後排落後 1.25；馬腿按步幅 2.2 奔跑、身體起伏、騎士持上揚長槍；身後拖細長綠色速度線和低矮霧團，地面留下發光蹄印；前排經過敵兵 x 位置時該兵中招：命中時間 = 1.75 + (x − 最前敵兵 x) ÷ 5.5，大部分被撞向前方或兩側（拋物線＋翻滾），約 28% 被高高挑起', en: 'motion: the two ranks charge across the field towards +x at 5.5 units/s (accelerating from 0.76× before contact), the back rank 1.25 behind; legs gallop with a 2.2 stride, the bodies bob, the lances are raised forward; thin green speed streaks and low mist puffs trail behind and glowing hoof prints are left on the ground; each soldier is hit when the front rank passes its x: hit time = 1.75 + (x − front soldier x) / 5.5, most are thrown forward or aside (parabola + tumble), ~28% are tossed high' },
    { k: 'impact', t: [1.75, 2.1], zh: '命中：前排撞上敵群最前線的一刻 1 格黑白衝擊格＋頓幀，前線一圈綠色地面衝擊環、一排塵霧、一團綠光，騎兵前方 14 條水平速度線', en: 'impact: when the front rank meets the horde’s front line, one two-tone impact frame and a hit-stop, a green ground shock ring at the front line, a row of dust and mist, a burst of green light and 14 horizontal speed lines ahead of the riders' },
    { k: 'after', t: [2.6, 5], zh: '餘波：騎兵衝到畫面右方時由噪聲逐點溶解，同時噴出大團綠霧；光門在 2.7–3.2 秒閃爍收縮關閉；地上留下屍體、成對的深色蹄印和貼地殘霧；深淵在 3.3–4.1 秒退回門的位置，屍體淡出，新一批敵兵由右邊走回原位', en: 'aftermath: reaching the right of the frame the riders dissolve pixel by pixel through noise while big green mist puffs burst out; the gate flickers and shrinks shut at 2.7–3.2 s; bodies, paired dark hoof prints and low lingering mist stay on the ground; the abyss wipes back into the gate at 3.3–4.1 s, the bodies fade and a fresh horde walks in from the right' },
  ],
  layers: [
    { zh: '敵群：30–60 個細小敵兵（高約 0.6）分佈在中心 (1.2, 0)、半徑 2.45×2.1 的橢圓內；命中時間由前排騎兵到達該兵 x 位置決定，所以撞擊線由左向右掃過人群；衝擊頓幀固定落在前排碰到最前敵兵的一刻（騎兵速度改變時改變出發時間）', en: 'horde: 30–60 small soldiers (~0.6 tall) in an ellipse 2.45×2.1 around (1.2, 0); hit times come from when the front rank reaches each soldier’s x, so the impact line sweeps the crowd from left to right; the hit-stop always lands when the front rank reaches the first soldier (a faster charge simply leaves the gate later)' },
    { zh: '光門：任意朝向的發光四邊形上用極座標畫圖案（外環、內環、16 格 5×5 方塊符文逐格出現、雙臂旋渦薄膜）；張開用回彈緩動放大，關閉用 easeInCubic 收縮並每格閃爍', en: 'gate: a polar pattern on an emissive quad in any orientation (outer ring, inner ring, 16 cells of 5×5 block runes appearing one by one, a two-arm swirl membrane); opens with an overshoot scale, closes with an easeInCubic shrink and a per-frame flicker' },
    { zh: '騎兵剪影：面向鏡頭的卡片，以 21 段膠囊的有向距離場拼出馬身、胸、臀、拱起的馬頸、楔形馬頭、馬耳、兩段馬尾、4 條兩節馬腿、騎士軀幹、帶冠飾的頭盔、手臂、短披風、腿；距離場每像素只算一次（兩個繪製步驟共用）', en: 'rider silhouette: a camera-facing card whose shape is a signed distance field of 21 capsules (horse barrel, chest, rump, arched neck, wedge head, ear, two-part tail, four two-part legs, rider torso, crested helmet, arm, short cape, leg); the field is evaluated once per pixel and shared by both drawing passes' },
    { zh: '騎兵上色：實心但半透明的身體（自訂 4×4 Bayer 抖色，上半身覆蓋率 = 幽靈不透明度，馬腿向下漸漸散成霧）由暗綠到薄荷白直向漸變；剪影外 1 像素深色輪廓把重疊的騎兵分開；只在上緣畫一條亮邊；長槍為獨立光線，槍尖閃星，馬眼一點白光', en: 'rider shading: a solid but see-through body (custom 4×4 Bayer dither; upper-body coverage = ghost opacity, the legs thinning into mist towards the ground) with a vertical dark green → mint gradient; a dark 1 px contour just outside the silhouette separates overlapping riders; a bright rim only on the upper edges; the lance is a separate light line with a sparkle at its tip and a white dot marks the eye' },
    { zh: '步伐：每條腿的擺角 = 0.55·sin(步相 + 偏移)，步相 = 已跑距離 ÷ 2.2 × 2π，四腿偏移 0／0.12／0.5／0.62 圈（襲步），抬腿時下段向後摺；身體上下起伏 0.035', en: 'gait: each leg swings 0.55·sin(stride phase + offset), stride phase = distance run / 2.2 × 2π, leg offsets 0 / 0.12 / 0.5 / 0.62 of a cycle (gallop), the lower leg folds back while lifted; the body bobs 0.035' },
    { zh: '出門與消散：卡片內按局部 x 剪掉仍在門面後的部分（剪口畫 1.6 像素亮縫）；越過 x = 2.9 後（或 2.75 秒後）以噪聲閾值逐點溶解，霧團同時變大', en: 'emerging and dissolving: inside the card the part still behind the gate face is clipped by local x (a 1.6 px bright seam at the cut); past x = 2.9 (or after 2.75 s) pixels dissolve through a noise threshold while the mist puffs grow' },
    { zh: '群眾反應（自訂撞飛）：方向 = 向前 ± 20°–55°（偏離最近騎兵路線的一側），撞飛距離限制在場地內；約 28% 改為高拋（高 1.1–1.9、翻滾 1–2 圈）', en: 'crowd reaction (custom knock): direction = forward ± 20°–55° (away from the nearest rider lane), throw distance kept inside the stage; ~28% are tossed high instead (1.1–1.9 up, 1–2 tumbles)' },
    { zh: '餘波：每名騎兵每 0.38 單位一個深色蹄印（左右交錯），剛印下 0.9 秒內發綠光；路線上留下抖色低霧；屍體、蹄印、殘霧在 3.4–4.4 秒淡出', en: 'aftermath: a dark hoof print every 0.38 units per rider (alternating left and right) that glows green for 0.9 s; dithered low mist lies along the lanes; bodies, prints and mist fade at 3.4–4.4 s' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    riders: { zh: '騎兵數量', en: 'rider count', min: 4, max: 12, step: 1, value: 6 },
    speed: { zh: '衝鋒速度', en: 'charge speed', min: 4, max: 7, step: .1, value: 5.5 },
    opacity: { zh: '幽靈不透明度', en: 'ghost opacity', min: .2, max: 1, step: .05, value: .9 },
  },
  AREA: { x: 1.2, y: 0, rx: 2.45, ry: 2.1 },
  G: [-4.35, .2, 1.55], GR: 1.75, N: [.866, .5, 0], GH: [-.5, .866, 0],
  HIT: 1.75,
  front(p, n) {
    if (this._fk === n) return this._fv;
    let m = 1e9;
    for (const u of p.crowdLayout({ n, seed: 11, area: this.AREA })) m = Math.min(m, u.x);
    this._fk = n; this._fv = m;
    return m;
  },
  // rider k: lane, rank, start y at the gate; x(t) of its body centre (front rank chest meets XF at HIT)
  lane(k, NR) {
    const y = -2.0 + 4.0 * (k + .5) / NR, back = k % 2 === 1;
    let y0 = this.G[1] + (y - this.G[1]) * .85;
    if (Math.abs(y0 - .2) < .4) y0 = .2 + (y0 < .2 ? -.4 : .4);
    return { y, y0, back };
  },
  riderX(t, XF, v, back) {
    const tau = t - this.HIT;
    return XF - .45 + v * tau + (tau < 0 ? .12 * v * tau * tau : 0) - (back ? 1.25 : 0);
  },
  laneY(L, x) { const g = this.G[0]; const k = Math.min(1, Math.max(0, (x - g - .3) / 2.3)); return L.y0 + (L.y - L.y0) * k * k * (3 - 2 * k); },
  // capsules of the silhouette (metres, X forward, Y up from the ground) for a stride phase
  shape(ph, t, k) {
    const dy = .035 * Math.sin(2 * ph), S = [];
    const cap = (ax, ay, bx, by, r) => S.push([ax, ay + dy, bx, by + dy, r]);
    // horse: barrel, chest, rump, arched neck, wedge head, ears, flowing tail
    cap(-.3, .63, .22, .65, .17); cap(.28, .62, .28, .62, .16); cap(-.32, .67, -.32, .67, .17);
    cap(.3, .74, .44, 1.0, .1); cap(.46, 1.02, .67, .9, .075); cap(.44, 1.08, .42, 1.17, .03);
    const tw = .06 * Math.sin(t * 9 + k);
    cap(-.46, .76, -.66, .64 + tw, .06); cap(-.66, .64 + tw, -.8, .52 - tw, .04);
    // four legs, two segments each, galloping
    for (const [hx, hy, off] of [[-.3, .55, 0], [-.24, .55, .12], [.26, .53, .5], [.2, .53, .62]]) {
      const ps = ph + off * 6.2832, th = .55 * Math.sin(ps), kx = hx + .25 * Math.sin(th), ky = hy - .25 * Math.cos(th);
      const th2 = th - 1.1 * Math.max(0, Math.cos(ps));
      S.push([hx, hy + dy, kx, ky + dy, .065]); S.push([kx, ky + dy, kx + .27 * Math.sin(th2), Math.max(.04, ky - .27 * Math.cos(th2)) + dy, .045]);
    }
    // rider: torso, helmet with crest, arm, short cape, leg
    const cw = .05 * Math.sin(t * 13 + k * 2);
    cap(-.05, .82, .05, 1.12, .095); cap(.09, 1.23, .09, 1.23, .085); cap(.06, 1.31, -.12, 1.34, .03);
    cap(.04, 1.04, .18, 1.04, .04); cap(-.04, 1.1, -.3, .98 + cw, .055); cap(.0, .84, .1, .62, .045);
    return { S, dy };
  },
  sdf(S, X, Y) {
    let d = 1e9;
    for (let i = 0; i < S.length; i++) {
      const s = S[i], dx = s[2] - s[0], dy = s[3] - s[1], px = X - s[0], py = Y - s[1];
      const h = Math.min(1, Math.max(0, (px * dx + py * dy) / (dx * dx + dy * dy || 1e-9))), e = Math.hypot(px - dx * h, py - dy * h) - s[4];
      if (e < d) d = e;
    }
    return d;
  },
  // one rider: M ground point, o: { k, ph, clipX, dis, opac, I }. Pass 'fill': a dithered soft solid body (riders
  // hide each other by depth); pass 'line': the bright outline, lance and eye. The distance field is memoised per pixel.
  rider(p, M, o, t, pass) {
    const G = this.palette.ghost, cam = p.cam(), sc = .95, H = 1.42 * sc, Wd = 1.95 * sc, Xo = .08 * sc;
    const ctr = [M[0] + cam.up[0] * H / 2 + cam.right[0] * Xo, M[1] + cam.up[1] * H / 2 + cam.right[1] * Xo, M[2] + cam.up[2] * H / 2 + cam.right[2] * Xo];
    const pr = p.project(ctr[0], ctr[1], ctr[2]);
    if (!pr) return;
    const ps = pr[3], hw = Math.max(Wd * .5 * ps, .5), hh = Math.max(H * .5 * ps, .5), ew = 1.15 / ps / sc, seam = 1.6 / ps / sc;
    if (pass === 'fill') {
      const x0 = Math.floor(pr[0] - hw) - 1, y0 = Math.floor(pr[1] - hh) - 1, gw = Math.ceil(hw * 2) + 3, gh = Math.ceil(hh * 2) + 3;
      o.memo = { x0, y0, gw, gh, d: new Float32Array(gw * gh).fill(NaN), sh: this.shape(o.ph, t, o.k) };
    }
    const m = o.memo, S = m.sh.S, dy = m.sh.dy, k = o.k;
    const field = (u, v) => {
      const ix = Math.floor(pr[0] + u * hw), iy = Math.floor(pr[1] - v * hh), X = (Xo + u * Wd / 2) / sc, Y = (v + 1) * H / 2 / sc;
      if (X < o.clipX) return null;
      const gx = ix - m.x0, gy = iy - m.y0, gi = gx >= 0 && gy >= 0 && gx < m.gw && gy < m.gh ? gy * m.gw + gx : -1;
      let d = gi >= 0 ? m.d[gi] : NaN;
      if (d !== d) { d = this.sdf(S, X, Y); if (gi >= 0) m.d[gi] = d; }
      if (d > ew) return null;
      if (o.dis > 0 && p.noise(X * 4.5 + k * 7.3, Y * 4.5 - t * 3) < o.dis * 1.2 - .1) return null;
      return { d, X, Y };
    };
    if (pass === 'fill') {
      // one soft solid (alpha .99, so it never becomes an outlined hard solid after the sky pass) with its own dither:
      // the body is nearly opaque so nearer riders cover farther ones, the legs fade into mist
      const bay = PXFX.bayerAt;
      p.scard(ctr[0], ctr[1], ctr[2], Wd, H, (u, v) => {
        const f = field(u, v);
        if (!f) return -1;
        if (f.d > 0) return 0;   // dark 1 px contour just outside the silhouette separates overlapping riders
        const a = o.opac * (f.Y > .55 + dy ? 1 : .3 + .7 * Math.max(0, f.Y) / .55);
        if (bay(Math.floor(pr[0] + u * hw), Math.floor(pr[1] - v * hh)) >= a) return -1;
        return .17 + (.03 + .78 * Math.min(1, f.Y / 1.2)) * (o.back ? .82 : 1);
      }, this.palette.body, { alpha: .99 });
      return;
    }
    p.card(ctr[0], ctr[1], ctr[2], Wd, H, (u, v) => {
      const f = field(u, v);
      if (!f || f.d > 0) return 0;
      if (f.X < o.clipX + seam) return 1.25;
      if (f.d > -ew) {
        // rim light only on the upper and front edges, so thin legs and overlapping riders stay readable
        if (f.Y > .5 + dy && this.sdf(S, f.X, f.Y + ew * 1.3) > 0) return f.Y > .9 + dy ? .9 : .7;
      }
      return 0;
    }, G, o.I);
    const W = (X, Y) => [M[0] + cam.right[0] * X * sc + cam.up[0] * Y * sc, M[1] + cam.right[1] * X * sc + cam.up[1] * Y * sc, M[2] + cam.right[2] * X * sc + cam.up[2] * Y * sc];
    // lance and eye (only where the body has come through the gate)
    const vis = 1 - o.dis;
    if (vis > .05) {
      const a = W(Math.max(.16, o.clipX), 1.02 + dy), b = W(.92, 1.3 + dy);
      if (o.clipX < .9) { p.line(a, b, .03, G, .45 * o.I * vis, { w1: .015, i1: .75 * o.I * vis }); p.sparkle(b[0], b[1], b[2], 1, G, 1.1 * o.I * vis); }
      if (o.clipX < .6) { const e = W(.6, .97 + dy); p.dot(e[0], e[1], e[2], G, 1.2 * o.I * vis, 1); }
    }
  },
  draw(p, t) {
    const PL = this.palette, GH = PL.ghost, HIT = this.HIT, G = this.G, b = t - HIT;
    const n = Math.round(p.param('crowd')), NR = Math.round(p.param('riders')), v = p.param('speed'), opac = p.param('opacity');
    const XF = this.front(p, n), cam = p.cam();
    // ---- caster ----
    let pose;
    if (t < .5) pose = { a: 'idle', b: 'point', k: p.easeOutBack(p.ph(t, .12, .5), 1.4) };
    else if (t < 3.1) pose = 'point';
    else pose = { a: 'point', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.1, 3.9)) };
    const fig = p.figure(-3.5, .2, { pose });
    // ---- riders' paths ----
    const L = [];
    for (let k = 0; k < NR; k++) L.push(this.lane(k, NR));
    const nearestLane = y => { let m = 1e9, ly = 0; for (const l of L) { const d = Math.abs(l.y - y); if (d < m) { m = d; ly = l.y; } } return ly; };
    // ---- the horde: hit as the front rank passes, thrown forward or aside ----
    const Rb = 4.1;
    const react = (s, a, u, pp) => {
      const ly = nearestLane(u.y), side = Math.abs(u.y - ly) > .02 ? Math.sign(u.y - ly) : (u.r2 > .5 ? 1 : -1);
      const ang = side * (.35 + .6 * u.r2), dir = [Math.cos(ang), Math.sin(ang)];
      // keep the throw inside the stage
      const pd = u.x * dir[0] + u.y * dir[1], room = -pd + Math.sqrt(Math.max(0, pd * pd - (u.x * u.x + u.y * u.y - Rb * Rb))) - .1;
      s.tdir = dir; s.walk = null; s.spear = false;
      let d, z, tilt;
      if (u.r3 > .72) {
        const T = .8 + .3 * u.r2, Hh = 1.1 + .8 * u.r1, k = pp.clamp(a / T, 0, 1);
        d = Math.min((.8 + .6 * u.r1) * pp.easeOut(k), room); z = 4 * Hh * k * (1 - k); tilt = (Math.PI / 2 + pp.TAU * (u.r1 > .5 ? 2 : 1)) * k;
      } else {
        const T = .55, D = Math.min((1.1 + 1.1 * u.r2) * 1.1, room), Hh = .35 + .5 * u.r3, k = pp.clamp(a / T, 0, 1);
        d = D * pp.easeOut(k) + (a > T ? Math.min(.15, Math.max(0, room - D)) * pp.easeOutCubic((a - T) / .35) : 0);
        z = 4 * Hh * k * (1 - k); tilt = (Math.PI / 2 + pp.TAU) * pp.easeOut(k);
      }
      d = Math.max(0, d);
      s.x += dir[0] * d; s.y += dir[1] * d; s.z = z; s.tilt = tilt;
    };
    p.crowd({
      n, seed: 11, area: this.AREA, t, hit: u => HIT + (u.x - XF) / v + u.r1 * .03, react, ramp: GH, at: [-7, 0, 0],
      fear: u => p.ph(t, .9, HIT + (u.x - XF) / v - .05) * (.4 + .4 * u.r3),
      respawn: [4.05, 4.95], clear: [3.6, 4.3], from: [1, .1],
    });
    // ---- rider states ----
    const R = L.map((l, k) => {
      const x = this.riderX(t, XF, v, l.back), y = this.laneY(l, x), xp = G[0] - .577 * (y - G[1]);
      const dis = Math.max(p.ph(x, 2.9, 4.4), p.ph(t, 2.75, 3.2) * 1.05);
      return { k, x, y, clipX: (xp - x) / .9, dis, ph: x / 2.2 * p.TAU + k * .9, back: l.back };
    });
    // ---- ground: hoof prints (dark) and mist (soft solids) before the abyss ----
    const fadeG = 1 - p.ph(t, 3.7, 4.4);
    if (fadeG > 0) for (const r of R) {
      const l = L[r.k];
      for (let j = 0; j < 22; j++) {
        const xj = G[0] + .6 + j * .38 + (r.k % 3) * .11;
        if (xj > Math.min(r.x, 4.0)) break;
        const yj = this.laneY(l, xj) + (j % 2 ? .07 : -.07);
        p.stain(xj, yj, .12, (dx, dy, rho) => (dx * dx / .011 + dy * dy / .0055 < 1 ? 1.2 : 0), '#14201c', fadeG);
      }
    }
    const nm = Math.round(6 * p.density);
    for (const r of R) {
      const l = L[r.k];
      const np = Math.max(4, nm * 4), gap = 1.9 / np;
      for (let j = 0; j < np; j++) {
        // puff j left behind at time te (evenly spaced over the charge) while the rider is out of the gate
        const te = 1.0 + j * gap + p.r(r.k * 50 + j, 1) * gap * .4, life = p.ph(t, te, te + .7 + .25 * p.r(j, 2));
        if (t < te || life >= 1) continue;
        const xe = this.riderX(te, XF, v, l.back) - .45, ye = this.laneY(l, xe + .45), xg = G[0] - .577 * (ye - G[1]);
        if (xe < xg + .1 || xe > 4.6) continue;
        const big = p.ph(xe, 2.9, 4.2);
        p.ball(xe - .3 - life * .2, ye + (p.r(j, 3) - .5) * .35, .08 + .12 * p.r(j, 4) + life * .2 + big * .4, (.1 + .16 * life) * (1 + 1.5 * big), PL.mist, { alpha: .5 * (1 - life), rough: .5, shadow: false, seed: j + r.k * 9 });
      }
    }
    // low mist left lying along the lanes after the charge
    const lin = p.ph(t, 1.6, 2.4) * (1 - p.ph(t, 3.4, 4.3));
    if (lin > 0) for (const r of R) for (let j = 0; j < 3; j++) {
      const k = r.k * 7 + j, xj = -2.6 + 6 * p.r(k, 31);
      if (xj > r.x - .8) continue;
      const yj = this.laneY(L[r.k], xj) + (p.r(k, 32) - .5) * .9, bob = .03 * Math.sin(t * 2 + k);
      p.ball(xj + (t - 2) * .15, yj, .05 + bob, .18 + .25 * p.r(k, 33), PL.mist, { alpha: (.2 + .2 * p.r(k, 34)) * lin, rough: .6, shadow: false, seed: k + 40 });
    }
    // mist rolling out of the gate's foot
    const gate = p.easeOutBack(p.ph(t, .3, .85), 1.5) * (1 - p.easeInCubic(p.ph(t, 2.7, 3.2)));
    if (gate > .02) {
      const ng = Math.round(6 * p.density);
      for (let j = 0; j < ng; j++) {
        const ph = (t * .6 + p.r(j, 11)) % 1, s = (p.r(j, 12) - .5) * 1.8;
        p.ball(G[0] + .2 + ph * 1.1 + G[1] * 0 + this.GH[0] * s, G[1] + this.GH[1] * s, .12 + ph * .15, (.18 + .25 * ph) * gate, PL.mist, { alpha: .55 * (1 - ph) * gate, rough: .5, shadow: false, seed: j + 70 });
      }
    }
    // ---- the world turns to a green abyss ----
    const dom = t < 2 ? p.easeOutCubic(p.ph(t, .2, .9)) : 1 - p.ph(t, 3.3, 4.1);
    if (dom > .01) p.domain({ amt: dom, c: [G[0], G[1], G[2]], sky: 'abyss', ground: ['#0e1a1a', '#142424', '#1b302e', '#243c3a'], solids: .1, t });
    // ---- the gate ----
    if (gate > .02) {
      const Sg = this.GR * 1.15 * gate, H2 = this.GH, rot = t * .5, flick = t > 2.7 ? (Math.floor(t * 30) % 2 ? .6 : 1) : 1;
      const corner = (a, c) => [G[0] + H2[0] * a * Sg, G[1] + H2[1] * a * Sg, G[2] + c * Sg];
      const runes = p.ph(t, .55, .95), memb = p.ph(t, .65, 1.0);
      p.lquad(corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1), (u, w) => {
        const X = (u * 2 - 1) * 1.15, Y = (w * 2 - 1) * 1.15, rho = Math.hypot(X, Y), ang = Math.atan2(Y, X);
        if (rho > 1.04) return 0;
        if (rho > .965) return 1.05;
        if (rho > .92) return 0;
        if (rho > .8) {
          const a = ((ang + rot) / p.TAU % 1 + 1) % 1, cell = a * 16;
          return runes > 0 && (Math.floor(cell) / 16) < runes && p.rune(cell % 1, (rho - .8) / .12, Math.floor(cell) + 5) ? .8 : 0;
        }
        if (rho > .76) return .85;
        const sw = ((ang / Math.PI + rho * 1.6 - t * .9) % 1 + 1) % 1;
        return memb * (p.band(sw, .5, .14) * .55 + (rho < .25 ? .3 * (1 - rho / .25) : 0));
      }, GH, 1.1 * flick);
      p.light(G[0] + .6, G[1], 0, 2.2 * gate, GH, .7 * gate);
    }
    // charge: motes into the pointing hand while the gate opens
    if (t > .25 && t < 1.05) {
      const u = p.ph(t, .25, 1.0);
      p.charge(fig.hand[0], fig.hand[1], fig.hand[2], u, { n: 12, R: .9, ramp: GH, up: .2 });
      p.glow(fig.hand[0], fig.hand[1], fig.hand[2], .12 + .15 * u, GH, .8 * (t < 1 ? u : 1 - p.ph(t, 1, 1.05)));
    }
    // ---- riders: trails, glow, silhouettes ----
    const live = R.filter(r => r.clipX <= 1.1 && r.dis < 1), opts = {};
    for (const r of live) { opts[r.k] = { k: r.k, ph: r.ph, clipX: r.clipX, dis: r.dis, opac, back: r.back, I: (.95 + .1 * Math.sin(t * 23 + r.k)) * (r.back ? .85 : 1) }; this.rider(p, [r.x, r.y, 0], opts[r.k], t, 'fill'); }
    for (const r of live) {
      const M = [r.x, r.y, 0], vis = (1 - r.dis) * p.ph(-r.clipX, -1.1, -.3) ;
      if (vis > .02) {
        const tl = 1.4 + .3 * p.r(r.k, 5);
        // thin speed streaks behind the horse (the mist puffs carry the trail)
        p.line([r.x - .8, r.y, .66], [r.x - .8 - tl, r.y, .7], .05, GH, .45 * vis, { w1: .02, i1: 0 });
      }
      this.rider(p, M, opts[r.k], t, 'line');
      // fresh glowing hoof prints right behind it
      for (let j = 0; j < 22; j++) {
        const xj = G[0] + .6 + j * .38 + (r.k % 3) * .11;
        if (xj > Math.min(r.x, 4.0)) break;
        const age = (r.x - xj) / v;
        if (age > .9) continue;
        const yj = this.laneY(L[r.k], xj) + (j % 2 ? .07 : -.07);
        p.dot(xj, yj, .01, GH, .8 * (1 - age / .9), 1);
      }
    }
    // ---- impact at the horde's front line ----
    if (b >= 0 && b < .03 + 1 / 30) p.impactFrame({ ink: '#06140f', paper: '#effff8', accent: '#7ff0c8' });
    if (b >= 0 && b < .6) {
      const u = p.ph(b, 0, .5);
      p.shock(XF + .3, 0, .05, u, { R: 2.6, w: .3, ramp: GH, light: false });
      if (b < .25) {
        p.glow(XF + .2, 0, .5, 1.3, GH, .7 * Math.pow(1 - b / .25, 2));
        // horizontal speed lines ahead of the charge
        const ns = Math.round(14 * Math.min(1.5, p.density));
        for (let j = 0; j < ns; j++) {
          const y = -2.2 + 4.4 * p.r(j, 41), z = .2 + 1.2 * p.r(j, 42), x0 = XF + .4 + 2.2 * p.r(j, 43) + b * 6;
          p.line([x0, y, z], [x0 + .8 + .8 * p.r(j, 44), y, z], .04, GH, .9 * (1 - b / .25), { w1: .01, i1: .1 });
        }
      }
      const nd = Math.round(10 * p.density);
      for (let j = 0; j < nd; j++) {
        const y = -2.1 + 4.2 * (j + .5) / nd, lf = p.ph(b, 0, .6);
        p.ball(XF + .1 + p.drag(1.5, 4, b), y, .1 + .3 * lf, .14 + .2 * lf, PL.mist, { alpha: .7 * (1 - lf), rough: .5, shadow: false, seed: j + 90 });
      }
      p.light(XF + 1, 0, 0, 3.4, GH, .9 * Math.pow(1 - u, 2));
    }
  },
});
