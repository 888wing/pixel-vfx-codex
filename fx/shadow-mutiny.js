// 影子叛變 / Shadow Mutiny — Twist pack (original design): the caster drags a blazing sun down to the horizon, a thousand long shadows peel off the ground as black silhouettes with violet rims and stab their own soldiers; only soldiers under a summoned cloud cast no shadow and live
PXFX.define({
  id: 'shadow-mutiny',
  loop: 6,
  beats: [{ t: .9, kind: 'cast', power: .8 }, { t: 1.75, kind: 'pulse', power: .5 }, { t: 2.2, kind: 'hit', power: 1.4 }, { t: 2.85, kind: 'pulse', power: .4 }, { t: 3.5, kind: 'pulse', power: .5 }],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'sand' },
  modules: ['figure', 'charge', 'core', 'domain', 'crowd', 'troops', 'tally', 'impact'],
  palette: {
    sun: ['#c0501c', '#ec7a26', '#ffaa3c', '#ffd468', '#fff0b4', '#fffcf0'],
    rim: ['#5a34b0', '#7a56e0', '#9a7cff', '#c4b0ff', '#f0e8ff'],
    shade: ['#0a0612', '#120a1e', '#1a1029', '#251838'],
    cloud: ['#7e7c96', '#a6a4ba', '#ceccdc', '#efeef6'],
    motes: ['#6a48c8', '#9a7cff', '#d2c4ff', '#ffffff'],
  },
  timeline: [
    { k: 'pose', t: [0, .9], zh: '起手：施法者（x = −4.3，高約 1.3）面向一千名敵兵的方陣（中心 (1, 0)、半深 2.8、半寬 2.6，每人約 5 像素高，鋼灰頭盔）；正午陽光，每人腳下只有很短的影子；0.4 秒起施法者舉起右手，12 粒橙光匯聚到手心', en: 'pose: the caster (x = −4.3, ~1.3 tall) faces a block of a thousand soldiers (centre (1, 0), half depth 2.8, half width 2.6, ~5 px tall, steel helmets) under a noon sun with short shadows; from 0.4 s the caster raises the right hand and 12 orange motes gather in the palm' },
    { k: 'charge', t: [.9, 1.9], zh: '集氣：0.9 秒施法者身後高空亮起一個太陽（硬邊白熱核心半徑 0.5、橙色光暈、10 條旋轉光芒，閃光一次）；施法者把手掌向下壓，太陽在 1.0–1.9 秒緩入緩出地沉到施法者身後的地平線（高度角由 62° 降到 sun = 5°），天空由太陽處以抖色圓形擦除轉成黃昏（紫頂、橙紅底），地面染成夕陽橙；所有影子同步拉長：影長 = 身高 ÷ tan(高度角)，預設約身高的 11 倍，沿光線方向 (0.98, 0.2) 越過整個方陣伸向島邊；施法者自己的長影子也伸進敵陣', en: 'charge: at 0.9 s a sun flares high behind the caster (hard white-hot core r 0.5, orange halo, 10 rotating rays, one flash); the caster presses the palm down and the sun sinks to the horizon behind the caster over 1.0–1.9 s (eased; elevation 62° → sun = 5°) while the sky wipes from the sun into a dusk (violet top, orange-red bottom) and the ground turns sunset orange; every shadow stretches with it: length = height / tan(elevation), ~11× the height by default, laid along the light direction (0.98, 0.2) across the block towards the island edge; the caster’s own long shadow reaches into the army too' },
    { k: 'shape', t: [1.7, 2.2], zh: '成形：影子「醒來」：每個影子在主人中招前 0.5 秒變成實心黑影，末端（頭部）亮起一粒紫色眼光並微微抽動；由影子末端那一側（離太陽最遠的一排）開始，士兵低頭發抖', en: 'shape: the shadows wake: 0.5 s before its owner is hit each shadow turns into a solid black shape with one violet eye pixel at its head end and twitches; it starts with the rank farthest from the sun, where the shadows end, and the soldiers look down and tremble' },
    { k: 'motion', t: [2.0, 3.6], zh: '推進：每個影子以腳為鉸鏈由地面翻起（0.16 秒，回彈緩動），同時縮成高 = min(影長, 2 × 身高) 的黑色剪影，站在主人身後半個兵距：1 像素寬的腿和軀幹、2 像素的頭、紫色眼光，上緣 1 像素淡紫發光邊；站直後越過主人頭頂撲到 109°，用影子的長矛刺入主人背部；這道「影子站起」的浪由離太陽最遠的一排掃回太陽方向，歷時 1.3 秒', en: 'motion: each shadow swings up off the ground hinged at the feet (0.16 s, overshoot ease) while it gathers into a black silhouette as tall as min(shadow length, 2 × height), standing half a spacing behind its owner: 1 px legs and torso, a 2 px head, a violet eye and a 1 px pale violet glowing rim on top; upright, it lunges over its owner’s head to 109° and drives its own spear into the owner’s back; this wave of standing shadows runs from the rank farthest from the sun back towards the sun in 1.3 s' },
    { k: 'impact', t: [2.2, 3.6], zh: '命中：判定 ⇔ 敵兵站在陽光下：與雲影中心 (1, 0) 的距離 > cloud（預設 0 = 沒有雲，全員中招）；命中時間 = 2.2 + 1.3 × (1 − s) + 0.03 × 隨機，s = 敵兵在光線方向上的位置（0 = 最近太陽，1 = 最遠）；第一刺時 1 格紫黑衝擊格＋頓幀，每一刺處閃出 2 像素白紫光點，主人向前撲倒；擊殺計數即時上升，全滅時變金色', en: 'impact: rule ⇔ the soldier stands in sunlight: distance to the cloud shade centre (1, 0) > cloud (default 0 = no cloud, everybody is hit); hit time = 2.2 + 1.3 × (1 − s) + 0.03 × random, s = the soldier’s position along the light direction (0 = nearest the sun, 1 = farthest); one violet-black impact frame and a hit-stop on the first stab, a 2 px white-violet spark at every stab, the owner falls forward; the kill counter climbs and turns gold on a full wipe' },
    { k: 'after', t: [3.6, 6], zh: '餘波：每個剪影刺中後 0.14–0.3 秒倒回地面，0.3–0.5 秒縮回腳下並放出紫色光點，留下倒地的士兵；太陽 3.7–4.4 秒升回高空並在 4.45 秒前熄滅，黃昏 3.75–4.4 秒以圓形擦除縮回太陽，影子縮回正午長度；雲影下的倖存者一直站著；擊殺計數 4.4–4.6 秒淡出，屍體 4.4–4.8 秒淡出，新的方陣 4.8–5.85 秒原地淡入', en: 'aftermath: 0.14–0.3 s after its stab each silhouette falls back onto the ground and at 0.3–0.5 s shrinks into the feet with violet motes, leaving the fallen soldiers; the sun climbs back at 3.7–4.4 s and goes out by 4.45 s, the dusk retracts into the sun with a radial wipe at 3.75–4.4 s and the shadows shrink back to noon length; survivors under the cloud keep standing; the counter fades at 4.4–4.6 s, the bodies at 4.4–4.8 s, and a fresh block fades in on the spot at 4.8–5.85 s' },
  ],
  layers: [
    { zh: '判定與倖存者：雲（cloud > 0 時由施法者一側飄進來，停在 (1, 0) 上空 3.6 高）在地面投下半徑 = cloud 的冷色陰影圓（邊緣抖色）；圓內的敵兵沒有影子，所以不會被殺，只會發抖，一直站到循環結束；圓外（陽光下）的敵兵全部中招，命中時間 = 影子站起的時間', en: 'rule and survivors: a cloud (cloud > 0: it drifts in from the caster’s side and parks 3.6 above (1, 0)) casts a cool shade disc of radius = cloud on the ground (dithered edge); soldiers inside have no shadow, so nothing can kill them: they only tremble and stand through the loop; every soldier outside (in sunlight) is hit, at the time its shadow stands up' },
    { zh: '大軍與擊殺計數：敵兵按陣型（預設方陣）排在中心 (1, 0)、半深 2.8、半寬 2.6 的範圍內，兵距決定大小；五百至二千人時用像素小兵（1–3 像素寬的筆畫＋鋼灰頭盔像素）；角落 3×5 像素字擊殺計數「骷髏 已擊殺/總數」，全滅時變金色', en: 'army and counter: soldiers stand in a formation (default block) inside a 2.8 half-depth × 2.6 half-width area around (1, 0), the spacing sets their size; five hundred to two thousand are drawn as pixel soldiers (a 1–3 px stroke with steel helmet pixels); a 3×5 pixel kill counter "skull killed/total" in the corner turns gold on a full wipe' },
    { zh: '長影子：每名敵兵一條由腳底沿光線方向延伸的地面陰影筆畫（寬 1 像素、末端加寬成頭部），長度 = 身高 ÷ tan(太陽高度角)；寫進一個陰影遮罩，由一個後處理把那些地面像素壓暗成紫褐色，所以一千條影子每像素只寫一次', en: 'long shadows: one ground stroke per soldier from the feet along the light direction (1 px wide, widening into a head at the end), length = height / tan(sun elevation); written into a shadow mask that one post pass turns into dark violet-brown ground, so a thousand shadows cost one write per pixel' },
    { zh: '影子剪影：每個影子是一條由腳底出發的 3D 線段（方向 = 光線方向 × cos θ + 上方 × sin θ，θ 由 0° 翻到 90° 再撲到 109°），投影後逐像素畫成實心黑色人形（腿與軀幹 1 像素、細頸、頭 2 像素），寫入深度，前面的士兵會擋住後面的剪影', en: 'silhouettes: each shadow is a 3D segment from the feet (direction = light direction × cos θ + up × sin θ, θ swinging 0° → 90° → 109°), projected and filled pixel by pixel as a solid black figure (1 px legs and torso, thin neck, 2 px head) with depth, so soldiers in front hide the silhouettes behind them' },
    { zh: '紫色發光邊：同一個後處理把站起的剪影上緣外一圈 1 像素塗成淡紫色（上方 2 像素也是空的才畫，所以密集方陣只描外輪廓），頭部一粒紫色眼光；讀起來是一道帶紫色浪頭的黑色人牆掃過大軍', en: 'violet rim: the same post pass paints a 1 px pale violet cap on the top edge of the standing silhouettes (only where the 2 px above are empty, so a dense block only gets its outer contour) plus one violet eye pixel per head; it reads as a black wall of figures with a violet crest sweeping through the army' },
    { zh: '太陽與天空：太陽 = 白熱核心＋橙色光暈＋10 條光芒，隨高度角沉到施法者身後；領域模組把背景換成黃昏天空（紫頂橙紅底），後處理把地面染成夕陽橙（夜間模式也被召喚的太陽照亮）', en: 'sun and sky: the sun = a white-hot core, orange halo and 10 rays, sinking behind the caster with the elevation; the domain module swaps the page for a dusk sky (violet top, orange-red bottom) and the post pass tints the ground sunset orange (in night mode the summoned sun lights the field too)' },
    { zh: '雲：5 + 5 × cloud 顆半透明（抖色 85%）灰白粗糙球組成的扁平雲，寬約 2 × cloud', en: 'cloud: a flat cloud of 5 + 5 × cloud translucent (85% dithered) grey-white rough balls, ~2 × cloud wide' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    cloud: { zh: '雲影半徑', en: 'cloud shade radius', min: 0, max: 3, step: .1, value: 0 },
    sun: { zh: '太陽高度（度）', en: 'sun height (degrees)', min: 4, max: 30, step: 1, value: 5 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  SKY: { top: '#2a1846', bottom: '#d0644a', stars: .002, star: '#ffe0b0' },
  SKY_NIGHT: { top: '#0e0a1c', bottom: '#7a2e34', stars: .005, star: '#ffd8a0' },
  AREA: { x: 1, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  HIT: 2.2,
  D: (() => { const l = Math.hypot(.98, .2); return [.98 / l, .2 / l]; })(),
  // sweep position of every unit along the light direction (0 = nearest the sun), cached per layout
  sweep(units) {
    if (this._sw && this._sw.units === units) return this._sw.s;
    const D = this.D, s = new Float32Array(units.length);
    let lo = Infinity, hi = -Infinity;
    for (const u of units) { const q = u.x * D[0] + u.y * D[1]; lo = Math.min(lo, q); hi = Math.max(hi, q); }
    for (const u of units) s[u.i] = hi > lo ? (u.x * D[0] + u.y * D[1] - lo) / (hi - lo) : 0;
    this._sw = { units, s };
    return s;
  },
  // scratch masks per frame size: sh (1 = cloud shade, 2 = cast shadow) and sil (silhouette pixels)
  bufs(W, H) {
    const m = this._b || (this._b = new Map()), key = W + 'x' + H;
    let b = m.get(key);
    if (!b) m.set(key, b = { W, H, sh: new Uint8Array(W * H), sil: new Uint8Array(W * H) });
    b.sh.fill(0); b.sil.fill(0);
    return b;
  },
  // a flat shadow stroke on the ground from (x, y) along D, length L, w px wide, into the shadow mask
  flat(v, B, x, y, L, w) {
    const D = this.D;
    if (!v.P(x, y, 0)) return;
    const ax = v.px, ay = v.py;
    if (!v.P(x + D[0] * L, y + D[1] * L, 0)) return;
    const dx = v.px - ax, dy = v.py - ay, n = Math.max(1, Math.round(Math.max(Math.abs(dx), Math.abs(dy)))), vert = Math.abs(dy) >= Math.abs(dx);
    const W = v.W, H = v.H, sh = B.sh;
    for (let k = 0; k < n; k++) {
      const f = (k + .5) / n, ww = f > .82 && n > 4 ? w + 1 : w, o = (ww - 1) >> 1;
      const cx = Math.floor(ax + dx * f), cy = Math.floor(ay + dy * f);
      for (let j = 0; j < ww; j++) {
        const ix = vert ? cx + j - o : cx, iy = vert ? cy : cy + j - o;
        if (ix >= 0 && iy >= 0 && ix < W && iy < H && sh[iy * W + ix] !== 1) sh[iy * W + ix] = 2;
      }
    }
  },
  // a solid silhouette: a figure along the 3D segment from the feet (x, y, 0), direction (D cos th, sin th), length L
  sil(v, B, cols, x, y, th, L, w, eye, mark = 1) {
    const D = this.D, c = Math.cos(th), s = Math.sin(th);
    if (!v.P(x, y, .005)) return null;
    const ax = v.px, ay = v.py, ad = v.pd;
    const tx3 = x + D[0] * L * c, ty3 = y + D[1] * L * c, tz3 = L * s + .005;
    if (!v.P(tx3, ty3, tz3)) return null;
    const bx = v.px, by = v.py, bd = v.pd;
    const dx = bx - ax, dy = by - ay, n = Math.max(1, Math.round(Math.max(Math.abs(dx), Math.abs(dy)))), vert = Math.abs(dy) >= Math.abs(dx);
    const W = v.W, H = v.H, pix = v.pix, zb = v.zb, kind = v.kind, sil = B.sil;
    const small = n < 7;
    for (let k = 0; k < n; k++) {
      const f = (k + .5) / n;
      let ww = w;
      if (!small) ww = f < .5 ? w : f < .78 ? (w > 1 ? w + 1 : w) : f < .84 ? Math.max(1, w - 1) : w + 1;
      else if (f > .7) ww = w + 1;
      const o = (ww - 1) >> 1, cx = Math.floor(ax + dx * f), cy = Math.floor(ay + dy * f), d = ad + (bd - ad) * f + .02;
      for (let j = 0; j < ww; j++) {
        const ix = vert ? cx + j - o : cx, iy = vert ? cy : cy + j - o;
        if (ix < 0 || iy < 0 || ix >= W || iy >= H) continue;
        const i = iy * W + ix;
        if (d <= zb[i]) continue;
        pix[i] = cols[j === 0 && ww > 1 ? 2 : 1]; zb[i] = d; kind[i] = 4; sil[i] = mark;
      }
      if (eye && !small && f > .9 && f < .9 + 1 / n) {
        const i = cy * W + cx;
        if (cx >= 0 && cy >= 0 && cx < W && cy < H && sil[i]) pix[i] = eye;
      }
    }
    return [tx3, ty3, tz3];
  },
  draw(p, t) {
    const PL = this.palette, v = p.v, X = PXFX, D = this.D, HIT = this.HIT, A = this.AREA, C0 = this.CASTER;
    const n = Math.round(p.param('crowd')), form = X.TROOPS[p.param('formation') | 0].id, CR = p.param('cloud'), sunDeg = p.param('sun');
    const CX = A.x, CY = A.y;
    // ---- the sun: flares at 0.9 s, sinks to the knob's elevation, climbs back and goes out ----
    const set = t < 1.0 ? 0 : t < 1.9 ? p.ease(p.ph(t, 1.0, 1.9)) : t < 3.7 ? 1 : 1 - p.ease(p.ph(t, 3.7, 4.4));
    const elev = (62 + (sunDeg - 62) * set) * Math.PI / 180, Lk = 1 / Math.tan(elev);
    const sunOn = t < .88 ? 0 : 1 - p.easeInCubic(p.ph(t, 3.95, 4.45));
    const zEnd = .3 + (sunDeg - 4) * .07, sunZ = 3.6 + (zEnd - 3.6) * set;
    const SX = CX - D[0] * 7, SY = CY - D[1] * 7;
    // ---- cloud: drifts in from the caster's side, parks over (CX, CY), drifts on ----
    const cin = p.easeOutCubic(p.ph(t, 1.0, 1.9)), cout = p.easeInCubic(p.ph(t, 3.8, 4.5));
    const cloudX = CX - 6 * (1 - cin) + 6 * cout, cloudA = CR > 0 ? Math.min(cin, 1 - cout) : 0;
    const shadeR = t < 3.8 ? CR : CR * (1 - cout);
    // ---- caster ----
    let pose;
    if (t < .4) pose = 'idle';
    else if (t < .85) pose = { a: 'idle', b: 'raise', k: p.easeOutBack(p.ph(t, .4, .85), 1.3) };
    else if (t < 1.0) pose = 'raise';
    else if (t < 1.9) pose = { a: 'raise', b: 'palm', k: p.ease(p.ph(t, 1.0, 1.9)) };
    else if (t < 3.8) pose = 'palm';
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 3.8, 4.4)) };
    const fig = p.figure(C0[0], C0[1], { pose, scale: .85 });
    // ---- the army ----
    const seed = 21, units = p.crowdLayout({ n, seed, formation: form, area: A, faceTo: C0 }), sw = this.sweep(units);
    const lit = u => !(CR > 0 && Math.hypot(u.x - CX, u.y - CY) <= CR);
    const hitT = u => (lit(u) ? HIT + 1.3 * (1 - sw[u.i]) + .03 * u.r1 : null);
    const st = p.crowd({
      n, seed, formation: form, area: A, faceTo: C0, t, scale: 'auto', pal: 'steel',
      hit: hitT,
      at: u => [u.x + D[0], u.y + D[1], 0],
      react: (s, a, u) => { X.REACT.fall(s, a, u, p); s.spear = false; },
      fear: u => {
        const th = hitT(u);
        if (th == null) return p.env(t, 2.1, 2.4, 3.5, 4.0) * (.35 + .35 * u.r3);
        return p.ph(t, th - .45, th - .1) * (.4 + .3 * u.r3);
      },
      respawn: [4.8, 5.85], clear: [4.4, 4.8], enter: 'fade',
    });
    const sc = st.scale, Hs = .62 * sc, hpx = Hs * v.S * v.fs, w = Math.max(1, Math.min(3, Math.round(hpx * .2)));
    const B = this.bufs(v.W, v.H), hue = v.hue, gap = Math.min(.5 * units.spacing, .6 * Hs);
    const shade = X.rampArr(X.rampId(PL.shade), hue), rim = X.rampArr(X.rampId(PL.rim), hue);
    // ---- cloud shade disc (honest radius) ----
    if (CR > 0 && shadeR > .02) {
      const W = v.W, N = W * v.H, fs = v.fs;
      for (let i = 0; i < N; i++) {
        if (!v.ghit[i]) continue;
        const dd = Math.hypot(v.gx[i] / fs - cloudX, v.gy[i] / fs - CY) / shadeR;
        if (dd < 1 - (X.bayerAt(i % W, (i / W) | 0) - .5) * .06) B.sh[i] = 1;
      }
    }
    // ---- shadows and silhouettes ----
    const inShadeNow = u => CR > 0 && Math.hypot(u.x - cloudX, u.y - CY) <= shadeR;
    const stabs = [], sinks = [];
    for (const s of st) {
      const u = s.u, th = s.hitT;
      if (s.fresh) {
        const len = (5.85 - 4.8) * .55, st0 = 4.8 + u.r1 * (5.85 - 4.8 - len);
        if (p.easeOut((t - st0) / len) > .5 && !inShadeNow(u)) this.flat(v, B, u.x, u.y, Hs * Lk, w);
        continue;
      }
      const L = Hs * Lk;
      if (th == null) { if (!inShadeNow(u)) this.flat(v, B, u.x, u.y, L, w); continue; }
      const a = t - th;
      if (a < -.5) { if (!inShadeNow(u)) this.flat(v, B, u.x, u.y, L, w); continue; }
      if (a > .5) continue;
      // the shadow wakes (flat solid with a rim), stands up just behind its owner, lunges over him, falls back, shrinks into the feet
      const Ls = Math.min(L, 2 * Hs);
      let ang = 0, len = L, eye = 0, bo = 0;
      if (a < -.2) { ang = .05 * Math.max(0, Math.sin(t * 40 + u.r2 * 9)); eye = 1; }
      else if (a < -.04) { const k = p.easeOutBack(p.ph(a, -.2, -.04), 1.5); ang = 1.57 * k; len = L + (Ls - L) * p.ease(p.ph(a, -.2, -.08)); eye = 1; bo = gap * p.ease(p.ph(a, -.2, -.06)); }
      else if (a < .05) { ang = 1.57 + (1.9 - 1.57) * p.easeInCubic(p.ph(a, -.04, .02)); len = Ls; eye = 1; bo = gap; }
      else if (a < .14) { ang = 1.9; len = Ls; eye = 1; bo = gap; }
      else if (a < .3) { ang = 1.9 * (1 - p.easeInCubic(p.ph(a, .14, .3))); len = Ls; bo = gap * (1 - p.ph(a, .14, .3)); }
      else { ang = 0; len = Ls * (1 - p.easeOutCubic(p.ph(a, .3, .5))); }
      if (len < Hs * .2) continue;
      const tip = this.sil(v, B, shade, u.x + D[0] * bo, u.y + D[1] * bo, ang, len, w, eye ? rim[3] : 0, a < -.2 || a > .3 ? 2 : 1);
      if (tip && a >= -.04 && a < .12) stabs.push([s, tip, a]);
      if (a > .2 && a < 1) sinks.push([u, a]);
    }
    // the caster's own long shadow reaches towards the army (it never stands up)
    this.flat(v, B, C0[0], C0[1], 1.5 * .85 * Lk, Math.max(2, Math.round(.16 * v.S * v.fs)));
    // ---- cloud ----
    if (cloudA > 0) {
      const nb = Math.round(5 + 5 * CR), CZ = 3.6;
      for (let k = 0; k < nb; k++) {
        const ang = p.r(k, 3) * p.TAU, rr = Math.sqrt(p.r(k, 4)) * CR * .8, br = (.42 + .3 * p.r(k, 6)) * (.7 + .2 * CR) * (1 - .3 * rr / Math.max(.1, CR));
        p.ball(cloudX + Math.cos(ang) * rr, CY + Math.sin(ang) * rr, CZ + br * .35 + (p.r(k, 5) - .5) * .12, br, PL.cloud, { alpha: .85 * cloudA, rough: .3, shadow: false, seed: k });
      }
    }
    // ---- dusk: sky via the domain module, ground + shadows + rims in one post pass ----
    const skyK = t < 2.5 ? p.easeOutCubic(p.ph(t, 1.0, 1.7)) : 1 - p.ease(p.ph(t, 3.75, 4.4));
    if (skyK > .01) p.domain({ amt: skyK, c: [SX, SY, sunZ], sky: p.night ? this.SKY_NIGHT : this.SKY, solids: .1 * skyK, t: 0 });
    const warm = skyK, night = p.night, sil = B.sil, sh = B.sh;
    const wc = X.hex(night ? '#ff9a50' : '#ffa45a'), memo = new Map();
    p.post(({ pix, W, H, kind, zb, bayer, rgb }) => {
      const N = W * H;
      for (let i = 0; i < N; i++) {
        if (kind[i] !== 1) continue;
        let c = pix[i];
        const m = sh[i];
        if (m === 1) { pix[i] = rgb((c & 255) * .6, (c >> 8 & 255) * .6, (c >> 16 & 255) * .78); continue; }
        if (warm > 0) {
          const key = c + (bayer(i % W, (i / W) | 0) < warm ? 0 : 1) * 4294967296;
          let g = memo.get(key);
          if (g === undefined) {
            const on = key < 4294967296, r = c & 255, gg = c >> 8 & 255, b = c >> 16 & 255, k = on ? (night ? .55 : .5) : 0;
            g = rgb(r + (wc[0] - r) * k + (night ? 30 : 8) * k, gg + (wc[1] - gg) * k, b + (wc[2] - b) * k * 1.2);
            memo.set(key, g);
          }
          c = g;
        }
        if (m === 2) c = rgb((c & 255) * .4, (c >> 8 & 255) * .34, (c >> 16 & 255) * .52);
        pix[i] = c;
      }
      // violet rim around the silhouettes (outer contour only)
      for (let iy = 1; iy < H - 1; iy++) for (let ix = 1; ix < W - 1; ix++) {
        const i = iy * W + ix;
        if (sil[i]) continue;
        const z = zb[i] + .001;
        if (sil[i + W] === 1 && zb[i + W] > z && !sil[i - W] && (iy < 2 || !sil[i - 2 * W])) { pix[i] = rim[3]; kind[i] = 3; }
      }
    });
    // ---- light: palm charge, the sun, stabs, motes ----
    if (t > .4 && t < 1.0) {
      const ch = p.ph(t, .45, .9), h = fig.hand;
      p.charge(h[0], h[1], h[2] + .08, ch, { n: 12, R: .9, ramp: PL.sun, up: .3 });
      p.glow(h[0], h[1], h[2] + .08, .1 + .12 * ch, PL.sun, .9 * ch * (1 - p.ph(t, .9, 1.0)));
    }
    if (sunOn > 0) {
      const fl = Math.pow(1 - p.ph(t, .9, 1.25), 2), r = (.5 + .35 * fl) * (1 - .9 * p.easeInCubic(p.ph(t, 3.95, 4.45)));
      p.core(SX, SY, sunZ, { r, ramp: PL.sun, I: 1.05 * sunOn + .5 * fl, t, rays: 10, spin: .5, rayLen: 2.6 + 2 * fl, halo: 2.8 });
      if (fl > .05) p.sparkle(SX, SY, sunZ, 4 + 14 * fl, PL.sun, 1.2 * fl);
    }
    const a0 = t - HIT;
    if (a0 >= 0 && a0 < .021 + 1 / 30) p.impactFrame({ ink: '#120a1c', paper: '#fff0e2', accent: '#9a7cff' });
    for (const [s, tip, a] of stabs) {
      const ch = s.chest, k = p.ph(a, -.05, .03), hx = tip[0] + (ch[0] - tip[0]) * .35, hy = tip[1] + (ch[1] - tip[1]) * .35, hz = tip[2] * .7;
      p.line([hx, hy, hz], [hx + (ch[0] - hx) * k, hy + (ch[1] - hy) * k, hz + (ch[2] - hz) * k], .02, PL.rim, .9, { i1: 1.2 });
      if (a >= 0) p.dot(ch[0], ch[1], ch[2], PL.motes, 1.3 * (1 - a / .12), 2);
    }
    const nm = Math.min(sinks.length, Math.round(240 * p.density));
    for (let k = 0; k < nm; k++) {
      const [u, a] = sinks[Math.floor(k * sinks.length / nm)], age = p.ph(a, .3 + .15 * u.r2, .7 + .2 * u.r2);
      if (age <= 0 || age >= 1) continue;
      p.dot(u.x + D[0] * Hs * (1 + u.r3), u.y + D[1] * Hs, .05 + age * (.6 + .5 * u.r1), PL.motes, 1 - age, 1);
    }
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.4, 4.6) });
  },
});
