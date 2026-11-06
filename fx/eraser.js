// 一筆抹消 / Eraser — Twist pack (original design): a giant pixel eraser drops onto the battlefield and scrubs a zigzag across the army; everything it passes turns into the grey-and-white checkerboard of a transparent canvas, then an undo fills it back in
PXFX.define({
  id: 'eraser',
  loop: 6,
  beats: [{ t: .6, kind: 'cast', power: .5 }, { t: 1.5, kind: 'hit', power: 1.3 }, { t: 3.2, kind: 'pulse', power: .6 }, { t: 3.95, kind: 'pulse', power: .45 }],
  view: { r: 5.5, h: 3.4 },
  stage: { ground: 'grass' },
  modules: ['figure', 'crowd', 'troops', 'tally', 'shockwave', 'debris'],
  palette: {
    rubber: ['#8a3450', '#b8506e', '#de7a96', '#f6a8bc', '#ffd4de'],
    sleeve: ['#7c849c', '#aab2c4', '#d4dae6', '#f2f5fa'],
    band: ['#1e3a74', '#2e58a0', '#4680cc', '#74a8ee'],
    crumb: ['#9a5a72', '#c07c94', '#e0a4b6', '#f6ccd8'],
    // the path the caster draws and the undo arrow: pale ink light
    path: ['#6a7aa0', '#9cacc8', '#d0dcee', '#ffffff'],
    // the undo icon: a saturated interface blue that reads on grass, checkerboard and the white page
    ui: ['#1e4a9a', '#2e6ad0', '#5a96f0', '#a8ccff'],
    dust: ['#7c8a6a', '#a0ac8a', '#c6ceb0', '#e6eada'],
  },
  timeline: [
    { k: 'pose', t: [0, .6], zh: '起手：施法者（縮放 0.85，站在 x = −4.3）待機，對面是千人方陣（預設 1000 人，中心 (1.0, 0)、半深 2.8、半寬 2.6，草地上 3–5 像素高的紅頭盔像素小兵）', en: 'pose: the caster (scale 0.85, at x = −4.3) idles facing a block of 1000 (centre (1.0, 0), half depth 2.8, half width 2.6; 3–5 px red-helmed pixel soldiers on grass)' },
    { k: 'charge', t: [.6, 1.3], zh: '集氣：施法者指向大軍，指尖一道淡白細光連到地面的畫筆點，0.7 秒內在大軍上畫出一條之字形虛線路徑：passes（預設 4）條沿 x 方向的筆劃，x 由 −2.2 到 4.2，筆劃中心線平均分佈在 y = ±2.7 內（間距 5.4 ÷ passes），筆劃之間用短的轉彎段連起', en: 'charge: the caster points; a thin pale line runs from the fingertip to a pen point on the ground that draws a dashed zigzag path over the army in 0.7 s: `passes` (default 4) strokes along x from −2.2 to 4.2, their centre lines spread evenly over y = ±2.7 (spacing 5.4 / passes), joined by short turns' },
    { k: 'shape', t: [1.25, 1.6], zh: '成形：一個巨大的像素橡皮擦（粉紅色橡膠塊，寬 = brush，深 0.6 × brush，高 0.8 × brush，中間套白色紙套和一條藍色色帶）由高 5 處加速落下，影子先在地面變大；1.5 秒砸在路徑起點：壓扁回彈、一圈灰綠色塵土、頓幀與震屏', en: 'shape: a giant pixel eraser (a pink rubber block, brush wide, 0.6 × brush deep, 0.8 × brush tall, a white paper sleeve with a blue band round its middle) drops from height 5, its shadow growing first, and slams onto the start of the path at 1.5 s: squash and rebound, a ring of grey-green dust, hit-stop and shake' },
    { k: 'motion', t: [1.6, 3.2], zh: '推進：橡皮擦沿路徑來回擦（每條筆劃先加速後減速、向前傾 0.2 弧度並輕微搖晃），1.65 秒內擦完；判定：抹消範圍 = 沿路徑、半徑 brush ÷ 2（預設 1.5 ÷ 2）的膠囊形聯集；士兵到路徑的距離 ≤ brush ÷ 2 才被擦掉，命中時間 = 擦頭圓盤第一次碰到他的時間（每條線段解一元二次方程，再反解筆劃的緩動）；被擦掉的士兵直接消失，不留屍體', en: 'motion: the eraser scrubs back and forth along the path (each stroke speeds up then slows, leaning 0.2 rad forward with a small wobble) and finishes in 1.65 s; rule: the erased area is the union of capsules of radius brush / 2 (default 1.5 / 2) along the path; a soldier is erased iff his distance to the path ≤ brush / 2, hit time = when the eraser disc first touches him (a quadratic per segment, then the stroke easing inverted); erased soldiers simply vanish, no corpses' },
    { k: 'impact', t: [1.5, 3.6], zh: '命中：後製：每個地面像素用反投影找到地面點，落在已擦範圍內的像素換成固定在螢幕上的灰白棋盤格（4 像素一格，繪圖軟件的透明背景）；橡皮擦身後掉下約 26 粒灰粉紅色橡皮屑；擦完時擊殺計數 1000/1000 變金色；3.2–3.6 秒橡皮擦升起翻轉飛走，留下一大片棋盤格', en: 'impact: post pass: every ground pixel finds its ground point with the inverse projection, and pixels inside the erased area become a screen-fixed grey-and-white checkerboard (4 px squares, a paint program’s transparent background); about 26 grey-pink rubber crumbs fall behind the eraser; when the last stroke ends the counter reads 1000/1000 and turns gold; at 3.2–3.6 s the eraser lifts, flips and flies off, leaving a big checkerboard hole' },
    { k: 'after', t: [3.6, 6], zh: '餘波：3.95 秒大軍上方亮起一個逆時針的「復原」圓弧箭頭，棋盤格由邊緣向路徑中心線收縮填回（半徑 0.5 秒內由 brush ÷ 2 縮到 0），草地復原；橡皮屑同時消失；擊殺計數 4.3–4.55 秒淡出，新的大軍 4.6–5.9 秒原地淡入', en: 'aftermath: at 3.95 s a counter-clockwise "undo" arrow arc lights above the army and the checkerboard fills back in from its edges towards the path centre line (the radius shrinks from brush / 2 to 0 in 0.5 s), the grass returns and the crumbs vanish; the counter fades at 4.3–4.55 s and a fresh army fades in on the spot at 4.6–5.9 s' },
  ],
  layers: [
    { zh: '大軍與陣型：敵兵數量 500–2000（預設 1000），按陣型（預設方陣）排在中心 (1.0, 0)、半深 2.8、半寬 2.6 的範圍內，兵距決定大小並自動換成像素小兵；左上角擊殺計數（骷髏＋已擊殺/總數）在後製和橡皮擦之後才畫，全滅時變金色', en: 'army and formation: 500–2000 soldiers (default 1000) in a formation (default block) inside centre (1.0, 0), half depth 2.8, half width 2.6; the spacing sets their size and swaps them to pixel soldiers; the kill counter (skull + killed/total) is drawn after the post pass and the eraser, and turns gold on a full wipe' },
    { zh: '判定與倖存者：路徑是 passes 條沿 x 的筆劃（中心 y_k = −2.7 + (k + 0.5) × 5.4 ÷ passes）加轉彎段；士兵到路徑距離 ≤ brush ÷ 2 即被擦掉。brush ≥ 筆劃間距時整片覆蓋（預設 1.5 ≥ 1.35）；brush 小或 passes 少時筆劃之間留下一條條沒被擦到的士兵，陣型伸出 y = ±2.78 之外的部分（橫列兩端、圓陣兩側、鶴翼的兩翼）也倖存；判定按陣型與參數快取', en: 'rule and survivors: the path is `passes` strokes along x (centre y_k = −2.7 + (k + 0.5) × 5.4 / passes) plus turns; a soldier is erased iff his distance to the path ≤ brush / 2. With brush ≥ the stroke spacing the cover is complete (default 1.5 ≥ 1.35); a thin brush or few passes leave stripes of untouched soldiers between the strokes, and the parts of a formation beyond y = ±2.78 (the ends of a line, the sides of a ring, the crescent’s horns) also survive; cached per layout and knobs' },
    { zh: '透明棋盤格後製：只換地面像素（存活士兵、施法者、橡皮擦不受影響）；格子固定在螢幕座標（2.5D／3D 為 4 像素，2D 為 3 像素），日間淺灰 #c6c6cc／白，夜間 #6e6c7a／#9a98a6；地面點用每行兩次反投影的線性步進求出，只在路徑外框內做距離測試', en: 'checkerboard post pass: only ground pixels change (survivors, the caster and the eraser are untouched); squares are fixed to the screen (4 px in 2.5D/3D, 3 px in 2D), light grey #c6c6cc / white by day, #6e6c7a / #9a98a6 at night; ground points come from a linear step per row (two inverse projections), and only pixels inside the path’s bounding box get the distance test' },
    { zh: '橡皮擦：三個有方向的實心方塊——粉紅橡膠（brush × 0.6 brush × 0.8 brush）、包住中段上部的白色紙套、紙套中間一條藍色色帶；擦的時候沿運動方向前傾、上下輕晃，在後製之後才畫所以清晰；落下時影子由小變大', en: 'eraser: three oriented solid boxes — the pink rubber (brush × 0.6 brush × 0.8 brush), a white paper sleeve over the upper middle, and a blue band round the sleeve; it leans into the stroke and bobs as it scrubs, and is drawn after the post pass so it stays crisp; its shadow grows while it falls' },
    { zh: '橡皮屑與塵土：約 26 粒（× 密度）小方塊屑按路徑時間在擦頭後方生成，向兩側彈開落地，復原時消失；落地時 10 團灰綠色抖色塵土', en: 'crumbs and dust: about 26 (× density) little cube crumbs spawn behind the eraser head along the path, hop sideways and settle, and vanish with the undo; 10 dithered grey-green dust puffs on the landing' },
    { zh: '畫路徑與復原：路徑是 0.06 寬的淡白虛線（每段 0.22），橡皮擦經過後只畫前方未擦的部分；復原箭頭是大軍上方高 2.2 處面向鏡頭、半徑 1.3 的 270° 藍色圓弧加箭頭，0.5 秒內轉一圈後消失', en: 'path and undo: the path is a pale dashed line 0.06 wide (0.22 dashes), and once the eraser runs only the part ahead of it is drawn; the undo icon is a camera-facing blue 270° arc (radius 1.3) with an arrowhead 2.2 above the army that turns once in 0.5 s and fades' },
  ],
  params: {
    crowd: { zh: '敵兵數量', en: 'enemy count', min: 500, max: 2000, step: 1, value: 1000 },
    formation: { zh: '陣型', en: 'formation', min: 0, max: 7, step: 1, value: 0, labels: PXFX.TROOPS.map(f => f.zh), labelsEn: PXFX.TROOPS.map(f => f.en) },
    brush: { zh: '橡皮擦寬度', en: 'brush width', min: .4, max: 2.2, step: .05, value: 1.5 },
    passes: { zh: '來回筆數', en: 'stroke passes', min: 2, max: 8, step: 1, value: 4 },
    tally: { zh: '擊殺計數', en: 'kill counter', min: 0, max: 1, step: 1, value: 1 },
  },
  AREA: { x: 1.0, y: 0, rx: 2.8, ry: 2.6 },
  CASTER: [-4.3, 0],
  X0: -2.2, X1: 4.2, Y: 2.7, TDRAW: [.62, 1.3], TLAND: 1.5, TEND: 3.15, TU: [3.95, 4.45],
  // the zigzag path, its timing and every unit's first-touch time (cached per layout + knobs)
  path(units, brush, passes) {
    const key = brush + '|' + passes;
    if (this._p && this._p.units === units && this._p.key === key) return this._p;
    const X0 = this.X0, X1 = this.X1, Y = this.Y, dy = 2 * Y / passes, r = brush / 2;
    const pts = [];
    for (let k = 0; k < passes; k++) {
      const y = -Y + (k + .5) * dy, a = k & 1 ? X1 : X0, b = k & 1 ? X0 : X1;
      pts.push([a, y], [b, y]);
    }
    // segments: strokes (eased) and turns (linear); a turn takes a quarter of a stroke's time
    const segs = [], wS = 1, wT = .25, total = passes * wS + (passes - 1) * wT, T0 = this.TLAND, T1 = this.TEND;
    let tt = T0;
    for (let j = 0; j < pts.length - 1; j++) {
      const stroke = !(j & 1), d = (stroke ? wS : wT) / total * (T1 - T0);
      segs.push({ a: pts[j], b: pts[j + 1], t0: tt, t1: tt + d, stroke });
      tt += d;
    }
    // first time the disc of radius r around the head touches each unit
    const hit = new Float32Array(units.length).fill(-1);
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      for (const g of segs) {
        const Dx = g.b[0] - g.a[0], Dy = g.b[1] - g.a[1], Ax = g.a[0] - u.x, Ay = g.a[1] - u.y;
        const A = Dx * Dx + Dy * Dy, B = 2 * (Dx * Ax + Dy * Ay), C = Ax * Ax + Ay * Ay - r * r;
        let s = null;
        if (C <= 0) s = 0;
        else { const disc = B * B - 4 * A * C; if (disc >= 0 && A > 0) { const s1 = (-B - Math.sqrt(disc)) / (2 * A); if (s1 >= 0 && s1 <= 1) s = s1; } }
        if (s != null) { hit[i] = this.segTime(g, s); break; }
      }
    }
    this._p = { units, key, segs, hit, r, pts };
    return this._p;
  },
  ease: u => u * u * (3 - 2 * u),
  // time at which the head is at path fraction s of segment g (inverse of the stroke easing)
  segTime(g, s) {
    if (!g.stroke) return g.t0 + s * (g.t1 - g.t0);
    let lo = 0, hi = 1;
    for (let k = 0; k < 22; k++) { const m = (lo + hi) / 2; if (this.ease(m) < s) lo = m; else hi = m; }
    return g.t0 + (lo + hi) / 2 * (g.t1 - g.t0);
  },
  // head position at time t: [x, y, segment index, fraction, speed sign]
  head(P, t) {
    const S = P.segs;
    if (t <= S[0].t0) return [S[0].a[0], S[0].a[1], 0, 0, 0];
    for (let j = 0; j < S.length; j++) {
      const g = S[j];
      if (t < g.t1) {
        const u = (t - g.t0) / (g.t1 - g.t0), s = g.stroke ? this.ease(u) : u;
        return [g.a[0] + (g.b[0] - g.a[0]) * s, g.a[1] + (g.b[1] - g.a[1]) * s, j, s, g.stroke ? Math.sign(g.b[0] - g.a[0]) * 6 * u * (1 - u) : 0];
      }
    }
    const g = S[S.length - 1];
    return [g.b[0], g.b[1], S.length - 1, 1, 0];
  },
  // oriented box: centre c, unit axes ex, ey, ez, half sizes hx, hy, hz
  obox(p, c, ex, ey, ez, hx, hy, hz, ramp) {
    const P = (a, b, d) => [c[0] + ex[0] * a + ey[0] * b + ez[0] * d, c[1] + ex[1] * a + ey[1] * b + ez[1] * d, c[2] + ex[2] * a + ey[2] * b + ez[2] * d];
    const v = [P(-hx, -hy, -hz), P(hx, -hy, -hz), P(hx, hy, -hz), P(-hx, hy, -hz), P(-hx, -hy, hz), P(hx, -hy, hz), P(hx, hy, hz), P(-hx, hy, hz)];
    const o = { shadow: false };
    p.quad(v[4], v[5], v[6], v[7], ramp, o); p.quad(v[0], v[3], v[2], v[1], ramp, o);
    p.quad(v[0], v[1], v[5], v[4], ramp, o); p.quad(v[1], v[2], v[6], v[5], ramp, o);
    p.quad(v[2], v[3], v[7], v[6], ramp, o); p.quad(v[3], v[0], v[4], v[7], ramp, o);
  },
  draw(p, t) {
    const PL = this.palette, brush = p.param('brush'), passes = p.param('passes') | 0;
    const form = PXFX.TROOPS[p.param('formation') | 0].id, n = Math.round(p.param('crowd'));
    const units = p.crowdLayout({ n, seed: 23, formation: form, area: this.AREA, faceTo: this.CASTER });
    const P = this.path(units, brush, passes), r = P.r, TL = this.TLAND, TE = this.TEND, TU = this.TU;
    // ---- the army: erased soldiers vanish ----
    const st = p.crowd({
      n, seed: 23, formation: form, area: this.AREA, faceTo: this.CASTER, t, scale: 'auto',
      hit: u => (P.hit[u.i] >= 0 ? P.hit[u.i] : null),
      react: s => { s.hide = true; },
      fear: u => (P.hit[u.i] >= 0 ? p.ph(t, 1.2, 1.5) * .35 : p.env(t, 1.5, 1.8, 3.6, 4.2) * .6),
      at: [this.AREA.x, this.AREA.y, 0], respawn: [4.6, 5.9], clear: [4.0, 4.2], enter: 'fade',
    });
    // ---- the erased area: a screen-fixed checkerboard on every ground pixel inside the swept capsules ----
    const H0 = this.head(P, t);
    let rr = r;   // erase radius: shrinks to 0 during the undo (fills back in from the edges)
    if (t >= TU[0]) rr = r * (1 - p.smooth(TU[0], TU[1], t));
    if (t >= TL && rr > .002) {
      const segs = P.segs, jCur = H0[2], hx = H0[0], hy = H0[1], self = this;
      // the swept polyline so far: whole segments before jCur, then a partial one to the head
      const lines = [];
      for (let j = 0; j < segs.length; j++) {
        if (j < jCur) lines.push([segs[j].a[0], segs[j].a[1], segs[j].b[0], segs[j].b[1]]);
        else if (j === jCur) { lines.push([segs[j].a[0], segs[j].a[1], hx, hy]); break; }
      }
      let bx0 = 1e9, bx1 = -1e9, by0 = 1e9, by1 = -1e9;
      for (const L of lines) { bx0 = Math.min(bx0, L[0], L[2]); bx1 = Math.max(bx1, L[0], L[2]); by0 = Math.min(by0, L[1], L[3]); by1 = Math.max(by1, L[1], L[3]); }
      bx0 -= rr; bx1 += rr; by0 -= rr; by1 += rr;
      const r2 = rr * rr;
      p.post(({ pix, W, H, kind, Q, rgb, night }) => {
        const sq = W >= 200 ? 4 : 3;
        const cA = night ? rgb(110, 108, 122) : rgb(198, 198, 204), cB = night ? rgb(154, 152, 166) : rgb(255, 255, 255);
        for (let sy = 0; sy < H; sy++) {
          const q0 = Q(.5, sy + .5), q1 = Q(1.5, sy + .5);
          if (!q0 || !q1) continue;
          const dx = q1[0] - q0[0], dy = q1[1] - q0[1];
          for (let sx = 0; sx < W; sx++) {
            const i = sy * W + sx;
            if (kind[i] !== 1) continue;
            const gx = q0[0] + dx * sx, gy = q0[1] + dy * sx;
            if (gx < bx0 || gx > bx1 || gy < by0 || gy > by1) continue;
            let inside = false;
            for (let k = 0; k < lines.length && !inside; k++) {
              const L = lines[k], ex = L[2] - L[0], ey = L[3] - L[1], l2 = ex * ex + ey * ey;
              let s = l2 > 0 ? ((gx - L[0]) * ex + (gy - L[1]) * ey) / l2 : 0;
              s = s < 0 ? 0 : s > 1 ? 1 : s;
              const ox = gx - L[0] - ex * s, oy = gy - L[1] - ey * s;
              if (ox * ox + oy * oy <= r2) inside = true;
            }
            if (inside) pix[i] = ((Math.floor(sx / sq) + Math.floor(sy / sq)) & 1) ? cA : cB;
          }
        }
      });
    }
    // ---- the caster draws the path ----
    let pose;
    if (t < .45) pose = 'idle';
    else if (t < 1.35) pose = { a: 'idle', b: 'point', k: p.easeOutBack(p.ph(t, .45, .7), 1.2) };
    else if (t < 3.4) pose = { a: 'point', b: 'ready', k: p.easeOutCubic(p.ph(t, 1.35, 1.7)) };
    else if (t < 4.3) pose = { a: 'ready', b: 'palm', k: p.easeOutBack(p.ph(t, 3.75, 3.95), 1.3) };
    else pose = { a: 'palm', b: 'idle', k: p.easeOutCubic(p.ph(t, 4.3, 4.9)) };
    const fig = p.figure(this.CASTER[0], this.CASTER[1], { pose, scale: .85 });
    // the dashed path: drawn out by a pen point during TDRAW, then only the part ahead of the eraser
    const segs = P.segs;
    let lens = 0;
    for (const g of segs) lens += Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]);
    const dk = p.ph(t, this.TDRAW[0], this.TDRAW[1]), sDraw = lens * dk;
    let sHead = 0;
    if (t >= TL) {
      for (let j = 0; j < H0[2]; j++) sHead += Math.hypot(segs[j].b[0] - segs[j].a[0], segs[j].b[1] - segs[j].a[1]);
      const g = segs[H0[2]];
      sHead += Math.hypot(H0[0] - g.a[0], H0[1] - g.a[1]);
    }
    const pathA = t < TE ? 1 : 0;
    if (dk > 0 && pathA > 0) {
      const at = s => {
        let acc = 0;
        for (const g of segs) {
          const l = Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]);
          if (s <= acc + l) { const u = (s - acc) / l; return [g.a[0] + (g.b[0] - g.a[0]) * u, g.a[1] + (g.b[1] - g.a[1]) * u, .03]; }
          acc += l;
        }
        const g = segs[segs.length - 1];
        return [g.b[0], g.b[1], .03];
      };
      const dash = .22, from = Math.max(sHead + r * .9, 0), I = .9;
      for (let s0 = Math.ceil(from / (2 * dash)) * 2 * dash; s0 < sDraw; s0 += 2 * dash) p.line(at(s0), at(Math.min(sDraw, s0 + dash)), .06, PL.path, I);
      if (dk < 1) {
        const tip = at(sDraw);
        p.line(fig.hand, [tip[0], tip[1], .05], .025, PL.path, .7, { i1: .9 });
        p.sparkle(tip[0], tip[1], .08, 3, PL.path, 1);
      }
    }
    // ---- the eraser: drop, scrub, lift off ----
    const bw = brush, hx = .3 * bw, hy = .5 * bw, hz = .4 * bw;
    const ex0 = [1, 0, 0], ey0 = [0, 1, 0];
    let ex = ex0, ez = [0, 0, 1], cz = hz, cx = H0[0], cy = H0[1], show = false, sq = 1;
    const ld = t - TL;
    if (t >= TL - .28 && t < TL) {   // falling: accelerate in, its shadow growing below
      const k = p.easeInCubic(p.ph(t, TL - .28, TL));
      cz = hz + 5 * (1 - k); show = true;
      p.shadow(cx, cy, 0, bw * (.25 + .35 * k), .5 + .5 * k);
    } else if (t >= TL && t < TE + .45) {
      show = true;
      if (ld < .14) sq = 1 - .35 * Math.sin(Math.PI * ld / .14);
      const lean = .2 * Math.max(-1, Math.min(1, H0[4])), wob = .05 * Math.sin(t * 38) * (t < TE ? 1 : 0);
      let ang = lean + wob, lift = 0;
      if (t >= TE) {   // lift off, flip and fly away
        const k = p.ph(t, TE + .05, TE + .45);
        lift = 7 * p.easeInCubic(k); ang = -2.4 * p.easeInCubic(k); cx += 3 * p.easeInCubic(k);
      }
      ex = [Math.cos(ang), 0, -Math.sin(ang)]; ez = [Math.sin(ang), 0, Math.cos(ang)];
      cz = hz * sq + lift + Math.abs(Math.sin(ang)) * hx;
      if (lift < 4) p.shadow(cx, cy, 0, bw * .6, lift > .3 ? .6 : 1);
    }
    if (show) {
      const c = [cx, cy, cz];
      this.obox(p, c, ex, ey0, ez, hx, hy, hz * sq, PL.rubber);
      const cs = [c[0] + ez[0] * hz * .25 * sq, c[1], c[2] + ez[2] * hz * .25 * sq];
      this.obox(p, cs, ex, ey0, ez, hx + .02, hy * .62, hz * .8 * sq + .02, PL.sleeve);
      this.obox(p, cs, ex, ey0, ez, hx + .03, hy * .16, hz * .8 * sq + .03, PL.band);
    }
    // landing dust
    if (ld >= 0 && ld < .7) {
      const s0 = segs[0].a, nD = Math.round(10 * p.density);
      for (let k = 0; k < nD; k++) {
        const ang = k / nD * p.TAU + p.r(k, 5), d = hy + p.drag(2.2, 5, ld) * (.7 + .5 * p.r(k, 6));
        const age = ld / .7;
        p.ball(s0[0] + Math.cos(ang) * d * .8, s0[1] + Math.sin(ang) * d, .12 + .25 * age, .14 + .12 * age, PL.dust, { rough: .5, alpha: 1 - age, shadow: false });
      }
      if (ld < .25) p.shock(s0[0], s0[1], .05, ld / .25, { R: bw * 1.7, w: .15, ramp: PL.path });
    }
    // rubber crumbs shed along the path, settled until the undo
    if (t >= TL && t < TU[0] + .25) {
      const nC = Math.round(26 * p.density), gone = 1 - p.ph(t, TU[0], TU[0] + .25);
      for (let k = 0; k < nC; k++) {
        const born = TL + .05 + (TE - TL - .05) * (k + .5) / nC, age = t - born;
        if (age < 0) continue;
        const Hb = this.head(P, born), side = p.r(k, 11) < .5 ? -1 : 1;
        const hop = Math.min(age, .35), tz = Math.max(0, 2.2 * hop - 9 * hop * hop);
        const bx = Hb[0] - Math.sign(Hb[4] || 1) * hx * (.6 + .4 * p.r(k, 12)) + (p.r(k, 13) - .5) * .3;
        const by = Hb[1] + side * (hy * .6 + p.drag(1.6, 6, hop) * (.3 + .7 * p.r(k, 14)));
        const sz = (.045 + .035 * p.r(k, 15)) * Math.max(.6, Math.min(1.4, bw));
        if (gone > .5 || p.r(k, 16) < gone * 2) p.box(bx - sz, by - sz * .6, tz, bx + sz, by + sz * .6, tz + sz * 1.2, PL.crumb, { shadow: false, alpha: .99 });
      }
    }
    // ---- undo: a camera-facing arc arrow above the army ----
    const ua = t - TU[0];
    if (ua >= -.05 && ua < .6) {
      const c = p.cam(), C = [this.AREA.x, this.AREA.y, 2.2], R = 1.3, I = ua < .45 ? 1 : 1 - (ua - .45) / .15, spin = p.TAU * p.easeOutCubic(p.ph(ua, 0, .5));
      const at = a => [C[0] + (c.right[0] * Math.cos(a) + c.up[0] * Math.sin(a)) * R, C[1] + (c.right[1] * Math.cos(a) + c.up[1] * Math.sin(a)) * R, C[2] + (c.right[2] * Math.cos(a) + c.up[2] * Math.sin(a)) * R];
      const a0 = .6 + spin, a1 = a0 + 4.7;
      const pts = [];
      for (let k = 0; k <= 24; k++) pts.push(at(a0 + (a1 - a0) * k / 24));
      p.trail(pts, .2, .2, PL.ui, .85 * I, .85 * I);
      // arrowhead at the end of the arc, pointing on counter-clockwise (the undo icon)
      const tip = at(a1 + .3), b1 = at(a1 - .02);
      const ra = [C[0] - b1[0], C[1] - b1[1], C[2] - b1[2]], rl = Math.hypot(...ra) || 1;
      const w = .4, b2 = [b1[0] + ra[0] / rl * w, b1[1] + ra[1] / rl * w, b1[2] + ra[2] / rl * w], b3 = [b1[0] - ra[0] / rl * w, b1[1] - ra[1] / rl * w, b1[2] - ra[2] / rl * w];
      p.line(b2, tip, .18, PL.ui, .85 * I); p.line(b3, tip, .18, PL.ui, .85 * I);
    }
    // ---- the kill counter goes last ----
    if (p.param('tally')) p.tally(st, { t, alpha: 1 - p.ph(t, 4.3, 4.55) });
  },
});
