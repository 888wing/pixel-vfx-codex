// 血咒蔓延 / Blood Contagion — Scale Ladder pack (original design), tier 1000: a flicked blood curse jumps soldier to soldier through a legion as a red web, then every cursed soldier bursts into crimson light at once
PXFX.define({
  id: 'blood-contagion',
  loop: 5.5,
  beats: [{ t: .9, kind: 'cast', power: .7 }, { t: 1.05, kind: 'pulse', power: .6 }, { t: 3.0, kind: 'hit', power: 1.45 }],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'ash' },
  modules: ['figure', 'charge', 'domain', 'crowd', 'troops', 'tally', 'shockwave', 'impact', 'aftermath'],
  palette: {
    blood: ['#6a0a1c', '#a8142c', '#e02a44', '#ff6070', '#ffc8c8'],
    thread: ['#5a0814', '#9a1028', '#d8243e', '#ff5a6a'],
    mist: ['#2e080e', '#4a0e18', '#6e1624', '#922032'],
    gore: ['#1e0408', '#30080e', '#440c14', '#5a121c'],
  },
  timeline: [
    { k: 'pose', t: [0, .9], zh: '起手：施法者（縮放 0.85，站在 x = −4.3）由待機向後蓄勢（0.55 秒），0.85 秒向前一甩手；千人大軍（預設 1000 人楔形，尖端向著施法者，中心 (1.0, 0)、半深 2.8、半寬 2.6）在場中列陣，鋼灰頭盔，3–5 像素高的像素小兵', en: 'pose: the caster (scale 0.85, at x = −4.3) winds back (0.55 s) and flicks the hand forward at 0.85 s; a legion of 1000 (wedge by default, apex towards the caster, centre (1.0, 0), half depth 2.8, half width 2.6) stands on the field as 3–5 px pixel soldiers with steel-grey helmets' },
    { k: 'charge', t: [.2, 1.6], zh: '集氣：蓄勢時 12 粒血紅光點匯聚到手上；甩手時天空由手部向外以抖色圓形擦除換成暗紅血雲（0.7 秒），地面換成暗褐紅', en: 'charge: 12 blood-red motes gather in the hand during the wind-up; on the flick the sky wipes out from the hand into dark red blood clouds (0.7 s, dithered radial wipe) and the ground turns dark red-brown' },
    { k: 'shape', t: [.9, 1.1], zh: '成形：一滴血咒（亮紅小球＋拖尾）沿弧線在 0.15 秒內飛到離施法者最近的士兵（楔形尖端），1.05 秒命中，該士兵閃白後變成暗紅色，頭上亮起一點紅印', en: 'shape: a drop of blood curse (bright red bead with a trail) arcs over 0.15 s to the soldier nearest the caster (the wedge apex), landing at 1.05 s; that soldier flashes white, turns dark red and a red mark lights above the head' },
    { k: 'motion', t: [1.05, 3.0], zh: '推進：咒印像傳染病一樣跳開：每個中咒士兵會傳給「傳染距離」（預設 0.3）以內的每個士兵，延遲 = 0.02 + 距離 ÷ (7 × 蔓延速度) 秒；用 Dijkstra 在鄰近網格上一次算好每個士兵最早的中咒時間（預設約 1.3 秒傳遍整個楔形）。判定：可以由第一個士兵經一連串 ≤ 傳染距離的跳躍到達、且中咒時間早於 3.0 秒的爆發即中招；命中時間 = 中咒時間。每次傳染時一條細紅線由傳染者閃到被傳染者，0.25 秒內暗成淡紅網；中咒士兵閃白 1 格後身體變暗紅、頭上一點紅印、原地發抖', en: 'motion: the curse spreads like a contagion: every cursed soldier passes it to every soldier within the jump distance (default 0.3) after 0.02 + distance / (7 × spread speed) s; the earliest infection time of every soldier is computed once with Dijkstra over neighbour-grid links (about 1.3 s across the default wedge). Area test: hit if the soldier can be reached from the first one through jumps ≤ the jump distance and its infection time is before the burst at 3.0 s; hit time = infection time. Each infection flickers a thin red thread from infector to infected that dims within 0.25 s into a faint red web; cursed soldiers flash white for one frame, turn dark red, get a red mark above the head and tremble' },
    { k: 'impact', t: [3.0, 3.5], zh: '命中：最後 0.3 秒全網加亮；3.0 秒施法者握拳出拳，1 格暗紅／粉白兩色衝擊格＋頓幀，所有中咒士兵同一瞬間閃白爆散：整片紅網爆亮後消失，大軍上空一團大紅光、地面紅光與一圈和中咒範圍同大的血色衝擊環，36 道血紅光柱向上衝出，約 60 團暗紅血霧與 80 粒紅光點升起；士兵原地只剩一灘暗紅血跡', en: 'impact: the web brightens over the last 0.3 s; at 3.0 s the caster punches the air with a clenched fist, one two-tone dark red / pale pink impact frame and a hit-stop, and every cursed soldier bursts at once in a white flash: the whole web flares and vanishes, a big red glow over the army, red ground light and a blood-red shock ring as wide as the cursed area, 36 crimson light streaks shoot upwards, about 60 dark red mist puffs and 80 red motes rise; each soldier leaves only a dark red splash' },
    { k: 'after', t: [3.5, 5.5], zh: '餘波：血霧上升變淡，血跡在 3.8–4.5 秒淡出，3.6–4.5 秒天空與地面淡回原色，擊殺計數 4.1–4.5 秒淡出，4.45–5.3 秒新一批士兵原地淡入，施法者回到待機', en: 'aftermath: the mist rises and thins, the splashes fade at 3.8–4.5 s, the sky and ground dither back at 3.6–4.5 s, the kill counter fades at 4.1–4.5 s, a fresh army fades in on its spots at 4.45–5.3 s and the caster returns to idle' },
  ],
  layers: [
    { zh: '大軍：敵兵數量 500–2000（預設 1000），按陣型（預設楔形）排在中心 (1.0, 0)、半深 2.8、半寬 2.6 的範圍內，鋼灰頭盔；楔形兵距約 0.12，預設傳染距離 0.3 跨得過整個陣型；士兵大小按兵距自動縮放並換成像素小兵；左上角擊殺計數 HUD 隨傳染即時累加，全滅時變金色', en: 'army: 500–2000 soldiers (default 1000) in a formation (default wedge) inside centre (1.0, 0), half depth 2.8, half width 2.6, steel-grey helmets; the wedge spacing is about 0.12, so the default jump of 0.3 bridges the whole formation; soldier size follows the spacing and swaps to pixel soldiers; a kill counter HUD in the top-left counts up live as the curse spreads and turns gold on a full wipe' },
    { zh: '判定與倖存者：傳染圖——士兵之間距離 ≤ 傳染距離就連一條邊，邊權 = 0.02 + 距離 ÷ (7 × 蔓延速度)；由離施法者最近的士兵開始做 Dijkstra，到得了而且中咒時間早於爆發（3.0 秒）的士兵中招。分隊之間、散兵之間距離太遠時咒印跳不過去，蔓延太慢時爆發前未傳到的士兵也倖存；倖存者只會發抖', en: 'area test and survivors: a contagion graph — soldiers closer than the jump distance are linked, edge cost 0.02 + distance / (7 × speed); Dijkstra from the soldier nearest the caster; soldiers it reaches before the burst (3.0 s) are hit. When squads or skirmishers stand too far apart the curse cannot jump the gap, and with a slow spread anyone not reached before the burst also survives; survivors only tremble' },
    { zh: '紅網：每條傳染路徑是一條由傳染者胸口到被傳染者胸口的細光線，新線 0.06 秒最亮，再暗成強度約 0.3 的淡紅網並輕微脈動，爆發時全網閃亮後消失', en: 'red web: each infection path is a thin light line from the infector’s chest to the infected chest, brightest for 0.06 s, then dimming to a faint red web (intensity ~0.3) with a slight pulse; on the burst the whole web flares and vanishes' },
    { zh: '中咒外觀（自訂反應）：士兵改用暗紅身體＋血紅頭盔的調色盤自行重畫，原地抖動（0.012），頭上一點亮紅像素印記；不做每個單位的光暈，千人時仍然很快', en: 'cursed look (custom reaction): the soldier is redrawn with a dark red body and blood-red helmet palette, trembles in place (0.012) and carries a single bright red pixel mark above the head; no per-unit glow, so a thousand units stay fast' },
    { zh: '爆發：每個中咒士兵閃白 0.07 秒後換成平躺的暗紅血跡；共用效果包括大軍上空一團大紅光、地面紅光、血色衝擊環、36 道向上衝的紅光柱、60 團抖色暗紅血霧與 80 粒上升紅光點', en: 'burst: each cursed soldier flashes white for 0.07 s and then becomes a flat dark red splash; shared effects are one big red glow over the army, red ground light, a blood-red shock ring, 36 crimson streaks shooting up, 60 dithered dark red mist puffs and 80 rising red motes' },
    { zh: '天空：領域模組換成暗紅血雲，地面重新映射成暗褐紅；血咒小球是亮紅球加 6 段漸細拖尾', en: 'sky: the domain module swaps the page for dark red blood clouds and remaps the ground to dark red-brown; the curse drop is a bright red bead with a six-segment tapering trail' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 3, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    jump: { zh: '傳染距離', en: 'jump distance', min: .1, max: .6, step: .05, value: .3 },
    speed: { zh: '蔓延速度', en: 'spread speed', min: .5, max: 2, step: .1, value: 1 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  SKY: { top: '#140306', bottom: '#44101a', nebula: '#621824', stars: 0 },
  GROUND: ['#1c1214', '#28181c', '#352024', '#43282c'],
  T0: 1.05, BURST: 3.0,
  CURSE: { body: ['#2a0a10', '#3e0e16', '#561420', '#701c28'], helm: ['#5e0c1a', '#861222', '#b01c30', '#d6303e'], spear: ['#3d3640', '#6e6672', '#d8d2dc'] },
  SPLAT: { body: ['#1e0408', '#30080e', '#440c14', '#5a121c'], helm: ['#30080e', '#440c14', '#5a121c', '#6e1822'], spear: ['#3d3640', '#6e6672', '#d8d2dc'] },
  // earliest infection time of every unit: Dijkstra over neighbour links (cached per layout, jump and speed)
  spread(p, units, jump, speed) {
    const key = jump + '|' + speed;
    if (this._sp && this._sp.units === units && this._sp.key === key) return this._sp;
    const n = units.length, T = new Float64Array(n).fill(Infinity), par = new Int32Array(n).fill(-1);
    const grid = p.crowdGrid(units, Math.max(.05, jump));
    let src = 0, bd = Infinity;
    for (const u of units) { const d = Math.hypot(u.x - this.CASTER[0], u.y - this.CASTER[1]); if (d < bd) { bd = d; src = u.i; } }
    T[src] = 0;
    const hk = [0], hv = [src];   // binary heap of (time, index)
    const push = (k, v) => {
      let i = hk.length; hk.push(k); hv.push(v);
      while (i) { const q = (i - 1) >> 1; if (hk[q] <= k) break; hk[i] = hk[q]; hv[i] = hv[q]; i = q; }
      hk[i] = k; hv[i] = v;
    };
    const pop = () => {
      const v = hv[0], lk = hk.pop(), lv = hv.pop();
      if (hk.length) {
        let i = 0;
        for (;;) {
          const l = 2 * i + 1, r = l + 1;
          let m = i, mk = lk;
          if (l < hk.length && hk[l] < mk) { m = l; mk = hk[l]; }
          if (r < hk.length && hk[r] < mk) { m = r; mk = hk[r]; }
          if (m === i) break;
          hk[i] = hk[m]; hv[i] = hv[m]; i = m;
        }
        hk[i] = lk; hv[i] = lv;
      }
      return v;
    };
    const done = new Uint8Array(n);
    while (hk.length) {
      const i = pop();
      if (done[i]) continue;
      done[i] = 1;
      const u = units[i];
      for (const v of grid.near(u.x, u.y, jump)) {
        if (v.i === i || done[v.i]) continue;
        const nt = T[i] + .02 + Math.hypot(v.x - u.x, v.y - u.y) / (7 * speed);
        if (nt < T[v.i]) { T[v.i] = nt; par[v.i] = i; push(nt, v.i); }
      }
    }
    const order = [];
    for (let i = 0; i < n; i++) if (T[i] < Infinity) order.push(i);
    order.sort((a, b) => T[a] - T[b]);
    this._sp = { units, key, T, par, src, order };
    return this._sp;
  },
  draw(p, t) {
    const PL = this.palette, BL = PL.blood, T0 = this.T0, BURST = this.BURST;
    const n = Math.round(p.param('crowd')), jump = p.param('jump'), speed = p.param('speed');
    const form = PXFX.TROOPS[p.param('formation') | 0].id;
    const units = p.crowdLayout({ n, seed: 31, formation: form, area: this.AREA });
    const sp = this.spread(p, units, jump, speed);
    const inf = i => (sp.T[i] < Infinity && T0 + sp.T[i] < BURST - .02 ? T0 + sp.T[i] : null);
    const b = t - BURST;
    // ---- caster ----
    let pose;
    if (t < .15) pose = 'idle';
    else if (t < .7) pose = { a: 'idle', b: 'windup', k: p.easeOutCubic(p.ph(t, .15, .7)) };
    else if (t < .85) pose = 'windup';
    else if (t < 1.5) pose = { a: 'windup', b: 'swing', k: p.easeInCubic(p.ph(t, .85, .92)) };
    else if (t < 2.9) pose = { a: 'swing', b: 'point', k: p.easeOutCubic(p.ph(t, 1.5, 1.9)) };
    else if (t < 3.8) pose = { a: 'point', b: 'punch', k: p.easeInCubic(p.ph(t, 2.9, BURST)) };
    else pose = { a: 'punch', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.8, 4.5)) };
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .85 });
    // ---- the army: cursed soldiers are redrawn by hand with a blood palette ----
    const cursed = [];
    const react = (s, a, u, pp, o) => {
      s.walk = null; s.spear = false;
      const c = Object.assign({}, s);
      s.hide = true;
      if (o.t < BURST) {
        c.jit = .012; c.tilt = .08 + .05 * Math.sin(o.t * 37 + u.r2 * 9); c.spear = a < .15;
        c.k = 0;
      } else {
        const bb = o.t - BURST - .04 * u.r1;
        if (bb < .07) { c.flash = true; c.jit = .02; c.k = 1; }
        else { c.flash = false; c.tilt = Math.PI / 2; c.sq = .45; c.wide = 1.5; c.k = 2; c.tdir = [Math.cos(u.r3 * 6.28), Math.sin(u.r3 * 6.28)]; }
        // splashes fade in the clear window
        const st = 3.8 + .4 * u.r2;
        c.alpha = 1 - p.ph(o.t, st, st + .3);
      }
      if (c.alpha > 0) cursed.push(c);
    };
    const st = p.crowd({
      n, seed: 31, formation: form, area: this.AREA, scale: 'auto', t, pal: 'steel',
      hit: u => inf(u.i), react,
      at: [this.CASTER[0], this.CASTER[1], 0],
      fear: u => {
        const th = inf(u.i);
        if (th == null) return p.env(t, 1.6, 2.4, 3.3, 3.9) * (.4 + .4 * u.r3);
        return p.ph(t, th - .35, th) * .5;
      },
      respawn: [4.45, 5.3], clear: [3.8, 4.5], enter: 'fade',
    });
    const sc = st.scale, drawer = st.lod === 'sprite' ? p.pawnSprite : p.pawn, heads = new Map();
    for (const c of cursed) {
      c.hide = false;
      const r = drawer.call(p, c, { scale: sc, pal: c.k === 2 ? this.SPLAT : this.CURSE, spears: true });
      if (r && c.k === 0) heads.set(c.i, r.head);
    }
    // ---- the world turns to blood ----
    const skyK = t < 2 ? p.easeOutCubic(p.ph(t, .85, 1.55)) : 1 - p.ph(t, 3.6, 4.5);
    if (skyK > .01) p.domain({ amt: skyK, c: t < 2 ? fig.hand : [this.AREA.x, this.AREA.y, 0], sky: this.SKY, ground: this.GROUND, solids: .1, t, fade: t > 2 });
    // ---- light: charge, the curse drop ----
    if (t > .2 && t < 1.0) {
      const ch = p.ph(t, .2, .85), h = fig.hand;
      p.charge(h[0], h[1], h[2], ch, { n: 12, R: .9, ramp: BL, up: .2 });
      p.glow(h[0], h[1], h[2], .1 + .14 * ch, BL, t < .9 ? .8 * ch : 1 - p.ph(t, .9, 1.0));
    }
    const s0 = st[sp.src], tgt = s0 ? s0.chest : [this.AREA.x - this.AREA.rx, 0, .2];
    if (t >= .88 && t < T0 + .02) {
      const h = fig.hand, k = p.ph(t, .88, T0), e = p.easeIn(k), pt = q => p.arcPos(h, tgt, q, .7);
      const pts = [];
      for (let j = 0; j < 7; j++) pts.push(pt(Math.max(0, e - j * .06)));
      p.trail(pts, .09, .02, BL, 1.2, .3);
      const c = pt(e);
      p.orb(c[0], c[1], c[2], .07, BL, 1.1);
    }
    // ---- the red web ----
    const chest = i => (heads.has(i) ? heads.get(i) : st[i].chest);
    if (b < .2) {
      const webI = b < 0 ? .15 + .03 * Math.sin(t * 7) + .2 * p.ph(t, BURST - .3, BURST) : 1.2 * (1 - b / .2);
      for (const i of sp.order) {
        const ti = inf(i);
        if (ti == null || t < ti) break;
        const pi = sp.par[i];
        if (pi < 0) continue;
        const age = t - ti, I = b >= 0 ? webI : age < .06 ? 1.2 : Math.max(webI, 1.2 - (age - .06) * 6);
        const A = chest(pi), Bc = chest(i);
        p.line(A, Bc, .02, PL.thread, I, age < .1 && b < 0 ? { w1: .05 } : undefined);
      }
    }
    // marks above the heads of the cursed
    if (b < 0) for (const [i, hd] of heads) p.dot(hd[0], hd[1], hd[2] + .07 * sc / .3, BL, .62 + .12 * Math.sin(t * 13 + i), 1);
    // contact flash where the drop lands
    if (t >= T0 && t < T0 + .25) p.glow(tgt[0], tgt[1], tgt[2], .35, BL, 1.2 * (1 - p.ph(t, T0, T0 + .25)));
    // ---- the burst ----
    const C = this.centroid(st, inf);
    if (b >= 0 && b < .021 + 1 / 30) p.impactFrame({ ink: '#1a0408', paper: '#ffe4e4', accent: '#ff3a5a' });
    if (b >= 0 && C) {
      const f = 1 - p.ph(b, .03, .45);
      if (f > 0) { p.glow(C[0], C[1], .5, 2.6, BL, .55 * f * f, { pow: 2.4 }); p.light(C[0], C[1], 0, 4.5, BL, 1.1 * f); }
      p.shock(C[0], C[1], .12, p.ph(b, 0, .8), { R: C[2] + .5, w: .3, ramp: BL, ground: true });
      const hits = this.hitStates(st, inf), nm = Math.round(60 * Math.min(1.5, p.density)), nd = Math.round(80 * p.density);
      if (hits.length) {
        for (let k = 0; k < nm; k++) {
          const s = hits[Math.floor(p.r(k, 51) * hits.length)], u = p.ph(b, .03 * p.r(k, 52), 1.2 + .5 * p.r(k, 53));
          if (u <= 0 || u >= 1) continue;
          const e = p.easeOutCubic(u);
          p.ball(s.u.x + (p.r(k, 54) - .5) * .5 * e, s.u.y + (p.r(k, 55) - .5) * .5 * e, .15 + .9 * e, .14 + .26 * e, PL.mist, { alpha: .9 * Math.pow(1 - u, .8), rough: .45, shadow: false, seed: k });
        }
        // crimson light bursting upwards out of the army
        const nP = Math.round(36 * Math.min(1.5, p.density));
        for (let k = 0; k < nP; k++) {
          const s = hits[Math.floor(p.r(k, 71) * hits.length)], u = p.ph(b, .03 * p.r(k, 72), .32 + .15 * p.r(k, 73));
          if (u <= 0 || u >= 1) continue;
          const top = (1.1 + 1.4 * p.r(k, 74)) * p.easeOutExpo(u * 1.6), bot = top * p.easeInCubic(u);
          p.line([s.u.x, s.u.y, bot], [s.u.x, s.u.y, top], .05, BL, 1.15 * (1 - u), { w1: .02, i1: .4 * (1 - u) });
        }
        for (let k = 0; k < nd; k++) {
          const s = hits[Math.floor(p.r(k, 61) * hits.length)], u = p.ph(b, .02 * p.r(k, 62), .9 + .5 * p.r(k, 63));
          if (u <= 0 || u >= 1) continue;
          p.dot(s.u.x + (p.r(k, 64) - .5) * .3, s.u.y + (p.r(k, 65) - .5) * .3, .2 + 1.5 * p.easeOut(u), BL, 1.1 * (1 - u), 1);
        }
      }
    }
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.1, 4.5) });
  },
  // states of units hit before the burst (for shared mist and motes)
  hitStates(st, inf) {
    const out = [];
    for (const s of st) if (inf(s.u.i) != null && !s.fresh) out.push(s);
    return out;
  },
  centroid(st, inf) {
    let x = 0, y = 0, c = 0, R = 0;
    for (const s of st) if (inf(s.u.i) != null) { x += s.u.x; y += s.u.y; c++; }
    if (!c) return null;
    x /= c; y /= c;
    for (const s of st) if (inf(s.u.i) != null) R = Math.max(R, Math.hypot(s.u.x - x, s.u.y - y));
    return [x, y, R];
  },
});
