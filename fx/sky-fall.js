// 天地倒轉 / Sky Fall — Twist pack (original design): the caster slams a hand down, the whole picture flips upside down and an army of ten thousand falls "up" into a sea of clouds; only soldiers near the glowing anchor stakes hold on
PXFX.define({
  id: 'sky-fall',
  loop: 6,
  beats: [{ t: .75, kind: 'cast', power: .5 }, { t: 1.2, kind: 'hit', power: 1.3 }, { t: 1.42, kind: 'pulse', power: .8 }, { t: 3.32, kind: 'pulse', power: .6 }],
  view: { r: 6.6, h: 4 },
  stage: { ground: 'sand' },
  modules: ['figure', 'charge', 'crowd', 'troops', 'tally', 'shockwave', 'domain'],
  palette: {
    // the stakes' light, the slam and the gravity motes: pale astral blue
    astral: ['#3a5aa8', '#5a86d8', '#a8c8ff', '#e0ecff', '#ffffff'],
    // anchor stakes: dark iron solids under the glowing rim
    iron: ['#1c2030', '#2a3044', '#3c4460', '#56607e'],
    // the upside-down sky and its sea of clouds (screen space, after the flip)
    sky: ['#cfe6ff', '#a8ccf4', '#7aa8e6', '#4f84d2'],
    cloud: ['#9cb2d4', '#c4d4ea', '#e6eef8', '#ffffff'],
    grain: ['#8a6a44', '#b08c5c', '#d2b07a', '#ecd29c'],
  },
  timeline: [
    { k: 'pose', t: [0, .75], zh: '起手：細小的施法者（縮放 0.7，站在 x = −5.2 島的近邊）待機，對面是一萬人方陣（中心 (0.8, 0)、半深 3.8、半寬 3.8，每人 1–2 像素的頭盔海，沙地）；0.4–0.75 秒施法者舉起右手，12 粒淡藍光點匯聚到手上', en: 'pose: a small caster (scale 0.7, at x = −5.2 on the near edge of the island) idles facing a block of ten thousand (centre (0.8, 0), half depth 3.8, half width 3.8, a sea of 1–2 px helmets on sand); at 0.4–0.75 s the caster raises the right hand and 12 pale blue motes gather in it' },
    { k: 'charge', t: [.75, 1.2], zh: '集氣：anchors（預設 0，最多 5）根錨樁由手中沿弧線飛出，每隔 0.07 秒一根釘進固定位置（(0.8, 0)、(−1.8, −1.6)、(2.6, −2.6)、(3.2, 2.2)、(−1.2, 2.6)）：深鐵色細長樁（高 0.9）頂端一點白藍光，地面亮起半徑 = anchorRadius（預設 1.2）的光環；施法者跳起', en: 'charge: `anchors` (default 0, up to 5) stakes arc out of the hand and drive in 0.07 s apart at fixed spots ((0.8, 0), (−1.8, −1.6), (2.6, −2.6), (3.2, 2.2), (−1.2, 2.6)): slim dark-iron stakes 0.9 tall with a white-blue light on top, each lighting a ground ring of radius `anchorRadius` (default 1.2); the caster hops up' },
    { k: 'shape', t: [1.2, 1.55], zh: '成形：1.2 秒施法者蹲下一掌拍地：頓幀、震屏、一圈淡藍衝擊環沿地面擴散到 9；1.3–1.55 秒整個畫面上下翻轉（後製：以螢幕中心為軸，垂直縮放 1 → 0 → −1，0.25 秒；縮到 0 時中間一條白色亮線），翻開的空位與背景換成倒過來的藍天（上淺下深四級色帶）', en: 'shape: at 1.2 s the caster crouches and slaps the ground: hit-stop, shake and a pale blue shock ring racing over the ground to radius 9; at 1.3–1.55 s the whole picture flips upside down (post pass: vertical scale about the screen centre 1 → 0 → −1 over 0.25 s, a white line across the middle at 0), and the uncovered rows and the background become an upside-down blue sky (four bands, pale at the top, deep at the bottom)' },
    { k: 'motion', t: [1.55, 3.2], zh: '推進：判定：士兵到最近錨樁的距離 > anchorRadius 就失去立足點（anchors = 0 時全部），命中時間 = 1.55 + (到施法者手的距離 − 1.2) × 0.085 + 隨機 0–0.08 秒（由施法者向外掃過）；拍地後 110 粒沙粒與小石先慢慢浮起；失足的士兵先彈起 0.1 秒，再以 14 × (0.6–1.4) 的加速度「向上」墜落、翻滾並向四周散開（每秒最多 1.4），在翻轉的畫面裡就是一路往下掉，沒入畫面底部的雲海（最遲在畫面翻回時全部消失）；錨樁範圍內的士兵抓緊不動、輕微抖動並傾向樁子，每根樁拉出 10 條淡藍細光', en: 'motion: rule: a soldier whose distance to the nearest anchor > anchorRadius loses his footing (all of them when anchors = 0); hit time = 1.55 + (distance to the caster’s hand − 1.2) × 0.085 + 0–0.08 s (a sweep outwards from the caster); right after the slap 110 sand grains and pebbles drift up first; a falling soldier hops for 0.1 s, then falls "up" at an acceleration of 14 × (0.6–1.4), tumbling and drifting apart (up to 1.4 units/s) — straight down the flipped picture — and sinks into the sea of clouds at the bottom (all gone by the time the picture flips back); soldiers inside a stake’s radius cling on, tremble and lean towards it, and each stake pulls 10 thin pale blue tethers' },
    { k: 'impact', t: [1.55, 3.45], zh: '命中：雲海：翻轉期間畫面底部 28% 是一條起伏的雲帶（白色雲頂、藍灰陰影，緩慢橫移），蓋過掉進去的士兵；擊殺計數在翻轉之後才畫，永遠正向，全滅時 10000/10000 變金色；3.2–3.45 秒畫面翻回（−1 → 0 → 1）', en: 'impact: the sea of clouds: while flipped the bottom 28% of the frame is a rolling cloud band (white tops, blue-grey shading, drifting sideways) that swallows the falling soldiers; the kill counter is drawn after the flip so it is never upside down, and turns gold at 10000/10000 on a full wipe; at 3.2–3.45 s the picture flips back (−1 → 0 → 1)' },
    { k: 'after', t: [3.45, 6], zh: '餘波：翻回後戰場空空如也，只剩錨樁周圍的士兵；藍天在 3.45–3.75 秒碎成一塊塊雲狀斑塊、淡回原本的背景；施法者站起；錨樁光環 3.6–4.3 秒淡出、樁子 4.0–4.5 秒沉入地面；擊殺計數 4.3–4.55 秒淡出，新的大軍 4.6–5.9 秒原地淡入', en: 'aftermath: flipped back, the field is empty except for the soldiers around the stakes; the blue sky breaks up into soft cloud-shaped patches and clears back to the normal background at 3.45–3.75 s; the caster stands up; the stake rings fade at 3.6–4.3 s and the stakes sink into the ground at 4.0–4.5 s; the counter fades at 4.3–4.55 s and a fresh army fades in on the spot at 4.6–5.9 s' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵數量 2000–12000（預設 10000），按陣型（預設方陣）排在中心 (0.8, 0)、半深 3.8、半寬 3.8 的範圍內，兵距決定大小，自動換成 1–2 像素的像素小兵；左上角擊殺計數在翻轉後製之後才畫，永遠正向，全滅時變金色', en: 'army and formation: 2000–12000 soldiers (default 10000) in a formation (default block) inside centre (0.8, 0), half depth 3.8, half width 3.8; the spacing sets their size and swaps them to 1–2 px pixel soldiers; the kill counter is drawn after the flip pass so it is never upside down, and turns gold on a full wipe' },
    { zh: '判定與倖存者：錨點 k 個（0–5，固定位置），士兵 i 失足 ⇔ min_k |士兵 − 錨點 k| > anchorRadius；命中時間由施法者的手向外掃（每單位距離 0.085 秒）；錨樁範圍內的士兵整個循環都站著，畫面翻回後一眼看出每根樁守住的圓', en: 'rule and survivors: k anchors (0–5, fixed spots); soldier i falls ⇔ min_k |soldier − anchor k| > anchorRadius; hit times sweep outwards from the caster’s hand (0.085 s per unit of distance); soldiers inside a stake’s radius stand through the whole loop, so after the flip-back the circle each stake held is plain to see' },
    { zh: '翻轉後製（每格一次全畫面）：把像素與像素類型按列複製，第 y 列取自 中心 + (y − 中心) ÷ s，s 為垂直縮放（1 → 0 → −1 → 0 → 1）；取不到的列與背景換成倒轉藍天（上淺下深四級抖色色帶），翻轉期間畫面底部再畫雲帶；沒有改動世界座標，所有判定仍在地面上', en: 'flip post pass (one full-frame pass per frame): copy pixels and pixel kinds row by row, output row y reads source row centre + (y − centre) / s with s the vertical scale (1 → 0 → −1 → 0 → 1); rows with no source and the background become the upside-down blue sky (four dithered bands, pale at the top, deep at the bottom), and the cloud band is painted at the bottom while flipped; the world itself never moves, so the rule stays on the ground' },
    { zh: '失足反應（自訂，一萬人也便宜）：彈起 0.1 秒後 z = 0.06 + 0.5 × 14 × (0.6–1.4) × a²，水平漂移 ≤ 1.4 × a，翻滾角 = a × (5 + 4 × 隨機)，1.3 秒後或畫面開始翻回時隱藏；不加每人光暈', en: 'fall reaction (custom, cheap for ten thousand): a 0.1 s hop, then z = 0.06 + 0.5 × 14 × (0.6–1.4) × a² with a sideways drift ≤ 1.4 × a, tumble angle = a × (5 + 4 × random), hidden after 1.3 s or once the picture starts to flip back; no per-unit glow' },
    { zh: '錨樁：深鐵色細長方柱（0.12 × 0.12，露出地面 0.9）、頂端白藍光點與十字閃光、地面一圈半徑 anchorRadius 的光環與受光；飛來時沿弧線，落地一圈小衝擊環', en: 'anchor stakes: slim dark-iron posts (0.12 × 0.12, 0.9 above the ground), a white-blue light and cross flare on top, a ground ring of radius anchorRadius with ground light; they fly in on arcs and land with a small shock ring' },
    { zh: '雲海：螢幕座標的雲帶，雲頂高度 = 底部 28% 加上兩層正弦起伏（隨時間橫移），雲內按深度分四級白藍灰；只在翻轉期間出現，蓋過底部的一切（擊殺計數除外）', en: 'sea of clouds: a screen-space band whose top edge is the bottom 28% plus two drifting sine undulations, shaded in four white-to-blue-grey steps by depth; it only exists while flipped and covers everything at the bottom except the kill counter' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 2000, max: 12000, step: 1, value: 10000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    anchors: { zh: '錨樁數量', en: 'anchor stakes', min: 0, max: 5, step: 1, value: 0 },
    anchorRadius: { zh: '錨樁範圍', en: 'anchor radius', min: .4, max: 2.5, step: .05, value: 1.2 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: .8, y: 0, rx: 3.8, ry: 3.8 },
  CASTER: [-5.2, 0],
  SLOTS: [[.8, 0], [-1.8, -1.6], [2.6, -2.6], [3.2, 2.2], [-1.2, 2.6]],
  TSLAM: 1.2, TF0: 1.3, TF1: 1.55, TB0: 3.2, TB1: 3.45,
  // per-unit rule (cached per layout + knobs): hit time or -1, and the anchor each survivor clings to
  rule(units, k, R) {
    const key = k + '|' + R;
    if (this._r && this._r.units === units && this._r.key === key) return this._r;
    const n = units.length, hit = new Float32Array(n).fill(-1), cling = new Int8Array(n).fill(-1);
    const hx = this.CASTER[0] + .45, hy = this.CASTER[1];
    for (let i = 0; i < n; i++) {
      const u = units[i];
      let best = Infinity, bk = -1;
      for (let j = 0; j < k; j++) { const d = Math.hypot(u.x - this.SLOTS[j][0], u.y - this.SLOTS[j][1]); if (d < best) { best = d; bk = j; } }
      if (best > R) hit[i] = this.TF1 + Math.max(0, Math.hypot(u.x - hx, u.y - hy) - 1.2) * .085 + u.r1 * .08;
      else cling[i] = bk;
    }
    // a few clinging soldiers per stake get a tether
    const teth = Array.from({ length: k }, () => []);
    for (let i = 0; i < n; i++) if (cling[i] >= 0 && teth[cling[i]].length < 10 && units[i].r3 < .5) teth[cling[i]].push(i);
    // per-unit vectors made once (ten thousand small arrays per frame would only feed the garbage collector):
    // the tumble direction of a falling soldier, and a point behind a clinging one so he leans towards his stake
    const dirs = units.map(u => [Math.cos(u.r3 * 6.28), Math.sin(u.r3 * 6.28)]);
    const leanAt = units.map((u, i) => (cling[i] >= 0 ? [u.x * 2 - this.SLOTS[cling[i]][0], u.y * 2 - this.SLOTS[cling[i]][1], 0] : null));
    this._r = { units, key, hit, cling, teth, dirs, leanAt };
    return this._r;
  },
  draw(p, t) {
    const PL = this.palette, K = p.param('anchors') | 0, AR = p.param('anchorRadius');
    const form = PXFX.TROOPS[p.param('formation') | 0].id, n = Math.round(p.param('crowd'));
    const units = p.crowdLayout({ n, seed: 29, formation: form, area: this.AREA, faceTo: this.CASTER });
    const R = this.rule(units, K, AR), SLOTS = this.SLOTS;
    const TS = this.TSLAM, TF0 = this.TF0, TF1 = this.TF1, TB0 = this.TB0, TB1 = this.TB1;
    // ---- caster: raise, hop, slap the ground, hold on, stand up ----
    let pose, lift = 0;
    if (t < .4) pose = 'idle';
    else if (t < 1.05) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .4, .75), 1.3) };
    else if (t < 3.5) pose = { a: 'raise', b: 'charge', k: p.easeInCubic(p.ph(t, 1.05, TS)) };
    else pose = { a: 'charge', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.5, 4.2)) };
    if (t >= 1.05 && t < TS) lift = .25 * Math.sin(Math.PI * p.ph(t, 1.05, TS));
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .7, lift });
    const palm = [this.CASTER[0] + .45, this.CASTER[1], .05];
    // ---- anchor stakes: fly in, drive in, glow, sink away after the loop's payoff ----
    const sink = p.easeInCubic(p.ph(t, 4.0, 4.5)), ringA = 1 - p.ph(t, 3.6, 4.3);
    const stakes = [];
    for (let j = 0; j < K; j++) {
      const [sx, sy] = SLOTS[j], tl = .8 + j * .07, a = t - tl;
      if (a < -.22 || sink >= 1) continue;
      let pos;
      if (a < 0) { const u = p.easeInCubic(1 + a / .22); pos = p.arcPos(fig.hand, [sx, sy, .3], u, 1.6); }
      else pos = [sx, sy, .3 - .9 * sink];
      const top = [pos[0], pos[1], pos[2] + .6];
      p.box(pos[0] - .06, pos[1] - .06, Math.max(0, pos[2] - .3), pos[0] + .06, pos[1] + .06, top[2], PL.iron, { shadow: a >= 0 });
      if (sink < .7) {
        const fl = .85 + .15 * Math.sin(t * 9 + j * 2);
        p.orb(top[0], top[1], top[2] + .05, .09, PL.astral, fl);
        p.glow(top[0], top[1], top[2] + .05, .35, PL.astral, .7 * fl * (1 - sink));
      }
      if (a >= 0) {
        stakes.push({ j, x: sx, y: sy, top });
        if (a < .3) p.shock(sx, sy, .03, a / .3, { R: .8, w: .1, ramp: PL.astral });
        if (a < .2) p.sparkle(top[0], top[1], top[2] + .1, 5, PL.astral, 1 - a / .2);
        const rk = p.easeOutBack(p.ph(a, 0, .25), 1.4) * ringA;
        if (rk > 0) {
          p.ring(sx, sy, .02, AR * Math.min(1, rk), .06, PL.astral, .85 * ringA, { fn: ang => .7 + .3 * Math.sin(ang * 6 + t * 3) });
          p.light(sx, sy, 0, AR * 1.1, PL.astral, .45 * ringA);
        }
      }
    }
    // ---- the army: soldiers beyond every stake's reach fall "up" ----
    const g = 14, flipped = t >= TF0 && t < TB1;
    const st = p.crowd({
      n, seed: 29, formation: form, area: this.AREA, faceTo: this.CASTER, t, scale: 'auto',
      hit: u => (R.hit[u.i] >= 0 ? R.hit[u.i] : null),
      react: (s, a, u, pp, o) => {
        s.walk = null; s.spear = false; s.jit = 0;
        if (o.t >= TB0) { s.hide = true; return; }   // gone into the clouds before the picture flips back
        const fa = Math.max(0, a - .1);
        const gu = g * (.6 + .8 * u.r2), dr = 1.4 * u.r3, da = u.r1 * 40;
        s.z = .06 * Math.sin(Math.PI * Math.min(1, a / .1)) + (fa > 0 ? .06 + .5 * gu * fa * fa : 0);
        s.noShadow = s.z > .3;   // flung far off the ground: no shadow smear on the field
        s.x += Math.cos(da) * dr * fa; s.y += Math.sin(da) * dr * fa;   // the falling crowd spreads into a rain of specks
        s.tdir = R.dirs[u.i];
        s.tilt = fa * (5 + 4 * u.r2);
        if (a > 1.3) s.hide = true;
      },
      fear: u => {
        if (R.hit[u.i] >= 0) return p.env(t, TS, TS + .1, TF1, TF1 + .2) * .8;
        return flipped ? .9 : p.env(t, TB1, TB1 + .1, 3.8, 4.4) * .6;
      },
      at: u => (R.cling[u.i] >= 0 ? R.leanAt[u.i] : palm),
      respawn: [4.6, 5.9], clear: [4.2, 4.4], enter: 'fade',
    });
    // tethers from each stake to a few of the soldiers clinging to it
    if (flipped || t < TB1 + .3) {
      const tA = p.env(t, TF1, TF1 + .15, TB0, TB1 + .3);
      if (tA > 0) for (const s of stakes) for (const i of R.teth[s.j]) {
        const c = st[i].chest;
        p.line(s.top, c, .02, PL.astral, .55 * tA * (.7 + .3 * Math.sin(t * 13 + i)));
      }
    }
    // ---- the slam: charge motes, then a shock ring across the ground ----
    if (t > .4 && t < 1.0) p.charge(fig.hand[0], fig.hand[1], fig.hand[2] + .1, p.ph(t, .4, .95), { n: 12, R: .8, ramp: PL.astral, up: .4 });
    const sa = t - TS;
    if (sa >= 0 && sa < .6) {
      p.shock(palm[0], palm[1], .04, sa / .6, { R: 9, w: .35, ramp: PL.astral, ground: true });
      if (sa < .12) { p.glow(palm[0], palm[1], .15, .7, PL.astral, 1.3 * (1 - sa / .12)); p.sparkle(palm[0], palm[1], .2, 9, PL.astral, 1.2); }
      if (sa < .25) p.speedLines(palm[0], palm[1], .3, { n: 14, R0: .6, R1: 2.4, ramp: PL.astral, I: 1 - sa / .25, seed: Math.floor(t * 30) });
    }
    if (flipped) p.glow(palm[0], palm[1], .12, .3, PL.astral, .7);   // the caster's own hand holds on
    // loose sand and pebbles lift off first: the ground has stopped pulling
    if (sa > 0 && t < TB0) {
      const nG = Math.round(110 * p.density);
      for (let k = 0; k < nG; k++) {
        const rr = 5.4 * Math.sqrt(p.r(k, 61)), ang = p.r(k, 62) * p.TAU, gx = Math.cos(ang) * rr, gy = Math.sin(ang) * rr;
        const a0 = sa - Math.hypot(gx - palm[0], gy - palm[1]) * .03 - p.r(k, 63) * .1;
        if (a0 <= 0) continue;
        const z = .5 * (2.5 + 4 * p.r(k, 64)) * a0 * a0;
        p.ball(gx, gy, z, .025 + .03 * p.r(k, 65), PL.grain, { shadow: false, alpha: .99 });
      }
    }
    // ---- the flip: one post pass mirrors the picture about the screen centre ----
    let s = 1;
    if (t >= TF0 && t < TF1) s = Math.cos(Math.PI * p.ph(t, TF0, TF1));
    else if (t >= TF1 && t < TB0) s = -1;
    else if (t >= TB0 && t < TB1) s = -Math.cos(Math.PI * p.ph(t, TB0, TB1));
    const skyA = t >= TF0 && t < TB1 ? 1 : t >= TB1 ? 1 - p.ph(t, TB1, TB1 + .3) : 0;
    const cloudA = p.env(t, TF0 + .1, TF1 + .05, TB0 - .05, TB0 + .15);
    if (s < 1 || skyA > 0) this.flip(p, s, skyA, cloudA, t);
    // ---- the kill counter goes last, after the flip: never upside down ----
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.55) });
  },
  // vertical flip about the screen centre (scale s), upside-down sky on uncovered rows + background, cloud band
  flip(p, s, skyA, cloudA, t) {
    const PL = this.palette, self = this;
    p.post(({ pix, kind, W, H, hex, rgb, bayer, night }) => {
      const N = W * H;
      if (!self._tmp || self._tmp.N !== N) self._tmp = { N, pix: new Uint32Array(N), kind: new Uint8Array(N) };
      const tp = self._tmp.pix, tk = self._tmp.kind;
      tp.set(pix); tk.set(kind);
      const cy = H / 2, bg = night ? rgb(20, 19, 26) : rgb(255, 255, 255);
      const cols = r => r.map(h => { const c = hex(h); return rgb(c[0] * (night ? .3 : 1) + (night ? 14 : 0), c[1] * (night ? .32 : 1) + (night ? 16 : 0), c[2] * (night ? .45 : 1) + (night ? 34 : 0)); });
      const sky = cols(PL.sky), cl = cols(PL.cloud);
      // the way out: the sky breaks up into soft cloud-shaped patches instead of an even dither
      const fadeAt = (x, y) => Math.min(1, Math.max(0, (p.noise(x * .045 * 240 / W + 3.1, y * .07 * 240 / W - 1.7) - .25) / .5)) * .82 + bayer(x, y) * .18;
      const skyAt = (x, y) => { const q = y / H + (bayer(x, y) - .5) * .16; return sky[Math.max(0, Math.min(3, Math.floor(q * 4)))]; };
      for (let y = 0; y < H; y++) {
        const src = Math.abs(s) < 1e-3 ? -1 : Math.floor(cy + (y + .5 - cy) / s);
        const row = y * W;
        if (src < 0 || src >= H) {
          for (let x = 0; x < W; x++) { pix[row + x] = skyA > 0 ? skyAt(x, y) : bg; kind[row + x] = 0; }
          continue;
        }
        const sr = src * W;
        for (let x = 0; x < W; x++) {
          const k = tk[sr + x];
          kind[row + x] = k;
          if (k === 0 && skyA > 0 && (skyA >= 1 || fadeAt(x, y) < skyA) && (tp[sr + x] >>> 24)) pix[row + x] = skyAt(x, y);
          else pix[row + x] = tp[sr + x];
        }
      }
      // the white line across the middle at the instant the picture is edge-on
      if (Math.abs(s) < .2) {
        const line = night ? rgb(200, 220, 255) : rgb(255, 255, 255), glow = cols(PL.astral.slice(1, 5))[1];
        for (let x = 0; x < W; x++) { pix[Math.floor(cy) * W + x] = line; pix[(Math.floor(cy) - 1) * W + x] = glow; pix[(Math.floor(cy) + 1) * W + x] = glow; }
      }
      // the sea of clouds at the bottom of the flipped picture
      if (cloudA > 0) {
        const base = H * (1 - .28 * cloudA);
        for (let x = 0; x < W; x++) {
          const u = x / W;
          const top = base + Math.sin(u * 13 + t * 1.3) * H * .025 + Math.sin(u * 31 - t * 2.1 + 1.7) * H * .015 + Math.max(0, Math.sin(u * 5.3 + t * .6)) * -H * .04;
          for (let y = Math.max(0, Math.floor(top)); y < H; y++) {
            const d = (y - top) / (H * .2) + (bayer(x, y) - .5) * .25;
            pix[y * W + x] = cl[d < .08 ? 3 : d < .35 ? 2 : d < .7 ? 1 : 0];
            kind[y * W + x] = 0;
          }
        }
      }
    });
  },
});
