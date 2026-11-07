// 穿針 / Needle Thread — Armory pack (original design): one tiny summoned needle runs a pre-computed route through
// every soldier, its glowing thread passing in front of one soldier and behind the next; the needle keeps doubling
// its speed, then the caster pulls and every threaded soldier is yanked into one bundle at his feet.
PXFX.define({
  id: 'needle-thread',
  loop: 6.5,
  view: { r: 5.6, h: 3.4 },
  stage: { ground: 'slate', tiles: true },
  modules: ['figure', 'armory', 'crowd', 'troops', 'tally', 'grade', 'shockwave'],
  palette: {
    thread: ['#9a4a1e', '#e09a32', '#ffe08a', '#fffcec'],
    dust: ['#4a4c5c', '#646878', '#80849a', '#a2a6b8'],
  },
  beats: [{ t: 1.0, kind: 'cast', power: .5 }, { t: 1.3, kind: 'pulse', power: .4 }, { t: 3.95, kind: 'cast', power: .8 }, { t: 4.55, kind: 'hit', power: 1.35 }],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    thread: { zh: '線長（單位）', en: 'thread length (units)', min: 10, max: 300, step: 5, value: 195 },
    speed: { zh: '針速倍率', en: 'needle speed (×)', min: .25, max: 2, step: .05, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  timeline: [
    { t: [0, .8], k: 'pose', zh: '特寫（放大 7 倍）：施法者舉起手，指間閃出一點光，變成一支只有 0.4 單位長的針，針眼繫著一條金線；背景壓暗', en: 'close-up (7× lens): the caster raises a hand, a glint between the fingers becomes a needle only 0.4 units long with a gold thread tied to its eye; the background is darkened' },
    { t: [.8, 1.3], k: 'charge', zh: '施法者指向敵陣，針沿一條固定弧線飛到第一名士兵（1.3 秒），鏡頭跟著針推到 4 倍近景；整條路線早已算好：由敵陣左前角起，每次走到最近一名未穿過的士兵（貪婪最近鄰，橫向一步算 1.3 倍距離，所以先沿面向鏡頭的第一排走，再一排排蛇行；每個陣型只算一次並快取）', en: 'the caster points and the needle flies a fixed arc to the first soldier (1.3 s) while the camera follows it into a 4× close shot. The whole route is computed in advance: from the army’s front-left corner, always on to the nearest soldier not yet threaded (greedy nearest neighbour; a step across y counts 1.3×, so it runs the camera-facing first row, then snakes row by row; computed once per layout and cached)' },
    { t: [1.3, 3.9], k: 'shape', zh: '針沿路線穿過士兵：速度 = 針速倍率 1 × 0.8 × 2^(τ/0.28) 單位／秒（每 0.28 秒快一倍），首十人逐個可數（近景），2.05–2.85 秒鏡頭拉遠到整個戰場，最後一秒穿過大半軍隊；線在一名士兵身前、下一名身後交替穿過（向鏡頭前後偏移 0.07），身後一段被士兵擋住；被穿上的士兵閃白並被釘住', en: 'the needle runs the route: speed = needle speed 1 × 0.8 × 2^(τ/0.28) units/s (doubling every 0.28 s), so the first ten soldiers can be counted one by one in the close shot; the camera pulls out to the battlefield at 2.05–2.85 s and most of the army goes in the last second; the thread passes in front of one soldier and behind the next (offset 0.07 towards / away from the camera), the stretch behind a soldier is hidden by it; threaded soldiers flash white and are pinned' },
    { t: [3.9, 4.55], k: 'motion', zh: '規則：士兵在路線上的累計距離 s ≤ min(線長 195, 針在 3.9 秒前走到的距離) 即被穿上，命中時間 = 1.3 + 0.28 × log2(1 + s ÷ (倍率 × 0.323))；3.95 秒施法者一扯，一道白光沿線按路線順序跑過，每名被穿上的士兵在白光經過時（3.95 + 0.05 + 0.3 × s ÷ 最後一人的 s）被扯起，0.24 秒內沿弧線飛到施法者腳前', en: 'rule: a soldier at cumulative route distance s is threaded iff s ≤ min(thread 195, the distance the needle covers by 3.9 s); hit time = 1.3 + 0.28 × log2(1 + s / (speed × 0.323)). At 3.95 s the caster pulls: a white front runs along the thread in route order and each threaded soldier is yanked as it passes (3.95 + 0.05 + 0.3 × s / s of the last one), arcing to his feet in 0.24 s' },
    { t: [4.55, 5.1], k: 'impact', zh: '最後一人在 4.55 秒到位，全軍被索成一束；兩條線沿兩道錯開半圈的螺旋繞住這一束並收緊打結，地面揚塵；線長用完之後的士兵沒有被穿到，留在原地', en: 'the last soldier lands at 4.55 s and the whole army is cinched into one bundle; two windings run up two helices half a turn apart around it and knot tight, dust rises; soldiers past the end of the thread were never threaded and stay where they stood' },
    { t: [5.1, 6.5], k: 'after', zh: '繞線的白芯先退，剩金色殘影，再斷成碎段與單粒像素；這一束士兵淡出、新一批敵兵出現；計數在重生前淡出，鏡頭推回手部特寫', en: 'the windings lose their white core first, a gold afterimage remains, then they split into segments and single pixels; the bundle fades, a fresh army appears; the counter fades before the respawn and the camera pushes back into the hand close-up' },
  ],
  layers: [
    { zh: '武器：程式畫的縫衣針（長 0.4，扁平針身，針眼一個暗點），寫入深度；放大 7 倍特寫時針佔畫面三分之一高，拉遠後只剩針尖一點四角閃光', en: 'weapon: a procedural sewing needle (0.4 long, flat, a dark dot for the eye) that writes depth; at the 7× close-up it fills a third of the frame height, pulled back it is a four-point glint at the point' },
    { zh: '路徑先行：路線 = 由敵陣左前角出發的貪婪最近鄰巡迴（空間網格查詢，橫向一步算 1.3 倍，每個陣型與人數只算一次並快取），每格不變；打開「引導線」可見整條紅色路線與白色針位標記，拉線後是金色的線與紅、綠兩道繞線', en: 'path first: the route is a greedy nearest-neighbour tour from the army’s front-left corner (spatial-grid queries, a step across y counts 1.3×, computed once per layout and count and cached) and never changes between frames; the guide toggle shows the whole route in red with a white marker on the needle, then the gold pulled thread and the red and green windings' },
    { zh: '遮擋：路線在第 k 名士兵處向鏡頭偏移 +0.07、下一名偏移 -0.07，線的深度交替在士兵前後，士兵寫入深度，近景時線一前一後；遠景士兵只有 1–2 像素寬，改畫成縫線：每段只畫靠近「在前面」那名士兵的 34%', en: 'occlusion: at soldier k the route is offset 0.07 towards the camera, at the next one 0.07 away, so the thread depth alternates in front of and behind the soldiers, who write depth: up close it weaves; far away (1–2 px soldiers) it is drawn as a running stitch, only the 34% of each segment next to the soldier it passes in front of' },
    { zh: '筆觸與色階：針後的一段是鋸齒能量線（1 像素白芯、金色、暗橙邊，每兩格換形狀），長度 = min(4, 0.35 + 0.012 × 針速)，越快越長；其後三倍長度降一級成淺金，再舊只剩 1 像素金線，偶有斷口', en: 'stroke and tiers: the stretch behind the needle is a jagged energy line (1 px white core, gold, dark orange edge, reshaped every other frame) min(4, 0.35 + 0.012 × needle speed) long, so it stretches as the needle speeds up; the next three times that drops to pale gold, older thread is a 1 px gold line with the odd gap' },
    { zh: '消散：拉線時每一段先變白，士兵被扯走後該段降成淺金、再斷成金色碎段、最後剩單粒像素；打結的繞線也是白芯先退、剩金色殘影、再碎開', en: 'breakup: on the pull each stretch turns white, then once its soldier is yanked it drops to pale gold, splits into gold segments and ends as single pixels; the knotted windings also lose the core first, keep a gold afterimage, then break up' },
    { zh: '判定與倖存：路線累計距離 s ≤ 線長 且 針在 3.9 秒前到得了 s 即被穿上；默認線長 195 走完 1000 人方陣（路線約 188）；圓陣路線約 210，最後約 3% 倖存；線長或針速調低、人數加到 2000 時路線尾段的士兵倖存', en: 'rule and survivors: threaded iff route distance s ≤ thread and the needle reaches s by 3.9 s; the default 195 covers the 1,000-soldier block (route about 188); a ring needs about 210 so its last ~3% survive; a shorter thread, a slower needle or 2,000 soldiers leave the end of the route standing' },
    { zh: '軍隊與計數：1000 名像素小兵（默認方陣），被穿上時閃白；拉線時沿弧線飛到施法者腳前堆成一束；角落擊殺計數隨針加速狂跳，全滅時變金色', en: 'army and counter: 1,000 pixel soldiers (block by default) flash white when threaded, then arc through the air to a pile at the caster’s feet on the pull; the corner kill counter races with the needle and turns gold on a full wipe' },
    { zh: '鏡頭：開場 7 倍手部特寫；0.8–1.3 秒跟著針沿弧線推到 4 倍近景看清前幾針；2.05–2.85 秒拉遠到整個戰場；5.85 秒起推回手部特寫', en: 'camera: opens on a 7× close-up of the hand; at 0.8–1.3 s it follows the needle along its arc into a 4× close shot of the first stitches; out to the whole battlefield at 2.05–2.85 s; pushes back into the hand from 5.85 s' },
  ],

  CX: -4.3, AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 }, START: [-2.3, 2.9], BALE: [-2.75, 0],
  HAND: [-4.25, -.18, 1.55], LAUNCH: [-3.86, -.09, .96], MID: [-2.9, -.1, .45],
  T_L: 1.0, T_S: 1.3, T_RUN: 3.9, T_PULL: 3.95, V0: .8, DBL: .28, FLY: .24, SPREAD: .3, KC: 7, KM: 4, KP: 1.6,
  _routes: new WeakMap(),

  // route distance covered tau seconds after the first stitch, and its inverse (speed doubles every DBL seconds)
  A() { return this.V0 * this.DBL / Math.LN2; },
  dist(tau, sp) { return tau <= 0 ? 0 : sp * this.A() * (Math.pow(2, tau / this.DBL) - 1); },
  tau(s, sp) { return this.DBL * Math.log2(1 + s / (sp * this.A())); },
  // greedy nearest-neighbour tour from the caster, cached per layout (crowdLayout returns the same array for the same
  // inputs). order[k] = unit index at route position k, s[k] = cumulative distance from the first soldier
  route(p, units) {
    let R = this._routes.get(units);
    if (R) return R;
    const n = units.length, g = p.crowdGrid(units, Math.max(.05, (units.spacing || .2) * 1.5)), used = new Uint8Array(n);
    const order = new Int32Array(n), s = new Float64Array(n), rank = new Int32Array(n);
    let px = this.START[0], py = this.START[1], acc = 0;
    for (let k = 0; k < n; k++) {
      let best = -1, bd = Infinity, r = g.cell;
      for (;;) {
        // nearest by a slightly stretched metric (steps across y cost 1.3x): the route prefers to run along x, so
        // the first stitches follow the army's camera-facing edge row and the tour snakes in rows
        for (const u of g.near(px, py, r)) if (!used[u.i]) { const d = (u.x - px) ** 2 + 1.69 * (u.y - py) ** 2; if (d < bd) { bd = d; best = u.i; } }
        if ((best >= 0 && bd <= r * r) || r > 60) break;
        r *= 2;
      }
      used[best] = 1; order[k] = best; rank[best] = k;
      if (k) acc += Math.hypot(units[best].x - px, units[best].y - py);
      s[k] = acc; px = units[best].x; py = units[best].y;
    }
    R = { order, s, rank, total: acc, n };
    this._routes.set(units, R);
    return R;
  },
  // number of route positions with s <= lim (binary search)
  upTo(s, n, lim) { let lo = 0, hi = n; while (lo < hi) { const m = (lo + hi) >> 1; if (s[m] <= lim) lo = m + 1; else hi = m; } return lo; },

  layout(p) { return { n: Math.round(p.param('crowd')), seed: 37, formation: PXFX.TROOPS[p.param('formation') | 0].id, area: this.AREA, faceTo: [this.CX, 0] }; },
  // centre of the first eight stitches (the close shot of the weave), cached with the route
  focus(p) {
    const units = p.crowdLayout(this.layout(p)), R = this.route(p, units);
    if (!R.foc) {
      const m = Math.min(8, R.n), sc = Math.max(.08, Math.min(1.5, (units.spacing || .4) / .4));
      let x = 0, y = 0;
      for (let k = 0; k < m; k++) { x += units[R.order[k]].x; y += units[R.order[k]].y; }
      R.foc = [x / m, y / m, .38 * sc];
      R.p0 = [units[R.order[0]].x, units[R.order[0]].y, .38 * sc];
    }
    return R;
  },
  // the fixed lead-in arc from the pointing hand to the first soldier
  leadPt(q, P0) { const L = this.LAUNCH; return [L[0] + (P0[0] - L[0]) * q, L[1] + (P0[1] - L[1]) * q, L[2] + (P0[2] - L[2]) * q + .45 * Math.sin(Math.PI * q)]; },
  // camera: A = hand close-up (7x), B = close shot of the first stitches (4x), C = the battlefield (no lens)
  lensAt(t, p) {
    if (p.def !== this) p.def = this;   // lens runs before render sets p.def: p.param() would read no defaults on a fresh view
    const e1 = p.ease(p.ph(t, .8, 1.3)), e2 = p.ease(p.ph(t, 2.05, 2.85)), e3 = p.ease(p.ph(t, 5.85, 6.45));
    const TA = [0, 0, 1.7], TB = [0, 0, 1.1], L = p.v3.lerp;
    // the pull: lean in on the pile at the caster's feet (KP), then from there back into the hand
    const e4 = p.ease(p.ph(t, 3.9, 4.35)), BC = [this.BALE[0], this.BALE[1], .35], TP = [-1.6, 0, .5];
    if (t >= 3.9) {
      const cp = L(BC, this.HAND, e3), tp = L(L(BC, TP, e4), TA, e3), k = 1 + (this.KP - 1) * e4 + (this.KC - 1 - (this.KP - 1) * e4) * e3;
      return k <= 1.001 ? null : { k, c: cp, to: tp };
    }
    if (e2 >= 1) return null;
    // the focus follows the needle: in the hand, along the lead-in arc, then eases onto the first stitches
    const R = this.focus(p), F = R.foc;
    const c = t < this.T_L ? this.HAND : t < this.T_S ? this.leadPt(p.easeIn(p.ph(t, this.T_L, this.T_S)), R.p0) : L(R.p0, F, p.ease(p.ph(t, this.T_S, 1.75)));
    if (e1 < 1) return { k: this.KC + (this.KM - this.KC) * e1, c, to: L(TA, TB, e1) };
    return { k: this.KM + (1 - this.KM) * e2, c, to: L(TB, c, e2) };
  },
  zoom(t, p) { const l = this.lensAt(t, p); return l ? l.k : 1; },
  // 1 px thread between world points a and b in one hard tier (0 dark edge .. 3 core); dots are depth-tested, so
  // a soldier in front hides the stretch behind it. gap(j) -> true drops a pixel (gaps that change every other frame)
  seg(p, a, b, ramp, lv, size, gap) {
    const A = p.project(a[0], a[1], a[2]), B = p.project(b[0], b[1], b[2]);
    if (!A || !B || lv < 0) return;
    const n = Math.min(400, Math.max(1, Math.ceil(Math.max(Math.abs(B[0] - A[0]), Math.abs(B[1] - A[1]))))), I = (Math.min(3, lv) + .5) / 4;
    for (let j = 0; j <= n; j++) {
      if (gap && gap(j)) continue;
      const f = j / n;
      p.dot(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, ramp, I, size);
    }
  },

  draw(p, t) {
    const thread = p.param('thread'), sp = p.param('speed'), TAU = Math.PI * 2, seed = p.hold(t), ramp = this.palette.thread;
    const lo = this.layout(p);
    const units = p.crowdLayout(lo), R = this.route(p, units), S = R.s;
    // the rule: threaded iff s <= min(thread, distance run by T_RUN)
    const lim = Math.min(thread, this.dist(this.T_RUN - this.T_S, sp)), cnt = this.upTo(S, R.n, lim), last = cnt ? S[cnt - 1] : 0;
    const stop = Math.min(lim, R.total);   // where the needle comes to rest
    const sc = Math.max(.08, Math.min(1.5, (units.spacing || .4) / .4)), zr = .38 * sc;
    const kz = this.zoom(t, p), near = 1 - p.ease(p.ph(t, .8, 1.3)) + p.ease(p.ph(t, 5.85, 6.45));

    // caster: hand raised with the needle, points, then yanks the thread back
    let pose;
    if (t < .75) pose = 'raise';
    else if (t < 1.0) pose = { a: 'raise', b: 'point', k: p.ease(p.ph(t, .75, 1.0)) };
    else if (t < 3.85) pose = 'point';
    else if (t < 5.4) pose = { a: 'point', b: 'windup', k: p.easeOutCubic(p.ph(t, 3.85, 4.0)) };
    else pose = { a: 'windup', b: 'raise', k: p.ease(p.ph(t, 5.4, 6.1)) };
    const fig = p.figure(this.CX, 0, { scale: .85, pose });

    // bundle slots: a tight pile at the caster's feet, sized by the number threaded
    const BX = this.BALE[0], BY = this.BALE[1], fr = cnt / 1000, Rb = .2 + .6 * Math.sqrt(fr), Hb = .15 + .7 * Math.cbrt(fr);
    const dep = k => this.T_PULL + .05 + this.SPREAD * (last > 0 ? S[k] / last : 0);
    const slot = k => {
      const rr = Rb * Math.sqrt(p.r(k, 41)), a = p.r(k, 42) * TAU;
      return [BX + Math.cos(a) * rr, BY + Math.sin(a) * rr, Hb * .75 * p.r(k, 43), .25 + .9 * rr / Rb, a];
    };
    const T_S = this.T_S;
    const st = p.crowd({
      ...lo, t, scale: 'auto', enter: 'fade', lod: kz > 1.7 ? 'full' : 'auto', at: [BX, BY, 0],
      hit: u => { const k = R.rank[u.i]; return k < cnt ? T_S + this.tau(S[k], sp) : null; },
      react: (s, a, u) => {
        const k = R.rank[u.i], td = dep(k), ta = td + this.FLY;
        s.walk = null;
        if (t < td) { s.jit = a < .2 ? .012 : 0; return; }
        const q = slot(k), f = p.easeIn(p.ph(t, td, ta)), hgt = .35 + .12 * Math.hypot(u.x - q[0], u.y - q[1]);
        s.spear = false; s.noShadow = f < 1 || q[2] > .05;
        s.x = u.x + (q[0] - u.x) * f; s.y = u.y + (q[1] - u.y) * f; s.z = q[2] * f + 4 * hgt * f * (1 - f);
        s.tdir = f < 1 ? [(q[0] - u.x) / (Math.hypot(q[0] - u.x, q[1] - u.y) || 1), (q[1] - u.y) / (Math.hypot(q[0] - u.x, q[1] - u.y) || 1)] : [Math.cos(q[4]), Math.sin(q[4])];
        s.tilt = f < 1 ? Math.PI / 2 * Math.min(1, f * 1.6) : q[3];
      },
      respawn: [5.45, 6.05], clear: [5.1, 5.45],
    });

    // close-up: darken the world behind the hand
    if (near > 0) p.grade({ dark: .78 * near, desat: .45 * near, tint: '#1c1830', tintAmt: .35 * near, bg: near });

    // ----- the route: chest-height points, alternately offset towards / away from the camera (the weave) -----
    const cf = p.cam().fwd, fl = Math.hypot(cf[0], cf[1]) || 1, wx = cf[0] / fl, wy = cf[1] / fl, dl = Math.min(.1, .45 * (units.spacing || .2));
    const pull = t >= this.T_PULL;
    const W = k => {
      const u = units[R.order[k]], sg = k & 1 ? -dl : dl;
      if (!pull) return [u.x + wx * sg, u.y + wy * sg, zr];
      const s = st[u.i], tk = 1 - p.ph(t, dep(k) - .07, dep(k));
      return [s.x + wx * sg * tk, s.y + wy * sg * tk, (s.z || 0) + zr];
    };
    // the old thread as a running stitch: only the half of each segment next to the soldier it passes in front of
    const stitch = (k, lv, sz, g, fr) => { const a = W(k - 1), b = W(k), o = k & 1 ? a : b, e = k & 1 ? b : a; this.seg(p, o, [o[0] + (e[0] - o[0]) * fr, o[1] + (e[1] - o[1]) * fr, o[2] + (e[2] - o[2]) * fr], ramp, lv, sz, g); };
    const far = .34;   // far away each stitch is a short dash over the soldier it passes in front of
    const lead = q => this.leadPt(q, W(0));
    // where the needle is: route distance d (with the segment it is on)
    const locate = d => {
      const k = Math.max(0, Math.min(R.n - 1, this.upTo(S, R.n, d) - 1));
      if (k >= R.n - 1) return { k, pt: W(k), dir: [1, 0, 0] };
      const A = W(k), B = W(k + 1), f = Math.min(1, Math.max(0, (d - S[k]) / ((S[k + 1] - S[k]) || 1e-6)));
      const dir = p.v3.norm([B[0] - A[0], B[1] - A[1], B[2] - A[2] + 1e-6]);
      return { k, pt: [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f], dir };
    };
    const size = kz > 1.6 ? 2 : 1;

    // ----- the needle: summoned in the raised hand, flies the lead-in arc, then the route -----
    const marks = [];
    let needle = null, nDir = [0, 0, 1], dNow = -1, v = 0;
    if (t >= .12 && t < this.T_L) {
      const ap = p.easeOutBack(p.ph(t, .12, .32)), turn = p.ease(p.ph(t, .78, 1.0));
      const aim = p.v3.norm([lead(.08)[0] - this.LAUNCH[0], lead(.08)[1] - this.LAUNCH[1], lead(.08)[2] - this.LAUNCH[2]]);
      nDir = p.v3.norm(p.v3.lerp([0, 0, 1], aim, turn));
      const h = fig.hand;
      needle = [h[0] + nDir[0] * .2 * ap, h[1] + nDir[1] * .2 * ap, h[2] + .02 + nDir[2] * .2 * ap];
      if (t < .35) p.sparkle(needle[0], needle[1], needle[2] + .1, 2 + Math.round(4 * (1 - p.ph(t, .12, .35))), ramp, 1);
    } else if (t >= this.T_L && t < T_S) {
      const q = p.easeIn(p.ph(t, this.T_L, T_S)), a = lead(q), b = lead(Math.min(1, q + .03));
      needle = a; nDir = p.v3.norm([b[0] - a[0], b[1] - a[1], b[2] - a[2] + 1e-6]);
      v = 7 * q;
    } else if (t >= T_S && R.n) {
      dNow = Math.min(stop, this.dist(t - T_S, sp));
      v = dNow < stop ? sp * this.V0 * Math.pow(2, (t - T_S) / this.DBL) : 0;
      const L = locate(dNow); needle = L.pt; nDir = L.dir;
      if (pull) { const s = st[units[R.order[Math.max(0, cnt - 1)]].i]; needle = [s.x, s.y, (s.z || 0) + zr + .08]; nDir = [0, 0, -1]; }
    }
    const nAlpha = 1 - p.ph(t, 4.9, 5.3);
    if (needle && nAlpha > 0) {
      const len = .4, base = [needle[0] - nDir[0] * len * .5, needle[1] - nDir[1] * len * .5, needle[2] - nDir[2] * len * .5];
      p.weapon('needle', base, nDir, { alpha: nAlpha > .99 ? 1 : nAlpha, shadow: false, flatBlade: true });
      const tip = [needle[0] + nDir[0] * len * .5, needle[1] + nDir[1] * len * .5, needle[2] + nDir[2] * len * .5];
      const gl = t < this.T_L ? .5 + .5 * Math.abs(Math.sin(t * 9)) : 1;
      p.sparkle(tip[0], tip[1], tip[2], kz > 3 ? 3 : 1 + (v > 20 ? 1 : 0), ramp, gl * nAlpha);
      if (!pull) marks.push(needle);
      p.light(needle[0], needle[1], 0, .5 + Math.min(.6, v * .004), ramp, .7 * nAlpha);
    }
    const eye = needle ? [needle[0] - nDir[0] * .16, needle[1] - nDir[1] * .16, needle[2] - nDir[2] * .16] : null;

    // ----- the thread -----
    const gap = (k, rate) => j => p.r(seed * 31 + k * 7 + j, 3) < rate;
    if (t >= .2 && t < this.T_L && eye) {
      // tied from the needle's eye to the fingers
      this.seg(p, fig.hand, eye, ramp, t < .4 ? 3 : 2, size, null);
    } else if (t >= this.T_L && !pull && eye) {
      // lead-in arc from the hand, then the route up to the needle
      const ql = t < T_S ? p.easeIn(p.ph(t, this.T_L, T_S)) : 1, NL = 10;
      let prev = fig.hand;
      for (let j = 1; j <= NL; j++) { const q = ql * j / NL, c = lead(q); this.seg(p, prev, c, ramp, j > NL - 3 && t < T_S ? 2 : 1, size, gap(j + 900, .03)); prev = c; }
      if (dNow >= 0) {
        const kn = this.upTo(S, R.n, dNow), Lh = Math.min(4, .35 + .012 * v);
        for (let k = 1; k < kn; k++) {
          // close up the pawns' own depth shows the weave; far away (1-2 px soldiers) it is drawn as a running stitch
          if (dNow - S[k] < Lh * 3) this.seg(p, W(k - 1), W(k), ramp, 2, size, null);
          else if (kz > 1.7) this.seg(p, W(k - 1), W(k), ramp, 1, size, gap(k, .05));
          else stitch(k, 1, size, gap(k, .05), far);
        }
        this.seg(p, W(Math.max(0, kn - 1)), eye, ramp, 2, size, null);
        // the hot stretch behind the needle: a jagged energy line in full tiers, longer as the needle speeds up
        const pts = [];
        let k = kn - 1;
        while (k > 0 && dNow - S[k] < Lh && pts.length < 120) { pts.push(W(k)); k--; }
        pts.reverse(); pts.push(eye);
        if (pts.length >= 2) {
          const path = p.path(pts);
          p.zap(path, 0, 1, ramp, { seed: seed * 3 + 1, jag: kz > 1.6 ? 1.2 : .8, step: 4, tail: .45, thick: 1, forks: v > 30 ? 1 : 0, gaps: .02 });
        }
      } else if (t < T_S) {
        const ql0 = Math.max(0, ql - .25), path = p.path(q => lead(ql0 + (ql - ql0) * q), 12);
        p.zap(path, 0, 1, ramp, { seed: seed * 3 + 1, jag: 1.2, step: 4, tail: .45, thick: 1, forks: 0, gaps: .02 });
      }
    } else if (pull && cnt > 0) {
      // the pull: the thread snaps straight and white, follows the soldiers into the pile, then breaks up
      // a white front runs along the thread in route order; as each soldier is yanked its stretch of thread breaks
      // up behind it (core, gold, segments, single pixels) so the flying soldiers stay visible
      if (t < this.T_PULL + this.SPREAD + .5) for (let k = 1; k < cnt; k++) {
        const a = t - dep(k);
        if (a < -.07) stitch(k, 1, 1, null, far);
        else if (a < .05) this.seg(p, W(k - 1), W(k), ramp, 3, 1, null);
        else if (a < .11) this.seg(p, W(k - 1), W(k), ramp, 2, 1, null);
        else if (a < .2) this.seg(p, W(k - 1), W(k), ramp, 1, 1, j => ((k + (j >> 1)) & 1) === 0);
        else if (a < .34 && p.r(k, 64) > (a - .2) / .14) { const c = W(k); p.dot(c[0], c[1], c[2] + .05 - .3 * (a - .2), ramp, 1.5 / 4); }
      }
      // the taut line from the hand to the pile
      const top = [BX, BY, Hb * .8 + .1], hand = fig.hand, tl = 1 - p.ph(t, 4.7, 5.3);
      if (tl > 0) {
        const path = p.path([hand, top]);
        p.zap(path, 0, 1, ramp, { seed: seed * 5 + 2, jag: t < 4.6 ? 1 : .6, step: 5, thick: t < 4.6 ? 1 : 0, forks: 0, gaps: .02, fade: p.ph(t, 4.6, 5.3) });
      }
    }

    // ----- the knot: two windings run up two helices around the pile, half a turn apart -----
    const wraps = [0, 1].map(c => p.helix({ c: [BX, BY, .04], dir: [0, 0, 1], len: Hb + .22, r: Rb + .07, turns: 2.5, phase: c * Math.PI, n: 48 }));
    const wMarks = [[], []];
    if (pull && cnt > 0 && t < 5.5) {
      for (let c = 0; c < 2; c++) {
        const w0 = 4.32 + c * .1, h = p.easeOut(p.ph(t, w0, w0 + .26));
        if (h <= 0) continue;
        const fd = p.ph(t, 4.8, 5.45);
        p.zap(wraps[c], 0, h, ramp, { seed: seed * 7 + c, jag: 1, step: 4, tail: h < 1 ? .45 : 1, thick: 1, forks: h < 1 ? 1 : 0, fade: h < 1 ? 0 : Math.max(.15, fd) });
        if (h < 1) wMarks[c].push(wraps[c].at(h));
      }
      const kn = p.ph(t, 4.55, 4.75);
      if (kn > 0 && kn < 1) p.sparkle(BX, BY, Hb + .28, Math.round(5 * (1 - kn)) + 1, ramp, 1);
      if (t > 4.5 && t < 4.95) p.shock(BX, BY, .04, p.ph(t, 4.55, 4.95), { R: 1.3 + Rb, w: .12, ramp, ground: true, dust: this.palette.dust, dustN: 12 });
      p.light(BX, BY, .3, 1.2 + Rb, ramp, .8 * (1 - p.ph(t, 4.6, 5.4)));
    }

    // ----- guides: the route (red) with the needle marker; the pile's windings (red / green) -----
    if (p.guiding) {
      if (!pull) {
        const g = [];
        for (let j = 0; j <= 10; j++) g.push(lead(j / 10));
        for (let k = 0; k < R.n; k++) g.push(W(k));
        p.guide(g, 'red', { marks });
      } else if (t < 5.5 && cnt > 0) {
        const g = [fig.hand];
        for (let k = 0; k < cnt; k++) g.push(W(k));
        p.guide(g, 'gold', { marks: [] });
        p.guide(wraps[0], 'red', { marks: wMarks[0] });
        p.guide(wraps[1], 'green', { marks: wMarks[1] });
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: p.ph(t, 1.1, 1.3) * (1 - p.ph(t, 5.25, 5.45)) });
  },
});
