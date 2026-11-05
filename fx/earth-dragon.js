// 地龍翻身 / Earth Dragon — Mass Spells pack (original design): a towering rock dragon breaches the ground, rears and roars, then weaves through a horde on an S path and dives back, leaving a rift
PXFX.define({
  id: 'earth-dragon',
  loop: 5,
  beats: [{ t: .5, kind: 'cast', power: .8 }, { t: 1.3, kind: 'burst', power: 1.2 }, { t: 1.56, kind: 'pulse', power: .8 }, { t: 3.0, kind: 'hit', power: 1.35 }],
  view: { r: 4.8, h: 3.8 },
  stage: { ground: 'moss' },
  modules: ['figure', 'creature', 'debris', 'crowd', 'grade', 'shockwave', 'impact', 'aftermath'],
  palette: {
    stone: ['#4a3628', '#6e523a', '#9a7a52', '#c9a46a', '#e6cc96'],
    lava: ['#9a3412', '#d0561a', '#ff8a2a', '#ffc860', '#fff0c0'],
    dust: ['#6a5a44', '#8a765a', '#a8936f', '#c6b28c'],
  },
  timeline: [
    { k: 'pose', t: [0, .5], zh: '起手：施法者（高 1.5）下蹲蓄力，0.5 秒單掌向前下方拍向地面；敵群（36 個細小敵兵，高約 0.6）在前方列陣', en: 'pose: the caster (1.5 tall) crouches and at 0.5 s slaps one palm forward and down at the ground; a horde of 36 small soldiers (~0.6 tall) stands ahead' },
    { k: 'charge', t: [.5, 1.3], zh: '集氣：三條發光熔岩裂紋（#ff8a2a）由掌前沿地面向敵群前緣竄去（0.7 秒走 1.7 單位，前端有火花）；1.0–1.3 秒地面隆起，碎石彈起，敵群後仰發抖；環境壓暗 25%', en: 'charge: three glowing lava cracks (#ff8a2a) race along the ground from the palm to the front of the horde (1.7 units in 0.7 s, a spark at each tip); at 1.0–1.3 s the ground heaves, pebbles pop up and the soldiers lean back and tremble; the world darkens 25%' },
    { k: 'shape', t: [1.3, 1.82], zh: '成形：1.3 秒巨大岩石龍在敵群前緣破土直衝而上（頓幀），0.3 秒內昇到離地 3.3–3.45（龍頭直徑約 2.2，敵兵的 3–4 倍），身體在下方形成略向前彎的石柱；1.55 秒張大口咆哮停頓 0.3 秒，口前擴散一圈衝擊環；破土處 18 塊碎石與塵土噴泉、地面衝擊環，洞口半徑 1.6 內的敵兵被向外撞飛；龍頭由頭骨、吻部、可開合下顎、兩根石角 4 塊岩石拼成，眼與口中發琥珀色光', en: 'shape: at 1.3 s a huge rock dragon bursts straight up out of the ground at the front of the horde (hit-stop) and rears to 3.3–3.45 above the ground within 0.3 s (head ~2.2 across, 3–4× a soldier) on a rock neck curving slightly forward; at 1.55 s it opens its jaw wide and roars for a 0.3 s hold with a shock ring spreading from the mouth; a fountain of 18 rocks and dust plus a ground ring at the hole, soldiers within 1.6 of the hole are thrown outwards; the head is four rocks (skull, snout, opening jaw, two stone horns) with glowing amber eyes and mouth' },
    { k: 'motion', t: [1.82, 3.0], zh: '推進：龍頭向前俯衝，沿 S 形地面軌跡（x 由 −0.75 到 3.5，振幅 1.4）穿過敵群，先俯衝到離地 1.6，中段再拱起到 2.8，再降到 1.45 後陡降鑽地；速度由每秒 5 單位加速到 12 單位；身體長 5.2，是 22 塊由大到小（半徑 0.84→0.3）的岩石，沿龍頭走過的立體軌跡（按弧長）跟隨，形成高 2.5–3.45 的拱形，地面以下的部份隱藏，接縫透出熔岩光，背上有石刺。每個敵兵在龍頭經過其最近軌跡點時中招（命中時間由俯衝曲線反推）：距軌跡 1.0 以內被拋上半空翻滾（高 0.75–2.3），2.1 以內沿軌跡法線向兩側撞飛，更遠的 0.1–0.2 秒後被震倒', en: 'motion: the head plunges forward along an S-shaped ground track (x −0.75 → 3.5, amplitude 1.4) through the horde, swooping down to 1.6 above the ground, arching up to 2.8 mid-way, dropping to 1.45 and then diving steeply, accelerating from 5 to 12 units/s; the body (5.2 long) is 22 rocks shrinking from radius 0.84 to 0.3 that follow the head’s 3D trail by arc length, forming an arch 2.5–3.45 high, hidden below the ground, with lava light in the joints and stone spines on the back. Each soldier is hit when the head passes its nearest track point (hit time inverted from the plunge curve): within 1.0 of the track it is launched tumbling 0.75–2.3 high, within 2.1 it is knocked sideways along the track normal, further out it topples from the quake 0.1–0.2 s later' },
    { k: 'impact', t: [3.0, 3.6], zh: '命中：3.0 秒龍頭在遠端鑽回地底：1 格衝擊格＋頓幀，16 塊碎石與塵土向上炸開，地面衝擊環半徑 1.8；身體以每秒 12 單位一節節沒入地下（約 0.45 秒）', en: 'impact: at 3.0 s the head dives back into the ground at the far side: one two-tone impact frame and a hit-stop, 16 rocks and a burst of dust blast upwards, a ground ring of radius 1.8; the body slides under segment by segment at 12 units/s (~0.45 s)' },
    { k: 'after', t: [3.6, 5], zh: '餘波：沿路線留下一道深色裂谷，谷底熔岩光慢慢冷卻，兩個破土洞口的塵土落定，敵兵屍體淡出，新一批敵兵由右邊走回原位', en: 'aftermath: a dark rift stays along the path with cooling lava light at its bottom, the dust at both holes settles, the bodies fade and a fresh horde walks in from the right back to its spots' },
  ],
  layers: [
    { zh: '施法者：無臉人偶，姿勢 待機→下蹲蓄力→單掌拍地（身體前傾 0.5）→待機', en: 'caster: faceless mannequin, poses idle → crouched charge → one palm slapping the ground (lean 0.5) → idle' },
    { zh: '敵群：30–60 個細小敵兵，均勻但不規則地分佈在中心 x = 1.2、半徑 2.4×2.1 的橢圓內', en: 'horde: 30–60 small soldiers spread evenly but irregularly in a 2.4×2.1 ellipse centred at x = 1.2' },
    { zh: '岩石龍的軌跡：洞口下方一段石柱（由地下 4 單位升到離地 3.3，頂端向前彎 0.55），接上 S 形段（y = 振幅 × sin(2π q)，高度關鍵格 3.3 → 3.45 → 1.6 → 2.8 → 1.45 → 0，最後陡降鑽地）；預先按弧長取樣，龍頭與身體都按弧長放置，身體不會擠在一起', en: 'rock dragon trail: a column under the hole (from 4 below the ground up to 3.3 above it, bending 0.55 forward at the top) that runs into the S section (y = amplitude × sin(2π q), height keys 3.3 → 3.45 → 1.6 → 2.8 → 1.45 → 0, then a steep dive); sampled by arc length so the head and every body rock are placed by arc length and the body never bunches up' },
    { zh: '岩石：龍頭與每塊身體岩石都是低多邊形實心岩塊（沙褐色 5 階 #4a3628→#e6cc96），只畫地面以上的部份；接縫、龍眼與口中用熔岩色發光（#9a3412→#fff0c0），地面受光', en: 'rocks: the head and every body rock are low-poly solid rocks (5-step sand-brown #4a3628 → #e6cc96), only the parts above the ground are drawn; the joints, eyes and mouth glow in a lava ramp (#9a3412 → #fff0c0) and light the ground' },
    { zh: '破土：兩個洞口各有深色坑洞貼花、熔岩光邊；身體穿過地面時持續冒出粗糙抖色塵土球，破土時塵土與碎石向上噴成噴泉', en: 'surface breaks: each hole has a dark crater stain and a glowing lava rim; dithered rough dust balls keep billowing while the body passes through the ground, and a fountain of dust and rocks shoots up at the breach' },
    { zh: '群眾反應：拋飛 = 拋物線升空＋1–2 圈翻滾＋落地躺下；撞飛 = 沿軌跡法線方向橫飛翻倒；震倒 = 原地倒下；命中瞬間閃白 2 格', en: 'crowd reaction: launched = parabolic flight with 1–2 tumbles, then lying down; knocked = thrown sideways along the track normal and toppling; quake = toppling on the spot; a white flash for 2 frames on the hit' },
    { zh: '裂谷：龍頭經過後沿地面軌跡撕開一道寬約 0.3（帶噪聲寬窄變化）的深色裂谷，谷底熔岩光 1.5 秒內冷卻，1 秒後淡出', en: 'rift: once the head has passed, a ~0.3-wide (noisy) dark rift tears open along the ground track with lava light at the bottom that cools within 1.5 s, then fades' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'horde size', min: 10, max: 60, step: 1, value: 36 },
    size: { zh: '巨龍大小', en: 'dragon size', min: .8, max: 1.8, step: .05, value: 1.35 },
    width: { zh: 'S 形振幅', en: 'path width (S amplitude)', min: .5, max: 2, step: .05, value: 1.4 },
    launch: { zh: '拋飛高度', en: 'launch height', min: .6, max: 1.6, step: .05, value: 1 },
  },
  T_E: 1.3, T_P: 1.82, T_D: 3.0, XE: -1.3, XD: 3.5, LEAN: .55, NSEG: 22,
  // height of the S section, q = 0 (top of the rear) ... 1 (dive), before scaling
  zS(q) {
    const K = [[0, 3.3], [.07, 3.45], [.32, 1.6], [.6, 2.8], [.86, 1.45]];
    if (q >= .86) return 1.45 * (1 - Math.pow((q - .86) / .14, 1.6));
    for (let k = 0; k < K.length - 1; k++) if (q <= K[k + 1][0]) {
      const f = (q - K[k][0]) / (K[k + 1][0] - K[k][0]);
      return K[k][1] + (K[k + 1][1] - K[k][1]) * (.5 - .5 * Math.cos(Math.PI * f));
    }
    return 1.45;
  },
  // the dragon's 3D trail, sampled by arc length (cached per amplitude + size)
  // w < 0: vertical column under the hole, 0..1: the S section, > 1: underground after the dive
  path(A, sz) {
    const key = A + '|' + sz;
    if (this._path && this._path.key === key) return this._path;
    const XE = this.XE, XS = XE + this.LEAN, SP = this.XD - XS, zs = .7 + .3 * sz / 1.35, ZA = 3.3 * zs, LC = ZA + 4;
    const at = w => {
      if (w < 0) { const z = ZA + w * LC; return [XE + this.LEAN * Math.pow(Math.max(0, z / ZA), 2), 0, z]; }
      if (w <= 1) return [XS + SP * w, A * Math.sin(Math.PI * 2 * w), this.zS(w) * zs];
      return [XS + SP * w, A * Math.sin(Math.PI * 2 * w), -(w - 1) * 14.8 * zs];
    };
    const N = 360, W0 = -1, W1 = 1.6, pts = [], sig = [];
    let acc = 0;
    for (let k = 0; k <= N; k++) {
      const w = W0 + (W1 - W0) * k / N, P = at(w);
      if (k) acc += Math.hypot(P[0] - pts[k - 1][0], P[1] - pts[k - 1][1], P[2] - pts[k - 1][2]);
      pts.push(P); sig.push(acc);
    }
    const sigOfW = w => { const f = (w - W0) / (W1 - W0) * N, i = Math.max(0, Math.min(N - 1, Math.floor(f))), r = f - i; return sig[i] + (sig[i + 1] - sig[i]) * r; };
    const pos = s => {
      if (s <= 0) return [pts[0][0], pts[0][1], pts[0][2] + s];
      if (s >= acc) { const a = pts[N - 1], b = pts[N], l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) || 1, e = s - acc; return [b[0] + (b[0] - a[0]) / l * e, b[1] + (b[1] - a[1]) / l * e, b[2] + (b[2] - a[2]) / l * e]; }
      let lo = 0, hi = N;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (sig[m] <= s) lo = m; else hi = m; }
      const f = (s - sig[lo]) / (sig[hi] - sig[lo] || 1), a = pts[lo], b = pts[hi];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    };
    this._path = { key, pos, sigOfW, sE: sigOfW(-ZA / LC), sA: sigOfW(0), sD: sigOfW(1), ZA, zs };
    return this._path;
  },
  // head position on the trail (arc length) at time t: breach, roar hold, accelerating plunge, dive
  sigH(P, t) {
    const T_E = this.T_E, T_P = this.T_P, T_D = this.T_D, s0 = P.sA + .1, span = P.sD - s0;
    if (t < T_E - .1) return P.sE - 3;
    if (t < T_E + .22) { const u = (t - (T_E - .1)) / .32; return P.sE - 1 + (P.sA - .2 - P.sE + 1) * (1 - Math.pow(1 - u, 3)); }
    if (t < T_P) { const u = (t - T_E - .22) / (T_P - T_E - .22); return P.sA - .2 + .3 * (.5 - .5 * Math.cos(Math.PI * u)); }
    if (t < T_D) { const u = (t - T_P) / (T_D - T_P); return s0 + span * (.6 * u + .4 * u * u); }
    return P.sD + span * 1.4 / (T_D - T_P) * (t - T_D);
  },
  // time the head reaches arc length s during the plunge (inverse of sigH)
  plungeT(P, s) {
    const s0 = P.sA + .1, g = Math.max(0, Math.min(1, (s - s0) / (P.sD - s0))), u = (-.6 + Math.sqrt(.36 + 1.6 * g)) / .8;
    return this.T_P + u * (this.T_D - this.T_P);
  },
  // nearest point of the S ground track for a unit (cached per layout + amplitude): { q, d, x, y }
  nearOf(u, A) {
    const c = this._near || (this._near = new Map()), key = u.x.toFixed(4) + '|' + u.y.toFixed(4) + '|' + A;
    let r = c.get(key);
    if (r) return r;
    const XS = this.XE + this.LEAN, SP = this.XD - XS;
    let bq = 0, bd = 1e9;
    for (let k = 0; k <= 120; k++) {
      const q = k / 120, d = Math.hypot(u.x - (XS + SP * q), u.y - A * Math.sin(Math.PI * 2 * q));
      if (d < bd) { bd = d; bq = q; }
    }
    r = { q: bq, d: bd, x: XS + SP * bq, y: A * Math.sin(Math.PI * 2 * bq) };
    if (c.size > 4000) c.clear();
    c.set(key, r);
    return r;
  },
  draw(p, t) {
    const PL = this.palette, ST = PL.stone, LV = PL.lava, DU = PL.dust, R = PXFX.REACT;
    const CAST = .5, T_E = this.T_E, T_P = this.T_P, T_D = this.T_D, sz = p.param('size'), A = p.param('width'), LH = p.param('launch');
    const P = this.path(A, sz), sh = this.sigH(P, t), L = 3.4 + 1.3 * sz, sTail = sh - L;
    const E0 = [this.XE, 0, 0], D0 = [this.XD, 0, 0], XS = this.XE + this.LEAN, SP = this.XD - XS;
    const RB = .9 + .5 * sz, RL = .5 + .38 * sz, RK = 1.3 + .6 * sz;
    const sOfQ = q => P.sigOfW(q), hitQ = q => this.plungeT(P, sOfQ(q));
    // ---- caster ----
    let pose, lean = 0;
    if (t < .1) pose = 'idle';
    else if (t < .42) pose = { a: 'idle', b: 'charge', k: p.easeOutCubic(p.ph(t, .1, .38)) };
    else if (t < 3.4) { pose = { a: 'charge', b: 'palm', k: p.easeInCubic(p.ph(t, .42, CAST)) }; lean = .5 * p.easeInCubic(p.ph(t, .42, CAST)); }
    else { const k = p.easeOutCubic(p.ph(t, 3.4, 4.2)); pose = { a: 'palm', b: 'idle', k }; lean = .5 * (1 - k); }
    const fig = p.figure(-3.5, .2, { pose, lean });
    // ---- ground marks (stains, graded with the world) ----
    const C0 = [fig.hand[0] + .15, fig.hand[1]], crackF = p.easeOutCubic(p.ph(t, CAST, 1.2)), crackK = 1 - p.ph(t, 3.6, 4.5);
    const cracks = [];
    if (t > CAST && crackK > 0) {
      for (let c = 0; c < 3; c++) {
        const ex = E0[0] - .3, ey = E0[1] + (c - 1) * .55, pts = [];
        for (let k = 0; k <= 12; k++) {
          const q = k / 12, j = Math.sin(Math.PI * q) * ((p.r(k, c * 13 + 1) - .5) * .5 + (c - 1) * .15 * Math.sin(Math.PI * q));
          pts.push([p.lerp(C0[0], ex, q), p.lerp(C0[1], ey, q) + j, .02]);
        }
        cracks.push(pts);
      }
      p.stain(p.lerp(C0[0], E0[0], .5), p.lerp(C0[1], E0[1], .5), 2.1, (dx, dy) => {
        const x = dx + p.lerp(C0[0], E0[0], .5), f = (x - C0[0]) / (E0[0] - C0[0]);
        if (f < 0 || f > crackF + .02) return 0;
        return p.noise(x * 4, dy * 4) > .7 ? .5 : 0;
      }, '#2a2218', crackK);
    }
    // holes where the dragon breaks the surface
    const holeE = t > T_E - .08 ? p.easeOutExpo(p.ph(t, T_E - .08, T_E + .1)) * (1 - p.ph(t, 3.9, 4.7)) : 0;
    const holeD = t > T_D - .05 ? p.easeOutExpo(p.ph(t, T_D - .05, T_D + .1)) * (1 - p.ph(t, 3.9, 4.7)) : 0;
    const holeR = .55 + .4 * sz;
    for (const [H, k] of [[E0, holeE], [D0, holeD]]) if (k > 0) {
      const Rh = holeR * k;
      p.stain(H[0], H[1], Rh * 1.6, (dx, dy, rho, ang) => (rho < Rh * (.8 + .25 * p.noise(ang * 2 + 3, H[0])) ? 1.2 : rho < Rh * 1.5 ? .45 * (1 - rho / (Rh * 1.5)) * 2 : 0), '#1c140e', 1);
    }
    // the rift: a dark tear along the S ground track behind the head
    const qH = t < T_P ? 0 : t >= T_D ? 1 : this.qOfS(P, sh), riftK = 1 - p.ph(t, 3.9, 4.75);
    if (qH > .02 && riftK > 0) {
      const x0 = this.XE + .4, x1 = XS + SP * qH, cx = (x0 + x1) / 2;
      if (x1 > x0) p.stain(cx, 0, Math.hypot((x1 - x0) / 2, A) + .6, (dx, dy) => {
        const x = dx + cx;
        if (x < x0 || x > x1) return 0;
        const q = (x - XS) / SP, yt = A * Math.sin(Math.PI * 2 * q), w = (.1 + .1 * sz) * (.6 + .8 * p.noise(x * 3, 7)) * Math.min(1, (x - x0) * 2, (x1 - x) * 3 + .2);
        const d = Math.abs(dy - yt);
        return d < w ? 1.25 : d < w * 2.2 ? .4 : 0;
      }, '#1e1610', riftK);
    }
    // ---- the horde: thrown out of the breach, then launched / knocked / toppled as the head passes ----
    const tier = u => {
      const dE = Math.hypot(u.x - E0[0], u.y - E0[1]);
      if (dE < RB) return { k: 'burst', d: dE };
      const nr = this.nearOf(u, A);
      return { k: nr.d < RL ? 'launch' : nr.d < RK ? 'knock' : 'fall', d: nr.d, nr };
    };
    const crowd = p.crowd({
      n: Math.round(p.param('crowd')), seed: 23, area: { x: 1.2, y: 0, rx: 2.4, ry: 2.1 }, t, ramp: LV,
      at: u => { const tr = tier(u); return tr.k === 'burst' ? E0 : [tr.nr.x, tr.nr.y, 0]; },
      hit: u => {
        const tr = tier(u);
        if (tr.k === 'burst') return T_E + .03 + tr.d / 7;
        return hitQ(tr.nr.q) + .03 + (tr.k === 'fall' ? .1 + u.r1 * .1 : u.r1 * .03);
      },
      react: (s, a, u, pp, o) => {
        const tr = tier(u);
        if (tr.k === 'burst') { s.pw = 1.5 - .6 * tr.d / RB; R.knock(s, a, u, pp, o); }
        else if (tr.k === 'launch') { s.pw = LH * (1.2 - .45 * tr.d / RL); R.launch(s, a, u, pp, o); }
        else if (tr.k === 'knock') { s.pw = .55 + .55 * (1 - (tr.d - RL) / (RK - RL)); R.knock(s, a, u, pp, o); }
        else { R.fall(s, a, u, pp, o); s.jit = a < .3 ? .03 : 0; }
      },
      fear: u => p.ph(t, .75, 1.3) * (.45 + .55 * u.r3) + .4 * p.env(t, 1.5, 1.6, 1.8, 2.0),
      respawn: [3.95, 4.95], clear: [3.65, 4.35], from: [1, .1],
    });
    // ---- the dragon (solids): body rocks from the tail up, then the head ----
    const roar = p.env(t, T_E + .18, T_E + .26, T_P - .08, T_P + .05);
    const jaw = Math.max(roar, .25 + .4 * Math.pow(Math.abs(Math.sin((t - T_E) * 4.2)), 2) * (t > T_E ? 1 : 0));
    const nSeg = this.NSEG, joints = [], step = L / nSeg;
    let head = null;
    if (sh > P.sE - 1.2 && sTail < P.sD + .5) {
      const sway = roar * .12 * Math.sin(t * 23);
      for (let j = nSeg; j >= 1; j--) {
        const s = sh - j * step, Q = P.pos(s), r = sz * (.62 - .4 * j / nSeg);
        if (Q[2] < -r * .85) continue;
        const sw = sway * Math.max(0, 1 - j / 8);
        p.rock(Q[0] + sw, Q[1] + sw * .6, Q[2], r, ST, j * 7 + 1, { shadow: Q[2] > 0 && j % 2 === 0 });
        if (j % 2 === 0) {
          const Q2 = P.pos(s + .2), d = p.v3.norm([Q2[0] - Q[0], Q2[1] - Q[1], Q2[2] - Q[2]]);
          let side = p.v3.cross([0, 0, 1], d);
          side = Math.hypot(side[0], side[1], side[2]) < .1 ? [0, 1, 0] : p.v3.norm(side);
          const up = p.v3.cross(d, side), b = [Q[0] + up[0] * r * .75 + sw, Q[1] + up[1] * r * .75, Q[2] + up[2] * r * .75];
          if (b[2] > 0) p.shard(b[0], b[1], b[2], r * 1.3, r * .5, [up[0] - d[0] * .6, up[1] - d[1] * .6, up[2] - d[2] * .6], ST, { back: .1, sides: 3, shadow: false });
        }
        if (Q[2] > -.05 && j % 2) joints.push([Q, r]);
      }
      const hs = sz * .8, H0 = P.pos(sh);
      if (H0[2] > -hs * .9) {
        const H = [H0[0] + sway, H0[1] + sway * .6, H0[2]], F = P.pos(sh + .5), B = P.pos(sh - .5);
        const d = p.v3.norm([F[0] - B[0], F[1] - B[1], F[2] - B[2]]);
        let side = p.v3.cross([0, 0, 1], d);
        side = Math.hypot(side[0], side[1], side[2]) < .1 ? [0, 1, 0] : p.v3.norm(side);
        const up = p.v3.cross(d, side);
        const at = (f, s2, u2) => [H[0] + d[0] * f + side[0] * s2 + up[0] * u2, H[1] + d[1] * f + side[1] * s2 + up[1] * u2, H[2] + d[2] * f + side[2] * s2 + up[2] * u2];
        const sk = at(0, 0, hs * .25), sn = at(hs * 1.1, 0, hs * (.1 + .2 * jaw)), jw = at(hs * .85, 0, -hs * (.35 + .65 * jaw));
        p.rock(sk[0], sk[1], sk[2], hs, ST, 3);
        p.rock(sn[0], sn[1], sn[2], hs * .62, ST, 5);
        p.rock(jw[0], jw[1], jw[2], hs * .55, ST, 9, { shadow: false });
        for (const sg of [1, -1]) {
          const hb = at(-hs * .2, sg * hs * .45, hs * .6);
          p.shard(hb[0], hb[1], hb[2], hs * 1.8, hs * .36, [up[0] - d[0] * 1.3 + side[0] * sg * .4, up[1] - d[1] * 1.3 + side[1] * sg * .4, up[2] - d[2] * 1.3 + side[2] * sg * .4], ST, { back: .1, sides: 4, shadow: false });
        }
        head = { H, d, side, up, at, hs };
      }
    }
    // ---- dust where the body breaks the surface; rock fountains at the breach and the dive ----
    const nD = Math.round(10 * Math.min(1.5, p.density));
    for (const [H, sAt, salt, rise] of [[E0, P.sE, 0, 1.6], [D0, P.sD, 50, 1]]) {
      for (let k = 0; k < nD * 2; k++) {
        const born = T_E - .05 + (k / (nD * 2)) * 2.4 + p.r(k, salt + 1) * .1, sb = this.sigH(P, born);
        if (!(sb > sAt - .3 && sb - L < sAt + .3)) continue;
        const age = t - born, life = Math.min(.9 + .5 * p.r(k, salt + 2), 4.5 - born);
        if (age < 0 || age > life) continue;
        const a = age / life, ang = p.r(k, salt + 3) * p.TAU, burst = born < T_E + .3 && salt === 0 ? 1 : 0;
        const rr = (.45 + .6 * p.drag(1, 2.5, age)) * sz * (burst ? .6 : 1);
        p.ball(H[0] + Math.cos(ang) * rr, H[1] + Math.sin(ang) * rr, .15 + p.drag(1.1 + burst * 3.2, 2, age) * (.5 + p.r(k, salt + 4)) * rise, (.2 + .3 * a) * sz, DU, { alpha: Math.pow(1 - a, 1.2) * .75, rough: .5, shadow: false, seed: k + salt });
      }
    }
    for (const [H, t0, n, salt, up, back] of [[E0, T_E, 18, 200, 1.45, 0], [D0, T_D, 16, 300, 1.15, 1]]) {
      const a = t - t0;
      if (a < 0 || a > 2.2) continue;
      const nR = Math.round(n * p.density);
      for (let k = 0; k < nR; k++) {
        const ang = back ? Math.PI * (.45 + 1.1 * p.r(k, salt)) : p.r(k, salt) * p.TAU, v = (back ? 1 + 1.6 * p.r(k, salt + 1) : .6 + 1.8 * p.r(k, salt + 1)) * Math.min(1.1, sz);
        const vz = (2.4 + 2.6 * p.r(k, salt + 2)) * up, T = 2 * vz / 9.8, tt = Math.min(a, T);
        const fade = 1 - p.ph(t, 3.7 + .3 * p.r(k, salt + 3), 4.3 + .3 * p.r(k, salt + 3));
        if (fade <= 0) continue;
        const x = H[0] + Math.cos(ang) * (.4 * sz + v * tt), y = H[1] + Math.sin(ang) * (.4 * sz + v * tt), z = Math.max(.07, .3 + vz * tt - 4.9 * tt * tt);
        p.rock(x, y, z, (.08 + .12 * p.r(k, salt + 4)) * Math.min(1.3, sz) * fade, ST, k + salt);
      }
    }
    // heave: pebbles hopping around the emergence point before the breach
    if (t > .95 && t < T_E + .05) {
      const nP = Math.round(16 * p.density);
      for (let k = 0; k < nP; k++) {
        const ph = ((t - .95) * (3 + 2 * p.r(k, 401)) + p.r(k, 402)) % 1, ang = p.r(k, 403) * p.TAU, rr = (.3 + 1.1 * p.r(k, 404)) * sz;
        p.rock(E0[0] + Math.cos(ang) * rr, E0[1] + Math.sin(ang) * rr, .06 + 4 * ph * (1 - ph) * (.2 + .3 * p.ph(t, .95, T_E)), (.07 + .07 * p.r(k, 405)) * Math.min(1.3, sz), ST, k + 400, { shadow: false });
      }
    }
    // ---- the world darkens a little so the lava light reads ----
    const gk = p.env(t, .45, 1.0, 3.3, 4.0);
    if (gk > .01) p.grade({ dark: .25 * gk, desat: .2 * gk });
    const a = t - T_D;
    if (a >= 0 && a < .021 + 1 / 30) p.impactFrame({ ink: '#1c120a', paper: '#fff4e0', accent: '#ff8a2a' });
    // ---- light ----
    if (t >= CAST - .02 && t < CAST + .35) { const u = p.ph(t, CAST, CAST + .35); p.shock(C0[0], C0[1], .04, u, { R: 1, w: .18, ramp: LV }); }
    if (cracks.length) {
      const glow = (t < T_E ? 1 : 1 - .6 * p.ph(t, T_E, 2.4)) * crackK;
      for (const pts of cracks) {
        const n = pts.length - 1, f = crackF * n;
        for (let k = 0; k < n && k < f; k++) {
          const q = Math.min(1, f - k), b = p.v3.lerp(pts[k], pts[k + 1], q);
          p.line(pts[k], b, .11, LV, (.8 + .3 * (k / n)) * glow, { w1: .11 });
          if (q < 1 && t < T_E) { p.sparkle(b[0], b[1], b[2] + .05, 3, LV, 1.2); p.light(b[0], b[1], 0, .7, LV, .7); }
        }
      }
      p.light(E0[0], E0[1], 0, 1.6 * sz, LV, .7 * p.env(t, .9, 1.25, 1.6, 2.4));
    }
    if (t > .95 && t < T_E + .1) p.decal(E0[0], E0[1], 0, 1.1 * sz, (dx, dy, rho, ang) => (Math.abs(Math.sin(ang * 3 + rho * 4)) < .12 ? 1 - rho / (1.1 * sz) : 0), LV, 1.1 * p.ph(t, .95, T_E));
    // lava in the joints, eyes and mouth
    const cf = p.cam().fwd;
    for (const [Q, r] of joints) p.dot(Q[0] + cf[0] * r * .9, Q[1] + cf[1] * r * .9, Q[2] + cf[2] * r * .9 - r * .15, LV, .9, 2);
    if (head) {
      const hs = head.hs;
      for (const sg of [1, -1]) {
        const e = head.at(hs * .55, sg * hs * .55, hs * .45);
        p.glow(e[0] + cf[0] * .25, e[1] + cf[1] * .25, e[2] + cf[2] * .25, hs * .2, LV, .9 + .4 * roar);
        p.dot(e[0] + cf[0] * .3, e[1] + cf[1] * .3, e[2] + cf[2] * .3, LV, 1.4, 2);
      }
      const m = head.at(hs * 1.1, 0, -hs * (.1 + .3 * jaw));
      p.glow(m[0] + cf[0] * .3, m[1] + cf[1] * .3, m[2] + cf[2] * .3, hs * (.18 + .17 * jaw), LV, .9 + .4 * roar);
      p.light(head.H[0], head.H[1], 0, 1.6 * sz, LV, .55 * Math.min(1, 2.5 / Math.max(1, head.H[2])));
      // the roar: a shock ring and speed lines from the open mouth
      const ra = t - (T_E + .26);
      if (ra > 0 && ra < .45) {
        const u = ra / .45;
        p.ring(m[0] + cf[0] * .3, m[1] + cf[1] * .3, m[2] + cf[2] * .3, hs * (.4 + 2.4 * p.easeOutExpo(u)), .12 * (1 - u) + .03, LV, 1.2 * (1 - u), { axis: cf });
        if (ra < .2) p.speedLines(m[0], m[1], m[2], { n: 12, R0: hs * 1.2, R1: hs * 4, ramp: LV, I: 1.1 * (1 - ra / .2), seed: Math.floor(t * 30) });
      }
    }
    // hole rims glow
    for (const [H, k, t0] of [[E0, holeE, T_E], [D0, holeD, T_D]]) if (k > 0) {
      const Rh = holeR * k, gI = Math.pow(1 - p.ph(t, t0, t0 + 1.8), 1.5);
      if (gI > 0) p.decal(H[0], H[1], 0, Rh * 1.05, (dx, dy, rho, ang) => p.band(rho, Rh * (.8 + .25 * p.noise(ang * 2 + 3, H[0])), .14), LV, 1.1 * gI);
    }
    // rift lava cooling (each piece glows from the moment the head passes it)
    if (qH > .02 && riftK > 0) {
      const x0 = this.XE + .4, x1 = XS + SP * qH, nL = 24;
      for (let k = 0; k < nL; k++) {
        const xa = p.lerp(x0, x1, k / nL), xb = p.lerp(x0, x1, (k + 1) / nL), qa = Math.max(0, (xa - XS) / SP), qb = Math.max(0, (xb - XS) / SP);
        const I = Math.pow(1 - p.ph(t, hitQ(qa) + .3, hitQ(qa) + 1.8), 1.3) * riftK;
        if (I <= .02) continue;
        p.line([xa, A * Math.sin(Math.PI * 2 * qa), .02], [xb, A * Math.sin(Math.PI * 2 * qb), .02], .09 * Math.min(1.3, sz), LV, .95 * I);
      }
    }
    // the breach and the dive
    for (const [H, t0, Rr, pw] of [[E0, T_E, 1.6, .9], [D0, T_D, 1.8, 1]]) {
      const u = t - t0;
      if (u < 0 || u > 1) continue;
      p.shock(H[0], H[1], .05, p.ph(u, 0, .7), { R: Rr * Math.min(1.15, sz), w: .3, ramp: LV, ground: true, dust: DU, dustN: 14 });
      const fl = Math.pow(1 - p.ph(u, 0, .25), 2);
      if (fl > 0) p.glow(H[0], H[1], .5, (.6 + .5 * pw) * Math.min(1.3, sz), LV, 1.2 * fl * pw, { pow: 1.6 });
      if (u < .22) p.speedLines(H[0], H[1], .6 + (pw < 1 ? 1.2 : 0), { n: 16, R0: 1.1 * Math.min(1.3, sz), R1: 4.5, ramp: LV, I: 1.2 * (1 - u / .22), seed: Math.floor(t * 30) });
    }
  },
  // S-track parameter q of the head's ground position during the plunge (inverse of sigOfW on 0..1)
  qOfS(P, s) {
    let lo = 0, hi = 1;
    for (let k = 0; k < 22; k++) { const m = (lo + hi) / 2; if (P.sigOfW(m) < s) lo = m; else hi = m; }
    return (lo + hi) / 2;
  },
});
