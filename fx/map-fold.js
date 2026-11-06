// 摺地 / Map Fold — Twist pack (original design): the battlefield turns out to be a paper map; the caster folds it in half along a glowing crease and the half carrying the army swings over and slaps down on the other half
PXFX.define({
  id: 'map-fold',
  loop: 6,
  beats: [{ t: .55, kind: 'cast', power: .45 }, { t: 1.8, kind: 'cast', power: .8 }, { t: 2.55, kind: 'hit', power: 1.45 }],
  view: { r: 5.5, h: 3.5 },
  stage: { ground: 'void', r: 5.7 },
  modules: ['figure', 'crowd', 'troops', 'tally', 'impact'],
  palette: {
    // paper, map ink and imprint in one solid ramp (index order matches the ground pass)
    paper: ['#4a3a32', '#5a1618', '#8a2622', '#6d8a8a', '#b39a72', '#c9b088', '#dcc59c', '#ead8b0', '#f5e9c9'],
    crease: ['#c0743a', '#e8a048', '#ffd070', '#fff2c8', '#ffffff'],
    dust: ['#5e5450', '#857a70', '#ab9f8c', '#d2c7b0'],
  },
  timeline: [
    { k: 'pose', t: [0, .55], zh: '起手：施法者（縮放 0.85）站在 x = −4.3 的虛空島邊，腳下不在地圖上；戰場是一張 7.6 × 7.8 的羊皮紙地圖（方格線每 1 單位、等高線、河流、指南針），千人大軍（預設 1000 人鶴翼陣，兩翼指向施法者，中心 (1.0, 0)、半深 2.8、半寬 2.6）站在地圖上', en: 'pose: the caster (scale 0.85) stands at x = −4.3 on the void island, off the map; the battlefield is a 7.6 × 7.8 parchment map (grid every 1 unit, contour lines, a river, a compass rose) with an army of 1000 on it (default crescent, horns towards the caster, centre (1.0, 0), half depth 2.8, half width 2.6)' },
    { k: 'charge', t: [.55, 1.8], zh: '集氣：施法者升空到高 1 以上（高度按摺痕自動算到翻起的半張紙碰不到），雙手向前；0.55–1.05 秒一道金白色摺痕由地圖一端畫到另一端（預設 x = 0.1，與 y 軸平行，旋轉 = angle），兩旁 ±0.2 印上兩條墨色虛線，標出夾縫；1.1–1.65 秒遠端紙角先向上捲起約 30°，露出下面的虛空，敵兵站不穩發抖', en: 'charge: the caster levitates to at least 1 unit (the hover height is computed so the swinging half can never reach them) and reaches forward; at 0.55–1.05 s a gold-white crease traces from one end of the map to the other (default x = 0.1, parallel to the y axis, rotated by angle) and two dashed ink lines are printed at ±0.2 beside it (the gap); at 1.1–1.65 s the far edge curls up about 30° showing the void underneath, and the soldiers wobble' },
    { k: 'shape', t: [1.8, 2.0], zh: '成形：1.8 秒施法者向後一拉，一條光線由手連到遠端紙邊，帶著整支大軍的半張地圖開始以摺痕為軸翻起', en: 'shape: at 1.8 s the caster yanks back, a light thread joins the hand to the far paper edge, and the half of the map carrying the army starts to swing up about the crease' },
    { k: 'motion', t: [1.8, 2.55], zh: '推進：翻起角度 = π × 進度^2.3（越翻越快），每條紙帶比摺痕近的一條慢 0.03 秒／單位，紙面像鞭子一樣彎著甩過頭頂；敵兵貼著紙面一起翻起（站姿垂直於紙面），過了約 40° 後轉到紙的背面', en: 'motion: the fold angle = π × progress^2.3 (faster and faster); each strip of paper lags the one nearer the crease by 0.03 s per unit, so the sheet whips over in a curve; the soldiers ride the sheet standing normal to it and pass out of sight behind it after about 40°' },
    { k: 'impact', t: [2.55, 2.75], zh: '命中：2.55 秒紙面拍落，1 格紙白／墨黑衝擊格＋頓幀＋震屏，拍落由摺痕向外掃，紙邊噴出約 40 團紙塵。判定：s = 到摺痕的有號距離（軍隊那邊為正）；|s| ≤ 0.2 的敵兵站在摺縫裡倖存；s > 0.2 且站在地圖上的被夾在兩半之間；s < −0.2 的只有在其鏡像點落在翻起那半張地圖上時才被壓到；命中時間 = 2.55 + 0.03 × |s|', en: 'impact: the sheet slaps down at 2.55 s with one paper-white / ink impact frame, a hit-stop and shake; the slap runs out from the crease and about 40 puffs of paper dust burst from the edge. Rule: s = signed distance to the crease (positive on the army side); soldiers with |s| ≤ 0.2 sit in the fold’s gap and survive; s > 0.2 on the map are sandwiched between the halves; s < −0.2 die only if their mirror point lies on the half that folds over; hit time = 2.55 + 0.03 × |s|' },
    { k: 'after', t: [2.75, 6], zh: '餘波：摺好的地圖露出紙背，摺痕處拱起一道縫；3.45–4.25 秒地圖由遠端先打開，兩半各留下深紅色的壓痕，左右鏡像對稱（像墨跡測驗），夾縫裡的倖存者仍站著發抖；計數 4.25–4.55 秒淡出，壓痕與摺線 4.6–5.4 秒褪去，施法者 4.4–5.3 秒落回地面，新一批敵兵 4.75–5.75 秒原地淡入', en: 'aftermath: the folded map shows its back with an arch along the crease; at 3.45–4.25 s it opens again far edge first, and both halves carry a dark red imprint, mirrored left and right like an ink blot test, while the survivors in the gap still stand and tremble; the counter fades at 4.25–4.55 s, the imprint and the fold line fade at 4.6–5.4 s, the caster lands at 4.4–5.3 s and a fresh army fades in on its spots at 4.75–5.75 s' },
  ],
  layers: [
    { zh: '地圖：舞台地面用虛空島（深紫），上面每格自行畫一張羊皮紙地圖（x −3.7…3.9、y −3.9…3.9）：4 階紙色抖色、每 1 單位一條方格線、等高線、一條青灰色河流、指南針、雙線邊框；未翻起的半張畫成地面（受陰影），翻起的半張用實心紙帶（10 × 24 段）畫，正面是地圖、背面是素紙加透過來的方格，翻起時在地上投下影子（7 × 8 個陰影點）', en: 'map: the stage ground is the void island (dark violet); each frame paints a parchment map over it (x −3.7…3.9, y −3.9…3.9): four dithered paper tones, a grid line every 1 unit, contour lines, a grey-teal river, a compass rose and a double border; the half that stays is painted as ground (it takes shadows), the swinging half is a solid paper strip mesh (10 × 24 segments) showing the map on the front and plain paper with the grid showing through on the back, and casting a shadow on the ground while lifted (7 × 8 shadow blobs)' },
    { zh: '判定與倖存者：摺痕是過 (crease, 0) 、方向旋轉 angle 度的直線；|s| ≤ 0.2 的倖存（夾縫）；軍隊那半張地圖上的全部被夾死；另一半只有鏡像點落在翻起那半的才被壓死；站在地圖外的也倖存。預設鶴翼最靠近摺痕的兩翼尖端 s ≈ 0.27，所以全滅；方陣、縱隊等會在摺痕上留下一行站著的倖存者', en: 'rule and survivors: the crease is the line through (crease, 0) rotated by angle degrees; |s| ≤ 0.2 survives (the gap); everyone on the army half of the map is sandwiched; on the other half only soldiers whose mirror point lies on the folding half are crushed; soldiers off the map also survive. The default crescent’s horn tips sit at s ≈ 0.27, so it is wiped out; a block or column leaves a line of survivors standing on the crease' },
    { zh: '紙面彎曲：每條紙帶的角度 θ(σ, t) = 翻摺曲線(t − 0.03σ)，σ 為到摺痕的紙長；位置由角度沿紙長積分（紙長不變），摺到底時摺痕處加 0.2 高的拱形縫；落地後遠端反彈一下', en: 'paper bend: each strip’s angle θ(σ, t) = fold curve(t − 0.03σ), σ = paper length from the crease; positions integrate the angle along the paper (length preserved); at full fold an arch 0.2 high is added over the crease (the gap); the far part bounces once after landing' },
    { zh: '大軍與計數：敵兵數量 500–2000（預設 1000），按陣型排列，像素小兵；在翻起的紙上時站姿跟紙面法線，被夾後隱藏，打開後只剩壓痕；角落 3×5 像素字擊殺計數隨拍落由摺痕向外累加，全滅變金色', en: 'army and counter: 500–2000 soldiers (default 1000) in the chosen formation as pixel soldiers; on the swinging paper they stand along the paper normal, are hidden once sandwiched and leave only the imprint when it opens; the 3×5 pixel kill counter climbs as the slap runs out from the crease and turns gold on a full wipe' },
    { zh: '壓痕：每個被壓死的敵兵在自己的位置和摺痕另一邊的鏡像位置各印一個深紅墨點（半徑 = 兵距的一半，0.045–0.12），整支大軍變成左右對稱的墨跡圖；用每格隨機門檻抖色褪去', en: 'imprint: every crushed soldier stamps a dark red blot at its spot and at its mirror across the crease (radius half the spacing, 0.045–0.12), so the army becomes a symmetric ink-blot picture; it fades through a per-cell random threshold' },
    { zh: '光與記號：摺痕是金白色發光線（寬 0.05，畫出時前端有亮點），拍落後變成紙上的摺線；夾縫是印在紙上 ±0.2 處的兩條墨色虛線（翻起的那半也印著），打開後倖存者正好站在兩線之間；施法者雙手發光，拉扯時一條拱形光線連到遠端紙邊，紙邊同時亮起', en: 'light and marks: the crease is a gold-white glowing line (0.05 wide, drawn with a bright head) that becomes a printed fold line after the slap; the gap is two dashed ink lines printed at ±0.2 (on the swinging half too), so after the unfold the survivors stand right between them; the caster’s hands glow and during the pull an arched thread of light joins them to the far paper edge, which lights up too' },
    { zh: '拍落：衝擊格、震屏、沿落地紙邊約 40 團淺褐紙塵向外噴出並上升淡出', en: 'slap: impact frame, screen shake and about 40 puffs of pale brown paper dust bursting outwards along the landing edge, rising and fading' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 5, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    crease: { zh: '摺痕位置', en: 'crease position', min: 0, max: 2.4, step: .05, value: .1 },
    angle: { zh: '摺痕角度', en: 'crease angle', min: -30, max: 30, step: 1, value: 0 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  SHEET: [-3.7, 3.9, -3.9, 3.9],   // x0, x1, y0, y1
  GAP: .2, LAG: .03,
  TRACE: [.55, 1.05], PEEL: [1.1, 1.65], CAST: 1.8, SLAP: 2.55, UNF: [3.45, 4.25],
  NIGHT: [26, 24, 44],
  // ---- geometry of the crease (cached per knob values) ----
  geo(c, deg) {
    const key = c + '|' + deg;
    if (this._g && this._g.key === key) return this._g;
    const [X0, X1, Y0, Y1] = this.SHEET, f = deg * Math.PI / 180, nx = Math.cos(f), ny = Math.sin(f);
    const g = { key, cx: c, cy: 0, nx, ny, dx: -ny, dy: nx };
    const corners = [[X0, Y0], [X1, Y0], [X1, Y1], [X0, Y1]];
    let Lm = 0, w0 = 1e9, w1 = -1e9;
    for (const [x, y] of corners) {
      const s = (x - c) * nx + y * ny, w = (x - c) * g.dx + y * g.dy;
      Lm = Math.max(Lm, s); w0 = Math.min(w0, w); w1 = Math.max(w1, w);
    }
    g.Lm = Math.max(.5, Lm); g.w0 = w0; g.w1 = w1;
    // flap extent along the normal at a given w (ray from the crease into the sheet)
    g.end = w => {
      const ox = c + w * g.dx, oy = w * g.dy;
      if (ox < X0 - 1e-6 || ox > X1 + 1e-6 || oy < Y0 - 1e-6 || oy > Y1 + 1e-6) {
        // the crease point is outside the sheet: enter first
        let t0 = 0, t1 = 1e9;
        for (const [o, d, lo, hi] of [[ox, nx, X0, X1], [oy, ny, Y0, Y1]]) {
          if (Math.abs(d) < 1e-9) { if (o < lo || o > hi) return 0; continue; }
          let a = (lo - o) / d, b = (hi - o) / d; if (a > b) [a, b] = [b, a];
          t0 = Math.max(t0, a); t1 = Math.min(t1, b);
        }
        return t1 > t0 ? t1 : 0;
      }
      let tE = 1e9;
      if (nx > 1e-9) tE = Math.min(tE, (X1 - ox) / nx); else if (nx < -1e-9) tE = Math.min(tE, (X0 - ox) / nx);
      if (ny > 1e-9) tE = Math.min(tE, (Y1 - oy) / ny); else if (ny < -1e-9) tE = Math.min(tE, (Y0 - oy) / ny);
      return Math.max(0, tE);
    };
    // hover height: the swinging half (radius = its extent) must pass clear of the caster's body
    const [qx, qy] = this.CASTER, sc = (qx - c) * nx + qy * ny, wc = (qx - c) * g.dx + qy * g.dy;
    let L = 0;
    for (let k = -3; k <= 3; k++) L = Math.max(L, g.end(wc + k * .12));
    g.hover = Math.max(1.05, Math.sqrt(Math.max(0, (L + .45) ** 2 - sc * sc)));
    this._g = g;
    return g;
  },
  // world-space paper texture: tone + map marks, cached once
  tex() {
    if (this._tex) return this._tex;
    const [X0, X1, Y0, Y1] = this.SHEET, R = .03, nx = Math.ceil((X1 - X0) / R) + 2, ny = Math.ceil((Y1 - Y0) / R) + 2;
    const tone = new Float32Array(nx * ny), flag = new Uint8Array(nx * ny), H = PXFX.hash, N = PXFX.noise, F = PXFX.fbm;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const x = X0 + (i - .5) * R, y = Y0 + (j - .5) * R, k = j * nx + i;
      const e = Math.min(x - X0, X1 - x, y - Y0, Y1 - y);
      tone[k] = .55 + (F(x * .5 + 3, y * .5 - 1, 3) - .5) * 1.1 + (H(Math.floor(x * 11), Math.floor(y * 11)) - .5) * .14 - .45 * (1 - Math.min(1, Math.max(0, e) / .6));
      // contour lines of a low hill field
      const v = F(x * .28 + 7.3, y * .28 - 2.1, 3), fr = (v * 7) % 1;
      if (v > .5 && (fr < .055 || fr > .985)) flag[k] = 1;
      // a river winding across the map
      const ry = 2.5 * Math.sin(x * .42 + .6) - 1.0 + .45 * Math.sin(x * 1.35 + 2) + (N(x * 1.7, 3.3) - .5) * .3;
      if (Math.abs(y - ry) < .05 + .02 * Math.sin(x * 3)) flag[k] = 2;
      // compass rose near the far corner of the near half
      const cx = x + 2.55, cy = y - 2.75, rho = Math.hypot(cx, cy), ang = Math.atan2(cy, cx);
      const star = .52 * (.22 + .78 * Math.pow(Math.abs(Math.cos(ang * 2)), 6)) * (Math.abs(Math.cos(ang * 2)) > .7 ? 1 : .6);
      if (rho < star && rho > .03) flag[k] = 3;
      if (Math.abs(rho - .3) < .025) flag[k] = 3;
    }
    this._tex = { R, nx, ny, tone, flag, X0, Y0 };
    return this._tex;
  },
  cols(night) {
    const key = night ? 'n' : 'd';
    this._cols = this._cols || {};
    if (this._cols[key]) return this._cols[key];
    const conv = h => { let c = PXFX.hex(h); if (night) c = c.map((v, i) => v * .52 * .8 + this.NIGHT[i] * .2); return c; };
    const hexs = this.palette.paper.map(h => PXFX.toHex(conv(h)));
    this._cols[key] = { u32: hexs.map(h => { const c = PXFX.hex(h); return PXFX.rgb(c[0], c[1], c[2]); }), ramp: hexs };
    return this._cols[key];
  },
  // palette index of the paper at a flat point (0 ink, 1 imprint dark, 2 imprint, 3 river, 4 line, 5–8 paper tones)
  paperIdx(x, y, hp, b, dith, st, back) {
    const [X0, X1, Y0, Y1] = this.SHEET, e = Math.min(x - X0, X1 - x, y - Y0, Y1 - y);
    if (e < hp * 1.4) return 4;
    const T = this._tex, ti = Math.min(T.nx - 1, Math.max(0, Math.floor((x - T.X0) / T.R + .5))), tj = Math.min(T.ny - 1, Math.max(0, Math.floor((y - T.Y0) / T.R + .5)));
    const k = tj * T.nx + ti, tone = T.tone[k] + st.shade;
    const lv = Math.max(0, Math.min(3, Math.floor(tone * 3 + (b - .5) * dith))) + 5;
    if (back) {
      // plain paper back; the grid shows through faintly
      const gx = Math.abs(x - Math.round(x)), gy = Math.abs(y - Math.round(y));
      return (gx < hp || gy < hp) && e > .3 ? Math.max(4, lv - 1) : Math.max(4, lv - 1 + (lv > 6 ? 0 : 1) - 1);
    }
    if (st.imp) {
      const g = st.imp, a = Math.floor((x - g.x0) / g.res), c = Math.floor((y - g.y0) / g.res);
      if (a >= 0 && c >= 0 && a < g.nx && c < g.ny) {
        const v = g.v[c * g.nx + a];
        if (v && g.thr[c * g.nx + a] >= st.impFade) return v === 2 ? 2 : 1;
      }
    }
    if (st.crease > 0 && Math.abs(st.s) < hp * .9 && b < st.crease) return 4;
    if (st.band > 0 && Math.abs(Math.abs(st.s) - this.GAP) < hp * .85 && (st.w / .28 - Math.floor(st.w / .28)) < .55 && b < st.band) return 0;
    if (Math.abs(e - .17) < hp) return 0;
    if (Math.abs(e - .27) < hp * .7) return 4;
    const fl = T.flag[k];
    if (fl === 2) return 3;
    if (fl === 3) return e > .3 ? 0 : lv;
    if (e > .3 && (Math.abs(x - Math.round(x)) < hp || Math.abs(y - Math.round(y)) < hp)) return 4;
    if (fl === 1) return lv > 5 ? lv - 1 : 4;
    return lv;
  },
  // fold angle of the paper strip at distance sig from the crease
  theta(sig, t, Lm) {
    const { CAST, SLAP, UNF, PEEL, LAG } = this, PI = Math.PI;
    if (t >= UNF[0] - .3) {
      const k = Math.min(1, Math.max(0, (t + .05 * sig - UNF[0]) / (UNF[1] - UNF[0])));
      return PI * (1 - k * k * (3 - 2 * k));
    }
    const tau = t - LAG * sig;
    let m = tau <= CAST ? 0 : tau >= SLAP ? PI : PI * Math.pow((tau - CAST) / (SLAP - CAST), 2.3);
    const q = sig / Lm;
    const curl = .55 * q * q * (t < PEEL[0] ? 0 : t < PEEL[1] ? Math.sin((t - PEEL[0]) / (PEEL[1] - PEEL[0]) * PI / 2) : Math.max(0, 1 - (t - CAST) / .35));
    m += curl * (1 - m / PI);
    // a small rebound of the far part after it lands
    const a = tau - SLAP;
    if (a > 0 && a < .22) m -= .1 * q * Math.sin(a / .22 * PI);
    return m;
  },
  // the bent paper profile: per sample k, angle, offset along the normal and height
  profile(t, g) {
    const N = 24, th = new Float32Array(N + 1), h = new Float32Array(N + 1), z = new Float32Array(N + 1), ds = g.Lm / N, HB = this.GAP + .06;
    let mx = 0;
    for (let k = 0; k <= N; k++) { th[k] = this.theta(k * ds, t, g.Lm); mx = Math.max(mx, th[k]); }
    for (let k = 0; k < N; k++) {
      const a = (th[k] + th[k + 1]) / 2;
      h[k + 1] = h[k] + ds * Math.cos(a); z[k + 1] = z[k] + ds * Math.sin(a);
    }
    for (let k = 1; k <= N; k++) {
      const sig = k * ds, f = Math.max(0, Math.min(1, (th[k] - 2.2) / (Math.PI - 2.2)));
      if (sig < 2 * HB) z[k] += .2 * f * Math.sin(Math.PI * sig / (2 * HB));
      z[k] += .035 * Math.pow(Math.sin(th[k] / 2), 2);
    }
    return { N, ds, th, h, z, flat: mx < .004, mx };
  },
  at(pr, sig) {
    const u = Math.max(0, Math.min(pr.N - 1e-6, sig / pr.ds)), k = Math.floor(u), f = u - k;
    return [pr.h[k] + (pr.h[k + 1] - pr.h[k]) * f, pr.z[k] + (pr.z[k + 1] - pr.z[k]) * f, pr.th[k] + (pr.th[k + 1] - pr.th[k]) * f];
  },
  // per-unit rule (cached per layout + knobs): side, distances, hit time
  rule(units, g) {
    if (this._r && this._r.units === units && this._r.key === g.key) return this._r;
    const [X0, X1, Y0, Y1] = this.SHEET, n = units.length, on = (x, y) => x >= X0 && x <= X1 && y >= Y0 && y <= Y1;
    const kind = new Uint8Array(n), S = new Float32Array(n), Wc = new Float32Array(n), hitT = [];
    for (const u of units) {
      const s = (u.x - g.cx) * g.nx + (u.y - g.cy) * g.ny, w = (u.x - g.cx) * g.dx + (u.y - g.cy) * g.dy;
      S[u.i] = s; Wc[u.i] = w;
      let k = 0;
      if (Math.abs(s) <= this.GAP) k = 0;                                   // in the fold's gap
      else if (s > 0) k = on(u.x, u.y) ? 1 : 3;                              // rides the folding half
      else k = on(u.x - 2 * s * g.nx, u.y - 2 * s * g.ny) ? 2 : 3;          // the flap lands on it
      kind[u.i] = k;
      hitT.push({ hitT: k === 1 || k === 2 ? this.SLAP + this.LAG * Math.abs(s) : null });
    }
    // imprint: a blot at every crushed soldier and at its mirror across the crease
    const res = .035, x0 = X0 - .4, y0 = Y0 - .4, nx = Math.ceil((X1 - X0 + .8) / res), ny = Math.ceil((Y1 - Y0 + .8) / res);
    const v = new Uint8Array(nx * ny), thr = new Float32Array(nx * ny), rr = Math.max(.045, Math.min(.12, (units.spacing || .15) * .55));
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) thr[j * nx + i] = PXFX.hash(i * 1.37 + .2, j * 2.11 + .7);
    const stamp = (x, y, seed) => {
      const r = rr * (.8 + .4 * PXFX.hash(seed, 3.1)), a0 = Math.floor((x - r - x0) / res), a1 = Math.floor((x + r - x0) / res), b0 = Math.floor((y - r - y0) / res), b1 = Math.floor((y + r - y0) / res);
      for (let b = Math.max(0, b0); b <= Math.min(ny - 1, b1); b++) for (let a = Math.max(0, a0); a <= Math.min(nx - 1, a1); a++) {
        const dx = x0 + (a + .5) * res - x, dy = y0 + (b + .5) * res - y, q = (dx * dx + dy * dy) / (r * r);
        if (q > 1) continue;
        const k = b * nx + a, val = q < .45 ? 2 : 1;
        if (val > v[k]) v[k] = val;
      }
    };
    for (const u of units) {
      if (kind[u.i] !== 1 && kind[u.i] !== 2) continue;
      const s = S[u.i];
      stamp(u.x, u.y, u.i);
      stamp(u.x - 2 * s * g.nx, u.y - 2 * s * g.ny, u.i + .5);
    }
    this._r = { units, key: g.key, kind, S, Wc, hitT, imp: { v, thr, x0, y0, res, nx, ny } };
    return this._r;
  },
  draw(p, t) {
    const PL = this.palette, CR = PL.crease, { CAST, SLAP, UNF, TRACE, PEEL } = this;
    const n = Math.round(p.param('crowd')), form = PXFX.TROOPS[p.param('formation') | 0].id;
    const g = this.geo(p.param('crease'), p.param('angle'));
    const units = p.crowdLayout({ n, seed: 19, formation: form, area: this.AREA, faceTo: this.CASTER });
    const R = this.rule(units, g);
    this.tex();
    const pr = this.profile(t, g);
    const self = this, night = p.night, cols = this.cols(night);
    const impOn = t >= SLAP, impFade = p.ph(t, 4.6, 5.4), creaseVis = t >= SLAP ? 1 - p.ph(t, 4.6, 5.4) : 0;
    const bandVis = p.ph(t, TRACE[1] - .2, TRACE[1] + .15) * (1 - p.ph(t, 4.6, 5.4));
    const stBase = { imp: impOn ? R.imp : null, impFade, crease: creaseVis, band: bandVis, s: 0, w: 0, shade: 0 };
    // ---- 1. the map: paint the paper over the void island (the folding half only while it lies flat) ----
    let hp = .035;
    p.post(({ pix, W, H, kind, zb, bayer, P, Q, mode }) => {
      const pp = P(0, 0, 0);
      hp = .6 / Math.max(4, pp ? pp[3] : 15);
      const dith = mode === '2d' ? 0 : .7, [X0, X1, Y0, Y1] = self.SHEET, st = Object.assign({}, stBase);
      for (let iy = 0; iy < H; iy++) for (let ix = 0; ix < W; ix++) {
        const q = Q(ix + .5, iy + .5, 0);
        if (!q) continue;
        const x = q[0], y = q[1];
        if (x < X0 || x > X1 || y < Y0 || y > Y1) continue;
        const s = (x - g.cx) * g.nx + (y - g.cy) * g.ny;
        if (s > 0 && !pr.flat) continue;
        st.s = s; st.w = (x - g.cx) * g.dx + (y - g.cy) * g.dy;
        const i = iy * W + ix;
        pix[i] = cols.u32[self.paperIdx(x, y, hp, bayer(ix, iy), dith, st, false)]; kind[i] = 1; zb[i] = q[2];
      }
    });
    // ---- 2. caster: levitates clear of the fold, grabs, yanks, slams, opens the map ----
    const lift = g.hover * (p.easeOutCubic(p.ph(t, .3, 1.0)) - p.ease(p.ph(t, 4.4, 5.3)));
    let pose;
    if (t < .3) pose = 'idle';
    else if (t < 1.0) pose = { a: 'idle', b: 'float', k: p.easeOutCubic(p.ph(t, .3, .9)) };
    else if (t < CAST - .1) pose = { a: 'float', b: 'palm', k: p.easeOutBack(p.ph(t, 1.0, 1.35)) };
    else if (t < CAST + .3) pose = { a: 'palm', b: 'windup', k: p.easeOutCubic(p.ph(t, CAST - .1, CAST + .12)) };
    else if (t < SLAP) pose = { a: 'windup', b: 'bothUp', k: p.easeOutCubic(p.ph(t, CAST + .3, SLAP - .25)) };
    else if (t < UNF[0] - .1) pose = { a: 'bothUp', b: 'swing', k: p.easeOutExpo(p.ph(t, SLAP - .06, SLAP + .04)) };
    else if (t < 4.4) pose = { a: 'swing', b: 'spread', k: p.easeOutCubic(p.ph(t, UNF[0] - .1, UNF[0] + .4)) };
    else pose = { a: 'spread', b: 'idle', k: p.ease(p.ph(t, 4.4, 5.2)) };
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .85, lift });
    // ---- 3. the folding half: a bent solid paper sheet ----
    const fp = (w, sig) => {
      const a = this.at(pr, sig);
      return [g.cx + w * g.dx + a[0] * g.nx, g.cy + w * g.dy + a[0] * g.ny, a[1], a[2]];
    };
    const cam = p.cam(), V = p.mode === '2d' ? [0, .8, .6] : cam.fwd;
    const LL = Math.hypot(PXFX.SHADOW_X, PXFX.SHADOW_Y, 1), LV = [-PXFX.SHADOW_X / LL, -PXFX.SHADOW_Y / LL, 1 / LL];
    if (!pr.flat) {
      const M = 10, st = Object.assign({}, stBase), [X0, X1, Y0, Y1] = this.SHEET;
      // per sample: which face is seen and its light
      const face = new Int8Array(pr.N + 1), shade = new Float32Array(pr.N + 1);
      for (let k = 0; k <= pr.N; k++) {
        const s = Math.sin(pr.th[k]), c = Math.cos(pr.th[k]), N = [-s * g.nx, -s * g.ny, c];
        const front = N[0] * V[0] + N[1] * V[1] + N[2] * V[2] >= 0;
        face[k] = front ? 1 : 0;
        const l = (front ? 1 : -1) * (N[0] * LV[0] + N[1] * LV[1] + N[2] * LV[2]);
        shade[k] = (l - .6) * .55;
      }
      const ramp = cols.ramp, nR = ramp.length;
      for (let m = 0; m < M; m++) {
        const w0 = g.w0 + (g.w1 - g.w0) * m / M, w1 = g.w0 + (g.w1 - g.w0) * (m + 1) / M, L = [], Rr = [];
        for (let k = 0; k <= pr.N; k++) { const a = fp(w0, k * pr.ds), b = fp(w1, k * pr.ds); L.push([a[0], a[1], a[2]]); Rr.push([b[0], b[1], b[2]]); }
        p.sribbon(L, Rr, (u, v) => {
          const sig = u * g.Lm, w = w0 + (w1 - w0) * v, x = g.cx + w * g.dx + sig * g.nx, y = g.cy + w * g.dy + sig * g.ny;
          if (x < X0 || x > X1 || y < Y0 || y > Y1 || sig < 0) return -1;
          const k = Math.min(pr.N, Math.round(u * pr.N));
          st.s = sig; st.w = w; st.shade = shade[k];
          const idx = self.paperIdx(x, y, hp, .5, 0, st, !face[k]);
          return (idx + .5) / nR;
        }, ramp, { dz: .06 });
      }
    }
    // the lifted paper casts a shadow (blobs over the sheet, offset along the light like every solid)
    if (!pr.flat) {
      const [X0, X1, Y0, Y1] = this.SHEET, MW = 7, MS = 8;
      for (let a = 0; a < MW; a++) for (let b = 0; b < MS; b++) {
        const w = g.w0 + (g.w1 - g.w0) * (a + .5) / MW, sig = g.Lm * (b + .5) / MS, x = g.cx + w * g.dx + sig * g.nx, y = g.cy + w * g.dy + sig * g.ny;
        if (x < X0 || x > X1 || y < Y0 || y > Y1) continue;
        const q = fp(w, sig);
        if (q[2] > .12) p.shadow(q[0], q[1], q[2], Math.max(g.w1 - g.w0, 1) / MW * .62, 1);
      }
    }
    // ---- 4. the army: custom pawns that ride the folding half ----
    const vw = this.view, S0 = 240 / (2 * vw.r * 1.12) * p.v.fs, sc = p.clamp((units.spacing || .3) / .4, .08, 1.5);
    const drawer = .62 * sc * S0 < 7.5 ? p.pawnSprite : p.pawn, po = { scale: sc };
    const fear = p.env(t, 1.1, 1.7, 3.8, 4.6), RS = [4.75, 5.75], gapTh = this.at(pr, .25)[2];
    for (const u of units) {
      const k = R.kind[u.i], hit = R.hitT[u.i].hitT;
      const s = { i: u.i, vr: u.vr, x: u.x, y: u.y, z: 0, tilt: 0, tdir: [-g.nx, -g.ny], sq: 1, wide: 1, face: u.face, alpha: 1, walk: null, spear: true };
      if (hit != null) {
        if (t >= hit) {
          if (t < RS[0]) continue;
          const len = (RS[1] - RS[0]) * .55, st0 = RS[0] + u.r1 * (RS[1] - RS[0] - len);
          s.alpha = p.ph(t, st0, st0 + len);
          if (s.alpha <= 0) continue;
        } else if (k === 1) {
          const a = fp(R.Wc[u.i], R.S[u.i]);
          if (a[3] > .004) { const sn = Math.sin(a[3]) * .02; s.x = a[0] - sn * g.nx; s.y = a[1] - sn * g.ny; s.z = a[2] + .02 * Math.cos(a[3]); s.tilt = a[3]; s.spear = a[3] < .3; }
          s.jit = .012 * fear;
        } else {
          s.tilt = .25 * fear * (.6 + .4 * u.r2); s.tdir = [-g.nx, -g.ny]; s.jit = .015 * fear;
          if (t > CAST) { s.tilt = .45 * (.6 + .4 * u.r2); }
          s.flash = hit - t < .04;
        }
      } else {
        if (k === 0 && R.S[u.i] < 0 && gapTh > 2.7) continue;   // under the arch of the fold
        s.tilt = .22 * fear * (.6 + .4 * u.r2); s.tdir = [Math.sign(R.S[u.i]) * g.nx || 1, Math.sign(R.S[u.i]) * g.ny]; s.jit = .015 * fear;
      }
      drawer.call(p, s, po);
    }
    // ---- 5. slap dust along the landing edge ----
    const nD = Math.round(40 * p.density);
    for (let j = 0; j < nD; j++) {
      const w = g.w0 + (g.w1 - g.w0) * (j + .5) / nD, se = g.end(w);
      if (se < .3) continue;
      const land = SLAP + this.LAG * se + .02, a = (t - land) / (.7 + .4 * p.r(j, 3));
      if (a < 0 || a > 1) continue;
      const out = .15 + .55 * p.easeOutCubic(a) * (.6 + .6 * p.r(j, 4)), x = g.cx + w * g.dx - (se + out) * g.nx, y = g.cy + w * g.dy - (se + out) * g.ny;
      p.ball(x, y, .08 + .35 * p.easeOut(a), .1 + .2 * p.easeOutCubic(a), PL.dust, { alpha: .9 * (1 - a), rough: .5, shadow: false, seed: j });
    }
    // ---- 6. light: the crease, the gap band, the grip ----
    const wa = g.w0, wb = g.w1, cp = w => [g.cx + w * g.dx, g.cy + w * g.dy, .02];
    // clip the crease to the sheet
    let ca = wa, cb = wb;
    {
      const [X0, X1, Y0, Y1] = this.SHEET, inS = w => { const q = cp(w); return q[0] >= X0 && q[0] <= X1 && q[1] >= Y0 && q[1] <= Y1; };
      while (ca < wb && !inS(ca)) ca += .05;
      while (cb > ca && !inS(cb)) cb -= .05;
    }
    const tr = p.ph(t, TRACE[0], TRACE[1]), creaseI = t < SLAP ? (t < TRACE[1] ? 1 : .55 + .2 * Math.sin(t * 9) + .4 * p.ph(t, CAST, SLAP)) : 1 - p.ph(t, SLAP, SLAP + .35);
    if (tr > 0 && creaseI > 0) {
      const hd = ca + (cb - ca) * p.easeOutCubic(tr);
      p.line(cp(ca), cp(hd), .05, CR, Math.max(.6, creaseI));
      if (tr < 1) { const q = cp(hd); p.sparkle(q[0], q[1], .05, 3, CR, 1); p.glow(q[0], q[1], .1, .35, CR, .9); }
    }
    // hands glow; the grip thread to the far edge while pulling
    const handI = p.env(t, .9, 1.2, SLAP - .05, SLAP + .2);
    if (handI > 0) {
      for (const h of [fig.hand, fig.handL]) p.glow(h[0], h[1], h[2], .2, CR, .8 * handI);
      const grip = p.env(t, PEEL[0], PEEL[0] + .25, SLAP - .1, SLAP + .02);
      if (grip > 0) {
        const wm = Math.max(g.w0, Math.min(g.w1, 0)), e = fp(wm, g.end(wm)), hd = [(fig.hand[0] + fig.handL[0]) / 2, (fig.hand[1] + fig.handL[1]) / 2, (fig.hand[2] + fig.handL[2]) / 2], arc = [];
        for (let j = 0; j <= 14; j++) arc.push(p.arcPos(hd, [e[0], e[1], e[2]], j / 14, .9));
        p.trail(arc, .05, .04, CR, 1 * grip, .8 * grip);
        // the far edge lights up
        const pts = [];
        for (let j = 0; j <= 10; j++) { const w = g.w0 + (g.w1 - g.w0) * j / 10, q = fp(w, Math.max(0, g.end(w) - .04)); pts.push([q[0], q[1], q[2] + .03]); }
        for (let j = 0; j < 10; j++) if (g.end(g.w0 + (g.w1 - g.w0) * (j + .5) / 10) > .2) p.line(pts[j], pts[j + 1], .04, CR, .75 * grip);
      }
    }
    // ---- 7. the slap ----
    if (t >= SLAP && t - SLAP <= .021) p.impactFrame({ ink: '#2a1e1a', paper: '#f6ecd4', accent: '#c06a3a', thr: 110 });
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(R.hitT, { t, alpha: 1 - p.ph(t, 4.25, 4.55) });
  },
});
